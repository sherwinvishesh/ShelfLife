import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Page3 = () => {
  const webcamRef = useRef(null); // Ref for the webcam
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null); // State to store the captured image

  const captureImage = () => {
    const capturedImage = webcamRef.current.getScreenshot(); // Capture the image
    if (capturedImage) {
      setImageSrc(capturedImage); // Set the captured image in the state
      // Send the captured image to the backend
      fetch('http://127.0.0.1:8000/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: capturedImage }), // Send image to backend
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Recognized Item:", data.name);
          // Ensure the recognized name is valid before navigating
          if (data.name) {
            // Navigate to the entry edit page (Page 5) with the returned name
            navigate('/entry-edit', { state: { groceryName: data.name } });
          } else {
            console.error('No recognized grocery item.');
            // Handle the case where no grocery item is recognized
            alert('No recognized grocery item. Please try again or enter manually.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  
  
  

  // Handle manual entry navigation
  const handleManualEntry = () => {
    navigate('/entry-edit', { state: { groceryName: '' } });
  };

  // Handle back button to navigate back to Home Page
  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Container>
      {/* Back Button */}
      <BackButton onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </BackButton>

      {/* Camera Section */}
      {!imageSrc ? (
        <>
          <WebcamContainer>
            <StyledWebcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <CaptureButton onClick={captureImage} />
          </WebcamContainer>

          {/* Instruction Text */}
          <InstructionText>Click the picture of the grocery or</InstructionText>
        </>
      ) : (
        <>
          <CapturedImage src={imageSrc} alt="Captured" />
          <InstructionText>Image captured. Proceeding...</InstructionText>
        </>
      )}

      {/* Add Manually Button */}
      <ManualEntryButton onClick={handleManualEntry}>Add Manually</ManualEntryButton>
    </Container>
  );
};

export default Page3;

// Styled components for styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  font-family: 'Lato', sans-serif;
  padding: 20px;
`;

const BackButton = styled.div`
  align-self: flex-start;
  margin-bottom: 10px;
  cursor: pointer;
`;

const WebcamContainer = styled.div`
  width: 80%;
  max-width: 500px;
  aspect-ratio: 4 / 3;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
`;

const StyledWebcam = styled(Webcam)`
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Ensures the webcam feed fills the box */
  object-position: center;
`;

const CaptureButton = styled.button`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #2e7d32;
  cursor: pointer;

  &:hover {
    background-color: #1b5e20;
  }
`;

const CapturedImage = styled.img`
  width: 80%;
  max-width: 500px;
  margin-top: 20px;
  border: 2px solid #2e7d32;
  border-radius: 10px;
`;

const InstructionText = styled.p`
  font-size: 16px;
  color: #333;
  margin-top: 20px;
`;

const ManualEntryButton = styled.button`
  background-color: #f57f17;
  color: white;
  padding: 15px 30px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #e65100;
  }
`;
