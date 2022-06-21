---
title: Métriques d'application de tracing
kind: guide
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Configurer le tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
aliases:
  - /fr/tracing/getting_further/metrics_namespace
---
## Présentation

Les métriques d'application de tracing sont collectées après l'[activation de la collecte de traces][1] et l'[instrumentation de votre application][2]. Ces métriques sont disponibles pour les dashboards et les monitors. Le format de l'espace de nommage des [métriques de traces][3] est le suivant :

- `trace.<NOM_SPAN>.<SUFFIXE_MÉTRIQUE>`
- `trace.<NOM_SPAN>.<SUFFIXE_MÉTRIQUE>.<2E_TAG_PRIM>_service`

Les paramètres sont définis comme suit :

`<NOM_SPAN>`
: Le nom de l'opération ou `span.name` (par exemple : `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<SUFFIXE_MÉTRIQUE>`
: Le nom de la métrique (par exemple : `duration`, `hits`, `span_count`). Référez-vous à la section ci-dessous.

`<2E_TAG_PRIM>` 
: Si le nom de la métrique prend en compte le [deuxième tag primaire][4], ce tag fait partie du nom de la métrique.

`<TAGS>`
: Les tags des métriques de trace. Voici la liste des tags pris en charge : `env`, `service`, `version`, `resource`, `sublayer_type`, `sublayer_service`, `http.status_code`, `http.status_class` et les tags de l'Agent Datadog (y compris le tag host et le deuxième tag primaire). **Remarque :** les tags définis sur des spans ne sont pas pris en compte et ne seront pas disponibles en tant que tags pour vos métriques de trace.

## Suffixe des métriques

### Hits

`trace.<NOM_SPAN>.hits`
: **Prérequis :** cette métrique est disponible pour tous les services APM.<br>
**Description :** elle représente le nombre de hits d'une span donnée.<br>
**Type de métrique :** [COUNT][5].<br>
**Tags :** `env`, `service`, `version`, `resource`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.hits.by_http_status`
: **Prérequis :** cette métrique est disponible pour les services APM de type HTTP/WEB tant que des métadonnées HTTP sont fournies.<br>
**Description :** elle représente le nombre de hits d'une span donnée, avec une répartition par code de statut HTTP.<br>
**Type de métrique :** [COUNT][5].<br>
**Tags :** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

### Distribution de la latence

`trace.<NOM_SPAN>`
: **Prérequis :** cette métrique est disponible pour tous les services de l'APM.<br>
**Description :** elle représente la distribution de latence pour l'ensemble des services, ressources et versions ainsi que tous les environnements et deuxièmes tags primaires.<br>
**Type de métrique :** [DISTRIBUTION][6].<br>
**Tags :** `env`, `service`, `resource`, `resource_name`, `version`, `synthetics` et [le deuxième tag primaire][4].


### Errors

`trace.<NOM_SPAN>.errors`
: **Prérequis :** cette métrique est disponible pour tous les services APM.<br>
**Description :** elle représente le nombre d'erreurs d'une span donnée.<br>
**Type de métrique :** [COUNT][5].<br>
**Tags :** `env`, `service`, `version`, `resource`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.errors.by_http_status`
: **Prérequis :** cette métrique est disponible pour tous les services APM.<br>
**Description :** elle représente le nombre d'erreurs d'une span donnée.<br>
**Type de métrique :** [COUNT][5].<br>
**Tags :** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].


### Span count

**Remarque** : cet espace de nommage est obsolète.

`trace.<NOM_SPAN>.span_count`
: **Prérequis :** cette métrique est disponible pour tous les services APM.<br>
**Description :** elle représente le nombre de spans recueillies lors d'un intervalle donné.<br>
**Type de métrique :** [COUNT][5].<br>
**Tags :** `env`, `service`, `resource`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.span_count.by_http_status`
: **Prérequis :** cette métrique est disponible pour les services APM de type HTTP/WEB tant que des métadonnées HTTP sont fournies.<br>
**Description :** elle représente le nombre de spans recueillies lors d'un intervalle donné, réparties par statut HTTP.<br>
**Type de métrique :** [COUNT][5].<br>
**Tags :** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].


### Duration

`trace.<NOM_SPAN>.duration`
: **Prérequis :** cette métrique est disponible pour tous les services APM.<br>
**Description :** elle correspond à la durée totale mesurée pour un groupe de spans. Plus précisément, il s'agit du temps de traitement total mesuré par toutes les spans dans un intervalle donné, y compris le temps passé à attendre les processus enfant.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

### Duration by

`trace.<NOM_SPAN>.duration.by_http_status`
: **Prérequis :** cette métrique est disponible pour les services APM HTTP/WEB tant que des métadonnées HTTP sont fournies.<br>
**Description :** elle correspond à la durée totale mesurée pour un groupe de spans, pour chaque statut HTTP. Plus précisément, il s'agit de la proportion de la durée de traitement mesurée pour toutes les spans lors d'un intervalle donné et pour un statut HTTP précis, y compris le temps passé à attendre les processus enfant.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.duration.by_service`
: **Prérequis :** cette métrique est disponible pour tous les services APM.<br>
**Description :** elle mesure la durée réelle totale du traitement pour chaque service (c'est-à-dire, en excluant le temps passé à attendre les processus enfant).<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource`, `sublayer_service`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.duration.by_type`
: **Prérequis :** cette métrique est disponible pour tous les services APM.<br>
**Description :** elle mesure la durée réelle totale du traitement pour chaque [type de service][8].<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource`, `sublayer_type`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.duration.by_type.by_http_status`
: **Prérequis :** cette métrique est disponible pour les services APM de type HTTP/WEB tant que des métadonnées HTTP sont fournies.<br>
**Description :** elle mesure la durée réelle totale du traitement pour chaque [type de service][8] et statut HTTP.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource`, `sublayer_type`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.duration.by_service.by_http_status`
: **Prérequis :** cette métrique est disponible pour les services APM de type HTTP/WEB tant que des métadonnées HTTP sont fournies.<br>
**Description :** elle mesure la durée réelle totale du traitement pour chaque [service][9] et statut HTTP.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource`, `sublayer_service`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent de host Datadog et le [deuxième tag primaire][4].

### Apdex

`trace.<NOM_SPAN>.apdex`
: **Prérequis :** cette métrique est disponible pour tous les services APM de type HTTP/WEB.<br>
**Description :** elle mesure le score [Apdex][10] pour chaque service Web.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource` / `resource_name`, `version`, `synthetics` et le [deuxième tag primaire][4].

**Les métriques Apdex suivantes sont désormais obsolètes.**

`trace.<NOM_SPAN>.apdex.by.resource_<2E_TAG_PRIM>_service`
: **Prérequis :** cette métrique est disponible pour tous les services APM de type HTTP/WEB.<br>
**Description :** elle mesure le score [Apdex][10] pour toutes les combinaisons de ressources, [deuxièmes tags primaires][4] et services.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource`/`resource_name` et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.apdex.by.resource_service`
: **Prérequis :** cette métrique est disponible pour tous les services APM de type HTTP/WEB.<br>
**Description :** elle mesure le score [Apdex][10] de chaque combinaison de ressources et de services Web.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service` et `resource`/`resource_name`.

`trace.<NOM_SPAN>.apdex.by.<2E_TAG_PRIM>_service`
: **Prérequis :** cette métrique est disponible pour tous les services APM de type HTTP/WEB.<br>
**Description :** elle mesure le score [Apdex][10] pour chaque combinaison de [deuxième tag primaire][4] et de service Web.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service` et le [deuxième tag primaire][4].

`trace.<NOM_SPAN>.apdex.by.service`
: **Prérequis :** cette métrique est disponible pour tous les services APM de type HTTP/WEB.<br>
**Description :** elle mesure le score [Apdex][10] pour chaque service Web.<br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env` et `service`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces/
[2]: /fr/tracing/setup/
[3]: /fr/tracing/visualization/#trace-metrics
[4]: /fr/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /fr/metrics/types/?tab=count#metric-types
[6]: /fr/metrics/types/?tab=distribution#metric-types
[7]: /fr/metrics/types/?tab=gauge#metric-types
[8]: /fr/tracing/visualization/services_list/#services-types
[9]: /fr/tracing/visualization/#services
[10]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/