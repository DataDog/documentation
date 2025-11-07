---
description: Utilización de la función Experimentos de LLM Observability
further_reading:
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: Blog
  text: Crea y monitoriza experimentos LLM con Datadog
private: true
title: Experimentos
---

{{< callout >}}
Experimentos de LLM Observability está en Vista previa.
{{< /callout >}}

{{< img src="llm_observability/experiments/filtered_experiments.png" alt="LLM Observability, vista de Experimentos. Encabezado: 'Comparación de 12 experimentos en 9 campos'. Visualización de gráfico de líneas en la que se grafica la precisión, corrección, duración, costo estimado y otras métricas de distintos experimentos." style="width:100%;" >}}

LLM Observability [Experimentos][9] es compatible con todo el ciclo de vida de la creación de aplicaciones y agentes LLM. Te ayuda a comprender cómo afectan al rendimiento los cambios en los avisos, los modelos, los proveedores o la arquitectura del sistema. Con esta función, puedes:

- Crear conjuntos de datos y versiones
- Ejecución y gestión de experimentos
- Comparar los resultados para evaluar el impacto

## Instalación

Instala el kit de desarrollo de software (SDK) de Python de LLM Observability de Datadog:

```shell
pip install ddtrace>=3.11.0
```

### Cookbooks

Para ver ejemplos detallados de lo que puedes hacer con LLM Experiments, puedes consultar estos [cuadernos jupyter][10]

### Configuración

Activar LLM Observability:

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    ml_app="mi-app",
    api_key="<YOUR_API_KEY>", # por defecto la variable de entorno DD_API_KEY
    app_key="<YOUR_APP_KEY>", # por defecto la variable de entorno DD_APP_KEY
    site="datadoghq.com"  # por defecto la variable de entorno DD_SITE
)
```

## Conjuntos de datos

Un _dataset_ es una colección de _inputs_, y _expected outputs_ (opcional) y _metadata_ (opcional).
Puede construir conjuntos de datos a partir de datos de producción en la interfaz de usuario pulsando "Añadir a conjunto de datos" en cualquier span (tramo) Page ( página) , así como mediante programación utilizando kit de desarrollo de software (SDK). Puede utilizar kit de desarrollo de software (SDK) para enviar y recuperar conjuntos de datos de Datadog.

### Creación de un conjunto de datos

Puede crear un nuevo conjunto de datos utilizando `LLMObs.create_dataset()`:

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    name="capitales-del-mundo",
    description="Preguntas sobre las capitales del mundo",
    registros=[
        {
            "datos_entrada": {"question": "¿Cuál es la capital de China?"},
            "expected_output": "Pekín",
            "metadata": {"difficulty": "easy"}
        },
        {
            "datos_entrada": {"question": "¿Qué ciudad es la capital de Sudáfrica?"},
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"}
        }
    ]
)

# Ver conjunto de datos en Datadog UI
print(f "Ver conjunto de datos: {dataset.url}")
```

### Gestión de registros de conjuntos de datos

La clase Dataset proporciona métodos para gestionar los registros:

```python
# Añadir un nuevo registro
dataset.append({
    "datos_entrada": {"pregunta": "¿Cuál es la capital de Suiza?"},
    "expected_output": "Berna",
    "metadata": {"difficulty": "easy"}
})

# Actualizar un registro existente
dataset.update(0, {
    "datos_entrada": {"pregunta": "¿Cuál es la capital de China?"},
    "expected_output": "Pekín",
    "metadata": {"difficulty": "medium"}
})

# Borrar un registro
dataset.delete(1) # Elimina el segundo registro

# Guardar los cambios en Datadog
dataset.push()
```

### Acceso a los registros de conjuntos de datos

Puede acceder a los registros del conjunto de datos utilizando la indexación estándar de Python:

```python
# Obtener un único registro
registro = conjunto de datos[0]

# Obtener varios registros
registros = conjunto de datos[1:3]

# Iterar a través de los registros
para registro en conjunto de datos:
    print(registro["datos_entrada"])
```


### Recuperar un conjunto de datos

Para recuperar un conjunto de datos existente en Datadog:

```python
dataset = LLMObs.pull_dataset("capitales-del-mundo")

# Obtener la longitud del conjunto de datos
print(len(dataset))
```


### Trabajar con archivos CSV

Puede crear conjuntos de datos a partir de archivos CSV y exportar conjuntos de datos a pandas DataFrames.

**Nota**: Pandas es necesario para estas operaciones; instálelo con `pip install pandas`.

```python
# Crear conjunto de datos a partir de CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="preguntas.csv",
    dataset_name="geography-quiz",
    input_data_columns=["pregunta", "categoría"], # Columnas a utilizar como entrada
    expected_output_columns=["respuesta"], # Columnas que se utilizarán como resultado esperado
    metadata_columns=["dificultad"], # Opcional: Columnas adicionales como metadatos
    csv_delimiter=",", # Opcional: Por defecto, coma
    description="Geography quiz dataset" # Opcional: Descripción del conjunto de datos
)

# Ejemplo de formato CSV:
# pregunta,categoría,respuesta,dificultad
# ¿Cuál es la capital de Japón?,geografía,Tokio,medio
# ¿Cuál es la capital de Brasil?,geografía,Brasília,media

# Convertir el conjunto de datos en pandas DataFrame
df = dataset.as_dataframe()
print(df.head())

# Salida DataFrame con columnas MultiIndex:
# input_data expected_output metadata
# pregunta categoría respuesta dificultad
# 0 ¿Cuál es la capital de Japón? geografía Tokio media
# 1 ¿Cuál es la capital de Brasil? geografía Brasília media
```

El DataFrame tiene una estructura MultiIndex con las siguientes columnas:
- `input_data`: Contiene todos los campos de entrada de `input_data_columns`
- `expected_output`: Contiene todos los campos de salida de `expected_output_columns`
- `metadata`: Contiene los campos adicionales de `metadata_columns`

**Notas**:
- Los archivos CSV deben tener una línea de encabezamiento
- El tamaño máximo de los campos es de 10 MB
- Todas las columnas no especificadas en `input_data_columns` o `expected_output_columns` se tratan automáticamente como metadatos.
- El conjunto de datos se transfiere automáticamente a Datadog tras su creación.

## Experimentos
Un experimento es una colección de trazas utilizadas para test el comportamiento de una aplicación o agente LLM frente a un conjunto de datos. El conjunto de datos proporciona los datos de entrada, y las salidas son las generaciones finales producidas por la aplicación en test.

### Tarea
La tarea define el núcleo workflow (UI) / proceso (generic) que desea evaluar. Puede variar desde una única llamada LLM hasta un flujo más complejo que incluya múltiples llamadas LLM y pasos RAG. La tarea se ejecuta secuencialmente en todos los registros del conjunto de datos.

### Evaluadores
Los evaluadores son funciones que miden el rendimiento del modelo o del agente comparando la salida con la salida_esperada o con la entrada original. Datadog admite los siguientes tipos de evaluadores:
- Booleano: devuelve verdadero o falso
- score: devuelve un valor numérico (float)
- categorical: devuelve una categoría etiquetada (cadena)

### Crear un experimento

Cree un experimento utilizando `LLMObs.experiment()`:

1. Cargar un conjunto de datos
``python
from ddtrace.llmobs import LLMObs
from typing import Dict, Any, Optional, List

dataset = LLMObs.pull_dataset("capitales-del-mundo")
```

2. Define una función de tarea que procese un único registro del conjunto de datos.
```python
def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
    question = datos_entrada["pregunta"]
    # Su LLM o lógica de procesamiento aquí
    return "Beijing" if "China" in question else "Desconocido"
```

Puedes trace (traza) las diferentes partes de tu tarea de Experimento (workflow (UI) / proceso (generic), llamadas a herramientas...) usando los [mismos decoradores de trazado](https://docs.datadoghq.com/llm_observability/instrumentation/custom_instrumentation?tab=decorators#trace (traza)-an-llm-application) que usas en producción.
Si usas un [framework soportado](https://docs.datadoghq.com/llm_observability/instrumentation/auto_instrumentation?tab=python) (e.g openAI, ...), LLMObs automáticamente rastrea y anota llamadas a frameworks y librerías LLM, dándote observabilidad out-of-the-box para las llamadas que tu aplicación LLM hace.


3. Definir funciones evaluadoras
``python
def coincidencia_exacta(datos_entrada: Dict[str, Cualquiera], datos_salida: str, salida_esperada: str) -> bool:
    return datos_salida == salida_esperada

def solapar(datos_entrada: Dict[str, Cualquiera], datos_salida: str, salida_esperada: str) -> float:
    salida_esperada = set(salida_esperada)
    conjunto_salida = conjunto(datos_salida)

    intersección = len(conjunto_salida.intersección(conjunto_salida_esperado))
    unión = len(conjunto_salida.unión(conjunto_salida_esperado))

    return intersección / unión

def fake_llm_as_a_judge(datos_entrada: Dict[str, Cualquiera], datos_salida: str, salida_esperada: str) -> str:
    fake_llm_call = "excelente"
    return fake_llm_call
```

4. Crea y ejecuta el experimento
```python
experimento = LLMObs.experimento(
    name="capitales-ciudades-test",
    task=tarea,
    conjunto de datos=conjunto de datos,
    evaluadores=[exact_match, overlap, fake_llm_as_a_judge],
    description="Comprobar el conocimiento de las capitales",
    config={
        "nombre_modelo": "gpt-4",
        "version": "1.0"
    },
)

# Ejecutar el experimento
results = experiment.run() # Ejecutar en todos los registros del conjunto de datos
results = experiment.run(jobs=4) # Ejecutar con procesamiento paralelo
results = experiment.run(sample_size=10, raise_errors=True) # test en subconjunto

# Ver experimento en Datadog UI
print(f "Ver experimento: {experimento.url}")

# Procesar los resultados
for resultado in resultados:
    print(f "Registrar {result['idx']}")
    print(f "Entrada: {result['entrada']}")
    print(f "Salida: {result['salida']}")
    print(f "Puntuación: {result['evaluaciones']['evaluador']['valor']}")
    if resultado['error']['mensaje']:
        print(f "Error: {result['error']['mensaje']}")
```

## Experimentos LLM API

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
                "description": "Ejemplo de descripción",
                "name": "Ejemplo de conjunto de datos",
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


### API de conjuntos de datos

**Tipo de solicitud**: `datasets`

{{% collapse-content title="GET /api/unstable/llm-obs/v1/datasets" level="h4" expanded=false id="api-datasets-get" %}}

Lista todos los conjuntos de datos, ordenados por fecha de creación. Los conjuntos de datos creados más recientemente aparecen en primer lugar.

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
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/datasets" level="h4" expanded=false id="api-datasets-post" %}}

Crear un conjunto de datos. Si ya existe un conjunto de datos con el mismo nombre, la API devuelve el conjunto de datos existente sin modificar.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `name` (_obligatorio_) | cadena | Nombre único del conjunto de datos. |
| `description` | cadena | Descripción del conjunto de datos. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único para el conjunto de datos. Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `name` | cadena | Nombre único del conjunto de datos. |
| `description` | cadena | Descripción del conjunto de datos. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="GET /api/unstable/llm-obs/v1/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-list-records" %}}

Enumera todos los registros del conjunto de datos, ordenados por fecha de creación. Los registros creados más recientemente aparecen en primer lugar.

**Parámetros de consulta**

| Parámetro | Tipo | Descripción |
| ---- | ---- | --- |
| `filter[version]` | cadena | Enumera los resultados de una determinada versión del conjunto de datos. |
| `Page ( página)[cursor]` | cadena | Enumera los resultados con un cursor proporcionado en la consulta anterior. |
| `Page ( página)[limit]` | Int | Limita el número de resultados. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| dentro de [Datos](#object-data)_ | [][Registro](#object-record) | Lista de registros del conjunto de datos. |

#### Objeto: Registro

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | cadena | ID de registro único. |
| `dataset_id` | cadena | ID único del conjunto de datos. |
| `input_data` | cualquiera (cadena, número, booleano, objeto, matriz) | Datos que sirven de punto de partida para un experimento. |
| `expected_output` | cualquiera (cadena, número, booleano, objeto, matriz) | Resultados previstos |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/datasets/{dataset_id}/records" level="h4" expanded=false id="api-datasets-append-records" %}}

Añade registros a un conjunto de datos determinado.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| `records` (_obligatorio_) | [][RecordReq](#object-recordreq) | Lista de registros a crear. |

#### Objeto: RecordReq

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `input_data` (_obligatorio_) | cualquiera (cadena, número, booleano, objeto, matriz) | Datos que sirven de punto de partida para un experimento. |
| `expected_output` | cualquiera (cadena, número, booleano, objeto, matriz) | Resultados previstos |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | --- |
| `records` | [][Registro](#object-record) | Lista de registros creados. |

{{% /collapse-content %}}

### API de Experimentos

**Tipo de solicitud: `experiments`

{{% collapse-content title="GET /api/unstable/llm-obs/v1/experiments" level="h4" expanded=false id="api-experiments-get" %}}

Enumera todos los experimentos, ordenados por fecha de creación. Los experimentos creados más recientemente aparecen en primer lugar.

**Parámetros de consulta**

| Parámetro | Tipo | Descripción |
| ---- | ---- | --- |
| `filter[project_id]` (_obligatorio_ si no se facilita el conjunto de datos) | cadena | El ID de un project (proyecto) para el cual recuperar experimentos. |
| `filter[dataset_id]` | cadena | El ID de un conjunto de datos para el cual recuperar experimentos. |
| `filter[id]` | cadena | ID del experimento que se deseas buscar. Para consultar varios experimentos, utiliza `?filter[id]=<>&filter[id]=<>`. |
| `filter[name]` | cadena | El nombre de un experimento a buscar. |
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
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

{{% collapse-content title="POST /api/unstable/llm-obs/v1/experiments" level="h4" expanded=false id="api-experiments-post" %}}

Crear un experimento. Si ya existe un experimento con el mismo nombre, la API devuelve el experimento existente sin modificar.

**Solicitud**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `project_id` (_obligatorio_) | cadena | ID único del project (proyecto). |
| `dataset_id` (_obligatorio_) | cadena | ID único del conjunto de datos. |
| `dataset_version` | Int | Versión del conjunto de datos. |
| `name` (_obligatorio_) | cadena | Nombre único del experimento. |
| `description` | cadena | Descripción del experimento. |
| `ensure_unique` | bool | Si `true`, Datadog genera un nuevo experimento con un nombre único en el case (incidencia) de un conflicto. Datadog te recomienda configurar este campo en `true`. |

**Respuesta**

| Campo | Tipo | Descripción |
| ---- | ---- | ---- |
| `id` | UUID | ID único del experimento. Establecido en el campo `id` de nivel superior dentro del objeto [Datos](#object-data). |
| `project_id` | cadena | ID único del project (proyecto). |
| `dataset_id` | cadena | ID único del conjunto de datos. |
| `name` | cadena | Nombre único del experimento. |
| `description` | cadena | Descripción del experimento. |
| `created_at` | marca de tiempo | Marca de tiempo que representa cuándo se creó el recurso. |
| `updated_at` | marca de tiempo | Marca de tiempo que representa cuándo se actualizó el recurso por última vez. |

{{% /collapse-content %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/llm-observability/tree/main/preview/experiments/notebooks
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /es/getting_started/site/
[7]: https://github.com/DataDog/llm-observability/tree/main/preview/experiments
[8]: https://www.postman.com/
[9]: https://app.datadoghq.com/llm/testing/experiments
[10]: https://github.com/DataDog/llm-observability/tree/main/preview/experiments/notebooks