---
title: Analyse et recherche de traces
kind: documentation
aliases:
  - /fr/tracing/tracing_without_limits/
  - /fr/tracing/livesearch/
description: Analyse et recherche de traces
---
{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

## Présentation de la fonctionnalité Analyse et recherche de traces

La fonctionnalité [Analyse et recherche de traces][1] vous permet de rechercher parmi toutes les spans ingérées ou indexées à l'aide de n'importe quel tag sur n'importe quelle span. Les spans renvoyées par votre requête dépendent du type de recherche effectué. Une recherche en mode Live renvoie toutes les spans ingérées au cours des 15 dernières minutes avec mise à jour en temps réel, tandis qu'une recherche parmi les spans indexées renvoie les spans retenues pendant 15 jours par vos filtres personnalisés.

- Les applications instrumentées envoient 100 % de leurs traces à Datadog en vue de leur [ingestion][2]. Ces traces sont alors disponibles en tant que traces Live pendant une période mobile de 15 minutes.

L'application Datadog affiche un indicateur **Live** à côté du sélecteur d'intervalle lorsque vous êtes en mode Live :

{{< img src="tracing/live_search/LiveSearch.png" alt="Indicateur Live Search" >}}

Toutes les traces ingérées passent par des [filtres de rétention][3] personnalisés que vous pouvez créer pour indiquer les spans à indexer, ainsi que par le [filtre de rétention intelligent][4] par défaut qui conserve un ensemble diversifié de traces.

Une fois indexées, les traces sont disponibles pour une utilisation dans la section Analyse et recherche de traces, et elles sont conservées pendant 15 jours.

L'application Datadog affiche un indicateur « Retained traces  à côté du sélecteur d'intervalle lorsque vous recherchez des [spans indexées][5] :

{{< img src="tracing/live_search/RetainedSearch.png" alt="Indicateur Retained Search" >}}

Vous pouvez personnaliser les paramètres [de rétention et d'ingestion][6] afin d'envoyer et de conserver uniquement les données qui vous intéressent.

### (Conseillé) Activer Tracing Without Limits

Des contrôles d'ingestion avancés peuvent être définis pour chaque service instrumenté par l'APM Datadog. Consultez la documentation relative aux [contrôles d'ingestion][2] pour en savoir plus. Par défaut, l'intégralité des traces sont conservées pour les services qui n'envoient pas plus de 50 traces par seconde. Pour faire en sorte que tous vos services envoient l'ensemble de leur trafic, définissez la variable d'environnement suivante :

```
DD_TRACE_SAMPLE_RATE=1.0
```

Après avoir instrumenté vos services et ingéré des traces, définissez des [filtres de rétention][3] basés sur des tags dans l'application Datadog pour que Datadog conserve uniquement les spans qui vous intéressent.

**Remarque** : les spans ingérées et indexées peuvent augmenter vos coûts. Pour en savoir plus, consultez la page [Tarification de l'APM][7].


## Live Search pendant 15 minutes

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Lorsque vous utilisez le mode Live Search, Datadog affiche les spans dès qu'elles ont été envoyées par l'Agent Datadog et avant qu'elles aient été indexées par vos filtres de rétention. Toutes les spans ingérées sont disponibles pour les 15 dernières minutes (période mobile). Toutes les spans ingérées par Datadog sont affichées sans aucun échantillonnage avec Tracing without Limits™.

{{< img src="tracing/live_search/LiveSearch.mp4" alt="Live Search" video="true" >}}

La page APM Live Search vous permet d'effectuer les actions suivantes :

- Surveiller le bon déroulement d'un nouveau déploiement en recherchant l'attribut `version_id` de tous les tags.
- Visualiser des informations sur les pannes en temps réel en recherchant un `org_id` ou `customer_id` spécifique associé à une span enfant problématique parmi 100 % des spans ingérées.
- Vérifier si un processus a correctement démarré en saisissant `process_id` et en complétant automatiquement le nouvel identifiant de processus en tant que tag sur les spans enfants.
- Surveiller l'impact des tests de charge sur vos endpoints en filtrant les métriques en fonction de la durée d'une ressource enfant.
- Appliquer des requêtes de recherche en un seul clic sur n'importe quel tag ou span directement à partir du volet des traces.
- Ajouter, supprimer et trier des colonnes à partir des tags de span pour obtenir un affichage personnalisé.

Le nombre de spans reçues par seconde est affiché en haut du tableau des traces. Étant donné qu'un flux de milliers de spans par seconde est difficilement lisible, les flux de spans à haut volume affichent les spans, mais il est tout de même possible de rechercher toutes les spans. Utilisez les fonctions de filtrage de la barre de query Live Search pour filtrer le flux de spans et le bouton **Pause/Play** en haut à droite pour interrompre ou relancer le flux.

{{< img src="tracing/live_search/PausePlaystream.png" alt="Interrompre ou lancer le Live Stream" >}}

Le mode Live Search est sélectionné par défaut sur la page Traces. Lorsque vous consultez des traces conservées, vous pouvez choisir l'option **LIVE** dans le sélecteur d'intervalle pour passer au mode Live Search sur les 15 dernières minutes.

**Remarque** : lorsque vous sélectionnez une span, le flux s'interrompt et les détails de la span sélectionnée s'affichent dans le volet latéral de la trace.

### Filtrer le flux de traces avec une requête de recherche
{{< img src="tracing/live_search/toplevelspan2.gif" alt="Requête en mode Live Search" >}}

Définissez une requête valide dans la barre de recherche pour afficher les traces qui correspondent à vos critères de recherche pour **toutes les spans**. La syntaxe de recherche de la vue Live Search est la même que celle des autres vues de trace. Toutefois, avec la vue Live Search, la recherche se fait dans toutes les traces ingérées, pour n'importe quel tag et span, et non pas uniquement dans celles qui ont été indexées.

**Remarque** : vous avez la possibilité de sélectionner uniquement les spans de premier niveau du service en modifiant la sélection de la case `top-level spans of the service` située au-dessus du tableau des traces. Utilisez cette fonction sur les applications à trafic élevé pour réduire le nombre de spans affichées et ne visualiser que les spans de point d'entrée des services. Lorsque vous cochez cette case, les spans affichées ne sont filtrées que _visuellement_ ; toutes les spans restent présentes.

Vous pouvez également rechercher des attributs qui ne sont pas définis en tant que facettes. Par exemple, pour rechercher l'attribut `customer.id`, deux options sont possibles :

- Cliquez sur l'attribut dans le volet des traces et ajoutez-le à la requête de recherche :
{{< img src="tracing/live_search/LiveSearchQuery1.png" alt="Filtre Live Search" >}}


- Recherchez toutes les spans avec un attribut `customer.id` en saisissant « customer.id » dans la barre de requête de recherche :
{{< img src="tracing/live_search/LiveSearchQuery3.png" alt="Filtre Live Search" >}}

## Recherche de traces avec rétention de 15 jours

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Vous pouvez rechercher des traces conservées de la même façon que vous le faites avec le mode Live Search. Pour passer du mode Live aux données conservées, modifiez le sélecteur d'intervalle pour choisir une durée supérieure à 15 minutes.

Toutes les spans indexées par des filtres de rétention ou d'anciens filtres App Analytics sont accessibles via la recherche. Ces spans sont conservées par Datadog pendant 15 jours après avoir été indexées par un filtre de rétention.

**Remarque :** À compter du 20 octobre 2020, la fonctionnalité App Analytics a été remplacée par Tracing without Limits, une façon plus flexible d'ingérer 100 % de vos traces et de conserver celles qui intéressent le plus votre entreprise.

{{< img src="tracing/live_search/HistoricalSearch2.gif" alt="Recherche historique" >}}


Par exemple, si vous filtrez en fonction d'un tag qui figure uniquement dans des spans non indexées par un filtre de rétention, votre recherche n'affichera aucun résultat, ce qui n'est pas le cas avec Live Search.

Vous pouvez personnaliser les spans qui sont conservées et leurs taux de rétention. Par défaut, la fonctionnalité de [rétention intelligente de Datadog][4] est appliquée. Pour en savoir plus sur le filtre de rétention des spans par défaut et découvrir comment créer vos propres filtres, consultez la section relative aux [filtres de rétention][3]. Accédez à la page [Retention Filters][8] dans l'application Datadog pour créer ou modifier vos propres filtres.

## Live Analytics pendant 15 minutes

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Avec Live Analytics, vous pouvez effectuer des analyses sur 100 % de vos traces ingérées pendant les 15 dernières minutes en filtrant et en regroupant n'importe quelle span en fonction de n'importe quel tag. Datadog affiche les spans dès qu'elles ont été envoyées par l'Agent Datadog et avant qu'elles aient été indexées par vos filtres de rétention. Toutes les spans ingérées sont disponibles pour les 15 dernières minutes (période mobile). Toutes les spans ingérées par Datadog sont affichées sans aucun échantillonnage avec Tracing without Limits™.

{{< img src="tracing/live_search/LiveAnalytics.mp4" alt="Live Analytics" video="true" >}}

La fonctionnalité Analytics est utilisée pour représenter graphiquement les requêtes et les erreurs qui correspondent aux critères spécifiés, comme :

- Les erreurs pour le service et l'endpoint `ShoppingCart##checkout` avec un panier d'au moins `$100`. Vous pouvez également accéder directement aux traces qui correspondent à ces critères.

- Surveiller le déploiement Canary de n'importe quelle mise à jour d'application critique en temps réel.

- Comparer la latence d'une région géographique à une autre pour la dernière version de votre application iOS.

En plus d'analyser les requêtes qui correspondent à vos recherches, Live Analytics vous permet de visualiser une Top List des clients les plus affectés, des zones de disponibilité ou de tout autre tag pendant une panne ou une enquête.

Avec Live Analytics, chaque tag de chaque span ingérée sur la période mobile de 15 minutes peut être utilisé dans une requête.

**Remarque :** l'exportation vers un dashboard ou un monitor est uniquement possible avec les spans conservées.

## Analyse de traces avec rétention de 15 jours

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-4.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Le mode Retained Analytics est disponible sur la même page que le mode Live Analytics. Pour passer des données Live aux données conservées et effectuer des analyses, utilisez le sélecteur d'intervalle pour choisir une durée supérieure à 15 minutes. Les données ne seront plus basées sur un flux mis à jour en temps réel mais sur l'intervalle fixe sélectionné.

{{< img src="tracing/live_search/HistoricalAnalytics2.gif" alt="Analyse des données historiques" >}}

Toutes les spans indexées par des filtres de rétention ou d'anciens filtres App Analytics peuvent être recherchées via l'analyse de traces. Ces spans sont conservées par Datadog pendant 15 jours après avoir été indexées par un filtre de rétention.

**Remarque :** À compter du 20 octobre 2020, la fonctionnalité App Analytics a été remplacée par Tracing without Limits, une façon plus flexible d'ingérer 100 % de vos traces et de conserver celles qui intéressent le plus votre entreprise.

Vous pouvez personnaliser les spans qui sont conservées et leurs taux de rétention. Par défaut, la fonctionnalité de [rétention intelligente de Datadog][4] est appliquée. Elle conserve automatiquement les traces associées à une variété d'erreurs et de latences ainsi que les traces liées à des ressources présentant un débit faible. Pour en savoir plus sur le filtre de rétention des spans par défaut et découvrir comment créer vos propres filtres, consultez la section relative aux [filtres de rétention][3]. Accédez à la page [Retention Filters][8] dans l'application Datadog pour créer ou modifier vos propres filtres.

[1]: https://app.datadoghq.com/apm/traces
[2]: /fr/tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: /fr/tracing/trace_retention_and_ingestion/#retention-filters
[4]: /fr/tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter
[5]: /fr/tracing/visualization/#indexed-span
[6]: /fr/tracing/trace_retention_and_ingestion/
[7]: /fr/account_management/billing/apm_distributed_tracing/
[8]: https://app.datadoghq.com/apm/traces/retention-filters