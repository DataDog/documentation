---
aliases:
- /fr/getting_started/getting_started_with_tags
- /fr/guides/getting_started/tagging/
- /fr/developers/getting_started/tagging/
- /fr/tagging
- /fr/guides/tagging/
- /fr/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
description: Découvrez comment assigner et utiliser des tags dans Datadog.
further_reading:
- link: /getting_started/tagging/assigning_tags/
  tag: Documentation
  text: Apprendre à assigner des tags
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Apprendre à configurer le tagging de service unifié
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Apprendre à assigner des tags
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur le tagging efficace avec Datadog
kind: documentation
title: Débuter avec les tags
---

## Présentation

Les tags sont conçus pour ajouter des caractéristiques aux données de télémétrie Datadog, afin de pouvoir les filtrer, les agréger et les comparer au sein de visualisations Datadog. Lorsque vous [utilisez des tags][1], vous pouvez observer les performances globales de plusieurs hosts et même affiner davantage les résultats selon des éléments spécifiques. En somme, les tags constituent un moyen d'observer des points de données agrégées.

Les tags relient différents types de données dans Datadog. Grâce à certaines clés de tag **réservées**, vous pouvez corréler différent(e)s métriques, traces et logs et déclencher des actions.

| Clé de tag   | Fonctionnalité                                                            |
| --------- | --------------------------------------------------------------------- |
| `host`    | Corrélation entre des métriques, des traces, des processus et des logs.              |
| `device`  | Séparation de métriques, traces, processus et logs selon un appareil ou un disque. |
| `source`  | Filtrage de spans et création automatisée de pipelines pour la solution Log Management     |
| `service` | Définition du contexte des données spécifiques à l'application pour l'ensemble des métriques, traces et logs. |
| `env`     | Définition du contexte des données spécifiques à l'application pour l'ensemble des métriques, traces et logs. |
| `version` | Définition du contexte des données spécifiques à l'application pour l'ensemble des métriques, traces et logs. |

Datadog vous conseille d'étudier les données des conteneurs, machines virtuelles et de l'infrastructure cloud dans leur ensemble, au niveau des services. Par exemple, consultez l'utilisation du processeur d'un ensemble de hosts qui représentent un service, plutôt que d'analyser l'utilisation distincte d'un serveur A ou d'un serveur B.

Puisque les conteneurs et les environnements cloud changent régulièrement de hosts, il est important d'utiliser des tags pour agréger vos métriques.

## Définir des tags

Voici quelques exigences en ce qui concerne l'utilisation de tags dans Datadog :

1. Les noms des tags doivent **commencer par une lettre**. Ils peuvent ensuite contenir les caractères suivants :

    - Des caractères alphanumériques
    - Des underscores
    - Des moins
    - Des virgules
    - Des points
    - Des barres obliques

    Les autres caractères spéciaux sont remplacés par des underscores.

2. Les tags peuvent comporter **jusqu'à 200 caractères** et prennent en charge les lettres Unicode (qui incluent la plupart des jeux de caractères, y compris les langues comme le japonais).
3. Les tags sont convertis en minuscules. Ainsi, les tags `CamelCase` ne sont pas recommandés. Les intégrations reposant sur une authentification (crawler) convertissent les tags au format camel case en ajoutant des underscores. Par exemple, `TestTag` --> `test_tag`.
4. Un tag peut être au format `valeur` ou `<KEY>:<VALUE>`. Les clés de tag `env`, `instance` et `name` sont couramment utilisées. La clé précède toujours le caractère « : » de la définition globale du tag. Exemple :

    | Tag                | Clé           | Valeur          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

5. Les tags ne doivent pas provenir de sources illimitées, telles que des horodatages epoch, des ID d'utilisateur ou des ID de requête. Cela pourrait [accroître de façon significative le nombre de métriques][2] de votre organisation et augmenter vos frais.
6. Les limites (comme les minuscules) s'appliquent uniquement aux tags de métrique, et non aux attributs de logs ou aux tags de span.

## Assignation de tags

### Méthodes de tagging

Vous pouvez utiliser l'une (ou l'ensemble) des méthodes suivantes pour assigner des tags.

| Méthode                   | Assignation de tags                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [Fichiers de configuration][3] | Assignation manuelle dans les principaux fichiers de configuration de votre Agent ou des intégrations |
| [Interface][4]                  | Sur le site Datadog                                             |
| [API][5]                 | Lors de l'utilisation de l'API Datadog                                        |
| [DogStatsD][6]           | Lors de l'envoi de métriques avec DogStatsD                          |

Pour en savoir plus, consultez la section [Assigner des tags][7].
#### Tagging de service unifié

Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags. Cette fonctionnalité permet de lier les données de télémétrie Datadog entre elles via trois tags standard : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la section [Tagging de service unifié][8].

## Utilisation

[Assignez des tags][7] au niveau des hosts et des [intégrations][9] pour pouvoir filtrer et regrouper vos métriques, traces et logs. Les tags peuvent être utilisés dans les sections suivantes de votre plateforme Datadog.

| Section                 | Utilité des tags                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [Événements][10]         | Filtrer le flux d'événements                                                                          |
| [Dashboards][11]     | Filtrer et regrouper des métriques dans des graphiques                                                               |
| [Infrastructure][12] | Filtrer et regrouper des données sur les vues de la hostmap, de la liste d'infrastructures, des live containers et des live processes. |
| [Monitors][13]       | Créer et gérer des monitors ou gérer des downtimes.                                             |
| [Métriques][14]        | Filtrer et regrouper des données avec le Metrics Explorer                                                        |
| [Intégrations][15]   | Définir des limites facultatives pour AWS, Google Cloud et Azure.                                        |
| [APM][16]            | Filtrer des services, traces et profils ou accéder à d'autres sections avec la Service Map           |
| [RUM et Session Replay][17] | Filtrer des recherches d'événements, des analyses, des patterns, des replays et des problèmes avec le RUM Explorer        |
| [Surveillance Synthetic et tests en continu][18]     | Filtrer et regrouper des tests Synthetic ou des tests s'exécutant dans des pipelines CI avec la surveillance Synthetic et les tests en continu   |
| [Notebooks][19]      | Filtrer et regrouper des métriques dans des graphiques                                                               |
| [Logs][20]           | Filtrer la recherche de logs, les analyses, les patterns, le live tailing et les pipelines.                                |
| [SLO][21]           | Rechercher des SLO ainsi que des SLO groupés basés sur des métriques ou sur des monitors                       |
| [Outils de développement][22]     | Récupérer des informations ou configurer différentes sections dans l'interface avec l'API.                                 |
| [Facturation][23]        | Obtenir des informations sur votre utilisation de Datadog en choisissant jusqu'à trois tags, tels que `env`, `team`, et `account_id`. |
| [CI Visibility][24]  | Filtrez et regroupez les exécutions de tests ou de pipelines avec l'explorer CI Visibility. |

Pour en savoir plus, consultez la section [Utiliser les tags][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/using_tags/
[2]: /fr/metrics/
[3]: /fr/getting_started/tagging/assigning_tags/#configuration-files
[4]: /fr/getting_started/tagging/assigning_tags/#ui
[5]: /fr/getting_started/tagging/assigning_tags/#api
[6]: /fr/getting_started/tagging/assigning_tags/#dogstatsd
[7]: /fr/getting_started/tagging/assigning_tags/
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/integrations/
[10]: /fr/getting_started/tagging/using_tags/#events
[11]: /fr/getting_started/tagging/using_tags/#dashboards
[12]: /fr/getting_started/tagging/using_tags/#infrastructure
[13]: /fr/getting_started/tagging/using_tags/#monitors
[14]: /fr/getting_started/tagging/using_tags/#metrics
[15]: /fr/getting_started/tagging/using_tags/#integrations
[16]: /fr/getting_started/tagging/using_tags/#apm
[17]: /fr/getting_started/tagging/using_tags/#rum--session-replay
[18]: /fr/getting_started/tagging/using_tags/#synthtics
[19]: /fr/getting_started/tagging/using_tags/#notebooks
[20]: /fr/getting_started/tagging/using_tags/#logs
[21]: /fr/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /fr/getting_started/tagging/using_tags/#developers
[23]: /fr/account_management/billing/usage_attribution/
[24]: /fr/getting_started/tagging/using_tags/#ci-visibility