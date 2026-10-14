---
aliases:
- /es/product_analytics/experimentation/defining_metrics/
description: Cree las métricas que desea medir en sus experimentos.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Tome decisiones de diseño basadas en datos con Product Analytics
- link: https://www.datadoghq.com/blog/how-we-built-datadog-experiments/
  tag: Blog
  text: Cómo creamos Datadog Experiments
title: Crear métricas de experimento
---
## Descripción general {#overview}

Cree las métricas que desea medir en sus experimentos. Puede utilizar datos de Real User Monitoring (RUM), Product Analytics o su propio almacén de datos para crear métricas de Datadog Experiments.

<div class="alert alert-info">Si su organización utiliza roles personalizados, debe tener los <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">permisos de Product Analytics</a> adecuados para crear métricas de experimento.</div>

## Crear una métrica {#create-a-metric}

Seleccione su fuente de datos:

{{< tabs >}}
{{% tab "Product Analytics o RUM" %}}

### Requisitos previos {#prerequisites}

Para crear una métrica a partir de datos de Product Analytics o RUM, debe tener instalado el [SDK del lado del cliente][3] de Datadog en su aplicación y estar capturando datos activamente. Si aún no ha configurado su SDK, seleccione su tipo de aplicación para comenzar:

- [Android y Android TV][4]
- [iOS y tvOS][5]
- [Navegador (JavaScript)][6]
- [React Native][7]

Product Analytics utiliza los mismos SDKs y configuración que Real User Monitoring (RUM). Después de configurar su SDK utilizando la documentación de configuración de RUM, cree su métrica en la interfaz de usuario de Product Analytics.

### Crear una métrica utilizando datos de Product Analytics o RUM {#create-a-metric-using-product-analytics-or-rum-data}

Para crear una métrica para su experimento:

1. Navegue a la [página de métricas][1] en Datadog Product Analytics.
1. Seleccione la pestaña {{< ui >}}Metrics{{< /ui >}} y haga clic en {{< ui >}}Create Metric{{< /ui >}} en la esquina superior derecha.
1. Agregue un {{< ui >}}Metric name{{< /ui >}} y, opcionalmente, un {{< ui >}}Description{{< /ui >}}.
1. En la sección {{< ui >}}Metric definition{{< /ui >}}, haga clic en {{< ui >}}Select an event{{< /ui >}} para abrir el selector de eventos. El gráfico de la derecha se actualiza en tiempo real a medida que configura su métrica.
   1. Busque un evento específico o use el filtro {{< ui >}}By Type{{< /ui >}} para explorar por tipo de evento.
1. Seleccione un [método de agregación](#aggregation-methods) en el menú desplegable. El valor predeterminado es {{< ui >}}Count of events{{< /ui >}}.
1. Haga clic en {{< ui >}}Add Filter{{< /ui >}} para [filtrar su métrica](#add-filters) por propiedades adicionales.
1. (Opcional) En la sección {{< ui >}}Additional settings{{< /ui >}}:
   1. Active {{< ui >}}Mark as certified{{< /ui >}} para indicar que esta métrica está aprobada para la toma de decisiones importantes. Esto requiere el permiso de escritura de Métricas Certificadas de Product Analytics.
   1. Ajuste [{{< ui >}}Experiment settings{{< /ui >}}](#advanced-options) y {{< ui >}}Units{{< /ui >}} según sea necesario. Los valores predeterminados funcionan para la mayoría de los casos de uso.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="/product_analytics/experiment/exp_create_new_metric.png" alt="La página Crear métrica con el nombre de la métrica establecido en 'Example metric', el evento 'click on ADD TO CART' seleccionado, el menú desplegable del método de agregación establecido en Recuento de eventos, la sección Configuración adicional, una vista previa de gráfico de barras a la derecha y el botón Guardar resaltado." style="width:90%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[3]: /es/real_user_monitoring/#get-started
[4]: /es/real_user_monitoring/application_monitoring/android/setup/?tab=kotlin
[5]: /es/real_user_monitoring/application_monitoring/ios/setup/?tab=swift-package-manager--spm
[6]: /es/real_user_monitoring/application_monitoring/browser/setup/client/?tab=npm
[7]: /es/real_user_monitoring/application_monitoring/react_native/setup/?platform=react_native

### Agregar filtros {#add-filters}

Puede filtrar su métrica seleccionando un filtro {{< ui >}}Event properties{{< /ui >}}, como servicio, país o tipo de dispositivo. Utilice el filtro {{< ui >}}By Data Type{{< /ui >}} para limitar la lista de propiedades disponibles por tipo (por ejemplo, String o Boolean).

Si no ve la propiedad que necesita, escriba el nombre de la propiedad en el campo {{< ui >}}Custom property{{< /ui >}} (por ejemplo, `@context.tracking`) y haga clic en {{< ui >}}Add{{< /ui >}}.

{{< img src="/product_analytics/experiment/exp_filter_by_2.png" alt="El panel Filter by se abre dentro de la sección Metric definition, mostrando All Properties seleccionadas, Event properties como Application Id, Service, Browser Name y Country en el centro, un filtro By Data Type con opciones Numerical, String y Boolean a la izquierda, y una sección Custom property en la parte inferior con un campo de texto que muestra el marcador de posición 'e.g. @context.tracking' y un botón Add." style="width:90%;" >}}

{{% /tab %}}
{{% tab "Almacén" %}}

### Requisitos previos {#prerequisites-1}

Para crear una métrica a partir de los datos de su almacén, debe [conectar su almacén a Datadog][8]. Datadog es compatible con BigQuery, Databricks, Redshift y Snowflake.

Después de conectar su almacén, cree un modelo SQL para asignar sus datos a Datadog, luego use el modelo para crear una métrica.

### Crear un modelo SQL {#create-a-sql-model}

Escriba su consulta SQL para definir y obtener una vista previa de sus datos, luego configure su modelo para asignar los datos a Datadog.

#### Escriba su SQL {#write-your-sql}

Comience escribiendo una consulta para recuperar sus datos:

1. Navegue a la [página de métricas][1] en Datadog Product Analytics.
1. Seleccione la pestaña {{< ui >}}Metric SQL Models{{< /ui >}} y haga clic en {{< ui >}}Create SQL Model{{< /ui >}}.
1. En la sección {{< ui >}}Write SQL{{< /ui >}}, ingrese una consulta SQL que devuelva los datos de su interés. El editor de SQL admite `SELECT * FROM` y sentencias SQL más avanzadas.
1. Haga clic en {{< ui >}}Run{{< /ui >}} para obtener una vista previa de sus datos.

{{< img src="/product_analytics/experiment/exp_create_metric_sql_models_writesql_1.png" alt="La sección Write SQL de la página Create Metric SQL Model que muestra una consulta SELECT para user_id, revenue_timestamp y amount de una tabla de pedidos de ingresos, con una vista previa de consulta exitosa debajo que muestra las columnas USER_ID, REVENUE_TIMESTAMP y AMOUNT." style="width:80%;" >}}

Para tablas grandes, utilice [variables de plantilla SQL][13] para aplicar los filtros de fecha de Datadog en su consulta y reducir la cantidad de datos que su almacén escanea en cada ejecución.

#### Asigne sus datos de almacén a Datadog {#map-your-warehouse-data-to-datadog}

Después de obtener una vista previa de sus datos, asígnelos a Datadog. En la sección {{< ui >}}Structure your model{{< /ui >}}:

1. Agregue un {{< ui >}}Metric SQL Model Name{{< /ui >}} (por ejemplo, **Revenue Orders**).
1. (Opcional) Active {{< ui >}}Mark as certified{{< /ui >}} para indicar que este modelo SQL está aprobado para la toma de decisiones importantes. Esto requiere el permiso de escritura de Métricas Certificadas de Product Analytics.
1. Asigne las columnas de su tabla de almacén de datos a lo siguiente:
   - {{< ui >}}Timestamp column{{< /ui >}}
     - La columna que enumera la marca de tiempo asociada con el evento de métrica.
     - El análisis solo incluye filas creadas después de que el sujeto se inscribe en el experimento.
   - {{< ui >}}Subject Type{{< /ui >}}
     - El atributo que Datadog utiliza para asignar grupos de experimento de forma aleatoria.
     - Puede definir el tipo de sujeto y su columna de almacén predeterminada en la página [Subject Types][12]. Por ejemplo, puede usar `user_id` para un usuario individual o `org_id` para una cuenta de organización.
   - {{< ui >}}Measures{{< /ui >}} (opcional)
     - Las columnas numéricas de su tabla de almacén de datos que Datadog puede agregar en métricas (por ejemplo, una columna `revenue` o `amount`).
     - Cada modelo SQL incluye automáticamente una medida {{< ui >}}each record{{< /ui >}}. Use esta medida para contar el número de filas relevantes en la tabla para un sujeto de experimento específico.
1. Haga clic en {{< ui >}}Create Metric SQL Model{{< /ui >}} para guardar su modelo SQL.

{{< img src="/product_analytics/experiment/exp_create_metrics_sql_model_structure4.png" alt="El panel Structure your model con el campo Metric SQL Model Name configurado en 'Revenue Orders' y resaltado, un interruptor Mark as certified, la columna Timestamp configurada en REVENUE_TIMESTAMP, Subject Type configurado en User (@usr.id) con USER_ID seleccionado en el selector de columnas, un menú desplegable Measures que muestra 'Revenue Orders (each record)', y el botón Create Metric SQL Model resaltado." style="width:80%;" >}}

### Cree una métrica usando su modelo SQL {#create-a-metric-using-your-sql-model}

Después de crear su modelo SQL, úselo para crear una métrica:

1. Navegue a la [página de métricas][1] en Datadog Product Analytics.
1. Seleccione la pestaña {{< ui >}}Metrics{{< /ui >}} y haga clic en {{< ui >}}Create Metric{{< /ui >}} en la esquina superior derecha.
1. Agregue un {{< ui >}}Metric name{{< /ui >}} y, opcionalmente, un {{< ui >}}Description{{< /ui >}}.
1. En la sección {{< ui >}}Metric definition{{< /ui >}}, haga clic en {{< ui >}}Select an event{{< /ui >}} para abrir el selector de eventos. El gráfico de la derecha se actualiza en tiempo real a medida que configura su métrica.
   1. Seleccione el modelo SQL relevante. Sus modelos SQL aparecen bajo su fuente de datos (por ejemplo, **Revenue Orders** bajo **Snowflake**).
1. Seleccione un [método de agregación](#aggregation-methods) en el menú desplegable.
1. (Opcional) En la sección {{< ui >}}Additional settings{{< /ui >}}:
   1. Active {{< ui >}}Mark as certified{{< /ui >}} para indicar que esta métrica está aprobada para la toma de decisiones importantes. Esto requiere el permiso de escritura de Métricas Certificadas de Product Analytics.
   1. Ajuste [{{< ui >}}Experiment settings{{< /ui >}}](#advanced-options) y {{< ui >}}Units{{< /ui >}} según sea necesario. Los valores predeterminados funcionan para la mayoría de los casos de uso.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="/product_analytics/experiment/exp_create_metric_from_sqlmodel_2.png" alt="El selector de eventos Crear métrica muestra Todos los eventos seleccionados, con tipos de eventos que incluyen Snowflake, Acciones, Vistas, Sesiones, Errores y Tareas largas a la izquierda, y el modelo SQL Revenue Orders resaltado bajo Snowflake a la derecha, mostrando Medidas: cantidad y Dimensiones filtrables: N/A." style="width:80%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[8]: /es/experiments/guide/connecting_a_data_warehouse/
[12]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[13]: /es/experiments/concepts/sql_template_variables/

{{% /tab %}}
{{< /tabs >}}

## Métodos de agregación {#aggregation-methods}

Los métodos de agregación determinan cómo Datadog resume los datos para cada sujeto del experimento. Un sujeto de experimento es la unidad que Datadog aleatoriza para el experimento. Por lo general, es un usuario, pero también puede ser una organización, una cookie o un dispositivo, dependiendo de cómo configure su experimento.

Datadog Experiments admite los siguientes métodos de agregación:

- {{< ui >}}Count of events{{< /ui >}} (predeterminado)
- {{< ui >}}Count of unique users{{< /ui >}} (útil para métricas de conversión)
- {{< ui >}}Sum of{{< /ui >}} una propiedad de evento (útil para métricas de ingresos)
- {{< ui >}}Distinct values of{{< /ui >}} una propiedad de evento (útil para métricas de páginas únicas vistas)
- {{< ui >}}Percentile{{< /ui >}} de una propiedad de evento (útil para métricas de latencia)
- {{< ui >}}Average of{{< /ui >}} una propiedad de evento (útil para métricas de satisfacción)

{{< img src="/product_analytics/experiment/exp_default_metric_agg_1.png" alt="El menú desplegable del método de agregación muestra Count of unique users (seleccionado) y Count of events en la parte superior, seguido de una sección SELECT A MEASURE con las opciones Sum of, Distinct values of, Percentile y Average of, con una descripción que dice 'El número de usuarios que realizaron el evento' a la derecha." style="width:90%;" >}}

Datadog calcula métricas para cada sujeto del experimento. Por ejemplo, una {{< ui >}}Count of events{{< /ui >}} métrica en un experimento aleatorizado por usuario calcula el número total de eventos para todos los usuarios en la variante (grupo de experimento) dividido por el número de usuarios en esa variante.

### Métricas de razón {#ratio-metrics}

Haga clic en {{< ui >}}Create Ratio{{< /ui >}} para dividir la métrica por un valor distinto al número predeterminado de sujetos del experimento. El denominador puede utilizar cualquiera de los [métodos de agregación](#aggregation-methods). Por ejemplo, divida las compras por las visitas a la página del producto para medir la conversión en un paso específico del embudo, en lugar de hacerlo entre todos los usuarios inscritos.

Datadog tiene en cuenta las correlaciones entre el numerador y el denominador utilizando el [delta method][2].

{{< img src="/product_analytics/experiment/exp_create_ratio_new_ui.png" alt="La sección de definición de métricas que muestra el evento 'click on ADD TO CART' con la agregación Count of events y una opción Add Filter, el botón Create Ratio resaltado abajo, y la sección Additional settings con el interruptor Mark as certified, Experiment settings y Units." style="width:90%;" >}}

## Opciones avanzadas {#advanced-options}

Datadog Experiments admite las siguientes opciones avanzadas. Estas se pueden modificar en {{< ui >}}Additional settings{{< /ui >}} > {{< ui >}}Experiment settings{{< /ui >}} al crear una métrica.

Filtros de marco temporal
: De forma predeterminada, Datadog incluye todos los eventos entre la primera exposición de un usuario y el final del experimento. Utilice esta configuración para medir un valor limitado en el tiempo, como \"sesiones dentro de 7 días\". Si agrega un filtro de marco temporal, la métrica solo incluye eventos de la ventana de tiempo especificada, comenzando en el momento en que el experimento inscribe al usuario por primera vez.

Dirección deseada de la métrica
: Datadog resalta los resultados estadísticamente significativos. Utilice esta configuración para especificar si desea que esta métrica aumente o disminuya.

Manejo de valores anómalos
: Los datos del mundo real a menudo incluyen valores anómalos extremos que pueden afectar los resultados del experimento. Utilice esta configuración para establecer un umbral en el que Datadog trunca los datos. Por ejemplo, establezca un límite superior del 99% para truncar todos los resultados en el percentil 99 de la métrica.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[2]: https://en.wikipedia.org/wiki/Delta_method