---
title: Documentation de Datadog
kind: documentation
aliases:
  - '/[object Object]/basic_agent_usage/'
  - '/[object Object]/guides/'
  - '/[object Object]/faq/'
disable_toc: true
---
# Bienvenue sur la Documentation de Datadog!

Si vous êtes nouveau ici, lisez ce rapide tour d'horizon de Datadog.

{{< partial name="tile-nav/tile-nav.html" >}}

Votre stack d'applications regorge de métadonnées inutilisées qui tentent de raconter une histoire: les choses ne tournent pas aussi bien qu'elles devraient.

Des exceptions qui apparaissent,  les requêtes de base de données qui ralentissent; les cache miss sont en augmentation; les logs d'erreurs commencent à remplir vos fichiers. Chacun de ces bavardages fait partie de l'histoire, mais ils sont difficiles à comprendre lorsqu'ils sont pris séparément des autres.

Datadog collecte tous ces métriques, événements et états de services en un seul endroit sans que vous ayez à gérer vous-même l'infrastructure de stockage ou de surveillance. Vous pouvez alors vous concentrer pleinement sur la visualisation et la corrélation des données collectées avec de superbes graphiques, tout en  définissant des conditions de monitoring flexibles.

## Collecter tout

Collectez une multitude de données déjà disponibles sans écrire de code. [Installez l'agent Datadog](/agent) partout: sur vos serveurs,  vos instances, machines virtuelles,  nœuds, [hosts conteneurisés](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent) puis activez et configurez l'une de nos 200 [intégrations](/integrations) prêtes à l'emploi pour commencer à envoyer vos métriques vers Datadog.

Envoyez des métriques d'application custom en écrivant un petit code. Mesurez vos propres gauges, counters, timers et histogrammes avec [DogStatsD](/developers/dogstatsd) ou utilisez [l'APM](/tracing) pour suivre le temps d'exécution de tout chemin de code afin de voir comment cela affecte les temps de réponse .
Les [bibliothèques client](/developers/libraries) envoient vos [mesures personnalisées](/getting_started/custom_metrics/) et données de trace à l'agent Datadog, qui les expédie alors vers Datadog.

Certaines parties de votre stack peuvent être des outils SaaS et non des serveurs. Datadog peut [interroger plusieurs de ces services](/integrations) afin de récupérer automatiquement des métriques ou événements.

## Visualiser le

Dès que vous capturez toutes ces données, consultez-les immédiatement dans l'application Web Datadog. Utilisez le Metrics Explorer pour trouver une métrique donnée et l'observer en temps réel. Visualisez et commentez des événements (par exemple, le déploiement d'une application) lorsqu'ils se déversent dans votre [flux d'événements](/graphing/event_stream/). Filtrez pour un groupe d'hosts dans [l'Infrastructure Map](/graphing/infrastructure). Obtenez une image globale de la façon dont certains services (par exemple, MySQL) fonctionnent via son dashboard par défaut.

Créez des [Screenboards](/graphing/dashboards/screenboard) personnalisés, où vous combinerez tous les graphiques, nombres, événements et états de services qui vous intéressent le plus. Personnalisez les graphiques selon vos besoins afin de résoudre au mieux vos problèmes: en modifiant leurs valeurs de mesure à l'aide d'autres métriques, en appliquant une détection [d'anomalie](monitors/monitor_types/anomaly), [de singularité](/monitors/monitor_types/outlier) ou de [prévisions](/monitors/monitor_types/forecasts), superposant de des événements sur eux, et plus encore.

## Monitorer le

Une fois que vos graphiques ont mis l'accent sur des points de tensions potentiels, définissez des conditions d'alerte sur vos métriques à l'aide de [Monitors](/monitors).  Par défaut vous [recevrez des courriels](/monitors/notifications) lorsque les alertes se déclenchent, mais configurez l'intégration[Slack](/integrations/slack) ou [HipChat](/integrations/hipchat) afin d'obtenir des notifications dédiées.

Lorsque vous êtes au courant d'un problème en cours [mettez en sourdine vos alertes grâce aux downtimes](/monitors/downtimes), et lorsque vous êtes sur le point d'arrêter un service pour maintenance,,[planifier un temps d'arrêt](/monitors/downtimes/) afin de ne pas être spammé avec des notifications. Lorsque vous ne pouvez pas définir une condition unique d'alerte en matière d'hosts, d'événements, de métriques ou de services, créez un [monitor composite](/monitors/monitor_types/composite/).

{{< partial name="support/support.html" >}}