---
description: Filtrez les spans pour retrouver des spans précises ou générales, ou
  pour vous concentrer sur un groupe spécifique de spans pertinentes.
further_reading:
- link: tracing/trace_explorer/query_syntax
  tag: Documentation
  text: Syntaxe de requête
title: Rechercher des spans
---

## Présentation

Bien que les listes de spans puissent vous fournir des informations précieuses, il est parfois plus facile d'obtenir des insights en agrégeant les spans. Pour consulter ces agrégations, recherchez des spans dans le Trace Explorer et affichez les données sous forme de séries temporelles, de top lists ou de tableaux.

La fonctionnalité de recherche du Trace Explorer vous permet de définir un intervalle ainsi qu'une requête de recherche, afin de rechercher des paires `key:value` tout comme du texte intégral. Choisissez les dimensions que vous souhaitez consulter (nombre de spans, nombre de valeurs uniques ou mesure d'une dimension quantitative), sélectionnez un intervalle, puis regroupez la requête en fonction d'une ou de plusieurs dimensions.

## Requête de recherche

Pour rechercher, par exemple, les spans d'un service de stockage Web qui possèdent un statut d'erreur et qui ont été générées lors des 30 dernières minutes, créez une requête personnalisée, comme `service:web-store status:error`, et définissez l'intervalle sur `Past 30 minutes` :

{{< img src="tracing/trace_explorer/search/trace_explorer_list_search.png" alt="Recherche de liste dans le Trace Explorer. L'utilisateur a recherché 'service:web-store' et 'status:error'. Deux graphiques à barres, l'un pour des requêtes et l'autre pour des erreurs, ainsi qu'un graphique linéaire représentant la latence, sont affichés. L'option Visualize As est définie sur List." style="width:100%;">}}

Sélectionnez une visualisation de top list, puis regroupez la requête par `resource` afin de consulter les principales ressources impactées par les erreurs.

{{< img src="tracing/trace_explorer/search/trace_explorer_top_list_search.png" alt="Recherche de liste dans le Trace Explorer. L'option Visualize As est définie sur Top List." style="width:100%;">}}

{{< site-region region="us,eu,us3,us5,ap1" >}}
**Remarque** : pour effectuer une recherche `key:value`, vous n'avez **pas besoin** de commencer par [déclarer une facette][1].

[1]: /fr/tracing/trace_explorer/query_syntax/#facets
{{< /site-region >}}

## Syntaxe de requête

Pour commencer à chercher des spans dans le Trace Explorer, consultez la documentation sur la [syntaxe des requêtes][2] et les [intervalles][3] pour en savoir plus sur les intervalles personnalisés.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_explorer/query_syntax/#facets
[2]: /fr/tracing/trace_explorer/query_syntax
[3]: /fr/dashboards/guide/custom_time_frames