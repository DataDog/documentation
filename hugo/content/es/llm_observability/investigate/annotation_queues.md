---
aliases:
- /es/llm_observability/evaluations/annotation_queues/
description: Habilite la revisión humana sistemática de trazas de LLM para identificar
  modos de falla, validar evaluaciones automatizadas y crear conjuntos de datos de
  referencia.
further_reading:
- link: /llm_observability/investigate/evaluations/
  tag: Documentación
  text: Obtenga información sobre los tipos de evaluación
- link: /llm_observability/configure/automation_rules
  tag: Documentación
  text: Enrute trazas a colas automáticamente con Automation Rules
- link: /llm_observability/improve/experiments
  tag: Documentación
  text: Ejecute experimentos para probar mejoras
- link: https://www.datadoghq.com/blog/automations-annotation-queues
  tag: Blog
  text: Anote trazas para mejorar la calidad de LLM con Datadog LLM Observability
- link: /api/latest/agent-observability/
  tag: API
  text: Referencia de la API de Agent Observability
title: Colas de anotación
---
## Descripción general {#overview}

Las colas de anotación proporcionan un flujo de trabajo estructurado para la revisión humana de trazas de LLM. Utilice las colas de anotación para:
- Revise trazas con contexto completo, incluyendo tramos, metadatos, llamadas a herramientas, entradas, salidas y resultados de evaluación
- Aplique etiquetas estructuradas y observaciones de formato libre a las trazas
- Identifique y categorice patrones de falla
- Valide la precisión de la evaluación LLM-as-a-Judge
- Cree conjuntos de datos de referencia con etiquetas verificadas por humanos para pruebas y validación


## Creación de una cola de anotación {#creating-an-annotation-queue}

### Paso 1: Configure los ajustes de la cola {#step-1-configure-queue-settings}

1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] y seleccione su proyecto.
2. Haga clic en {{< ui >}}Create Queue{{< /ui >}}.
3. En la pestaña {{< ui >}}About{{< /ui >}}, configure:
   - {{< ui >}}Name{{< /ui >}}: Nombre descriptivo que refleje el propósito de la cola (por ejemplo, \"Revisión de evaluaciones fallidas - Q1 2026\")
   - {{< ui >}}Project{{< /ui >}}: Proyecto Agent Observability al que pertenece esta cola
   - {{< ui >}}Description{{< /ui >}} (opcional): Explique el propósito de la cola y cualquier instrucción especial para los anotadores

4. Luego haga clic en {{< ui >}}Next{{< /ui >}}.
5. En la pestaña {{< ui >}}Schema{{< /ui >}}, defina el esquema de etiquetas de su nueva cola. Use el panel de Vista previa para ver cómo aparecen las etiquetas para los anotadores a medida que las configura. Cada etiqueta puede marcarse como obligatoria y puede incluir opcionalmente:
   - {{< ui >}}Assessment criteria{{< /ui >}}: Permita que los anotadores indiquen aprobado/reprobado para ese valor de etiqueta
   - {{< ui >}}Reasoning{{< /ui >}}: Permita que los anotadores agreguen una breve explicación
6. Revise la configuración de su cola y haga clic en {{< ui >}}Create{{< /ui >}} para crear la cola.

   {{< img src="llm_observability/evaluations/annotation_queues/schema_edit.png" alt="El modal Editar cola que muestra la pestaña Esquema con la configuración de etiquetas a la izquierda y un panel de vista previa a la derecha. El panel izquierdo muestra campos para configurar una etiqueta categórica llamada failure_type con tres categorías: hallucination, formatting_error y refusal. Las casillas de verificación habilitan las opciones de Criterios de evaluación y Razonamiento. El panel de vista previa derecho muestra cómo aparece la etiqueta para los anotadores con casillas de verificación para cada categoría, botones de evaluación Aprobado/Reprobado y un campo de texto de razonamiento." style="width:100%;" >}}

### Paso 2: Seleccione trazas para la anotación {#step-2-select-traces-for-annotation}

Puede crear y agregar trazas a la cola manualmente desde Trace Explorer o completar colas automáticamente usando Automation Rules.

{{< tabs >}}

{{% tab "Manualmente desde Trace Explorer" %}}
Agregue trazas a una cola manualmente desde Trace Explorer:
1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1]
2. Filtre las trazas usando las facetas disponibles (resultados de evaluación, estado de error, aplicación, rango de tiempo)
3. Seleccione trazas individuales o seleccione varias trazas de forma masiva
4. Haga clic en {{< ui >}}Flag for Annotation{{< /ui >}}
5. Elija {{< ui >}}Create New Queue{{< /ui >}} o seleccione una cola existente

[1]: https://app.datadoghq.com/llm/traces
{{% /tab %}}

{{% tab "Uso de Automation Rules" %}}
En lugar de seleccionar trazas manualmente, utilice Automation Rules para enrutar trazas a las colas de anotación automáticamente según filtros y criterios de muestreo. Esto permite una población de colas continua y automática sin necesidad de seleccionar trazas manualmente. Consulte [Automation Rules][5] para obtener la referencia completa de la función, incluidos los campos de filtro admitidos y los límites.

<div class="alert alert-info">Automations se aplican de ahora en adelante: las nuevas trazas que coincidan con su regla se enrutan a la cola a medida que llegan. Las trazas existentes que coincidan con el filtro no se agregan de forma retroactiva.</div>

Para añadir una acción de cola de anotación a una Automation Rule:
1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1]
2. Aplique filtros para identificar las trazas que desea enrutar (errores de evaluación, umbrales de latencia, aplicaciones específicas). Consulte [Automation Rules > Supported filter fields][6] para ver lo que está permitido.
3. Haga clic en {{< ui >}}Automate Query{{< /ui >}}
4. Configure la tasa de muestreo (hasta un 5% para las colas de anotación; por ejemplo, el 2% de las trazas coincidentes).
5. En {{< ui >}}Actions{{< /ui >}}, seleccione {{< ui >}}Add to Annotation Queue{{< /ui >}}.
6. Elija la cola de destino.
7. Guarde la regla.

Las trazas que coincidan con los filtros de la regla se añaden a la cola a medida que llegan. Las colas de anotación contienen hasta 1,000 registros; la automatización se pausa cuando la cola alcanza ese límite.

[1]: https://app.datadoghq.com/llm/traces
[5]: /es/llm_observability/configure/automation_rules/
[6]: /es/llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}


## Anotación de trazas {#annotating-traces}

### Acceso a sus colas {#accessing-your-queues}

Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] para ver todas las colas de anotación disponibles. Haga clic en una cola para ver la lista de trazas, luego haga clic en {{< ui >}}Review{{< /ui >}} para comenzar a anotar.

**Nota**: Cuando se le asigna una nueva tarea de anotación, Datadog envía un correo electrónico con el nombre de la cola, el usuario que la asignó y un enlace directo para abrir la interacción asignada. Para optar por no participar, deshabilite los correos electrónicos de asignación de anotaciones de Agent Observability en [Suscripciones de correo electrónico de Configuración personal][15].

El Modo de revisión muestra:
- {{< ui >}}Full trace context{{< /ui >}} (panel derecho):
  - Árbol de tramos completo con entradas, salidas y metadatos
  - Llamadas a herramientas y pasos de razonamiento intermedios
  - Resultados de la evaluación en la traza y en los tramos individuales

- {{< ui >}}Annotation controls{{< /ui >}} (panel izquierdo):
  - Etiquetas configuradas para esta cola
  - Indicador de progreso que muestra la posición en la cola
  - Controles de navegación (Anterior, Siguiente)
  
   {{< img src="llm_observability/evaluations/annotation_queues/review.png" alt="La interfaz de revisión de anotaciones que muestra el panel de anotación a la izquierda y los detalles de la traza a la derecha. El panel izquierdo muestra los controles de etiquetas, incluyendo casillas de verificación de failure_type para alucinación, error_de_formato y rechazo, además de una evaluación de requiere_escalación con botones de Aprobado y Fallido y un botón de Guardar en la parte inferior. El panel derecho muestra los detalles de la traza para citizen_agent con un árbol de tramos, resultados de evaluación y secciones expandibles para Entrada y Salida que muestran datos en formato JSON sobre una consulta de información meteorológica." style="width:100%;" >}}

### Aplicación de etiquetas {#applying-labels}

Para cada traza:
1. **Revise el contexto completo de la traza**: Expanda los tramos según sea necesario para comprender las entradas, salidas, llamadas a herramientas y resultados de evaluación.
2. **Aplique etiquetas**: Complete las etiquetas configuradas según su evaluación.
3. Las anotaciones se guardarán automáticamente.
    
### Mejores prácticas para la anotación {#best-practices-for-annotation}

**Sea consistente**:
- Revise la descripción de la cola y las definiciones de las etiquetas antes de comenzar.
- Cuando varios anotadores trabajen en la misma cola, establezca un entendimiento compartido de los criterios.
- Documente el razonamiento en las notas para casos límite.

**Proporcione razonamiento**:
- Utilice notas de formato libre para documentar por qué aplicó etiquetas específicas.
- Observe los patrones que note en múltiples trazas.
- El razonamiento ayuda a refinar los criterios de evaluación y a comprender los modos de falla.

## Administración de colas {#managing-queues}

### Seguimiento del progreso de la cola {#tracking-queue-progress}

La página de lista de Anotaciones muestra una barra de progreso para cada cola que indica la proporción de interacciones revisadas respecto al total de interacciones. Utilice esto para monitorear el progreso de la anotación en todas las colas de un vistazo.

### Administración del acceso a la cola {#managing-queue-access}

Los propietarios de la cola administran la lista de revisores, la configuración de acceso y las asignaciones desde los detalles de la cola. Solo el propietario de la cola puede cambiar la lista de revisores, la configuración de acceso o las asignaciones.

Las restricciones de acceso se aplican de forma independiente, por lo que puede habilitar una restricción, la otra o ambas:
- La restricción de revisor limita las interacciones no asignadas a los revisores designados.
- La restricción de asignado limita las interacciones asignadas a sus asignados.
- Cuando ambas restricciones están habilitadas, los revisores pueden anotar interacciones no asignadas y los asignados pueden anotar sus interacciones asignadas.

El propietario de la cola conserva el acceso y puede anotar todas las interacciones.

### Filtrado de trazas por etiquetas de anotación {#filtering-traces-by-annotation-labels}

use la faceta {{< ui >}}Annotation Labels{{< /ui >}} para filtrar trazas por etiquetas aplicadas en colas de anotación. Esto le permite:
- Encontrar todas las trazas etiquetadas con un modo de falla específico (por ejemplo, `failure_type: hallucination`)
- Crear muestras específicas para revisión posterior, creación de conjuntos de datos o exportación a CSV para análisis de datos
  
### Edición del esquema de la cola {#editing-queue-schema}

Puede modificar el esquema de etiquetas de una cola después de su creación:
1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Abra la cola.
3. Si el panel Detalles está oculto, haga clic en {{< ui >}}View Details{{< /ui >}}.
4. Haga clic en {{< ui >}}Edit{{< /ui >}}.
5. Agregue, elimine o modifique etiquetas.
6. Haga clic en {{< ui >}}Save Changes{{< /ui >}}.

<div class="alert alert-info">Cambiar el esquema no afecta a las etiquetas ya aplicadas, pero los anotadores verán el esquema actualizado de ahora en adelante.</div>

### Exportación de datos anotados {#exporting-annotated-data}

Exporte trazas anotadas para su análisis o uso en otros flujos de trabajo:

1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Abra la cola.
3. Seleccione trazas (o seleccione todas).
4. Haga clic en {{< ui >}}Export{{< /ui >}}.

El archivo se descarga como `annotations_<queue-id>.csv`. También puede recuperar datos de tramo mediante programación utilizando la [Export API][5].

{{% collapse-content title="Formato CSV" level="h4" expanded=false id="csv-format" %}}

Cada fila representa una interacción anotada. El archivo comienza con estas columnas fijas:

| Columna | Descripción |
|--------|-------------|
| `Content ID` | ID del contenido anotado (por ejemplo, un ID de traza o ID de sesión) |
| `Type` | Tipo de interacción: `trace`, `experiment_trace` o `session` |
| `Input` | Resumen de entrada (vacío para interacciones de sesión) |
| `Output` | Resumen de salida (vacío para interacciones de sesión) |
| `Expected Output` | Solo presente cuando {{< ui >}}Include Expected Output{{< /ui >}} está habilitado; completado solo para trazas de experimento |

Después de las columnas fijas, hay un conjunto de columnas por revisor por etiqueta. Los revisores se ordenan alfabéticamente por nombre de visualización (los espacios se reemplazan con guiones bajos). Las etiquetas siguen el orden definido en el esquema de la cola:

| Columna | Descripción |
|--------|-------------|
| `{reviewer}_{label}` | Valor de la etiqueta (cadena, número, booleano o matriz JSON) |
| `{reviewer}_{label}_assessment` | `pass` o `fail`, si los criterios de evaluación están habilitados para esa etiqueta |
| `{reviewer}_{label}_reasoning` | Razonamiento de texto libre, si el razonamiento está habilitado para esa etiqueta |

Si un revisor no ha anotado una fila determinada, esas celdas están vacías.

**Ejemplo**: una cola con los revisores Alice Johnson y Bob Smith y las etiquetas `quality` (puntuación) y `failure_type` (categórica) produce estos encabezados de columna:

```
Content ID,Type,Input,Output,Alice_Johnson_quality,Alice_Johnson_quality_assessment,Alice_Johnson_quality_reasoning,Alice_Johnson_failure_type,Alice_Johnson_failure_type_assessment,Alice_Johnson_failure_type_reasoning,Bob_Smith_quality,...
```

{{% /collapse-content %}}

#### Recupere tramos por ID de traza o ID de sesión {#retrieve-spans-by-trace-id-or-session-id}

Después de exportar los datos de anotación, utilice la [Export API][5] para recuperar los datos completos de los tramos para las trazas o sesiones en el CSV y únalos con sus etiquetas de anotación.

**Por ID de traza**:

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[trace_id]=<TRACE_ID>"
{{< /code-block >}}

**Por ID de sesión**:

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[query]=@session_id:<SESSION_ID>"
{{< /code-block >}}

### Agregar a conjuntos de datos {#adding-to-datasets}

Transfiera las trazas anotadas a conjuntos de datos para la evaluación de experimentos:

1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Abra la cola.
3. Seleccione las trazas para transferir.
4. Haga clic en {{< ui >}}Add to Dataset{{< /ui >}}.
5. Establezca el {{< ui >}}expected output{{< /ui >}} del conjunto de datos:
   - {{< ui >}}From interaction{{< /ui >}}: utilice la salida real de cada traza. Para las trazas de experimentos, también puede elegir {{< ui >}}Expected output{{< /ui >}} para utilizar la salida esperada original del conjunto de datos fuente del experimento.
   - {{< ui >}}From annotation label{{< /ui >}}: utilice los valores que aplicaron los anotadores. Elija una o más etiquetas. El `expected_output` del registro se crea a partir de su selección.
6. Elija un conjunto de datos existente o cree uno.

Cuando la **salida esperada** se construye a partir de etiquetas de anotación, el valor exportado es un objeto JSON con claves basadas en el nombre de la etiqueta, por ejemplo `{ "is_harmful": false, "tone": ["neutral"], "topics": ["safety", "policy"] }`. La misma forma se aplica tanto si selecciona una etiqueta como si selecciona varias. Las etiquetas categóricas siempre se exportan como matrices de opciones seleccionadas, independientemente de si la etiqueta es de selección única o múltiple.

{{% collapse-content title="Cómo se agregan los valores de anotación entre los anotadores" level="h4" expanded=false id="annotation-aggregation" %}}

Cuando varios anotadores han anotado la misma traza, el valor de cada etiqueta se agrega entre ellos por consenso:

| Tipo de etiqueta   | Agregación                                                                |
| ------------ | -------------------------------------------------------------------------- |
| Booleano      | Voto mayoritario (los empates se resuelven a favor de `true`)                              |
| Categórico  | Intersección: el conjunto ordenado de opciones que todos los anotadores seleccionaron      |
| Puntaje        | Promedio                                                                    |
| Texto         | Lista de respuestas                                                          |

Para etiquetas categóricas (selección única o múltiple), el valor agregado es la matriz ordenada de opciones que *todos* los anotadores seleccionaron. Si la selección de algún anotador difiere, el valor es una matriz vacía. El resultado siempre es una matriz, incluso cuando solo un anotador ha anotado la traza.

**Ejemplo: categórico (consenso).** Tres anotadores califican `tone` y todos están de acuerdo:

- Anotador A: `polite`
- Anotador B: `polite`
- Anotador C: `polite`

Agregado: `["polite"]`.

**Ejemplo: categórico (desacuerdo).** Tres anotadores califican `tone` y uno difiere:

- Anotador A: `polite`
- Anotador B: `rude`
- Anotador C: `polite`

Agregado: `[]`. La intersección está vacía porque `rude` no está en el conjunto de cada anotador.

**Ejemplo: categórico (selección múltiple).** Tres anotadores etiquetan `topics` (cada uno puede elegir múltiples opciones):

- Anotador A: `["safety", "policy"]`
- Anotador B: `["safety", "billing"]`
- Anotador C: `["safety", "policy"]`

Agregado: `["safety"]`. Solo `safety` aparece en el conjunto de cada anotador; `policy` falta en la selección de B y `billing` falta en las de A y C.

**Ejemplo: texto.** Dos anotadores dejan notas:

- Anotador A: `"Confusing phrasing"`
- Anotador B: `"Tone too casual"`

Agregado: `["Confusing phrasing", "Tone too casual"]`. El valor de cada anotador se conserva.

Los valores sin procesar por anotador se conservan en los metadatos de cada registro, junto con la identidad del anotador. Si el consenso predeterminado no se ajusta a su flujo de trabajo, puede volver a calcularlo con una estrategia diferente (por ejemplo, mediana, voto ponderado o selección del revisor).

{{% /collapse-content %}}

Las etiquetas que no se seleccionan como resultado esperado también se incluyen con cada traza como metadatos.

Consulte [Datasets][3] para obtener más información sobre el uso de conjuntos de datos en experimentos.

### Eliminando colas {#deleting-queues}

Para eliminar una cola:
1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Abra la cola.
3. Haga clic en {{< ui >}}Delete{{< /ui >}} en el panel Detalles.

<div class="alert alert-info">Eliminar una cola elimina la cola y las asociaciones de etiquetas, pero no elimina las trazas subyacentes de Agent Observability. Las trazas permanecen accesibles en Trace Explorer.</div>

## Uso de la API {#using-the-api}

Puede administrar las colas de anotación mediante programación. Los siguientes puntos de conexión están disponibles en la [referencia de la API de Agent Observability][4]:

| Punto de conexión | Descripción |
|----------|-------------|
| [Listar colas de anotación][6] | Liste todas las colas de anotación en su organización. |
| [Crear una cola de anotación][7] | Cree una cola de anotación. `name` y `project_id` son obligatorios. Incluya un `annotation_schema` opcional para definir etiquetas al momento de la creación. |
| [Actualizar una cola de anotación][8] | Actualice parcialmente el `name`, `description` o `annotation_schema` de una cola. |
| [Eliminar una cola de anotación][9] | Elimine una cola de anotación por ID. |
| [Agregar interacciones a una cola][10] | Agregue una o más trazas a una cola de anotación para su revisión. |
| [Eliminar interacciones de una cola][11] | Elimine interacciones específicas de una cola por ID de interacción. |
| [Obtener interacciones anotadas][12] | Recupere todas las interacciones y sus etiquetas de anotación aplicadas para una cola. |
| [Obtener esquema de etiquetas][13] | Recupere el esquema de etiquetas configurado para una cola. |
| [Actualizar esquema de etiquetas][14] | Cree o reemplace el esquema de etiquetas para una cola. |

## Retención de datos {#data-retention}


| Datos              | Período de retención                                    |
| ----------------- | ----------------------------------------------------|
| Trazas en colas  | Limitado por el período de retención de trazas de su organización|
| Etiquetas de anotación | Indefinido                                          |


## Flujos de trabajo de ejemplo {#example-workflows}

{{% collapse-content title="Análisis de errores y descubrimiento de modos de falla" level="h3" expanded=true id="example-error-analysis-and-failure-mode-discovery" %}}
Revise las trazas fallidas para identificar patrones recurrentes y categorizar cómo falla su aplicación en producción.

1. Filtre las trazas en Trace Explorer para evaluaciones fallidas o patrones de error específicos
2. Seleccione manualmente las trazas y agréguelas a una cola de anotación
3. Los anotadores revisan las trazas y documentan los tipos de falla en notas de formato libre
4. Surgen patrones comunes: alucinaciones en contextos específicos, problemas de formato, rechazos inapropiados
5. Cree etiquetas categóricas para los modos de falla identificados y vuelva a codificar las trazas
6. Utilice la distribución de modos de falla para priorizar las correcciones

#### Configuración de cola {#queue-configuration}

- **Etiquetas**: Notas de formato libre, etiqueta `failure_type` categórica, calificación de aprobado/reprobado
- **Anotadores**: Gerentes de producto, ingenieros, expertos en el dominio

{{% /collapse-content %}}

{{% collapse-content title="Validación de evaluaciones de LLM-as-a-judge" level="h3" expanded=true id="example-validating-llm-as-a-judge-evaluations" %}}

Encuentre las trazas donde los evaluadores automatizados puedan ser inciertos o incorrectos, luego haga que los humanos proporcionen la verdad de referencia.

1. Muestree resultados de evaluación: todos los resultados, o una puntuación/umbral determinado
2. Agregue las trazas seleccionadas a una cola de anotación
3. Los anotadores revisan las trazas y proporcionan puntuaciones humanas para los mismos criterios
4. Compare las etiquetas humanas con las puntuaciones de evaluación automatizadas
5. Identifique desacuerdos sistemáticos (juez demasiado estricto, demasiado indulgente o que malinterpreta los criterios)
6. Refine los prompts de evaluación basándose en los desacuerdos

#### Configuración de cola {#queue-configuration-1}

- **Etiquetas**: Puntuaciones numéricas que coinciden con los criterios de evaluación (0-10), etiqueta categórica `judge_accuracy`, notas de razonamiento
- **Anotadores**: Expertos en la materia que comprenden los criterios de evaluación

{{% /collapse-content %}}

{{% collapse-content title="Creación de conjuntos de datos de referencia" level="h3" expanded=true id="example-golden-dataset-creation" %}}

Cree conjuntos de datos de referencia con etiquetas verificadas por humanos para pruebas de regresión y validación continua.

1. Muestree diversas trazas de producción de Trace Explorer (ejemplos buenos y malos)
2. Agregue trazas a la cola de anotación
3. Los anotadores revisan y etiquetan las trazas en múltiples dimensiones de calidad
4. Agregue ejemplos bien etiquetados y de alta confianza al conjunto de datos de referencia
5. Utilice el conjunto de datos para pruebas de regresión de CI/CD de cambios en los prompts
6. Amplíe continuamente el conjunto de datos con nuevos casos extremos

#### Configuración de cola {#queue-configuration-2}

- **Etiquetas**: Múltiples etiquetas categóricas que cubren dimensiones de calidad, puntuaciones numéricas, calificación de aprobado/reprobado, notas
- **Anotadores**: Equipo de expertos en el dominio para la consistencia
{{% /collapse-content %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/annotations/queues
[3]: /es/llm_observability/improve/datasets
[4]: /es/api/latest/agent-observability/
[5]: /es/llm_observability/investigate/export_api/?tab=model#api-standards
[6]: /es/api/latest/agent-observability/#list-agent-observability-annotation-queues
[7]: /es/api/latest/agent-observability/#create-an-agent-observability-annotation-queue
[8]: /es/api/latest/agent-observability/#update-an-agent-observability-annotation-queue
[9]: /es/api/latest/agent-observability/#delete-an-agent-observability-annotation-queue
[10]: /es/api/latest/agent-observability/#add-annotation-queue-interactions
[11]: /es/api/latest/agent-observability/#delete-annotation-queue-interactions
[12]: /es/api/latest/agent-observability/#get-annotated-queue-interactions
[13]: /es/api/latest/agent-observability/#get-annotation-queue-label-schema
[14]: /es/api/latest/agent-observability/#update-annotation-queue-label-schema
[15]: /es/account_management/#email-subscriptions