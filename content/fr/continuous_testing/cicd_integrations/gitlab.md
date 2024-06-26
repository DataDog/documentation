---
aliases:
- /fr/synthetics/cicd_integrations/gitlab
description: Configurez votre instance de GitLab de façon à exécuter des tests Continuous Testing
  dans vos pipelines CI/CD.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: GitHub
  text: Exécuter des tests Synthetic Datadog dans vos pipelines GitLab
- link: /continuous_integration/pipelines/gitlab/
  tag: Documentation
  text: Configurer le tracing sur un pipeline GitLab
kind: documentation
title: GitLab
---

## Présentation

Exécutez des tests Continuous Testing dans vos pipelines [GitLab][1], bloquez les déploiements et déclenchez des rollbacks pour vous assurer que votre code est ajouté à la production lorsque les flux de travail essentiels de votre entreprise fonctionnent comme prévu.

Pour intégrer les tests Continuous Testing à un [pipeline GitLab][2], vous pouvez utiliser le [package datadog-ci npm][3].

## Configuration

Pour commencer :

1. Ajoutez votre API Datadog et vos clés d'application en tant que variables dans votre projet GitLab.
2. Assurez-vous que votre exécuteur GitLab a une version de Node.js >= 10.24.1 installée.

Pour en savoir plus, consultez [Configuration des intégration CI/CD][27].

## Configuration simple

### Exécuter des tests à l'aide d'ID de test

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --public-id xtf-w5p-z5n --public-id eif-van-tu7
{{< /code-block >}}

### Exécuter des tests à lʼaide de tags

{{< code-block lang="yaml" >}}
stages: 
  - test
Synthetic-tests :
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests'
{{< /code-block >}}

### Exécuter des tests en utilisant des remplacements de variables

Si vous avez des utilisateurs de tests différents ou des données spécifiques à votre environnement CI/CD, vous pouvez remplacer ces variables par le package NPM `-v` command. For more information, see the Synthetics command](https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics) in the `datadog-ci`.

{{< code-block lang="yaml" >}}
stages: 
  - test
Synthetic-tests :
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests' -v PASSWORD="$PASSWORD"
{{< /code-block >}}

## Configuration avancée

### Exécuter des tests à l'aide d'un fichier de configuration personnalisé

Ajoutez un fichier personnalisé `config.json` au référentiel de votre pipeline et accédez-y dans la configuration de votre pipeline.

{{< code-block lang="yaml" >}}
stages: 
  - test
Synthetic-tests :
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --config synthetics_global.json -f synthetic_test.json
{{< /code-block >}}

### Résultat du test

Cet exemple montre que le pipeline a identifié le fichier de configuration et exécute le test :

{{< img src="synthetics/cicd_integrations/gitlab/synthetic_test_run.png" alt="A Synthetic test running in GitLab" style="width:100%;" >}}

Une sortie de test réussie renvoie le résultat suivant dans GitLab :

{{< img src="synthetics/cicd_integrations/gitlab/successful_test_run.png" alt="Un résultat dʼexécution de test Synthetic réussi dans un pipeline GitLab" style="width:100%;" >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/gitlab/
[2]: https://docs.gitlab.com/ee/ci/pipelines/
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /fr/synthetics/cicd_integrations/configuration