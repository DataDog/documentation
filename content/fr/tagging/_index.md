---
title: Débuter avec les tags
kind: documentation
description: Apprenez à assigner et utiliser des tags dans Datadog.
aliases:
  - /fr/getting_started/getting_started_with_tags
  - /fr/guides/getting_started/tagging/
  - /fr/developers/getting_started/tagging/
  - /fr/getting_started/tagging
  - /fr/getting_started/tagging/faq/
further_reading:
  - link: tagging/assigning_tags
    tag: Documentation
    text: Apprendre à assigner des tags
  - link: tagging/using_tags
    tag: Documentation
    text: Apprendre à utiliser des tags dans Datadog
---
## Introduction

Les tags sont conçus pour ajouter des caractéristiques aux métriques, afin de pouvoir les filtrer, les agréger et les comparer au sein de visualisations Datadog. Lorsque vous [utilisez des tags][1], vous pouvez observer les performances globales d'un certain nombre de hosts et même affiner davantage les résultats selon des éléments spécifiques. En somme, les tags constituent un moyen d'observer des points de données agrégées.

Les tags relient différents types de données dans Datadog. Grâce à certaines clés de tag **réservées**, vous pouvez corréler différent(e)s métriques, traces et logs et déclencher des actions. Voici quelques exemples :

| Clé de tag   | Fonctionnalité                                                            |
|-----------|-----------------------------------------------------------------------|
| `host`    | Corrélation entre des métriques, des traces, des processus et des logs              |
| `device`  | Séparation de métriques, traces, processus et logs selon un appareil ou un disque |
| `source`  | Filtrage de spans et création automatisée de pipelines pour la gestion des logs     |
| `service` | Corrélation entre des métriques, des traces et des logs                         |

## Importance

Il est généralement conseillé d'étudier les données des conteneurs, machines virtuelles et de l'infrastructure dans le cloud dans leur ensemble, au niveau des « services ». Par exemple, il est plus pertinent de consulter l'utilisation de processeur d'un ensemble de hosts qui représente un service, plutôt que d'étudier l'utilisation distincte d'un serveur A ou d'un serveur B.

Les conteneurs et les environnements cloud fouillent régulièrement parmi les hosts. Il est donc essentiel de les taguer pour permettre l'agrégation des métriques obtenues.

## Définition des tags

Voici quelques restrictions, exigences et suggestions en ce qui concerne l'utilisation de tags dans Datadog :

1. Les noms des tags doivent **commencer par une lettre**. Ils peuvent ensuite contenir les caractères suivants :

    * Des caractères alphanumériques
    * Des underscores
    * Des moins
    * Des virgules
    * Des points
    * Des barres obliques

    Les autres caractères spéciaux sont remplacés par des underscores.

    **Remarque** : le nom d'un tag ne peut pas se terminer par le caractère « : », comme `tag:`.

2. Les noms de tags peuvent comporter **jusqu'à 200 caractères** et prennent en charge la norme Unicode.
3. Les tags sont convertis en minuscules. Ainsi, les tags `CamelCase` ne sont pas recommandés. Les intégrations reposant sur une authentification (crawler) convertissent les tags au format camel case en ajoutant des underscores. Par exemple, `TestTag` --> `test_tag`.
4. Un tag peut être au format `valeur` ou `<KEY>:<VALUE>`. Pour un fonctionnement optimal, **nous recommandons de créer des tags au format `<KEY>:<VALUE>`.** `env`, `instance`, et `name` sont des clés de tag couramment utilisées. La clé précède toujours le caractère « : » de la définition globale du tag. Par exemple :

| Tag                | Clé           | Valeur          |
|--------------------|---------------|----------------|
| `env:staging:east` | `env`         | `staging:east` |
| `env_staging:east` | `env_staging` | `east`         |

5.  **Clés de tag réservées** : `host`, `device`, `source`, et `service` ne peuvent pas être utilisés comme les autres clés.

6. Les tags ne doivent pas provenir de sources illimitées, telles que des horodatages EPOCH, des ID d'utilisateur ou des ID de demande. Cela pourrait [accroître de façon significative le nombre de métriques][2] de votre organisation et augmenter vos frais.

## Assigner des tags
Vous pouvez utiliser l'une (ou l'ensemble) des méthodes suivantes pour assigner des tags. Consultez la [documentation relative à l'assignation des tags][3] pour en savoir plus :

| Méthode                       | Assignation de tags                                                                                  |
|------------------------------|----------------------------------------------------------------------------------------------|
| [Fichiers de configuration][4]     | Assignation manuelle dans les principaux fichiers de configuration de votre Agent, ou dans les fichiers de configuration de vos intégrations. |
| [Variables d'environnement][5]   | Utilisation de variables d'environnement pour l'Agent conteneurisé                                      |
| [IU][6]                      | Dans votre plateforme Datadog                                                                     |
| [API][7]                     | À l'aide de l'API de Datadog                                                                          |
| [DogStatsD][8]               | Lors de l'envoi de métriques via DogStatsD                                                        |
| [Héritage des déclarations][9] | Assignation automatique après la configuration des intégrations prises en charge                                        |

## Utiliser les tags

[Assignez des tags][3] au niveau des hosts et des [intégrations][10] pour pouvoir filtrer et regrouper vos métriques, traces et logs. Les tags peuvent être utilisés dans les sections suivantes de votre plateforme Datadog. Consultez la [documentation relative à l'utilisation des tags][1] pour en savoir plus :

| Section                 | Utilisation des tags                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------|
| [Événements][11]         | Filtrer le flux d'événements                                                                          |
| [Dashboards][12]     | Filtrer et regrouper des métriques sur des graphiques                                                               |
| [Infrastructure][13] | Filtrer et regrouper des données sur les vues de la hostmap, de la liste d'infrastructures, des live containers et des live processes |
| [Monitors][14]       | Créer et gérer des monitors ou gérer des downtimes                                             |
| [Métriques][15]        | Filtrer et regrouper des données avec le Metrics Explorer                                                        |
| [Intégrations][16]   | Définir des limites facultatives pour AWS, Google Cloud et Azure                                        |
| [APM][17]            | Filtrer les données App Analytics ou accéder facilement à d'autres sections avec la Service map                                 |
| [Notebooks][18]      | Filtrer et regrouper des métriques sur des graphiques                                                               |
| [Logs][19]           | Filtrer la recherche de logs, les analyses, les patterns, le live tailing et les pipelines                                |
| [Outils de développement][20]     | Récupérer des informations ou configurer différentes sections dans l'IU avec l'API                                 |

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/using_tags
[2]: /fr/metrics/
[3]: /fr/getting_started/tagging/assigning_tags
[4]: /fr/getting_started/tagging/assigning_tags/#configuration-files
[5]: /fr/getting_started/tagging/assigning_tags/#environment-variables
[6]: /fr/getting_started/tagging/assigning_tags/#ui
[7]: /fr/getting_started/tagging/assigning_tags/#api
[8]: /fr/getting_started/tagging/assigning_tags/#dogstatsd
[9]: /fr/getting_started/tagging/assigning_tags/#integration-inheritance
[10]: /fr/integrations
[11]: /fr/getting_started/tagging/using_tags/#events
[12]: /fr/getting_started/tagging/using_tags/#dashboards
[13]: /fr/getting_started/tagging/using_tags/#infrastructure
[14]: /fr/getting_started/tagging/using_tags/#monitors
[15]: /fr/getting_started/tagging/using_tags/#metrics
[16]: /fr/getting_started/tagging/using_tags/#integrations
[17]: /fr/getting_started/tagging/using_tags/#apm
[18]: /fr/getting_started/tagging/using_tags/#notebooks
[19]: /fr/getting_started/tagging/using_tags/#logs
[20]: /fr/getting_started/tagging/using_tags/#developers
