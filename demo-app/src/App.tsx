import { fr } from "@codegouvfr/react-dsfr";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

export default function App() {
    return (
        <>
            <Header
                brandTop={<>IGN<br />Géoplateforme</>}
                homeLinkProps={{ href: "/", title: "Accueil" }}
                serviceTitle="Demo stand"
                serviceTagline="Claude Code + react-dsfr"
            />
            <main className={fr.cx("fr-container", "fr-py-6w")}>
                <h1>Sandbox de démo</h1>
                <Alert
                    severity="info"
                    title="Prêt pour la démo"
                    description="Colle une URL de nœud Figma dans Claude Code et commence à implémenter."
                    className={fr.cx("fr-mb-4w")}
                />
                <Button>Exemple de bouton DSFR</Button>
            </main>
        </>
    );
}
