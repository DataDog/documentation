---
title: Débuter avec Synthetics
kind: documentation
further_reading:
  - link: /synthetics/browser_tests
    tag: Documentation
    text: En savoir plus sur les tests Browser
  - link: /synthetics/api_tests
    tag: Documentation
    text: En savoir plus sur les tests API
  - link: '/synthetics/browser_tests/#subtests'
    tag: Documentation
    text: Créer un sous-test Browser
  - link: /synthetics/settings/
    tag: Documentation
    text: Configurer les paramètres Synthetics avancés
---
## Présentation

Avec Datadog Synthetics, vous disposez de deux solutions différentes pour surveiller vos applications. Les tests API vous permettent de surveiller la disponibilité des endpoints de vos API, tandis que les tests Browser vous permettent de surveiller les principales actions des utilisateurs. Vos tests peuvent être exécutés à partir d'emplacements gérés ou privés. Synthetics vous aide à garantir une disponibilité maximale, à identifier les problèmes par région et à vous assurer que les principales transactions Web peuvent être effectuées sur votre application.

{{< img src="synthetics/synthetics_home_page.png" alt="Page d'accueil de Synthetics" >}}

En associant Synthetics à vos métriques, traces et logs, Datadog vous permet d'observer le fonctionnement de tous vos systèmes, en adoptant le point de vue de vos utilisateurs. La page d'accueil de [Synthetics][1] détaille toutes ces informations afin que vous puissiez vérifier en temps réel les mises à jour de statut, les durées de réponse et les disponibilités.

Les guides suivants vous aident à configurer vos premiers tests Synthetics avec Datadog. Lisez les sections ci-dessous pour apprendre à créer un test Browser ou API et à configurer un test avec un emplacement privé afin de surveiller des applications internes ou des URL privées.

## Prérequis

Si vous ne l'avez pas encore fait, créez un [compte Datadog][2].

## Configurer votre premier test

- [Créer un emplacement privé][3] (si besoin)
- [Créer un test Browser][4]
- [Créer un test API][5]

## Étapes suivantes

{{< whatsnext desc="Une fois votre premier test Synthetics configuré, consultez les sections suivantes :">}}
    {{< nextlink href="/synthetics/browser_tests" tag="Documentation" >}}En savoir plus sur les tests Browser{{< /nextlink >}}
    {{< nextlink href="/synthetics/api_tests" tag="Documentation" >}}En savoir plus sur les tests API{{< /nextlink >}}
    {{< nextlink href="/synthetics/browser_tests/#sous-tests" tag="Documentation" >}}Créer un sous-test Browser{{< /nextlink >}}
    {{< nextlink href="/synthetics/settings/" tag="Documentation" >}}Configurer les paramètres Synthetics avancés{{< /nextlink >}}

{{< /whatsnext >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: https://www.datadoghq.com/
[3]: /fr/getting_started/synthetics/private_location
[4]: /fr/getting_started/synthetics/browser_test
[5]: /fr/getting_started/synthetics/api_test