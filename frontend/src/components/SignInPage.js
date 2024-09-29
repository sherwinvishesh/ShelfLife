import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const SignInPage = () => {
 const [userID, setUserID] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();
 const [error, setError] = useState('');


 const handleLogin = (e) => {
   e.preventDefault();
   if (userID === 'user123' && password === 'pwd123') {
     navigate('/home'); // Navigate to home page
   } else {
     setError('Invalid credentials, please try again.');
   }
 };


 return (
   <Container>.
     <LoginBox>
       <Title>Welcome to ShelfLife</Title>
       <form onSubmit={handleLogin}>
         <InputLabel>UserID</InputLabel>
         <InputField
           type="text"
           value={userID}
           onChange={(e) => setUserID(e.target.value)}
           placeholder="Enter your UserID"
         />
         <InputLabel>Password</InputLabel>
         <InputField
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="Enter your Password"
         />
         {error && <ErrorMessage>{error}</ErrorMessage>}
         <ButtonGroup>
           <SubmitButton type="submit">Login</SubmitButton>
           <RegisterButton disabled>Register</RegisterButton> {/* Dummy Register button */}
         </ButtonGroup>
       </form>
     </LoginBox>
   </Container>
 );
};


export default SignInPage;


// Styled components for styling
const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 background-color: #e0f7e9; /* Light green background */
 font-family: 'Lato', sans-serif;
`;


const LoginBox = styled.div`
 background-color: #ffffff; /* White background */
 padding: 40px;
 border-radius: 10px;
 box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
 width: 300px;
 text-align: center;
`;


const Title = styled.h1`
 color: #2e7d32; /* Darker green */
 font-size: 24px;
 margin-bottom: 20px;
`;


const InputLabel = styled.label`
 font-size: 14px;
 color: #333;
 margin-bottom: 5px;
 display: block;
`;


const InputField = styled.input`
 width: 100%;
 padding: 10px;
 margin: 10px 0;
 border: 1px solid #ccc;
 border-radius: 5px;
 font-size: 16px;
 box-sizing: border-box;
`;


const ButtonGroup = styled.div`
 display: flex;
 justify-content: space-between;
 margin-top: 20px;
`;


const SubmitButton = styled.button`
 background-color: #2e7d32; /* Green */
 color: #fff;
 padding: 10px 20px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 font-size: 16px;
 transition: background-color 0.3s;


 &:hover {
   background-color: #1b5e20; /* Darker green on hover */
 }
`;


const RegisterButton = styled.button`
 background-color: #bdbdbd; /* Gray for disabled register button */
 color: #fff;
 padding: 10px 20px;
 border: none;
 border-radius: 5px;
 cursor: not-allowed;
 font-size: 16px;
`;


const ErrorMessage = styled.p`
 color: red;
 font-size: 14px;
 margin-top: 10px;
`;




