---
description: Ve las evaluaciones de las puertas, identifica las reglas que fallan
  con frecuencia, analiza los patrones de fallo y realiza un seguimiento de las tendencias
  de evaluación a lo largo del tiempo.
further_reading:
- link: /deployment_gates/setup
  tag: Documentación
  text: Configurar Deployment Gates
title: Explorar Deployment Gates
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Deployment Gates no está disponible para el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Las puertas de despliegue están en vista previa. Si estás interesado en esta función, completa el formulario para solicitar acceso.
{{< /callout >}}

Para explorar tus Deployment Gates y evaluaciones de reglas, ve a [**Software Delivery > Deployment Gates > Evaluations**][1] (Software Delivery > Deployment Gates > Evaluaciones).

En esta página puedes:
* Ver las evaluaciones de puertas realizadas recientemente y los motivos de los fallos
* Identificar las reglas y puertas que fallan con frecuencia
* Analizar patrones de fallos comunes
* Hacer un seguimiento de las tendencias de evaluación a lo largo del tiempo

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="La page (página) de evaluaciones de las puertas de despliegue en Datadog" style="width:100%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployment-gates/evaluations