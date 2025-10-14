---
aliases:
- /es/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /universal_service_monitoring/setup/
  tag: Documentación
  text: Configuración de Universal Service Monitoring
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Señales clave en segundos con Universal Service Monitoring
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Etiquetado de servicios unificado
- link: /tracing/software_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre servicios en Datadog
- link: /tracing/services/services_map/
  tag: Documentación
  text: Leer sobre el Mapa de servicios
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: Blog
  text: Prácticas recomendadas para la monitorización y corrección del churn de conexiones
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: Blog
  text: Mejorar la experiencia y la colaboración de los desarrolladores con Software
    Catalog
title: Universal Service Monitoring
---

## Información general

Universal Service Monitoring (USM) proporciona visibilidad de las métricas de salud de tus servicios de forma universal en todo tu stack tecnológico _sin tener que instrumentar tu código_. Se basa únicamente en la presencia de un Datadog Agent configurado y el [etiquetado unificado de servicio][1], y aporta datos de rendimiento sobre tus servicios no instrumentados en vistas como Software Catalog y Mapa de servicios. USM también funciona con [Deployment Tracking][2], monitores, dashboards y SLO.

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="Vídeo que demuestra Universal Service Monitoring. Información general de un servicio al que se accede haciendo clic en un servicio en el Mapa de servicio y seleccionando Ver información general." video="true" >}}

## Configurar

Para obtener información sobre las plataformas y protocolos compatibles y para obtener instrucciones sobre cómo empezar, lee [Configuración de Universal Service Monitoring][7].

<div class="alert alert-info"><strong>Vista previa: protocolos y métodos de cifrado adicionales</strong><p>USM está en Vista previa para detectar servicios en la nube y para decodificar protocolos adicionales y métodos de encriptación de tráfico. Para obtener más información y solicitar acceso, lee <a href="/universal_service_monitoring/additional_protocols/">Cloud Service Discovery and Additional Protocols</a>.</p></div>

## Etiquetado de servicios automático

Universal Service Monitoring detecta automáticamente servicios que se ejecutan en tu infraestructura. Si no encuentra [etiquetas de servicio unificado][1], les asigna un nombre basado en una de las etiquetas (tags): `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`.

Para actualizar el nombre del servicio, configura [Etiquetado de servicios unificado][1].

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Cuando Datadog detecta automáticamente tus servicios, la etiqueta utilizada para mostrar esto está en la parte superior de la Página de servicios" style="width:80%;" >}}

## Explorar tus servicios

Después de configurar el Agent, espera unos cinco minutos a que tu servicio aparezca en el Software Catalog. Haz clic en el servicio para ver la página de detalles del servicio. Un nombre de operación de `universal.http.server` o `universal.http.client` en la parte superior izquierda indica que la telemetría del servicio procede de Universal Service Monitoring.

El nombre de operación `universal.http.server` captura las métricas de estado para el tráfico entrante a tu servicio. El nombre de operación `universal.http.client` correspondiente representa el tráfico saliente hacia otros destinos.

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="El menú desplegable de la operación en la pestaña Services (Servicios) que muestra los nombres de operación disponibles" style="width:100%;" >}}

Después de activar Universal Service Monitoring, puedes:


- Navega a **APM** > **Software Catalog** o **APM** > **Service Map** (APM > Mapa de servicios) para [visualizar tus servicios y sus dependencias][3].

- Haz clic en páginas específicas de servicio para ver las métricas de señales clave (solicitudes, errores y duración) y correlacionarlas con los cambios de código recientes con [Rastreo de implementación][2].

- Crea [monitores][4], [dashboards][5] y [SLOs][6] utilizando las métricas `universal.http.*`.



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: /es/tracing/services/deployment_tracking/
[3]: /es/tracing/software_catalog/
[4]: /es/monitors/types/apm/?tab=apmmetrics
[5]: /es/dashboards/
[6]: /es/service_management/service_level_objectives/metric/
[7]: /es/universal_service_monitoring/setup/