---
aliases:
- /fr/synthetics/cicd_integrations/github_actions
dependencies:
- https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
kind: documentation
title: Tests continus et GitHub Actions pour la CI
---
## Présentation

Déclenchez des tests Synthetic depuis vos workflows GitHub grâce à la [commande CI Synthetics Datadog][1].

## Configuration

Pour commencer :

1. Ajoutez vos clés d'API et d'application Datadog à votre référentiel GitHub sous forme de secrets. Pour en savoir plus, consultez la section [Clés d'API et clés d'application][2].
2. Utilisez `DataDog/synthetics-ci-github-action` dans votre workflow GitHub.

Vous pouvez utiliser un workflow [simple](#workflows-simples) ou [complexe](#workflows-complexes).

## Workflows simples

### Exemple de workflow utilisant des ID publics

```yaml
name: Exécuter des tests Synthetic avec des ID de test publics
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.17.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### Exemple de workflow utilisant un fichier `synthetics.json` existant

```yaml
name: Exécuter des tests Synthetic avec un fichier synthetics.json
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.17.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
```

Pour consulter un exemple de test, référez-vous au [fichier `test.synthetics.json`][12].

**Remarque** : par défaut, ce workflow exécute tous les tests répertoriés dans les fichiers `{,!(node_modules)/**/}*.synthetics.json` (à savoir, tous les fichiers qui se termine par `.synthetics.json`, sauf ceux contenus dans le dossier `node_modules`). Vous pouvez également déclencher une liste de tests Synthetic en spécifiant un `public_id` ou en utilisant une requête de recherche.

## Workflows complexes

### Exemple de workflow utilisant une requête `test_search_query`

```yaml
name: Exécuter des tests Synthetic en fonction des tags de test
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.17.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'
```

### Exemple de workflow utilisant une requête de recherche de test et des remplacements de variables

```yaml
name: Exécuter des tests Synthetic avec une requête de recherche
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.17.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:staging'
          variables: 'START_URL=https://staging.website.com,PASSWORD=stagingpassword'
```

### Exemple de workflow utilisant un remplacement de la configuration globale avec `config_path`

Cette action GitHub remplace le chemin vers le fichier `datadog-ci.config.json` global.

```yaml
name: Exécuter des tests Synthetic avec une configuration
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.17.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          config_path: './synthetics-config.json'
```

Pour consulter un exemple de test, référez-vous au [fichier `global.config.json`][13].

## Paramètres

| Nom                      | Type    | Prérequis | Description                                                                                                                                                                                                                                  |
| ------------------------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                 | chaîne  | _obligatoire_  | Votre clé d'API Datadog. Cette clé est créée par votre [organisation Datadog][2]. Elle doit être stockée sous la forme d'un [secret][3]. **Valeur par défaut** : aucune.                                                                                                        |
| `app_key`                 | chaîne  | _obligatoire_  | Votre clé d'application Datadog. Cette clé est créée par votre {organisation Datadog][2]. Elle doit être stockée sous la forme d'un [secret][3]. **Valeur par défaut** : aucune.                                                                                                |
| `public_ids`              | chaîne  | _facultatif_  | Une liste d'ID publics séparés par des virgules correspondant aux tests Synthetic à déclencher. Si aucune valeur n'est fournie, l'action recherche les fichiers dont le nom contient `synthetics.json`. **Valeur par défaut :** aucune.                                                             |
| `test_search_query`       | chaîne  | _facultatif_  | Déclenche les tests correspondants à une [requête de recherche][5]. **Valeur par défaut :** aucune.                                                                                                                                                                       |
| `subdomain`               | chaîne  | _facultatif_  | Le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, la valeur du sous-domaine doit alors être définie sur `myorg`. **Valeur par défaut :** `app`.                                     |
| `files`                   | chaîne  | _facultatif_  | Expression globale permettant de détecter les fichiers de configuration des tests Synthetic. **Valeur par défaut :** `{,!(node_modules)/**/}*.synthetics.json`.                                                                                                                           |
| `datadog_site`            | chaîne  | _facultatif_  | Le [site Datadog][11] auquel envoyer les données. **Valeur par défaut :** `datadoghq.com`.                                                                                                                                                                        |
| `config_path`             | chaîne  | _facultatif_  | La [configuration JSON globale][4] utilisée lors du lancement des tests. Consultez l'[exemple de fichier de configuration][13] pour en savoir plus. **Valeur par défaut** : `datadog-ci.json`.                                                                               |
| `variables`               | chaîne  | _facultatif_  | La liste de variables globales séparées par des virgules à utiliser pour les tests Synthetic. Exemple :  `START_URL=https://example.org,MY_VARIABLE=My title`. **Valeur par défaut** : `[]`.                                                                                   |
| `junit_report`            | chaîne  | _facultatif_  | Le nom du fichier de rapport JUnit, si vous souhaitez générer un tel fichier. **Valeur par défaut :** aucune.                                                                                                                                                              |
| `tunnel`                  | booléen | _facultatif_  | Permet d'utiliser le [tunnel de test en continu][9] afin d'exécuter votre lot de tests. **Valeur par défaut :** `false`.                                                                                                                                                     |
| `polling_timeout`         | nombre  | _facultatif_  | La durée, exprimée en millisecondes, après laquelle l'action arrête de rechercher les résultats des tests. Pour la CI, les tests qui se finissent après cette durée sont considérés comme des échecs. **Valeur par défaut :** 30 minutes.                                            |
| `fail_on_critical_errors` | booléen | _facultatif_  | Permet d'entraîner l'échec de la tâche CI si aucun test n'a été déclenché, ou si les résultats n'ont pas pu être récupérés à partir de Datadog. **Valeur par défaut :** `false`.                                                                                                                              |
| `fail_on_missing_tests`   | booléen | _facultatif_  | Permet d'entraîner l'échec de la tâche CI si au moins l'un des tests spécifiés à l'aide d'un ID public (avec `public_ids` ou avec la liste incluse dans un [fichier de test][12]) est manquant dans une série (par exemple, s'il a été supprimé par programmation ou depuis le site Datadog). **Valeur par défaut :** `false`. |
| `fail_on_timeout`         | booléen | _facultatif_  | Permet d'entraîner l'échec de la tâche CI si la durée d'exécution d'au moins un test dépasse le délai d'expiration par défaut. **Valeur par défaut :** `true`.                                                                                                                                                  |

## Développement

```bash


yarn jest

# Créer le projet
yarn build

# Compiler le projet et ses dépendances afin de le publier
yarn package
```

### Processus de publication

Pour publier une nouvelle version de `synthetics-ci-github-action`, procédez comme suit :

1. Créez une nouvelle branche pour la mise à niveau de la version.
2. Mettez à jour la version du package à l'aide de `yarn version [--patch|--minor|--major]`, en adaptant la commande selon la nature des changements. Consultez la section relative à la [gestion sémantique des versions][7] pour déterminer ce que vous devez incrémenter. Une fois la commande `yarn version` exécutée, un nouveau commit `vX.Y.Z` doté d'un nouveau tag est ajouté à l'arborescence Git.
3. Mettez à jour les exemples de version de `README.md`, puis exécutez `yarn build && yarn package` pour générer et packager le projet.

   Assurez-vous d'utiliser le **commit contenant le tag `vX.Y.Z`** pour soumettre ces changements. Pour fusionner les changements au sein d'un seul et même commit, utilisez la commande `git commit --amend` ou la commande `git rebase -i HEAD~2`.

4. Envoyez la branche ainsi que le tag de version (`git push --tags`) en amont (à GitHub).

   Créez une pull request en indiquant dans la description les modifications apportées. Cette pull request doit au moins être approuvée une fois.

5. Fusionnez la pull request.
6. Créez une version GitHub depuis la [page Tags][8], en prenant soin de décrire vos changements.

⚠️ Vérifiez que le numéro de version respecte le format attendu : `vX.Y.Z`.

Une fois ce processus terminé, la nouvelle version de l'action GitHub est disponible en tant que workflow.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Configuration des tests continus et du CI/CD][6]
- [Conseils à suivre pour effectuer des tests continus avec Datadog][12]

[1]: https://github.com/DataDog/datadog-ci
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#setup-the-client
[5]: https://docs.datadoghq.com/fr/synthetics/search/#search
[6]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration
[7]: https://semver.org/#summary
[8]: https://github.com/DataDog/synthetics-ci-github-action/tags
[9]: https://docs.datadoghq.com/fr/continuous_testing/testing_tunnel/
[10]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[11]: https://docs.datadoghq.com/fr/getting_started/site
[12]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json