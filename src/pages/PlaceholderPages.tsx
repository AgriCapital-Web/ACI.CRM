import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

const PlaceholderPage = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    <Card className="shadow-card">
      <CardContent className="p-12 flex flex-col items-center justify-center text-center">
        <Icon className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-md">{description}</p>
      </CardContent>
    </Card>
  </div>
);

export const RapportsPage = () => (
  <PlaceholderPage title="Rapports" description="Rapports détaillés par zone, commercial, période. Export CSV et PDF disponibles." icon={BarChart3} />
);
export const ParametresPage = () => (
  <PlaceholderPage title="Paramètres" description="Configuration de la plateforme, gestion des métiers, paramètres système." icon={TrendingUp} />
);
