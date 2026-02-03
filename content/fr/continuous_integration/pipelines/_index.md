---
aliases:
- /fr/continuous_integration/pipelines_setup/
- /fr/continuous_integration/explore_pipelines/
- /fr/continuous_integration/setup_pipelines/
cascade:
  algolia:
    rank: 70
    tags:
    - ci pipeline
    - ci pipelines
    - fonctionnalités prises en charge
disable_sidebar: true
further_reading:
- link: /monitors/types/ci/
  tag: Documentation
  text: Créer des monitors de pipeline de CI
- link: /account_management/billing/ci_visibility
  tag: Documentation
  text: En savoir plus sur la facturation de CI Visibility
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: CI Pipeline Visibility dans Datadog
---

## Section Overview

[CI Visibility][1] fournit une vue axée sur les pipelines de la santé de votre CI en affichant des métriques et des résultats importants de vos pipelines. Elle vous aide à résoudre les défaillances de pipeline, à traiter les goulots d'étranglement en matière de performances et à suivre les performances et la fiabilité de la CI au fil du temps.

## Configuration

Sélectionnez votre fournisseur CI pour configurer CI Visibility dans Datadog :

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}
<br />

{{< whatsnext desc="Pour les options de personnalisation, consultez les sections suivantes :" >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}Commandes personnalisées{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_measures" >}}Tags et mesures personnalisés{{< /nextlink >}}
{{< /whatsnext >}}

## Fonctionnalités prises en charge

### Visibilité et exécution des pipelines

| <div style="width:200px"><div> | CodePipeline AWS | Azure Pipelines | Buildkite | CircleCI | Codefresh | Actions GitHub | GitLab | Jenkins | TeamCity | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Collecte de logs" >}}Récupération des logs de pipeline ou de tâches auprès du fournisseur CI. Les logs sont affichés dans l'onglet <strong>Logs</strong> de la vue Pipeline Execution.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Corrélation de l'infrastructure" >}}Corrélation des informations au niveau du Host pour l'Agent Datadog, les pipelines CI ou les runners de tâches avec les données d'exécution de pipeline CI.{{< /ci-details >}} |  |  | {{< X >}} |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Pipelines en cours d'exécution" >}}Identification des exécutions de pipelines en cours d'exécution avec tracing associé.{{< /ci-details >}} | {{< X >}} | | | | | {{< X >}} | {{< X >}} | {{< X >}} | | {{< X >}} |
| {{< ci-details title="Tentatives partielles" >}}Identification des nouvelles tentatives partielles (par exemple, lorsque seul un sous-ensemble de tâches a fait l'objet d'une nouvelle tentative).{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Granularité des steps" >}}Les spans de niveau step sont disponibles pour une visibilité plus granulaire.{{< /ci-details >}} |  |  |  |  | {{< X >}} | {{< X >}} |  | {{< X >}} <br /> (_Présentées comme des spans de tâches_) |  |  {{< X >}} |
| {{< ci-details title="Steps manuels" >}}Identification du moment où il y a une tâche avec une phase d'approbation manuelle dans l'ensemble du pipeline.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |

### Analyse automatique

| <div style="width:200px"><div> | CodePipeline AWS | Azure Pipelines | Buildkite | CircleCI | Codefresh | Actions GitHub | GitLab | Jenkins | TeamCity | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Analyse des échecs de tâches" >}}Utilise des modèles LLM sur les logs pertinents pour analyser la cause profonde des tâches CI ayant échoué. <a href="https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/">Plus d'informations</a>.{{< /ci-details >}} |  | {{< X >}} |  |  |  | {{< X >}} | {{< X >}} | |  |  |
| {{< ci-details title="Chemin critique" >}}Identification des tâches CI qui se trouvent sur le chemin critique du pipeline. <a href="https://docs.datadoghq.com/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/">Plus d'informations</a>{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

### Répartition de la durée

| <div style="width:200px"><div> | CodePipeline AWS | Azure Pipelines | Buildkite | CircleCI | Codefresh | Actions GitHub | GitLab | Jenkins | TeamCity | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Temps d'exécution" >}}Temps pendant lequel un pipeline a exécuté activement des tâches.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Temps de mise en file d'attente" >}}Temps pendant lequel un pipeline ou une tâche était dans la file d'attente avant l'exécution.{{< /ci-details >}} |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Temps d'attente d'approbation">}}Temps pendant lequel un pipeline ou une tâche a attendu une approbation manuelle.{{< /ci-details >}} | {{< X >}} | {{< X >}}  |  |  |   |  {{< X >}}  | {{< X >}} |  |  |  |

### Personnalisation et extensibilité

| <div style="width:200px"><div> | CodePipeline AWS | Azure Pipelines | Buildkite | CircleCI | Codefresh | Actions GitHub | GitLab | Jenkins | TeamCity | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Commandes personnalisées" >}}Prise en charge de l'utilisation de datadog-ci pour envoyer des événements au niveau des commandes à CI Visibility afin de les intégrer dans la visualisation en cascade du pipeline. Vous pouvez ensuite interroger et analyser <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">ces événements</a>. {{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Tags statiques" >}}Prise en charge de la définition de tags de pipeline statiques dans le fournisseur CI qui ne changent pas entre les exécutions.{{< /ci-details >}} |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Tags runtime" >}}Prise en charge de l'ajout de <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">tags textuels et numériques définis par l'utilisateur</a> aux pipelines et aux tâches dans CI Visibility.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="Paramètres" >}}Prise en charge de l'ajout de paramètres de pipeline personnalisés définis par les utilisateurs (par exemple, <code>DYNAMICS_IS_CHILD:true</code>). Vous pouvez ensuite effectuer une recherche à l'aide de ces paramètres dans le <a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility Explorer</a> pour trouver tous les événements avec un paramètre spécifique.{{< /ci-details >}} |  |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |

## Utiliser les données de pipelines CI

Lors de la création d'un [dashboard][8] ou d'un [notebook][9], vous pouvez utiliser les données de pipeline CI dans votre requête de recherche, ce qui met à jour les options du widget de visualisation. Pour plus d'informations, consultez la [documentation Dashboards][10] et la [documentation Notebooks][11].

## Créer des alertes sur les données de pipeline

Exporter votre requête de recherche vers un [Monitor CI Pipeline][12] sur la [page **Executions**][6] ou la [page **Test Runs**][13] en cliquant sur le bouton **Export**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[6]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /fr/dashboards
[11]: /fr/notebooks
[12]: /fr/monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs
[14]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/