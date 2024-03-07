import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon } from "@radix-ui/react-icons";

// Define the props expected by the Dropzone component
interface DropzoneProps {
  onChange: (files: Array<File>) => void;
  className?: string;
  fileExtension: string[];
}

// Create the Dropzone component receiving props
export function Dropzone({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneProps) {
  // Initialize state variables using the useState hook
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input element
  const [fileInfo, setFileInfo] = useState<File[]>([]); // Information about the uploaded file
  const [error, setError] = useState<string[]>([]); // Error message state

  // Function to handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  // Function to handle file input change event
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  // Function to handle processing of uploaded files
  const handleFiles = (files: FileList) => {
    const errors = [];
    const newFiles: File[] = [];
    for (const uploadedFile of files) {
      const [_, ext] = uploadedFile.type.split("/");
      // Check file extension
      if (fileExtension && !fileExtension.includes(ext)) {
        errors.push(
          `Invalid file type. Expected: .${fileExtension.join(", ")}`
        );
        continue;
      }
      newFiles.push(uploadedFile);
      setError([]); // Reset error state
    }

    if (errors.length) {
      setError(errors);
      return;
    }

    setFileInfo((current) => {
      return [...current, ...newFiles];
    });
    onChange([...fileInfo, ...newFiles]);
  };

  // Function to simulate a click on the file input element
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePreviewFile = (file: File) => {
    const urlObject = URL.createObjectURL(file);
    window.open(urlObject);
  };

  return (
    <Card
      className={`border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      {...props}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-center text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs"
            onClick={handleButtonClick}
            type="button"
          >
            Drag Files to Upload or Click Here
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={`${fileExtension.join(",")}`} // Set accepted file type
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />
        </div>
        <div className="flex flex-col gap-2">
          {fileInfo?.length
            ? fileInfo.map((info, index) => (
                <div className="flex flex-row gap-2 items-center">
                  <span key={index} className="text-green-500">
                    {info.name} - {Math.round(info.size / 1024)} KB
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreviewFile(info)}
                  >
                    <EyeOpenIcon />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newFiles = fileInfo.filter((_, i) => i !== index);
                      setFileInfo(newFiles);
                      onChange(newFiles);
                    }}
                  >
                    Clear{" "}
                  </Button>
                </div>
              ))
            : null}
        </div>

        {error?.length
          ? error.map((error, index) => (
              <span key={index} className="text-red-500">
                {error}
              </span>
            ))
          : null}
      </CardContent>
    </Card>
  );
}
