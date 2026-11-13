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
further_reading:
- link: /synthetics/guide/
  tag: Documentation
  text: Guides d'utilisation de Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centre d'apprentissage
  text: 'Centre d''apprentissage Datadog : Premiers pas avec les tests de navigateur
    Synthetic'
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour améliorer vos capacités de test
    Synthetic
- link: https://www.datadoghq.com/blog/network-test-protocols/
  tag: Blog
  text: Tester les chemins réseau avec TCP, UDP et ICMP dans Datadog
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: Blog
  text: Comment sécuriser les en-têtes HTTP avec des tests Synthetic
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: Blog
  text: Accélérez votre compréhension de l’expérience utilisateur avec Datadog Synthetic
    Monitoring
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: Blog
  text: Créer des tests UX de fumée efficaces avec Synthetic Monitoring
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Améliorez la précision et les performances des SLO grâce à Datadog Synthetic
    Monitoring
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Comment créer des tests Synthetic fiables et précis pour vos applications
    mobiles
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Comment j'ai aidé mon client à mettre à l'échelle ses tests de navigateur
    avec Datadog
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: Blog
  text: Automatiser votre infrastructure de tests Synthetic avec Datadog Synthetic
    Monitoring et Terraform
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplifier le dépannage tout au long du parcours utilisateur avec Datadog
    Synthetic Monitoring
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De la performance à l''impact : rapprocher les équipes frontend grâce à un
    contexte partagé'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions de Datadog Synthetic Monitoring ! (Connexion
    à l'application requise)
title: Synthetic Testing et Synthetic Monitoring
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explorez et inscrivez-vous aux sessions de formation fondamentale. Découvrez comment Datadog Synthetic Monitoring est une solution de surveillance proactive qui vous permet de créer des tests d'API, de navigateur et mobiles sans code pour simuler automatiquement les parcours utilisateur et les requêtes vers vos applications, points de terminaison clés et couches réseau.
{{< /learning-center-callout >}}

Les tests Synthetic vous permettent d'observer les performances de vos systèmes et applications à l'aide de **requêtes et actions simulées depuis le monde entier**. Datadog suit les performances de vos pages Web et API du backend au frontend, et à différents niveaux réseau (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` et `gRPC`) de manière contrôlée et stable, en vous alertant sur les comportements défectueux tels que les régressions, les fonctionnalités cassées, les temps de réponse élevés et les codes d'état inattendus. 

**Calculer des SLO** sur vos points de terminaison clés et parcours utilisateur facilite le respect de vos objectifs de performance applicative et permet, en fin de compte, d'offrir une expérience client cohérente.

Vous pouvez créer des tests Synthetic dans l'[application Datadog][1], avec l'[API][2] ou avec [Terraform][3].

## Configurer des tests d'API et des tests d'API en plusieurs étapes {#set-up-api-tests-and-multistep-api-tests}

Les tests API vous permettent de lancer des requêtes [individuelles][4] ou des [chaînes][5] de requêtes afin d'effectuer des vérifications sur vos systèmes essentiels à différents niveaux du réseau : [test HTTP][6], [test SSL][7], [test DNS][8], [test WebSocket][9], [test TCP][10], [test UDP test][11], [test ICMP][12] et [test gRPC][13]. 

{{< img src="synthetics/api_tests/api_test_shopist.png" alt="Page de détails d'un test d'API HTTP affichant l'onglet Activité avec la disponibilité globale, une chronologie des alertes et une liste des dernières exécutions de test" style="width:100%;">}}

## Enregistrer des tests de navigateur {#record-browser-tests}

Utilisez des [tests Browser Synthetic][14] pour surveiller l'expérience de vos clients sur vos pages Web, de bout en bout et dans le monde entier.

{{< img src="synthetics/browser_test.mp4" alt="Tests Browser" video=true style="width:100%;">}}

## Enregistrer des tests d'application mobile {#record-mobile-application-tests}

Utilisez des [tests d'application mobile Synthetic][21] pour surveiller l'expérience de vos clients sur vos applications iOS et Android, de bout en bout et sur différents types d'appareils.

{{< img src="synthetics/mobile_app_tests.png" alt="Exemples du workflow d'enregistrement pour un test mobile synthétique" style="width:100%;">}}

## Créer des tests de chemin réseau {#create-network-path-tests}

Créez des [tests de chemin réseau synthétiques][25] depuis des emplacements gérés pour effectuer des vérifications TCP, UDP et ICMP et visualiser les routes des paquets à travers des points de terminaison mondiaux.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Exemples d'un test réseau TCP synthétique" style="width:100%;">}}
## Suites de tests {#test-suites}

Utilisez les [collections de tests Synthetic][26] pour organiser plusieurs tests en collections logiques regroupées par parcours utilisateur, environnement, emplacement, service ou équipe pour une gestion et un dépannage rationalisés. 

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Page récapitulative de la collection de tests Synthetic Monitoring" style="width:100%;">}}

## Explorer Bits Testing et Goal-Based Testing {#explore-bits-testing-and-goal-based-testing}

Utilisez [Bits Testing][27] pour explorer votre application, cartographier des parcours utilisateur critiques et générer des tests Synthetic qui les couvrent, y compris [Goal-Based tests][28] qui vérifient que les utilisateurs peuvent atteindre un objectif en utilisant des tests non déterministes et agentiques.

{{< img src="synthetics/bits_testing/bits_testing_landing.png" alt="La page d'accueil de Bits Testing avec une invite pour décrire la couverture de test que vous souhaitez" style="width:100%;">}}

## Lancer des emplacements privés {#launch-private-locations}

Utilisez des [emplacements privés Synthetic][15] pour surveiller des API et sites Web internes ou pour créer des emplacements personnalisés dans des zones stratégiques pour votre entreprise.

{{< img src="synthetics/private_locations.png" alt="Emplacements privés" style="width:100%;">}}

## Connecter des données et des traces {#connect-data-and-traces}

Datadog vous permet d'[intégrer vos tests Synthetic à vos traces APM][16] pour identifier l'origine des échecs parmi vos requêtes frontend, réseau et backend.

{{< img src="synthetics/apm/synthetics_apm_new.mp4" alt="Un test d'API ayant échoué avec le panneau latéral ouvert sur l'onglet Trace, montrant la trace APM générée par l'exécution de test avec des spans codés par couleur à travers les services" video=true style="width:100%;">}}

## Accéder aux dashboards prêts à l'emploi {#access-out-of-the-box-dashboards}

Utilisez les [dashboards Synthetic prêts à l'emploi][17] pour analyser les données de performance liées à vos tests API, tests API à plusieurs étapes, tests Browser et emplacements privés, ainsi qu'aux événements Datadog. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Dashboard récapitulatif de Synthetic Monitoring et Continuous Testing" style="width:100%;">}}

## Utiliser Synthetic Monitoring & Testing Results Explorer {#use-the-synthetic-monitoring-testing-results-explorer}

Créez des [requêtes de recherche et des visualisations][20] pour vos exécutions de tests Synthetic ou vos lots de tests exécutés dans des pipelines CI/CD. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## Suivre la couverture des tests {#track-testing-coverage}

Optimisez votre collection de tests en [vous assurant que les workflows les plus importants de votre applications sont testés][22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## Notifications de Synthetic Monitoring {#synthetic-monitoring-notifications}

Utilisez et enrichissez les monitors synthétiques pour envoyer des notifications lorsqu'un test de Synthetic Monitoring échoue. Les fonctionnalités suivantes sont disponibles :

Messages de monitor préremplis
: Les messages de monitor préremplis fournissent un point de départ structuré pour les alertes de test Synthetic. Chaque message comprend un titre, un résumé et un pied de page standardisés contenant les métadonnées du test, ce qui facilite la compréhension de l'alerte en un coup d'œil.

Template variables
: Les variables de modèle vous permettent d'injecter dynamiquement des données spécifiques au test dans les notifications de monitor. Ces variables proviennent de l'objet `synthetics.attributes`.

Utilisation avancée
: L'utilisation avancée inclut des techniques pour faire ressortir des informations de test plus approfondies ou structurer des messages complexes à l'aide de modèles Handlebars.

Alertes conditionnelles
: Les alertes conditionnelles vous permettent de modifier le contenu d'une notification de monitor en fonction de résultats de test ou de conditions d'échec spécifiques.

Pour plus d'informations, consultez [Synthetic Monitoring notifications][24].

## Historique des versions {#version-history}

Utilisez [Version History in Synthetic Monitoring][23] pour exécuter une version précédente d'un test, restaurer votre test à n'importe quelle version enregistrée ou cloner une version pour créer un nouveau test de Synthetic Monitoring.

## Prêt à commencer ? {#ready-to-start}

Consultez [Débuter avec Synthetic Monitoring][18] pour obtenir des instructions sur la création de votre premier test Synthetic et la surveillance de vos applications web. Ensuite, consultez [Débuter avec les emplacements privés][19] pour savoir comment créer votre emplacement privé et exécuter des tests Synthetic avec celui-ci.

## Pour aller plus loin {#further-reading}

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
[23]: /fr/synthetics/guide/version_history/
[24]: /fr/synthetics/notifications/
[25]: /fr/synthetics/network_path_tests/
[26]: /fr/synthetics/test_suites/
[27]: /fr/synthetics/bits_testing/
[28]: /fr/synthetics/goal_based_testing/