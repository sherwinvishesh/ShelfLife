
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import google.generativeai as genai
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()


# FastAPI instance
app = FastAPI()


# Enable CORS for frontend-backend communication
app.add_middleware(
   CORSMiddleware,
   allow_origins=["*"],
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)


# Configure Google Gemini AI
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)


# In-memory database (empty initially)
groceries_db = []


# Pydantic model for groceries and chef requests
class GroceryItem(BaseModel):
   name: str
   amount: str
   expiry: str


class ChefRequest(BaseModel):
   ingredients: List[dict]  # List of selected ingredients with quantities
   preference: str  # User's preference (e.g., "I want Italian cuisine")


# Get all groceries
@app.get("/groceries", response_model=List[GroceryItem])
def get_groceries():
   return groceries_db


# Add a grocery to the in-memory database
@app.post("/groceries")
def add_grocery(item: GroceryItem):
   groceries_db.append(item)
   return {"message": "Grocery added successfully"}


# Generate recipe instructions using Google Gemini AI
# Generate recipe instructions using Google Gemini AI
@app.post("/generate")
def generate_recipes(chef_request: ChefRequest):
    # Combine selected ingredients into a sentence
    selected_ingredients = ', '.join(
        [f"{item['quantity']} {item['name']}" for item in chef_request.ingredients]
    )
    prompt = f"Give me 2-5 recipes using {selected_ingredients} and {chef_request.preference}"

    # Send the request to Google Gemini AI
    try:
        response = genai.GenerativeModel(
            model_name="gemini-1.5-pro"
        ).generate_content(prompt)

        # Print the entire response to inspect its structure
        print(f"Response from Gemini: {response}")

        # Placeholder for where the correct response extraction would go
        # Assuming the response contains a 'text' field (to be confirmed by inspecting the response)
        if hasattr(response, 'text'):
            recipe_instructions = response.text.strip()
        else:
            recipe_instructions = "No recipe generated"

        # Return the generated instructions
        return {"sentence": recipe_instructions}

    except AttributeError as e:
        print(f"Error in GenerativeModel: {e}")
        return {"error": "Something went wrong while generating the recipe"}, 500





# Run the FastAPI server with: uvicorn main:app --reload
