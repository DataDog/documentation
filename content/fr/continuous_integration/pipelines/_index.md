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
further_reading:
- link: /monitors/types/ci/
  tag: Documentation
  text: Créer des monitors de pipeline de CI
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: CI Pipeline Visibility dans Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

La solution [Pipeline Visibility][1] vous permet d'étudier la santé de votre CI grâce à une interface axée sur vos pipelines. Elle présente les principales métriques et les résultats clés de vos pipelines. Cette solution simplifie le diagnostic des échecs de pipeline, vous aide à supprimer les goulots d'étranglement limitant vos performances et contribue à surveiller l'évolution des performances et la fiabilité de votre CI.

## Configuration

{{< whatsnext desc="Sélectionnez votre fournisseur CI pour configurer Pipeline Visibility dans Datadog :" >}}
    {{< nextlink href="continuous_integration/pipelines/awscodepipeline" >}}AWS CodePipeline{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/azure" >}}Azure{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/buildkite" >}}Buildkite{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/circleci" >}}CircleCI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/codefresh" >}}Codefresh{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/github" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/teamcity" >}}TeamCity{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom" >}}Autres fournisseurs CI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}Commandes personnalisées{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_metrics" >}}Tags et métriques personnalisés{{< /nextlink >}}
{{< /whatsnext >}}

### Termes

Les concepts liés à un pipeline de CI peuvent varier selon le fournisseur. Vous trouverez ci-dessous la liste des équivalences entre les concepts de la solution Pipeline Visibility Datadog et ceux des différents fournisseurs CI :

{{< tabs >}}
{{% tab "GitHub Actions" %}}

| Datadog | GitHub Actions |
|---|---|
| Pipeline | Workflow |
| Stage (phase) |  |
| Job (tâche) | Job |
| Step (étape) | Step |

{{% /tab %}}
{{% tab "GitLab" %}}

| Datadog | GitLab |
|---|---|
| Pipeline | Pipeline |
| Stage (phase) | Stage |
| Job (tâche) | Job |
| Step (étape) |  |

{{% /tab %}}
{{% tab "Jenkins" %}}

| Datadog | Jenkins |
|---|---|
| Pipeline | Pipeline |
| Stage (phase) | Stage |
| Job (tâche) | Job |
| Step (étape) | Step |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Datadog | CircleCI |
|---|---|
| Pipeline | Pipeline |
| Stage (phase) | Workflow |
| Job (tâche) | Job |
| Step (étape) | Step |

{{% /tab %}}
{{% tab "Buildkite" %}}


| Datadog | Buildkite |
|---|---|
| Pipeline | Pipeline |
| Stage (phase) |  |
| Job (tâche) | Job |
| Step (étape) |  |

{{% /tab %}}
{{% tab "TeamCity" %}}

| Datadog | TeamCity |
|---|---|
| Pipeline | Build Chain |
| Stage (phase) |  |
| Job (tâche) | Build |
| Step (étape) |  |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Datadog | Pipelines Azure |
|---|---|
| Pipeline | Pipeline |
| Stage (phase) | Stage |
| Job (tâche) | Job |
| Step (étape) | Step |

{{% /tab %}}
{{% tab "AWS CodePipeline" %}}

| Datadog | AWS CodePipeline |
|---|---|
| Pipeline | Pipeline |
| Stage (phase) | Stage |
| Job (tâche) | Action |
| Step (étape) |  |

{{% /tab %}}

{{% tab "Autres fournisseurs CI" %}}

| Datadog | Autres fournisseurs CI |
|---|---|
| Pipeline | Pipeline |
| Stage (phase) | Stage |
| Job (tâche) | Job |
| Step (étape) | Step |

{{% /tab %}}
{{< /tabs >}}

Si votre fournisseur CI n'est pas pris en charge, vous pouvez essayer de configurer Pipeline Visibility via l'[endpoint d'API public][2].

### Fonctionnalités prises en charge

|  | Jenkins | GitLab | CircleCI | Buildkite | GitHub Actions | Pipelines Azure | Codefresh | TeamCity | AWS CodePipeline | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Visualisation des traces des pipelines" >}}Visualisation des exécutions de pipeline avec le tracing associé.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Pipelines en cours d'exécution" >}}Identification des pipelines en cours d'exécution avec le tracing associé.{{< /ci-details >}} | | {{< X >}} | | | {{< X >}} | | | | |
| {{< ci-details title="Nouvelles tentatives partielles" >}}Identification des nouvelles tentatives partielles (par exemple, lorsqu'une nouvelle tentative porte uniquement sur un sous-ensemble de jobs).{{< /ci-details >}} |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Étapes manuelles" >}}Identification des jobs avec une phase d'approbation manuelle dans le pipeline global.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="Durée d'attente" >}}Identification de la durée d'attente d'un pipeline ou d'un job avant son exécution.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="Mise en corrélation des logs" >}}Récupération des logs de pipeline ou de job à partir du fournisseur CI. Les logs s'affichent dans l'onglet <strong>Logs</strong> de la vue Pipeline Execution.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="Mise en corrélation des métriques relatives à l'infrastructure" >}}Mise en corrélation des informations aux niveau des hosts pour l'Agent Datadog, les pipelines de CI ou les exécuteurs de job avec les données relatives aux exécutions de pipeline de CI.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="Spans personnalisées pour les commandes tracées avec datadog-ci" >}}Possibilité d'envoyer des événements au niveau des commandes à CI Visibility et de les intégrer dans le flamegraph des pipelines. <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">Ces événements</a> peuvent ensuite être interrogés et analysés.{{< /ci-details >}} | {{< X >}} |  | {{< X >}} |  | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="Tags prédéfinis personnalisés" >}}Possibilité de définir des tags de pipeline statiques dans le fournisseur CI. Ces tags ne changent pas après chaque exécution.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |
| {{< ci-details title="Tags et métriques personnalisés à l'exécution" >}}Possibilité d'ajouter du <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_metrics/">texte et des tags numériques définis par l'utilisateur</a> aux pipelines et jobs dans CI Visibility.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |  |  {{< X >}} |
| {{< ci-details title="Paramètres" >}}Possibilité d'ajouter des paramètres de pipeline personnalisés définis par l'utilisateur (par exemple, <code>DYNAMICS_IS_CHILD:true</code>). Une recherche peut être effectuée à partir de ces paramètres dans le <a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility Explorer</a> afin d'afficher tous les événements dotés d'un paramètre spécifique.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="Motif de l'échec des pipelines" >}}Identification de l'origine des échecs de pipeline ou de job.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |

## Utiliser les données des pipelines de CI

Lors de la création d'un [dashboard][8] ou d'un [notebook][9], vous pouvez utiliser les données de pipeline de CI dans votre requête de recherche, afin de mettre à jour les options des widgets de visualisation. Pour en savoir plus, consultez la documentation relative aux [dashboards][10] et aux [notebooks][11].

## Envoyer des alertes basées sur les données de pipeline

Cliquez sur le bouton **Export** pour exporter votre requête de recherche vers un [monitor de pipeline de CI][12] sur la [page **Pipelines Executions**][6] ou la [page **Test Runs**][13].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[2]: /fr/api/latest/ci-visibility-pipelines/#send-pipeline-event
[6]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /fr/dashboards
[11]: /fr/notebooks
[12]: /fr/monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs