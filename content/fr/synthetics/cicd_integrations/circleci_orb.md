---
dependencies:
- https://github.com/DataDog/synthetics-ci-orb/blob/main/README.md
kind: documentation
title: Orbe CircleCI pour l'intégration continue avec Synthetics
---
## Présentation

[![Statut de build CircleCI](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb) [![Version de l'orbe CircleCI](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![License 2.0 Apache](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![Communauté CircleCI](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Exécutez des tests Synthetic dans vos pipelines CircleCI à l'aide de l'orbe CircleCI pour Datadog.

L'orbe de commandes CircleCI installe [datadog-ci][1] et utilise la [commande][2] `datadog-ci synthetics run-tests` pour exécuter des [tests Synthetic Datadog][3].

## Configuration

Pour commencer :

1. Ajoutez vos clés d'API et d'application Datadog à votre projet CircleCI sous forme de variables d'environnement. Référez-vous à la rubrique [Paramètres](#parametres) pour découvrir les conventions de nommage. Pour en savoir plus, consultez la documentation relative aux [clés d'API et d'application][2].
2. Vérifiez que vous exécutez l'orbe sur une image basée sur Linux x64 sur laquelle cURL est installé.

Vous pouvez utiliser un workflow [simple](#utilisation-simple) ou [complexe](#utilisation-complexe).

## Utilisation simple

### Exemple d'utilisation de l'orbe avec des ID publics

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### Exemple d'utilisation de l'orbe avec un remplacement de la configuration globale

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          files: e2e-tests/*.synthetics.json

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

## Utilisation complexe

### Exemple d'utilisation de l'orbe avec une requête `test_search_query`

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          test_search_query: 'tag:e2e-tests'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```
### Exemple d'utilisation de l'orbe avec le [tunnel de test Synthetic][10]

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

jobs:
  e2e-tests:
    docker:
      - image: your-image
    steps:
      - checkout
      - run:
          name: Running server in background
          command: npm start
          background: true
      - synthetics-ci/run-tests:
          config_path: tests/tunnel-config.json
          files: tests/*.synthetics.json
          test_search_query: 'tag:e2e-tests'
          tunnel: true

workflows:
  test-server:
    jobs:
      - build-image
      - integration-tests:
          requires:
            - build-image
```

Pour utiliser des options supplémentaires, par exemple afin de personnaliser `pollingTimeout` pour vos pipelines CircleCI, consultez la section [Configuration d'intégrations CI/CD][12].

## Paramètres

| Name                      | Type         | Valeur par défaut                                   | Description                                                                                          |
| ------------------------- | ------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `api_key`                 | nom de variable d'environnement | `DATADOG_API_KEY`                         | Le nom de la variable d'environnement contenant la clé d'API.                                         |
| `api_key`                 | nom de variable d'environnement | `DATADOG_APP_KEY`                         | Le nom de la variable d'environnement contenant la clé d'application.                                         |
| `config_path`             | chaîne       | `datadog-ci.json`                         | La configuration JSON globale utilisée lors du lancement de tests.                                             |
| `fail_on_critical_errors` | booléen      | `false`                                   | Échoue si les tests n'ont pas été déclenchés ou si leurs résultats n'ont pas pu être récupérés.                                    |
| `fail_on_timeout`         | booléen      | `true`                                    | Force l'échec (ou la réussite) de l'intégration continue si un des résultats dépasse le délai d'expiration du test associé.                       |
| `files`                   | chaîne       | `{,!(node_modules)/**/}*.synthetics.json` | L'expression globale utilisée pour détecter les fichiers de configuration des tests Synthetic.                                                 |
| `locations`               | chaîne       | _valeurs des fichiers de configuration des tests_             | Une chaîne composée des emplacements séparés par des points-virgules permettant de remplacer les emplacements sur lesquels vos tests s'exécutent.          |
| `public_ids`              | chaîne       | _valeurs des fichiers de configuration des tests_             | Une chaîne composée d'ID publics séparés par des virgules correspondant aux tests Synthetic à déclencher.                    |
| `site`                    | chaîne       | `datadoghq.com`                           | Le site Datadog auquel les données doivent être envoyées. Si la variable d'environnement `DD_SITE` est définie, elle est prioritaire. |
| `subdomain`               | chaîne       | `app`                                     | Le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog.                             |
| `test_search_query`       | chaîne       | _aucune_                                    | Déclenche les tests correspondant à une requête de recherche.                                                       |
| `tunnel`                  | booléen      | `false`                                   | Utilise le tunnel de test pour déclencher des tests.                                                             |
| `variables`               | chaîne       | _aucune_                                    | Les paires key-value permettant d'injecter des variables dans des tests. Le format `KEY=VALUE` doit être utilisé.             |
| `version`                 | chaîne       | `v1.7.0`                                  | La version de `datadog-ci` à utiliser.                                                                  |

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Configuration des intégrations CI/CD][6]
- [Synthetics et GitHub Actions pour la CI][11]
- [Tunnel de test Synthetic][10]


[1]: https://github.com/DataDog/datadog-ci/
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics
[3]: https://docs.datadoghq.com/fr/synthetics/cicd_integrations
[4]: https://bats-core.readthedocs.io/en/stable/installation.html
[5]: https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb
[6]: https://circleci.com/docs/2.0/orb-intro/#section=configuration
[7]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/issues
[8]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/pulls
[9]: https://discuss.circleci.com/c/orbs
[10]: https://docs.datadoghq.com/fr/synthetics/testing_tunnel
[11]: https://docs.datadoghq.com/fr/synthetics/cicd_integrations/github_actions
[12]: https://docs.datadoghq.com/fr/synthetics/cicd_integrations/configuration?tab=npm