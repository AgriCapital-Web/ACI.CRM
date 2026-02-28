import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "dg" | "assistante_dg" | "comptable" | "manager_national" | "responsable_commercial" | "chef_equipe" | "commercial";

export interface User {
  id: string;
  nom: string;
  prenoms: string;
  email: string;
  telephone: string;
  role: UserRole;
  photo?: string;
  district?: string;
  region?: string;
  departement?: string;
  statut: "actif" | "en_attente" | "suspendu";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setMockRole: (role: UserRole) => void;
}

const mockUsers: Record<UserRole, User> = {
  dg: { id: "1", nom: "KONÉ", prenoms: "Amadou", email: "dg@aci.ci", telephone: "0545108044", role: "dg", statut: "actif", district: "District Autonome d'Abidjan" },
  assistante_dg: { id: "2", nom: "DIALLO", prenoms: "Fatou", email: "assistante@aci.ci", telephone: "0707070707", role: "assistante_dg", statut: "actif" },
  comptable: { id: "3", nom: "BAMBA", prenoms: "Aïssatou", email: "compta@aci.ci", telephone: "0303030303", role: "comptable", statut: "actif" },
  manager_national: { id: "4", nom: "TRAORÉ", prenoms: "Ibrahim", email: "manager@aci.ci", telephone: "0505050505", role: "manager_national", statut: "actif" },
  responsable_commercial: { id: "5", nom: "SYLLA", prenoms: "Kadiatou", email: "rcom@aci.ci", telephone: "0606060606", role: "responsable_commercial", statut: "actif", district: "District Autonome d'Abidjan", region: "Région des Lagunes" },
  chef_equipe: { id: "6", nom: "COULIBALY", prenoms: "Mariam", email: "chef@aci.ci", telephone: "0101010101", role: "chef_equipe", statut: "actif", district: "District Autonome d'Abidjan", region: "Région des Lagunes", departement: "Département d'Abidjan" },
  commercial: { id: "7", nom: "OUATTARA", prenoms: "Moussa", email: "commercial@aci.ci", telephone: "0202020202", role: "commercial", statut: "actif", district: "District Autonome d'Abidjan", region: "Région des Lagunes", departement: "Département d'Abidjan" },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (_email: string, _password: string) => {
    setUser(mockUsers.dg);
  };

  const logout = () => setUser(null);

  const setMockRole = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, setMockRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export const roleLabels: Record<UserRole, string> = {
  dg: "Directeur Général",
  assistante_dg: "Assistante DG",
  comptable: "Comptable",
  manager_national: "Manager Commercial National",
  responsable_commercial: "Responsable Commercial (R Com)",
  chef_equipe: "Chef d'équipe",
  commercial: "Commercial",
};
