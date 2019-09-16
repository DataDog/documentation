---
title: Recherche de traces
kind: documentation
description: Recherche globale sur toutes vos traces avec des tags
aliases:
  - /fr/tracing/trace_search_analytics/
  - /fr/tracing/trace_search/
  - /fr/tracing/search
  - /fr/tracing/getting_further/apm_events/
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
  - link: tracing/trace_search_and_analytics/analytics
    tag: Documentation
    text: Analyse des données de votre APM avec une cardinalité infinie
---
## Présentation

Utilisez l'analyse et recherche de traces pour filtrer les métriques de performance d'application et les [événements APM](#evenements-apm) par tags définis par l'utilisateur. Elle permet l'exploration approfondie des requêtes Web passant par votre service.

L'analyse et recherche de traces peut être activée par service APM et par host. Un service sur lequel elle est activée expose tous ses événements APM à Datadog.

Les services en aval comme les bases de données et les couches de cache ne font pas partie des services disponibles (car ils ne génèrent pas leurs propres traces), mais leur information est récupérée par les services de haut niveau qui les appellent.

Dans la vue Recherche de traces, vous pouvez :

* [Interagir avec l'intervalle](#time-range)
* [Afficher des listes de traces](#trace-stream)
* [Utiliser les facettes pour filtrer votre flux de traces](#facets)
* [Saisir des requêtes de recherche](#search-bar)

## Événements APM

Lorsqu'une requête atteint un service (p. ex. serveur Web, base de données), l'Agent Datadog crée un événement APM. C'est un enregistrement de la requête comprenant sa durée, son code de réponse et toutes les [métadonnées personnalisées][1] éventuelles.
Un événement APM est représenté par une span unique avec les métadonnées jointes pour la requête traitée. Pour chaque service qui reçoit une requête, l'Agent crée un événement APM. Si une requête passe par un service Web, un service de listing et un service de base de données, la requête générera trois événements APM. Pour réduire la quantité d'événements APM générés, [activez/désactivez explicitement la collecte d'événements APM pour un service spécifique][2].

Pour démarrer la collecte d'événements APM, [activez l'analyse et recherche de traces pour vos services][3].

### Traces complètes

{{< img src="tracing/trace_search_and_analytics/search/complete_trace.png" alt="Liste de traces" responsive="true">}}

Si la case est cochée, les événements APM énumérés dans le flux de traces sont associés à une trace. Vous pouvez donc afficher la trace complète avec toutes les spans associées.

## Barre de recherche

Tous les paramètres de recherche sont contenus dans l'adresse URL de la page. Il est donc très facile de partager votre vue.

### Syntaxe de recherche

Une requête est composée de *termes* et d'*opérateurs*.

Il existe deux types de *termes* :

* Une [**Facette**](#facettes)

* Un [**Tag**](#tags)

Pour combiner plusieurs *termes* dans une requête complexe, utilisez l'un des opérateurs booléens suivants :

|              |                                                                                                        |                              |
| :----        | :----                                                                                                  | :----                        |
| **Opérateur** | **Description**                                                                                       | **Exemple**                 |
| `AND`        | **Intersection** : les deux termes sont inclus dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut). | authentication AND failure   |
| `OR`         | **Union** : un des deux termes est inclus dans les événements sélectionnés.                                            | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant n'est PAS inclus dans les événements sélectionnés.                                                  | authentication AND -password |

### Recherche de facettes

Pour effectuer une recherche sur une [facette](#facettes) spécifique, vous devez d'abord [l'ajouter comme facette](#creer-une-facette) puis utiliser `@` pour spécifier que vous faites une recherche sur une facette.

Par exemple, si le nom de votre facette est **url** et que vous souhaitez filtrer la valeur **url** sur *www.datadoghq.com*, il vous suffit de saisir :

`@url:www.datadoghq.com`

### Recherche de tags

Vos traces héritent des tags des [hosts][4] et des [intégrations][5] qui les génèrent. Ils peuvent être utilisés dans une recherche ainsi que comme facettes :

| Requête                                                          | Correspondance                                                                       |
| :----                                                          | :---                                                                        |
| `("env:prod" OR test)`                                         | Toutes les traces avec le tag `#env:prod` ou le tag `#test`                      |
| `(service:srvA OR service:srvB)` or `(service:(srvA OR srvB))` | Toutes les traces qui contiennent les tags `#service:srvA` ou `#service:srvB`.            |
| `("env:prod" AND -"version:beta")`                             | Toutes les traces qui contiennent `#env:prod` et qui ne contiennent pas `#version:beta` |

Si vos tags ne respectent pas les [recommandations relatives aux tags][6] et n'utilisent pas la syntaxe `key:value`, utilisez cette requête de recherche :

* `tags:<MON_TAG>`

### Wildcards

Afin d'effectuer une recherche générique avec plusieurs caractères, utilisez le symbole `*` comme illustré ci-dessous :

*  `service:web*` renvoie toutes les traces dont le service commence par `web`
*  `@url:data*` renvoie toutes les traces dont l'adresse `url` commence par `data`.

### Valeurs numériques

Utilisez les caractères `<`, `>`, `<=` ou `>=` pour effectuer une recherche avec des attributs numériques. Par exemple, pour récupérer toutes les traces avec un délai de réponse supérieur à 100 ms :

`@http.response_time:>100`

Vous pouvez également effectuer une recherche d'attribut numérique dans une plage spécifique. Par exemple, pour récupérer toutes les erreurs 4xx :

`@http.status_code:[400 TO 499]`

### Saisie automatique

La saisie de requête complexe peut être fastidieuse. Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter votre requête en utilisant des valeurs existantes :

{{< img src="tracing/trace_search_and_analytics/search/search_bar_autocomplete.png" alt="Saisie automatique dans la barre de recherche " responsive="true" style="width:60%;">}}

### Échappement de caractères spéciaux

Les attributs suivants sont considérés comme spéciaux : `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, et `\` requièrent le caractère d'échappement `\`.
Par exemple, pour rechercher les traces qui contiennent `user=AliceMartin` dans leur adresse `url`, saisissez la recherche suivante :

`@url:*user\=AliceMartin*`

La même logique s'applique aux espaces dans les attributs de trace. Il est déconseillé d'avoir des espaces dans les attributs de trace, mais s'ils en ont, les espaces doivent être précédées du caractère d'échappement. 
Si un attribut est appelé `user.first name`, effectuez une recherche sur cet attribut en ajoutant un caractère d'échappement devant l'espace :

`@user.first\ name:myvalue`

### Recherches enregistrées

Ne perdez pas de temps à créer les mêmes vues tous les jours. Les recherches enregistrées contiennent votre requête de recherche, les colonnes et l'horizon temporel. Ils sont alors disponibles dans la barre de recherche grâce à la correspondance de saisie automatique du nom de la recherche ou de la requête.

{{< img src="tracing/trace_search_and_analytics/search/saved_search.png" alt="Recherche enregistrée" responsive="true" style="width:80%;">}}

Pour supprimer une recherche enregistrée, cliquez sur l'icone en forme de corbeille sous le menu déroulant de recherche de traces. 

## Intervalle

L'intervalle vous permet d'afficher les traces dans une période donnée. Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante :

{{< img src="tracing/trace_search_and_analytics/search/timerange.png" style="width:50%;" alt="Intervalle" responsive="true" >}}

## Flux de traces
Le flux de traces regroupe la liste des traces qui correspondent au contexte sélectionné. Un contexte est défini par un filtre de [barre de recherche](#barre-de-recherche) et un [intervalle](#intervalle).

Cliquez sur l'en-tête de colonne **date** pour trier la liste.

{{< img src="tracing/trace_search_and_analytics/search/trace_list.png" alt="Liste de traces" responsive="true" style="width:80%;">}}

### Afficher une trace complète

Cliquez sur une trace quelconque pour afficher plus de détails :

{{< img src="tracing/trace_search_and_analytics/search/trace_in_tracestream.png" alt="Trace dans le flux de traces" responsive="true" style="width:80%;">}}

### Colonnes

Pour ajouter plus de détails de trace à la liste, cliquez sur le bouton **Columns** et sélectionnez les facettes que vous souhaitez voir :

{{< img src="tracing/trace_search_and_analytics/search/trace_list_with_column.png" alt="Liste des traces avec les colonnes" responsive="true" style="width:80%;">}}

### Affichage multiligne

{{< img src="tracing/trace_search_and_analytics/search/multi_line_display.png" alt="Affichage multiligne" responsive="true" style="width:30%;">}}

Choisissez d'afficher une, trois ou dix lignes à partir de vos traces. L'affichage de trois et dix lignes vous donne une meilleure compréhension de l'attribut `error.stack`.

* Avec une ligne affichée :
{{< img src="tracing/trace_search_and_analytics/search/1_multi_line.png" alt="Affichage multiligne à 1 ligne" responsive="true" style="width:80%;">}}

* Avec trois lignes affichées :
{{< img src="tracing/trace_search_and_analytics/search/3_multi_line.png" alt="Affichage multiligne avec 3 lignes" responsive="true" style="width:80%;">}}

* Avec dix lignes affichées :
{{< img src="tracing/trace_search_and_analytics/search/10_multi_line.png" alt="Affichage multiligne avec 10 lignes" responsive="true" style="width:80%;">}}

## Facettes

Une facette présente toutes les valeurs distinctes d'un attribut ou d'un tag en plus de proposer des analyses de base, comme la quantité de traces représentées. Son activation permet également de filtrer facilement vos données.

Les facettes vous permettent de faire pivoter ou de filtrer vos ensembles de données en fonction d'un attribut donné. Les facettes peuvent correspondre à des utilisateurs, des services, etc.

{{< img src="tracing/trace_search_and_analytics/search/facets_demo.png" alt="Demonstration facettes" responsive="true" style="width:80%;">}}

### Créer une facette

Pour commencer à utiliser un attribut en tant que facette ou dans une recherche, cliquez dessus et ajoutez-le en tant que facette :

{{< img src="tracing/trace_search_and_analytics/search/create_facet.png" style="width:50%;" alt="Créer une facette" responsive="true" style="width:50%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour toutes les nouvelles traces** et peut être utilisée dans [la barre de recherche](#barre-de-recherche), [le volet Facettes](#volet-facettes) et dans la [requête de graphique de traces][7].

### Volet Facettes

Utilisez les facettes pour filtrer facilement vos traces. La barre de recherche et l'URL reflètent automatiquement vos sélections.

{{< img src="tracing/trace_search_and_analytics/search/facet_panel.png" alt="Volet facettes" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/advanced/adding_metadata_to_spans/?tab=java
[2]: /fr/tracing/trace_search_and_analytics/?tab=java#configure-by-integration
[3]: /fr/tracing/trace_search_and_analytics/?tab=php#automatic-configuration
[4]: /fr/graphing/infrastructure
[5]: /fr/integrations
[6]: /fr/tagging/#tags-best-practices
[7]: /fr/tracing/trace_search_and_analytics/analytics