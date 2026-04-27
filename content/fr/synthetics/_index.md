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
  text: Guides d'utilisation de la surveillance Synthetic
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Learning Center
  text: 'Centre d''apprentissage Datadog : Premiers pas avec les tests de navigateur
    Synthetic'
- link: https://dtdg.co/fe
  tag: Foundation Enablement
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
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Comment construire des tests synthétiques fiables et précis pour vos applications
    mobiles
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Comment j'ai aidé mon client à faire évoluer ses tests de navigateur avec
    Datadog
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: Blog
  text: Automatiser votre infrastructure de tests synthétiques avec Datadog Synthetic
    Monitoring et Terraform
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplifier le dépannage tout au long du parcours utilisateur avec Datadog
    Synthetic Monitoring
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De la performance à l''impact : relier les équipes frontend grâce à un contexte
    partagé'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Release Notes
  text: Découvrez les dernières versions de Datadog Synthetic Monitoring ! (Connexion
    à l'application requise)
title: Tests et surveillance Synthetic
---
{{< learning-center-callout header="Participez à une session de webinaire de formation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explorez et inscrivez-vous aux sessions de formation Foundation. Découvrez comment Datadog Synthetic Monitoring est une solution de surveillance proactive qui vous permet de créer des tests API, de navigateur et mobiles sans code pour simuler automatiquement les flux et les requêtes des utilisateurs vers vos applications, vos points d'accès clés et vos couches réseau.
{{< /learning-center-callout >}}

Les tests synthétiques vous permettent d'observer comment vos systèmes et applications fonctionnent en utilisant **des requêtes et actions simulées du monde entier**. Datadog suit la performance de vos pages web et APIs du backend au frontend, et à divers niveaux réseau (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` et `gRPC`) de manière contrôlée et stable, vous alertant sur des comportements défectueux tels que des régressions, des fonctionnalités cassées, des temps de réponse élevés et des codes d'état inattendus. 

**Calculer les SLO** sur vos points d'accès clés et parcours utilisateurs facilite le respect de vos objectifs de performance applicative et permet finalement de fournir une expérience client cohérente.

Vous pouvez créer des tests Synthetic dans l'[application Datadog][1], avec l'[API][2] ou avec [Terraform][3].

## Configurez des tests API et des tests API à étapes multiples {#set-up-api-tests-and-multistep-api-tests}

Les tests API vous permettent de lancer des requêtes [individuelles][4] ou des [chaînes][5] de requêtes afin d'effectuer des vérifications sur vos systèmes essentiels à différents niveaux du réseau : [test HTTP][6], [test SSL][7], [test DNS][8], [test WebSocket][9], [test TCP][10], [test UDP test][11], [test ICMP][12] et [test gRPC][13]. 

{{< img src="synthetics/api_test.png" alt="Tests API" style="width:100%;">}}

## Enregistrer des tests de navigateur {#record-browser-tests}

Utilisez des [tests Browser Synthetic][14] pour surveiller l'expérience de vos clients sur vos pages Web, de bout en bout et dans le monde entier.

{{< img src="synthetics/browser_test.mp4" alt="Tests Browser" video=true style="width:100%;">}}

## Enregistrer des tests d'application mobile {#record-mobile-application-tests}

Utilisez des [tests d'application mobile Synthetic][21] pour surveiller l'expérience de vos clients sur vos applications iOS et Android, de bout en bout et sur différents types d'appareils.

{{< img src="synthetics/mobile_app_tests.png" alt="Exemples du flux de travail d'enregistrement pour un test mobile synthétique" style="width:100%;">}}

## Créer des tests de chemin réseau {#create-network-path-tests}

Créez [des tests de chemin réseau synthétiques][25] à partir d'emplacements gérés pour effectuer des vérifications TCP, UDP et ICMP et visualiser les routes des paquets à travers des points d'accès mondiaux.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Exemples d'un test de réseau TCP synthétique" style="width:100%;">}}
## Suites de tests {#test-suites}

Utilisez [Suites de Tests Synthétiques][26] pour organiser plusieurs tests en collections logiques regroupées par parcours utilisateur, environnement, emplacement, service ou équipe pour une gestion et un dépannage simplifiés. 

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Page de résumé de la suite de tests de surveillance synthétique" style="width:100%;">}}

## Lancer des emplacements privés {#launch-private-locations}

Utilisez des [emplacements privés Synthetic][15] pour surveiller des API et sites Web internes ou pour créer des emplacements personnalisés dans des zones stratégiques pour votre entreprise.

{{< img src="synthetics/private_locations.png" alt="Emplacements privés" style="width:100%;">}}

## Connecter les données et les traces {#connect-data-and-traces}

Datadog vous permet d'[intégrer vos tests Synthetic à vos traces APM][16] pour identifier l'origine des échecs parmi vos requêtes frontend, réseau et backend.

{{< img src="synthetics/synthetics_traces.mp4" alt="Surveillance Synthetics" video=true style="width:100%;">}}

## Accéder aux tableaux de bord prêts à l'emploi {#access-out-of-the-box-dashboards}

Utilisez les [dashboards Synthetic prêts à l'emploi][17] pour analyser les données de performance liées à vos tests API, tests API à plusieurs étapes, tests Browser et emplacements privés, ainsi qu'aux événements Datadog. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Tableau de bord de résumé de la surveillance synthétique et des tests continus" style="width:100%;">}}

## Utilisez l'Explorateur des Résultats de Surveillance et de Tests Synthétiques {#use-the-synthetic-monitoring-testing-results-explorer}

Créez des [requêtes de recherche et des visualisations][20] pour vos exécutions de tests Synthetic ou vos lots de tests exécutés dans des pipelines CI/CD. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Explorateur de Tests Continus" style="width:100%;">}}

## Suivre la couverture des tests {#track-testing-coverage}

Optimisez votre suite de tests en [vous assurant que les workflows les plus importants de votre applications sont testés][22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Explorateur de Tests Continus" style="width:100%;">}}

## Notifications de surveillance synthétique {#synthetic-monitoring-notifications}

Utilisez et enrichissez les moniteurs synthétiques pour envoyer des notifications lorsque un test de surveillance synthétique échoue. Les fonctionnalités suivantes sont disponibles :

Messages de moniteur pré-remplis
: Les messages de moniteur pré-remplis fournissent un point de départ structuré pour les alertes de tests synthétiques. Chaque message comprend un titre, un résumé et un pied de page standardisés contenant des métadonnées de test, ce qui facilite la compréhension de l'alerte d'un coup d'œil.

Template variables
 : Les variables de modèle vous permettent d'injecter dynamiquement des données spécifiques au test dans les notifications des moniteurs. Ces variables proviennent de l'objet `synthetics.attributes`.

Utilisation avancée
: L'utilisation avancée inclut des techniques pour faire ressortir des informations de test plus approfondies ou structurer des messages complexes en utilisant le modèle Handlebars.

Alerte conditionnelle
 : L'alerte conditionnelle vous permet de modifier le contenu d'une notification de moniteur en fonction de résultats de test spécifiques ou de conditions d'échec.

Pour plus d'informations, consultez [les notifications de surveillance synthétique][24].

## Historique des versions {#version-history}

Utilisez [l'historique des versions dans la surveillance synthétique][23] pour exécuter une version précédente d'un test, restaurer votre test à une version sauvegardée ou cloner une version pour créer un nouveau test de surveillance synthétique.

## Prêt à vous lancer ? {#ready-to-start}

Consultez [Démarrer avec la surveillance synthétique][18] pour des instructions sur la création de votre premier test synthétique et la surveillance de vos applications web. Ensuite, explorez [Démarrer avec des emplacements privés][19] pour des instructions sur la création de votre emplacement privé et l'exécution de tests synthétiques avec votre emplacement privé.

## Lectures complémentaires {#further-reading}

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