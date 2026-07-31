---
algolia:
  tags:
  - trace metrics
aliases:
- /fr/tracing/getting_further/metrics_namespace
- /fr/tracing/guide/metrics_namespace
description: Guide complet sur les métriques de trace APM, y compris l'espace de noms,
  les types (hits, erreurs, latence, Apdex) et comment ils sont calculés à partir
  du trafic de l'application.
further_reading:
- link: tracing/trace_pipeline/generate_metrics/
  tag: Documentation
  text: Créez des métriques personnalisées à partir de vos spans ingérés.
- link: tracing/trace_collection/
  tag: Documentation
  text: Découvrir comment configurer le tracing d'APM avec votre application
- link: tracing/software_catalog/
  tag: Documentation
  text: Découvrez et cataloguez les services rapportant à Datadog.
- link: tracing/services/service_page
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: tracing/services/resource_page
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Comprendre comment lire une trace Datadog
title: Métriques de trace
---
## Aperçu {#overview}

Pour recueillir les métriques d'application de tracing, vous devez avoir [activé la collecte des traces et instrumenté votre application][1].

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="Métriques de trace" >}}

Ces métriques capturent le nombre de requêtes, le nombre d'erreurs et les mesures de latence. Elles sont calculées sur la base de 100 % du trafic de l'application, indépendamment de toute configuration de [sampling d'ingestion de trace][2]. Assurez-vous d'avoir une visibilité complète sur le trafic de votre application en utilisant ces métriques pour repérer d'éventuelles erreurs sur un service ou une ressource, et en créant des tableaux de bord, des moniteurs et des SLOs.

**Remarque**: Si vos applications sont instrumentées avec des bibliothèques OpenTelemetry et que l'échantillonnage est configuré au niveau du SDK, les métriques APM sont calculées sur la base de l'ensemble de données échantillonné. Cependant, si l'échantillonnage est configuré au niveau du Collecteur OpenTelemetry et que le processeur d'échantillonnage est en amont du connecteur Datadog, les métriques APM sont calculées sur la base de 100 % du trafic de l'application.

Les métriques de trace sont générées pour les spans d'entrée de service et certaines opérations en fonction du langage d'intégration. Par exemple, l'intégration Django produit des métriques de trace à partir de spans qui représentent diverses opérations (1 span racine pour la demande Django, 1 pour chaque middleware et 1 pour la vue).

L'espace de nommage des [métriques de trace][3] est formaté comme suit :

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

Les paramètres sont définis comme suit :

`<SPAN_NAME>`
: Le nom de l'opération ou `span.name` (exemples: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<METRIC_SUFFIX>`
: Le nom de la métrique (exemples: `hits`, `errors`, `apdex`, `duration`). Voir la section ci-dessous.

`<TAGS>`
: Tags des métriques de trace, les tags possibles sont: `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class`, `rpc.grpc.status_code`(nécessite Datadog Agent v7.65.0+), et les tags de Datadog Agent (y compris l'hôte et [tags principaux supplémentaires][4]). 
: **Remarque :** D'autres tags définis sur les spans ne sont pas disponibles en tant que tags sur les métriques de trace.

## Suffixe de métrique {#metric-suffix}

### Demandes {#hits}

`trace.<SPAN_NAME>.hits`
: **Prérequis :** Cette métrique existe pour tout service APM.<br>
**Description :** Représente le nombre de spans créés avec un nom spécifique (par exemple, `redis.command`, `pylons.request`, `rails.request` ou `mysql.query`).<br>
**Type de métrique :** [COMPTE][5].<br>
**Étiquettes :** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, toutes les étiquettes d'hôte de l'Agent Hôte Datadog, et [étiquettes principales supplémentaires][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **Prérequis :** Cette métrique existe pour les services APM HTTP/WEB si les métadonnées http existent.<br>
**Description :** Représente le nombre de hits pour un span donné, ventilé par code d'état HTTP.<br>
**Type de métrique :** [NOMBRE][5].<br>
**Étiquettes :** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_class`, `http.status_code`, toutes les étiquettes d'hôte de l'Agent Hôte Datadog, et [étiquettes principales supplémentaires][4].

### Distribution de latence {#latency-distribution}

`trace.<SPAN_NAME>`
: **Prérequis :** Cette métrique existe pour tout service APM.<br>
**Description :** Représente la distribution de latence pour tous les services, ressources et versions à travers différents environnements et étiquettes principales supplémentaires. **Recommandé pour tous les cas d'utilisation de mesure de latence.**<br>
**Type de métrique :** [DISTRIBUTION][6].<br>
**Étiquettes :** `env`, `service`,`version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, `synthetics`, et [étiquettes principales supplémentaires][4].

### Erreurs {#errors}

`trace.<SPAN_NAME>.errors`
: **Prérequis :** Cette métrique existe pour tout service APM.<br>
**Description :** Représente le nombre d'erreurs pour un span donné.<br>
**Type de métrique :** [NOMBRE][5].<br>
**Étiquettes :** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, toutes les étiquettes d'hôte de l'Agent Hôte Datadog, et [étiquettes principales supplémentaires][4].

`trace.<SPAN_NAME>.errors.by_http_status`
: **Prérequis :** Cette métrique existe pour tout service APM.<br>
**Description :** Représente le nombre d'erreurs pour un span donné.<br>
**Type de métrique :** [NOMBRE][5].<br>
**Étiquettes :** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, toutes les étiquettes d'hôte de l'Agent Hôte Datadog, et [étiquettes principales supplémentaires][4].

### Apdex {#apdex}

`trace.<SPAN_NAME>.apdex`
: **Prérequis :** Cette métrique existe pour tout service APM HTTP ou basé sur le web.<br>
**Description :** Mesure le score [Apdex][10] pour chaque service web.<br>
**Type de métrique :** [GAUGE][7].<br>
**Étiquettes :** `env`, `service`, `version`, `resource` / `resource_name`, `synthetics`, et [étiquettes principales supplémentaires][4].

## Métriques héritées {#legacy-metrics}

Les métriques suivantes sont maintenues pour la compatibilité descendante. Pour tous les cas d'utilisation de mesure de latence, Datadog recommande fortement d'utiliser [les métriques de distribution de latence](#latency-distribution) à la place.

### Durée (Héritée) {#duration-legacy}

<div class="alert alert-danger">
<strong>Importanta:</strong> Les métriques de durée sont maintenues uniquement pour la compatibilité descendante. Pour tous les cas d'utilisation de mesure de latence, Datadog recommande fortement d'utiliser <a href="#latency-distribution">les métriques de distribution de latence</a> à la place, car elles offrent une meilleure précision pour les calculs de percentile et l'analyse globale des performances.
</div>

`trace.<SPAN_NAME>.duration`
: **Prérequisa:** Cette métrique existe pour tout service APM.<br>
**Descriptiona:** Mesurer le temps total pour une collection de spans dans un intervalle de temps, y compris les spans enfants vus dans le service de collecte. Pour la plupart des cas d'utilisation, Datadog recommande d'utiliser [la distribution de latence](#latency-distribution) pour le calcul de la latence moyenne ou des percentiles. Pour calculer la latence moyenne avec des filtres d'étiquettes d'hôte, vous pouvez utiliser cette métrique avec la formule suivante : <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}.rollup(sum).fill(zero)` <br>
Cette métrique ne prend pas en charge les agrégations de percentile. Lisez la section [Distribution de latence](#latency-distribution) pour plus d'informations. <br>
**Type de métriquea:** [GAUGE][7].<br>
**Étiquettesa:** `env`, `service`, `resource`, `http.status_code`, toutes les étiquettes d'hôte de l'Agent d'Hôte Datadog, et [étiquettes principales supplémentaires][4].

### Durée par (Héritage) {#duration-by-legacy}

<div class="alert alert-danger">
<strong>Importanta:</strong> Les métriques de durée sont maintenues uniquement pour la compatibilité descendante. Pour tous les cas d'utilisation de mesure de latence, Datadog recommande fortement d'utiliser <a href="#latency-distribution">les métriques de distribution de latence</a> à la place, car elles offrent une meilleure précision pour les calculs de percentile et l'analyse globale des performances.
</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **Prérequisa:** Cette métrique existe pour les services HTTP/WEB APM si les métadonnées http existent.<br>
**Descriptiona:** Mesurer le temps total pour une collection de spans pour chaque statut HTTP. Plus précisément, il s'agit de la part relative du temps passé par tous les spans sur un intervalle et un statut HTTP donné - y compris le temps passé à attendre les processus enfants.<br>
**Type de métriquea:** [GAUGE][7].<br>
**Étiquettesa:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, toutes les étiquettes d'hôte de l'Agent d'Hôte Datadog, et [étiquettes principales supplémentaires][4].

## Impact de l'échantillonnage sur les métriques de trace {#sampling-impact-on-trace-metrics}

Dans la plupart des cas, les métriques de trace sont calculées sur la base de tout le trafic de l'application. Cependant, avec certaines configurations d'échantillonnage d'ingestion de trace, les métriques ne représentent qu'un sous-ensemble de toutes les requêtes.

### Échantillonnage côté application {#application-side-sampling}

Certaines SDK prennent en charge l'échantillonnage côté application, ce qui réduit le nombre de spans avant qu'ils ne soient envoyés à l'Agent Datadog. Par exemple, le SDK Ruby propose un échantillonnage côté application pour réduire la surcharge de performance. Cependant, cela peut affecter les métriques de trace, car l'Agent Datadog a besoin de tous les spans pour calculer des métriques précises. 

Très peu de SDK prennent en charge ce paramètre, et son utilisation n'est généralement pas recommandée.

### Échantillonnage OpenTelemetry {#opentelemetry-sampling}

Les mécanismes d'échantillonnage natifs du SDK OpenTelemetry réduisent le nombre de spans envoyées au Collector Datadog, ce qui se traduit par des métriques de traces échantillonnées et potentiellement imprécises.

### Échantillonnage X-Ray {#x-ray-sampling}

Les spans X-Ray sont échantillonnés avant d'être envoyés à Datadog, ce qui signifie que les métriques de trace pourraient ne pas refléter tout le trafic.


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/
[2]: /fr/tracing/trace_pipeline/ingestion_mechanisms
[3]: /fr/tracing/glossary/#trace-metrics
[4]: /fr/tracing/guide/setting_primary_tags_to_scope/#add-additional-primary-tags-in-datadog
[5]: /fr/metrics/types/?tab=count#metric-types
[6]: /fr/metrics/types/?tab=distribution#metric-types
[7]: /fr/metrics/types/?tab=gauge#metric-types
[8]: /fr/tracing/software_catalog/#services-types
[9]: /fr/tracing/glossary/#services
[10]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/