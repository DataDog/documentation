---
categories:
  - cloud
  - google cloud
  - data store
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez les performances de lecture/écriture de Datastore, le nombre de requêtes, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_datastore/'
draft: false
git_integration_title: google_cloud_datastore
has_logo: true
integration_title: Google Datastore
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_datastore
public_title: "Intégration Datadog/Google\_Datastore"
short_description: 'Surveillez les performances de lecture/écriture de Datastore, le nombre de requêtes, et plus encore.'
version: '1.0'
---
## Présentation

Cloud Datastore est une base de données NoSQL à haute évolutivité pour vos applications Web et mobiles.

Recueillez des métriques de Google Datastore pour :

- Visualiser les performances de vos datastores
- Corréler les performances de vos datastores avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud Datastore sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud Datastore depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google Cloud Datastore.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_datastore" >}}


### Événements

L'intégration Google Cloud Datastore n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Datastore n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_datastore/google_cloud_datastore_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/