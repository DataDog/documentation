---
title: Tracing without Limits
kind: documentation
description: "Documentation bêta pour Live Analytics, les règles d'ingestion et les filtres de rétention."
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Chemin du tracing" >}}

## Présentation de la fonctionnalité Tracing without Limits

<div class="alert alert-warning">
Si vous utilisez la version bêta de Live Analytics, des règles d'ingestion et des filtres de rétention personnalisés, suivez ces instructions au lieu du <a href="https://docs.datadoghq.com/tracing/guide/trace_sampling_and_storage/?tab=java#echantillonnage-de-traces">guide d'échantillonnage de traces</a>.
</div>

La fonctionnalité [Analyse et recherche de traces][1] vous permet de rechercher parmi toutes les spans ingérées ou indexées à l'aide de n'importe quel tag sur n'importe quelle span. Les données utilisées pour vos requêtes dépendent du mode sélectionné : Live (15 dernières minutes) ou Historical (toutes les spans indexées).

Les données Live regroupent toutes les [spans ingérées](#controles-de-l-ingestion) et sont disponibles en temps réel pour les 15 dernières minutes. L'interface Datadog affiche également un indicateur « Live » à côté du sélecteur de temps lorsque vous êtes en mode Live. Les données Historical regroupent toutes les [spans indexées](#controles-de-l-indexation). Vous pouvez personnaliser les paramètres [d'ingestion et d'indexation](#presentation-de-l-ingestion-et-de-l-indexation).

Envoyez et conservez uniquement les spans qui vous intéressent. Lorsqu'une span est indexée, l'intégralité de la trace associée est automatiquement conservée pour un affichage exhaustif dans Datadog.


### Mode Live Search

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Chemin du tracing" >}}

En mode Live Search, Datadog affiche les spans dès qu'elles sont envoyées par l'Agent Datadog et avant qu'elles soient indexées par Datadog, et les spans sont disponibles pendant 15 minutes. Toutes les spans ingérées par Datadog sont affichées sans aucun échantillonnage (Tracing without Limits™). La page APM Live Search vous permet d'effectuer les actions suivantes :

- Rédiger des requêtes de recherche pour affiner le flux de traces à l'aide de n'importe quel tag sur n'importe quelle span. Par exemple, vous pouvez surveiller le bon déroulement d'un nouveau déploiement en recherchant l'attribut `version_id` de tous les tags.
- Visualiser la totalité des spans de trace au fur et à mesure de leur ingestion. Par exemple, vous pouvez visualiser en temps réel les informations sur les pannes pour un `org_id` ou `customer_id` spécifique associé à une span enfant. Notez qu'aucun échantillonnage n'est effectué sur les spans ingérées au cours des 15 dernières minutes.
- Créer des requêtes de recherche avec autocomplétion en temps réel. Par exemple, pour vérifier si un processus a correctement démarré, saisissez l'attribut `process_id` d'un tag de span enfant : l'ID apparaît alors automatiquement.
- Visualiser des métriques RED clés sous forme de séries temporelles mises à jour en temps réel : requêtes par seconde, erreurs et latence. Par exemple, surveillez l'impact des tests de charge sur vos endpoints en filtrant les métriques en fonction de la durée d'une ressource enfant.
- Appliquer des requêtes de recherche en un seul clic sur n'importe quel tag ou span directement à partir du volet des traces.
- Ajouter, supprimer et trier des colonnes à partir des tags de span pour obtenir un affichage personnalisé.

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

Le nombre de spans reçues par seconde est affiché en haut du tableau des traces, ainsi que la fréquence d'échantillonnage. Étant donné qu'un flux de milliers de spans par seconde est difficilement lisible, les flux de spans à haut volume sont échantillonnés, mais il est tout de même possible d'y effectuer des recherches. Utilisez les fonctions de filtrage de la barre de requête Live Search pour filtrer le flux de spans et le bouton **Pause/Play** en haut à droite pour interrompre ou relancer le flux.

Le mode Live Search est l'affichage par défaut sur la page Traces. Lorsque vous êtes en mode Historical, vous pouvez choisir l'option **LIVE** dans le sélecteur d'intervalle pour passer au mode Live Search pour les 15 dernières minutes.

**Remarque** : lorsque vous sélectionnez une span, le flux s'interrompt et les détails de la span sélectionnée s'affichent dans le volet latéral de la trace.

### Filtrer le flux de traces avec une requête de recherche
{{< img src="tracing/live_search/toplevespan.gif" alt="Requête Live Search" >}}

Définissez une requête valide dans la barre de recherche pour afficher les traces qui correspondent à vos critères de recherche pour **toutes les spans**. La syntaxe de recherche de la vue Live Search est la même que celle des autres vues de trace. Toutefois, avec la vue Live Search, la recherche se fait dans toutes les traces ingérées, pour n'importe quel tag et span, et non pas uniquement dans celles qui ont été indexées.

**Remarque** : vous avez la possibilité de sélectionner uniquement les spans de premier niveau du service en cochant la case `top-level spans of the service` située au-dessus du tableau des traces. Utilisez cette fonction sur les applications à trafic élevé pour réduire le nombre de spans affichées et ne visualiser que les spans de point d'entrée des services. Lorsque vous cochez cette case, les spans affichées ne sont filtrées que _visuellement_ ; toutes les spans restent présentes.

Vous pouvez également rechercher des attributs qui ne sont pas définis en tant que facettes. Par exemple, pour rechercher l'attribut `customer.id`, deux options sont possibles :

- Cliquez sur l'attribut dans le volet des traces et ajoutez-le à la requête de recherche `@customer.id:584959`.
{{< img src="tracing/live_search/livesearch_query2.png" alt="Filtre Live Search" >}}


- Recherchez toutes les spans avec un attribut `customer.id` en saisissant « customer.id » dans la barre de requête de recherche : `@customer.id:584959`
{{< img src="tracing/live_search/livesearch_query1.png" alt="Filtre Live Search" >}}

### Mode Historical Search

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Chemin du tracing" >}}

Le mode Historical Search est accessible de la même façon que le mode Live Search. Pour passer du mode Live au mode Historical, utilisez le sélecteur d'intervalle pour choisir une durée supérieure à 15 minutes. Les données ne seront plus recherchées dans le mode Live Search mais dans les spans indexées.

En mode Historical Search, les données sont recherchées dans les spans indexées ainsi que dans les spans racine des traces comportant au moins une span indexée. Ces spans sont conservées par Datadog pendant les 15 jours suivant l'indexation.

{{< img src="tracing/live_search/livesearch_mode.gif" alt="Mode Live Search" >}}

**Remarque :** l'intégralité de la trace associée s'affiche lorsque vous consultez le flamegraph associé à une span indexée, mais seules les spans indexées peuvent être recherchées en mode Historical Search.

Par exemple, si vous filtrez en fonction d'un tag qui figure uniquement dans des spans non indexées, votre recherche n'affichera aucun résultat.

Vous pouvez personnaliser les spans qui sont indexées et leurs taux de rétention. Par défaut, l'[échantillonnage intelligent de Datadog](#filtre-d-echantillonnage-intelligent-de-datadog) est appliqué pour décider des spans à indexer, et ce sont ces spans qui sont utilisées pour les requêtes Historical. Pour en savoir plus sur le filtre de rétention des spans par défaut et découvrir comment créer vos propres filtres, consultez la section [Indexation](#controles-de-l-indexation) de cette page, ou la page d'[indexation des spans][2] dans Datadog.

### Mode Live Analytics

<div class="alert alert-warning">
Ces fonctionnalités sont actuellement en version bêta privée. <a href="https://forms.gle/1FParyX49eNFPDsg9">Remplissez le formulaire</a> pour demander à être ajouté à la bêta.
</div>

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Chemin du tracing" >}}

Avec le mode Live Analytics, vous pouvez effectuer des analyses sur 100 % de vos traces ingérées au cours des 15 dernières minutes. Ce mode permet de représenter graphiquement les requêtes ou les erreurs qui correspondent aux critères spécifiés, comme les erreurs pour le service et l'endpoint `ShoppingCart##checkout` avec un panier d'au moins `$100`. Vous pouvez également accéder directement aux traces qui correspondent à ces critères.

En plus d'analyser les requêtes qui correspondent à des queries arbitraires, Live Analytics vous permet de visualiser une Top List des clients les plus affectés, des zones de disponibilité ou de tout autre tag pendant une panne ou une enquête.

Avec Live Analytics, chaque tag de chaque span ingérée sur la période mobile de 15 minutes peut être utilisé dans une requête.

{{< img src="tracing/live_search/LiveAnalytics2.mp4" alt="Live Analytics" video=true >}}

**Remarque :** l'exportation vers un dashboard ou un monitor est uniquement possible en mode Historical.

### Mode Historical Analytics

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Chemin du tracing" >}}

Le mode Historical Analytics est accessible de la même façon que le mode Live Search. Pour passer du mode Live au mode Historical Analytics, utilisez le sélecteur d'intervalle pour choisir une durée supérieure à 15 minutes. Les données ne seront plus recherchées dans les spans indexées, et elles ne seront plus présentées sous forme de flux mis à jour en temps réel.

La span racine de toutes les traces comportant au moins une span indexée est indexée. Cela signifie que vous pouvez rechercher les tags dans la span racine ou dans les spans enfants indexées. Ces spans sont conservées par Datadog pendant les 15 jours suivant leur indexation.

**Remarque :** l'intégralité de la trace associée s'affiche lorsque vous consultez le flamegraph associé à une span indexée, mais seules les spans indexées peuvent être recherchées.

{{< img src="tracing/live_search/HistoricalAnalytics2.gif" alt="Historical Analytics" >}}

**Remarque :** seules les spans indexées peuvent être recherchées en mode Historical Analytics.

Vous pouvez personnaliser les spans qui sont indexées et leurs taux de rétention. Par défaut, l'échantillonnage intelligent de Datadog est appliqué pour décider des spans à indexer, et ce sont ces spans qui sont utilisées pour les requêtes Historical. Pour en savoir plus sur le filtre de rétention des spans par défaut et découvrir comment créer vos propres filtres, consultez la section [Indexation][3].

## Présentation de la fonctionnalité Ingestion et indexation

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Chemin du tracing" >}}

Avec Tracing without Limits™, l'ingestion de traces dans Datadog et l'indexation de ces traces pendant 15 jours sont totalement personnalisables.

<div class="alert alert-warning">
Ces fonctionnalités sont actuellement en version bêta. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> pour être ajouté à la version bêta.
</div>

### Contrôles de l'ingestion

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Chemin du tracing" >}}

Les contrôles de l'ingestion affectent les données qui sont envoyées à Datadog par vos applications.

#### Ingestion de spans

{{< img src="tracing/trace_indexing_and_ingestion/DataIngestion2.png" style="width:100%;" alt="Ingestion de données" >}}

De nombreux services instrumentés envoient 100 % de leur trafic à Datadog par défaut. Les services à haut volume ou ceux dont le trafic est de nature intermittente auront davantage tendance à ne pas envoyer 100 % des spans par défaut.

**Remarque :** si vous constatez que le taux d'ingestion est inférieur à 100 %, vérifiez que vous utilisez l'Agent 6.19+ ou 7.19+, car le taux par défaut a été augmenté dans ces versions.

Dans l'application Datadog, la [vue Data Ingestion][4] affiche les informations suivantes :

| Colonne                | Données |
| ----------------------- | ---------- |
| Service                 | Le nom de chaque service instrumenté et qui envoie des traces à Datadog.   |
| Data Ingested             | Quantité de données ingérées par Datadog sur la période sélectionnée.      |
| Ingestion Rate                 | Un pourcentage de 0 à 100 % correspondant au nombre de spans produites par le service qui sont ingérées par Datadog. Tout nombre inférieur à 100 % signifie qu'un échantillonnage a lieu dans l'Agent Datadog avant l'ingestion.      |
| Status             | Affiche `Default`, sauf si ce paramètre est modifié via les instructions dans l'application pour configurer le traceur. Consultez [Modifier le taux d'ingestion par défaut](#modifier-le-taux-d-ingestion-par-défaut) pour en savoir plus.    |
| Requests/s                 |   Le nombre moyen de requêtes par seconde reçues par le service sur une période donnée. Les services avec un trafic intermittent ou un volume élevé auront davantage tendance à ne pas envoyer 100 % des spans par défaut.    |
| Spans Ingested            | Nombre de spans ingérées par Datadog sur la période sélectionnée.        |

#### Modifier le taux d'ingestion par défaut

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate2.gif" style="width:100%;" alt="Modifier le taux d'ingestion des données" >}}

Pour choisir d'envoyer un pourcentage spécifique du trafic d'un service, ajoutez un bloc de code généré à la configuration du traceur pour ce service.

1. Sélectionnez le service pour lequel vous souhaitez modifier le pourcentage de spans ingérées.
2. Choisissez le langage du service.
3. Choisissez le pourcentage d'ingestion désiré.
4. Appliquez la configuration appropriée générée à partir de ces choix pour le service indiqué, et redéployez-le.
5. Sur la page Data Ingestion, vérifiez que votre nouveau pourcentage a bien été appliqué.

### Contrôles de l'indexation

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Chemin du tracing" >}}

Les contrôles de l'indexation affectent les données stockées par Datadog pendant 15 jours.

#### Filtres de rétention

Une fois les spans ingérées par Datadog, celles-ci sont conservées pendant 15 jours selon les filtres d'indexation qui ont été définis sur votre compte. Par défaut, le seul filtre de rétention activé pour chaque service est le [filtre d'échantillonnage intelligent](#filtre-d-echantillonnage-intelligent-de-datadog), qui conserve les traces d'erreurs et les traces associées à différentes distributions de latence.

Vous pouvez également créer des [filtres de rétention basés sur des tags](#creer-votre-propre-filtre) pour vos services.

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexing2.png" style="width:100%;" alt="Indexation de spans" >}}

| Colonne                | Données |
| ----------------------- | ---------- |
| Filter Name                | Le nom de chaque filtre utilisé pour indexer les spans. Par défaut, le seul filtre appliqué est l'[échantillonnage intelligent de Datadog](#filtre-d-echantillonnage-intelligent-de-datadog).   |
| Filter Query             | La requête basée sur des tags pour chaque filtre.      |
| Retention Rate                | Un pourcentage de 0 à 100 % correspondant au nombre de spans qui seront indexées par Datadog. |
| Spans Indexed             | Le nombre de spans indexées par le filtre sur la période sélectionnée.   |
| Bouton activé                 |  Permet l'activation et la désactivation des filtres.  |

#### Filtre d'échantillonnage intelligent de Datadog

L'échantillonnage intelligent est toujours actif pour vos services. Il conserve un assortiment de traces pour vous aider à surveiller la santé de vos applications.

L'échantillonnage intelligent conserve :

 - Les erreurs, y compris la diversité des erreurs (codes de réponse 400, 500, etc.).
 - Les latences élevées dans les différents quartiles `p75`, `p90`, `p95`.
 - Des traces historiques associées à toutes les ressources, quel que soit leur trafic, pour l'intervalle sélectionné.
 - La trace de durée maximale réelle pour chaque intervalle.

#### Créer votre propre filtre

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.gif" style="width:100%;" alt="Indexation de spans" >}}

Pour personnaliser les spans indexées et conservées pendant 15 jours, vous pouvez créer, modifier et désactiver des filtres supplémentaires en fonction de tags, et définir le pourcentage de spans à conserver pour chaque filtre. Lorsqu'une span est conservée, la trace correspondante est également enregistrée, et vous pouvez cliquer sur une span pour obtenir l'intégralité du contexte de la trace. Pour effectuer une recherche par tag en [mode Historical][3], la span contenant le tag en question doit toutefois avoir été indexée.

1. Donnez un nom à votre filtre.
2. Définissez les tags qui doivent TOUS être appliqués à une span pour qu'elle soit indexée.
3. Définissez le pourcentage de spans correspondant à ces tags devant être indexées.
4. Enregistrez votre nouveau filtre.

## Présentation des métriques d'utilisation


Si, lorsque vous surveillez votre utilisation de l'APM et de l'indexation, les chiffres ne correspondent pas à vos attentes, ou que vous souhaitez modifier vos taux d'ingestion ou d'indexation, consultez la documentation sur l'[Indexation](#controles-de-l-indexation) ou sur l'[Ingestion](#controles-de-l-ingestion).

### Dashboard de l'utilisation
{{< img src="tracing/trace_indexing_and_ingestion/AppAnalyticsDashboard.png" style="width:100%;" alt="Dashboard des spans indexées" >}}

Datadog propose un [Dashboard d'utilisation][3] par défaut pour vous permettre de surveiller votre utilisation de l'APM, ainsi que vos spans ingérées et indexées.

Pour créer un dashboard ou un monitor personnalisé, les métriques clés à utiliser sont les suivantes :

 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

### Spans indexées

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexing2.png" style="width:100%;" alt="Indexation de spans" >}}

Chaque filtre de rétention défini sur vos services, y compris le [filtre d'échantillonnage intelligent de Datadog](#filtre-d-echantillonnage-intelligent-de-datadog) par défaut, mène à une _augmentation_ du nombre de spans indexées pour votre compte Datadog.

Étant donné que les spans indexées peuvent avoir un impact sur votre facture, la colonne « Spans Indexed » apparaît à côté de chaque filtre défini. Celle-ci affiche le nombre de spans indexées en fonction de l'intervalle choisi pour ce filtre.

**Remarque :** lorsqu'il est utilisé seul, le filtre d'échantillonnage intelligent de Datadog ne génère pas de frais en dehors des spans indexées incluses avec votre offre APM.

**Remarque :** les droits administrateur sont requis pour créer, modifier ou désactiver des filtres d'indexation de spans.


[1]: https://app.datadoghq.com/apm/traces
[2]: https://app.datadoghq.com/apm/traces/retention-filters
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: https://app.datadoghq.com/apm/traces/data-ingestion
