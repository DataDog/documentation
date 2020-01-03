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
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing
    tag: Documentation
    text: Recueillir vos traces
---
{{< vimeo 278057125 >}}

## Présentation

Watchdog est une fonction algorithmique pour l'APM qui détecte automatiquement les problèmes d'application et d'infrastructure. Pour ce faire, Watchdog surveille en continu les tendances et les modèles qui se dégagent de vos métriques d'application, comme les taux d'erreur, les taux de requêtes et la latence, tout en recherchant les comportements inattendus. Watchdog évalue tous les services et toutes les ressources sans que la configuration d'un monitor pour chaque service soit nécessaire.

Watchdog recherche des irrégularités dans les métriques, comme un pic soudain du taux de hits. Pour chaque irrégularité, la [page Watchdog][1] affiche une story Watchdog. Chaque story comprend un graphique de l'irrégularité de métrique détectée et offre des informations supplémentaires sur l'intervalle pertinent et sur le ou les endpoints. Pour éviter les fausses alertes, Watchdog signale les problèmes uniquement après avoir observé vos données pendant une durée suffisante pour établir un degré de confiance élevé.

Les stories peuvent être filtrées par environnement et zone de disponibilité, ainsi que par type de service ou de ressource. L'utilisateur peut également taper dans la zone de recherche « Filter stories » pour filtrer les stories par nom de service ou de ressource.

{{< img src="watchdog/watchdog_overview_archive.png" alt="vue d'ensemble de Watchdog" responsive="true" >}}

Cliquez sur la story pour afficher davantage de détails sur les requêtes, les erreurs et la latence au moment où l'irrégularité a été détectée.

{{< img src="watchdog/watchdog_story.png" alt="Story Watchdog" responsive="true" >}}

Cochez la case *Show expected bounds* en haut à droite pour afficher les seuils supérieur et inférieur du comportement attendu sur le graphique.

{{< img src="watchdog/watchdog_expected_values.png" alt="Valeur attendue Watchdog" responsive="true" >}}

## Afficher les stories précédentes

{{< img src="watchdog/watchdog_datepicker.png" alt="Vue d'ensemble de Watchdog" responsive="true" >}}

Utilisez le sélecteur de dates dans le coin supérieur droit pour afficher les stories détectées dans un intervalle spécifique. Vous pouvez afficher toutes les stories qui se sont produites au cours des 13 derniers mois, depuis mars 2019.

## Archiver des stories

{{< img src="watchdog/watchdog_archive.png" alt="Vue d'ensemble de Watchdog" responsive="true" >}}

Utilisez l'icône en forme d’œil en haut à droite d'une story pour l'archiver. La story sera alors masquée du flux ainsi que d'autres sections de la plateforme, comme la page d'accueil. Lorsque vous archivez une story, l'icône jaune Watchdog en forme de jumelles n'apparaît plus à proximité du service ou de la ressource concerné(e).

Pour afficher les stories archivées, cochez la case « Show N archived stories » en haut à gauche. Vous avez la possibilité de voir les personnes qui ont archivé les stories et à quelle date, ainsi que de restaurer les stories archivées dans votre flux.

L'archivage n'empêche pas Watchdog de signaler les prochains problèmes associés au service ou à la ressource.

## Utiliser les facettes

Les facettes sont énumérées dans le volet de gauche. Utilisez-les pour filtrer les stories Watchdog en fonction de leur catégorie (par exemple, `service`, `availability zone`, etc.) et pour afficher le nombre de stories dans chaque catégorie de facette.

{{< img src="watchdog/watchdog-facets2.png" alt="Facettes Watchdog" responsive="true" style="width:60%;">}}


## Watchdog dans la liste des services

Lorsqu'une irrégularité est détectée dans une métrique, l'icône Watchdog jaune en forme de jumelles s'affiche à proximité du service affecté dans la [liste des services de l'APM][2]. Le nombre affiché à côté des jumelles indique le nombre de problèmes détectés par Watchdog dans ce service.

{{< img src="watchdog/service_list.png" alt="Liste des services Watchdog" responsive="true" >}}

Si Watchdog a détecté une irrégularité dans un service spécifique, afficher la [page Service][2] correspondante révèle une section dédiée à Watchdog au milieu de la page, entre les graphiques de performances de l'application et la section de distribution de la latence. La section Watchdog présente les stories Watchdog correspondantes.

{{< img src="watchdog/watchdog_story_bis.png" alt="Story Watchdog bis" responsive="true" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/watchdog
[2]: /fr/tracing/visualization/services_list