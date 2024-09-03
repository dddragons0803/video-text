import React ,{useState} from 'react';
import { Rnd } from 'react-rnd';
import { Box, IconButton,Textarea } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { red } from '@radix-ui/colors';

const TextBox = ({ box, onDelete, onSelect, onUpdateText }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(box.text);
    
    const handleTextChange = (e) => {
        setText(e.target.value);
      };
    
      const handleTextBlur = () => {
        onUpdateText(box.id, { text });
        setIsEditing(false);
      };
  return (
    <Rnd
      size={{ width: box.width, height: box.height }}
      position={{ x: box.x, y: box.y }}
      onDragStop={(e, d) => onSelect(box.id) && onSelect({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        onSelect(box.id);
        onSelect({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        });
      }}
      onClick={() => onSelect(box.id)}
      className="absolute cursor-pointer"
    >
     {isEditing ? (
        <Textarea
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          autoFocus
          style={{
            width: '100%',
            height: '100%',
            resize: 'none',
            fontFamily: box.font,
            fontSize: box.fontSize,
            fontWeight: box.style.includes('bold') ? 'bold' : 'normal',
            fontStyle: box.style.includes('italic') ? 'italic' : 'normal',
            textDecoration: box.style.includes('underline') ? 'underline' : 'none',
            color: box.fillColor,
            WebkitTextStroke: `1px ${box.strokeColor}`,
            border: 'none',
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <Box
          onClick={() => setIsEditing(true)}
          style={{
            fontFamily: box.font,
            fontSize: box.fontSize,
            fontWeight: box.style.includes('bold') ? 'bold' : 'normal',
            fontStyle: box.style.includes('italic') ? 'italic' : 'normal',
            textDecoration: box.style.includes('underline') ? 'underline' : 'none',
            color: box.fillColor,
            WebkitTextStroke: `1px ${box.strokeColor}`,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed gray',
            boxSizing: 'border-box',
          }}
        >
          {text}
        </Box>
      )}
<IconButton
        onClick={onDelete}
        aria-label="Delete"
        icon={<CloseIcon />}
        position="absolute"
        top={0}
        right={0}
        size="xs" 
        color="red"
        m={1}
        transition="opacity 0.3s ease"
      />
    </Rnd>
  );
};

export default TextBox;
