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
description: Explore métricas para la comunicación punto a punto en su infraestructura.
further_reading:
- link: https://www.datadoghq.com/architecture/hybrid-cloud-network-observability/
  tag: Centro de arquitectura
  text: Arquitectura de referencia para la observabilidad de red híbrida multinube
- link: https://www.datadoghq.com/blog/cnm-network-health
  tag: Blog
  text: Detecte, diagnostique y resuelva problemas de red fácilmente con CNM Network
    Health
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guía
  text: Detección de disponibilidad de aplicaciones mediante Network Insights
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: Blog
  text: Haga un seguimiento de los hosts de Windows con Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: Blog
  text: Haga un seguimiento del estado de los puntos de conexión en la nube con la
    autodetección de servicios en la nube
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: Blog
  text: Prácticas recomendadas para comenzar con Datadog CNM
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog CNM ahora es compatible con redes Consul
- link: https://www.datadoghq.com/blog/npm-story-centric-ux/
  tag: Blog
  text: Inicie rápidamente investigaciones de red con la experiencia de usuario centrada
    en historias de CNM
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: Blog
  text: Prácticas recomendadas para hacer un seguimiento y remediar la rotación de
    conexiones
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: Doc
  text: Términos y conceptos de CNM
- link: https://learn.datadoghq.com/courses/getting-started-infra-cnm
  tag: Centro de aprendizaje
  text: Primeros pasos con la infraestructura y Cloud Network Monitoring (CNM)
title: Cloud Network Monitoring
---
## Descripción general {#overview}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog Cloud Network Monitoring (CNM) le brinda visibilidad del tráfico de su red entre servicios, contenedores, zonas de disponibilidad y cualquier otra etiqueta en Datadog. Los datos de conexión a nivel de IP, puerto y PID se agregan en dependencias de capa de aplicación entre puntos de conexión de cliente y servidor significativos, los cuales pueden analizarse y visualizarse a través de una [página de red][1] y un [Network Map][2] personalizables. Utilice datos de flujo junto con métricas clave de tráfico de red y de servidor DNS para:

* Identifique dependencias de servicio inesperadas o latentes
* Optimice la costosa comunicación entre regiones o entre nubes
* Identifique interrupciones en regiones de proveedores de nube y herramientas de terceros
* Solucione problemas de servidores DNS del lado del cliente y del lado del servidor

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/setup" >}}<u>Configuración</u>: Configure el Agente para recopilar datos de red.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_health" >}}<u>Network Health</u>: Revise el estado de su entorno de red.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_analytics" >}}<u>Network Analytics</u>: Grafique sus datos de red entre cada cliente y servidor disponible.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/network_path/setup/#scheduled-tests" >}}<u>Network Path Scheduled Tests</u>: Visualice la ruta que sigue el tráfico de red desde su origen hasta su destino mediante pruebas programadas.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/network_path/setup/#dynamic-tests" >}}<u>Network Path Dynamic Tests</u>: Cree pruebas de forma dinámica para permitir que el Agente descubra automáticamente las rutas de red y les haga un seguimiento.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_map" >}}<u>Network Map</u>: Mapee sus datos de red entre sus etiquetas.{{< /nextlink >}}
    {{< nextlink href="monitors/types/cloud_network_monitoring/#common-monitors" >}}<u>Monitores comunes</u>: Configure los monitores CNM comunes.{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map