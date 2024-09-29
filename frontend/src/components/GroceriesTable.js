import React, { useState, useEffect } from "react";


const GroceriesTable = () => {
 const [groceries, setGroceries] = useState([]);
 const [newGrocery, setNewGrocery] = useState({ name: "", amount: "", expiry: "" });


 // Fetch groceries from the backend
 const fetchGroceries = async () => {
   try {
     const response = await fetch("http://127.0.0.1:8000/groceries");
     const data = await response.json();
     setGroceries(data);
   } catch (error) {
     console.error("Error fetching groceries:", error);
   }
 };


 // Handle form submission to add a new grocery
 const handleAddGrocery = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch("http://127.0.0.1:8000/groceries", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newGrocery),
     });


     if (response.ok) {
       fetchGroceries(); // Refresh groceries list
       setNewGrocery({ name: "", amount: "", expiry: "" }); // Clear the form
     } else {
       console.error("Failed to add grocery");
     }
   } catch (error) {
     console.error("Error adding grocery:", error);
   }
 };


 // Fetch groceries when the component mounts
 useEffect(() => {
   fetchGroceries();
 }, []);


 return (
   <div>
     <h2>Groceries List</h2>
     <table border="1">
       <thead>
         <tr>
           <th>Name</th>
           <th>Amount</th>
           <th>Expiry Date</th>
         </tr>
       </thead>
       <tbody>
         {groceries.map((grocery, index) => (
           <tr key={index}>
             <td>{grocery.name}</td>
             <td>{grocery.amount}</td>
             <td>{grocery.expiry}</td>
           </tr>
         ))}
       </tbody>
     </table>


     <h2>Add New Grocery</h2>
     <form onSubmit={handleAddGrocery}>
       <div>
         <label>Name:</label>
         <input
           type="text"
           value={newGrocery.name}
           onChange={(e) => setNewGrocery({ ...newGrocery, name: e.target.value })}
           required
         />
       </div>
       <div>
         <label>Amount:</label>
         <input
           type="text"
           value={newGrocery.amount}
           onChange={(e) => setNewGrocery({ ...newGrocery, amount: e.target.value })}
           required
         />
       </div>
       <div>
         <label>Expiry Date:</label>
         <input
           type="date"
           value={newGrocery.expiry}
           onChange={(e) => setNewGrocery({ ...newGrocery, expiry: e.target.value })}
           required
         />
       </div>
       <button type="submit">Add Grocery</button>
     </form>
   </div>
 );
};


export default GroceriesTable;