
import { useState, useEffect } from 'react';
import { requestPermission, PermissionStatus } from '@/utils/permissionsHandler';
import { toast } from '@/components/ui/use-toast';

// Contact type definition
export interface Contact {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  avatar?: string;
}

// Mock contacts - in a real app, these would come from the device contacts API
const mockContacts: Contact[] = [
  {
    id: 'c1',
    name: 'John Smith',
    phoneNumber: '+1 (555) 123-4567',
    email: 'john.smith@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
  },
  {
    id: 'c2',
    name: 'Alice Johnson',
    phoneNumber: '+1 (555) 987-6543',
    email: 'alice.j@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random',
  },
  {
    id: 'c3',
    name: 'Robert Davis',
    phoneNumber: '+1 (555) 456-7890',
    email: 'robert.d@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Davis&background=random',
  },
];

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');
  const [isLoading, setIsLoading] = useState(false);

  const requestContactsPermission = async () => {
    setIsLoading(true);
    try {
      const result = await requestPermission('contacts');
      setPermissionStatus(result.status);
      
      if (result.status === 'granted') {
        // In a real app, we would fetch actual contacts here
        // For now, we'll use mock data
        setContacts(mockContacts);
        toast({
          title: "Contacts loaded",
          description: `${mockContacts.length} contacts are now available`,
        });
      } else {
        toast({
          title: "Permission denied",
          description: "Cannot access contacts without permission",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
      toast({
        title: "Error accessing contacts",
        description: "Could not access your contacts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to import contacts to your app
  const importContact = (contact: Contact) => {
    // In a real app, this would add the contact to your app's database
    toast({
      title: "Contact imported",
      description: `${contact.name} has been added to your contacts`,
    });
    
    return contact;
  };

  return {
    contacts,
    permissionStatus,
    isLoading,
    requestContactsPermission,
    importContact,
  };
}
