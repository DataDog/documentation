---
aliases:
- /fr/logs/explorer/sidepanel
description: Effectuer des recherches et des analyses sur l'ensemble de vos logs
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Associer vos logs à vos traces
- link: /logs/guide/correlate-logs-with-metrics
  tag: Documentation
  text: Associer vos logs à vos métriques d'infrastructure
kind: documentation
title: Volet latéral des logs
---

## Présentation
Datadog affiche les informations sur les logs individuels dans le volet latéral, avec la disposition suivante :

{{< img src="logs/explorer/side_panel/overview.png" alt="Volet latéral du Log Explorer" style="width:60%;">}}

- La partie supérieure du volet présente des informations sur le **contexte** général
- La partie inférieure du volet affiche le **contenu** du log

Le **contexte** désigne les informations liées à l'infrastructure et à l'application à l'origine du log. Les informations sont recueillies à partir des tags ajoutés au log par l'Agent Datadog ou le Forwarder de logs, que ce soit automatiquement (hostname, nom du conteneur, nom du fichier de log, nom des fonctions sans serveur, etc.) ou via des tags personnalisés (équipe responsable, environnement, version de l'application, etc.).

Le **contenu** désigne les composants du log, à savoir le message du log, mais également toutes les informations structurées extraites et enrichies des logs transitant par les [pipelines de logs][1]. Pour les logs générés par des éléments communs d'une pile technique, les opérations de parsing et d'enrichissement sont fournies par défaut :

- Pour la collecte de logs de fichiers, assurez-vous d'avoir correctement configuré le champ source, afin de bien déclencher le processus. Consultez les [intégrations de logs][2] pour en savoir plus.
- Pour la collecte de logs de conteneur, utilisez [Autodiscovery][3].

Certains champs standards, comme `error.stack`, `http.method` ou `duration`, sont optimisés dans le volet des logs afin d'améliorer leur lisibilité. Assurez-vous d'extraire les informations correspondantes à partir de vos logs et de remapper vos attributs avec des [remappeurs d'attributs standards][4].

## Hub vers d'autres sources de données

### Établir une corrélation avec les données d'infrastructure

Le bouton **View in context** met à jour la requête de recherche afin d'afficher les lignes de log dont la date précède ou suit le log sélectionné, même si ces logs ne correspondent pas à votre filtre. Ce contexte diffère selon la situation, car Datadog utilise les attributs `Hostname`, `Service`, `filename` et `container_id`, ainsi que des tags, afin de trouver le contexte approprié pour vos logs.

Cliquez sur l'onglet **Metrics** pour accéder aux métriques de votre infrastructure sous-jacente recueillies dans l'intervalle de 30 minutes associé au log.

Interagissez avec la section **Host** en haut des attributs réservés pour accéder au [dashboard des hosts][5] ou à la page [Network Analytics][6]. Interagissez avec les sections **Container** pour accéder à la [page des conteneurs][7], filtrés en fonction des paramètres sous-jacents.

{{< img src="logs/explorer/side_panel/infra.mp4" alt="Hub vers l'infrastructure" video=true style="width:100%;">}}

Lorsque les logs proviennent d'une source sans serveur, la section Host est remplacée par une section Serverless. Celle-ci contient un lien permettant d'accéder à la [page Serverless][8] correspondante.

{{< img src="logs/explorer/side_panel/infra-serverless.png" alt="Hub vers la page Serverless" style="width:80%;">}}

### Établir une corrélation avec les données d'APM

Assurez-vous d'activer l'[injection de traces dans les logs][9] et de suivre les pratiques recommandées pour le [Tagging de service unifié][10] afin d'exploiter tout le potentiel de la corrélation entre les logs et les données d'APM.

Cliquez sur l'onglet **Trace** pour afficher un log dans le contexte de sa trace complète, avec les services en amont et en aval actifs. Analysez en détail les données d'APM correspondantes en cliquant sur [View Trace Details][11].

Interagissez avec la section **Service** pour mettre en évidence la partie de la trace qui correspond au service sélectionné. Utilisez ces informations pour ajuster votre requête dans le Log Explorer et visualiser d'autres logs provenant de la même trace.

{{< img src="logs/explorer/side_panel/trace.mp4" alt="Hub vers l'APM" video=true style="width:100%;">}}

## Configurer votre contexte de dépannage

Interagissez avec les noms et les valeurs des attributs, à l'aide de la section JSON plus bas, pour :

- Ajouter une colonne ou supprimer une colonne dans le tableau de logs
- Ajouter des valeurs particulières à la requête de recherche (inclusion ou exclusion)

{{< img src="logs/explorer/side_panel/context.jpg" alt="Contexte du volet latéral" style="width:50%;">}} {{< img src="logs/explorer/side_panel/context2.jpg" alt="Contexte du volet latéral" style="width:50%;">}}

- Créer ou modifier une facette ou une mesure à partir d'un attribut (voir la section [Facettes de log][12])

{{< img src="logs/explorer/side_panel/facets.mp4" alt="Facettes du volet latéral" video=true style="width:100%;">}}

## Partager un log

Utilisez le bouton de **partage** pour partager le log ouvert dans le volet latéral avec d'autres contextes.

- Sélectionnez **Copy to clipboard** ou appuyez sur les touches `Ctrl + C` ou `Cmd + C` pour copier le JSON du log dans votre presse-papiers.
- L'option **Share Event** permet de partager le log (ainsi que la vue sous-jacente) avec vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][13] disponibles.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/pipelines
[2]: /fr/integrations/#cat-log-collection
[3]: /fr/agent/autodiscovery/integrations/?tab=kubernetes
[4]: /fr/logs/log_configuration/attributes_naming_convention
[5]: /fr/dashboards/list/#preset-lists
[6]: /fr/network_monitoring/performance/network_analytics/
[7]: /fr/infrastructure/livecontainers/?tab=linuxwindows#introduction
[8]: /fr/infrastructure/serverless/#function-detail-view
[9]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[10]: /fr/getting_started/tagging/unified_service_tagging
[11]: /fr/tracing/app_analytics/search/#displaying-a-full-trace
[12]: /fr/logs/explorer/facets/#overview
[13]: /fr/integrations/#cat-notification