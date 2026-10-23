---
aliases:
- /es/llm_observability/improve/experiments/analyzing_results/
- /es/llm_observability/experiments/analyzing_results/
description: Cómo analizar los resultados de Agent Observability Offline Experiments.
title: Analice los resultados de su Offline Experiment
---
Esta página describe cómo analizar los resultados de Agent Observability Offline Experiments en la interfaz y los widgets de Offline Experiments de Datadog.

Después de ejecutar un Experiment, puede analizar los resultados para comprender los patrones de rendimiento e investigar los registros problemáticos.

## Uso de la página Experiment en Datadog {#using-the-experiment-page-in-datadog}

En la página Offline Experiments, haga clic en un experimento para ver sus detalles.

La sección {{< ui >}}Summary{{< /ui >}} contiene las evaluaciones, las evaluaciones de resumen y las métricas que se registraron durante la ejecución de su Experiment.

Cada valor se agrega según su tipo:
- **Booleano**: se agrega como la proporción de `True` sobre todos los valores registrados.
- **Puntuación**: se agrega como el promedio de todos los valores registrados.
- **Categórico**: se agrega como la moda (el valor más frecuente en la distribución).

La sección {{< ui >}}Records{{< /ui >}} contiene trazas relacionadas con la ejecución de su tarea en las entradas del conjunto de datos. Cada traza contiene la lista de tramos que muestran el flujo de información a través de su agente.

Puede usar las facetas (en el lado izquierdo) para filtrar los registros según sus resultados de evaluación y descubrir patrones.

### Personalización de la tabla de resultados {#customizing-the-results-table}

Puede personalizar la tabla de resultados del experimento para mostrar los campos que más le importan sin tener que abrir cada traza individualmente.

#### Column picker {#column-picker}

Utilice el Column picker para activar o desactivar columnas y arrástrelas para reordenarlas. De forma predeterminada, las columnas de blob JSON sin procesar (Input, Output, Expected Output) están ocultas para facilitar la lectura de la tabla. Puede volver a activarlas en cualquier momento.

La tabla incluye una columna {{< ui >}}Record ID{{< /ui >}} que muestra el registro del conjunto de datos con el que se ejecutó cada instancia del experimento. Para experimentos offline con múltiples ejecuciones por registro, expanda un registro para ver todas las ejecuciones debajo.

#### Columnas personalizadas {#custom-columns}

Extraiga campos específicos del tramo de nivel superior de su experimento, como una clave de entrada, una clave de salida o una clave de metadatos, y muéstrelos como columnas específicas de la tabla. Esto le permite comparar propiedades clave entre registros de un vistazo.

Para agregar una columna personalizada, escriba una ruta de campo en la entrada {{< ui >}}Add Column{{< /ui >}} en la parte superior de la tabla:

| Fuente          | Formato de ruta                    | Ejemplo                          |
| --------------- | ------------------------------ | -------------------------------- |
| Input           | `@meta.input.<key>`           | `@meta.input.user_query`        |
| Output          | `@meta.output.<key>`          | `@meta.output.result.status`    |
| Expected output | `@meta.expected_output.<key>` | `@meta.expected_output.answer`  |
| Metadata        | `@meta.metadata.<key>`        | `@meta.metadata.scenario_type`  |
| Etiqueta | `<tag_key>`                    | `env`                            |

Puede agregar varias columnas personalizadas y reordenarlas arrastrando y soltando. La configuración de las columnas se guarda en el almacenamiento local de su navegador por proyecto.

#### Acciones rápidas desde el detalle del tramo {#quick-actions-from-the-span-detail}

Al ver el tramo raíz en el panel lateral de detalles del tramo, puede actuar sobre los campos directamente desde el menú contextual en lugar de escribir rutas manualmente.

Las siguientes opciones están disponibles en campos JSON (Input, Output, Expected Output, Metadata):

- {{< ui >}}Copy key path{{< /ui >}}: Copia la ruta completa del campo (por ejemplo, `@meta.input.user_query`) para que pueda pegarla en la entrada de columna personalizada, la barra de búsqueda o una consulta de widget de panel.
- {{< ui >}}Add column{{< /ui >}}: Agrega el campo como una columna personalizada en la tabla de resultados con un solo clic.
- {{< ui >}}Filter by / Exclude{{< /ui >}}: Agrega el par clave-valor del campo a la consulta de búsqueda para restringir o excluir registros coincidentes. Disponible solo en valores hoja (cadenas, números, booleanos).

Las siguientes opciones están disponibles en las etiquetas:

- {{< ui >}}Copy key{{< /ui >}}: Copia la clave de etiqueta (por ejemplo, `env`).
- {{< ui >}}Copy to clipboard{{< /ui >}}: Copia la etiqueta completa, incluido su valor (por ejemplo, `env:prod`).
- {{< ui >}}Add column{{< /ui >}}: Agrega la clave de etiqueta como una columna personalizada en la tabla de resultados.
- {{< ui >}}Filter by / Exclude{{< /ui >}}: Agrega el par clave-valor de la etiqueta a la consulta de búsqueda.

<div class="alert alert-info">Estas acciones están disponibles en el tramo raíz de una traza.</div>

### Búsqueda de registros específicos {#searching-for-specific-records}

Puede usar la barra de búsqueda para encontrar registros específicos, según sus propiedades (datos de registros del conjunto de datos) o según el resultado del experimento (salida y evaluaciones). La búsqueda se ejecuta a nivel de traza.

{{< img src="llm_observability/experiments/exp_details_search.png" alt="Agent Observability, enfoque en Experiment Details. Encabezado: \"Resaltado de la barra de búsqueda\"." style="width:100%;" >}}

<div class="alert alert-info">Para tener acceso a la mayor cantidad de datos, actualice a <code>ddtrace-py >= 4.1.0</code>, ya que esta versión incluye los siguientes cambios:

<ul>
<li>Los tramos de Offline Experiments contienen metadatos del registro del conjunto de datos. </li>
<li>Los campos de los tramos de Offline Experiments <code>input</code>, <code>output</code>, y <code>expected_output</code> se almacenan tal cual (es decir, como JSON consultable si se emiten como tal) </li>
<li>Los tramos de Offline Experiments y los tramos secundarios están etiquetados con <code>dataset_name</code>, <code>project_name</code>, <code>project_id</code>, <code>experiment_name</code> para facilitar la búsqueda.</li>
</ul></div>

#### Buscar trazas por palabra clave {#find-traces-by-keyword}
La búsqueda por palabra clave ejecuta una búsqueda en toda la información disponible (entrada, salida, salida esperada, metadatos, etiquetas).

#### Buscar trazas por evaluación {#find-traces-by-evaluation}

Para buscar una traza por evaluación, busque: `@evaluation.<name>.value:<criteria>`

| Tipo de evaluación | Término de búsqueda de ejemplo |
| --------------- | ----------- |
| Booleano         | `@evaluation.has_risk_pred.value:true` |
| Puntuación           | `@evaluation.correctness.value:>=0.35` |
| Categórico     | `@evaluation.violation.value:(not_fun OR not_nice)` |

#### Buscar trazas por estado del experimento {#find-traces-by-experiment-status}

Para buscar una traza por estado del experimento, busque: `@experiment.status:<status>`

| Estado | Término de búsqueda de ejemplo |
| ------ | ------------------- |
| En ejecución | `@experiment.status:running` |
| Completado | `@experiment.status:completed` |

#### Buscar trazas por métrica {#find-traces-by-metric}

Offline Experiments recopila automáticamente métricas de duración, recuento de tokens y costo.

| Métrica               | Término de búsqueda de ejemplo |
| -------------------- | ------------------- |
| Duración             | `@duration:>=9.5s ` |
| Recuento de tokens          | `@trace.total_tokens:>10000` |
| Costo total estimado<br/> (en nanodólares; 1 nanodólar = 10<sup>-9</sup> dólares) | `@trace.estimated_total_cost:>10000000` |


#### Buscar trazas por etiqueta {#find-traces-by-tag}

Para buscar trazas usando etiquetas, realice una búsqueda `<tag>:<value>`. Por ejemplo, `dataset_record_id:84dfd2af88c6441a856031fc2e43cb65 `.

Para ver qué etiquetas están disponibles, abra una traza para encontrar sus etiquetas.

{{< img src="llm_observability/experiments/side-panel-tag.png" alt="Agent Observability, panel lateral de la traza del experimento. Resaltado de dónde encontrar etiquetas de traza." style="width:100%;" >}}


#### Buscar trazas por entrada, salida, salida esperada o metadatos {#find-traces-by-input-output-expected-output-or-metadata}

Para consultar una clave específica en la entrada, salida, salida esperada o metadatos, debe emitir la propiedad como JSON.

| Propiedad | Formato | Término de búsqueda de ejemplo |
| -------- | ------ | ------------------- |
| input | `@meta.input.<key1>.<subkey1>:<value>` | `@meta.input.origin.country:"France"` |
| output | `@meta.output.<key1>.<subkey1>:<value>` | `@meta.output.result.status:"success"` |
| expected output | `@meta.expected_output.<key1>.<subkey1>:<value>` | `@meta.expected_output.answer:"correct"`|
| metadata | `@meta.metadata.<key1>.<subkey1>:<value>` | `@meta.metadata.source:generated` |


##### Consulta de arreglos JSON {#querying-json-arrays}
Los arreglos simples se aplanan como cadenas y puede consultarlos.

**Ejemplo 1**: Arreglo JSON consultable

```
"output": {
  "action_matches": [
        "^/cases/settings$",
        "^Create Case Type$",
        "^/cases$"
    ],
}
```

Puede consultar este arreglo de ejemplo buscando: `@meta.output.action_matches:"^/cases/settings$"`.

**Ejemplo 2**: Arreglo JSON no consultable

```
"output": {
  "expected_actions": [
    [
      "bonjour",
      "a_bientot"
    ],
    [
      "todobem",
      "click here"
    ]
  ],
}
```

En este ejemplo, el arreglo está anidado y no se puede consultar.

## Uso de widgets con datos de Offline Experiments {#using-widgets-with-offline-experiments-data}

Puede crear widgets en Dashboards y Notebooks utilizando datos de Offline Experiments.
Datadog sugiere lo siguiente:
- Complete los metadatos de los registros de su conjunto de datos con toda la información adicional que pueda ayudarle a segmentar sus datos (por ejemplo: dificultad, idioma, etc.)
- Asegúrese de que sus tareas generen un objeto JSON
- Actualice `ddtrace-py` a la versión >= 4.1.0


Para crear un widget utilizando datos de Offline Experiments, utilice {{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Offline Experiments{{< /ui >}} como fuente de datos. Luego, utilice la [sintaxis de búsqueda en esta página](#searching-for-specific-records) para limitar los eventos a graficar.

Para la agregación de datos a nivel de registro, utilice {{< ui >}}Traces{{< /ui >}}; de lo contrario, utilice {{< ui >}}All Spans{{< /ui >}}.

Agrupe o filtre por `@experiment.status` para comparar métricas entre experimentos offline en ejecución o completados.

### Ejemplos de widgets {#widget-examples}
#### Gráfico de rendimiento a lo largo del tiempo desglosado por un campo de metadatos {#plotting-performance-over-time-broken-down-by-a-metadata-field}
{{< img src="llm_observability/experiments/widget-metadata.png" alt="Widget que utiliza datos de Offline Experiments. Gráfico que muestra el rendimiento a lo largo del tiempo desglosado por un campo de metadatos." style="width:100%;" >}}

<div class="alert alert-info">Si intenta calcular un promedio de una evaluación booleana, debe calcular manualmente el porcentaje de <code>True</code> en todas las trazas.</div>

#### Visualización de estadísticas de uso de herramientas {#displaying-tool-usage-stats}
Si su agente debe llamar a una herramienta determinada y necesita saber con qué frecuencia la llama y obtener estadísticas sobre su uso:

{{< img src="llm_observability/experiments/widget-tool.png" alt="Widget que utiliza datos de Offline Experiments. Gráfico que muestra algunas estadísticas de uso de una herramienta en múltiples experimentos offline." style="width:100%;" >}}