---
algolia:
  tags:
  - Uso de logs
  - grok
  - analizador de grok
  - análisis de logs
  - Extracción de atributos
  - Reasignación de atributos
  - análisis
aliases:
- /es/logs/guide/logs-monitors-on-volumes/
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtener más información sobre el análisis
- link: https://www.datadoghq.com/blog/log-management-policies/
  tag: Blog
  text: Cómo implementar las políticas de gestión de logs con tus equipos
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: Blog
  text: Mejores prácticas para gestionar organizaciones de Datadog a escala
title: Prácticas recomendadas para la gestión de logs
---

## Información general

Datadog Log Management recopila, procesa, archiva, explora y monitoriza tus logs para que puedas visualizar los problemas de tu sistema. Sin embargo, puede ser difícil obtener el nivel adecuado de visibilidad de tus logs y el rendimiento de los logs puede variar mucho, lo que crea un uso inesperado de los recursos.

Por tal motivo, esta guía te mostrará varias prácticas recomendadas para la gestión de logs y configuraciones de cuenta que te brindan flexibilidad para la gestión, la atribución de uso y el control del presupuesto. Más concretamente, verás cómo puedes:

- [Configurar varios índices para segmentar tus logs](#set-up-multiple-indexes-for-log-segmentation)
- [Configurar varios archivos para el almacenamiento a largo plazo](#set-up-multiple-archives-for-long-term-storage)
- [Configurar el control de acceso basado en roles (RBAC) para roles personalizados](#set-up-rbac-for-custom-roles)

Esta guía también explica cómo puedes monitorizar el uso de logs:

- [Con alertas para picos inesperados de tráfico de logs](#alert-on-unexpected-log-traffic-spikes)
- [Con alertas para logs indexados cuando el volumen supera un umbral especificado](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)
- [Configurando filtros de exclusión en logs de gran volumen](#set-up-exclusion-filters-on-high-volume-logs)

Si quieres transformar tus logs u ocultar datos confidenciales en tus logs antes de que abandonen tu entorno, consulta cómo puedes [agregar, procesar y transformar tus datos de logs con pipelines de observabilidad][29].

## Configuración de la cuenta de logs

### Configurar varios índices para la segmentación de logs

Configura varios índices si deseas segmentar tus logs para diferentes periodos de retención o cuotas diarias, monitorización de uso y facturación.

Por ejemplo, si tienes logs que sólo deben conservarse durante 7 días, mientras que otros deben conservarse durante 30 días, utiliza varios índices para separar los logs según los dos periodos de conservación.

Para configurar varios índices:

1. Ve a [Índices de logs][1].
2. Haz clic en **New Index** (Nuevo índice) o en **Add a new index** (Añadir un nuevo índice).
3. Introduce un nombre para el índice.
4. Introduce la consulta de búsqueda para filtrar los logs que quieres tener en este índice.
5. Establece la cuota diaria para limitar el número de logs que se almacenan en un índice por día.
6. Establece el periodo durante el cual queres conservar estos logs.
7. Haz clic en **Save** (Guardar).

Establecer cuotas diarias en tus índices puede ayudar a evitar excesos en la facturación cuando se añaden nuevos orígenes de logs o si un desarrollador cambia involuntariamente los niveles de gestión de logs al modo de depuración. Consulta [Alerta de índices que alcanzan su cuota diaria](#alert-on-indexes-reaching-their-daily-quota) para conocer cómo configurar una monitorización que avise cuando se alcanza un porcentaje de la cuota diaria dentro de las últimas 24 horas.

### Configurar el almacenamiento para una retención prolongada

Si deseas retener logs durante un tiempo prolongado mientras mantienes velocidades de consulta similares a las de la indexación estándar, configura [Flex Logs][30]. Este nivel es el más adecuado para logs, que requiere una retención más prolongada y ocasionalmente necesita consultas urgentes. Flex Logs desvincula los costos de almacenamiento de los de cálculo, por lo que puedes retener de forma rentable más logs durante más tiempo sin sacrificar la visibilidad. Los logs que deben consultarse con frecuencia deben almacenarse en índices estándar.

### Crear varios archivos para el almacenamiento a largo plazo

Si quieres almacenar tus logs durante periodos de tiempo más prolongados, configura [Archivos de logs][2] para enviar tus logs a un sistema optimizado para el almacenamiento, como Amazon S3, Azure Storage o Google Cloud Storage. Cuando quieras utilizar Datadog para analizar esos logs, utiliza [Log Rehydration][3]TM para recuperar esos logs de nuevo en Datadog. Con varios archivos, puedes segmentar logs por motivos de cumplimiento y mantener un control sobre los costes de recuperación.

#### Configura el tamaño máximo de escaneado para gestionar las costosas rehidrataciones

Establece un límite para el volumen de logs que pueden recuperarse al mismo tiempo. Al configurar un archivo, puedes definir el volumen máximo de datos de logs que se pueden analizar para su recuperación. Para obtener más información, consulta [Definir el tamaño máximo de análisis][4].

### Configurar el control de acceso basado en roles (RBAC) para roles personalizados

Existen tres [roles predeterminados de Datadog][5]: Administrador, Estándar y Solo lectura. También puedes crear roles personalizados con conjuntos de permisos únicos. Por ejemplo, puedes crear un rol que restrinja la modificación de las políticas de conservación de índices para los usuarios, a fin de evitar picos de costes no deseados. Del mismo modo, puedes restringir quién puede modificar las configuraciones de análisis de logs para evitar cambios no deseados en formatos y estructuras bien definidos de logs.

Para configurar roles personalizados con permisos:

1. Inicia sesión en [Datadog][6] como administrador.
2. Ve a [Organization Settings > Roles (Parámetros de organización > Roles)][7].
3. Para habilitar los roles personalizados, haz clic en el engranaje de la parte superior izquierda y, a continuación, en **Enable** (Habilitar).
4. Una vez habilitados, haz clic en **New Role** (Nuevo rol).
5. Introduce un nombre para el nuevo rol.
6. Selecciona los permisos para el rol. Esto te permite restringir el acceso a determinadas acciones, como la recuperación de logs y la creación de métricas basadas en logs. Para obtener más información, consulta los [permisos de Log Management][8].
7. Haz clic en **Save** (Guardar).

Consulta [Cómo configurar el control de acceso basado en roles (RBAC) para logs][9] para obtener una guía paso a paso sobre cómo configurar y asignar un rol con permisos específicos para un ejemplo de caso de uso.

## Monitorizar el uso de logs

Puedes monitorizar el uso de logs configurando lo siguiente:

- [Alertas para picos inesperados de tráfico de logs](#alert-on-unexpected-log-traffic-spikes)
- [Alertas cuando un volumen de logs indexados supera un umbral especificado](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)

### Alertas para picos inesperados de tráfico de logs

#### Métricas de uso de logs

Por defecto, [las métricas de uso de logs][10] están disponibles para realizar un seguimiento del número de logs consumidos, bytes consumidos y logs indexados. Estas métricas son gratuitas y se conservan durante 15 meses:

- `datadog.estimated_usage.logs.ingested_bytes`
- `datadog.estimated_usage.logs.ingested_events`

Consulta [Monitores para la detección de anomalías][11] para conocer cómo puedes crear monitores de anomalías utilizando métricas de uso.

**Nota**: Datadog recomienda establecer la unidad en `byte` para `datadog.estimated_usage.logs.ingested_bytes` en la [página de resumen de métricas][12]:

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="La página de resumen de métricas muestra el panel lateral de uso estimado de logs y bytes consumidos de Datadog" style="width:70%;">}}

#### Monitores de detección de anomalías

Crea un monitor para la detección de anomalías a fin de alertar sobre cualquier pico inesperado de indexación de logs:

1. Ve a [Monitors > New Monitor (Monitores > Nuevo monitor)][13] y selecciona **Anomaly** (Anomalía).
2. En la sección **Define the metric** (Definir la métrica), selecciona la métrica `datadog.estimated_usage.logs.ingested_events`.
3. En el campo **from** (de), añade la etiqueta (tag) `datadog_is_excluded:false` para monitorizar los logs indexados y no los consumidos.
4. En el campo **sum by** (sumar por), añade las etiquetas `service` y `datadog_index` para recibir una notificación si un servicio específico se dispara o deja de enviar logs en cualquier índice.
5. Configura las condiciones de alerta para que coincidan con tu caso de uso. Por ejemplo, configura el monitor para que alerte si los valores evaluados están fuera de un rango esperado.
6. Añade un título para la notificación y un mensaje con instrucciones para actuar. Por ejemplo, esta es una notificación con enlaces contextuales:
    ```text
    An unexpected amount of logs has been indexed in the index: {{datadog_index.name}}

    1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
    2. [Add an exclusion filter on the noisy pattern](https://app.datadoghq.com/logs/pipelines/indexes)
    ```
7. Haz clic en **Create** (Crear).

### Alerta cuando un volumen de logs indexados supera un umbral especificado

Configura un monitor para alertar si un volumen de logs indexados en cualquier contexto de tu infraestructura (por ejemplo, `service`, `availability-zone`, etc.) está aumentando inesperadamente.

1. Ve al [Explorador de logs][14].
2. Introduce una [consulta de búsqueda][15] que incluya el nombre del índice (por ejemplo, `index:main`) para capturar el volumen de logs que quieres monitorizar.
3. Haz clic en **More...** (Más) y selecciona **Create monitor** (Crear monitor).
4. Añade etiquetas (por ejemplo, servicios `host, `, etc.) al campo **group by** (agrupar por).
5. Completa **Alert threshold** (Umbral de alerta) para tu caso de uso. Opcionalmente, completa **Warning threshold** (Umbral de alerta).
6. Añade un título de notificación, por ejemplo:
    ```
    Unexpected spike on indexed logs for service {{service.name}}
    ```
6. Añade un mensaje, por ejemplo:
    ```
    The volume on this service exceeded the threshold. Define an additional exclusion filter or increase the sampling rate to reduce the volume.
    ```
7. Haz clic en **Create** (Crear).

#### Alerta sobre el volumen de logs indexados desde principios de mes

Aproveche la métrica `datadog.estimated_usage.logs.ingested_events` filtrada en `datadog_is_excluded:false` para contar solo los logs indexados y la [ventana acumulativa de monitor (noun) de métricas][28] para monitorizar el número desde principios de mes.

{{< img src="logs/guide/monthly_usage_monitor.png" alt="Configurar un monitor para alertar del recuento de logs indexados desde principios de mes" style="width:70%;">}}

#### Alertas de índices que alcanzan su cuota diaria

[Establece una cuota diaria][16] en los índices para evitar indexar más de un número determinado de logs al día. Si un índice tiene una cuota diaria, Datadog recomienda que se configure el [monitor que notifica sobre el volumen de ese índice](#alert-when-an-indexed-log-volume-passes-a-specified-threshold) para alertar cuando se alcance el 80% de esta cuota en las últimas 24 horas.

Se genera un evento cuando se alcanza la cuota diaria. Estos eventos tienen la tag (etiqueta) `datadog_index` que incluye el nombre del índice. Por lo tanto, cuando se haya generado este evento, puedes [crear una faceta][17] en la tag (etiqueta) `datadog_index`, de modo que puedas utilizar `datadog_index` en el step (UI) / paso (generic) `group by` para configurar un monitor (noun) de varias alertas.

Para configurar un monitor que alerte cuando se alcanza la cuota diaria para un índice:

1. Ve a [Monitors > New Monitor (Monitores > Nuevo monitor)][13] y selecciona **Event** (Evento).
2. Introduce: `source (fuente):datadog datadog_index:* "daily quota reached"` en la sección **Define the search query** (Definir la consulta de búsqueda). Incluye `datadog_index:*` para asegurarte de que solo se seleccionen los eventos relacionados con el índice.
3. En el campo **Count of** (Número de), añade `datadog_index` para agrupar por índice. Esto actualiza la consulta de modo que se lea `Show Count of * by datadog_index (datadog_index)`.
4. Para **Evaluate the query over** (Evaluar la consulta sobre), selecciona **current day** (día actual). Para **Starting at** (Iniciar a las), selecciona la hora a la que se reinician los índices. Esto mantiene el monitor (noun) en estado de alerta hasta el reinicio de la cuota. Este es un ejemplo de cómo se ve la consulta de búsqueda cuando se define en Datadog:
   {{< img src="logs/guide/daily_quota_notification_search_query.png" alt="La configuración de la alerta de Datadog sobre la consulta de búsqueda que alcanzó la cuota de índice" style="width:100%;">}}
5. En la sección **Set alert conditions** (Establecer condiciones de alerta), selecciona `above or equal to` e introduce `1` para **Alert threshold** (Umbral de alerta).
6. Añade un título de notificación y un mensaje en la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones). El botón **Multi Alert** (Alerta múltiple) se selecciona automáticamente porque el monitor está agrupado por `datadog_index(datadog_index)`.
7. Haz clic en **Save** (Guardar).

**Nota**: La tag (etiqueta) `datadog_index(datadog_index)` solo está disponible cuando ya se ha generado un evento.

Este es un ejemplo del aspecto de la notificación en Slack:

{{< img src="logs/guide/daily_quota_notification.png" alt="Una notificación de Slack sobre la cuota diaria alcanzada en datadog_index:retention-7" style="width:70%;">}}

### Revisar el dashboard de uso estimado

Una vez que empieces a consumir logs, se instalará automáticamente en tu cuenta un [dashboard][18] listo para utilizar que resume las métricas del uso de logs.

{{< img src="logs/guide/logslight.png" alt="El dashboard de uso estimado de logs que muestra el desglose de logs indexados y consumidos en diferentes widgets" style="width:70%;">}}

**Nota**: Las métricas utilizadas en este dashboard son estimaciones y pueden diferir de las cifras de facturación oficiales.

Para encontrar este dashboard, ve a **Dashboards > Dashboards List** (Dashboards > Listas de dashboards) y busca [Log Management - Estimated Usage (Log Management - Uso estimado)][19].

### Establecer filtros de exclusión en logs de gran volumen

Cuando haya alertas de los monitores de uso, puedes configurar filtros de exclusión y aumentar la frecuencia de muestreo para reducir el volumen. Consulta [Filtros de exclusión][20] para saber cómo configurarlos. También puedes utilizar [Patrones de logs][21] para agrupar e identificar logs de gran volumen. A continuación, en el panel lateral del patrón de logs, haz clic en **Add Exclusion Filter** (Añadir filtro de exclusión) para añadir un filtro que impida la indexación de esos logs.

{{< img src="logs/guide/patterns_exclusion.png" alt="La página del explorador de logs muestra los detalles del panel lateral de un patrón con el botón para añadir filtros de exclusión en la parte superior" style="width:80%;">}}

Incluso si utilizas filtros de exclusión, puedes visualizar tendencias y anomalías sobre todos tus datos de logs, utilizando las métricas basadas en logs. Para obtener más información, consulta [Generar métricas a partir de logs consumidos][22].

### Habilitar Sensitive Data Scanner para la detección de información de identificación personal (PII)

Si deseas evitar fugas de datos y limitar los riesgos de incumplimiento, utiliza Sensitive Data Scanner para identificar, etiquetar y, opcionalmente, redactar o aplicar hash a los datos confidenciales. Por ejemplo, puedes buscar números de tarjetas de crédito, números de ruta bancaria y claves de API en tus logs, spans (tramos) de APM y eventos de RUM. Consulta [Sensitive Data Scanner][23] para saber cómo configurar reglas de análisis para determinar qué datos analizar.

**Nota**: [Sensitive Data Scanner][24] es un producto que se factura por separado.

### Habilitar Audit Trail para ver las actividades de los usuarios

Si quieres ver las actividades de los usuarios, como quién ha cambiado las opciones de conservación de un índice o quién ha modificado un filtro de exclusión, habilita Audit Trail para ver estos eventos. Consulta [Eventos de Audit Trail][25] para obtener una lista de los eventos específicos de plataformas y productos que están disponibles. Para habilitar y configurar Audit Trail, sigue los pasos que se indican en la [documentación de Audit Trail][26].

**Nota**: [Audit Trail][27] es un producto que se factura por separado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /es/logs/log_configuration/archives/
[3]: /es/logs/log_configuration/rehydrating/
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
[17]: /es/service_management/events/explorer/facets
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