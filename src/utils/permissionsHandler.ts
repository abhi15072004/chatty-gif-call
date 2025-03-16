
/**
 * Permission handling utility for accessing device features
 */

// Permission status types
export type PermissionStatus = 'granted' | 'denied' | 'prompt' | 'unavailable';

// Available permission types
export type PermissionType = 'contacts' | 'storage' | 'camera' | 'microphone';

// Permission result interface
export interface PermissionResult {
  status: PermissionStatus;
  type: PermissionType;
}

/**
 * Request permission to access device features
 */
export const requestPermission = async (type: PermissionType): Promise<PermissionResult> => {
  // Check if browser supports permissions API
  if (!navigator.permissions) {
    console.warn('Permissions API not supported in this browser');
    return {
      status: 'unavailable',
      type
    };
  }

  try {
    // Map permission type to the correct permission name
    let permissionName: PermissionName;
    
    switch (type) {
      case 'contacts':
        // Not directly supported in all browsers, would need a contacts API
        console.log('Requesting contacts permission');
        return simulateContactsPermission();
      case 'storage':
        // For file system access
        return requestStorageAccess();
      case 'camera':
        permissionName = 'camera';
        break;
      case 'microphone':
        permissionName = 'microphone';
        break;
      default:
        throw new Error(`Unknown permission type: ${type}`);
    }

    // Request the permission
    const result = await navigator.permissions.query({ name: permissionName });
    
    return {
      status: result.state as PermissionStatus,
      type
    };
  } catch (error) {
    console.error(`Error requesting ${type} permission:`, error);
    return {
      status: 'unavailable',
      type
    };
  }
};

/**
 * Simulate contacts permission request (since it's not directly available in browsers)
 * In a real app, this would use a native plugin or capability
 */
const simulateContactsPermission = (): PermissionResult => {
  // In a real app with Capacitor or Cordova, we would use a proper plugin
  // For this demo, we'll simulate a permission dialog
  console.log('Simulating contacts permission request');
  
  return {
    status: 'granted', // Simulate granted permission
    type: 'contacts'
  };
};

/**
 * Request access to file system
 */
const requestStorageAccess = async (): Promise<PermissionResult> => {
  try {
    // Check if File System Access API is available
    if ('showDirectoryPicker' in window) {
      console.log('File System Access API is available');
      return {
        status: 'granted',
        type: 'storage'
      };
    } else {
      console.warn('File System Access API not supported in this browser');
      return {
        status: 'unavailable',
        type: 'storage'
      };
    }
  } catch (error) {
    console.error('Error checking storage access:', error);
    return {
      status: 'unavailable',
      type: 'storage'
    };
  }
};

/**
 * Pick a file from the device
 */
export const pickFile = async (options: { multiple?: boolean; accept?: string } = {}): Promise<File[] | null> => {
  try {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = options.multiple || false;
    
    if (options.accept) {
      input.accept = options.accept;
    }
    
    // Create a promise to handle the file selection
    return new Promise((resolve, reject) => {
      input.onchange = (event) => {
        const files = Array.from((event.target as HTMLInputElement).files || []);
        resolve(files.length > 0 ? files : null);
      };
      
      input.onerror = () => {
        reject(new Error('Error selecting file'));
      };
      
      // Trigger the file picker
      input.click();
    });
  } catch (error) {
    console.error('Error picking file:', error);
    return null;
  }
};
