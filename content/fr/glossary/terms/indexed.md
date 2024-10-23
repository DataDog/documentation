---
core_product:
- log management
- apm
title: indéxés
---
Les logs indexés sont des [logs][1] qui ont été collectés, traités et conservés à des fins d'analyse, dʼalertes, et de dépannage.

Les spans indexées représentent les [spans][2] indexées par un [filtre de rétention][3] et stockées dans Datadog pendant 15 jours. Elles peuvent être utilisées pour rechercher, interroger et surveiller vos données via la fonctionnalité [Recherche de spans][14] en fonction des [tags][5] inclus dans la span.

<div class="alert alert-info">
Vous pouvez contrôler et visualiser le nombre précis de spans indexées par service en créant des <a href="/tracing/trace_pipeline/trace_retention/">filtres de rétention basés sur des tags</a> après lʼingestion.
</div>

{{< img src="tracing/visualization/span_tag.png" alt="tag de span" style="width:80%" >}}

Dans cet exemple, les requêtes (`merchant.store_name` et `merchant.tier`) ont été ajoutées à la span en tant que tags.

Pour commencer à taguer des spans dans votre application, consultez le guide relatif à [lʼajout de tags de spans][6].

Une fois qu'un tag a été ajouté à une span, recherchez et interrogez ce tag dans Analytics en cliquant sur le tag pour l'ajouter en tant que [facette][7]. La valeur de ce tag est alors stockée pour toutes les nouvelles traces et peut être utilisée dans la barre de recherche, le volet Facettes et la requête du graphique des traces.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Créer une facette" style="width:50%;">}}

[1]: /fr/logs/
[2]: /fr/glossary/#span
[3]: /fr/glossary/#retention-filter
[4]: /fr/tracing/trace_explorer/search
[5]: /fr/getting_started/tagging
[6]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[7]: /fr/glossary/#facet