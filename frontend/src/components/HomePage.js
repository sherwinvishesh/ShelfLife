import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faAppleWhole, faSeedling, faCarrot, faLeaf, faPepperHot, faCow, faEgg,
   faBacon, faFish, faBreadSlice, faPlateWheat, faBowlRice, faBox,   // Changed faCan to faBox
   faCookie, faCandyCane, faBrain, faMugHot, faMartiniGlass, faBottleWater,
   faBeer, faCube, faDroplet, faPizzaSlice, faSnowflake, faLemon, faBoxTissue,  // Changed faPopcorn to faBoxTissue
   faXmark, faPlus, faUtensils 
} from '@fortawesome/free-solid-svg-icons';


import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const iconMap = {
   'Apple': faAppleWhole,
   'Banana': faAppleWhole,
   'Orange': faAppleWhole,
   'Strawberry': faSeedling, 
   'Blueberry': faSeedling,  
   'Grape': faAppleWhole,    
   'Pineapple': faAppleWhole,
   'Mango': faLemon,
   'Avacado': faLemon,
   'Potato': faCarrot,
   'Cherries': faAppleWhole,
   'Onion': faCarrot,
   'Garlic': faCarrot,
   'Carrot': faCarrot,
   'Spinach': faLeaf,
   'Lettuce': faLeaf,
   'Tomato': faAppleWhole,
   'Cucumber': faCarrot,
   'Broccoli': faLeaf,
   'Bell Pepper': faPepperHot,
   'Milk': faCow,
   'Yogurt': faCow,
   'Butter': faCow,
   'Cheese': faCow,
   'Eggs': faEgg,
   'Sour Cream': faCow,
   'Heavy Cream': faCow,
   'Cottage Cheese': faCow,
   'Chicken Breast': faEgg,
   'Ground Beef': faCow,
   'Bacon': faBacon,
   'Ham': faBacon,
   'Salmon': faFish,
   'Shrimp': faBacon,
   'Sausage': faBacon,
   'Turkey Breast': faBacon,
   'Pork': faFish,
   'Tuna': faFish,
   'White bread': faBreadSlice,
   'Whole Wheat Bread': faBreadSlice,
   'Totrtilla': faPlateWheat,
   'Bagels': faPlateWheat,
   'Rice': faBowlRice,
   'Pasta': faBowlRice,
   'Oats': faBowlRice,
   'Quinoa': faBowlRice,
   'Canned Tomato': faBox,       // Changed faCan to faBox
   'Canned Corn': faBox,         // Changed faCan to faBox
   'Black beans': faSeedling,
   'Kidney beans': faSeedling,
   'Canned Pea': faBox,          // Changed faCan to faBox
   'Canned Pineapple': faBox,    // Changed faCan to faBox
   'Canned Peaches': faBox,      // Changed faCan to faBox
   'Canned Tuna': faBox,         // Changed faCan to faBox
   'Canned Soup': faBox,         // Changed faCan to faBox
   'Canned Chicken': faBox,      // Changed faCan to faBox
   'Potato Chip': faCookie,
   'Popcorn': faBoxTissue,       // Changed faPopcorn to faBoxTissue
   'Pretzels': faCookie,
   'Crackers': faCookie,
   'Granola Bars': faCandyCane,
   'Chocolate Bars': faCandyCane,
   'Cookies': faCookie,
   'Almonds': faBrain,
   'Peanuts': faBrain,
   'Trail mix': faBrain,
   'Coffee': faMugHot,
   'Tea Bags': faMugHot,
   'Orange Juice': faMartiniGlass, 
   'Apple Juice': faMartiniGlass,  
   'Soda': faMartiniGlass,         
   'Bottled Water': faBottleWater,
   'Sparkling Water': faBottleWater,
   'Sports Drinks': faBottleWater,
   'Energy Drinks': faBottleWater,
   'Beer': faBeer,
   'All-Purpose-Flour': faCube,   
   'Sugar': faCube,               
   'Brown Sugar': faCube,         
   'Baking Powder': faCube,       
   'Baking Soda': faCube,         
   'Yeast': faCube,               
   'Olive Oil': faDroplet,
   'Vegetable Oil': faDroplet,
   'Salt': faCube,                
   'Black Pepper': faPepperHot,
   'Frozen Pizza': faPizzaSlice,
   'Frozen Vegetable': faCarrot,
   'Frozen Fruits': faSnowflake, 
   'Ice Cream': faSnowflake,      
   'Frozen Waffles': faSnowflake, 
   'Frozen Chicken Nuggets': faSnowflake,
   'Frozen Fish': faSnowflake,    
   'Frozen French Fries': faSnowflake,
   'Frozen Burritos': faSnowflake,
   'Dragon Fruits': faLemon,
   'Kiwi': faAppleWhole,
   'Watermelon': faAppleWhole,
   'Plum': faAppleWhole,
   'Blackberry': faSeedling,       
};




const HomePage = () => {
 const navigate = useNavigate();
 const [groceries, setGroceries] = useState([]);


 const sortGroceriesByExpiry = (groceries) => {
   return groceries.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));  // Sort by expiry date
 };
  useEffect(() => {
   const fetchGroceries = async () => {
     try {
       const response = await fetch('http://127.0.0.1:8000/groceries');
       const data = await response.json();
       const sortedGroceries = sortGroceriesByExpiry(data);  // Sort groceries
       setGroceries(sortedGroceries);  // Set sorted groceries
     } catch (error) {
       console.error('Error fetching groceries:', error);
     }
   };
   fetchGroceries();
 }, []);


 // Handle removing a grocery item
 const handleRemove = (index) => {
   const newGroceries = groceries.filter((_, i) => i !== index);
   setGroceries(newGroceries);
 };


 // Get the icon based on the grocery name
 const getGroceryIcon = (name) => {
   return iconMap[name] || faAppleWhole;  // Default to faAppleWhole if no match
 };


 // Navigate to the Add Groceries page
 const handleAddGroceries = () => {
   navigate('/add-groceries');
 };


 // Navigate to the MyChef page
 const handleMyChef = () => {
   navigate('/my-chef');
 };


 return (
   <Container>
     <Title>MyFridge</Title>
     <GroceryList>
       {groceries.map((grocery, index) => (
         <GroceryItem key={index}>
           <FontAwesomeIcon icon={getGroceryIcon(grocery.name)} size="lg" style={{ marginRight: '10px' }} />
           <GroceryInfo>
             <GroceryName>{grocery.name}</GroceryName>
             <GroceryDetails>{grocery.amount} | Exp: {grocery.expiry}</GroceryDetails>
           </GroceryInfo>
           <FontAwesomeIcon
             icon={faXmark}
             size="lg"
             style={{ marginLeft: 'auto', cursor: 'pointer' }}
             onClick={() => handleRemove(index)}
           />
         </GroceryItem>
       ))}
     </GroceryList>


     {/* Bottom Navigation Bar */}
     <BottomNav>
       <NavButton onClick={handleAddGroceries}>
         <FontAwesomeIcon icon={faPlus} size="lg" />
         <span>Add Groceries</span>
       </NavButton>
       <NavButton onClick={handleMyChef}>
         <FontAwesomeIcon icon={faUtensils} size="lg" />
         <span>MyChef</span>
       </NavButton>
     </BottomNav>
   </Container>
 );
};


export default HomePage;


// Styled components for styling
const Container = styled.div`
 font-family: 'Lato', sans-serif;
 padding: 20px;
 background-color: #e0f7e9;
 height: 100vh;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
`;


const Title = styled.h1`
 color: #2e7d32;
 font-size: 24px;
 text-align: center;
 margin-bottom: 20px;
`;


const GroceryList = styled.div`
 flex-grow: 1;
 overflow-y: auto;
 border: 1px solid #ccc;
 padding: 10px;
 border-radius: 8px;
 background-color: #fff;
`;


const GroceryItem = styled.div`
 display: flex;
 align-items: center;
 padding: 10px 0;
 border-bottom: 1px solid #eee;
`;


const GroceryInfo = styled.div`
 display: flex;
 flex-direction: column;
`;


const GroceryName = styled.span`
 font-size: 18px;
 font-weight: bold;
`;


const GroceryDetails = styled.span`
 font-size: 14px;
 color: #666;
`;


const BottomNav = styled.div`
 display: flex;
 justify-content: space-around;
 align-items: center;
 padding: 10px 0;
 background-color: #2e7d32;
 border-radius: 15px 15px 0 0;
 position: fixed;
 bottom: 0;
 left: 0;
 right: 0;
 height: 60px;
`;


const NavButton = styled.button`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 background: none;
 border: none;
 color: white;
 font-size: 12px;
 cursor: pointer;


 &:hover {
   color: #c8e6c9;
 }


 span {
   margin-top: 5px;
 }
`;
