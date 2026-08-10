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
  text: Premiers pas avec les métriques et traces APM
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: Centre d'apprentissage
  text: Diagnostic des bogues d'application avec Datadog APM
title: Trace Explorer
---
{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## Aperçu {#overview}

L'[Explorateur de traces][1] vous permet de rechercher tous les spans ingérés ou indexés en utilisant n'importe quelle balise sur n'importe quel span. Les spans trouvés par votre requête changent en fonction de si vous recherchez des spans en direct (tous les spans ingérés dans les 15 dernières minutes, en continu) ou des spans indexés (spans conservés pendant 15 jours par vos filtres personnalisés).

Les applications instrumentées envoient des traces à Datadog en fonction de vos [contrôles d'ingestion][2] configurés. Les traces ingérées sont disponibles en tant que traces en direct pour une fenêtre de 15 minutes.

L'Explorateur de traces affiche un indicateur **Recherche en direct - Toutes les données ingérées** chaque fois que vous êtes en mode Live :

{{< img src="tracing/trace_explorer/live_search.png" alt="Indicateur de recherche en direct" style="width:75%;" >}}

Toutes les traces ingérées passent ensuite par :
- [Filtres de rétention personnalisés][3] que vous pouvez créer pour déterminer quels spans indexer. Une fois indexées par un filtre de rétention personnalisé, les traces sont conservées pendant **15 jours**.
- Le [filtre de rétention intelligent][4] par défaut qui conserve un ensemble diversifié de traces. Lorsqu'elles sont indexées par le filtre de rétention intelligent, les traces sont conservées pendant **30 jours**.

L'Explorateur de traces affiche un indicateur **Recherche - Données uniquement indexées** chaque fois que vous recherchez des [spans indexés][5] :

{{< img src="tracing/trace_explorer/historical_search.png" alt="Indicateur de données uniquement indexées" style="width:75%;" >}}

La recherche en direct est la vue par défaut sur la page des traces. Passez de la recherche en direct à la recherche de données indexées en utilisant le sélecteur de temps dans le coin supérieur droit.

### Modèles de traces {#trace-patterns}

{{< callout url="https://www.datadoghq.com/product-preview/apm-trace-patterns/" btn_hidden="false" header="Rejoignez la préversion !" >}}
Les modèles de traces sont en préversion. Utilisez ce formulaire pour soumettre votre demande aujourd'hui.
{{< /callout >}}

Les modèles de traces regroupent les spans ayant une structure et des attributs similaires en modèles récurrents, afin que vous puissiez analyser le comportement à travers des milliers de traces à la fois au lieu de les lire individuellement. Utilisez les modèles de traces lorsque une requête renvoie trop de spans à examiner trace par trace, comme pour trouver quelles formes d'erreur sont nouvelles cette semaine ou quels modèles de latence ont changé après un déploiement. 

### Contrôle du volume des traces {#trace-volume-control}

Vous pouvez personnaliser les paramètres [de rétention et d'ingestion][6] afin d'envoyer et de conserver uniquement les données qui vous intéressent.

#### Ingestion {#ingestion}

Contrôlez l'ensemble de votre volume avec les [options de configuration de l'Agent Datadog][7] ou définissez des [règles d'ingestion][8] précises pour chaque service instrumenté avec la solution APM Datadog.


#### Indexation {#indexing}

Après avoir instrumenté vos services et ingéré des traces, définissez des [filtres de rétention][3] basés sur des tags dans l'application Datadog pour que Datadog conserve uniquement les spans qui vous intéressent.

**Remarque :** Les spans ingérés et indexés peuvent avoir un impact sur votre facture. Pour plus d'informations, consultez [APM Billing][9].

## Recherche en direct pendant 15 minutes {#live-search-for-15-minutes}

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Recherche en direct" >}}

Lorsque vous utilisez la recherche en direct, Datadog affiche les spans dès qu'ils sont envoyés par l'Agent Datadog et avant qu'ils ne soient indexés par vos filtres de rétention. Tous les spans ingérés sont disponibles pour les 15 dernières minutes (fenêtre glissante), affichés sans aucun échantillonnage.

{{< tabs >}}
{{% tab "Vue en liste" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Vue en liste de recherche en direct" video="true" >}}

Avec la **vue en liste**, vous pouvez :

- Surveiller si un nouveau déploiement s'est bien déroulé en filtrant sur `version_id` de tous les tags.
- Voir les informations liées aux pannes en temps réel en recherchant 100 % des traces ingérées pour un `org_id` ou `customer_id` particulier associé à un span enfant problématique.
- Vérifiez si un processus a correctement démarré en tapant `process_id` et en autocomplétant le nouvel ID de processus comme tag sur les spans enfants.
- Surveiller l'impact des tests de charge et de performance sur vos points de terminaison en filtrant sur la durée d'une ressource enfant.
- Exécutez des requêtes de recherche en un clic sur n'importe quel span ou tag directement depuis la vue du panneau de traces.
- Ajoutez, supprimez et triez des colonnes à partir des tags de span pour une vue personnalisée.

Le nombre de spans reçus par seconde est affiché en haut du tableau des traces. Étant donné qu'un flux de milliers de spans par seconde n'est pas lisible par un humain, les flux de spans à haut débit affichent certains spans pour plus de clarté visuelle. Vous pouvez rechercher tous les spans disponibles dans la requête de recherche. Utilisez les fonctionnalités de filtrage de la barre de requête de recherche en direct pour filtrer le flux de spans et le bouton **Pause/Play** en haut à droite de l'écran pour mettre en pause ou reprendre le flux.

{{< img src="tracing/live_search/play-pause-button.png" alt="Mettre en pause ou reprendre le flux en direct" style="width:75%;" >}}

**Remarque** : Sélectionner un span met le flux en pause et affiche plus de détails sur le span sélectionné dans le panneau latéral des traces.

{{% /tab %}}
{{% tab "Vue des séries temporelles" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Vue des séries temporelles de recherche en direct" video="true" >}}

Visualisez vos spans sous forme de séries temporelles au lieu d'une liste en utilisant la **vue des séries temporelles**. La vue des séries temporelles de recherche en direct est utile pour tracer des requêtes ou des erreurs qui correspondent à des critères spécifiés, tels que :

- Erreurs pour le `ShoppingCart##checkout` service et point de terminaison, avec une valeur de panier d'au moins `$100`, avec la possibilité de visualiser les traces correspondant à ces critères individuellement.

- Surveillez un déploiement canari d'une mise à jour critique d'application en temps réel.

- Comparez la latence à travers les régions géographiques limitées à la dernière version de votre application iOS.

En plus de visualiser les requêtes qui correspondent à vos recherches sous forme de série temporelle, vous pouvez consulter les clients, zones de disponibilités ou autres éléments les plus affectés sous forme de Top List pendant une panne ou une enquête.

**Remarque :** L'exportation vers des tableaux de bord et des moniteurs n'est possible qu'avec des spans conservés.

{{% /tab %}}
{{< /tabs >}}

### Filtrage {#filtering}

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="Recherche de tous les spans" video="true" >}}

Une requête valide dans la barre de recherche affiche les traces qui correspondent à vos critères de recherche à travers **tous les spans**. La syntaxe de recherche est la même dans les vues de recherche en direct que dans les autres vues de traces, mais ici, votre requête est comparée à toutes les traces ingérées à travers **n'importe quel span** et **n'importe quel tag**, et pas seulement celles indexées.

Vous pouvez choisir de requêter les [spans d'entrée de service][10], les [spans racines][11], ou tous les spans en changeant la sélection dans la boîte au-dessus du tableau des traces. Utilisez cette fonctionnalité sur des applications à fort trafic pour réduire le nombre de spans affichés et ne visualiser que les spans de point d'entrée des services ou le point d'entrée de la trace. Sélectionner cette case ne filtre que les spans affichés dans la liste ; les autres sont toujours affichés dans le graphique de flammes lorsque vous cliquez sur un span pour voir les détails de la trace.

Vous pouvez également filtrer sur des attributs qui ne sont pas définis comme facettes. Par exemple, pour filtrer sur l'attribut `cart.value`, il y a deux options :

- Cliquez sur l'attribut `cart.value` dans le panneau des détails de la trace et ajoutez-le à la requête de recherche :
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="Ajouter un attribut à la requête" video="true" >}}

- Filtrer sur tous les spans avec un attribut `cart.value` en tapant "cart.value" dans la barre de recherche :
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Filtre de recherche en direct par attribut" video="true" >}}

### Analyser les anomalies avec des insights intégrés {#analyzing-anomalies-with-integrated-insights}

L'Explorateur de traces combine la détection automatisée des valeurs aberrantes par Watchdog avec l'analyse des TAG pour vous aider à identifier rapidement la cause profonde des problèmes. Lorsque Watchdog détecte des tags qui sont statistiquement sur-représentés dans les erreurs ou les spans à haute latence, ces insights sont affichés à plusieurs endroits :

- **Suggestions de recherche** : Au fur et à mesure que vous tapez dans la barre de recherche, les tags aberrants apparaissent comme suggestions avec un indicateur montrant qu'ils sont corrélés avec des erreurs ou des problèmes de latence.
- **Recommandations de regroupement** : Lors de la sélection des attributs à regrouper, les facettes aberrantes sont mises en évidence pour guider votre enquête.
- **Barre latérale des facettes** : Les tags aberrants sont promus en haut de la liste des facettes dans une section dédiée "OUTLIERS".
- **Métriques RED** : Le bouton "Analyser" à côté des graphiques d'erreurs et de latence est mis en évidence lorsque des valeurs aberrantes pertinentes sont détectées.

{{< img src="tracing/trace_explorer/visualize/trace_explorer_outliers.mp4" alt="Analyser les anomalies avec des insights intégrés" video="true" >}}

## Recherche des spans indexés avec une rétention de 15 jours {#indexed-spans-search-with-15-day-retention}

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Recherche indexée" >}}

Vous pouvez rechercher des traces conservées de la même manière que vous effectuez une recherche en direct. Pour passer de la recherche de données en direct à la recherche de données conservées, changez le sélecteur de temps pour une période supérieure à 15 minutes. Tous les spans qui sont indexés par les filtres de rétention sont accessibles depuis la recherche. Ces spans sont conservés par Datadog pendant 15 jours après avoir été indexés par un filtre de rétention.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="Recherche des traces conservées" video="true" >}}

{{< tabs >}}
{{% tab "Vue en liste" %}}

Tous les spans indexés par des filtres de rétention personnalisés *et* le filtre de rétention intelligent sont disponibles pour être recherchés dans la vue Liste. Cependant, si vous filtrez par une étiquette qui n'apparaît que sur des spans qui ne sont indexés par aucun filtre de rétention, votre recherche ne renvoie aucun résultat, contrairement à l'utilisation de [Recherche en direct](#live-search-for-15-minutes).

{{% /tab %}}
{{% tab "Vue des séries temporelles" %}}

Toutes les spans indexées par des filtres de rétention personnalisés ou par le filtre de rétention intelligent peuvent être recherchées via l'analyse de traces.

Lorsque la vue sous forme de Série temporelle est activée, exportez votre requête vers un [dashboard][1], un [monitor][2] ou un [notebook][3] pour effectuer une analyse plus poussée ou pour recevoir automatiquement une alerte lorsqu'un nombre agrégé de spans dépasse un certain seuil.

**Remarque** : Les spans indexés par le filtre de rétention intelligent sont exclus des évaluations des moniteurs d'analytique des traces APM. Pour plus d'informations, voir [Rétention des traces][4].

[1]: /fr/dashboards/widgets/timeseries/
[2]: /fr/monitors/types/apm/?tab=analytics
[3]: /fr/notebooks
[4]: /fr/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### Configuration de la rétention {#retention-configuration}

Vous pouvez personnaliser quels spans sont conservés et à quels taux de rétention. Par défaut, [le filtre de rétention intelligent de Datadog][4] est appliqué, ce qui conserve automatiquement les traces présentant une diversité en termes d’erreurs et de latence, ainsi que des ressources à faible débit. Pour en savoir plus sur le filtre de rétention intelligent par défaut et comment créer vos propres filtres supplémentaires, consultez la [documentation des filtres de rétention][3]. Allez à la [page des filtres de rétention][12] dans l'application Datadog pour créer ou modifier vos propres filtres.

## Lectures complémentaires {#further-reading}

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