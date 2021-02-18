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

| Paramètre               | Description                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<NOM_SPAN>`                | Le nom de l'opération ou `span.name` (par exemple : `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).                                                                                            |
| `<SUFFIXE_MÉTRIQUE>`       | Le nom de la métrique (par exemple : `duration`, `hits`, `span_count`). Référez-vous à la section ci-dessous.                                                                                                                                               |
| `<2E_TAG_PRIM>` | Si le nom de la métrique prend en compte le [deuxième tag primaire][4], ce tag fait partie du nom de la métrique.                                                                                                                       |
| `<TAGS>`                | Tags des métriques de trace. Les tags possibles sont : `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class` et les tags de l'Agent Datadog (y compris le tag host et le deuxième tag primaire). **Remarque :** les tags définis sur des spans ne sont pas pris en compte et ne seront pas disponibles comme tags pour vos métriques de trace. |

## Suffixes des métriques

### Hits

- `trace.<NOM_SPAN>.hits` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM.
  - *Description :* Représente le nombre de hits pour une span donnée.
  - *Type de métrique :* [COUNT][5]
  - *Tags :* `env`, `service`, `version`, `resource`, `http.status_code`, tous les tags de host de l'Agent pour host Datadog et le [deuxième tag primaire][4].

- `trace.<NOM_SPAN>.hits.by_http_status`
  - *Prérequis :* Cette métrique est disponible pour les services APM HTTP/WEB si des métadonnées http existent.
  - *Description :* Représente le nombre de hits pour une span donnée et pour chaque code de statut HTTP.
  - *Type de métrique :* [COUNT][5]
  - *Tags :* `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent pour host Datadog et le [deuxième tag primaire][4].

### Agrégation par centile

- `trace.<NOM_SPAN>.duration.by.resource_<2E_TAG_PRIM>_service.<AGRÉGATION_CENTILE>` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM.
  - *Description :* Mesure le temps de traitement total pour chaque ressource, service et [deuxième tag primaire][4].
  - *Type de métrique :* [GAUGE][6]
  - *Agrégations par centile :* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags :* `env`, `service`, `resource` et le [deuxième tag primaire][4].

- `trace.<NOM_SPAN>.duration.by.resource_service.<AGRÉGATION_CENTILE>` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM.
  - *Description :* Mesure le temps de traitement total pour chaque combinaison de ressource et de service.
  - *Type de métrique :* [GAUGE][6]
  - *Agrégations par centile :* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags :* `env`, `service` et `resource`.

- `trace.<NOM_SPAN>.duration.by.<2E_TAG_PRIM>_service.<AGRÉGATION_CENTILE>`
  - *Prérequis :* Cette métrique est disponible pour tous les services APM.
  - *Description :* Mesure le temps de traitement total pour chaque combinaison de [deuxième tag primaire][4] et de service.
  - *Type de métrique :* [GAUGE][6]
  - *Agrégations par centile :* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags :* `env`, `service` et le [deuxième tag primaire][4].

- `trace.<NOM_SPAN>.duration.by.service.<AGRÉGATION_CENTILE>`
  - *Prérequis :* Cette métrique est disponible pour tous les services APM.
  - *Description :* Représente la durée d'une span spécifique. Permet de surveiller la latence et de calculer des mesures telles que le temps d'attente moyen constaté par un utilisateur, ou le temps d'attente constaté par les 1 % d'utilisateurs les plus lents.
  - *Type de métrique :* [GAUGE][6]
  - *Agrégations par centile :* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags :* `env` et `service`.

### Erreurs

- `trace.<NOM_SPAN>.errors` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM.
  - *Description :* Représente le nombre d'erreurs pour une span donnée.
  - *Type de métrique :* [COUNT][5]
  - *Tags :* `env`, `service`, `version`, `resource`, `http.status_code`, tous les tags de host de l'Agent pour host Datadog et le [deuxième tag primaire][4].

- `trace.<NOM_SPAN>.errors.by_http_status` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM.
  - *Description :* Représente le nombre d'erreurs pour une span donnée.
  - *Type de métrique :* [COUNT][5]
  - *Tags :* `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent pour host Datadog et le [deuxième tag primaire][4].

### Duration

- `trace.<NOM_SPAN>.duration` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM.
  - *Description :* Mesure le temps total mesuré pour un groupe de spans. Plus précisément, il s'agit du temps de traitement total mesuré pour toutes les spans dans un intervalle donné, y compris le temps passé à attendre les processus enfants.
  - *Type de métrique :* [GAUGE][6]
  - *Tags :* `env`, `service`, `resource`, `http.status_code`, tous les tags de host de l'Agent pour host Datadog et le [deuxième tag primaire][4].

### Duration by
- `trace.<NOM_SPAN>.duration.by_http_status` :
  - *Prérequis :* Cette métrique est disponible pour les services APM HTTP/WEB si des métadonnées http existent.
  - *Description :* Mesure le temps total mesuré pour un groupe de spans pour chaque statut HTTP. Plus précisément, il s'agit de la part de temps de traitement mesurée pour toutes les spans dans un intervalle donné et pour un statut HTTP donné, y compris le temps passé à attendre les processus enfants.
  - *Type de métrique :* [GAUGE][6]
  - *Tags :* `env`, `service`, `resource`, `http.status_class`, `http.status_code`, tous les tags de host de l'Agent pour host Datadog et le [deuxième tag primaire][4].

### Apdex

- `trace.<NOM_SPAN>.apdex.by.resource_<2E_TAG_PRIM>_service` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM HTTP/WEB.
  - *Description :* Représente le score [Apdex][9] pour chaque combinaison de ressource, de [deuxième tag primaire][4] et de service.
  - *Type de métrique :* [GAUGE][6]
  - *Tags :* `env`, `service`, `resource` et le [deuxième tag primaire][4].

- `trace.<NOM_SPAN>.apdex.by.resource_service` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM HTTP/WEB.
  - *Description :* Mesure le score [Apdex][9] pour chaque combinaison de ressource et de service Web.
  - *Type de métrique :* [GAUGE][6]
  - *Tags :* `env`, `service` et `resource`.

- `trace.<NOM_SPAN>.apdex.by.<2E_TAG_PRIM>_service` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM HTTP/WEB.
  - *Description :* Mesure le score [Apdex][9] pour chaque combinaison de [deuxième tag primaire][4] et de service Web.
  - *Type de métrique :* [GAUGE][6]
  - *Tags :* `env`, `service` et le [deuxième tag primaire][4].

- `trace.<NOM_SPAN>.apdex.by.service` :
  - *Prérequis :* Cette métrique est disponible pour tous les services APM HTTP/WEB.
  - *Description :* Mesure le score [Apdex][9] pour chaque service Web.
  - *Type de métrique :* [GAUGE][6]
  - *Tags :* `env` et `service`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces/
[2]: /fr/tracing/setup/
[3]: /fr/tracing/visualization/#trace-metrics
[4]: /fr/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /fr/developers/metrics/types/?tab=count#metric-types
[6]: /fr/developers/metrics/types/?tab=gauge#metric-types
[7]: /fr/tracing/visualization/services_list/#services-types
[8]: /fr/tracing/visualization/#services
[9]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
