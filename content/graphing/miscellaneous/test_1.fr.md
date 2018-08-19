---
title: Documentation de Datadog
kind: Documentation
draft: true
---

# Bienvenue sur la documentation de Datadog !

Si vous débutez, lisez cette courte présentation de Datadog.

{{< partial name="tile-nav/tile-nav.html" >}}

Votre suite d'applications regorge de métadonnées inexploitées qui tentent d'expliquer quelque chose : tout ne fonctionne pas aussi bien que possible.

Exceptions levées, ralentissement des requêtes de base de données, augmentation des caches sans résultat, services ascendants aléatoires, logs d'erreurs grandissants… Chacun de ces indicateurs doit être pris en compte, mais il est difficile d'en comprendre le sens ou de prendre des mesures utiles si on les étudie séparément.

Datadog vous permet de collecter tous ces événements, métriques et états de services en un seul endroit, sans que vous ayez à gérer vous-même l'infrastructure de stockage ou de surveillance. Vous pouvez alors vous concentrer pleinement sur la visualisation et la corrélation des données collectées avec de superbes graphiques, tout en  définissant des conditions de suivi flexibles.

## Collecter tout

Collectez une multitude de données déjà disponibles sans écrire de code. [Installez l'agent Datadog][1] partout : sur vos serveurs, vos instances, vos machines virtuelles, vos nœuds et vos [hôtes conteneurisés][2], puis activez et configurez l'une de nos [intégrations][3] prêtes à l'emploi : nous en proposons plus de 200. Vos métriques commenceront à être envoyées à Datadog.

Envoyez des métriques d'application personnalisées en quelques lignes de code seulement. Utilisez vos propres jauges, compteurs, minuteurs et histogrammes avec [DogStatsD][4] ou utilisez l'[APM][5] pour tracer le temps d'exécution de n'importe quel chemin de code et voir comment les temps de réponse sont affectés. Les [bibliothèques client][6] envoient vos [métriques personnalisées][7] et données de trace à l'agent Datadog, qui les transmet alors à Datadog.

Certaines parties de votre suite peuvent être des outils SaaS et non des serveurs. Datadog est capable d'[interroger plusieurs de ces services](/integrations) à la fois, et son intégration y est plus facile que jamais : aucun agent n'est nécessaire.

## Visualiser

Aussitôt que les données sont enregistrées, elles sont disponibles dans l'application Web Datadog. Utilisez l'explorateur de métriques pour trouver une métrique donnée et l'observer en temps réel. Affichez et commentez des événements (par exemple, le déploiement d'une application) au fil de leur arrivée dans votre [flux d'événements][8]. Filtrez les groupe d'hôtes dans le [plan des infrastructures][9]. Bénéficiez d'une vue d'ensemble des performances de vos services (par exemple, MySQL) depuis leur tableau de bord par défaut.

Créez des [screenboards][10] personnalisés qui combinent tous les graphiques, chiffres, événements et états de services qui vous intéressent le plus. Adaptez les graphiques à vos besoins pour mieux mettre en évidence les problèmes : modifiez leurs valeurs de mesure à l'aide d'autres métriques, activez la détection des [anomalies][11], des [singularités][12] ou des [prévisions][13], superposez-y des événements, et plus encore.

## Suivre

Une fois que vos graphiques ont mis en évidence des problèmes potentiels, définissez des conditions d'alerte sur vos métriques à l'aide de la fonctionnalité [Monitor][14]. Par défaut, vous [recevrez des e-mails][15] lorsque les alertes se déclenchent, mais vous pouvez activer l'intégration [Slack][16] ou [HipChat][17] pour recevoir des notifications spéciales dans l'une de ces applications.

Lorsque vous êtes au courant d'un problème, [mettez en sourdine les alertes le concernant][18]. Avant d'arrêter un service pour maintenance, [planifiez un downtime][19] afin de ne pas recevoir d'alertes inutiles. Lorsque vous ne pouvez pas définir de condition d'alerte intéressante pour un hôte, un événement, une métrique ou un service, créez un [monitor composite][20].

{{< partial name="support/support.html" >}}

[1]: /agent
[2]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[3]: /integrations
[4]: /developers/dogstatsd
[5]: /tracing
[6]: /developers/libraries
[7]: /developers/metrics/custom_metrics/
[8]: /graphing/event_stream/
[9]: /graphing/infrastructure
[10]: /graphing/dashboards/screenboard
[11]: /monitors/monitor_types/anomaly
[12]: /monitors/monitor_types/outlier
[13]: /monitors/monitor_types/forecasts
[14]: /monitors
[15]: /monitors/notifications
[16]: /integrations/slack
[17]: /integrations/hipchat
[18]: /monitors/downtimes
[19]: /monitors/downtimes/
[20]: /monitors/monitor_types/composite/
