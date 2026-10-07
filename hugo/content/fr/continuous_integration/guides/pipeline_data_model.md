---
description: Découvrez comment les pipelines sont modélisés et quels types d'exécution
  sont pris en charge par CI Visibility.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Découvrez la fonctionnalité Pipeline Visibility
title: Modèle de données des pipelines et types d'exécution
---
## Aperçu

Ce guide décrit comment configurer de manière programmatique les exécutions de pipeline dans CI Visibility et définit les types d'exécution de pipeline que CI Visibility prend en charge. 

Ce guide s'applique aux pipelines créés à l'aide de l'[API publique des pipelines CI Visibility][3]. Les intégrations avec d'autres fournisseurs de CI peuvent varier.

## Modèle de données

Les exécutions de pipeline sont modélisées comme des traces, similaires à une [trace distribuée APM][1], où les spans représentent l'exécution de différentes parties du pipeline. Le modèle de données de CI Visibility pour représenter les exécutions de pipeline se compose de quatre niveaux :

| Nom du niveau | Description |
| ---------- | ----------- |
| Pipeline (obligatoire)  | Le span racine de niveau supérieur qui contient tous les autres niveaux en tant qu'enfants. Il représente l'exécution globale d'un pipeline du début à la fin. Ce niveau est parfois appelé `build` ou `workflow` chez certains fournisseurs de CI. |
| Étape      | Sert de regroupement de jobs sous un nom défini par l'utilisateur. Certains fournisseurs de CI n'ont pas ce niveau. |
| Job        | La plus petite unité de travail où des commandes sont exécutées. Toutes les tâches à ce niveau doivent être effectuées sur un seul nœud. |
| Étape       | Dans certains fournisseurs de CI, ce niveau représente un script shell ou une action exécutée dans un job. |

Lorsque l'exécution d'un pipeline, d'un stage, d'un job ou d'un step se termine, les données d'exécution sont envoyées à Datadog. Pour configurer Pipeline Visibility, consultez la liste des [fournisseurs de CI pris en charge][2]. Si votre fournisseur de CI ou votre flux de travail n'est pas pris en charge, vous pouvez utiliser le [public API endpoint][3] pour envoyer vos exécutions de pipeline à CI Visibility.

{{< img src="ci/ci-pipeline-execution.png" alt="Exemple d'une trace d'exécution de pipeline" style="width:100%;">}}

Les stages, les jobs et les steps doivent avoir exactement le même nom de pipeline que leur pipeline parent. En cas de désaccord, certains pipelines peuvent manquer d'informations sur les stages, les jobs et les steps. Par exemple, des jobs manquants dans les tableaux récapitulatifs des jobs.

### Identifiants uniques de pipeline

Toutes les exécutions de pipeline au sein d'un niveau doivent avoir un identifiant unique. Par exemple, un pipeline et un job peuvent avoir le même identifiant unique, mais pas deux pipelines.

Lors de l'envoi d'identifiants répétés avec des horodatages différents, l'interface utilisateur peut présenter un comportement indésirable. Par exemple, les flame graphs peuvent afficher des span tags provenant d'une exécution de pipeline différente. Si des identifiants en double avec les mêmes horodatages sont envoyés, seules les valeurs de la dernière exécution de pipeline reçue sont stockées.

## Types d'exécution de pipeline

### Exécution normale

L'exécution normale d'un pipeline suit le flux représenté ci-dessous :

{{< img src="ci/pipeline-normal-execution-flow.png" alt="Représentation d'une exécution normale de pipeline" style="width:100%;">}}

Selon le fournisseur, certains niveaux peuvent être manquants. Par exemple, des stages peuvent ne pas exister et les jobs peuvent s'exécuter en parallèle, en séquence, ou en combinaison.

Après l'achèvement de chaque composant, une charge utile doit être envoyée à Datadog avec toutes les données nécessaires pour représenter l'exécution. Datadog traite ces données, les stocke en tant qu'événement de pipeline et les affiche dans [CI Visibility][2]. Les exécutions de pipeline doivent se terminer avant de les envoyer à Datadog.

### Reprises complètes

Les reprises complètes d'un pipeline doivent avoir des identifiants uniques de pipeline différents. 

Dans le point de terminaison de l'API publique, vous pouvez remplir le champ `previous_attempt` pour lier aux reprises précédentes. Les reprises sont considérées comme des exécutions de pipeline distinctes dans Datadog, et l'heure de début et de fin ne doit englober que cette reprise.

### Reprises partielles

Lors de la reprise d'un sous-ensemble de jobs au sein d'un pipeline, vous devez envoyer un nouvel événement de pipeline avec un nouvel identifiant unique de pipeline. La charge utile pour tout nouveau job doit être liée au nouvel identifiant unique de pipeline. Pour les lier à la reprise précédente, ajoutez le champ `previous_attempt`. 

Les reprises partielles sont également considérées comme des pipelines distincts. L'heure de début et de fin ne doit pas inclure le temps de la reprise originale. Pour une reprise partielle, ne pas envoyer de charges utiles pour les jobs qui ont été exécutés lors de la tentative précédente. De plus, définissez le champ `partial_retry` sur `true` lors des reprises partielles pour les exclure de l'agrégation lors du calcul des temps d'exécution.

Par exemple, un pipeline nommé `P` a trois jobs différents, à savoir `J1`, `J2` et `J3`, exécutés séquentiellement. Lors de la première exécution de `P`, seuls `J1` et `J2` sont exécutés, et `J2` échoue. 

Par conséquent, vous devez envoyer un total de trois charges utiles :

1. Charge utile de job pour `J1`, avec l'ID `J1_1` et l'ID de pipeline `P_1`.
2. Charge utile de job pour `J2`, avec l'ID `J2_1` et l'ID de pipeline `P_1`.
3. Charge utile de pipeline pour `P`, avec l'ID `P_1`.

Supposons qu'il y ait une reprise partielle du pipeline à partir de `J2`, où tous les jobs restants réussissent. 

Vous devez envoyer trois charges utiles supplémentaires :

1. Charge utile de job pour `J2`, avec l'ID `J2_2` et l'ID de pipeline `P_2`.
2. Charge utile de job pour `J3`, avec l'ID `J3_1` et l'ID de pipeline `P_2`.
3. Charge utile de pipeline pour `P`, avec l'ID `P_2`.

Les valeurs réelles des ID ne sont pas importantes. Ce qui compte, c'est qu'elles soient correctement modifiées en fonction de l'exécution du pipeline comme spécifié ci-dessus.

### Pipelines bloqués

Si un pipeline est indéfiniment bloqué en raison d'une intervention manuelle requise, une charge utile d'événement de pipeline doit être envoyée dès que le pipeline atteint l'état bloqué. Le statut du pipeline doit être défini sur `blocked`. 

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="Flux d'exécution d'un pipeline bloqué" style="width:100%;">}}

Les données restantes du pipeline doivent être envoyées dans des charges utiles séparées avec un identifiant unique de pipeline différent. Dans le deuxième pipeline, vous pouvez définir le champ `is_resumed` sur `true` pour signaler que l'exécution a été reprise à partir d'un pipeline bloqué.

### Pipelines en aval

Si un pipeline est déclenché en tant qu'enfant d'un autre pipeline, le champ `parent_pipeline` doit être rempli avec les détails du pipeline parent.

### Pipelines manuels

Si un pipeline est déclenché manuellement, le champ `is_manual` doit être défini sur true.

## Informations Git

Il est fortement recommandé de fournir les informations Git du commit qui a déclenché l'exécution du pipeline. Les exécutions de pipeline sans informations Git n'apparaissent pas sur la [page des modifications de code récentes][4]. Au minimum, l’URL du dépôt, le SHA du commit et l’e-mail de l’auteur sont requis. Pour plus d'informations, consultez la [public API endpoint specification][3].

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/continuous_integration/pipelines/#setup
[3]: /fr/api/latest/ci-visibility-pipelines/#send-pipeline-event
[4]: https://app.datadoghq.com/ci/commits