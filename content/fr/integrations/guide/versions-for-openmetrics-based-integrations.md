---
description: Découvrez la différence entre les dernières versions (V2) et les anciennes
  versions (V1) des intégrations basées sur OpenMetrics.
kind: guide
title: Gestion des versions actuelles et anciennes pour les intégrations basées sur
  OpenMetrics
---

## Présentation

Certaines des intégrations de Datadog basés sur OpenMetrics, y compris lʼintégration générique OpenMetrics, prennent en charge deux modes de fonctionnement : dernière et ancienne. Ces deux modes s'accompagnent de valeurs par défaut et de paramètres de configuration différents.

Dernière version
: Datadog recommande d'utiliser la version `latest` et de se référer à la version `latest` de la documentation lors de la mise en place d'une intégration basée sur OpenMetrics à partir de zéro sur la dernière version de lʼAgent.

Ancienne version
: La version `legacy` n'est maintenue que pour des raisons de compatibilité ascendante, principalement pour permettre à lʼintégration de continuer à fonctionner après une mise à niveau de lʼAgent sans devoir modifier la configuration. </br></br> Si vous avez déjà mis en place une intégration basée sur OpenMetrics, il se peut que vous utilisiez l'ancienne version, auquel cas vous pouvez utiliser l'exemple de configuration `legacy` lié à la documentation comme référence. Datadog recommande de migrer vers la version `latest` lorsque c'est possible.

## Métriques dépendantes du mode

Les intégrations dotées des modes `latest` et `legacy` peuvent produire différents sous-ensembles de métriques, indiqués dans la documentation et dans les descriptions des métrique des apps comme OpenMetrics V2 (`latest`) et OpenMetrics V1 (`legacy`). 

En mode `latest`, les métriques sont envoyées par défaut avec une précision renforcée. De plus, leur comportement est plus proche des types de métriques Prometheus. Par exemple, les métriques Prometheus qui se terminent par `_count` et `_sum` sont envoyées en tant que `monotonic_count` par défaut.

Lorsque vous recherchez des noms de métrique sur le site Datadog ou que vous configurez des [dashboards][3] et des [monitors][4], veillez à utiliser des noms de métriques adaptés à votre version de lʼintégration.

## Modes dʼintégration basés sur OpenMetrics

Bien que cela puisse varier pour chaque intégration basée sur OpenMetrics, vous pouvez activer le mode `latest` en procédant de l'une des manières suivantes :

* En configurant `openmetrics_endpoint` pour un endpoint cible.
* En définissant la valeur de `use_openmetrics` sur true.

## Historique des dernières et des anciennes versions

<div class="alert alert-info">Datadog évite autant que possible d'introduire des changements radicaux dans les intégrations, afin que les utilisateurs puissent mettre à jour lʼAgent Datadog sans devoir apporter de grosses modifications à la configuration. Cet engagement en faveur de la rétrocompatibilité complique la résolution des problèmes de conception existants dans la configuration et le comportement par défaut.</div>

Étant donné que le format OpenMetrics est couramment utilisé pour exporter des métriques, de nombreuses intégrations se basent dessus. Ces intégrations partagent un ensemble d'options de configuration et de comportements par défaut. Datadog s'engage à fournir une expérience améliorée dans la version `latest` et à maintenir l'expérience originale dans la version `legacy`.  

Pour en savoir plus, consultez la documentation relative aux intégrations basées sur OpenMetrics.

[3]: /fr/dashboards/
[4]: /fr/monitors/