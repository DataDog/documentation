---
aliases:
- /fr/continuous_integration/static_analysis/github_actions
- /fr/static_analysis/github_actions
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-github-action/blob/main/README.md
description: Utilisez Datadog et GitHub pour exécuter des tâches Static Analysis dans
  un pipeline CI.
title: Static Analysis et GitHub Actions
---
## Présentation

Exécutez une tâche [Datadog Static Analysis][1] dans vos workflows GitHub Action. Cette action encapsule le [Datadog Static Analyzer][8],
l'invoque sur votre base de code et envoie les résultats vers Datadog.

## Workflow

Créez un fichier dans `.github/workflows` pour exécuter une tâche Datadog Static Analysis.

Vous trouverez ci-dessous un exemple de fichier de workflow.

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v3
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_site: "datadoghq.com"
          cpu_count: 2
          enable_performance_statistics: false
```

Vous **devez** définir vos clés API et d'application Datadog en tant que [secrets dans votre référentiel GitHub][4], que ce soit au niveau de l'organisation ou du référentiel. Assurez-vous d'ajouter la portée `code_analysis_read` à votre clé d'application Datadog. Pour en savoir plus, consultez la section [Clés API et d'application][2].

Assurez-vous de remplacer `dd_site` par le site Datadog que vous utilisez[3].

## Paramètres

Vous pouvez définir les paramètres suivants pour Static Analysis.

| Nom         | Rôle                                                                                                                                             | Obligatoire | Valeur par défaut         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Votre clé API Datadog. Cette clé est créée par votre [organisation Datadog][2] et doit être stockée en tant que [secret][2].                                      | Oui     |                 |
| `dd_app_key` | Votre clé d'application Datadog. Cette clé est créée par votre [organisation Datadog][2] et doit être stockée en tant que [secret][4].                              | Oui     |                 |
| `dd_site`    | Le [site Datadog][3] auquel envoyer les informations.                                                                                                           | Non      | `datadoghq.com` |
| `cpu_count`  | Définir le nombre de CPU utilisés par l'analyseur.                                                                                                         | Non      | `2`             |
| `enable_performance_statistics` | Récupérer les statistiques de temps d'exécution pour les fichiers analysés.                                                                                                   | Non      | `false`         |
| `debug`      | Permet à l'analyseur d'afficher des logs supplémentaires utiles pour le debugging. Pour activer, définir sur `yes`.                                                                  | Non      | `no`            |
| `subdirectory` | Un pattern de sous-répertoire ou glob (ou patterns de sous-répertoires délimités par des espaces) auquel l'analyse doit être limitée. Par exemple : "src" ou "src packages". | `false` |                 |
| `diff_aware` | Activer le [mode d'analyse différentielle][5].                                                                                                                   | Non      | `true`          |
| `secrets_enabled` | Activer la détection de secrets (en bêta privée)                                                                                                              | Non      | `false`         |

### Remarques

1. L'analyse différentielle analyse uniquement les fichiers modifiés par un commit lors de l'analyse des branches de fonctionnalité. L'analyse différentielle est activée par défaut. Pour désactiver l'analyse différentielle, définir le paramètre `diff_aware` de l'action GitHub sur `false`.
2. L'analyse de secrets est en bêta privée. Pour activer l'analyse de secrets, contactez votre responsable de la réussite client Datadog.

## Personnaliser les règles

Par défaut, [Datadog Static Analyzer][8] détecte les langages de votre base de code et utilise les ensembles de règles par défaut pour analyser
votre base de code.

Pour spécifier et personnaliser les ensembles de règles, ajoutez un fichier `static-analysis.datadog.yml` au répertoire racine de votre référentiel pour définir les ensembles de règles à utiliser.

```yaml
rulesets:
  - <nom-ensemble-règles>
  - <nom-ensemble-règles>
```

Consultez la [documentation Datadog][6] pour obtenir la liste complète des ensembles de règles.

### Exemple pour Python

Voici un exemple pour les référentiels Python :

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```


## Autres actions GitHub utiles

Datadog Software Composition Analysis (SCA) offre également la possibilité d'analyser vos dépendances
et de détecter les vulnérabilités et licences. Vous pouvez utiliser ce produit avec [`datadog-sca-github-action`][7].


## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [En savoir plus sur Code Analysis][1]

[1]: https://docs.datadoghq.com/fr/code_analysis/static_analysis
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/fr/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/README.md#diff-aware-scanning
[6]: https://docs.datadoghq.com/fr/code_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer