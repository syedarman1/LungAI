# LungAI

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

```bash
git clone https://github.com/syedarman1/LungAI.git
cd LungAI
