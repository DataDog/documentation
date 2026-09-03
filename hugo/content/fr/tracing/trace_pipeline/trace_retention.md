---
aliases:
- /fr/tracing/trace_retention/
description: Découvrez comment contrôler la rétention des traces grâce aux filtres
  de rétention.
further_reading:
- link: /tracing/trace_ingestion/mechanisms
  tag: Documentation
  text: Mécanismes d'ingestion
- link: /tracing/trace_ingestion/ingestion_controls/
  tag: Documentation
  text: Contrôles d'ingestion
- link: /tracing/trace_retention/usage_metrics/
  tag: Documentation
  text: Métriques d'utilisation
title: Rétention des traces
---

{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Filtres de rétention" >}}

Avec APM, il est possible de personnaliser tous les aspects de l'[ingestion][1] des traces et de leur **rétention** pendant 15 jours.

Pour suivre ou surveiller votre volume de données ingérées et indexées, consultez la section [Métriques d'utilisation][2].

## Filtres de rétention

Une fois vos spans ingérées par Datadog, certaines d'entre elles sont conservées pendant 15 jours, selon les filtres de rétention configurés sur votre compte.

Par défaut, deux filtres de rétention sont activés :
- Le filtre `Error Default` indexe les spans d'erreur caractérisées par `status:error`. Il est possible de configurer le taux de rétention ainsi que la requête. Par exemple, pour conserver les erreurs en production, définissez la requête sur `status:error, env:production`. Vous pouvez désactiver ce filtre de rétention si vous ne souhaitez pas conserver par défaut les erreurs.
- Le [filtre de rétention intelligent](#filtre-de-retention-intelligent-datadog) conserve un échantillon de traces d'erreur et de traces avec différentes distributions de la latence.

Vous pouvez également créer des [filtres de rétention basés sur des tags](#creer-votre-propre-filtre-de-retention) pour vos services.

**Remarque** : les droits administrateur sont requis pour créer, modifier ou désactiver des filtres de rétention.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_page.png" style="width:100%;" alt="Page Retention Filters" >}}

L'onglet [Retention Filters][3] du site Datadog contient la liste de tous les filtres de rétention :

Filter Name
: Le nom de chaque filtre servant à indexer des spans.

Filter Query
: La requête basée sur des tags de chaque filtre.

Retention Rate
: Un pourcentage compris entre 0 et 100 correspondant au nombre de spans indexées par Datadog.

Spans Indexed
: Le nombre de spans indexées par le filtre sur la période sélectionnée.

Last Updated
: La date de dernière mise à jour du filtre de rétention et l'utilisateur à l'origine de cette mise à jour.

Interrupteur
: Permet d'activer ou de désactiver un filtre.

L'ordre des filtres de rétention dans la liste définit le comportement d'indexation. Si une span correspond à un filtre de rétention en haut de la liste, elle est conservée ou ignorée. Les filtres de rétention en bas de la liste ne sont pas appliqués aux spans pertinentes si celles-ci ont déjà été traitées.

La colonne `Spans Indexed` de chaque filtre de rétention repose sur la métrique `datadog.estimated_usage.apm.indexed_spans`. Elle vous permet d'effectuer le suivi de votre utilisation des spans indexées. Pour en savoir plus, consultez la section [Métriques d'utilisation][2] ou accédez au [dashboard][4] de votre compte à ce sujet.

<div class="alert alert-info"><strong>Remarque</strong> : les filtres de rétention n'ont aucune incidence sur la collecte de traces par l'Agent et leur envoi à Datadog. Il s'agir en effet de processus d'ingestion. Seuls les <a href="/tracing/trace_ingestion/mechanisms">contrôles d'ingestion</a> vous permettent de modifier le volume de données de tracing ingérées.</div>

### Filtre de rétention intelligent Datadog

Le filtre de rétention intelligent est toujours activé pour vos services. Il conserve une certaine proportion de vos traces pour vous aider à surveiller la santé de vos applications. Toutes les [spans d'entrée de service][5] sont indexées pour les traces conservées par le filtre de rétention intelligent.

La rétention intelligente conserve les éléments suivants pendant 30 jours :

 - Une sélection représentative d'erreurs, afin de garantir la diversité de celles-ci (par exemple, les codes de réponse 400 et 500)
 - Les centiles `p75`, `p90` et `p95` de latence élevée
 - Toutes les ressources associées à des traces pour l'intervalle sélectionné, quel que soit leur trafic
 - La trace de durée maximale réelle pour chaque intervalle

**Remarque** : la sélection des spans par la rétention intelligent suit un processus logique, et non aléatoire. Pour cette raison, les spans qui sont conservées uniquement par le filtre intelligent ne sont **pas** incluses dans la [série temporelle du Trace Explorer][6]. Seules les spans conservées par des [filtres de rétention personnalisés](#créer-votre-propre-filtre-de-retention) peuvent être représentées dans des vues agrégées (séries temporelles, top lists ou tableaux).

Les spans indexées par le filtre de rétention intelligent ne **rentrent pas dans le calcul de l'utilisation** des spans indexées. Elles n'engendrent donc **aucun coût supplémentaire**.

Si, pour certains tags ou attributs, vous souhaitez conserver plus de spans que celles du filtre de rétention intelligent, [créez votre propre filtre de rétention](#creer-votre-propre-filtre-de-retention).

### Créer votre propre filtre de rétention

Créez, modifiez ou désactivez des filtres supplémentaires basés sur des tags afin de choisir les spans à indexer et conserver pendant 15 jours. Définissez le pourcentage de spans à conserver pour chaque filtre. Lorsqu'une span est conservée, la trace correspondante est également enregistrée. La trace complète est consultable dans le [Trace Explorer][7].

**Remarque** : pour pouvoir rechercher des traces en fonction d'un tag dans le Trace Explorer, la span qui contient directement le tag recherché doit avoir été indexée par un filtre de rétention.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/create_retention_filter.png" style="width:90%;" alt="Créer un filtre de rétention">}}

1. Ajoutez des tags de span pour définir la requête de rétention. Vous pouvez choisir de conserver _toutes les spans_ possédant les tags définis, seulement les _[spans d'entrée de service][5]_ (option par défaut) ou uniquement les _[spans racine de trace][8]_.
2. Définissez le pourcentage de spans correspondant à ces tags devant être indexées.
3. Attribuez un nom au filtre.
4. Enregistrez votre nouveau filtre.

Lorsque vous créez un filtre ou modifiez le taux de rétention d'un filtre existant, Datadog affiche une estimation du changement de volume d'indexation global sous la forme d'un pourcentage.

Les filtres sont conservés dans un ordre séquentiel. Si un filtre en amont conserve les spans avec le tag `resource:POST /hello_world`, ces spans ne sont pas répertoriées dans la fenêtre **Edit** d'un filtre en aval qui recherche des spans avec le même tag, car les spans ont déjà été conservées par le filtre en amont.

Par exemple, vous pouvez créer des filtres de façon à conserver toutes les traces pour :

- Les transactions de carte bancaire supérieures à 100 $
- Les clients importants qui utilisent une fonctionnalité stratégique de votre solution SaaS
- Les versions spécifiques d'une application de service de livraison en ligne

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_ingestion
[2]: /fr/tracing/trace_retention/usage_metrics
[3]: https://app.datadoghq.com/apm/traces/retention-filters
[4]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[5]: /fr/tracing/visualization/#service-entry-span
[6]: /fr/tracing/trace_explorer/?tab=timeseriesview#indexed-spans-search-with-15-day-retention
[7]: /fr/tracing/trace_explorer/?tab=listview#indexed-spans-search-with-15-day-retention
[8]: /fr/tracing/visualization/#trace-root-span