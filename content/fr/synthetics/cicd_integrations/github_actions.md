---
dependencies:
- https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
kind: documentation
title: Synthetics et GitHub Actions pour la CI
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
      - name: Paiement
        uses: actions/checkout@v2
      - name: Exécuter des tests Synthetic Datadog
        uses: DataDog/synthetics-ci-github-action@v0.3.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### Exemple de workflow utilisant un fichier `synthetics.json` existant

```yaml
name: Exécuter des tests Synthetic avec un fichier synthetics.json existant
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Paiement
        uses: actions/checkout@v2
      - name: Exécuter des tests Synthetic Datadog
        uses: DataDog/synthetics-ci-github-action@v0.3.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
```

**Remarque** : par défaut, ce workflow exécute tous les tests répertoriés dans les fichiers `{,!(node_modules)/**/}*.synthetics.json` (à savoir, tous les fichiers qui se termine par `.synthetics.json`, sauf ceux contenus dans le dossier `node_modules`). Vous pouvez également déclencher une liste de tests Synthetic en spécifiant un `public_id` ou en utilisant une requête de recherche.

## Workflows complexes

### Exemple de workflow utilisant une requête `test_search_query`

```yaml
name: Exécuter des tests Synthetic en fonction des tags de test
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Paiement
        uses: actions/checkout@v2
      - name: Exécuter des tests Synthetic Datadog
        uses: DataDog/synthetics-ci-github-action@v0.3.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'
```

### Exemple de workflow utilisant une configuration globale prioritaire avec `config_path`

```yaml
name: Exécuter des tests Synthetic avec une configuration personnalisée
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Paiement
        uses: actions/checkout@v2
      - name: Exécuter des tests Synthetic Datadog
        uses: DataDog/synthetics-ci-github-action@v0.3.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          config_path: './synthetics-config.json'
```

## Paramètres

| Nom                | Type   | Prérequis | Description                                                                                                                                                                                              |
| ------------------- | ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`           | chaîne | _obligatoire_  | Votre clé d'API Datadog. Cette clé est créée par votre {organisation Datadog][2]. Elle doit être stockée sous la forme d'un [secret][3]. **Valeur par défaut** : aucune.                                                                    |
| `app_key`           | chaîne | _obligatoire_  | Votre clé d'application Datadog. Cette clé est créée par votre {organisation Datadog][2]. Elle doit être stockée sous la forme d'un [secret][3]. **Valeur par défaut** : aucune.                                                            |
| `public_ids`        | chaîne | _facultatif_  | Une chaîne composée d'ID publics séparés par des virgules correspondant aux tests Synthetic à déclencher. Si aucune valeur n'est fournie, l'action recherche les fichiers dont le nom contient `synthetics.json`. **Valeur par défaut :** aucune.                   |
| `test_search_query` | chaîne | _facultatif_  | Déclenche les tests correspondants à une requête de [recherche][5]. **Valeur par défaut :** aucune.                                                                                                                                   |
| `subdomain`         | chaîne | _facultatif_  | Le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, la valeur du sous-domaine doit alors être définie sur `myorg`. **Valeur par défaut :** `app`. |
| `files`             | chaîne | _facultatif_  | Expression globale permettant de détecter les fichiers de configuration des tests Synthetic. **Valeur par défaut :** `{,!(node_modules)/**/}*.synthetics.json`.                                                                                             |
| `datadog_site`      | chaîne | _facultatif_  | Le site Datadog. Pour les utilisateurs situés dans l'UE, définissez le site sur `datadoghq.eu`. Exemple : `datadoghq.com` ou `datadoghq.eu`. **Valeur par défaut :** `datadoghq.com`.                                                              |
| `config_path`       | chaîne | _facultatif_  | La configuration JSON globale utilisée lors du lancement des tests. Consultez l'[exemple de configuration][4] pour en savoir plus. **Valeur par défaut** : `datadog-ci.json`.                                                         |

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
2. Modifiez la version du package à l'aide de la commande `yarn version [--patch|--minor|--major]` (choisissez l'option correspondant à la nature de vos changements).
   - Consultez la section [Gestion sémantique des versions](https://semver.org/#summary) (en anglais) pour identifier les éléments à incrémenter.
   - Recréez et empaquetez le projet avant de le publier. N'oubliez pas de modifier les exemples de version du fichier `README.md`
3. Envoyez la branche ainsi que le tag de version (`git push --tags`) en amont (à GitHub).
   - Créez une pull request en indiquant dans la description les modifications apportées. Cette pull request doit au moins être approuvée une fois.
4. Fusionnez la pull request.
5. Créez une version GitHub depuis la [page Tags](https://github.com/DataDog/synthetics-ci-github-action/tags) en prenant soin de décrire vos modifications.

⚠️ Vérifiez que le numéro de version respecte le format attendu : `vX.X.X`.

Une fois ce processus terminé, la nouvelle version de l'action GitHub est disponible en tant que workflow.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Configuration des intégrations CI/CD][6]

[1]: https://github.com/DataDog/datadog-ci
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/fr/synthetics/cicd_integrations/configuration/?tab=npm#setup-a-client
[5]: https://docs.datadoghq.com/fr/synthetics/search/#search
[6]: https://docs.datadoghq.com/fr/synthetics/cicd_integrations/configuration