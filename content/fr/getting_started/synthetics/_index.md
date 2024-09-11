---
algolia:
  tags:
  - synthetics
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /synthetics/api_tests
  tag: Documentation
  text: En savoir plus sur les tests API
- link: /synthetics/multistep
  tag: Documentation
  text: En savoir plus sur les tests API à plusieurs étapes
- link: /synthetics/browser_tests
  tag: Documentation
  text: En savoir plus sur les tests Browser
- link: /synthetics/private_locations
  tag: Documentation
  text: En savoir plus sur les emplacements privés
- link: /continuous_testing/cicd_integrations
  tag: Documentation
  text: Découvrir comment exécuter des tests Synthetic dans un pipeline de CI
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour améliorer vos capacités de testing
    Synthetic
title: Débuter avec la surveillance Synthetic
---

## Présentation

Les tests Synthetic vous permettent de contrôler le bon fonctionnement de vos systèmes et applications à l'aide de **requêtes et actions simulées dans le monde entier**. Datadog surveille les performances de vos pages Web et de vos API du backend au frontend, et à différents niveaux du réseau (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` et `gRPC`), de manière contrôlée et stable, en vous envoyant des alertes en cas de comportement anormal (régression, fonctionnalité défaillante, temps de réponse élevé ou code de statut inattendu).

{{< img src="getting_started/synthetics/synthetic-monitoring-overview.png" alt="Tests de surveillance Synthetic" style="width:100%;" >}}

## Types de tests Synthetic

Datadog propose des **tests API**, **tests API à plusieurs étapes** et **tests Browser**.

Pour surveiller des applications internes, exécutez vos tests depuis des emplacements gérés ou privés. Les tests Synthetic peuvent être déclenchés manuellement, selon un programme ou directement depuis vos pipelines de CI/CD.

## Prérequis

Si vous ne l'avez pas encore fait, créez un [compte Datadog][1].

## Configurer votre premier test

Pour créer votre premier test Synthetic avec Datadog, effectuez l'une des opérations suivantes :

- [Créez un test API][2] pour commencer à surveiller la disponibilité des endpoints d'une API.
- [Créez un test API à plusieurs étapes][3] pour lier plusieurs requêtes HTTP et surveiller les workflows clés au niveau de l'API.
- [Créez un test Browser][4] pour commencer à tester les transactions opérationnelles essentielles au sein de vos applications.
- [Créez un emplacement privé][5] pour commencer à surveiller vos applications internes à l'aide du type de test Synthetic de votre choix.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /fr/getting_started/synthetics/api_test/
[3]: /fr/getting_started/synthetics/api_test/#create-a-multistep-api-test
[4]: /fr/getting_started/synthetics/browser_test/
[5]: /fr/getting_started/synthetics/private_location/