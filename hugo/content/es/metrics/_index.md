---
aliases:
- /es/graphing/metrics/
- /es/metrics/introduction/
- /es/graphing/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
- /es/dashboards/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
cascade:
  algolia:
    rank: 70
    tags:
    - submit metrics
    - metrics submission
title: Métricas
---
{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explora y regístrate para las sesiones de habilitación de Foundation para métricas personalizadas. Aprende cómo las métricas personalizadas te ayudan a rastrear los KPI de tu aplicación, como el número de visitantes, el tamaño promedio del carrito de compras, la latencia de las solicitudes o la distribución del rendimiento para un algoritmo personalizado.
{{< /learning-center-callout >}}

Esta es una introducción a las métricas en Datadog y por qué son útiles. Esta sección incluye los siguientes temas: 

{{< whatsnext desc="Envía métricas a Datadog" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>Envía Métricas Personalizadas</u> - Aprende qué son las métricas personalizadas y cómo enviarlas.{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/reference/otel_metrics" >}}<u>Envía Métricas de OpenTelemetry</u> - Configura el Agente de Datadog o el Colector de OpenTelemetry.{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>Tipos de Métricas</u> - Tipos de métricas que se pueden enviar a Datadog.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métricas de Distribución</u> - Aprende sobre las métricas de distribución y los percentiles globalmente precisos.{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>Unidades de Métricas</u> - Aprende sobre las unidades que se pueden asociar con las métricas.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Visualiza y consulta tus métricas" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Explorador de Métricas</u> - Explora todas tus métricas y realiza análisis.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Resumen de Métricas</u> - Comprende tus métricas de Datadog que están reportando activamente.{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrado Avanzado</u> - Filtra tus datos para reducir el alcance de las métricas devueltas.{{< /nextlink >}}
    {{< nextlink href="/metrics/nested_queries" >}}<u>Consultas Anidadas</u> - Aplica capas adicionales de agregación para desbloquear capacidades de consulta avanzadas.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Comprende y gestiona los volúmenes y costos de tus métricas personalizadas" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Métricas sin Límites™</u> - Aprende cómo controlar los volúmenes de métricas personalizadas con configuraciones de etiquetas utilizando Métricas sin Límites™.{{< /nextlink >}}
{{< /whatsnext >}}

## Descripción general {#overview}
### ¿Qué son las métricas? {#what-are-metrics}

Las métricas son valores numéricos que pueden rastrear cualquier aspecto de tu entorno a lo largo del tiempo, desde la latencia hasta las tasas de error y los registros de usuarios.

En Datadog, los datos de métricas se ingieren y almacenan como puntos de datos con un valor y una marca de tiempo:

```text
[ 17.82,  22:11:01 ]
```

Una secuencia de puntos de datos se almacena como una serie temporal:

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

Cualquier métrica con marcas de tiempo en fracciones de segundo se redondea al segundo más cercano. Si hay puntos con la misma marca de tiempo, el punto más reciente sobrescribe los anteriores.

### ¿Por qué son útiles las métricas? {#why-are-metrics-useful}

Las métricas proporcionan una visión general de tu sistema. Puedes utilizarlas para evaluar la salud de tu entorno de un vistazo. Visualiza cuán rápido los usuarios están cargando tu sitio web, o el consumo promedio de memoria de tus servidores, por ejemplo. Una vez que identifique un problema, puede utilizar [registros][1] y [seguimiento][2] para investigar más a fondo.

Las métricas que rastrean la salud del sistema llegan automáticamente a través de las integraciones de Datadog con más de {{< translate key="integration_count" >}} servicios. También puede rastrear métricas que son específicas de su negocio, también conocidas como métricas personalizadas. Puede rastrear cosas como el número de inicios de sesión de usuarios o los tamaños de carrito de usuarios hasta la frecuencia de los commits de código de su equipo.

Además, las métricas pueden ayudarle a ajustar la escala de su entorno para satisfacer la demanda de sus clientes. Saber exactamente cuánto necesita consumir en recursos puede ayudarle a ahorrar dinero o mejorar el rendimiento.

### Enviando métricas a Datadog {#submitting-metrics-to-datadog}

Las métricas se pueden enviar a Datadog desde varios lugares.

- [Integraciones soportadas por Datadog][8]: las integraciones de Datadog {{< translate key="integration_count" >}}+ incluyen métricas listas para usar. Para acceder a estas métricas, navega a la página de integración específica para tu servicio y sigue las instrucciones de instalación allí. Si necesita hacer seguimiento de una instancia de EC2, por ejemplo, debe ir a la [documentación de integración de Amazon EC2][9].

- Puedes generar métricas directamente dentro de la plataforma de Datadog. Por ejemplo, puedes contar los códigos de estado de error que aparecen en tus registros y [almacenarlo como una nueva métrica][10] en Datadog.

- A menudo, necesitarás rastrear métricas relacionadas con tu negocio (por ejemplo, el número de inicios de sesión de usuarios o registros). En estos casos, puedes crear [métricas personalizadas][11]. Las métricas personalizadas se pueden enviar a través del [Agente][12], [DogStatsD][13] o la [API HTTP][14].

- Además, el [Agente de Datadog][15] envía automáticamente varias métricas estándar (como el uso de CPU y disco).

Para un resumen de todas las fuentes y métodos de envío de métricas, lee la [documentación de Tipos de Métricas][16].

### Tipos de métricas y visibilidad de métricas en tiempo real {#metric-types-and-real-time-metrics-visibility}

#### Tipos de métricas {#metric-types}

Datadog soporta varios tipos de métricas diferentes que sirven para distintos casos de uso: count, gauge, rate, histograma y distribución. Los tipos de métricas determinan qué gráficos y funciones están disponibles para usar con la métrica en la aplicación.

El Agente de Datadog no realiza una solicitud separada a los servidores de Datadog por cada punto de datos que envías. En su lugar, informa los valores recopilados durante un _intervalo de tiempo de flush_. El tipo de métrica determina cómo se agregan los valores recopilados de tu host durante este intervalo para su envío.

Un tipo de **_conteo_** suma todos los valores enviados en un intervalo de tiempo. Esto sería adecuado para una métrica que rastree el número de visitas al sitio web, por ejemplo.

El tipo **_tasa_** toma el conteo y lo divide por la longitud del intervalo de tiempo. Esto es útil si le interesa el número de visitas por segundo.

Un tipo de **_gauge_** toma el último valor reportado durante el intervalo. Este tipo tendría sentido para rastrear el uso de RAM o CPU, donde tomar el último valor proporciona una imagen representativa del comportamiento del host durante el intervalo de tiempo. En este caso, usar un tipo diferente como _conteo_ probablemente llevaría a valores inexactos y extremos. Elegir el tipo de métrica correcto asegura datos precisos.

Un **_histograma_** reporta cinco valores diferentes que resumen los valores enviados: el promedio, conteo, mediana, percentil 95 y máximo. Esto produce cinco series temporales diferentes. Este tipo de métrica es adecuado para cosas como la latencia, para las cuales no es suficiente conocer el valor promedio. Los histogramas le permiten entender cómo se distribuyeron sus datos sin registrar cada punto de datos individual.

Una **_distribución_** es similar a un histograma, pero resume los valores enviados durante un intervalo de tiempo a través de todos los hosts en su entorno. También puede elegir reportar múltiples percentiles: p50, p75, p90, p95 y p99. Puede aprender más sobre esta poderosa característica en la [documentación de Distribuciones][19].

Consulte la [documentación de tipos de métricas][16] para obtener ejemplos más detallados de cada tipo de métrica e instrucciones de envío.

## Consultando métricas {#querying-metrics}

Puede visualizar sus métricas y crear gráficos en Datadog: en [Explorador de Métricas][3], [Tableros][4] o [Cuadernos][5].

**Consejo**: Para abrir la página de Resumen de Métricas desde la búsqueda global de Datadog, presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busque `metrics`.

Aquí hay un ejemplo de una visualización de series temporales:

{{< img src="metrics/introduction/timeseries_example.png" alt="Un gráfico de series temporales muestra una métrica de latencia representada por una sola línea azul con varios picos." >}}

Este gráfico de líneas traza la latencia (en milisegundos) experimentada por los usuarios en el eje y contra el tiempo en el eje x.

#### Visualizaciones adicionales {#additional-visualizations}

Datadog ofrece una variedad de opciones de visualización para ayudar a los usuarios a graficar y mostrar fácilmente sus métricas. 

Una consulta métrica consiste en los mismos dos pasos de evaluación para comenzar: desglose temporal y desglose espacial. Consulte la [anatomía de una consulta métrica][6] para más información.

{{< whatsnext desc="Dos ofertas de visualización que los usuarios de Métricas a menudo encuentran útiles son:">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>Widget de Valor de Consulta</u> - Reduce los resultados de esos dos pasos en un solo valor.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>Lista principal</u> - Devuelve un solo valor por grupo.{{< /nextlink >}}
{{< /whatsnext >}}

Además, Datadog tiene muchos otros tipos de gráficos y widgets para visualizaciones. Puede aprender más sobre ellos en la [serie de blogs de Datadog sobre gráficos métricos][7].

La experiencia de graficar es consistente, ya sea que uses tableros, notebook o monitors. Puede crear gráficos utilizando la interfaz del editor de gráficos o modificando directamente la cadena de consulta sin procesar. Para editar la cadena de consulta, use el `</>` botón en el extremo derecho.

### Anatomía de una consulta métrica {#anatomy-of-a-metric-query}

Una consulta métrica en Datadog se ve así:

{{< img src="metrics/introduction/newanatomy.jpg" alt="Consulta de ejemplo con secciones codificadas por color" style="width:70%;">}}

Puede descomponer esta consulta en algunos pasos:

#### Nombre de la métrica {#metric-name}

Primero, elija la métrica específica que le gustaría graficar buscando o seleccionándola del menú desplegable junto a **Metric**. Si no está seguro de qué métrica usar, comienza con Metrics Explorer o un notebook. También puedes ver una lista de métricas reportadas a Datadog en la página de Metrics Summary.

#### Filtra tu métrica {#filter-your-metric}

Después de seleccionar una métrica, puedes filtrar tu consulta según las etiquetas. Por ejemplo, puedes usar `account:prod` para delimitar el contexto de tu consulta e incluir solo las métricas de tus servidores de producción. Para más información, lee la [documentación de etiquetado][17].

#### Configura la agregación temporal {#configure-time-aggregation}

A continuación, elige la granularidad de tus datos utilizando la agregación temporal. En este ejemplo, has definido que hay un punto de datos por cada hora (3600 segundos). Puedes elegir cómo deseas agregar los datos en cada intervalo de tiempo. Por defecto, se aplica _avg_, pero otras opciones disponibles son _sum_, _min_, _max_ y _count_. También puedes personalizar cómo se agregan y agrupan los datos de tus métricas con funciones o modificadores en la aplicación. Por ejemplo, si deseas aplicar max y personalizar cómo se agrupan y agregan tus datos de métricas en el tiempo con consultas alineadas al calendario, usarías `.rollup(max, 60)`. Para más información, consulta la documentación de [Functions][24], [Rollup][23] y [In-application modifiers][25].

#### Configura la agregación de espacio {#configure-space-aggregation}

En Datadog, "espacio" se refiere a la forma en que se distribuyen las métricas entre diferentes servidores y etiquetas. Hay dos aspectos diferentes del espacio que puedes controlar: agregador y agrupamiento.

_Agregador_ define cómo se combinan las métricas en cada grupo. Hay cuatro agregaciones disponibles: sum, min, max y avg.

_Agrupamiento_ define qué constituye una línea en el gráfico. Por ejemplo, si tienes cientos de servidores distribuidos en cuatro regiones, agrupar por región te permite graficar una línea para cada región. Esto reduciría el número de series temporales a cuatro.

#### Aplicar funciones (opcional) {#apply-functions-optional}

Puedes modificar los valores de tu gráfico con [funciones][18]. Esto puede significar realizar operaciones aritméticas entre un entero y una métrica (por ejemplo, multiplicar una métrica por 2). O realizar operaciones aritméticas entre dos métricas (por ejemplo, crear una nueva serie temporal para la tasa de utilización de memoria así: `jvm.heap_memory / jvm.heap_memory_max`).

### Agregación de tiempo y espacio {#time-and-space-aggregation}

_Agregación de tiempo_ y _agregación de espacio_ son dos componentes importantes de cualquier consulta. Porque entender cómo funcionan estas agregaciones te ayuda a evitar malinterpretar tus gráficos, estos conceptos se explican con más detalle a continuación.

#### Agregación de tiempo {#time-aggregation}

Datadog almacena un gran volumen de puntos, y en la mayoría de los casos no es posible mostrar todos ellos en un gráfico. Habría más puntos de datos que píxeles. Datadog utiliza la agregación de tiempo para resolver este problema combinando puntos de datos en intervalos de tiempo. Por ejemplo, al examinar cuatro horas, los puntos de datos se combinan en intervalos de dos minutos. Esto se llama un _rollup_. A medida que el intervalo de tiempo que has definido para tu consulta aumenta, la granularidad de tus datos disminuye.

Hay cinco agregaciones que puedes aplicar para combinar tus datos en cada intervalo de tiempo: sum, min, max, avg y count.

Es importante recordar que la agregación de tiempo se _aplica_ siempre en cada consulta que realices.

#### Agregación de espacio {#space-aggregation}

La agregación de espacio divide una métrica única en múltiples series temporales por etiquetas como servidor, contenedor y región. Por ejemplo, si quisieras ver la latencia de tus instancias de EC2 por región, necesitarías usar la funcionalidad de agrupamiento de la agregación de espacio para combinar los servidores de cada región.

Hay cuatro agregadores que se pueden aplicar al usar la agregación de espacio: _sum_, _min_, _max_ y _avg_. Usando el ejemplo anterior, supongamos que tus servidores están distribuidos en cuatro regiones: us-east-1, us-east-2, us-west-1 y us-west-2. Los servidores en cada región necesitan ser combinados utilizando una función agregadora. Usar el agregador _max_ resultaría en la latencia máxima experimentada entre los servidores en cada región, mientras que el agregador _avg_ daría como resultado la latencia promedio por región.

#### Consultas anidadas {#nested-queries}
Agregue capas adicionales de agregación sobre los resultados de consultas existentes en tiempo y espacio con consultas anidadas en la interfaz de usuario o a través de la [API][27]. Para más información, consulta la documentación de [Nested Queries][26].


### Vea información en tiempo real sobre métricas {#view-real-time-information-about-metrics}

La [Metrics Summary page][20] muestra una lista de las métricas reportadas a Datadog en un intervalo de tiempo especificado: la última hora, día o semana. Las métricas pueden ser filtradas por nombre de métrica o etiqueta.

Haz clic en cualquier nombre de métrica para mostrar un panel lateral de detalles con información más detallada. El panel lateral de detalles muestra información clave para una métrica dada, incluyendo sus metadatos (tipo, unidad, intervalo), el número de métricas distintas, el número de servidores reportando, el número de etiquetas enviadas y una tabla que contiene todas las etiquetas enviadas sobre una métrica. Ver qué etiquetas se están enviando sobre una métrica te ayuda a entender el número de métricas distintas que se reportan desde ella, ya que ese número depende de las combinaciones de los valores de sus etiquetas.

**Nota:** El número de métricas distintas reportadas en el panel lateral de detalles en Metrics Summary no define tu factura. Consulta tus [usage details][21] para un cálculo preciso de tu uso durante el último mes.

Consulta la documentación de Metrics Summary [22] para más detalles.

## Lectura adicional {#further-reading}

{{< whatsnext desc="Para continuar con métricas, consulte:">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrado Avanzado</u> - Filtra tus datos para reducir el alcance de las métricas devueltas.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métricas de Distribución</u> - Calcula percentiles globales en todo tu conjunto de datos.{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Métricas sin Límites™</u> - Aprende cómo controlar los volúmenes de métricas personalizadas con configuraciones de etiquetas utilizando Métricas sin Límites™.{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Habilitación de Fundamentos</u> - Únete a una sesión interactiva para desbloquear el potencial completo de las métricas.{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-metrics" >}}<u>Introducción a las Métricas</u> - Aprende cómo enviar y visualizar tus primeras métricas con Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/logs
[2]: /es/tracing/
[3]: /es/metrics/explorer/
[4]: /es/dashboards/
[5]: /es/notebooks/
[6]: https://docs.datadoghq.com/es/metrics/#anatomy-of-a-metric-query
[7]: https://www.datadoghq.com/blog/timeseries-metric-graphs-101/
[8]: /es/integrations/
[9]: /es/integrations/amazon_ec2/
[10]: /es/logs/logs_to_metrics/
[11]: /es/metrics/custom_metrics/
[12]: /es/agent/
[13]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[14]: /es/api/
[15]: https://docs.datadoghq.com/es/agent/basic_agent_usage/
[16]: /es/metrics/types/
[17]: /es/getting_started/tagging/using_tags/
[18]: /es/dashboards/functions/
[19]: /es/metrics/distributions/
[20]: https://app.datadoghq.com/metric/summary
[21]: /es/account_management/plan_and_usage/usage_details/
[22]: /es/metrics/summary/
[23]: /es/dashboards/functions/rollup/#rollup-with-calendar-aligned-queries
[24]: /es/dashboards/functions/
[25]: /es/metrics/custom_metrics/type_modifiers/?tab=count#in-application-modifiers
[26]: /es/metrics/nested_queries
[27]: https://docs.datadoghq.com/es/api/latest/metrics/#query-timeseries-data-across-multiple-products