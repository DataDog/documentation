---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Filestore."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_filestore/'
git_integration_title: google_cloud_filestore
has_logo: true
integration_title: "Google\_Cloud\_Filestore"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_filestore
public_title: "Intégration Datadog/Google\_Cloud\_Filestore"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Filestore."
version: 1
---
## Présentation
Google Cloud Filestore est un service géré de stockage de fichiers destiné aux applications qui requièrent une interface de système de fichiers ainsi qu'un système de fichiers partagé pour les données.

Utilisez l'intégration Datadog Google Cloud Platform pour recueillir des métriques de Google Cloud Filestore.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_filestore" >}}


### Événements
L'intégration Google Cloud Filestore n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Filestore n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_file/google_cloud_filestore_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}