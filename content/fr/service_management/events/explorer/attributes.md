---
disable_toc: false
further_reading:
- link: /service_management/events/explorer/facets
  tag: Documentation
  text: En savoir plus sur les facettes d'événement
- link: logs/processing/pipelines
  tag: Documentation
  text: Pipelines de traitement de logs
title: Attributs réservés
---

## Présentation

Les attributs servent à définir des facettes et des tags, qui permettent de filtrer et de rechercher des événements dans l'Events Explorer.

## Liste des attributs réservés

Cette liste décrit les attributs réservés qui sont automatiquement ingérés avec les événements.

| Attribut | Rôle                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | Le nom du host d'origine, tel que défini dans les métriques. Datadog récupère automatiquement les tags de host correspondants à partir du host associé dans Datadog et les applique ensuite à vos événements. L'Agent définit automatiquement cette valeur.                          |
| `source`  | Cet attribut correspond au nom de l'intégration, ou à la technologie à l'origine de l'événement. Lorsqu'il a pour valeur le nom d'une intégration, Datadog installe automatiquement les parsers et les facettes correspondants. Par exemple : `nginx`, `postgresql`, etc. |
| `status`  | Cela correspond au niveau ou à la gravité d'un événement.      |
| `service` | Le nom de l'application ou du service qui a généré les événements. |
| `message` | Par défaut, Datadog ingère la valeur de l'attribut `message` comme corps de l'entrée de l'événement. |   

Pour rechercher un tag qui possède la même clé qu'un attribut réservé, utilisez la syntaxe de recherche `tags`. Exemple : `tags:("status:<statut>")`

Pour créer une facette sur un tag qui possède la même clé qu'un attribut réservé, procédez comme suit :
1. Utilisez le [processeur de remappage][1] pour remapper sur un autre tag ou attribut.
2. Créez une [facette][2] sur le nouveau tag ou le nouvel attribut.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/processors/?tab=ui#remapper
[2]: /fr/service_management/events/explorer/facets