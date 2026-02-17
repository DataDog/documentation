---
description: Découvrez comment les pipelines sont modélisés et quels types d'exécution
  sont pris en charge par CI Visibility.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: En savoir plus sur Pipeline Visibility
title: Modèle de données de pipeline et types d'exécution
---

## Section Overview

Ce guide décrit comment configurer de manière programmatique les exécutions de pipeline dans CI Visibility et définit les types d'exécution de pipeline pris en charge par CI Visibility.

Ce guide s'applique aux pipelines créés à l'aide de l'[API Pipelines publique CI Visibility][3]. Les intégrations avec d'autres fournisseurs CI peuvent varier.

## Modèle de données

Les exécutions de pipeline sont modélisées sous forme de traces, de manière similaire à une [trace distribuée APM][1], où les spans représentent l'exécution de différentes parties du pipeline. Le modèle de données CI Visibility pour représenter les exécutions de pipeline se compose de quatre niveaux :

| Nom du niveau | Rôle |
| ---------- | ----------- |
| Description  | Le span racine de niveau supérieur qui contient tous les autres niveaux en tant qu'enfants. Il représente l'exécution globale d'un pipeline du début à la fin. Ce niveau est parfois appelé `build` ou `workflow` chez certains fournisseurs CI. |
| Stage      | Sert de regroupement de tâches sous un nom défini par l'utilisateur. Certains fournisseurs CI n'ont pas ce niveau. |
| Job        | La plus petite unité de travail où les commandes sont exécutées. Toutes les tâches à ce niveau doivent être effectuées sur un seul nœud. |
| Step       | Chez certains fournisseurs CI, ce niveau représente un shell script ou une action exécutée au sein d'une tâche. |

Lorsqu'un pipeline, stage, job ou step se termine, les données d'exécution sont envoyées à Datadog. Pour configurer Pipeline Visibility, consultez la liste des [fournisseurs CI pris en charge][2]. Si votre fournisseur CI ou workflow n'est pas pris en charge, vous pouvez utiliser le [point de terminaison d'API publique][3] pour envoyer vos exécutions de pipeline à CI Visibility. 

{{< img src="ci/ci-pipeline-execution.png" alt="Exemple de trace d'exécution de pipeline" style="width:100%;">}}

Les stages, jobs et steps doivent avoir exactement le même nom de pipeline que leur pipeline parent. En cas de non-concordance, certains pipelines peuvent manquer d'informations sur les stages, jobs et steps. Par exemple, des jobs manquantes dans les tableaux récapitulatifs de tâches.

### ID uniques de pipeline

Toutes les exécutions de pipeline au sein d'un niveau doivent avoir un identifiant unique. Par exemple, un pipeline et une tâche peuvent avoir le même ID unique, mais pas deux pipelines.

Lors de l'envoi d'ID répétés avec des timestamps différents, l'interface utilisateur peut présenter un comportement indésirable. Par exemple, les flame graphs peuvent afficher des tags de span provenant d'une exécution de pipeline différente. Si des ID en double avec les mêmes timestamps sont envoyés, seules les valeurs de la dernière exécution de pipeline reçue sont stockées.

## Types d'exécution de pipeline

### Exécution normale

L'exécution normale d'une exécution de pipeline suit le flux décrit ci-dessous :

{{< img src="ci/pipeline-normal-execution-flow.png" alt="Représentation d'une exécution de pipeline normale" style="width:100%;">}}

Selon le fournisseur, certains niveaux peuvent être absents. Par exemple, les stages peuvent ne pas exister, et les tâches peuvent s'exécuter en parallèle ou en séquence, ou une combinaison des deux.

Après l'achèvement de chaque composant, une charge utile doit être envoyée à Datadog avec toutes les données nécessaires pour représenter l'exécution. Datadog traite ces données, les stocke en tant qu'événement de pipeline et les affiche dans [CI Visibility][2]. Les exécutions de pipeline doivent se terminer avant de les envoyer à Datadog.

### Tentatives complètes

Les nouvelles tentatives complètes d'un pipeline doivent avoir des ID uniques de pipeline différents.

Dans l'endpoint d'API publique, vous pouvez remplir le champ `previous_attempt` pour créer un lien vers les tentatives précédentes. Les nouvelles tentatives sont traitées comme des exécutions de pipeline distinctes dans Datadog, et les heures de début et de fin ne doivent englober que cette nouvelle tentative.

### Tentatives partielles

Lors d'une nouvelle tentative d'un sous-ensemble de tâches au sein d'un pipeline, vous devez envoyer un nouvel événement de pipeline avec un nouvel ID unique de pipeline. La charge utile pour toute nouvelle tâche doit être liée au nouvel ID unique de pipeline. Pour les lier à la tentative précédente, ajoutez le champ `previous_attempt`.

Les nouvelles tentatives partielles sont également traitées comme des pipelines distincts. Les heures de début et de fin ne doivent pas inclure le temps de la tentative d'origine. Pour une nouvelle tentative partielle, n'envoyez pas de charges utiles pour les tâches qui se sont exécutées lors de la tentative précédente. De plus, définissez le champ `partial_retry` sur `true` pour les nouvelles tentatives partielles afin de les exclure de l'agrégation lors du calcul des durées d'exécution.

Par exemple, un pipeline nommé `P` a trois tâches différentes, à savoir `J1`, `J2` et `J3`, exécutées séquentiellement. Lors de la première exécution de `P`, seuls `J1` et `J2` sont exécutés, et `J2` échoue. 

Par conséquent, vous devez envoyer un total de trois charges utiles :

1. Charge utile de tâche pour `J1`, avec l'ID `J1_1` et l'ID de pipeline `P_1`.
2. Charge utile de tâche pour `J2`, avec l'ID `J2_1` et l'ID de pipeline `P_1`.
3. Charge utile de pipeline pour `P`, avec l'ID `P_1`.

Supposons qu'il y ait une nouvelle tentative partielle du pipeline à partir de `J2`, où toutes les tâches restantes réussissent.

Vous devez envoyer trois charges utiles supplémentaires :

1. Charge utile de tâche pour `J2`, avec l'ID `J2_2` et l'ID de pipeline `P_2`.
2. Charge utile de tâche pour `J3`, avec l'ID `J3_1` et l'ID de pipeline `P_2`.
3. Charge utile de pipeline pour `P`, avec l'ID `P_2`.

Les valeurs réelles des ID ne sont pas importantes. Ce qui compte, c'est qu'ils soient correctement modifiés en fonction de l'exécution du pipeline comme spécifié ci-dessus.

### Pipelines bloqués

Si un pipeline est bloqué indéfiniment en raison d'une intervention manuelle requise, une charge utile d'événement de pipeline doit être envoyée dès que le pipeline atteint l'état bloqué. Le statut du pipeline doit être défini sur `blocked`.

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="Flux d'une exécution de pipeline bloquée" style="width:100%;">}}

Les données de pipeline restantes doivent être envoyées dans des charges utiles distinctes avec un ID unique de pipeline différent. Dans le second pipeline, vous pouvez définir `is_resumed` sur `true` pour signaler que l'exécution a été reprise à partir d'un pipeline bloqué.

### Pipelines en aval

Si un pipeline est déclenché en tant qu'enfant d'un autre pipeline, le champ `parent_pipeline` doit être rempli avec les détails du pipeline parent.

### Pipelines manuels

Si un pipeline est déclenché manuellement, le champ `is_manual` doit être défini sur true.

## Informations Git

Il est fortement recommandé de fournir les informations Git du commit qui a déclenché l'exécution du pipeline. Les exécutions de pipeline sans informations Git n'apparaissent pas sur la [page Recent Code Changes][4]. Au minimum, l'URL du référentiel, le SHA du commit et l'adresse e-mail de l'auteur sont requis. Pour plus d'informations, consultez la [spécification de l'endpoint d'API publique][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/continuous_integration/pipelines/#setup
[3]: /fr/api/latest/ci-visibility-pipelines/#send-pipeline-event
[4]: https://app.datadoghq.com/ci/commits