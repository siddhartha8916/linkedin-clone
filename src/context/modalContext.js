import { createContext, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: false,
});

const ModalContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const value = { openModal, setOpenModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
