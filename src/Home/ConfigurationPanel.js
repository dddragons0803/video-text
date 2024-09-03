import React, { useState } from 'react';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@radix-ui/react-select';
import { SketchPicker } from 'react-color';
import { Slider } from '@radix-ui/react-slider';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import {
    Box,
    Button,
    Input,
    Heading,
    Text,
    Flex,
    Select,
    IconButton,
    useColorModeValue,
  } from "@chakra-ui/react";
;
const ConfigurationPanel = ({
  onAddTextBox,
  onPositionChange,
  onSizeChange,
  onFontChange,
  onFontSizeChange,
  onStyleChange,
  onColorChange,
  onStrokeChange,
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 200, height: 50 });
  const [font, setFont] = useState('Poppins');
  const [fontSize, setFontSize] = useState(36);
  const [style, setStyle] = useState([]);
  const [fillColor, setFillColor] = useState('#FF0000');
  const [strokeColor, setStrokeColor] = useState('#000000');

  const handlePositionChange = (axis, value) => {
    setPosition((prev) => ({ ...prev, [axis]: value }));
    onPositionChange({ [axis]: value });
  };

  const handleSizeChange = (dim, value) => {
    setSize((prev) => ({ ...prev, [dim]: value }));
    onSizeChange({ [dim]: value });
  };

  const handleFontChange = (event) => {
    // console.log(value)
    const newFont = event.target.value;

    setFont(newFont);
    console.log(newFont)
    onFontChange(newFont);
  };

  const handleFontSizeChange = (event) => {
    const newSize = event.target.value;
    setFontSize(newSize);
    console.log(newSize)
    onFontSizeChange(newSize);
  };

  const handleStyleChange = (newStyle) => {
    setStyle((prevStyle) => {
      const updatedStyle = prevStyle.includes(newStyle)
        ? prevStyle.filter((s) => s !== newStyle)
        : [...prevStyle, newStyle];
      onStyleChange(updatedStyle);
      return updatedStyle;
    });
  };

  const handleColorChange = (color) => {
    setFillColor(color.hex);
    onColorChange(color.hex);
  };

  const handleStrokeChange = (color) => {
    setStrokeColor(color.hex);
    onStrokeChange(color.hex);
  };

  return (
    <Box
    bg={useColorModeValue("gray.50", "gray.700")}
    rounded="lg"
    p={6}
    shadow="md"
    maxW="sm"
    mx="auto"
  >
    {/* Add Text Button */}
    <Button
      colorScheme="blackAlpha"
      size="md"
      bg="black"
      color="white"
      width="100%"
      mb={6}
      onClick={onAddTextBox} 
    >
      Add Text
    </Button>

    {/* Position Section */}
    <Box mb={4}>
      <Heading as="h4" size="sm" mb={2}>
        Position
      </Heading>
      <Flex justify="space-between">
        <Input
          placeholder="X"
          value={position.x}
          onChange={(e) => handlePositionChange("x", +e.target.value)}
          size="sm"
          textAlign="center"
          width="45%"
        />
        <Input
          placeholder="Y"
          value={position.y}
          onChange={(e) => handlePositionChange("y", +e.target.value)}
          size="sm"
          textAlign="center"
          width="45%"
        />
      </Flex>
    </Box>

    {/* Size Section */}
    <Box mb={4}>
      <Heading as="h4" size="sm" mb={2}>
        Size
      </Heading>
      <Flex justify="space-between">
        <Input
          placeholder="Width"
          value={size.width}
          onChange={(e) => handleSizeChange("width", +e.target.value)}
          size="sm"
          textAlign="center"
          width="45%"
        />
        <Input
          placeholder="Height"
          value={size.height}
          onChange={(e) => handleSizeChange("height", +e.target.value)}
          size="sm"
          textAlign="center"
          width="45%"
        />
      </Flex>
    </Box>

    {/* Text Section */}
    <Box mb={4}>
      <Heading as="h4" size="sm" mb={2}>
        Text
      </Heading>
      <Flex justify="space-between">
        <Select
          value={font}
          onChange={handleFontChange}
          size="sm"
          width="45%"
        >
          <option value="Poppins">Poppins</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
        </Select>
        <Select
          value={fontSize}
          onChange={handleFontSizeChange}
          size="sm"
          width="45%"
        >
          <option value={24}>24</option>
          <option value={36}>36</option>
          <option value={48}>48</option>
        </Select>
      </Flex>
    </Box>

    {/* Style Section */}
    <Box mb={4}>
      <Heading as="h4" size="sm" mb={2}>
        Style
      </Heading>
      <Flex justify="space-around">
        <IconButton
          aria-label="Bold"
          icon={<Text fontWeight="bold">B</Text>}
          onClick={() => handleStyleChange("bold")}
            isActive={style.includes("bold")}
        />
        <IconButton
          aria-label="Italic"
          icon={<Text fontStyle="italic">I</Text>}
          onClick={() => handleStyleChange("italic")}
            isActive={style.includes("italic")}
        />
        <IconButton
          aria-label="Underline"
          icon={<Text textDecoration="underline">U</Text>}
          onClick={() => handleStyleChange("underline")}
            isActive={style.includes("underline")}
        />
      </Flex>
    </Box>

    {/* Fill Color Section */}
    <Flex mb={4} justify="space-between">
        {/* Fill Color Section */}
        <Box width="42%">
          <Heading as="h4" size="sm" mb={2}>
            Fill
          </Heading>
          <Box width="100%" maxWidth="200px"> {/* Adjust maxWidth here */}
            <SketchPicker
              color={fillColor}
              onChangeComplete={handleColorChange}
              width="100%"  // Make SketchPicker responsive
            />
          </Box>
        </Box>

        {/* Stroke Color Section */}
        <Box width="42%">
          <Heading as="h4" size="sm" mb={2}>
            Stroke
          </Heading>
          <Box width="100%" maxWidth="200px"> {/* Adjust maxWidth here */}
            <SketchPicker
              color={strokeColor}
              onChangeComplete={handleStrokeChange}
              width="100%"  // Make SketchPicker responsive
            />
          </Box>
        </Box>
      </Flex>
  </Box>
  );
};

export default ConfigurationPanel;
