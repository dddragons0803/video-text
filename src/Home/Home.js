import React, { useState } from 'react';
import video from '../video2.mp4';
import ConfigurationPanel from './ConfigurationPanel';
import TextBox from '../TextBox/TextBox';
import { Box, Flex } from "@chakra-ui/react";

const Home = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  const addTextBox = () => {
    const newTextBox = {
      id: Date.now(), // Unique ID
      x: 50, // Default X position
      y: 50, // Default Y position
      width: 200,
      height: 50,
      font: 'Poppins',
      fontSize: 36,
      style: [],
      fillColor: '#FF0000',
      strokeColor: '#000000',
      text: 'Edit me!',
    };
    setTextBoxes([...textBoxes, newTextBox]);
    setSelectedBoxId(newTextBox.id);
  };

  const updateTextBox = (id, updatedProperties) => {
    setTextBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === id ? { ...box, ...updatedProperties } : box))
    );
  };

  const deleteTextBox = (id) => {
    setTextBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
    setSelectedBoxId(null);
  };

  const handlePositionChange = (position) => {
    if (selectedBoxId) {
      updateTextBox(selectedBoxId, position);
    }
  };

  const handleSizeChange = (size) => {
    if (selectedBoxId) {
      updateTextBox(selectedBoxId, size);
    }
  };

  const handleFontChange = (font) => {
    if (selectedBoxId) {
      updateTextBox(selectedBoxId, { font });
    }
  };

  const handleFontSizeChange = (fontSize) => {
    if (selectedBoxId) {
        console.log(selectedBoxId)
      updateTextBox(selectedBoxId, { fontSize });
    }
  };

  const handleStyleChange = (style) => {
    if (selectedBoxId) {
      updateTextBox(selectedBoxId, { style });
    }
  };

  const handleColorChange = (fillColor) => {
    if (selectedBoxId) {
      updateTextBox(selectedBoxId, { fillColor });
    }
  };

  const handleStrokeChange = (strokeColor) => {
    if (selectedBoxId) {
      updateTextBox(selectedBoxId, { strokeColor });
    }
  };

  const handleUpdateText = (id, updatedProperties) => {
    updateTextBox(id, updatedProperties);
  };

  return (
    <Flex height="100vh" p={6}>
      <Box width="50vw" bg="gray.900" position="relative">
        <Box as="video" width="100%" height="auto" controls>
          <source src={video} type="video/mp4" />
        </Box>
        {/* Text boxes */}
        {textBoxes.map((box) => (
          <TextBox
            key={box.id}
            box={box}
            onDelete={() => deleteTextBox(box.id)}
            onSelect={() => setSelectedBoxId(box.id)}
            onUpdateText={handleUpdateText}
          />
        ))}
      </Box>
      <Box width="50vw" bg="white" p={4}>
        <ConfigurationPanel
          onAddTextBox={addTextBox}
          onPositionChange={handlePositionChange}
          onSizeChange={handleSizeChange}
          onFontChange={handleFontChange}
          onFontSizeChange={handleFontSizeChange}
          onStyleChange={handleStyleChange}
          onColorChange={handleColorChange}
          onStrokeChange={handleStrokeChange}
        />
      </Box>
    </Flex>
  );
};

export default Home;
