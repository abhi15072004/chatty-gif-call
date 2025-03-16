
type CustomPermissionName = 
  | 'camera' 
  | 'microphone' 
  | 'geolocation' 
  | 'notifications' 
  | 'persistent-storage' 
  | 'clipboard-read' 
  | 'clipboard-write'
  | 'contacts';

/**
 * Utility function to check for permissions
 */
export const checkPermission = async (permissionName: CustomPermissionName): Promise<PermissionStatus | null> => {
  // Check if the Permissions API is supported
  if (!navigator.permissions) {
    console.log(`Permissions API not supported`);
    return null;
  }

  try {
    // @ts-ignore - TypeScript doesn't recognize all permission types
    const status = await navigator.permissions.query({ name: permissionName });
    return status;
  } catch (error) {
    console.error(`Error checking permission '${permissionName}':`, error);
    return null;
  }
};

/**
 * Utility function to request permissions
 */
export const requestPermission = async (permissionName: CustomPermissionName): Promise<boolean> => {
  try {
    // Different permissions have different request methods
    switch (permissionName) {
      case 'camera':
        // @ts-ignore - TypeScript doesn't recognize all MediaDevices methods
        await navigator.mediaDevices.getUserMedia({ video: true });
        return true;
      
      case 'microphone':
        // @ts-ignore - TypeScript doesn't recognize all MediaDevices methods
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
      
      case 'geolocation':
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return true;
      
      case 'notifications':
        const notificationPermission = await Notification.requestPermission();
        return notificationPermission === 'granted';
      
      case 'contacts':
        // Mock contacts permission request for demo
        console.info('Simulating contacts permission request');
        return true;
      
      default:
        console.warn(`No specific request method for '${permissionName}' permission`);
        return false;
    }
  } catch (error) {
    console.error(`Error requesting permission '${permissionName}':`, error);
    return false;
  }
};

/**
 * Check if a feature is supported in the browser
 */
export const isFeatureSupported = (feature: string): boolean => {
  switch (feature) {
    case 'contacts':
      // In a real app, this would check for the Contacts API
      return true;
    
    case 'share':
      return !!navigator.share;
    
    case 'camera':
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    
    case 'microphone':
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    
    default:
      return false;
  }
};
