---
categories:
- cloud
- data store
- google cloud
- log collection
dependencies: []
description: Surveillez des métriques clés de Google Cloud Memorystore pour Redis.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_redis/
draft: false
git_integration_title: google_cloud_redis
has_logo: true
integration_id: google-cloud-redis
integration_title: Google Cloud Memorystore pour Redis
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_redis
public_title: Intégration Datadog/Google Cloud Memorystore pour Redis
short_description: Surveillez des métriques clés de Google Cloud Memorystore pour
  Redis.
version: '1.0'
---

## Présentation

Google Cloud Memorystore pour Redis est un service de stockage de données en mémoire entièrement géré basé sur une infrastructure évolutive, sécurisée et hautement disponible.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud Memorystore pour Redis.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud Memorystore pour Redis sont recueillis avec Google Cloud Logging et envoyés à un Cloud Pub/Sub via un forwarder Push HTTP. Si vous ne l'avez pas déjà fait, configurez un [Cloud Pub/Sub à l'aide d'un forwarder Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud Memorystore pour Redis depuis Google Cloud Logging vers le Pub/Sub :

1. Accédez à la [page Google Cloud Logging][3] et filtrez les logs Google Cloud Memorystore pour Redis.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_redis" >}}


### Événements

L'intégration Google Cloud Memorystore pour Redis n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Memorystore pour Redis n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_redis/google_cloud_redis_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/