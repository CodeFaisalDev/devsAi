"use client";

import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaRegCopy } from "react-icons/fa";
import { VscWordWrap } from "react-icons/vsc";

const CodeInput = ({ language, theme, code, onCodeChange }) => {
  const { toast } = useToast();
  const [wrap, setWrap] = useState(true);
  const [editorWidth, setEditorWidth] = useState("600px"); // Default width

  // Handle responsive resizing
  useEffect(() => {
    const updateEditorWidth = () => {
      if (window.innerWidth <= 640) {
        setEditorWidth("330px"); // Mobile width
      } else if (window.innerWidth > 1900) {
        setEditorWidth("700px"); // Large screen width
      } else {
        setEditorWidth("600px"); // Default width for other devices
      }
    };

    // Set initial width based on the screen size
    updateEditorWidth();

    // Add event listener to update width on window resize
    window.addEventListener("resize", updateEditorWidth);

    // Clean up the event listener
    return () => window.removeEventListener("resize", updateEditorWidth);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);

    toast({
      title: "Code Copied",
      description: "The code has been successfully copied to your clipboard.",
    });
  };

  return (
    <div>
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <MonacoEditor
          height="500px"
          width={editorWidth} // Dynamic width based on screen size
          language={language}
          value={code}
          theme={theme}
          fontSize={14}
          onChange={(value) => onCodeChange(value)}
          options={{
            wordWrap: wrap ? "on" : "off",
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontFamily: "JetBrains Mono, monospace",
          }}
        />
      </div>
      <div className="mt-5 flex justify-between">
        <Button variant="outline" onClick={() => setWrap(!wrap)}>
          <VscWordWrap />
        </Button>

        <Button variant="outline" onClick={copyToClipboard}>
          <FaRegCopy />
        </Button>
      </div>
    </div>
  );
};

export default CodeInput;
