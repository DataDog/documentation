---
aliases:
- /fr/synthetics/cicd_testing/ci_results_explorer
- /fr/synthetics/ci_results_explorer
- /fr/synthetics/explorer
description: Examinez les tâches CI qui exécutent des tests en continu.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: GitHub
  text: Intégrer des tests Datadog Synthetic dans votre pipeline de CI/CD
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centre d'apprentissage
  text: Découvrir comment exécuter des tests Synthetic dans un pipeline de CI/CD
- link: /continuous_testing/explorer/search/
  tag: Documentation
  text: Découvrir comment effectuer des recherches dans vos lots de tests
- link: /continuous_testing/explorer/search_runs/
  tag: Documentation
  text: Découvrir comment effectuer des recherches dans vos exécutions de tests
kind: documentation
title: Explorateur de surveillance Synthetic et de tests en continu
---

## Présentation

L'[Explorateur de résultats][1] vous permet de visualiser l'ensemble des exécutions de tests et lots de tests CI associés à la **surveillance Synthetic** et aux **tests en continu**. 

{{< tabs >}}
{{% tab "CI Batches" %}}
{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Rechercher et gérer des lots CI dans lʼexplorateur de surveillance Synthetic et de tests en continu" style="width:100%;">}}
{{% /tab %}}
{{% tab "Test Runs" %}}
{{< img src="continuous_testing/explorer_test_runs_1.png" alt="Rechercher et gérer vos exécutions de tests dans lʼexplorateur de surveillance Synthetic et de tests en continu" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

Cette fonctionnalité vous aide à accomplir ce qui suit :

* Comparer les résultats des tests sur divers appareils et navigateurs pour identifier des problèmes liés aux navigateurs et appareils
* Examiner les problèmes de performance en appliquant des facettes de mesures et filtrer les exécutions par code d'échec
* Tester des requêtes de recherche pour apprendre à utiliser la recherche dans l'explorateur

## Créer une requête de recherche

Accédez à [**Digital Experience > Synthetic Monitoring & Testing** > **Continuous Testing**][1] et cliquez sur une requête de recherche préconfigurée pour commencer à visualiser vos lots ou exécutions de tests et créer des visualisations.

{{< img src="continuous_testing/explorer_search_query_1.png" alt="Requêtes de recherche préconfigurées disponibles dans lʼexplorateur" style="width:100%;">}}

- Visualisez les tests ayant échoué dans un pipeline CI en appliquant le statut « blocking » comme filtre, puis vérifiez si ces tests bloquent vos nouvelles versions.
- Analysez les tests ayant échoué avec des codes d'erreur HTTP afin d'identifier les tests API affichant des codes inattendus.
- Examinez les exécutions de tests qui ont échoué puis réussi après une nouvelle tentative.
- Accédez aux ID de test pour les inclure dans votre pipeline CI. 

Pour en savoir plus, consultez la section [Syntaxe de recherche][5].

## Explorer les exécutions de test

L'explorateur de résultats affiche tous les tests effectués à partir de [la surveillance Synthetic][7] et des [tests en continu][8]. Chaque test correspond à une exécution de test pour un sous-type de test particulier, y compris les tentatives rapides. Cliquez sur un test dans l'explorateur de résultats pour accéder à la page d'exécution du test.

{{< img src="continuous_testing/api_test_run.png" alt="Page détaillée des exécutions du test API" style="width:100%;">}}

1. Cliquez sur une exécution de test pour accéder à la page des résultats ou des détails du test. 
2. Analysez les performances de votre exécution de test, ou les performances des tests API et des tests API à plusieurs étapes.
3. Créez une visualisation telle qu'un graphique de série temporelle, une top list ou un tableau.

Pour en savoir plus sur les exécutions de tests, consultez la section [Rechercher des exécutions de test][6].

## Explorer les lots de tests

L'explorateur de résultats affiche des lots de tests exécutés par [les tests continus et votre fournisseur CI/CD][2]. Chaque lot correspond à un appel de l'API Datadog (par le biais de l'une de vos [intégrations CI/CD][2], du package NPM [datadog-ci][3] ou directement de l'endpoint de l'API) et déclenche une ou plusieurs exécutions de tests. 

{{< img src="continuous_testing/ci_execution_side_panel.png" alt="Volet latéral pour un lot CI dʼexécutions de tests dans lʼexplorateur de surveillance Synthetic et de tests en continu" style="width:100%;">}}

1. Cliquez sur un lot pour ouvrir un volet latéral contenant les métadonnées CI/CD du lot et les résultats des tests. 
2. Explorez les exécutions de tests effectuées dans le cadre du lot et identifiez les tests ayant échoué. 
3. Cliquez sur un test qui a échoué pour consulter la page **Test Result** détaillée et identifier l'origine du problème.

Pour en savoir plus sur les lots de tests, consultez la section [Rechercher des lots de tests][4].

## Exporter

Exportez votre vue en tant que [vue enregistrée][9] dans l'Explorateur de surveillance Synthetic et de résultats de tests

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /fr/continuous_testing/cicd_integrations
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /fr/continuous_testing/explorer/search/
[5]: /fr/continuous_testing/explorer/search_syntax/
[6]: /fr/continuous_testing/explorer/search_runs/
[7]: /fr/synthetics/
[8]: /fr/continuous_testing/
[9]: /fr/continuous_testing/explorer/saved_views/