---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Composer."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_composer/'
git_integration_title: google_cloud_composer
has_logo: true
integration_title: "Google\_Cloud\_Composer"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_composer
public_title: "Intégration Datadog/Google\_Cloud\_Composer"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Composer."
version: 1
---
## Présentation
Google Cloud Composer est un service d'orchestration de workflows entièrement géré qui vous permet de créer, de planifier et de surveiller vos pipelines dans plusieurs clouds ou des centres de données sur site.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Composer.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_composer" >}}


### Événements
L'intégration Google Cloud Composer n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Composer n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_composer/google_cloud_composer_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}