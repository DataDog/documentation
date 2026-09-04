---
aliases:
- /fr/tracing/trace_retention/
- /fr/tracing/trace_queries/one_percent_flat_sampling/
description: Découvrez comment contrôler la rétention des traces grâce aux filtres
  de rétention.
further_reading:
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: Blog
  text: Unifiez et corrélez les données frontend et backend avec des filtres de rétention
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentation
  text: Mécanismes d'ingestion
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Paramètres d'ingestion
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métriques d'utilisation
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: Centre d'apprentissage
  text: 'Limitation du débit et rétention APM :'
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: 'Maîtriser le traçage distribué : défis liés au volume de données et approche
    de Datadog pour un échantillonnage efficace'
title: Rétention des traces
---
{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Filtres de rétention" >}}

Avec Datadog APM, [l'ingestion et la rétention des traces pendant 15 jours][1] sont entièrement personnalisables.

Pour suivre ou surveiller votre volume de données ingérées et indexées, consultez la section [Métriques d'utilisation][2].

## Filtres de rétention {#retention-filters}

Une fois les spans ingérés, certains sont conservés pendant 15 jours selon les filtres de rétention configurés sur votre compte :
1. Le **[filtre de rétention intelligent](#datadog-intelligent-retention-filter)** conserve les spans pour chaque environnement, service, opération et ressource pour différentes distributions de latence.
2. Plusieurs **[filtres de rétention par défaut](#default-retention-filters)** sont créés pour garantir que vous gardiez une visibilité sur l'ensemble de vos services et endpoints, ainsi que sur les erreurs et les traces à forte latence. 
3. Vous pouvez créer un nombre illimité de **[filtres de rétention personnalisés](#create-your-own-retention-filter)** pour vos services, afin de capturer les traces qui comptent le plus pour votre activité, en fonction de n'importe quel attribut de span ou filtre de tag.

**Remarque** : L'autorisation `apm_retention_filter_write` est requise pour créer, supprimer, modifier, activer ou désactiver des filtres de rétention.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="Page Filtres de rétention" >}}

Dans Datadog, sur la page des paramètres [Filtres de rétention][3], vous pouvez voir une liste de tous les filtres de rétention :

Nom de filtre
: Le nom de chaque filtre de rétention utilisé pour indexer les spans.

Filter Query
: La requête basée sur les tags pour chaque filtre.

Taux de rétention
: Un pourcentage de 0 à 100 % du nombre de spans correspondants indexés. Les spans conservés sont choisis uniformément parmi les spans qui correspondent à la requête du filtre.

Spans indexées
: Le nombre de spans indexés par le filtre sur la période sélectionnée.

Dernière mise à jour
: La date et l'utilisateur ayant modifié le filtre de rétention en dernier.

Bouton activé
: Permet d'activer et de désactiver les filtres.

**Remarque** : L'ordre de la liste des filtres de rétention modifie le comportement d'indexation. Si un span correspond à un filtre de rétention situé en début de liste, le span est soit conservé, soit supprimé. Tout filtre de rétention personnalisé correspondant situé plus bas dans la liste ne capture pas le span déjà traité.

La colonne `Spans Indexed` pour chaque filtre de rétention est alimentée par la métrique `datadog.estimated_usage.apm.indexed_spans`, que vous pouvez utiliser pour suivre votre utilisation des spans indexés. Pour plus d'informations, lisez [Métriques d'utilisation][2], ou explorez le [tableau de bord d'utilisation prêt à l'emploi][4] disponible dans votre compte.

<div class="alert alert-info">Les filtres de rétention n'affectent pas les traces collectées par l'Agent et envoyées à Datadog (« ingérées »). Pour contrôler l'ingestion, utilisez des <a href="/tracing/trace_pipeline/ingestion_controls/">contrôles d'ingestion</a> dédiés.</div>


### Types de filtres de rétention {#retention-filter-types}

Il existe deux types de filtres de rétention :

1. **Filtres de rétention au niveau du span** - Indexez uniquement les spans spécifiques qui correspondent à vos critères de filtre.
2. **Filtres de rétention au niveau de la trace** - Indexez des traces entières qui contiennent des spans correspondant à vos critères de filtre, rendant les traces complètes interrogeables dans les requêtes de traces.

| Feature | Filtres de rétention standard | Filtres de rétention au niveau de la trace |
| ------- | ------------------------- | ----------------------------- |
| **Configuration** | Requête de span + taux de rétention de span | Requête de span + taux de rétention de span + taux de rétention de trace |
| **Ce qui est indexé** | Seuls les spans ciblés par la requête | Tous les spans appartenant aux traces qui contiennent des spans correspondant à la requête |
| **Où cela est interrogeable** | Explorer Span | Explorer Span et requêtes de traces |

**Remarque** : Les spans indexés indirectement conservés par les filtres de rétention au niveau de la trace (c'est-à-dire les spans qui ne correspondent pas directement à la requête mais qui appartiennent à des traces qui y correspondent) ne sont pas évalués par les [monitors d'analyse de traces][19].

### Filtres de rétention par défaut {#default-retention-filters}

Les filtres de rétention suivants sont activés par défaut : 
- Le filtre de rétention `Error Default` indexe les spans d'erreur avec `status:error`. Le taux de rétention et la requête sont configurables. Par exemple, pour capturer les erreurs de production, définissez la requête sur `status:error, env:production`. Désactivez le filtre de rétention si vous ne souhaitez pas capturer les erreurs par défaut.
- Le filtre de rétention `App and API Protection Default` est activé si vous utilisez [App and API Protection][16]. Il garantit la rétention de tous les spans dans les traces qui ont été identifiées comme ayant un impact sur la sécurité des applications (une tentative d'attaque).
- Le `Synthetics Default` filtre de rétention est activé si vous utilisez Synthetic Monitoring. Il garantit que les traces générées à partir de tests Synthetic d'API et de navigateur restent disponibles par défaut. Consultez [Synthetic APM][15] pour plus d'informations, notamment sur la façon de corréler les traces avec les tests Synthetic.
- Le `Dynamic Instrumentation Default` filtre de rétention est activé si vous utilisez [Dynamic Instrumentation][17]. Il garantit que les spans créés dynamiquement avec Dynamic Instrumentation restent disponibles à long terme par défaut.

### Filtre de rétention intelligent de Datadog {#datadog-intelligent-retention-filter}

Le filtre de rétention intelligent de Datadog est toujours actif pour vos services et conserve une sélection représentative de traces sans que vous ayez à créer des dizaines de filtres de rétention personnalisés. Il se compose de : 
- [Échantillonnage par diversité](#diversity-sampling)
- [Échantillonnage uniforme à un pour cent](#one-percent-flat-sampling)

**Remarque :** Les [requêtes de traces][11] sont basées sur les données indexées par le filtre de rétention intelligent.

Les spans indexés par le filtre de rétention intelligent (échantillonnage par diversité et échantillonnage uniforme à 1 %) **ne sont pas comptabilisés dans l'utilisation** des spans indexés et **n'ont donc pas d'impact sur votre facture**.

Si vous souhaitez indexer davantage de spans pour des tags ou attributs spécifiques que ce que conserve le filtre de rétention intelligent, [créez votre propre filtre de rétention](#create-your-own-retention-filter).

#### Échantillonnage par diversité {#diversity-sampling}

L'échantillonnage par diversité analyse les **spans d'entrée de service** et conserve pendant 30 jours :

- Au moins un span (et la trace associée) pour chaque combinaison d'environnement, de service, d'opération et de ressource toutes les 15 minutes au maximum, afin de garantir que vous puissiez toujours trouver des exemples de traces dans les pages [service][9] et [ressource][10], même pour les endpoints à faible trafic.
- Les spans à latence élevée pour les `p75`, `p90` et `p95` percentiles (et la trace associée) pour chaque combinaison d'environnement, de service, d'opération et de ressource.
- Une sélection représentative d'erreurs, garantissant la diversité des erreurs (par exemple, les codes d'état de réponse 400, 500).

L'ensemble des données capturées par l'échantillonnage par diversité n'est pas échantillonné uniformément (c'est-à-dire qu'il n'est pas proportionnellement représentatif du trafic complet). Il est biaisé en faveur des erreurs et des traces à latence élevée. 

#### Échantillonnage uniforme de 1 % {#one-percent-flat-sampling}

L'échantillonnage uniforme de 1 % capture :
1. Toutes les **traces corrélées avec 1 % des sessions RUM ingérées ayant des traces ingérées**, garantissant que vous pouvez toujours trouver des sessions indexées associées à des données de trace. Cela améliore la [corrélation entre APM et RUM][20], vous permettant de déboguer les problèmes des utilisateurs en visualisant simultanément les sessions frontend et les traces backend. L'échantillon est appliqué en fonction du `session_id`, ce qui signifie que toutes les traces liées à la même session RUM partagent une décision d'indexation cohérente.
2. Un **échantillon uniforme de 1 %** des [spans ingérés][12], appliqué en fonction du `trace_id` afin que tous les spans de la même trace partagent la même décision d'échantillonnage. Utilisez cet échantillon pour la surveillance générale de l'état du système et l'analyse des tendances.

Ce mécanisme d'échantillonnage est uniforme et proportionnellement représentatif du trafic total ingéré. Par conséquent, les services et endpoints à faible trafic pourraient être absents de cet ensemble de données si vous filtrez sur une courte période.

### Créez votre propre filtre de rétention {#create-your-own-retention-filter}

Créez des filtres de rétention personnalisés pour conserver des données de trace spécifiques pendant 15 jours. Utilisez n'importe quel tag ou attribut de span dans la requête de filtre pour cibler et conserver les spans les plus importants pour votre activité. 

Par exemple, vous pouvez créer des filtres pour conserver toutes les traces correspondant aux critères suivants :

- Transactions par carte de crédit supérieures à 100 $ : `@transaction_amount:>100`
- Spans d'opération de paiement ayant une durée supérieure à 2 secondes dans l'environnement de production : `resource_name:"GET /checkout" @duration:>2s env:prod`
- Versions spécifiques d'une application de service de livraison en ligne : `service:delivery-api @version:v2.0`

Lorsque vous indexez un span à l'aide d'un filtre de rétention :

- **Recherchabilité** : Le span indexé peut être trouvé dans Trace Explorer, dashboards et surveillé pendant 15 jours.

- **Contexte de visualisation** : Lorsque vous cliquez sur un span indexé dans Trace Explorer, vous voyez toujours son contexte de trace complet (tous les spans parents et enfants) dans une vue flamegraph ou waterfall, que ces autres spans aient été indexés ou non.

- **Contexte de recherche** : Bien que vous puissiez visualiser une trace complète, seuls les spans spécifiquement indexés par des filtres de rétention seront interrogeables dans Trace Explorer.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_create.png" style="width:90%;" alt="Créer un filtre de rétention">}}

Pour créer un filtre de rétention :
1. Accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}}][18].
1. Cliquez sur {{< ui >}}Add Retention Filter{{< /ui >}}.
1. Définissez le {{< ui >}}Retention Query{{< /ui >}} pour cibler les spans que vous souhaitez conserver. Utilisez n'importe quel span ou attribut pour filtrer les spans, comme vous écririez une requête dans [Trace Explorer][7].
1. Définissez un {{< ui >}}Span rate{{< /ui >}} pour définir le pourcentage de spans correspondant à cette requête qui doivent être indexés.
1. Optionnellement, définissez un {{< ui >}}Trace rate{{< /ui >}} pour définir le pourcentage de traces complètes associées aux spans qui doivent être indexés. Cela garantit que les autres spans des traces associées au span ciblé par la requête de rétention sont également indexés, afin que les données indexées puissent être interrogées dans [Trace Queries][11]. 
1. Définissez un nom pour le filtre.
1. Cliquez sur {{< ui >}}Add Filter{{< /ui >}} pour enregistrer le filtre.

<div class="alert alert-warning">La configuration d'un taux de traces peut augmenter considérablement votre utilisation des spans indexés.</div>

Par exemple, si vous configurez un filtre de rétention pour indexer les spans de `service:my-service` :
- La configuration d'un taux de spans de `50%` permet de garantir qu'environ 50 % des traces contenant des spans correspondant à `service:my-service` sont sélectionnées. Pour les traces sélectionnées, tous les spans correspondant à `service:my-service` sont indexés.
- La configuration d'un taux de traces de `10%` permet de garantir que 10 % des traces sélectionnées par le taux de spans sont entièrement indexées. Pour ces traces, tous les spans de la trace (et pas seulement ceux de `service:my-service`) sont indexés. En supposant que les traces comportent 100 spans en moyenne et 5 spans de `service:my-service`, la configuration d'un taux de traces indexe les 95 spans restants de la trace pour le pourcentage configuré de traces sélectionnées.
- Le taux de spans est évalué en premier, et le taux de traces est appliqué uniquement aux traces sélectionnées par le taux de spans.

Lorsque vous créez un filtre ou modifiez le taux de rétention d'un filtre existant, Datadog affiche une estimation du changement de volume d'indexation global sous la forme d'un pourcentage.

Les filtres sont conservés dans un ordre sériel. Si vous avez un filtre en amont qui conserve les spans avec le tag `resource:POST /hello_world`, ces spans n'apparaissent pas dans la fenêtre {{< ui >}}Edit{{< /ui >}} d'un filtre en aval qui recherche des spans avec le même tag car ils ont été conservés par le filtre en amont.

## Recherche et analyse de traces sur des spans indexés {#trace-search-and-analytics-on-indexed-spans}

### Dans Trace Explorer, dashboards et notebooks {#in-the-trace-explorer-dashboards-and-notebooks}

Par défaut, les spans indexés par des filtres de rétention personnalisés **et** le filtre de rétention intelligent sont inclus dans les [vues agrégées][6] de Trace Explorer (série temporelle, top list, tableau), ainsi que dans les requêtes des dashboards et des notebooks.


L'attribut `retained_by` est présent sur tous les spans conservés. Sa valeur est : 
- `retained_by:retention_filter` si le span a été capturé par un [filtre de rétention personnalisé](#create-your-own-retention-filter), y compris les [filtres de rétention par défaut](#default-retention-filters) et si **aucun taux de traces** n'a été configuré. Ces spans ne sont pas inclus dans Trace Queries, car Trace Queries nécessitent que tous les spans d'une trace soient indexés.
- `retained_by:trace_retention_filter` si le span est capturé par un filtre de rétention pour lequel un taux de traces a été configuré.
- `retained_by:diversity_sampling` si le span a été capturé par [l'échantillonnage par diversité](#diversity-sampling) (qui fait partie du [filtre de rétention intelligent](#datadog-intelligent-retention-filter)).
- `retained_by:flat_sampled` si le span a été indexé par [1% flat sampling](#one-percent-flat-sampling). Filtrer davantage par motif de rétention :
  - `@retention_reason:rum` pour les traces liées à des sessions RUM échantillonnées sur la base du `session_id`. Utilisez ceci pour analyser les traces corrélées aux sessions utilisateur.
  - `@retention_reason:trace` pour les traces échantillonnées uniformément sur la base du `trace_id`. Utilisez ceci pour les tendances de performance générales et l'analyse à l'échelle du système.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/trace_analytics.png" style="width:100%;" alt="Facette Retained By" >}}

### Dans les Trace Analytics monitors {#in-trace-analytics-monitors}

Les spans indexés par le filtre de rétention intelligent sont **exclus** de l'évaluation des monitors d'analyse de traces APM.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/
[2]: /fr/tracing/trace_pipeline/metrics
[3]: https://app.datadoghq.com/apm/traces/retention-filters
[4]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[5]: /fr/tracing/glossary/#service-entry-span
[6]: /fr/tracing/trace_explorer/?tab=timeseriesview#indexed-spans-search-with-15-day-retention
[7]: /fr/tracing/trace_explorer/?tab=listview#indexed-spans-search-with-15-day-retention
[8]: /fr/tracing/glossary/#trace-root-span
[9]: /fr/tracing/services/service_page/
[10]: /fr/tracing/services/resource_page/
[11]: /fr/tracing/trace_explorer/trace_queries
[12]: /fr/tracing/trace_pipeline/ingestion_controls/
[13]: /fr/tracing/trace_explorer/
[14]: /fr/monitors/types/apm/?tab=traceanalytics
[15]: /fr/synthetics/apm/
[16]: /fr/security/application_security/
[17]: /fr/dynamic_instrumentation/
[18]: https://app.datadoghq.com/apm/traces/retention-filters
[19]: /fr/monitors/types/apm/?tab=traceanalytics
[20]: /fr/tracing/other_telemetry/rum/