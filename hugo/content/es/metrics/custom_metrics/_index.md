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
description: Aprenda qué son las Custom Metrics, cómo se identifican por nombre y
  etiquetas, y cómo se facturan en Datadog.
further_reading:
- link: /extend/dogstatsd/
  tag: Documentación
  text: Obtenga más información sobre DogStatsD
- link: /extend/community/libraries/
  tag: Documentación
  text: Bibliotecas de cliente para API y DogStatsD oficiales y creadas por la comunidad
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de Custom Metrics
- link: /account_management/billing/metric_name_pricing/
  tag: Documentación
  text: Precios por nombre de métrica para Custom Metrics
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Práctica recomendada para la gobernanza de métricas personalizadas
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Controle dinámicamente el volumen de sus métricas personalizadas con Metrics
    without Limits™
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseñe dashboards ejecutivos efectivos con Datadog
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: Centro de aprendizaje
  text: Gobernanza de métricas
title: Custom Metrics
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explore y regístrese en las sesiones de Foundation Enablement para Custom Metrics. Aprenda cómo las Custom Metrics le ayudan a realizar un seguimiento de los KPI de su aplicación, como el número de visitantes, el tamaño promedio de la cesta del cliente, la latencia de las solicitudes o la distribución del rendimiento de un algoritmo personalizado.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Las Custom Metrics le ayudan a realizar un seguimiento de los KPI de su aplicación: número de visitantes, tamaño promedio de la cesta del cliente, latencia de las solicitudes o distribución del rendimiento de un algoritmo personalizado. Una métrica personalizada se identifica mediante **una combinación única del nombre de una métrica y los valores de las etiquetas (incluida la etiqueta de servidor)**. En el ejemplo siguiente, la métrica `request.Latency` tiene cuatro combinaciones únicas de valores de etiqueta a partir de sus dos claves de etiqueta:

- `endpoint`, que tiene el valor `endpoint:X` o `endpoint:Y`.
- `status`, que tiene el valor `status:200` o `status:400`.

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latencia de las solicitudes" style="width:80%;">}}

Las siguientes también se consideran Custom Metrics:
- En general, cualquier métrica enviada a través de [DogStatsD][3] o mediante una [comprobación personalizada del Agent][4]
- Métricas enviadas por [integraciones de Marketplace][29]
- Ciertas [integraciones estándar](#standard-integrations) pueden emitir Custom Metrics
- Métricas enviadas desde una integración que no es una de las [más de {{< translate key="integration_count" >}} integraciones de Datadog][1].

**Nota**: Los usuarios con el rol de Datadog Admin o el permiso `usage_read` pueden ver el número promedio mensual de Custom Metrics por hora y las 5000 Custom Metrics principales de su cuenta en la [página de detalles de uso][5]. Obtenga más información sobre [cómo se cuentan las Custom Metrics][6].

## Propiedades de las Custom Metrics {#custom-metrics-properties}

Una métrica personalizada de Datadog tiene las siguientes propiedades. Lea la [introducción a las métricas][7] para aprender a graficar métricas dentro de Datadog.

| Propiedad         | Descripción                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | El [nombre de su métrica](#naming-custom-metrics).                                                                                                                  |
| `<METRIC_VALUE>` | El valor de su métrica. **Nota**: Los valores de las métricas deben ser de 32 bits. Los valores no deben reflejar fechas ni marcas de tiempo.                                                                                                                                |
| `<TIMESTAMP>`    | La marca de tiempo asociada con el valor de la métrica. **Nota**: Las marcas de tiempo de las métricas no pueden estar a más de diez minutos en el futuro ni a más de una hora en el pasado. |
| `<TAGS>`         | El conjunto de etiquetas asociadas con su métrica.                                                                                                                 |
| `<METRIC_TYPE>`  | El tipo de su métrica. Lea sobre [tipos de métricas][8].                                                                                             |
| `<INTERVAL>`     | Si el `<TYPE>` de la métrica es [RATE][9] o [COUNT][10], define el [intervalo][11] correspondiente.                                                       |

### Nomenclatura de Custom Metrics {#naming-custom-metrics}

Se debe seguir la siguiente convención de nomenclatura de Custom Metrics:

* Los nombres de las métricas deben comenzar con una letra.
* Los nombres de las métricas solo deben contener caracteres alfanuméricos ASCII, guiones bajos y puntos.
  * Otros caracteres, incluidos los espacios, se convierten en guiones bajos.
  * Unicode _no_ es compatible.
* Los nombres de las métricas no deben exceder los 200 caracteres. Se prefieren nombres de menos de 100 caracteres para facilitar su visualización en la interfaz de usuario.

**Nota**: Los nombres de las métricas distinguen entre mayúsculas y minúsculas en Datadog.

### Unidades de las métricas {#metric-units}

Establezca las unidades de las métricas a través del [Metrics Catalog][12] o establezca unidades personalizadas para las métricas con la función [Unit override][13] en el editor de gráficos de sus visualizaciones. Para obtener más información, consulte la documentación de [Metrics Units][14].

## Envío de Custom Metrics {#submitting-custom-metrics}

{{< whatsnext desc="Existen varias formas de enviar métricas a Datadog:">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}Comprobación personalizada del Agent{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}La API HTTP de Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}Genere métricas basadas en registros{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}Genere métricas basadas en tramos de APM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}Genere métricas basadas en eventos de RUM{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}Generar métricas basadas en procesos activos{{< /nextlink >}}
{{< /whatsnext >}}

También puede utilizar una de las [bibliotecas de cliente de API y DogStatsD oficiales de Datadog o aportadas por la comunidad][15] para enviar sus Custom Metrics

**Nota**: No existen límites de tasa fijos impuestos para el envío de Custom Metrics. Si se excede su asignación predeterminada, se le facturará de acuerdo con la [política de facturación de Datadog para Custom Metrics][6].

## Integraciones estándar {#standard-integrations}

Las siguientes integraciones estándar podrían emitir Custom Metrics.

| Tipo de integraciones                           | Integrations                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Limitado a 350 Custom Metrics de forma predeterminada.      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| No hay límite predeterminado en la recopilación de Custom Metrics. | [Nagios][19] /[PDH Check][20] /[OpenMetrics][21] /[Windows performance counters][22] /[WMI][23] /[Prometheus][21] |
| Se puede configurar para recopilar Custom Metrics.   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| Custom Metrics enviadas desde integraciones en la nube    | [AWS][28]                                                                          |

## Lecturas adicionales {#further-reading}

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