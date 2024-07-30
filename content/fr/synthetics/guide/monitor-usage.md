---
title: Surveillance de votre utilisation de Synthetics

further_reading:
  - link: /synthetics/api_tests
    tag: Documentation
    text: Créer un test API
  - link: /synthetics/multistep
    tag: Documentation
    text: Créer un test API à plusieurs étapes
  - link: /synthetics/browser_tests
    tag: Documentation
    text: Créer un test Browser
  - link: https://www.datadoghq.com/blog/test-creation-best-practices/
    tag: Blog
    text: Pratiques recommandées pour la création de tests de bout en bout
---
Les tests Synthetic proposent des [métriques d'estimation][1] vous permettant de surveiller votre utilisation de Synthetic. Grâce à ces métriques, vous pouvez notamment :

* Déterminer l'évolution de votre utilisation
* Visualiser les équipes, applications ou services qui se servent le plus de Synthetics
* Recevoir des alertes en cas de pics d'utilisation inattendue susceptibles d'augmenter vos coûts

Pour visualiser votre utilisation Synthetics ou recevoir des alertes à ce sujet, utilisez les requêtes suivantes :

* [Test API uniques][2] et [tests API à plusieurs étapes][3] : `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [Tests Browser][4] : `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`.

Pour optimiser vos requêtes, précisez le contexte de ces métriques ou regroupez-les en fonction des tags associés à votre test, comme `team` ou `application`. 

Vous pouvez comparer ces métriques à des seuils statiques, représenter graphiquement ces valeurs et utiliser des algorithmes d'apprentissage automatique pour la [détection des anomalies][5] ou les [prévisions][6], afin de ne pas recevoir d'alertes en cas d'augmentation attendue de l'utilisation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/billing/usage_metrics/#types-of-usage
[2]: /fr/synthetics/api_tests
[3]: /fr/synthetics/multistep
[4]: /fr/synthetics/browser_tests
[5]: /fr/monitors/create/types/anomaly/
[6]: /fr/monitors/create/types/forecasts