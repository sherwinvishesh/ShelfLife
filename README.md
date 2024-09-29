# ShelfLife: Save food, save money!
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
