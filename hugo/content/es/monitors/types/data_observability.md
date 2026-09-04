---
description: Haga un seguimiento de la frescura, el recuento de filas, las métricas
  a nivel de columna y las consultas SQL personalizadas en sus almacenes de datos.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Descripción general de Data Observability
- link: /data_observability/quality_monitoring/
  tag: Documentación
  text: Quality Monitoring
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de seguimiento
- link: /monitors/downtimes/
  tag: Documentación
  text: Programe un tiempo de inactividad para silenciar un seguimiento
- link: /monitors/status/
  tag: Documentación
  text: Consulte el estado de su seguimiento
title: Seguimiento de Data Observability
---
## Descripción general {#overview}

Los seguimientos de [Data Observability][1] utilizan detección de anomalías que aprende de la estacionalidad, las tendencias y los comentarios de los usuarios para detectar datos retrasados, cargas incompletas y cambios de valor inesperados antes de que afecten a los tableros, las aplicaciones de IA o las decisiones comerciales posteriores. Combinados con el linaje de datos y código de extremo a extremo, estos seguimientos ayudan a los equipos a detectar problemas de manera temprana, evaluar el impacto posterior y dirigir el problema al propietario correcto.

Los seguimientos de Data Observability admiten los siguientes tipos de métricas:

**Tipos de métricas a nivel de tabla:**
| Tipo de métrica | Descripción |
|---|---|
| Frescura | Realiza un seguimiento del tiempo transcurrido desde la última actualización de una tabla. |
| Recuento de filas | Realiza un seguimiento del número de filas en una tabla o vista. |
| SQL personalizado | Realiza un seguimiento de un valor de métrica personalizado devuelto por una consulta SQL. |

**Tipos de métricas a nivel de columna:**
| Tipo de métrica | Descripción |
|---|---|
| Frescura | Realiza un seguimiento de la fecha más reciente observada en una columna de fecha y hora. |
| Unicidad | Realiza un seguimiento del porcentaje de valores únicos. |
| Nulidad | Realiza un seguimiento del porcentaje de valores nulos. |
| Cardinalidad | Realiza un seguimiento del número de valores distintos. |
| Porcentaje de cero | Realiza un seguimiento del porcentaje de valores iguales a cero. |
| Porcentaje de negativos | Realiza un seguimiento del porcentaje de valores negativos. |
| Mín. / Máx. / Promedio / Suma / Desviación estándar | Realiza un seguimiento de las medidas estadísticas en los valores de las columnas. |

Datadog recopila métricas como el recuento de filas y la frescura a partir de los metadatos del sistema de los almacenes de datos (por ejemplo, `INFORMATION_SCHEMA`) cuando están disponibles. Esto evita ejecutar una consulta en su almacén y reduce los costos de cómputo. No todos los almacenes exponen metadatos del sistema. Para las métricas que no se pueden recopilar de los metadatos del sistema, el seguimiento ejecuta una consulta directamente en su almacén para calcular el valor.

Los seguimientos de Data Observability requieren que [Quality Monitoring][2] esté configurado con al menos un almacén de datos compatible (por ejemplo, [Snowflake][3], [Databricks][4], o [BigQuery][5]).

Data Observability ofrece cuatro tipos de seguimiento, seleccionados en el primer paso del [flujo de creación de monitor][13]:

| Tipo de seguimiento | Lo que hace seguimiento |
|---|---|
| Calidad de datos | Frescura, recuento de filas y métricas a nivel de columna en tablas y columnas. |
| [De origen a destino](#source-to-target-monitors) | La diferencia en la misma métrica entre un activo de origen y un activo de destino. |
| [Cambio de esquema](#schema-change-monitors) | Campos agregados, eliminados, renombrados o con tipo de dato modificado en su almacén. |
| Trabajo | Trabajos fallidos. |

A menos que se indique lo contrario, las secciones a continuación describen el tipo de seguimiento de calidad de datos.

## Creación de un seguimiento {#monitor-creation}

Para crear un seguimiento de Data Observability en Datadog, navegue a [{{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6] o [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Data Observability{{< /ui >}}][6]. Para ver todos los seguimientos de Data Observability existentes, consulte la [página de monitores de Data Observability][7].

## Elegir datos para hacer un seguimiento {#choose-data-to-monitor}

Primero, seleccione si desea hacer un seguimiento del nivel {{< ui >}}Table{{< /ui >}} o {{< ui >}}Column{{< /ui >}}:

{{< img src="monitors/monitor_types/data_observability/entity_type_selection_and_aastra.png" alt="Elija los datos para hacer un seguimiento: selector de tipo de entidad, entrada de consulta y filtro de relación de linaje" style="width:60%;" >}}

Luego, use la pestaña {{< ui >}}Edit{{< /ui >}} para buscar tablas, vistas o columnas escribiendo filtros `key:value` en el campo de búsqueda.

**Filtrar por nombre o ubicación:**

| Filtro | Ejemplo | Descripción |
|---|---|---|
| Nombre | `name:USERS*` | Coincidir por nombre. Admite comodines `*`. |
| Esquema | `schema:PROD` | Coincidir por esquema. |
| Base de datos | `database:ANALYTICS_DB` | Coincidir por base de datos. |
| Cuenta | `account:my_account` | Coincidir por cuenta. |

**Filtrar por etiqueta:**

Filtre por cualquier etiqueta aplicada a sus activos de datos usando la clave de etiqueta como clave de filtro. Por ejemplo, si sus activos están etiquetados con `owner`, `platform` o `environment`, busque directamente en esas etiquetas:

| Ejemplo | Descripción |
|---|---|
| `owner:data-platform-team` | Coincidir con activos con la etiqueta `owner:data-platform-team`. |
| `platform:snowflake` | Coincidir con activos con la etiqueta `platform:snowflake`. |
| `environment:production` | Coincidir con activos con la etiqueta `environment:production`. |

Los filtros de etiqueta admiten los mismos comodines `*` y comillas que los filtros de nombre, por ejemplo, `owner:data-*` o `platform:"Snowflake Prod"`.

**Filtrar por atributo calculado:**

Además de sus propias etiquetas, Datadog calcula atributos para sus activos de datos sobre los cuales puede filtrar. El atributo calculado disponible es:

| Atributo | Valores | Descripción |
|---|---|---|
| `lineage_score` | `0.00`, `0.10`, `0.30`, `0.50`, `0.70`, `0.90` o `1.00` | Una medida relativa de qué tan conectado está un activo en su gráfico de linaje, basada en cuántos activos descendentes dependen de él en comparación con otros activos del mismo tipo. Los valores más altos identifican las tablas, vistas y columnas de las que dependen los consumidores descendentes. |

`lineage_score` se clasifica en los niveles discretos enumerados anteriormente en lugar de tomar un valor continuo, así que filtre por uno de esos valores exactos. Coincida con un solo nivel, o combine niveles con `OR`. Por ejemplo, `lineage_score:1.00` devuelve sus activos con más dependencias, y `lineage_score:(0.90 OR 1.00)` devuelve los dos niveles superiores.

Combine cualquiera de estos filtros con `AND` o `OR`, use paréntesis para agrupar condiciones y añada el prefijo `-` para excluir.

**Ejemplos:**

| Objetivo | Consulta |
|---|---|
| Todas las tablas en el esquema PROD, excluyendo tablas temporales | `schema:PROD AND -name:TEMP*` |
| Todas las columnas de marca de tiempo | `name:*_AT OR name:*_TIMESTAMP` |
| Tablas en PROD o STAGING para una base de datos específica | `database:ANALYTICS_DB AND (schema:PROD OR schema:STAGING)` |
| Tablas propiedad de un equipo específico | `owner:data-platform-team` |
| Las tablas con más dependencias en una base de datos | `database:ANALYTICS_DB AND lineage_score:1.00` |

**Filtrar por relación de linaje:**

Para limitar su selección a activos que están conectados a otro activo en su gráfico de linaje, haga clic en {{< ui >}}Add Relation Filter{{< /ui >}}. Elija {{< ui >}}Upstream of{{< /ui >}} o {{< ui >}}Downstream of{{< /ui >}}, luego seleccione un activo específico o use los mismos filtros `key:value` para coincidir con un conjunto de activos. Por ejemplo, supervise cada tabla que esté aguas arriba de un tablero crítico, o cada columna aguas abajo de una tabla de fuente específica.

**Filtrar por relación de jerarquía:**

Para limitar su selección a activos que sean padres o hijos de otro activo en su gráfico de linaje, haga clic en {{< ui >}}Add Relation Filter{{< /ui >}}. Elija {{< ui >}}Parent of{{< /ui >}} o {{< ui >}}Child of{{< /ui >}}, luego seleccione un activo específico o use los mismos filtros `key:value` para coincidir con un conjunto de activos. Por ejemplo, haga un seguimiento de cada tabla que tenga una columna `revenue`, o de cada tabla que esté dentro de un esquema crítico.

Un solo seguimiento puede rastrear hasta 5,000 tablas, vistas o columnas. Este límite no se puede aumentar. Si su consulta coincide con más, divídalos en varios seguimientos.

## Seleccione su tipo de métrica {#select-your-metric-type}

Elija un tipo de métrica según la señal de calidad de datos que desee rastrear. Cada seguimiento rastrea un tipo de métrica.

{{< tabs >}}
{{% tab "Frescura" %}}

El tipo de métrica {{< ui >}}Freshness{{< /ui >}} detecta cuando los datos no se han actualizado dentro de una ventana de tiempo esperada. Úselo para detectar datos obsoletos antes de que afecten a los informes o modelos aguas abajo.

- **Frescura de la tabla** rastrea el tiempo transcurrido desde que la tabla se actualizó por última vez. La actualidad de la tabla no está disponible para vistas o para almacenes de datos que no proporcionan marcas de tiempo actualizadas para las tablas en los metadatos del sistema. Utilice la actualidad a nivel de columna en su lugar.
- **Actualidad de la columna** rastrea la fecha más reciente vista en una columna de fecha y hora.

{{% /tab %}}
{{% tab "Recuento de filas" %}}

El tipo de métrica {{< ui >}}Row Count{{< /ui >}} rastrea los cambios en el recuento de filas en sus tablas. Úsela para detectar caídas o picos inesperados en los datos que podrían indicar fallas en la canalización o problemas en los procesos ascendentes.

{{% /tab %}}
{{% tab "Métrica de columna" %}}

{{< ui >}}Column{{< /ui >}} Los tipos de métricas rastrean métricas a nivel de columna para detectar la desviación de datos o la degradación de la calidad. Seleccione de lo siguiente:

| Métrica | Descripción |
|---|---|
| {{< ui >}}Uniqueness{{< /ui >}} | El porcentaje de valores en una columna que son únicos. |
| {{< ui >}}Nullness{{< /ui >}} | El porcentaje de valores en una columna que son nulos. |
| {{< ui >}}Cardinality{{< /ui >}} | La cantidad de valores distintos en una columna. |
| {{< ui >}}Percent Zero{{< /ui >}} | El porcentaje de valores en una columna que son iguales a cero. |
| {{< ui >}}Percent Negative{{< /ui >}} | El porcentaje de valores en una columna que son negativos. |
| {{< ui >}}Min{{< /ui >}} | El valor mínimo de todos los valores en una columna. |
| {{< ui >}}Max{{< /ui >}} | El valor máximo de todos los valores en una columna. |
| {{< ui >}}Mean{{< /ui >}} | El promedio de todos los valores en una columna. |
| {{< ui >}}Standard Deviation{{< /ui >}} | La medida de variación dentro de los valores en una columna. |
| {{< ui >}}Sum{{< /ui >}} | La suma de todos los valores en una columna. |

<div class="alert alert-info">Algunas métricas de columna solo están disponibles para tipos de columna específicos. Las métricas numéricas (Porcentaje de cero, Porcentaje de negativos, Mínimo, Máximo, Promedio, Desviación estándar, Suma) requieren columnas numéricas.</div>

{{% /tab %}}
{{% tab "SQL personalizado" %}}

El tipo de métrica {{< ui >}}Custom SQL{{< /ui >}} rastrea un valor de métrica personalizado devuelto por una consulta SQL que usted define. Úselo cuando los tipos de métricas integrados no cubran su caso de uso, como el monitoreo de reglas de calidad de datos específicas del negocio.

1. Seleccione un tipo de modelo que describa el valor devuelto por su consulta:
    - {{< ui >}}Default{{< /ui >}}: La consulta devuelve un valor escalar. Utilice esto en la mayoría de los casos.
    - {{< ui >}}Freshness{{< /ui >}}: La consulta devuelve la diferencia (en segundos) entre la hora actual y la última vez que ocurrió un evento.
    - {{< ui >}}Percentage{{< /ui >}}: La consulta devuelve un valor porcentual entre 0 y 100.
2. Escriba una consulta SQL que devuelva un único valor con el alias `dd_value`, por ejemplo: `SELECT COUNT(*) as dd_value FROM ANALYTICS_DB.PROD.ORDERS WHERE STATUS = 'FAILED'`
3. Haga clic en {{< ui >}}Validate{{< /ui >}} para verificar la sintaxis de su consulta.

Si su consulta SQL incluye una cláusula `GROUP BY`, enumere las columnas agrupadas como una lista separada por comas en el campo {{< ui >}}Group by{{< /ui >}} (por ejemplo, `column_a, column_b`). Cada grupo se evalúa de forma independiente.

**Nota**: Cada monitor de SQL personalizado cuenta como una tabla monitoreada individual para fines de facturación.

{{< img src="monitors/monitor_types/data_observability/custom_sql_example.png" alt="Campo de entrada para la creación de monitores de SQL personalizados." style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Configurar monitor {#configure-monitor}

### Método de detección {#detection-method}

Seleccione un método de detección:

- {{< ui >}}Anomalies{{< /ui >}}: Alerta cuando la métrica se desvía de un patrón esperado. No se requieren valores de umbral. El modelo de anomalía requiere **de 3 a 7 días** para entrenarse (incluyendo un fin de semana), dependiendo de la frecuencia con la que se actualicen los datos subyacentes. Durante el período de entrenamiento, el monitor no activa alertas y se visualiza en azul. Una vez completado el entrenamiento, el monitor se muestra en verde cuando está en un estado normal y en rojo cuando está en un valor anómalo.
- {{< ui >}}Thresholds{{< /ui >}}: Alerta cuando la métrica cruza un valor fijo. Establezca el operador de comparación (`above`, `above or equal to`, `below`, `below or equal to`, `equal to` o `not equal to`) y defina un umbral {{< ui >}}Critical{{< /ui >}} (obligatorio) y, opcionalmente, un umbral {{< ui >}}Warning{{< /ui >}}. Para obtener más detalles, consulte [Configure Monitors][8].

### Cláusula WHERE {#where-clause}

Agregue una cláusula {{< ui >}}WHERE{{< /ui >}} para filtrar los datos evaluados por el monitor. Esto es útil para monitorear segmentos específicos de datos o solo registros recientes. Por ejemplo:

- `created_at >= DATEADD(day, -7, CURRENT_TIMESTAMP())` — solo hacer un seguimiento de las filas de la última semana.
- `region = 'US'` — solo hacer un seguimiento de los datos de una región específica.

### Agrupar por {#group-by}

Puede agregar una cláusula {{< ui >}}Group by{{< /ui >}} para dividir un solo monitor en varios grupos, cada uno evaluado de forma independiente. Por ejemplo, agrupar un monitor de recuento de filas por una columna `REGION` genera una alerta independiente para cada geografía.

{{< img src="monitors/monitor_types/data_observability/group_by_column_selection.png" alt="Campo de entrada para seleccionar dimensiones de GROUP BY." style="width:80%;" >}}

El límite predeterminado es de 500 grupos por monitor. Para aumentar este límite, [contacte a Soporte][9].

### Configuración del modelo {#model-configuration}

Para monitores que utilizan el método de detección {{< ui >}}Anomalies{{< /ui >}}, expanda {{< ui >}}Model configuration{{< /ui >}} para refinar cómo se comporta el modelo:

| Configuración | Descripción |
|---|---|
| {{< ui >}}Alert after N consecutive anomalies{{< /ui >}} | La cantidad de evaluaciones fallidas consecutivas antes de que el monitor envíe una alerta. Configure este ajuste para suprimir picos aislados. |
| {{< ui >}}Minimum upper bound size{{< /ui >}} | Restringe qué tan estrictamente el modelo rastrea sus datos en el extremo superior. |
| {{< ui >}}Minimum lower bound size{{< /ui >}} | Restringe qué tan estrictamente el modelo rastrea sus datos en el extremo inferior. |

En el menú desplegable {{< ui >}}If data is missing to evaluate{{< /ui >}}, seleccione lo que informa el monitor cuando no hay datos disponibles para una evaluación.

### Programación del monitor {#monitor-schedule}

Establezca con qué frecuencia el monitor evalúa sus datos:

- {{< ui >}}Scheduled{{< /ui >}}: El monitor se ejecuta con una cadencia fija. En {{< ui >}}Run this monitor{{< /ui >}}, seleccione {{< ui >}}Hourly{{< /ui >}}, {{< ui >}}Every 3 hours{{< /ui >}}, {{< ui >}}Every 6 hours{{< /ui >}}, {{< ui >}}Every 12 hours{{< /ui >}}, {{< ui >}}Daily{{< /ui >}} o {{< ui >}}Custom schedule{{< /ui >}}.
- {{< ui >}}Manual{{< /ui >}} (Vista previa): El monitor se ejecuta solo cuando se activa mediante programación. Active estos monitores usando la [Data Observability API][10] en un horario para acumular suficientes datos históricos para que el modelado sea útil. La interfaz de usuario no admite métricas predeterminadas como recuentos de filas y actualidad, por lo que este flujo de trabajo se aplica a métricas personalizadas o de nivel de columna.

Para definir su propia cadencia, seleccione {{< ui >}}Custom schedule{{< /ui >}} y proporcione una expresión cron. Un horario personalizado puede ejecutarse con una frecuencia de hasta cada 15 minutos. {{< ui >}}Preview times{{< /ui >}} enumera las próximas ejecuciones en su zona horaria local, para que pueda confirmar la expresión antes de guardarla.

### Establecer condiciones de alerta {#set-alert-conditions}

Elija un tipo de agregación:

- {{< ui >}}Simple Alert{{< /ui >}}: Enviar una única notificación cuando cualquier tabla o columna monitorizada cumpla la condición.
- {{< ui >}}Multi Alert{{< /ui >}}: Enviar una notificación por cada grupo que cumpla la condición. Personalice las dimensiones por las que agrupar (por ejemplo, `table`, `schema`, `database`) para controlar la granularidad de la alerta. Por ejemplo, agrupar por `schema` solo envía una alerta por esquema, agrupando todas las tablas afectadas para reducir el ruido.

### Ejemplo de notificación {#example-notification}

{{< tabs >}}
{{% tab "Umbral" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Data quality issue detected on {{database.name}}.{{schema.name}}.{{table.name}}:
current value {{value}} has breached the threshold of {{threshold}}.
{{/is_alert}}

{{#is_recovery}}
Data quality issue on {{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Current value {{value}} is within the threshold of {{threshold}}.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Anomalía" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Anomaly detected on {{database.name}}.{{schema.name}}.{{table.name}}:
observed value {{observed}} is outside the expected range of {{lower_bound}} to {{upper_bound}}
(predicted: {{predicted}}).
{{/is_alert}}

{{#is_recovery}}
{{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Observed value {{observed}} is within the expected range.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Monitores de fuente a destino {#source-to-target-monitors}

<div class="alert alert-info">Los monitores de fuente a destino están en Vista previa. Comuníquese con su representante de Datadog o con <a href="/help/">soporte</a> para solicitar acceso.</div>

Un monitor de fuente a destino compara la misma métrica en dos activos de datos y alerta cuando los dos valores divergen. Otros monitores de Data Observability hacen un seguimiento de si un solo activo está actualizado o completo. Un monitor de origen a destino rastrea si la copia que llegó a un destino coincide con lo que salió del origen.

Cuando una canalización mueve datos entre sistemas, las fallas parciales rara vez parecen fallas. Si 100,000 filas salen de una tabla de fuente y 99,850 filas llegan al destino, un monitor de recuento de filas solo en el destino ve un valor plausible. Comparar los dos activos revela la brecha.

Utilice un monitor de origen a destino para:

- Validar la replicación de Postgres a Databricks.
- Conciliar dos bases de datos dentro de la misma cuenta de Snowflake, por ejemplo, una base de datos de calidad frente a la de producción.
- Verificar una migración de Redshift a BigQuery antes del cambio, ejecutando ambos sistemas simultáneamente y confirmando que coincidan.
- Confirmar que una transformación no elimine filas entre su entrada y su salida.

Los monitores de fuente a destino están disponibles en todas las regiones excepto en GovCloud.

### Crear un seguimiento de fuente a destino {#create-a-source-to-target-monitor}

1. Navegue a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6] y seleccione {{< ui >}}Source to Target{{< /ui >}}.
2. En {{< ui >}}Choose source{{< /ui >}}, seleccione el almacén que contiene los datos de fuente, luego seleccione los datos a comparar.
3. En {{< ui >}}Choose target{{< /ui >}}, haga lo mismo para el destino. La fuente y el destino pueden estar en diferentes almacenes de datos o en el mismo.
4. En {{< ui >}}Select your metric type{{< /ui >}}, elija la métrica para comparar. Los seguimientos de fuente a destino admiten los mismos tipos de métricas que otros seguimientos de Data Observability, incluidos el recuento de filas, la frescura, la nulidad, la unicidad, la cardinalidad y {{< ui >}}Custom SQL{{< /ui >}}.
5. Configure {{< ui >}}Format{{< /ui >}} para controlar cómo se expresa la comparación:
    - {{< ui >}}Difference{{< /ui >}}: el valor de destino menos el valor de fuente. Un valor negativo significa que el destino tiene menos que la fuente.
    - {{< ui >}}% Difference{{< /ui >}}: la misma diferencia como un porcentaje del valor de la fuente.
6. Configure el método de detección, el horario y las notificaciones como se describe en [Configurar seguimiento](#configure-monitor).

El {{< ui >}}Preview Monitor Evaluation{{< /ui >}} panel muestra la fuente y el destino identificados, junto con una vista previa de la métrica seleccionada.

El activo monitoreado es el destino, por lo que el seguimiento aparece en la página de estado del destino.

### Comparar una métrica personalizada {#compare-a-custom-metric}

Cuando el tipo de métrica sea {{< ui >}}Custom SQL{{< /ui >}}, proporcione una consulta para la fuente y una consulta para el destino. No se acepta una cláusula {{< ui >}}WHERE{{< /ui >}} para este tipo de métrica. Incluya cualquier filtrado en cada consulta.

### Evaluación {#evaluation}

La diferencia entre la fuente y el destino se registra como su propia métrica, por lo que un seguimiento de fuente a destino se evalúa mediante los mismos métodos de detección que cualquier otro seguimiento de Data Observability, incluida la detección de anomalías. Ambos lados se miden en un horario sincronizado, por lo que los dos valores se capturan al mismo tiempo en lugar de seguir la cadencia de recolección predeterminada de cada almacén.

## Seguimientos de cambio de esquema {#schema-change-monitors}

<div class="alert alert-info">Seguimientos de cambio de esquema están en versión preliminar.</div>

Un seguimiento de cambio de esquema alerta cuando la estructura de sus datos cambia, en lugar de cuando cambia su contenido. Úselo para detectar un cambio ascendente antes de que interrumpa una canalización o un tablero descendente, como cuando se elimina, cambia de nombre o se cambia una columna a un tipo de datos diferente.

Los seguimientos de cambios de esquema detectan cuatro tipos de cambios en bases de datos, esquemas, tablas y columnas:

| Tipo de cambio | Descripción |
|---|---|
| Agregado | Se creó una base de datos, un esquema, una tabla o una columna. |
| Eliminado | Se eliminó una base de datos, un esquema, una tabla o una columna. |
| Renombrado | Se cambió el nombre de una tabla o columna. |
| Tipo cambiado | El tipo de datos de una columna cambió, por ejemplo, de `INTEGER` a `STRING`. |

Los cambios de esquema se detectan para Snowflake, BigQuery, Databricks y Redshift.

### Crear un seguimiento de cambios de esquema {#create-a-schema-change-monitor}

1. Navegue a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Schema Change{{< /ui >}}][11].
2. En {{< ui >}}Choose data to monitor{{< /ui >}}, seleccione el almacén que desea incluir en el seguimiento.
3. Configure las notificaciones como se describe en [Configurar seguimiento](#configure-monitor).

Un seguimiento de cambios de esquema no requiere un tipo de métrica ni un método de detección, ya que alerta sobre un cambio estructural en lugar de un valor medido que supera un límite.

### Explorar cambios de esquema detectados {#browse-detected-schema-changes}

Para ver los cambios que Datadog ha detectado sin crear un seguimiento, vaya a [{{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Schema Changes{{< /ui >}}][12]. Filtre por plataforma, cuenta, base de datos, esquema o tipo de cambio, y expanda una entrada para ver las columnas afectadas y sus tipos de datos.

Los cambios se detectan cuando Datadog recopila los metadatos del esquema de su almacén la próxima vez y compara la estructura actual con la recopilada anteriormente.

## Ejemplos de seguimientos {#example-monitors}

{{< tabs >}}
{{% tab "Disminución del recuento de filas" %}}

Detecte una disminución significativa en el recuento de filas que podría indicar un error en la canalización o falta de datos.

1. Seleccione {{< ui >}}Table{{< /ui >}} > {{< ui >}}Row Count{{< /ui >}} y elija la tabla de destino (por ejemplo, `ANALYTICS_DB.PROD.EVENTS`).
2. Seleccione {{< ui >}}Anomalies{{< /ui >}} como el método de detección. El seguimiento se activa cuando el recuento de filas se desvía de su línea base histórica.

{{% /tab %}}
{{% tab "Tabla obsoleta" %}}

Alerta cuando una tabla crítica no se ha actualizado dentro del intervalo de tiempo esperado.

1. Seleccione {{< ui >}}Table{{< /ui >}} > {{< ui >}}Freshness{{< /ui >}} y elija la tabla de destino (por ejemplo, `ANALYTICS_DB.PROD.ORDERS`).
2. Seleccione {{< ui >}}Thresholds{{< /ui >}} como el método de detección.
3. Establezca el {{< ui >}}Alert threshold{{< /ui >}} en **6 horas** y opcionalmente un {{< ui >}}Warning threshold{{< /ui >}} en **4 horas**.

{{% /tab %}}
{{% tab "Pico de porcentaje nulo" %}}

Detecte cuando el porcentaje de nulos de una columna supera los niveles normales, lo que puede indicar problemas de ingesta de datos.

1. Seleccione {{< ui >}}Column{{< /ui >}} > {{< ui >}}Nullness{{< /ui >}} y elija la columna de destino (por ejemplo, `ANALYTICS_DB.PROD.USERS.EMAIL`).
2. Seleccione {{< ui >}}Anomalies{{< /ui >}} como el método de detección.

{{% /tab %}}
{{% tab "Filas perdidas entre la fuente y el destino" %}}

Detecte las filas perdidas entre una tabla de fuente y su destino después de una replicación o migración.

1. Seleccione {{< ui >}}Source to Target{{< /ui >}}, luego elija la tabla de fuente (por ejemplo, `POSTGRES_DB.PUBLIC.ORDERS`) y la tabla de destino (por ejemplo, `ANALYTICS_DB.PROD.ORDERS`).
2. Seleccione {{< ui >}}Row Count{{< /ui >}} como el tipo de métrica y establezca {{< ui >}}Format{{< /ui >}} en {{< ui >}}Difference{{< /ui >}}.
3. Seleccione {{< ui >}}Anomalies{{< /ui >}} como el método de detección.

{{% /tab %}}
{{< /tabs >}}

## Anotar límites {#annotate-bounds}

Para los seguimientos que utilizan el método de detección de **anomalía**, puede anotar rangos de límites para proporcionar comentarios y mejorar el modelo con el tiempo. A diferencia de las métricas de infraestructura, las métricas de calidad de datos suelen ser específicas del negocio, así que utilice anotaciones para enseñar al modelo qué comportamiento es normal para sus datos.

{{< img src="/monitors/monitor_types/data_observability/annotate_bounds.png" alt="Menú flotante para anotar un límite de seguimiento." style="width:90%;" >}}

En la página de estado de un seguimiento, haga clic en {{< ui >}}Annotate Bounds{{< /ui >}}, seleccione un rango de tiempo en el gráfico y elija una de las siguientes anotaciones:

| Anotación | Descripción |
|---|---|
| {{< ui >}}Expected{{< /ui >}} | Ampliar los límites para incluir el comportamiento marcado de forma permanente. |
| {{< ui >}}Reset for now{{< /ui >}} | Marcar comportamiento como correcto, pero alertar si vuelve a ocurrir. |
| {{< ui >}}Missed alert{{< /ui >}} | Limitar los límites para alertar sobre este comportamiento. |
| {{< ui >}}Ignore{{< /ui >}} | Excluir datos anotados al modelar los límites. |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_observability/
[2]: /es/data_observability/quality_monitoring/
[3]: /es/data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /es/data_observability/quality_monitoring/data_warehouses/databricks/
[5]: /es/data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: https://app.datadoghq.com/monitors/create/data-quality
[7]: https://app.datadoghq.com/data-obs/monitors
[8]: /es/monitors/configuration/?tab=thresholdalert#thresholds
[9]: /es/help/
[10]: /es/api/latest/data-observability/
[11]: https://app.datadoghq.com/monitors/create/schema-change
[12]: https://app.datadoghq.com/data-obs/schema-changes
[13]: https://app.datadoghq.com/monitors/create/data-quality