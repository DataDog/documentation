
---
title: Documentation de Datadog
kind: documentation
aliases:
  - /fr/basic_agent_usage/
  - /fr/guides/
  - /fr/faq/
disable_toc: true
---
# Bienvenue sur la Documentation de Datadog!

Si vous êtes nouveau ici, lisez ce rapide tour d'horizon de Datadog.

{{< partial name="tile-nav/tile-nav.html" >}}

Votre stack d'applications regorge de métadonnées inutilisées qui tentent de raconter une histoire: les choses ne tournent pas aussi bien qu'elles devraient.

Des exceptions qui apparaissent,  les requêtes de base de données qui ralentissent; les cache miss sont en augmentation; les logs d'erreurs commencent à remplir vos fichiers. Chacun de ces bavardages fait partie de l'histoire, mais ils sont difficiles à comprendre lorsqu'ils sont pris séparément des autres.

Datadog collecte tous ces métriques, événements et états de services en un seul endroit sans que vous ayez à gérer vous-même l'infrastructure de stockage ou de surveillance. Vous pouvez alors vous concentrer pleinement sur la visualisation et la corrélation des données collectées avec de superbes graphiques, tout en  définissant des conditions de monitoring flexibles.

## Collecter tout

Collectez une multitude de données déjà disponibles sans écrire de code. [Installez l'agent Datadog][1] partout: sur vos serveurs,  vos instances, machines virtuelles,  nœuds, [hosts conteneurisés][2] puis activez et configurez l'une de nos 200 [intégrations][3] prêtes à l'emploi pour commencer à envoyer vos métriques vers Datadog.

Envoyez des métriques d'application custom en écrivant un petit code. Mesurez vos propres gauges, counters, timers et histogrammes avec [DogStatsD][4] ou utilisez [l'APM][5] pour suivre le temps d'exécution de tout chemin de code afin de voir comment cela affecte les temps de réponse .
Les [bibliothèques client][6] envoient vos [mesures personnalisées][7] et données de trace à l'agent Datadog, qui les expédie alors vers Datadog.

Certaines parties de votre stack peuvent être des outils SaaS et non des serveurs. Datadog peut [interroger plusieurs de ces services](/integrations) afin de récupérer automatiquement des métriques ou événements.

## Visualiser le

Dès que vous capturez toutes ces données, consultez-les immédiatement dans l'application Web Datadog. Utilisez le Metrics Explorer pour trouver une métrique donnée et l'observer en temps réel. Visualisez et commentez des événements (par exemple, le déploiement d'une application) lorsqu'ils se déversent dans votre [flux d'événements][8]. Filtrez pour un groupe d'hosts dans [l'Infrastructure Map][9]. Obtenez une image globale de la façon dont certains services (par exemple, MySQL) fonctionnent via son dashboard par défaut.

Créez des [Screenboards][10] personnalisés, où vous combinerez tous les graphiques, nombres, événements et états de services qui vous intéressent le plus. Personnalisez les graphiques selon vos besoins afin de résoudre au mieux vos problèmes: en modifiant leurs valeurs de mesure à l'aide d'autres métriques, en appliquant une détection [d'anomalie][20], [de singularité][11] ou de [prévisions][12], superposant de des événements sur eux, et plus encore.

## Monitorer le

Une fois que vos graphiques ont mis l'accent sur des points de tensions potentiels, définissez des conditions d'alerte sur vos métriques à l'aide de [Monitors][13].  Par défaut vous [recevrez des courriels][14] lorsque les alertes se déclenchent, mais configurez l'intégration[Slack][15] ou [HipChat][16] afin d'obtenir des notifications dédiées.

Lorsque vous êtes au courant d'un problème en cours [mettez en sourdine vos alertes grâce aux downtimes][17], et lorsque vous êtes sur le point d'arrêter un service pour maintenance,,[planifier un temps d'arrêt][18] afin de ne pas être spammé avec des notifications. Lorsque vous ne pouvez pas définir une condition unique d'alerte en matière d'hosts, d'événements, de métriques ou de services, créez un [monitor composite][19].

{{< partial name="support/support.html" >}}

[1]: /agent
[2]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[3]: /integrations
[4]: /developers/dogstatsd
[5]: /tracing
[6]: /developers/libraries
[7]: /getting_started/custom_metrics/
[8]: /graphing/event_stream/
[9]: /graphing/infrastructure
[10]: /graphing/dashboards/screenboard
[11]: /monitors/monitor_types/outlier
[12]: /monitors/monitor_types/forecasts
[13]: /monitors
[14]: /monitors/notifications
[15]: /integrations/slack
[16]: /integrations/hipchat
[17]: /monitors/downtimes
[18]: /monitors/downtimes/
[19]: /monitors/monitor_types/composite/
[20]: /monitors/monitor_types/anomaly/