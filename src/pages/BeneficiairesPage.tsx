import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Eye } from "lucide-react";
import { mockBeneficiaires } from "@/data/mockData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const statutColors: Record<string, string> = {
  enregistré: "bg-info text-info-foreground",
  en_production: "bg-warning text-warning-foreground",
  livré: "bg-success text-success-foreground",
};
const statutLabels: Record<string, string> = {
  enregistré: "Enregistré",
  en_production: "En production",
  livré: "Livré",
};

const BeneficiairesPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = mockBeneficiaires.filter((b) =>
    `${b.nom} ${b.prenoms} ${b.id} ${b.profession}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bénéficiaires</h1>
          <p className="text-muted-foreground">{mockBeneficiaires.length} bénéficiaires enregistrés</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Filtrer</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Exporter</Button>
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher par nom, matricule, profession..." className="pl-10 h-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Nom & Prénom(s)</TableHead>
                  <TableHead className="hidden md:table-cell">Profession</TableHead>
                  <TableHead className="hidden lg:table-cell">Domicile</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden sm:table-cell">Paiement</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((b) => (
                  <TableRow key={b.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/dashboard/beneficiaires/${b.id}`)}>
                    <TableCell className="font-mono text-xs text-primary font-semibold">{b.id}</TableCell>
                    <TableCell>
                      <p className="font-medium text-sm">{b.nom} {b.prenoms}</p>
                      <p className="text-xs text-muted-foreground">{b.sexe} — {b.dateNaissance}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{b.profession}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{b.domicile}</TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${statutColors[b.statut]} border-0`}>{statutLabels[b.statut]}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex gap-1">
                        <span className={`w-2 h-2 rounded-full ${b.paiement1 ? "bg-success" : "bg-muted"}`} />
                        <span className={`w-2 h-2 rounded-full ${b.paiement2 ? "bg-success" : "bg-muted"}`} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BeneficiairesPage;
