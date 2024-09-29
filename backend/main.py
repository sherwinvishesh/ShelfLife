import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import google.generativeai as genai
from dotenv import load_dotenv
from PIL import Image
import base64
import io


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




# List of valid grocery items
# VALID_GROCERIES = {
#     "Apple", "Banana", "Orange", "Strawberry", "Blueberry", "Grape", "Pineapple", "Mango",
#     "Avacado", "Potato", "Cherries", "Onion", "Garlic", "Carrot", "Spinach", "Lettuce", "Tomato", "Cucumber",
#     "Broccoli", "Bell Pepper", "Milk", "Yogurt", "Butter", "Cheese", "Eggs", "Sour Cream", "Heavy Cream",
#     "Cottage Cheese", "Chicken Breast", "Ground Beef", "Bacon", "Ham", "Salmon", "Shrimp", "Sausage",
#     "Turkey Breast", "Pork", "Tuna", "White bread", "Whole Wheat Bread", "Tortilla", "Bagels", "Rice", "Pasta",
#     "Oats", "Quinoa", "Canned Tomato", "Canned Corn", "Black beans", "Kidney beans", "Canned Pea", "Canned Pineapple",
#     "Canned Peaches", "Canned Tuna", "Canned Soup", "Canned Chicken", "Potato Chip", "Popcorn", "Pretzels", "Crackers",
#     "Granola Bars", "Chocolate Bars", "Cookies", "Almonds", "Peanuts", "Trail mix", "Coffee", "Tea Bags", "Orange Juice",
#     "Apple Juice", "Soda", "Bottled Water", "Sparkling Water", "Sports Drinks", "Energy Drinks", "Beer",
#     "All-Purpose-Flour", "Sugar", "Brown Sugar", "Baking Powder", "Baking Soda", "Yeast", "Olive Oil", "Vegetable Oil",
#     "Salt", "Black Pepper", "Frozen Pizza", "Frozen Vegetable", "Frozen Fruits", "Ice cream", "Frozen Waffles",
#     "Frozen Chicken Nuggets", "Frozen Fish", "Frozen French Fries", "Frozen Burritos", "Dragon Fruits", "Kiwi", "Watermelon", 
#     "Plum", "Blackberry"
# }

@app.post("/identify")
def identify_grocery(request: dict):
    try:
        image_data = request["image"]
        image_bytes = base64.b64decode(image_data.split(",")[1])

        # Save the image temporarily for Gemini AI
        temp_image_path = "temp_image.jpg"
        with open(temp_image_path, "wb") as f:
            f.write(image_bytes)

        # Open the saved image for Gemini AI
        with Image.open(temp_image_path) as img:
            prompt = "Identify this grocery item."
            response = genai.GenerativeModel("gemini-1.5-flash").generate_content([prompt, img])

            # Log the full response from Gemini AI to see what is being returned
            print("Gemini AI Response:", response)

            # Extract the recognized text from the response
            product_name = response.candidates[0].content.parts[0].text.strip().lower()

            # Handle variations like "rolled oats" → "oats"
            product_name = product_name.replace("rolled ", "").replace(".", "").strip()

            # Match the product name to your list of accepted items
            accepted_products = [
                "apple", "banana", "orange", "strawberry", "blueberry", "grape",
                "pineapple", "mango", "avocado", "potato", "cherries", "onion",
                "garlic", "carrot", "spinach", "lettuce", "tomato", "cucumber",
                "broccoli", "bell pepper", "milk", "yogurt", "butter", "cheese",
                "eggs", "sour cream", "heavy cream", "cottage cheese", "chicken breast",
                "ground beef", "bacon", "ham", "salmon", "shrimp", "sausage",
                "turkey breast", "pork", "tuna", "white bread", "whole wheat bread",
                "tortilla", "bagels", "rice", "pasta", "oats", "quinoa", "canned tomato",
                "canned corn", "black beans", "kidney beans", "canned pea", "canned pineapple",
                "canned peaches", "canned tuna", "canned soup", "canned chicken", "potato chip",
                "popcorn", "pretzels", "crackers", "granola bars", "chocolate bars", "cookies",
                "almonds", "peanuts", "trail mix", "coffee", "tea bags", "orange juice", "apple juice",
                "soda", "bottled water", "sparkling water", "sports drinks", "energy drinks", "beer",
                "all-purpose-flour", "sugar", "brown sugar", "baking powder", "baking soda", "yeast",
                "olive oil", "vegetable oil", "salt", "black pepper", "frozen pizza", "frozen vegetable",
                "frozen fruits", "ice cream", "frozen waffles", "frozen chicken nuggets", "frozen fish",
                "frozen french fries", "frozen burritos", "dragon fruits", "kiwi", "watermelon", "plum", "blackberry"
            ]

            if product_name in accepted_products:
                return {"name": product_name}
            else:
                return {"name": ""}

    except Exception as e:
        print(f"Error recognizing image: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing the image")
