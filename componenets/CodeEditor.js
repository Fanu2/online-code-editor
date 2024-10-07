// components/CodeEditor.js
import { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your JavaScript code here');
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    try {
      // Capture console logs
      const log = [];
      const originalLog = console.log;
      console.log = (message) => log.push(message);

      // Run the code
      eval(code);

      // Restore console and set output
      console.log = originalLog;
      setOutput(log.join('\n'));
    } catch (error) {
      setOutput(error.message);
    }
  };

  return (
    <div>
      <Editor
        height="50vh"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={setCode}
        theme="vs-dark"
      />
      <button onClick={handleRunCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;
