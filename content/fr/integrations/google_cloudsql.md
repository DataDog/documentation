---
categories:
  - cloud
  - data store
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez des métriques de base de données relatives aux performances, à la santé et à la réplication.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloudsql/'
draft: false
git_integration_title: google_cloudsql
has_logo: true
integration_title: Google CloudSQL
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloudsql
public_title: "Intégration Datadog/Google\_Cloud\_SQL"
short_description: 'Surveillez des métriques de base de données relatives aux performances, à la santé et à la réplication.'
version: '1.0'
---
## Présentation

Google Cloud SQL est un service de base de données entièrement géré qui vous permet de configurer, maintenir, gérer et administrer facilement vos bases de données MySQL dans le cloud.

Recueillez des métriques de Google Cloud SQL pour :

- Visualiser les performances de vos bases de données CloudSQL
- Corréler les performances de vos bases de données CloudSQL avec vos applications

## Configuration

### Installation

#### Collecte de métriques

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

#### Configuration

Pour recueillir des étiquettes CloudSQL personnalisées sous forme de tags, activez l'autorisation Cloud Asset Inventory.

#### Collecte de logs

Les logs Google Cloud SQL sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud SQL depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google Cloud SQL.
2. Cliquez sur **Create Sink** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloudsql" >}}


### Événements

L'intégration Google Cloud SQL n'inclut aucun événement.

### Checks de service

**gcp.cloudsql.database.state**
L'état de service actuel de l'instance Cloud SQL.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/