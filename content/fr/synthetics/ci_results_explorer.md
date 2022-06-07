---
title: Explorateur de résultats CI
kind: documentation
description: Examiner des tâches CI exécutant des tests Synthetic.
aliases:
  - /fr/synthetics/cicd_testing/ci_results_explorer
further_reading:
  - link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
    tag: Blog
    text: Intégrer des tests Datadog Synthetic dans votre pipeline de CI/CD.
  - link: https://learn.datadoghq.com/enrol/index.php?id=37
    tag: Centre d'apprentissage
    text: Découvrir comment exécuter des tests Synthetic dans des pipelines de CI/CD
  - link: /synthetics/search/
    tag: Documentation
    text: Découvrir comment effectuer des recherches dans vos objets Synthetic
---
## Présentation

L'explorateur de résultats CI vous permet de visualiser les tâches CI qui exécutent vos tests Synthetic. 

{{< img src="synthetics/ci_results_explorer/ci_results_explorer.png" alt="Explorateur de résultats CI" style="width:100%;">}}

Vous pouvez :

* Analyser chaque exécution de tâche CI pour identifier et dépanner les résultats d'échec de test.
* Comparer les résultats des tests sur divers appareils et navigateurs pour identifier des problèmes liés aux navigateurs et appareils.
* Effectuer un suivi de la progression de vos tests dans les pipelines de CI.
* Identifier les tests irréguliers à corriger.

## Explorer les lots de tests

L'explorateur de résultats CI affiche des lots de tests exécutés par [Synthetics et votre fournisseur CI/CD][1]. Chaque lot correspond à un appel de l'API Datadog (par le biais de l'une de vos [intégrations CI/CD][1], du package NPM [datadog-ci][2] ou directement de l'endpoint de l'API) et déclenche une ou plusieurs exécutions de tests. 

1. Cliquez sur un lot pour ouvrir un volet latéral contenant les métadonnées CI du lot et les résultats des tests. 
2. Explorez les exécutions de tests effectuées dans le cadre du lot et identifiez les tests ayant échoué. 
3. Cliquez sur un test qui a échoué pour consulter la page **Test Result** détaillée et identifier l'origine du problème.

## Recherche

### Facettes et tags

Le volet à gauche de la page affiche plusieurs facettes que vous pouvez utiliser pour effectuer des recherches parmi vos lots.

Les facettes **Batch** vous permettent d'appliquer un filtre basé sur les attributs de vos lots.

| Facette            | Description                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | Le statut du lot : `Passed`, `Failed` et `In Progress`. |
| `Duration`       | La durée totale du lot.                          |
| `ID`             | L'ID du lot.                                        |

Les facettes **Git** vous permettent d'appliquer un filtre basé sur les attributs Git de vos lots.

| Facette       | Description                               |
|-------------|-------------------------------------------|
| `Branch`    | La branche associée au lot.     |
| `Commit SHA`| Le SHA du commit associé au lot. |
| `Repository URL`| L'URL du référentiel Git associé au lot. |
| `Tag`       | Le tag Git associé au lot.    |

Les facettes **CI** vous permettent d'appliquer un filtre basé sur les attributs CI de vos lots.

| Facette          | Description                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | Le fournisseur de CI associé au lot.  |
| `Job Name`      | Le nom de tâche associé au lot.     |
| `Job URL`      | L'URL de tâche associée au lot.      |
| `Pipeline ID`  | L'ID de pipeline associé au lot.  |
| `Pipeline Name` | Le nom de pipeline ou de référentiel associé au lot. |
| `Pipeline Number` | Le numéro de pipeline ou de build associé au lot. |
| `Pipeline URL` | L'URL de pipeline associée au lot. |
| `Stage Name`   | Le nom d'étape associé au lot.   |

Les facettes **Test result** vous permettent d'appliquer un filtre basé sur les attributs des résultats des tests exécutés dans le cadre de vos lots.

| Facette            | Description                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Execution Rule` | La règle d'exécution associée au résultat de test du lot : `Blocking`, `Non Blocking` et `Skipped`. |
| `Fast Retries`   | Le nombre de nouvelles tentatives rapides avec le résultat de test du lot.                                |
| `Location`       | La localisation associée au résultat de test du lot.                                              |
| `Test ID`        | L'ID de test associé au résultat de test du lot.                                               |
| `Test Name`      | Le nom de test associé au résultat de test du lot.                                             |

### Créer votre requête

Pour interroger les données de l'explorateur de résultats CI, utilisez la [même syntaxe de requête][3] que celle que vous utilisez sur la page **Tests**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/cicd_integrations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /fr/synthetics/search/