---
title: Log Explorer
kind: documentation
description: Effectuez des recherches et des analyses sur l'ensemble de vos logs
aliases:
  - /fr/logs/explore
  - /fr/logs/patterns
  - /fr/logs/graph
  - /fr/logs/analytics
  - /fr/logs/explorer/list
  - /fr/logs/explorer/patterns
  - /fr/logs/explorer/analytics
  - /fr/logs/explorer/transactions/
further_reading:
  - link: logs/explorer/live_tail
    tag: Documentation
    text: "Afficher un aperçu de vos logs dans la vue Live\_Tail"
  - link: logs/explorer/saved_views/
    tag: Documentation
    text: Configurer automatiquement votre vue Log Explorer
  - link: https://www.datadoghq.com/blog/datadog-clipboard/
    tag: Blog
    text: "Ajouter une URL Log\_Explorer à votre presse-papiers"
---
## Présentation

Commencez par accéder au [**Log Explorer**][1] pour débuter vos diagnostics et plonger au cœur de vos logs. Que vous partiez de zéro, d'une [vue enregistrée][2] ou des données de contexte associées à une notification de monitor ou un widget de dashboard, le Log Explorer vous permet de rechercher et de filtrer, de regrouper, de visualiser et d'exporter vos logs, le tout de façon itérative.


### Rechercher et filtrer des logs

**Recherchez** et **filtrez** vos logs pour retrouver des logs précis ou généraux, ou pour vous concentrer sur un groupe spécifique de logs pertinents.

  - Pour en savoir plus sur la recherche de logs dans le Log Explorer, consultez la [section Rechercher des logs][3].
  - Pour commencer à créer des requêtes et à utiliser des facettes dans le Log Explorer, consultez la [section Syntaxe de recherche de logs][4].

### Group

**Regroupez** les logs recherchés sous forme d'entités de plus haut niveau pour déduire ou consolider des informations. Pour commencer à identifier des patterns et à agréger des logs par sous-ensemble d'événements, consultez la [section Regrouper des logs][5].

### Visualiser les données

**Visualisez** les résultats des filtres et des agrégations pour voir vos logs sous le bon angle et faire émerger des informations clés. Consultez par exemple vos logs au sein d'une liste, afin d'organiser les données dans des colonnes, ou dans une série temporelle, pour mesurer l'évolution de vos données. Pour commencer à visualiser les données de vos logs dans le Log Explorer, consultez la [section Visualisations de log][6].

### Exporter

Vous pouvez également **exporter** votre vue du Log Explorer, afin de l'utiliser ultérieurement ou dans d'autres contextes. Pour en savoir plus, consultez la [section Exporter des logs][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /fr/logs/explorer/saved_views/
[3]: /fr/logs/explorer/search
[4]: /fr/logs/explorer/search_syntax/
[5]: /fr/logs/explorer/group
[6]: /fr/logs/explorer/visualize
[7]: /fr/logs/explorer/export