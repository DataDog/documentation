---
aliases:
- /fr/llm_observability/monitoring/metrics/
description: Découvrez les métriques utiles que vous pouvez générer à partir des données
  Agent Observability.
further_reading:
- link: llm_observability/
  tag: Documentation
  text: En savoir plus sur Agent Observability.
- link: monitors/
  tag: Documentation
  text: Créer et gérer des monitors pour informer vos équipes dès que nécessaire
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Suivez, comparez et optimisez vos prompts LLM avec Datadog LLM Observability.
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centre d'apprentissage
  text: Enquêter avec le LLM Observability
title: Métriques Agent Observability.
---
Une fois que vous avez instrumenté votre application avec Agent Observability, vous pouvez accéder aux métriques Agent Observability pour les utiliser dans des dashboards et des monitors. Ces métriques capturent le nombre de spans, le nombre d'erreurs, l'utilisation des jetons et les mesures de latence pour vos applications LLM. Ces métriques sont calculées sur la base de 100 % du trafic de l'application.

<div class="alert alert-info">
Le <code>ml_obs.*</code> Les entrées sur cette page sont <a href="/metrics/">Datadog Metrics</a> : des valeurs numériques qui décrivent un aspect de votre application LLM au fil du temps, dérivées de vos spans LLM (comptes, distributions de coûts, jetons, latence, erreurs). Elles sont échantillonnées à 100 %, suivent la <a href="/developers/guide/data-collection-resolution-retention/">rétention des métriques Datadog</a> standard (15 mois à granularité complète) et peuvent être interrogées depuis des dashboards, des monitors et des notebooks comme n'importe quelle autre métrique Datadog.
<br><br>
Elles se distinguent de deux autres éléments dans Agent Observability :
<ul>
<li><strong>Données opérationnelles par span</strong> (coût, jetons, latence, erreurs sur chaque trace ou span individuel) : les valeurs brutes à partir desquelles ces métriques sont agrégées. Stockées avec les spans, elles suivent la <a href="/llm_observability/setup/#data-retention">rétention des traces d'Agent Observability </a> et sont interrogées depuis le Trace Explorer plutôt qu'en tant que métriques.</li>
<li><strong><a href="/llm_observability/investigate/evaluations/">Scores d'évaluation</a></strong> (également appelés « evals ») : jugements de qualité et de sécurité (par exemple, hallucination, fidélité, LLM-as-a-judge personnalisé) associés à des spans individuels ou à des lignes d'expérience. Celles-ci ne sont pas dérivées de la télémétrie opérationnelle et suivent la rétention des traces et des expériences d'Agent Observability plutôt que la rétention des métriques de Datadog.</li>
</ul>
</div>

<div class="alert alert-info">Les autres tags définis sur les spans ne sont pas disponibles en tant que tags sur les métriques d'Agent Observability.</div>

### Métriques de span {#span-metrics}

| Nom de la métrique | Description | Type de métrique | Étiquettes |
|-------------|-------------|-------------|------|
| `ml_obs.span` | Nombre total de spans avec un type de span | Compteur | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.duration` | Durée totale des spans en secondes | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.error` | Nombre d'erreurs survenues dans le span | Compteur | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |

### Métriques de jetons LLM {#llm-token-metrics}

| Nom de la métrique | Description | Type de métrique | Étiquettes |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.tokens` | Nombre de jetons dans l'entrée envoyée au LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.tokens` | Nombre de jetons dans la sortie | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.tokens` | Nombre de jetons de raisonnement dans la sortie | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.prompt.tokens` | Nombre de jetons utilisés dans le prompt | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.completion.tokens` | Jetons générés en tant que complétion pendant l'intervalle | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.total.tokens` | Nombre total de jetons consommés pendant le span (entrée + sortie + prompt) | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.tokens` | Nombre de jetons d'entrée écrits dans le cache de prompt dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.tokens` | Nombre de jetons d'entrée servis depuis le cache de prompt dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.tokens` | Nombre de jetons d'entrée n'ayant pas interagi avec le cache de prompt dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.characters` | Nombre de caractères dans l'entrée envoyée au LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.characters` | Nombre de caractères dans la sortie | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |

### Métriques d'embedding {#embedding-metrics}

| Nom de la métrique | Description | Type de métrique | Étiquettes |
|-------------|-------------|-------------|------|
| `ml_obs.span.embedding.input.tokens` | Nombre de jetons d'entrée utilisés pour générer un embedding | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |

### Métriques de coût LLM {#llm-cost-metrics}

<div class="alert alert-info">
L'unité pour les métriques de coût estimé pour Agent Observability est le <strong>nanodollars</strong>.
</div>

| Nom de la métrique | Description | Type de métrique | Étiquettes |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.cost` | Coût d'entrée estimé dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.embedding.input.cost` | Coût d'entrée estimé dans un span d'embedding | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.cost` | Coût estimé du raisonnement en sortie dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.cost` | Coût estimé en sortie dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.total.cost` | Coût total estimé dans un span LLM ou d'embedding | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.cost` | Coût estimé d'entrée d'écriture en cache dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.cost` | Coût estimé d'entrée de lecture en cache dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.cost` | Coût estimé d'entrée non mis en cache dans un span LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |

### Métriques de trace {#trace-metrics}

| Nom de la métrique | Description | Type de métrique | Étiquettes |
|-------------|-------------|-------------|------|
| `ml_obs.trace` | Nombre de traces | Compteur | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.duration` | Durée totale de toutes les traces sur tous les spans | Distribution | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.error` | Nombre d'erreurs survenues pendant la trace | Compteur | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |

### Métriques d'utilisation estimées {#estimated-usage-metrics}

| Nom de la métrique | Description | Type de métrique | Étiquettes |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.input.tokens` | Nombre estimé de jetons d'entrée utilisés | Distribution | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |

### Métriques obsolètes {#deprecated-metrics}

<div class="alert alert-warning">
Les métriques suivantes sont obsolètes et ne sont conservées que pour des raisons de compatibilité ascendante. Datadog recommande vivement d'utiliser les métriques de jetons non obsolètes pour tous les cas d'utilisation de mesure de consommation de jetons.
</div>

| Nom de la métrique | Description | Type de métrique | Étiquettes |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.output.tokens` | Nombre estimé de jetons de sortie générés | Distribution | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |
| `ml_obs.estimated_usage.llm.total.tokens` | Nombre total estimé de jetons (entrée + sortie) utilisés | Distribution | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |

## Étapes suivantes {#next-steps}

{{< whatsnext desc="Utilisez vos métriques d'Agent Observability :" >}}
    {{< nextlink href="dashboards/" >}}Créez un dashboard pour suivre et corréler les métriques d'Agent Observability{{< /nextlink >}}
    {{< nextlink href="monitors/create/" >}}Créez un monitor pour les alertes et les notifications{{< /nextlink >}}
{{< /whatsnext >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}