---
aliases:
- /es/llm_observability/experiments/datasets/
description: Uso de conjuntos de datos en Agent Observability Experiments, incluyendo
  cómo crear, recuperar y administrar conjuntos de datos, así como información sobre
  el control de versiones.
further_reading:
- link: /llm_observability/configure/automation_rules
  tag: Documentación
  text: Enruta trazas a conjuntos de datos automáticamente con reglas de automatización.
title: Conjuntos de datos
---
En los experimentos de Agent Observability, un _conjunto de datos_ es una colección de _entradas_, _salidas esperadas_ y _metadatos_ que representan escenarios en los que desea probar su agente. Cada conjunto de datos está asociado con un _proyecto_.  

Cada registro en un conjunto de datos contiene:
- **entrada** (obligatorio): Representa toda la información a la que el agente puede acceder en una tarea.
- **salida esperada** (opcional): También llamada _ground truth_, representa la respuesta ideal que el agente debería generar. Puede utilizar la _salida esperada_ para almacenar la salida real de la aplicación, así como cualquier resultado intermedio que desee evaluar. 
- **metadatos** (opcional): Contiene cualquier información útil para categorizar el registro y utilizarla para análisis posteriores. Por ejemplo: temas, etiquetas, descripciones, notas.
- **id** (opcional): Un identificador definido por el usuario para el registro. Debe tener 128 caracteres o menos y contener solo letras, números, `_`, `-` o `.`. Si no se proporciona, el SDK genera uno automáticamente.

Los conjuntos de datos permiten realizar pruebas sistemáticas y detectar regresiones al proporcionar escenarios de evaluación consistentes en todos los experimentos.

### Creación de un conjunto de datos {#creating-a-dataset}

Puede crear conjuntos de datos a partir de datos de producción, archivos CSV o construirlos manualmente mediante programación.

{{< tabs >}}

{{% tab "A partir de archivos CSV" %}}

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
    id_column="record_id",                        # Optional: Column to use as record IDs
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# record_id,question,category,answer,difficulty
# japan-capital,What is the capital of Japan?,geography,Tokyo,medium
# brazil-capital,What is the capital of Brazil?,geography,Brasília,medium

```

**Notas**:
- Los archivos CSV deben tener una fila de encabezado
- El tamaño máximo del campo es de 10 MB
- Todas las columnas no especificadas en `input_data_columns`, `expected_output_columns` o `id_column` se tratan automáticamente como metadatos
- El conjunto de datos se envía automáticamente a Datadog después de su creación

{{% /tab %}}

{{% tab "Creación manual" %}}

Para crear manualmente un conjunto de datos, use `LLMObs.create_dataset()`:

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "id": "china-capital",                                             # optional, user-defined record ID
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

{{% tab "Desde trazas de producción" %}}
Agregue trazas de producción a los conjuntos de datos manualmente a través de la interfaz de usuario o automáticamente con automatizaciones.

**Selección manual (UI)**:
1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][2]. También puede agregar una nueva Automation desde [Settings > Automations][3].
2. Busque una traza que desee incluir en un conjunto de datos.
3. Haga clic en {{< ui >}}Add to Dataset{{< /ui >}}.
4. Elija un conjunto de datos existente o cree uno.
5. La entrada, la salida y los metadatos de la traza se extraen automáticamente.

**Enrutamiento automático (Automations)**:

<div class="alert alert-info">Automations se aplican de ahora en adelante: las nuevas trazas que coincidan con su regla se enrutan a los conjuntos de datos a medida que llegan. Las trazas existentes que coincidan con el filtro no se agregan de forma retroactiva.</div>

Automations le permiten enrutar continuamente las trazas de producción a los conjuntos de datos según reglas configurables, manteniendo sus conjuntos de datos actualizados con el comportamiento de producción sin intervención manual.

Para configurar las actualizaciones automáticas del conjunto de datos:
1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][2].
2. Aplique filtros para identificar las trazas que desea enrutar (errores de evaluación, umbrales de latencia, aplicaciones específicas). Consulte [Automation Rules > Supported filter fields][5] para ver lo que está permitido.
3. Haga clic en {{< ui >}}Automate Query{{< /ui >}}.
4. Configure la tasa de muestreo (por ejemplo, el 10% de las trazas coincidentes).
5. Seleccione {{< ui >}}Add to Dataset{{< /ui >}} como la acción.
6. Elija un conjunto de datos existente o cree uno.

Después de crear una Automation, adminístrela desde [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][3]:
- {{< ui >}}Enable/disable{{< /ui >}}: Controle si se agregan nuevas trazas al conjunto de datos.
- {{< ui >}}Edit{{< /ui >}}: Modifique filtros, tasas de muestreo o conjuntos de datos de destino a medida que cambien sus necesidades.
- {{< ui >}}Delete{{< /ui >}}: Elimine las Automations que ya no necesite.

**Límites del conjunto de datos:**
- Los conjuntos de datos poblados por Automations tienen un límite de 20,000 registros.
- Estos conjuntos de datos son de solo lectura para evitar la modificación accidental de datos automatizados.
- Para modificar registros, clone el conjunto de datos primero.

**Ejemplos de casos de uso para Automations:**
- Muestree el 10% de las trazas con evaluaciones fallidas para crear un conjunto de datos de fallas.
- Recopile casos extremos donde la latencia exceda los umbrales.
- Mantenga un conjunto de datos diverso con muestreo estratificado entre segmentos de usuario.
- Capture automáticamente nuevos patrones de falla a medida que surjan en producción.

[2]: https://app.datadoghq.com/llm/traces
[3]: https://app.datadoghq.com/llm/settings/automations
[5]: /es/llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}

### Recuperación de un conjunto de datos {#retrieving-a-dataset}

Para recuperar un conjunto de datos existente de un proyecto desde Datadog:

```python
dataset = LLMObs.pull_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to the project name from LLMObs.enable
    version=1 # optional, defaults to the latest version
)

# Get dataset length
print(len(dataset))
```

#### Exportación de un conjunto de datos a pandas {#exporting-a-dataset-to-pandas}

La clase Dataset también proporciona el método `as_dataframe()`, que le permite transformar un conjunto de datos como un [pandas DataFrame][1].

<div class="alert alert-info"><a href="https://pandas.pydata.org/docs/index.html">Pandas</a> es necesario para esta operación. Para instalar pandas, <code>pip install pandas</code>.</div>

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

El DataFrame tiene una estructura MultiIndex con las siguientes columnas:
- `input_data`: Contiene todos los campos de entrada de `input_data_columns`
- `expected_output`: Contiene todos los campos de salida de `expected_output_columns`
- `metadata`: Contiene cualquier campo adicional de `metadata_columns`


### Control de versiones de conjuntos de datos{#dataset-versioning}

Los conjuntos de datos tienen control de versiones automático para realizar un seguimiento de los cambios a lo largo del tiempo. La información de control de versiones permite la reproducibilidad y permite que los experimentos hagan referencia a versiones específicas de conjuntos de datos. 

El objeto `Dataset` tiene un campo, `current_version`, que corresponde a la versión más reciente; las versiones anteriores están sujetas a un periodo de retención de 90 días. 

Las versiones de los conjuntos de datos comienzan en `0`, y cada versión nueva incrementa la versión en 1.

#### Cuando se crean nuevas versiones de conjuntos de datos{#when-new-dataset-versions-are-created}

Se crea una nueva versión de un conjunto de datos cuando:
- Se agregan registros
- Actualización de registros (cambios en los campos `input`, `expected_output` o `metadata`)
- Eliminando registros

Las versiones del conjunto de datos **NO** se crean al actualizar el nombre o la descripción del conjunto de datos.

#### Retención de versiones {#version-retention}

- La versión activa de un conjunto de datos se conserva durante 3 años.
- Las versiones anteriores (**NO** el contenido de `current_version`) se conservan durante 90 días. 
- El periodo de retención de 90 días se reinicia cuando se utiliza una versión anterior; por ejemplo, cuando un experimento lee una versión.
- Después de 90 días consecutivos sin uso, una versión anterior es elegible para su eliminación permanente y es posible que ya no sea accesible.

**Ejemplo del comportamiento de retención de versiones**

Después de publicar `12`, `11` se convierte en una versión anterior con un periodo de 90 días. Después de 25 días, usted ejecuta un experimento con la versión `11`, lo que provoca que el periodo de 90 días **se reinicie**. Después de otros 90 días, durante los cuales usted no ha utilizado la versión `11`, la versión `11` podría eliminarse.

### Acceso y gestión de registros de conjuntos de datos {#accessing-and-managing-dataset-records}

Puede acceder a los registros del conjunto de datos utilizando la indexación estándar de Python:

```python
# Get a single record
record = dataset[0]

# Get multiple records
records = dataset[1:3]

# Iterate through records
for record in dataset:
    print(record["input_data"])
```
  
La clase Dataset proporciona métodos para gestionar registros: `append()`, `update()`, `delete()`. Necesita `push()` cambios para guardar los cambios en Datadog.

```python
# Add a new record
dataset.append({
    "id": "switzerland-capital",
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

### Personalización de la tabla de conjuntos de datos {#customizing-the-dataset-table}

Al ver los registros de un conjunto de datos, puede personalizar la tabla para examinar y comparar registros rápidamente sin expandir cada uno individualmente.

#### Column picker {#column-picker}

Utilice el Column picker para activar o desactivar columnas y arrástrelas para reordenarlas.

#### Columnas personalizadas {#custom-columns}

Extraiga campos específicos de los registros de su conjunto de datos y muéstrelos como columnas dedicadas de la tabla. Para agregar una columna personalizada, escriba una ruta de campo en la entrada {{< ui >}}Add Column{{< /ui >}} en la parte superior de la tabla. Puede agregar varias columnas personalizadas y reordenarlas arrastrando y soltando. La configuración de las columnas se guarda en el almacenamiento local de su navegador por proyecto.

[1]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html