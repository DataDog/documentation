---
aliases:
- /fr/synthetics/testing_tunnel
- /fr/continuous_testing/testing_tunnel
description: Découvrez l'utilisation de Continuous Testing dans des environnements
  locaux et distants.
further_reading:
- link: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
  tag: Blog
  text: Meilleures pratiques pour réaliser des tests en amont
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Intégrer des tests Datadog Synthetic dans votre pipeline de CI/CD
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centre d'apprentissage
  text: Découvrir comment exécuter des tests dans un pipeline de CI/CD
- link: /continuous_testing/environments/multiple_env
  tag: Documentation
  text: Découvrir les tests dans plusieurs environnements
- link: /continuous_testing/environments/proxy_firewall_vpn
  tag: Documentation
  text: Découvrir les tests lors de l'utilisation de proxies, de pare-feu ou de VPN
- link: /synthetics/private_locations
  tag: Documentation
  text: En savoir plus sur les emplacements privés
title: Tester les environnements locaux et de staging
---

## Présentation

Dans le contexte des [tests au sein d'un pipeline CI/CD, également appelés tests shift-left][1], l'environnement de production est généralement le dernier maillon de la chaîne. Votre application est susceptible de passer par plusieurs étapes avant d'atteindre ce stade.

{{< img src="continuous_testing/environments.png" alt="Continuous Testing peut être utilisé tout au long du cycle de développement, de l'environnement de développement local au staging jusqu'à la production." width="100%" >}}

Alors que les [tests Synthetic programmés se concentrent principalement sur les environnements de production accessibles publiquement][2], Continuous Testing vous permet de tester votre application dans tout ou partie des environnements dans lesquels elle est déployée tout au long du cycle de développement.

## Tester dans plusieurs environnements

Continuous Testing peut réutiliser le même scénario des tests programmés utilisés contre l'environnement de production pour tester des environnements de pré-production accessibles publiquement.

Qu'il s'agisse d'un [déploiement blue-green][3] ou d'un environnement de staging dédié, Continuous Testing vous permet de réacheminer un scénario existant vers un environnement différent. Pour plus d'informations, consultez la section [Tester plusieurs environnements][4].

## Tester lors de l'utilisation de proxies, de pare-feu ou de VPN

Continuous Testing peut tester votre application dans les premières étapes du cycle de développement, y compris derrière un réseau privé protégé par un proxy, un pare-feu ou un VPN.

Il peut exécuter le même scénario des tests Synthetic programmés contre des modifications déployées dans un serveur local s'exécutant sur votre environnement de développement (tel qu'un ordinateur portable de développement), ou dans un pipeline CI/CD où votre application est déployée dans un environnement éphémère qui dure le même temps que la tâche CI/CD, ou dans un environnement de staging privé.

Continuous Testing fournit un [tunnel de tests][5] qui permet à l'emplacement géré Synthetic d'atteindre des environnements privés. Pour plus d'informations, consultez la section [Tester lors de l'utilisation de proxies, de pare-feu ou de VPN][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
[2]: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
[3]: https://en.wikipedia.org/wiki/Blue%E2%80%93green_deployment
[4]: /fr/continuous_testing/environments/multiple_env
[5]: /fr/continuous_testing/environments/proxy_firewall_vpn/#what-is-the-testing-tunnel
[6]: /fr/continuous_testing/environments/proxy_firewall_vpn