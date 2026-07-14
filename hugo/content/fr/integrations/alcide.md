---
categories:
  - log collection
  - Sécurité
description: Ingérer et traiter vos logs Alcide
doc_link: https://docs.datadoghq.com/integrations/alcide/
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md
has_logo: true
integration_title: Alcide
is_public: true
custom_kind: integration
name: alcide
public_title: Intégration Datadog/Alcide
short_description: Importer et traiter vos logs Alcide
version: '1.0'
integration_id: alcide
---
## Présentation

Alcide fournit des fonctionnalités d'audit de Kubernetes et de surveillance des anomalies. Grâce à cette intégration, Datadog peut ingérer et traiter les logs Alcide.

## Configuration

### Installation

Datadog active automatiquement un pipeline de traitement de logs lorsque des logs Alcide sont détectés. Vous n'avez donc rien à installer.

### Configuration

Dans Alcide, sélectionnez l'onglet _Integrations_ et accédez à la section _Detections Integrations Configuration_, qui vous permet de configurer des intégrations pour les logs comportant des informations sur les menaces.

1. Sélectionnez la cible **HTTP API**.

2. Dans le champ URL, saisissez `https://http-intake.logs.<SITE_DATADOG>/api/v2/logs?dd-api-key=<CLÉ_API_DATADOG>&ddsource=alcide`. Remplacez le paramètre fictif `<SITE_DATADOG>` par `datadoghq.com` pour le site américain ou par `datadoghq.eu` pour le site européen. Remplacez le paramètre fictif `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

3. Pour _Entities Types_, sélectionnez les types pour lesquels vous souhaitez transmettre des informations sur des menaces. Nous vous recommandons de sélectionner tous les types.

4. Pour _Detection Categories_, sélectionnez les catégories à transmettre. Nous vous recommandons de sélectionner _incidents_ et _anomalies_.

5. Pour _Detection Confidence_, sélectionnez les niveaux de confiance de votre choix. Nous vous recommandons de sélectionner au minimum les niveaux _high_ et _medium_.

6. Vous pouvez également créer des filtres d'inclusion et d'exclusion pour les entités, à l'aide des cases _Entities Matching_ et _Entities Not Matching_.

Accédez ensuite à la section _Selected Audit Entries Integration Configuration_, située sous la section précédente. Vous pourrez ainsi configurer des intégrations pour les logs d'audit.

1. Sélectionnez la cible **HTTP API**.

2. Dans le champ URL, saisissez `https://http-intake.logs.<SITE_DATADOG>/api/v2/logs?dd-api-key=<CLÉ_API_DATADOG>&ddsource=alcide`. Remplacez le paramètre fictif `<SITE_DATADOG>` par `datadoghq.com` pour le site américain ou par `datadoghq.eu` pour le site européen. Remplacez le paramètre fictif `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/help/