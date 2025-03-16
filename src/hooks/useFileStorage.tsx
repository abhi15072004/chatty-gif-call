
import { useState } from 'react';
import { requestPermission, pickFile, PermissionStatus } from '@/utils/permissionsHandler';
import { toast } from '@/components/ui/use-toast';

export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: Date;
}

export function useFileStorage() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');
  const [isLoading, setIsLoading] = useState(false);

  const requestStoragePermission = async () => {
    setIsLoading(true);
    try {
      const result = await requestPermission('storage');
      setPermissionStatus(result.status);
      
      if (result.status === 'granted') {
        toast({
          title: "Storage access granted",
          description: "You can now upload and download files",
        });
      } else {
        toast({
          title: "Permission denied",
          description: "Cannot access storage without permission",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      toast({
        title: "Error accessing storage",
        description: "Could not access your device storage",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (options: { multiple?: boolean; accept?: string } = {}) => {
    setIsLoading(true);
    try {
      const selectedFiles = await pickFile(options);
      
      if (!selectedFiles) {
        return null;
      }
      
      // Process the files
      const newFiles: StoredFile[] = selectedFiles.map((file) => {
        // In a real app, you would upload the file to a server or store it properly
        // For now, we'll just create a temporary URL
        const url = URL.createObjectURL(file);
        
        return {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          url,
          createdAt: new Date(),
        };
      });
      
      // Add the new files to the state
      setFiles((prev) => [...prev, ...newFiles]);
      
      toast({
        title: `${newFiles.length} file(s) uploaded`,
        description: "Files have been successfully uploaded",
      });
      
      return newFiles;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Could not upload the selected files",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = (fileId: string) => {
    // Find the file to revoke the object URL first
    const fileToDelete = files.find(file => file.id === fileId);
    
    if (fileToDelete && fileToDelete.url.startsWith('blob:')) {
      URL.revokeObjectURL(fileToDelete.url);
    }
    
    // Remove the file from the state
    setFiles(files.filter(file => file.id !== fileId));
    
    toast({
      title: "File deleted",
      description: "The file has been removed",
    });
  };

  return {
    files,
    permissionStatus,
    isLoading,
    requestStoragePermission,
    uploadFile,
    deleteFile,
  };
}
