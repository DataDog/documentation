---
title: Documentation de Datadog
kind: documentation
aliases:
  - /fr/basic_agent_usage/
  - /fr/guides/
  - /fr/faq/
  - /fr/docs/
  - /fr/guides/overview/
disable_toc: true
---
# Bienvenue dans la documentation de Datadog !

*Si vous accédez à cette documentation pour la première fois, consultez ci-dessous une vue d'ensemble de Datadog.*

{{< tile-nav >}}

Votre suite d'applications regorge de métadonnées inexploitées qui tentent de raconter une histoire : les choses ne fonctionnent pas aussi bien qu'elles le devraient.

Exceptions levées, ralentissement des requêtes de base de données, hausse du miss du cache, oscillations de services en amont, logs d'erreurs de plus en plus conséquents… Toutes ces données constituent des indicateurs. Il est cependant difficile d'en comprendre le sens ou de prendre des mesures utiles en les étudiant séparément.

Datadog recueille l'ensemble de ces métriques, événements et états de services en un seul endroit. Vous pouvez alors visualiser et corréler les données grâce à de superbes graphiques et définir des conditions d'alerte flexibles sur l'ensemble des données sans avoir à gérer vous-même l'infrastructure de stockage ou de surveillance.

## Collecte exhaustive

Recueillez une multitude de données déjà disponibles sans écrire de code. [Installez l'Agent Datadog][1] où bon vous semble : sur vos serveurs, instances, machines virtuelles, nœuds et [hosts exécutant des conteneurs][2]. Activez ensuite l'Agent et configurez l'une de nos 350 [intégrations][3] prêtes à l'emploi pour commencer à envoyer vos métriques au backend de Datadog.

Envoyez des métriques d'application custom en rédigeant quelques lignes de code. Utilisez vos propres gauges, counters, timers et histograms avec [DogStatsD][4] ou consultez [l'APM][5] pour tracer le temps d'exécution de n'importe quel chemin de code et découvrir l'impact sur les délais de réponse. Les [bibliothèques client][6] envoient vos [métriques custom][7] et données de trace à l'Agent Datadog, qui les transmet ensuite à Datadog.

Certaines parties de votre pile peuvent correspondre à des outils SaaS, et non à des serveurs. Datadog peut [interroger plusieurs de ces services][8]. Les intégrations associées à ces services sont extrêmement simples à installer, et ne nécessitent pas d'Agent.

## Visualisation

Dès que les données sont enregistrées, vous pouvez y accéder directement dans l'application Web Datadog. Utilisez Metrics Explorer pour trouver une métrique spécifique et l'observer en temps réel. Visualisez et commentez des événements (par exemple, le déploiement d'une application) au fil de leur arrivée dans votre [flux d'événements][9]. Filtrez les données selon un groupe d'hosts dans la [carte d'infrastructure][10]. Bénéficiez d'une vue d'ensemble du fonctionnement d'un service donné (par exemple, MySQL) sur son tableau de bord par défaut.

Vous pourrez rapidement créer des [screenboards][11] personnalisés qui combineront l'ensemble des graphiques, données chiffrées, événements et états de services qui vous intéressent le plus. Adaptez les graphiques à vos besoins pour mieux mettre en évidence les problèmes : modifiez les valeurs de leurs métriques à l'aide d'autres métriques, appliquez une détection des [anomalies][12], des [singularités][13] ou des [prévisions][14], superposez des événements, et plus encore.

## Surveillance

Une fois que vos graphiques ont mis en évidence des problèmes potentiels, définissez des conditions d'alerte sur vos métriques à l'aide des [monitors][15]. Par défaut, vous [recevrez des e-mails][16] lorsque les alertes se déclenchent, mais vous pouvez également configurer l'intégration [Slack][17] pour recevoir des notifications spéciales dans l'application.

Lorsque vous êtes conscient d'un problème récurrent, [désactivez les alertes associées][18]. Avant d'arrêter un service afin d'effectuer une maintenance, [planifiez un downtime][18] afin de ne pas recevoir d'alertes inutiles. Lorsque vous ne pouvez pas définir une condition d'alerte intéressante pour un host, un événement, une métrique ou un service, créez un [monitor composite][19].

{{< partial name="support/support.html" >}}

[1]: /fr/agent
[2]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[3]: /fr/integrations
[4]: /fr/developers/metrics/dogstatsd_metrics_submission
[5]: /fr/tracing
[6]: /fr/developers/libraries
[7]: /fr/developers/metrics/custom_metrics
[8]: /fr/integrations
[9]: /fr/graphing/event_stream
[10]: /fr/graphing/infrastructure
[11]: /fr/graphing/dashboards/screenboard
[12]: /fr/monitors/monitor_types/anomaly
[13]: /fr/monitors/monitor_types/outlier
[14]: /fr/monitors/monitor_types/forecasts
[15]: /fr/monitors
[16]: /fr/monitors/notifications
[17]: /fr/integrations/slack
[18]: /fr/monitors/downtimes
[19]: /fr/monitors/monitor_types/composite