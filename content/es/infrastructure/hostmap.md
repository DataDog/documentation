---
aliases:
- /es/graphing/infrastructure/hostmap/
- /es/infrastructure/containermap/
- /es/guides/hostmap
further_reading:
- link: https://www.datadoghq.com/blog/datadog-host-map
  tag: Blog
  text: Un nuevo mapa de servidores para infraestructura moderna
- link: /infrastructure/livecontainers/
  tag: Documentación
  text: Obtén visibilidad en tiempo real de todos los contenedores en tu entorno
- link: /infrastructure/process/
  tag: Documentación
  text: Entiende lo que está sucediendo en cualquier nivel de tu sistema
title: Mapa de servidores
---
El [mapa de servidores][1] de Datadog visualiza tus servidores, pods, contenedores y clústeres, ayudándote a entender y diagnosticar tu infraestructura.

{{< img src="infrastructure/hostmap/new-host-map.png" alt="El mapa de servidores muestra los servidores agrupados por Availability Zone y coloreados por uso de CPU. Las celdas hexagonales varían de verde (bajo uso) a naranja-rojo (alto uso). Los grupos incluyen un grupo sin Availability Zone con 395 servidores, otro con eastus con 183 y otro con eastus-1 con 153, además de muchas otras regiones." style="width:100%;" >}}

## Uso {#usage}

{{< img src="infrastructure/hostmap/query-selector.png" alt="El menú desplegable del selector de consultas muestra una lista de consultas sugeridas como '¿Cuál es el uso de CPU en mis servidores?' y '¿Cuántos errores se están registrando en mi infraestructura?', junto con consultas personalizadas guardadas. Un botón de Create y un campo de búsqueda de Filter views están en la parte superior." style="width:60%;" >}}

Utiliza el menú desplegable en la esquina superior izquierda para ver consultas sugeridas, o las consultas personalizadas guardadas escritas por ti o por alguien más en tu organización. Para escribir una consulta personalizada, haz clic en {{< ui >}}Create{{< /ui >}}.

{{< img src="infrastructure/hostmap/draft-query.png" alt="El editor de Draft Query con dos niveles. El objeto padre está configurado como servidor con Rellenar por uso de CPU. El objeto hijo está configurado como pod con Rellenar por Readiness." style="width:100%;" >}}

- {{< ui >}}Parent/Child Object{{< /ui >}}: Selecciona recursos ({{< ui >}}Host{{< /ui >}}, {{< ui >}}Pod{{< /ui >}}, {{< ui >}}Container{{< /ui >}}, {{< ui >}}Cluster{{< /ui >}}) para ver. Los objetos padre e hijo tienen relaciones jerárquicas.
- {{< ui >}}Fill by{{< /ui >}}: Por defecto, el color de cada objeto representa el uso de CPU, donde el color varía de verde (0% utilizado) a naranja (100% utilizado). Utiliza el menú desplegable {{< ui >}}Fill by{{< /ui >}} para colorear tus objetos según diversas métricas o señales, como memoria o registros de errores.
- {{< ui >}}Size by{{< /ui >}}: Si no especificas un objeto hijo, puedes usar el selector {{< ui >}}Size by{{< /ui >}} para dimensionar cada objeto según una métrica o señal.
  {{< img src="infrastructure/hostmap/size-by.png" alt="El editor de consultas del mapa de servidores con el objeto padre configurado como servidor, Rellenar por configurado como uso de CPU y Tamaño por configurado como registros de errores. El mapa a continuación muestra 1.61k servidores como hexágonos de distintos tamaños y colores, con un tooltip en un servidor que muestra un uso promedio de CPU del 88%." style="width:85%;" >}}
- {{< ui >}}Group by{{< /ui >}}: Organiza espacialmente tus objetos en grupos. Puedes usar múltiples agrupaciones. Por ejemplo, si agrupas por `tags.availability-zone` `tags.instance-type`, tus objetos se organizan primero por Availability Zone y luego se subdividen por tipo de instancia.

  {{< img src="infrastructure/hostmap/group-by.png" alt="El mapa de servidores agrupado por las etiquetas tags.availability-zone y tags.instance-type. Los servidores se organizan primero en secciones de Availability Zone, como us-east-1a y us-east-1b, y luego se subdividen por tipo de instancia, como m5a.2xlarge y t2.micro. Las celdas se colorean según el uso de CPU de verde a naranja-rojo." style="width:85%;" >}}
- {{< ui >}}Filter{{< /ui >}}: Limita el mapa de servidores a un subconjunto específico de tu infraestructura. Por ejemplo, puedes filtrar por `production` para ver solo tus recursos de producción. La entrada {{< ui >}}Filter{{< /ui >}} admite operadores lógicos (`AND`, `NOT`, `OR`) y comodines (`*`). Por ejemplo: `(tags.availability-zone:ap* OR tags.availability-zone:eu*) NOT tags.agent_version:5.3*`.

## Casos de uso {#use-cases}

### Solucionar el rendimiento degradado del servidor {#troubleshoot-degraded-server-performance}

Identifica si los problemas de rendimiento provienen de servidores sobrecargados, pods no saludables, reinicios de contenedores o cuellos de botella a nivel de clúster. Verifica `kubernetes_state.pod.status:unready` o `system.cpu.user > 80` y utiliza visualizaciones jerárquicas para aislar la causa raíz.

### Identifica los puntos críticos de costo {#identify-cost-hotspots}
Identifica los clústeres, nodos o cargas de trabajo que contribuyen desproporcionadamente al gasto en la nube consultando etiquetas como `tags.kube_node_instance_type`, `tags.cloud_provider` o etiquetas de asignación personalizadas. Combina esto con señales de CPU y memoria de contenedores/servidores para detectar subaprovisionamiento o sobreaprovisionamiento.

### Gestión del Datadog Agent a nivel de flota {#fleet-wide-datadog-agent-management}

Encuentra servidores o contenedores que ejecuten versiones desactualizadas del Datadog Agent utilizando consultas como `tags.agent_version < 7.50`. Luego, agrupa por Availability Zone, clúster o servicio para impulsar la planificación de despliegues.

### Monitorea los despliegues de Kubernetes o las migraciones de infraestructura {#monitor-kubernetes-rollouts-or-infrastructure-migrations}.

Visualiza la distribución y salud de los pods, nodos y clústeres durante un despliegue o migración. Visualiza tus clústeres, anidados con pods, y observa los cambios en tiempo real para detectar regresiones.

### Verifica la higiene de etiquetado y metadatos {#verify-tagging-and-metadata-hygiene}.

Utiliza operadores lógicos para validar si tus servidores y pods están correctamente etiquetados para propiedad, entorno, región o asignación de costos. Por ejemplo, `tags.env:prod AND NOT (tags.team:*)` para mostrar recursos no asignados o etiquetados incorrectamente.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/
[2]: /es/integrations/
[3]: /es/infrastructure/hostmap/
[4]: https://app.datadoghq.com/infrastructure/map?node_type=host
[5]: https://app.datadoghq.com/infrastructure/map?node_type=container
[6]: /es/agent/
[7]: /es/agent/docker/