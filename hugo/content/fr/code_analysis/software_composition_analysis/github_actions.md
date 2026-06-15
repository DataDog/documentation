---
dependencies:
- https://github.com/DataDog/datadog-sca-github-action/blob/main/README.md
description: Utilisez Datadog et GitHub pour exécuter des tâches Software Composition
  Analysis dans un pipeline CI.
title: Software Composition Analysis et GitHub Actions
---
Exécutez une tâche [Software Composition Analysis][1] Datadog dans vos workflows GitHub Action. Cette action invoque
[Datadog osv-scanner][3] sur votre base de code et envoie les résultats dans Datadog.

## Génération d'inventaire de bibliothèques

L'action GitHub génère automatiquement un inventaire de bibliothèques en fonction des bibliothèques déclarées dans votre référentiel.

L'action GitHub fonctionne pour les langages et fichiers suivants :

 - JavaScript/TypeScript : `package-lock.json` et `yarn.lock`
 - Python : `requirements.txt` (avec version définie) et `poetry.lock`
 - Java : `pom.xml`
 - C#
 - Ruby
 - ... et d'autres langages (répertoriés dans la [documentation](https://docs.datadoghq.com/code_analysis/software_composition_analysis/))

## Configuration

### Configurer les clés

Ajoutez `DD_APP_KEY` et `DD_API_KEY` en tant que secrets dans vos [paramètres GitHub Actions][2]. Assurez-vous que votre clé d'application Datadog dispose de la portée `code_analysis_read`. Pour en savoir plus, consultez la section [Clés API et d'application][7].

### Workflow

Ajoutez l'extrait de code suivant dans `.github/workflows/datadog-sca.yml`. Assurez-vous de remplacer
l'attribut `dd_site` par le [site Datadog][4] que vous utilisez.

```yaml
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: "datadoghq.com"
```

## Outils Datadog associés

[Datadog Static Analysis][5] analyse votre code et fournit un retour dans votre IDE, dans les pull requests GitHub ou dans
l'environnement Datadog. Datadog Static Analysis peut être configuré à l'aide de l'action GitHub 
[`datadog-static-analyzer-github-action`][6].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [En savoir plus sur Software Composition Analysis][1]

[1]: https://docs.datadoghq.com/fr/code_analysis/software_composition_analysis
[2]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[3]: https://github.com/DataDog/osv-scanner
[4]: https://docs.datadoghq.com/fr/getting_started/site/
[5]: https://docs.datadoghq.com/fr/code_analysis/static_analysis
[6]: https://github.com/DataDog/datadog-static-analyzer-github-action
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/