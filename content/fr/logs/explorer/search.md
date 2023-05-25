---
aliases:
- /fr/logs/search
description: Filtrez les logs pour retrouver des logs précis ou généraux, ou pour
  vous concentrer sur un groupe spécifique de logs pertinents.
further_reading:
- link: logs/explorer/group
  tag: Documentation
  text: Regrouper les logs interrogés
- link: logs/explorer/visualize
  tag: Documentation
  text: Créer des visualisations à partir de logs
- link: /logs/explorer/export
  tag: Documentation
  text: Parcourir les vues du Log Explorer
kind: documentation
title: Rechercher des logs
---

## Présentation

La fonctionnalité de recherche du Log Explorer vous permet de définir un intervalle ainsi qu'une requête de recherche. Vous pouvez rechercher des paires `key:value` tout comme du texte intégral.

### Requête de recherche

Pour filtrer, par exemple, les logs qui possèdent un certain statut et ont été générés par un service spécifique au cours des cinq dernières minutes, vous pouvez créer une requête personnalisée, comme `service:payment status:error rejected`, puis définir l'intervalle sur `Past 5 minutes` :

{{< img src="logs/explorer/search_filter.jpg" alt="Filtre de recherche" style="width:100%;" >}}

Les [logs indexés][3] prennent en charge les recherches de texte intégral ainsi que les recherches de paires `key:value`.

{{< site-region region="gov,us3,us5" >}}
**Remarque** : pour effectuer une recherche `key:value`, vous devez commencer par [déclarer une facette][1].

[1]: /fr/logs/explorer/facets/
{{< /site-region >}}

{{< site-region region="us,eu" >}}
**Remarque** : pour effectuer une recherche `key:value`, vous n'avez **pas besoin** de commencer par [déclarer une facette][1].

[1]: /fr/logs/explorer/facets/
{{< /site-region >}}

### Syntaxe de recherche

Pour commencer à chercher des logs dans le Log Explorer, consultez la section [Syntaxe de recherche de logs][1] et lisez la [documentation relative aux intervalles][2] pour en savoir plus sur les intervalles personnalisés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/search-syntax
[2]: /fr/dashboards/guide/custom_time_frames
[3]: /fr/logs/indexes