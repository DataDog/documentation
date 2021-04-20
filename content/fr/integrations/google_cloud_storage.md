---
categories:
  - cloud
  - data store
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Storage."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_storage/'
draft: false
git_integration_title: google_cloud_storage
has_logo: true
integration_title: Google Storage
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_storage
public_title: "Intégration Datadog/Google\_Storage"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Storage."
version: '1.0'
---
## Présentation

Google Cloud Storage est une solution unifiée de stockage d'objets destinée aux développeurs et aux entreprises. Elle associe des fonctionnalités de diffusion de données en temps réel, d'analyse et de machine learning, d'archivage, etc.

Recueillez des métriques de Google Storage pour :

- Visualiser les performances de vos services Storage
- Corréler les performances de vos services Storage avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

#### Configuration

Pour recueillir des étiquettes Cloud Storage personnalisées sous forme de tags, activez l'autorisation Cloud Asset Inventory.

### Collecte de logs

Les logs Google Cloud Storage sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud Storage depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google Cloud Storage.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_storage" >}}


### Événements

L'intégration Google Cloud Storage n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Storage n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_storage/google_cloud_storage_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/