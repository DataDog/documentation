---
description: Utilice la superposición de APM en Cloudcraft para visualizar trazas
  distribuidas entre recursos en la nube en sus diagramas de arquitectura.
further_reading:
- link: /datadog_cloudcraft/overlays/infrastructure/
  tag: Documentación
  text: Superposición de infraestructura
- link: /datadog_cloudcraft/overlays/observability/
  tag: Documentación
  text: Superposición de observabilidad
- link: /datadog_cloudcraft/overlays/security/
  tag: Documentación
  text: Superposición de Security
- link: /datadog_cloudcraft/overlays/ccm/
  tag: Documentación
  text: Superposición de Cloud Cost Management
- link: /tracing/
  tag: Documentación
  text: APM
site_support_id: cloudcraft_apm_overlay
title: APM
---
<div class="alert alert-info">La superposición de APM está en versión preliminar y solo está disponible para cuentas de AWS.</div>

## Descripción general {#overview}

La superposición de APM muestra trazas de APM distribuidas como arcos entre recursos en la nube en su diagrama de Cloudcraft. Esto le ayuda a comprender los flujos de solicitudes de servicio a servicio en toda su infraestructura sin salir de la vista de arquitectura.

Para abrir la superposición, haga clic en la pestaña {{< ui >}}APM{{< /ui >}} en el selector de superposición en la parte superior de su diagrama.

### Tipos de recursos admitidos {#supported-resource-types}

La superposición de APM muestra conexiones para recursos que incluyen un ID de recurso en la nube (CCRID) en sus datos de traza. Se admiten los siguientes tipos de recursos:

- EC2
- S3
- Lambda
- RDS

{{< img src="datadog_cloudcraft/overlays/cloudcraft_apm_overlay_diagram.png" alt="Superposición de APM en Cloudcraft que muestra arcos de traza verdes que conectan servicios en un diagrama de arquitectura de AWS, con el recuento de trazas y la leyenda visibles en la parte inferior izquierda." style="width:100%;" >}}

## Requisitos previos {#prerequisites}

APM debe estar activo en su organización de Datadog, lo que significa que al menos un tramo se ha ingerido en los últimos 30 días. Si APM no está configurado, Cloudcraft muestra una pantalla de incorporación con enlaces para [configurar APM][1].

## Visualizar conexiones de traza {#visualize-trace-connections}

Cuando la superposición de APM está activa, las trazas aparecen como arcos curvos entre los nodos de recursos en su diagrama. Cada arco representa el tráfico de trazas distribuidas entre dos recursos.

### Leyenda {#legend}

| Color del arco | Estado |
|-----------|--------|
| Verde     | OK     |
| Rojo       | Error  |

Utilice el panel de leyenda en la parte inferior de la pantalla para filtrar las trazas por estado. La leyenda también muestra el recuento de trazas visibles. Anular la selección de todos los estados restablece la vista para mostrar todas las trazas.

## Investigar trazas {#investigate-traces}

Haga clic en un arco de traza para abrir un panel lateral que muestra la lista de trazas de APM entre esos dos recursos. El panel lateral incluye:

- Una barra de búsqueda para filtrar trazas por consulta.
- Un selector de tiempo (de forma predeterminada, los últimos 30 minutos).
- Un {{< ui >}}live mode{{< /ui >}} interruptor para transmitir datos de traza.
- Un selector de columnas para personalizar qué campos se muestran. Las columnas predeterminadas incluyen Duración, servicio, Nombre del recurso y Tipo de error.
- Un {{< ui >}}open in APM{{< /ui >}} enlace para visualizar la misma consulta en el [Explorador de trazas][2].

Haga clic en una fila de traza en el panel lateral para abrir la vista de detalle de la traza, la cual muestra el flame graph estándar de APM.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: /es/tracing/trace_explorer/