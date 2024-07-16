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
- link: /tracing/service_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre servicios en Datadog
- link: /tracing/services/services_map/
  tag: Documentación
  text: Leer sobre el Mapa de servicios
title: Universal Service Monitoring
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Universal Service Monitoring no es compatible con este sitio.</div>
{{< /site-region >}}

## Información general

Universal Service Monitoring (USM) ofrece visibilidad de tus métricas de estado del servicio de forma universal en toda tu stack, _sin tener que escribir tu propio código_. Solo necesita de la presencia de un Datadog Agent configurado y [Etiquetado de servicios unificado][1], y aporta datos de rendimiento sobre tus servicios no codificados en vistas como el Catálogo de servicios y el Mapa de servicios. USM también funciona con el [Rastreo de implementación][2], monitores, dashboards y SLOs.

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="Video de demostración de Universal Service Monitoring. Una descripción general de un servicio a la que accedes pulsando un servicio en el Mapa de servicios y seleccionando View service overview (Ver descripción general del servicio)." video="true" >}}

## Configuración

Para más información sobre las plataformas y protocolos compatibles, y para recibir instrucciones para empezar, lee [Configurar Universal Service Monitoring][7].

<div class="alert alert-info"><strong>Fase beta: protocolos adicionales y métodos de cifrado</strong><p>USM es compatible en fase beta con servicios de detección en la nube y con protocolos de decodificación adicionales y métodos de cifrado de tráfico. Para obtener más información y solicitar acceso a la fase beta privada, lee <a href="/universal_service_monitoring/additional_protocols/">Detección de servicios en la nube y protocolos adicionales</a>.</p></div>

## Etiquetado de servicios automático

Universal Service Monitoring detecta automáticamente servicios que se ejecutan en tu infraestructura. Si no encuentra [etiquetas de servicio unificado][1], les asigna un nombre basado en una de las etiquetas (tags): `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`.

Para actualizar el nombre del servicio, configura [Etiquetado de servicios unificado][1].

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Cuando Datadog detecta automáticamente tus servicios, la etiqueta utilizada para mostrar esto está en la parte superior de la Página de servicios" style="width:80%;" >}}

## Explorar tus servicios

Después de configurar el Agent, espera unos cinco minutos a que tu servicio aparezca en el Catálogo de servicios. Haz clic en el servicio para ver la página de detalles del servicio. Un nombre de operación de `universal.http.server` o `universal.http.client` en la parte superior izquierda indica que la telemetría del servicio procede de Universal Service Monitoring.

El nombre de operación `universal.http.server` captura las métricas de estado para el tráfico entrante a tu servicio. El nombre de operación `universal.http.client` correspondiente representa el tráfico saliente hacia otros destinos.

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="El menú desplegable de la operación en la pestaña Services (Servicios) que muestra los nombres de operación disponibles" style="width:100%;" >}}

Después de activar Universal Service Monitoring, puedes:


- Navega a **APM** > **Service Catalog** (APM > Catálogo de servicios) o **APM** > **Service Map** (APM > Mapa de servicios) para [visualizar tus servicios y sus dependencias][3].

- Haz clic en páginas específicas de servicio para ver las métricas de señales clave (solicitudes, errores y duración) y correlacionarlas con los cambios de código recientes con [Rastreo de implementación][2].

- Crea [monitores][4], [dashboards][5] y [SLOs][6] utilizando las métricas `universal.http.*`.



## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: /es/tracing/services/deployment_tracking/
[3]: /es/tracing/service_catalog/
[4]: /es/monitors/types/apm/?tab=apmmetrics
[5]: /es/dashboards/
[6]: /es/service_management/service_level_objectives/metric/
[7]: /es/universal_service_monitoring/setup/