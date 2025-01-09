---
aliases:
- /fr/synthetics/ci
- /fr/synthetics/cicd_testing
- /fr/synthetics/cicd_integrations
description: Exécutez des tests continus à la demande ou à des intervalles prédéfinis
  dans vos pipelines de CI/CD.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: GitHub
  text: Intégrer des tests Datadog Synthetic dans votre pipeline de CI/CD.
- link: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
  tag: GitHub
  text: Meilleures pratiques pour réaliser des tests en amont
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centre d'apprentissage
  text: Découvrir comment exécuter des tests Synthetic dans un pipeline de CI/CD
- link: /synthetics/api_tests/
  tag: Documentation
  text: Découvrir comment configurer un test API
- link: /synthetics/multistep
  tag: Documentation
  text: Découvrir comment configurer un test API à plusieurs étapes
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Découvrir comment configurer un test Browser
title: Tests continus et CI/CD
---

<div class="alert alert-info">Cette page explique comment exécuter des tests continus dans vos pipelines d'intégration continue (CI) et de livraison continue (CD). Si vous souhaitez intégrer vos métriques et données de CI/CD dans des dashboards Datadog, consultez plutôt la section <a href="/continuous_integration/" target="_blank">CI Visibility</a>.</div>

## Présentation

En plus d'exécuter des tests à des intervalles prédéfinis, vous avez la possibilité de réutiliser vos tests Synthetic Datadog et de les exécuter quand bon vous semble à l'aide du package `@datadog/datadog-ci` ou de l'API. Exécutez des tests continus Datadog dans vos pipelines d'intégration continue (CI) pour bloquer le déploiement des branches susceptibles de nuire au bon fonctionnement de votre application en production.

Cette solution vous permet également d'exécuter des tests dans le cadre de votre processus de livraison continue (CD) et d'évaluer l'état de vos applications et services en production dès la fin d'un déploiement ou dès la publication d'une nouvelle version. Vous pouvez ainsi détecter les régressions potentielles susceptibles d'avoir un impact sur vos utilisateurs et déclencher automatiquement un rollback si un test critique échoue.

Cette fonctionnalité accélère la correction des problèmes en production en vous permettant dès le départ d'identifier de manière proactive et anticipée les bugs et régressions. Au lieu de perdre leur temps à corriger ces problèmes, vos équipes d'ingénieries peuvent ainsi se concentrer sur des tâches non urgentes.

Pour profiter de ces avantages, consultez les [intégrations](#integrations) et [utilisez l'API](#utiliser-l-api) ou le [package de l'interface de ligne de commande open source](#utiliser-l-interface-de-ligne-de-commande).

## Intégrations

{{< whatsnext desc="Les tests continus et le CI/CD vous permettent d'exécuter des tests dans la plateforme de CI tierce de votre choix. Consultez la documentation pour en savoir savoir plus sur les intégrations suivantes ou sur le package NPM datadog-ci :">}}
    {{< nextlink href="synthetics/cicd_integrations/azure_devops_extension" >}}Extension Azure DevOps{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/circleci_orb" >}}CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/configuration" >}}Package NPM{{< /nextlink >}}
{{< /whatsnext >}}

## Utiliser l'interface de ligne de commande

Le [package `@datadog/datadog-ci`][1] vous permet d'exécuter des tests continus directement dans votre pipeline CI/CD. Pour utiliser le [package NPM `@datadog/datadog-ci`][2], consultez la section [Configuration][3].

Vous pouvez déclencher des tests en les recherchant à l'aide de tags. Exemple : `"ci": "datadog-ci synthetics run-tests --config fileconfig.json -s 'tag:staging'"`. Cette commande fonctionne comme un argument ; ne l'utilisez pas dans vos fichiers de configuration.

## Utiliser l'API

Les endpoints d'API Synthetics vous permettent de lancer des tests à n'importe quelle étape de votre cycle de préproduction et de déploiement, par exemple après un déploiement Canary avec un rollback automatisé.

Grâce aux endpoints d'API, vous pouvez vérifier rapidement qu'un nouveau déploiement n'entraîne pas de nouvelle régression. Consultez la documentation relative aux endpoints [Trigger tests from CI/CD pipelines][4] et [Get details of batch][5] pour les utiliser dans vos pipelines de CI via cURL ou un client compatible.

### Déclencher des tests à partir de pipelines de CI/CD

L'endpoint de déclenchement de tests prend en charge jusqu'à 100 tests par requête.

* **Endpoint** : `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci`.
* **Méthode** : `POST`.
* **Argument** : un objet JSON contenant la liste de tous les tests à déclencher et la configuration à appliquer.

#### Structure de données des requêtes

```json
{
    "tests": [TEST_À_DÉCLENCHER, TEST_À_DÉCLENCHER, ...]
}
```

Les objets `TEST_TO_TRIGGER` sont composés du `public_id` requis pour le test à déclencher, ainsi que des éventuels remplacements de configuration. Pour obtenir la description de chaque champ, consultez la rubrique [Configurer des tests][6].

L'identifiant public d'un test correspond à l'identifiant du test fourni dans l'URL de la page de détails du test (par exemple, pour `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, l'identifiant est `abc-def-ghi`) ou à l'URL complète de cette page (c'est-à-dire `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

Pour en savoir plus, consultez la [documentation relative aux endpoints d'API Synthetics][4].

### Récupérer les détails d'un lot

L'endpoint Get details of batch récupère les résultats du groupe de tests déclenchés dans votre pipeline de CI/CD (également désigné par le terme « batch »). Vous devez fournir le `batch_id` de l'exécution CI pertinente.

* **Endpoint** : `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/ci/batch/{batch_id}`
* **Méthode** : `GET`.
* **Paramètres** : le `batch_id` du batch de résultats de test à examiner.

Pour en savoir plus, consultez la [documentation relative aux endpoints d'API Synthetics][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /fr/continuous_testing/cicd_integrations/configuration
[4]: /fr/api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[5]: /fr/api/latest/synthetics/#get-details-of-batch
[6]: /fr/continuous_testing/cicd_integrations/configuration#configure-tests