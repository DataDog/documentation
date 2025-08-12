---
disable_toc: false
further_reading:
- link: security/cloud_siem/investigate_security_signals
  tag: Documentation
  text: Investigar las señales de seguridad de Cloud SIEM
- link: getting_started/dashboards
  tag: Documentation
  text: Empezando con dashboards
- link: getting_started/monitors
  tag: Documentation
  text: Empezando con monitores
- link: metrics/summary/
  tag: Documentation
  text: Más información sobre el resumen de métricas
title: Métricas operativas de seguridad
---

## Información general

Cloud SIEM proporciona métricas operativas de seguridad para determinar la eficacia de tu equipo a la hora de responder y resolver las amenazas a la seguridad de tus entornos en la nube. Estas métricas se muestran en el [dashboard de Cloud SIEM][1] predefinido y se envían en los [informes semanales][2] de Cloud SIEM. También puedes crear dashboards y monitores para ellos.

{{< img src="security/security_monitoring/secops_metrics.png" alt="La sección de métricas operativas de seguridad del dashboard de Información general de Cloud SIEM" style="width:100%;" >}}

## Métricas operativas

`datadog.security.siem_signal.time_to_detect`
: **Nombre**: tiempo de detección (TTD)
: **Descripción**: el tiempo (en segundos) entre el momento en que se activa un log coincidente y el momento en que se genera una señal.
: **Tipo de métrica**: [DISTRIBUTION][3] (DISTRIBUCIÓN)

`datadog.security.siem_signal.time_to_acknowledge`
: **Nombre**: tiempo para reconocimiento (TTA)
: **Descripción**: el tiempo (en segundos) entre el momento en que se activa una señal y el momento en que comienza una investigación sobre la señal.
: **Tipo de métrica**: [DISTRIBUTION][3] (DISTRIBUCIÓN)

`datadog.security.siem_signal.time_to_resolve`
: **Nombre**: tiempo de resolución (TTR)
: **Descripción**: el tiempo (en segundos) que tarda en cerrarse una señal a partir del momento en que se te notifica la detección por primera vez.
: **Tipo de métrica**: [DISTRIBUTION][3] (DISTRIBUCIÓN)

## Cómo se calculan las métricas

Las métricas de TTD, TTA y TTR se calculan a partir de estas marcas temporales:

1. La marca temporal (`T0`) del log que activa una señal de seguridad.
1. La marca temporal (`T1`) de cuando se genera la señal.
1. La marca temporal (`T2`) de cuando el estado de la señal cambia a `under_review`.
1. La marca temporal (`T3`) de cuando el estado de la señal cambia a `archived`.

| Métrica                                                                                | Cómo se calcula la métrica  |
| ------------------------------------------------------------------------------------- | ---------------------------- |
| Tiempo de detección (TTD)<br>`datadog.security.siem_signal.time_to_detect`           | `T1 - T0`                    |
| Tiempo de reconocimiento (TTA)<br>`datadog.security.siem_signal.time_to_acknowledge` | `T2 - T1`                    |
| Tiempo de resolución (TTR)<br>`datadog.security.siem_signal.time_to_resolve`         | `T3 - T1`                    |

## Explorar, visualizar y monitorizar las métricas

Utiliza el [Resumen de métricas][3] para ver los metadatos y etiquetas (tags) de las métricas operativas. También puedes ver qué dashboards, notebooks, monitores y SLOs están usando esas métricas.

Utiliza etiquetas para filtrar las métricas a equipos, fuentes y entornos específicos. A continuación, puedes crear [dashboards][5] para aquellas métricas para visualizar los datos o crear [monitores][6] para alertarte si las métricas superan un umbral especificado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30378/cloud-siem-overview
[2]: https://app.datadoghq.com/security/configuration/reports
[3]: /es/metrics/types/?tab=distribution#metric-types
[4]: https://app.datadoghq.com/metric/summary?filter=datadog.security.siem&window=604800
[5]: /es/getting_started/dashboards/
[6]: /es/getting_started/monitors/