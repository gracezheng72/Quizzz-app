# Quizzz App
This is a basic quiz app that allows users to take a quiz.

# Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- - Python (v3.9 or higher)
- Required Python packages:
  - `Flask==3.0.3`
  - `Flask-Cors==4.0.0`
  - `Flask-SQLAlchemy==3.1.1`

# Getting Started with Quizzz App
Follow these steps to set up and run the app locally.
1. Clone the repository:
   ```bash
   git clone https://github.com/gracezheng72/Quizzz-app

2. Start backend
   ```bash
   cd backend
   ```
   Download the necessary dependencies(if necessary):
   ```bash
   pip install -r requirements.txt
   ```
   💡 Note: If you encounter issues, make sure your `pip` is up-to-date by running:
   ```bash
   pip install --upgrade pip.
   ```
   ```bash
   python restapi.py
   ```

Open [http://127.0.0.1:8000/quiz](http://127.0.0.1:8000/quiz) to see quiz questions in JSON format in your browser.

3. Start frontend
   ```bash
   cd frontend
   npm start
   ```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

