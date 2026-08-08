---
aliases:
- /es/llm_observability/experiments_preview
description: Utilización de la función Experimentos de LLM Observability
further_reading:
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: Blog
  text: Crea y monitoriza experimentos LLM con Datadog
private: true
title: Experimentos
---

{{< img src="llm_observability/experiments/filtered_experiments.png" alt="LLM Observability, vista de Experimentos. Encabezado: 'Comparación de 12 experimentos en 9 campos'. Visualización de gráfico de líneas en la que se grafica la precisión, corrección, duración, costo estimado y otras métricas de distintos experimentos." style="width:100%;" >}}

LLM Observability [Experimentos][9] es compatible con todo el ciclo de vida de la creación de aplicaciones y agentes LLM. Te ayuda a comprender cómo afectan al rendimiento los cambios en los avisos, los modelos, los proveedores o la arquitectura del sistema. Con esta función, puedes:

- Crear conjuntos de datos y versiones
- Ejecución y gestión de experimentos
- Comparar los resultados para evaluar el impacto

## Instalación

1. Instala el kit de desarrollo de software (SDK) de Python de LLM Observability de Datadog:

   ```shell
   pip install ddtrace>=3.15.0
   ```

2. Activar LLM Observability:

   ```python
   from ddtrace.llmobs import LLMObs

   LLMObs.enable(
       api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
       app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
       site="datadoghq.com",      # defaults to DD_SITE environment variable
       project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
   )
   ```

   <div class="alert alert-warning">Debes proporcionar tanto una <code>clave_api</code> como una <code>clave_aplicación</code>.</div>

## Proyectos
Los _proyectos_ son el núcleo organizativo de LLM Experiments. Todos los conjuntos de datos y experimentos están en un project (proyecto).
Puedes crear un project (proyecto) manualmente en la consola, la API o el kit de desarrollo de software (SDK) de Datadog especificando un nombre de project (proyecto) que no exista ya en `LLMObs.enable`.

```python
LLMObs.enable(
    ...
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```

## Conjuntos de datos

Un _conjunto de datos_ es una colección de _entradas_ y _resultados esperados_ y _metadatos_ que representan escenarios en los que deseas probar tu agente. Cada conjunto de datos está asociado a un _project_ (proyecto).  

- **entrada** (obligatorio): Representa toda la información a la que el agente puede acceder en una [tarea](#task).
- **salida esperada** (opcional): También llamada _verdad de base_, representa la respuesta ideal que el agente debería emitir. Puedes utilizar la _salida esperada_ para almacenar la salida real de la aplicación, así como cualquier resultado intermedio que desees evaluar. 
- **metadatos** (opcional): Contiene cualquier información útil para categorizar el registro y utilizarlo para análisis posteriores. Por ejemplo: temas, tags (etiquetas), descripciones, notas.

### Creación de un conjunto de datos

Puedes construir conjuntos de datos a partir de los datos de producción en la interfaz de usuario de Datadog seleccionando **Add to Dataset** (Añadir a conjunto de datos) en cualquier page (página) de span (tramo) o mediante programación utilizando el kit de desarrollo de software (SDK):

{{< tabs >}}

{{% tab "CSV" %}}

Para crear un conjunto de datos a partir de un archivo CSV, utiliza `LLMObs.create_dataset_from_csv()`:

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

**Notas**:
- Los archivos CSV deben tener una línea de encabezamiento
- El tamaño máximo de los campos es de 10 MB
- Todas las columnas no especificadas en `input_data_columns` o `expected_output_columns` se tratan automáticamente como metadatos.
- El conjunto de datos se transfiere automáticamente a Datadog tras su creación.

{{% /tab %}}

{{% tab "Manual" %}}

Para crear manualmente un conjunto de datos, utiliza `LLMObs.create_dataset()`:

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "input_data": {"question": "What is the capital of China?"},       # required, JSON or string
            "expected_output": "Beijing",                                      # optional, JSON or string
            "metadata": {"difficulty": "easy"}                                 # optional, JSON
        },
        {
            "input_data": {"question": "Which city serves as the capital of South Africa?"},
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"}
        }
    ]
)

# View dataset in Datadog UI
print(f"View dataset: {dataset.url}")
```
{{% /tab %}}
{{< /tabs >}}

### Recuperar un conjunto de datos

Para recuperar un conjunto de datos existente de un project (proyecto) en Datadog:

```python
dataset = LLMObs.pull_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project" # optional, defaults to the project name from LLMObs.enable
)

# Get dataset length
print(len(dataset))
```

#### Exportar un conjunto de datos a pandas

La clase Conjunto de datos también proporciona el método `as_dataframe()`, que permite transformar un conjunto de datos como un [DataFrame de Pandas][11].

<div class="alert alert-info"><a href="https://pandas.pydata.org/docs/index.html">Pandas</a> es necesario para esta operación. Para instalar Pandas, <code>pip instala Pandas</code>.</div>

```python
# Convert dataset to pandas DataFrame
df = dataset.as_dataframe()
print(df.head())

# DataFrame output with MultiIndex columns:
#                                   input_data     expected_output  metadata
#    question                       category       answer           difficulty
# 0  What is the capital of Japan?  geography      Tokyo            medium
# 1  What is the capital of Brazil? geography      Brasília         medium
```

El DataFrame tiene una estructura de MultiIndex con las siguientes columnas:
- `input_data`: Contiene todos los campos de entrada de `input_data_columns`
- `expected_output`: Contiene todos los campos de salida de `expected_output_columns`
- `metadata`: Contiene los campos adicionales de `metadata_columns`


### Versiones de conjuntos de datos

Los conjuntos de datos se versionan automáticamente para rastrear los cambios a lo largo del tiempo. La información sobre las versiones facilita la reproducibilidad y permite que los experimentos hagan referencia a versiones específicas de los conjuntos de datos. 

El objeto `Dataset` tiene un campo, `current_version`, que corresponde a la última versión; las versiones anteriores están sujetas a un plazo de retención de 90 días. 

Las versiones de los conjuntos de datos comienzan en `0` y cada nueva versión se incrementa en 1.

#### Cuando se crean nuevas versiones de los conjuntos de datos

Se crea una nueva versión del conjunto de datos cuando:
- Se añaden registros
- Se actualizan registros (cambios en los campos `input` o `expected_output` )
- Se eliminan registros

Las versiones de los conjuntos de datos **NO** se crean para los cambios en los campos de `metadata` o cuando se actualiza el nombre o la descripción del conjunto de datos.

#### Retención de versiones

- Las versiones anteriores (**NO** el contenido de `current_version`) se retienen durante 90 días. 
- El periodo de retención de 90 días se reinicia cuando se utiliza una versión anterior, por ejemplo, cuando un experimento lee una versión.
- Después de 90 días consecutivos sin uso, una versión anterior es susceptible de eliminación permanente y ya no puede ser accesible.

**Ejemplo de comportamiento de retención de versión**

Después de publicar `12`, `11` se convierte en una versión anterior con una ventana de 90 días. Transcurridos 25 días, ejecutas un experimento con la versión `11`, lo que provoca que la ventana de 90 días **se reinicie**. Después de otros 90 días, durante los cuales no has utilizado la versión `11`, se puede eliminar la versión `11`.

### Acceso y gestión de registros de conjuntos de datos

Puedes acceder a los registros del conjunto de datos utilizando la indexación estándar de Python:

```python
# Get a single record
record = dataset[0]

# Get multiple records
records = dataset[1:3]

# Iterate through records
for record in dataset:
    print(record["input_data"])
```

La clase Conjunto de datos proporciona métodos para gestionar los registros: `append()` `update()` , `delete()`. Es necesario `push()` cambios para guardar los cambios en Datadog.

```python
# Add a new record
dataset.append({
    "input_data": {"question": "What is the capital of Switzerland?"},
    "expected_output": "Bern",
    "metadata": {"difficulty": "easy"}
})

# Update an existing record
dataset.update(0, {
    "input_data": {"question": "What is the capital of China?"},
    "expected_output": "Beijing",
    "metadata": {"difficulty": "medium"}
})

# Delete a record
dataset.delete(1)  # Deletes the second record

# Save changes to Datadog
dataset.push()
```

## Experimentos
Los experimentos te permiten test sistemáticamente tu aplicación de LLM ejecutando tu agente a través de un conjunto de escenarios de tu conjunto de datos y midiendo el rendimiento con respecto a los resultados esperados utilizando evaluadores. Así podrás comparar el rendimiento de distintas configuraciones de la aplicación.

### Tarea
La tarea define el workflow (UI) / proceso (generic) central que deseas evaluar. Puede variar desde una única llamada de LLM hasta un flujo más complejo que incluya varias llamadas de LLM y pasos de RAG. La tarea se ejecuta secuencialmente en todos los registros del conjunto de datos.

### Evaluadores
Los evaluadores son funciones que se ejecutan en cada registro y que miden el rendimiento del modelo o agente. Permiten comparar la salida con la salida_esperada o con la entrada original.  

Datadog admite los siguientes tipos de evaluadores:  
- **Booleano**: devuelve true o false
- **puntuación**: devuelve un valor numérico (float)
- **categorico**: devuelve una categoría etiquetada (cadena)

### Evaluadores de resumen
Los evaluadores de resumen son funciones opcionales que se ejecutan con todos los datos del experimento (entrada, salida, resultados esperados, resultados de los evaluadores). Los evaluadores de resumen permiten calcular métricas más avanzadas, como la precisión, la recuperación y la exactitud en todo el conjunto de datos. 

Datadog admite los siguientes tipos de evaluadores de resumen:
- **Booleano**: devuelve true o false
- **puntuación**: devuelve un valor numérico (float)
- **categórico**: devuelve una categoría etiquetada (cadena)

### Crear un experimento

1. Cargar un conjunto de datos
   ```python
   from ddtrace.llmobs import LLMObs
   from typing import Dict, Any, Optional, List

   dataset = LLMObs.pull_dataset("capitals-of-the-world")
   ```

2. Definir una función de tarea que procese un único registro del conjunto de datos

   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]
       # Your LLM or processing logic here
       return "Beijing" if "China" in question else "Unknown"
   ```
   Una tarea puede tomar cualquier tipo no nulo como `input_data` (cadena, número, booleano, objeto, matriz). La salida que se utilizará en los evaluadores puede ser de cualquier tipo.
   Este ejemplo genera una cadena, pero se puede generar un diccionario como salida para almacenar cualquier información intermedia y comparar en los evaluadores.

   Puedes rastrear las diferentes partes de tu tarea de experimento (workflow (UI) / proceso (generic), llamadas a herramientas, etc.) utilizando los [mismos decoradores de rastreo][12] que utilizas en producción.
   Si utilizas un [marco admitido][13] (OpenAI, Amazon Bedrock, etc.), LLM Observability rastrea y anota automáticamente las llamadas a marcos y bibliotecas de LLM y te proporciona una observabilidad predefinida de las llamadas que realiza tu aplicación de LLM.


4. Define funciones de evaluadores.

   ```python
   def exact_match(input_data: Dict[str, Any], output_data: str, expected_output: str) -> bool:
       return output_data == expected_output

   def overlap(input_data: Dict[str, Any], output_data: str, expected_output: str) -> float:
       expected_output_set = set(expected_output)
       output_set = set(output_data)

       intersection = len(output_set.intersection(expected_output_set))
       union = len(output_set.union(expected_output_set))

       return intersection / union

   def fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> str:
       fake_llm_call = "excellent"
       return fake_llm_call
   ```
   Las funciones de evaluadores pueden tomar cualquier tipo no nulo como `input_data` (cadena, número, booleano, objeto, matriz); `output_data` y `expected_output` pueden ser de cualquier tipo.
   Los evaluadores solo pueden devolver una cadena, un número o un booleano.

5. (Opcional) Define la(s) función(es) de evaluador(es) de resumen.

   ```python
    def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
        return evaluators_results["exact_match"].count(True)

   ```
   Si se definen y se proporcionan al experimento, las funciones del evaluador de resumen se ejecutan después de que los evaluadores hayan terminado de ejecutarse. Las funciones de evaluadores de resumen pueden tomar una lista de cualquier tipo no nulo como `inputs` (cadena, número, booleano, objeto, matriz); `outputs` y `expected_outputs` pueden ser listas de cualquier tipo. `evaluators_results` es un diccionario de listas de resultados de evaluadores, con la clave del nombre de la función de evaluador. Por ejemplo, en el fragmento de código anterior, el evaluador de resumen `num_exact_matches` utiliza los resultados (una lista de booleanos) del evaluador `exact_match` para proporcionar un count del número de coincidencias exactas.
   Los evaluadores de resumen solo pueden devolver una cadena, un número o un booleano.

6. Crea y ejecuta el experimento.
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

   Para aumentar la velocidad de ejecución del experimento, puedes activar el procesamiento paralelo:
   ```
   results = experiment.run(jobs=4)
   ```

   Para test tu pipeline en un subconjunto de los datos, utiliza:
   ```
   results = experiment.run(sample_size=10)
   ```

   Para detener la ejecución del experimento si se produce un error, utiliza:
   ```
   results = experiment.run(raise_errors=True)
   ```

7. Visualiza los resultados de tu experimento en Datadog.
   ```
   print(f"View experiment: {experiment.url}")
   ```

### Instalación de un experimento automatizado en Continuous Integration Continuous Delivery
Puedes ejecutar un `experiment` manualmente o configurarlo para que se ejecute automáticamente en tus pipelines de Continuous Integration Continuous Delivery. Por ejemplo, ejecútalo con tu conjunto de datos en cada cambio para comparar los resultados con tu línea de base y detectar posibles regresiones.

#### GitHub Actions
Esta sección asume que has completado con éxito las secciones [instalación][14], [proyectos][15], [conjuntos de datos][16] y [experimentos][17]. Puedes utilizar el siguiente script de Python y el workflow (UI) / proceso (generic) de GitHub Actions como plantillas para ejecutar un experimento automáticamente cada vez que el código se envíe a tu repositorio.

**Nota**: Los archivos de workflow (UI) / proceso (generic) están en el directorio `.github/workflows` y deben utilizar la sintaxis YAML con la extensión `.yml`.

```python
from ddtrace.llmobs import LLMObs
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

def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
    question = input_data["question"]
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


def fake_llm_as_a_judge(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> str:
    fake_llm_call = "excellent"
    return fake_llm_call


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
        run: pip install ddtrace>=3.15.0 dotenv
      - name: Run Script
        run: python ./experiment_sdk_demo/main.py
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
```

## Cookbooks

Para ver ejemplos detallados de lo que puedes hacer con LLM Experiments, consulta las [notebooks de Jupyter][10] provistas por Datadog.

## API HTTP

### Inicio rápido de Postman

Datadog recomienda encarecidamente importar la [recopilación Experimentos Postman][7] a [Postman][8]. La función _Ver documentación_ de Postman puede ayudarte a entender mejor esta API.

### Formato de solicitud

| Campo | Tipo | Descripción |
| --------- | ---- | ----------- |
| `data`    | [Objeto: Datos](#object-data) | El cuerpo de la solicitud está anidado dentro de un campo de nivel superior `data`.|

**Ejemplo**: Creación de un conjunto de datos

```json
{
  "data": {
    "type": "datasets", # tipo de solicitud
    "atributos": {
        "name": "ejemplo de conjunto de datos",
        "description": "Ejemplo de descripción"
    }
  }
}
```

### Formato de respuesta

| Campo | Tipo | Descripción |
| --------- | ---- | ----------- |
| `data`    | [Objeto: Datos](#object-data) | El cuerpo de la solicitud de una API de experimentación está anidado dentro de un campo de nivel superior `data`.|
| `meta`    | [Objeto: Page (página)](#object-page) | Atributos de paginación. |

**Ejemplo**: Recuperación de conjuntos de datos

```json
{
    "data": [
        {
            "id": "4ac5b6b2-dcdb-40a9-ab29-f98463f73b4z",
            "type": "datasets",
            "attributes": {
                "created_at": "2025-02-19T18:53:03.157337Z",
                "description": "Description example",
                "name": "Dataset example",
                "updated_at": "2025-02-19T18:53:03.157337Z"
            }
        }
    ],
    "meta": {
        "after": ""
    }
}
```

#### Objeto Datos

| Campo | Tipo | Descripción |
| --------- | ---- | ----------- |
| `id`    | cadena | El ID de una entidad de experimentación. <br/>**Nota**: Configura tu referencia de campo ID en este nivel. |
| `type`    | cadena | Identifica el tipo de recurso que representa un objeto. Por ejemplo: `experiments`, `datasets`, etc. |
| `attributes` | json | Contiene todos los datos del recurso excepto el ID. |

#### Objeto: Page (página)

| Campo | Tipo | Descripción |
| ----- | ---- | ----------- |
| `after` | cadena | El cursor a utilizar para obtener los siguientes resultados, si los hay. Proporciona el parámetro de consulta `Page ( página)[cursor]` en tu solicitud para obtener los siguientes resultados. |


### API de projects (proyectos)

**Tipo de solicitud**: `projects`

{{% collapse-content title="GET /api/v2/llm-obs/v1/projects" level="h4" expanded=false id="api-projects-get" %}}

Haz una lista de todos los proyectos, ordenados por fecha de creación. Los proyectos creados más recientemente aparecen en primer lugar.

**Parámetros de consulta**

| Parámetro | Tipo | Descripción |
| ---- | ---- | --- |
| `filter[id]` | cadena | El ID de un project (proyecto) a buscar. |
| `filter[name]` | cadena | El nombre de un project (proyecto) a buscar. |
| `Page ( página)[cursor]` | cadena | Enumera los resultados con un cursor proporcionado en la consulta anterior. |
| `Page ( página)[limit]` | Int | Limita el número de resultados. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| dentro de [Datos](#object-data)_ | [][Project](#object-project) | Lista de projects (proyectos). |

#### Objeto: project (proyecto)

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único de project (proyecto). Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `name` | cadena | Nombre único del project (proyecto). |
| `description` | cadena | Descripción del project (proyecto). |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/projects" level="h4" expanded=false id="api-projects-post" %}}

Crear un project (proyecto). Si ya existe un project (proyecto) con el mismo nombre, la API devuelve el project (proyecto) existente sin modificar.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `name` (_obligatorio_) | cadena | Nombre único del project (proyecto). |
| `description` | cadena | Descripción del project (proyecto). |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único de project (proyecto). Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `name` | cadena | Nombre único del project (proyecto). |
| `description` | cadena | Descripción del project (proyecto). |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/v2/llm-obs/v1/projects/{project_id}" level="h4" expanded=false id="api-projects-patch" %}}

Actualiza parcialmente un objeto project (proyecto). Especifica los campos a actualizar en la carga útil.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `name` | cadena | Nombre único del project (proyecto). |
| `description` | cadena | Descripción del project (proyecto). |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único de project (proyecto). Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `name` | cadena | Nombre único del project (proyecto). |
| `description` | cadena | Descripción del project (proyecto). |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/projects/delete" level="h4" expanded=false id="api-projects-delete" %}}

Eliminar uno o varios proyectos.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `project_ids` (_obligatorio_) | []UUID | Lista de ID de projects (proyectos) a eliminar. |

**Respuesta**

Cuerpo vacío en el éxito.

{{% /collapse-content %}}

### API de conjuntos de datos

**Tipo de solicitud**: `datasets`

{{% collapse-content title="GET /api/v2/llm-obs/v1/{project_id}/datasets" level="h4" expanded=false id="api-datasets-get" %}}

Haz una lista de todos los conjuntos de datos, ordenados por fecha de creación. Los conjuntos de datos creados más recientemente aparecen en primer lugar.

**Parámetros de consulta**

| Parámetro | Tipo | Descripción |
| ---- | ---- | --- |
| `filter[name]` | cadena | El nombre del conjunto de datos que se va a buscar. |
| `filter[id]` | cadena | El ID de un conjunto de datos a buscar. |
| `Page ( página)[cursor]` | cadena | Enumera los resultados con un cursor proporcionado en la consulta anterior. |
| `Page ( página)[limit]` | Int | Limita el número de resultados. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| dentro de [Datos](#object-data)_ | [][Conjunto de datos](#object-dataset) | Lista de conjuntos de datos. |

#### Objeto: Conjunto de datos

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | cadena | ID único del conjunto de datos. Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `name` | cadena | Nombre único del conjunto de datos. |
| `description` | cadena | Descripción del conjunto de datos. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al conjunto de datos. |
| `current_version` | Int | El número de versión actual del conjunto de datos. Las versiones empiezan en 0 y aumentan cuando se añaden o modifican registros. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/{project_id}/datasets" level="h4" expanded=false id="api-datasets-post" %}}

Crear un conjunto de datos. Si ya existe un conjunto de datos con el mismo nombre, la API devuelve el conjunto de datos existente sin modificar.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `name` (_obligatorio_) | cadena | Nombre único del conjunto de datos. |
| `description` | cadena | Descripción del conjunto de datos. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al conjunto de datos. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único para el conjunto de datos. Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `name` | cadena | Nombre único del conjunto de datos. |
| `description` | cadena | Descripción del conjunto de datos. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al conjunto de datos. |
| `current_version` | Int | El número de versión actual del conjunto de datos. Empieza en 0 para los conjuntos de datos nuevos. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="GET /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-list-records" %}}

Enumera todos los registros del conjunto de datos, ordenados por fecha de creación. Los registros creados más recientemente aparecen en primer lugar.

**Parámetros de consulta**

| Parámetro | Tipo | Descripción |
| ---- | ---- | --- |
| `filter[version]` | Int | Haz una lista de los resultados de una versión determinada del conjunto de datos. Si no se especifica, se utiliza por defecto la versión actual del conjunto de datos. Los números de versión empiezan por 0. |
| `Page ( página)[cursor]` | cadena | Enumera los resultados con un cursor proporcionado en la consulta anterior. |
| `Page ( página)[limit]` | Int | Limita el número de resultados. |

**Notas**:
- Sin `filter[version]`, se obtienen registros **solo de la versión actual**, no de todas las versiones.
- Para recuperar registros de una versión histórica específica, utiliza `filter[version]=N` donde N es el número de versión.
- Los números de versión comienzan en 0 cuando se crea un conjunto de datos.

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| dentro de [Datos](#object-data)_ | [][Registro](#object-record) | Lista de registros del conjunto de datos. |

#### Objeto: Registro

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | cadena | ID de registro único. |
| `dataset_id` | cadena | ID único del conjunto de datos. |
| `input` | cualquiera (cadena, número, booleano, objeto, matriz) | Datos que sirven de punto de partida para un experimento. |
| `expected_output` | cualquiera (cadena, número, booleano, objeto, matriz) | Resultado esperado. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al registro. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-append-records" %}}

Añade registros a un conjunto de datos determinado.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| `deduplicate` | bool | Si `true`, deduplica los registros añadidos. En forma predeterminada es `true`. |
| `records` (_obligatorio_) | [][RecordReq](#object-recordreq) | Lista de registros a crear. |

#### Objeto: RecordReq

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `input` (_obligatorio_) | cualquiera (cadena, número, booleano, objeto, matriz) | Datos que sirven de punto de partida para un experimento. |
| `expected_output` | cualquiera (cadena, número, booleano, objeto, matriz) | Resultado esperado. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al registro. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| `records` | [][Registro](#object-record) | Lista de registros creados. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}" level="h4" expanded=false id="api-datasets-patch" %}}

Actualiza parcialmente un objeto de conjunto de datos. Especifica los campos que deseas actualizar en la carga útil.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `name` | cadena | Nombre único del conjunto de datos. |
| `description` | cadena | Descripción del conjunto de datos. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al conjunto de datos. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único para el conjunto de datos. Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `name` | cadena | Nombre único del conjunto de datos. |
| `description` | cadena | Descripción del conjunto de datos. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al conjunto de datos. |
| `current_version` | Int | El número de versión actual del conjunto de datos. Las actualizaciones solo de metadatos no incrementan la versión. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-update-records" %}}

Actualiza parcialmente uno o varios objetos de registro del conjunto de datos. Especifica los campos que deseas actualizar en la carga útil.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `records` (_obligatorio_) | [][RecordUpdate](#object-recordupdate) | Haz una lista de los registros que deseas actualizar. |

#### Objeto: Actualización de registro

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` (_obligatorio_) | cadena | ID de registro único. |
| `input` | cualquiera (cadena, número, booleano, objeto, matriz) | Entrada actualizada. |
| `expected_output` | cualquiera (cadena, número, booleano, objeto, matriz) | Salida esperada actualizada. |
| `metadata` | json | Metadatos actualizados. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| `records` | [][Registro](#object-record) | Haz una lista de los registros actualizados. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/{project_id}/datasets/delete" level="h4" expanded=false id="api-datasets-delete" %}}

Elimina uno o varios conjuntos de datos.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `dataset_ids` (_obligatorio_) | []UUID | Lista de ID de conjuntos de datos a eliminar. |

**Respuesta**

Cuerpo vacío en el éxito.

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records/delete" level="h4" expanded=false id="api-datasets-delete-records" %}}

Elimina uno o varios registros del conjunto de datos.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `record_ids` (_obligatorio_) | []cadena | Haz una lista de ID de registros que deseas eliminar. |

**Respuesta**

Cuerpo vacío en el éxito.

{{% /collapse-content %}}

### API de Experimentos

**Tipo de solicitud: `experiments`

{{% collapse-content title="GET /api/v2/llm-obs/v1/experiments" level="h4" expanded=false id="api-experiments-get" %}}

Enumera todos los experimentos, ordenados por fecha de creación. Los experimentos creados más recientemente aparecen en primer lugar.

**Parámetros de consulta**

| Parámetro | Tipo | Descripción |
| ---- | ---- | --- |
| `filter[project_id]` (_obligatorio_ si no se facilita el conjunto de datos) | cadena | El ID de un project (proyecto) para el cual recuperar experimentos. |
| `filter[dataset_id]` | cadena | El ID de un conjunto de datos para el cual recuperar experimentos. |
| `filter[id]` | cadena | ID del experimento que se deseas buscar. Para consultar varios experimentos, utiliza `?filter[id]=<>&filter[id]=<>`. |
| `Page ( página)[cursor]` | cadena | Enumera los resultados con un cursor proporcionado en la consulta anterior. |
| `Page ( página)[limit]` | Int | Limita el número de resultados. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| dentro de [Datos](#object-data)_ | [][Experimento](#object-experiment) | Lista de experimentos. |

#### Objeto: Experimento

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único del experimento. Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `project_id` | cadena | ID único del project (proyecto). |
| `dataset_id` | cadena | ID único del conjunto de datos. |
| `name` | cadena | Nombre único del experimento. |
| `description` | cadena | Descripción del experimento. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al experimento. |
| `config` | json | Configuración utilizada al crear el experimento. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/experiments" level="h4" expanded=false id="api-experiments-post" %}}

Crear un experimento. Si ya existe un experimento con el mismo nombre, la API devuelve el experimento existente sin modificar.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `project_id` (_obligatorio_) | cadena | ID único del project (proyecto). |
| `dataset_id` (_obligatorio_) | cadena | ID único del conjunto de datos. |
| `dataset_version` | Int | Versión del conjunto de datos. |
| `name` (_obligatorio_) | cadena | Nombre único del experimento. |
| `description` | cadena | Descripción del experimento. |
| `ensure_unique` | bool | Si `true`, Datadog genera un nuevo experimento con un nombre único en el case (incidencia) de un conflicto. En forma predeterminada es `true`. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al experimento. |
| `config` | json | Configuración utilizada al crear el experimento. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único del experimento. Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `project_id` | cadena | ID único del project (proyecto). |
| `dataset_id` | cadena | ID único del conjunto de datos. |
| `name` | cadena | Nombre único del experimento. |
| `description` | cadena | Descripción del experimento. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al experimento. |
| `config` | json | Configuración utilizada al crear el experimento. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="PATCH /api/v2/llm-obs/v1/experiments/{experiment_id}" level="h4" expanded=false id="api-experiments-patch" %}}

Actualiza parcialmente un objeto de experimento. Especifica los campos que deseas actualizar en la carga útil.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `name` | cadena | Nombre único del experimento. |
| `description` | cadena | Descripción del experimento. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único del experimento. Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `project_id` | cadena | ID único del project (proyecto). |
| `dataset_id` | cadena | ID único del conjunto de datos. |
| `name` | cadena | Nombre único del experimento. |
| `description` | cadena | Descripción del experimento. |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados al experimento. |
| `config` | json | Configuración utilizada al crear el experimento. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/experiments/delete" level="h4" expanded=false id="api-experiments-delete" %}}

Elimina uno o varios experimentos.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `experiment_ids` (_obligatorio_) | []UUID | Lista de ID de experimentos a eliminar. |

**Respuesta**

Cuerpo vacío en el éxito.

{{% /collapse-content %}}

{{% collapse-content title="POST /api/v2/llm-obs/v1/experiments/{experiment_id}/events" level="h4" expanded=false id="api-experiments-events" %}}

Eventos de inserción (spans (tramos) y métricas) para un experimento.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `spans` | [][span (tramo)](#object-span) | Haz una lista de spans (tramos) que capturan la ejecución de la tarea del experimento. |
| `metrics` | [][Métrica](#objet-metric) | Haz una lista de métricas del evaluador asociadas a los spans (tramos). |

#### Objeto: span (tramo)

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `trace_id` | cadena | Trace ID (ID de traza). |
| `span_id` | cadena | ID de span (tramo). |
| `project_id` | cadena | ID de project (proyecto). |
| `dataset_id` | cadena | ID del conjunto de datos. |
| `name` | cadena | Nombre del span (tramo) (por ejemplo, nombre de la tarea). |
| `start_ns` | número | Horario de inicio del span (tramo) en nanosegundos. |
| `duration` | número | Duración del span (tramo) en nanosegundos. |
| `tags` | []cadena | Tags (etiquetas) para asociar al span (tramo) (por ejemplo, modelo). |
| `status` | cadena | Estado del span (tramo) (por ejemplo, `ok`). |
| `meta.input` | json | Carga útil de entrada asociada al span (tramo). |
| `meta.output` | json | Carga útil de salida asociada al span (tramo). |
| `meta.expected_output` | json | Resultados esperados para el span (tramo). |
| `meta.error` | objeto | Detalles del error: `message`, `stack`, `type`. |

#### Objeto: Métrica

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `span_id` | cadena | ID del span (tramo) ID asociado. |
| `metric_type` | cadena | Tipo de métrica. Uno de: `score`, `categorical`. |
| `timestamp_ms` | número | Marca de tiempo de UNIX en milisegundos. |
| `label` | cadena | Etiqueta de métrica (nombre del evaluador). |
| `score_value` | número | Valor de puntuación (cuando `metric_type` es `score`). |
| `categorical_value` | cadena | Valor categórico (cuando `metric_type` es `categorical`). |
| `metadata` | json | Metadatos arbitrarios clave-valor asociados a la métrica. |
| `error.message` | cadena | Mensaje de error opcional para la métrica. |

**Respuesta**

Cuerpo vacío en el éxito.

{{% /collapse-content %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /es/getting_started/site/
[7]: https://github.com/DataDog/llm-observability/tree/main/experiments
[8]: https://www.postman.com/
[9]: https://app.datadoghq.com/llm/testing/experiments
[10]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks
[11]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html
[12]: /es/llm_observability/instrumentation/custom_instrumentation?tab=decorators#trace-an-llm-application
[13]: /es/llm_observability/instrumentation/auto_instrumentation?tab=python
[14]: /es/llm_observability/experiments/?tab=manual#setup
[15]: /es/llm_observability/experiments/?tab=manual#projects
[16]: /es/llm_observability/experiments/?tab=manual#datasets
[17]: /es/llm_observability/experiments/?tab=manual#experiments