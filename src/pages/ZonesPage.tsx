import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { mockGeographie } from "@/data/mockData";
import { MapPin } from "lucide-react";

const ZonesPage = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Zones géographiques</h1>
      <p className="text-muted-foreground">Gestion du découpage administratif en cascade</p>
    </div>

    <div className="space-y-4">
      {mockGeographie.districts.map((district) => {
        const regions = mockGeographie.regions.filter((r) => r.districtId === district.id);
        return (
          <Card key={district.id} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{district.nom}</h3>
                  <Badge variant={district.actif ? "default" : "secondary"} className={`text-[10px] border-0 ${district.actif ? "bg-success text-success-foreground" : ""}`}>
                    {district.actif ? "Actif" : "Inactif"}
                  </Badge>
                </div>
                <Switch checked={district.actif} />
              </div>

              {regions.length > 0 && (
                <div className="ml-8 space-y-2">
                  {regions.map((region) => {
                    const deps = mockGeographie.departements.filter((d) => d.regionId === region.id);
                    return (
                      <div key={region.id} className="border-l-2 border-border pl-4 py-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{region.nom}</span>
                            <Badge variant="secondary" className="text-[10px]">{region.actif ? "Actif" : "Inactif"}</Badge>
                          </div>
                          <Switch checked={region.actif} />
                        </div>
                        {deps.length > 0 && (
                          <div className="ml-4 mt-2 space-y-1">
                            {deps.map((dep) => (
                              <div key={dep.id} className="flex items-center justify-between border-l border-border pl-3 py-1">
                                <span className="text-sm text-muted-foreground">{dep.nom}</span>
                                <Switch checked={dep.actif} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default ZonesPage;
