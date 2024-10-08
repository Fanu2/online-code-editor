// pages/index.js
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import CodeEditor to avoid SSR issues with Monaco Editor
const CodeEditor = dynamic(() => import('../components/CodeEditor'), { ssr: false });

export default function Home() {
  const [snippetUrl, setSnippetUrl] = useState('');

  // Function to handle saving code snippets
  const handleSaveSnippet = async (code) => {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    
    const result = await response.json();
    setSnippetUrl(`${window.location.origin}/snippets/${result.id}`);
  };

  return (
    <div>
      <h1>Online Code Editor</h1>
      <CodeEditor onSave={handleSaveSnippet} />

      {snippetUrl && (
        <p>
          Code snippet saved! Share it: <a href={snippetUrl}>{snippetUrl}</a>
        </p>
      )}
    </div>
  );
}
