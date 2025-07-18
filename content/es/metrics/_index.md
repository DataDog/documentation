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
    - enviar métricas
    - envío de métricas
title: Métricas
---

{{< learning-center-callout header="Únete a una sesión de webinar de enablement" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explora y regístrate en las sesiones de Foundation Enablement sobre métricas personalizadas. Descubre cómo las métricas personalizadas ayudan a hacer un seguimiento de los KPIs de tu aplicación, como el número de visitantes, el tamaño medio de la cesta del cliente, la latencia de las solicitudes o la distribución del rendimiento de un algoritmo personalizado.
{{< /learning-center-callout >}}

Esta es una introducción a las métricas en Datadog y por qué son útiles. Esta sección incluye los siguientes temas:

{{< whatsnext desc="Enviar métricas a Datadog" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>Enviar métricas personalizadas</u>: conoce qué métricas personalizadas y cómo enviarlas.{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/reference/otel_metrics" >}}<u>Enviar métricas de OpenTelemetry</u>: configura el Datadog Agent o OpenTelemetry Collector.{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>Tipos de métricas</u>: tipos de métricas que se pueden enviar a Datadog.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métricas de distribución</u>: obtén información sobre las métricas de distribución y los percentiles precisos globalmente.{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>Unidades de métricas</u>: obtén más información sobre las unidades que se pueden asociar con las métricas.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Visualize and query your metrics" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Explorador de métricas</u> - Explora todas tus métricas y realiza análisis.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Resumen de métricas</u> - Comprende tus métricas de Datadog que informan activamente.{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrado avanzado</u> - Filtra tus datos para reducir el contexto de las métricas devueltas.{{< /nextlink >}}
    {{< nextlink href="/metrics/nested_queries" >}}<u>Consultas anidadas</u> - Aplica capas adicionales de agregación para develar capacidades de consulta avanzadas.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Comprende y gestiona los costes y volúmenes de tus métricas personalizadas" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without LimitsTM</u>: obtén más información sobre cómo controlar los volúmenes de métricas personalizadas con configuraciones de etiquetas mediante Metrics without LimitsTM.{{< /nextlink >}}
{{< /whatsnext >}}

## Información general
### ¿Qué son las métricas?

Las métricas son valores numéricos que pueden rastrear cualquier cosa sobre tu entorno a lo largo del tiempo, desde la latencia hasta las tasas de error o las inscripciones de usuarios.

En Datadog, los datos de métricas se ingieren y almacenan como puntos de datos con un valor y una marca temporal:

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

Cualquier métrica con marcas temporales de fracciones de segundo se redondea al segundo más cercano. Si algún punto tiene la misma marca temporal, el último punto sobrescribe a los anteriores.

### ¿Por qué son útiles las métricas?

Las métricas ofrecen una visión general de tu sistema. Puedes utilizarlos para evaluar el estado de tu entorno de forma sencilla. Visualiza, por ejemplo, la rapidez con la que los usuarios cargan tu sitio web o el consumo medio de memoria de tus servidores. Una vez que identifiques un problema, puedes utilizar [logs][1] y [trazas][2] para seguir solucionándolo.

Las métricas que rastrean el estado del sistema vienen automáticamente a través de las integraciones de Datadog con más de {{< translate key="integration_count" >}} servicios. También puedes realizar un seguimiento de las métricas específicas de tu empresa, también conocidas como métricas personalizadas. Puedes hacer un seguimiento de cosas como el número de inicios de sesión de usuarios o el tamaño de los carritos de los usuarios, incluso la frecuencia de las confirmaciones de código de tu equipo.

Además, las métricas pueden ayudarte a ajustar la escala de tu entorno para satisfacer la demanda de tus clientes. Al saber exactamente cuánto recursos necesitas utilizar, puedes ahorrar dinero o mejorar el rendimiento.

### Envío de métricas a Datadog

Las métricas pueden enviarse a Datadog desde varios lugares.

- [Integraciones compatibles con Datadog][8]: más de {{< translate key="integration_count" >}} integraciones de Datadog incluyen métricas predefinidas. Para acceder a estas métricas, ve a la página de integración específica de tu servicio y sigue las instrucciones de instalación que allí se indican. Si necesitas monitorizar una instancia de EC2, por ejemplo, ve a la [documentación de la integración de Amazon EC2][9].

- Puedes generar métricas directamente dentro de la plataforma de Datadog. Por ejemplo, puedes contar los códigos de estado de error que aparecen en tus logs y [almacenarlos como una nueva métrica][10] en Datadog.

- A menudo, necesitarás realizar un seguimiento de métricas relacionadas con tu negocio (por ejemplo, número de inicios de sesión o registros de usuarios). En estos casos, puedes crear [métricas personalizadas][11]. Las métricas personalizadas pueden enviarse a través del [Agent][12], [DogStatsD][13] o la [API HTTP][14].

- Además, el [Datadog Agent ][15] envía automáticamente varias métricas estándar (como el uso de la CPU y del disco).

Para obtener un resumen de todas las fuentes y métodos de envío de métricas, lee la [documentación de Tipos de métricas][16].

### Tipos de métricas y visibilidad de métricas en tiempo real

#### Tipos de métricas

Datadog admite varios tipos diferentes de métricas que sirven para distintos casos de uso: count, gauge, rate, histogram y distribution. Los tipos de métrica determinan qué gráficos y funciones están disponibles para su uso con la métrica en la aplicación.

Datadog Agent no realiza una solicitud aparte a los servidores de Datadog por cada punto de datos que envías. En su lugar, informa de los valores recopilados durante un _intervalo de descarga_. El tipo de métrica determina cómo se agregan para su envío los valores recopilados de tu host a lo largo de este intervalo.

Un tipo **_count_** suma todos los valores enviados en un intervalo de tiempo. Esto sería adecuado para una métrica que rastrea el número de visitas al sitio web, por ejemplo.

El tipo **_rate_** toma el recuento y lo divide por la longitud del intervalo de tiempo. Esto es útil si estás interesado en el número de aciertos por segundo.

Un tipo **_gauge_** toma el último valor informado durante el intervalo. Este tipo es la mejor opción para rastrear el uso de RAM o CPU, donde tomar el último valor proporciona una imagen representativa del comportamiento de host durante el intervalo de tiempo. En este caso, utilizar un tipo diferente como _count_ probablemente conduciría a valores inexactos y extremos. Elegir el tipo correcto de métrica garantiza la exactitud de los datos.

Un tipo **_histogram_** informa de cinco valores diferentes que resumen los valores enviados: la media, el recuento, la mediana, el percentil 95 y el máximo. Esto produce cinco series temporales diferentes. Este tipo de métrica es adecuado para situaciones como la latencia, para las que no basta con conocer el valor medio. Los histogramas permiten comprender cómo se distribuyen los datos sin necesidad de registrar todos y cada uno de los puntos de datos.

Un tipo **_distribution_** es similar a un histograma, pero resume los valores enviados durante un intervalo de tiempo a través de todos los hosts en tu entorno. También puedes elegir informar de múltiples percentiles: p50, p75, p90, p95 y p99. Puedes obtener más información sobre esta potente función en la [Documentación sobre distribuciones][19].

Consulta la documentación [tipos de métricas][16] para ver ejemplos más detallados de cada tipo de métrica e instrucciones de envío.

## Consulta de métricas

Puedes visualizar tus métricas y crear gráficos a lo largo de Datadog: en [Metrics Explorer][3], [dashboards][4] o [notebooks][5].

**Consejo**: Para abrir la página Resumen de métricas a partir de la búsqueda global de Datadog, pulsa <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busca `metrics`.

Acontinuación, puedes ver un ejemplo de visualización de series temporales:

{{< img src="metrics/introduction/timeseries_example.png" alt="Un gráfico de serie temporal que muestra una métrica de latencia representada por una línea azul única con varios picos" >}}

Este gráfico de líneas representa la latencia (en milisegundos) experimentada por los usuarios en el eje y frente al tiempo en el eje x.

#### Visualizaciones adicionales

Datadog ofrece diversas opciones de visualización para que los usuarios puedan graficar y mostrar fácilmente sus métricas. 

Una consulta de métrica consta de los mismos dos pasos de evaluación para empezar: agregación temporal y agregación espacial. Consulta la [anatomía de una consulta de métrica][6] para obtener más información.

{{< whatsnext desc="Dos ofertas de visualización que los usuarios de métricas suelen encontrar útiles:">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>Widget de valor de consulta</u>: reduce los resultados de esos dos pasos en un solo valor.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>Lista principal</u>: devuelve un valor único por grupo.{{< /nextlink >}}
{{< /whatsnext >}}

Además, Datadog tiene muchos otros tipos de gráficos y widgets para visualizaciones. Puedes aprender más sobre ellos en las [series de blog sobre gráficos de métrica][7] de Datadog.

La experiencia de crear gráficas es coherente tanto si utiliza dashboards, notebooks o monitores. Puedes crear gráficas utilizando la interfaz de usuario del editor para crear gráficas o modificando directamente la cadena de consulta sin procesar. Para editar la cadena de consulta, utiliza el botón `</>` situado en el extremo derecho.

### Anatomía de una consulta de métrica

Una consulta de métrica en Datadog tiene el siguiente aspecto:

{{< img src="metrics/introduction/newanatomy.jpg" alt="Consulta de ejemplo con secciones ordenadas por color" style="width:70%;">}}

Puedes dividir esta consulta en varios pasos:

#### Nombre de la métrica

En primer lugar, elige la métrica específica que desees representar gráficamente, puedes buscarla o seleccionarla en el menú desplegable situado junto a **Metric** (Métrica). Si no estás seguro de qué métrica utilizar, comienza con el Metrics Explorer o un notebook. También puedes ver una lista de las métricas que informan activamente en la página Resumen de métricas.

#### Filtrar tu métrica

Después de seleccionar la métrica, puedes filtrar tu consulta según las etiquetas. Por ejemplo, puedes utilizar `account:prod` para que tu consulta incluya solo las métricas de tus hosts de producción. Para más información, lee la [documentación de etiquetado][17].

#### Configurar el tiempo de agregación

A continuación, elige el nivel de detalle de tus datos usando el tiempo rollup. En este ejemplo, has definido que haya un punto de datos por cada hora (3600 segundos). Puedes elegir cómo deseas agregar los datos en cada bucket de tiempo. Por defecto, se aplica _avg_, pero otras opciones disponibles son _sum_, _min_, _max_ y _count_. También puedes personalizar el modo en que se agregan y agrupan los datos de métrica con los modificadores de funciones o de la aplicación. Por ejemplo, si deseas aplicar max y personalizar el modo en que los datos de métrica se unen y agrupan en buckets en el tiempo con consultas definidas por calendario, debes utilizar `.rollup(max, 60)`. Para obtener más información, consulta la documentación de [funciones][24], [rollup][23] y [Modificadores dentro de la aplicación][25].

#### Configurar agregación espacial

En Datadog, "espacio" se refiere a la forma en que las métricas se distribuyen en diferentes hosts y etiquetas. Hay dos aspectos diferentes del espacio que puedes controlar: Aggregator y grouping (agregación y agrupación).

_Aggregator_ define cómo se combinan los métricas de cada grupo. Hay cuatro agregaciones disponibles: sum, min, max y avg.

_Grouping_ define lo que constituye una línea en el gráfico. Por ejemplo, si tienes cientos de hosts distribuidos en cuatro regiones, la agrupación por regiones te permite graficar una línea para cada región. Esto reduciría el número de series temporales a cuatro.

#### Aplica funciones (opcional)

Puedes modificar los valores de tu gráfico con [funciones][18] matemáticas. Esto puede significar realizar aritmética entre un entero y una métrica (por ejemplo, multiplicar un métrica por 2). O realizar aritmética entre dos métricas (por ejemplo, creando una nueva serie temporal para la tasa de utilización de memoria como esta: `jvm.heap_memory / jvm.heap_memory_max`).

### Agregación temporal y espacial

La _agregación temporal_ y la _agregación espacial_ son dos componentes importantes de cualquier consulta. Dado que entender cómo funcionan estas agregaciones ayuda a evitar interpretaciones erróneas de los gráficos, estos conceptos se explican con más detalle a continuación.

#### Agregación temporal

Datadog almacena un gran volumen de puntos, y en la mayoría de los casos no es posible mostrarlos todos en un gráfico. Habría más puntos de datos que píxeles. Datadog utiliza la agregación temporal para resolver este problema, combinando los puntos de datos en buckets de tiempo. Por ejemplo, al examinar cuatro horas, los puntos de datos se combinan en buckets de dos minutos. Esto se denomina _rollup_. A medida que aumenta el intervalo de tiempo definido para la consulta, disminuye el nivel de detalle de los datos.

Hay cinco agregaciones que puedes aplicar para combinar los datos en cada intervalo de tiempo: sum, min, max, avg y count.

Es importante recordar que la agregación temporal se aplica _siempre_ en cada consulta que se realiza.

#### Agregación de espacio

La agregación espacial divide una única métrica en múltiples series temporales por etiquetas como host, contenedor y región. Por ejemplo, si deseas ver la latencia de tus instancias de EC2 por región, deberás utilizar la agregación espacial por función para combinar los hosts de cada región.

Hay cuatro agregadores que se pueden aplicar cuando se utiliza la agregación espacial: _sum_, _min_, _max_ y _avg_. Utilizando el ejemplo anterior, supongamos que tus hosts están repartidos en cuatro regiones: us-east-1, us-east-2, us-west-1 y us-west-2. Los hosts de cada región deben combinarse mediante la función Aggregator. Si utilizas _max_ aggregator, se obtendrá la latencia máxima experimentada en los hosts de cada región, mientras que con _avg_ aggregator, se obtendría la latencia media por región.

#### Consultas anidadas
Añade capas de agregación adicionales a los resultados de las consultas existentes en tiempo y espacio con consultas anidadas en la interfaz de usuario o a través de la [API][27]. Para obtener más información, consulta la documentación [Consultas anidadas][26].


### Ver información en tiempo real sobre métricas

La página [Resumen de métricas][20] muestra una lista de tus métricas informadas a Datadog según un marco temporal específico: la última hora, día o semana. Las métricas pueden filtrarse por nombre de métrica o etiqueta.

Haz clic en cualquier nombre de métrica para mostrar un panel lateral de detalles con información más detallada. El panel lateral de detalles muestra información clave para una métrica determinada, incluidos sus metadatos (tipo, unidad, intervalo), el número de métricas distintas, el número de hosts informados, el número de etiquetas enviadas y una tabla que contiene todas las etiquetas enviadas en una métrica. Ver qué etiquetas se están enviando en una métrica te ayuda a comprender el número de métricas distintas que se informan, ya que este número depende de tus combinaciones de valores de etiqueta.

**Nota:** El número de métricas distintas que aparecen en el panel lateral de detalles del resumen de métrica no define tu factura. Consulta tus [detalles de uso][21] para conocer con precisión tu consumo durante el último mes.

Lee la [documentación de Resumen de métricas][22] para obtener más detalles.

## Referencias adicionales

{{< whatsnext desc="Para continuar con las métricas, consulta:">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrado avanzado</u>: filtra tus datos para reducir el alcance de las métricas devueltas.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métricas de distribución</u>: calcula los percentiles globales en todo el conjunto de datos.{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without LimitsTM</u>: obtén información sobre cómo controlar los volúmenes de métricas personalizadas con configuraciones de etiqueta mediante Metrics without LimitsTM.{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Foundation Enablement</u>: únete a una sesión interactiva para obtener todo el potencial de las métricas.{{< /nextlink >}}
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