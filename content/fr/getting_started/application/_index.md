---
title: Débuter avec Datadog
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=2'
    tag: Centre d'apprentissage
    text: Présentation de Datadog
---
Cette page propose un aperçu détaillé des fonctionnalités du [site américain][1] et du [site européen][2] de Datadog.

## Intégrations

{{< img src="getting_started/integrations.png" alt="intégrations" responsive="true" >}}

* Datadog dispose de plus de 350 intégrations officielles [répertoriées][3].
* Des intégrations personnalisées sont disponibles [via l'API Datadog][4].
* L'Agent est [open source][5].
* Une fois les intégrations configurées, toutes les données sont traitées de la même façon sur Datadog, qu'elles soient stockées dans un centre de données ou dans un service en ligne.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="infrastructure" responsive="true" >}}

* Toutes les machines apparaissent dans la [liste d'infrastructures][6].
* Vous pouvez consulter les tags appliqués à toutes les machines. L'ajout de tags vous permet d'identifier les machines destinées à un but précis.
* Datadog tente de catégoriser automatiquement vos serveurs. Si un tag a été ajouté sur une nouvelle machine, vous pouvez consulter immédiatement les statistiques liées à cette dernière en fonction de ce qui a précédemment été configuré pour ce tag. [En savoir plus sur l'ajout de tags][7].

## Hostmap

{{< img src="getting_started/hostmap-overview.png" alt="aperçu hostmap" responsive="true" >}}

[La hostmap][8] se trouve dans le menu Infrastructure. Grâce à cette carte, vous pouvez :

* Visualiser rapidement votre environnement
* Identifier les singularités
* Détecter les modèles d'utilisation
* Optimiser les ressources

Pour en savoir plus sur la hostmap, consultez la [page de la documentation dédiée][8].

## Événements

{{< img src="getting_started/event_stream.png" alt="Flux d'événements" responsive="true" >}}

[Le flux d'événements][9] fonctionne comme un blog :

* Tout événement du flux peut être commenté.
* Il peut être particulièrement utile pour les [équipes][10] réparties aux quatre coins du monde cherchant à mener des enquêtes.
* Vous pouvez [filtrer][11] par : `user`, `source`, `tag`, `host`, `status`, `priority` ou `incident`.

Pour chaque incident, les utilisateurs peuvent :

* Augmenter/diminuer la priorité
* Publier des commentaires
* Consulter des incidents similaires
* [Informer des membres de l'équipe avec la fonctionnalité « @ »][12], afin qu'ils reçoivent un e-mail
* Ajouter `@support-datadog` pour demander de [l'aide][13]

{{< img src="getting_started/event_stream_event.png" alt="événement flux d'événements" responsive="true" style="width:70%;">}}

## Dashboards

{{< img src="getting_started/dashboard.png" alt="dashboard" responsive="true" >}}

Les dashboards contiennent [des graphiques][14] avec des métriques enregistrant des performances en temps réel.

* Déplacez simultanément votre curseur sur l'ensemble des graphiques d'un [screenboard][15].
* Les barres verticales correspondent à des événements. Elles permettent de placer une métrique dans son contexte.
* Cliquez sur un graphique et faites-le glisser pour étudier un intervalle spécifique.
* Lorsque vous passez le curseur sur le graphique, le flux d'événements se déplace avec vous.
* Affichez l'utilisation par zone, par host ou globale.
* Datadog met à votre disposition l'éditeur JSON du graphique afin d'appliquer [des opérations arithmétiques][16] et des [fonctions][17] aux métriques.
* Partagez un snapshot de graphique qui apparaît dans le flux d'événements.
* Les graphiques peuvent être intégrés à un iframe. Cela permet à un tiers d'accéder au graphique en direct sans qu'il puisse accéder à vos données ou à toute autre information.

## Monitors

Les [monitors][18] fournissent des alertes et notifications basées sur des seuils de métriques, la disponibilité des intégrations, des endpoints réseau, et bien plus encore.

* Utilisez n'importe quelle métrique transmise à Datadog.
* Configurez des alertes multiples (par appareil, host, etc.).
* Utilisez `@` dans les messages d'alerte pour acheminer les notifications vers les bonnes personnes
* Planifiez des downtimes pour interrompre l'envoi de notifications relatives aux arrêts système, à la maintenance hors ligne, etc.

{{< img src="getting_started/application/metric_monitor.png" alt="Configuration d'alerte" responsive="true" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: https://app.datadoghq.eu
[3]: http://www.datadoghq.com/integrations
[4]: /fr/api
[5]: https://github.com/DataDog/dd-agent
[6]: /fr/graphing/infrastructure
[7]: /fr/tagging
[8]: /fr/graphing/infrastructure/hostmap
[9]: /fr/graphing/event_stream
[10]: /fr/account_management/team
[11]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure
[12]: /fr/graphing/event_stream/#@-notifications
[13]: /fr/help
[14]: /fr/graphing
[15]: /fr/graphing/dashboards/screenboard
[16]: /fr/graphing/functions
[17]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function
[18]: /fr/monitors