import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import Page3 from './components/Page3';
import EntryEditPage from './components/EntryEditPage';
import ChefOptions from './components/Page4ChefOptions';  // Page 4
import ChefChat from './components/Page6ChefChat';        // Page 6


function App() {
 return (
   <Router>
     <Routes>
       <Route path="/" element={<SignInPage />} />
       <Route path="/home" element={<HomePage />} />
       <Route path="/add-groceries" element={<Page3 />} />
       <Route path="/entry-edit" element={<EntryEditPage />} />
       <Route path="/my-chef" element={<ChefOptions />} /> {/* Page 4 */}
       <Route path="/chef-chat" element={<ChefChat />} />  {/* Page 6 */}
     </Routes>
   </Router>
 );
}


export default App;
