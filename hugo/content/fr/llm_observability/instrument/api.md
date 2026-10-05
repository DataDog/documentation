---
aliases:
- /fr/tracing/llm_observability/api
- /fr/llm_observability/api
- /fr/llm_observability/setup/api
- /fr/llm_observability/instrumentation/api/
description: Documentation de référence pour l'API HTTP Agent Observability, utilisée
  pour envoyer des traces et des spans LLM à Datadog depuis des applications dans
  n'importe quel langage.
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability prend nativement en charge les conventions sémantiques
    GenAI d'OpenTelemetry.
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Suivez, comparez et optimisez vos prompts LLM avec Datadog LLM Observability.
title: Référence de l'API HTTP
---
## Présentation {#overview}

L'API HTTP Agent Observability fournit une interface permettant aux développeurs d'envoyer des traces et des spans liés aux LLM à Datadog. Si votre application est écrite en Python, Node.js ou Java, vous pouvez utiliser les [SDK Agent Observability][1].

L'API accepte les spans dont les horodatages ne datent pas de plus de 24 heures, ce qui permet un remplissage limité des données retardées.

## Spans API {#spans-api}

Utilisez cet endpoint pour envoyer des spans à Datadog. Pour plus de détails sur les types de spans disponibles, consultez [Types de spans][2].

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`

Méthode
: `POST`

### Requête {#request}

#### En-têtes (requis) {#headers-required}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Données du corps (requises) {#body-data-required}

{{< tabs >}}
{{% tab "Model" %}}
| Champ | Type | Description                  |
|-------|------------------------------|------|
| data [*requis*]|  [SpansRequestData](#spansrequestdata) | Point d'entrée dans le corps de la requête. |
{{% /tab %}}

{{% tab "Exemple" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "span",
    "attributes": {
      "ml_app": "weather-bot",
      "session_id": "1",
      "feedback_join_key": "weather-request-123",
      "tags": [
        "service:weather-bot",
        "env:staging",
        "user_handle:example-user@example.com",
        "user_id:1234"
      ],
      "spans": [
        {
          "parent_id": "undefined",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<AGENT_SPAN_ID>",
          "name": "health_coach_agent",
          "meta": {
            "kind": "agent",
            "input": {
              "value": "What is the weather like today and do i wear a jacket?"
            },
            "output": {
              "value": "It's very hot and sunny, there is no need for a jacket"
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 10000000000
        },
        {
          "parent_id": "<AGENT_SPAN_ID>",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<WORKFLOW_ID>",
          "name": "qa_workflow",
          "meta": {
            "kind": "workflow",
            "input": {
              "value": "What is the weather like today and do i wear a jacket?"
            },
            "output": {
              "value":  "It's very hot and sunny, there is no need for a jacket"
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 5000000000
        },
        {
          "parent_id": "<WORKFLOW_SPAN_ID>",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<LLM_SPAN_ID>",
          "name": "generate_response",
          "meta": {
            "kind": "llm",
            "input": {
              "messages": [
                {
                  "role": "system",
                  "content": "Your role is to ..."
                },
                {
                  "role": "user",
                  "content": "What is the weather like today and do i wear a jacket?"
                }
              ]
            },
            "output": {
              "messages": [
                {
                  "content": "It's very hot and sunny, there is no need for a jacket",
                  "role": "assistant"
                }
              ]
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 2000000000
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Réponse {#response}
Si la requête aboutit, l'API répond avec un code réseau 202 et un corps vide.

### API standards {#api-standards}

#### Erreur {#error}
| Champ   | Type   | Description        |
|---------|--------|--------------------|
| message | string | Le message d'erreur. |
| stack   | string | La trace de pile.   |
| type    | string | Le type d'erreur.    |

#### E/S {#io}
| Champ   | Type   | Description  |
|---------|--------|--------------|
| value   | string | Valeur d'entrée ou de sortie. Si elle n'est pas définie, cette valeur est déduite des messages ou des documents. |
| messages| [[Message](#message)] | Liste des messages. À utiliser uniquement pour les spans LLM. |
| documents| [[Document](#document)] | Liste des documents. À utiliser uniquement comme sortie pour les retrieval spans. |
| prompt | [Prompt](#prompt) | Métadonnées de prompt structurées incluant le modèle et les variables utilisés pour l'entrée LLM. Ceci ne doit être utilisé que pour l'input IO sur les LLM spans. |
| embedding | [float] | Liste des valeurs d'embedding. |
| parameters | Dict[key (string), value] | Paramètres supplémentaires pour l'entrée ou la sortie. |


**Note**: Lorsque seul `input.messages` est défini pour un LLM span, Datadog déduit `input.value` de `input.messages` et utilise la logique d'inférence suivante :

1. Si un message avec `role=user` existe, le contenu du dernier message est utilisé comme `input.value`.
1. Si un message avec le rôle `user` n'est pas présent, `input.value` est déduit en concaténant les champs de contenu de tous les messages, indépendamment de leurs rôles.

#### Message {#message}

| Champ                | Type   | Description              |
|----------------------|--------|--------------------------|
| content [*required*] | string | Le corps du message. |
| role                 | string | Le rôle de l'entité.  |
| tool_calls | [[ToolCall](#toolcall)] | Liste des appels d'outils effectués dans ce message. |
| tool_results | [[ToolResult](#toolresult)] | Liste des résultats d'exécution d'outils dans ce message. |
| audio_parts | [[AudioPart](#audiopart)] | Liste des segments audio joints à ce message. À utiliser pour les LLM spans multimodales (voix). |
| image_parts | [[ImagePart](#imagepart)] | Liste des segments d'image joints à ce message. À utiliser pour les LLM spans multimodales (vision). |

#### Document {#document}
| Champ                | Type   | Description              |
|----------------------|--------|--------------------------|
| text | string | Le texte du document. |
| name    | string | Le nom du document.  |
| score | float | Le score associé à ce document. |
| id    | string | L'identifiant de ce document.  |
| ranking | integer | Le classement de ce document. |
| metadata | Dict[key (string), value] | Métadonnées supplémentaires pour ce document. |

#### ToolCall {#toolcall}

| Champ | Type | Description |
|-------|------|-------------|
| name | string | Le nom de l'outil appelé. |
| arguments | Dict[clé (chaîne), valeur] | Les arguments transmis à l'outil. |
| tool_id | string | Identifiant unique pour cet appel d'outil. |
| type | string | Le type d'appel d'outil. |

#### ToolResult {#toolresult}

| Champ | Type | Description |
|-------|------|-------------|
| name | string | Le nom de l'outil qui a été appelé. |
| result | string | Le résultat renvoyé par l'outil. |
| tool_id | string | Identifiant unique correspondant à l'appel d'outil associé. |
| type | string | Le type de résultat de l'outil. |

#### AudioPart {#audiopart}

Un segment audio sur un message. Fournissez soit `content` soit `attachment_key`.

| Champ | Type | Description |
|-------|------|-------------|
| mime_type [*requis*] | string | Le type de média de l'audio, tel que `audio/wav` ou `audio/pcm`. |
| content | string | L'audio encodé en base64, transmis en ligne avec le message. |
| attachment_key | string | Une référence à l'audio stocké en dehors de la charge utile du span, au lieu d'être en ligne `content`. |

#### ImagePart {#imagepart}

Une image sur un message. Fournissez soit `content` soit `attachment_key`.

| Champ | Type | Description |
|-------|------|-------------|
| mime_type [*requis*] | string | Le type de média de l'image, tel que `image/png` ou `image/jpeg`. |
| content | string | L'image encodée en base64, transportée en ligne avec le message. |
| attachment_key | string | Une référence à une image stockée en dehors de la charge utile du span, au lieu d'être en ligne `content`. |

#### ToolDefinition {#tooldefinition}

| Champ | Type | Description |
|-------|------|-------------|
| name | string | Le nom de l'outil. |
| description | string | Une description de ce que fait l'outil. |
| schema | Dict[clé (string), valeur] | Le schéma définissant les paramètres de l'outil. |

#### SpanField {#spanfield}

| Champ | Type | Description |
|-------|------|-------------|
| kind | string | Le type de champ span. |

#### Prompt {#prompt}

<div class="alert alert-info">Agent Observability enregistre les nouvelles versions des modèles lorsque la <code>template</code> ou <code>chat_template</code> valeur est mise à jour. Si l'entrée est susceptible de changer entre les appels, extrayez les parties dynamiques dans une variable.</div>

{{< tabs >}}
{{% tab "Model" %}}
| Champ                | Type   | Description              |
|----------------------|--------|--------------------------|
| id    | string | Identifiant logique pour ce modèle de prompt. Doit être unique par `ml_app`.  |
| name | string | Human-readable name for the prompt. |
| version | string | Version tag for the prompt (for example, « 1.0.0 »). Si aucune version n'est fournie, Agent Observability génère automatiquement une version en calculant un hash du contenu du modèle. |
| template | string | Forme de modèle à chaîne unique. Utilisez la syntaxe d'espace réservé (comme `{{variable_name}}`) to embed variables. This should not be set with `chat_template`. |
| chat_template | [[Message]](#message) | Multi-message template form. Use placeholder syntax (like `{{variable_name}}`) to embed variables in message content. This should not be set with `template`. |
| variables | Dict[key (string), string] | Variables utilisées pour rendre le modèle. Les clés correspondent aux noms d'espace réservé dans le modèle. |
| query_variable_keys | [string] | Clés de variable contenant la requête de l'utilisateur. Utilisé pour la détection d'hallucination. |
| context_variable_keys | [string] | Clés de variable contenant le contenu de référence ou de contexte. Utilisé pour la détection d'hallucination. |
| tags | Dict[key (string), string] | Tags à attacher à l'exécution du prompt. |

{{% /tab %}}
{{% tab "Exemple" %}}
{{< code-block lang="json" >}}
{
  "id": "translation-prompt",
  "chat_template": [
    {
      "role": "system",
      "content": "You are a translation service. You translate to {{language}}."
    }, {
      "role": "user",
      "content": "{{user_input}}"
    }
  ],
  "variables": {
    "language": "french",
    "user_input": "<USER_INPUT_TEXT>"
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Meta {#meta}
| Champ       | Type              | Description  |
|-------------|-------------------|--------------|
| kind [*requis*]    | string | Le [type de span][2] : `"agent"`, `"workflow"`, `"llm"`, `"tool"`, `"task"`, `"embedding"`, ou `"retrieval"`.      |
| error       | [Error](#error)             | Informations d'erreur sur le span.              |
| input       | [IO](#io)                | Informations d'entrée du span.               |
| output      | [IO](#io)                | Informations de sortie du span.              |
| metadata                 | Dict[key (string), value] où la valeur est un float, un bool ou une string | Données sur le span qui ne sont pas liées à l'entrée ou à la sortie. Par exemple, vous pouvez transmettre `temperature` et `max_tokens` pour les spans LLM. |
| model_name | string | Le nom du modèle utilisé pour les spans LLM. |
| model_provider | string | Le fournisseur du modèle utilisé pour les spans LLM. |
| model_version | string | La version du modèle utilisé pour les spans LLM. |
| embedding_for_prompt_idx | integer | L'index de prompt pour lequel les embeddings ont été calculés. |
| span | [SpanField](#spanfield) | Informations sur le champ span. |
| tool_definitions | [[ToolDefinition](#tooldefinition)] | Liste des définitions d'outils disponibles. |
| expected_output | [IO](#io) | Les informations de sortie attendues. |
| intent | string | L'intention du span. |

#### Metrics {#metrics}

Un dictionnaire de métriques à collecter pour le span. Les clés sont les noms des métriques (chaînes de caractères) et les valeurs sont les valeurs des métriques (pointeurs float64). Les métriques courantes incluent :
- `input_tokens` - Le nombre de jetons d'entrée (spans LLM)
- `output_tokens` - Le nombre de jetons de sortie (spans LLM)
- `total_tokens` - Le nombre total de jetons (spans LLM)
- `non_cached_input_tokens` - Le nombre de jetons d'entrée non mis en cache (spans LLM)
- `cache_read_input_tokens` - Le nombre de jetons d'entrée lus depuis le cache (spans LLM)
- `cache_write_input_tokens` - Le nombre de jetons d'entrée écrits dans le cache (spans LLM)
- `reasoning_output_tokens` - Le nombre de jetons de raisonnement (spans LLM)
- `time_to_first_token` - Temps en secondes pour le premier jeton de sortie (LLM en streaming, spans racines)
- `time_per_output_token` - Temps en secondes par jeton de sortie (LLM en streaming, spans racines)
- `input_cost` - Coût d'entrée en dollars (spans LLM et d'intégration)
- `output_cost` - Coût de sortie en dollars (spans LLM)
- `total_cost` - Coût total en dollars (spans LLM)
- `non_cached_input_cost` - Coût d'entrée non mis en cache en dollars (spans LLM)
- `cache_read_input_cost` - Coût d'entrée de lecture du cache en dollars (spans LLM)
- `cache_write_input_cost` - Coût d'entrée d'écriture du cache en dollars (spans LLM)
- `reasoning_output_cost`- Coût de sortie de raisonnement en dollars (spans LLM)

Type : `Dict[key (string), float64]`

#### Span {#span}

| Span       | Type              | Description         |
|-------------|-------------------|---------------------|
| name [*requis*]       | string            | Le nom du span.          |
| span_id [*requis*]     | string            | Un identifiant unique pour le span.       |
| trace_id  [*requis*]   | string            | Un identifiant unique partagé par tous les spans de la même trace.     |
| parent_id  [*requis*]    | string | Identifiant du parent direct du span. Si le span est un root span, le `parent_id` doit être `undefined`. |
| start_ns [*requis*]     | uint64            | L'heure de début du span en nanosecondes.     |
| duration  [*requis*]     | float64           | La durée du span en nanosecondes.          |
| meta [*requis*]         | [Meta](#meta)              | Le contenu principal relatif au span.       |
| status      | string            | État d'erreur (`"ok"` ou `"error"`). Par défaut à `"ok"`.      |
| apm_trace_id | string      | L'ID de la trace APM associée. Par défaut, correspond au champ `trace_id`.   |
| metrics     | Dict[key (string), float64]           | Métriques Datadog à collecter. Voir [Metrics](#metrics) pour les noms de métriques courants.         |
| session_id  | string     | L'`session_id` du span. Remplace le champ `session_id` de haut niveau.    |
| feedback_join_key | string | Une clé définie par le client utilisée pour connecter les commentaires à ce span. Remplace le champ `feedback_join_key` de haut niveau. Pour plus de détails, voir [Feedback de l'utilisateur final][4]. |
| tags        | [[Tag](#tag)] | Une liste de tags à appliquer à ce span particulier.       |
| service | string | Le nom du service. |
| ml_app | string | Le nom de l'application LLM pour ce span. Remplace le champ `ml_app` de haut niveau. |

#### SpansRequestData {#spansrequestdata}
| Champ      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| type [*requis*]        | string                        | Identifiant de la requête. Défini sur `span`. |
| attributes [*requis*]  | [SpansPayload](#spanspayload) | Le corps de la requête.  |

#### SpansPayload {#spanspayload}
| Champ    | Type                | Description  |
|----------|---------------------|--------------|
| ml_app [*requis*] | chaîne              | Le nom de votre application LLM. Consultez les [Directives de nommage des applications](#application-naming-guidelines).     |
| spans [*requis*]  | [[Span](#span)] | Une liste de spans.           |
| tags                | [[Tag](#tag)]   | Une liste de tags de haut niveau à appliquer à chaque span.        |
| session_id          | chaîne              | La session à laquelle appartient la liste de spans. Peut également être remplacé ou défini sur des spans individuels. |
| feedback_join_key   | chaîne              | Une clé définie par le client utilisée pour connecter les commentaires aux spans dans la charge utile. Peut également être remplacé ou défini sur des spans individuels. Pour plus de détails, voir [Feedback de l'utilisateur final][4]. |

#### Tag {#tag}

Les tags doivent être formatés sous forme de liste de chaînes (par exemple, `["user_handle:dog@gmail.com", "app_version:1.0.0"]`). Ils sont destinés à stocker des informations contextuelles entourant le span.

Pour plus d'informations sur les tags, consultez [Getting Started with Tags][3].

#### Directives de nommage des applications {#application-naming-guidelines}

Le nom de votre application (la valeur de `DD_LLMOBS_ML_APP`) doit être une chaîne Unicode en minuscules. Il peut contenir les caractères listés ci-dessous :

- Alphanumériques
- Traits de soulignement
- Tirets
- Deux-points
- Points
- Barres obliques

Le nom peut comporter jusqu'à 193 caractères et ne doit pas contenir de traits de soulignement consécutifs ou finaux.

## Evaluations API {#evaluations-api}

<div class="alert alert-info">Pour des exemples complets et des conseils sur la création d'évaluateurs personnalisés, consultez le <a href="/llm_observability/guide/evaluation_developer_guide/">Evaluation Developer Guide</a>.</div>

Utilisez cet endpoint pour envoyer des évaluations et des commentaires d'utilisateurs finaux à Datadog. Les évaluations peuvent être associées à des spans, des traces ou des sessions. Les commentaires des utilisateurs finaux peuvent être associés à des spans, des traces, des sessions ou une clé de jointure de commentaires définie par le client.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

Méthode
: `POST`

Utilisez le champ `eval_scope` pour définir la granularité d'une évaluation :

- **`span`** (par défaut) : L'évaluation est associée à un span spécifique. Utilisez `join_on` pour identifier le span cible avec une paire clé-valeur de tag ou une combinaison d'ID de span et d'ID de trace.
- **`trace`** : L'évaluation est associée à une trace entière. Utilisez `join_on` pour identifier le span racine de la trace.
- **`session`** : L'évaluation est associée à une session. Fournissez `session_id` au lieu de `join_on`.

Pour soumettre du feedback, définissez `event_kind` sur `feedback`. Les événements de feedback doivent inclure `submitter.id`, omettre `join_on` et fournir exactement un champ cible : `span_id`, `trace_id`, `session_id` ou `feedback_join_key`. Si `eval_scope` est omis, Datadog le déduit du champ cible.

Utilisez `feedback_join_key` lorsque le feedback s'applique à une entité externe, telle qu'un incident ID, un report ID, un task ID ou un release check ID, au lieu d'un unique span, trace ou session. Pour que le feedback apparaisse avec la télémétrie associée, définissez le même `feedback_join_key` sur les spans associés lorsque vous les soumettez avec l'[Spans API](#spans-api) ou en ajoutant un tag `feedback_join_key:incident-1234` via [Enriching spans][5].

Pour créer des widgets de tableau de bord à partir du feedback, créez le widget comme vous le feriez pour une évaluation et ajoutez le filtre `@event_kind:feedback`.

<div class="alert alert-info">La prise en charge du filtrage des spans, des traces ou des sessions par feedback n'est pas disponible. Par exemple, vous ne pouvez pas encore filtrer les traces pour ne conserver que celles ayant reçu un feedback thumbs-down. Utilisez des tableaux de bord limités à <code>@event_kind:feedback</code> à la place.</div>

### Requête {#request-1}

#### En-têtes (requis) {#headers-required-1}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Données du corps (requises) {#body-data-required-1}

{{< tabs >}}
{{% tab "Model" %}}
| Champ | Type | Description                  |
|-------|------------------------------|------|
| données [*requises*]  | [EvalMetricsRequestData](#evalmetricsrequestdata) | Point d'entrée dans le corps de la requête. |
{{% /tab %}}

{{% tab "Exemple" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "eval_scope": "span",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
        {
          "eval_scope": "trace",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "assessment": "fail",
          "reasoning": "The response provided incorrect information about the weather forecast."
        },
        {
          "eval_scope": "session",
          "session_id": "abc123def456",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "boolean",
          "label": "Topic Relevancy",
          "boolean_value": true
        },
        {
          "eval_scope": "span",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "json",
          "label": "Custom Evaluation",
          "json_value": {
            "verdict": "pass",
            "confidence": 0.95,
            "is_valid": true,
            "metrics": {
              "accuracy": 0.92,
              "precision": 0.88
            },
            "passed_checks": ["coherence", "relevance", "factuality"]
          }
        },
        {
          "event_kind": "feedback",
          "feedback_join_key": "weather-request-123",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The response did not answer whether I needed a jacket.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Réponse {#response-1}

{{< tabs >}}
{{% tab "Model" %}}
| Champ   | Type                        | Description                              | Garanti |
|---------|-----------------------------|------------------------------------------|------------|
| ID      | string                      | UUID de réponse généré lors de la soumission. | Oui        |
| metrics | [[EvalMetric](#evalmetric)] | Une liste d'évaluations ou d'événements de feedback. | Oui        |
{{% /tab %}}

{{% tab "Exemple" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "id": "456f4567-e89b-12d3-a456-426655440000",
    "attributes": {
      "metrics": [
        {
          "id": "d4f36434-f0cd-47fc-884d-6996cee26da4",
          "eval_scope": "span",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
        {
          "id": "cdfc4fc7-e2f6-4149-9c35-edc4bbf7b525",
          "eval_scope": "trace",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "assessment": "fail",
          "reasoning": "The response provided incorrect information about the weather forecast."
        },
        {
          "id": "haz3fc7-g3p2-1s37-8m12-ndk4hbf7a522",
          "eval_scope": "session",
          "session_id": "abc123def456",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "boolean",
          "label": "Topic Relevancy",
          "boolean_value": true
        },
        {
          "id": "abc1234-h4i5-6j78-9k01-lmn2opq3rst4",
          "eval_scope": "span",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "json",
          "label": "Custom Evaluation",
          "json_value": {
            "verdict": "pass",
            "confidence": 0.95,
            "is_valid": true,
            "metrics": {
              "accuracy": 0.92,
              "precision": 0.88
            },
            "passed_checks": ["coherence", "relevance", "factuality"]
          }
        },
        {
          "id": "fedbk34-h4i5-6j78-9k01-lmn2opq3rst4",
          "event_kind": "feedback",
          "eval_scope": "external",
          "feedback_join_key": "weather-request-123",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The response did not answer whether I needed a jacket.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Normes API {#api-standards-1}

#### Attributs {#attributes}

| Champ   | Type         | Description                                         |
|---------|--------------|-----------------------------------------------------|
| metrics [*requis*] | [[EvalMetric](#evalmetric)] | Une liste d'évaluations ou d'événements de retour d'information. |
| tags        | [[Tag](#tag)] | Une liste de tags à appliquer à toutes les évaluations ou à tous les événements de feedback dans la charge utile. |

#### EvalMetric {#evalmetric}

| Champ                                                              | Type                | Description                                                                                            |
|--------------------------------------------------------------------|---------------------|--------------------------------------------------------------------------------------------------------|
| ID                                                                 | string              | UUID de la métrique d'évaluation (généré lors de la soumission).                                                    |
| event_kind                                                         | string              | Le type d'événement. Les valeurs acceptées sont `"evaluation"` et `"feedback"`. Par défaut, il prend la valeur `"evaluation"` lorsqu'il est omis. |
| eval_scope                                                         | string              | La granularité de l'événement : `"span"` (par défaut pour les évaluations), `"trace"`, `"session"` ou `"external"` pour le feedback ciblé par `feedback_join_key`. Pour le feedback, ceci peut être omis et déduit du champ cible. |
| join_on [*requis pour les évaluations de périmètre de span et de trace*]          | [[JoinOn](#joinon)] | Comment une évaluation est jointe à un span ou une trace. Requis pour les évaluations lorsque `eval_scope` est `"span"` ou `"trace"`. Doit être absent pour le feedback et pour les évaluations de session. |
| span_id                                                            | string              | Pour le feedback, l'ID du span auquel le feedback est associé. Utilisez ceci comme l'un des champs cibles de feedback. |
| trace_id                                                           | string              | Pour le feedback, l'ID de la trace à laquelle le feedback est associé. Utilisez ceci comme l'un des champs cibles de feedback. |
| session_id [*requis pour les évaluations de périmètre de session*]              | string              | L'ID de session auquel l'événement est associé. Requis pour les évaluations lorsque `eval_scope` est `"session"`. Pour le feedback, utilisez ceci comme l'un des champs cibles de feedback. Doit être absent lorsque `eval_scope` non associé au feedback est `"span"` ou `"trace"`. |
| feedback_join_key                                                  | string              | Pour le feedback, une clé définie par le client pour le feedback qui s'applique à une entité externe au lieu d'un seul span, trace ou session. Doit être absent pour les évaluations. |
| submitter [*requis pour le feedback*]                                | [Submitter](#submitter) | L'utilisateur, l'agent ou toute autre entité ayant soumis le feedback. |
| timestamp_ms [*requis*]                                          | int64               | Un horodatage UNIX UTC en millisecondes représentant l'heure à laquelle la requête a été envoyée.                       |
| ml_app [*requis*]                                                | string              | Le nom de votre application LLM. Consultez les [Directives de nommage des applications](#application-naming-guidelines). |
| metric_type [*requis*]                                           | string              | Le type de valeur : `"categorical"`, `"score"`, `"boolean"`, `"json"` ou `"text"`. Le type `"text"` est pris en charge uniquement pour les événements de feedback. |
| label [*requis*]                                                 | string              | Le nom ou l'étiquette unique pour l'évaluation ou le retour fourni.                                      |
| categorical_value [*requis si le metric_type est « categorical »*] | string              | Une chaîne représentant la valeur de la catégorie. Non requis lorsque `status` est `"WARN"` ou `"ERROR"`. |
| score_value [*requis si le metric_type est « score »*]             | number              | Une valeur de score. Non requis lorsque `status` est `"WARN"` ou `"ERROR"`. |
| boolean_value [*requis si le metric_type est « boolean »*]         | boolean             | Une valeur booléenne. Non requis lorsque `status` est `"WARN"` ou `"ERROR"`. |
| json_value [*requis si le metric_type est « json »*]               | Dict[key (string), value] | Une valeur d'objet JSON. Non requis lorsque `status` est `"WARN"` ou `"ERROR"`. |
| text_value [*requis si le metric_type est « text »*]               | string              | Une valeur textuelle. Ceci n'est pris en charge que pour les événements de feedback et est utile pour le feedback en texte libre.          |
| status                                                             | string              | Le résultat de l'exécution de l'évaluateur. Les valeurs acceptées sont `"OK"`, `"WARN"` et `"ERROR"`. Lorsque `"WARN"` ou `"ERROR"`, l'évaluateur a été ignoré ou a échoué, et aucun champ de valeur typée (`categorical_value`, `score_value`, etc.) n'est requis. |
| error                                                              | [EvalMetricError](#evalmetricerror) | Détails structurés de l'erreur. Requis lorsque `status` est `"WARN"` ou `"ERROR"`. |
| assessment                                                         | string              | Une appréciation de cette évaluation. Les valeurs acceptées sont `pass` et `fail`.                               |
| reasoning                                                          | string              | Une explication textuelle du résultat de l'évaluation.                                                           |
| tags                                                               | [[Tag](#tag)]       | Une liste d'étiquettes à appliquer à cette métrique d'évaluation particulière.                                          |

Pour les événements de feedback, fournissez exactement l'un des éléments suivants : `span_id`, `trace_id`, `session_id` ou `feedback_join_key`. Si vous fournissez `eval_scope`, il doit correspondre au champ cible : `span_id` correspond à `"span"`, `trace_id` correspond à `"trace"`, `session_id` correspond à `"session"` et `feedback_join_key` correspond à `"external"`.

#### Submitter {#submitter}

| Champ | Type | Description |
|-------|------|-------------|
| id [*requis*] | chaîne : | Identifiant de l'utilisateur, de l'agent ou de toute autre entité ayant soumis le feedback. |
| type | chaîne : | Catégorie du soumetteur. Les valeurs recommandées sont `user` et `agent`. |

#### JoinOn {#joinon}

| Champ      | Type            | Description  |
|------------|-----------------|--------------|
| span | [[SpanContext](#spancontext)] | Identifie de manière unique le span associé à cette évaluation en utilisant l'ID de span et l'ID de trace. |
| tag | [[TagContext](#tagcontext)] | Identifie de manière unique le span associé à cette évaluation en utilisant une paire clé-valeur de tag. |

#### SpanContext {#spancontext}

| Champ      | Type            | Description  |
|------------|-----------------|--------------|
| span_id [*requis*] | chaîne : | L'ID de span du span auquel cette évaluation est associée. Doit être une chaîne décimale (par exemple, `"20245611112024561111"`). Si votre instrumentation produit des ID de span hexadécimaux (comme OpenTelemetry), convertissez-les en décimal avant de les soumettre. |
| trace_id [*requis*] | chaîne : | L'ID de trace du span auquel cette évaluation est associée. Doit être une chaîne décimale (par exemple, `"13932955089405749200"`) ou une chaîne hexadécimale en minuscules de 32 caractères pour les ID de trace de 128 bits. |

#### TagContext {#tagcontext}

| Champ      | Type            | Description  |
|------------|-----------------|--------------|
| key [*requis*] | chaîne : | Le nom de la clé de tag. Il doit s'agir de la même key utilisée lors de la définition du tag sur le span.  |
| value [*requis*] | chaîne : | La value du tag. Cette value doit correspondre exactement à un span avec la paire clé/valeur de tag spécifiée. |


#### EvalMetricsRequestData {#evalmetricsrequestdata}

| Champ      | Type            | Description  |
|------------|-----------------|--------------|
| type [*requis*]      | chaîne | Identifiant de la requête. Défini sur `evaluation_metric`. |
| attributs [*requis*] | [[Attributes](#attributes)] | Le corps de la requête. |

#### EvalMetricError {#evalmetricerror}

| Champ   | Type   | Description                                                |
|---------|--------|------------------------------------------------------------|
| type    | chaîne | Le type d'erreur ou d'exception (par exemple, `"ValueError"`). |
| message | chaîne | Une description de l'erreur lisible par l'homme.                 |
| stack   | chaîne | La trace de pile, si disponible.                             |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/setup/sdk/
[2]: /fr/llm_observability/quickstart/terms/
[3]: /fr/getting_started/tagging/
[4]: /fr/llm_observability/configure/evaluations/end_user_feedback
[5]: /fr/llm_observability/instrument/sdk/?tab=python#enriching-spans