import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';  // Import faXmark


const ChefOptions = () => {
 const navigate = useNavigate();
 const [groceries, setGroceries] = useState([]);
 const [quantities, setQuantities] = useState({});
 const [preference, setPreference] = useState('');
 const handleRemove = (name) => {
   const updatedGroceries = groceries.filter((grocery) => grocery.name !== name);
   setGroceries(updatedGroceries);  // Update groceries without the removed item


   const { [name]: _, ...updatedQuantities } = quantities;  // Remove from quantities state
   setQuantities(updatedQuantities);
 };


 // Fetch groceries from the backend (from fridge)
 // Fetch groceries from the backend (from fridge)
 useEffect(() => {
   const fetchGroceries = async () => {
     try {
       const response = await fetch('http://127.0.0.1:8000/groceries');
       const data = await response.json();
       setGroceries(data);
       // Initialize quantities for each grocery dynamically
       const initialQuantities = {};
       data.forEach((item) => (initialQuantities[item.name] = 1));  // Default quantity is 1
       setQuantities(initialQuantities);
     } catch (error) {
       console.error('Error fetching groceries:', error);  // Fixed the error here
     }
   };
   fetchGroceries();
 }, []);




 // Handle quantity increment
 const increaseQuantity = (name) => {
   setQuantities((prevQuantities) => ({
     ...prevQuantities,
     [name]: prevQuantities[name] + 1,
   }));
 };


 // Handle quantity decrement
 const decreaseQuantity = (name) => {
   setQuantities((prevQuantities) => ({
     ...prevQuantities,
     [name]: Math.max(prevQuantities[name] - 1, 1), // Minimum is 1
   }));
 };


 // Handle generate button click
 const handleGenerate = async () => {
   const selectedIngredients = groceries.map((item) => ({
     name: item.name,
     quantity: quantities[item.name],
   }));
    // Send the data to the backend
   try {
     const response = await fetch('http://127.0.0.1:8000/generate', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ ingredients: selectedIngredients, preference }),
     });
      const data = await response.json();
     navigate('/chef-chat', { state: { sentence: data.sentence } });  // Send the response to Page 6
   } catch (error) {
     console.error('Error:', error);
   }
 };


 // Handle back button
 const handleBack = () => {
   navigate('/home');
 };


 return (
   <Container>
     <BackButton onClick={handleBack}>
       <FontAwesomeIcon icon={faArrowLeft} size="lg" />
     </BackButton>


     <Title>Select the Ingredients</Title>


     {/* Display groceries with quantity selectors */}
     {/* Other components... */}
     {groceries.map((grocery) => (
       <GroceryItem key={grocery.name}>
         <GroceryName>{grocery.name}</GroceryName>
         <QuantityControl>
           <FontAwesomeIcon icon={faMinus} onClick={() => decreaseQuantity(grocery.name)} />
           <Quantity>{quantities[grocery.name]}</Quantity>
           <FontAwesomeIcon icon={faPlus} onClick={() => increaseQuantity(grocery.name)} />
           <FontAwesomeIcon icon={faXmark} onClick={() => handleRemove(grocery.name)} />  {/* X button */}
         </QuantityControl>
       </GroceryItem>
     ))}


     <InputLabel>What is your preference?</InputLabel>
     <PreferenceInput
       type="text"
       value={preference}
       onChange={(e) => setPreference(e.target.value)}
       placeholder="e.g., I want it spicy or I want Italian cuisine"
     />


     <GenerateButton onClick={handleGenerate}>Generate</GenerateButton>
   </Container>
 );
};


export default ChefOptions;


// Styled components
const Container = styled.div`
 display: flex;
 flex-direction: column;
 padding: 20px;
 font-family: 'Lato', sans-serif;
 height: 100vh;
`;


const BackButton = styled.div`
 align-self: flex-start;
 cursor: pointer;
`;


const Title = styled.h1`
 font-size: 24px;
 color: #2e7d32;
 text-align: center;
`;


const GroceryItem = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin: 10px 0;
`;


const GroceryName = styled.span`
 font-size: 18px;
`;


const QuantityControl = styled.div`
 display: flex;
 align-items: center;
`;


const Quantity = styled.span`
 font-size: 18px;
 margin: 0 10px;
`;


const InputLabel = styled.label`
 margin-top: 20px;
 font-size: 16px;
 color: #333;
`;


const PreferenceInput = styled.input`
 width: 100%;
 padding: 10px;
 margin-top: 10px;
 font-size: 16px;
 border: 1px solid #ccc;
 border-radius: 5px;
`;


const GenerateButton = styled.button`
 background-color: #2e7d32;
 color: white;
 padding: 15px;
 margin-top: 20px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 font-size: 18px;


 &:hover {
   background-color: #1b5e20;
 }
`;
