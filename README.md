# LungAI

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.17-ff6f00?logo=tensorflow)](https://www.tensorflow.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

LungAI is an open-source, full-stack educational demo for AI-assisted lung CT image analysis. It pairs a polished Next.js frontend with a FastAPI/TensorFlow backend that classifies uploaded lung CT slices as `cancer` or `no_cancer` and returns a confidence score.

> [!WARNING]
> LungAI is not a medical device and must not be used for diagnosis, treatment decisions, clinical triage, or as a substitute for a licensed medical professional. The model output is experimental and may be incorrect.

## Table of Contents

- [Project Status](#project-status)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Model Behavior](#model-behavior)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [Security](#security)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)

## Project Status

LungAI is currently a research and portfolio demo. The app is useful for learning how an AI-assisted imaging workflow can be built, deployed, and documented, but it has not been clinically validated.

Current implementation:

- Frontend: Next.js App Router app in `client/`
- Backend: FastAPI service in `server/`
- Model: TensorFlow/Keras `.h5` model stored at `server/models/cancer_detection_model.h5`
- Deployment: Vercel-friendly frontend and Railway-ready backend

## Live Demo

- Frontend: [https://lung-ai-beta.vercel.app/](https://lung-ai-beta.vercel.app/)
- Backend: configure the frontend with `NEXT_PUBLIC_API_URL` pointing to your deployed FastAPI URL

## Features

- Upload a JPG, JPEG, or PNG lung CT slice.
- Try built-in sample scans from the frontend.
- Run model inference through a FastAPI `/predict` endpoint.
- View classification label, user-facing message, confidence, raw model score, and threshold.
- Health-check endpoint for deployment monitoring.
- CORS configuration through an environment variable.
- Frontend pages explaining the demo workflow, early detection context, and usage steps.
- Open-source-friendly documentation, contribution workflow, and governance notes.

## Tech Stack

Frontend:

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react and small shadcn-style UI primitives

Backend:

- FastAPI
- TensorFlow CPU / Keras
- Pillow
- NumPy
- Uvicorn

Deployment:

- Vercel for the frontend
- Railway-compatible Dockerfile for the backend

## Architecture

```text
Browser
  |
  |  Next.js UI: upload or select sample scan
  v
client/
  |
  |  POST multipart/form-data to NEXT_PUBLIC_API_URL/predict
  v
server/
  |
  |  FastAPI validates file type and size
  |  Pillow converts image to grayscale, then RGB, then 224x224
  |  TensorFlow model returns a raw score
  v
JSON result: label, message, confidence, raw_score, threshold
```

The backend processes uploads in memory. It does not intentionally persist uploaded images.

## Repository Structure

```text
LungAI/
├── client/                         # Next.js frontend
│   ├── public/samples/              # Sample CT images used by the demo UI
│   └── src/
│       ├── app/                     # App Router pages
│       ├── components/              # Shared UI and site components
│       └── lib/                     # Frontend utilities
├── server/                         # FastAPI backend
│   ├── app.py                       # API, validation, preprocessing, inference
│   ├── Dockerfile                   # Railway-compatible backend image
│   ├── requirements.txt             # Python dependencies
│   └── models/
│       └── cancer_detection_model.h5
├── railway.json                     # Railway backend deployment config
├── LICENSE
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18 or newer
- npm
- Python 3.12 recommended
- Git

### 1. Clone the repository

```bash
git clone https://github.com/syedarman1/LungAI.git
cd LungAI
```

### 2. Start the backend

```bash
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

The API should be available at `http://127.0.0.1:8000`.

Check it:

```bash
curl http://127.0.0.1:8000/health
```

### 3. Start the frontend

Open another terminal:

```bash
cd client
npm install
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 npm run dev
```

The app should be available at `http://localhost:3000`.

## Environment Variables

### Frontend

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | No | `http://127.0.0.1:8000` | Base URL for the FastAPI backend. Used by the analyzer page when calling `/predict`. |

### Backend

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `LUNGAI_ALLOWED_ORIGINS` | No | `*` | Comma-separated list of allowed CORS origins. Use your frontend URL in production. |

Example production CORS setting:

```bash
LUNGAI_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

## API Reference

### `GET /health`

Returns service health and whether the model loaded.

Example:

```bash
curl http://127.0.0.1:8000/health
```

Response:

```json
{
  "status": "ok",
  "model_loaded": true
}
```

### `POST /predict`

Accepts one image file as multipart form data.

Constraints:

- Field name: `file`
- Supported extensions: `.jpg`, `.jpeg`, `.png`
- Maximum file size: 10 MB

Example:

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -F "file=@/path/to/scan.png"
```

Successful response:

```json
{
  "label": "cancer",
  "message": "Cancer detected. Please consult a medical professional.",
  "confidence": 0.9187,
  "raw_score": 0.9187,
  "threshold": 0.35
}
```

No-cancer response shape:

```json
{
  "label": "no_cancer",
  "message": "No cancer detected.",
  "confidence": 0.8421,
  "raw_score": 0.1579,
  "threshold": 0.35
}
```

Expected errors:

| Status | Cause |
| --- | --- |
| `400` | Unsupported extension or unreadable image |
| `413` | File exceeds 10 MB |
| `422` | Missing `file` form field |

## Model Behavior

The backend loads `server/models/cancer_detection_model.h5` at startup.

For each request, the service:

1. Validates the file extension.
2. Reads the file into memory.
3. Rejects files larger than 10 MB.
4. Opens the image with Pillow.
5. Converts it to grayscale, then back to RGB.
6. Resizes it to `224x224`.
7. Sends the resulting float32 image array to the Keras model.
8. Compares the raw model score against `THRESHOLD = 0.35`.

Classification logic:

```text
raw_score > 0.35  -> cancer
raw_score <= 0.35 -> no_cancer
```

The lower threshold is currently tuned for recall with the included EfficientNetB0-style model behavior. Treat this as experimental and re-evaluate it whenever the model or dataset changes.

## Deployment

### Backend on Railway

This repository includes:

- `server/Dockerfile`
- `railway.json`
- `/health` health-check endpoint

Railway is configured to build the backend from `server/Dockerfile` and run:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

Recommended Railway environment variable:

```bash
LUNGAI_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### Frontend on Vercel

Deploy the `client/` directory as the Vercel project root.

Set:

```bash
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
```

Then redeploy the frontend so the browser bundle receives the backend URL.

## Testing

Backend syntax check:

```bash
cd server
python -m py_compile app.py
```

Backend smoke test:

```bash
curl http://127.0.0.1:8000/health
```

Frontend checks:

```bash
cd client
npm run lint
npm run build
```

The repository does not currently include a full automated test suite. Contributions that add focused backend tests, frontend component tests, or end-to-end coverage are welcome.

## Contributing

Contributions are welcome. Good first areas include documentation, frontend polish, test coverage, deployment hardening, model evaluation utilities, and safer medical AI disclaimers.

Suggested workflow:

1. Fork the repository.
2. Create a branch from `main`.
3. Make a focused change.
4. Run the relevant checks from [Testing](#testing).
5. Open a pull request with a clear summary, screenshots for UI changes, and testing notes.

Pull requests should:

- Keep unrelated refactors separate.
- Avoid committing generated caches, local virtual environments, or private data.
- Include screenshots or screen recordings for visual changes.
- Document changes to API behavior or environment variables.
- Preserve the medical disclaimer and educational-use framing.

## Code of Conduct

Please keep discussions respectful, constructive, and focused on improving the project. Harassment, personal attacks, and discriminatory behavior are not welcome.

## Security

Do not upload private patient data, protected health information, or sensitive medical records to public deployments of this demo.

If you find a security issue, please avoid opening a public proof-of-concept exploit. Instead, contact the maintainer through GitHub or open a minimal issue requesting a private security discussion.

## Roadmap

- Add automated backend tests for `/health`, validation, and `/predict`.
- Add frontend tests for upload, sample selection, and error states.
- Add DICOM support with explicit metadata handling.
- Add model cards with dataset, metrics, known limitations, and evaluation methodology.
- Add reproducible training/evaluation scripts.
- Add CI for linting, builds, and backend smoke checks.
- Add stricter production CORS and request logging guidance.

## FAQ

### Can LungAI diagnose lung cancer?

No. LungAI is an educational demo and should never be used for diagnosis or clinical decision-making.

### What image formats are supported?

The backend currently accepts JPG, JPEG, and PNG files. DICOM support is not implemented yet.

### Are uploaded scans stored?

The backend processes files in memory and does not intentionally store uploads.

### Why does the frontend need `NEXT_PUBLIC_API_URL`?

The browser calls the FastAPI backend directly. In production, the frontend must know the public backend URL at build time.

### Where is the model?

The active model is stored at `server/models/cancer_detection_model.h5`.

## License

This project is licensed under the [MIT License](LICENSE).
