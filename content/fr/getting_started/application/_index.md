---
further_reading:
- link: https://learn.datadoghq.com/courses/dd-101-dev
  tag: Centre d'apprentissage
  text: 'Datadog 101 : Développeur'
- link: https://learn.datadoghq.com/courses/dd-101-sre
  tag: Centre d'apprentissage
  text: 'Datadog 101 : Ingénieur en fiabilité de site'
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour comprendre les principes fondamentaux
    de Datadog
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: GitHub
  text: Présentation du menu de navigation rapide Datadog
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: Blog
  text: 'DRUIDS : l''acronyme qui définit la conception chez Datadog'
kind: documentation
title: Débuter avec Datadog
---

## Présentation

Cette page fournit un aperçu général des fonctionnalités disponibles sur le [site Datadog][1].

La navigation du site Datadog varie en fonction de la largeur de votre navigateur. Il existe trois types de navigations. Pour changer de type de navigation, ajustez la taille de votre navigateur.

## Intégrations

{{< img src="getting_started/integrations.png" alt="Intégrations" >}}

- Datadog dispose de plus de {{< translate key="integration_count" >}} intégrations officielles [répertoriées][2].
- Des intégrations personnalisées sont disponibles via [l'API Datadog][3].
- L'Agent est [open source][4].
- Une fois les intégrations configurées, toutes les données sont traitées de la même façon sur Datadog, qu'elles soient stockées dans un centre de données ou dans un service en ligne.

## Log Management

{{< img src="getting_started/logs.png" alt="Logs" >}}

La solution [Log Management][5] de Datadog vous permet d'envoyer et de traiter chaque log généré par vos applications et votre infrastructure. Vous pouvez visualiser vos logs en temps réel à l'aide de la fonction Live Tail, sans avoir à les indexer. Il est possible d'ingérer tous les logs provenant de vos applications et de votre infrastructure, d'utiliser des filtres pour déterminer de façon dynamique les logs à indexer, puis de les stocker dans une archive.

## APM et profileur en continu

{{< img src="getting_started/apm.png" alt="Dashboard APM" >}}

La solution [Application Performance Monitoring de Datadog][6] (appelée APM ou tracing) vous fournit des informations précises sur les performances de votre application, grâce aux dashboards générés automatiquement qui surveillent des métriques clés, comme le volume et la latence des requêtes, ou encore aux traces détaillées portant sur des requêtes individuelles. Ces données viennent compléter vos logs et la surveillance de votre infrastructure. Lorsqu'une requête est envoyée à une application, Datadog peut surveiller les traces associées au sein d'un système distribué et générer des données sur ce qu'il advient de cette requête.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="Infrastructure" >}}

- Toutes les machines apparaissent dans la [liste d'infrastructures][7].
- Vous pouvez consulter les tags appliqués à chaque machine. Les fonctions de tagging vous permettent d'attribuer un rôle précis à vos machines.
- Datadog attribue automatiquement une catégorie à vos serveurs. Si un tag a été ajouté à une nouvelle machine, vous pouvez consulter immédiatement les statistiques liées à cette dernière en fonction de ce qui a précédemment été configuré pour ce tag. [En savoir plus sur le tagging][8].

## Hostmap

{{< img src="getting_started/hostmap-overview.png" alt="Aperçu de la hostmap" >}}

[La hostmap][9] se trouve dans le menu Infrastructure. Grâce à cette carte, vous pouvez :

- Visualiser rapidement votre environnement
- Identifier les singularités
- Détecter les modèles d'utilisation
- Optimiser les ressources

Consultez la section [Hostmap][9] pour en savoir plus.

## Événements

{{< img src="service_management/events/explorer/events-overview.png" alt="Events Explorer" style="width:100%;" >}}

La vue [Events Explorer][10] affiche les événements les plus récents générés par votre infrastructure et vos services.

Des événements peuvent être générés pour :

- Les déploiements de code
- Les modifications du statut de santé de vos services
- Les changements de configuration
- Les alertes de surveillance

L'Events Explorer rassemble automatiquement les événements recueillis par l'Agent et les intégrations installées.

Vous pouvez également envoyer vos propres événements personnalisés à l'aide de l'API Datadog, des checks d'Agent custom, de DogStatsD ou de l'API d'e-mail pour les événements.

Dans l'Events Explorer, vous pouvez filtrer vos événements en fonction de facettes ou de requêtes de recherche. Il est également possible de regrouper ou de filtrer les événements par attribut, et de les représenter graphiquement avec des [analyses d'événements][11].

## Dashboards

{{< img src="getting_started/dashboard.png" alt="Dashboards" >}}

Les [dashboards][12] contiennent des graphiques avec des métriques enregistrant des performances en temps réel.

- Déplacez simultanément votre curseur sur l'ensemble des graphiques d'un [screenboard][13].
- Les barres verticales correspondent à des événements. Elles permettent de placer une métrique dans son contexte.
- Cliquez sur un graphique et faites-le glisser pour étudier un intervalle spécifique.
- Lorsque vous passez le curseur sur le graphique, le flux d'événements se déplace avec vous.
- Affichez l'utilisation par zone, par host ou globale.
- Datadog met à votre disposition l'éditeur JSON du graphique afin d'appliquer [des opérations arithmétiques][14] et des [fonctions][15] aux métriques.
- Partagez un snapshot de graphique qui apparaît dans le flux d'événements.
- Les graphiques peuvent être intégrés à un iframe. Cela permet à un tiers d'accéder au graphique en direct sans qu'il puisse accéder à vos données ou à toute autre information.

## Monitors

Les [monitors][16] fournissent des alertes et notifications basées sur des seuils de métriques, la disponibilité des intégrations, des endpoints réseau, et bien plus encore.

- Utilisez n'importe quelle métrique transmise à Datadog.
- Configurez des alertes multiples en fonction d'un appareil, d'un host, etc.
- Utilisez la syntaxe `@` dans les messages d'alerte pour acheminer les notifications vers les bonnes personnes.
- Planifiez des downtimes pour interrompre l'envoi de notifications en cas d'arrêts système, de maintenance hors ligne, etc.

{{< img src="getting_started/application/metric_monitor.png" alt="Configuration d'une alerte" >}}

## Network Performance Monitoring

{{< img src="getting_started/npm.png" alt="NPM" >}}

La solution [Network Performance Monitoring][17] (NPM) de Datadog vous permet de visualiser votre trafic réseau sur n'importe quel objet tagué dans Datadog : conteneurs, hosts, services ou encore zones de disponibilité. Vous pouvez utiliser n'importe quel élément, que ce soit des datacenters, des équipes ou des conteneurs spécifiques, pour regrouper vos données. Les tags vous aident à filtrer le trafic en fonction de la source et de la destination. Les filtres agrègent ensuite les données sous la forme de flux, qui représentent chacun le trafic entre une source et une destination, via une page et une Network Map personnalisables. Chaque flux contient des métriques réseau, telles que le débit, la bande passante, le nombre de retransmissions et les informations sur la source/destination, avec des détails pouvant aller jusqu'à l'adresse IP, le port et le PID. Les flux renvoient ensuite des métriques clés, telles que le volume du trafic et les retransmissions TCP.

## RUM et Session Replay

{{< img src="getting_started/rum.png" alt="RUM" >}}

La solution [Real User Monitoring][18] (RUM) de Datadog vous permet de visualiser et d'analyser les activités et les expériences de vos utilisateurs en temps réel. Grâce à la fonctionnalité [Session Replay][19], il est possible de capturer et de visualiser les sessions de navigation de vos utilisateurs, afin de mieux comprendre leur comportement. Vous pouvez non seulement consulter dans le RUM Explorer les durées de chargement, les erreurs frontend et les dépendances de page, mais également mettre en corrélation les métriques métier et les métriques d'application. Cette approche vous permet de bénéficier d'un unique dashboard comportant vos métriques d'application, d'infrastructure et métier, afin de résoudre plus facilement vos problèmes.

## Sans serveur

L'[informatique sans serveur][20] consiste à écrire du code orienté événement et à l'importer dans un fournisseur de cloud afin qu'il gère toutes les ressources de calcul sous-jacentes. Les fonctionnalités sans serveur Datadog regroupent en une unique vue les métriques, traces et logs de vos fonctions AWS Lambda qui exécutent des applications sans serveur. Vous pouvez ainsi optimiser vos performances en filtrant les fonctions caractérisées par des erreurs, une forte latence ou des démarrages à froid.

## Cloud SIEM

{{< img src="getting_started/security.png" alt="security" >}}

La solution [Cloud SIEM][21] (Security Information and Event Management) de Datadog détecte automatiquement les menaces concernant votre application ou votre infrastructure. Il peut par exemple s'agir d'une attaque ciblée, d'une adresse IP communiquant avec vos systèmes alors qu'elle fait partie d'une liste noire, ou d'une configuration non sécurisée. Ces menaces sont affichées dans Datadog sous forme de signaux de sécurité et peuvent être mises en corrélation et triées dans le Security Signals Explorer.

## Surveillance Synthetic

{{< img src="getting_started/synthetics.png" alt="Synthetics" >}}

La [surveillance Synthetic][22] Datadog vous permet de créer et d'exécuter des tests API et Browser afin de simuler de façon proactive les transactions de vos utilisateurs sur vos applications, mais également de surveiller tous les endpoints réseau internes et externes sur l'ensemble des couches de votre système. Vous pouvez ainsi détecter les erreurs, identifier les régressions et automatiser les rollbacks afin d'empêcher tout problème de se manifester dans les environnements de production.

## Version mobile de Datadog

L'[application mobile Datadog][23] est disponible dans [l'App Store d'Apple][24] et dans le [Google Play Store][25]. Elle permet aux ingénieurs en service et aux utilisateurs métier de surveiller la santé de leurs services et de trier rapidement leurs problèmes sans utiliser d'ordinateur. Vous pouvez ainsi accéder aux dashboards, monitors, incidents ou encore SLO de votre organisation directement depuis votre appareil mobile.

{{< img src="getting_started/application/mobile-app-store-screens.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Application mobile sous iOS">}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: http://www.datadoghq.com/integrations
[3]: /fr/api/
[4]: https://github.com/DataDog/datadog-agent
[5]: /fr/logs/
[6]: /fr/tracing/
[7]: /fr/infrastructure/
[8]: /fr/getting_started/tagging/
[9]: /fr/infrastructure/hostmap/
[10]: /fr/service_management/events/
[11]: /fr/service_management/events/explorer/analytics
[12]: /fr/dashboards/
[13]: /fr/dashboards/#screenboards
[14]: /fr/dashboards/functions/arithmetic/
[15]: /fr/dashboards/functions/
[16]: /fr/monitors/
[17]: /fr/network_monitoring/performance/
[18]: /fr/real_user_monitoring/
[19]: /fr/real_user_monitoring/session_replay/
[20]: /fr/serverless
[21]: /fr/security/cloud_siem/
[22]: /fr/synthetics/
[23]: /fr/service_management/mobile/
[24]: https://apps.apple.com/app/datadog/id1391380318
[25]: https://play.google.com/store/apps/details?id=com.datadog.app