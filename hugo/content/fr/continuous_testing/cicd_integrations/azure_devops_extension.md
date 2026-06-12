---
aliases:
- /fr/synthetics/cicd_integrations/azure_devops_extension
dependencies:
- https://github.com/DataDog/datadog-ci-azure-devops/blob/main/README.md
description: Utilisez Synthetics et l'extension Datadog CI pour créer des tâches et
  les intégrer à un pipeline de CI.
title: Tests continus et extension Datadog CI d'Azure DevOps
---
[![Version du marketplace Visual Studio](https://img.shields.io/visual-studio-marketplace/v/Datadog.datadog-ci)][1]
[![Statut du build](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_apis/build/status/DataDog.datadog-ci-azure-devops?branchName=main)](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_build/latest?definitionId=4&branchName=main)
[![Licence](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Présentation

L'extension Datadog CI d'Azure DevOps vous permet d'exécuter des tests Synthetic au sein de la configuration de votre pipeline Azure et de veiller à ce que toutes vos équipes Azure DevOps puissent utiliser les tests Synthetic durant chaque étape du cycle de développement logiciel. Vous pouvez exécuter [`SyntheticsRunTests`](#taches-disponibles) en tant que tâche.

## Authentification

### Connexion de service

Pour vous connecter à votre site Datadog, Datadog vous conseille de configurer une connexion de service personnalisée lors de la configuration de la tâche Synthetics Run Test.


Vous devez fournir les informations suivantes :

- Datadog site : le site Datadog auquel se connecter.
- Custom subdomain (valeur par défaut : `app`) : le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, cette valeur doit être définie sur `myorg`.
- API Key : votre clé d'API Datadog. Elle est créée par votre [organisation Datadog][6].
- Application key : votre clé d'application Datadog. Elle est créée par votre [organisation Datadog][6].


### Clés d'API et d'application

- API Key : votre clé d'API Datadog. Elle est créée par votre [organisation Datadog][6] et accessible via une variable d'environnement.
- Application key : votre clé d'Application Datadog. Elle est créée par votre [organisation Datadog][6] et accessible via une variable d'environnement.
- Datadog site : le [site Datadog][11].
- Custom subdomain (facultatif) : le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, cette valeur doit être définie sur `myorg`.

## Configuration

Pour associer votre compte Datadog, [créez une connexion de service Datadog CI][5] dans le projet regroupant vos pipelines Azure. Une fois cette connexion créée, vous avez uniquement besoin d'indiquer son nom dans les tâches.

1. Installez l'[extension Datadog CI depuis le marketplace Visual Studio][1] au sein de votre organisation Azure.
2. Ajoutez vos clés d'API et d'application Datadog dans la [connexion de service Datadog CI](#authentification) ou en tant que [secrets dans le projet regroupant vos pipelines Azure][7].
3. Dans votre pipeline Azure DevOps, utilisez la tâche `SyntheticsRunTests`.

Cette tâche peut être [simple](#utilisation-simple) ou [complexe](#utilisation-complexe).

## Utilisation simple

### Exemple de tâche utilisant des ID publics

```yaml
- task: SyntheticsRunTests@0
  displayName: Run Datadog Synthetics tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    publicIds: |
      abc-d3f-ghi
      jkl-mn0-pqr
```

### Exemple de tâche utilisant des fichiers `synthetics.json` existants

```yaml
- task: SyntheticsRunTests@0
  displayName: Run Datadog Synthetics tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    files: 'e2e-tests/*.synthetics.json'
```

### Exemple de tâche utilisant des secrets de pipeline pour l'authentification

```yaml
- task: SyntheticsRunTests@0
  inputs:
    authenticationType: 'apiAppKeys'
    apiKey: '$(DatadogApiKey)'
    appKey: '$(DatadogAppKey)'
    subdomain: 'myorg'
    datadogSite: 'datadoghq.eu'
```

## Utilisation complexe

### Exemple de tâche utilisant une requête `testSearchQuery`

```yaml
- task: SyntheticsRunTests@0
  displayName: Run Datadog Synthetics tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
    variables: |
      START_URL=https://staging.website.com
      PASSWORD=$(StagingPassword)
```

### Exemple de tâche utilisant une requête `testSearchQuery` et des remplacements de variables

```yaml
- task: SyntheticsRunTests@0
  displayName: Run Datadog Synthetics tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
```

### Exemple de tâche utilisant un remplacement de la configuration globale avec `configPath`

```yaml
- task: SyntheticsRunTests@0
  displayName: Run Datadog Synthetics tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    configPath: './synthetics-config.json'
```

## Paramètres

| Name                 | Prérequis | Description                                                                                                                                                                                                                                     |
| -------------------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authenticationType` | _obligatoire_  | Le type d'authentification utilisé par Datadog, à savoir `connectedService` ou `apiAppKeys`.                                                                                                                                                 |
| `connectedService`   | _facultatif_  | Le nom de la [connexion de service Datadog CI](#prerequis) à utiliser, pour une configuration avec le type d'authentification `connectedService`.                                                                                                       |
| `apiKey`             | _facultatif_  | Votre clé d'API Datadog, pour une configuration avec le type d'authentification `apiAppKeys`. Cette clé est créée par votre [organisation Datadog][6] et doit être stockée en tant que [secret][7].                                                                              |
| `appKey`             | _facultatif_  | Votre clé d'application Datadog, pour une configuration avec le type d'authentification `apiAppKeys`. Cette clé est créée par votre [organisation Datadog][6] et doit être stockée en tant que [secret][7].                                                                      |
| `subdomain`          | _facultatif_  | Le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog, pour une configuration avec le type d'authentification `apiAppKeys`. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, cette valeur doit alors être définie sur `myorg`. **Valeur par défaut :** `app`. |
| `datadogSite`        | _facultatif_  | Le [site Datadog][11], pour une configuration avec le type d'authentification `apiAppKeys`. **Valeur par défaut :** `datadoghq.com`.                                                                                                                                           |
| `publicIds`          | _facultatif_  | La liste des ID des tests Synthetic à déclencher, séparés par des retours à la ligne ou des virgules. Si aucune valeur n'est fournie, la tâche cherche des fichiers intitulés `synthetics.json`.                                                                 |
| `testSearchQuery`    | _facultatif_  | Ce paramètre déclenche les tests correspondant à une requête de [recherche][8]. Il est particulièrement utile si vous appliquez des tags à vos configurations de test. Pour en savoir plus, consultez les [règles et bonnes pratiques pour nommer des tags][10].                                                                   |
| `files`              | _facultatif_  | Expression globale permettant de détecter les fichiers de configuration des tests Synthetic. **Valeur par défaut :** `{,!(node_modules)/**/}*.synthetics.json`.                                                                                                                                    |
| `configPath`         | _facultatif_  | La configuration JSON globale utilisée lors du lancement des tests. Pour en savoir plus, consultez l'[exemple de configuration][9]. **Valeur par défaut** : `datadog-ci.json`.                                                                                                |
| `variables`          | _facultatif_  | La liste des variables globales à utiliser pour les tests Synthetic, séparés par des retours à la ligne ou des virgules. Exemple :  `START_URL=https://example.org,MY_VARIABLE=My title`. **Valeur par défaut** : `[]`.                                                                     |


## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Tests continus et configuration CI/CD][4]
- [Conseils à suivre pour effectuer des tests continus avec Datadog][12]

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-ci
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics
[4]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints
[6]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[7]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables
[8]: https://docs.datadoghq.com/fr/synthetics/search/#search
[9]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#setup-a-client
[10]: https://docs.datadoghq.com/fr/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
[11]: https://docs.datadoghq.com/fr/getting_started/site/
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/