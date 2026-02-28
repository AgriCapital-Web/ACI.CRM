import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { roleLabels, UserRole } from "@/contexts/AuthContext";
import { CheckCircle, XCircle, Clock, UserPlus } from "lucide-react";

const mockUtilisateurs = [
  { id: "1", nom: "KONÉ", prenoms: "Amadou", email: "dg@aci.ci", role: "dg" as UserRole, statut: "actif" },
  { id: "2", nom: "DIALLO", prenoms: "Fatou", email: "assistante@aci.ci", role: "assistante_dg" as UserRole, statut: "actif" },
  { id: "3", nom: "BAMBA", prenoms: "Aïssatou", email: "compta@aci.ci", role: "comptable" as UserRole, statut: "actif" },
  { id: "4", nom: "TRAORÉ", prenoms: "Ibrahim", email: "manager@aci.ci", role: "manager_national" as UserRole, statut: "actif" },
  { id: "5", nom: "SYLLA", prenoms: "Kadiatou", email: "rcom@aci.ci", role: "responsable_commercial" as UserRole, statut: "actif" },
  { id: "6", nom: "COULIBALY", prenoms: "Mariam", email: "chef@aci.ci", role: "chef_equipe" as UserRole, statut: "actif" },
  { id: "7", nom: "OUATTARA", prenoms: "Moussa", email: "commercial@aci.ci", role: "commercial" as UserRole, statut: "actif" },
  { id: "8", nom: "BAMBA", prenoms: "Lassina", email: "commercial2@aci.ci", role: "commercial" as UserRole, statut: "en_attente" },
  { id: "9", nom: "DOUMBIA", prenoms: "Sekou", email: "rcom2@aci.ci", role: "responsable_commercial" as UserRole, statut: "en_attente" },
];

const statutIcons: Record<string, React.ReactNode> = {
  actif: <CheckCircle className="h-4 w-4 text-success" />,
  en_attente: <Clock className="h-4 w-4 text-warning" />,
  suspendu: <XCircle className="h-4 w-4 text-destructive" />,
};

const UtilisateursPage = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Utilisateurs</h1>
        <p className="text-muted-foreground">Gestion des comptes et validation des accès</p>
      </div>
      <Button className="gradient-primary font-semibold">
        <UserPlus className="h-4 w-4 mr-2" /> Créer un compte
      </Button>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <p className="text-3xl font-bold text-foreground">{mockUtilisateurs.filter(u => u.statut === "actif").length}</p>
        <p className="text-xs text-muted-foreground">Actifs</p>
      </CardContent></Card>
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <p className="text-3xl font-bold text-warning">{mockUtilisateurs.filter(u => u.statut === "en_attente").length}</p>
        <p className="text-xs text-muted-foreground">En attente</p>
      </CardContent></Card>
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <p className="text-3xl font-bold text-foreground">{mockUtilisateurs.length}</p>
        <p className="text-xs text-muted-foreground">Total</p>
      </CardContent></Card>
    </div>

    <Card className="shadow-card">
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUtilisateurs.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.nom} {u.prenoms}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{roleLabels[u.role]}</Badge></TableCell>
                <TableCell><div className="flex items-center gap-1.5">{statutIcons[u.statut]}<span className="text-sm capitalize">{u.statut.replace("_", " ")}</span></div></TableCell>
                <TableCell>
                  {u.statut === "en_attente" && (
                    <div className="flex gap-1">
                      <Button size="sm" className="h-7 text-xs gradient-primary">Valider</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs text-destructive">Refuser</Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default UtilisateursPage;
