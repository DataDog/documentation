---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Memorystore pour Redis."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_redis/'
git_integration_title: google_cloud_redis
has_logo: true
integration_title: "Google\_Cloud\_Memorystore pour Redis"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_redis
public_title: "Intégration Datadog/Google\_Cloud\_Memorystore pour Redis"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Memorystore pour Redis."
version: 1
---
## Présentation
Google Cloud Memorystore pour Redis est un service de stockage de données en mémoire entièrement géré basé sur une infrastructure évolutive, sécurisée et hautement disponible.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud Memorystore pour Redis.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_redis" >}}


### Événements
L'intégration Google Cloud Memorystore pour Redis n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Memorystore pour Redis n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_redis/google_cloud_redis_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}