---
aliases:
- /es/llm_observability/experiments/setup/
description: Cómo configurar Agent Observability Experiments y comenzar a ejecutar
  Agent Observability Experiments.
further_reading:
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: Blog
  text: Depure y evalúe su aplicación de IA desde su agente de codificación con Datadog
    Agent Observability
title: Configuración y uso
---
Esta página describe cómo configurar y utilizar Agent Observability Experiments con el SDK de Python.

## Configurar Agent Observability {#set-up-agent-observability}

Si aún no ha configurado Agent Observability:

1. Instalar el SDK de Python para Agent Observability:

   ```shell
   pip install ddtrace>=4.3.0
   ```

2. Habilitar Agent Observability:

   ```python
   from ddtrace.llmobs import LLMObs

   LLMObs.enable(
       api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
       app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
       site="datadoghq.com",      # defaults to DD_SITE environment variable
       project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
   )
   ```

   <div class="alert alert-warning">Debe proporcionar tanto un <code>api_key</code> y <code>app_key</code>.</div>

### Correlación de trazas de APM {#apm-trace-correlation}

Para correlacionar sus tramos de experimento con [APM Traces][5], ejecute Agent Observability a través de un Datadog Agent y mantenga `agentless_enabled` configurado en `False` (el valor predeterminado). El Agent reenvía los datos de traza a APM, lo que permite la correlación entre sus tramos de experimento y las trazas de APM.

   ```python
   LLMObs.enable(
       api_key="<YOUR_API_KEY>",
       app_key="<YOUR_APP_KEY>",
       site="datadoghq.com",
       agentless_enabled=False,  # default — required for APM Trace correlation
       project_name="<YOUR_PROJECT>",
   )
   ```

Si está ejecutando sin un Agent (por ejemplo, en un notebook o entorno de CI), puede configurar `agentless_enabled=True`, pero no se generan tramos de APM correspondientes para los tramos de experimento en ejecuciones sin agente.

## Crear un proyecto {#create-a-project}
_Projects_ son la capa organizativa central para los experimentos de LLM. Todos los conjuntos de datos y experimentos residen en un proyecto.
Puede crear un proyecto manualmente en la consola de Datadog, la API o el SDK especificando un nombre de proyecto que aún no exista en `LLMObs.enable`.

```python
LLMObs.enable(
    ...
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```

## Crear un conjunto de datos {#create-a-dataset}

Un _conjunto de datos_ es una colección de _entradas_, _salidas esperadas_ y _metadatos_ que representan escenarios en los que desea probar su agente. Cada conjunto de datos está asociado con un _proyecto_.  

- **entrada** (obligatorio): Representa toda la información a la que el agente puede acceder en una tarea.
- **salida esperada** (opcional): También llamada _ground truth_, representa la respuesta ideal que el agente debería generar. Puede utilizar la _salida esperada_ para almacenar la salida real de la aplicación, así como cualquier resultado intermedio que desee evaluar. 
- **metadatos** (opcional): Contiene cualquier información útil para categorizar el registro y utilizarla para análisis posteriores. Por ejemplo: temas, etiquetas, descripciones, notas.

Para crear un conjunto de datos a partir de un archivo CSV, utilice `LLMObs.create_dataset_from_csv()`:

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# question,category,answer,difficulty
# What is the capital of Japan?,geography,Tokyo,medium
# What is the capital of Brazil?,geography,Brasília,medium

```

Consulte [Datasets][1] para obtener más información sobre los conjuntos de datos, incluyendo: cómo crear conjuntos de datos manualmente, cómo recuperar y administrar conjuntos de datos, y cómo Datadog retiene las versiones de los conjuntos de datos.

## Cree un experimento {#create-an-experiment}
Un _experimento_ le permite probar sistemáticamente su aplicación de LLM ejecutando su agente en un conjunto de escenarios de su conjunto de datos y midiendo el rendimiento frente a los resultados esperados mediante evaluadores. Luego puede comparar cómo funcionan las diferentes configuraciones de la aplicación, una al lado de la otra.

- **tarea**: Define el flujo de trabajo principal que desea evaluar. Puede variar desde una sola llamada a LLM hasta un flujo más complejo que involucre múltiples llamadas a LLM y pasos de RAG. La tarea se ejecuta secuencialmente en todos los registros del conjunto de datos.
- **evaluador**: Una función, ejecutada en cada registro, que mide qué tan bien funciona el modelo o agente. Los evaluadores le permiten comparar el resultado con el resultado esperado o con la entrada original.  

- **evaluadores de resumen**: Funciones opcionales ejecutadas contra todos los datos del experimento (entrada, salida, esperado, resultados de los evaluadores). Los evaluadores de resumen le permiten calcular métricas más avanzadas como precisión, exhaustividad y exactitud en todo su conjunto de datos. 


Para crear un experimento:


### 1. Cargue un conjunto de datos {#1-load-a-dataset}
   ```python
   from ddtrace.llmobs import LLMObs
   from typing import Dict, Any, Optional, List

   dataset = LLMObs.pull_dataset("capitals-of-the-world")
   ```

### 2. Defina una función de tarea que procese un solo registro del conjunto de datos {#2-define-a-task-function-that-processes-a-single-dataset-record}

   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]
       # Your LLM or processing logic here
       return "Beijing" if "China" in question else "Unknown"
   ```
   Una tarea puede aceptar cualquier tipo no nulo como `input_data` (cadena, número, booleano, objeto, arreglo). El resultado que se utilizará en los evaluadores puede ser de cualquier tipo.
   Este ejemplo genera una cadena, pero se puede generar un diccionario como resultado para almacenar cualquier información intermedia y compararla en los evaluadores.

   Opcionalmente, su función de tarea puede aceptar un tercer parámetro `metadata` para recibir los metadatos del registro del conjunto de datos:
   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
       difficulty = metadata.get("difficulty", "unknown") if metadata else "unknown"
       question = input_data["question"]
       return "Beijing" if "China" in question else "Unknown"
   ```

   Puede rastrear las diferentes partes de su tarea de experimento (flujo de trabajo, llamadas a herramientas, etc.) utilizando los [mismos decoradores de rastreo][2] que usa en producción.
   Si utiliza un [marco compatible][3] (OpenAI, Amazon Bedrock, etc.), Agent Observability rastrea y anota automáticamente las llamadas a los marcos y bibliotecas de LLM, lo que le brinda observabilidad inmediata para las llamadas que realiza su aplicación de LLM.

#### Uso de tramos de OpenTelemetry dentro de experimentos

   Si su aplicación utiliza [instrumentación de OpenTelemetry][6], puede crear tramos de OTel dentro de su tarea de experimento. Con `DD_TRACE_OTEL_ENABLED=1`, ddtrace actúa como el TracerProvider de OpenTelemetry, por lo que los tramos de OTel aparecen automáticamente como hijos del tramo del experimento.

   ```python
   import json
   from opentelemetry import trace

   tracer = trace.get_tracer(__name__)

   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]

       # OTel gen_ai span — automatically becomes a child of the experiment span
       with tracer.start_as_current_span("my-llm-call") as span:
           span.set_attribute("gen_ai.operation.name", "chat")
           span.set_attribute("gen_ai.system", "openai")
           span.set_attribute("gen_ai.request.model", "gpt-4o")
           span.set_attribute("gen_ai.usage.input_tokens", 25)
           span.set_attribute("gen_ai.usage.output_tokens", 8)
           span.set_attribute(
               "gen_ai.input.messages",
               json.dumps([{"role": "user", "parts": [{"type": "text", "content": question}]}]),
           )

           result = call_my_llm(question)

           span.set_attribute(
               "gen_ai.output.messages",
               json.dumps([{"role": "assistant", "parts": [{"type": "text", "content": result}]}]),
           )

       return result
   ```

   Para habilitar esto, establezca la variable de entorno `DD_TRACE_OTEL_ENABLED`:

   ```shell
   DD_TRACE_OTEL_ENABLED=1 python my_experiment.py
   ```


### 3. Defina evaluadores {#3-define-evaluators}

   Los evaluadores miden qué tan bien funciona su modelo o agente en cada registro. Puede definir evaluadores utilizando dos enfoques:

   - **Basado en funciones**: Defina una función que reciba `input_data`, `output_data` y `expected_output` como argumentos separados. Ideal para evaluadores únicos con lógica sencilla.
   - **Basado en clases**: Subclase `BaseEvaluator` para evaluadores reutilizables con configuración personalizada. Los evaluadores basados en clases reciben un objeto `EvaluatorContext` con el contexto completo del tramo.

   Para obtener información detallada sobre la creación de evaluadores, incluida la referencia completa del modelo de datos y las mejores prácticas, consulte la [Guía para desarrolladores de evaluación][4].

   Datadog admite los siguientes tipos de retorno de evaluador:
   - **Boolean**: devuelve true o false
   - **puntuación**: devuelve un valor numérico (float)
   - **categórico**: devuelve una categoría etiquetada (string)
   - **json**: devuelve datos estructurados (dict)

   También puede devolver:
   - Un `EvaluatorResult` para capturar datos de evaluación más completos, como `reasoning`, `assessment` (`"pass"` o `"fail"`), `metadata` y `tags`.
   - Una `MultiEvaluatorResult` para emitir múltiples métricas con nombre desde una sola llamada al evaluador. Para obtener detalles y ejemplos, consulte la [Guía para desarrolladores de evaluación][4].

#### Evaluadores basados en funciones

   ```python
   def exact_match(input_data: Dict[str, Any], output_data: str, expected_output: str) -> bool:
       return output_data == expected_output

   def overlap(input_data: Dict[str, Any], output_data: str, expected_output: str) -> float:
       expected_output_set = set(expected_output)
       output_set = set(output_data)

       intersection = len(output_set.intersection(expected_output_set))
       union = len(output_set.union(expected_output_set))

       return intersection / union

   def fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> EvaluatorResult:
       fake_llm_call = "excellent"
       return EvaluatorResult(
           value=fake_llm_call,
           reasoning="the model explains itself",
           assessment="pass", # or fail
           tags={"task": "judge_llm_call"},
       )

   # Return multiple metrics from one evaluator call
   from ddtrace.llmobs import MultiEvaluatorResult

   def multi_metric_evaluator(input_data, output_data, expected_output):
       correct = output_data == expected_output
       return MultiEvaluatorResult(
           {
               "correct": EvaluatorResult(value=correct, assessment="pass" if correct else "fail"),
               "length": len(str(output_data)),
           }
       )
       # Emitted as: multi_metric_evaluator-correct, multi_metric_evaluator-length
   ```

#### Evaluadores basados en clases

   ```python
   from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, EvaluatorResult

   class SemanticSimilarityEvaluator(BaseEvaluator):
       def __init__(self, threshold: float = 0.8):
           super().__init__(name="semantic_similarity")
           self.threshold = threshold

       def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
           score = compute_similarity(context.output_data, context.expected_output)
           return EvaluatorResult(
               value=score,
               reasoning=f"Similarity score: {score:.2f}",
               assessment="pass" if score >= self.threshold else "fail",
           )
   ```

### 4. (Opcional) Defina evaluadores de resumen {#4-optional-define-summary-evaluators}

   Los evaluadores de resumen se ejecutan después de que todos los evaluadores a nivel de registro hayan terminado y reciben los resultados agregados para calcular estadísticas a nivel de conjunto de datos, como promedios o tasas de aprobación. Al igual que los evaluadores a nivel de registro, puede definir evaluadores de resumen como funciones o clases.

   Para el enfoque basado en clases que utiliza `BaseSummaryEvaluator`, consulte la [Guía para desarrolladores de evaluación][4].

#### Evaluadores de resumen basados en funciones

   ```python
    def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
        return evaluators_results["exact_match"].count(True)

   ```

   Las funciones de evaluador de resumen pueden tomar una lista de cualquier tipo no nulo como `inputs` (cadena, número, booleano, objeto, arreglo); `outputs` y `expected_outputs` pueden ser listas de cualquier tipo. `evaluators_results` es un diccionario de listas de resultados de los evaluadores, indexado por el nombre de la función del evaluador. Por ejemplo, en el fragmento de código anterior, el evaluador de resumen `num_exact_matches` utiliza los resultados (una lista de booleanos) del evaluador `exact_match` para proporcionar un conteo del número de coincidencias exactas.

#### Evaluadores de resumen basados en clases

   ```python
   from ddtrace.llmobs import BaseSummaryEvaluator, SummaryEvaluatorContext

   class AverageScoreEvaluator(BaseSummaryEvaluator):
       def __init__(self, target_evaluator: str):
           super().__init__(name="average_score")
           self.target_evaluator = target_evaluator

       def evaluate(self, context: SummaryEvaluatorContext):
           scores = context.evaluation_results.get(self.target_evaluator, [])
           if not scores:
               return None
           return sum(scores) / len(scores)
   ```

   Datadog admite los siguientes tipos de retorno de Evaluador de resumen:
   - **Boolean**: devuelve true o false
   - **puntuación**: devuelve un valor numérico (float)
   - **categórico**: devuelve una categoría etiquetada (string)
   - **json**: devuelve datos estructurados (dict)

### 5. Cree y ejecute el experimento. {#5-create-and-run-the-experiment}
   ```python
   experiment = LLMObs.experiment(
       name="capital-cities-test",
       task=task,
       dataset=dataset,
       evaluators=[exact_match, overlap, fake_llm_as_a_judge],
       summary_evaluators=[num_exact_matches], # optional
       description="Testing capital cities knowledge",
       config={
           "model_name": "gpt-4",
           "version": "1.0"
       },
   )

   # Run the experiment
   results = experiment.run()  # Run on all dataset records

   # Process results
   for result in results.get("rows", []):
       print(f"Record {result['idx']}")
       print(f"Input: {result['input']}")
       print(f"Output: {result['output']}")
       print(f"Score: {result['evaluations']['evaluator']['value']}")
       if result['error']['message']:
           print(f"Error: {result['error']['message']}")
   ```

   Para aumentar la velocidad de ejecución del experimento, puede habilitar el procesamiento en paralelo:
   ```
   results = experiment.run(jobs=4)
   ```

   Para probar su pipeline en un subconjunto de los datos, utilice:
   ```
   results = experiment.run(sample_size=10)
   ```

   Para detener la ejecución del experimento si ocurre un error, utilice:
   ```
   results = experiment.run(raise_errors=True)
   ```

### 6. Consulte los resultados de su experimento en Datadog. {#6-review-your-experiment-results-in-datadog}
   ```
   print(f"View experiment: {experiment.url}")
   ```

Nota: Las trazas de los experimentos de LLM se conservan durante 90 días.

[1]: /es/llm_observability/improve/datasets
[2]: /es/llm_observability/instrument/custom_instrumentation?tab=decorators#trace-an-llm-application
[3]: /es/llm_observability/instrument/auto_instrumentation?tab=python
[4]: /es/llm_observability/investigate/evaluations/evaluation_developer_guide
[5]: /es/llm_observability/instrument/agent_observability_and_apm/
[6]: /es/llm_observability/instrument/otel_instrumentation

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}