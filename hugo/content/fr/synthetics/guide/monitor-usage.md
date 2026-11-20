---
description: Découvrez les métriques d'utilisation estimée générées à partir de vos
  tests Synthetic.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Bonnes pratiques pour la création de tests de bout en bout
- link: /synthetics/api_tests
  tag: Documentation
  text: Créez un test API
- link: /synthetics/multistep
  tag: Documentation
  text: Créez un test API à plusieurs étapes
- link: /synthetics/browser_tests
  tag: Documentation
  text: Créez un test de navigateur
title: Utilisez des métriques d'utilisation estimée
---
## Présentation {#overview}

Les tests Synthetic sont accompagnés de [métriques d'utilisation estimée][1] qui vous permettent de suivre votre utilisation. Ces métriques vous permettent notamment de :

* Comprendre comment votre utilisation évolue au fil du temps.
* Visualiser quelles équipes, applications ou services contribuent le plus à votre utilisation de Synthetic Monitoring.
* Déclencher une alerte en cas de pics d'utilisation inattendus pouvant avoir une incidence sur votre facturation.

Pour visualiser ou être alerté sur votre utilisation de Synthetic Monitoring, utilisez les requêtes suivantes :

* [Tests API à une seule étape][2] et [tests API à plusieurs étapes][3] : `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [Tests de navigateur][4] : `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`.

  **Remarque :** La tarification des exécutions de tests de navigateur ( {{< tooltip glossary="test_run">}}s) dépend du nombre d'étapes. Consultez la [documentation sur la tarification][7] pour plus d'informations.

Pour un niveau de précision supérieur, définissez le périmètre de ces métriques ou regroupez-les selon les tags associés à votre test, tels que `team` ou `application`. 

Vous pouvez représenter graphiquement et surveiller ces métriques par rapport à des seuils statiques, ainsi qu'utiliser des algorithmes basés sur l'apprentissage automatique comme la [détection d'anomalies][5] ou les [prévisions][6] pour vous assurer de ne pas être alerté en cas de croissance attendue de l'utilisation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/billing/usage_metrics/estimated_usage_metrics/#types-of-usage
[2]: /fr/synthetics/api_tests
[3]: /fr/synthetics/multistep
[4]: /fr/synthetics/browser_tests
[5]: /fr/monitors/types/anomaly/
[6]: /fr/monitors/types/forecasts
[7]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#synthetic-monitoring-api--browser-what-counts-as-a-browser-test-run