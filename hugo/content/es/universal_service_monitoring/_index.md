---
aliases:
- /es/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
description: Monitorea las métricas de salud del servicio en todo tu stack sin instrumentación
  de código utilizando Universal Service Monitoring y el Datadog Agent.
further_reading:
- link: /universal_service_monitoring/setup/
  tag: Documentación
  text: Configuración de Universal Service Monitoring
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Señales doradas en segundos con Universal Service Monitoring
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Unified Service Tagging
- link: /tracing/software_catalog/
  tag: Documentación
  text: Descubre y cataloga los servicios que reportan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Aprende más sobre los servicios en Datadog
- link: /tracing/services/services_map/
  tag: Documentación
  text: Lee sobre el Service Map
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: Blog
  text: Mejores prácticas para monitorear y remediar la rotación de conexiones
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: Blog
  text: Mejora la experiencia del desarrollador y la colaboración con el Catálogo
    de Software
- link: https://learn.datadoghq.com/courses/getting-started-usm
  tag: Centro de Aprendizaje
  text: Comenzando con Universal Service Monitoring (USM)
title: Universal Service Monitoring
---
## Resumen {#overview}

Universal Service Monitoring (USM) proporciona visibilidad en las métricas de salud de tu servicio de manera universal en todo tu stack _sin tener que instrumentar tu código_. Se basa únicamente en la presencia de un Datadog Agent configurado y [Unified Service Tagging][1], y trae datos de rendimiento sobre tus servicios no instrumentados a vistas como el Software Catalog y Service Map. USM también funciona con [Deployment Tracking][2], Monitors, Dashboards y SLOs.

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="Video que demuestra Universal Service Monitoring. Un resumen de un servicio se accede haciendo clic en un servicio en el Service Map y seleccionando View service overview." video="true" >}}

## Configuración {#setup}

Para obtener información sobre las plataformas y protocolos compatibles, y para instrucciones sobre cómo comenzar, lea [Setting Up Universal Service Monitoring][7].

<div class="alert alert-info"><strong>Vista previa: Protocolos adicionales y métodos de cifrado</strong><p>USM está en vista previa para descubrir servicios en la nube y para decodificar protocolos adicionales y métodos de cifrado de tráfico. Para más información y para solicitar acceso, lea <a href="/universal_service_monitoring/additional_protocols/">Cloud Service Discovery and Additional Protocols</a>.</p></div>

## Etiquetado automático de servicios {#automatic-service-tagging}

Universal Service Monitoring detecta automáticamente los servicios que se ejecutan en tu infraestructura. Si no encuentra [unified service tags][1], les asigna un nombre basado en una de las etiquetas: `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`.

Para actualizar el nombre del servicio, configure [Unified Service Tagging][1].

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Cuando Datadog detecta automáticamente tus servicios, la etiqueta utilizada para ello se muestra en la parte superior de la página del servicio." style="width:80%;" >}}

## Explorando tus servicios {#exploring-your-services}

Después de configurar el Agent, espera aproximadamente cinco minutos para que tu servicio aparezca en el Software Catalog. Haz clic en el servicio para ver la página de detalles del servicio. Un nombre de operación de `universal.http.server` o `universal.http.client` en la esquina superior izquierda indica que la telemetría del servicio proviene de Universal Service Monitoring.

El nombre de operación `universal.http.server` captura métricas de salud para el tráfico entrante a su servicio. El nombre de operación correspondiente `universal.http.client` representa el tráfico saliente a otros destinos.

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="El menú desplegable de operaciones en la pestaña de Services muestra los nombres de operación disponibles." style="width:100%;" >}}

Después de habilitar Universal Service Monitoring, puedes:


Navega a - **APM** > **Software Catalog** o **APM** > **Service Map** para [visualizar tus servicios y sus dependencias][3].

- Haz clic en páginas de servicio específicas para ver métricas de señal dorada (solicitudes, errores y duración), y correlaciona estas con cambios recientes en el código con [Deployment Tracking][2].

- Crea [monitors][4], [Dashboards][5] y [SLOs][6] utilizando las métricas `universal.http.*`.



## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: /es/tracing/services/deployment_tracking/
[3]: /es/tracing/software_catalog/
[4]: /es/monitors/types/apm/?tab=apmmetrics
[5]: /es/dashboards/
[6]: /es/service_level_objectives/metric/
[7]: /es/universal_service_monitoring/setup/