
import React from 'react';
import { useFileStorage } from '@/hooks/useFileStorage';
import { Button } from '@/components/ui/button';
import { 
  FileIcon, 
  Upload, 
  Trash2, 
  File, 
  Image, 
  FileText, 
  Download, 
  AlertCircle 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const FileStorageView: React.FC = () => {
  const { 
    files, 
    permissionStatus, 
    isLoading, 
    requestStoragePermission, 
    uploadFile, 
    deleteFile 
  } = useFileStorage();

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="w-6 h-6" />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="w-6 h-6" />;
    } else {
      return <File className="w-6 h-6" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleUpload = async () => {
    if (permissionStatus !== 'granted') {
      await requestStoragePermission();
    }
    uploadFile({ multiple: true });
  };

  if (permissionStatus === 'denied') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <AlertCircle className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">Permission Required</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          To access your files, ABHI needs permission to access your device storage.
        </p>
        <Button onClick={requestStoragePermission}>
          Grant Permission
        </Button>
      </div>
    );
  }

  if (permissionStatus === 'unavailable') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <AlertCircle className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">Storage Access Not Available</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          File system access is not supported in this browser or device.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fade-in">
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">File Storage</h1>
          <Button 
            onClick={handleUpload}
            disabled={isLoading}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {files.length > 0 ? (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="p-4 rounded-xl border bg-card hover:bg-accent/10 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{file.name}</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDistanceToNow(file.createdAt, { addSuffix: true })}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                    >
                      <a href={file.url} download={file.name} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteFile(file.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <FileIcon className="w-14 h-14 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No Files</h2>
            <p className="text-muted-foreground mb-6">
              Upload files to see them here.
            </p>
            <Button onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileStorageView;
