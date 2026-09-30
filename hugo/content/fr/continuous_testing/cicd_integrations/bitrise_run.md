---
dependencies:
- https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests/blob/main/README.md
title: Continuous Testing et Bitrise
---
![GitHub Release](https://img.shields.io/github/v/release/DataDog/synthetics-test-automation-bitrise-step-run-tests)
[![Build Status](https://app.bitrise.io/app/7846c17b-8a1c-4fc7-aced-5f3b0b2ec6c4/status.svg?token=480MdFpG78E6kZASg5w1dw&branch=main)](https://app.bitrise.io/app/7846c17b-8a1c-4fc7-aced-5f3b0b2ec6c4)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Présentation

Avec l'étape `synthetics-test-automation-bitrise-step-run-tests`, vous pouvez exécuter des tests Synthetic lors de votre CI Bitrise, afin que toutes vos équipes utilisant Bitrise puissent bénéficier des tests Synthetic à chaque étape du cycle de vie du logiciel.

Pour en savoir plus sur la configuration disponible, consultez la [documentation `datadog-ci synthetics run-tests`][2].

## Configuration

Cette étape n'est pas disponible dans la bibliothèque d'étapes officielle de Bitrise.
Pour commencer :

1. Ajoutez l'URL git suivante à votre workflow. Consultez la [documentation officielle de Bitrise][3] pour savoir comment procéder via l'application Bitrise. Vous pouvez également la configurer localement en référençant l'URL git dans votre fichier `bitrise.yml`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
```

2. Ajoutez vos clés d'API et d'application à vos [secrets dans Bitrise][4].
3. [Configurez vos entrées d'étape][5]. Vous pouvez également les configurer dans votre fichier `bitrise.yml`. Les seules entrées requises sont les deux secrets que vous avez configurés précédemment. Pour obtenir une liste complète des entrées, consultez la [section Entrées](#entrees).

Lorsque vous exécutez l'étape en local avec le CLI Bitrise, les secrets doivent être stockés dans un fichier `.bitrise.secrets.yml`. Consultez la rubrique relative à la [gestion des secrets en local][6].

## Utilisation simple

### Exemple avec des ID publics

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - public_ids: |
      abc-d3f-ghi
      jkl-mn0-pqr
```

### Exemple de tâche utilisant des fichiers `synthetics.json` existants

```yaml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - files: 'e2e-tests/*.synthetics.json'
```

Pour un exemple de fichier de test, consultez ce [fichier `test.synthetics.json`][7].

## Utilisation complexe

### Exemple de tâche utilisant une requête `testSearchQuery`

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - test_search_query: 'tag:e2e-tests'
```

### Exemple de tâche utilisant une requête `testSearchQuery` et des remplacements de variables

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - test_search_query: 'tag:e2e-tests'
   - variables: |
      START_URL=https://staging.website.com
      PASSWORD=$STAGING_PASSWORD
```

### Exemple de tâche utilisant un remplacement de la configuration globale avec `configPath`

Cette tâche remplace le chemin vers le fichier `global.config.json` global.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './global.config.json'
```

### Exemple incluant toutes les configurations possibles

À titre de référence, voici un exemple de configuration complète :

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - batch_timeout: 4200000
   - config_path: './global.config.json'
   - datadog_site: 'datadoghq.com'
   - device_ids: |
      apple iphone se (2022),15.4.1
      apple iphone 14 pro,16.1
   - fail_on_critical_errors: true
   - fail_on_missing_tests: true
   - fail_on_timeout: true
   - files: 'e2e-tests/*.synthetics.json'
   - junit_report: 'e2e-test-junit'
   - locations: 'aws:us-west-1'
   - mobile_application_version: '01234567-8888-9999-abcd-efffffffffff'
   - mobile_application_version_file_path: 'path/to/application.apk'
   - public_ids: 'abc-d3f-ghi,jkl-mn0-pqr'
   - selective_rerun: true
   - subdomain: 'myorg'
   - test_search_query: 'tag:e2e-tests'
   - tunnel: true
   - variables: |
      START_URL=https://staging.website.com
      PASSWORD=$STAGING_PASSWORD
```

## Paramètres

Pour en savoir plus sur la configuration disponible, consultez la [documentation `datadog-ci synthetics run-tests`][2].

| Nom                                   | Rôle                                                                                                                                                                                                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                              | (**Requis**) Votre clé d'API Datadog. Cette clé est [créée dans votre organisation Datadog][9] et doit être stockée en tant que secret.                                                                                                                                                                                     |
| `app_key`                              | (**Requis**) Votre clé d'application Datadog. Cette clé est [créée dans votre organisation Datadog][9] et doit être stockée en tant que secret.                                                                                                                                                                             |
| `batch_timeout`                        | Spécifie la durée du délai d'expiration en millisecondes pour le lot CI. Lorsqu'un lot expire, la tâche CI échoue et aucune nouvelle exécution de test n'est déclenchée, mais les exécutions de test en cours se terminent normalement. <br><sub>**Par défaut :** `1800000` (30 minutes)</sub>                                                                        |
| `config_path`                          | Le chemin vers le [fichier de configuration globale][10] qui configure datadog-ci. <br><sub>**Par défaut :** `datadog-ci.json`</sub>                                                                                                                                                                                        |
| `datadog_site`                         | Votre site Datadog. Les valeurs possibles sont répertoriées [dans ce tableau][16]. <br><sub>**Par défaut :** `datadoghq.com`</sub> <br><br>Définissez-le sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE correct est sélectionné à droite).                                                  |
| `device_ids`                           | Remplacer la liste des appareils sur lesquels exécuter les tests Synthetic, séparés par de nouvelles lignes. <br><sub>**Par défaut :** aucun</sub>                                                                                                                                                                                       |
| `fail_on_critical_errors`              | Faire échouer la tâche CI si une erreur critique généralement transitoire se produit, telle que des limites de débit, des échecs d'authentification ou des problèmes d'infrastructure Datadog. <br><sub>**Par défaut :** `false`</sub>                                                                                                                      |
| `fail_on_missing_tests`                | Faire échouer la tâche CI si la liste des tests à exécuter est vide ou si certains tests explicitement répertoriés sont manquants. <br><sub>**Par défaut :** `false`</sub>                                                                                                                                                                         |
| `fail_on_timeout`                      | Faire échouer la tâche CI si le batch CI échoue en raison d'un délai d'expiration. <br><sub>**Par défaut :** `true`</sub>                                                                                                                                                                                                                           |
| `files`                                | Motifs glob pour détecter les [fichiers de configuration de test][7] Synthetic, séparés par des sauts de ligne. <br><sub>**Par défaut :** `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                   |
| `junit_report`                         | Le nom de fichier d'un rapport JUnit si vous souhaitez en générer un. <br><sub>**Par défaut :** aucun</sub>                                                                                                                                                                                                                    |
| `locations`                            | Remplacer la liste des emplacements à partir desquels exécuter le test, séparés par des sauts de ligne ou des virgules. Les valeurs possibles sont répertoriées [dans cette réponse d'API][20]. <br><sub>**Par défaut :** aucun</sub>                                                                                                                               |
| `mobile_application_version_file_path` | Remplacer la version d'application mobile pour les [tests d'application mobile][19] Synthetic par une application locale ou récemment compilée. Vous pouvez utiliser `$BITRISE_IPA_PATH` ou `$BITRISE_APK_PATH` de vos étapes de compilation précédentes. <br><sub>**Par défaut :** aucun</sub>                                                         |
| `mobile_application_version`           | Remplacer la version d'application mobile pour les [tests d'application mobile][19] Synthetic. La version doit être téléchargée et disponible dans Datadog. Vous pouvez utiliser l'[étape Bitrise pour télécharger une application][11] et utiliser sa sortie `DATADOG_UPLOADED_APPLICATION_VERSION_ID` ici. <br><sub>**Par défaut :** aucun</sub> |
| `public_ids`                           | ID publics des tests Synthetic à exécuter, séparés par des sauts de ligne ou des virgules. Si aucune valeur n'est fournie, les tests sont découverts dans les [fichiers de configuration de test][7] Synthetic. <br><sub>**Par défaut :** aucun</sub>                                                                                                               |
| `selective_rerun`                      | Indique s'il faut uniquement réexécuter les tests ayant échoué. Si un test a déjà réussi pour un commit donné, il n'est pas réexécuté dans les batchs CI suivants. Par défaut, le paramètre par défaut de votre organisation est utilisé. Définissez-le sur `false` pour forcer des exécutions complètes lorsque votre configuration l'active par défaut. <br><sub>**Par défaut :** aucun</sub>     |
| `subdomain`                            | Le sous-domaine personnalisé permettant d'accéder à votre organisation Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, le sous-domaine personnalisé est `myorg`. <br><sub>**Par défaut :** `app`</sub>                                                                                                                         |
| `test_search_query`                    | Utiliser une [requête de recherche][12] pour sélectionner les tests Synthetic à exécuter. Utilisez la [barre de recherche de la page de liste des tests Synthetic][15] pour élaborer votre requête, puis copiez-la et collez-la. <br><sub>**Par défaut :** aucun</sub>                                                                                                              |
| `tunnel`                               | Utiliser le [tunnel Continuous Testing][14] pour lancer des tests contre des environnements internes. <br><sub>**Par défaut :** `false`</sub>                                                                                                                                                                                        |
| `variables`                            | Remplacer les variables locales et [globales][21] existantes ou injecter de nouvelles variables dans les tests Synthetic sous forme de paires clé-valeur, séparées par des sauts de ligne ou des virgules. Par exemple : `START_URL=https://example.org,MY_VARIABLE=My title`. <br><sub>**Par défaut :** aucun</sub>                                                                    |

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Débuter avec Continuous Testing][17]
- [Configuration de Continuous Testing et CI/CD][13]
- [Conseils à suivre pour effectuer des tests continus avec Datadog][18]

[2]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[3]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/adding-steps-to-a-workflow.html#adding-steps-from-alternative-sources
[4]: https://devcenter.bitrise.io/en/builds/secrets.html#setting-a-secret
[5]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/step-inputs.html
[6]: https://devcenter.bitrise.io/en/bitrise-cli/managing-secrets-locally.html
[7]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[9]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[10]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[11]: https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application
[12]: https://docs.datadoghq.com/fr/synthetics/search/#search
[13]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration
[14]: https://docs.datadoghq.com/fr/continuous_testing/environments/proxy_firewall_vpn#what-is-the-testing-tunnel
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://docs.datadoghq.com/fr/getting_started/site/#access-the-datadog-site
[17]: https://docs.datadoghq.com/fr/getting_started/continuous_testing/
[18]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[19]: https://docs.datadoghq.com/fr/synthetics/mobile_app_testing/
[20]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[21]: https://docs.datadoghq.com/fr/synthetics/platform/settings/?tab=specifyvalue#global-variables