---
aliases:
- /es/agent/amazon_ecs/data_collected
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/amazon_ecs/apm/
  tag: Documentación
  text: Recopilar tus trazas de aplicaciones
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentación
  text: Recopilar métricas de ECS
kind: documentation
title: Recopilación de datos de Amazon ECS
---

## Datos recopilados

### Métricas

Amazon ECS en EC2 es un servicio de gestión de contenedores para contenedores de Docker que se ejecutan en instancias EC2. Las métricas recopiladas por el Agent para Amazon ECS son:

{{< get-metrics-from-git "amazon_ecs" >}}

Las métricas recopiladas por el Agent cuando se despliegan en un contenedor de Docker también incluyen las mismas métricas recopiladas por la integración con Docker. Consulta las [métricas de integración con Docker][1] para obtener una lista completa de métricas.

Las métricas con los prefijos `ecs.containerinsights.*` pueden recopilarse activando la opción **collect custom metrics** (recopilar métricas personalizadas) en la pestaña de recopilación de métricas de la página de integración con AWS.

**Nota**: Las métricas Docker se etiquetan en consecuencia con las siguientes etiquetas (tags): `container_name`, `task_arn`, `task_family`, `task_name`, `task_version`. No es necesaria ninguna configuración adicional.

### Eventos

Para reducir el ruido, la integración con Amazon ECS se configura automáticamente para incluir sólo eventos que contengan las siguientes palabras: `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot`, `terminate`. Consulta los ejemplos de eventos a continuación:

{{< img src="integraciones/amazon_ecs/aws_ecs_events.png" alt="Eventos de Amazon ECS" >}}

Para eliminar esta lista de inclusión y recibir todos los eventos de tu integración Datadog con Amazon ECS, ponte en contacto con el [servicio de asistencia de Datadog][2].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/agent/docker/data_collected/#metrics
[2]: https://docs.datadoghq.com/es/help/