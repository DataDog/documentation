---
aliases:
- /fr/synthetics/uptime_check
- /fr/synthetics/api_test
description: Simuler des requêtes sur vos services publics et internes
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog
  tag: Blog
  text: Surveiller vos workflows grâce aux tests SSL, TLS et API à plusieurs étapes
    Datadog
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Débuter avec les tests API
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécuter des tests API sur des endpoints internes
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Créer et gérer des tests API Synthetic avec Terraform
title: Tests API
---

## Présentation

Les tests API vous aident à **surveiller de façon proactive** vos services les plus importants, afin de garantir leur disponibilité à tout moment et en tout lieu.

Générez des requêtes sur les différentes couches réseau de vos systèmes grâce aux sous-types de tests suivants :

{{< partial name="synthetics/network-layers.html" >}}

Si vos services sont moins réactifs ou si leurs réponses ne correspondent pas à vos attentes (corps de réponse inattendu ou enregistrement A erroné, par exemple), votre test peut [**prévenir votre équipe**][1], [**bloquer votre pipeline de CI**][2] et [**annuler le déploiement défectueux**][2].

Les tests API sont exécutés depuis des [emplacements gérés][3] par Datadog ou depuis des [emplacements privés][4]. Vous bénéficiez ainsi d'une **couverture interne et externe** de vos systèmes.

**Remarque** : les tests API correspondent à des requêtes uniques transmises à vos services. Si vous souhaitez surveiller des transactions commerciales sophistiquées au niveau de l'API ou des endpoints qui nécessitent une authentification, créez des chaînes de requêtes à l'aide des [tests API à plusieurs étapes][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[2]: /fr/continuous_testing/cicd_integrations
[3]: /fr/synthetics/api_tests/http_tests/#select-locations
[4]: /fr/synthetics/private_locations
[5]: /fr/synthetics/multistep/