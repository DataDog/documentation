---
title: Surveillance Synthetic
kind: documentation
description: Utilisez des tests automatisés pour vous assurer que les aspects les plus importants de vos systèmes et applications fonctionnent correctement à différents endroits du monde.
disable_sidebar: true
aliases:
  - /fr/integrations/synthetics/
further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
    tag: Blog
    text: Présentation de la surveillance Datadog Synthetic
  - link: https://learn.datadoghq.com/course/view.php?id=39
    tag: Centre d'apprentissage
    text: Présentation des tests Synthetic
  - link: /synthetics/guide/
    tag: Documentation
    text: Guides d'utilisation de la surveillance Synthetic
  - link: https://www.datadoghq.com/blog/monitor-cdn-performance-with-synthetic-testing/
    tag: Blog
    text: Surveillez les performances des CDN au sein de vos tests Synthetic
---
{{< vimeo 447241955 >}}

<br/>

Les tests Synthetic vous permettent de contrôler le bon fonctionnement de vos systèmes et applications à l'aide de **requêtes et actions simulées dans le monde entier**. Datadog surveille les performances de vos pages Web et de vos API du backend au frontend, et à différents niveaux du réseau (`HTTP`, `SSL`, `DNS`, `TCP`, `UDP`, `ICMP` et `WebSocket`) de manière contrôlée et stable, en vous envoyant des alertes en cas de comportement anormal (régression, fonctionnalité défaillante, temps de réponse élevé ou code de statut inattendu).

Avec les **tests de bout en bout en production et les environnements CI**, vos équipes de développement peuvent s'assurer de façon proactive qu'aucune ligne de code problématique n'est mise en production. En **calculant des SLO** sur vos endpoints et parcours utilisateur clés, vous atteindrez plus facilement vos objectifs de performance pour votre application, ce qui se traduira par une expérience utilisateur plus cohérente.

Vous pouvez créer des tests Synthetic dans l'[application Datadog][1], avec l'[API][2] ou avec [Terraform][3].

## Configurer des tests API et API à plusieurs étapes

Les tests API vous permettent de lancer des requêtes [individuelles][4] ou des [chaînes][5] de requêtes afin d'effectuer des vérifications sur vos systèmes essentiels à différents niveaux du réseau : [test HTTP][6], [test SSL][7], [test DNS][8], [test WebSocket][9], [test TCP][10], [test UDP test][11] et [test ICMP][12]. 

{{< img src="synthetics/api_test.png" alt="Tests API" style="width:100%;">}}

## Enregistrer des tests Browser

Utilisez des [tests Browser Synthetic][13] pour surveiller l'expérience de vos clients sur vos pages Web dans le monde entier à l'aide des tests de bout en bout.

{{< img src="synthetics/browser_test.mp4" alt="Tests Browser" video=true style="width:100%;">}}

## Lancer des emplacements privés

Utilisez des [Emplacements privés Synthetic][14] pour surveiller des API et sites Web internes ou pour créer des emplacements personnalisés dans des zones stratégiques pour votre entreprise.

{{< img src="synthetics/private_locations.png" alt="Emplacements privés" style="width:100%;">}}

## Exécuter des tests au sein de vos processus d'intégration et de déploiement

Utilisez vos tests Synthetic comme [déploiements Canary][15] ou exécutez-les directement dans vos [pipelines d'intégration continue][15] pour déployer votre code sans crainte de dégrader l'expérience de vos utilisateurs.

 {{< img src="synthetics/ci.png" alt="Tests d'intégration continue" style="width:100%;">}}

## Associer vos données à vos traces

Datadog vous permet d'[intégrer vos tests Synthetic à vos traces d'APM][16] pour identifier l'origine des échecs parmi vos requêtes frontend, réseau et backend.

{{< img src="synthetics/synthetics_traces.mp4" alt="Surveillance Synthetic" video=true style="width:100%;">}}

## Prêt à vous lancer ?

Consultez [Débuter avec la surveillance Synthetic][17] pour découvrir comment créer votre premier test Synthetic et surveiller vos applications Web. Ensuite, explorez [Débuter avec les emplacements privés][18] pour découvrir comment créer votre emplacement privé et exécuter des tests Synthetic depuis celui-ci.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/synthetics/create#
[2]: /fr/api/latest/synthetics/#create-an-api-test
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[4]: /fr/synthetics/api_tests/
[5]: /fr/synthetics/multistep
[6]: /fr/synthetics/api_tests/http_tests
[7]: /fr/synthetics/api_tests/ssl_tests
[8]: /fr/synthetics/api_tests/dns_tests
[9]: /fr/synthetics/api_tests/websocket_tests
[10]: /fr/synthetics/api_tests/tcp_tests
[11]: /fr/synthetics/api_tests/udp_tests
[12]: /fr/synthetics/api_tests/icmp_tests
[13]: /fr/synthetics/browser_tests
[14]: /fr/synthetics/private_locations
[15]: /fr/synthetics/cicd_testing
[16]: /fr/synthetics/apm/
[17]: /fr/getting_started/synthetics
[18]: /fr/getting_started/synthetics/private_location