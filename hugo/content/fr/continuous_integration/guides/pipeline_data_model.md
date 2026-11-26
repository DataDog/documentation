---
description: Découvrez comment les Pipelines sont modélisés et quels types d'exécution
  sont pris en charge par CI Visibility.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Découvrez Pipeline Visibility
title: Modèle de données de pipeline et types d'exécution
---
## Présentation {#overview}

Ce guide décrit comment configurer par programmation les exécutions de pipeline dans CI Visibility et définit les types d'exécution de pipeline pris en charge par CI Visibility. 

Ce guide s'applique aux pipelines créés à l'aide de l'[API publique CI Visibility Pipelines][3]. Les Integrations avec d'autres fournisseurs CI peuvent varier.

## Modèle de données {#data-model}

Les exécutions de pipeline sont modélisées sous forme de traces, similaires à une [trace distribuée APM][1], où les spans représentent l'exécution de différentes parties du pipeline. Le modèle de données CI Visibility pour représenter les exécutions de pipeline se compose de quatre niveaux :

| Nom du niveau | Description |
| ---------- | ----------- |
| Pipeline (requis)  | Le span racine de niveau supérieur qui contient tous les autres niveaux en tant qu'enfants. Il représente l'exécution globale d'un pipeline du début à la fin. Ce niveau est parfois appelé `build` ou `workflow` chez certains fournisseurs CI. |
| Phase      | Sert à regrouper des jobs sous un nom défini par l'utilisateur. Certains fournisseurs CI ne possèdent pas ce niveau. |
| Job        | La plus petite unité de travail où les commandes sont exécutées. Toutes les tâches à ce niveau doivent être effectuées sur un seul nœud. |
| Étape      | Chez certains fournisseurs CI, ce niveau représente un script shell ou une action exécutée au sein d'un job. |

Lorsqu'un pipeline, une phase, un job ou une étape se termine, les données d'exécution sont envoyées à Datadog. Pour configurer Pipeline Visibility, consultez la liste des [fournisseurs CI pris en charge][2]. Si votre fournisseur CI ou votre workflow n'est pas pris en charge, vous pouvez utiliser l'[endpoint de l'API publique][3] pour envoyer vos exécutions de pipeline à CI Visibility.

{{< img src="ci/ci-pipeline-execution.png" alt="Exemple d'une trace d'exécution de pipeline" style="width:100%;">}}

Les phases, jobs et étapes doivent porter exactement le même nom de pipeline que leur pipeline parent. En cas de non-concordance, certaines informations sur les phases, jobs et étapes peuvent manquer pour certains pipelines. Par exemple, des jobs manquants dans les tableaux récapitulatifs des jobs.

### Identifiants uniques de pipeline {#pipeline-unique-ids}

Toutes les exécutions de pipeline au sein d'un niveau doivent avoir un identifiant unique. Par exemple, un pipeline et un job peuvent avoir le même identifiant unique, mais pas deux pipelines.

L'envoi d'identifiants répétés avec des horodatages différents peut entraîner un comportement indésirable dans l'interface utilisateur. Par exemple, les graphiques en flammes peuvent afficher des tags de span provenant d'une exécution de pipeline différente. Si des identifiants en double avec les mêmes horodatages sont envoyés, seules les valeurs de la dernière exécution de pipeline reçue sont stockées.

## Types d'exécution de pipeline {#pipeline-execution-types}

### Exécution normale {#normal-run}

L'exécution normale d'un pipeline suit le flux illustré ci-dessous :

{{< img src="ci/pipeline-normal-execution-flow.png" alt="Représentation d'une exécution de pipeline normale" style="width:100%;">}}

Selon le fournisseur, certains niveaux peuvent être manquants. Par exemple, les phases peuvent être absentes, et les jobs peuvent s'exécuter en parallèle, en séquence ou selon une combinaison des deux.

Après l'achèvement de chaque composant, une charge utile doit être envoyée à Datadog avec toutes les données nécessaires pour représenter l'exécution. Datadog traite ces données, les stocke en tant qu'événement de pipeline et les affiche dans [CI Visibility][2]. Les exécutions de pipeline doivent se terminer avant d'être envoyées à Datadog.

### Relances complètes {#full-retries}

Les relances complètes d'un pipeline doivent avoir des ID uniques de pipeline différents. 

Dans l'endpoint de l'API publique, vous pouvez renseigner le champ `previous_attempt` pour créer un lien vers les relances précédentes. Les relances sont traitées comme des exécutions de pipeline distinctes dans Datadog, et les heures de début et de fin ne doivent couvrir que la relance concernée.

### Relances partielles {#partial-retries}

Lors de la relance d'un sous-ensemble de jobs au sein d'un pipeline, vous devez envoyer un nouvel événement de pipeline avec un nouvel ID unique de pipeline. La charge utile de tout nouveau job doit être liée au nouvel ID unique de pipeline. Pour les lier à la relance précédente, ajoutez le champ `previous_attempt`. 

Les relances partielles sont également traitées comme des pipelines distincts. Les heures de début et de fin ne doivent pas inclure celles de la relance initiale. Pour une relance partielle, n'envoyez pas de charges utiles pour les jobs qui ont été exécutés lors de la tentative précédente. Définissez également le champ `partial_retry` sur `true` lors des relances partielles pour les exclure de l'agrégation lors du calcul des durées d'exécution.

Par exemple, un pipeline nommé `P` comporte trois jobs différents, à savoir `J1`, `J2` et `J3`, exécutés séquentiellement. Lors de la première exécution de `P`, seuls `J1` et `J2` sont exécutés, et `J2` échoue. 

Par conséquent, vous devez envoyer un total de trois charges utiles :

1. Charge utile du job pour `J1`, avec l'ID `J1_1` et l'ID de pipeline `P_1`.
2. Charge utile du job pour `J2`, avec l'ID `J2_1` et l'ID de pipeline `P_1`.
3. Charge utile de pipeline pour `P`, avec l'ID `P_1`.

Supposons qu'il y ait une relance partielle du pipeline commençant à `J2`, où tous les jobs restants réussissent. 

Vous devez envoyer trois charges utiles supplémentaires :

1. Charge utile du job pour `J2`, avec l'ID `J2_2` et l'ID de pipeline `P_2`.
2. Charge utile du job pour `J3`, avec l'ID `J3_1` et l'ID de pipeline `P_2`.
3. Charge utile du pipeline pour `P`, avec l'ID `P_2`.

Les valeurs réelles des ID ne sont pas importantes. Ce qui compte, c'est qu'ils soient correctement modifiés en fonction de l'exécution du pipeline comme spécifié ci-dessus.

### Pipelines bloqués {#blocked-pipelines}

Si un pipeline est bloqué indéfiniment en raison d'une intervention manuelle requise, une charge utile d'événement de pipeline doit être envoyée dès que le pipeline atteint l'état bloqué. Le statut du pipeline doit être défini sur `blocked`. 

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="Flux d'exécution d'un pipeline bloqué" style="width:100%;">}}

Les données restantes du pipeline doivent être envoyées dans des charges utiles distinctes avec un ID unique de pipeline différent. Dans le second pipeline, vous pouvez définir `is_resumed` sur `true` pour signaler que l'exécution a été reprise à partir d'un pipeline bloqué.

### Pipelines en aval {#downstream-pipelines}

Si un pipeline est déclenché en tant qu'enfant d'un autre pipeline, le champ `parent_pipeline` doit être renseigné avec les détails du pipeline parent.

### Pipelines manuels {#manual-pipelines}

Si un pipeline est déclenché manuellement, le champ `is_manual` doit être défini sur true.

## Informations Git {#git-information}

Il est fortement recommandé de fournir des informations Git sur le commit qui a déclenché l'exécution du pipeline. Au minimum, l'URL du dépôt, le SHA du commit et l'e-mail de l'auteur sont requis. Pour plus d'informations, consultez la [spécification de l'endpoint de l'API publique][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/continuous_integration/pipelines/#setup
[3]: /fr/api/latest/ci-visibility-pipelines/#send-pipeline-event