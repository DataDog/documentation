---
title: Log Explorer
kind: documentation
description: Effectuer des recherches sur l'ensemble de vos logs et réaliser des analyses de logs
aliases:
  - /fr/logs/explore
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/explorer/saved_views
    tag: Documentation
    text: Configurer automatiquement votre vue Log Explorer
  - link: logs/explorer/patterns
    tag: Documentation
    text: Détecter les patterns dans vos logs
---
## Présentation

Le Log Explorer vous permet d'effectuer un premier dépannage et de commencer à plonger au cœur de vos logs :

Chaque vue vous permet d'analyser un aspect précis de vos données de log, à partir d'une [requête de recherche][1].

### Live Tail

La vue Live Tail affiche les logs qui transitent dans Datadog. Les logs Live Tail sont éphémères, mais la vue vous permet d'explorer **tous** les logs, qu'ils soient indexés ou non. Consultez la [section Live Tail][2] pour en savoir plus.

{{< img src="logs/explorer/live_tail/livetail.gif" alt="Live tailing de log" style="width:60%;" >}}

### Listes de logs

La liste de logs affiche les logs indexés et propose des outils efficaces pour parcourir les **résultats individuels**. Consultez la [section Liste de logs][3] pour en savoir plus.

{{< img src="logs/explorer/toplists.png" alt="Liste de logs" style="width:60%;" >}}

### Log Patterns

Les Log Patterns agrègent automatiquement les logs indexés en **plusieurs groupes** avec des structures similaires. Consultez la [section Log Patterns][4] pour en savoir plus.

{{< img src="logs/explorer/patterns_side_panel.png" alt="Log Patterns" style="width:60%;" >}}

### Analyse de logs

La vue d'analyse de logs propose des **représentations graphiques** des requêtes de log ainsi que des maximums, moyennes, centiles, nombres uniques de valeurs, et bien plus encore. Consultez le [guide relatif aux graphiques de log][5] pour en savoir plus sur les différents graphiques disponibles.

## Volet latéral des logs

Datadog affiche les informations sur les logs individuels dans le volet latéral, avec la disposition suivante :

{{< img src="logs/explorer/side_panel/overview.png" alt="Volet latéral des logs"  style="width:60%;">}}

### Informations structurées des logs

- La partie supérieure du volet présente des informations sur le **contexte** général.
- La partie inférieure du volet affiche le **contenu** du log.

Le **contexte** désigne les informations liées à l'infrastructure et à l'application à l'origine du log. Les informations sont recueillies à partir des tags ajoutés au log par l'Agent Datadog ou le Forwarder de logs, que ce soit automatiquement (hostname, nom du conteneur, nom du fichier de log, nom des fonctions sans serveur, etc.) ou via des tags personnalisés (équipe responsable, environnent, version de l'application, etc.).

Le **contenu** désigne les composants du log, à savoir le message du log, mais également toutes les informations structurées extraites et enrichies des logs transitant par les [pipelines de logs][6]. Pour les logs générés par des éléments communs d'une pile technique, les opérations de parsing et d'enrichissement sont fournies par défaut :

- Pour la collecte de logs de fichiers, assurez-vous d'avoir correctement configuré le champ source, afin de bien déclencher le processus. Consultez la [centaine d'intégrations de logs][7] de Datadog pour en savoir plus.
- Pour la collecte de logs de conteneur, utilisez [Autodiscovery][8].

Certains champs standards, comme `error.stack`, `http.method` ou `duration`, sont optimisés dans le volet des logs afin d'améliorer leur lisibilité. Assurez-vous d'extraire les informations correspondantes à partir de vos logs et de remapper vos attributs avec des [remappeurs d'attributs standards][9].

### Hub vers d'autres sources de données

#### Corrélation avec les données d'infrastructure (host, conteneur, fonctions sans serveur)

Le bouton **View in context** met à jour la requête de recherche afin d'afficher les lignes de log dont la date précède ou suit le log sélectionné, même si ces logs ne correspondent pas à votre filtre. Ce contexte diffère selon la situation, car Datadog utilise les attributs `Hostname`, `Service`, `filename` et `container_id`, ainsi que des tags, afin de trouver le contexte approprié pour vos logs.

Cliquez sur l'onglet **Metrics** pour accéder aux métriques de votre infrastructure sous-jacente recueillies dans l'intervalle de 30 minutes associé au log.

Interagissez avec la section **Host** en haut des attributs réservés pour accéder au [dashboard du host][10] ou à la [page Network][11]. Interagissez avec les sections **Container** pour accéder à la [page des conteneurs][12], filtrés en fonction des paramètres sous-jacents.

{{< img src="logs/explorer/side_panel/infra.gif" alt="Hub vers l'infrastructure" style="width:60%;">}}

Si les logs proviennent d'une source sans serveur, la section Host est remplacée par une section Serverless avec un lien permettant d'accéder directement à la [page Serverless correspondante][13].

{{< img src="logs/explorer/side_panel/infra-serverless.png" alt="Hub vers la page Serverless" style="width:60%;">}}


#### Corrélation avec les données d'APM

Assurez-vous d'activer l'[injection de traces dans les logs][14] et de suivre les pratiques recommandées pour le [Tagging de service unifié][15] afin d'exploiter tout le potentiel de la corrélation entre les logs et les données d'APM.

Cliquez sur l'onglet **APM** pour afficher le log dans le contexte de sa trace complète, avec les services en amont et en aval actifs. Analysez en détail les données d'APM et la [trace dans l'APM][16].

Interagissez avec la section **Service** pour recentrer la recherche dans le Log Explorer et afficher tous les autres logs provenant de la même trace.

{{< img src="logs/explorer/side_panel/apm.gif" alt="Hub vers l'APM" style="width:60%;">}}


### Configurer votre contexte de dépannage

Interagissez avec les noms et les valeurs des attributs, à l'aide de la section JSON plus bas, pour :

- Ajouter ou supprimer une colonne du tableau des logs
- Ajouter des valeurs particulières à la requête de recherche (inclusion ou exclusion)

{{< img src="logs/explorer/side_panel/context.gif" alt="Contexte du volet latéral"  style="width:60%;">}}

- Créer ou modifier une facette ou une mesure à partir d'un attribut (voir la section [Facettes de log][17])

{{< img src="logs/explorer/side_panel/facets.gif" alt="Facettes du volet latéral"  style="width:60%;">}}

### Partager un log

Utilisez le bouton de **partage** pour partager le log ouvert dans le volet latéral avec d'autres contextes.

- Sélectionnez **Copy to clipboard** ou appuyez sur les touches `Ctrl + C` ou `Cmd + C` pour copier le JSON du log dans votre presse-papiers.
- L'option **Share Event** permet de partager le log (ainsi que la vue sous-jacente) avec vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][18] disponibles.

{{< img src="logs/explorer/side_panel/upper_log_panel.png" alt="Volet supérieur des logs"  style="width:50%;">}}

## Contexte de dépannage

### Filtre de recherche

Créez un contexte pour explorer vos logs dans votre vue Log Explorer. Commencez par sélectionner l'intervalle approprié, puis utilisez la barre de recherche pour filtrer votre flux de logs et vos analyses de logs.

**Intervalle**

La fonction d'intervalle vous permet d'afficher les logs dans le flux de logs ou les analyses de logs d'une période définie.
Cette fonction apparaît directement dans la barre de recherche sous la forme d'une chronologie. La chronologie peut être affichée ou ajoutée avec la case **Show timeline** dans le volet des options du flux de logs.

Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante. Vous pouvez également [saisir un intervalle personnalisé][19] :

{{< img src="logs/explorer/timeseries.png" style="width:50%;" alt="Intervalle de temps" >}}

**Recherche**

Utilisez les facettes, les mesures, les tags ou même la [recherche en texte libre][1] pour filtrer votre flux de logs et vos analyses de logs avec un contexte dédié. La barre de recherche et l'URL reflètent automatiquement vos sélections.

Suivez le [guide de recherche au sein de vos logs][1] pour obtenir une explication détaillée de l'ensemble des fonctions de recherche du Log Explorer, y compris l'utilisation de wildcards et de requêtes de valeurs numériques.

### Vues enregistrées

Utilisez les vues enregistrées pour configurer automatiquement votre Log Explorer avec un ensemble présélectionné de facettes, de mesures, de recherches, d'intervalles et de visualisations. Consultez la [section relative aux vues enregistrées][20] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/search-syntax/
[2]: /fr/logs/explorer/live_tail/
[3]: /fr/logs/explorer/list/
[4]: /fr/logs/explorer/patterns/
[5]: /fr/logs/explorer/analytics/
[6]: /fr/logs/processing/pipelines/
[7]: /fr/integrations/#cat-log-collection
[8]: /fr/agent/autodiscovery/integrations/?tab=kubernetes
[9]: /fr/logs/processing/attributes_naming_convention/
[10]: /fr/dashboards/#preset-lists
[11]: /fr/network_performance_monitoring/network_page/
[12]: /fr/infrastructure/livecontainers/?tab=linuxwindows#introduction
[13]: /fr/infrastructure/serverless/#function-detail-view
[14]: /fr/tracing/connect_logs_and_traces/
[15]: /fr/getting_started/tagging/unified_service_tagging
[16]: /fr/tracing/app_analytics/search/#displaying-a-full-trace
[17]: /fr/logs/explorer/facets/#overview
[18]: /fr/logs/processing/
[19]: /fr/dashboards/guide/custom_time_frames
[20]: /fr/logs/explorer/saved_views/
