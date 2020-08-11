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

{{< img src="logs/explorer/log_explorer_walkthrough.gif" alt="Vue exploration avec commentaires" style="width:80%;" >}}

Chaque vue vous permet d'analyser un aspect précis de vos données de log, à partir d'une [requête de recherche][1].

### Live Tail

La vue Live Tail affiche les logs qui transitent dans Datadog. Les logs Live Tail sont éphémères, mais la vue vous permet d'explorer **tous** les logs, qu'ils soient indexés ou non. Consultez la [section Live Tail][2] pour en savoir plus.

{{< img src="logs/explorer/log_explorer_walkthrough_livetail.gif" alt="Live tailing de log" style="width:60%;" >}}

### Listes de logs

La liste de logs affiche les logs indexés et propose des outils efficaces pour parcourir les **résultats individuels**. Consultez la [section Liste de logs][3] pour en savoir plus.

{{< img src="logs/explorer/log_explorer_walkthrough_list.png" alt="Liste de logs" style="width:60%;" >}}

### Log Patterns

Les Log Patterns agrègent automatiquement les logs indexés en **plusieurs groupes** avec des structures similaires. Consultez la [section Log Patterns][4] pour en savoir plus.

{{< img src="logs/explorer/log_explorer_walkthrough_patterns.png" alt="Log Patterns" style="width:60%;" >}}

### Analyse de logs

La vue d'analyse de logs propose des **représentations graphiques** des requêtes de log ainsi que des maximums, moyennes, centiles, nombres uniques de valeurs, et bien plus encore. Consultez le [guide relatif aux graphiques de log][5] pour en savoir plus sur les différents graphiques disponibles.

{{< img src="logs/explorer/log_explorer_walkthrough_analytics.png" alt="Analyse de logs" style="width:60%;" >}}

## Volet latéral des logs

Datadog affiche les informations sur les logs individuels dans le volet latéral, avec la disposition suivante :

{{< img src="logs/explorer/log_side_panel.png" alt="Volet latéral des logs"  style="width:60%;">}}

### Informations structurées des logs

- La partie supérieure du volet présente des informations sur le **contexte** général.
- La partie inférieure du volet affiche le **contenu** du log.

Le **contexte** désigne les informations liées à l'infrastructure et à l'application à l'origine du log. Les informations sont recueillies à partir des tags ajoutés au log par l'Agent Datadog ou le Forwarder de logs, que ce soit automatiquement (hostname, nom du conteneur, nom du fichier de log, nom des fonctions sans serveur, etc.) ou via des tags personnalisés (équipe responsable, environnent, version de l'application, etc.).

Le **contenu** désigne les composants du log, à savoir le message du log, mais également toutes les informations structurées extraites et enrichies des logs transitant par les [pipelines de logs][6]. Pour les logs générés par des éléments communs d'une pile technique, les opérations de parsing et d'enrichissement sont fournies par défaut :

- Pour la collecte de logs de fichiers, assurez-vous d'avoir correctement configuré le champ source, afin de bien déclencher le processus. Consultez la [centaine d'intégrations de logs][7] de Datadog pour en savoir plus.
- Pour la collecte de logs de conteneur, utilisez [Autodiscovery][8].

Certains champs standards, comme `error.stack`, `http.method` ou `duration`, sont optimisés dans le volet des logs afin d'améliorer leur lisibilité. Assurez-vous d'extraire les informations correspondantes à partir de vos logs et de remapper vos attributs avec des [remappeurs d'attributs standards][9].

### Hub pour d'autres sources de données

Interagissez avec la section supérieure relative aux attributs réservés :

- à partir de la section **Host**, afin d'accéder au [dashboard sur les hosts][10] pertinents ou à la [page Network][11].
- à partir de la section **Service**, afin de visualiser la [trace dans l'APM][12] (ces deux opérations nécessitent un attribut `trace_id` dans le log : consultez la section relative à l'[injection de traces dans les logs][13]) ou à la [page Service][14].
- Bénéficiez d'une solution encore plus efficace grâce au [tagging de service unifié][15]. Vous pourrez ainsi utiliser les tags `env`, `service` et `version` pour accéder à des logs et à des ressources connexes.

Le bouton **View in context** met à jour la requête de recherche afin d'afficher les lignes de log dont la date précède ou suit le log sélectionné, même si ces logs ne correspondent pas à votre filtre. Ce contexte diffère selon la situation, car Datadog utilise les attributs `Hostname`, `Service`, `filename` et `container_id`, ainsi que des tags, afin de trouver le contexte approprié pour vos logs.

{{< img src="logs/explorer/side_panel_hub.gif" alt="Hub du volet latéral" style="width:60%;">}}

### Configurer votre contexte de dépannage

Interagissez avec les noms et les valeurs des attributs, à l'aide de la section JSON plus bas, pour :

- Ajouter ou supprimer une colonne du tableau des logs
- Ajouter des valeurs particulières à la requête de recherche (inclusion ou exclusion)

{{< img src="logs/explorer/side_panel_context.gif" alt="Contexte du volet latéral"  style="width:60%;">}}

- Créer ou modifier une facette ou une mesure à partir d'un attribut (voir la section [Facettes de log][16])

{{< img src="logs/explorer/side_panel_facets.gif" alt="Facettes du volet latéral"  style="width:60%;">}}

### Partager un log

Utilisez le bouton de **partage** pour partager le log ouvert dans le volet latéral avec d'autres contextes.

- Sélectionnez **Copy to clipboard** ou appuyez sur les touches `Ctrl + C` ou `Cmd + C` pour copier le JSON du log dans votre presse-papiers.
- L'option **Share Event** partage le log (ainsi que la vue sous-jacente) avec vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][17] disponibles.

{{< img src="logs/explorer/upper_log_panel.png" alt="Volet supérieur des logs"  style="width:50%;">}}

## Contexte de dépannage

### Filtre de recherche

Créez un contexte pour explorer vos logs dans votre vue Log Explorer. Commencez par sélectionner l'intervalle approprié, puis utilisez la barre de recherche pour filtrer votre flux de logs et vos analyses de logs.

**Intervalle**

La fonction d'intervalle vous permet d'afficher les logs dans le flux de logs ou les analyses de logs d'une période définie.
Cette fonction apparaît directement dans la barre de recherche sous la forme d'une chronologie. La chronologie peut être affichée ou ajoutée avec la case **Show timeline** dans le volet des options du flux de logs.

Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante :

{{< img src="logs/explorer/timerange.png" style="width:50%;" alt="Intervalle de temps" >}}

**Recherche**

Utilisez les facettes, les mesures, les tags ou même la [recherche en texte libre][1] pour filtrer votre flux de logs et vos analyses de logs avec un contexte dédié. La barre de recherche et l'URL reflètent automatiquement vos sélections.

Suivez le [guide de recherche au sein de vos logs][1] pour obtenir une explication détaillée de l'ensemble des fonctions de recherche du Log Explorer, y compris l'utilisation de wildcards et de requêtes de valeurs numériques.

### Vues enregistrées

Utilisez les vues enregistrées pour configurer automatiquement votre Log Explorer avec un ensemble présélectionné de facettes, de mesures, de recherches, d'intervalles et de visualisations. Consultez la [documentation relative aux vues enregistrées][18] pour en savoir plus.

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
[12]: /fr/tracing/app_analytics/search/#displaying-a-full-trace
[13]: /fr/tracing/connect_logs_and_traces/
[14]: /fr/tracing/visualization/service/#overview
[15]: /fr/getting_started/tagging/unified_service_tagging
[16]: /fr/logs/explorer/facets/#overview
[17]: /fr/logs/processing/
[18]: /fr/logs/explorer/saved_views/