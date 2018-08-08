---
title: Débuter
kind: documentation
aliases:
  - /fr/overview
  - /fr/guides/overview/
---
Donc, vous venez de terminer [l'installation][1] de l'Agent Datadog, ou peut-être êtes vous simplement curieux de savoir [ce que Datadog peut faire pour vous][2]. Cette page donne un aperçu général des capacités de Datadog et de la façon dont il peut vous aider à mettre votre infrastructure au pas.

## Intégrations

{{< img src="getting_started/integrations.png" alt="integrations" responsive="true" >}}

* Plus de 200 intégrations [officiellement listées][3], et nous en ajoutons toujours plus.
* Des intégrations personnalisées sont disponibles [via notre API][4], dont beaucoup sont documentées par notre communauté d'utilisateurs actifs.
* L'Agent est [open source][5] et vous pouvez l'instrumenter directement si vous le souhaitez.
* Une fois les intégrations configurées, les données résidant dans un centre de données ou
dans un service en ligne sont traitées de la même façon sur Datadog.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="infrastructure" responsive="true" >}}

* Toutes les machines apparaissent dans la [liste d'infrastructures](/graphing/infrastructure).
* Ici vous pouvez voir les tags appliqués à chaque machine; comme elles sont assignées à
effectuer certains rôles, le tagging vous permet d'indiquer les machines qui ont
un but précis.
* Nous faisons tout notre possible pour catégoriser automatiquement vos serveurs
pour vous, ce qui contribue à créer une structure dans votre infrastructure avec le minimum
de travail possible (contrairement à la création explicite de tous vos clusters).
Ainsi, si une nouvelle machine est taggée, vous pouvez voir immédiatement les statistiques
pour cette machine en fonction de ce qui a été précédemment configuré pour ce tag. [En savoir plus sur le tagging][15].

## Map des hosts

{{< img src="getting_started/hostmap-overview.png" alt="hostmap overview" responsive="true" >}}

[La Host Map](/graphing/infrastructure/hostmap) se trouve dans le menu Infrastructure et offre la possibilité de:

* Visualiser rapidement l'intégralité de votre environnement, qu'il s'agisse de 5, 500 ou 50 000 hôtes.
* Identifier les singularités
* Détecter les habitudes d'utilisation
* Optimiser les ressources

Pour en apprendre plus sur la Host Map, consultez la [page de documentation dédiée à la Host Map][10].

## Evénements

{{< img src="getting_started/event_stream.png" alt="Event stream" responsive="true" >}}

[Le flux d'événements](/graphing/event_stream) est basé sur les mêmes conventions qu'un blog:

* Chaque événement du flux peut être commenté.
* Idéal pour les [équipes réparties aux quatre coins du monde](/account_management/team) cherchant à mener l'enquête.
* Vous pouvez [filter][8] par: `user`, `source`, `tag`, `host`, `status`, `priority`, `incident`

Pour chaque incident, les utilisateurs peuvent:

* Le réclamer
* Augmenter/diminuer sa priorité
* Le commenter
* Voir des incidents similaires
* [@ notifier les membres de l'équipe](/graphing/event_stream/#@-notifications), qui reçoivent alors un courriel
* `@support-datadog` pour demander [l'assistance](/help) d'un ingénieur Datadog

{{< img src="getting_started/event_stream_event.png" alt="event stream event" responsive="true" style="width:70%;">}}

## Dashboards

{{< img src="getting_started/dashboard.png" alt="dashboard" responsive="true" >}}

Les Dashboards contiennent [des graphiques][11] avec des métriques de performance en temps réel

* Mousing synchrone sur tous les graphiques d'un [screenboard](/graphing/dashboards/screenboard).
* Les barres verticales rouge sont des événements dans le contexte de la métrique.
* Cliquez et glissez sur un graphique pour zoomer sur un intervalle de temps particulier.
* Lorsque vous passez la souris sur le graphique, le flux d'événements se déplace avec vous.
* Afficher par zone, hôte ou utilisation totale
* Nous exposons l'éditeur JSON du graphique permettant [une arithmétique][12] de métrique et
l'utilisation de [fonctions][13].
* Partagez un snapshot de graphique qui apparaît dans le flux d'événements; en cliquer sur
ce snapshot vous dirige au dashboard d'origine (via l'icône de caméra en haut à droite d'un graphique).
* Les graphes peuvent être incorporés dans un iframe, donnant à un tiers un accès au graphique en direct
sans qu'il puisse accéder à vos données ou toute autre information (via le crayon dans le coin supérieur droit d'un graphique).

## Monitoring

{{< img src="getting_started/monitor.png" alt="monitor" responsive="true" >}}

Le [Monitoring][14] vous donne la possibilité d'être informé si un agrégat ou si une métrique spécifique est supérieure ou inférieure à un certain seuil:

* Sur l'ensemble de votre infrastructure
* Par machine (moyenne, max, min ou somme)
* S'applique à toutes les métriques que vous voulez: chiffre d'affaires: température du centre de données, etc.
* Alertes multiples (par device, host, etc.)
* Définir un message de notification d'alerte, avec les capacités @

{{< img src="getting_started/alert_setup.png" alt="alert setup" responsive="true" >}}

[1]: /agent/
[2]: http://www.datadoghq.com/product/
[3]: http://www.datadoghq.com/integrations/
[4]: /api/
[5]: https://github.com/DataDog/dd-agent/
[8]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure/
[10]: /graphing/infrastructure/hostmap/
[11]: /graphing/
[12]: /graphing/miscellaneous/functions/
[13]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function/
[14]: /monitors/
[15]: /tagging
