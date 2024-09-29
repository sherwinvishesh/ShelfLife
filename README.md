# ShelfLife: Save food, Save money!
Each year, households waste billions of dollars due to forgotten groceries expiring. In the U.S. alone, 30-40% of the food supply is wasted, costing around $161 billion annually. This not only strains household budgets but also contributes to environmental issues, like increased greenhouse gas emissions and resource depletion.

**ShelfLife** is designed to help people track food expiration, reducing waste and promoting sustainable habits. Our app helps users manage their groceries efficiently by tracking expiration dates and sending timely notifications for items nearing expiry. Leveraging generative AI, the app also recommends recipes based on available ingredients and the user’s preferences, guiding them step-by-step through meal preparation.

This not only minimizes food waste but also enhances culinary convenience. ShelfLife aims to help users reduce food waste, save money, and make meal planning more convenient.

## Features
- **Grocery Tracking**: Add, view, and remove groceries with their expiration dates. Groceries are sorted by their expiration date to ensure users are notified about items that are expiring soon.
- **Image Recognition**: Use your device's camera to scan grocery items and identify them automatically using Google Gemini AI.
- **Recipe Generation**: Receive personalized recipe suggestions based on available ingredients and preferences using Google Gemini AI.
- **Notifications**: Get timely reminders when your groceries are nearing expiration to ensure you use them before they go to waste.
- **Sustainable Lifestyle**: Reduce food waste, save money, and promote eco-friendly habits with efficient grocery management and meal planning.




## User Interface
https://github.com/user-attachments/assets/89e50163-3055-4664-87b3-46b4e4d452a5


## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- Node.js and npm (for the frontend)
- Python 3.12+ (for the backend)
- FastAPI, Uvicorn (backend server), PIL (Python Imaging Library)
- Google Gemini AI API key (required for AI functionalities)

### Installation

#### Backend (FastAPI)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/sherwinvishesh/ShelfLife.git
   cd shelflife/backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file** in the `backend` directory:
   ```
   GEMINI_API_KEY='your-google-gemini-api-key-here'
   ```

5. **Run the backend server**:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend (React)
1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend development server**:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`.

### Usage
1. Open the app and sign in with the provided credentials.
2. Add groceries manually or use the camera to scan items.
3. View your grocery list, sorted by expiration date.
4. Get notifications for items about to expire and receive recipe suggestions based on available groceries.



## Technologies Used

1. **Frontend (React)**:
    - The user interacts with the app by adding groceries, taking pictures, or requesting recipe suggestions.
    - The app uses **React Router** for page navigation and **fetch API** to send HTTP requests to the backend.
    - **react-webcam** is used to capture images which are then sent to the backend for recognition.

2. **Backend (FastAPI)**:
    - The backend receives requests for different operations:
        - **Grocery Management**: Stores, retrieves, and removes grocery items from the in-memory database via `/groceries`.
        - **Image Recognition**: Accepts image data, processes it with PIL, and sends it to Gemini AI via `/identify`.
        - **Recipe Generation**: Takes user inputs like ingredients and preferences, sends them to Gemini AI for recipe generation via `/generate`.
    - **FastAPI** uses the **Generative AI SDK** to communicate with Google Gemini AI, sending prompts and receiving AI-generated responses.

3. **Google Gemini AI**:
    - **Image Recognition**: 
        - Receives the grocery image and identifies the item.
        - Sends back a recognized item from the accepted list of groceries (e.g., "apple").
    - **Recipe Generation**:
        - Receives selected ingredients and user preferences.
        - Returns AI-generated recipes with instructions based on the ingredients and preferences.

4. **Frontend Rendering**:
    - Once data is received from the backend (e.g., recognized grocery item or generated recipes), the frontend renders the content for the user.
    - **React Markdown** is used to render the recipes in a readable format.



## Contributing to ShelfLife


We welcome contributions from the community, especially those that enhance its AI capabilities. Feel free to fork the repository, make your improvements, and submit a pull request.


## License


This project is licensed under the Apache-2.0 license - see the [LICENSE](LICENSE) file for details.


## Acknowledgments


- Immense gratitude to `SunHacks` for hosting the hackathon that served as a launching pad for ShelfLife. Their commitment to nurturing innovation in the tech space has not only provided us with a platform to present our work but has also been a cornerstone of our development journey.


- Heartfelt thanks to all who visit and engage with ShelfLife. Your interest, usage, and feedback are the driving forces behind our continuous improvement and innovation. We're committed to delivering value and enhancing your financial management experience, inspired by your support and insights.


## Connect with Me


Feel free to reach out and connect with me on [LinkedIn](https://www.linkedin.com/in/sherwinvishesh) or [Instagram](https://www.instagram.com/sherwinvishesh/).






---


Made by Sherwin, Avi and Mayank.
