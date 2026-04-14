---
algolia:
  tags:
  - métricas personalizadas
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
- link: /developers/dogstatsd/
  tag: Documentación
  text: Obtener más información sobre DogStatsD
- link: /developers/community/libraries/
  tag: Documentación
  text: API oficial y creada por la comunidad y bibliotecas cliente DogStatsD
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de métricas personalizadas
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Prácticas recomendadas para la gestión de métricas personalizadas
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Controlar de manera dinámica el volumen de tus métricas personalizadas con
    Metrics without LimitsTM
title: Métricas personalizadas
---

{{< learning-center-callout header="Únete a una sesión de webinar de enablement" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explora y regístrate en las sesiones de Foundation Enablement sobre métricas personalizadas. Descubre cómo las métricas personalizadas ayudan a hacer un seguimiento de los KPIs de tu aplicación, como el número de visitantes, el tamaño medio de la cesta del cliente, la latencia de las solicitudes o la distribución del rendimiento de un algoritmo personalizado.
{{< /learning-center-callout >}}

## Información general

Las métricas personalizadas te ayudan a rastrear los KPI de tu aplicación: cantidad de visitantes, tamaño promedio de la cesta del cliente, latencia de las solicitudes o distribución del rendimiento de un algoritmo personalizado. Una métrica personalizada se identifica mediante **una combinación única del nombre de una métrica y los valores de la etiqueta (tag) (incluida la etiqueta del host)**. En el siguiente ejemplo, la métrica `request.Latency` tiene cuatro combinaciones únicas de valores de etiqueta a partir de sus dos claves de etiqueta:

- `endpoint`, con el valor `endpoint:X` o `endpoint:Y`.
- `status`, con el valor `status:200` o `status:400`.

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latencia de la solicitud" style="width:80%;">}}

Las siguientes también se consideran métricas personalizadas:
- En general, cualquier métrica enviada a través de [DogStatsD][3] o a través de un [check de Agent personalizado][4].
- Métricas presentadas por las [Integraciones de Marketplace][29].
- Ciertas [integraciones estándar](#standard-integrations) pueden potencialmente emitir métricas personalizadas.
- Métricas enviadas desde una integración que no sea una de las [más de {{< translate key="integration_count" >}} integraciones Datadog][1].

**Nota**: Los usuarios con el rol de administrador de Datadog o el permiso `usage_read` pueden ver la cantidad promedio mensual de métricas personalizadas por hora y las 5000 métricas personalizadas principales de su cuenta en la [página de detalles de uso][5]. Obtén más información sobre [cómo se cuentan las métricas personalizadas][6].

## Propiedades de las métricas personalizadas

Una métrica personalizada de Datadog tiene las siguientes propiedades. Lee la [introducción a las métricas][7] para aprender a graficar métricas en Datadog.

| Propiedad         | Descripción                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | El [nombre de tu métrica](#naming-custom-metrics).                                                                                                                  |
| `<METRIC_VALUE>` | El valor de tu métrica. **Nota**: Los valores de las métricas deben ser de 32 bits. Los valores no deben reflejar fechas ni marcas de tiempo.                                                                                                                                |
| `<TIMESTAMP>`    | La marca de tiempo asociada con el valor de la métrica. **Nota**: Las marcas de tiempo de las métricas no pueden ser más de diez minutos en el futuro ni más de una hora en el pasado. |
| `<TAGS>`         | El conjunto de etiquetas asociado a tu métrica.                                                                                                                 |
| `<METRIC_TYPE>`  | El tipo de métrica. Lee sobre los [tipos de métricas][8].                                                                                             |
| `<INTERVAL>`     | Si el `<TYPE>` de métrica es [RATE][9] o [COUNT][10], define el [intervalo][11] correspondiente.                                                       |

### Nombrar métricas personalizadas

Se debe respetar la siguiente convención de nomenclatura para métricas personalizadas:

* Los nombres de métrica deben empezar por una letra.
* Los nombres de métricas solo deben contener caracteres alfanuméricos ASCII, guiones bajos y puntos.
  * Los demás caracteres, incluidos los espacios, se convierten en guiones bajos.
  * Unicode _no_ es compatible.
* Los nombres de las métricas no deben superar los 200 caracteres. Se recomienda que tengan menos de 100 desde una perspectiva de interfaz de usuario.

**Nota**: Los nombres de métrica distinguen entre mayúsculas y minúsculas en Datadog.

### Unidades de métrica

Establece unidades de métricas a través del [Resumen de métricas][12] o establece unidades de métricas personalizadas con la función [Anulación de unidad][13] en el editor de gráficos de tus visualizaciones. Para obtener más información, consulta la documentación sobre [Unidades de métricas][14].

## Enviar métricas personalizadas

{{< whatsnext desc="Hay varias formas de enviar métricas a Datadog:">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}Custom Agent check{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}Datadog's HTTP API{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}Generate Log-based metrics{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}Generate APM span-based metrics{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}Generate RUM event-based metrics{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}Generate live process-based metrics{{< /nextlink >}}
{{< /whatsnext >}}

También puedes utilizar una de las [API oficiales de Datadog y aportadas por la comunidad, y las bibliotecas cliente de DogStatsD][15] para enviar tus métricas personalizadas.

**Nota**: No existen límites de tarifas fijos obligatorios para el envío de métricas personalizadas. Si se excede la asignación predeterminada, se te facturará de acuerdo con la [política de facturación de Datadog para métricas personalizadas][6].

## Integraciones estándar

Las siguientes integraciones estándar podrían generar métricas personalizadas.

| Tipo de integraciones                           | Integraciones                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Límite predeterminado de 350 métricas personalizadas.      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| Sin límite predeterminado para la recopilación de métricas personalizadas. | [Nagios][19] /[PDH Check][20] /[OpenMetrics][21] /[Windows performance counters][22] /[WMI][23] /[Prometheus][21] |
| Se puede configurar para recopilar métricas personalizadas.   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| Las métricas personalizadas se envían desde integraciones en la nube.    | [AWS][28]                                                                          |

## Referencias adicionales

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
[11]: /es/developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /es/metrics/summary/#metric-unit
[13]: /es/dashboards/guide/unit-override/
[14]: /es/metrics/units/
[15]: /es/developers/community/libraries/
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