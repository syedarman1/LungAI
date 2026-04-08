from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from keras.models import load_model
from PIL import Image
import numpy as np
import io
import os

app = FastAPI(title="LungAI API", version="0.2.0")

# Allow CORS — tighten in production via LUNGAI_ALLOWED_ORIGINS env var
allowed_origins = os.environ.get("LUNGAI_ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join("models", "cancer_detection_model.h5")
VALID_EXTENSIONS = {"jpg", "jpeg", "png"}
MAX_FILE_BYTES = 10 * 1024 * 1024  # 10 MB
THRESHOLD = 0.35  # Lowered for EfficientNetB0 — model is conservative, this improves cancer recall

model = load_model(MODEL_PATH)


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    ext = (file.filename or "").split(".")[-1].lower()
    if ext not in VALID_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{ext}'. Allowed: {sorted(VALID_EXTENSIONS)}",
        )

    raw = await file.read()
    if len(raw) > MAX_FILE_BYTES:
        raise HTTPException(status_code=413, detail="File too large (max 10 MB).")

    try:
        # Convert to grayscale first (normalizes CT scan input), then to RGB
        # EfficientNetB0 expects 3-channel input; repeating the gray channel works well
        img = Image.open(io.BytesIO(raw)).convert("L").convert("RGB").resize((224, 224))
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not read image: {exc}")

    # EfficientNetB0 uses built-in preprocessing — keep values in [0, 255]
    img_array = np.expand_dims(np.array(img), axis=0).astype("float32")

    raw_pred = float(model.predict(img_array, verbose=0)[0][0])
    is_cancer = raw_pred > THRESHOLD
    confidence = raw_pred if is_cancer else 1.0 - raw_pred

    return {
        "label": "cancer" if is_cancer else "no_cancer",
        "message": (
            "Cancer detected. Please consult a medical professional."
            if is_cancer
            else "No cancer detected."
        ),
        "confidence": round(confidence, 4),
        "raw_score": round(raw_pred, 4),
        "threshold": THRESHOLD,
    }
