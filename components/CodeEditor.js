import { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleRunCode = async () => {
    console.log("Running code...");
    console.log("Language:", language);
    console.log("Code:", code);

    if (language === 'javascript') {
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
    } else {
      // For other languages, send code to the backend for execution
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      console.log("API Response:", data);
      if (!response.ok) {
        setOutput(data.error || 'An error occurred');
      } else {
        setOutput(data.output);
      }
    }
  };

  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        {/* Add other languages */}
      </select>

      <Editor
        height="50vh"
        language={language}
        value={code}
        onChange={setCode}
        theme="vs-dark"
      />
      <button onClick={handleRunCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;
