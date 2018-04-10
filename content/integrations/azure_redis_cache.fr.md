---
categories:
- cloud
- data store
- caching
- azure
ddtype: crawler
description: Suivre les hits, misses, expulsions, des clients connectés et plus encore.
doc_link: https://docs.datadoghq.com/integrations/azure_redis_cache/
git_integration_title: azure_redis_cache
has_logo: true
integration_title: Microsoft Azure Redis Cache
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_redis_cache
public_title: Intégration Datadog-Microsoft Azure Redis Cache
short_description: Suivre les hits, misses, expulsions, des clients connectés et plus encore.
version: '1.0'
---

## Aperçu
Azure Redis Cache est un cache de données managé pour vos applications Azure.

Obtenir les métriques de Azure Redis Cache pour:

* Visualiser les performances de vos Caches Redis 
* Corréler les performances de vos caches Redis avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier][1]. Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_redis_cache" >}}


### Evénements
L'intégration Azure Redis Cache n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Azure Redis Cache n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][2].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][3]


[1]: https://docs.datadoghq.com/integrations/azure/
[2]: http://docs.datadoghq.com/help/
[3]: https://www.datadoghq.com/blog/
