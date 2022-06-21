---
title: Débuter avec la surveillance Synthetic
kind: documentation
further_reading:
  - link: https://learn.datadoghq.com/course/view.php?id=39
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
---
## Présentation

Les tests Synthetic vous permettent de contrôler le bon fonctionnement de vos systèmes et applications à l'aide de **requêtes et actions simulées dans le monde entier**. Datadog surveille les performances de vos pages Web et de vos API du backend au frontend, et à différents niveaux du réseau (`HTTP`, `SSL`, `DNS`, `TCP`, `UDP`, `ICMP` et `WebSocket`) de manière contrôlée et stable, en vous envoyant des alertes en cas de comportement anormal (régression, fonctionnalité défaillante, temps de réponse élevé ou encore code de statut inattendu).

Il existe trois façons de surveiller vos applications :

- Avec des [tests API][1], pour surveiller la disponibilité des endpoints d'une API
- Avec des [tests API à plusieurs étapes][2], pour associer plusieurs requêtes HTTP
- Avec des [tests Browser][3], pour tester les parcours utilisateur clés

Tous les tests peuvent être exécutés depuis des emplacements gérés, mais aussi depuis des [emplacements privés][4] afin de surveiller vos applications internes. Les tests Synthetic peuvent être déclenchés manuellement, selon un programme, ou directement depuis vos [pipelines CI/CD][5].

{{< img src="synthetics/synthetics_home.png" alt="Page d'accueil Surveillance Synthetic" >}}

Pour créer votre premier test Synthetic avec Datadog, suivez les sections ci-dessous.

## Prérequis

Si vous ne l'avez pas encore fait, créez un [compte Datadog][6].

## Configurer votre premier test

- [Créez un test API][7] pour commencer à surveiller la disponibilité des endpoints d'une API.
- [Créez un test API à plusieurs étapes][8] pour commencer à surveiller les workflows clés au niveau de l'API.
- [Créez un test Browser][9] pour commencer à tester les transactions opérationnelles essentielles au sein de vos applications.
- [Créez un emplacement privé][10] pour surveiller vos applications internes en utilisant le type de test Synthetic de votre choix.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: /fr/synthetics/multistep
[3]: /fr/synthetics/browser_tests/
[4]: /fr/synthetics/private_locations
[5]: /fr/synthetics/cicd_integrations
[6]: https://www.datadoghq.com/
[7]: /fr/getting_started/synthetics/api_test/
[8]: /fr/getting_started/synthetics/api_test/#create-a-multistep-api-test
[9]: /fr/getting_started/synthetics/browser_test/
[10]: /fr/getting_started/synthetics/private_location/