---
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-circleci-orb/blob/main/README.md
description: Utilisez Datadog et CircleCI pour exécuter des tâches Static Analysis
  dans un pipeline CI.
title: Static Analysis et Orbs CircleCI
---
[![Statut de build CircleCI](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb) [![Version de l'Orb CircleCI](https://badges.circleci.com/orbs/datadog/datadog-static-analyzer-circleci-orb.svg)](https://circleci.com/developer/orbs/orb/datadog/datadog-static-analyzer-circleci-orb) [![Licence GitHub](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/DataDog/datadog-static-analyzer-circleci-orb/main/LICENSE) [![Communauté CircleCI](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

## Présentation

Exécutez une tâche Static Analysis Datadog dans vos workflows CircleCI.

La solution Static Analysis est en version bêta privée. Pour demander à y accéder, [contactez l'assistance][5].

## Implémentation

Pour utiliser la solution Static Analysis de Datadog, vous devez ajouter un fichier `static-analysis.datadog.yml` dans le répertoire racine de votre référentiel afin de spécifier les ensembles de règles à utiliser.

```yaml
rulesets:
  - <nom-ensemble-règles>
  - <nom-ensemble-règles>
```

### Exemple pour Python

Voici un exemple pour les référentiels basés sur Python :

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

## Workflow

Créez un fichier dans `.circleci` pour exécuter une tâche Static Analysis Datadog.

Vous trouverez ci-dessous un exemple de fichier de workflow.

```yaml
version: 2.1
orbs:
  datadog-static-analysis: datadog/datadog-static-analyzer-circleci-orb@1
jobs:
  run-static-analysis-job:
    docker:
      - image: cimg/node:current
    steps:
      - checkout
      - datadog-static-analysis/analyze:
          service: my-service
          cpu_count: 2
          enable_performance_statistics: false
workflows:
  main:
    jobs:
      - run-static-analysis-job
```

### Variables d'environnement

Définissez les variables d'environnement suivantes sur la [page des paramètres de projet CircleCI][1].

| Nom         | Description                                                                                                                | Obligatoire |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Votre clé d'API Datadog. Cette clé est créée par votre [organisation Datadog][2]. Elle doit être stockée sous la forme d'un secret.              | Oui     |
| `DD_APP_KEY` | Votre clé d'application Datadog. Cette clé est créée par votre [organisation Datadog][3]. Elle doit être stockée sous la forme d'un secret.      | Oui     |

## Paramètres

Pour personnaliser votre workflow, vous pouvez définir les paramètres suivants pour Static Analysis.

| Nom         | Description                                                                                                                | Obligatoire | Valeur par défaut         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | Le service à appliquer comme tag à vos résultats.                                                                                | Oui     |                 |
| `env`     | L'environnement à appliquer comme tag à vos résultats. Datadog vous recommande d'utiliser `ci` comme valeur pour cette entrée.                 | Non    | `none`          |
| `site`    | Le [site Datadog][4] auquel envoyer les informations.                                                                                 | Non    | `datadoghq.com` | 
| `cpu_count`  | Définir le nombre de CPU utilisés par l'analyseur.                                                                            | Non      | `2`             |
| `enable_performance_statistics` | Récupérer les statistiques de temps d'exécution pour les fichiers analysés.                                                   | Non      | `false`         |

[1]: https://circleci.com/docs/set-environment-variable/#set-an-environment-variable-in-a-project
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#application-keys
[4]: https://docs.datadoghq.com/fr/getting_started/site/
[5]: https://docs.datadoghq.com/fr/help/