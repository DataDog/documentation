---
title: Débuter avec Datadog
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=2'
    tag: Centre d'apprentissage
    text: Présentation de Datadog
---
Cette page propose un aperçu détaillé des fonctionnalités du [site américain][1] et du [site européen][2] de Datadog.

**Remarque** : la disposition de l'application Datadog varie en fonction de la largeur de votre navigateur. Il existe trois types de dispositions. Pour changer de disposition, ajustez la largeur de votre navigateur.

## Intégrations

{{< img src="getting_started/integrations.png" alt="intégrations"  >}}

- Datadog dispose de plus de 400 intégrations officielles [répertoriées][3].
- Des intégrations personnalisées sont disponibles [via l'API Datadog][4].
- L'Agent est [open source][5].
- Une fois les intégrations configurées, toutes les données sont traitées de la même façon sur Datadog, qu'elles soient stockées dans un centre de données ou dans un service en ligne.

## Log Management

{{< img src="getting_started/logs.png" alt="logs"  >}}

La solution [Log Management][6] de Datadog vous permet d'envoyer et de traiter chaque log généré par vos applications et votre infrastructure. Vous pouvez visualiser vos logs en temps réel à l'aide de la fonction Live Tail, sans avoir à les indexer. Vous pouvez ingérer tous les logs provenant de vos applications et de votre infrastructure, utiliser des filtres pour déterminer de façon dynamique les logs à indexer, puis les stocker dans une archive.

## APM et tracing distribué

{{< img src="getting_started/apm.png" alt="apm dashboard"  >}}

La solution d'[Application Performance Monitoring de Datadog][7] (appelée APM ou tracing) vous fournit des informations précises sur les performances de votre application, grâce aux dashboards générés automatiquement qui surveillent des métriques clés, comme le volume et la latence des requêtes, ou encore aux traces détaillées portant sur des requêtes individuelles. Ces données viennent compléter vos logs et la surveillance de votre infrastructure. Lorsqu'une requête est envoyée à une application, Datadog peut surveiller les traces associées au sein d'un système distribué et générer des données sur ce qu'il advient de cette requête.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="infrastructure"  >}}

- Toutes les machines apparaissent dans la [liste d'infrastructures][8].
- Vous pouvez consulter les tags appliqués à chaque machine. Les fonctions de tagging vous permettent d'attribuer un rôle précis à vos machines.
- Datadog attribue automatiquement une catégorie à vos serveurs. Si un tag a été ajouté à une nouvelle machine, vous pouvez consulter immédiatement les statistiques liées à cette dernière en fonction de ce qui a précédemment été configuré pour ce tag. [En savoir plus sur le tagging][9].

## Hostmap

{{< img src="getting_started/hostmap-overview.png" alt="aperçu hostmap" >}}

[La hostmap][10] se trouve dans le menu Infrastructure. Grâce à cette carte, vous pouvez :

- Visualiser rapidement votre environnement
- Identifier les singularités
- Détecter les modèles d'utilisation
- Optimiser les ressources

Pour en savoir plus sur la hostmap, consultez la [page de la documentation dédiée][10].

## Événements

{{< img src="getting_started/event_stream.png" alt="Flux d'événements" >}}

[Le flux d'événements][11] fonctionne comme un blog :

- Vous pouvez commenter n'importe quel événement du flux.
- Il est particulièrement utile pour les [équipes][12] réparties aux quatre coins du monde cherchant à enquêter sur des problèmes.
- Vous pouvez [filtrer][13] les événements par `user`, `source`, `tag`, `host`, `status`, `priority` ou `incident`.

Pour chaque incident, les utilisateurs peuvent :

- Augmenter/diminuer la priorité
- Publier des commentaires
- Consulter des incidents similaires
- [Informer des membres d'équipe avec la syntaxe « @ »][14], afin de leur envoyer un e-mail
- Ajouter `@support-datadog` pour demander de [l'aide][15]

{{< img src="getting_started/event_stream_event.png" alt="événement du flux d'événements" style="width:70%;">}}

## Dashboards

{{< img src="getting_started/dashboard.png" alt="dashboard"  >}}

Les [dashboards][16] contiennent des graphiques avec des métriques enregistrant des performances en temps réel.

- Déplacez simultanément votre curseur sur l'ensemble des graphiques d'un [screenboard][17].
- Les barres verticales correspondent à des événements. Elles permettent de placer une métrique dans son contexte.
- Cliquez sur un graphique et faites-le glisser pour étudier un intervalle spécifique.
- Lorsque vous passez le curseur sur le graphique, le flux d'événements se déplace avec vous.
- Affichez l'utilisation par zone, par host ou globale.
- Datadog met à votre disposition l'éditeur JSON du graphique afin d'appliquer [des opérations arithmétiques][18] et des [fonctions][19] aux métriques.
- Partagez un snapshot de graphique qui apparaît dans le flux d'événements.
- Les graphiques peuvent être intégrés à un iframe. Cela permet à un tiers d'accéder au graphique en direct sans qu'il puisse accéder à vos données ou à toute autre information.

## Monitors

Les [monitors][20] fournissent des alertes et notifications basées sur des seuils de métriques, la disponibilité des intégrations, des endpoints réseau, et bien plus encore.

- Utilisez n'importe quelle métrique transmise à Datadog.
- Configurez des alertes multiples (par appareil, host, etc.).
- Utilisez la syntaxe `@` dans les messages d'alerte pour acheminer les notifications vers les bonnes personnes.
- Planifiez des downtimes pour interrompre l'envoi de notifications relatives aux arrêts système, à la maintenance hors ligne, etc.

{{< img src="getting_started/application/metric_monitor.png" alt="configuration d'alerte" >}}

## Network Performance Monitoring

{{< img src="getting_started/npm.png" alt="npm"  >}}

La solution [Network Performance Monitoring][21] (NPM) de Datadog vous permet de visualiser votre trafic réseau sur n'importe quel objet tagué dans Datadog : conteneurs, hosts, services ou encore zones de disponibilité. Vous pouvez utiliser n'importe quel élément, que ce soit des datacenters, des équipes ou des conteneurs spécifiques, pour regrouper vos données. Les tags vous aident à filtrer le trafic en fonction de la source et de la destination. Les filtres sont ensuite agrégés sous la forme de flux, qui représentent chacun le trafic entre une source et une destination, via une page et une carte réseau personnalisables. Chaque flux contient les métriques réseau, telles que le débit, la bande passante, le nombre de retransmissions et les informations sur la source/destination, avec des détails pouvant aller jusqu'à l'adresse IP, le port et le PID. Les flux renvoient ensuite des métriques clés, telles que le volume du trafic et les retransmissions TCP.

## Real User Monitoring

{{< img src="getting_started/rum.png" alt="rum"  >}}

La fonctionnalité [Real User Monitoring][22] (RUM) de Datadog vous permet de visualiser et d'analyser les activités en temps réel ainsi que l'expérience de chaque utilisateur afin de focaliser vos efforts de développement sur les fonctionnalités ayant le plus fort impact métier.
Vous pouvez visualiser les durées de chargement, les erreurs frontend et les dépendances de page, puis corréler les métriques métier et d'application. Cette approche vous permet de bénéficier d'un unique dashboard comportant vos métriques d'application, d'infrastructure et métier, afin de résoudre facilement tous vos problèmes.

## Informatique sans serveur

L'[informatique sans serveur][23] consiste à écrire du code orienté événement et à l'importer dans un fournisseur de cloud afin qu'il gère toutes les ressources de calcul sous-jacentes. L'informatique sans serveur Datadog regroupe en une unique vue les métriques, traces et logs de vos fonctions AWS Lambda qui exécutent des applications sans serveur. Vous pouvez ainsi optimiser vos performances en appliquant des filtres basés sur les fonctions caractérisées par des erreurs, une forte latence ou des démarrages à froid.

## Security Monitoring

{{< img src="getting_started/security.png" alt="security"  >}}

La solution [Security Monitoring][24] de Datadog détecte automatiquement les menaces concernant votre application ou votre infrastructure. Il peut par exemple s'agir d'une attaque ciblée, d'une adresse IP communiquant avec vos systèmes alors qu'elle fait partie d'une liste noire, ou d'une configuration non sécurisée. Ces menaces sont affichées dans Datadog sous forme de signaux de sécurité et peuvent être mises en corrélation et triées dans le Security Signals Explorer.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: https://app.datadoghq.eu
[3]: http://www.datadoghq.com/integrations
[4]: /fr/api/
[5]: https://github.com/DataDog/dd-agent
[6]: /fr/logs/
[7]: /fr/tracing/
[8]: /fr/infrastructure/
[9]: /fr/getting_started/tagging/
[10]: /fr/infrastructure/hostmap/
[11]: /fr/events/
[12]: /fr/account_management/users/
[13]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure
[14]: /fr/events/#@-notifications
[15]: /fr/help/
[16]: /fr/dashboards/
[17]: /fr/dashboards/screenboard/
[18]: /fr/dashboards/functions/
[19]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function
[20]: /fr/monitors/
[21]: /fr/network_performance_monitoring/
[22]: /fr/real_user_monitoring/
[23]: /fr/infrastructure/serverless/
[24]: /fr/security_monitoring/