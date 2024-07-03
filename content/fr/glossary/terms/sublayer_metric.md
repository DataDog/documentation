---
core_product:
- apm
title: métrique de sous-couche
---
Une métrique de sous-couche correspond à la durée d'exécution d'un type ou dʼun service donné au sein d'une trace.

Certaines [métriques d'application de tracing][1] possèdent les tags `sublayer_service` et `sublayer_type`, qui vous permettent de calculer la durée d'exécution d'un service spécifique au sein d'une trace.

Les métriques de sous-couche ne sont disponibles que si un service possède des dépendances en aval. 

[1]: /fr/tracing/metrics/metrics_namespace/