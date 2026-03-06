---
description: Découvrez comment rechercher et filtrer vos exécutions de pipeline dans
  le CI Visibility Explorer.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les données de pipeline pour résoudre les problèmes liés aux builds
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurer des alertes de pipeline avec les monitors CI Datadog
title: CI Visibility Explorer
---

## Présentation

Depuis le CI Visibility Explorer, vous pouvez [rechercher et filtrer](#rechercher-et-filtrer-des-executions), [visualiser](#visualiser-des-executions) et [exporter](#exporter-des-executions) des exécutions de pipeline à différents niveaux en utilisant n'importe quel tag.

Naviguez jusqu'à [**Software Delivery** > **CI Visibility** > **Executions**][5] pour consulter les résultats de vos exécutions de pipeline de CI aux niveaux suivants : **Pipeline**, **Stage**, **Job**, **Step** et **Command**.

{{< img src="/continuous_integration/pipeline_executions.png" text="Page des exécutions de pipeline de CI" style="width:100%" >}}

## Facettes CI par défaut

Le volet **CI** affiché à gauche énumère les facettes par défaut que vous pouvez utiliser pour rechercher vos exécutions de pipeline.

| Facette | Description |
|---|---|
| CI Status | Le statut de l'exécution de CI : `Success`, `Failure` ou `Canceled`. |
| CI Instance | Le nom de l'instance du fournisseur de CI. |
| Duration | La durée de l'exécution du pipeline. |
| Pipeline ID | L'ID du pipeline. |
| CI Provider | Le nom du fournisseur de CI. |
| Node Labels | Les étiquettes du nœud. |
| Node Name | Le nom du nœud. |
| Partial Pipeline | Correspond aux exécutions de pipeline de CI qui comprennent des nouvelles tentatives, des approbations manuelles ou d'autres séquences incomplètes. |
| Partial Retry | Indique si l'exécution de CI correspondait à une nouvelle tentative d'une exécution précédente. |
| Manually Triggered | Indique si l'exécution de CI a été déclenchée manuellement. |
| Parameters | Les paramètres définis par l'utilisateur lorsqu'un pipeline ou un job se déclenche. |
| Pipeline Number | Le numéro du pipeline. |
| Pipeline URL | L'URL du pipeline. |
| Queue Time | La durée d'attente totale d'un job ou d'une tâche dans la file d'attente de CI avant son exécution. |
| Deployment | L'environnement GitLab déployé avec un pipeline de CI. |
| Deployment Action | L'action effectuée dans l'environnement déployé de GitLab. |
| Command Name | L'identifiant défini par l'utilisateur pour une commande spécifique au sein du pipeline de CI. |
| Command | La ligne de commande qui a été exécutée pour générer la span de pipeline personnalisée. |
| Downstream Pipeline | Indique si ce pipeline se trouve en aval d'un autre pipeline. |
| Upstream Pipeline ID | L'identifiant de l'exécution de pipeline qui précède et déclenche le pipeline actuel. |
| Step Name | Le nom attribué à une étape spécifique du pipeline de CI. |
| Error Domain | Le type d'erreur d'une exécution de CI, par exemple un fournisseur, un utilisateur ou une erreur inconnue. |
| Run time | La durée totale d'exécution du pipeline de CI. |
| Wait time | Le temps total passé à attendre une approbation manuelle au sein d'une exécution de CI. |
| Is Deployment | Indique si un job au sein du pipeline a initié un déploiement. |
| Contains Deployment | Indique si le pipeline inclut un ou plusieurs jobs qui déclenchent un déploiement. |
| On Critical Path | Indique si le job se trouve sur le chemin critique de l'exécution de pipeline de CI. |

Pour en savoir plus sur les facettes communes que vous pouvez utiliser dans vos requêtes de recherche sur le CI Visibility Explorer, consultez la section [Facettes des exécutions de pipeline][3].

## Informations sur les exécutions de pipeline et traces

Vous pouvez consulter des données agrégées sur les exécutions de pipeline sur un intervalle donné. Utilisez le champ de recherche et les facettes pour filtrer la liste et visualiser les exécutions qui vous intéressent. Les boutons en haut de la page vous permettent de modifier la liste et de basculer entre les pipelines, les étapes et les jobs.

Les trois graphiques ci-dessous représentent respectivement les durées de vos pipelines les plus actifs, vos échecs de pipeline au fil du temps et les exécutions de vos pipelines, avec une option permettant de basculer vers la durée cumulée. Ces graphiques sont filtrés sur le niveau choisi en haut à gauche de la page (`Pipeline`, `Stage`, `Job`, etc.).

{{< img src="ci/pipeline_explorer_trends.png" alt="Graphiques de tendance de la vue Explorer pour les durées, les erreurs et les exécutions" style="width:100%;">}}

Chaque exécution de pipeline est transmise sous la forme d'une trace qui contient des informations à propos des étapes et des jobs. Cliquez sur une exécution dans la liste pour accéder aux traces des exécutions d'un pipeline, d'une étape ou d'un job (tout comme les exécutions de pipeline dans la vue Pipeline Details).

Les données sur les pipelines de CI peuvent être présentées dans des [dashboards][6] et des [notebooks][7]. Les ingénieurs build peuvent donc personnaliser leurs visualisations sur l'évolution des tâches prioritaires et des tendances CI.

## Rechercher et filtrer des exécutions

Vous pouvez restreindre, élargir ou modifier les données représentées en affichant un sous-ensemble d'exécutions de pipeline. Pour ce faire, cliquez sur les facettes sur la gauche, ou rédigez votre propre requête personnalisée dans la barre de recherche. Lorsque vous sélectionnez ou désélectionnez des facettes, la barre de recherche reflète automatiquement vos changements. De même, vous pouvez modifier la requête de la barre de recherche ou écrire une nouvelle requête dans la barre de recherche pour sélectionner et désélectionner les facettes à gauche.

- Pour découvrir comment rechercher des pipelines, consultez la section [Rechercher et gérer les pipelines CI][1].
- Pour apprendre à créer des requêtes, consultez la section [Syntaxe de recherche][2].

## Analyser des exécutions

Regroupez les exécutions de pipeline interrogées dans des entités de niveau supérieur telles que des champs, des patterns et des transactions afin de déduire ou de consolider des informations. Il n'est pas nécessaire d'utiliser des [facettes][3] pour rechercher des attributs. Les facettes vous permettent toutefois d'accomplir ce qui suit :

- Rechercher des tests s'exécutant dans un pipeline de CI/CD et suivre leur progression
- Analyser chaque exécution de job de CI/CD pour identifier et dépanner les échecs d'exécution de test

## Visualiser des exécutions

Sélectionnez un type de visualisation pour afficher les résultats de vos filtres et agrégations, afin de mieux comprendre vos exécutions de pipeline. Par exemple, vous pouvez représenter vos exécutions de pipeline dans une liste afin d'organiser les données associées dans des colonnes, ou les afficher dans un [graphique de série temporelle][8] afin de mesurer l'évolution des données de vos pipelines.

## Exporter des exécutions

[Exportez votre vue][4] dans le CI Visibility Explorer pour la réutiliser plus tard ou dans un autre contexte.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/search
[2]: /fr/continuous_integration/explorer/search_syntax
[3]: /fr/continuous_integration/explorer/facets
[4]: /fr/continuous_integration/explorer/saved_views
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries