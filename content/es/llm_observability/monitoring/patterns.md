---
aliases:
- /es/llm_observability/cluster_map
- /es/llm_observability/monitoring/cluster_map
description: Descubra y analice los patrones de tráfico de producción en su agent
  con el clúster automático de temas.
further_reading:
- link: /llm_observability/
  tag: Documentación
  text: Obtenga información sobre Agent Observability
- link: /llm_observability/terms/
  tag: Documentación
  text: Obtenga información sobre los términos y conceptos clave de Agent Observability
- link: /llm_observability/experiments/datasets
  tag: Documentación
  text: Obtenga información sobre Datasets
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: Centro de aprendizaje
  text: Seguimiento de aplicaciones de LLM
title: Patterns
---
## Descripción general {#overview}

Patterns agrupa automáticamente el tráfico de producción de su aplicación de LLM en temas significativos, lo que le ayuda a comprender lo que preguntan los usuarios, identificar brechas de cobertura y diagnosticar modos de falla.

Puede crear múltiples Patterns con nombre, cada uno limitado a una aplicación, tipo de span o caso de uso diferente.

## Cómo funciona {#how-it-works}

Patterns utiliza una combinación de llamadas a su [cuenta de proveedor de LLM conectada][1] y embeddings de texto para brindarle una vista interpretable del comportamiento de producción sin etiquetado manual.

Cuando ejecuta un Pattern, este:

1. Extrae interacciones de LLM de su tráfico de producción según su configuración de filtro y muestreo
2. Resume cada interacción con texto generado por IA
3. Calcula el embedding de texto de estos resúmenes utilizando un modelo de código abierto autohospedado
4. Forma clústeres utilizando aprendizaje automático (UMAP y HDBSCAN)
5. Revisa cada clúster y genera temas significativos con texto generado por IA
6. Atribuye cada interacción a un solo tema
7. Crea una jerarquía utilizando IA al agrupar temas similares.

Cada tema muestra su volumen de interacción y su participación en el tráfico total. Las interacciones que no encajan en ningún clúster se recopilan en un grupo de valores anómalos.

## Configurar un Pattern {#set-up-a-pattern}

1. En Datadog, navegue a **AI Observability** > **Agent Observability** > [**Patterns**][4].
1. Haga clic en **+ New Pattern**.
1. Ingrese un **Name**.
1. Haga clic en **Select a model**. Se abre la ventana de configuración del Model, donde puede agregar detalles que Agent Observability utiliza para generar nombres de temas, resúmenes, jerarquía de temas y para atribuir cada interacción a un tema:
   - **LLM Provider**: Los proveedores admitidos son OpenAI, Amazon Bedrock y Azure OpenAI
   - **Account**
   - **Model**
1. Haga clic en **Confirm** para guardar sus cambios y cerrar la ventana.
1. Under **Runs on**:
   1. Utilice el selector múltiple **Application** para elegir una o más aplicaciones de LLM para incluir tramos. Seleccionar aplicaciones actualiza automáticamente la consulta de filtro de tramo subyacente, y editar la consulta actualiza las aplicaciones seleccionadas. Para un alcance más preciso, haga clic en el icono de filtro junto al selector para abrir la ventana emergente **Avanzado**, que muestra:
      - **¿Qué tramos desea clústerizar?:** La consulta de filtro de tramo sin procesar para definir el alcance por entorno, tipo de tramo u otras etiquetas.
      - **Ventana de tiempo:** El período de retrospectiva para analizar las interacciones.
   1. Establezca la **Sampling Rate**: el porcentaje de interacciones coincidentes que se incluirán. Patterns procesa hasta 10,000 registros por ejecución; si su filtro coincide con más que eso, Agent Observability muestrea registros aleatoriamente hasta alcanzar ese número.
1. En **¿Sobre qué debemos detectar Patterns?**, ingrese una plantilla que defina lo que se envía al modelo para su análisis. Utilice `{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `{{meta.span.kind}}` para analizar por tipo de tramo. Haga clic en {{< ui >}}Template Examples{{< /ui >}} para ver configuraciones comunes. A medida que escribe, el panel derecho muestra una vista previa de los tramos coincidentes y muestra qué porcentaje de interacciones tienen valores para las variables a las que ha hecho referencia.
1. En **¿Con qué frecuencia debemos ejecutar Patterns?**, elija cómo se ejecuta el Pattern. Las horas programadas utilizan su preferencia de zona horaria de Datadog. Las ejecuciones programadas utilizan la misma pipeline que una ejecución manual, por lo que los resultados aparecen en el mismo lugar y la página Patterns siempre muestra su ejecución más reciente.
   - **On demand** (default): ejecute el Pattern manualmente.
   - **Daily**, **Weekdays** o **Weekly**: ejecute automáticamente a la hora (y, para Weekly, el día) que elija.
   - **Custom**: ejecute automáticamente cada 1 a 7 días.
1. Haga clic en **Create and Run Pattern** o en **Create Pattern** para crearlo sin ejecutarlo.

## Explore sus Patterns {#explore-your-patterns}

Utilice el menú desplegable en el encabezado para cambiar entre sus Patterns con nombre. Cada Pattern muestra los resultados de su ejecución más reciente.

### Lea las métricas de resumen {#read-the-summary-metrics}

La parte superior de la página Patterns muestra tres métricas de su ejecución más reciente:
- {{< ui >}}Total interactions{{< /ui >}}: Cuántas interacciones fueron analizadas
- {{< ui >}}Identified topics{{< /ui >}}: El número total de temas distintos encontrados, incluyendo temas principales y secundarios
- {{< ui >}}Classified{{< /ui >}}: El porcentaje de interacciones analizadas asignadas a un tema nombrado — las interacciones en el grupo de valores anómalos cuentan como no clasificadas

### Visualice Patterns por dimensión {#visualize-patterns-by-dimension}

Encima de la tabla de temas, un gráfico de dispersión compara sus patrones entre sí. Cada burbuja representa un tema, con el eje Y mostrando el número de interacciones y el eje X mostrando la métrica seleccionada en el menú desplegable Dimension (por ejemplo, errores totales). Utilice este gráfico para detectar valores anómalos — temas con tasas de error o latencia inesperadamente altas en relación con su volumen.

{{< img src="llm_observability/patterns_landing_page.png" alt="La página Patterns muestra un gráfico de burbujas con una burbuja por tema. El eje Y muestra el recuento de interacciones y el eje X muestra la dimensión de métrica seleccionada." style="width:100%;" >}}

### Navegue por la lista principal {#navigate-the-topic-list}

La tabla de temas proporciona una vista jerárquica de todos los temas descubiertos. Cada tema muestra:

- {{< ui >}}Pattern{{< /ui >}} — nombre y descripción generados automáticamente según las interacciones en el clúster
- {{< ui >}}Interactions{{< /ui >}} — recuento y porcentaje del tráfico total
- {{< ui >}}Cost{{< /ui >}} — costo estimado de LLM para las interacciones en este tema
- {{< ui >}}Tokens{{< /ui >}} — uso de tokens para las interacciones en este tema
- {{< ui >}}Errors{{< /ui >}} — recuento y tasa de errores
- {{< ui >}}Latency{{< /ui >}} — latencia mediana para las interacciones en este tema
- {{< ui >}}Online Evals{{< /ui >}} — resultados de evaluación si las evaluaciones en línea están configuradas
 

Expanda los temas principales para ver sus subtemas y examinar áreas específicas del tráfico de su aplicación.

### Profundice en un tema {#drill-into-a-topic}

Haga clic en cualquier nombre de tema para abrir la vista detallada. La vista detallada muestra un resumen de lo que representa el tema, el recuento total de interacciones y una tabla de interacciones con la etiqueta del tema secundario, el texto de entrada y la marca de tiempo para cada interacción. Busque en la tabla por palabra clave para encontrar ejemplos específicos.


{{< img src="llm_observability/patterns_topic_details.png" alt="La vista detallada del tema que muestra un resumen del tema, el recuento total de interacciones y una tabla de interacciones con la etiqueta del tema secundario, el texto de entrada y la marca de tiempo." style="width:100%;" >}}

### Exporte y actúe sobre las interacciones {#export-and-act-on-interactions}
Desde la tabla de interacciones dentro de la vista detallada de un tema, puede actuar sobre las interacciones en ese clúster:

- **Descargar como CSV:** Exporte las interacciones como un archivo CSV.
- **Add to Dataset:** Envíe las interacciones a un [Dataset][2] para crear casos de prueba de evaluación a partir del tráfico de producción real.
- **Agregar a la cola:** Envíe las interacciones a una [Annotation Queue][3] para su revisión y etiquetado por parte de humanos.

## Iniciar una nueva ejecución {#trigger-a-new-run}

Para analizar su tráfico de producción, haga clic en {{< ui >}}Run analysis{{< /ui >}} en el encabezado de Patterns. La pipeline se ejecuta en segundo plano y tarda de 5 a 10 minutos. Puede cerrar la página y volver más tarde; el encabezado muestra la fecha de la última ejecución y el período de retrospectiva cuando se completa la ejecución.

Si una ejecución falla, un modal explica la causa y qué medidas tomar. La página continúa mostrando los resultados de la ejecución exitosa más reciente mientras que la ejecución fallida se muestra en el encabezado.

## Utilice los temas para mejorar su aplicación {#use-topics-to-improve-your-application}

### Comprenda su tráfico de producción {#understand-your-production-traffic}

Utilice la lista principal para ver lo que los usuarios están haciendo realmente con su aplicación.

Utilice el porcentaje de tráfico para identificar sus casos de uso más comunes. La jerarquía de padre-hijo le ayuda a pasar de un Pattern de alto nivel a los sub-Patterns específicos que se encuentran debajo.

### Encuentre brechas de cobertura de evaluación{#find-evaluation-coverage-gaps}

Compare su distribución de temas con lo que cubren realmente sus golden datasets. Observe los temas que representan un alto volumen de producción pero que no tienen casos de evaluación correspondientes: aquí es donde su cobertura de prueba tiene brechas, y donde es menos probable que las regresiones del modelo se detecten antes de que lleguen a los usuarios.

### Diagnostique patrones de falla{#diagnose-failure-patterns}

Limite el filtro de su patrón a tramos con puntajes de calidad deficientes o evaluaciones fallidas, luego ejecute el análisis. La taxonomía de temas resultante muestra qué tipos de solicitudes están fallando más, brindándole una forma estructurada de priorizar las correcciones en lugar de depurar traza por traza.

### Rastree cómo evoluciona el tráfico{#track-how-traffic-evolves}

Vuelva a ejecutar su patrón periódicamente y utilice el {{< ui >}}Compare to{{< /ui >}} menú desplegable para comparar las distribuciones de temas entre ejecuciones. Cuando un tema marcado como {{< ui >}}NEW{{< /ui >}} aparece cerca de la parte superior, eso indica que sus usuarios han encontrado un nuevo caso de uso o un nuevo modo de falla.

## Lecturas adicionales{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
[2]: /es/llm_observability/experiments/datasets/
[3]: /es/llm_observability/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns