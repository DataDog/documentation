---
categories:
  - log collection
  - Sécurité
dependencies: []
description: Ingérer et traiter vos logs Alcide
doc_link: 'https://docs.datadoghq.com/integrations/alcide/'
has_logo: true
integration_title: Alcide
is_public: true
kind: integration
name: alcide
public_title: Intégration Datadog/Alcide
short_description: Importer et traiter vos logs Alcide
version: 1
---
## Présentation

Alcide fournit des fonctionnalités d'audit de Kubernetes et de surveillance des anomalies. Grâce à cette intégration, Datadog peut ingérer et traiter les logs Alcide.

## Implémentation


### Installation

Datadog active automatiquement un pipeline de traitement de logs lorsque des logs Alcide sont détectés. Vous n'avez donc rien à installer.

### Configuration

Dans Alcide, sélectionnez l'onglet *Integrations* et accédez à la section *Detections Integrations Configuration*, qui vous permet de configurer des intégrations pour les logs comportant des informations sur les menaces.

1. Sélectionnez la cible **HTTP API**.

2. Dans le champ URL, saisissez `https://http-intake.logs.<SITE_DATADOG>/v1/input/<CLÉ_API_DATADOG>?ddsource=alcide`. Remplacez le paramètre fictif `<SITE_DATADOG>` par `datadoghq.com` pour le site américain ou par `datadoghq.eu` pour le site européen. Remplacez le paramètre fictif `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

3. Pour *Entities Types*, sélectionnez les types pour lesquels vous souhaitez transmettre des informations sur des menaces. Nous vous recommandons de sélectionner tous les types.

4. Pour *Detection Categories*, sélectionnez les catégories à transmettre. Nous vous recommandons de sélectionner *incidents* et *anomalies*.

5. Pour *Detection Confidence*, sélectionnez les niveaux de confiance de votre choix. Nous vous recommandons de sélectionner au minimum les niveaux *high* et *medium*.

6. Vous pouvez également créer des filtres d'inclusion et d'exclusion pour les entités, à l'aide des cases *Entities Matching* et *Entities Not Matching*.

Accédez ensuite à la section *Selected Audit Entries Integration Configuration*, située sous la section précédente. Vous pourrez ainsi configurer des intégrations pour les logs d'audit.

1. Sélectionnez la cible **HTTP API**.

2. Dans le champ URL, saisissez `https://http-intake.logs.<SITE_DATADOG>/v1/input/<CLÉ_API_DATADOG>?ddsource=alcide`. Remplacez le paramètre fictif `<SITE_DATADOG>` par `datadoghq.com` pour le site américain ou par `datadoghq.eu` pour le site européen. Remplacez le paramètre fictif `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://app.datadoghq.com/account/settings#api
[2]: /fr/help