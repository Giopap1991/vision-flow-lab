import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload as UploadIcon, 
  Image as ImageIcon, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  file: File;
  preview: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  predictions?: {
    ctr: number;
    cvr: number;
  };
}

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach((fileData, index) => {
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.file === fileData.file && f.progress < 100
            ? { ...f, progress: Math.min(f.progress + 10, 100) }
            : f
        ));
      }, 200);

      // Simulate upload completion and processing
      setTimeout(() => {
        clearInterval(uploadInterval);
        setUploadedFiles(prev => prev.map(f => 
          f.file === fileData.file
            ? { ...f, status: 'processing', progress: 100 }
            : f
        ));

        // Simulate AI processing
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(f => 
            f.file === fileData.file
              ? { 
                  ...f, 
                  status: 'completed',
                  predictions: {
                    ctr: Math.random() * 5 + 1, // 1-6% CTR
                    cvr: Math.random() * 3 + 0.5 // 0.5-3.5% CVR
                  }
                }
              : f
          ));
        }, 2000);
      }, 2000);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const handleSubmit = () => {
    if (!projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a project name before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one image.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Project created!",
      description: `${uploadedFiles.length} creatives uploaded successfully.`,
    });

    // Reset form
    setProjectName("");
    setDescription("");
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Upload Creatives</h1>
        <p className="text-muted-foreground">Upload your creative assets for AI-powered analysis and optimization.</p>
      </div>

      {/* Project Details */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                placeholder="e.g., Summer Campaign 2024"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your campaign..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[38px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            <input {...getInputProps()} />
            <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-lg">Drop the files here...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg">Drag & drop your images here, or click to select</p>
                <p className="text-sm text-muted-foreground">
                  Supports: JPEG, PNG, GIF, WebP (max 10MB each)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {uploadedFiles.map((fileData, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={fileData.preview}
                      alt={fileData.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium truncate">{fileData.file.name}</h4>
                      <div className="flex items-center gap-2">
                        {fileData.status === 'uploading' && (
                          <Badge variant="secondary">
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Uploading
                          </Badge>
                        )}
                        {fileData.status === 'processing' && (
                          <Badge variant="secondary">
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Processing
                          </Badge>
                        )}
                        {fileData.status === 'completed' && (
                          <Badge className="gradient-primary text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {fileData.status === 'error' && (
                          <Badge variant="destructive">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Error
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileData.file)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {fileData.status === 'uploading' && (
                      <Progress value={fileData.progress} className="mb-2" />
                    )}
                    
                    {fileData.predictions && (
                      <div className="flex gap-4 text-sm">
                        <div className="text-muted-foreground">
                          Predicted CTR: <span className="font-medium text-primary">
                            {fileData.predictions.ctr.toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          Predicted CVR: <span className="font-medium text-primary">
                            {fileData.predictions.cvr.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          variant="hero"
          onClick={handleSubmit}
          disabled={uploadedFiles.length === 0 || !projectName.trim()}
        >
          Create Project
        </Button>
      </div>
    </div>
  );
}