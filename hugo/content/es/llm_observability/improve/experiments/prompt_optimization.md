---
aliases:
- /es/llm_observability/experiments/prompt_optimization/
description: Mejore automáticamente los prompts de LLM mediante un refinamiento iterativo
  y una evaluación basada en IA.
further_reading:
- link: /llm_observability/improve/experiments/setup
  tag: Documentación
  text: Configurar y utilizar experimentos de Agent Observability
- link: /llm_observability/improve/datasets
  tag: Documentación
  text: Cree y administre conjuntos de datos
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: Blog
  text: Cree y haga un seguimiento de experimentos de LLM con Datadog
private: true
title: Optimización de prompts
---
## Descripción general {#overview}

La optimización de prompts automatiza el proceso de mejora de los prompts de LLM mediante una evaluación sistemática y un refinamiento basado en IA. En lugar de probar y ajustar los prompts manualmente, puede usar la optimización de prompts para analizar datos de rendimiento, identificar patrones de falla y sugerir mejoras específicas.

La optimización de prompts ejecuta su aplicación de LLM en un conjunto de datos con el prompt actual, mide el rendimiento mediante sus métricas personalizadas y luego utiliza un modelo de razonamiento para analizar los resultados y generar un prompt mejorado. Este ciclo se repite hasta que se alcancen sus métricas objetivo o se alcance el número máximo de iteraciones.

### Capacidades de optimización de prompts {#prompt-optimization-capabilities}
- Mejora automatizada de prompts mediante análisis basado en IA
- Métricas de evaluación personalizables para tareas específicas de dominio
- Condiciones de detención integradas para evitar la optimización excesiva
- Ejecución de experimentos en paralelo para una iteración rápida
- División de conjuntos de datos en subconjuntos de entrenamiento, validación y prueba para estimaciones de rendimiento imparciales
- Integración completa con Agent Observability para el seguimiento y la depuración

Prompt Optimization admite cualquier caso de uso donde se conozca la salida esperada y exista una forma definida de calificar las predicciones del modelo. La arquitectura de Prompt Optimization admite cualquier tipo de salida, incluida la extracción de datos estructurados, la generación de texto de forma libre y las predicciones numéricas.

## Requisitos previos {#prerequisites}

- [`ddtrace`][1] versión 4.6.0+
- Agent Observability habilitado con [claves de API y de aplicación][2] de Datadog
- Un [dataset][3] con ejemplos representativos (recomendado: 50-100 registros)
- Acceso a un modelo de razonamiento avanzado (o3-mini, Claude 3.5 Sonnet o similar)

## Configure la optimización de prompts {#set-up-prompt-optimization}

### 1. Prepare su conjunto de datos {#1-prepare-your-dataset}

Cree o cargue un conjunto de datos que contenga pares de entrada-salida que representen su tarea:

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    api_key="<YOUR_API_KEY>",
    app_key="<YOUR_APP_KEY>",
    project_name="prompt-optimization-project"
)

# Load existing dataset
dataset = LLMObs.pull_dataset(dataset_name="hallucination-detection")

# Or create a new one
dataset = LLMObs.create_dataset(
    dataset_name="hallucination-detection",
    description="Examples of conversations with hallucinated content",
    records=[
        {
            "input_data": {"conversation": "User: What's the capital of France?\nAI: London"},
            "expected_output": True  # True = hallucination detected
        },
        # Add more records...
    ]
)
```

Para ayudar a garantizar una optimización sólida, Datadog recomienda que incluya diversos ejemplos que cubran casos típicos y casos límite.

### 2. Defina su función de tarea {#2-define-your-task-function}

Implemente la función que representa su aplicación de LLM. Esta función recibe datos de entrada y la configuración (incluido el prompt que se está optimizando):

```python
from openai import OpenAI
from pydantic import BaseModel

class DetectionResult(BaseModel):
    value: bool
    reasoning: str

    @classmethod
    def output_format(cls) -> str:
        """Return JSON schema for output format."""
        return json.dumps(
            {
                "value": "boolean: true or false evaluation result",
                "reasoning": "string: detailed explanation for the evaluation decision"
            },
            indent=3
        )

def detection_task(input_data, config):
    """Execute your LLM application with the current prompt."""
    client = OpenAI()

    prompt = config["prompt"]  # The prompt being optimized
    conversation = input_data["conversation"]

    response = client.chat.completions.parse(
        model=config.get("model_name", "gpt-4o-mini"),
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": f"Conversation:\n{conversation}"}
        ],
        response_format=DetectionResult
    )

    return response.choices[0].message.parsed
```

### 3. Defina funciones evaluadoras {#3-define-evaluator-functions}

Para optimizar su prompt, necesita múltiples capas de cálculo de métricas:

- A nivel de registro, etiquete los resultados con las condiciones de la matriz de confusión: verdadero positivo (TP), falso positivo (FP), verdadero negativo (TN), falso negativo (FN)
- Agregue estas etiquetas en todos los registros para calcular métricas intermedias (por ejemplo, cuente el total de TP, FP, TN y FN, luego calcule la precisión, la exhaustividad y la exactitud)
- Calcule la puntuación final para la que desea optimizar el prompt combinando o seleccionando entre las métricas agregadas (por ejemplo, devuelva solo la precisión, o combine precisión + exactitud)
- Etiquete los ejemplos de clasificación errónea para proporcionarlos al optimizador de prompts

Los siguientes ejemplos ilustran cómo implementar cada paso.

- **Los evaluadores individuales** miden cada resultado:

   ```python
   def confusion_matrix_evaluator(input_data, output_data, expected_output):
       """Evaluate a single prediction."""
       prediction = output_data.value

       if prediction and expected_output:
           return "true_positive"
       elif prediction and not expected_output:
           return "false_positive"
       elif not prediction and expected_output:
           return "false_negative"
       else:
           return "true_negative"
   ```

- **Los evaluadores de resumen** calculan métricas agregadas:

   ```python
   def precision_recall_evaluator(inputs, outputs, expected_outputs, evaluations):
       """Calculate precision and recall across all predictions."""
       tp = fp = tn = fn = 0

       for output, expected in zip(outputs, expected_outputs):
           pred = output.value if hasattr(output, 'value') else output
           if pred and expected:
               tp += 1
           elif pred and not expected:
               fp += 1
           elif not pred and expected:
               fn += 1
           else:
               tn += 1

       precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
       recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
       accuracy = (tp + tn) / (tp + tn + fp + fn)

       return {
           "precision": precision,
           "recall": recall,
           "accuracy": accuracy
       }
   ```

- **La función de puntuación** puede devolver uno de los valores devueltos por uno de los evaluadores de resumen (por ejemplo, precisión) o una combinación de múltiples métricas:

   ```python
   def compute_score(summary_evaluators):
       """Higher is better. Combine metrics according to business priorities."""
       metrics = summary_evaluators['precision_recall_evaluator']['value']
       # Optimize for precision
       return metrics['precision']
   ```

   o

   ```python
   def compute_score(summary_evaluators):
       """Computes F1 Score."""
       precision = summary_evaluators['precision_recall_evaluator']['value']['precision']
       recall = summary_evaluators['precision_recall_evaluator']['value']['recall']
       return 2 * (precision * recall) / (precision + recall)
   ```

- **Las funciones de etiquetado** categorizan los resultados para mostrar diversos ejemplos al optimizador:

   ```python
   def labelization_function(individual_result):
       """Categorize results into meaningful groups."""
       eval_value = individual_result["evaluations"]["confusion_matrix_evaluator"]["value"]

       if eval_value in ("true_positive", "true_negative"):
           return "CORRECT PREDICTION"
       else:
           return "INCORRECT PREDICTION"
   ```

   La función de etiquetado desempeña un papel importante en la optimización: para cada etiqueta única, el optimizador recibe un ejemplo seleccionado al azar de esa categoría (en el ejemplo anterior, las etiquetas son `CORRECT PREDICTION` y `INCORRECT PREDICTION`). Esto significa que el número de etiquetas determina directamente la diversidad de ejemplos mostrados al modelo de razonamiento.

   **Los nombres de las etiquetas deben ser significativos y descriptivos**, ya que se muestran directamente al modelo de razonamiento. Utilice etiquetas claras y legibles para los humanos como `HIGH CONFIDENCE ERROR` o `EDGE CASE FAILURE` en lugar de códigos como `TYPE_A` o `CAT_3`. Diseñe sus etiquetas para representar los patrones clave o sugerencias de los que desea que el optimizador aprenda, y mantenga la cardinalidad baja (menos de 10 etiquetas distintas) para ayudar a garantizar una retroalimentación enfocada y procesable.

### 4. Defina la tarea de optimización {#4-define-optimization-task}

Cree una función que llame a un modelo de razonamiento para sugerir mejoras en el prompt:

```python
from pydantic import BaseModel

class OptimizationResult(BaseModel):
    prompt: str

def optimization_task(system_prompt, user_prompt, config):
    """Use reasoning model to improve the prompt.

    Returns:
        str: The improved prompt text
    """
    client = OpenAI()

    response = client.chat.completions.parse(
        model="o3-mini",  # Use advanced reasoning model
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        response_format=OptimizationResult
    )

    return response.choices[0].message.parsed.prompt  # Must return string
```

<div class="alert alert-info">La tarea de optimización recibe un prompt del sistema con instrucciones para mejorar los prompts y un prompt del usuario con datos de rendimiento actuales y ejemplos. Prompt Optimization construye automáticamente estos prompts basándose en los resultados de su evaluación. La función debe devolver el prompt mejorado como una cadena.</div>

### 5. Ejecute optimización {#5-run-optimization}

Cree y ejecute la optimización:

```python
prompt_optimization = LLMObs._prompt_optimization(
    name="hallucination-detection-optimization",
    dataset=dataset,
    task=detection_task,
    optimization_task=optimization_task,
    evaluators=[confusion_matrix_evaluator],
    summary_evaluators=[precision_recall_evaluator],
    labelization_function=labelization_function,
    compute_score=compute_score,
    config={
        "prompt": "Detect if the AI response contains hallucinated information.",  # Initial prompt (required)
        # Optionals
        "model_name": "gpt-4o-mini",  # Target model - helps optimizer tailor suggestions to model capabilities
        "evaluation_output_format": DetectionResult.output_format(),  # Expected output schema - prompts optimizer to ensure format compliance
        "runs": 1,  # Number of times to evaluate each record - higher values reduce variance in metrics
    },
    max_iterations=10,
    stopping_condition=lambda evals: (
        evals['precision_recall_evaluator']['value']['precision'] >= 0.9 and
        evals['precision_recall_evaluator']['value']['accuracy'] >= 0.8
    )
)

# Execute optimization (parallel execution for faster results)
result = prompt_optimization.run(jobs=20)

# Access results
print(f"Best prompt: {result.best_prompt}")
print(f"Best score: {result.best_score}")
print(f"Achieved in {result.total_iterations} iterations")
print(f"View in Datadog: {result.best_experiment_url}")

# Get score progression
print(result.summary())
```

#### Habilite la división del conjunto de datos {#enable-dataset-splitting}

Divida su conjunto de datos en subconjuntos de entrenamiento, validación y prueba para obtener una estimación imparcial del rendimiento del prompt. Los ejemplos de entrenamiento alimentan al LLM de optimización, las puntuaciones de validación clasifican las iteraciones y un experimento de prueba final con el mejor prompt proporciona una puntuación imparcial.

Utilice `dataset_split=True` para las proporciones predeterminadas de 60/20/20:

```python
prompt_optimization = LLMObs._prompt_optimization(
    name="hallucination-detection-optimization",
    dataset=dataset,
    task=detection_task,
    optimization_task=optimization_task,
    evaluators=[confusion_matrix_evaluator],
    summary_evaluators=[precision_recall_evaluator],
    labelization_function=labelization_function,
    compute_score=compute_score,
    config={
        "prompt": "Detect if the AI response contains hallucinated information.",
    },
    max_iterations=10,
    dataset_split=True,  # Default 60/20/20 split
)

result = prompt_optimization.run(jobs=20)

# Access validation and test results
print(f"Best validation score: {result.best_score}")
print(f"Test score: {result.test_score}")
print(f"Test experiment: {result.test_experiment_url}")
```

Especifique proporciones personalizadas con una tupla de 3 elementos:

```python
prompt_optimization = LLMObs._prompt_optimization(
    # ... same parameters as above ...
    dataset_split=(0.7, 0.15, 0.15),  # 70% train, 15% valid, 15% test
)
```

Utilice un conjunto de datos de prueba independiente:

```python
prompt_optimization = LLMObs._prompt_optimization(
    # ... same parameters as above ...
    dataset_split=True,  # Splits main dataset 80/20 into train/valid
    test_dataset="my-curated-test-set",  # Separate dataset for unbiased testing
)
```

#### Opciones de configuración {#configuration-options}

`config`
: Un diccionario de configuración pasado a su función de tarea. Contiene las siguientes claves, así como cualquier parámetro personalizado que necesite su función de tarea:

  `"prompt"`
  : **Obligatorio**<br/>
  El prompt inicial

  `"model_name"`
  : _opcional_<br/>
  Especifica el modelo de destino para su tarea. Cuando se proporciona, el optimizador incluye orientación específica del modelo en sus sugerencias, adaptando las mejoras a las capacidades y limitaciones de ese modelo (por ejemplo, GPT-4 frente a Claude frente a Llama).

  `evaluation_output_format`
  : _opcional_<br/>
  Proporciona el esquema JSON para la estructura de salida esperada. El optimizador utiliza esto para garantizar que el prompt mejorado instruya explícitamente al modelo para que produzca una salida con el formato correcto. Esto es particularmente valioso para salidas estructuradas, donde el cumplimiento del formato es crítico.

  `runs`
  : _opcional_<br/>
  Controla cuántas veces se evalúa cada registro del conjunto de datos. Establecer `runs` > 1 ayuda a reducir la varianza en las métricas para tareas con salidas no deterministas, proporcionando señales de optimización más estables a costa de un mayor tiempo de ejecución.

`max_iterations`
: Controla el número máximo de ciclos de optimización. Cada iteración prueba un nuevo prompt en el conjunto de datos completo.<br/>
  **Predeterminado**: 5<br/>
  **Recomendado**: 10-20 para exploración inicial, 5-10 para producción

`stopping_condition`
: Función opcional que determina cuándo terminar la optimización antes de tiempo. Recibe evaluaciones de resumen y devuelve `True` para detener.

  ```python
  stopping_condition=lambda evals: (
      evals['my_evaluator']['value']['metric'] >= 0.95
  )
  ```

  Utilice condiciones `AND` para ayudar a garantizar que varias métricas cumplan los objetivos antes de detenerse.

`dataset_split`
: Controla la división del conjunto de datos para una evaluación imparcial. Acepta los siguientes valores:<br/>
  - `False` (predeterminado): Sin división. El conjunto de datos completo se utiliza para la optimización y la puntuación.<br/>
  - `True`: Dividir con proporciones predeterminadas. Utiliza 60/20/20 (entrenamiento/validación/prueba) sin `test_dataset`, u 80/20 (entrenamiento/validación) con `test_dataset`.<br/>
  - `(train, valid, test)` tupla: Proporciones de división de 3 vías personalizadas. Deben sumar 1.0. No se puede combinar con `test_dataset`.<br/>
  - `(train, valid)` tupla: Proporciones de división de 2 vías personalizadas. Deben sumar 1.0. Requiere `test_dataset` para el conjunto de prueba.

`test_dataset`
: Nombre de un conjunto de datos separado para usar en la prueba final. Cuando se proporciona, la Optimización de prompts extrae este conjunto de datos automáticamente, divide el conjunto de datos principal en entrenamiento/validación (80/20 de forma predeterminada) y ejecuta una prueba final en el mejor prompt utilizando este conjunto de datos. Proporcionar `test_dataset` habilita implícitamente la división del conjunto de datos.

#### Configurar trabajadores paralelos {#configure-parallel-workers}

Cuando ejecuta la optimización, puede configurar su número de trabajadores paralelos pasando el parámetro `jobs` a la función `run()`:

```python
result = prompt_optimization.run(jobs=20)
```

Valores más altos reducen el tiempo de ejecución total, pero pueden alcanzar los límites de tasa de la API.

`jobs`
: **Predeterminado**: 1</br>
**Recomendado**: 10-20, para la mayoría de los casos de uso

**Ejemplo** para un conjunto de datos de 100 registros con 10 iteraciones:
- `jobs=1` (serie): ~50 minutos (asumiendo 5s por llamada)
- `jobs=20` (paralelo): ~5 minutos

## División del conjunto de datos {#dataset-splitting}

Al optimizar un prompt, se utiliza el mismo conjunto de datos tanto para guiar las mejoras como para evaluar el resultado. Esto puede llevar a un sobreajuste, donde el prompt funciona bien con los datos de optimización pero mal con nuevas entradas. La división del conjunto de datos soluciona esto dividiendo sus datos en subconjuntos separados con funciones distintas:

| Subconjunto | Función | Descripción |
|--------|------|-------------|
| **Entrenamiento** | Optimización | Ejemplos mostrados al modelo de razonamiento para analizar fallas y sugerir mejoras. |
| **Validación** | Puntuación | Utilizado para puntuar cada iteración y seleccionar el mejor prompt. No visto por el optimizador. |
| **Prueba** | Evaluación final | Ejecutado una vez en el mejor prompt después de la optimización para proporcionar una estimación de rendimiento imparcial. |

### Proporciones predeterminadas {#default-ratios}

Las proporciones de división dependen de cómo configure `dataset_split` y `test_dataset`:

| Configuración | Entrenamiento | Validación | Prueba |
|---------------|-------|------------|------|
| `dataset_split=True` | 60% | 20% | 20% |
| `dataset_split=True` + `test_dataset` | 80% | 20% | Conjunto de datos separado |
| `(0.7, 0.15, 0.15)` | 70% | 15% | 15% |
| `(0.8, 0.2)` + `test_dataset` | 80% | 20% | Conjunto de datos separado |

Los registros se mezclan con una semilla fija para la reproducibilidad entre ejecuciones.

<div class="alert alert-info">Configuración <code>dataset_split=False</code> (el valor predeterminado) conserva el comportamiento anterior donde se utiliza el conjunto de datos completo para todas las fases de la optimización.</div>

## Comprensión de los resultados {#understanding-results}

El objeto `OptimizationResult` proporciona acceso integral a los resultados de la optimización:

### Propiedades {#properties}

- `best_prompt`: El prompt con la puntuación más alta descubierto
- `best_score`: Puntuación de la mejor iteración
- `best_experiment_url`: Enlace al experimento de Datadog para un análisis detallado
- `total_iterations`: Número de iteraciones completadas
- `best_iteration`: Qué iteración logró la mejor puntuación
- `test_score`: Puntuación del experimento de prueba final. Devuelve `None` cuando la división del conjunto de datos está deshabilitada.
- `test_experiment_url`: Enlace al experimento de prueba en Datadog. Devuelve `None` cuando la división del conjunto de datos está deshabilitada.
- `test_results`: Resultados completos del experimento de prueba. Devuelve `None` cuando la división del conjunto de datos está deshabilitada.

### Métodos {#methods}

- `get_history()`: Datos completos para todas las iteraciones (prompts, puntuaciones, resultados, URLs)
- `get_score_history()`: Lista de puntuaciones que muestra la progresión
- `get_prompt_history()`: Lista de prompts que muestra la evolución
- `summary()`: Resumen legible por humanos con tabla de progresión de puntuaciones. Cuando la división del conjunto de datos está habilitada, el resumen incluye la puntuación de prueba y las evaluaciones del conjunto de prueba.

Ejemplo de análisis de resultados:

```python
# View complete history
for iteration_data in result.get_history():
    print(f"Iteration {iteration_data['iteration']}")
    print(f"  Score: {iteration_data['score']}")
    print(f"  Metrics: {iteration_data['summary_evaluations']}")
    print(f"  URL: {iteration_data['experiment_url']}")

# Visualize improvement
import matplotlib.pyplot as plt
plt.plot(result.get_score_history())
plt.xlabel('Iteration')
plt.ylabel('Score')
plt.title('Prompt Optimization Progress')
plt.show()
```

Cuando la división del conjunto de datos está habilitada, acceda a los resultados de la prueba:

```python
# Check for overfitting by comparing validation and test scores
print(f"Best validation score: {result.best_score}")
print(f"Test score: {result.test_score}")
print(f"Test experiment: {result.test_experiment_url}")

# A large gap between best_score and test_score may indicate overfitting
```

También puede visualizar el prompt utilizado para cada iteración en la pestaña Configuración de la página de Experimento.

## Mejores prácticas {#best-practices}

Encontrará una colección de scripts de ejemplo en el repositorio "Experiment cookbook" [4].

### Diseño del conjunto de datos {#dataset-design}

- Incluya de 50 a 100 ejemplos diversos que cubran casos típicos y extremos
- Para tareas de clasificación, asegure una representación equilibrada entre las clases
- Valide que las etiquetas de verdad fundamental sean correctas y consistentes
- Versionar los conjuntos de datos para la reproducibilidad

### Métricas de evaluación {#evaluation-metrics}

- Elija métricas alineadas con los objetivos comerciales (compensaciones entre precisión y exhaustividad)
- Utilice múltiples métricas complementarias en lugar de una única puntuación agregada
- Pondere las métricas según el impacto comercial en su función `compute_score`
- Pruebe los evaluadores de forma independiente antes de ejecutar la optimización

### Etiquetado {#labelization}

- Cree de 2 a 5 etiquetas descriptivas distintas (por ejemplo: `CORRECT HIGH CONFIDENCE`, `INCORRECT EDGE CASE`)
- Asegure una distribución equilibrada de las etiquetas (por ejemplo, evite el 95% en una categoría)
- Utilice etiquetas para ayudar al optimizador a comprender los diferentes tipos de éxitos y fracasos

### División de conjuntos de datos {#dataset-splitting-1}

- Utilice al menos 50 registros en su conjunto de datos antes de habilitar la división para ayudar a garantizar que cada subconjunto tenga suficientes ejemplos
- Comience con las proporciones predeterminadas (`dataset_split=True`) antes de personalizar las divisiones
- Utilice `test_dataset` cuando tenga un conjunto de exclusión seleccionado que represente el tráfico de producción
- Compare `best_score` (validación) con `test_score` para detectar el sobreajuste: una brecha grande sugiere que el prompt está demasiado especializado para los datos de validación

### Selección del modelo de optimización {#optimization-model-selection}

Utilice modelos de razonamiento avanzado para `optimization_task`:
- **Recomendado:** OpenAI o3-mini, o1-preview o Claude 3.5 Sonnet
- Utilice salidas estructuradas (modelos Pydantic) para un parseo confiable

Evite utilizar modelos más económicos (GPT-3.5-turbo, Claude Haiku), ya que carecen de la profundidad de razonamiento necesaria para una optimización efectiva.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/llm_observability/improve/datasets?tab=csv
[4]: https://github.com/DataDog/llm-observability/tree/main/experiments/scripts