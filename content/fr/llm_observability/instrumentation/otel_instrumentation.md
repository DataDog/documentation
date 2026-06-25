---
description: Instrumentez les applications LLM avec OpenTelemetry en utilisant les
  conventions sémantiques GenAI et envoyez les traces à Datadog Agent Observability
  sans le SDK Datadog.
title: 'Instrumentation OpenTelemetry :'
---
## Aperçu {#overview}
En utilisant les conventions sémantiques standardisées d'OpenTelemetry pour les opérations d'IA générative, vous pouvez instrumenter vos applications LLM avec n'importe quelle bibliothèque ou framework compatible OpenTelemetry et visualiser les traces dans Agent Observability.

Agent Observability prend en charge l'ingestion des traces OpenTelemetry qui suivent les [conventions sémantiques OpenTelemetry 1.37+ pour l'IA générative][1]. Cela vous permet d'envoyer des traces LLM directement depuis des applications instrumentées avec OpenTelemetry à Datadog sans nécessiter le SDK Datadog Agent Observability ou un Datadog Agent.

## Prérequis {#prerequisites}

- Une [clé API Datadog][2]
- Une application instrumentée avec OpenTelemetry qui émet des traces suivant les [conventions sémantiques OpenTelemetry 1.37+ pour l'IA générative][1]

Pour envoyer <a href="/llm_observability/evaluations/external_evaluations#submitting-external-evaluations-with-the-api">des évaluations externes directement à l'API</a> pour les spans OpenTelemetry, vous devez inclure le <code>source:otel</code> tag dans l'évaluation. Lors de la référence aux spans, fournissez <code>span_id</code> et <code>trace_id</code> sous forme de chaînes décimales. OpenTelemetry utilise des identifiants hexadécimaux nativement, donc convertissez-les en décimal avant de soumettre les évaluations. Par exemple, utilisez la fonction de Python <code>int(hex_span_id, 16)</code> pour convertir un identifiant de span hexadécimal en son équivalent décimal.

Pour des informations sur l'utilisation du suivi des invites avec les spans OpenTelemetry, consultez <a href="/llm_observability/monitoring/prompt_tracking#opentelemetry-instrumentation">Suivi des invites - Instrumentation OpenTelemetry</a>.

Vous pouvez également utiliser des spans OpenTelemetry à l'intérieur de <a href="/llm_observability/experiments/setup#using-opentelemetry-spans-inside-experiments">Expériences Agent Observability</a>. En définissant <code>DD_TRACE_OTEL_ENABLED=1</code>, les spans OTel créés à l'intérieur d'une tâche d'expérience apparaissent automatiquement comme des enfants du span d'expérience.

## Configuration {#setup}

Pour envoyer des traces OpenTelemetry à Agent Observability, configurez votre exportateur OpenTelemetry avec les paramètres suivants :

### Configuration {#configuration}

Définissez les variables d'environnement suivantes dans votre application :

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=llmobs
```

Remplacez `<YOUR_API_KEY>` par votre [clé API Datadog][2].

Si votre framework prenait auparavant en charge une version de spécification OpenTelemetry antérieure à 1.37, vous devez également définir :

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

Cette variable d'environnement active les traces OpenTelemetry conformes à la version 1.37+ pour les frameworks qui prennent désormais en charge les conventions sémantiques de la version 1.37+, mais qui prenaient auparavant en charge des versions plus anciennes (comme [strands-agents][5]).

**Remarque** :
* Si vous utilisez une bibliothèque OpenTelemetry autre que le SDK OpenTelemetry par défaut, vous devrez peut-être configurer l'endpoint, le protocole et les en-têtes différemment selon l'API de la bibliothèque. Consultez la documentation de votre bibliothèque pour la méthode de configuration appropriée.
* Lors de l'utilisation de l'instrumentation OpenTelemetry, certaines données envoyées à Agent Observability peuvent également être écrites dans les traces APM correspondantes. Si vous protégez des données sensibles, envisagez également de configurer un ensemble de données restreint sur APM pour correspondre à vos contrôles d'accès Agent Observability. Consultez [Contrôle d'accès aux données][8] pour plus d'informations.

#### Utilisation de strands-agents {#using-strands-agents}

Si vous utilisez la [`strands-agents` bibliothèque][5], vous devez définir une variable d'environnement supplémentaire pour activer les traces conformes à OpenTelemetry v1.37+ :

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

Cette variable d'environnement garantit que `strands-agents` émet des traces suivant les conventions sémantiques OpenTelemetry v1.37+ pour l'IA générative, qui sont requises par Agent Observability.

### Instrumentation {#instrumentation}

Pour générer des traces compatibles avec Agent Observability, choisissez l'une des méthodes suivantes :

- Utilisez une bibliothèque OpenTelemetry ou un package d'instrumentation qui émet des spans suivant les [conventions sémantiques OpenTelemetry 1.37+ pour l'IA générative][1].
- Créez une instrumentation OpenTelemetry personnalisée qui produit des spans avec les attributs `gen_ai.*` requis, tels que définis dans les conventions sémantiques.

Après le démarrage de votre application, les traces apparaissent automatiquement dans la page [**Traces d'observabilité LLM**][3]. Pour rechercher vos traces dans l'interface utilisateur, utilisez l'attribut `ml_app`, qui est automatiquement défini sur la valeur de l'attribut `service` de votre span racine OpenTelemetry.

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> version 0.47+ est pris en charge. Consultez l'<a href="#using-openllmetry">exemple OpenLLMetry</a>.
<li/> OpenInference n'est pas pris en charge.
<li/> Il peut y avoir un délai de 3 à 5 minutes entre l'envoi des traces et leur apparition sur la page des Traces d'observabilité LLM. Si vous avez APM activé, les traces apparaissent immédiatement sur la page des Traces APM.
</ul>
</div>

## Frameworks et bibliothèques testés {#tested-frameworks-and-libraries}

Ces frameworks et bibliothèques ont été testés avec Datadog Agent Observability. Tout framework qui émet des spans conformes à la [convention sémantique OpenTelemetry 1.37+ GenAI][1] est pris en charge.

{{< tabs >}}
{{% tab "Python" %}}
| Framework | Instrumentation | Versions prises en charge |
|-----------|----------------|--------------------|
| [OpenAI][20] | [`opentelemetry-instrumentation-openai-v2`][21] | >= 1.26.0 |
| [Anthropic][22] | [`opentelemetry-instrumentation-anthropic`][23] | >= 0.51.0 |
| [Google GenAI][24] | [`opentelemetry-instrumentation-google-genai`][25] | >= 1.32.0 |
| [Google Vertex AI][26] | [`opentelemetry-instrumentation-vertexai`][27] | >= 1.64.0 |
| [AWS Bedrock][28] | [`opentelemetry-instrumentation-botocore`][29] | >= 1.31.57 |
| [LangChain][30] | [`opentelemetry-instrumentation-langchain`][31] | >= 0.3.21 |
| [LlamaIndex][32] | [`opentelemetry-instrumentation-llamaindex`][33] | >= 0.14.12 |
| [Strands Agents][5] | Natif | >= 1.11.0 |
| [OpenLLMetry][34] | [`traceloop-sdk`][35] | >= 0.47.0 |

[5]: https://pypi.org/project/strands-agents/
[20]: https://platform.openai.com/docs/api-reference/introduction
[21]: https://pypi.org/project/opentelemetry-instrumentation-openai-v2/
[22]: https://docs.anthropic.com/en/api/
[23]: https://pypi.org/project/opentelemetry-instrumentation-anthropic/
[24]: https://ai.google.dev/gemini-api/docs
[25]: https://pypi.org/project/opentelemetry-instrumentation-google-genai/
[26]: https://cloud.google.com/vertex-ai/generative-ai/docs/overview
[27]: https://pypi.org/project/opentelemetry-instrumentation-vertexai/
[28]: https://docs.aws.amazon.com/bedrock/latest/userguide/
[29]: https://pypi.org/project/opentelemetry-instrumentation-botocore/
[30]: https://python.langchain.com/docs/introduction/
[31]: https://pypi.org/project/opentelemetry-instrumentation-langchain/
[32]: https://docs.llamaindex.ai/
[33]: https://pypi.org/project/opentelemetry-instrumentation-llamaindex/
[34]: https://www.traceloop.com/openllmetry
[35]: https://pypi.org/project/traceloop-sdk/
{{% /tab %}}
{{% tab "Node.js" %}}
| Framework | Instrumentation | Versions prises en charge |
|-----------|----------------|--------------------|
| [OpenAI][40] | [`@opentelemetry/instrumentation-openai`][41] | >= 4.19.0 |

[40]: https://platform.openai.com/docs/api-reference/introduction
[41]: https://www.npmjs.com/package/@opentelemetry/instrumentation-openai
{{% /tab %}}
{{% tab "Java" %}}
| Framework | Instrumentation | Versions prises en charge |
|-----------|----------------|--------------------|
| [Spring AI][50] | Native (via [Micrometer][51]) | >= 1.0.0 |
| [LangChain4j][52] | Native (module OpenTelemetry) | >= 0.31.0 |
| [AWS Bedrock][53] | [OpenTelemetry Java Agent][54] | AWS SDK >= 2.2 |

[50]: https://docs.spring.io/spring-ai/reference/
[51]: https://micrometer.io/
[52]: https://docs.langchain4j.dev/
[53]: https://docs.aws.amazon.com/bedrock/latest/userguide/
[54]: https://opentelemetry.io/docs/zero-code/java/agent/
{{% /tab %}}
{{< /tabs >}}

## Exemples {#examples}

### Utilisation des agents Strands {#using-strands-agents-1}

L'exemple suivant démontre une application complète utilisant [Strands Agents][7] avec l'intégration OpenTelemetry. Cette même approche fonctionne avec tout framework qui prend en charge les conventions sémantiques OpenTelemetry version 1.37+ pour l'IA générative.

```python
from strands import Agent
from strands_tools import calculator, current_time
from strands.telemetry.config import StrandsTelemetry
import os

# Configure AWS credentials for Bedrock access
os.environ["AWS_PROFILE"] = "<YOUR_AWS_PROFILE>"
os.environ["AWS_DEFAULT_REGION"] = "<YOUR_AWS_REGION>"

# Enable latest GenAI semantic conventions (1.37)
os.environ["OTEL_SEMCONV_STABILITY_OPT_IN"] = "gen_ai_latest_experimental"

# Configure OTLP endpoint to send traces to Datadog Agent Observability
os.environ["OTEL_EXPORTER_OTLP_TRACES_PROTOCOL"] = "http/protobuf"
os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "{{< region-param key="otlp_trace_endpoint" code="true" >}}"
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = f"dd-api-key={os.getenv('DD_API_KEY')},dd-otlp-source=llmobs"

# Initialize telemetry with OTLP exporter
telemetry = StrandsTelemetry()
telemetry.setup_otlp_exporter()

# Create agent with tools
agent = Agent(tools=[calculator, current_time])

# Run the agent
if __name__ == "__main__":
    result = agent("I was born in 1993, what is my age?")
    print(f"Agent: {result}")
```

### Instrumentation OpenTelemetry personnalisée {#custom-opentelemetry-instrumentation}

L'exemple suivant démontre comment instrumenter votre application LLM en utilisant du code OpenTelemetry personnalisé. Cette approche vous donne un contrôle total sur les traces et les spans émis par votre application.

```python
import os
import json
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource, SERVICE_NAME
from openai import OpenAI

# Configure OpenTelemetry to send traces to Datadog
os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "{{< region-param key="otlp_trace_endpoint" code="true" >}}"
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = "dd-api-key=<YOUR_DATADOG_API_KEY>,dd-otlp-source=llmobs"
os.environ["OTEL_SEMCONV_STABILITY_OPT_IN"] = "gen_ai_latest_experimental"

# Initialize OpenTelemetry SDK
resource = Resource(attributes={SERVICE_NAME: "simple-llm-example"})
provider = TracerProvider(resource=resource)
provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer(__name__)

# Make LLM call with OpenTelemetry tracing
with tracer.start_as_current_span(
    "chat gpt-4o",
    kind=trace.SpanKind.CLIENT,
) as span:
    model = "gpt-4o"
    max_tokens = 1024
    temperature = 0.7
    messages = [{"role": "user", "content": "Explain OpenTelemetry in one sentence."}]

    # Set request attributes
    span.set_attribute("gen_ai.provider.name", "openai")
    span.set_attribute("gen_ai.request.model", model)
    span.set_attribute("gen_ai.operation.name", "chat")
    span.set_attribute("gen_ai.request.max_tokens", max_tokens)
    span.set_attribute("gen_ai.request.temperature", temperature)

    # Add input messages as event
    input_messages_parts = []
    for msg in messages:
        input_messages_parts.append({
            "role": msg["role"],
            "parts": [{"type": "text", "content": msg["content"]}]
        })

    span.add_event(
        "gen_ai.client.inference.operation.details",
        {
            "gen_ai.input.messages": json.dumps(input_messages_parts)
        }
    )

    # Make actual LLM call
    client = OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
    response = client.chat.completions.create(
        model=model,
        max_tokens=max_tokens,
        temperature=temperature,
        messages=messages
    )

    # Set response attributes from actual data
    span.set_attribute("gen_ai.response.id", response.id)
    span.set_attribute("gen_ai.response.model", response.model)
    span.set_attribute("gen_ai.response.finish_reasons", [response.choices[0].finish_reason])
    span.set_attribute("gen_ai.usage.input_tokens", response.usage.prompt_tokens)
    span.set_attribute("gen_ai.usage.output_tokens", response.usage.completion_tokens)

    # Add output messages as event
    output_text = response.choices[0].message.content
    span.add_event(
        "gen_ai.client.inference.operation.details",
        {
            "gen_ai.output.messages": json.dumps([{
                "role": "assistant",
                "parts": [{"type": "text", "content": output_text}],
                "finish_reason": response.choices[0].finish_reason
            }])
        }
    )

    print(f"Response: {output_text}")

# Flush spans before exit
provider.force_flush()
```

Après avoir exécuté cet exemple, recherchez `ml_app:simple-llm-example` dans l'interface utilisateur d'observabilité LLM pour trouver la trace générée.

### Utilisation d'OpenLLMetry {#using-openllmetry}

L'exemple suivant démontre l'utilisation de [OpenLLMetry](https://github.com/traceloop/openllmetry) pour instrumenter automatiquement les appels OpenAI avec OpenTelemetry.

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.openai import OpenAIInstrumentor
import openai
from opentelemetry.sdk.resources import Resource

resource = Resource.create({
    "service.name": "simple-openllmetry-test",
})

provider = TracerProvider(resource=resource)
trace.set_tracer_provider(provider)

exporter = OTLPSpanExporter(
    endpoint="{{< region-param key="otlp_trace_endpoint" code="true" >}}",
    headers={
        "dd-api-key": "<YOUR_DATADOG_API_KEY>",
        "dd-ml-app": "simple-openllmetry-test",
        "dd-otlp-source": "llmobs",
    },
)

provider.add_span_processor(BatchSpanProcessor(exporter))

OpenAIInstrumentor().instrument()

# Make OpenAI call (automatically traced)
client = openai.OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}]
)

provider.force_flush(timeout_millis=5000)
```

Après avoir exécuté cet exemple, recherchez `ml_app:simple-openllmetry-test` dans l'interface utilisateur d'observabilité LLM pour trouver la trace générée.

## Référence de mappage d'attributs {#attribute-mapping-reference}

Cette section fournit le mappage entre les conventions sémantiques OpenTelemetry GenAI (v1.37+) ainsi qu'OpenLLMetry au schéma de span d'observabilité LLM de Datadog.

<div class="alert alert-info">Les mappages spécifiques à OpenLLMetry sont documentés séparément dans la section <a href="#openllmetry-attribute-mappings">Mappages d'attributs OpenLLMetry</a>.</div>

### Mappages d'attributs OpenTelemetry 1.37+ {#opentelemetry-137-attribute-mappings}

#### Attributs de base des spans {#base-span-attributes}

| Champ OTLP | Champ d'observabilité LLM | Remarques |
|------------|--------------|-------|
| `resource.attributes.service.name` | `ml_app`, `tags.service` | |
| `name` | `name` | Remplacé par `gen_ai.tool.name` si présent |
| `parent_span_id` | `parent_id` | |
| `start_time_unix_nano` | `start_ns` | |
| `end_time_unix_nano` | `duration` | Calculé : fin - début |
| `status.code` | `status` | `error` si > 0, sinon `ok` |
| `status.message` | `meta.error.message` | |
| `attributes.error.type` | `meta.error.type` | |

#### Résolution du type de span {#span-kind-resolution}

| `gen_ai.operation.name` | Observabilité LLM `span.kind` |
|-------------------------|-------------------|
| `generate_content`, `chat`, `text_completion`, `completion` | `llm` |
| `embeddings`, `embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`, `create_agent` | `agent` |
| `rerank`, `unknown`, *(par défaut)* | `workflow` |

#### Informations sur le modèle {#model-information}

| Attribut OTel | Champ d'observabilité LLM | Notes |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | Voir le tableau de résolution ci-dessus |
| `gen_ai.provider.name` | `meta.model_provider` | Revient à `gen_ai.system`, puis `custom` |
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | Solution de repli lorsque `response.model` est absent |

#### Métriques d'utilisation des jetons {#token-usage-metrics}

| Attribut OTel | Champ d'observabilité LLM |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### Paramètres de requête {#request-parameters}

Tous `gen_ai.request.*` les paramètres correspondent à `meta.metadata.*` avec le préfixe supprimé.

| Attribut OTel | Champ d'observabilité LLM |
|----------------|--------------|
| `gen_ai.request.seed` | `metadata.seed` |
| `gen_ai.request.frequency_penalty` | `metadata.frequency_penalty` |
| `gen_ai.request.max_tokens` | `metadata.max_tokens` |
| `gen_ai.request.stop_sequences` | `metadata.stop_sequences` |
| `gen_ai.request.temperature` | `metadata.temperature` |
| `gen_ai.request.top_k` | `metadata.top_k` |
| `gen_ai.request.top_p` | `metadata.top_p` |
| `gen_ai.request.choice.count` | `metadata.choice.count` |

#### Attributs de l'outil {#tool-attributes}

| Attribut OTel | Champ d'observabilité LLM | Notes |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | Nom du span remplacé |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | Tableau JSON analysé |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### Session et conversation {#session-and-conversation}

| Attribut OTel | Champ d'observabilité LLM | Notes |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | Également ajouté à `metadata.conversation_id` et étiquettes |

#### Attributs de réponse {#response-attributes}

| Attribut OTel | Champ d'observabilité LLM |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### Messages d'entrée et de sortie {#input-and-output-messages}

Les messages d'entrée et de sortie sont extraits des sources suivantes, par ordre de priorité :

1. Attributs directs : `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`
2. Span events (`meta["events"]`) with name `gen_ai.client.inference.operation.details`

| OTel Source | Champ d'observabilité LLM | Remarques |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages` (llm) / `meta.input.value` (autres) | |
| `gen_ai.output.messages` | `meta.output.messages` (llm) / `meta.output.value` (autres) | |
| `gen_ai.system_instructions` | Préfixé à l'entrée | Ajouté en tant que messages de rôle système |

##### Embedding spans {#embedding-spans}

| OTel Source | Champ d'observabilité LLM |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Étiquettes {#tags}

Les étiquettes sont placées directement sur le span :

- Les attributs non-`gen_ai.*` sont convertis en balises `key:value`
- Les clés inconnues `gen_ai.*` sont ajoutées avec le préfixe supprimé
- Filtrés : `_dd.*`, `llm.*`, `ddtags`, `events`, et les clés `gen_ai.*` déjà spécifiquement mappées

<div class="alert alert-info">Tout <code>gen_ai.*</code> Les attributs qui ne sont pas explicitement mappés aux champs de portée d'observabilité LLM sont placés dans les étiquettes de la portée LLM, avec une limite de 256 caractères par valeur. Les valeurs dépassant cette limite sont tronquées. Tous les autres non-<code>gen_ai</code> attributs sont supprimés.</div>

### Mappages d'attributs OpenLLMetry {#openllmetry-attribute-mappings}

Cette section documente les mappages d'attributs spécifiques à OpenLLMetry qui diffèrent ou étendent les conventions sémantiques standard d'OpenTelemetry GenAI.

#### Résolution du type de portée {#span-kind-resolution-1}

`llm.request.type` est utilisé comme solution de repli lorsque `gen_ai.operation.name` est absent.

| `llm.request.type` | Observabilité LLM `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`, *(par défaut)* | `workflow` |

#### Informations sur le modèle {#model-information-1}

| OpenLLMetry Attribute | Agent Observability Field | Notes |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | Solution de repli lorsque `gen_ai.provider.name` est absent |

#### Métriques d'utilisation des jetons {#token-usage-metrics-1}

| OpenLLMetry Attribute | Agent Observability Field | Notes |
|-----------------------|--------------|-------|
| `llm.usage.total_tokens` | `metrics.total_tokens` | Solution de repli lorsque `gen_ai.usage.total_tokens` est absent |

#### Messages d'entrée et de sortie {#input-and-output-messages-1}

OpenLLMetry utilise des attributs indexés au lieu de tableaux JSON. Ce sont les sources de la plus basse priorité et ne sont utilisées que lorsque aucune source standard OTel n'existe.

##### Attributs de prompt (entrée) {#prompt-attributes-input}

| Attribut OpenLLMetry | Description |
|-----------------------|-------------|
| `gen_ai.prompt.<index>.role` | Rôle du message (utilisateur, système, assistant, outil) |
| `gen_ai.prompt.<index>.content` | Contenu du message |
| `gen_ai.prompt.<index>.tool_call_id` | ID d'appel d'outil pour les messages de réponse d'outil |

##### Attributs de complétion (sortie) {#completion-attributes-output}

| Attribut OpenLLMetry | Description |
|-----------------------|-------------|
| `gen_ai.completion.<index>.role` | Rôle du message |
| `gen_ai.completion.<index>.content` | Contenu du message |
| `gen_ai.completion.<index>.finish_reason` | Raison de la fin de la complétion |

##### Mapping {#mapping}

Les messages sont convertis au format compatible OTel et traités normalement :

| OpenLLMetry Source | LLMObs Field |
|--------------------|--------------|
| `gen_ai.prompt.*` | `meta.input.messages` (llm) / `meta.input.value` (autres) |
| `gen_ai.completion.*` | `meta.output.messages` (llm) / `meta.output.value` (autres) |

#### Appels d'outils {#tool-calls}

Les appels d'outils sont imbriqués dans les attributs de complétion.

| Attribut OpenLLMetry | Correspond à |
|-----------------------|---------|
| `gen_ai.completion.<index>.tool_calls.<idx>.name` | `tool_calls[].name` |
| `gen_ai.completion.<index>.tool_calls.<idx>.id` | `tool_calls[].tool_id` |
| `gen_ai.completion.<index>.tool_calls.<idx>.arguments` | `tool_calls[].arguments` |

##### Messages de réponse des outils {#tool-response-messages}

Lorsque `role = "tool"` et `tool_call_id` sont présents, le message est converti en un résultat d'outil :

| Attribut OpenLLMetry | Correspond à |
|-----------------------|---------|
| `gen_ai.prompt.<index>.tool_call_id` | `tool_results[].tool_id` |
| `gen_ai.prompt.<index>.content` | `tool_results[].result` |

#### Embedding spans {#embedding-spans-1}

Pour les embedding spans, les documents sont extraits des attributs de contenu de l'invite.

| OpenLLMetry Source | Agent Observability Field |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### Filtrage des étiquettes {#tags-filtering}

Les attributs spécifiques à OpenLLMetry suivants sont filtrés des étiquettes :

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

## Conventions sémantiques prises en charge {#supported-semantic-conventions}

Agent Observability prend en charge les spans qui suivent les conventions sémantiques OpenTelemetry 1.37+ pour l'IA générative, y compris :

- Opérations LLM avec `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model` et d'autres attributs gen_ai
- Entrées/sorties d'opération sur les attributs de span directs ou via des événements de span
- Métriques d'utilisation des jetons (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- Paramètres et métadonnées du modèle

Pour la liste complète des attributs pris en charge et de leurs spécifications, voir la [documentation des conventions sémantiques OpenTelemetry pour l'IA générative][1].

## Disabling Agent Observability conversion {#disabling-llm-observability-conversion}

Si vous souhaitez que vos spans d'IA générative restent uniquement dans APM et n'apparaissent pas dans Agent Observability, vous pouvez désactiver la conversion automatique en définissant l'attribut `dd_llmobs_enabled` sur `false`. Définir cet attribut sur n'importe quel span dans une trace empêche la conversion de l'ensemble de la trace en Agent Observability.

### Utilisation des variables d'environnement {#using-environment-variables}

Ajoutez l'attribut `dd_llmobs_enabled=false` à votre variable d'environnement `OTEL_RESOURCE_ATTRIBUTES` :

```
OTEL_RESOURCE_ATTRIBUTES=dd_llmobs_enabled=false
```

### Utilisation du code {#using-code}

Vous pouvez également définir l'attribut de manière programmatique sur n'importe quel span dans votre trace :

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("my-span") as span:
    # Disable Agent Observability conversion for this entire trace
    span.set_attribute("dd_llmobs_enabled", False)
```

[1]: https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans/#spans
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /fr/help/
[5]: https://pypi.org/project/strands-agents/
[6]: /fr/llm_observability/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /fr/account_management/rbac/data_access/