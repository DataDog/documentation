---
algolia:
  tags:
  - synthetics
aliases:
- /fr/integrations/synthetics/
cascade:
  algolia:
    rank: 70
description: Utilisez des tests automatisés pour vous assurer que les aspects les
  plus importants de vos systèmes et applications fonctionnent correctement à différents
  endroits du monde.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions de la surveillance Synthetic Datadog (connexion
    à l'application requise)
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Datadog Synthetic
- link: https://www.datadoghq.com/blog/monitor-cdn-performance-with-synthetic-testing/
  tag: Blog
  text: Surveillez les performances des CDN au sein de vos tests Synthetic
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Meilleures pratiques pour la surveillance des applications Web statiques
- link: https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/
  tag: Blog
  text: Améliorez la couverture de vos tests avec la surveillance Synthetic Datadog
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centre d'apprentissage
  text: 'Centre d''apprentissage Datadog : Premiers pas avec les tests de navigateur
    Synthetic'
- link: /synthetics/guide/
  tag: Documentation
  text: Guides d'utilisation de la surveillance Synthetic
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour améliorer vos capacités de testing
    Synthetic
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: Blog
  text: Comment sécuriser les en-têtes HTTP avec des tests synthétiques
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: Blog
  text: Accélérez votre compréhension de l’expérience utilisateur avec Synthetic Monitoring
    de Datadog
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: Blog
  text: Créer des tests UX de fumée efficaces avec Synthetic Monitoring
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Améliorez la précision et les performances des SLO grâce à Synthetic Monitoring
    de Datadog
title: Tests et surveillance Synthetic
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/447241955/rendition/1080p/file.mp4?loc=external&signature=47f0bf6adc93cbbd62e4939228c964c19227a2e0aec2d61822417cd2af985c97" poster="/images/poster/synthetics.png" >}}

<br/>


{{< learning-center-callout header="Participez à une session de webinar de formation" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explorez et inscrivez-vous aux sessions d'activation Foundation. Découvrez comment Synthetic Monitoring de Datadog est une solution proactive qui vous permet de créer des tests d'API, de navigateur et mobiles sans code pour simuler automatiquement les parcours utilisateur et les requêtes vers vos applications, points de terminaison clés et couches réseau.
{{< /learning-center-callout >}}

Les tests Synthetic vous permettent de contrôler le bon fonctionnement de vos systèmes et applications à l'aide de **requêtes et actions simulées dans le monde entier**. Datadog surveille les performances de vos pages Web et de vos API du backend au frontend, et à différents niveaux du réseau (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` et `gRPC`), de manière contrôlée et stable, en vous envoyant des alertes en cas de comportement anormal (régression, fonctionnalité défaillante, temps de réponse élevé ou code de statut inattendu).

En **calculant des SLO** sur vos endpoints et parcours utilisateur clés, vous atteindrez plus facilement vos objectifs de performance pour votre application, ce qui se traduira par une expérience utilisateur plus stable.

Vous pouvez créer des tests Synthetic dans l'[application Datadog][1], avec l'[API][2] ou avec [Terraform][3].

## Configurer des tests API et API à plusieurs étapes

Les tests API vous permettent de lancer des requêtes [individuelles][4] ou des [chaînes][5] de requêtes afin d'effectuer des vérifications sur vos systèmes essentiels à différents niveaux du réseau : [test HTTP][6], [test SSL][7], [test DNS][8], [test WebSocket][9], [test TCP][10], [test UDP test][11], [test ICMP][12] et [test gRPC][13]. 

{{< img src="synthetics/api_test.png" alt="Tests API" style="width:100%;">}}

## Enregistrer des tests Browser

Utilisez des [tests Browser Synthetic][14] pour surveiller l'expérience de vos clients sur vos pages Web, de bout en bout et dans le monde entier.

{{< img src="synthetics/browser_test.mp4" alt="Tests Browser" video=true style="width:100%;">}}

## Enregistrer des tests d'application mobile

Utilisez des [tests d'application mobile Synthetic][21] pour surveiller l'expérience de vos clients sur vos applications iOS et Android, de bout en bout et sur différents types d'appareils.

{{< img src="synthetics/mobile_app_tests.png" alt="Exemples du workflow d'enregistrement d’un test mobile synthétique" style="width:100%;">}}

## Lancer des emplacements privés

Utilisez des [emplacements privés Synthetic][15] pour surveiller des API et sites Web internes ou pour créer des emplacements personnalisés dans des zones stratégiques pour votre entreprise.

{{< img src="synthetics/private_locations.png" alt="Emplacements privés" style="width:100%;">}}

## Associer vos données à vos traces

Datadog vous permet d'[intégrer vos tests Synthetic à vos traces APM][16] pour identifier l'origine des échecs parmi vos requêtes frontend, réseau et backend.

{{< img src="synthetics/synthetics_traces.mp4" alt="Surveillance Synthetic" video=true style="width:100%;">}}

## Accéder aux dashboards prêts à l'emploi

Utilisez les [dashboards Synthetic prêts à l'emploi][17] pour analyser les données de performance liées à vos tests API, tests API à plusieurs étapes, tests Browser et emplacements privés, ainsi qu'aux événements Datadog. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Dashboard de surveillance Synthetic et de tests en continu" style="width:100%;">}}

## Utilisez l'explorateur de surveillance Synthetic et de tests en continu

Créez des [requêtes de recherche et des visualisations][20] pour vos exécutions de tests Synthetic ou vos lots de tests exécutés dans des pipelines CI/CD. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Explorateur de tests en continu" style="width:100%;">}}

## Suivre la couverture des tests

Optimisez votre suite de tests en [vous assurant que les workflows les plus importants de votre applications sont testés][22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Explorateur de tests en continu" style="width:100%;">}}

## Prêt à vous lancer ?

Consultez la section [Débuter avec la surveillance Synthetic][18] pour découvrir comment créer votre premier test Synthetic et surveiller vos applications Web. Lisez ensuite le guide [Débuter avec les emplacements privés][19] pour apprendre à créer un emplacement privé et à exécuter des tests Synthetic depuis celui-ci.

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
[13]: /fr/synthetics/api_tests/grpc_tests
[14]: /fr/synthetics/browser_tests
[15]: /fr/synthetics/private_locations
[16]: /fr/synthetics/apm/
[17]: /fr/synthetics/dashboards/
[18]: /fr/getting_started/synthetics
[19]: /fr/getting_started/synthetics/private_location
[20]: /fr/continuous_testing/explorer/
[21]: /fr/mobile_testing
[22]: /fr/synthetics/test_coverage