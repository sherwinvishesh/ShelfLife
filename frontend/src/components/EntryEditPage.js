import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const EntryEditPage = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const groceryName = location.state?.groceryName || ''; // Get the name passed from Page 3, defaults to empty for manual entry


 const [name, setName] = useState(groceryName);
 const [quantity, setQuantity] = useState('');
 const [unit, setUnit] = useState('lbs'); // Default unit
 const [expiry, setExpiry] = useState('');


 const getTomorrowDate = () => {
   const today = new Date();
   const tomorrow = new Date(today);
   tomorrow.setDate(today.getDate() + 1);
   return tomorrow.toISOString().split('T')[0];  // Format YYYY-MM-DD
 };


 // Navigate back to the home page
 const handleBack = () => {
   navigate('/home');
 };


 // Function to send the entered grocery data to the backend
 const handleAddToFridge = async () => {
   const groceryData = {
     name,
     amount: `${quantity} ${unit}`,
     expiry,
   };


   // Send the data to the backend (FastAPI)
   try {
     const response = await fetch('http://127.0.0.1:8000/groceries', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(groceryData),
     });


     if (response.ok) {
       console.log('Grocery added successfully');
       navigate('/home'); // Navigate back to home after successful submission
     } else {
       console.error('Failed to add grocery');
     }
   } catch (error) {
     console.error('Error:', error);
   }
 };


 return (
   <Container>
     <BackButton onClick={handleBack}>Back</BackButton>


     {/* Name Input */}
     <InputLabel>Name</InputLabel>
     <NameInput
       type="text"
       value={name}
       onChange={(e) => setName(e.target.value)}
       placeholder="Enter grocery name"
     />


     {/* Quantity Input */}
     <InputLabel>Quantity</InputLabel>
     <QuantityInput
       type="number"
       value={quantity}
       onChange={(e) => setQuantity(e.target.value)}
       placeholder="Enter quantity"
     />


     {/* Unit Dropdown */}
     <InputLabel>Unit</InputLabel>
     <UnitSelect value={unit} onChange={(e) => setUnit(e.target.value)}>
       <option value="lbs">lbs</option>
       <option value="kgs">kgs</option>
       <option value="ounces">ounces</option>
       <option value="no">number of items</option>
     </UnitSelect>


     <Container>
     {/* Expiry Date Input */}
     <InputLabel>Expiry</InputLabel>
     <ExpiryInput
       type="date"
       value={expiry}
       min={getTomorrowDate()}  // Restrict to future dates
       onChange={(e) => setExpiry(e.target.value)}
     />
    
     {/* Other components */}
   </Container>


     {/* Add to Fridge Button */}
     <AddToFridgeButton onClick={handleAddToFridge}>
       Add to Fridge
     </AddToFridgeButton>
   </Container>
 );
};


export default EntryEditPage;


// Styled components for styling
const Container = styled.div`
 display: flex;
 flex-direction: column;
 padding: 20px;
 font-family: 'Lato', sans-serif;
`;


const BackButton = styled.button`
 align-self: flex-start;
 padding: 10px 20px;
 background-color: #f57f17;
 color: white;
 border: none;
 border-radius: 5px;
 cursor: pointer;


 &:hover {
   background-color: #e65100;
 }
`;


const InputLabel = styled.label`
 font-size: 16px;
 color: #333;
 margin-top: 15px;
`;


const NameInput = styled.input`
 padding: 10px;
 width: 100%;
 margin-top: 5px;
 font-size: 16px;
 border: 1px solid #ccc;
 border-radius: 5px;
`;


const QuantityInput = styled.input`
 padding: 10px;
 width: 100%;
 margin-top: 5px;
 font-size: 16px;
 border: 1px solid #ccc;
 border-radius: 5px;
`;


const UnitSelect = styled.select`
 padding: 10px;
 width: 100%;
 margin-top: 5px;
 font-size: 16px;
 border: 1px solid #ccc;
 border-radius: 5px;
`;


const ExpiryInput = styled.input`
 padding: 10px;
 width: 100%;
 margin-top: 5px;
 font-size: 16px;
 border: 1px solid #ccc;
 border-radius: 5px;
`;


const AddToFridgeButton = styled.button`
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
