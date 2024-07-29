---
aliases:
- /fr/tracing/tracing_without_limits/
- /fr/tracing/livesearch/
- /fr/tracing/trace_search_and_analytics/
description: Trace Explorer
further_reading:
- link: tracing/trace_explorer/search
  tag: Documentation
  text: Rechercher des spans
title: Trace Explorer
---

{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## Présentation

Le [Trace Explorer][1] vous permet d'effectuer des recherches parmi toutes les spans ingérées ou indexées en appliquant n'importe quel tag sur n'importe quelle span. Les spans renvoyées par votre requête dépendent du type de recherche effectué. Une recherche en mode Live renvoie toutes les spans ingérées au cours des 15 dernières minutes avec mise à jour en temps réel, tandis qu'une recherche parmi les spans indexées renvoie les spans conservées pendant 15 jours par vos filtres personnalisés.

Les applications instrumentées envoient 100 % de leurs traces à Datadog en vue de leur [ingestion][2]. Ces traces sont alors disponibles en tant que traces Live pendant une période mobile de 15 minutes.

Le Trace Explorer affiche un indicateur **Live Search - All ingested data** lorsque vous êtes en mode Live :

{{< img src="tracing/trace_explorer/live_search.png" alt="Indicateur Live Search" style="width:75%;" >}}

Toutes les traces ingérées passent ensuite par :
- Des [filtres de rétention personnalisés][3] que vous pouvez créer pour indiquer les spans à indexer. Une fois indexées par l'un de ces filtres, les traces sont conservées pendant **15 jours**.
- Le [filtre de rétention intelligent par défaut][4], qui conserve un ensemble diversifié de traces. Une fois indexées par ce filtre, les traces sont conservées pendant **30 jours**.

Le Trace Explorer affiche un indicateur **Search - Only Indexed Data** lorsque vous recherchez des [spans indexées][5] :

{{< img src="tracing/trace_explorer/historical_search.png" alt="Indicateur Only Indexed" style="width:75%;" >}}

Le mode Live Search est sélectionné par défaut sur la page Traces. Utilisez le sélecteur d'intervalle en haut à droite pour passer du mode Live Search au mode Indexed Data Search.

### Contrôle du volume des traces

Vous pouvez personnaliser les paramètres [de rétention et d'ingestion][6] afin d'envoyer et de conserver uniquement les données qui vous intéressent.

#### Ingestion

Contrôlez l'ensemble de votre volume avec les [options de configuration de l'Agent Datadog][7] ou définissez des [règles d'ingestion][8] précises pour chaque service instrumenté avec la solution APM Datadog.


#### Indexation

Après avoir instrumenté vos services et ingéré des traces, définissez des [filtres de rétention][3] basés sur des tags dans l'application Datadog pour que Datadog conserve uniquement les spans qui vous intéressent.

**Remarque** : les spans ingérées et indexées peuvent augmenter vos coûts. Pour en savoir plus, consultez la page [Tarification d'APM][9].

## Live Search pendant 15 minutes

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Live Search" >}}

En mode Live Search, Datadog affiche les spans dès qu'elles ont été envoyées par l'Agent Datadog et avant qu'elles aient été indexées par vos filtres de rétention. Toutes les spans ingérées sont affichées pour les 15 dernières minutes (période mobile) sans aucun échantillonnage.

{{< tabs >}}
{{% tab "Vue sous forme de Liste" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search avec vue sous forme de liste" video="true" >}}

Utilisez la **vue sous forme de Liste** pour :

- Surveiller le bon déroulement d'un nouveau déploiement en recherchant l'attribut `version_id` de tous les tags.
- Visualiser des informations sur les pannes en temps réel en recherchant un `org_id` ou `customer_id` spécifique associé à une span enfant problématique parmi 100 % des spans ingérées.
- Vérifier si un processus a correctement démarré en saisissant `process_id` et en complétant automatiquement le nouvel identifiant de processus en tant que tag sur les spans enfant.
- Surveiller l'impact des tests de charge sur vos endpoints en filtrant les métriques en fonction de la durée d'une ressource enfant.
- Appliquer des requêtes de recherche en un seul clic sur n'importe quel tag ou span directement à partir du volet des traces.
- Ajouter, supprimer et trier des colonnes à partir des tags de span pour obtenir un affichage personnalisé.

Le nombre de spans reçues par seconde est affiché en haut du tableau des traces. Étant donné qu'un flux de milliers de spans par seconde est difficilement lisible, seule une partie des spans est affichée en cas de volume élevé. Vous pouvez néanmoins effectuer des recherches parmi l'ensemble des spans disponibles. Utilisez les fonctions de filtrage de la barre de requête Live Search pour filtrer le flux de spans et le bouton **Pause/Play** en haut à droite pour interrompre ou relancer le flux.

{{< img src="tracing/live_search/play-pause-button.png" alt="Interrompre ou lancer le Live Stream" style="width:75%;" >}}

**Remarque** : lorsque vous sélectionnez une span, le flux s'interrompt et les détails de la span sélectionnée s'affichent dans le volet latéral de la trace.

{{% /tab %}}
{{% tab "Vue sous forme de Série temporelle" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Live Search avec vue sous forme de série temporelle" video="true" >}}

Utilisez le bouton **Timeseries** pour visualiser vos spans sous forme de série temporelle et non sous forme de liste. Cette vue est utile pour représenter graphiquement les requêtes et les erreurs qui correspondent aux critères spécifiés, comme :

- Les erreurs pour le service et l'endpoint `ShoppingCart##checkout` avec un panier d'au moins `$100`. Vous pouvez également consulter chacune des traces correspondant à ces critères.

- Surveiller le déploiement Canary de n'importe quelle mise à jour d'application critique en temps réel.

- Comparer la latence d'une région géographique à une autre pour la dernière version de votre application iOS.

En plus de visualiser les requêtes qui correspondent à vos recherches sous forme de série temporelle, vous pouvez consulter les clients, zones de disponibilités ou autres éléments les plus affectés sous forme de Top List pendant une panne ou une enquête.

**Remarque :** l'exportation vers un dashboard ou un monitor est uniquement possible avec les spans conservées.

{{% /tab %}}
{{< /tabs >}}

### Filtrage

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="Recherche parmi toutes les spans" video="true" >}}

Définissez une requête valide dans la barre de recherche pour afficher les traces qui correspondent à vos critères de recherche pour **toutes les spans**. La syntaxe de recherche en mode Live Search est la même que celle dans les autres vues. Toutefois, en mode Live Search, la recherche se fait parmi toutes les traces ingérées, pour **tous les tags** et **toutes les spans**, et non pas uniquement parmi celles qui ont été indexées.

Vous pouvez choisir d'interroger les [spans de point d'entrée des services][10], les [spans racines][11] ou toutes les spans en modifiant l'option sélectionnée au-dessus du tableau des traces. Utilisez cette fonction sur les applications qui génèrent beaucoup de trafic pour réduire le nombre de spans affichées et ne visualiser que les spans de point d'entrée des services ou de la trace. Lorsque vous cochez cette case, seules les spans affichées dans la liste sont filtrées. Les autres spans continuent à être représentées dans le flamegraph lorsque vous cliquez sur une span pour afficher les détails de la trace.

Vous pouvez également rechercher des attributs qui ne sont pas définis en tant que facettes. Par exemple, pour rechercher l'attribut `cart.value`, deux options sont possibles :

- Cliquez sur l'attribut `cart.value` dans le volet des traces et ajoutez-le à la requête de recherche :
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="Ajouter un attribut à la requête" video="true" >}}

- Recherchez toutes les spans associées à l'attribut `cart.value` en saisissant « cart.value » dans la barre de requête de recherche :
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Filtrer par attribut en mode Live Search" video="true" >}}

## Recherche de spans indexées avec rétention de 15 jours

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Recherche indexée" >}}

La recherche de traces conservées se fait de la même façon qu'en mode Live Search. Pour passer du mode Live aux données conservées, modifiez le sélecteur d'intervalle pour choisir une durée supérieure à 15 minutes. Toutes les spans indexées par des filtres de rétention sont accessibles via la recherche. Ces spans sont conservées par Datadog pendant 15 jours après avoir été indexées par un filtre de rétention.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="Effectuer une recherche parmi les traces conservées" video="true" >}}

{{< tabs >}}
{{% tab "Vue sous forme de Liste" %}}

Toutes les spans indexées par des filtres de rétention personnalisés *et* le filtre de rétention intelligent peuvent être recherchées lorsque la vue sous forme de Liste est activée. Toutefois, si vous filtrez vos spans en fonction d'un tag qui figure uniquement dans des spans non indexées par un filtre de rétention, votre recherche n'affichera aucun résultat, ce qui n'est pas le cas en mode [Live Search](#live-search-pendant-15-minutes).

{{% /tab %}}
{{% tab "Vue sous forme de Série temporelle" %}}

Toutes les spans indexées par des filtres de rétention personnalisés ou par le filtre de rétention intelligent peuvent être recherchées via l'analyse de traces.

Lorsque la vue sous forme de Série temporelle est activée, exportez votre requête vers un [dashboard][1], un [monitor][2] ou un [notebook][3] pour effectuer une analyse plus poussée ou pour recevoir automatiquement une alerte lorsqu'un nombre agrégé de spans dépasse un certain seuil. 

**Remarque** : les spans indexées par le filtre de rétention intelligent sont exclues des requêtes APM qui apparaissent dans les dashboards et les notebooks, ainsi que des évaluations de monitor d'analyse de traces. Pour en savoir plus, consultez la section [Rétention des traces][4].

[1]: /fr/dashboards/widgets/timeseries/
[2]: /fr/monitors/types/apm/?tab=analytics
[3]: /fr/notebooks
[4]: /fr/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### Configuration de la rétention

Vous pouvez personnaliser les spans qui sont conservées et leurs taux de rétention. Par défaut, le [filtre de rétention intelligent de Datadog][4] est appliqué. Il conserve automatiquement les traces associées à une variété d'erreurs et de latences ainsi que les traces liées à des ressources avec un trafic faible. Pour en savoir plus sur le filtre de rétention intelligent par défaut et découvrir comment créer vos propres filtres, consultez la [documentation sur les filtres de rétention][3]. Accédez à la page [Retention Filters][13] dans l'application Datadog pour créer ou modifier vos propres filtres.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /fr/tracing/trace_pipeline/ingestion_controls
[3]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /fr/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[5]: /fr/tracing/glossary/#indexed-span
[6]: /fr/tracing/trace_pipeline/
[7]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[8]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /fr/account_management/billing/apm_distributed_tracing/
[10]: /fr/tracing/glossary/#service-entry-span
[11]: /fr/tracing/glossary/#trace-root-span
[12]: https://app.datadoghq.com/apm/traces/retention-filters