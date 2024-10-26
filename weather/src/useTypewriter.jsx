import { useState, useEffect } from 'react';

/**
 * useTypewriter - A custom hook to simulate typewriter text effect
 *
 * @param {string} text - The text to type out
 * @param {number} speed - The typing speed in milliseconds (default: 50ms)
 * @returns {string} - The currently typed out portion of the text
 */
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState(''); // To store the typed out text
let i=0;
  useEffect(() => {
    // let i = 0; // Index to keep track of the current character being typed
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prevText => prevText + text.charAt(i)); // Add one character at a time
        i++;
      } else {
        clearInterval(typingInterval); // Stop when all characters are typed
      }
    }, speed);

    // Cleanup the interval on component unmount or when the text/speed changes
    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText; // Return the typed-out portion of the text
};

export default useTypewriter;
