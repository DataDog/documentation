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
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centre d'apprentissage
  text: Démarrer avec les métriques et les traces APM
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: Centre d'apprentissage
  text: Diagnostiquer les bugs d'application avec Datadog APM
title: Trace Explorer
---
{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## Présentation {#overview}

Le [Trace Explorer][1] vous permet de rechercher tous les spans ingérés ou indexés en utilisant n'importe quel tag sur n'importe quel span. Les spans trouvés par votre requête changent selon que vous effectuez une recherche en direct (tous les spans ingérés au cours des 15 dernières minutes, en continu) ou parmi les spans indexés (spans conservés pendant 15 jours par vos filtres personnalisés).

Les applications instrumentées envoient des traces à Datadog en fonction de vos [contrôles d'ingestion][2] configurés. Les traces ingérées sont disponibles en tant que traces en direct pour une fenêtre glissante de 15 minutes.

Le Trace Explorer affiche un indicateur {{< ui >}}Live Search - All ingested data{{< /ui >}} lorsque vous êtes en mode en direct :

{{< img src="tracing/trace_explorer/live_search.png" alt="Indicateur de recherche en direct" style="width:75%;" >}}

Toutes les traces ingérées passent ensuite par :
- [Filtres de rétention personnalisés][3] que vous pouvez créer pour déterminer quels spans indexer. Une fois indexées via un filtre de rétention personnalisé, les traces sont conservées pendant **15 jours**.
- Le [filtre de rétention intelligent][4] par défaut qui conserve un ensemble diversifié de traces. Lorsqu'elles sont indexées via le filtre de rétention intelligent, les traces sont conservées pendant **30 jours**.

Le Trace Explorer affiche un indicateur {{< ui >}}Search - Only Indexed Data{{< /ui >}} lorsque vous recherchez des [spans indexés][5] :

{{< img src="tracing/trace_explorer/historical_search.png" alt="Indicateur de données uniquement indexées" style="width:75%;" >}}

La recherche en direct est la vue par défaut sur la page Traces. Passez de la recherche en direct à la recherche de données indexées en utilisant le sélecteur de temps dans le coin supérieur droit.

### Modèles de traces {#trace-patterns}

{{< callout url="https://www.datadoghq.com/product-preview/apm-trace-patterns/" btn_hidden="false" header="Rejoignez la Preview !" >}}
Les modèles de traces sont en préversion. Utilisez ce formulaire pour soumettre votre demande dès aujourd'hui.
{{< /callout >}}

Les modèles de traces regroupent les spans présentant une structure et des attributs similaires en motifs récurrents, vous permettant ainsi d'analyser le comportement sur des milliers de traces simultanément plutôt que de les examiner individuellement. Utilisez les modèles de traces lorsqu'une requête renvoie trop de spans pour être analysés trace par trace, par exemple pour découvrir quelles formes d'erreur sont nouvelles cette semaine ou quels modèles de latence ont changé après un déploiement. 

### Contrôle du volume de traces {#trace-volume-control}

Vous pouvez personnaliser les paramètres [de rétention et d'ingestion][6] afin d'envoyer et de conserver uniquement les données qui vous intéressent.

#### Ingestion {#ingestion}

Contrôlez l'ensemble de votre volume avec les [options de configuration du Datadog Agent][7] ou définissez des [règles d'ingestion][8] précises pour chaque service instrumenté avec Datadog APM.


#### Indexation {#indexing}

Après avoir instrumenté vos services et ingéré des traces, définissez des [filtres de rétention][3] basés sur des tags dans l'application Datadog pour que Datadog conserve uniquement les spans qui vous intéressent.

**Remarque :** Les spans ingérés et indexés peuvent avoir un impact sur votre facture. Pour plus d'informations, consultez [APM Billing][9].

## Recherche en direct pendant 15 minutes {#live-search-for-15-minutes}

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Recherche en direct" >}}

Lorsque vous utilisez la recherche en direct, Datadog affiche les spans dès qu'ils sont envoyés par le Datadog Agent et avant qu'ils ne soient indexés par vos filtres de rétention. Tous les spans ingérés sont disponibles pour les 15 dernières minutes (fenêtre glissante), affichés sans aucun échantillonnage.

{{< tabs >}}
{{% tab "Vue liste" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Vue liste de la recherche en direct" video="true" >}}

Avec la {{< ui >}}List view{{< /ui >}}, vous pouvez :

- Surveillez si un nouveau déploiement s'est bien déroulé en filtrant sur `version_id` de tous les tags.
- Afficher des informations liées aux pannes en temps réel en recherchant dans 100 % des traces ingérées un `org_id` ou `customer_id` particulier associé à un span enfant problématique.
- Vérifier si un processus a correctement démarré en saisissant `process_id` et en utilisant la saisie semi-automatique pour le nouvel ID de processus en tant que tag sur les spans enfants.
- Surveiller les tests de charge et l'impact sur les performances de vos endpoints en filtrant sur la durée d'une ressource enfant.
- Exécuter des requêtes de recherche en un clic sur n'importe quelle span ou tag directement depuis la vue du panneau des traces.
- Ajouter, supprimer et trier les colonnes des tags de span pour une vue personnalisée.

Le nombre de spans reçus par seconde est affiché en haut du tableau des traces. Comme un flux de milliers de spans par seconde n'est pas lisible par l'homme, les flux de spans à haut débit affichent certains spans pour une meilleure clarté visuelle. Vous pouvez rechercher tous les spans disponibles dans la requête de recherche. Utilisez les fonctionnalités de filtrage de la barre de recherche Live Search pour filtrer le flux de spans et le bouton {{< ui >}}Pause/Play{{< /ui >}} en haut à droite de l'écran pour mettre en pause ou reprendre le flux.

{{< img src="tracing/live_search/play-pause-button.png" alt="Mettre en pause ou lire le flux en direct" style="width:75%;" >}}

**Remarque** : La sélection d'un span met en pause le flux et affiche plus de détails sur le span sélectionné dans le panneau latéral des traces.

{{% /tab %}}
{{% tab "Vue séries temporelles" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Vue séries temporelles de Live Search" video="true" >}}

Visualisez vos spans sous forme de séries temporelles au lieu d'une liste en utilisant {{< ui >}}Timeseries view{{< /ui >}}. La vue Séries temporelles de Live Search est utile pour représenter graphiquement les requêtes ou les erreurs qui correspondent à des critères spécifiés, tels que :

- Les erreurs pour le service et l'endpoint `ShoppingCart##checkout`, avec une valeur de panier d'au moins `$100`, avec la possibilité de visualiser individuellement les traces correspondant à ces critères.

- Surveillez un déploiement canary d'une mise à jour d'application critique en temps réel.

- Comparez la latence entre les régions géographiques en fonction de la dernière version de votre application iOS.

En plus de visualiser les requêtes qui correspondent à vos recherches sous forme de série temporelle, vous pouvez consulter les clients, zones de disponibilités ou autres tags les plus affectés sous forme de Top List pendant une panne ou une enquête.

**Remarque :** L'exportation vers des dashboards et des monitors n'est possible qu'en utilisant des spans conservés.

{{% /tab %}}
{{< /tabs >}}

### Filtrage {#filtering}

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="Recherche dans tous les spans" video="true" >}}

Une requête valide dans la barre de recherche affiche les traces qui correspondent à vos critères de recherche dans **tous les spans**. La syntaxe de recherche est la même dans les vues Live Search que dans les autres vues de traces, mais ici, votre requête est comparée à toutes les traces ingérées sur **n'importe quel span** et **n'importe quel tag**, et pas seulement celles indexées.

Vous pouvez choisir d'interroger les [spans d'entrée de service][10], les [spans racines][11], ou tous les spans en modifiant la sélection dans la boîte au-dessus du tableau des traces. Utilisez cette fonctionnalité sur les applications à fort trafic pour réduire le nombre de spans affichés et ne voir que les spans de point d'entrée des services ou le point d'entrée de la trace. La sélection de cette case filtre uniquement les spans affichés dans la liste ; les autres sont toujours visibles dans le graphique en flamme lorsque vous cliquez sur un span pour afficher les détails de la trace.

Vous pouvez également filtrer sur des attributs qui ne sont pas définis comme des facettes. Par exemple, pour filtrer sur l'attribut `cart.value`, il existe deux options :

- Cliquez sur l'attribut `cart.value` dans le panneau des détails de la trace et ajoutez-le à la requête de recherche :
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="Ajout d'un attribut à la requête" video="true" >}}

- Filtrez sur tous les spans avec un attribut `cart.value` en saisissant « cart.value » dans la barre de recherche :
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Filtre de recherche en temps réel par attribut" video="true" >}}

### Analyse des anomalies avec des insights intégrés {#analyzing-anomalies-with-integrated-insights}

Le Trace Explorer combine la détection automatisée des singularités par Watchdog et l'analyse de tags pour vous aider à identifier rapidement la cause profonde des problèmes. Lorsque Watchdog détecte des tags statistiquement surreprésentés dans les erreurs ou les spans à latence élevée, ces insights sont affichés à plusieurs endroits :

- **Suggestions de recherche** : Lorsque vous tapez dans la barre de recherche, les tags de singularité apparaissent sous forme de suggestions avec un indicateur montrant qu'ils sont corrélés à des erreurs ou à des problèmes de latence.
- **Recommandations de regroupement** : Lors de la sélection d'attributs pour le regroupement, les facettes de singularité sont mises en surbrillance pour guider votre investigation.
- **Barre latérale des facettes** : Les tags aberrants sont promus en haut de la liste des facettes dans une section dédiée « OUTLIERS ».
- **Métriques RED** : Le bouton « Analyze » situé à côté des graphiques d'erreur et de latence est mis en surbrillance lorsque des singularités pertinentes sont détectées.

{{< img src="tracing/trace_explorer/visualize/trace_explorer_outliers.mp4" alt="Analyse des anomalies avec des insights intégrés." video="true" >}}

<div class="alert alert-tip">Lorsque vous triez la liste des traces par <strong>Durée</strong>, cliquez sur <strong>Investiguer avec Bits AI</strong> pour lancer une investigation automatisée de la latence. Bits AI analyse les goulots d'étranglement et la divergence des tags dans les traces affichées. Pour plus d'informations, consultez <a href="/bits_ai/bits_chat/">Bits Chat</a>.</div>

## Recherche de spans indexés avec une rétention de 15 jours {#indexed-spans-search-with-15-day-retention}

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Recherche indexée" >}}

Vous pouvez effectuer des recherches dans les traces conservées de la même manière que pour une recherche en temps réel. Pour passer de la recherche de données en temps réel à la recherche de données conservées, modifiez le sélecteur de temps pour une période supérieure à 15 minutes. Tous les spans indexés par les filtres de rétention sont accessibles depuis la recherche. Ces spans sont conservés par Datadog pendant 15 jours après avoir été indexés par un filtre de rétention.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="Recherche de traces conservées" video="true" >}}

{{< tabs >}}
{{% tab "Vue liste" %}}

Tous les spans indexés par des filtres de rétention personnalisés *et* par le filtre de rétention intelligent peuvent être recherchés dans la vue Liste. Cependant, si vous filtrez par un tag qui n'apparaît que sur des spans non indexés par un filtre de rétention, votre recherche ne renvoie aucun résultat, contrairement à l'utilisation de [Live Search](#live-search-for-15-minutes).

{{% /tab %}}
{{% tab "Vue séries temporelles" %}}

Toutes les spans indexées par des filtres de rétention personnalisés ou par le filtre de rétention intelligent peuvent être recherchées via l'analyse de traces.

Lorsque la vue sous forme de Série temporelle est activée, exportez votre requête vers un [dashboard][1], un [monitor][2] ou un [notebook][3] pour effectuer une analyse plus poussée ou pour recevoir automatiquement une alerte lorsqu'un nombre agrégé de spans dépasse un certain seuil.

**Remarque** : les spans indexés par le filtre de rétention intelligent sont exclus des évaluations des monitors d'analyse de traces APM. Pour plus d'informations, consultez [Rétention des traces][4].

[1]: /fr/dashboards/widgets/timeseries/
[2]: /fr/monitors/types/apm/?tab=analytics
[3]: /fr/notebooks
[4]: /fr/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### Configuration de la rétention {#retention-configuration}

Vous pouvez personnaliser les spans conservés et leurs taux de rétention. Par défaut, [le filtre de rétention intelligent Datadog][4] est appliqué, ce qui conserve automatiquement les traces présentant une diversité d'erreurs et de latence, ainsi que les ressources à faible débit. Pour en savoir plus sur le filtre de rétention intelligent par défaut et sur la façon de créer vos propres filtres supplémentaires, consultez la [documentation sur les filtres de rétention][3]. Accédez à la [page Filtres de rétention][12] dans l'application Datadog pour créer ou modifier vos propres filtres.

## Pour aller plus loin {#further-reading}

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
[10]: /fr/glossary/#service-entry-span
[11]: /fr/glossary/#trace-root-span
[12]: https://app.datadoghq.com/apm/traces/retention-filters