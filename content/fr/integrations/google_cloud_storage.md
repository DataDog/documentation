---
categories:
  - cloud
  - data store
  - google cloud
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de Google Cloud Storage.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_storage/'
git_integration_title: google_cloud_storage
has_logo: true
integration_title: "Google\_Storage"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_storage
public_title: "Intégration Datadog/Google\_Storage"
short_description: Surveillez des métriques clés de Google Cloud Storage.
version: '1.0'
---
## Présentation

Google Cloud Storage est une solution unifiée de stockage d'objets destinée aux développeurs et aux entreprises. Elle associe des fonctionnalités de diffusion de données en temps réel, d'analyse et de machine learning, d'archivage, etc.

Recueillez des métriques de Google Storage pour :

* Visualiser les performances de vos services Storage
* Corréler les performances de vos services Storage avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_storage" >}}


### Événements
L'intégration Google Cloud Storage n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Storage n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_storage/google_cloud_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}