---
categories:
  - cloud
  - google cloud
  - data store
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez le nombre de requêtes, les temps d''exécution, les octets et les rangs téléchargés, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_big_query/'
draft: false
git_integration_title: google_cloud_big_query
has_logo: true
integration_id: google-cloud-bigquery
integration_title: Google BigQuery
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_big_query
public_title: "Intégration Datadog/Google\_BigQuery"
short_description: 'Surveillez le nombre de requêtes, les temps d''exécution, les octets et les rangs téléchargés, et plus encore.'
version: '1.0'
---
## Présentation

BigQuery est l'entrepôt de données entièrement géré et à faible coût de Google qui stocke des pétaoctets de données à des fins d'analyse.

Recueillez des métriques de Google BigQuery pour :

- Visualiser les performances de vos requêtes BigQuery
- Corréler les performances de vos requêtes BigQuery avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google BigQuery sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google BigQuery depuis Stackdriver vers le Pub/sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google BigQuery.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_big_query" >}}


### Événements

L'intégration Google BigQuery n'inclut aucun événement.

### Checks de service

L'intégration Google BigQuery n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/