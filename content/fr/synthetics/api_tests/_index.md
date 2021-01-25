---
title: Tests API
kind: documentation
description: Simuler des requêtes sur vos services publics et internes
aliases:
  - /fr/synthetics/uptime_check
  - /fr/synthetics/api_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: Présentation de la surveillance Synthetic Datadog
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: Débuter avec les tests API
  - link: /synthetics/api_tests/http_tests
    tag: Documentation
    text: Créer votre premier test HTTP
  - link: /synthetics/api_tests/ssl_tests
    tag: Documentation
    text: Créer votre premier test SSL
  - link: /synthetics/api_tests/tcp_tests
    tag: Documentation
    text: Créer votre premier test TCP
  - link: /synthetics/api_tests/dns_tests
    tag: Documentation
    text: Créer votre premier test DNS
  - link: /synthetics/private_locations
    tag: Documentation
    text: Exécuter des tests API sur des endpoints internes
  - link: 'https://www.datadoghq.com/blog/monitor-apis-with-datadog'
    tag: Blog
    text: 'Surveiller vos workflows grâce aux tests SSL, TLS et API à plusieurs étapes Datadog'
---
## Présentation

Grâce aux tests API, vous pouvez facilement **surveiller de façon proactive la disponibilité de vos services essentiels**, à tout moment et en tout lieu. Il existe quatre types de tests API. Ceux-ci vous permettent de lancer des requêtes sur les **différentes couches réseau** de vos systèmes :

- [Test `HTTP`][1]
- [Test `SSL`][2]
- [Test `TCP`][3]
- [Test `DNS`][4]

{{< img src="synthetics/api_tests/api_tests.mp4" alt="Sous-types des tests API" video="true"  width="100%" >}}

Si vos services sont moins réactifs ou si leurs réponses ne correspondent pas à vos attentes (corps de réponse inattendu, enregistrement A erroné, etc.), votre test peut [**prévenir votre équipe**][5], [**bloquer votre pipeline de CI**][6] ou même [**annuler le déploiement à l'origine de l'erreur**][6].

Les tests API peuvent s'exécuter depuis des [emplacements gérés][7] par Datadog et des [emplacements privés][8]. Ainsi, vous bénéficiez d'une **couverture complète de vos systèmes**, en interne et en externe.

**Remarque** : les tests API correspondent à des requêtes uniques transmises à vos services. Si vous souhaitez surveiller des transactions commerciales sophistiquées au niveau de l'API ou des endpoints qui nécessitent une authentification, vous pouvez également créer des chaînes de requêtes à l'aide des [tests API à plusieurs étapes][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/http_tests
[2]: /fr/synthetics/api_tests/ssl_tests
[3]: /fr/synthetics/api_tests/tcp_tests
[4]: /fr/synthetics/api_tests/dns_tests
[5]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[6]: /fr/synthetics/ci
[7]: /fr/api/v1/synthetics/#get-all-locations-public-and-private
[8]: /fr/synthetics/private_locations
[9]: /fr/synthetics/multistep/