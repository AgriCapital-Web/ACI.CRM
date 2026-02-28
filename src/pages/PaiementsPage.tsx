import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBeneficiaires } from "@/data/mockData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { CreditCard, CheckCircle, Clock } from "lucide-react";

const PaiementsPage = () => {
  const totalRecu = mockBeneficiaires.filter(b => b.paiement1).length * 1000 + mockBeneficiaires.filter(b => b.paiement2).length * 3000;
  const totalAttente = mockBeneficiaires.filter(b => !b.paiement2).length * 3000;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Paiements</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalRecu.toLocaleString("fr-FR")} FCFA</p>
              <p className="text-xs text-muted-foreground">Total reçu</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-warning flex items-center justify-center">
              <Clock className="h-6 w-6 text-warning-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalAttente.toLocaleString("fr-FR")} FCFA</p>
              <p className="text-xs text-muted-foreground">En attente (livraison)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-success-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockBeneficiaires.filter(b => b.paiement1 && b.paiement2).length}</p>
              <p className="text-xs text-muted-foreground">Paiements complets</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matricule</TableHead>
                <TableHead>Bénéficiaire</TableHead>
                <TableHead>1er paiement (1 000 F)</TableHead>
                <TableHead>2e paiement (3 000 F)</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBeneficiaires.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs font-semibold text-primary">{b.id}</TableCell>
                  <TableCell className="font-medium text-sm">{b.nom} {b.prenoms}</TableCell>
                  <TableCell>
                    <Badge className={`border-0 text-[10px] ${b.paiement1 ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>
                      {b.paiement1 ? "Payé" : "En attente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`border-0 text-[10px] ${b.paiement2 ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}`}>
                      {b.paiement2 ? "Payé" : "En attente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-sm">
                    {((b.paiement1 ? 1000 : 0) + (b.paiement2 ? 3000 : 0)).toLocaleString("fr-FR")} F
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaiementsPage;
