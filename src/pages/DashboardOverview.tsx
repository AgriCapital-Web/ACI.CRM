import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { mockStats, mockChartData, mockBeneficiaires } from "@/data/mockData";
import { Users, UserPlus, CreditCard, Truck, TrendingUp, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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

const DashboardOverview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Total bénéficiaires", value: mockStats.totalBeneficiaires.toLocaleString("fr-FR"), icon: Users, color: "text-primary" },
    { label: "Aujourd'hui", value: mockStats.enregistresAujourdhui, icon: UserPlus, color: "text-success" },
    { label: "En production", value: mockStats.cartesEnProduction, icon: Activity, color: "text-warning" },
    { label: "Cartes livrées", value: mockStats.cartesLivrees, icon: Truck, color: "text-info" },
    { label: "Paiements reçus", value: `${(mockStats.paiementsRecus / 1000).toLocaleString("fr-FR")}k FCFA`, icon: CreditCard, color: "text-primary" },
    { label: "Commerciaux actifs", value: mockStats.commerciauxActifs, icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue, {user?.prenoms}. Voici un aperçu de l'activité.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Enregistrements mensuels</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                <Bar dataKey="enregistrements" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Derniers enregistrements</h3>
            <div className="space-y-3">
              {mockBeneficiaires.slice(0, 5).map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 rounded px-2 -mx-2 transition-colors"
                  onClick={() => navigate(`/dashboard/beneficiaires/${b.id}`)}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{b.nom} {b.prenoms}</p>
                    <p className="text-xs text-muted-foreground">{b.profession} — {b.id}</p>
                  </div>
                  <Badge className={`text-[10px] ${statutColors[b.statut]} border-0`}>{statutLabels[b.statut]}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
