---
description: Le triage a détecté des risques API dans les définitions, les passerelles
  et le trafic en direct.
title: API Findings
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

L'explorateur [API Findings][1] fournit une vue de triage centralisée des risques API détectés dans vos définitions, passerelles et trafic en direct. Les règles par défaut détectent les vulnérabilités et les erreurs de configuration courantes. Vous pouvez également ajouter des [règles personnalisées][2] pour des cas d'utilisation spécifiques.

Colonnes des **API Findings** :

- **Gravité :** Chaque problème est classé par risque.
- **Endpoints :** Indique combien de endpoints sont affectés et leurs services.
- **Statut et billetterie :** `Open` ou `In Progress` suit la progression de la remédiation et l'intégration du workflow.

Utilisez la facette **Service** pour voir les endpoints de chaque service afin d'identifier les responsables et de prioriser selon l'impact commercial.

## Opérations courantes :{#common-operations}

Cliquez sur une découverte pour afficher ses détails et effectuer un workflow tel que Valider > Enquêter > Corriger > Suivre :

1. Valider:
   - Examinez {{< ui >}}What Happened{{< /ui >}} et {{< ui >}}Detected In{{< /ui >}} pour confirmer que la détection est exacte (service, endpoint, méthode).
   - Dans {{< ui >}}Next Steps{{< /ui >}}, choisissez de {{< ui >}}Mute{{< /ui >}}, {{< ui >}}Create Ticket{{< /ui >}} ou {{< ui >}}Run Workflow{{< /ui >}} selon la propriété et l'impact.
2. Enquêter:
   - Utilisez l'onglet {{< ui >}}Context{{< /ui >}} pour examiner l'instantané et les attributs du endpoint (méthode, chemin, indicateurs d'authentification, balises).
   - {{< ui >}}Detected In{{< /ui >}} fournit des informations pour le routage de la propriété et de la remédiation.
   - Dans {{< ui >}}Detection Rule Query{{< /ui >}}, vous pouvez modifier une règle de découverte d'API en cliquant sur {{< ui >}}See Detection Rule{{< /ui >}}.
3. Corriger: 
   - Suivez les conseils sous {{< ui >}}Remediation{{< /ui >}}.
4. Suivi:
   - Utilisez {{< ui >}}Create Ticket{{< /ui >}} pour lier le problème à votre système de suivi.
   - Utilisez {{< ui >}}Reference Links{{< /ui >}} pour la formation des développeurs ou la revue de code.

## Remédiation {#remediation}

Datadog API Posture utilise [Bits Code][3] pour générer des correctifs de code pour les vulnérabilités.

1. Dans Datadog, accédez à [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Findings{{< /ui >}}][1].
2. Sélectionnez une découverte pour ouvrir un panneau latéral avec des détails sur la découverte et le endpoint affecté.
3. Dans la section **Étapes suivantes** > **Remédiation**, cliquez sur **Réparer avec Bits**.

Cela ouvre une session Bits Code pour corriger cette seule découverte d'API. Vous pouvez examiner le diff proposé, poser des questions complémentaires, modifier le correctif et créer une pull request pour appliquer la remédiation à votre dépôt de code source.
Affichez toutes les sessions Bits Code sur **Bits AI** > **Bits Code** > [**Sessions**][4].

### Détails de la session de remédiation {#remediation-session-details}

Chaque session Bits Code montre le cycle de vie d'un correctif généré par IA afin que vous puissiez examiner et valider les modifications avant la fusion. Elle inclut :

- La découverte de sécurité originale et la modification de code proposée
- Une explication de comment et pourquoi Bits Code a généré le correctif
- Les résultats CI (si activés) pour valider que le correctif est sûr à déployer
- Des options pour affiner le correctif ou **Créer une PR** pour appliquer les modifications à votre dépôt de code source

Pour ouvrir la session de remédiation, sélectionnez la découverte d'API depuis la page [**Findings**][1] pour ouvrir le panneau latéral, faites défiler jusqu'à la section **Remédiation**, et sélectionnez **Expand & Chat**.

Vous pouvez également consulter toutes les sessions de remédiation sur [**Sessions**][4].

[1]: https://app.datadoghq.com/security/appsec/inventory/finding
[2]: /fr/security/application_security/policies/custom_rules/
[3]: /fr/bits_ai/bits_code
[4]: https://app.datadoghq.com/code