# LungAI

## DISCLAIMER !!

**LungAI is intended for educational and demonstration purposes only.** The predictions made by the AI model should not be used for medical diagnosis, treatment, or as a substitute for professional medical advice. Lung cancer detection and diagnosis should always be performed by qualified healthcare professionals using certified medical tools and clinical assessments.

The developers of this project do not assume any liability for decisions made based on the output of this application. For any concerns related to lung cancer or any other health condition, please consult a licensed medical professional.


## Overview

**LungAI** is a web application designed to detect early signs of lung cancer by analyzing CT scans using a trained AI model. The platform uses state-of-the-art convolutional neural network (CNN) techniques to predict whether lung cancer is present in the uploaded scans. The primary goal of LungAI is to make early detection of lung cancer more accessible and user-friendly.

**Note:** This project is intended for educational and demonstration purposes. It should not be used as a substitute for professional medical advice.

### Live Demo

- **Frontend (Vercel)**: [LungAI Vercel Deployment](https://lung-ai-beta.vercel.app/)
- **Backend (FastAPI)**: [Coming soon once deployed]

## Features

- Upload CT scan images (.jpg, .png, .dcm formats).
- AI-based lung cancer detection using a pre-trained deep learning model.
- User-friendly interface with clear and concise instructions.
- Results displayed immediately after the scan is analyzed.
- Informational resources for lung cancer awareness and early detection.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage Instructions](#usage-instructions)
- [Model Details](#model-details)
- [API Endpoints](#api-endpoints)
- [Future Work](#future-work)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: 
  - [FastAPI](https://fastapi.tiangolo.com/)
  - [TensorFlow](https://www.tensorflow.org/)
  - [Uvicorn](https://www.uvicorn.org/)
- **Deployment**: 
  - Frontend on [Vercel](https://vercel.com/)
  - Backend on [AWS EC2](https://aws.amazon.com/ec2/)

## Getting Started

### Prerequisites

- **Node.js** and **npm** (for frontend)
- **Python 3.x** (for backend)
- **Git**
- **Virtual environment** (for Python dependencies)

### Clone the repository

git clone https://github.com/syedarman1/LungAI.git
cd LungAI

## Project Structure

LungAI/
├── client/                     # Frontend project (Next.js)
│   ├── src/
│   │   ├── app/                 # Application pages
│   │   ├── components/          # Shared components
│   │   └── globals.css          # Global CSS styles
├── server/                     # Backend project (FastAPI)
│   ├── app.py                   # FastAPI app and model inference logic
│   ├── models/                  # Pre-trained models and related files
└── README.md                    # Project documentation

## Usage Instructions

### Frontend Setup

Navigate to the `client/` directory:

cd client

Install dependencies:

npm install

Run the development server:

npm run dev

The application will run on http://localhost:3000.

To build the frontend for production:

npm run build

To start the frontend in production mode:

npm start

### Backend Setup

Navigate to the `server/` directory:

cd server

Create a virtual environment and activate it:

python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

Install the required Python dependencies:

pip install -r requirements.txt

Start the FastAPI server:

uvicorn app:app --reload

The server will be running on http://127.0.0.1:8000.

### Model Details

The pre-trained CNN model, `cancer_detection_model.h5`, is located in the `server/models/` directory. The model is used for image classification and returns whether a CT scan is cancerous or not.

- Input format: CT scans in `.jpg`, `.png`, or `.dcm` format.
- Output: A binary prediction indicating whether the scan shows signs of cancer.
- The AI model was trained on public datasets of lung CT scans using TensorFlow and Keras.

### API Endpoints

- **POST /predict**: Accepts an image file, processes it, and returns a prediction result (cancerous or not).

Example request:

curl -X POST "http://localhost:8000/predict" -F "file=@/path/to/your/image.png"

Example response:

{
  "prediction": "Cancerous"
}

### Future Work

- Improve the AI model accuracy by training with a larger dataset.
- Add user authentication to save prediction history.
- Expand the model to detect multiple stages of lung cancer.
- Implement more detailed prediction insights and a confidence score for predictions.
- Add integrations for importing medical data directly from healthcare systems.

### Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. You can also open an issue if you encounter any bugs or have feature suggestions.

### License

This project is licensed under the MIT License. You can view the full license here.
