---
description: Utilisez Datadog et GitHub pour détecter les secrets exposés dans le
  code au sein d'un pipeline CI.
is_beta: true
title: Secret Scanning et GitHub Actions
---
Exécutez un job [Datadog Secret Scanning][1] dans vos workflows GitHub Actions. Cette action encapsule le [Datadog Static Analyzer][8] (qui recherche les secrets), l'invoque sur votre base de code et téléverse les résultats vers Datadog.

## Workflow {#workflow}

Créez un fichier dans `.github/workflows` pour exécuter un job Datadog Secret Scanning.

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
          static_analysis_enabled: false
          secrets_enabled: true
```

Vous **devez** définir vos clés d'API et d'application Datadog en tant que [secrets dans votre dépôt GitHub][4], au niveau de l'organisation ou du dépôt. Assurez-vous d'ajouter le périmètre `code_analysis_read` à votre clé d'application Datadog. Pour plus d'informations, consultez [Clés d'API et d'application][2].

Assurez-vous de remplacer `dd_site` par le site Datadog que vous utilisez.

## Entrées {#inputs}

Vous pouvez définir les paramètres suivants.

| Nom         | Description :                                                                                                                                           | Requis | Par défaut :         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Votre clé d'API Datadog. Cette clé est créée par votre [organisation Datadog][2] et doit être stockée en tant que [secret][2].                                      | Oui     |                 |
| `dd_app_key` | Votre clé d'application Datadog. Cette clé est créée par votre [organisation Datadog][2] et doit être stockée en tant que [secret][4].                              | Oui     |                 |
| `dd_site`    | Le [site Datadog][3] vers lequel envoyer les informations.                                                                                                           | Non      | `datadoghq.com` |
| `cpu_count`  | Définit le nombre de processeurs utilisés par l'analyseur.                                                                                                         | Non      | `2`             |
| `enable_performance_statistics` | Obtient les statistiques de temps d'exécution pour les fichiers analysés.                                                                                                   | Non      | `false`         |
| `debug`      | Permet à l'analyseur d'afficher des logs supplémentaires utiles pour le débogage. Pour activer, définissez sur `yes`.                                                                  | Non      | `no`            |



<!-- ## Further Reading

Additional helpful documentation, links, and articles:

- [Learn about Code Security][1] -->

[1]: /fr/security/code_security/
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/fr/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[6]: /fr/security/code_security/static_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer