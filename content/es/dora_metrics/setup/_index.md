---
aliases:
- /es/continuous_integration/dora_metrics/setup/
further_reading:
- link: /dora_metrics/
  tag: Documentación
  text: Más información sobre DORA Metrics
title: Configurar métricas de DORA
---

## Información general

Las cuatro DORA Metrics se calculan a partir de dos tipos de eventos que admiten distintas fuentes de datos.

[**Eventos de despliegue**][8]
: indican que se ha producido un nuevo despliegue para un servicio en un entorno específico. Los eventos de despliegue se utilizan para calcular la frecuencia de despliegue, el plazo de cambio y la tasa de fallos de cambio.

[**Eventos de fallo**][9]
: indican que se ha producido un nuevo fallo para un servicio en un entorno específico. Los eventos de fallo se utilizan para calcular la tasa de fallos de cambio y el tiempo de restauración.

## Configurar fuentes de datos

### Seleccionar una fuente de datos de despliegue

{{< whatsnext desc="DORA Metrics admite las siguientes fuentes de datos para los eventos de despliegue. Consulta la documentación correspondiente para configurar una o más fuentes de datos para tus eventos de despliegue:" >}}
  {{< nextlink href="/dora_metrics/setup/deployments?tab=apmdeploymenttracking" >}}Seguimiento de despliegue de APM{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/deployments?tab=apiorcli" >}}API de evento de despliegue o CLI de datadog-ci{{< /nextlink >}}
{{< /whatsnext >}}

### Seleccionar una fuente de datos de fallo

{{< whatsnext desc="DORA Metrics admite las siguientes fuentes de datos para los eventos de error. Consulta la documentación correspondiente para configurar una o más fuentes de datos para tus eventos de error:" >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=datadog_incidents" >}}Incidentes de Datadog{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=api" >}}API de evento de error{{< /nextlink >}}
{{< /whatsnext >}}

## Limitaciones

- Cuando se selecciona por primera vez una opción de fuente de datos (como Seguimiento de despliegue de APM o PagerDuty), DORA Metrics comienza a poblar los datos desde ese punto en adelante. Si cambias de fuente A a fuente B y, luego, vuelves a la fuente A, los datos históricos de fuente A sólo estarán disponibles desde el momento en que se seleccionaron por primera vez. 
- No pueden producirse despliegues o fallos del mismo servicio en el mismo segundo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[8]: /es/dora_metrics/setup/deployments/
[9]: /es/dora_metrics/setup/failures/