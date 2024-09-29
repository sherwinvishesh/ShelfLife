import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';  // Optional for HTML parsing in Markdown
import { useNavigate } from 'react-router-dom';  // Ensure you have this import at the top




const ChefChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sentence = location.state?.sentence || 'No recipe generated';

  return (
    <Container>
      {/* Add a header or title at the top */}
      <Header>
        <h1>Recipe Suggestions</h1>
        <p>Here are your personalized recipe suggestions based on the ingredients you selected!</p>
      </Header>

      <Message>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{sentence}</ReactMarkdown>
      </Message>
      <HomeButton onClick={() => navigate('/home')}>Go Back Home</HomeButton>
      </Container>
  );
};

export default ChefChat;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
`;

const Header = styled.div`
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
  text-align: center;
  background-color: #2e7d32;
  color: white;
  padding: 20px;
  border-radius: 10px;

  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin: 0;
  }
`;

const Message = styled.div`
  font-size: 18px;
  color: #333;
  text-align: left;
  width: 100%;
  max-width: 700px;
  line-height: 1.8;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  
  h1, h2, h3, h4 {
    color: #2e7d32;
    margin-bottom: 15px;
    font-weight: 700;
  }

  p {
    margin-bottom: 15px;
  }

  ul, ol {
    margin-left: 20px;
    margin-bottom: 15px;
    list-style-position: inside;
  }

  li {
    margin-bottom: 10px;
    line-height: 1.6;
  }

  strong {
    font-weight: bold;
    color: #2e7d32;
  }

  em {
    font-style: italic;
    color: #555;
  }

  pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
  }
`;

const HomeButton = styled.button`
  background-color: #2e7d32;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #1b5e20;
  }
`;
