---
categories:
  - cloud
  - data store
  - caching
  - azure
ddtype: crawler
dependencies: []
description: 'Surveillez les hits, miss, expulsions, clients connectés, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/azure_redis_cache/'
draft: false
git_integration_title: azure_redis_cache
has_logo: true
integration_title: Microsoft Azure Redis Cache
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_redis_cache
public_title: Intégration Datadog/Microsoft Azure Redis Cache
short_description: 'Surveillez les hits, miss, expulsions, clients connectés, et plus encore.'
version: '1.0'
---
## Présentation

Azure Redis Cache est un cache de données géré pour vos applications Azure.

Recueillez des métriques d'Azure Redis Cache pour :

- Visualiser les performances de vos caches Redis
- Corréler les performances de vos caches Redis avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_redis_cache" >}}


### Événements

L'intégration Azure Redis Cache n'inclut aucun événement.

### Checks de service

L'intégration Azure Redis Cache n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_redis_cache/azure_redis_cache_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/