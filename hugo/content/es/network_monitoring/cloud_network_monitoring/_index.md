---
algolia:
  tags:
  - Cloud Network Monitoring
  - Network Performance Monitoring
  - CNM
  - NPM
aliases:
- /es/monitors/network_flow_monitors/
- /es/graphing/infrastructure/network_performance_monitor/
- /es/network_performance_monitoring/
- /es/network_monitoring/performance/
description: Explora métricas para la comunicación punto a punto en tu infraestructura.
further_reading:
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guía
  text: Detección de la disponibilidad de aplicaciones mediante información de red
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: Blog
  text: Monitorización de hosts de Windows con Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: Blog
  text: Monitorizar el estado del endpoint con la autodetección del servicio en la
    nube
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: Blog
  text: Prácticas recomendadas para empezar a utilizar Datadog CNM
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog CNM ahora admite la conexión en red de Consul
- link: https://www.datadoghq.com/blog/npm-story-centric-ux/
  tag: Blog
  text: Inicio rápido de investigaciones de red con UX centrado en la historia de
    CNM
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: Blog
  text: Prácticas recomendadas para la monitorización y corrección del churn de conexiones
title: Cloud Network Monitoring
---

## Información general

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog Cloud Network Monitoring (CNM) te da visibilidad de tu tráfico de red entre servicios, contenedores, zonas de disponibilidad y cualquier otra etiqueta en Datadog. Los datos de conexión a nivel de IP, puerto y PID se agregan en dependencias de la capa de aplicación entre endpoints de cliente y servidor significativos, que pueden analizarse y visualizarse a través de una [página de red][1] y un [mapa de red][2] personalizables. Utiliza los datos de flujo junto con el tráfico de red clave y las métricas de servidor DNS para:

* Localizar dependencias inesperadas o de servicio latentes
* Optimiza la costosa comunicación entre regiones o nubes múltiples
* Identificar las interrupciones de las regiones proveedoras de la nube y las herramientas de terceros
* Solucionar problemas de servidor DNS del lado del cliente y del lado del servidor

CNM simplifica la monitorización de redes complejas con la compatibilidad integrada para Linux y [Windows OS][3], así como entornos en contenedores orquestados e [instrumentados con la red de servicio de Istio][4].

Además, la [ruta de red][5], una función de CNM, está disponible en Vista previa, lo que te permite ver el tráfico salto a salto en tu red.

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/setup" >}}<u>Configuración</u>: configura el Agent para recopilar datos de red.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_analytics" >}}<u>Análisis de red</u>: grafica tus datos de red entre cada cliente y servidor disponible.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_map" >}}<u>Mapa de red</u>: asigna tus datos de red entre tus etiquetas.{{< /nextlink >}}
    {{< nextlink href="monitors/types/cloud_network_monitoring/#common-monitors" >}}<u>Monitores comunes</u>: configura monitores de CNM comunes.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://www.datadoghq.com/blog/npm-windows-support/
[4]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[5]: /es/network_monitoring/network_path/