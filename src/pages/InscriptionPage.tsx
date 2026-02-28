import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { UserRole, roleLabels } from "@/contexts/AuthContext";
import { mockGeographie } from "@/data/mockData";
import aciLogo from "@/assets/aci-logo.jpeg";

const registrableRoles: UserRole[] = ["responsable_commercial", "chef_equipe", "commercial"];

const InscriptionPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole | "">("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");
  const [departement, setDepartement] = useState("");
  const navigate = useNavigate();

  const filteredRegions = mockGeographie.regions.filter((r) => r.districtId === district);
  const filteredDepartements = mockGeographie.departements.filter((d) => d.regionId === region);

  const showDistrict = role === "responsable_commercial" || role === "chef_equipe" || role === "commercial";
  const showRegion = showDistrict;
  const showDepartement = role === "chef_equipe" || role === "commercial";
  const showSousPrefecture = role === "commercial";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-6">
      <Card className="w-full max-w-lg shadow-elevated border-0 animate-fade-in">
        <CardContent className="p-8">
          <div className="flex justify-center mb-4">
            <img src={aciLogo} alt="ACI" className="w-16 h-16 object-contain rounded-lg" />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Créer un compte</h2>
            <p className="text-muted-foreground mt-1">Votre compte sera soumis à validation par l'administration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input placeholder="KONÉ" required className="h-10" />
              </div>
              <div className="space-y-2">
                <Label>Prénom(s)</Label>
                <Input placeholder="Amadou" required className="h-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Adresse e-mail</Label>
              <Input type="email" placeholder="votre@email.ci" required className="h-10" />
            </div>

            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input type="tel" placeholder="07 XX XX XX XX" required className="h-10" />
            </div>

            <div className="space-y-2">
              <Label>Mot de passe</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Min. 8 caractères" required className="h-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rôle souhaité</Label>
              <Select onValueChange={(v) => { setRole(v as UserRole); setDistrict(""); setRegion(""); setDepartement(""); }}>
                <SelectTrigger className="h-10"><SelectValue placeholder="Choisir un rôle" /></SelectTrigger>
                <SelectContent>
                  {registrableRoles.map((r) => (
                    <SelectItem key={r} value={r}>{roleLabels[r]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showDistrict && (
              <div className="space-y-2 animate-fade-in">
                <Label>District</Label>
                <Select onValueChange={(v) => { setDistrict(v); setRegion(""); setDepartement(""); }}>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    {mockGeographie.districts.filter(d => d.actif).map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.nom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {showRegion && district && (
              <div className="space-y-2 animate-fade-in">
                <Label>Région</Label>
                <Select onValueChange={(v) => { setRegion(v); setDepartement(""); }}>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    {filteredRegions.map((r) => (
                      <SelectItem key={r.id} value={r.id}>{r.nom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {showDepartement && region && (
              <div className="space-y-2 animate-fade-in">
                <Label>Département</Label>
                <Select onValueChange={setDepartement}>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    {filteredDepartements.map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.nom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {showSousPrefecture && departement && (
              <div className="space-y-2 animate-fade-in">
                <Label>Sous-préfecture</Label>
                <Select>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp1">Sous-préfecture d'Abobo</SelectItem>
                    <SelectItem value="sp2">Sous-préfecture de Cocody</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full h-11 gradient-primary font-semibold mt-2">
              <UserPlus className="mr-2 h-4 w-4" />
              Soumettre l'inscription
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-primary hover:underline font-medium">
              Déjà inscrit ? Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InscriptionPage;
