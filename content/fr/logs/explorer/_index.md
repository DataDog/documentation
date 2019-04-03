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
    text: Détecter les modèles dans vos logs
---
Le Log Explorer vous permet d'effectuer un premier dépannage et de commencer à plonger au cœur de vos logs :

{{< img src="logs/explorer/explore_view_with_comments.png" alt="Vue exploration avec commentaires" responsive="true" >}}

Depuis cette vue, vous pouvez :

* [Créer un contexte pour explorer vos logs](#contexte)
* [Visualiser vos logs en tant qu'analyse de logs ou de flux filtré](#visualisation).
* [Configurer votre vue Log Explorer en créant des facettes et des mesures à partir de vos logs](#implementation).
* [Exporter le contenu de votre vue Log Explorer vers un monitor, un dashboard ou dans un fichier CSV.](#export)

## Contexte

Créez un contexte pour explorer vos logs dans votre vue Log Explorer. Commencez par sélectionner l'intervalle approprié, puis utilisez la barre de recherche pour filtrer votre flux de logs et vos analyses de logs.

### Intervalle

La fonction d'intervalle vous permet d'afficher les logs dans le flux de logs ou les analyses de logs d'une période définie.
Cette fonction apparaît directement dans la barre de recherche sous la forme d'une chronologie. La chronologie peut être affichée ou ajoutée avec la case **Show timeline** dans le volet des options du flux de logs.

Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante :

{{< img src="logs/explorer/timerange.png" style="width:50%;" alt="Intervalle de temps" responsive="true" >}}

### Recherche

Utilisez les facettes, les mesures, les tags ou même la [recherche en texte libre][1] pour filtrer votre flux de logs et vos analyses de logs avec un contexte dédié. La barre de recherche et l'URL reflètent automatiquement vos sélections.

Suivez le [guide de recherche au sein de vos logs][1] pour obtenir une explication détaillée de l'ensemble des fonctions de recherche du Log Explorer, y compris l'utilisation de wildcards et de requêtes de valeurs numériques.

{{< img src="logs/explorer/search_your_logs.gif" alt="Recherche dans vos logs" responsive="true" >}}

### Vues enregistrées

Utilisez les vues enregistrées pour configurer automatiquement votre Log Explorer avec un ensemble présélectionné de facettes, de mesures, de recherches, d'intervalles et de visualisations.

Consultez la [documentation relative aux vues enregistrées][2] pour en savoir plus.

## Visualisation

Basculez entre les modes Logstream et Log Analytics en cliquant sur le bouton *Log Mode* dans le coin supérieur gauche de la page :

{{< tabs >}}
{{% tab "Flux de logs" %}}

Le flux de logs regroupe la liste des logs qui correspondent au contexte sélectionné. Un contexte est défini par un filtre de [barre de recherche][1] et un [intervalle](#intervalle).


### Tableau des logs

Le flux de logs est affiché dans le tableau des logs.

Configurez le contenu du tableau des logs selon vos besoins et vos préférences à l'aide du bouton « Options ». Parmi vos attributs personnalisés, seuls les attributs à facettes ou de mesure sont disponibles pour les colonnes.

Les résultats de logs sont triés par date (par défaut, les plus récents sont affichés en haut du tableau). Vous pouvez également les trier dans l'ordre inverse, du plus ancien (dans la limite de l'intervalle) au plus récent.

{{< img src="logs/explorer/logtable_config.png" alt="configurer le tableau d'affichage" responsive="true" style="width:50%;">}}



### Volet des logs

Cliquez sur une ligne de log pour ouvrir le volet des logs et afficher plus de détails : message brut, attributs extraits et tags (les tags host, service et source apparaissent en premier).

Certains attributs standards, comme `error.stack`, `http.method` ou `duration`, sont mis en avant dans le volet des logs afin d'améliorer leur lisibilité. Assurez-vous d'extraire les informations correspondantes à partir de vos logs et de remapper vos attributs avec des [remappers d'attributs standards][2].


Interagissez avec les noms et les valeurs des attributs, à l'aide de la section JSON plus bas, pour :

* Créer ou modifier une facette ou une mesure à partir d'un attribut (cette action ne s'applique pas aux logs antérieurs)
* Ajouter une colonne ou supprimer une colonne dans le tableau de logs
* Ajouter des valeurs particulières à la requête de recherche (inclusion ou exclusion)

{{< img src="logs/explorer/attribute_actions.png" alt="configurer le tableau d'affichage" responsive="true" style="width:20%;">}}


Interagissez avec la section supérieure relative aux attributs réservés :

* avec **Host**, pour accéder au dashboard du host ou ajouter le `host` du log à la requête de recherche ;
* avec **Service**, pour voir la trace dans l'APM, modifier la requête de recherche avec l'ID de trace (ces deux opérations nécessitent un attribut `trace_id` dans le log : consultez la section relative à l'[injection de trace dans les logs][3]) ou ajouter le `service` du log à la requête de recherche ;
* avec **Source**, pour ajouter la `source` du log à la requête de recherche.


Le bouton **View in context** met à jour la requête de recherche afin d'afficher les lignes de log dont la date précède ou suit le log sélectionné, même si ces logs ne correspondent pas à votre filtre. Ce contexte diffère selon la situation, car Datadog utilise les attributs `Hostname`, `Service`, `filename` et `container_id`, ainsi que des tags, afin de trouver le contexte approprié pour vos logs.

{{< img src="logs/explorer/upper_log_panel.png" alt="configurer le tableau d'affichage" responsive="true" style="width:50%;">}}


[1]: /fr/logs/explorer/search
[2]: /fr/logs/processing/attributes_naming_convention/
[3]: /fr/tracing/advanced_usage/?tab=java#correlate-traces-and-logs

{{% /tab %}}
{{% tab "Analyses de logs" %}}

Une fois les étapes de [traitement de Datadog][1], de parsing de logs et d'application des [facettes](#facettes) et des [mesures](#mesures) sur les attributs importants, vous pouvez représenter graphiquement des requêtes de log et afficher des valeurs maximales, des moyennes, des centiles, des valeurs uniques et plus encore.

Suivez le [guide sur la représentation graphique de logs][2] pour découvrir les différentes options de graphiques.

{{< img src="logs/explorer/log_analytics.png" alt="Analyses de logs" responsive="true" style="width:70%;">}}


[1]: /fr/logs/processing
[2]: /fr/logs/explorer/analytics
{{% /tab %}}
{{% tab "Modèles de logs" %}}

Étudier de grands volumes de données de logs peut être chronophage : vous pouvez passer des heures dessus et malgré tout n'en comprendre qu'une infime partie. Cependant, les logs d'application sont souvent similaires, et seuls certains d'entre eux varient. C'est ce qu'on appelle des *modèles*.

Dans le Log Explorer, les modèles peuvent apparaître automatiquement pour structurer le problème et vous aider à mettre rapidement en avant les données pertinentes, tout en ignorant les informations non pertinentes.

Consultez la [section Modèles de logs][1] pour en savoir plus

{{< img src="logs/explorer/log_patterns.png" alt="Modèles de logs" responsive="true" style="width:70%;">}}


[1]: /fr/logs/explorer/patterns
{{% /tab %}}
{{< /tabs >}}

## Implémentation

Après leur traitement grâce aux pipelines et aux processeurs, vos attributs de log peuvent être indexés en tant que facettes ou mesures afin d'être accessibles pour votre création de [contexte](#contexte) et vos [analyses de logs][3].

Remarque : pour tirer le meilleur parti de votre vue Log Explorer, assurez-vous que vos attributs de logs suivent la [convention de nommage d'attributs Datadog][4].

{{< tabs >}}
{{% tab "Facettes" %}}

Une facette présente tous les membres distincts d'un attribut ou d'un tag en plus de proposer des analyses de base, comme le nombre de logs représentés. Son activation permet également de filtrer facilement vos données.

Les facettes vous permettent de faire pivoter ou de filtrer vos ensembles de données en fonction d'un attribut donné. Les facettes peuvent correspondre à des utilisateurs, des services, etc.

{{< img src="logs/explorer/facets_demo.png" alt="Démonstration de facettes" responsive="true" style="width:80%;">}}

**Créer une facette** :

Pour commencer à utiliser un attribut en tant que facette ou dans une recherche, cliquez dessus et ajoutez-le en tant que facette :

{{< img src="logs/explorer/create_facet.png" style="width:50%;" alt="Créer une facette" responsive="true" style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour tous les nouveaux logs** et peut être utilisée dans [la barre de recherche][1], [le volet Facettes](#volet-facettes) et dans la [requête d'analyse de logs][2].


[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/analytics
{{% /tab %}}


{{% tab "Mesures" %}}

Une mesure est un attribut doté d'une valeur numérique contenue dans vos logs. Il s'agit en quelque sorte d'une métrique de log.

**Créer une mesure** :

Pour commencer à utiliser un attribut en tant que mesure, cliquez sur un attribut numérique de votre log :

{{< img src="logs/explorer/create_a_mesure.png" alt="Créer une mesure" responsive="true" style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour tous les nouveaux logs** et peut être utilisée dans [la barre de recherche][1], le volet Facettes et dans la [requête d'analyse de logs][2].

**Sélectionner l'unité de mesure** :

Chaque mesure dispose de sa propre unité. Celle-ci est affichée dans les colonnes du Log Explorer, les widgets du flux de logs dans les dashboards et les analyses de logs.

{{< img src="logs/explorer/edit_a_measure.png" alt="Modifier une mesure" responsive="true" style="width:50%;">}}


[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/analytics
{{% /tab %}}
{{< /tabs >}}

## Exportation

Exportez votre visualisation de logs actuelle grâce la fonction *Export* :

{{< tabs >}}
{{% tab "Flux de logs" %}}

{{< img src="logs/explorer/export.png" alt="affichage bouton des logs" responsive="true" style="width:30%;">}}

| Bouton                | Description                                                                                                          |
| ----                  | -----                                                                                                                |
| Export to Monitor     | Exporte la requête appliquée à votre flux de logs pour créer la requête de log monitor d'un nouveau [log monitor][1].       |
| Export to CSV         | Exporte votre flux de logs actuel avec la colonne sélectionnée dans un fichier CSV. Vous pouvez exporter jusqu'à 5 000 logs à la fois. |


[1]: /fr/monitors/monitor_types/log
{{% /tab %}}
{{% tab "Analyses de logs" %}}

{{< img src="logs/explorer/export_log_analytics.png" alt="affichage bouton des logs" responsive="true" style="width:30%;">}}

| Bouton              | Description                                                                                                                                                                  |
| ----                | -----                                                                                                                                                                        |
| Export to Monitor   | Exporte la requête appliquée à votre analyse de logs pour créer la requête de log monitor d'un nouveau [log monitor][1]. *Cette fonctionnalité n'est pas encore disponible.*                |
| Export to Timeboard | Exporte votre analyse de logs en tant que widget vers un [timeboard][2]. |


[1]: /fr/monitors/monitor_types/log
[2]: /fr/graphing/dashboards/timeboard
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/saved_views
[3]: /fr/logs/explorer/analytics
[4]: /fr/logs/processing/attributes_naming_convention