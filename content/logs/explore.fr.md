---
title: Recherche & Graphique
kind: documentation
description: "Le Logs explorer est votre point de départ dans Datadog pour le troubleshooting et l'exploration de vos logs."
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: Apprenez à traiter vos logs
- link: "logs/parsing"
  tag: "Documentation"
  text: En savoir plus sur le parsing
---

## Aperçu

Le Logs explorer est votre point de départ dans Datadog pour le troubleshooting et l'exploration de vos logs:

{{< img src="logs/explore/explore_view_with_comments.png" alt="Explore view with comments" responsive="true" popup="true">}}

Sur cette page vous pouvez:

* [Interagir avec l'horizon temporel](#time-range)
* [Afficher vos logs](#log-list)
* [Utiliser les facettes pour filtrer votre flux de logs](#facets)
* [Entrer des requêtes de recherche](#search-bar)
* [Effectuer des analyses avec les Log Graphs](#log-graph)

## Horizon temporel

L'horizon temporel vous permet d'afficher les logs dans une période donnée. Il apparaît directement sous la barre de recherche en tant que timeline. La timeline peut être affichée ou non en cochant la case **Show timeline**:

{{< img src="logs/explore/timeline.png" alt="Timeline" responsive="true" popup="true" style="width:50%;">}}

Changez rapidement l'horizon temporel en sélectionnant une durée prédéfinie dans la liste déroulante:

{{< img src="logs/explore/timerange.png" style="width:50%;" alt="Timerange" responsive="true" popup="true" >}}

## Flux de logs
Le Logstream est la liste des logs qui correspondent au contexte sélectionné. Un contexte est défini par un filtre dans la [barre de recherche] (#barre-de-recherche) et un [horizon temporel](#horizon-temporel).
Vous pouvez trier la liste en cliquant sur l'en-tête de colonne **date**.

{{< img src="logs/explore/log_list.png" alt="Logstream" responsive="true" popup="true" style="width:80%;">}}

### Filtrer le flux de logs
Si vous entrez une requête valide dans la [barre de recherche](#barre-de-recherche), les mots correspondant à votre requête sont mis en évidence et les logs affichés correspondent à vos critères de facettes:

{{< img src="logs/explore/log_list_highlighted.png" alt="Logstream highlighted" responsive="true" popup="true" style="width:80%;">}}

### Afficher un log dans son intégralité
Cliquez sur n'importe quelle ligne de log pour voir plus de détails:

{{< img src="logs/explore/log_in_log_list.png" alt="Log in Logstream" responsive="true" popup="true" style="width:80%;">}}

### View in context

Cliquez sur son `host` ou` service` et sélectionnez `View in context` pour voir les lignes de logs datées juste avant et après un log sélectionné - même si elles ne correspondent pas à votre filtre -

{{< img src="logs/explore/focus_host_service.png" style="width:50%;" alt="focus on host and service.png" responsive="true" popup="true" style="width:70%;">}}

### Colonnes
Pour ajouter plus de détails de log à la liste, cliquez sur le bouton **Columns** et sélectionnez les facettes que vous voulez voir:

{{< img src="logs/explore/log_list_with_columns.png" alt="Logstream with columns" responsive="true" popup="true" style="width:80%;">}}

### Affichage multi-ligne

{{< img src="logs/explore/multi_line_display.png" alt="Multi-line display" responsive="true" popup="true" style="width:30%;">}}

Lorsque cette option est activée, l'affichage de votre Logstream change pour mieux se concentrer sur l'attribut `message`  de vos logs. Ils sont maintenant affichés sur quatre lignes au lieu d'une:

* Sans l'affichage multi-ligne:
{{< img src="logs/explore/before_multi_line.png" alt="Before Multi-line display" responsive="true" popup="true">}}

* Avec l'affichage multi-ligne activé:
{{< img src="logs/explore/multi_line_log.png" alt="Log with Multi-line display" responsive="true" popup="true">}}

**Note**: Si présent, l'attribut `error.stack` est affiché en priorité.
Remapper tout attribut stack-trace sur cet attribut spécifique avec le processor [attribute remapper][1] afin de bénéficier de cet affichage.

## Facettes

Une facette affiche tous les valeurs distinctes d'un attribut ou d'un tag ainsi que des analyses de base telles que la quantité de logs représentés. C'est également un moyen pour filtrer facilement vos données.

Les facettes vous permettent de pivoter ou de filtrer vos ensembles de données en fonction d'un attribut donné. Les facettes peuvent inclure par exemple des utilisateurs, des services, etc...

{{< img src="logs/explore/facets_demo.png" alt="Facets demo" responsive="true" popup="true" style="width:80%;">}}

### Créer une facette

Pour commencer à utiliser un attribut en tant que facette ou dans la recherche, cliquez dessus et ajoutez-le en tant que facette:

{{< img src="logs/explore/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" popup="true" style="width:50%;">}}

Une fois cela fait, la valeur de cet attribut est stockée **pour tous les nouveaux logs** et peut être utilisée dans [la barre de recherche](#barre-de-recherche), [le panneau de facettes](#panneau-de-facettes), et dans les [Log graph][2].

### Panneau de facettes

Utilisez les facettes pour filtrer facilement vos logs. La barre de recherche et l'URL reflètent automatiquement votre sélection.

{{< img src="logs/explore/facet_panel.png" alt="Facet panel" responsive="true" popup="true" style="width:80%;">}}

## Mesure

Une mesure est un attribut avec une valeur numérique contenue dans vos logs. Pensez-y comme une "métrique de log".

### Créer une Mesure

Pour commencer à utiliser un attribut comme mesure, cliquez sur un attribut numérique de votre logs:

{{< img src="logs/explore/create_a_mesure.png" alt="Create a measure" responsive="true" popup="true" style="width:80%;">}}

Une fois cela fait, la valeur de cet attribut est stockée **pour tous les nouveaux logs** et peut être utilisée dans [la barre de recherche](#barre-de-recherche), [le panneau de facettes](#panneau-a-facettes), et dans les [Log graph][2].

### Sélectionnez l'unité de votre mesure

Toutes les mesures ont leur propre unité qui est ensuite utilisée pour l'affichage dans les colonnes du Log explorer, les widgets de Logstream dans les dashboards et dans les Log Graphs.

{{< img src="logs/explore/edit_a_measure.png" alt="Edit a measure" responsive="true" popup="true" style="width:80%;">}}

## Barre de recherche

Le langage de requête de recherche est basé sur la syntaxe de requête Lucene:

[Apache Lucene - Syntaxe des requêtes][3]

Tous les paramètres de recherche sont contenus dans l'URL, il est donc très simple de partager votre vue.

### Syntaxe de recherche
Une requête de recherche est composée de termes et d'opérateurs.

Il y a deux types de termes:

* Un **Single Term** est un seul mot tel que "test" ou "bonjour".

* Une **Sequence** est un groupe de mots entourés de guillemets doubles tels que "hello dolly".

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants:

{{% table responsive="true" %}}
||||
|:----|:----|:----|
| **Operator** | **Description ** | **Exemple **|
| `AND` | **Intersection**: les deux termes sont dans les événements sélectionnés (si rien n'est ajouté, ET est pris par défaut) | authentication AND failure |
| `OR` | **Union**: Au moins un des deux termes est contenu dans les événements sélectionnés | authentication OR password|
| `-` | **Exclusion**: le terme suivant n'est PAS dans l'événement |authentication AND -password|
{{% /table %}}

### Recherche sur une facette
Pour effectuer une recherche sur une [facette](#facette), vous devez tout d'abord [créer cette facette](#creer-une-facette) puis ajouter `@` pour indiquer que vous recherchez une facette.

Par exemple, si votre nom de facette est **url** et que vous souhaitez filtrer sur la valeur *www.datadoghq.com*, entrez:

`@url:www.datadoghq.com`

### Wildcards
Pour effectuer une recherche générique multi-caractères, utilisez le symbole `*` comme suit:

* `service:web*` renvoie tous les logs dont le service commence par “web”.
* `hello*` renvoie tous les messages de logs commençant par hello
* `*hello` renvoie tous les messages de logs qui se terminent par hello

### Valeurs numériques
Utilisez `<`,`>`, `<=` or `>=` pour effectuer une recherche sur les attributs numériques. Par exemple, récupérez tous les logs ayant un temps de réponse supérieur à 100 ms avec:

`@http.response_time:>100`

Il est également possible de rechercher un attribut numérique dans une plage spécifique. Par exemple, récupérez toutes vos code d'état 4xx avec:

`@http.status_code:[400 TO 499]`

### Tags

Vos logs héritent les tags de [l'hosts][4] et de [l'integrations][5] qui les génèrent. Ils peuvent être utilisés dans la recherche et en tant que facettes:

* `test` recherche la chaîne "test".
* `("env:prod" OR test)` renvoie tous les logs avec le tag #env:prod ou le tag #test
* `(service:srvA OR service:srvB)` ou `(service:(srvA OR srvB))` renvoie tous les logs qui contiennent les tags #service:srvA ou #service:srvB.
* `("env:prod" AND -”version:beta”)` renvoie tous les logs qui contiennent #env:prod mais qui ne contiennent pas #version:beta

### Autocompletion
Taper une requête complexe peut être épuisant. Utilisez la fonctionnalité de saisie semi-automatique de la barre de recherche pour compléter votre requête en utilisant les valeurs existantes:

{{< img src="logs/explore/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" popup="true" style="width:80%;">}}

### Recherches sauvegardées

Ne perdez pas de temps à construire les mêmes vues tous les jours. Les recherches sauvegardées contiennent votre requête de recherche, vos colonnes et votre horizon temporel. Ils sont ensuite disponibles dans la barre de recherche grâce à la correspondance automatique, qu'il s'agisse du nom de la recherche ou de la requête elle même.

{{< img src="logs/explore/saved_search.png" alt="Saved Search" responsive="true" popup="true" style="width:80%;">}}

### Echappement de caractères spéciaux
Les attributs suivants sont considérés comme spécifiques: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, `\` et nécessitent d'être échappé.
Par exemple, pour rechercher des logs qui contiennent `user=12345` , utilisez la recherche suivante:

`user\=12345`

La même logique doit être appliquée aux espaces dans les attributs du log. Il n'est pas recommandé d'avoir des espaces dans les attributs d'un log, mais dans ce cas, les espaces doivent être échapper.
Si un attribut s'appelle `user.first name`, effectuez une recherche sur cet attribut en échappant l'espace:

`@user.first\ name:myvalue`

## Log Graph

Basculez entre la liste des logs et le Log Graph en cliquant sur ce bouton:

{{< img src="logs/explore/graph/log_graph_switch.png" alt="Log graph switch" responsive="true" popup="true" style="width:80%;">}}

Pour commencer à l'utiliser:

1. Choisissez une [Mesure](#mesure) ou [Facette](#facette) pour construire un graphique. Choisir une mesure vous permet alors de choisir la fonction d'agrégation tandis que la sélection d'une facette affiche le nombre unique de valeur pour cette facette.
    {{< img src="logs/explore/graph/choose_measure_facet.png" alt="choose measure facet" responsive="true" popup="true" style="width:50%;">}}
2. Sélectionnez la fonction d'agrégation pour la mesure que vous voulez grapher
    {{< img src="logs/explore/graph/agg_function_log_graph.png" alt="aggregation function for log graph" responsive="true" popup="true" style="width:50%;">}}
3. Splitez par [Tag][6] ou [Facette](#facettes) pour spliter votre graphique sur la dimension désirée.

    {{< img src="logs/explore/graph/split_by_log_graph.png" alt="split by log graph" responsive="true" popup="true" style="width:50%;">}}

4. Voir les logs relatifs à une section du graphique:
   Sélectionnez ou cliquez sur une section du graphique pour zoomer dans le graphique ou voir la liste des logs correspondant à votre sélection:

    {{< img src="logs/explore/graph/using_log_graph.gif" alt="using log graph" responsive="true" popup="true" style="width:80%;">}}

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/#attribute-remapper
[2]: /logs/#log-graph
[3]: http://lucene.apache.org/core/2_9_4/queryparsersyntax.html
[4]: /graphing/infrastructure/
[5]: /integrations/
[6]: /getting_started/tagging
