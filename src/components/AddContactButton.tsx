
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { toast } from '@/components/ui/use-toast';

const AddContactButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const { addContact } = useChat();

  const handleAddContact = () => {
    if (newContactName.trim()) {
      addContact(newContactName.trim());
      setNewContactName('');
      setIsModalOpen(false);
      toast({
        title: "Contact added",
        description: `${newContactName} has been added to your contacts.`,
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-button flex items-center justify-center"
        aria-label="Add new contact"
      >
        <Plus className="w-5 h-5" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card border rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add New Contact</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Contact Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="Enter contact name"
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    autoFocus
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddContact}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddContactButton;
