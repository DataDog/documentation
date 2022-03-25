---
title: Débuter avec les tags
kind: documentation
description: Apprenez à assigner et utiliser des tags dans Datadog.
aliases:
  - /fr/getting_started/getting_started_with_tags
  - /fr/guides/getting_started/tagging/
  - /fr/developers/getting_started/tagging/
  - /fr/tagging
  - /fr/guides/tagging/
  - /fr/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
further_reading:
  - link: /getting_started/tagging/assigning_tags/
    tag: Documentation
    text: Apprendre à assigner des tags
  - link: /getting_started/tagging/unified_service_tagging/
    tag: Documentation
    text: Configurer le tagging de service unifié
  - link: /getting_started/tagging/using_tags/
    tag: Documentation
    text: Découvrir comment utiliser des tags dans l'application Datadog
---
## Introduction

Les tags sont conçus pour ajouter des caractéristiques aux données de télémétrie Datadog, afin de pouvoir les filtrer, les agréger et les comparer au sein de visualisations Datadog. Lorsque vous [utilisez des tags][1], vous pouvez observer les performances globales de plusieurs hosts et même affiner davantage les résultats selon des éléments spécifiques. En somme, les tags constituent un moyen d'observer des points de données agrégées.

Les tags relient différents types de données dans Datadog. Grâce à certaines clés de tag **réservées**, vous pouvez corréler différent(e)s métriques, traces et logs et déclencher des actions. Voici quelques exemples :

| Clé de tag   | Fonctionnalité                                                            |
| --------- | --------------------------------------------------------------------- |
| `host`    | Corrélation entre des métriques, des traces, des processus et des logs              |
| `device`  | Séparation de métriques, traces, processus et logs selon un appareil ou un disque |
| `source`  | Filtrage de spans et création automatisée de pipelines pour la gestion des logs     |
| `service` | Définition du contexte des données spécifiques à l'application pour l'ensemble des métriques, traces et logs |
| `env`     | Définition du contexte des données spécifiques à l'application pour l'ensemble des métriques, traces et logs |
| `version` | Définition du contexte des données spécifiques à l'application pour l'ensemble des métriques, traces et logs |

## Importance

Il est généralement conseillé d'étudier les données des conteneurs, machines virtuelles et de l'infrastructure dans le cloud dans leur ensemble, au niveau des services. Par exemple, il est plus pertinent de consulter l'utilisation de processeur d'un ensemble de hosts qui représentent un service, plutôt que d'analyser l'utilisation distincte d'un serveur A ou d'un serveur B.

Les conteneurs et les environnements cloud fouillent régulièrement parmi les hosts. Il est donc essentiel de les taguer pour permettre l'agrégation des métriques obtenues.

## Définition des tags

Voici quelques exigences en ce qui concerne l'utilisation de tags dans Datadog :

1. Les noms des tags doivent **commencer par une lettre**. Ils peuvent ensuite contenir les caractères suivants :

    - Des caractères alphanumériques
    - Des underscores
    - Des moins
    - Des virgules
    - Des points
    - Des barres obliques

    Les autres caractères spéciaux sont remplacés par des underscores.

    **Remarque** : le nom d'un tag ne peut pas se terminer par le caractère « : », comme `tag:`.

2. Les tags peuvent comporter **jusqu'à 200 caractères** et prennent en charge la norme Unicode (qui inclut la plupart des jeux de caractères, y compris les langues comme le japonais).
3. Les tags sont convertis en minuscules. Les tags `CamelCase` ne sont donc pas recommandés. Les intégrations reposant sur une authentification (crawler) convertissent les tags au format camel case en ajoutant des underscores. Par exemple, `TestTag` devient `test_tag`. **Remarque** : les tags `host` and `device` ne sont jamais convertis.
4. Un tag peut être au format `value` ou `<KEY>:<VALUE>`. Pour un fonctionnement optimal, **Datadog recommande de créer des tags au format `<KEY>:<VALUE>`.** `env`, `instance`, et `name` sont des clés de tag couramment utilisées. La clé précède toujours le caractère « : » de la définition globale du tag. Exemple :

    | Tag                | Clé           | Valeur          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

5. Les tags ne doivent pas provenir de sources illimitées, telles que des horodatages epoch, des ID d'utilisateur ou des ID de requête. Cela pourrait [accroître de façon significative le nombre de métriques][2] de votre organisation et augmenter vos frais.
6. Les limites (comme les minuscules) s'appliquent uniquement aux tags de métrique, et non aux attributs de logs ou aux tags de span.

## Assigner des tags

### Méthodes de tagging

Vous pouvez utiliser l'une (ou l'ensemble) des méthodes suivantes pour assigner des tags. Consultez la section [Assigner des tags][3] pour en savoir plus :

| Méthode                   | Assignation de tags                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [Fichiers de configuration][4] | Assignation manuelle dans les principaux fichiers de configuration de votre Agent ou des intégrations |
| [IU][5]                  | Sur le site Datadog                                             |
| [API][6]                 | Lors de l'utilisation de l'API Datadog                                        |
| [DogStatsD][7]           | Lors de l'envoi de métriques avec DogStatsD                          |

#### Tagging de service unifié

Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags. Cette fonctionnalité permet de lier les données de télémétrie Datadog entre elles via trois tags standard : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la section [Tagging de service unifié][8].

## Utiliser les tags

[Assignez des tags][3] au niveau des hosts et des [intégrations][9] pour pouvoir filtrer et regrouper vos métriques, traces et logs. Les tags peuvent être utilisés dans les sections suivantes de votre plateforme Datadog. Consultez la section [Utiliser les tags][1] pour en savoir plus.

| Section                 | Utilisation des tags                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [Événements][10]         | Filtrer le flux d'événements                                                                          |
| [Dashboards][11]     | Filtrer et regrouper des métriques sur des graphiques                                                               |
| [Infrastructure][12] | Filtrer et regrouper des données sur les vues de la hostmap, de la liste d'infrastructures, des live containers et des live processes |
| [Monitors][13]       | Créer et gérer des monitors ou gérer des downtimes                                             |
| [Métriques][14]        | Filtrer et regrouper des données avec le Metrics Explorer                                                        |
| [Intégrations][15]   | Définir des limites facultatives pour AWS, Google Cloud et Azure                                        |
| [APM][16]            | Filtrer les données Analytics ou accéder à d'autres sections avec la Service Map                                 |
| [Notebooks][17]      | Filtrer et regrouper des métriques sur des graphiques                                                               |
| [Logs][18]           | Filtrer la recherche de logs, les analyses, les patterns, le live tailing et les pipelines                                |
| [SLO][19]           | Rechercher des SLO ainsi que des SLO groupés basés sur des métriques ou sur des monitors.                           |
| [Outils de développement][20]     | Récupérer des informations ou configurer différentes sections dans l'IU avec l'API                                 |
| [Facturation][21]        | Obtenir des informations sur votre utilisation de Datadog en choisissant jusqu'à trois tags, tels que `env`, `team`, et `account_id` |

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/using_tags/
[2]: /fr/metrics/
[3]: /fr/getting_started/tagging/assigning_tags/
[4]: /fr/getting_started/tagging/assigning_tags/#configuration-files
[5]: /fr/getting_started/tagging/assigning_tags/#ui
[6]: /fr/getting_started/tagging/assigning_tags/#api
[7]: /fr/getting_started/tagging/assigning_tags/#dogstatsd
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/integrations/
[10]: /fr/getting_started/tagging/using_tags/#events
[11]: /fr/getting_started/tagging/using_tags/#dashboards
[12]: /fr/getting_started/tagging/using_tags/#infrastructure
[13]: /fr/getting_started/tagging/using_tags/#monitors
[14]: /fr/getting_started/tagging/using_tags/#metrics
[15]: /fr/getting_started/tagging/using_tags/#integrations
[16]: /fr/getting_started/tagging/using_tags/#apm
[17]: /fr/getting_started/tagging/using_tags/#notebooks
[18]: /fr/getting_started/tagging/using_tags/#logs
[19]: /fr/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[20]: /fr/getting_started/tagging/using_tags/#developers
[21]: /fr/account_management/billing/usage_attribution/