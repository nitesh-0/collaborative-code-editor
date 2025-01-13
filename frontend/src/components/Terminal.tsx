import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = new Terminal({
        cursorBlink: true,
        theme: {
          background: '#1e1e1e',
          foreground: '#ffffff',
        },
      });

      terminal.open(terminalRef.current);

      let currentCommand = '';

      // Handle key data
      terminal.onData((input) => {
        if (input === '\r') { // Enter key pressed
          // Send command to backend
          fetch('http://localhost:3000/api/run-command', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Add this header
            },
            body: JSON.stringify({ command: currentCommand }),
          })
            .then((response) => response.json())
            .then((data) => {
              terminal.writeln(`\r\n${data.output}`);
            })
            .catch((err) => terminal.writeln(`\r\nError: ${err.message}`));          

          currentCommand = ''; // Reset the current command after sending
        } else if (input === '\u007f') { // Backspace
          currentCommand = currentCommand.slice(0, -1);
          terminal.write('\b \b');
        } else {
          currentCommand += input;
          terminal.write(input);
        }
      });

      terminal.writeln('Welcome to the online VSCode-like terminal!');
      return () => terminal.dispose();
    }
  }, []);

  return <div ref={terminalRef} className="terminal-container"></div>;
};

export default TerminalComponent;
