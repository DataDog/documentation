---
dependencies:
- https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application/blob/main/README.md
title: Continuous Testing et Bitrise
---
![GitHub Release](https://img.shields.io/github/v/release/DataDog/synthetics-test-automation-bitrise-step-upload-application)
[![Build Status](https://app.bitrise.io/app/2d252b25-8c31-427b-98e8-1d0b2bc484c1/status.svg?token=CiGeaNblC2veLBtAbTgmLQ&branch=main)](https://app.bitrise.io/app/2d252b25-8c31-427b-98e8-1d0b2bc484c1)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Présentation

Avec l'étape `synthetics-test-automation-bitrise-step-upload-application`, vous pouvez téléverser une nouvelle version de votre application vers Datadog afin d'exécuter des tests Synthetic pendant votre CI Bitrise, garantissant ainsi que toutes vos équipes utilisant Bitrise puissent bénéficier des tests Synthetic à chaque étape du cycle de vie logiciel.

Cette étape nécessite que votre application existe déjà dans Datadog.

Pour plus d'informations sur la configuration disponible, consultez la [documentation `datadog-ci upload-application`][2].

## Configuration

Cette étape n'est pas disponible dans la bibliothèque officielle d'étapes de Bitrise.
Pour commencer :

1. Ajoutez l'URL git suivante à votre workflow. Consultez la [documentation officielle de Bitrise][3] pour savoir comment procéder via l'application Bitrise. Vous pouvez également la configurer localement en référencant l'URL git dans votre fichier `bitrise.yml`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@v2.4.0:
```

2. Ajoutez vos clés d'API et d'application à vos [secrets dans Bitrise][4]. 
3. [Configurez les entrées de votre étape][5]. Vous pouvez aussi les configurer dans votre fichier `bitrise.yml`. Les seules entrées obligatoires sont les deux secrets que vous avez configurés précédemment. Pour la liste complète des entrées, consultez la [section Entrées](#entrees).

Lorsque vous exécutez l'étape en local avec le CLI Bitrise, les secrets doivent être stockés dans un fichier `.bitrise.secrets.yml`. Consultez la rubrique relative à la [gestion des secrets en local][6].

## Utilisation

### Exemple de tâche utilisant un remplacement de la configuration globale avec `configPath`

Cette tâche remplace le chemin vers le fichier `datadog-ci.config.json` global.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@v2.4.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './synthetics-config.json'
```

### Exemple incluant toutes les configurations possibles

A titre de référence, voici un exemple de configuration complète :

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@v2.4.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './global.config.json'
   - datadog_site: 'datadoghq.com'
   - latest: true
   - mobile_application_id: '123-123-123'
   - mobile_application_version_file_path: 'path/to/application.apk'
   - version_name: 'example 1.0'
```

## Paramètres

Pour plus d'informations sur la configuration disponible, consultez la [documentation `datadog-ci upload-application`][2].

| Nom                                   | Rôle                                                                                                                                                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                              | (**Obligatoire**) Votre clé d'API Datadog. Cette clé est [créée dans votre organisation Datadog][8] et doit être stockée en tant que secret.                                                                                                                                     |
| `app_key`                              | (**Obligatoire**) Votre clé d'application Datadog. Cette clé est [créée dans votre organisation Datadog][8] et doit être stockée en tant que secret.                                                                                                                             |
| `config_path`                          | Le chemin vers le [fichier de configuration global][9] qui configure datadog-ci. <br><sub>**Valeur par défaut :** `datadog-ci.json`</sub>                                                                                                                                         |
| `datadog_site`                         | Votre site Datadog. Les valeurs possibles sont listées [dans ce tableau][14].   <br><sub>**Valeur par défaut :** `datadoghq.com`</sub>    <br><br>Définissez cette valeur sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE correct est sélectionné à droite).  |
| `latest`                               | Marque la nouvelle version comme `latest`. Tous les tests exécutés sur la dernière version utiliseront celle-ci lors de leur prochain lancement. <br><sub>**Valeur par défaut :** `false`</sub>                                                                                                          |
| `mobile_application_id`                | (**Obligatoire**) L'ID de l'application vers laquelle vous souhaitez téléverser la nouvelle version.                                                                                                                                                                                  |
| `mobile_application_version_file_path` | (**Obligatoire**) Le chemin vers la nouvelle version de votre application mobile (`.apk` ou `.ipa`). Vous pouvez utiliser `$BITRISE_IPA_PATH` ou `$BITRISE_APK_PATH` depuis vos étapes de build précédentes.                                                                                 |
| `version_name`                         | (**Obligatoire**) Le nom de la nouvelle version. Il doit être unique.                                                                                                                                                                                                 |

## Sorties

| Nom                                      | Rôle                                                                                                                                                                                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATADOG_UPLOADED_APPLICATION_VERSION_ID` | L'identifiant de version de l'application qui vient d'être téléversée. Transmettez-le à l'[étape Bitrise d'exécution des tests][10] avec l'entrée `mobile_application_version` pour tester cette version de l'application. |

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Premiers pas avec Continuous Testing][13]
- [Continuous Testing et configuration CI/CD][11]
- [Conseils à suivre pour effectuer des tests continus avec Datadog][12]

[2]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#upload-application-command
[3]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/adding-steps-to-a-workflow.html#adding-steps-from-alternative-sources
[4]: https://devcenter.bitrise.io/en/builds/secrets.html#setting-a-secret
[5]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/step-inputs.html
[6]: https://devcenter.bitrise.io/en/bitrise-cli/managing-secrets-locally.html
[8]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[9]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[10]: https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests
[11]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[13]: https://docs.datadoghq.com/fr/getting_started/continuous_testing/
[14]: https://docs.datadoghq.com/fr/getting_started/site/#access-the-datadog-site