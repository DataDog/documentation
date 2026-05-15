---
aliases:
- /fr/continuous_integration/pipelines/custom_tags_and_metrics
- /fr/continuous_integration/setup_pipelines/custom_tags_and_metrics
further_reading:
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurer des alertes de pipeline avec les monitors CI Datadog
title: Ajouter des tags personnalisés et des mesures aux traces de pipeline
---

## Section Overview

Utilisez les commandes de tags personnalisés et de mesures pour ajouter des tags textuels et numériques définis par l'utilisateur à vos traces de pipeline dans [CI Pipeline Visibility][11]. Vous pouvez utiliser le [package NPM `datadog-ci`][1] pour ajouter des tags personnalisés à une trace de pipeline ou à un span de tâche, en plus d'ajouter des mesures à une trace de pipeline ou à un span de tâche. À partir de ces tags personnalisés et mesures, vous pouvez créer des facets (tags de valeur de chaîne) ou des measures (tags de valeur numérique).

Vous pouvez utiliser des facets et des measures pour filtrer, créer des visualisations ou créer des monitors pour vos pipelines dans le [CI Visibility Explorer][10].

### Compatibilité

Les tags personnalisés et les mesures fonctionnent avec les fournisseurs CI suivants :

- Buildkite
- CircleCI
- GitLab (SaaS ou auto-hébergé >= 14.1)
- GitHub.com (SaaS) : pour ajouter des tags et des mesures aux tâches GitHub, consultez la [section ci-dessous](#ajouter-des-tags-et-des-mesures-aux-tâches-github).
- Jenkins : pour Jenkins, suivez [ces instructions][5] pour configurer des tags personnalisés dans vos pipelines.
- Azure DevOps Pipelines

## Installer la CLI Datadog CI

Installez l'interface de ligne de commande [`datadog-ci`][1] (>=v1.15.0) de façon globale avec `npm` :

```shell
npm install -g @datadog/datadog-ci
```

<div class="alert alert-info">Consultez la section <a href="https://github.com/DataDog/datadog-ci?tab=readme-ov-file#more-ways-to-install-the-cli">Plus de façons d'installer la CLI</a> dans le référentiel datadog-ci pour des options d'installation alternatives.</div>

## Ajouter des tags aux traces de pipeline

Les tags peuvent être ajoutés au span de pipeline ou au span de tâche.

Pour ce faire, exécutez la commande `tag` :

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag [--level <pipeline|job>] [--tags <tag1>] [--tags <tag2>] ...
```

Vous devez spécifier une [clé d'API Datadog][3] valide en utilisant la variable d'environnement `DATADOG_API_KEY` et le [site Datadog][12] en utilisant la variable d'environnement `DATADOG_SITE`.

L'exemple suivant ajoute les tags `team` et `service` au span de pipeline.

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level pipeline --tags team:backend --tags service:processor
```

L'exemple suivant ajoute le tag `go.version` au span pour la tâche actuelle :

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level job --tags "go.version:`go version`"
```

Pour créer une facette à partir d'un tag, cliquez sur l'icône d'engrenage à côté du nom d'un tag sur la [page Pipeline Executions][4] et cliquez sur **Create Facet**.

{{< img src="ci/custom-tags-create-facet.mp4" alt="Création de facettes pour des tags personnalisés" style="width:100%;" video="true">}}

## Ajouter des mesures aux traces de pipeline 

Pour ajouter des tags numériques au span de pipeline ou au span de tâche, exécutez la commande `measure` :

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure [--level <pipeline|job>] [--measures <measure1>] [--measures <measure2>]...
```

Vous devez spécifier une [clé d'API Datadog][3] valide en utilisant la variable d'environnement `DATADOG_API_KEY` et le [site Datadog][12] en utilisant la variable d'environnement `DATADOG_SITE`.

L'exemple suivant ajoute les mesures `error_rate` et `size` au span de pipeline :

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level pipeline --measures "error_rate:0.56" --measures "size:2327"
```

L'exemple suivant ajoute une mesure `binary.size` au span de la tâche en cours d'exécution :

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level job --measures "binary.size:`ls -l dst/binary | awk '{print \$5}' | tr -d '\n'`"
```

Pour créer une measure, cliquez sur l'icône d'engrenage à côté du nom d'une measure sur la [page Exécutions de pipeline][4] et cliquez sur **Create Measure**.

## Ajouter des tags et des mesures aux tâches GitHub


À partir de la version `4.1.1` de `datadog-ci`, aucune action supplémentaire n'est requise, même lors de l'utilisation de noms personnalisés ou de stratégies matricielles.

<details>
<summary><strong>Pour les versions de datadog-ci antérieures à 4.1.1</strong></summary>

Si vous utilisez la version `2.29.0` à `4.1.0` de `datadog-ci` et que le nom de la tâche ne correspond pas à l'entrée définie dans le fichier de configuration du workflow (le [job ID][7] GitHub), la variable d'environnement `DD_GITHUB_JOB_NAME` doit être exposée, pointant vers le nom de la tâche. Par exemple :

1. Si le nom de la tâche est modifié en utilisant la [name property][8] :
    ```yaml
    jobs:
      build:
        name: My build job name
        env:
          DD_GITHUB_JOB_NAME: My build job name
        steps:
        - run: datadog-ci tag ...
    ```
2. Si la [matrix strategy][9] est utilisée, plusieurs noms de tâches sont générés par GitHub en ajoutant les valeurs de la matrice à la fin du nom de la tâche, entre parenthèses. La variable d'environnement `DD_GITHUB_JOB_NAME` doit alors être conditionnelle aux valeurs de la matrice :

    ```yaml
    jobs:
      build:
        strategy:
          matrix:
            version: [1, 2]
            os: [linux, macos]
        env:
          DD_GITHUB_JOB_NAME: build (${{ matrix.version }}, ${{ matrix.os }})
        steps:
        - run: datadog-ci tag ...
    ```
</details>

## Limites

- Le nombre maximum de tags pouvant être ajoutés à un pipeline ou à une tâche est de 100.
- Le nombre maximum de mesures pouvant être ajoutées à un pipeline ou à une tâche est de 100.
- La longueur maximale d'un tag ou d'une mesure est de 300 caractères (clé + valeur).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/datadog/datadog-ci#standalone-binary-beta
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /fr/continuous_integration/pipelines/jenkins?tab=usingui#setting-custom-tags-for-your-pipelines
[6]: /fr/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux#add-tags-and-measures-to-github-jobs
[7]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[8]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[9]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy
[10]: /fr/continuous_integration/explorer
[11]: /fr/continuous_integration/pipelines/
[12]: /fr/getting_started/site/