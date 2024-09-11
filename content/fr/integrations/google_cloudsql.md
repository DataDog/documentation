---
categories:
- cloud
- data store
- google cloud
- log collection
dependencies: []
description: Surveillez des métriques de base de données relatives aux performances,
  à la santé et à la réplication.
doc_link: https://docs.datadoghq.com/integrations/google_cloudsql/
draft: false
git_integration_title: google_cloudsql
has_logo: true
integration_id: google-cloudsql
integration_title: Google Cloud SQL
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloudsql
public_title: Intégration Datadog/Google Cloud SQL
short_description: Surveillez des métriques de base de données relatives aux performances,
  à la santé et à la réplication.
version: '1.0'
---

## Présentation

Google Cloud SQL est un service de base de données entièrement géré qui vous permet de configurer, maintenir, gérer et administrer facilement vos bases de données SQL dans le cloud.

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

{{< site-region region="us3" >}}

La collecte de logs n'est plus prise en charge pour ce site.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Les logs Google Cloud SQL sont recueillis avec Google Cloud Logging et envoyés à un Cloud Pub/Sub via un forwarder Push HTTP. Si vous ne l'avez pas déjà fait, configurez un [Cloud Pub/Sub à l'aide d'un forwarder Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud SQL depuis Google Cloud Logging vers le Pub/Sub :

1. Accédez à la [page Google Cloud Logging][3] et filtrez les logs Google Cloud SQL.
2. Cliquez sur **Create Sink** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer

{{< /site-region >}}

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloudsql" >}}


### Événements

L'intégration Google Cloud SQL n'inclut aucun événement.

### Checks de service

**gcp.cloudsql.database.state**
L'état de service actuel de l'instance Cloud SQL.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/