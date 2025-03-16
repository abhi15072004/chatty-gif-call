
import React, { useEffect } from 'react';
import { useContacts } from '@/hooks/useContacts';
import { useChat } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';
import { Contact, Phone, UserPlus, RefreshCw, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ContactsView: React.FC = () => {
  const { contacts, permissionStatus, isLoading, requestContactsPermission } = useContacts();
  const { addContact } = useChat();

  useEffect(() => {
    // Check if we have permission or should request it
    if (permissionStatus === 'prompt') {
      requestContactsPermission();
    }
  }, [permissionStatus, requestContactsPermission]);

  const handleImportContact = (contact: { name: string }) => {
    addContact(contact.name);
  };

  if (permissionStatus === 'denied') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <AlertCircle className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">Permission Required</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          To import your contacts, ABHI needs permission to access your device contacts.
        </p>
        <Button onClick={requestContactsPermission}>
          Grant Permission
        </Button>
      </div>
    );
  }

  if (permissionStatus === 'unavailable') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <AlertCircle className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">Contacts Not Available</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Contacts access is not supported in this browser or device.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fade-in">
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Device Contacts</h1>
          <Button 
            variant="outline" 
            size="icon"
            onClick={requestContactsPermission}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex items-center space-x-4 p-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        ) : contacts.length > 0 ? (
          <div className="space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={contact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}`}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                    </div>
                    {contact.phoneNumber && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {contact.phoneNumber}
                      </p>
                    )}
                    {contact.email && (
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.email}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleImportContact(contact)}
                    title="Import to ABHI"
                  >
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Contact className="w-14 h-14 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No Contacts Found</h2>
            <p className="text-muted-foreground mb-6">
              No contacts were found on your device or permission was not granted.
            </p>
            <Button onClick={requestContactsPermission}>
              Refresh Contacts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsView;
