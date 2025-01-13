import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<string>('plaintext'); // Default language
  const [fileName, setFileName] = useState<string>(''); // User-entered filename

  useEffect(() => {
    let editor: monaco.editor.IStandaloneCodeEditor | null = null;

    if (editorRef.current) {
      // Create Monaco Editor instance
      editor = monaco.editor.create(editorRef.current, {
        value: '// Start coding here...',
        language: language,
        theme: 'vs-dark',
        automaticLayout: true,
      });
    }

    return () => {
      if (editor) {
        editor.dispose(); // Cleanup editor instance
      }
    };
  }, [language]); // Recreate editor when language changes

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFileName = event.target.value;
    setFileName(newFileName);

    // Extract file extension and map it to Monaco language
    const extension = newFileName.split('.').pop();
    const lang = getLanguageFromExtension(extension || '');
    setLanguage(lang);
  };

  // Map file extensions to Monaco Editor languages
  const getLanguageFromExtension = (extension: string): string => {
    const languageMap: { [key: string]: string } = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      cs: 'csharp',
      html: 'html',
      css: 'css',
      json: 'json',
      txt: 'plaintext',
    };
    return languageMap[extension.toLowerCase()] || 'plaintext';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* File Name Input */}
      <div style={{ padding: '10px', background: '#333', color: '#fff' }}>
        <label htmlFor="fileName" style={{ marginRight: '10px' }}>File Name:</label>
        <input
          id="fileName"
          type="text"
          value={fileName}
          onChange={handleFileNameChange}
          placeholder="Enter file name (e.g., index.js)"
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: 'none',
            width: '200px',
          }}
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        style={{ flex: 1, border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default Editor;
