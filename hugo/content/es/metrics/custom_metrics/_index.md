---
algolia:
  tags:
  - custom metrics
aliases:
- /es/guides/metrics/
- /es/metrictypes/
- /es/units/
- /es/developers/metrics/datagram_shell
- /es/developers/metrics/custom_metrics/
- /es/getting_started/custom_metrics
- /es/developers/metrics/
- /es/metrics/guide/tag-configuration-cardinality-estimation-tool/
further_reading:
- link: /extend/dogstatsd/
  tag: Documentación
  text: Aprende más sobre DogStatsD
- link: /extend/community/libraries/
  tag: Documentación
  text: Bibliotecas de API y clientes de DogStatsD creadas oficialmente y por la comunidad
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de Custom Metrics
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Mejores prácticas para la gobernanza de Custom Metrics
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Controla dinámicamente el volumen de tus Custom Metrics con Metrics without
    Limits™
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseña tableros ejecutivos efectivos con Datadog
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: Centro de Aprendizaje
  text: Gobernanza de métricas
title: Custom Metrics
---
{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explora y regístrate para las sesiones de habilitación de la Fundación para Custom Metrics. Aprende cómo las Custom Metrics te ayudan a rastrear los KPIs de tu aplicación, como el número de visitantes, el tamaño promedio del carrito de compras, la latencia de las solicitudes o la distribución del rendimiento para un algoritmo personalizado.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Las Custom Metrics te ayudan a rastrear los KPIs de tu aplicación: número de visitantes, tamaño promedio del carrito de compras, latencia de las solicitudes o distribución del rendimiento para un algoritmo personalizado. Una Custom Metric se identifica por **una combinación única del nombre de la métrica y los valores de las etiquetas (incluyendo la etiqueta de servidor)**. En el ejemplo a continuación, la métrica `request.Latency` tiene cuatro combinaciones únicas de valores de etiquetas a partir de sus dos claves de etiqueta:

- `endpoint`, que tiene el valor `endpoint:X` o `endpoint:Y`.
- `status`, que tiene el valor `status:200` o `status:400`.

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latencia de solicitudes" style="width:80%;">}}

Los siguientes también se consideran Custom Metrics:
- En general, cualquier métrica enviada a través de [DogStatsD][3] o a través de una [verificación de agente personalizada][4]
- Métricas enviadas por [integraciones de Marketplace][29]
- Ciertas [integraciones estándar](#standard-integrations) pueden potencialmente emitir Custom Metrics
- Métricas enviadas desde una integración que no es una de las [más de {{< translate key="integration_count" >}} integraciones de Datadog][1].

**Nota**: Los usuarios con el rol de Datadog Admin o `usage_read` permiso pueden ver el número promedio mensual de Custom Metrics por hora y las 5000 Custom Metrics principales para su cuenta en la [página de detalles de uso][5]. Aprende más sobre [cómo se cuentan las Custom Metrics][6].

## Propiedades de Custom Metrics {#custom-metrics-properties}

Una Custom Metric de Datadog tiene las propiedades a continuación. Lea la [introducción a las métricas][7] para aprender cómo graficar métricas dentro de Datadog.

| Propiedad         | Descripción                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | El [nombre de su métrica](#naming-custom-metrics).                                                                                                                  |
| `<METRIC_VALUE>` | El valor de su métrica. **Nota**: Los valores de las métricas deben ser de 32 bits. Los valores no deben reflejar fechas ni marcas de tiempo.                                                                                                                                |
| `<TIMESTAMP>`    | La marca de tiempo asociada con el valor métrico. **Nota**: Las marcas de tiempo métricas no pueden estar más de diez minutos en el futuro ni más de una hora en el pasado. |
| `<TAGS>`         | El conjunto de etiquetas asociadas con su métrica.                                                                                                                 |
| `<METRIC_TYPE>`  | El tipo de su métrica. Lea sobre [tipos de métricas][8].                                                                                             |
| `<INTERVAL>`     | Si el `<TYPE>` de la métrica es [RATE][9] o [COUNT][10], define el [intervalo][11] correspondiente.                                                       |

### Nombrando Custom Metrics {#naming-custom-metrics}

Se debe seguir la siguiente convención de nomenclatura para Custom Metrics:

* Los nombres de las Custom Metrics deben comenzar con una letra.
* Los nombres de las Custom Metrics solo deben contener caracteres alfanuméricos ASCII, guiones bajos y puntos.
  * Otros caracteres (incluidos los espacios) en los nombres de las Custom Metrics se convierten en guiones bajos.
  * Unicode _no_ es compatible.
* Los nombres de las Custom Metrics no deben exceder los 200 caracteres. Menos de 100 es preferible desde la perspectiva de la interfaz de usuario.

**Nota**: Los nombres de las Custom Metrics son sensibles a mayúsculas y minúsculas en Datadog.

### Unidades de métricas {#metric-units}

Establezca las unidades de métricas a través de [Metrics Summary][12] o configure unidades de Custom Metrics con la función de [Unit override][13] en el editor de gráficos de sus visualizaciones. Para más información, consulte la documentación de [Metrics Units][14].

## Envío de Custom Metrics {#submitting-custom-metrics}

{{< whatsnext desc="Hay múltiples formas de enviar métricas a Datadog:">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}Verificación de Agente Personalizado{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}} DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}API HTTP de Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}Generar métricas basadas en registros{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}Generar métricas basadas en tramos de APM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}Generar métricas basadas en eventos de RUM{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}Generar métricas basadas en procesos en vivo{{< /nextlink >}}
{{< /whatsnext >}}

También puede usar una de las [bibliotecas de cliente API y DogStatsD oficiales y contribuidas por la comunidad de Datadog][15] para enviar sus Custom Metrics.

**Nota**: No hay límites de tasa fijos impuestos en el envío de Custom Metrics. Si se excede su asignación predeterminada, se le cobrará de acuerdo con [la política de facturación de Datadog para Custom Metrics][6].

## Integraciones estándar {#standard-integrations}

Las siguientes integraciones estándar pueden potencialmente emitir Custom Metrics.

| Tipo de integraciones                           | Integraciones                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Limitado a 350 Custom Metrics por defecto.      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| Sin límite predeterminado en la recopilación de Custom Metrics. | [Nagios][19] /[PDH Check][20] /[OpenMetrics][21] /[Windows performance counters][22] /[WMI][23] /[Prometheus][21] |
| Se puede configurar para recopilar Custom Metrics.   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| Custom Metrics enviadas desde integraciones en la nube    | [AWS][28]                                                                          |

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[2]: /es/account_management/billing/custom_metrics/#standard-integrations
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /es/metrics/custom_metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /es/account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /es/metrics
[8]: /es/metrics/types/
[9]: /es/metrics/types/?tab=rate#metric-types
[10]: /es/metrics/types/?tab=count#metric-types
[11]: /es/extend/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /es/metrics/summary/#metric-unit
[13]: /es/dashboards/guide/unit-override/
[14]: /es/metrics/units/
[15]: /es/extend/community/libraries/
[16]: /es/integrations/activemq/#activemq-xml-integration
[17]: /es/integrations/go_expvar/
[18]: /es/integrations/java/
[19]: /es/integrations/nagios
[20]: /es/integrations/pdh_check/
[21]: /es/integrations/openmetrics/
[22]: /es/integrations/windows_performance_counters/
[23]: /es/integrations/wmi_check/
[24]: /es/integrations/mysql/
[25]: /es/integrations/oracle/
[26]: /es/integrations/postgres/
[27]: /es/integrations/sqlserver/
[28]: /es/integrations/amazon_web_services/
[29]: /es/integrations/#cat-marketplace