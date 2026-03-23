---
description: Découvrez comment les pipelines sont modélisés et quels types d'exécution
  sont pris en charge par CI Visibility.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Découvrez la visibilité des pipelines
title: Modèle de données des pipelines et types d'exécution
---
## Aperçu

Ce guide décrit comment configurer de manière programmatique les exécutions de pipeline dans CI Visibility et définit les types d'exécution de pipeline que CI Visibility prend en charge. 

Ce guide s'applique aux pipelines créés à l'aide de l'[API publique des pipelines CI Visibility][3]. Les intégrations avec d'autres fournisseurs CI peuvent varier.

## Modèle de données

Les exécutions de pipeline sont modélisées comme des traces, similaires à une [trace distribuée APM][1], où les spans représentent l'exécution de différentes parties du pipeline. Le modèle de données de CI Visibility pour représenter les exécutions de pipeline se compose de quatre niveaux :

| Nom du niveau | Description |
| ---------- | ----------- |
| Pipeline (obligatoire)  | Le span racine de niveau supérieur qui contient tous les autres niveaux en tant qu'enfants. Il représente l'exécution globale d'un pipeline du début à la fin. Ce niveau est parfois appelé `build` ou `workflow` chez certains fournisseurs CI. |
| Étape      | Sert de regroupement de travaux sous un nom défini par l'utilisateur. Certains fournisseurs CI n'ont pas ce niveau. |
| Travail        | La plus petite unité de travail où des commandes sont exécutées. Toutes les tâches à ce niveau doivent être effectuées sur un seul nœud. |
| Étape       | Chez certains fournisseurs CI, ce niveau représente un script shell ou une action exécutée dans un travail. |

Lorsqu'un pipeline, une étape, un travail ou une étape se termine, les données d'exécution sont envoyées à Datadog. Pour configurer la visibilité des pipelines, consultez la liste des [fournisseurs CI pris en charge][2]. Si votre fournisseur CI ou votre flux de travail n'est pas pris en charge, vous pouvez utiliser le [point de terminaison API public][3] pour envoyer vos exécutions de pipeline à la visibilité CI.

{{< img src="ci/ci-pipeline-execution.png" alt="Exemple d'une trace d'exécution de pipeline" style="width:100%;">}}

Les étapes, les travaux et les phases doivent avoir exactement le même nom de pipeline que leur pipeline parent. En cas de désaccord, certaines pipelines peuvent manquer d'informations sur les étapes, les travaux et les phases. Par exemple, des travaux manquants dans les tableaux récapitulatifs des travaux.

### Identifiants uniques de pipeline

Toutes les exécutions de pipeline au sein d'un niveau doivent avoir un identifiant unique. Par exemple, un pipeline et un travail peuvent avoir le même identifiant unique, mais pas deux pipelines.

Lors de l'envoi d'identifiants répétés avec des horodatages différents, l'interface utilisateur peut présenter un comportement indésirable. Par exemple, les graphiques de flamme peuvent afficher des balises de portée d'une exécution de pipeline différente. Si des identifiants en double avec les mêmes horodatages sont envoyés, seules les valeurs de la dernière exécution de pipeline reçue sont stockées.

## Types d'exécution de pipeline

### Exécution normale

L'exécution normale d'un pipeline suit le flux représenté ci-dessous :

{{< img src="ci/pipeline-normal-execution-flow.png" alt="Représentation d'une exécution normale de pipeline" style="width:100%;">}}

Selon le fournisseur, certains niveaux peuvent manquer. Par exemple, certaines étapes peuvent ne pas exister, et les travaux peuvent s'exécuter en parallèle ou en séquence, ou une combinaison des deux.

Après l'achèvement de chaque composant, une charge utile doit être envoyée à Datadog avec toutes les données nécessaires pour représenter l'exécution. Datadog traite ces données, les stocke en tant qu'événement de pipeline et les affiche dans [CI Visibility][2]. Les exécutions de pipeline doivent se terminer avant de les envoyer à Datadog.

### Reprises complètes

Les reprises complètes d'un pipeline doivent avoir des identifiants uniques de pipeline différents. 

Dans le point de terminaison de l'API publique, vous pouvez remplir le champ `previous_attempt` pour lier aux reprises précédentes. Les reprises sont considérées comme des exécutions de pipeline distinctes dans Datadog, et le temps de début et de fin ne doit englober que cette reprise.

### Reprises partielles

Lors de la reprise d'un sous-ensemble de tâches dans un pipeline, vous devez envoyer un nouvel événement de pipeline avec un nouvel identifiant unique de pipeline. La charge utile pour les nouvelles tâches doit être liée au nouvel identifiant unique de pipeline. Pour les lier à la reprise précédente, ajoutez le champ `previous_attempt`. 

Les reprises partielles sont également considérées comme des pipelines distincts. Le temps de début et de fin ne doit pas inclure le temps de la reprise originale. Pour une reprise partielle, ne pas envoyer de charges utiles pour les tâches qui ont été exécutées lors de la tentative précédente. De plus, définissez le champ `partial_retry` sur `true` lors des reprises partielles pour les exclure de l'agrégation lors du calcul des temps d'exécution.

Par exemple, un pipeline nommé `P` a trois tâches différentes, à savoir `J1`, `J2` et `J3`, exécutées séquentiellement. Lors de la première exécution de `P`, seules `J1` et `J2` sont exécutées, et `J2` échoue. 

Par conséquent, vous devez envoyer un total de trois charges utiles :

1. Charge utile de tâche pour `J1`, avec l'ID `J1_1` et l'ID de pipeline `P_1`.
2. Charge utile de tâche pour `J2`, avec l'ID `J2_1` et l'ID de pipeline `P_1`.
3. Charge utile de pipeline pour `P`, avec l'ID `P_1`.

Supposons qu'il y ait une reprise partielle du pipeline commençant à `J2`, où toutes les tâches restantes réussissent. 

Vous devez envoyer trois charges utiles supplémentaires :

1. Charge utile de tâche pour `J2`, avec l'ID `J2_2` et l'ID de pipeline `P_2`.
2. Charge utile de travail pour `J3`, avec ID `J3_1` et ID de pipeline `P_2`.
3. Charge utile de pipeline pour `P`, avec ID `P_2`.

Les valeurs réelles des ID ne sont pas importantes. Ce qui compte, c'est qu'elles soient correctement modifiées en fonction de l'exécution du pipeline comme spécifié ci-dessus.

### Pipelines bloqués

Si un pipeline est indéfiniment bloqué en raison d'une intervention manuelle requise, une charge utile d'événement de pipeline doit être envoyée dès que le pipeline atteint l'état bloqué. Le statut du pipeline doit être défini sur `blocked`. 

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="Flux d'une exécution de pipeline bloqué" style="width:100%;">}}

Les données restantes du pipeline doivent être envoyées dans des charges utiles séparées avec un ID unique de pipeline différent. Dans le deuxième pipeline, vous pouvez définir `is_resumed` sur `true` pour signaler que l'exécution a été reprise d'un pipeline bloqué.

### Pipelines en aval

Si un pipeline est déclenché en tant qu'enfant d'un autre pipeline, le champ `parent_pipeline` doit être rempli avec les détails du pipeline parent.

### Pipelines manuels

Si un pipeline est déclenché manuellement, le champ `is_manual` doit être défini sur vrai.

## Informations Git

Il est fortement recommandé de fournir les informations Git du commit qui a déclenché l'exécution du pipeline. Les exécutions de pipeline sans informations Git n'apparaissent pas sur la [page des modifications de code récentes][4]. Au minimum, l'URL du dépôt, le SHA du commit et l'email de l'auteur sont requis. Pour plus d'informations, consultez la [spécification de l'endpoint API public][3].

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/continuous_integration/pipelines/#setup
[3]: /fr/api/latest/ci-visibility-pipelines/#send-pipeline-event
[4]: https://app.datadoghq.com/ci/commits