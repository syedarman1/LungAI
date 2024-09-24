from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from keras.models import load_model
from PIL import Image
import numpy as np
import os

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained model
model = load_model(os.path.join("models", "cancer_detection_model.h5"))

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Ensure the file is in a valid format
    valid_extensions = ['jpg', 'jpeg', 'png', 'dcm']
    if not file.filename.split('.')[-1].lower() in valid_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a valid CT scan image.")

    # Load the image (this example assumes image types, DICOM files will need different handling)
    img = Image.open(file.file).convert("L")  # Convert to grayscale
    img = img.resize((224, 224))
    img_array = np.expand_dims(np.array(img), axis=-1)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Normalize the image

    # Make the prediction
    prediction = model.predict(img_array)

    # Set the threshold for cancer detection
    threshold = 0.5  # Adjust the threshold
    result = "Cancer detected. Please consult a medical professional." if prediction[0][0] > threshold else "No cancer detected."

    return {"prediction": result}
