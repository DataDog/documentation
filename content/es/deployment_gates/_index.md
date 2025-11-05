---
algolia:
  tags:
  - puertas de cd
further_reading:
- link: /deployment_gates/setup
  tag: Documentación
  text: Configurar puertas de despliegue
- link: /deployment_gates/explore
  tag: Documentación
  text: Conoce el explorer de puertas de despliegue
- link: entrega_continua
  tag: Documentación
  text: Más información sobre la visibilidad de la entrega continua
- link: continuous_delivery/deployments
  tag: Documentación
  text: Aprende a configurar CD Visibility
title: Puertas de despliegue
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Las puertas de despliegue no están disponibles en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Las puertas de despliegue están en vista previa. Si estás interesado en esta función, completa el formulario para solicitar acceso.
{{< /callout >}}

Las puertas de despliegue proporcionan un control basado en datos sobre tus lanzamientos de producción. Evalúan la telemetría de Datadog, como los monitores específicos y las anomalías de APM, para determinar el estado de las nuevas versiones en tiempo real.

Al monitorizar los indicadores clave con puertas de despliegue, puedes detener automáticamente una versión si se detectan anomalías o regresiones de rendimiento, evitando que un código inestable llegue a una base de usuarios más amplia.

El producto consta de dos componentes principales:

- Se define una [puerta][1] para un servicio y un entorno. Cada puerta se evalúa en función de un conjunto de reglas.
- Una regla es un tipo de evaluación que forma parte de una puerta. Puedes crear este tipo de reglas:
  - [Monitores][2]
  - [Detección de despliegue defectuoso de APM] [3]

Para obtener instrucciones de configuración, consulta [Configurar puertas de despliegue][4]. Una vez finalizada la configuración, puedes rastrear y analizar las evaluaciones de las puertas a través de la page (página)  [Evaluaciones de las puertas de despliegue][5]:

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="La page (página) de evaluaciones de las puertas de despliegue en Datadog" style="width:100%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/deployment_gates/setup/#create-a-deployment-gate
[2]: /es/deployment_gates/setup/?tab=monitors#rule-types
[3]: /es/deployment_gates/setup/?tab=apmfaultydeploymentdetection#rule-types
[4]: /es/deployment_gates/setup
[5]: /es/deployment_gates/explore