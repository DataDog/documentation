---
aliases:
- /fr/tracing/getting_further/metrics_namespace
- /fr/tracing/guide/metrics_namespace
further_reading:
- link: tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing d'APM avec votre application
- link: tracing/services/services_list/
  tag: Documentation
  text: Découvrir la liste des services transmettant des données à Datadog
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

## Présentation

Pour recueillir les métriques d'application de tracing, vous devez avoir [activé la collecte des traces et instrumenté votre application][1].

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="Métriques de trace" >}}

Ces métriques capturent le nombre de requêtes, le nombre d'erreurs et les mesures de latence. Elles sont calculées pour l'ensemble du trafic de l'application, peu importe l'[échantillonnage ces traces ingérées][2] que vous avez configuré. Afin de bénéficier d'une visibilité complète sur le trafic de votre application, vous pouvez vous servir de ces métriques pour créer des dashboards, monitors et SLO. Vous pourrez ainsi identifier les erreurs potentielles concernant un service ou une ressource.

**Remarque** : si vos applications et services sont instrumentés avec des bibliothèques OpenTelemetry et que vous avez configuré l'échantillonnage au niveau du SDK ou au niveau du Collector, les métriques APM sont calculées en fonction de l'ensemble de données échantillonné.

Des métriques de trace sont générées pour les spans d'entrée de service et certaines opérations, selon le langage de l'intégration. Par exemple, l'intégration Django produit des métriques de trace à partir de spans qui représentent différentes opérations (1 span racine pour la requête Django, 1 pour chaque middleware et 1 pour la vue).

L'espace de nommage des [métriques de trace][3] est formaté comme suit :

- `trace.<NOM_SPAN>.<SUFFIXE_MÉTRIQUE>`
- `trace.<NOM_SPAN>.<SUFFIXE_MÉTRIQUE>.<2E_TAG_PRIM>_service`

Les paramètres sont définis comme suit :

`<NOM_SPAN>`
: Le nom de l'opération ou `span.name` (par exemple : `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<SUFFIXE_MÉTRIQUE>`
: Le nom de la métrique (par exemple : `duration`, `hits`, `span_count`). Référez-vous à la section ci-dessous.

`<2ND_PRIM_TAG>`
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


### Erreurs

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


### Durée

<div class="alert alert-warning">Cette méthode d'utilisation des métriques de trace est obsolète. À la place, nous vous conseillons de <a href="/tracing/guide/ddsketch_trace_metrics/">tracer les métriques de distribution avec DDSketch</a>.</div>

`trace.<NOM_SPAN>.duration`
: **Prérequis :** cette métrique existe pour tous les services APM.<br>
**Description :** [OBSOLÈTE] Correspond à la durée totale mesurée pour un groupe de spans dans un intervalle de temps, y compris les spans enfants détectées par le service de collecte. Cette métrique est utilisée pour générer le graphique « % exec time for downstream services » (% de temps d'exécution pour les services en aval). Le fait de diviser `trace.<NOM_SPAN>.duration` par `trace.<NOM_SPAN>.hits`, peut donner une latence moyenne, mais cette méthode de calcul de la latence moyenne n'est pas recommandée. Consultez plutôt la section [Distribution de la latence](#distribution-de-la-latence) pour effectuer ce calcul. <br>
**Type de métrique :** [GAUGE][7].<br>
**Tags :** `env`, `service`, `resource`, `http.status_code`, tous les tags de host de l'Agent pour host Datadog et le [deuxième tag primaire][4].

### Duration by

<div class="alert alert-warning">Cette méthode d'utilisation des métriques de trace est obsolète. À la place, nous vous conseillons de <a href="/tracing/guide/ddsketch_trace_metrics/">tracer les métriques de distribution avec DDSketch</a>.</div>

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



{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/
[2]: /fr/tracing/trace_pipeline/ingestion_mechanisms
[3]: /fr/tracing/glossary/#trace-metrics
[4]: /fr/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /fr/metrics/types/?tab=count#metric-types
[6]: /fr/metrics/types/?tab=distribution#metric-types
[7]: /fr/metrics/types/?tab=gauge#metric-types
[8]: /fr/tracing/services/services_list/#services-types
[9]: /fr/tracing/glossary/#services
[10]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/