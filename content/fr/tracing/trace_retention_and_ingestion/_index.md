---
title: Rétention et ingestion des traces
kind: documentation
aliases:
  - /fr/account_management/billing/usage_control_apm/
  - /fr/tracing/app_analytics/
description: Apprenez à contrôler les taux d'ingestion et d'indexation avec Tracing without Limits.
---
{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Avec Tracing without Limits™, l'ingestion de traces dans Datadog et la rétention de ces traces pendant 15 jours sont totalement personnalisables.

Pour effectuer un suivi ou une surveillance de votre utilisation de Tracing without Limits™, consultez la documentation relative aux [métriques d'utilisation][1].

## Filtres de rétention

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Une fois les spans ingérées par Datadog, certaines sont conservées pendant 15 jours selon les filtres de rétention définis pour votre compte. Par défaut, seul le [filtre de rétention intelligent](#filtre-de-retention-intelligent-datadog), est activé. Il conserve les traces des erreurs ainsi que les traces associées à différentes distributions de latence.

Vous pouvez également créer des [filtres de rétention basés sur des tags](#creer-votre-propre-filtre-de-retention) pour vos services.

**Remarque** : les droits administrateur sont requis pour créer, modifier ou désactiver des filtres de rétention.

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Filtres de rétention" >}}

Dans l'application Datadog, l'[onglet Retention Filters][2] affiche les informations suivantes :

| Colonne                | Données |
| ----------------------- | ---------- |
| Filter Name                | Le nom de chaque filtre utilisé pour indexer les spans. Par défaut, le seul filtre appliqué est la [rétention intelligente de Datadog](#filtre-de-retention-intelligent-de-datadog).   |
| Filter Query             | La requête basée sur des tags pour chaque filtre.      |
| Retention Rate                | Un pourcentage de 0 à 100 % correspondant au nombre de spans qui seront indexées par Datadog. |
| Spans Indexed             | Le nombre de spans indexées par le filtre sur la période sélectionnée.   |
| Last Updated            | La date de dernière mise à jour du filtre de rétention et l'utilisateur à l'origine de cette mise à jour.  |
| Bouton bascule                 |  Permet d'activer ou de désactiver des filtres.  |

Outre la colonne « Spans Indexed » dont les valeurs sont triées par filtre de rétention, vous pouvez également utiliser la métrique `datadog.estimated_usage.apm.indexed_spans` pour effectuer le suivi des spans indexées en fonction des filtres de rétention.

Pour en savoir plus, consultez la documentation relative aux [métriques d'utilisation][1] ou le [dashboard][3] disponible sur votre compte.

### Filtre de rétention intelligent Datadog

La rétention intelligente est toujours active pour vos services. Elle conserve une certaine proportion de vos traces pour vous aider à surveiller la santé de vos applications. Toutes les [spans de premier niveau][4] sont indexées pour les traces conservées par le filtre de rétention intelligent.

La rétention intelligente conserve :

 - Une sélection représentative d'erreurs, afin de garantir la diversité de celles-ci (par exemple, les codes de réponse 400 et 500).
 - Les latences élevées dans les différents quartiles `p75`, `p90`, `p95`.
 - Des traces historiques associées à toutes les ressources, quel que soit leur trafic, pour l'intervalle sélectionné.
 - La trace de durée maximale réelle pour chaque intervalle.

Si vous souhaitez analyser _en détail_ des tags, facettes ou groupes de traces en particulier (autrement dit, si vous souhaitez conserver plus de données que celles conservées par la rétention intelligente), vous pouvez [créer votre propre filtre de rétention](#creer-votre-propre-filtre-de-retention). Imaginons que vous souhaitez conserver plus qu'une simple sélection représentative des erreurs provenant de votre environnement de production. Pour que _toutes_ les erreurs de production soient conservées et puissent être recherchées et analysées pendant 15 jours, créez un filtre de rétention de 100 % appliqué à `env:prod` et à `status:error`. Attention : comme indiqué ci-dessous, un tel filtre peut augmenter vos coûts.

### Créer votre propre filtre de rétention

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.gif" style="width:100%;" alt="Indexation de spans" >}}

Pour personnaliser les spans qui sont indexées et conservées pendant 15 jours, vous pouvez créer, modifier et désactiver des filtres supplémentaires en fonction de tags, et définir le pourcentage de spans à conserver pour chaque filtre. Lorsqu'une span est conservée, la trace correspondante est également enregistrée, et vous pouvez cliquer sur une span pour obtenir l'intégralité de la trace. Pour effectuer une recherche par tag dans la [fonction de recherche et d'analyse][5], la span qui contient directement le tag recherché doit toutefois avoir été indexée par un filtre de rétention.

1. Donnez un nom à votre filtre.
2. Définissez les tags qui doivent **tous** avoir été appliqués à une span pour qu'elle soit indexée.
3. Choisissez si ce filtre doit conserver toutes les spans qui correspondent à ces critères, ou uniquement les [spans de premier niveau][4].
4. Définissez le pourcentage de spans correspondant à ces tags devant être indexées.
5. Enregistrez votre nouveau filtre.

**Remarque :** si vous sélectionnez « Top-Level Spans for Services Only », le filtre de rétention conservera uniquement la proportion sélectionnée de [spans de premier niveau][4] du service et les indexera. Appliquez cette option si vous souhaitez uniquement indexer les spans de premier niveau pour les tags correspondants. Si vous sélectionnez « All spans », le filtre de rétention conservera la proportion sélectionnée de toutes les spans de la trace distribuée, indépendamment de leur hiérarchie, et les indexera. Cette option est susceptible d'augmenter vos frais. Un indicateur visuel affiché dans l'application pendant la configuration d'un filtre de rétention vous indique le nombre de spans correspondantes qui ont été détectées sur la période donnée.

Par exemple, vous pouvez créer des filtres de façon à conserver toutes les traces pour :

- Les transactions de carte bancaire supérieures à 100 $
- Les clients importants qui utilisent une fonctionnalité stratégique de votre solution SaaS
- Les versions spécifiques d'une application de service de livraison en ligne

## Contrôles de l'ingestion

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Les contrôles de l'ingestion affectent les traces qui sont envoyées à Datadog par vos applications. Les statistiques et les métriques sont toujours calculées en fonction de toutes les traces, et ne sont pas impactées par les contrôles de l'ingestion.

De nombreux services instrumentés envoient 100 % de leurs traces à Datadog par défaut. Par défaut, l'Agent Datadog ne filtre ni n'échantillonne aucune span tant que le volume ne dépasse pas 50 traces par seconde. Les services à haut volume ou ceux dont le trafic est de nature intermittente auront davantage tendance à ne pas envoyer 100 % des spans par défaut. Ce seuil de 50 traces par seconde se base sur la rétention intelligente et conserve un ensemble diversifié de traces par défaut.

Pour une expérience optimale, configurez vos services de façon à ce qu'ils envoient 100 % de leurs traces. Ainsi, toutes les traces pourront être utilisées pour la recherche et l'analyse en temps réel.

{{< img src="tracing/trace_indexing_and_ingestion/IngestionControls.png" style="width:100%;" alt="Filtres de rétention" >}}

**Remarque :** si vous constatez que le taux d'ingestion est inférieur à 100 %, vérifiez que vous utilisez l'Agent 6.19+ ou 7.19+, car le taux par défaut a été augmenté dans ces versions.

Dans l'application Datadog, l'[onglet « Ingestion Controls »][6] affiche les informations suivantes :

| Colonne                | Données |
| ----------------------- | ---------- |
| Root Service                 | Le nom de chaque service instrumenté et qui envoie des traces à Datadog.   |
| Data Ingested             | Quantité de données ingérées par Datadog sur la période sélectionnée.      |
| Ingestion Rate                 | Un pourcentage de 0 à 100 % correspondant au nombre de spans produites par le service qui sont ingérées par Datadog. Tout nombre inférieur à 100 % signifie que certaines traces ne sont pas ingérées par Datadog et qu'elles seront filtrées par l'Agent Datadog après le calcul des métriques et des statistiques.      |
| Ingestion Breakdown             | Une analyse détaillée de la destination de chaque trace générée par le service. Consultez [Ingestion Breakdown](#ingestion-breakdown) pour en savoir plus.    |
| Tracers Configuration            | Affiche `Default` sauf en cas de modification via les instructions de configuration du traceur intégrées à l'application. Consultez [Modifier le taux d'ingestion par défaut](#modifier-le-taux-d-ingestion-par-defaut) pour en savoir plus. Si tous les hosts sur lesquels ce service est déployé sont configurés pour envoyer un volume de traces précis, cet indicateur affichera `Fully Configured`. Si seule une partie des hosts sur lesquels ce service est déployé sont configurés, le libellé indiquera `Partially Configured`.   |
| Dropped Spans                |  Le pourcentage de spans entrantes filtrées par l'Agent Datadog. Si ce pourcentage est supérieur à 0 %, le service peut être configuré en cliquant n'importe où sur la ligne du service. Consultez [Modifier le taux d'ingestion par défaut](#modifier-le-taux-d-ingestion-par-defaut) pour en savoir plus.     |
| Traces Ingested per Second                |   Nombre moyen de traces par seconde ingérées par Datadog pour le service sur la période sélectionnée.   |
| Spans Ingested            | Nombre de spans ingérées par Datadog sur la période sélectionnée.        |

Outre la colonne Data Ingestion pour chaque filtre de rétention, vous trouverez également deux métriques : `datadog.estimated_usage.apm.ingested_spans` et `datadog.estimated_usage.apm.ingested_bytes`. Celles-ci sont taguées par `service` et `env`. Le [dashboard d'analyse de traces][3] contient également des Top Llists indiquant où se produisent les volumes d'ingestion les plus élevés. Consultez la documentation relative aux [métriques d'utilisation][1] pour en savoir plus. 

### Modifier le taux d'ingestion par défaut

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate3.gif" style="width:100%;" alt="Modifier le taux d'ingestion des données" >}}

Pour choisir d'envoyer un pourcentage spécifique du trafic d'un service, ajoutez un bloc de code généré à la configuration du traceur pour ce service.

1. Sélectionnez le service pour lequel vous souhaitez modifier le pourcentage de spans ingérées.
2. Choisissez le langage du service.
3. Choisissez le pourcentage d'ingestion désiré.
4. Appliquez la configuration appropriée générée à partir de ces choix pour le service indiqué, et redéployez-le.
5. Sur la page Data Ingestion, vérifiez que votre nouveau pourcentage a bien été appliqué.

#### (Conseillé) Définir le taux d'ingestion globale sur 100 %

Pour que 100 % des traces de tous vos services soient ingérés dans Datadog pour la recherche et l'analyse en temps réel, et pour disposer d'un contrôle maximal avec les filtres de rétention, Datadog vous conseille de faire en sorte que tous vos services envoient 100 % de leurs traces par défaut.

Pour configurer l'ingestion de 100 % des traces sur chaque service instrumenté avec une bibliothèque de tracing Datadog, définissez la variable d'environnement suivante dans la configuration du traceur :

```
DD_TRACE_SAMPLE_RATE=1.0
```

**Remarque** : si l'ingestion totale dépasse le nombre de Go inclus, vos coûts risquent d'augmenter. Pour en savoir plus, consultez la page [Tarification de l'APM][7].

### Ingestion Breakdown

La colonne Ingestion Breakdown de l'ingestion présente la destination de toutes les traces émises par le service. Elle peut vous aider à comprendre pourquoi un taux d'ingestion est plus bas que prévu et pourquoi certaines traces sont manquantes.

{{< img src="tracing/trace_indexing_and_ingestion/IngestionBreakdown.png" style="width:100%;" alt="analyse des traces ingérées" >}}

La colonne affiche les informations suivantes :

- **Traces complètes ingérées** (vert) : le pourcentage de traces ingérées par Datadog.
- **Traces complètes non retenues** (gris) : le pourcentage de traces qui n'ont délibérément pas été envoyées à Datadog par l'Agent ou le traceur. Selon votre configuration, il peut y avoir deux raisons à cela :

    1. Par défaut, l'Agent et les traceurs définissent de façon intelligente le taux d'ingestion du service. Consultez [Modifier le taux d'ingestion par défaut](#modifier-le-taux-d-ingestion-par-defaut) pour configurer ce comportement.
    2. Vous avez modifié le taux d'ingestion par défaut pour qu'il soit inférieur à 100 %.

- **Traces complètes filtrées par le limiteur de taux du traceur** (orange) : lorsque vous choisissez de [configurer le taux d'ingestion d'un service](#modifier-le-taux-d-ingestion-par-defaut), vous définissez explicitement le taux de traces devant être conservées pour votre service. Cependant, par mesure de protection, un limiteur de taux défini par défaut à 100 traces par seconde est automatiquement activé. Pour le configurer, [ouvrez un ticket d'assistance][8] pour que nous puissions vous guider.

- **Traces filtrées en raison d'une charge CPU trop élevée** (rouge) : l'Agent dispose d'une option de configuration qui permet aux utilisateurs de limiter l'utilisation du CPU. Une fois cette limite atteinte, l'Agent cesse d'accepter les traces émises par les traceurs. Modifiez la [configuration de l'Agent][9] pour configurer la part du CPU allouée à l'Agent.

### Traces filtrées avant l'ingestion

Vous ne pourrez pas ingérer 100 % de vos traces si vous n'avez pas défini la variable d'environnement `DD_TRACE_SAMPLE_RATE=1.0` pour Tracing without Limits, et que :
- vos applications génèrent plus de 50 traces par seconde ;
- vos applications envoient des charges de trafic par intermittence ; ou que
- les traces de vos applications sont volumineuses ou comprennent des charges utiles complexes.

Dans ce cas, certaines traces seront filtrées par l'Agent Datadog *après* calcul des statistiques, afin que les métriques soient calculées en fonction de 100 % de vos traces.

Si vous constatez un taux d'ingestion inférieur à 100 % dans Datadog alors que vous souhaitez envoyer toutes vos traces, activez Tracing without Limits en définissant la variable d'environnement décrite ci-dessus. Si vous avez des questions, contactez notre [équipe d'assistance][8].

{{< img src="tracing/trace_indexing_and_ingestion/VisualIndicator.png" style="width:100%;" alt="Services racine qui n'envoient pas 100 % des traces" >}}


## De App Analytics à Tracing without Limits

Jusqu'au 20 octobre 2020, Datadog proposait la solution App Analytics pour indexer des spans et effectuer des analyses. Bien qu'il ne s'agisse plus de la configuration recommandée et qu'il ne soit pas nécessaire d'utiliser la fonctionnalité d'[analyse et de recherche de traces][10], les anciennes instructions sont disponibles sur la page de configuration d'[App Analytics][11].

Tous les filtres App Analytics existants ont automatiquement été convertis en filtres de rétention. Vous pouvez continuer d'utiliser ces filtres tels quels ou les modifier selon vos besoins. Les filtres convertis sont marqués d'un *i* pour indiquer qu'ils sont issus d'App Analytics.

**Remarque :** les filtres App Analytics existants peuvent être modifiés dans Datadog, mais seulement en modifiant les [filtres de rétention][2] issus de la migration. Les anciens filtres sont accessibles en lecture seule sur la page des [paramètres][12] de l'application.

{{< img src="tracing/trace_indexing_and_ingestion/MigratedRetentionFilter.png" style="width:100%;" alt="Indicateur visuel de filtre App Analytics converti en filtre de rétention" >}}

[1]: /fr/tracing/trace_retention_and_ingestion/usage_metrics
[2]: https://app.datadoghq.com/apm/traces/retention-filters
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: /fr/tracing/visualization/#top-level-span
[5]: /fr/tracing/trace_search_and_analytics/#historical-search-mode
[6]: https://app.datadoghq.com/apm/traces/ingestion-control
[7]: /fr/account_management/billing/apm_distributed_tracing/
[8]: /fr/help/
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml#L736-L741
[10]: /fr/tracing/trace_search_and_analytics
[11]: /fr/tracing/legacy_app_analytics/
[12]: https://app.datadoghq.com/apm/settings