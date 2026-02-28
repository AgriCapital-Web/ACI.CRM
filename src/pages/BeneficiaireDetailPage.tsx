import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockBeneficiaires } from "@/data/mockData";
import { ArrowLeft, Printer, CreditCard, User } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import aciLogo from "@/assets/aci-logo.jpeg";

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

const BeneficiaireDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const beneficiaire = mockBeneficiaires.find((b) => b.id === id);

  if (!beneficiaire) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">Bénéficiaire introuvable</p>
          <Button variant="link" onClick={() => navigate("/dashboard/beneficiaires")}>Retour à la liste</Button>
        </div>
      </div>
    );
  }

  const b = beneficiaire;
  const qrData = JSON.stringify({ id: b.id, nom: b.nom, prenoms: b.prenoms, profession: b.profession });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/beneficiaires")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{b.nom} {b.prenoms}</h1>
          <p className="text-muted-foreground">{b.id} — {b.profession}</p>
        </div>
        <Badge className={`ml-auto ${statutColors[b.statut]} border-0`}>{statutLabels[b.statut]}</Badge>
      </div>

      {/* Infos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><User className="h-4 w-4" /> Informations personnelles</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Nom :</span><p className="font-medium">{b.nom}</p></div>
              <div><span className="text-muted-foreground">Prénom(s) :</span><p className="font-medium">{b.prenoms}</p></div>
              <div><span className="text-muted-foreground">Date de naissance :</span><p className="font-medium">{b.dateNaissance}</p></div>
              <div><span className="text-muted-foreground">Lieu de naissance :</span><p className="font-medium">{b.lieuNaissance}</p></div>
              <div><span className="text-muted-foreground">Sexe :</span><p className="font-medium">{b.sexe === "M" ? "Masculin" : "Féminin"}</p></div>
              <div><span className="text-muted-foreground">Nationalité :</span><p className="font-medium">{b.nationalite}</p></div>
              <div><span className="text-muted-foreground">Taille :</span><p className="font-medium">{b.taille} m</p></div>
              <div><span className="text-muted-foreground">Profession :</span><p className="font-medium">{b.profession}</p></div>
              <div className="col-span-2"><span className="text-muted-foreground">Domicile :</span><p className="font-medium">{b.domicile}</p></div>
              <div><span className="text-muted-foreground">Téléphone :</span><p className="font-medium">{b.telephone}</p></div>
              <div><span className="text-muted-foreground">Commercial :</span><p className="font-medium">{b.commercial}</p></div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3"><CreditCard className="h-4 w-4" /> Paiements</h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${b.paiement1 ? "bg-success" : "bg-muted"}`} />
                  <span className="text-sm">1er paiement (1 000 F) : {b.paiement1 ? "Payé" : "En attente"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${b.paiement2 ? "bg-success" : "bg-muted"}`} />
                  <span className="text-sm">2e paiement (3 000 F) : {b.paiement2 ? "Payé" : "En attente"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Aperçu de la Carte de Travail</h3>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-1" /> Imprimer
            </Button>
          </div>

          {/* RECTO */}
          <Card className="shadow-elevated border-2 border-primary/20 overflow-hidden">
            <div className="bg-gradient-to-r from-[hsl(var(--sidebar-background))] to-[hsl(var(--secondary))] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={aciLogo} alt="ACI" className="w-8 h-8 rounded object-contain bg-white p-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-primary-foreground">ASSOCIATION DES COMMERCIAUX IVOIRIENS</p>
                  <p className="text-[8px] text-primary-foreground/70">CARTE DE TRAVAIL — RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
                </div>
              </div>
              <p className="text-[9px] font-mono font-bold text-primary-foreground bg-primary/30 px-2 py-0.5 rounded">{b.id}</p>
            </div>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-30 bg-muted rounded-lg border border-border flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <div className="flex-1 text-xs space-y-1">
                  <p><span className="text-muted-foreground">Nom :</span> <span className="font-bold">{b.nom}</span></p>
                  <p><span className="text-muted-foreground">Prénom(s) :</span> <span className="font-bold">{b.prenoms}</span></p>
                  <p><span className="text-muted-foreground">Né(e) le :</span> <span className="font-semibold">{b.dateNaissance}</span> à <span className="font-semibold">{b.lieuNaissance}</span></p>
                  <p><span className="text-muted-foreground">Profession :</span> <span className="font-semibold">{b.profession}</span></p>
                  <p><span className="text-muted-foreground">Domicile :</span> <span className="font-semibold">{b.domicile}</span></p>
                  <p><span className="text-muted-foreground">Taille :</span> <span className="font-semibold">{b.taille} m</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* VERSO */}
          <Card className="shadow-elevated border-2 border-primary/20 overflow-hidden">
            <div className="bg-gradient-to-r from-[hsl(var(--sidebar-background))] to-[hsl(var(--secondary))] p-2 text-center">
              <p className="text-[10px] font-bold text-primary-foreground">VERSO — INFORMATIONS COMPLÉMENTAIRES</p>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 text-xs space-y-1.5">
                  <p><span className="text-muted-foreground">Nationalité :</span> <span className="font-semibold">{b.nationalite}</span></p>
                  <p><span className="text-muted-foreground">Sexe :</span> <span className="font-semibold">{b.sexe === "M" ? "Masculin" : "Féminin"}</span></p>
                  <p><span className="text-muted-foreground">Téléphone :</span> <span className="font-semibold">{b.telephone}</span></p>
                  <p><span className="text-muted-foreground">Date d'enregistrement :</span> <span className="font-semibold">{b.dateEnregistrement}</span></p>
                  <p><span className="text-muted-foreground">Commercial :</span> <span className="font-semibold">{b.commercial}</span></p>
                  <div className="pt-2 mt-2 border-t border-border">
                    <p className="text-[8px] text-muted-foreground italic">Ce document est la propriété de l'ACI. En cas de perte, veuillez le restituer.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <QRCodeSVG value={qrData} size={80} level="M" />
                  <p className="text-[8px] text-muted-foreground">Scanner pour vérifier</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaireDetailPage;
