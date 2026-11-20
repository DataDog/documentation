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
description: Envíe, consulte, visualice y gestione sus métricas en Datadog.
title: Métricas
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explore y regístrese en las sesiones de Foundation Enablement para Custom Metrics. Aprenda cómo las Custom Metrics le ayudan a realizar un seguimiento de los KPI de su aplicación, como el número de visitantes, el tamaño promedio de la cesta del cliente, la latencia de las solicitudes o la distribución del rendimiento de un algoritmo personalizado.
{{< /learning-center-callout >}}

Esta es una introducción a las métricas en Datadog y por qué son útiles. Esta sección incluye los siguientes temas: 

{{< whatsnext desc="Envíe métricas a Datadog" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>Enviar Custom Metrics</u> - Aprenda qué son las Custom Metrics y cómo enviarlas.{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/reference/otel_metrics" >}}<u>Enviar métricas de OpenTelemetry</u> - Configure el Datadog Agent o el OpenTelemetry Collector.{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>Tipos de métricas</u> - Tipos de métricas que se pueden enviar a Datadog.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métricas de distribución</u> - Aprenda sobre las métricas de distribución y los percentiles precisos a nivel global.{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>Unidades de métricas</u> - Aprenda sobre las unidades que se pueden asociar a las métricas.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Visualice y consulte sus métricas" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Metrics Explorer</u> - Explore todas sus métricas y realice análisis.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Metrics Catalog</u> - Comprenda las métricas de Datadog que envían datos activamente.{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrado avanzado</u> - Filtre sus datos para reducir el contexto de las métricas devueltas.{{< /nextlink >}}
    {{< nextlink href="/metrics/nested_queries" >}}<u>Consultas anidadas</u> - Aplique capas adicionales de agregación para desbloquear capacidades de consulta avanzadas.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Comprenda y gestione los volúmenes y costos de sus Custom Metrics" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Aprenda a controlar los volúmenes de Custom Metrics con configuraciones de etiquetas usando Metrics without Limits™.{{< /nextlink >}}
{{< /whatsnext >}}

## Descripción general {#overview}
### ¿Qué son las métricas? {#what-are-metrics}

Las métricas son valores numéricos que pueden rastrear cualquier aspecto de su entorno a lo largo del tiempo, desde la latencia hasta las tasas de error o los registros de usuarios.

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

Las marcas de tiempo de las métricas que incluyen fracciones de segundo se redondean al segundo más cercano. Si algunos puntos tienen la misma marca de tiempo, el punto más reciente sobrescribe a los anteriores.

### ¿Por qué son útiles las métricas? {#why-are-metrics-useful}

Las métricas proporcionan una imagen general de su sistema. Puede usarlas para evaluar el estado de su entorno de un vistazo. Visualice qué tan rápido se carga su sitio web para los usuarios o, por ejemplo, el consumo promedio de memoria de sus servidores. Una vez que identifique un problema, puede usar los [registros][1] y el [rastreo][2] para investigarlo más a fondo.

Las métricas que rastrean el estado del sistema llegan automáticamente a través de las Integrations de Datadog con más de {{< translate key="integration_count" >}} servicios. También puede rastrear métricas específicas de su negocio, conocidas como Custom Metrics. Puede rastrear desde la cantidad de inicios de sesión y el tamaño de los carritos de los usuarios hasta la frecuencia con la que su equipo confirma cambios en el código.

Además, las métricas pueden ayudarle a ajustar la escala de su entorno para satisfacer la demanda de sus clientes. Saber exactamente cuántos recursos necesita consumir puede ayudarle a ahorrar dinero o mejorar el rendimiento.

### Envío de métricas a Datadog {#submitting-metrics-to-datadog}

Las métricas se pueden enviar a Datadog desde varios lugares.

- [Integrations compatibles con Datadog][8]: las {{< translate key="integration_count" >}}+ Integrations de Datadog incluyen métricas listas para usar. Para acceder a estas métricas, navegue a la página de integración específica de su servicio y siga las instrucciones de instalación que aparecen allí. Si necesita monitorear una instancia de EC2, por ejemplo, iría a la [documentación de integración de Amazon EC2][9].

- Puede generar métricas directamente dentro de la plataforma de Datadog. Por ejemplo, puede contar los códigos de estado de error que aparecen en sus registros y [guardar ese recuento como una nueva métrica][10] en Datadog.

- A menudo, necesitará rastrear Custom Metrics relacionadas con su negocio (por ejemplo, el número de inicios de sesión o registros de usuarios). En estos casos, puede crear [Custom Metrics][11]. Las Custom Metrics se pueden enviar a través del [Agent][12], [DogStatsD][13] o la [HTTP API][14].

- Además, el [Datadog Agent][15] envía automáticamente varias métricas estándar (como el uso de CPU y disco).

Para obtener un resumen de todas las fuentes y métodos de envío de métricas, lea la [documentación de Tipos de métricas][16].

### Tipos de métricas y visibilidad de métricas en tiempo real {#metric-types-and-real-time-metrics-visibility}

#### Tipos de métricas {#metric-types}

Datadog admite varios tipos de métricas diferentes que sirven para casos de uso distintos: count, gauge, rate, histogram y distribution. Los tipos de métricas determinan qué gráficos y funciones están disponibles para usar con la métrica en la aplicación.

El Datadog Agent no realiza una solicitud por separado a los servidores de Datadog por cada punto de datos que usted envía. En su lugar, informa los valores recopilados durante un _intervalo de tiempo de vaciado_. El tipo de métrica determina cómo se agregan para su envío los valores recopilados de su servidor durante este intervalo.

Un tipo **_count_** suma todos los valores enviados en un intervalo de tiempo. Esto sería adecuado para una métrica que rastrea el número de visitas a un sitio web, por ejemplo.

El tipo **_rate_** toma el conteo y lo divide por la duración del intervalo de tiempo. Esto es útil si le interesa el número de visitas por segundo.

Un tipo **_gauge_** toma el último valor reportado durante el intervalo. Este tipo tendría sentido para realizar un seguimiento del uso de RAM o CPU, donde tomar el último valor proporciona una imagen representativa del comportamiento del servidor durante el intervalo de tiempo. En este caso, usar un tipo diferente como _count_ probablemente conduciría a valores inexactos y extremos. Elegir el tipo de métrica correcto garantiza datos precisos.

Un **_histogram_** reporta cinco valores diferentes que resumen los valores enviados: el promedio, el conteo, la mediana, el percentil 95 y el máximo. Esto produce cinco series temporales diferentes. Este tipo de métrica es adecuado para cosas como la latencia, para las cuales no es suficiente conocer el valor promedio. Los histogramas le permiten comprender cómo se distribuyeron sus datos sin registrar cada punto de datos individual.

Una **_distribution_** es similar a un histograma, pero resume los valores enviados durante un intervalo de tiempo en todos los servidores de su entorno. También puede optar por reportar múltiples percentiles: p50, p75, p90, p95 y p99. Puede obtener más información sobre esta potente función en la [documentación de Distributions][19].

Consulte la documentación de [tipos de métricas][16] para obtener ejemplos más detallados de cada tipo de métrica e instrucciones de envío.

## Consulta de métricas {#querying-metrics}

Puede visualizar sus métricas y crear gráficos en todo Datadog: en [Metrics Explorer][3], [Dashboards][4] o [Notebooks][5].

**Consejo**: Para abrir la página Metrics Catalog desde la búsqueda global de Datadog, presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busque `metrics`.

Aquí hay un ejemplo de una visualización de series temporales:

{{< img src="metrics/introduction/timeseries_example.png" alt="Un gráfico de series temporales muestra una métrica de latencia representada por una sola línea azul con varios picos" >}}

Este gráfico de líneas traza la latencia (en milisegundos) experimentada por los usuarios en el eje y frente al tiempo en el eje x.

#### Visualizaciones adicionales {#additional-visualizations}

Datadog ofrece una variedad de opciones de visualización para ayudar a los usuarios a graficar y mostrar fácilmente sus métricas. 

Una consulta de métricas consta de los mismos dos pasos de evaluación para comenzar: desglose temporal y desglose espacial. Consulte la [anatomía de una consulta de métricas][6] para obtener más información.

{{< whatsnext desc="Dos opciones de visualización que los usuarios de Metrics suelen encontrar útiles son:">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>Query Value Widget</u> - Reduce los resultados de esos dos pasos a un solo valor.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>Lista principal</u> - Devuelve un solo valor por grupo.{{< /nextlink >}}
{{< /whatsnext >}}

Además, Datadog tiene muchos otros tipos de gráficos y widgets para visualizaciones. Puede obtener más información sobre ellos en la [serie de blogs de Datadog sobre gráficos de métricas][7].

La experiencia de graficado es consistente ya sea que esté usando Dashboards, notebooks o monitores. Puede crear gráficos usando la interfaz de usuario del editor de gráficos o cambiando directamente la cadena de consulta sin procesar. Para editar la cadena de consulta, use el botón {{< ui >}}</>{{< /ui >}} en el extremo derecho.

### Anatomía de una consulta de métrica {#anatomy-of-a-metric-query}

Una consulta de métrica en Datadog se ve así:

{{< img src="metrics/introduction/newanatomy.jpg" alt="Ejemplo de consulta con secciones codificadas por colores" style="width:70%;">}}

Puede dividir esta consulta en algunos pasos:

#### Nombre de la métrica {#metric-name}

Primero, elija la métrica específica que desea graficar buscando o seleccionándola en el menú desplegable junto a {{< ui >}}Metric{{< /ui >}}. Si no está seguro de qué métrica usar, comience con el Metrics Explorer o un notebook. También puede ver una lista de las métricas que reportan activamente en la página Metrics Catalog.

#### Filtre su métrica {#filter-your-metric}

Después de seleccionar una métrica, puede filtrar su consulta según la(s) etiqueta(s). Por ejemplo, puede usar `account:prod` para _definir el contexto de_ su consulta e incluir solo las métricas de sus servidores de producción. Para obtener más información, lea la [documentación sobre etiquetado][17].

#### Configure el desglose temporal {#configure-time-aggregation}

A continuación, elija la granularidad de sus datos mediante un rollup temporal. En este ejemplo, ha definido que hay un punto de datos por cada hora (3600 segundos). Puede elegir cómo desea agregar los datos en cada segmento temporal. De forma predeterminada, se aplica _avg_, pero otras opciones disponibles son _sum_, _min_, _max_ y _count_. También puede personalizar cómo se agregan y segmentan sus datos de métricas con funciones o modificadores en la aplicación. Por ejemplo, si quisiera aplicar max y personalizar cómo se resumen y segmentan sus datos de métricas en el tiempo con consultas alineadas al calendario, usaría `.rollup(max, 60)`. Para obtener más información, consulte la documentación de [Functions][24], [Rollup][23] y [In-application modifiers][25].

#### Configure el desglose espacial {#configure-space-aggregation}

En Datadog, "espacio" se refiere a la forma en que las métricas se distribuyen entre diferentes servidores y etiquetas. Hay dos aspectos diferentes del espacio que puede controlar: agregador y agrupación

El _agregador_ define cómo se combinan las métricas en cada grupo. Hay cuatro agregaciones disponibles: sum, min, max y avg.

La _agrupación_ define qué constituye una línea en el gráfico. Por ejemplo, si tiene cientos de servidores distribuidos en cuatro regiones, agrupar por región le permite graficar una línea para cada región. Esto reduciría el número de series temporales a cuatro.

#### Aplique funciones (opcional) {#apply-functions-optional}

Puede modificar los valores de su gráfico con [funciones][18] matemáticas. Esto puede significar realizar operaciones aritméticas entre un número entero y una métrica (por ejemplo, multiplicar una métrica por 2). O realizar operaciones aritméticas entre dos métricas (por ejemplo, crear una nueva serie temporal para la tasa de utilización de memoria de esta manera: `jvm.heap_memory / jvm.heap_memory_max`).

### Desglose temporal y espacial {#time-and-space-aggregation}

El _desglose temporal_ y el _desglose espacial_ son dos componentes importantes de cualquier consulta. Debido a que comprender cómo funcionan estas agregaciones le ayuda a evitar malinterpretar sus gráficos, estos conceptos se explican con más detalle a continuación.

#### Desglose temporal {#time-aggregation}

Datadog almacena un gran volumen de puntos y, en la mayoría de los casos, no es posible mostrarlos todos en un gráfico. Habría más puntos de datos que píxeles. Datadog utiliza el desglose temporal para resolver este problema combinando puntos de datos en intervalos de tiempo. Por ejemplo, al examinar cuatro horas, los puntos de datos se combinan en intervalos de dos minutos. Esto se denomina _rollup_. A medida que aumenta el intervalo de tiempo que ha definido para su consulta, la granularidad de sus datos disminuye.

Hay cinco agregaciones que puede aplicar para combinar sus datos en cada intervalo de tiempo: sum, min, max, avg y count.

Es importante recordar que el desglose temporal _siempre_ se aplica en cada consulta que realiza.

#### Desglose espacial {#space-aggregation}

El desglose espacial divide una sola métrica en múltiples series temporales mediante etiquetas como servidor, contenedor y región. Por ejemplo, si desea ver la latencia de sus instancias EC2 por región, necesitaría usar la funcionalidad de agrupación del desglose espacial para combinar los servidores de cada región.

Hay cuatro agregadores que se pueden aplicar al usar el desglose espacial: _sum_, _min_, _max_ y _avg_. Usando el ejemplo anterior, suponga que sus servidores están distribuidos en cuatro regiones: us-east-1, us-east-2, us-west-1 y us-west-2. Los servidores en cada región deben combinarse usando una función de agregador. Usar el agregador _max_ daría como resultado la latencia máxima experimentada en los servidores de cada región, mientras que el agregador _avg_ produciría la latencia promedio por región.

#### Consultas anidadas {#nested-queries}
Agregue capas adicionales de agregación a los resultados de consultas existentes en tiempo y espacio con consultas anidadas en la interfaz de usuario o a través de la [API][27]. Para obtener más información, consulte la documentación de [Consultas anidadas][26].


### Vea información en tiempo real sobre las métricas {#view-real-time-information-about-metrics}

La [página de Metrics Catalog][20] muestra una lista de sus métricas reportadas a Datadog en un marco de tiempo especificado: la última hora, el último día o la última semana. Las métricas se pueden filtrar por nombre de métrica o etiqueta.

Haga clic en cualquier nombre de métrica para mostrar un panel lateral con información más detallada. El panel lateral de detalles muestra información clave para una métrica determinada, incluidos sus metadatos (tipo, unidad, intervalo), la cantidad de métricas distintas, la cantidad de servidores que reportan, la cantidad de etiquetas enviadas y una tabla que contiene todas las etiquetas enviadas en una métrica. Ver qué etiquetas se están enviando en una métrica le ayuda a comprender la cantidad de métricas distintas que se reportan desde ella, ya que este número depende de sus combinaciones de valores de etiqueta.

**Nota:** La cantidad de métricas distintas reportadas en el panel lateral de detalles en el Metrics Catalog no define su factura. Consulte sus [detalles de uso][21] para obtener un recuento preciso de su uso durante el último mes.

Lea la [documentación de Metrics Catalog][22] para obtener más detalles.

## Lecturas adicionales {#further-reading}

{{< whatsnext desc="Para continuar con las métricas, consulte:">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrado avanzado</u> - Filtre sus datos para delimitar el contexto de las métricas devueltas.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métricas de distribución</u> - Calcule percentiles globales en todo su conjunto de datos.{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Aprenda a controlar los volúmenes de métricas personalizadas con configuraciones de etiquetas usando Metrics without Limits™.{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Foundation Enablement</u> - Únase a una sesión interactiva para aprovechar todo el potencial de las métricas.{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-metrics" >}}<u>Getting Started with Metrics</u> - Aprenda a enviar y visualizar sus primeras métricas con Datadog.{{< /nextlink >}}
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
[20]: https://app.datadoghq.com/metric/catalog
[21]: /es/account_management/plan_and_usage/usage_details/
[22]: /es/metrics/summary/
[23]: /es/dashboards/functions/rollup/#rollup-with-calendar-aligned-queries
[24]: /es/dashboards/functions/
[25]: /es/metrics/custom_metrics/type_modifiers/?tab=count#in-application-modifiers
[26]: /es/metrics/nested_queries
[27]: https://docs.datadoghq.com/es/api/latest/metrics/#query-timeseries-data-across-multiple-products