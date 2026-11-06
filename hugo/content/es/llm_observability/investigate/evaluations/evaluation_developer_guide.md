---
aliases:
- /es/llm_observability/guide/evaluation_developer_guide
- /es/llm_observability/evaluations/evaluation_developer_guide/
- /es/llm_observability/configure/evaluations/evaluation_developer_guide/
description: Aprenda a crear evaluadores personalizados utilizando el Agent Observability
  SDK.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: Documentación
  text: Aprenda sobre el envío de evaluaciones externas
- link: /llm_observability/setup/sdk/python
  tag: Documentación
  text: Aprenda sobre el Agent Observability SDK para Python
- link: /llm_observability/instrument/api
  tag: Documentación
  text: Aprenda sobre la referencia de la API HTTP
title: Guía para desarrolladores de evaluación
---
## Descripción general {#overview}

Esta guía cubre cómo crear evaluadores personalizados con el Agent Observability SDK y utilizarlos en LLM Experiments y en producción. 

## Conceptos clave {#key-concepts}

Una **evaluación** mide una calidad específica de la salida de su aplicación de LLM, como la precisión, el tono o la nocividad. Usted escribe la lógica de evaluación dentro de un **evaluador**, el cual recibe contexto sobre la interacción del LLM y devuelve un resultado.

### Ejecución de evaluadores en un experimento {#running-evaluators-in-an-experiment}
Para probar su aplicación de LLM con un conjunto de datos antes de implementarla, ejecute sus evaluadores en [LLM Experiments][4]. En los experimentos, los evaluadores se ejecutan automáticamente: el SDK llama a su evaluador en cada registro distinto. Utilice evaluadores a través del SDK.

### Ejecución de evaluadores en producción {#running-evaluators-in-production}
Para hacer un seguimiento de la calidad de sus respuestas de LLM en vivo, ejecute evaluadores en producción. Puede ejecutar evaluadores manualmente con `submit_evaluation()`, o automáticamente con [evaluaciones personalizadas de LLM-as-a-judge][5]. Utilice evaluadores a través del SDK, la API HTTP o la interfaz de usuario de Datadog.

Para producción, existen dos enfoques:
- **Evaluaciones manuales** (esta guía): usted ejecuta evaluadores en el código de su aplicación y envía los resultados con `LLMObs.submit_evaluation()` o la API HTTP. Esto le brinda un control total sobre la lógica y el tiempo de evaluación.
- **Custom LLM-as-a-judge evaluations**: Usted configura las evaluaciones en la interfaz de usuario de Datadog utilizando prompts en lenguaje natural. Datadog los ejecuta automáticamente en trazas de producción en tiempo real, sin necesidad de cambios en el código.

Esta guía se centra en las evaluaciones manuales. Para evaluaciones gestionadas LLM-as-a-judge, consulte [Custom LLM-as-a-Judge Evaluations][5].

### Componentes de evaluación {#evaluation-components}

El sistema de evaluación tiene cuatro componentes principales:

- **[EvaluatorContext](#evaluatorcontext)**: La entrada para un evaluador. Contiene la entrada del LLM, la salida, la salida esperada y los identificadores de tramo. En Experiments, el SDK construye esto automáticamente a partir de cada registro del conjunto de datos. En producción, usted construye el EvaluatorContext por su cuenta.
- **[EvaluatorResult](#evaluatorresult)**: El resultado de un evaluador. Contiene un valor tipado, razonamiento opcional, una evaluación de aprobado/reprobado, metadatos y etiquetas. También puede devolver un valor simple (`str`, `float`, `int`, `bool`, `dict`) en su lugar.
- **[MultiEvaluatorResult](#multievaluatorresult)**: Un contenedor opcional para devolver múltiples métricas nombradas desde un solo evaluador. Cada subvalor puede ser un valor simple o su propio `EvaluatorResult`. Útil cuando una pasada de evaluador produce varias métricas relacionadas (por ejemplo, precisión, exhaustividad y F1).
- **[Tipo de métrica](#metric-types)**: Determina cómo se interpreta y muestra el valor de evaluación: `categorical` (etiquetas de cadena), `score` (numérico), `boolean` (aprobado/reprobado) o `json` (datos estructurados).
- **[SummaryEvaluatorContext](#summaryevaluatorcontext)** — Solo para experimentos. Después de que todos los registros del conjunto de datos son evaluados, los evaluadores de resumen reciben los resultados agregados para calcular estadísticas como promedios o tasas de aprobación.

El flujo típico:

- **Experimentos**: Registro del conjunto de datos → `EvaluatorContext` → Evaluador → `EvaluatorResult` (o `MultiEvaluatorResult`) → (después de todos los registros) `SummaryEvaluatorContext` → Evaluador de resumen → resultado del resumen
- **Producción**: Datos del tramo → `EvaluatorContext` (creados manualmente) → Evaluador → `EvaluatorResult` → `LLMObs.submit_evaluation()` o API HTTP

## Creación de evaluadores {#building-evaluators}

Existen dos formas de definir un evaluador utilizando Agent Observability: basado en clases y basado en funciones. Además de estos evaluadores, Agent Observability cuenta con integraciones con marcos de evaluación de código abierto, como [DeepEval][6] y [Pydantic][], que pueden utilizarse en los experimentos de Agent Observability.

| | Basado en clases | Basado en funciones |
|---|---|---|
| **Ideal para** | Evaluadores reutilizables con configuración o estado personalizado. | Evaluadores únicos con lógica sencilla. |
| **Recibe** | Un objeto `EvaluatorContext` con el contexto completo del tramo (entrada, salida, salida esperada, metadatos, IDs de tramo/traza). | `input_data`, `output_data` y `expected_output` como argumentos separados. |
| **Admite evaluadores de resumen** | Sí (`BaseSummaryEvaluator`). | No. |

Si no está seguro, comience con evaluadores basados en clases. Ofrecen las mismas capacidades que los evaluadores basados en funciones.

### Evaluadores basados en clases {#class-based-evaluators}

Los evaluadores basados en clases proporcionan una forma estructurada de implementar lógica de evaluación reutilizable con configuración personalizada.

#### BaseEvaluator {#baseevaluator}

Haga una subclase de `BaseEvaluator` para crear un evaluador que se ejecute en un solo tramo o registro de conjunto de datos. Implemente el método `evaluate`, que recibe un [`EvaluatorContext`](#evaluatorcontext) y devuelve un [`EvaluatorResult`](#evaluatorresult) (o un valor simple).

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, EvaluatorResult

class SemanticSimilarityEvaluator(BaseEvaluator):
    """Evaluates semantic similarity between output and expected output."""

    def __init__(self, threshold: float = 0.8):
        super().__init__(name="semantic_similarity")
        self.threshold = threshold

    def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
        score = compute_similarity(context.output_data, context.expected_output)

        return EvaluatorResult(
            value=score,
            reasoning=f"Similarity score: {score:.2f}",
            assessment="pass" if score >= self.threshold else "fail",
            metadata={"threshold": self.threshold},
            tags={"type": "semantic"}
        )
{{< /code-block >}}

- Llame a `super().__init__(name="evaluator_name")` para establecer la etiqueta del evaluador.
- Implemente `evaluate(context: EvaluatorContext)` con su lógica de evaluación.
- Devuelva un `EvaluatorResult` para obtener resultados enriquecidos, o un valor simple (`str`, `float`, `int`, `bool`, `dict`).

#### BaseSummaryEvaluator {#basesummaryevaluator}

<div class="alert alert-info">Los evaluadores de resumen solo están disponibles en experimentos.</div>

Haga una subclase de `BaseSummaryEvaluator` para crear un evaluador que opere sobre los resultados agregados de toda una ejecución de experimento. Recibe un [`SummaryEvaluatorContext`](#summaryevaluatorcontext) que contiene todas las entradas, salidas y resultados por evaluador.

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseSummaryEvaluator, SummaryEvaluatorContext

class AverageScoreEvaluator(BaseSummaryEvaluator):
    """Computes average score across all evaluation results."""

    def __init__(self, target_evaluator: str):
        super().__init__(name="average_score")
        self.target_evaluator = target_evaluator

    def evaluate(self, context: SummaryEvaluatorContext):
        scores = context.evaluation_results.get(self.target_evaluator, [])
        if not scores:
            return None
        return sum(scores) / len(scores)
{{< /code-block >}}

- Llame a `super().__init__(name="evaluator_name")` para establecer la etiqueta del evaluador.
- Acceda a los resultados por evaluador a través de `context.evaluation_results`, que asigna nombres de evaluador a listas de resultados.

### LLMJudge {#llmjudge}

La clase `LLMJudge` permite la evaluación automatizada de salidas de LLM utilizando otro LLM como juez. Es compatible con OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock y clientes de LLM personalizados con formatos de salida estructurados.

#### Parámetros {#parameters}

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|-------------|
| `user_prompt` | `str` | Sí | Plantilla de prompt con `{{field.path}}` syntax for span context injection. |
| `system_prompt` | `str` | No | System prompt to set the judge's behavior or persona. |
| `structured_output` | `StructuredOutput` | No | Output format specification. See [structured output types](#structured-output-types). |
| `provider` | `str` | Conditional | LLM provider: `\"openai\"`, `\"azure_openai\"`, `\"anthropic\"`, or `\"bedrock\"`. Required if `client` is not provided. |
| `model` | `str` | No | Model identifier (for example, `\"gpt-4o\"`, `\"claude-sonnet-4-20250514\"`). |
| `model_params` | `dict` | No | Additional parameters passed to the LLM API (for example, `temperature`). |
| `client` | callable | Conditional | Custom LLM client function. Required if `provider` is not provided. |
| `name` | `str` | No | Evaluator name for identification in results. |
| `client_options` | `dict` | No | Configuración específica del proveedor (por ejemplo, claves de API). |

#### Variables de plantilla {#template-variables}

El `user_prompt` admite la sintaxis `{{field.path}}` para inyectar contexto desde el tramo evaluado. Se admiten rutas anidadas.

- `{{input_data}}` — Los datos de entrada del tramo.
- `{{output_data}}` — Los datos de salida del tramo.
- `{{expected_output}}` — Salida esperada para comparación (si está disponible).
- `{{metadata.key}}` — Nested metadata fields (for example, `{{metadata.topic}}`).

#### Tipos de salida estructurada {#structured-output-types}

| Tipo de salida | Descripción |
|-------------|-------------|
| `BooleanStructuredOutput` | Devuelve `True`/`False` con evaluación opcional de aprobado/reprobado. |
| `ScoreStructuredOutput` | Devuelve una puntuación numérica dentro de un rango definido, con umbrales opcionales. |
| `CategoricalStructuredOutput` | Devuelve una de un conjunto predefinido de categorías, con valores de aprobado opcionales. |
| `Dict[str, JSONType]` | Esquema JSON personalizado para salida estructurada arbitraria. |

Todos los tipos de salida estructurada aceptan `reasoning=True` para incluir una explicación en los resultados, y `reasoning_description` para personalizar la descripción del campo de razonamiento.

#### Ejemplo: evaluación booleana {#example-boolean-evaluation}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    user_prompt="Is this response factually accurate? Response: {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Whether the response is factually accurate",
        reasoning=True,
        pass_when=True,
    ),
)
{{< /code-block >}}

#### Ejemplo: evaluación basada en puntuación con umbrales {#example-score-based-evaluation-with-thresholds}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, ScoreStructuredOutput

judge = LLMJudge(
    provider="anthropic",
    model="claude-sonnet-4-20250514",
    user_prompt="Rate the helpfulness of this response (1-10): {{output_data}}",
    structured_output=ScoreStructuredOutput(
        description="Helpfulness score",
        min_score=1,
        max_score=10,
        reasoning=True,
        min_threshold=7,  # Scores >= 7 pass
    ),
)
{{< /code-block >}}

#### Ejemplo: evaluación categórica {#example-categorical-evaluation}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, CategoricalStructuredOutput

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    user_prompt="Classify the sentiment: {{output_data}}",
    structured_output=CategoricalStructuredOutput(
        categories={
            "positive": "The response has a positive sentiment.",
            "neutral": "The response has a neutral sentiment.",
            "negative": "The response has a negative sentiment.",
        },
        reasoning=True,
        pass_values=["positive", "neutral"],
    ),
)
{{< /code-block >}}

#### Ejemplo: Azure OpenAI {#example-azure-openai}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

judge = LLMJudge(
    provider="azure_openai",
    model="gpt-4o",
    user_prompt="Is this response factually accurate? Response: {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Whether the response is factually accurate",
        reasoning=True,
        pass_when=True,
    ),
    client_options={
        "azure_endpoint": "https://your-resource.openai.azure.com",
        "api_version": "2024-10-21",
        "azure_deployment": "gpt-4o",
    },
)
{{< /code-block >}}

El `azure_openai` proveedor acepta los siguientes `client_options`:

| Opción | Variable de entorno | Descripción |
|--------|---------------------|-------------|
| `api_key` | `AZURE_OPENAI_API_KEY` | Clave de API de Azure OpenAI. |
| `azure_endpoint` | `AZURE_OPENAI_ENDPOINT` | URL del punto de conexión de Azure OpenAI. |
| `api_version` | `AZURE_OPENAI_API_VERSION` | Versión de la API. El valor predeterminado es `"2024-10-21"`. |
| `azure_deployment` | `AZURE_OPENAI_DEPLOYMENT` | Nombre de la implementación. Recurre al parámetro `model`. |

#### Ejemplo: cliente de LLM personalizado {#example-custom-llm-client}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

def my_llm_client(provider, messages, json_schema, model, model_params):
    response = call_my_llm(messages, model)
    return response

judge = LLMJudge(
    client=my_llm_client,
    model="my-custom-model",
    user_prompt="Is this response accurate? {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Accuracy check",
        reasoning=True,
        pass_when=True,
    ),
)
{{< /code-block >}}

#### Puntos clave {#key-points}

- Requiere un `provider` (`"openai"`, `"azure_openai"`, `"anthropic"` o `"bedrock"`) o un `client` personalizado.
- Establezca las claves de API mediante `client_options={"api_key": "..."}` o variables de entorno (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`). Para Azure OpenAI, establezca `AZURE_OPENAI_API_KEY` y `AZURE_OPENAI_ENDPOINT`. Para Bedrock, configure las credenciales de AWS a través de variables de entorno o `client_options`.
- Utilice `reasoning=True` en salidas estructuradas para incluir una explicación en los resultados.
- Defina criterios de aprobación/rechazo con `pass_when` (booleano), `pass_values` (categórico) o `min_threshold`/`max_threshold` (puntuación).

#### Publicación de un LLMJudge como una evaluación gestionada por Datadog {#publishing-an-llmjudge-as-a-datadog-managed-evaluation}

Utilice `LLMObs.publish_evaluator()` para enviar una configuración de `LLMJudge` definida localmente a Datadog como un borrador de LLM-as-a-judge personalizado. Esto le permite definir y validar un evaluador en experimentos y, luego, promoverlo a producción sin tener que recrear manualmente la configuración en la interfaz de usuario.

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|-------------|
| `evaluator` | `LLMJudge` | Sí | La instancia `LLMJudge` que se va a publicar. |
| `ml_app` | `str` | Sí | El nombre de la aplicación LLM. |
| `eval_name` | `str` | No | El nombre que se utilizará para el evaluador en Datadog. Si se omite, se utiliza de forma predeterminada el `name` establecido en la instancia `LLMJudge`. |
| `variable_mapping` | `dict[str, str]` | No | Reasigna nombres de variables en `user_prompt` a rutas de campos de tramo de Datadog en el evaluador publicado. |

{{< code-block lang="python" >}}
from ddtrace.llmobs import BooleanStructuredOutput, LLMJudge, LLMObs

LLMObs.enable(
    ml_app="my-ml-app",
    api_key="<DD_API_KEY>",
    app_key="<DD_APP_KEY>",
)

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    system_prompt="You are a helpful evaluator.",
    user_prompt=(
        "Does the output correctly answer the question?\n"
        "Input: {{input_data}}\n"
        "Output: {{output_data}}"
    ),
    structured_output=BooleanStructuredOutput("correctness", pass_when=True),
    name="my-correctness-judge",
)

result = LLMObs.publish_evaluator(
    judge,
    ml_app="my-ml-app",
    variable_mapping={"input_data": "span_input", "output_data": "span_output"},
)
print(result["ui_url"])
{{< /code-block >}}

`LLMObs.publish_evaluator()` devuelve `{"ui_url": "..."}`, que enlaza con el evaluador en Datadog.

<div class="alert alert-info">Cada llamada a <code>LLMObs.publish_evaluator()</code> crea o actualiza el borrador del evaluador. Actívelo desde la interfaz de usuario de Datadog para ejecutarlo en producción.</div>

### Evaluadores integrados {#built-in-evaluators}

El SDK proporciona evaluadores integrados para patrones de evaluación comunes. Estos son evaluadores basados en clases que puede utilizar directamente sin escribir lógica personalizada.

#### StringCheckEvaluator {#stringcheckevaluator}

Realiza operaciones de comparación de cadenas entre `output_data` y `expected_output`.

| Operación | Descripción |
|-----------|-------------|
| `eq` | Coincidencia exacta (predeterminado) |
| `ne` | No es igual |
| `contains` | `output_data` contiene `expected_output` (distingue entre mayúsculas y minúsculas) |
| `icontains` | `output_data` contiene `expected_output` (no distingue entre mayúsculas y minúsculas) |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import StringCheckEvaluator

# Perform an exact match (default)
evaluator = StringCheckEvaluator(operation="eq", case_sensitive=True)

# Check whether output_data contains expected_output (case-insensitive)
evaluator = StringCheckEvaluator(operation="icontains", strip_whitespace=True)

# Extract field from dict output before comparison
evaluator = StringCheckEvaluator(
    operation="eq",
    output_extractor=lambda x: x.get("message", "") if isinstance(x, dict) else str(x),
)
{{< /code-block >}}

#### RegexMatchEvaluator {#regexmatchevaluator}

Valida la salida con respecto a un patrón de expresión regular.

| Modo de coincidencia | Descripción |
|------------|-------------|
| `search` | Coincidencia parcial en cualquier parte de la cadena (predeterminado) |
| `match` | Coincidir desde el inicio de la cadena |
| `fullmatch` | Coincidir con toda la cadena |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import RegexMatchEvaluator
import re

# Validate email format
evaluator = RegexMatchEvaluator(
    pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    match_mode="fullmatch"
)

# Validate output pattern (case-insensitive)
evaluator = RegexMatchEvaluator(
    pattern=r"success|completed",
    flags=re.IGNORECASE
)
{{< /code-block >}}

#### LengthEvaluator {#lengthevaluator}

Valida las restricciones de longitud de la salida.

| Tipo de conteo | Descripción |
|------------|-------------|
| `characters` | Contar caracteres (predeterminado) |
| `words` | Contar palabras |
| `lines` | Contar líneas |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import LengthEvaluator

# Ensure response is 50-200 characters
evaluator = LengthEvaluator(min_length=50, max_length=200, count_type="characters")

# Validate word count
evaluator = LengthEvaluator(min_length=10, max_length=100, count_type="words")
{{< /code-block >}}

#### JSONEvaluator {#jsonevaluator}

Valida que la salida sea un JSON válido y, opcionalmente, verifica las claves requeridas.

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import JSONEvaluator

# Validate JSON syntax
evaluator = JSONEvaluator()

# Validate that required keys exist
evaluator = JSONEvaluator(required_keys=["name", "status", "data"])
{{< /code-block >}}

#### SemanticSimilarityEvaluator {#semanticsimilarityevaluator}

Mide la similitud semántica entre `output_data` y `expected_output` utilizando embeddings. Devuelve una puntuación de similitud entre 0.0 y 1.0.

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import SemanticSimilarityEvaluator
from openai import OpenAI

client = OpenAI()

def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return response.data[0].embedding

evaluator = SemanticSimilarityEvaluator(
    embedding_fn=get_embedding,
    threshold=0.8  # Minimum similarity score to pass
)
{{< /code-block >}}

### Evaluadores basados en funciones {#function-based-evaluators}

Para una lógica de evaluación sencilla, defina una función en lugar de una clase. Los evaluadores basados en funciones reciben la entrada, la salida y la salida esperada directamente como argumentos.

{{< code-block lang="python" >}}
from ddtrace.llmobs import EvaluatorResult

def exact_match_evaluator(input_data, output_data, expected_output):
    """Checks if output exactly matches expected output."""
    matches = output_data == expected_output
    return EvaluatorResult(
        value=matches,
        reasoning="Exact match" if matches else "Output differs from expected",
        assessment="pass" if matches else "fail",
    )
{{< /code-block >}}

**Firma de la función**:

{{< code-block lang="python" >}}
def evaluator_function(
    input_data: Any,
    output_data: Any,
    expected_output: Any
) -> Union[JSONType, EvaluatorResult, MultiEvaluatorResult]:
    ...
{{< /code-block >}}

Puede devolver:
- Un valor simple (`str`, `float`, `int`, `bool`, `dict`), o
- Un `EvaluatorResult` para obtener resultados enriquecidos con razonamiento y metadatos, o
- Un `MultiEvaluatorResult` para emitir múltiples métricas con nombre desde una sola llamada al evaluador

### Devolución de múltiples valores con MultiEvaluatorResult {#returning-multiple-values-with-multievaluatorresult}

Cuando un solo evaluador produce varias métricas relacionadas (por ejemplo, precisión, recall y una categoría de matriz de confusión a partir de una llamada de evaluación de LLM), devuelva un `MultiEvaluatorResult` en lugar de un solo valor. Cada entrada se emite como su propia métrica en Datadog.

{{< code-block lang="python" >}}
from ddtrace.llmobs import EvaluatorResult, MultiEvaluatorResult

def confusion_matrix_evaluator(input_data, output_data, expected_output):
    predicted = bool(output_data)
    expected = bool(expected_output)
    correct = predicted == expected

    if predicted and expected:
        category = "true_positive"
    elif predicted and not expected:
        category = "false_positive"
    elif not predicted and expected:
        category = "false_negative"
    else:
        category = "true_negative"

    return MultiEvaluatorResult(
        {
            "correct": EvaluatorResult(
                value=correct,
                assessment="pass" if correct else "fail",
                reasoning=f"predicted={predicted}, expected={expected}",
            ),
            "category": category,
            "false_positive": category == "false_positive",
        }
    )
{{< /code-block >}}

De forma predeterminada, las etiquetas de las submétricas tienen como prefijo el nombre del evaluador: `confusion_matrix_evaluator-correct`, `confusion_matrix_evaluator-category`, etcétera. Para emitir claves sin procesar sin un prefijo, pase `prefix=False`:

{{< code-block lang="python" >}}
return MultiEvaluatorResult({"precision": 0.9, "recall": 0.8}, prefix=False)
{{< /code-block >}}

<div class="alert alert-warning">Si dos evaluadores emiten la misma etiqueta de métrica para el mismo registro del conjunto de datos (por ejemplo, ambos usan <code>prefix=False</code> con la misma clave), el segundo valor sobrescribe al primero y se registra una advertencia.</div>

`MultiEvaluatorResult` también es compatible con evaluadores basados en clases y evaluadores de resumen:

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, MultiEvaluatorResult

class ConfusionMatrixEvaluator(BaseEvaluator):
    def __init__(self):
        super().__init__(name="confusion_matrix")

    def evaluate(self, context: EvaluatorContext) -> MultiEvaluatorResult:
        predicted = bool(context.output_data)
        expected = bool(context.expected_output)
        correct = predicted == expected
        # Emitted labels: correct, false_positive, false_negative (prefix=False)
        return MultiEvaluatorResult(
            {
                "correct": correct,
                "false_positive": predicted and not expected,
                "false_negative": not predicted and expected,
            },
            prefix=False
        )
{{< /code-block >}}

## Uso de evaluadores en experimentos {#using-evaluators-in-experiments}

Pase sus evaluadores a `LLMObs.experiment()` para ejecutarlos contra cada registro en un conjunto de datos. El SDK crea automáticamente un `EvaluatorContext` para cada registro y llama a su evaluador. Después de procesar todos los registros, cualquier evaluador de resumen se ejecuta sobre los resultados agregados.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, Dataset, DatasetRecord

# Create dataset
dataset = Dataset(
    name="qa_dataset",
    records=[
        DatasetRecord(
            input_data={"question": "What is 2+2?"},
            expected_output="4"
        ),
        DatasetRecord(
            input_data={"question": "What is the capital of France?"},
            expected_output="Paris"
        ),
    ]
)

# Define task
def qa_task(input_data, config):
    return generate_answer(input_data["question"])

# Create evaluators
semantic_eval = SemanticSimilarityEvaluator(threshold=0.7)
summary_eval = AverageScoreEvaluator("semantic_similarity")

# Run experiment
experiment = LLMObs.experiment(
    name="qa_experiment",
    task=qa_task,
    dataset=dataset,
    evaluators=[semantic_eval, exact_match_evaluator],
    summary_evaluators=[summary_eval]
)

experiment.run()
{{< /code-block >}}

### Uso de evaluadores gestionados {#using-managed-evaluators}

`RemoteEvaluator` le permite hacer referencia a una [evaluación personalizada LLM-as-a-judge][5] configurada en la interfaz de usuario de Datadog por nombre, y ejecutarla como parte de un experimento local. Esto le permite reutilizar sus evaluadores de producción en experimentos offline sin tener que volver a implementar la lógica de evaluación en Python.

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `eval_name` | `str` | El nombre del evaluador LLM-as-a-judge tal como está configurado en Datadog. |
| `transform_fn` | `Optional[Callable]` | Una función que asigna un `EvaluatorContext` a un dict de valores de variables de plantilla. |

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, RemoteEvaluator

evaluator = RemoteEvaluator(eval_name="quality-assessment")

experiment = LLMObs.experiment(
    name="my-experiment",
    task=my_task,
    dataset=dataset,
    evaluators=[evaluator],
)
experiment.run()
{{< /code-block >}}

#### Asignación de datos del conjunto de datos a variables de plantilla con `transform_fn` {#mapping-dataset-data-to-prompt-variables-with-transform-fn}

Cuando configura un LLM-as-a-judge en la interfaz de usuario de Datadog, la [plantilla de prompt utiliza variables][7] como `{{tramo_input}}` and `{{span_output}}`. By default, `RemoteEvaluator` asigna lo siguiente:
- `input_data` → `span_input`
- `output_data` → `span_output`
- `expected_output` → `meta.expected_output`

Si los registros de su conjunto de datos tienen una estructura diferente (por ejemplo, `input_data` es un dict con múltiples claves), proporcione un `transform_fn` para controlar exactamente qué valores se envían para cada variable de plantilla:

{{< code-block lang="python" >}}
from ddtrace.llmobs import RemoteEvaluator, EvaluatorContext

def my_transform(context: EvaluatorContext) -> dict:
    # input_data is a dict: {"user_query": str, "retrieved_docs": list[str]}
    return {
        "span_input": context.input_data.get("user_query"),   # → {{span_input}} in the prompt
        "span_output": context.output_data,                   # → {{span_output}} in the prompt
        "meta": {
            "retrieved_docs": context.input_data.get("retrieved_docs"),  # → {{meta.retrieved_docs}}
        },
    }

evaluator = RemoteEvaluator(
    eval_name="quality-assessment",
    transform_fn=my_transform,
)
{{< /code-block >}}

Si el evaluador de backend encuentra un error, se genera un `RemoteEvaluatorError`. Inspeccione `backend_error` para obtener detalles:

{{< code-block lang="python" >}}
from ddtrace.llmobs import RemoteEvaluator, RemoteEvaluatorError, EvaluatorContext

evaluator = RemoteEvaluator(eval_name="quality-assessment")
context = EvaluatorContext(input_data={"query": "What is the capital of France?"}, output_data="Paris")

try:
    result = evaluator.evaluate(context)
except RemoteEvaluatorError as e:
    print(e.backend_error)
    # {"type": "...", "message": "...", "recommended_resolution": "..."}
{{< /code-block >}}

## Uso de evaluadores en producción {#using-evaluators-in-production}

<div class="alert alert-info">Esta sección cubre las evaluaciones que usted ejecuta y envía manualmente desde el código de su aplicación. Para que Datadog ejecute evaluaciones automáticamente en trazas de producción, consulte <a href="/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations">Evaluaciones personalizadas de LLM-as-a-Judge</a> en su lugar.</div>

Para enviar evaluaciones desde el código de su aplicación, construya el `EvaluatorContext` usted mismo, llame al evaluador y envíe el resultado con `LLMObs.submit_evaluation()`. También puede enviar evaluaciones a través de la API HTTP.

Para conocer los argumentos completos de `submit_evaluation()` y las opciones de unión de tramos, consulte la [documentación de evaluaciones externas][1]. Para la especificación de la API HTTP, consulte la [referencia de la API de evaluaciones][2].

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, EvaluatorContext
from ddtrace.llmobs.decorators import llm

evaluator = SemanticSimilarityEvaluator(threshold=0.8)

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(input_text):
    completion = ...  # Your LLM application logic

    # Build the evaluation context from the span data
    context = EvaluatorContext(
        input_data=input_text,
        output_data=completion,
        expected_output=None,
    )

    # Run the evaluator
    result = evaluator.evaluate(context)

    # Submit the result to Datadog
    LLMObs.submit_evaluation(
        span=LLMObs.export_span(),
        ml_app="chatbot",
        label=evaluator.name,
        metric_type="score",
        value=result.value,
        assessment=result.assessment,
        reasoning=result.reasoning,
    )

    return completion
{{< /code-block >}}

## Referencia del modelo de datos {#data-model-reference}

### EvaluatorContext {#evaluatorcontext}

Una dataclass inmutable que contiene toda la información necesaria para ejecutar una evaluación.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `input_data` | `Any` | La entrada proporcionada a la aplicación LLM (por ejemplo, un prompt). |
| `output_data` | `Any` | La salida real de la aplicación LLM. |
| `expected_output` | `Any` | La salida esperada o ideal que el LLM debería haber producido. |
| `metadata` | `Dict[str, Any]` | Metadatos adicionales. |
| `span_id` | `str` | El identificador único del tramo. |
| `trace_id` | `str` | El identificador único de la traza. |

En Experiments, el SDK completa esto automáticamente a partir de cada registro del conjunto de datos. En producción, usted lo construye por su cuenta a partir de los datos de su tramo.

### EvaluatorResult {#evaluatorresult}

Le permite devolver resultados de evaluación enriquecidos con contexto adicional. Se utiliza tanto en Experiments como en producción.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `value` | `Union[str, float, int, bool, dict]` | El valor de la evaluación. El tipo depende de `metric_type`. |
| `reasoning` | `Optional[str]` | Una explicación textual del resultado de la evaluación. |
| `assessment` | `Optional[str]` | Una evaluación de esta evaluación. Los valores aceptados son `pass` y `fail`. |
| `metadata` | `Optional[Dict[str, Any]]` | Metadatos adicionales sobre la evaluación. |
| `tags` | `Optional[Dict[str, str]]` | Etiquetas para aplicar a la métrica de evaluación. |

### MultiEvaluatorResult {#multievaluatorresult}

Un contenedor para emitir múltiples métricas de evaluación con nombre desde un solo evaluador. Importar desde `ddtrace.llmobs`.

| Parámetro | Tipo | Predeterminado | Descripción |
|-----------|------|---------|-------------|
| `values` | `Dict[str, Union[str, float, int, bool, dict, EvaluatorResult]]` | — | Asignación del nombre de la submétrica a un valor simple o a un `EvaluatorResult`. Debe ser no vacío; las claves deben seguir las convenciones de nomenclatura de [etiquetas de evaluación](#naming-conventions). |
| `prefix` | `bool` | `True` | Controla la generación de etiquetas. `True` → `"<evaluator_name>-<key>"`. `False` → clave sin procesar. |

Compatible con evaluadores basados en funciones, evaluadores basados en clases (`BaseEvaluator`) y evaluadores de resumen (`BaseSummaryEvaluator`).

### SummaryEvaluatorContext {#summaryevaluatorcontext}

Una dataclass inmutable que proporciona resultados de evaluación agregados en todos los registros del conjunto de datos en un experimento. Solo utilizado por evaluadores de resumen.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `inputs` | `List[Any]` | Lista de todos los datos de entrada del experimento. |
| `outputs` | `List[Any]` | Lista de todos los datos de salida del experimento. |
| `expected_outputs` | `List[Any]` | Lista de todos los resultados esperados del experimento. |
| `evaluation_results` | `Dict[str, List[Any]]` | Diccionario que asigna nombres de evaluadores a sus resultados. |
| `metadata` | `Dict[str, Any]` | Metadatos adicionales asociados con el experimento. |

### Tipos de métricas {#metric-types}

El tipo de métrica se establece al enviar una evaluación (a través de `submit_evaluation()` o la API HTTP) y determina cómo se valida y muestra el valor en Datadog.

| Tipo de métrica | Tipo de valor | Caso de uso |
|-------------|------------|----------|
| `categorical` | `str` | Clasificación de resultados en categorías (por ejemplo, "Positivo", "Negativo", "Neutral") |
| `score` | `float` o `int` | Puntuaciones o calificaciones numéricas (por ejemplo, 0.0-1.0, 1-10) |
| `boolean` | `bool` | Evaluaciones de aprobado/reprobado o sí/no |
| `json` | `dict` | Datos de evaluación estructurados (por ejemplo, rúbricas multidimensionales o desgloses detallados) |

## Mejores prácticas {#best-practices}

### Convenciones de nomenclatura {#naming-conventions}

Las etiquetas de evaluación deben seguir estas convenciones:

- Deben comenzar con una letra
- Solo deben contener caracteres alfanuméricos ASCII, guiones bajos o guiones
- Los espacios y otros caracteres no admitidos se convierten en guiones bajos
- Unicode no es compatible
- No debe exceder los 200 caracteres (se prefiere menos de 100)
- Debe ser único para una aplicación de LLM determinada (`ml_app`) y una organización

### Ejecución simultánea {#concurrent-execution}

Establezca el parámetro `jobs` para ejecutar tareas y evaluadores simultáneamente en múltiples hilos, lo que permite que los experimentos se completen más rápido al procesar múltiples registros de conjuntos de datos.

<div class="alert alert-info">Los evaluadores asíncronos aún no son compatibles con la ejecución simultánea. Solo los evaluadores síncronos se benefician de la ejecución en paralelo.</div>

### Integración con OpenTelemetry {#opentelemetry-integration}

Al enviar evaluaciones para [spans instrumentados con OpenTelemetry][3], incluya la etiqueta `source:otel` en la evaluación. Consulte la [documentación de evaluaciones externas][1] para ver ejemplos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/investigate/evaluations/external_evaluations
[2]: /es/llm_observability/instrument/api/#evaluations-api
[3]: /es/llm_observability/instrument/otel_instrumentation
[4]: /es/llm_observability/improve/experiments
[5]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[6]: /es/llm_observability/investigate/evaluations/external_evaluations/deepeval/
[7]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations#configure-the-prompt
[8]: /es/llm_observability/investigate/evaluations/external_evaluations/pydantic