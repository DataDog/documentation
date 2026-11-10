---
algolia:
  tags:
  - log usage
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /es/logs/guide/logs-monitors-on-volumes/
description: Prácticas recomendadas para administrar y hacer un seguimiento de sus
  registros de manera eficiente en Datadog.
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Centro de arquitectura
  text: Una guía sobre estrategias de indexación para Log Management con Datadog
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprenda a procesar sus registros
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtenga más información sobre el parseo
- link: https://www.datadoghq.com/blog/log-management-policies/
  tag: Blog
  text: Cómo implementar políticas de Log Management con sus equipos
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: Blog
  text: Prácticas recomendadas para administrar organizaciones de Datadog a escala
- link: https://www.youtube.com/watch?v=2OEzAE7c2c0&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=1&pp=iAQB
  tag: Video
  text: 'Consejos y trucos de Datadog: mejore la utilización de registros con filtros
    de exclusión de registros de Datadog'
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centro de aprendizaje
  text: Depuración de pipelines de registros
title: Prácticas recomendadas para Log Management
---
## Descripción general {#overview}

Datadog Log Management recopila, procesa, archiva, explora y hace un seguimiento de sus registros, para que tenga visibilidad de los problemas de su sistema. Sin embargo, puede ser difícil obtener el nivel correcto de visibilidad de sus registros y el rendimiento de los registros puede variar mucho, lo que genera un uso inesperado de recursos.

Por lo tanto, esta guía lo guía a través de varias prácticas recomendadas de Log Management y configuraciones de cuenta que le brindan flexibilidad en la gobernanza, la atribución de uso y el control de presupuesto. Más específicamente, cómo:

- [Configurar múltiples índices para segmentar sus registros](#set-up-multiple-indexes-for-log-segmentation)
- [Configurar múltiples archivos para almacenamiento a largo plazo](#set-up-multiple-archives-for-long-term-storage)
- [Configurar RBAC para roles personalizados](#set-up-rbac-for-custom-roles)

Esta guía también explica cómo hacer un seguimiento del uso de sus registros mediante:

- [Alerting sobre picos inesperados de tráfico de registros](#alert-on-unexpected-log-traffic-spikes)
- [Alerting sobre logs indexados cuando el volumen supera un umbral especificado](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)
- [Hacer un seguimiento de qué índices se consultan activamente](#monitor-which-indexes-are-queried-actively)
- [Configurar filtros de exclusión en registros de alto volumen](#set-up-exclusion-filters-on-high-volume-logs)

Si desea transformar sus registros o redactar datos confidenciales en sus registros antes de que salgan de su entorno, vea cómo [agregar, procesar y transformar sus datos de registro con Observability Pipelines][29].

## Configuración de la cuenta de registros {#log-account-configuration}

### Configurar múltiples índices para la segmentación de registros {#set-up-multiple-indexes-for-log-segmentation}

Configure varios índices si desea segmentar sus registros para diferentes períodos de retención o cuotas diarias, para el seguimiento de uso y facturación.

Por ejemplo, si tiene registros que solo necesitan conservarse durante 7 días, mientras que otros registros necesitan conservarse durante 30 días, utilice varios índices para separar los registros según los dos períodos de retención.

Para configurar varios índices:

1. Navegue a [Log Indexes][1].
2. Haga clic en {{< ui >}}New Index{{< /ui >}} o {{< ui >}}Add a new index{{< /ui >}}.
3. Ingrese un nombre para el índice.
4. Ingrese la consulta de búsqueda para filtrar los registros que desea en este índice.
5. Establezca la cuota diaria para limitar la cantidad de registros que se almacenan en un índice por día.
6. Establezca el período de retención según cuánto tiempo desea conservar estos registros.
7. Haga clic en {{< ui >}}Save{{< /ui >}}.

Establecer cuotas diarias en sus índices puede ayudar a evitar excesos de facturación cuando se agregan nuevas fuentes de registro o si un desarrollador cambia involuntariamente los niveles de registro al modo de depuración. Consulte [Alertar sobre índices que alcanzan su cuota diaria](#alert-on-indexes-reaching-their-daily-quota) para saber cómo configurar un seguimiento que alerte cuando se alcance un porcentaje de la cuota diaria en las últimas 24 horas.

### Configure el almacenamiento para la retención a largo plazo {#set-up-storage-for-long-term-retention}

Si desea retener registros durante un tiempo prolongado mientras mantiene velocidades de consulta similares a las de la indexación estándar, configure [Flex Logs][30]. Este nivel es el más adecuado para registros que requieren una retención más larga y que ocasionalmente necesitan ser consultados con urgencia. Flex Logs desacopla el almacenamiento de los costos de cómputo para que pueda retener más registros de manera rentable durante más tiempo sin sacrificar la visibilidad. Los registros que necesitan ser consultados con frecuencia deben almacenarse en índices estándar.

### Configure varios archivos para el almacenamiento a largo plazo {#set-up-multiple-archives-for-long-term-storage}

Si desea almacenar sus registros durante períodos de tiempo más largos, configure [Log Archives][2] para enviar sus registros a un sistema optimizado para almacenamiento, como Amazon S3, Azure Storage o Google Cloud Storage. Utilice [Archive Search][32] para consultar estos registros directamente desde el almacenamiento en tiempo real. Cuando necesite acceso completo a la plataforma o una retención más larga, use el modo **Search & Rehydration** de Archive Search. Con múltiples archivos, puede segmentar registros por razones de cumplimiento y mantener los costos bajo control.

#### Configure el tamaño máximo de escaneo para gestionar los costos {#set-up-max-scan-size-to-manage-costs}

Establezca un límite en el volumen de registros que se pueden escanear a la vez. Al configurar un archivo, puede definir el volumen máximo de datos de registro que se pueden escanear por consulta de Archive Search o rehidratación. Consulte [Define maximum scan size][4] para obtener más información.

### Configure RBAC para roles personalizados {#set-up-rbac-for-custom-roles}

Existen tres [roles predeterminados de Datadog][5]: Admin, Standard y Read-only. También puede crear roles personalizados con conjuntos de permisos únicos. Por ejemplo, puede crear un rol que restrinja a los usuarios la modificación de las políticas de retención de índices para evitar picos de costos no deseados. De manera similar, puede restringir quién puede modificar las configuraciones de parseo de registros para evitar cambios no deseados en estructuras y formatos de registro bien definidos.

Para configurar roles personalizados con permisos:

1. Inicie sesión en [Datadog][6] como administrador.
2. Navegue a [Organization Settings > Roles][7].
3. Para habilitar roles personalizados, haga clic en el engranaje en la parte superior izquierda y luego haga clic en {{< ui >}}Enable{{< /ui >}}.
4. Una vez habilitado, haga clic en {{< ui >}}New Role{{< /ui >}}.
5. Ingrese un nombre para el nuevo rol.
6. Seleccione los permisos para el rol. Esto le permite restringir el acceso a ciertas acciones, como la rehidratación de registros y la creación de métricas basadas en registros. Consulte [Log Management Permissions][8] para obtener más detalles.
7. Haga clic en {{< ui >}}Save{{< /ui >}}.

Consulte [How to Set Up RBAC for Logs][9] para obtener una guía paso a paso sobre cómo configurar y asignar un rol con permisos específicos para un caso de uso de ejemplo.

## Hacer un seguimiento del uso de registros {#monitor-log-usage}

Puede hacer un seguimiento de su uso de registros configurando lo siguiente:

- [Alerts para picos inesperados de tráfico de registros](#alert-on-unexpected-log-traffic-spikes)
- [Alertar cuando un volumen de log indexado supere un umbral especificado](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)

### Alertar sobre picos inesperados de tráfico de registros {#alert-on-unexpected-log-traffic-spikes}

#### Métricas de uso de registros {#log-usage-metrics}

De forma predeterminada, las [métricas de uso de registros][10] están disponibles para realizar un seguimiento del número de registros ingeridos, bytes ingeridos y logs indexados. Estas métricas son gratuitas y se conservan durante 15 meses:

- `datadog.estimated_usage.logs.ingested_bytes`
- `datadog.estimated_usage.logs.ingested_events`

Consulte [Anomaly detection monitors][11] para conocer los pasos sobre cómo crear monitor de anomalía con las métricas de uso.

**Nota**: Datadog recomienda establecer la unidad en `byte` para `datadog.estimated_usage.logs.ingested_bytes` en la [página de resumen de métricas][12]:

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="La página de resumen de métricas que muestra el panel lateral datadog.estimated_usage.logs.ingested_bytes con la unidad establecida en byte" style="width:70%;">}}

#### Monitores de detección de anomalías {#anomaly-detection-monitors}

Cree un monitor de detección de anomalías para alertar sobre cualquier pico inesperado en la indexación de registros:

1. Navegue a [Monitors > New Monitor][13] y seleccione {{< ui >}}Anomaly{{< /ui >}}.
2. En la sección **Define the metric**, seleccione la métrica `datadog.estimated_usage.logs.ingested_events`.
3. En el campo **from**, agregue la etiqueta `datadog_is_excluded:false` para hacer un seguimiento de los logs indexados y no de los ingeridos.
4. En el campo **sum by**, agregue las etiquetas `service` y `datadog_index`, para que se le notifique si un servicio específico presenta picos o deja de enviar registros en cualquier índice.
5. Establezca las condiciones de alerta para que coincidan con su caso de uso. Por ejemplo, configure el seguimiento para alertar si los valores evaluados están fuera del rango esperado.
6. Agregue un título para la notificación y un mensaje con instrucciones prácticas. Por ejemplo, esta es una notificación con enlaces contextuales:
    ```text
    An unexpected amount of logs has been indexed in the index: {{datadog_index.name}}

    1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
    2. [Agregue un filtro de exclusión en el patrón ruidoso](https://app.datadoghq.com/logs/pipelines/indexes)
    ```
7. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Alertar cuando un volumen de log indexado supere un umbral especificado {#alert-when-an-indexed-log-volume-passes-a-specified-threshold}

Configure un seguimiento para alertar si el volumen de log indexado en cualquier contexto de su infraestructura (por ejemplo, `service`, `availability-zone`) aumenta inesperadamente.

1. Navegue al Log Explorer [14].
2. Ingrese una [consulta de búsqueda][15] que incluya el nombre del índice (por ejemplo, `index:main`) para capturar el volumen de registros que desea hacer un seguimiento.
3. Haga clic en {{< ui >}}More...{{< /ui >}} y seleccione {{< ui >}}Create monitor{{< /ui >}}.
4. Agregue etiquetas (por ejemplo, `host, `servicios, etcétera) al campo {{< ui >}}group by{{< /ui >}}.
5. Ingrese el {{< ui >}}Alert threshold{{< /ui >}} para su caso de uso. Opcionalmente, ingrese un {{< ui >}}Warning threshold{{< /ui >}}.
6. Agregue un título de notificación, por ejemplo:
    ```
    Unexpected spike on indexed logs for service {{service.name}}
    ```
6. Add a message, for example:
    ```
    El volumen en este servicio superó el umbral. Defina un filtro de exclusión adicional o aumente la tasa de muestreo para reducir el volumen.
    ```
7. Haga clic en {{< ui >}}Create{{< /ui >}}.

#### Alertar sobre el volumen de logs indexados desde el comienzo del mes {#alert-on-indexed-logs-volume-since-the-beginning-of-the-month}

Aproveche la métrica `datadog.estimated_usage.logs.ingested_events` filtrada en `datadog_is_excluded:false` para contar solo los logs indexados y la [ventana acumulativa del seguimiento de métricas][28] para hacer un seguimiento del conteo desde el comienzo del mes.

{{< img src="logs/guide/monthly_usage_monitor.png" alt="Configure un seguimiento para alertar sobre el conteo de logs indexados desde el comienzo del mes" style="width:70%;">}}

#### Alertar sobre índices que alcanzan su cuota diaria {#alert-on-indexes-reaching-their-daily-quota}

[Configure una cuota diaria][16] en los índices para evitar indexar más de una cantidad determinada de registros por día. Si un índice tiene una cuota diaria, Datadog recomienda que configure el [seguimiento que notifica sobre el volumen de ese índice](#alert-when-an-indexed-log-volume-passes-a-specified-threshold) para alertar cuando se alcance el 80% de esta cuota en las últimas 24 horas.

Se genera un evento cuando se alcanza la cuota diaria. Estos eventos tienen la etiqueta `datadog_index`, la cual incluye el nombre del índice. Por lo tanto, cuando se haya generado este evento, puede [crear una faceta][17] en la etiqueta `datadog_index`, para que pueda usar `datadog_index` en el paso `group by` para configurar un seguimiento de alerta múltiple.

Para configurar un seguimiento que alerte cuando se alcance la cuota diaria de un índice:

1. Vaya a [Monitors > New Monitor][13] y haga clic en {{< ui >}}Event{{< /ui >}}.
2. Ingrese: `source:datadog datadog_index:* "daily quota reached"` en la sección **Define the search query**. Incluya `datadog_index:*` para asegurarse de que solo se seleccionen los eventos relacionados con el índice.
3. En el campo **Count of**, agregue `datadog_index` para agrupar por índice. Esto actualiza la consulta para que diga `Show Count of * by datadog_index (datadog_index)`.
4. Para **Evaluate the query over**, seleccione **current day**. Para **Starting at**, seleccione la hora en la que se restablecen los índices. Esto mantiene el seguimiento en estado de alerta hasta que se restablezca la cuota. Este es un ejemplo de cómo se ve la consulta de búsqueda cuando se define en Datadog:
   {{< img src="logs/guide/daily_quota_notification_search_query.png" alt="La configuración de la consulta de búsqueda de la alerta de Datadog sobre el límite de cuota de índice alcanzado" style="width:100%;">}}
5. En la sección **Establecer condiciones de alerta**, seleccione `above or equal to` e ingrese `1` para el **Umbral de alerta**.
6. Agregue un título y un mensaje de notificación en la sección {{< ui >}}Configure notifications and automations{{< /ui >}}. El botón {{< ui >}}Multi Alert{{< /ui >}} se selecciona automáticamente porque el seguimiento está agrupado por `datadog_index(datadog_index)`.
7. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota**: La etiqueta `datadog_index(datadog_index)` solo está disponible cuando ya se ha generado un evento.

Este es un ejemplo de cómo se ve la notificación en Slack:

{{< img src="logs/guide/daily_quota_notification.png" alt="Una notificación de Slack sobre la cuota diaria alcanzada en datadog_index:retention-7" style="width:70%;">}}

### Revise el dashboard de uso estimado {#review-the-estimated-usage-dashboard}

Una vez que comience a ingerir registros, se instalará automáticamente en su cuenta un [dashboard][18] preconfigurado que resume sus métricas de uso de registros.

{{< img src="logs/guide/logslight.png" alt="El dashboard de uso estimado de registros que muestra el desglose de lo indexado e ingerido en diferentes widgets" style="width:70%;">}}

**Nota**: Las métricas utilizadas en este dashboard son estimaciones y pueden diferir de las cifras oficiales de facturación.

Para encontrar este dashboard, vaya a {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Dashboards List{{< /ui >}} y busque [Log Management - Estimated Usage][19].

### Haga un seguimiento de qué índices se consultan activamente{#monitor-which-indexes-are-queried-actively}

Hacer un seguimiento de la actividad de consultas le ayuda a evaluar el valor de sus datos indexados y a optimizar los costos. Por ejemplo, puede identificar índices que rara vez se consultan para reducir la retención o mover datos a Flex Logs o archivos.

Para analizar qué índices se consultan activamente:

1. Navegue al [Audit Trail][31]. Este enlace completa previamente la consulta y la agrupación requeridas.
2. Verifique que la consulta esté configurada en `@evt.name:"Log Management" @action:queried`.
3. Seleccione la visualización {{< ui >}}Table{{< /ui >}} para ver una lista clasificada de los índices más y menos utilizados para el marco de tiempo seleccionado.
4. En la sección {{< ui >}}By{{< /ui >}}, agrupe los registros por `@asset.new_value.query.indexes`.

### Configure filtros de exclusión en registros de alto volumen {#set-up-exclusion-filters-on-high-volume-logs}

Cuando sus seguimientos de uso envíen alertas, puede configurar filtros de exclusión y aumentar la tasa de muestreo para reducir el volumen. Consulte [Filtros de exclusión][20] sobre cómo configurarlos. También puede utilizar [Log Patterns][21] para agrupar e identificar registros de alto volumen. Luego, en el panel lateral de Log Patterns, haga clic en {{< ui >}}Add Exclusion Filter{{< /ui >}} para agregar un filtro para dejar de indexar esos registros.

{{< img src="logs/guide/patterns_exclusion.png" alt="La página del Log Explorer que muestra los detalles del panel lateral de un patrón con el botón para agregar filtro de exclusión en la parte superior" style="width:80%;">}}

Incluso si utiliza filtros de exclusión, aún puede visualizar tendencias y anomalías en todos sus datos de registro utilizando métricas basadas en registros. Consulte [Generar métricas a partir de registros ingeridos][22] para obtener más información.

### Habilite Sensitive Data Scanner para la detección de información de identificación personal (PII) {#enable-sensitive-data-scanner-for-personally-identifiable-information-pii-detection}

Si desea evitar fugas de datos y limitar los riesgos de incumplimiento, utilice Sensitive Data Scanner para identificar, etiquetar y, opcionalmente, redactar o aplicar hash a los datos confidenciales. Por ejemplo, puede buscar números de tarjetas de crédito, números de ruta bancaria y claves de API en sus registros, trazas de APM y eventos de RUM. Consulte [Sensitive Data Scanner][23] sobre cómo configurar reglas de escaneo para determinar qué datos escanear.

**Nota**: [Sensitive Data Scanner][24] es un producto facturable por separado.

### Habilite Audit Trail para ver las actividades del usuario {#enable-audit-trail-to-see-user-activities}

Si desea ver las actividades del usuario, como quién cambió la retención de un índice o quién modificó un filtro de exclusión, habilite Audit Trail para ver estos eventos. Consulte [Eventos de Audit Trail][25] para obtener una lista de los eventos específicos de la plataforma y del producto que están disponibles. Para habilitar y configurar Audit Trail, siga los pasos en la [documentación de Audit Trail][26].

**Nota**: [Audit Trail][27] es un producto facturable por separado.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /es/logs/log_configuration/archives/
[4]: /es/logs/log_configuration/archives/?tab=awss3#define-maximum-scan-size
[5]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: https://app.datadoghq.com/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: /es/account_management/rbac/permissions/?tab=ui#log-management
[9]: /es/logs/guide/logs-rbac/
[10]: /es/logs/logs_to_metrics/#logs-usage-metrics
[11]: /es/monitors/types/anomaly/
[12]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[13]: https://app.datadoghq.com/monitors/create
[14]: https://app.datadoghq.com/logs
[15]: /es/logs/explorer/search/
[16]: /es/logs/indexes/#set-daily-quota
[17]: /es/events/explorer/facets
[18]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[19]: https://app.datadoghq.com/dashboard/lists?q=Log+Management+-+Estimated+Usage
[20]: /es/logs/log_configuration/indexes/#exclusion-filters
[21]: /es/logs/explorer/analytics/patterns
[22]: /es/logs/log_configuration/logs_to_metrics/
[23]: /es/security/sensitive_data_scanner/
[24]: https://www.datadoghq.com/pricing/?product=sensitive-data-scanner#sensitive-data-scanner
[25]: /es/account_management/audit_trail/events/
[26]: /es/account_management/audit_trail/
[27]: https://www.datadoghq.com/pricing/?product=audit-trail#audit-trail
[28]: /es/monitors/configuration/?tab=thresholdalert#evaluation-window
[29]: /es/observability_pipelines/
[30]: /es/logs/log_configuration/flex_logs/
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3Aqueried&agg_m=count&agg_m_source=base&agg_q=%40asset.new_value.query.indexes&agg_q_source=base&agg_t=count&audit__diff=unified&cols=log_usr.id%2Clog_action%2Clog_evt.name&fromUser=true&messageDisplay=expanded-md&refresh_mode=sliding&stream_sort=desc&top_n=10&top_o=top&viz=query_table&x_missing=true&live=true
[32]: /es/logs/explorer/archive_search/