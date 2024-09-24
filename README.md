LungAI
Overview
LungAI is a web application designed to detect early signs of lung cancer by analyzing CT scans using a trained AI model. The platform uses state-of-the-art convolutional neural network (CNN) techniques to predict whether lung cancer is present in the uploaded scans. The primary goal of LungAI is to make early detection of lung cancer more accessible and user-friendly.

Note: This project is intended for educational and demonstration purposes. It should not be used as a substitute for professional medical advice.

Live Demo
Frontend (Vercel): https://lung-ai-beta.vercel.app/
Backend (FastAPI): [Coming soon once deployed]
Features
Upload CT scan images (.jpg, .png, .dcm formats).
AI-based lung cancer detection using a pre-trained deep learning model.
User-friendly interface with clear and concise instructions.
Results displayed immediately after the scan is analyzed.
Informational resources for lung cancer awareness and early detection.
Table of Contents
Technologies Used
Getting Started
Project Structure
Usage Instructions
Model Details
API Endpoints
Future Work
Contributing
License
Technologies Used
Frontend:
Next.js
React
Tailwind CSS
Backend:
FastAPI
TensorFlow
Uvicorn
Deployment:
Frontend on Vercel
Backend on AWS EC2 or similar
Getting Started
Prerequisites
Node.js and npm (for frontend)
Python 3.x (for backend)
Git
Virtual environment (for Python dependencies)
Clone the repository
bash
Copy code
git clone https://github.com/syedarman1/LungAI.git
cd LungAI
Frontend Setup (Next.js)
bash
Copy code
cd client
npm install
npm run dev
Backend Setup (FastAPI)
bash
Copy code
cd server
python3 -m venv venv
source venv/bin/activate  # MacOS/Linux
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app:app --reload
Project Structure
csharp
Copy code
LungAI/
├── client/                    # Frontend
│   ├── public/                # Static files
│   ├── src/                   # Source files
│   │   ├── app/               # Next.js pages and components
│   ├── package.json           # Frontend dependencies
│   └── tailwind.config.js     # TailwindCSS configuration
├── server/                    # Backend (FastAPI)
│   ├── models/                # Trained model (cancer_detection_model.h5)
│   ├── app.py                 # Main FastAPI app
│   ├── requirements.txt       # Backend dependencies
└── README.md                  # Project documentation
Usage Instructions
Frontend (User Guide)
Homepage: Learn about LungAI and its purpose.
Test Tab: Upload a CT scan image. Accepted formats are .jpg, .png, and .dcm.
Analyze: LungAI will process the image and display the prediction (whether cancerous or non-cancerous).
Result: View the result and further information about lung cancer.
Backend
The backend uses FastAPI to serve the model for predictions. The model is trained using CT scan data and is available as a .h5 file.

Once the backend is deployed, the frontend will send a request to the API to analyze uploaded CT scan images.

Model Details
The lung cancer detection model was built using a convolutional neural network (CNN) in TensorFlow/Keras. The model was trained on a dataset of lung CT scans, processed to the shape (224x224), and labels were encoded into binary classes (cancerous/non-cancerous).

Model Accuracy: ~91.69%

API Endpoints
The FastAPI backend exposes a single endpoint:

POST /predict: Upload a CT scan image for analysis.
Request: multipart/form-data with a file field containing the image.
Response: JSON with the prediction result.
Example request using curl:

bash
Copy code
curl -X POST "http://localhost:8000/predict" -F "file=@/path/to/ct_scan_image.jpg"
Future Work
Add user authentication for saving results.
Deploy the backend on AWS EC2 for remote accessibility.
Improve model accuracy by using additional datasets and fine-tuning.
Add visualization tools for interpreting predictions.
Add a feedback loop where users can label images to retrain the model.
Contributing
Contributions are welcome! Please follow the standard GitHub workflow for submitting pull requests.

Fork the repository.
Create a new branch.
Make your changes and test them.
Submit a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
