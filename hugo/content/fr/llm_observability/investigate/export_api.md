---
aliases:
- /fr/llm_observability/evaluations/export_api/
description: Référence de l'API Agent Observability Export, qui fournit des endpoints
  pour rechercher et récupérer des données de span pour des évaluations externes ou
  un stockage hors ligne.
title: API d'exportation
---
## Présentation {#overview}

L'API Agent Observability Export fournit des endpoints pour récupérer des données de span. Ces endpoints vous permettent d'accéder par programmation à vos données Agent Observability pour exécuter des évaluations externes et exporter des spans pour un stockage hors ligne.

<div class="alert alert-info">Par défaut, nous exportons les spans des 15 dernières minutes. Si vous devez effectuer une recherche en dehors de cette période, veuillez spécifier une plage horaire dans votre requête.</div>

## Rechercher des spans {#search-spans}

Utilisez cet endpoint pour rechercher et filtrer les spans Agent Observability en fonction de critères spécifiques.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events/search`

Méthode
: `POST`

### Requête {#request}

#### En-têtes (requis) {#headers-required}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`
- `Content-Type="application/vnd.api+json"`

#### Données du corps (requises) {#body-data-required}

{{< tabs >}}
{{% tab "Model" %}}
| Champ | Type | Description                  |
|-------|------------------------------|------|
| data[requis] | [SearchSpansRequest](#searchspansrequest) | Point d'entrée dans le corps de la requête. |
{{% /tab %}}

{{% tab "Exemple" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "spans",
    "attributes": {
      "filter": {
        "from": "2025-10-27T00:00:00Z",
        "to": "2025-10-29T23:59:59Z",
        "trace_id": "123456789",
        "span_kind": "llm",
        "tags": {
          "test-key": "correct-test-value"
        }
      },
      "page": {
        "limit": 2
      },
      "options": {
        "time_offset": 3600
      },
      "sort": "timestamp"
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Exemple de code {#code-example}

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events/search" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/vnd.api+json" \
-d @- << EOF
{
  "data": {
    "type": "spans",
    "attributes": {
      "filter": {
        "from": "2025-10-27T00:00:00Z",
        "to": "2025-10-29T23:59:59Z",
        "span_id": "14624140233640368324"
      }
    }
  }
}
EOF
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Lister les spans {#list-spans}

Utilisez cet endpoint pour récupérer une liste de spans Agent Observability.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events`

Méthode
: `GET`

### Requête {#request-1}

#### En-têtes (requis) {#headers-required-1}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`

#### Paramètres de requête {#query-parameters}

| Paramètre | Type | Description                  |
|-------|------------------------------|------|
| filter[query] | chaîne | Recherche des spans en utilisant la syntaxe de requête EVP générique. Si aucun filtre de requête n'est fourni, les autres filtres ont la priorité. |
| filter[span_id] | chaîne | Recherche un span spécifique par son ID de span. |
| filter[trace_id] | chaîne | Recherche des spans par leur ID de trace. |
| filter[tag][clé] | chaîne | Recherche des spans par paires clé/valeur de tag. |
| filter[span_kind] | chaîne | Le type de span : « agent », « workflow », « llm », « tool », « task », « embedding » ou « retrieval ». |
| filter[span_name] | chaîne | Recherche des spans en fonction de leur nom fourni. |
| filter[ml_app] | chaîne | Recherche des spans soumis sous une application ML particulière. |
| filter[from] | chaîne | Horodatage minimal pour les spans demandés. Prend en charge le format date-heure ISO8601, le calcul de date et les horodatages classiques (millisecondes). La valeur par défaut est l'heure actuelle moins 15 minutes. |
| filter[to] | chaîne | Horodatage maximal pour les spans demandés. Prend en charge le format date-heure ISO8601, le calcul de date et les horodatages classiques (millisecondes). La valeur par défaut est l'heure actuelle. |
| sort | chaîne | Ordre de tri. Valeurs autorisées : timestamp, -timestamp |
| include_attachments | booléen | Indique s'il faut récupérer le contenu tronqué des entrées et des sorties. La valeur par défaut est True. |
| page[cursor] | chaîne | Liste les résultats suivants avec un curseur fourni lors de la requête précédente. |
| page[limit] | entier | Nombre maximal de spans dans la réponse. Par défaut : 10. Limite configurable maximale : 5000. <br>**Remarque :** Les réponses sont soumises à une limite de taille de 50 Mo. Des limites élevées (100+) peuvent augmenter le temps de réponse. Si vos spans contiennent des entrées ou des sorties volumineuses, utilisez une limite inférieure et paginez avec `page[cursor]`. |

#### Exemple de code {#code-example-1}

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
# searches for spans from the past 15 minutes
--data-urlencode "filter[trace_id]=6903738200000000af2d3775dfc70530"
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Réponse {#response}

Les deux endpoints ont le même format de réponse. [Les résultats sont paginés](/logs/guide/collect-multiple-logs-with-pagination/).

{{< tabs >}}
{{% tab "Model" %}}
| Champ   | Type                        | Description                              |
|---------|-----------------------------|------------------------------------------|
| data    | [[SearchedSpanResource](#searchedspanresource)]             | Liste des spans correspondant aux critères de recherche. |
| meta    | [Meta](#meta)       | Métadonnées concernant la réponse.             |
| links    | [Links](#links)       | Attributs des liens.            |
{{% /tab %}}

{{% tab "Exemple" %}}
{{< code-block lang="json" >}}
{
  "data": [
    {
      "id": "14624140233640368324",
      "type": "span",
      "attributes": {
        "duration": 83000,
        "evaluation": {
          "failure_to_answer": {
              "eval_metric_type": "categorical",
              "value": "answered",
              "assessment": "pass",
              "status": "OK",
              "metadata": {
                  "_dd": {
                      "evaluation_kind": "failure_to_answer"
                  }
              },
              "llm_output": "answered"
          }
        },
        "input": {
          "value": "hi",
          "messages": [
            {
              "content": "hi",
              "role": "user"
            }
          ]
        },
        "metadata": {
          "test-key": "test-value"
        },
        "metrics": {
          "cache_read_input_tokens": 0,
          "cache_write_input_tokens": 0,
          "estimated_cache_read_input_cost": 0,
          "estimated_cache_write_input_cost": 0,
          "estimated_input_cost": 1500,
          "estimated_non_cached_input_cost": 1500,
          "estimated_output_cost": 6000,
          "estimated_total_cost": 7500,
          "input_tokens": 10,
          "non_cached_input_tokens": 10,
          "output_tokens": 10,
          "total_tokens": 20
        },
        "ml_app": "test-ml-app",
        "model_name": "gpt-4o-mini",
        "model_provider": "openai",
        "name": "llm_call_enriched",
        "output": {
          "value": "hello there",
          "messages": [
            {
              "content": "hello there",
              "role": "assistant"
            }
          ]
        },
        "parent_id": "undefined",
        "span_id": "14624140233640368324",
        "span_kind": "llm",
        "start_ns": 1761833858897,
        "status": "ok",
        "tags": [
          "service:test-service",
          "env:prod",
          "ddtrace.version:3.17",
          "test-key:test-value",
          "error:0",
          "source:llm-observability",
          "source:integration",
          "ml_app:test-ml-app",
          "version:",
          "language:python"
        ],
        "tool_definitions": [
          {
            "name": "test-tool",
            "description": "A test tool",
            "schema": {
              "test-key": "test-value"
            }
          }
        ],
        "trace_id": "6903738200000000af2d3775dfc70530"
      }
    }
  ],
  "meta": {
    "elapsed": 336,
    "request_id": "pddv1ChZucHRwTW96NFNfT3Z4bWFLTFBDWkR3Ii0KHYhY65R_1R21AyDpavSaeO2sul_V6omQLAyWutrzEgx-GnVDrZaMu-lW-Yc",
    "status": "done",
    "page": null
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## Normes API {#api-standards}

### SearchSpansRequest {#searchspansrequest}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| type [*requis*]        | chaîne                        | Identifiant de la requête. Définir sur `spans`. |
| attributes [*requis*]  | [SearchSpansPayload](#searchspanspayload) | Le corps de la requête.  |

### SearchSpansPayload {#searchspanspayload}

| Champ | Type | Description                  |
|-------|------------------------------|------|
| filter | [Filter](#filter) | Les paramètres de recherche et de filtrage de la requête. |
| options | [Options](#options) | Options de requête globales utilisées lors de la requête. |
| page | [PageQuery](#pagequery) | Attributs de pagination pour lister les spans. |
| sort | chaîne | Ordre de tri. Valeurs autorisées : timestamp, -timestamp |

### Filtrer {#filter}

| Champ | Type | Description |
|-------|------|-------------|
| query | chaîne | Recherche des spans en utilisant la syntaxe de requête EVP générique. Si aucun filtre de requête n'est fourni, les autres filtres ont la priorité. |
| span_id | chaîne | Recherche un span spécifique par son ID de span. |
| trace_id | chaîne | Recherche des spans par leur ID de trace. |
| tags | Dict[clé (chaîne de caractères), chaîne de caractères] | Recherche des spans par paires clé/valeur de tag. |
| span_kind | chaîne | Le type de span : « agent », « workflow », « llm », « tool », « task », « embedding » ou « retrieval ». |
| span_name | chaîne | Recherche des spans en fonction de leur nom fourni. |
| ml_app | chaîne | Recherche des spans soumis sous une application ML particulière. |
| from | chaîne | Horodatage minimal pour les spans demandés. Prend en charge le format date-heure ISO8601, le calcul de date et les horodatages classiques (millisecondes). La valeur par défaut est l'heure actuelle moins 15 minutes. |
| to | chaîne | Horodatage maximal pour les spans demandés. Prend en charge le format date-heure ISO8601, le calcul de date et les horodatages classiques (millisecondes). La valeur par défaut est l'heure actuelle. |

### Options {#options}

| Champ | Type | Description |
|-------|------|-------------|
| time_offset | entier | Le décalage temporel (en secondes) à appliquer à la requête. |
| include_attachments | booléen | Indique s'il faut récupérer le contenu tronqué des entrées et des sorties. La valeur par défaut est True. |

### PageQuery {#pagequery}

| Champ | Type | Description |
|-------|------|-------------|
| limit | entier | Nombre maximal de spans dans la réponse. Par défaut : 10. Limite configurable maximale : 5000. <br>**Remarque :** Les réponses sont soumises à une limite de taille de 50 Mo. Des limites élevées (100+) peuvent augmenter le temps de réponse. Si vos spans contiennent des entrées ou des sorties volumineuses, utilisez une limite inférieure et paginez avec `cursor`. |
| cursor | chaîne | Lister les résultats suivants avec un curseur fourni dans la requête précédente. |

### SearchedSpanResource {#searchedspanresource}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| type        | chaîne                        | Type du span. Valeurs autorisées : span. Par défaut : span. |
| id       | chaîne                        | ID unique du span. |
| attributes  | [SearchedSpan](#searchedspan) | Objet contenant tous les attributs du span et leurs valeurs associées.  |

### SearchedSpan {#searchedspan}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| span_id        | chaîne                        | Un ID unique pour le span. |
| trace_id        | chaîne                        | Un ID unique partagé par tous les spans dans la même trace. |
| parent_id        | chaîne                        | ID du parent direct du span. |
| tags        | [chaîne]                        | Tableau de tags associés à votre span. |
| name        | chaîne                       | Le nom du span. |
| status        | chaîne                       | Statut d'erreur (« ok » ou « error »). |
| start_ns        | entier                       | L'heure de début du span en nanosecondes. |
| duration        | flottante                       | La durée du span en nanosecondes. |
| ml_app        | chaîne                       | Le nom de l'application LLM du span. |
| metadata        | Dict[clé (chaîne), tout]                       | Données sur le span qui ne sont pas liées à l'entrée ou à la sortie. |
| span_kind        | chaîne                       | Le type de span : « agent », « workflow », « llm », « tool », « task », « embedding » ou « retrieval ». |
| model_name        | chaîne                       | Le nom du modèle utilisé dans la requête. Applicable uniquement aux spans LLM. |
| model_provider        | chaîne                       | Le fournisseur du modèle utilisé dans la requête. Applicable uniquement aux spans LLM. |
| input        | [SearchedIO](#searchedio)                      | Les informations d'entrée du span. |
| output        | [SearchedIO](#searchedio)                       | Les informations de sortie du span. |
| tool_definitions        | [[ToolDefinition](#tooldefinition)]                       | Liste des outils disponibles dans une requête LLM. |
| metrics        | Dict[clé (chaîne), flottante]                      | Métriques Datadog à collecter. |
| evaluation        | Dict[clé (chaîne), [SpanEvalMetric](#spanevalmetric)]                      | Un mappage des évaluations associées au span. |
| intent        | chaîne                       | L'intention d'un appel d'outil MCP. |

### SearchedIO {#searchedio}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| value        | chaîne                        | Valeur d'entrée ou de sortie. |
| messages        | [[Message](#message)]                        | Liste des messages. Ceci n'est pertinent que pour les spans LLM. |

### Message {#message}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| content        | chaîne                        | Le corps du message. |
| role        | chaîne                        | Le rôle de l'entité. |
| tool_calls        | [[ToolCall](#toolcall)]                     | Liste des appels d'outils effectués dans ce message. |
| tool_results        | [[ToolResults](#toolresult)]                     | Liste des résultats d'exécution d'outils dans ce message. |

### ToolCall {#toolcall}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| name        | chaîne                        | Le nom de l'outil appelé. |
| arguments        | Dict[clé (chaîne), tout]                         | Les arguments transmis à l'outil. |
| tool_id        | chaîne                        | Identifiant unique pour cet appel d'outil. |
| type        | chaîne                        | Le type d'appel d'outil. |

### ToolResult {#toolresult}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| name        | chaîne                        | Le nom de l'outil qui a été appelé. |
| result        | chaîne                        | Le résultat renvoyé par l'outil. |
| tool_id        | chaîne                        | Identifiant unique correspondant à l'appel d'outil associé. |
| type        | chaîne                        | Le type de résultat d'outil. |

### ToolDefinition {#tooldefinition}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| name        | chaîne                        | Le nom de l'outil. |
| description        | chaîne                       | La description de la fonction de l'outil. |
| schema        | Dict[clé (chaîne), tout]                       | Données sur les arguments qu'un outil accepte. |

### SpanEvalMetric {#spanevalmetric}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| eval_metric_type        | chaîne                        | Le type de métrique d'évaluation. Les valeurs valides sont `categorical`, `score`, `boolean` et `json`.  |
| value        | tout                       | Le résultat de l'évaluation. Peut être une chaîne, un nombre à virgule flottante, un booléen ou une valeur JSON. |
| reasoning        | chaîne                       | Raisonnement pour le résultat de l'évaluation. |
| assessment        | chaîne                       | Indique si l'évaluation a réussi ou échoué. Les valeurs valides sont `pass` et `fail`. |
| status        | chaîne                       | Le statut de l'exécution de l'évaluation. Les valeurs valides sont `OK`, `WARN` et `ERROR`. |
| error        | [EvalMetricError](#evalmetricerror)                       | Informations sur l'erreur survenue lors de l'exécution de l'évaluation (le cas échéant). |
| tags        | [chaîne]                       | Paires clé-valeur associées à la métrique d'évaluation. |
| action        | chaîne                       | L'action entreprise en réponse au résultat de l'évaluation pour les évaluations soumises par l'utilisateur. |
| eval_metric_metadata        | Dict[clé (chaîne), tout]                        | Données JSON arbitraires associées à l'évaluation. |
| llm_output        | chaîne                       | La sortie brute de l'appel LLM utilisé pour déterminer le résultat de l'évaluation. |

### EvalMetricError {#evalmetricerror}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| message        | chaîne                        | Une description de l'erreur. Cela peut inclure les raisons pour lesquelles l'évaluation a été ignorée ou un message d'erreur généré lors de l'exécution de l'évaluation. |
| stack        | chaîne                        | La trace de pile associée à l'erreur d'évaluation. |
| type        | chaîne                        | La catégorie d'erreur. L'une des raisons prédéfinies indiquant pourquoi l'évaluation a été ignorée ou a échoué. |
| recommended_resolution        | chaîne                        | Les étapes requises pour résoudre l'erreur. |

### Meta {#meta}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| elapsed        | entier                        | Le temps écoulé en millisecondes. |
| page        | [Page](#page)                        | Attributs de pagination. |
| request_id        | chaîne                       | L'identifiant de la requête. |
| status        | chaîne                       | Le statut de la réponse. Valeurs autorisées : done,timeout |

### Page {#page}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| after        | chaîne                        | Le curseur à utiliser pour obtenir les résultats suivants, le cas échéant. Pour effectuer la requête suivante, utilisez les mêmes paramètres en ajoutant le champ `page[cursor]`. |

### Liens {#links}

| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| next        | chaîne                        | Lien vers le prochain ensemble de résultats. Voir [Pagination][1]. |




[1]: https://jsonapi.org/format/#fetching-pagination