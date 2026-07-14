---
algolia:
  tags:
  - datadog lambda extension
aliases:
- /fr/synthetics/cicd_integrations/github_actions
dependencies:
- https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
title: Tests continus et GitHub Actions pour la CI
---
## Section Overview

![GitHub Release](https://img.shields.io/github/v/release/DataDog/synthetics-ci-github-action)

Déclenchez des tests Synthetic Datadog depuis vos workflows GitHub.

Pour plus d'informations sur la configuration disponible, consultez la [documentation `datadog-ci synthetics run-tests`][1].

## Configuration

Pour commencer :

1. Ajoutez vos clés d'API et d'application Datadog en tant que secrets à votre référentiel GitHub.
   - Pour plus d'informations, consultez la section [Clés d'API et d'application][2].
2. Utilisez `DataDog/synthetics-ci-github-action` dans votre workflow GitHub.

Vous pouvez utiliser un workflow [simple](#workflows-simples) ou [complexe](#workflows-complexes).

## Workflows simples

### Exemple de workflow utilisant des ID publics

```yaml
name: Run Synthetic tests using the test public IDs
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
          public-ids: |
            abc-d3f-ghi
            jkl-mn0-pqr
```

### Exemple de workflow utilisant un fichier `synthetics.json` existant

```yaml
name: Run Synthetic tests using an existing synthetics.json file
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
```

Pour un exemple de fichier de test, consultez ce [fichier `test.synthetics.json`][12].

**Remarque** : par défaut, ce workflow exécute tous les tests répertoriés dans les fichiers `{,!(node_modules)/**/}*.synthetics.json` (chaque fichier se terminant par `.synthetics.json` à l'exception de ceux dans le dossier `node_modules`). Vous pouvez également déclencher une liste de tests Synthetic en spécifiant un `public_id` ou en utilisant une requête de recherche.

## Workflows complexes

### Exemple de workflow utilisant une requête `test_search_query`

```yaml
name: Run Synthetic tests by test tag
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
          test-search-query: 'tag:e2e-tests'
```

### Exemple de workflow utilisant une requête de recherche de test et des remplacements de variables

```yaml
name: Run Synthetic tests using search query
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
          test-search-query: 'tag:staging'
          variables: 'START_URL=https://staging.website.com,PASSWORD=stagingpassword'
```

### Exemple de workflow utilisant un fichier de configuration globale avec `config_path`

Par défaut, le chemin vers le fichier de configuration globale est `datadog-ci.json`. Vous pouvez remplacer ce chemin avec l'entrée `config_path`.

```yaml
name: Run Synthetic tests with custom config
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
          config-path: './global.config.json'
```

## Paramètres

Pour plus d'informations sur la configuration disponible, consultez la [documentation `datadog-ci synthetics run-tests`][1].

| Nom                      | Rôle                                                                                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `api-key`                 | (**Requis**) Votre clé d'API Datadog. Cette clé est [créée dans votre organisation Datadog][2] et doit être stockée en tant que [secret][3].                                                                                                                                                                                  |
| `app-key`                 | (**Requis**) Votre clé d'application Datadog. Cette clé est [créée dans votre organisation Datadog][2] et doit être stockée en tant que [secret][3].                                                                                                                                                                          |
| `batch-timeout`           | Spécifie la durée du délai d'expiration en millisecondes pour le batch CI. Lorsqu'un batch expire, la tâche CI échoue et aucune nouvelle exécution de test n'est déclenchée, mais les exécutions de test en cours se terminent normalement. <br><sub>**Par défaut :** `1800000` (30 minutes)</sub>                                                                          |
| `config-path`             | Le chemin vers le [fichier de configuration globale][4] qui configure datadog-ci. <br><sub>**Par défaut :** `datadog-ci.json`</sub>                                                                                                                                                                                           |
| `datadog-site`            | Votre site Datadog. Les valeurs possibles sont répertoriées [dans ce tableau][11]. <br><sub>**Par défaut :** `datadoghq.com`</sub> <br><br>Définissez-le sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE correct est sélectionné à droite).                                                    |
| `fail-on-critical-errors` | Faire échouer la tâche CI si une erreur critique généralement transitoire se produit, telle que des limitations de débit, des échecs d'authentification ou des problèmes d'infrastructure Datadog. <br><sub>**Par défaut :** `false`</sub>                                                                                                                        |
| `fail-on-missing-tests`   | Faire échouer la tâche CI si la liste des tests à exécuter est vide ou si certains tests explicitement répertoriés sont manquants. <br><sub>**Par défaut :** `false`</sub>                                                                                                                                                                           |
| `fail-on-timeout`         | Faire échouer la tâche CI si le batch CI échoue en raison d'un délai d'expiration. <br><sub>**Par défaut :** `true`</sub>                                                                                                                                                                                                                             |
| `files`                   | Motifs glob pour détecter les [fichiers de configuration de test][12] Synthetic, séparés par des sauts de ligne. <br><sub>**Par défaut :** `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                    |
| `junit-report`            | Le nom de fichier d'un rapport JUnit si vous souhaitez en générer un. <br><sub>**Par défaut :** aucun</sub>                                                                                                                                                                                                                      |
| `locations`               | Remplacer la liste des emplacements à partir desquels exécuter le test, séparés par des sauts de ligne ou des virgules. Les valeurs possibles sont répertoriées [dans cette réponse d'API][17]. <br><sub>**Par défaut :** aucun</sub>                                                                                                                                 |
| `public-ids`              | ID publics des tests Synthetic à exécuter, séparés par des sauts de ligne ou des virgules. Si aucune valeur n'est fournie, les tests sont découverts dans les [fichiers de configuration de test][12] Synthetic. <br><sub>**Par défaut :** aucun</sub>                                                                                                                |
| `selective-rerun`         | Indique s'il faut uniquement réexécuter les tests ayant échoué. Si un test a déjà réussi pour un commit donné, il n'est pas réexécuté dans les batchs CI suivants. Par défaut, le [paramètre par défaut de votre organisation][16] est utilisé. Définissez-le sur `false` pour forcer des exécutions complètes lorsque votre configuration l'active par défaut. <br><sub>**Par défaut :** aucun</sub> |
| `subdomain`               | Le sous-domaine personnalisé pour accéder à votre organisation Datadog. Si votre URL est `myorg.datadoghq.com`, le sous-domaine personnalisé est `myorg`. <br><sub>**Par défaut :** `app`</sub>                                                                                                                                                 |
| `test-search-query`       | Utilisez une [requête de recherche][5] pour sélectionner les tests Synthetic à exécuter. Utilisez la [barre de recherche de la page de liste des tests Synthetic][13] pour élaborer votre requête, puis copiez-la et collez-la. <br><sub>**Par défaut :** aucun</sub>                                                                                                                 |
| `tunnel`                  | Utilisez le [tunnel Continuous Testing][9] pour lancer des tests contre des environnements internes. <br><sub>**Par défaut :** `false`</sub>                                                                                                                                                                                           |
| `variables`               | Remplacez les variables locales et [globales][14] existantes ou injecter de nouvelles variables dans les tests Synthetic sous forme de paires clé-valeur, séparées par des sauts de ligne ou des virgules. Par exemple : `START_URL=https://example.org,MY_VARIABLE=My title`. <br><sub>**Par défaut :** aucun</sub>                                                                      |

## Sorties

| Nom                        | Rôle                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `batch-url`                 | L'URL du batch CI.                                                             |
| `critical-errors-count`     | Le nombre d'erreurs critiques qui se sont produites pendant le batch CI.                     |
| `failed-count`              | Le nombre de résultats ayant échoué pendant le batch CI.                               |
| `failed-non-blocking-count` | Le nombre de résultats ayant échoué pendant le batch CI sans bloquer la CI.       |
| `passed-count`              | Le nombre de résultats ayant réussi pendant le batch CI.                               |
| `previously-passed-count`   | Le nombre de résultats ayant déjà réussi dans des batchs CI précédents sur le même commit. |
| `tests-not-found-count`     | Le nombre de tests qui n'ont pas pu être trouvés lors du démarrage du batch CI.              |
| `tests-skipped-count`       | Le nombre de tests qui ont été ignorés lors du démarrage du batch CI.                    |
| `timed-out-count`           | Le nombre de résultats ayant échoué en raison du délai d'expiration du batch CI.                    |
| `raw-results`               | Le tableau [`synthetics.Result[]`][18], sous forme de chaîne encodée en JSON.                     |

## Contributions

Consulter [CONTRIBUTING.md](./CONTRIBUTING.md)

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Débuter avec Continuous Testing][15]
- [Configuration de Continuous Testing et CI/CD][6]
- [Conseils à suivre pour effectuer des tests continus avec Datadog][10]

[1]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[5]: https://docs.datadoghq.com/fr/synthetics/explore/#search
[6]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration
[7]: https://semver.org/#summary
[8]: https://github.com/DataDog/synthetics-ci-github-action/tags
[9]: https://docs.datadoghq.com/fr/continuous_testing/environments/proxy_firewall_vpn#what-is-the-testing-tunnel
[10]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[11]: https://docs.datadoghq.com/fr/getting_started/site/#access-the-datadog-site
[12]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: https://app.datadoghq.com/synthetics/tests
[14]: https://docs.datadoghq.com/fr/synthetics/platform/settings/?tab=specifyvalue#global-variables
[15]: https://docs.datadoghq.com/fr/getting_started/continuous_testing/
[16]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[17]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[18]: https://github.com/DataDog/datadog-ci/blob/251299775d28b0535d0e5557fcc494a8124d3b11/src/commands/synthetics/interfaces.ts#L196-L227