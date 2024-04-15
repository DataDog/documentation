---
algolia:
  tags:
  - watchdog
aliases:
- /fr/tracing/watchdog
cascade:
  algolia:
    rank: 70
description: Détectez automatiquement les problèmes d'application et d'infrastructure
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Watchdog
  tag: Notes de version
  text: Découvrez les dernières versions de la solution Watchdog Datadog (connexion
    à l'application requise).
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process/
  tag: Documentation
  text: Recueillir vos processus
- link: /tracing/
  tag: Documentation
  text: Recueillir vos traces
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: Blog
  text: Analyse automatisée des causes d'origine avec Watchdog RCA
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: Blog
  text: Mesurer l'impact utilisateur avec l'analyse de l'impact Watchdog

title: Datadog WatchdogTM
---

{{< img src="watchdog/watchdog.png" alt="La page d'alertes de Watchdog, avec une alerte d'anomalie en cours dans des logs d'erreur, une alerte d'anomalie résolue dans des logs d'erreur et une alerte de taux d'erreur résolue via une analyse des causes d'origine" >}}

## Présentation

Watchdog est une fonction à base d'algorithmes qui analyse les métriques d'infrastructure et de performance APM ainsi que les logs afin de détecter les problèmes potentiels au niveau de vos applications et de votre infrastructure. Elle repose sur les mêmes algorithmes saisonniers que ceux utilisés par les dashboards et la fonctionnalité de détection d'anomalies. Watchdog identifie les tendances et les patterns parmi les métriques suivantes :

* Métriques APM :
  * Hits (taux de requête)
  * Taux d'erreur
  * Latence

* Logs
  * Nouveaux logs d'erreur
  * Augmentations du nombre de logs d'erreur existants

* Métriques d'infrastructure issues des intégrations :
  * [Système][1], pour l'utilisation de la mémoire (fuites de mémoire) et le taux de retransmissions TCP au niveau du host.
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Amazon Web Services][5], pour les services Amazon [S3][6], [ELB/ALB/NLB][7], [CloudFront][8] et [DynamoDB][9].
  * [Alertes][10]

Watchdog recherche des irrégularités dans les métriques, comme une élévation soudaine du taux de hits. Pour chaque irrégularité, une alerte est affichée sur la [page Watchdog][11]. Chaque alerte comprend un graphique illustrant l'irrégularité détectée et offre des informations supplémentaires sur l'intervalle et les endpoints pertinents. Watchdog surveille automatiquement les données envoyées par l'Agent Datadog ou par les intégrations.

En cas de nouvelle source de métriques, de logs ou d'autres données, Watchdog a besoin de deux semaines de données pour analyser le comportement normal attendu. Les anomalies détectées par Watchdog alors qu'il existe moins de deux semaines de données sont susceptibles d'être inexactes.

## Watchdog dans la liste des services

Lorsque Watchdog détecte une irrégularité dans une métrique APM, l'icône Watchdog rose en forme de jumelles s'affiche à proximité du service affecté dans la [liste des services APM][12]. Le nombre affiché à côté des jumelles indique le nombre de problèmes détectés par Watchdog dans ce service.

{{< img src="watchdog/service_list.png" alt="Capture d'écran de la liste des services APM avec 5 services affichés. Une icône rose en forme de jumelles est visible à côté du nom du service web-store." style="width:75%;" >}}

Accédez à la [page Services][13] pour consulter des informations détaillées sur une anomalie de métrique. Une case Watchdog Insights est visible en haut de la page. Watchdog Insights vous aide à découvrir les valeurs de tag associées à un comportement inattendu, comme un taux d'erreurs ou une latence élevée.

L'icône Watchdog apparaît également sur les graphiques de métriques.

{{< img src="watchdog/latency_graph.png" alt="Un graphique illustrant la latence d'un service, en secondes, sur l'axe des ordonnées et l'heure de la journée sur l'axe des abscisses. Le graphique est représenté sur un fond rose et le texte May 2: 13:31 Ongoing apparaît en haut." style="width:75%;" >}}

Cliquez sur l'icône en forme de jumelles pour visualiser une [alerte Watchdog][14] dans une carte plus détaillée.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][15].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/system/
[2]: /fr/integrations/redisdb/
[3]: /fr/integrations/postgres/
[4]: /fr/integrations/nginx/
[5]: /fr/integrations/amazon_web_services/
[6]: /fr/integrations/amazon_s3/
[7]: /fr/integrations/amazon_elb/
[8]: /fr/integrations/amazon_cloudfront/
[9]: /fr/integrations/amazon_dynamodb/
[10]: /fr/monitors/
[11]: https://app.datadoghq.com/watchdog
[12]: /fr/tracing/services/services_list/
[13]: /fr/tracing/services/service_page/#overview
[14]: /fr/watchdog/alerts#alert-details
[15]: /fr/help/
