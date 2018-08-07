---
title: Recherche
kind: documentation
description: "Le Logs explorer est votre point de départ dans Datadog pour le troubleshooting et l'exploration de vos logs."
further_reading:
- link: "logs/analytics"
  tag: "Documentation"
  text: "Construire des analyses de log"
- link: "logs/processing"
  tag: "Documentation"
  text: Apprenez à traiter vos logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: En savoir plus sur le parsing
---

## Aperçu

Le Logs explorer est votre point de départ dans Datadog pour le troubleshooting et l'exploration de vos logs:

{{< img src="logs/explore/explore_view_with_comments.png" alt="Explore view with comments" responsive="true" >}}

Sur cette page vous pouvez:

* [Interagir avec l'horizon temporel](#time-range)
* [Afficher vos logs](#logstream)
* [Utiliser les facettes pour filtrer votre flux de logs](#facets)
* [Entrer des requêtes de recherche](#search-bar)

## Barre de recherche

Tous les paramètres de Search sont contenus dans l'URL, vous pouvez donc partager votre vue en partageant l'URL.

### Syntaxe de recherche

Une requête de recherche est composée de termes et d'opérateurs.

Il existe deux types de termes :

* Un **Single Term** est un mot unique tel que « test » ou « bonjour ».

* Une **Sequence** est un groupe de mots entourés de guillemets doubles tels que "hello dolly".

Afin de combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

{{% table responsive="true" %}}
||||
|:----|:----|:----|
| **Opérateur** | **Description** | **Exemple**|
| `AND` | **Intersection** : Les deux termes sont dans les événements sélectionnés (si rien n'est ajouté, AND est pris par défaut) | authentication AND failure |
| `OR` | **Union** : Au moins un des deux termes est contenu dans les événements sélectionnés | authentication OR password|
| `-` | **Exclusion** : Le terme suivant n'est PAS dans l'événement |authentication AND -password|
{{% /table %}}

### Recherche à facettes
Afin d'effectuer une recherche à [facettes](#facets), vous devez tout d'abord [créer une facette](#create-a-facet) puis ajouter `@` pour indiquer que vous recherchez une facette.

Par exemple, si le nom de votre facette est **url** et que vous souhaitez filtrer la valeur **url** *www.datadoghq.com*, saisissez simplement :

`@url:www.datadoghq.com`

### Wildcards
Afin d'effectuer une recherche générique multi-caractères, utilisez le symbole `*` comme suit :

* `service:web*` renvoie tous les messages de logs dont le service commence par « web ».
* `hello*` renvoie tous les messages de logs commençant par hello
* `*hello` renvoie tous les messages de logs qui se terminent par hello

### Valeurs numériques
Utilisez `<`,`>`, `<=` ou `>=` pour effectuer une recherche d'attributs numériques. Par exemple, récupérez tous les logs ayant un temps de réponse supérieur à 100 ms avec :

`@http.response_time:>100`

Il est également possible de rechercher un attribut numérique dans une plage spécifique. Par exemple, récupérez toutes vos code d'état 4xx avec :

`@http.status_code:[400 TO 499]`

### Tags

Vos logs héritent des tags provenant des [hôtes][4] et des [intégrations][5] qui les génèrent. Ils peuvent être utilisés dans la recherche et en tant que facettes :

* `test` recherche la chaîne « test ».
* `("env:prod" OR test)` renvoie tous les logs avec le tag `#env:prod` ou le tag `#test`
* `(service:srvA OR service:srvB)` ou `(service:(srvA OR srvB))` renvoie tous les logs qui contiennent les tags `#service:srvA` ou `#service:srvB`.
* `("env:prod" AND -”version:beta”)` renvoie tous les logs qui contiennent `#env:prod`, mais qui ne contiennent pas `#version:beta`

Si vos tags ne suivent pas les recommandations dans [Tags - Meilleures pratiques][6] et n'utilisent pas la syntaxe `key:value`, utilisez cette requête de recherche :

* `tags:<MY_TAG>`

### Autocomplétion
Taper une requête complexe peut être épuisant. Utilisez la fonctionnalité de saisie semi-automatique de la barre de recherche pour compléter votre requête en utilisant les valeurs existantes :

{{< img src="logs/explore/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" style="width:80%;">}}

### Échappement de caractères spéciaux
Les attributs suivants sont considérés comme des caractères spéciaux : `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, `\` et nécessitent un échappement.
Par exemple, pour rechercher des logs qui contiennent `user=12345`, utilisez la recherche suivante :

`user\=JaneDoe`

La même logique doit être appliquée aux espaces dans les attributs du log. Il n'est pas recommandé d'avoir des espaces dans les attributs d'un log, mais lorsque c'est le cas, les espaces doivent être échappés.
Si un attribut s'appelle `user.first name`, effectuez une recherche sur cet attribut en échappant l'espace :

`@user.first\ name:myvalue`

### Recherches enregistrées

Ne perdez pas de temps à construire les mêmes vues tous les jours. Les recherches sauvegardées contiennent votre requête de recherche, vos colonnes et votre horizon temporel. Elles sont ensuite disponibles dans la barre de recherche grâce à la correspondance automatique, que vous saisissiez le nom de la recherche ou la requête elle même.

{{< img src="logs/explore/saved_search.png" alt="Saved Search" responsive="true" style="width:80%;">}}

Pour supprimer une recherche enregistrée, cliquez sur l'icône de corbeille sous le menu déroulant de recherche de logs :

{{< img src="logs/explore/delete_saved_search.png" alt="Delete Saved Search" responsive="true" style="width:80%;">}}

## Horizon temporel

L'horizon temporel vous permet d'afficher les logs dans une période donnée. Il apparaît directement sous la barre de recherche en tant que timeline. La timeline peut être affichée ou non en cochant la case **Show timeline** :

{{< img src="logs/explore/timeline.png" alt="Timeline" responsive="true" style="width:50%;">}}

Changez rapidement l'horizon temporel en sélectionnant une durée prédéfinie dans la liste déroulante :

{{< img src="logs/explore/timerange.png" style="width:50%;" alt="Timerange" responsive="true" >}}

## Flux de logs
Le flux de logs est la liste des logs qui correspondent au contexte sélectionné. Un contexte est défini par un filtre dans la [barre de recherche] (#search-bar) et un [horizon temporel](#time-range).
Vous pouvez trier la liste en cliquant sur l'en-tête de colonne **date**.

{{< img src="logs/explore/log_list.png" alt="Logstream" responsive="true" style="width:80%;">}}

### Filtrer le flux de logs
Si vous entrez une requête valide dans la [barre de recherche](#barre-de-recherche), les mots correspondant à votre requête sont mis en évidence et les logs affichés correspondent à vos critères de facettes :

{{< img src="logs/explore/log_list_highlighted.png" alt="Logstream highlighted" responsive="true" style="width:80%;">}}

### Afficher un log dans son intégralité
Cliquez sur n'importe quelle ligne de log pour voir plus de détails :

{{< img src="logs/explore/log_in_log_list.png" alt="Log in Logstream" responsive="true" style="width:80%;">}}

### Afficher en contexte

Cliquez sur `View in context` pour voir les lignes de logs datées juste avant et après le log sélectionné, même si elles ne correspondent pas à votre filtre.

{{< img src="logs/explore/view-in-context.gif" alt="View in context" responsive="true" >}}

Le contexte varie en fonction de la situation étant donné que nous utilisons les attributs `Hostname`, `Service`, `filename` ou `container_id` ainsi que des tags pour nous assurer de trouver le contexte adapté à vos logs.

### Colonnes
Pour ajouter plus de détails de log à la liste, cliquez sur le bouton **Columns** et sélectionnez les facettes que vous voulez voir :

{{< img src="logs/explore/log_list_with_columns.png" alt="Logstream with columns" responsive="true" style="width:80%;">}}

### Affichage multi-ligne

{{< img src="logs/explore/multi_line_display.png" alt="Multi-line display" responsive="true" style="width:30%;">}}

Choisissez d'afficher une, trois ou dix lignes à partir des attributs `message` de vos logs dans votre flux.

* Avec une ligne affichée :
{{< img src="logs/explore/1_multi_line.png" alt="1 line Multi-line display" responsive="true" style="width:80%;">}}

* Avec trois lignes affichées :
{{< img src="logs/explore/3_multi_line.png" alt="2 lines with Multi-line display" responsive="true" style="width:80%;">}}

* Avec dix lignes affichées :
{{< img src="logs/explore/10_multi_line.png" alt="10 lines with Multi-line display" responsive="true" style="width:80%;">}}

**Remarque** : Si l'attribut `error.stack` est présent, celui-ci est affiché en priorité, car il doit être utilisé pour les stack traces.
Remappez tout attribut stack-trace sur cet attribut spécifique avec le processor [attribute remapper][1].

## Facettes

Une facette affiche tous les valeurs distinctes d'un attribut ou d'un tag ainsi que des analyses de base telles que la quantité de logs représentés. C'est également un moyen pour filtrer facilement vos données.

Les facettes vous permettent de pivoter ou de filtrer vos ensembles de données en fonction d'un attribut donné. Les facettes peuvent inclure par exemple des utilisateurs, des services, etc.

{{< img src="logs/explore/facets_demo.png" alt="Facets demo" responsive="true" style="width:80%;">}}

### Créer une facette

Pour commencer à utiliser un attribut en tant que facette ou dans la recherche, cliquez dessus et ajoutez-le en tant que facette :

{{< img src="logs/explore/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:50%;">}}

Une fois cela fait, la valeur de cet attribut est stockée **pour tous les nouveaux logs** et peut être utilisée dans [la barre de recherche](#search-bar), [le volet des facettes](#facet-panel) et dans la [requête d'analyse de logs][2].

### Volet de facettes

Utilisez les facettes pour filtrer facilement vos logs. La barre de recherche et l'URL reflètent automatiquement votre sélection.

{{< img src="logs/explore/facet_panel.png" alt="Facet panel" responsive="true" style="width:80%;">}}

## Mesures

Une mesure est un attribut avec une valeur numérique contenue dans vos logs. On peut la considérer comme une « métrique de log ».

### Créer une Mesure

Pour commencer à utiliser un attribut comme mesure, cliquez sur un attribut numérique de votre log :

{{< img src="logs/explore/create_a_mesure.png" alt="Create a measure" responsive="true" style="width:80%;">}}

Une fois cela fait, la valeur de cet attribut est stockée **pour tous les nouveaux logs** et peut être utilisée dans [la barre de recherche](#search-bar), dans [le volet des facettes](#facet-panel) et dans la [requête d'analyse de logs][2].

### Sélectionnez l'unité de votre mesure

Toutes les mesures ont leur propre unité qui est ensuite utilisée pour l'affichage dans les colonnes de l'explorateur de logs, les widgets de flux de logs dans les dashboards, et dans les analyses de logs.

{{< img src="logs/explore/edit_a_measure.png" alt="Edit a measure" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/#attribute-remapper
[2]: /logs/analytics
[4]: /graphing/infrastructure/
[5]: /integrations/
[6]: /getting_started/tagging/#tags-best-practices
