---
aliases:
- /fr/synthetics/cicd_integrations/circleci_orb
dependencies:
- https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/README.md
title: Continuous Testing et CircleCI Orb
---
## Présentation

[![CircleCI Build Status](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb.svg?style=shield 'CircleCI Build Status')](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![Apache 2.0 License](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Exécutez des tests Synthetic Datadog dans vos pipelines CircleCI à l'aide de l'orb CircleCI Datadog.

Pour plus d'informations sur la configuration disponible, consultez la [documentation `datadog-ci synthetics run-tests`][1].

## Configuration

Pour commencer :

1. Ajoutez vos clés d'API et d'application Datadog en tant que variables d'environnement à votre projet CircleCI.
   - Pour plus d'informations, consultez la section [Clés d'API et d'application][2].
2. Vérifiez que l'image exécutant l'orb est une image basée sur Linux x64 avec `curl` installé.
3. Personnaliser votre workflow CircleCI en ajoutant une étape `synthetics-ci/run-tests` et en spécifiant des [entrées](#inputs) comme indiqué ci-dessous.

Vous pouvez utiliser un workflow [simple](#utilisation-simple) ou [complexe](#utilisation-complexe).

## Utilisation simple

### Exemple d'utilisation de l'orbe avec des ID publics

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          public_ids: |
            abc-d3f-ghi
            jkl-mn0-pqr

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### Exemple d'utilisation de l'orbe avec un remplacement de la configuration globale

Cet orb remplace le chemin vers le motif pour les [fichiers de test][4].

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

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

Pour un autre exemple de pipeline qui déclenche des tests Synthetic, consultez le [fichier `simple-example.yml`][5].

## Utilisation complexe

### Exemple d'utilisation de l'orbe avec une requête `test_search_query`

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

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

### Exemple d'utilisation de l'orb avec le [tunnel Continuous Testing][7]

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

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

Pour des options supplémentaires telles que la personnalisation du `batchTimeout` pour vos pipelines CircleCI, consultez la section [Configuration des intégrations CI/CD][6]. Pour un autre exemple de pipeline qui démarre un serveur local et déclenche des tests Synthetic à l'aide du tunnel Continuous Testing, consultez le [fichier `advanced-example.yml`][8].

## Paramètres

Pour plus d'informations sur la configuration disponible, consultez la [documentation `datadog-ci synthetics run-tests`][1].

| Nom                      | Rôle                                                                                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `api_key`                 | Nom de la variable d'environnement contenant votre clé d'API Datadog. Cette clé est [créée dans votre organisation Datadog][2] et doit être stockée en tant que secret. <br><sub>**Par défaut :** `DATADOG_API_KEY`</sub>                                                                                                            |
| `app_key`                 | Nom de la variable d'environnement contenant votre clé d'application Datadog. Cette clé est [créée dans votre organisation Datadog][2] et doit être stockée en tant que secret. <br><sub>**Par défaut :** `DATADOG_APP_KEY`</sub>                                                                                                    |
| `background`              | Indique si cette étape doit s'exécuter en arrière-plan ou non. [Consultez la documentation officielle CircleCI][18]. <br><sub>**Par défaut :** `false`</sub>                                                                                                                                                                              |
| `batch_timeout`           | Spécifie la durée du délai d'expiration en millisecondes pour le batch CI. Lorsqu'un batch expire, la tâche CI échoue et aucune nouvelle exécution de test n'est déclenchée, mais les exécutions de test en cours se terminent normalement. <br><sub>**Par défaut :** `1800000` (30 minutes)</sub>                                                                          |
| `config_path`             | Le chemin vers le [fichier de configuration globale][12] qui configure datadog-ci. <br><sub>**Par défaut :** `datadog-ci.json`</sub>                                                                                                                                                                                          |
| `datadog_site`            | Votre site Datadog. Les valeurs possibles sont répertoriées [dans ce tableau][10]. <br><sub>**Par défaut :** `datadoghq.com`</sub> <br><br>Définissez-le sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE correct est sélectionné à droite).                                                    |
| `fail_on_critical_errors` | Faire échouer la tâche CI si une erreur critique généralement transitoire se produit, telle que des limitations de débit, des échecs d'authentification ou des problèmes d'infrastructure Datadog. <br><sub>**Par défaut :** `false`</sub>                                                                                                                        |
| `fail_on_missing_tests`   | Faire échouer la tâche CI si la liste des tests à exécuter est vide ou si certains tests explicitement répertoriés sont manquants. <br><sub>**Par défaut :** `false`</sub>                                                                                                                                                                           |
| `fail_on_timeout`         | Faire échouer la tâche CI si le batch CI échoue en raison d'un délai d'expiration. <br><sub>**Par défaut :** `true`</sub>                                                                                                                                                                                                                             |
| `files`                   | Motifs glob pour détecter les [fichiers de configuration de test][4] Synthetic, séparés par des sauts de ligne. <br><sub>Par défaut : `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                          |
| `junit_report`            | Le nom de fichier d'un rapport JUnit si vous souhaitez en générer un. <br><sub>Par défaut : aucun</sub>                                                                                                                                                                                                                          |
| `locations`               | Remplacer la liste des emplacements à partir desquels exécuter le test, séparés par des sauts de ligne ou des virgules. Les valeurs possibles sont répertoriées [dans cette réponse d'API][3]. <br><sub>**Par défaut :** aucun</sub>                                                                                                                                  |
| `no_output_timeout`       | Temps écoulé pendant lequel la commande peut s'exécuter sans sortie. La chaîne est un décimal avec un suffixe d'unité, tel que `20m`, `1.25h`, `5s`. [Consultez la documentation officielle CircleCI][13]. <br><sub>**Par défaut :** `35m`</sub>                                                                                                              |
| `public_ids`              | ID publics des tests Synthetic à exécuter, séparés par des sauts de ligne ou des virgules. Si aucune valeur n'est fournie, les tests sont découverts dans les [fichiers de configuration de test][4] Synthetic. <br><sub>**Par défaut :** aucun</sub>                                                                                                                 |
| `selective_rerun`         | Indique s'il faut uniquement réexécuter les tests ayant échoué. Si un test a déjà réussi pour un commit donné, il n'est pas réexécuté dans les batchs CI suivants. Par défaut, le [paramètre par défaut de votre organisation][17] est utilisé. Définissez-le sur `false` pour forcer des exécutions complètes lorsque votre configuration l'active par défaut. <br><sub>**Par défaut :** aucun</sub> |
| `subdomain`               | Le sous-domaine personnalisé pour accéder à votre organisation Datadog. Si votre URL est `myorg.datadoghq.com`, le sous-domaine personnalisé est `myorg`. <br><sub>**Par défaut :** `app`</sub>                                                                                                                                                 |
| `test_search_query`       | Utilisez une [requête de recherche][14] pour sélectionner les tests Synthetic à exécuter. Utilisez la [barre de recherche de la page de liste des tests Synthetic][15] pour élaborer votre requête, puis copiez-la et collez-la. <br><sub>**Par défaut :** aucun</sub>                                                                                                                |
| `tunnel`                  | Utilisez le [tunnel Continuous Testing][7] pour lancer des tests contre des environnements internes. <br><sub>**Par défaut :** `false`</sub>                                                                                                                                                                                           |
| `variables`               | Remplacez les variables locales et [globales][16] existantes ou injecter de nouvelles variables dans les tests Synthetic sous forme de paires clé-valeur, séparées par des sauts de ligne ou des virgules. Par exemple : `START_URL=https://example.org,MY_VARIABLE=My title`. <br><sub>**Par défaut :** aucun</sub>                                                                       |

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Débuter avec Continuous Testing][11]
- [Configuration de Continuous Testing et CI/CD][6]
- [Meilleures pratiques pour les tests continus avec Datadog][9]

[1]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[4]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[5]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/simple-example.yml
[6]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration
[7]: https://docs.datadoghq.com/fr/continuous_testing/environments/proxy_firewall_vpn#what-is-the-testing-tunnel
[8]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/advanced-example.yml
[9]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[10]: https://docs.datadoghq.com/fr/getting_started/site/#access-the-datadog-site
[11]: https://docs.datadoghq.com/fr/getting_started/continuous_testing/
[12]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[13]: https://circleci.com/docs/configuration-reference/#run
[14]: https://docs.datadoghq.com/fr/synthetics/explore/#search
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://docs.datadoghq.com/fr/synthetics/platform/settings/?tab=specifyvalue#global-variables
[17]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[18]: https://circleci.com/docs/configuration-reference/#background-commands