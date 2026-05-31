import React, { createContext, useContext, useState } from 'react';

type ModalType = 'demo' | 'coverage';

interface LeadModalContextType {
  isOpen: boolean;
  modalType: ModalType;
  openDemoModal: () => void;
  openCoverageModal: () => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export const LeadModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('demo');

  const openDemoModal = () => {
    setModalType('demo');
    setIsOpen(true);
  };

  const openCoverageModal = () => {
    setModalType('coverage');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <LeadModalContext.Provider value={{ isOpen, modalType, openDemoModal, openCoverageModal, closeModal }}>
      {children}
    </LeadModalContext.Provider>
  );
};

export const useLeadModal = () => {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider');
  }
  return context;
};
