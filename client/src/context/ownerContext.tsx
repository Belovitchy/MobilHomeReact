import { type ReactNode, createContext, useContext, useState } from "react";
import type { TypeOwner } from "../types/TypeFiles";

type OwnerContextType = {
  owner: TypeOwner | null; // Use null to indicate no owner is logged in
  setOwner: React.Dispatch<React.SetStateAction<TypeOwner | null>>; //
};
const OwnerContext = createContext<OwnerContextType | undefined>(undefined);

export function OwnerProvider({ children }: { children: ReactNode }) {
  const [owner, setOwner] = useState<TypeOwner | null>(null);

  return (
    <OwnerContext.Provider value={{ owner, setOwner }}>
      {children}
    </OwnerContext.Provider>
  );
}

export const useOwner = () => {
  const value = useContext(OwnerContext);
  if (!value) {
    throw new Error("useOwner must be used within an OwnerProvider");
  }
  return value;
};
