---
aliases:
- /fr/service_management/events/pipelines_and_processors/
description: Apprenez à utiliser Event Management Pipelines pour traiter et enrichir,
  à l'aide de processeurs, les événements provenant de diverses sources
further_reading:
- link: /events/
  tag: Documentation
  text: Event Management
- link: /events/correlation/
  tag: Documentation
  text: Event Correlation
title: Pipelines et processeurs
---
## Présentation {#overview}

Datadog Event Management Pipelines vous permet de traiter et de gérer efficacement les événements provenant de diverses sources. Avec les pipelines, vous pouvez appliquer diverses règles de traitement et des filtres pour personnaliser la manière dont les événements sont gérés. Les pipelines facilitent la gestion de grands volumes d'événements entrants de manière structurée.

Utilisez les pipelines pour :
- **Enrichir les événements** : Les pipelines peuvent ajouter du contexte ou des informations supplémentaires aux événements, notamment en leur attribuant des tags, en ajoutant des attributs personnalisés ou en les corrélant avec des métadonnées pertinentes, afin de les rendre plus informatifs et exploitables.
- **Normaliser les tags d'événement** : Vous pouvez configurer des règles pour remapper les tags afin que vos événements aient tous des tags standardisés.
- **Analyser les messages et les attributs en tant que tags** : Créez des règles grok personnalisées pour analyser le message complet ou un attribut spécifique de votre événement brut. Convertissez le contexte en tags et en attributs utilisables pour le suivi, auxquels vous pourrez vous référer lors d'une investigation.

Datadog Event Management Pipelines aide les organisations à simplifier leurs processus de surveillance, à améliorer la clarté de leurs informations opérationnelles et, en fin de compte, à réagir plus efficacement aux incidents et aux alertes.

## Fonctionnement {#how-it-works}

Avec les pipelines, les événements sont analysés et enrichis en passant successivement par une chaîne de processeurs. Cela extrait des informations ou des attributs significatifs à partir de texte semi-structuré. Chaque événement qui passe par les pipelines est testé par rapport à chaque filtre de pipeline. S'il correspond à un filtre, tous les processeurs sont appliqués séquentiellement avant de passer au pipeline suivant.

Les pipelines et les processeurs peuvent être appliqués à tous les événements et configurés dans [Event Management Pipelines][1].

## Créer un pipeline {#create-a-pipeline}

Créez un pipeline pour filtrer les événements qui vous intéressent, par exemple, une source ou un tag.

1. Accédez à [Event Management Pipelines][1] dans Datadog.
1. Cliquez sur {{< ui >}}Add a Pipeline{{< /ui >}}.
1. Choisissez un filtre dans le menu déroulant ou créez votre propre requête de filtre dans l'[Event Management Explorer][2] en sélectionnant l'icône `</>`. Utilisez le filtre pour appliquer des processeurs de pipeline à des événements spécifiques. **Remarque** : le filtrage du pipeline est appliqué avant tout processeur du pipeline. Vous ne pouvez pas filtrer sur un attribut qui est extrait dans le pipeline lui-même.
1. Nommez le pipeline.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

## Ajoutez un processeur {#add-a-processor}

Vous pouvez ajouter des processeurs après avoir créé un pipeline. Les processeurs disponibles sont :

- [Aggregation Key Processor][3]
- [Arithmetic Processor][4]
- [Date Remapper][5]
- [Category Processor][6]
- [Grok Parser][7]
- [Lookup Processor][8]
- [Remapper][9]
- [Service Remapper][10]
- [Status Remapper][11]
- [String Builder Processor][12]
- [VRL Processor][14]


## Autorisations de pipeline {#pipeline-permissions}

L'accès à Event Management Pipelines est contrôlé par deux autorisations :

- **`events_write_pipelines`** : Vous permet de créer, modifier et supprimer des pipelines, y compris de modifier leurs attributs tels que les requêtes de filtre et l'ordre des pipelines.
- **`events_write_processors`** : Vous permet de créer, modifier et supprimer des processeurs au sein d'un pipeline.

Les administrateurs peuvent attribuer ces autorisations à des rôles à l'aide de [Role Based Access Control][13] pour contrôler qui peut modifier la configuration des pipelines et des processeurs.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/settings/pipelines
[2]: https://app.datadoghq.com/event/explorer
[3]: /fr/events/pipelines_and_processors/aggregation_key
[4]: /fr/events/pipelines_and_processors/arithmetic_processor
[5]: /fr/events/pipelines_and_processors/date_remapper
[6]: /fr/events/pipelines_and_processors/category_processor
[7]: /fr/events/pipelines_and_processors/grok_parser
[8]: /fr/events/pipelines_and_processors/lookup_processor
[9]: /fr/events/pipelines_and_processors/remapper
[10]: /fr/events/pipelines_and_processors/service_remapper
[11]: /fr/events/pipelines_and_processors/status_remapper
[12]: /fr/events/pipelines_and_processors/string_builder_processor
[13]: /fr/account_management/rbac/permissions/
[14]: /fr/events/pipelines_and_processors/vrl_processor