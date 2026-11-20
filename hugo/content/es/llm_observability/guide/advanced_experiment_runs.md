---
aliases:
- /es/llm_observability/improve/experiments/advanced_runs/
- /es/llm_observability/experiments/advanced_runs/
description: Ejecute experimentos offline varias veces para tener en cuenta la variabilidad
  del modelo en un subconjunto de su conjunto de datos y automatice la ejecución de
  experimentos en canalizaciones de CI/CD.
title: Ejecuciones de experimentos avanzados
---
Esta página analiza temas avanzados sobre la ejecución de experimentos offline, incluidas [ejecuciones múltiples de experimentos](#multiple-runs) y [la configuración de experimentos offline en CI/CD](#setting-up-your-experiment-in-cicd).

## Ejecute un experimento en un subconjunto de su conjunto de datos {#run-an-experiment-on-a-subset-of-your-dataset}

Primero, agregue etiquetas a los registros de su conjunto de datos. Estas etiquetas pueden ser identificadores únicos (por ejemplo, `name:test_use_case_1`) o representar propiedades del escenario (por ejemplo, `difficulty:hard`).

Luego, utilice el argumento `tags` de `LLMObs.pull_dataset()` para filtrar el conjunto de datos y seleccionar los registros relevantes antes de ejecutar el experimento.

Ejemplo

```
prod_dataset = LLMObs.pull_dataset(dataset_name="my-dataset", tags=["env:prod", "version:1.0"])

experiment = LLMObs.experiment(
    name="example-experiment",
    dataset=prod_dataset,
    task=topic_relevance,
    evaluators=[exact_match, false_confidence]
)
experiment.run()
```

## Ejecuciones múltiples {#multiple-runs}

Puede ejecutar el mismo experimento varias veces para tener en cuenta el no determinismo del modelo. Puede utilizar el [SDK de Python para Agent Observability][1] o la [API de Offline Experiments][2] para especificar cuántas iteraciones ejecutar; posteriormente, cada registro del conjunto de datos se ejecuta esa cantidad de veces utilizando las mismas tareas y evaluadores.

### Ejecuciones múltiples con el SDK de Python {#multiple-runs-with-the-python-sdk}
<div class="alert alert-info">Requiere el SDK de Python para Agent Observability v4.1+.</div>

Defina un parámetro `runs` opcional en su método de experimento, como se muestra en el siguiente ejemplo:

{{< highlight py "hl_lines=7" >}}
experiment = LLMObs.experiment(
    name="example-experiment",
    dataset=dataset,
    task=topic_relevance,
    evaluators=[exact_match, false_confidence],
    config={"model": "gpt-4o-mini", "temperature": 0.3, "personality": "helpful"},
    runs=5
)

{{< /highlight >}}

Si no define `runs`, su experimento se ejecutará de forma predeterminada 1 iteración.

### Ejecuciones múltiples con la API de Offline Experiments {#multiple-runs-with-the-offline-experiments-api}

Incluya un campo `run_count` en el cuerpo de su solicitud, como se muestra en el siguiente ejemplo:
{{< highlight json "hl_lines=9" >}}
{
  "data": {
    "type": "experiments",
    "attributes": {
        "project_id": "<project_id>",
        "dataset_id": "<dataset_id>",
        "name": "example-experiment",
        "description": "",
        "run_count": 5,
        "metadata": {
            "team": ""
        },
        "config": {"model": "gpt-4o-mini", "temperature": 0.3, "personality": "helpful"}
    }
  }
}

{{< /highlight >}}

Si no define `run_count`, su experimento se ejecutará de forma predeterminada 1 iteración.

### Análisis de resultados de experimentos de ejecuciones múltiples en Datadog {#analyzing-multiple-run-experiment-results-in-datadog}

Navegue a [Offline Experiments][3] en Datadog y seleccione un experimento con ejecuciones múltiples.

En el nivel {{< ui >}}Summary{{< /ui >}}, las evaluaciones y métricas se calculan como:
- Para evaluaciones basadas en puntuación, el promedio de los promedios de los registros
- Para evaluaciones categóricas, la moda de las modas de los registros

En el nivel {{< ui >}}Record{{< /ui >}}, las evaluaciones y métricas se calculan como:
- Para evaluaciones basadas en puntuación, el promedio de las ejecuciones para la entrada
- Para evaluaciones categóricas, la moda entre ejecuciones en la entrada

#### Búsqueda y filtrado {#searching-and-filtering}

Para filtrar por evaluaciones o métricas para múltiples ejecuciones, use `@multi_run_avg` para evaluaciones basadas en puntuación, o `@multi_run_mode` para evaluaciones categóricas.

Por ejemplo:

```
@multi_run_avg.@evaluations.custom.random_evaluator:>0.5  @multi_run_mode.@evaluations.custom.sentient_evaluator:positive
```

{{< img src="llm_observability/evaluations/multi-run-query.png" alt="Visualización de los registros de experimentos que muestra una consulta de búsqueda con filtros de múltiples ejecuciones. La barra de búsqueda muestra la consulta @multi_run_avg.@evaluations.custom.random_evaluator:>=0.5 @multi_run_mode.@evaluations.custom.sentiment_evaluator:positive. La barra lateral izquierda muestra filtros de Duration, Status y Custom Evaluations, con casillas de verificación y controles deslizantes de rango. La tabla principal muestra 8 de 127 registros filtrados con columnas para prompts de entrada, salida esperada y resultados de evaluación, incluidos exact_match, false_confidence, puntuaciones de random_evaluator, valores de sentiment_evaluator, duración y costo estimado." style="width:100%;" >}}

Las consultas que mezclan columnas `@multi_run_avg.` y columnas `@trace.` simples **no son compatibles**.

Por ejemplo:
- Compatible: `@multi_run_avg.@trace.total_tokens:>1000` (Todos los registros donde el promedio de conteo de tokens es superior a 1000 tokens)
- Compatible: `run_iteration:1 @trace.total_tokens:>1000` (Todos los registros en la primera ejecución donde el total de tokens en la primera ejecución fue superior a 1000)
- No compatible: `@multi_run_avg.@trace.total_tokens:>1000 @trace.estimated_total_cost:>0.01` (Todos los registros donde el promedio de tokens en todas las ejecuciones fue superior a 1000, y el costo de la primera ejecución fue superior a 1 centavo)

#### Comparación de ejecuciones de experimentos {#comparing-experiment-runs}

De manera similar a como puede comparar experimentos offline de una sola ejecución, puede comparar experimentos offline de múltiples ejecuciones seleccionando ejecuciones particulares. Por ejemplo, puede comparar Run 1 de Experiment A con Run 4 de Experiment B para analizar la variabilidad entre ejecuciones.

{{< img src="llm_observability/evaluations/multi-run-compare.png" alt="La interfaz de comparación de experimentos muestra dos experimentos offline de múltiples ejecuciones en comparación. La sección superior muestra una tabla de comparación con métricas agregadas para cada experimento, incluyendo los promedios de answer_correctness, random_evaluator, sentiment_evaluator, exact_match, false_confidence y duration. Debajo, una vista de comparación detallada muestra un menú desplegable abierto con Run 4 seleccionado de una lista que va de Run 1 a Run 7, lo que permite comparar ejecuciones específicas de cada experimento. La sección de registros del conjunto de datos muestra columnas de entrada, salida esperada y salida generada con métricas de evaluación para las ejecuciones seleccionadas lado a lado." style="width:100%;" >}}

## Configuración de su experimento en CI/CD {#setting-up-your-experiment-in-cicd}
Puede ejecutar un experimento manualmente o configurarlo para que se ejecute automáticamente en sus canalizaciones de CI/CD. Por ejemplo, ejecútelo con su conjunto de datos cada vez que haya un cambio para comparar los resultados con su línea base y detectar posibles regresiones.

### GitHub Actions {#github-actions}
Puede utilizar el siguiente script de Python y el flujo de trabajo de GitHub Actions como plantillas para ejecutar un experimento automáticamente cada vez que se envíe código a su repositorio.

**Nota**: Los archivos de flujo de trabajo residen en el directorio `.github/workflows` y deben utilizar sintaxis YAML con la extensión `.yml`.

```python
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import EvaluatorResult
from typing import Dict, Any, Optional, List

LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)


dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",  # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "input_data": {
                "question": "What is the capital of China?"
            },  # required, JSON or string
            "expected_output": "Beijing",  # optional, JSON or string
            "metadata": {"difficulty": "easy"},  # optional, JSON
        },
        {
            "input_data": {
                "question": "Which city serves as the capital of South Africa?"
            },
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"},
        },
    ],
)

def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
    question = input_data["question"]
    difficulty = metadata.get("difficulty", "unknown") if metadata else "unknown"
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"


def exact_match(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> bool:
    return output_data == expected_output


def overlap(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> float:
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


def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
    return evaluators_results["exact_match"].count(True)


experiment = LLMObs.experiment(
    name="capital-cities-test",
    task=task,
    dataset=dataset,
    evaluators=[exact_match, overlap, fake_llm_as_a_judge],
    summary_evaluators=[num_exact_matches],  # optional
    description="Testing capital cities knowledge",
    config={"model_name": "gpt-4", "version": "1.0"},
)

results = experiment.run(jobs=4, raise_errors=True)

print(f"View experiment: {experiment.url}")
```

```yaml
name: Experiment SDK Test

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    environment: protected-main-env # The job uses secrets defined in this environment
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.13.0' # Or your desired Python version
      - name: Install Dependencies
        run: pip install ddtrace>=4.1.0 dotenv
      - name: Run Script
        run: python ./experiment_sdk_demo/main.py
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
```

### Consulta y comparación de ejecuciones de CI/CD a través de la API {#querying-and-comparing-cicd-runs-via-the-api}
Al crear experimentos offline para una canalización de CI/CD, utilice el campo `name` para incluir un nombre de canalización lógica compartido y un sufijo por ejecución (por ejemplo, `my-pipeline-<run-id>`), y utilice el campo `metadata` para el commit, la rama u otro contexto de canalización (por ejemplo, `"metadata": {"commit": "abc123", "branch": "feat/foo"}`).

Para recuperar y comparar ejecuciones a través de la API, llame a `GET /api/v2/llm-obs/v1/experiments` con estos filtros:
- `filter[experiment]=<pipeline-name>` devuelve todas las ejecuciones que comparten el mismo nombre de canalización lógica.
- `filter[metadata]={"branch":"main"}` devuelve las ejecuciones cuyos metadatos contienen esos pares clave-valor.
- Combine ambos filtros para limitar las comparaciones, por ejemplo: `?filter[experiment]=my-pipeline&filter[metadata]={"commit":"abc123"}`.
- `filter[parent_experiment_id]=<uuid>` devuelve todos los experimentos offline que se ejecutaron con un experimento de referencia determinado. Se puede repetir para varios ID de referencia.

Cada experimento coincidente incluye `aggregate_data` con distribuciones precalculadas de puntuaciones de evaluación, costos de tokens y tasas de error, para que pueda comparar ejecuciones sin consultar spans individuales.

`filter[experiment]` coincide con el nombre de la canalización lógica compartida almacenado en la columna `experiment` (por ejemplo, `my-pipeline`). Esto es distinto del campo único `name` por ejecución (por ejemplo, `my-pipeline-<run-id>`).

```http
# Create experiment tagged with pipeline context
POST /api/v2/llm-obs/v1/experiments
{
  "data": {
    "type": "experiments",
    "attributes": {
      "project_id": "<project_id>",
      "dataset_id": "<dataset_id>",
      "name": "my-pipeline-<run-id>",
      "metadata": {"commit": "abc123", "branch": "feat/foo"}
    }
  }
}

# Compare all runs of the same pipeline on main branch
GET /api/v2/llm-obs/v1/experiments?filter[experiment]=my-pipeline&filter[metadata]={"branch":"main"}

# Retrieve a specific commit's run
GET /api/v2/llm-obs/v1/experiments?filter[experiment]=my-pipeline&filter[metadata]={"commit":"abc123"}
```

[1]: /es/llm_observability/instrument/sdk?tab=python
[2]: /es/llm_observability/guide/offline_experiments_api
[3]: https://app.datadoghq.com/llm/experiments