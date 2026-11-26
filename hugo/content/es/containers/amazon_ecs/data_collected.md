---
aliases:
- /es/agent/amazon_ecs/data_collected
description: Guía de referencia para métricas, logs y eventos recopilados por el Datadog
  Agent en Amazon ECS
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/amazon_ecs/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentación
  text: Recopile métricas de ECS
title: Recopilación de datos de Amazon ECS
---
## Datos recopilados {#data-collected}

### Métricas {#metrics}

Amazon ECS en EC2 es un servicio de administración de contenedores para contenedores Docker que se ejecutan en instancias EC2.

La siguiente tabla enumera las métricas recopiladas por el Agent o el rastreador de API para Amazon ECS:

{{< get-metrics-from-git "amazon-ecs" >}}

Las métricas recopiladas por el Agent cuando se implementa en un contenedor Docker también incluyen las mismas métricas recopiladas por la integración de Docker. Consulte las [métricas de la integración de Docker][1] para obtener una lista completa de métricas.

Las métricas con el prefijo `ecs.containerinsights.*` se pueden recopilar habilitando **collect custom metrics** en la pestaña Metric Collection de AWS Integration.

**Nota**: Las métricas de Docker se etiquetan según corresponda con las siguientes etiquetas: `container_name`, `task_arn`, `task_family`, `task_name`, `task_version`. No se requiere configuración adicional.

### Events {#events}

La integración de Amazon ECS recopila eventos emitidos por clústeres y servicios, que suelen tener el siguiente aspecto:

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Eventos de Amazon ECS" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/agent/docker/data_collected/#metrics