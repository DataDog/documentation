---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_IoT"
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_iot/'
git_integration_title: google_cloud_iot
has_logo: true
integration_title: "Google\_Cloud\_IoT"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_iot
public_title: "Intégration Datadog/Google\_Cloud\_IoT"
short_description: "Surveillez des métriques clés de Google\_Cloud\_IoT."
version: 1
---
## Présentation
Cloud IoT est un service entièrement géré qui vous permet de connecter, de gérer et d'ingérer, de manière simple et sécurisée, des données provenant de millions d'appareils partout dans le monde.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud IoT.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_iot" >}}


### Événements
L'intégration Google Cloud IoT n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud IoT n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_iot/google_cloud_iot_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}