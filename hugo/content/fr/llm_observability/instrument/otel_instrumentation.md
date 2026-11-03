---
aliases:
- /fr/llm_observability/instrumentation/otel_instrumentation/
description: Instrumentez vos applications LLM avec OpenTelemetry en utilisant les
  conventions sémantiques GenAI ou OpenInference et envoyez les traces à Agent Observability
  sans le Datadog SDK.
title: Instrumentation OpenTelemetry
---
## Présentation {#overview}
En utilisant les conventions sémantiques standardisées d'OpenTelemetry pour les opérations d'IA générative, vous pouvez instrumenter vos applications LLM avec n'importe quelle bibliothèque ou framework compatible OpenTelemetry et visualiser les traces dans Agent Observability.

Agent Observability prend en charge l'ingestion des traces OpenTelemetry qui suivent soit les [conventions sémantiques OpenTelemetry 1.37+ pour l'IA générative][1], soit les [conventions sémantiques OpenInference][12] prises en charge. Cela vous permet d'envoyer des traces LLM directement depuis des applications instrumentées par OpenTelemetry vers Datadog sans nécessiter le SDK Agent Observability ni un Datadog Agent.

## Prérequis {#prerequisites}

- Une [clé d'API Datadog][2]
- Une application instrumentée avec OpenTelemetry qui émet des traces conformes aux [conventions sémantiques OpenTelemetry 1.37+ pour l'IA générative][1] ou aux [conventions sémantiques OpenInference][12] prises en charge.

## Fonctionnalités prises en charge {#supported-features}

### Évaluations {#evaluations}

Pour envoyer [des évaluations externes directement à l'API](/llm_observability/investigate/evaluations/external_evaluations#submitting-external-evaluations-with-the-api) pour les spans OpenTelemetry, incluez le tag `source:otel` dans l'évaluation. Lorsque vous faites référence à des spans, fournissez `span_id` et `trace_id` sous forme de chaînes décimales. OpenTelemetry utilise nativement des identifiants hexadécimaux, convertissez-les donc en décimal avant de soumettre les évaluations. Par exemple, utilisez `int(hex_span_id, 16)` de Python pour convertir un ID de span hexadécimal en son équivalent décimal.

### Suivi des prompts {#prompt-tracking}

Pour plus d'informations sur l'utilisation du Suivi des prompts avec les spans OpenTelemetry, consultez [Suivi des prompts - Instrumentation OpenTelemetry](/llm_observability/instrument/prompt_tracking#opentelemetry-instrumentation).

### Experiments {#experiments}

Vous pouvez utiliser des spans OpenTelemetry au sein des [Agent Observability Experiments](/llm_observability/improve/experiments/setup#using-opentelemetry-spans-inside-experiments). En définissant `DD_TRACE_OTEL_ENABLED=1`, les spans OTel créés au sein d'une experiment task apparaissent automatiquement en tant qu'enfants du span de l'experiment.

### Support multimodal {#multimodal-support}

L'audio et les images sur les messages OpenTelemetry sont rendus dans la vue des traces. Datadog extrait les médias des parties de message qui suivent les conventions sémantiques OpenTelemetry GenAI, comme décrit dans [Media in messages](#media-in-messages).

Seuls les médias transportés en ligne sous forme d'octets base64 sont rendus. Une URL distante est enregistrée en tant que référence textuelle et n'est jamais récupérée. Pour les champs, les formats et les limites de taille qui s'appliquent une fois qu'un média atteint un span, consultez [Multimodal Support](/llm_observability/instrument/multimodal/).

### Liens de span {#span-links}

Utilisez les [liens de span OpenTelemetry][9] sur vos spans GenAI pour exprimer des relations non parent-enfant, par exemple lorsqu'une sortie de span alimente l'entrée d'un autre span. Lorsque deux spans liés se trouvent dans la même trace, le lien apparaît comme une arête dans le **Execution Graph** de cette trace, afin que vous puissiez voir comment les données circulent entre les spans frères (par exemple, la sortie d'un outil alimentant un appel LLM en aval).

{{< img src="llm_observability/instrumentation/otel-span-links-execution-graph.png" alt="Execution Graph pour une trace de pipeline de contenu multi-agents. L'orchestrateur contient research-agent, writer-agent et editor-agent, connectés par des arêtes de lien de span qui montrent les données circulant d'un outil search_web vers le LLM de recherche, puis de la recherche vers le rédacteur, puis vers l'éditeur." style="width:100%;" >}}

Utilisez les attributs `from` et `to` pour indiquer la direction du flux de données :

```python
from opentelemetry import trace
from opentelemetry.trace import Link

tracer = trace.get_tracer(__name__)

# A tool span whose output feeds a downstream LLM call.
with tracer.start_as_current_span("lookup_order") as tool_span:
    tool_span.set_attribute("gen_ai.operation.name", "execute_tool")
    tool_ctx = tool_span.get_span_context()

# The LLM span links back to the tool span: its output became this span's input.
link = Link(context=tool_ctx, attributes={"from": "output", "to": "input"})
with tracer.start_as_current_span("chat gpt-4o", links=[link]) as llm_span:
    llm_span.set_attribute("gen_ai.operation.name", "chat")
```

<div class="alert alert-info">Un lien de span qui pointe vers un span dans une trace différente est stocké, mais n'est pas dessiné dans l'Execution Graph, qui visualise une seule trace.</div>

## Configuration {#setup}

Toute méthode prise en charge par Datadog pour l'ingestion de traces OpenTelemetry fonctionne avec Agent Observability. Pour la liste complète des chemins d'ingestion pris en charge, consultez [OpenTelemetry feature compatibility][10]. Voici une façon de le configurer.

Pour envoyer des traces OpenTelemetry à Agent Observability, configurez votre exportateur OpenTelemetry avec les paramètres suivants :

### Configuration {#configuration}

Définissez les variables d'environnement suivantes dans votre application :

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=llmobs
```

Remplacez `<YOUR_API_KEY>` par votre [clé d'API Datadog][2].

Si votre framework prenait précédemment en charge une version de spécification OpenTelemetry antérieure à 1.37, vous devez également définir :

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

Cette variable d'environnement active les traces OpenTelemetry conformes à la version 1.37+ pour les frameworks qui prennent désormais en charge les conventions sémantiques de la version 1.37+, mais qui prenaient précédemment en charge des versions plus anciennes (telles que [strands-agents][5]).

**Note** :
* Si vous utilisez une bibliothèque OpenTelemetry autre que le SDK OpenTelemetry par défaut, vous devrez peut-être configurer l'endpoint, le protocole et les en-têtes différemment selon l'API de la bibliothèque. Consultez la documentation de votre bibliothèque pour connaître la méthode de configuration appropriée.
* Lors de l'utilisation de l'instrumentation OpenTelemetry, certaines données envoyées à Agent Observability peuvent également être écrites dans les traces APM correspondantes. Si vous protégez des données sensibles, envisagez également de configurer un jeu de données restreint (Restricted Dataset) sur APM pour qu'il corresponde à vos contrôles d'accès Agent Observability. Voir [Contrôle d'accès aux données][8] pour plus d'informations.

#### Utilisation de strands-agents {#using-strands-agents}

Si vous utilisez la [bibliothèque `strands-agents`][5], vous devez définir une variable d'environnement supplémentaire pour activer les traces conformes à OpenTelemetry v1.37+ :

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

Cette variable d'environnement garantit que `strands-agents` émet des traces suivant les conventions sémantiques OpenTelemetry v1.37+ pour l'IA générative, qui sont requises par Agent Observability.

### Instrumentation {#instrumentation}

Pour générer des traces compatibles avec Agent Observability, effectuez l'une des opérations suivantes :

- Utilisez une bibliothèque OpenTelemetry ou un package d'instrumentation qui émet des spans conformes aux [conventions sémantiques OpenTelemetry 1.37+ pour l'IA générative][1] ou aux [conventions sémantiques OpenInference][12] prises en charge.
- Créez une instrumentation OpenTelemetry personnalisée qui produit les attributs `gen_ai.*` ou OpenInference requis définis par la convention que vous avez choisie.

Une fois que votre application commence à envoyer des données, les traces apparaissent automatiquement dans la [{{< ui >}}Agent Observability Traces{{< /ui >}} page][3]. Pour rechercher vos traces dans l'interface utilisateur, utilisez l'attribut `ml_app`, qui est automatiquement défini sur la valeur de l'attribut `service` de votre span racine OpenTelemetry.

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> version 0.47+ est pris en charge. Consultez l'<a href="#using-openllmetry">exemple OpenLLMetry</a>.
<li/> Les spans OpenInference sont pris en charge. Consultez l'<a href="#using-openinference">exemple OpenInference</a>.
<li/> <a href="https://langfuse.com/integrations/native/opentelemetry">L'instrumentation OpenTelemetry native de Langfuse</a> est prise en charge. Consultez les <a href="#langfuse-attribute-mappings">mappages d'attributs Langfuse</a>.
<li/> Il peut y avoir un délai de 3 à 5 minutes entre l'envoi des traces et leur apparition sur la page Agent Observability Traces. Si APM est activé, les traces apparaissent immédiatement sur la page Traces APM.
</ul>
</div>

## Frameworks et bibliothèques testés {#tested-frameworks-and-libraries}

Ces frameworks et bibliothèques ont été testés avec Agent Observability. Les frameworks qui émettent les attributs pris en charge à partir des [conventions sémantiques GenAI OpenTelemetry 1.37+][1] ou des [conventions sémantiques OpenInference][12] peuvent envoyer des spans à Agent Observability.

{{< tabs >}}
{{% tab "Python" %}}
| Framework | Instrumentation | Versions prises en charge |
|-----------|----------------|--------------------|
| [OpenAI][20] | [`opentelemetry-instrumentation-openai-v2`][21] | >= 1.26.0 |
| [OpenAI][20] | [`openinference-instrumentation-openai`][36] | >= 1.26.0 |
| [Anthropic][22] | [`opentelemetry-instrumentation-anthropic`][23] | >= 0.51.0 |
| [Google GenAI][24] | [`opentelemetry-instrumentation-google-genai`][25] | >= 1.32.0 |
| [Google Vertex AI][26] | [`opentelemetry-instrumentation-vertexai`][27] | >= 1.64.0 |
| [AWS Bedrock][28] | [`opentelemetry-instrumentation-botocore`][29] | >= 1.31.57 |
| [LangChain][30] | [`opentelemetry-instrumentation-langchain`][31] | >= 0.3.21 |
| [LlamaIndex][32] | [`opentelemetry-instrumentation-llamaindex`][33] | >= 0.14.12 |
| [Strands Agents][5] | Natif | >= 1.11.0 |
| [OpenLLMetry][34] | [`traceloop-sdk`][35] | >= 0.47.0 |
| [Langfuse][37] | Natif | >= 4.0.0 |

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
[36]: https://arize-ai.github.io/openinference/python/instrumentation/openinference-instrumentation-openai/
[37]: https://langfuse.com/integrations/native/opentelemetry
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
| [Spring AI][50] | Natif (via [Micrometer][51]) | >= 1.0.0 |
| [LangChain4j][52] | Natif (module OpenTelemetry) | >= 0.31.0 |
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

L'exemple suivant démontre une application complète utilisant [Strands Agents][7] avec l'intégration OpenTelemetry. Cette même approche fonctionne avec n'importe quel framework prenant en charge les conventions sémantiques OpenTelemetry version 1.37+ pour l'IA générative.

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

# Configure OTLP endpoint to send traces to Agent Observability
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

Après avoir exécuté cet exemple, recherchez `ml_app:simple-llm-example` dans l'interface utilisateur d'Agent Observability pour trouver la trace générée.

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

Après avoir exécuté cet exemple, recherchez `ml_app:simple-openllmetry-test` dans l'interface utilisateur d'Agent Observability pour trouver la trace générée.

### Utilisation d'OpenInference {#using-openinference}

L'exemple suivant utilise [OpenInference OpenAI instrumentation][11] pour instrumenter automatiquement les appels OpenAI avec OpenTelemetry.

Configurez l'exportateur OpenTelemetry et instrumentez le client OpenAI :

```python
import openai
from openinference.instrumentation.openai import OpenAIInstrumentor
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

resource = Resource.create({
    "service.name": "simple-openinference-test",
})

provider = TracerProvider(resource=resource)
trace.set_tracer_provider(provider)

exporter = OTLPSpanExporter(
    endpoint="{{< region-param key="otlp_trace_endpoint" code="true" >}}",
    headers={
        "dd-api-key": "<YOUR_DATADOG_API_KEY>",
        "dd-ml-app": "simple-openinference-test",
        "dd-otlp-source": "llmobs",
    },
)

provider.add_span_processor(BatchSpanProcessor(exporter))

OpenAIInstrumentor().instrument(tracer_provider=provider)

# Make OpenAI call (automatically traced)
client = openai.OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}]
)

provider.force_flush(timeout_millis=5000)
```

Après avoir exécuté cet exemple, recherchez `ml_app:simple-openinference-test` dans l'interface utilisateur d'Agent Observability pour trouver la trace générée.

## Référence de mappage d'attributs {#attribute-mapping-reference}

Cette section fournit les mappages des conventions sémantiques GenAI d'OpenTelemetry (v1.37+), d'OpenLLMetry, d'OpenInference et de Langfuse vers le schéma de span Agent Observability de Datadog.

Si un span manque d'un attribut attendu, ou si un attribut ne peut pas être analysé, Agent Observability marque le span avec un indicateur **Avertissements de mappage**. Consultez [Dépannage des avertissements de mappage](#troubleshooting-mapping-warnings) pour obtenir des descriptions et des correctifs.

<div class="alert alert-info">Les mappages spécifiques aux fournisseurs sont documentés séparément dans les sections <a href="#openllmetry-attribute-mappings">Mappages d'attributs OpenLLMetry</a>, <a href="#openinference-attribute-mappings">Mappages d'attributs OpenInference</a> et <a href="#langfuse-attribute-mappings">Mappages d'attributs Langfuse</a>.</div>

### Mappages d'attributs OpenTelemetry 1.37+ {#opentelemetry-137-attribute-mappings}

#### Attributs de span de base : {#base-span-attributes}

| Champ OTLP | Champ d'Agent Observability | Notes |
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

| `gen_ai.operation.name` | Agent Observability `span.kind` |
|-------------------------|-------------------|
| `generate_content`, `chat`, `text_completion`, `completion` | `llm` |
| `embeddings`, `embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`, `create_agent` | `agent` |
| `rerank`, `unknown`, *(par défaut)* | `workflow` |

#### Informations sur le modèle {#model-information}

| Attribut OTel | Champ d'Agent Observability | Notes |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | Voir le tableau de résolution ci-dessus |
| `gen_ai.provider.name` | `meta.model_provider` | Revient à `gen_ai.system`, puis `custom` |
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | Fallback if `response.model` absent |

#### Métriques d'utilisation des jetons {#token-usage-metrics}

| OTel Attribute | Agent Observability Field |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### Paramètres de requête {#request-parameters}

Tous les paramètres `gen_ai.request.*` correspondent à `meta.metadata.*` une fois le préfixe supprimé.

| OTel Attribute | Agent Observability Field |
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

| Attribut OTel | Champ d'Agent Observability | Notes |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | Remplacement du nom du span |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | Tableau JSON analysé |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### Session et conversation {#session-and-conversation}

| Attribut OTel | Champ d'Agent Observability | Notes |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | Également ajouté à `metadata.conversation_id` et aux tags |

Lorsqu'un span de niveau supérieur d'une trace APM n'est pas un span gen_ai (par exemple, un gestionnaire HTTP qui appelle plusieurs LLM en parallèle), Agent Observability produit une trace Agent Observability distincte pour chaque span gen_ai de niveau supérieur dans cette trace APM. Pour conserver ces traces fractionnées regroupées dans l'interface utilisateur, définissez `gen_ai.conversation.id` sur la même valeur pour chaque span gen_ai au sein de la trace APM : Agent Observability effectue un regroupement par `session_id`, de sorte que les traces résultantes apparaissent ensemble même si elles ont des ID de trace Agent Observability distincts. Il s'agit du même attribut utilisé pour le regroupement de conversations inter-requêtes.

#### Liens de span {#span-links-1}

Les liens de span que vous définissez sur un span GenAI apparaissent sous forme de `span_links` sur le span Agent Observability correspondant.

| Champ de lien de span OTel | Champ Agent Observability | Notes |
|----------------------|--------------|-------|
| `trace_id` | `span_links[].trace_id` | Les ID de trace 128 bits sont émis en hexadécimal. Un lien vers un span dans la même trace renvoie à l'ID de trace Agent Observability de ce span. |
| `span_id` | `span_links[].span_id` | Décimal |
| `attributes` | `span_links[].attributes` | Les points dans les clés d'attribut sont remplacés par des traits de soulignement (par exemple, `messaging.operation` devient `messaging_operation`). |

Les liens entre les spans dans la même trace sont dessinés sous forme d'arêtes dans le graphe d'exécution de cette trace.

#### Attributs de réponse {#response-attributes}

| OTel Attribute | Agent Observability Field |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### Messages d'entrée et de sortie {#input-and-output-messages}

Les messages d'entrée et de sortie sont extraits des sources suivantes, par ordre de priorité :

1. Attributs directs : `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`
2. Événements de span (`meta["events"]`) avec le nom `gen_ai.client.inference.operation.details`

| Source OTel | Champ Agent Observability | Notes |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages` (llm) / `meta.input.value` (autres) | |
| `gen_ai.output.messages` | `meta.output.messages` (llm) / `meta.output.value` (autres) | |
| `gen_ai.system_instructions` | Ajouté au début de l'entrée | Ajouté en tant que messages de rôle système |

##### Médias dans les messages {#media-in-messages}

Les parties de message qui contiennent des médias sont extraites dans les champs typés `audio_parts` et `image_parts` du message :

| Type de partie | Comportement |
|-----------|----------|
| `blob` avec `mime_type` et octets intégrés | Extraits vers `image_parts` ou `audio_parts`. Lorsque la partie omet `modality`, elle est déduite du type MIME. |
| `uri` transportant une URI de données d'image base64, telle que `data:image/png;base64,...` | Extraite vers `image_parts`. |
| `uri` transportant une URL distante | Enregistrée comme référence textuelle `[<modality>: <uri>]`. L'URL n'est pas récupérée. |
| `file` avec un `file_id` | Enregistrée comme référence textuelle `[<modality> file: <file_id>]`. |

Un marqueur de position tel que `[image blob: image/png]` est également ajouté au texte du message afin que le média conserve son place parmi les autres parties.

L'audio atteint `audio_parts` uniquement par l'intermédiaire des parties `blob`. Une URI de données audio sur une partie `uri` est enregistrée en tant que texte, et les conventions spécifient `blob` comme type de partie pour les données base64 en ligne ; il est donc préférable d'utiliser `blob` pour l'audio et les images.

Pour les formats que la vue de trace affiche et les limites de taille qui s'appliquent, consultez [Support multimodal](/llm_observability/instrument/multimodal/).

##### Embedding spans {#embedding-spans}

| OTel Source | Agent Observability Field |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Tags {#tags}

Les tags sont placés directement sur le span :

- Les attributs non-`gen_ai.*` sont convertis en tags `key:value`
- Les clés inconnues `gen_ai.*` sont ajoutées avec le préfixe supprimé
- Filtrés : `_dd.*`, `llm.*`, `ddtags`, `events`, et les clés `gen_ai.*` déjà spécifiquement mappées

<div class="alert alert-info">Tout <code>gen_ai.*</code> Les attributs qui ne sont pas explicitement mappés aux champs de span d'Agent Observability sont placés dans les tags du span LLM, avec une limite de 256 caractères par valeur. Les valeurs dépassant cette limite sont tronquées. Tous les autres attributs non-<code>gen_ai</code> sont supprimés.</div>

#### Métadonnées personnalisées {#custom-metadata}

Pour ajouter des métadonnées structurées au champ `meta.metadata` d'un span au lieu de ses tags, définissez l'attribut `_dd.ml_obs.metadata` sur une chaîne représentant un objet JSON****. Ses clés et valeurs (y compris les objets et tableaux imbriqués) sont fusionnées dans `meta.metadata` et affichées sous forme de JSON dans l'interface utilisateur.

```python
import json

span.set_attribute("_dd.ml_obs.metadata", json.dumps({
    "experiment": "a/b",
    "config": {
        "retry": {"max": 3, "backoff": "exp"},
        "feature_flags": ["new_ranker", "fast_path"],
    },
}))
```

Remarques :

- Les valeurs peuvent être imbriquées arbitrairement ; contrairement aux tags, les métadonnées ne sont pas soumises à la limite de 256 caractères par valeur.
- Les clés qui entrent en conflit avec les métadonnées dérivées des attributs `gen_ai.*` (par exemple, `temperature`) sont écrasées par vos valeurs, à l'exception de `model_name` et `model_provider`, qui sont réservées.
- La valeur doit être un objet JSON. Une valeur qui n'est pas un JSON valide, ou qui est un tableau ou un scalaire de niveau supérieur, est supprimée.

### Mappages d'attributs OpenLLMetry {#openllmetry-attribute-mappings}

Cette section documente les mappages d'attributs spécifiques à OpenLLMetry qui diffèrent ou étendent les conventions sémantiques GenAI standard d'OpenTelemetry.

#### Résolution du type de span {#span-kind-resolution-1}

`llm.request.type` est utilisé comme solution de secours lorsque `gen_ai.operation.name` est absent.

| `llm.request.type` | Agent Observability `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`, *(par défaut)* | `workflow` |

#### Informations sur le modèle {#model-information-1}

| Attribut OpenLLMetry | Champ d'Agent Observability | Notes |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | Solution de secours en cas d'absence de `gen_ai.provider.name` |

#### Métriques d'utilisation des jetons {#token-usage-metrics-1}

| Attribut OpenLLMetry | Champ d'Agent Observability | Notes |
|-----------------------|--------------|-------|
| `llm.usage.total_tokens` | `metrics.total_tokens` | Solution de secours en cas d'absence de `gen_ai.usage.total_tokens` |

#### Messages d'entrée et de sortie {#input-and-output-messages-1}

OpenLLMetry utilise des attributs indexés au lieu de tableaux JSON. Il s'agit de la source de priorité la plus basse, utilisée uniquement lorsqu'aucune source standard OTel n'existe.

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
| `gen_ai.completion.<index>.finish_reason` | Raison de fin de complétion |

##### Mappage {#mapping}

Les messages sont convertis au format compatible OTel et traités normalement :

| Source OpenLLMetry | Champ LLMObs |
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

##### Messages de réponse d'outil {#tool-response-messages}

Lorsque `role = "tool"` et `tool_call_id` sont présents, le message est converti en résultat d'outil :

| Attribut OpenLLMetry | Correspond à |
|-----------------------|---------|
| `gen_ai.prompt.<index>.tool_call_id` | `tool_results[].tool_id` |
| `gen_ai.prompt.<index>.content` | `tool_results[].result` |

#### Spans d'embedding {#embedding-spans-1}

Pour les spans d'embedding, les documents sont extraits des attributs de contenu de prompt.

| Source OpenLLMetry | Agent Observability Field |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### Filtrage des tags {#tags-filtering}

Les attributs spécifiques à OpenLLMetry suivants sont filtrés des tags :

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

### Mappages d'attributs OpenInference {#openinference-attribute-mappings}

Agent Observability reconnaît un span OpenInference lorsque l'attribut `openinference.span.kind` est présent et non vide. Les sections suivantes documentent les attributs OpenInference qui correspondent aux champs dédiés d'Agent Observability.

#### Résolution du type de span {#span-kind-resolution-2}

Si `gen_ai.operation.name` et `openinference.span.kind` sont tous deux présents, `gen_ai.operation.name` a la priorité.

| `openinference.span.kind` | Agent Observability `span.kind` |
|---------------------------|---------------------------------|
| `LLM` | `llm` |
| `EMBEDDING` | `embedding` |
| `TOOL` | `tool` |
| `AGENT` | `agent` |
| `RETRIEVER` | `retrieval` |
| `CHAIN`, `RERANKER`, `GUARDRAIL`, `EVALUATOR`, `PROMPT`, autres valeurs | `workflow` |

#### Informations sur le modèle {#model-information-2}

| Attribut OpenInference | Champ Agent Observability | Notes |
|-------------------------|---------------------------|-------|
| `llm.provider` | `meta.model_provider` | Source de fournisseur OpenInference privilégiée |
| `llm.system` | `meta.model_provider` | Solution de secours lorsque `llm.provider` est absent |
| `llm.model_name` | `meta.model_name` | |
| `embedding.model_name` | `meta.model_name` | Solution de secours pour les spans d'embedding |

Pour les spans `llm` et `embedding`, les valeurs manquantes de fournisseur ou de modèle sont définies sur `unknown`.

#### Métriques d'utilisation des jetons {#token-usage-metrics-2}

| Attribut OpenInference | Champ Agent Observability |
|-------------------------|---------------------------|
| `llm.token_count.prompt` | `metrics.prompt_tokens` |
| `llm.token_count.completion` | `metrics.completion_tokens` |
| `llm.token_count.total` | `metrics.total_tokens` |
| `llm.token_count.prompt_details.cache_read` | `metrics.cache_read_input_tokens` |
| `llm.token_count.prompt_details.cache_write` | `metrics.cache_write_input_tokens` |
| `llm.token_count.completion_details.reasoning` | `metrics.reasoning_output_tokens` |

#### Session, utilisateur et métadonnées {#session-user-and-metadata}

| Attribut OpenInference | Champ Agent Observability | Notes |
|-------------------------|---------------------------|-------|
| `session.id` | `session_id` | Ajoute également les tags `session_id` et `conversation_id` et propage la session à la racine de la trace |
| `user.id` | `tags` | Ajouté en tant que `user_id:<value>` |
| `tag.tags` | `tags` | Chaque élément de liste devient un tag de span |
| `llm.invocation_parameters` | `meta.metadata` | Analysé en tant qu'objet JSON |
| `metadata` | `meta.metadata` | Analysé en tant qu'objet JSON |

Les champs réservés d'Agent Observability dans `llm.invocation_parameters` et `metadata` ne remplacent pas les champs de span dédiés.

#### Attributs d'outil {#tool-attributes-1}

| Attribut OpenInference | Champ Agent Observability | Notes |
|-------------------------|---------------------------|-------|
| `tool.name` | `name` | Remplace le nom du span |
| `tool.id` | `meta.metadata.tool_id` | |
| `tool.description` | `meta.metadata.tool_description` | |
| `tool.parameters` | `meta.metadata.tool_parameters` | |
| `input.value` | `meta.input.value` | Utilisé directement pour les spans `tool`, `agent` et `workflow` |
| `output.value` | `meta.output.value` | Utilisé directement pour les spans `tool`, `agent` et `workflow` |

#### Messages d'entrée et de sortie {#input-and-output-messages-2}

Dans ces attributs, `<direction>` est `input` ou `output`.
Les entrées et sorties sont extraites des sources suivantes, par ordre de priorité :

1. OpenTelemetry `gen_ai.*` attributs directs et événements de span
2. Attributs indexés OpenLLMetry
3. Attributs indexés OpenInference
4. OpenInference `input.value` et `output.value`

| Source OpenInference | Champ d'Agent Observability |
|----------------------|---------------------------|
| `llm.input_messages.<index>.*` | `meta.input.messages` (llm) / `meta.input.value` (autres types de span) |
| `llm.output_messages.<index>.*` | `meta.output.messages` (llm) / `meta.output.value` (autres types de span) |
| `input.value` | Solution de secours d'entrée |
| `output.value` | Solution de secours de sortie |

Les attributs de message indexés suivants sont pris en charge :

| Attribut OpenInference | Mappage |
|-------------------------|---------|
| `llm.<direction>_messages.<message-index>.message.role` | Rôle du message |
| `llm.<direction>_messages.<message-index>.message.content` | Contenu textuel |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.text` | Contenu textuel ordonné |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.image.image.url` | Contenu d'image ordonné |
| `llm.<direction>_messages.<message-index>.message.tool_calls.<tool-index>.tool_call.*` | ID, nom et arguments de l'appel d'outil |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.tool_call.*` | Appel d'outil au sein du contenu ordonné |
| `llm.<direction>_messages.<message-index>.message.tool_call_id` | ID de résultat d'outil lorsque le rôle du message est `tool` |

Le contenu de l'image est mappé vers un URI d'image tout en préservant sa position parmi les autres contenus du message.

#### Spans d'embedding {#embedding-spans-2}

| Source OpenInference | Champ d'Agent Observability |
|----------------------|---------------------------|
| `embedding.embeddings.<index>.embedding.text` | `meta.input.documents[].text` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### Plages de récupération {#retrieval-spans}

| Source OpenInference | Champ d'Agent Observability |
|----------------------|---------------------------|
| `input.value` | `meta.input.value` |
| `retrieval.documents.<index>.document.content` | `meta.output.documents[].text` |
| `retrieval.documents.<index>.document.id` | `meta.output.documents[].id` |
| `retrieval.documents.<index>.document.score` | `meta.output.documents[].score` |
| `retrieval.documents.<index>.document.metadata` | `meta.output.documents[].metadata` (objet JSON analysé) |

#### Filtrage des tags {#tags-filtering-1}

Les attributs OpenInference avec les préfixes `llm.*`, `retrieval.*`, `embedding.*` et `reranker.*` sont exclus des tags. Les valeurs spécifiquement mappées telles que `input.value`, `output.value`, `metadata`, `tag.tags` et `tool.parameters` sont également exclues des tags en double.

Les autres attributs OpenInference non vides ayant des valeurs de 256 caractères ou moins sont ajoutés en tant que tags `key:value`. La liste `tag.tags` est promue directement en tags de span.

### Mappages d'attributs Langfuse {#langfuse-attribute-mappings}

Cette section documente les mappages d'attributs spécifiques à Langfuse pour les applications utilisant [l'instrumentation OpenTelemetry native de Langfuse][13].

#### Détection {#detection}

Un span est traité comme un span Langfuse lorsqu'il porte un attribut `langfuse.observation.type` non vide. Cet attribut est également utilisé comme solution de repli pour la résolution du type de span lorsque `gen_ai.operation.name` est absent.

#### Résolution du type de span {#span-kind-resolution-3}

| `langfuse.observation.type` | Agent Observability `span.kind` |
|------------------------------|-------------------|
| `generation` | `llm` |
| `embedding` | `embedding` |
| `tool` | `tool` |
| `agent` | `agent` |
| `retriever` | `retrieval` |
| `span`, `event`, `chain`, `evaluator`, `guardrail`, *(par défaut)* | `workflow` |

#### Informations sur le modèle {#model-information-3}

| Attribut Langfuse | Champ d'Agent Observability | Notes |
|---------------------|--------------|-------|
| `langfuse.observation.metadata.ls_provider` | `meta.model_provider` | |
| `langfuse.observation.model.name` | `meta.model_name` | Repli lorsque `gen_ai.response.model` et `gen_ai.request.model` sont absents |

#### Métriques d'utilisation des jetons {#token-usage-metrics-3}

`langfuse.observation.usage_details` est un objet JSON. Chaque clé correspond à une métrique d'Agent Observability, utilisée comme repli pour toute métrique non déjà définie à partir des attributs `gen_ai.usage.*` :

| Clé d'utilisation Langfuse | Champ d'Agent Observability |
|----------------------|--------------|
| `input`, `input_tokens` | `metrics.input_tokens` |
| `output`, `output_tokens` | `metrics.output_tokens` |
| `total`, `total_tokens` | `metrics.total_tokens` |
| `prompt_tokens` | `metrics.prompt_tokens` |
| `completion_tokens` | `metrics.completion_tokens` |
| `cache_creation_input_tokens` | `metrics.cache_write_input_tokens` |
| `cache_read_input_tokens`, `cached_tokens` | `metrics.cache_read_input_tokens` |
| `reasoning_tokens` | `metrics.reasoning_output_tokens` |

#### Messages d'entrée et de sortie {#input-and-output-messages-3}

`langfuse.observation.input` et `langfuse.observation.output` transportent une valeur encodée en JSON qui peut être un tableau de messages de chat, un objet message unique ou un contenu JSON/chaîne arbitraire. Ce sont les sources de priorité la plus basse et elles ne sont utilisées que lorsqu'aucun attribut de message `gen_ai.*` n'existe.

Chaque message est converti en forme de message basée sur des parties :

- Une chaîne `content` devient une partie `text`.
- Un tableau de blocs `content` convertit les blocs `image_url` en parties `uri` et les blocs `text` en parties `text` ; tout autre bloc est conservé sous forme de texte sérialisé.
- Un tableau `tool_calls` sur un message devient des parties `tool_call`.
- Un message avec `role: tool` et un `tool_call_id` devient une partie `tool_result`.

##### Spans d'outil {#tool-spans}

Pour les spans `tool`, `agent` et `workflow`, `langfuse.observation.input`/`langfuse.observation.output` sont utilisés directement comme `input.value`/`output.value`, après le repli `gen_ai.tool.call.*` standard.

##### Spans de récupération {#retrieval-spans-1}

Pour les spans `retrieval`, `langfuse.observation.input` est utilisé comme valeur de requête dans `meta.input.value`. `langfuse.observation.output` est analysé en tant que collection de documents (un tableau d'objets document, un tableau de chaînes ou un objet document unique) dans `meta.output.documents`. La clé `text`, `content` ou `page_content` de chaque objet document (vérifiée dans cet ordre) est mappée vers `text`, ainsi que toutes les clés `id`, `score` et `metadata`.

##### Spans d'incorporation {#embedding-spans-3}

Pour les spans `embedding`, `langfuse.observation.input` est analysé de la même manière que les documents de récupération dans `meta.input.documents[].text`, en ne conservant que les documents contenant du texte non vide.

#### Session, utilisateur, métadonnées et tags {#session-user-metadata-and-tags}

| Attribut Langfuse | Champ d'Agent Observability | Notes |
|-----------------------|--------------|-------|
| `langfuse.session.id` | `session_id` | Repli lorsque `gen_ai.conversation.id` est absent |
| `langfuse.user.id` | `user_id:` tag | Repli lorsque l'attribut d'identifiant utilisateur standard est absent |
| `langfuse.observation.model.parameters` | `meta.metadata.*` | Objet JSON, fusionné dans les métadonnées, en ignorant les clés réservées (`model_name`, `model_provider`) |
| `langfuse.trace.metadata.*`, `langfuse.observation.metadata.*` | `meta.metadata.*` | Préfixe supprimé, fusionné dans les métadonnées, en ignorant les clés réservées |
| `langfuse.trace.tags` | Ajouté aux tags | Tableau JSON de chaînes |

#### Filtrage des tags {#tags-filtering-2}

Les attributs spécifiques à Langfuse suivants sont filtrés des tags car ils sont consommés ailleurs :

- `langfuse.internal.*`, `langfuse.observation.metadata.*`, `langfuse.trace.metadata.*` (préfixes)
- `langfuse.observation.input`, `langfuse.observation.output`, `langfuse.observation.model.name`, `langfuse.observation.model.parameters`, `langfuse.observation.usage_details`, `langfuse.observation.cost_details`, `langfuse.observation.completion_start_time`
- `langfuse.trace.input`, `langfuse.trace.output`, `langfuse.trace.metadata`, `langfuse.trace.tags`
- `langfuse.experiment.item.expected_output`, `langfuse.experiment.item.metadata`, `langfuse.experiment.metadata`

## Dépannage des avertissements de mappage {#troubleshooting-mapping-warnings}

Lors de l'ingestion, Agent Observability détecte les problèmes de mappage de span tels que des messages d'entrée manquants ou un nombre de jetons impossible à analyser. Il signale les spans concernés au lieu d'échouer silencieusement.

Les spans signalés affichent un indicateur **Avertissements de mappage** dans le panneau de détails du span. Sélectionnez l'indicateur pour ouvrir les avertissements de mappage du span. Chaque entrée répertorie l'attribut concerné, une correction suggérée et un lien vers la [référence de mappage d'attributs](#attribute-mapping-reference).

Chaque avertissement inclut également une brève description de son effet en aval, tel que des évaluations ignorées ou une estimation des coûts indisponible.

Les avertissements de mappage sont détectés lors de l'ingestion. Ils n'affectent ni la facturation ni la rétention des spans.

### Référence des avertissements de mappage {#mapping-warning-reference}

Un span peut afficher des avertissements non répertoriés dans le tableau suivant si Datadog ajoute des contrôles. Ceux-ci s'affichent avec un titre généré à partir du check qui a déclenché l'avertissement.

**Valeur de recherche** affiche la valeur stockée sur le span. Utilisez-le avec l'attribut `@collection_errors` pour trouver les spans signalés, par exemple `@collection_errors:otel_warning_missing_model_name`.

| Avertissement | Valeur de recherche (`@collection_errors:`) | Attribut | Correction |
|---------|--------------------------------------|-----------|-----|
| Nom de modèle manquant | `otel_warning_missing_model_name` | Attendu `gen_ai.response.model` | Émettez `gen_ai.response.model` directement, afin que le nom du modèle n'ait pas besoin d'être extrait de `gen_ai.request.model`. |
| Fournisseur de modèle manquant | `otel_warning_missing_model_provider` | Attendu `gen_ai.provider.name` | Émettez `gen_ai.provider.name` directement, afin que le fournisseur n'ait pas besoin d'être déduit de `gen_ai.system`. |
| Identifiant de modèle mal formé | `otel_warning_strands_model_malformed` | Sur `gen_ai.request.model` | Émettez `gen_ai.response.model` directement, afin que le nom du modèle n'ait pas besoin d'être extrait de `gen_ai.request.model`. |
| Entrée mal formée | `otel_warning_input_malformed` | Sur `gen_ai.input.messages` | Émettez `gen_ai.input.messages` sous forme de tableau JSON valide de messages. |
| Sortie mal formée | `otel_warning_output_malformed` | Sur `gen_ai.output.messages` | Émettez `gen_ai.output.messages` sous forme de tableau JSON valide de messages. |
| Message mal formé | `otel_warning_message_malformed` | Sur `gen_ai.input.messages` | Émettez chaque message avec un champ `role` et `content`. |
| Contenu de message vide | `otel_warning_invalid_parts` | Sur `gen_ai.output.messages` | Émettez une chaîne `content`, ou des entrées `parts` avec un `type` reconnu, par exemple `text`, `tool_call`, `tool_call_response`. |
| Entrée d'embedding manquante | `otel_warning_embedding_input_missing` | Attendu `gen_ai.input.messages` | Définissez `gen_ai.input.messages` sur le texte intégré. |
| Entrée d'embedding mal formée | `otel_warning_embedding_input_malformed` | Sur `gen_ai.input.messages` | Émettez `gen_ai.input.messages` sous forme de tableau JSON valide de messages. |
| Comptes de jetons illisibles | `otel_warning_token_usage_unparseable` | Sur `gen_ai.usage.input_tokens` | Émettez les comptes de jetons sous forme d'entiers, et non de chaînes ou d'objets. |
| Comptes de jetons invalides | `otel_warning_token_usage_invalid` | Sur `gen_ai.usage.input_tokens` | Émettez des comptes de jetons entiers non négatifs. |
| Métriques de coût illisibles | `otel_warning_cost_metrics_unparseable` | Sur `gen_ai.cost.estimated_total` | Émettez les métriques de coût sous forme d'entiers ou de nombres à virgule flottante, et non de chaînes ou d'objets. |
| Métriques de coût invalides | `otel_warning_cost_metrics_invalid` | Sur `gen_ai.cost.estimated_total` | Émettez des valeurs de coût non négatives. |
| Paramètres d'invocation mal formés | `otel_warning_params_malformed` | Sur les paramètres d'invocation | Émettez les paramètres d'invocation sous forme d'objet JSON valide, ou définissez-les individuellement en tant qu'attributs `gen_ai.request.*` (tels que `temperature`, `top_p` et `max_tokens`). |
| Définitions d'outils mal formées | `otel_warning_tool_definitions_malformed` | Sur `gen_ai.tool.definitions` | Émettez `gen_ai.tool.definitions` comme un tableau JSON valide de définitions d'outils. |
| Définition d'outil mal formée | `otel_warning_tool_definition_entry_malformed` | Sur `gen_ai.tool.definitions` | Donnez à chaque définition d'outil un `name`, et faites de son `parameters` un objet JSON. |
| Nom d'outil manquant | `otel_warning_tool_span_name_missing` | Attendu `gen_ai.tool.name` | Définissez `gen_ai.tool.name` sur les spans d'outil. |
| Nom d'appel d'outil manquant | `otel_warning_tool_call_name_missing` | Sur `gen_ai.output.messages` | Donnez à chaque appel d'outil un `name`. |
| Nom d'opération manquant | `otel_warning_operation_missing` | Attendu `gen_ai.operation.name` | Définissez `gen_ai.operation.name` sur l'une des valeurs suivantes : `chat`, `text_completion`, `embeddings`, `execute_tool`, `invoke_agent` ou `retriever`. |
| Événements de span mal formés | `otel_warning_failed_to_parse_span_events` | Sur `events` | Émettez un JSON valide dans les événements de span, ou définissez `gen_ai.input.messages` et `gen_ai.output.messages` directement. |
| Score de document illisible | `otel_warning_failed_to_parse_document_score` | Sur `output.documents` | Émettez chaque score de document sous forme de nombre. |
| Métadonnées de document mal formées | `otel_warning_document_metadata_malformed` | Sur `output.documents` | Émettez les métadonnées de chaque document sous forme d'objet JSON. |
| Instrumentation non reconnue | `otel_warning_spec_version_unknown` | Attendu `gen_ai.operation.name` | Définissez `gen_ai.operation.name` et `gen_ai.system` afin que Datadog puisse identifier l'instrumentation. |

### Recherchez les attributs bruts du span signalé {#find-raw-span-attributes-for-a-flagged-span}

Pour trouver les attributs bruts reçus par Datadog pour un span signalé :

- Si APM est activé, les mêmes données sont également écrites dans la trace APM correspondante. Ouvrez la trace APM liée pour inspecter les attributs bruts du span.
- Comparez les attributs bruts avec l'attribut attendu dans la [référence des avertissements de mappage](#mapping-warning-reference) ou la [référence complète de mappage des attributs](#attribute-mapping-reference). Consultez [Corrélation d'Agent Observability et d'APM][14] pour savoir comment les deux vues sont liées.
- Pour un avertissement de format incorrect, vérifiez si la valeur de l'attribut est un JSON valide. Les causes courantes incluent le double encodage, la troncature et l'émission d'une chaîne ou d'une autre valeur non-objet là où un objet est attendu.
- Pour un avertissement d'attribut manquant, vérifiez la version de votre bibliothèque d'instrumentation par rapport au tableau [Frameworks et bibliothèques testés](#tested-frameworks-and-libraries), et confirmez que `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` est défini si votre bibliothèque l'exige.

## Conventions sémantiques prises en charge {#supported-semantic-conventions}

Agent Observability prend en charge les spans qui suivent les conventions sémantiques OpenTelemetry 1.37+ pour l'IA générative, notamment :

- Opérations LLM avec `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model` et d'autres attributs gen_ai
- Entrées/sorties d'opération sur les attributs de span directs ou via des événements de span
- Métriques d'utilisation des jetons (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- Paramètres et métadonnées du modèle

Pour obtenir la liste complète des attributs pris en charge et leurs spécifications, consultez la [documentation des conventions sémantiques OpenTelemetry pour l'IA générative][1].

## Désactivation de la conversion d'Agent Observability {#disabling-agent-observability-conversion}

Si vous souhaitez uniquement que vos spans d'IA générative restent dans APM et n'apparaissent pas dans Agent Observability, vous pouvez désactiver la conversion automatique en définissant l'attribut `dd_llmobs_enabled` sur `false`. Définir cet attribut sur n'importe quel span d'une trace empêche la conversion de la trace entière vers Agent Observability.

### Utilisation des variables d'environnement {#using-environment-variables}

Ajoutez l'attribut `dd_llmobs_enabled=false` à votre variable d'environnement `OTEL_RESOURCE_ATTRIBUTES` :

```
OTEL_RESOURCE_ATTRIBUTES=dd_llmobs_enabled=false
```

### Utilisation du code {#using-code}

Vous pouvez également définir l'attribut par programmation sur n'importe quel span de votre trace :

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("my-span") as span:
    # Disable Agent Observability conversion for this entire trace
    span.set_attribute("dd_llmobs_enabled", False)
```

[1]: https://github.com/open-telemetry/semantic-conventions-genai
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /fr/help/
[5]: https://pypi.org/project/strands-agents/
[6]: /fr/llm_observability/investigate/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /fr/account_management/rbac/data_access/
[9]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[10]: /fr/opentelemetry/compatibility/#feature-compatibility
[11]: https://arize-ai.github.io/openinference/python/instrumentation/openinference-instrumentation-openai/
[12]: https://arize-ai.github.io/openinference/spec/semantic_conventions.html
[13]: https://langfuse.com/integrations/native/opentelemetry
[14]: /fr/llm_observability/instrument/agent_observability_and_apm/