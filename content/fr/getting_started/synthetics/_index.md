---
title: Débuter avec la surveillance Synthetic
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=39'
    tag: Centre d'apprentissage
    text: Présentation des tests Synthetic
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
    text: Configurer les paramètres de surveillance Synthetic avancés
---
## Présentation

Avec la surveillance Datadog Synthetic, vous disposez de deux solutions différentes pour surveiller vos applications. Les tests API vous permettent de surveiller la disponibilité des endpoints de vos API, tandis que les tests Browser vous permettent de surveiller les principales actions des utilisateurs. Vos tests peuvent être exécutés à partir d'emplacements gérés ou privés. La surveillance Synthetic vous aide à garantir une disponibilité maximale, à identifier les problèmes par région et à vous assurer que les principales transactions Web peuvent être effectuées sur votre application.

{{< img src="synthetics/synthetics_home.png" alt="Page d'accueil Surveillance Synthetic" >}}

En associant les données de surveillance Synthetic à vos métriques, traces et logs, Datadog vous permet d'observer le fonctionnement de tous vos systèmes, en adoptant le point de vue de vos utilisateurs. La page d'accueil de la [surveillance Synthetic][1] détaille toutes ces informations afin que vous puissiez vérifier en temps réel les mises à jour de statut, les temps de réponse et les disponibilités.

Les guides suivants vous aideront à configurer vos premiers tests Synthetic avec Datadog. Lisez les sections ci-dessous pour apprendre à créer un test Browser ou API et à configurer un test avec un emplacement privé afin de surveiller des applications internes ou des URL privées.

## Prérequis

Si vous ne l'avez pas encore fait, créez un [compte Datadog][2].

## Configurer votre premier test

- [Créer un emplacement privé][3] (si besoin)
- [Créer un test Browser][4]
- [Créer un test API][5]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: https://www.datadoghq.com/
[3]: /fr/getting_started/synthetics/private_location/
[4]: /fr/getting_started/synthetics/browser_test/
[5]: /fr/getting_started/synthetics/api_test/