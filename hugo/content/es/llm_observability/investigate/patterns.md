---
aliases:
- /es/llm_observability/cluster_map
- /es/llm_observability/monitoring/cluster_map
- /es/llm_observability/investigate/cluster_map
- /es/llm_observability/monitoring/patterns/
description: Descubra y analice los patrones de tráfico de producción en su agente
  con la agrupación automática de temas.
further_reading:
- link: /llm_observability/
  tag: Documentación
  text: Obtenga información sobre Agent Observability
- link: /llm_observability/quickstart/terms/
  tag: Documentación
  text: Obtenga información sobre los términos y conceptos clave de Agent Observability
- link: /llm_observability/improve/datasets
  tag: Documentación
  text: Obtenga información sobre los Conjuntos de datos
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: Centro de aprendizaje
  text: Seguimiento de aplicaciones de LLM
- link: https://www.datadoghq.com/blog/patterns-agent-observability/
  tag: Blog
  text: Comprenda el comportamiento de LLM en producción con Patterns en Agent Observability
title: Patterns
---
## Descripción general {#overview}

Patterns agrupa automáticamente el tráfico de producción de su aplicación de LLM en temas significativos, lo que le ayuda a comprender lo que preguntan los usuarios, identificar brechas de cobertura y diagnosticar modos de falla.

Puede crear múltiples Patterns con nombre, cada uno limitado a una aplicación, tipo de span o caso de uso diferente.

## Cómo funciona {#how-it-works}

Patterns utiliza una combinación de llamadas a su [cuenta de proveedor de LLM conectada][1] e incrustaciones de texto para brindarle una vista interpretable del comportamiento de producción sin etiquetado manual.

Cuando ejecuta un Pattern, este:

1. Extrae las interacciones de LLM de su tráfico de producción según su configuración de filtro y muestreo
2. Resume cada interacción con texto generado por IA
3. Calcula la incrustación de texto de estos resúmenes utilizando un modelo de código abierto autoalojado
4. Forma clústeres utilizando aprendizaje automático (UMAP y HDBSCAN)
5. Revisa cada clúster y genera temas significativos con texto generado por IA
6. Asigna cada interacción a un solo tema
7. Crea una jerarquía utilizando IA al agrupar temas similares

Cada tema muestra su volumen de interacción y su parte del tráfico total. Las interacciones que no encajan en ningún clúster se recopilan en un grupo de Valores atípicos.

## Configure un Pattern {#set-up-a-pattern}

1. En Datadog, navegue a **AI Observability** > **Agent Observability** > [**Patterns**][4].
1. Haga clic en **+ New Pattern**.
1. Ingrese un **Name**.
1. Use el selector múltiple **Application** para elegir una o más aplicaciones LLM para incluir los tramos. Seleccionar aplicaciones actualiza automáticamente la consulta de filtro de tramo subyacente, y editar la consulta actualiza las aplicaciones seleccionadas.
1. En **Configuración**:
  1. Seleccione qué analizar**** con Patterns, **Spans** individuales o **trazas**.
  1. (Opcional) Escriba una breve **instrucción** para agrupar que ofrezca una guía libre sobre cómo Patterns debe agrupar las interacciones y generar temas, como la intención del usuario, la tarea del Agent o el producto utilizado. Por ejemplo, para agrupar según la intención del usuario, puede escribir "Agrupar según la intención del usuario". Cambiar este campo después de una primera ejecución exitosa **eliminará los temas encontrados y persistidos** en ejecuciones anteriores de Patterns. Deje esto en blanco para agrupar las interacciones por el objetivo principal de cada interacción.
  1. Seleccione las variables de su interacción sobre las que desea que **Patterns agrupe**. Use `{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `{{meta.span.kind}}` para analizar por tipo de tramo.
  1. Agregue filtros precisos**** para seleccionar mejor las interacciones que desea agrupar con Patterns.
  1. Establezca el **Time window** para definir el período de retrospectiva para las interacciones a analizar.
  1. **Muestreo** de las interacciones coincidentes es accesible haciendo clic en el botón **Cambiar**. Está limitado a 10 000 spans y 5 000 trazas. Si su filtro coincide con más que eso, Agent Observability muestrea aleatoriamente las interacciones hasta alcanzar ese número. 
  1. Haga clic en **Select a model**. Se abre la ventana de configuración del modelo, donde puede agregar detalles que Agent Observability utiliza para generar nombres de temas, resúmenes, jerarquía de temas y para atribuir cada interacción a un tema:
    - **LLM Provider**: Los proveedores admitidos son OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI y Vertex AI.
    - **Account**
    - **Modelo**: Prefiera usar modelos recomendados etiquetados, para requisitos de rendimiento y costos.
    Haga clic en **Confirmar** para guardar sus cambios y cerrar la ventana.
1. (Opcional) En **Datasets**:
  1. Active el botón de opción para comparar su tráfico de producción con sus conjuntos de datos de evaluación fuera de línea.
  1. Use el selector de **Datasets** para seleccionar el o los conjuntos de datos que usa para evaluar su AI Agent offline.
  1. (Opcional) Habilite el botón de opción **Curación automática** para completar automáticamente las brechas de cobertura que detecte Patterns. Cuando está activado, Datadog crea un proyecto administrado (`Patterns-coverage`) y un conjunto de datos por patrón (`{pattern-name}-pattern-curated`) para recibir las interacciones sugeridas después de cada ejecución. El interruptor está **activado** de forma predeterminada para los nuevos Patterns. 
1. En **Horario**, elija con qué frecuencia se ejecuta el Pattern. Las horas programadas utilizan su preferencia de zona horaria de Datadog. Las ejecuciones programadas utilizan la misma pipeline que una ejecución manual, por lo que los resultados aparecen en el mismo lugar y la página Patterns siempre muestra su ejecución más reciente.
   - **Diariamente**, **Días de semana** o **Semanalmente (predeterminado)**: Ejecute automáticamente en el momento (y, para semanalmente, el día) que elija.
   - **Bajo demanda**: Ejecute el Pattern manualmente.
   - **Personalizado**: Ejecute automáticamente cada 1 a 7 días.
1. En **Notifications** Ingrese los correos y/o las Integrations de mensajería externa que habilitó en Datadog (consulte [**Integrations**][5] para habilitar Integrations en Datadog) para recibir notificaciones cuando los resultados del Pattern estén disponibles.
1. Haga clic en **Create and Run Pattern**, o en **Create Pattern** para crearlo sin ejecutarlo.

## Explore your Patterns {#explore-your-patterns}

Utilice el menú desplegable en el encabezado para cambiar entre sus Patterns nombrados. Cada Pattern muestra los resultados de su ejecución más reciente.

### Lea las métricas de resumen {#read-the-summary-metrics}

La parte superior de la página de Patterns muestra tres métricas de su ejecución más reciente:
- {{< ui >}}Total interactions{{< /ui >}}: Cuántas interacciones se analizaron
- {{< ui >}}Identified topics{{< /ui >}}: El número total de temas distintos encontrados, incluidos los temas principales y secundarios
- {{< ui >}}Classified{{< /ui >}}: El porcentaje de interacciones analizadas asignadas a un tema nombrado — las interacciones en Outliers cuentan como no clasificadas

### Visualice patrones por dimensión {#visualize-patterns-by-dimension}

Sobre la tabla de temas, un gráfico de dispersión compara sus patrones entre sí. Cada burbuja representa un tema, con el eje Y mostrando el número de interacciones y el eje X mostrando la métrica seleccionada en el menú desplegable Dimension (por ejemplo, errores totales). Utilice este gráfico para detectar outliers: temas con tasas de error o latencia inesperadamente altas en relación con su volumen.

{{< img src="llm_observability/patterns_landing_page.png" alt="La página Patterns que muestra un gráfico de burbujas con una burbuja por tema. El eje Y muestra el recuento de interacciones y el eje X muestra la dimensión métrica seleccionada." style="width:100%;" >}}

### Navegue por la lista de temas {#navigate-the-topic-list}

La tabla de temas proporciona una visualización jerárquica de todos los temas descubiertos. Cada tema muestra:

- {{< ui >}}Pattern{{< /ui >}} — nombre y descripción generados automáticamente según las interacciones en el clúster
- {{< ui >}}Interactions{{< /ui >}} — recuento y porcentaje del tráfico total
- {{< ui >}}Cost{{< /ui >}} — costo estimado de LLM para las interacciones en este tema
- {{< ui >}}Tokens{{< /ui >}} — uso de tokens para las interacciones en este tema
- {{< ui >}}Errors{{< /ui >}} — recuento y tasa de errores
- {{< ui >}}Latency{{< /ui >}} — latencia mediana para las interacciones en este tema
- {{< ui >}}Evaluations{{< /ui >}} — resultados de evaluación si los evaluadores en línea están configurados
 

Expanda los temas principales para ver sus subtemas y examinar áreas específicas del tráfico de su aplicación.

### Profundice en un tema {#drill-into-a-topic}

Haga clic en cualquier nombre de tema para abrir su visualización de detalles. Utilice las rutas de navegación o haga clic en un nodo en el {{< ui >}}Topic Map{{< /ui >}} para navegar por la jerarquía de temas. El mapa resalta la rama seleccionada y muestra el recuento de interacciones de cada tema y, cuando está disponible, el cambio de tráfico desde la ejecución anterior.

{{< img src="llm_observability/patterns_topic_details.png" alt="La visualización de detalles del tema que muestra un resumen del patrón y un mapa interactivo de temas con recuentos de interacciones y cambios de tráfico." style="width:100%;" >}}

La visualización de detalles incluye:

- {{< ui >}}Pattern Summary{{< /ui >}}: Resalta las tendencias de tráfico, el estado de la evaluación en línea, los valores atípicos operativos, las brechas de cobertura del conjunto de datos y los siguientes pasos recomendados.
- {{< ui >}}Scorecard{{< /ui >}}: Resume el volumen y la participación del tráfico, el costo, la tasa de error, la latencia mediana y la cobertura del conjunto de datos.
- {{< ui >}}Dataset Coverage Detail{{< /ui >}}: Muestra el estado de cobertura y la atribución por conjunto de datos. Revise los casos recomendados para cerrar las brechas de cobertura o abra el conjunto de datos administrado cuando la curación automática de conjuntos de datos esté habilitada.
- {{< ui >}}Evaluations{{< /ui >}}: Resume cada evaluador en línea con su resultado clave y un gráfico a lo largo del tiempo. Abra los spans coincidentes para investigar resultados específicos.
- {{< ui >}}Interactions{{< /ui >}}: Enumera las entradas y salidas asignadas al tema, junto con su subtema, marca de tiempo, estado de recomendación y resultados de evaluación. Filtre con una consulta de texto completo o de faceta, configure las columnas de evaluación o haga clic en una fila para abrir los detalles de su traza.

{{< img src="llm_observability/patterns_topic_details_scorecard.png" alt="La visualización de detalles del tema que muestra el cuadro de mando, los detalles de cobertura del conjunto de datos y la tabla de interacciones." style="width:100%;" >}}

### Exporte y actúe sobre las interacciones {#export-and-act-on-interactions}
Seleccione una o más filas en la tabla de interacciones para actuar sobre esas interacciones:

- **Descargar como CSV:** Exporte las interacciones como un archivo CSV.
- **Agregar al Dataset:** Envíe las interacciones a un [Dataset][2] para crear pruebas de evaluación a partir del tráfico de producción real.
- **Agregar a la cola:** Envíe las interacciones a una [Annotation Queue][3] para revisión y etiquetado humano.

## Inicie una nueva ejecución {#trigger-a-new-run}

Para analizar su tráfico de producción, haga clic en {{< ui >}}Run analysis{{< /ui >}} en el encabezado de Patterns. La canalización se ejecuta en segundo plano y muestra sus pasos completados, en ejecución y pendientes. Una ejecución tarda alrededor de 5 a 10 minutos. Haga clic en **Notificarme** para recibir una notificación por correo electrónico una vez que la canalización haya terminado. Puede cerrar la página y regresar más tarde; el encabezado muestra la fecha de la última ejecución y el período de retrospectiva cuando se completa la ejecución.

Si una ejecución falla, un modal explica la causa y qué acción tomar. La página continúa mostrando los resultados de la ejecución exitosa más reciente mientras que la ejecución fallida se muestra en el encabezado.

## Use temas para mejorar su aplicación {#use-topics-to-improve-your-application}

### Entienda su tráfico de producción {#understand-your-production-traffic}

Utilice la lista de temas para ver lo que los usuarios están haciendo realmente con su aplicación.

Use el porcentaje de tráfico para identificar sus casos de uso más comunes. La jerarquía de padre-hijo le ayuda a pasar de un patrón de alto nivel a los subpatrones específicos que se encuentran debajo.

### Encuentre brechas de cobertura de evaluación {#find-evaluation-coverage-gaps}

Compare su distribución de temas con lo que sus conjuntos de datos dorados cubren realmente. Busque temas que representen un alto volumen de producción pero que no tengan casos de prueba de evaluación correspondientes: aquí es donde su cobertura de prueba tiene brechas y donde es menos probable que las regresiones del modelo se detecten antes de que lleguen a los usuarios.

### Curar automáticamente conjuntos de datos de evaluación {#automatically-curate-evaluation-datasets}

Cuando la curación automática de conjuntos de datos está habilitada, cada ejecución de Patterns agrega interacciones sugeridas para temas con poca cobertura directamente en un conjunto de datos administrado (`{pattern-name}-pattern-curated` dentro del proyecto `Patterns-coverage`). Después de que se complete una ejecución, abra la visualización detallada de un tema y haga clic en **Acceder al conjunto de datos** para revisar los registros curados y utilizarlos como casos de prueba de evaluación.

### Diagnosticar patrones de falla {#diagnose-failure-patterns}

Ajuste el filtro de su patrón al contexto de los spans con puntajes de calidad deficientes o evaluaciones fallidas, luego ejecute el análisis. La taxonomía de temas resultante muestra qué tipos de solicitudes están fallando más, brindándole una forma estructurada de priorizar las correcciones en lugar de depurar traza por traza.

### Rastrear cómo evoluciona el tráfico {#track-how-traffic-evolves}

Vuelva a ejecutar su Pattern periódicamente y utilice el menú desplegable {{< ui >}}Compare to{{< /ui >}} para comparar las distribuciones de temas entre ejecuciones. Cuando un tema marcado como {{< ui >}}NEW{{< /ui >}} aparece cerca de la parte superior, eso indica que sus usuarios han encontrado una nueva incidencia de uso o un nuevo modo de falla.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account/
[2]: /es/llm_observability/improve/datasets/
[3]: /es/llm_observability/investigate/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns
[5]: /es/integrations/#cat-notifications