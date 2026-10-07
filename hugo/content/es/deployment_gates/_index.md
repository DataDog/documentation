---
algolia:
  tags:
  - cd gates
description: Reduzca los incidentes de despliegue evaluando automáticamente monitores
  y anomalías de APM para detener las versiones cuando se detecten regresiones de
  rendimiento.
further_reading:
- link: /deployment_gates/setup
  tag: Documentación
  text: Configure Deployment Gates
- link: /deployment_gates/explore
  tag: Documentación
  text: Obtenga información sobre el Deployment Gates explorer.
- link: continuous_delivery
  tag: Documentación
  text: Aprenda sobre Continuous Delivery Visibility
- link: continuous_delivery/deployments
  tag: Documentación
  text: Aprenda a configurar CD Visibility
title: Puertas de despliegue
---
Deployment Gates le permiten reducir la probabilidad y el impacto de los incidentes causados por los despliegues.

Al realizar un despliegue en producción, puede utilizar Deployment Gates para evaluar el impacto de los nuevos cambios mediante [monitors][1] y anomalías de APM.
Cuando se detectan anomalías o regresiones de rendimiento, puede detener automáticamente la versión, evitando que el código inestable llegue a una base de usuarios más amplia. Además, puede utilizar Deployment Gates como punto de entrada para investigar el problema.

Para obtener instrucciones de configuración, consulte [Set up Deployment Gates][2]. Una vez completada la configuración, puede realizar un seguimiento y analizar las evaluaciones de Deployment Gates a través de la página [Deployment Gates Evaluations][3]:

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/
[2]: /es/deployment_gates/setup
[3]: /es/deployment_gates/explore