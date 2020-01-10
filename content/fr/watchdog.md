---
title: Watchdog
kind: Documentation
description: Détectez automatiquement les problèmes d'application et d'infrastructure
aliases:
  - /fr/tracing/watchdog
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: /infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing
    tag: Documentation
    text: Recueillir vos traces
---
{{< img src="watchdog/watchdog_page.png" alt="page Watchdog" responsive="true" >}}

## Présentation

Watchdog est une fonction à base d'algorithmes qui analyse les métriques d'infrastructure et de performance de l'APM afin de détecter les problèmes d'application et d'infrastructure potentiels. Watchdog identifie les tendances et les patterns parmi les métriques suivantes :

* Métriques d'APM
  * Hits (taux de requête)
  * Taux d'erreur
  * Latence

* Métriques d'infrastructure issues des intégrations :
  * [[Système][1]: Host-level memory usage (memory leaks), TCP retransmit rate, etc.
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [[Amazon Web Services][5]]: For the [S3][6], [ELB/ALB/NLB][7], [CloudFront][8], and [DynamoDB][9] Amazon services.

Watchdog recherche des irrégularités dans les métriques, comme une élévation soudaine du taux de hits. Pour chaque irrégularité, une story est affichée sur la [page Watchdog][10]. Chaque story comprend un graphique illustrant l'irrégularité détectée et offre des informations supplémentaires sur l'intervalle et les endpoints pertinents. Pour éviter les fausses alertes, Watchdog signale les problèmes uniquement après avoir analysé vos données pendant une durée suffisante pour établir un degré de confiance élevé.

## Détails d'une story

Cliquez sur la story pour afficher davantage de détails sur l'irrégularité détectée :

{{< img src="watchdog/watchdog_story.png" alt="Story Watchdog"  >}}

Ici, le graphique de la story illustre les valeurs de latence de l'ELB dans trois zones de disponibilité différentes. Watchdog a détecté des anomalies similaires pour cette métrique depuis un même répartiteur de charge activé dans trois zones de disponibilité, et a automatiquement regroupé les résultats dans une story unique. Après une période stable de faible latence, la métrique affiche une élévation soudaine dans les trois zones de disponibilité : cette élévation correspond à la zone mise en surbrillance sur le graphique, qui indique la durée de l'anomalie.

##### Limites attendues

Cochez la case *Show expected bounds* en haut à droite pour afficher les seuils supérieur et inférieur du comportement attendu sur le graphique.

##### Archiver des stories

Utilisez l'icône en forme de dossier en haut à droite d'une story pour l'archiver. La story sera alors masquée du flux ainsi que d'autres sections de l'application Datadog, comme la page d'accueil. Lorsque vous archivez une story, l'icône jaune Watchdog en forme de jumelles n'apparaît plus à proximité du service ou de la ressource concerné(e).

Pour afficher les stories archivées, cochez la case « Show N archived stories » en haut à gauche. Vous avez la possibilité de voir les personnes qui ont archivé les stories et à quelle date, ainsi que de restaurer les stories archivées dans votre flux.

**Remarque** : l'archivage d'une story n'empêche pas Watchdog de signaler d'autres éventuels problèmes affectant le service ou la ressource.

##### Monitors

Les monitors associés à vos stories sont affichés en bas. Pour chaque monitor affiché, la métrique de la story actuelle et ses tags associés sont appliqués en tant que contexte.

{{< img src="watchdog/watchdog_monitors.png" alt="Monitors Watchdog" responsive="true" style="width:75%;">}}

En outre, Watchdog suggère un ou plusieurs monitors qui seront activés si la story se répète. Cliquez sur le bouton **Enable Monitor** pour activer le monitor pour votre organisation. Consultez la [documentation sur les monitors Watchdog][11] pour découvrir comment créer un monitor Watchdog.

## Filtrer les stories

Vous pouvez utiliser le sélecteur d'intervalle, la barre de recherche ou les facettes pour filtrer vos stories Watchdog :

##### Intervalle

Utilisez le sélecteur d'intervalle en haut à droite pour afficher les stories détectées dans un intervalle spécifique. Vous pouvez afficher toutes les stories qui se sont produites au cours des 13 derniers mois, depuis mars 2019.

##### Barre de recherche

Saisissez du texte dans la barre de recherche **Filter stories** pour effectuer une recherche parmi les titres de vos stories.

##### Facettes

Les facettes sont associées à vos stories Watchdog. Elles vous permettent de les filtrer par :

| Facette           | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| Catégorie de story  | Affiche toutes les stories `apm` ou `infrastructure`.                                 |
| Type de story      | Définit les métriques des stories APM ou Infrastructure à afficher. |
| Environnement APM | L'[environnement APM][12] dont les stories doivent être affichées.                                 |
| Tag primaire APM | Le [tag primaire APM][13] dont les stories doivent être affichées.                         |
| Service APM     | Le [service APM][14] dont les stories doivent être affichées.                                     |

## Watchdog dans la liste des services

Lorsqu'une irrégularité est détectée dans une métrique, l'icône Watchdog jaune en forme de jumelles s'affiche à proximité du service affecté dans la [liste des services de l'APM][15]. Le nombre affiché à côté des jumelles indique le nombre de problèmes détectés par Watchdog dans ce service.

{{< img src="watchdog/service_list.png" alt="Liste des services Watchdog" style="width:75%;" >}}

Si Watchdog a détecté une irrégularité dans un service spécifique, une section dédiée à Watchdog apparaît au milieu de la [page Service][15] correspondante, entre les graphiques de performances de l'application et la section de distribution de la latence. La section Watchdog affiche les stories Watchdog pertinentes.

{{< img src="watchdog/watchdog_story_bis.png" alt="Story Watchdog bis" style="width:75%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/system
[2]: /fr/integrations/redis
[3]: /fr/integrations/postgres
[4]: /fr/integrations/nginx
[5]: /fr/integrations/amazon_web_services
[6]: /fr/integrations/amazon_s3
[7]: /fr/integrations/amazon_elb
[8]: /fr/integrations/amazon_cloudfront
[9]: /fr/integrations/amazon_dynamodb
[10]: https://app.datadoghq.com/apm/watchdog
[11]: /fr/monitors/monitor_types/watchdog/
[12]: /fr/tracing/send_traces/#configure-your-environment
[13]: /fr/tracing/guide/setting_primary_tags_to_scope/
[14]: /fr/tracing/visualization/#services
[15]: /fr/tracing/visualization/services_list