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
Le Log Explorer vous permet d'effectuer un premier dépannage et de commencer à plonger au cœur de vos logs :

{{< img src="logs/explorer/explore_view_with_comments.png" alt="Vue exploration avec commentaires"  >}}

Depuis cette vue, vous pouvez :

* [Créer un contexte pour explorer vos logs](#contexte)
* [Visualiser vos logs en tant qu'analyse de logs ou de flux filtré](#visualisation).
* [Configurer votre vue Log Explorer en créant des facettes et des mesures à partir de vos logs](#implementation).
* [Partagez le contenu de votre vue Log Explorer sur une autre page Datadog ou externe.](#share-views)


## Contexte

Créez un contexte pour explorer vos logs dans votre vue Log Explorer. Commencez par sélectionner l'intervalle approprié, puis utilisez la barre de recherche pour filtrer votre flux de logs et vos analyses de logs.

### Intervalle

La fonction d'intervalle vous permet d'afficher les logs dans le flux de logs ou les analyses de logs d'une période définie.
Cette fonction apparaît directement dans la barre de recherche sous la forme d'une chronologie. La chronologie peut être affichée ou ajoutée avec la case **Show timeline** dans le volet des options du flux de logs.

Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante :

{{< img src="logs/explorer/timerange.png" style="width:50%;" alt="Intervalle de temps"  >}}

### Recherche

Utilisez les facettes, les mesures, les tags ou même la [recherche en texte libre][1] pour filtrer votre flux de logs et vos analyses de logs avec un contexte dédié. La barre de recherche et l'URL reflètent automatiquement vos sélections.

Suivez le [guide de recherche au sein de vos logs][1] pour obtenir une explication détaillée de l'ensemble des fonctions de recherche du Log Explorer, y compris l'utilisation de wildcards et de requêtes de valeurs numériques.

{{< img src="logs/explorer/search_your_logs.mp4" alt="Effectuer une recherche dans vos logs" video="true"  >}}

### Vues enregistrées

Utilisez les vues enregistrées pour configurer automatiquement votre Log Explorer avec un ensemble présélectionné de facettes, de mesures, de recherches, d'intervalles et de visualisations. Consultez la [section relative aux vues enregistrées][2] pour en savoir plus.

### Partager des vues

Exportez votre visualisation de log actuelle grâce la fonction de *partage* :

{{< img src="logs/explorer/send_view_to.png" alt="Envoyer une vue"  style="width:60%;">}}

Utilisez le bouton de *partage* pour envoyer votre vue Log Explorer actuelle à un membre d'équipe ou sous la forme d'un fichier CSV ou d'un nouveau monitor :

{{< tabs >}}
{{% tab "Recherche de log" %}}

| Bouton            | Description                                                                                                          |
|-------------------|----------------------------------------------------------------------------------------------------------------------|
| Export to Monitor | Exportez la requête appliquée à votre flux de logs pour créer la requête pour un nouveau [log monitor][1].       |
| Export to CSV     | Exportez votre vue du flux de logs actuelle avec les colonnes sélectionnées vers un fichier CSV. Vous pouvez exporter jusqu'à 5 000 logs simultanément. |
| Share View     | Partagez un lien de la vue actuelle à vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][2] disponibles. |


[1]: /fr/monitors/monitor_types/log
[2]: /fr/integrations/#cat-notification
{{% /tab %}}
{{% tab "Analyse de logs" %}}

| Bouton              | Description                                                                                                                                                   |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Export to Monitor   | Exportez la requête appliquée à votre analyse de logs pour créer la requête de votre nouveau [log monitor][1]. |
| Export to Dashboard | Exportez l'analyse actuelle sous la forme d'un widget dans un nouveau [dashboard][2] ou un dashboard existant. |
| Generate new Metric | [Générez une nouvelle métrique][3] à partir de la requête d'analyse actuelle.  |



[1]: /fr/monitors/monitor_types/log
[2]: /fr/graphing/dashboards/
[3]: /fr/logs/logs_to_metrics/
{{% /tab %}}
{{< /tabs >}}


## Visualisation

Basculez entre les modes Recherche de log et Analyse de logs en cliquant sur le bouton *Log Mode* dans le coin supérieur gauche de la page :

{{< tabs >}}
{{% tab "Recherche de log" %}}

La recherche de logs regroupe la liste des logs qui correspondent au contexte sélectionné. Un contexte est défini par un filtre dans la [barre de recherche][1] et un [intervalle](#intervalle).


### Tableau des logs

La recherche de logs est affichée dans le tableau des logs.

Configurez le contenu du tableau des logs selon vos besoins et vos préférences à l'aide du bouton « Options ». Parmi vos attributs personnalisés, seuls les attributs à facettes ou de mesure sont disponibles pour les colonnes.

Les résultats de logs sont triés par date (par défaut, les plus récents sont affichés en haut du tableau). Vous pouvez également les trier dans l'ordre inverse, du plus ancien (dans la limite de l'intervalle) au plus récent.

{{< img src="logs/explorer/logtable_config.png" alt="configurer le tableau d'affichage"  style="width:50%;">}}

### Volet des logs

Cliquez sur une ligne de log pour ouvrir le volet des logs et afficher plus de détails : message brut, attributs extraits et tags (les tags host, service et source apparaissent en premier).

Certains attributs standard, comme `error.stack`, `http.method` ou `duration`, sont mis en avant dans le volet des logs afin d'améliorer leur lisibilité. Assurez-vous d'extraire les informations correspondantes à partir de vos logs et de remapper vos attributs avec des [remappers d'attributs standard][2].

Interagissez avec les noms et les valeurs des attributs, à l'aide de la section JSON plus bas, pour :

* Créer ou modifier une facette ou une mesure à partir d'un attribut (cette action ne s'applique pas aux logs antérieurs)
* Ajouter ou supprimer une colonne du tableau des logs
* Ajouter des valeurs particulières à la requête de recherche (inclusion ou exclusion)

{{< img src="logs/explorer/attribute_actions.png" alt="configurer le tableau d'affichage"  style="width:20%;">}}

Interagissez avec la section supérieure relative aux attributs réservés :

* avec **Host**, pour accéder au dashboard du host ou ajouter le `host` du log à la requête de recherche ;
* avec **Service**, pour visualiser la trace dans l'APM, modifier la requête de recherche avec l'ID de trace (ces deux opérations nécessitent un attribut `trace_id` dans le log : consultez la section relative à l'[injection de trace dans les logs][3]) ou ajouter le `service` du log à la requête de recherche) ;
* avec **Source**, pour ajouter la `source` du log à la requête de recherche.

Le bouton **View in context** met à jour la requête de recherche afin d'afficher les lignes de log dont la date précède ou suit le log sélectionné, même si ces logs ne correspondent pas à votre filtre. Ce contexte diffère selon la situation, car Datadog utilise les attributs `Hostname`, `Service`, `filename` et `container_id`, ainsi que des tags, afin de trouver le contexte approprié pour vos logs.

Utilisez le bouton de **partage** pour partager le log ouvert dans le volet latéral avec d'autres contextes.

* Sélectionnez **Copy to clipboard** ou appuyez sur les touches `Ctrl + C` ou `Cmd + C` pour copier le JSON du log dans votre presse-papiers.
* L'option **Share Event** partage le log (ainsi que la vue sous-jacente) avec vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][4] disponibles.

{{< img src="logs/explorer/upper_log_panel.png" alt="configurer le tableau d'affichage"  style="width:50%;">}}

[1]: /fr/logs/explorer/search
[2]: /fr/logs/processing/attributes_naming_convention
[3]: /fr/tracing/connect_logs_and_traces
{{% /tab %}}
{{% tab "Analyse de logs" %}}

Une fois les étapes de [traitement de Datadog][1], de parsing de logs et d'application des [facettes](#configuration) et des [mesures](#configuration) sur les attributs importants terminées, vous pouvez représenter graphiquement des requêtes de log et afficher des valeurs maximales, des moyennes, des centiles, des nombres de valeurs uniques et plus encore.

Suivez le [guide sur la représentation graphique de logs][2] pour découvrir les différentes options des graphiques.

{{< img src="logs/explorer/log_analytics.png" alt="Analyse de logs"  style="width:70%;">}}


[1]: /fr/logs/processing
[2]: /fr/logs/explorer/analytics
{{% /tab %}}
{{% tab "Log Patterns" %}}

L'étude de grands volumes de données de log est un processus souvent chronophage : il est possible d'y passer des heures et de n'en comprendre qu'une infime partie. Pourtant, les logs d'application sont souvent tous très similaires et ne présentent que de légères variations. On parle alors de *patterns*.

Dans le Log Explorer, les patterns peuvent être identifiés automatiquement afin de structurer le problème et vous aider à mettre rapidement en avant les données pertinentes, tout en ignorant les informations non pertinentes.

Consultez la [section Log Patterns][1] pour en savoir plus

{{< img src="logs/explorer/log_patterns.png" alt="Patterns de logs"  style="width:70%;">}}


[1]: /fr/logs/explorer/patterns
{{% /tab %}}
{{< /tabs >}}

## Implémentation

Après leur traitement grâce aux pipelines et aux processeurs, vos attributs de log peuvent être indexés en tant que facettes ou mesures afin d'être accessibles pour votre création de [contexte](#contexte) et vos [analyses de logs][3].

Remarque : pour tirer le meilleur parti de votre vue Log Explorer, assurez-vous que vos attributs de logs suivent la [convention de nommage d'attributs Datadog][4].

{{< tabs >}}
{{% tab "Facettes" %}}

Une facette présente tous les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre de logs représentés. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour filtrer vos données, sélectionnez les valeurs que vous souhaitez afficher.

{{< img src="logs/explorer/facets_demo.png" alt="Démonstration de facettes"  style="width:80%;">}}

**Créer une facette** :

Pour commencer à utiliser un attribut en tant que facette ou dans une recherche, cliquez dessus et ajoutez-le en tant que facette :

{{< img src="logs/explorer/create_facet.png" style="width:50%;" alt="Créer une facette"  style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour tous les nouveaux logs** et peut être utilisée dans [la barre de recherche][1], le volet Facettes et dans la [requête d'analyse de logs][2].


[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/analytics
{{% /tab %}}


{{% tab "Mesures" %}}

Une mesure est un attribut doté d'une valeur numérique contenue dans vos logs.

**Créer une mesure** :

Pour commencer à utiliser un attribut en tant que mesure, cliquez sur un attribut numérique de votre log :

{{< img src="logs/explorer/create_a_mesure.png" alt="Créer une mesure"  style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour tous les nouveaux logs** et peut être utilisée dans [la barre de recherche][1], le volet Facettes et dans la [requête d'analyse de logs][2].

**Sélectionner l'unité de mesure** :

Chaque mesure dispose de sa propre unité. Celle-ci est affichée dans les colonnes du Log Explorer, les widgets du flux de logs dans les dashboards et les analyses de logs.

{{< img src="logs/explorer/edit_a_measure.png" alt="Modifier une mesure"  style="width:50%;">}}


[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/analytics
{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/saved_views
[3]: /fr/logs/explorer/analytics
[4]: /fr/logs/processing/attributes_naming_convention