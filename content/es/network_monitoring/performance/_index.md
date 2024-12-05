---
algolia:
  tags:
  - npm
  - network performance monitoring
aliases:
- /es/monitors/network_flow_monitors/
- /es/graphing/infrastructure/network_performance_monitor/
- /es/network_performance_monitoring/
description: Explora métricas para la comunicación punto a punto en tu infraestructura.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Monitorizar la arquitectura en la nube y dependencias de aplicaciones con
    Datadog NPM
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: Blog
  text: Monitorización de hosts de Windows con Network Performance Monitoring
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: Blog
  text: Monitorizar el estado del endpoint con la autodetección del servicio en la
    nube
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: Blog
  text: Prácticas recomendadas para empezar con Datadog NPM
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog NPM ya admite la conexión en red de Consul
- link: https://www.datadoghq.com/blog/npm-story-centric-ux/
  tag: Blog
  text: Inicio rápido de investigaciones de red con la UX centrada en historias de
    NPM
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitorizar logs de DNS para análisis de red y seguridad
title: Network Performance Monitoring
---

## Información general

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog Network Performance Monitoring (NPM) te ofrece visibilidad de tu tráfico de red entre servicios, contenedores, zonas de disponibilidad y cualquier otra etiqueta en Datadog. Los datos de conexión a nivel de IP, puerto y PID se agregan en dependencias de capa de aplicación entre endpoints de cliente y servidor significativos, que pueden analizarse y visualizarse a través de una [página de red][1] y un [mapa de red][2] personalizables. Utiliza los datos de flujo junto con el tráfico clave de red y las métricas de servidor DNS para:

* Localizar dependencias inesperadas o de servicio latentes
* Optimiza la costosa comunicación entre regiones o nubes múltiples
* Identificar las interrupciones de las regiones proveedoras de la nube y las herramientas de terceros
* Solucionar problemas de servidor DNS del lado del cliente y del lado del servidor

NPM simplifica la monitorización de redes complejas con soporte integrado para Linux y [Windows OS][3], así como para entornos de contenedores orquestados e [instrumentados con una red de servicio de Istio][4].

Además, [la ruta de red][5], una función de NPM, está disponible en fase beta privada, lo que te permite ver el tráfico paso a paso en tu red.

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="network_monitoring/performance/setup" >}}<u>Configuración</u>: configurar el Agent para recopilar datos de red.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_analytics" >}}<u>Network Analytics</u>: grafica tus datos de red entre cada cliente y servidor disponible.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_map" >}}<u>Mapa de red</u>: asigna tus datos de red entre tus etiquetas (tags).{{< /nextlink >}}
    {{< nextlink href="monitors/types/network_performance/" >}}<u>Monitores recomendados</u>: configurar monitores de NPM recomendados.{{< /nextlink >}}
{{< /whatsnext >}}

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://www.datadoghq.com/blog/npm-windows-support/
[4]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[5]: /es/network_monitoring/network_path/