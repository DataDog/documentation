---
aliases:
- /es/infrastructure/serverless/azure_app_services/
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentación
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentación
  text: Entorno de Azure App Service
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: Blog
  text: Monitorizar aplicaciones web de .NET con la extensión de Datadog para Azure
    App Service
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Implementa las aplicaciones de ASP.NET Core en Azure App Service
- link: https://www.datadoghq.com/pricing/?product=application-performance-monitoring#application-performance-monitoring-apm_faq-what-is-considered-as-a-host-for-azure-app-services
  tag: Precios
  text: Precios de APM para Azure App Service
kind: documentación
title: Monitorización de Azure App Service
---

## Información general

Microsoft [Azure App Service][1] es un grupo de recursos serverless que permiten crear y alojar aplicaciones web, backends móviles, funciones basadas en eventos y API RESTful sin tener que gestionar infraestructura. El servicio puede alojar cargas de trabajo de todos los tamaños y ofrece opciones de escalado automático y alta disponibilidad.

Datadog ofrece capacidades de monitorización para todos los tipos de recursos de Azure App Service:

- Aprovecha las [métricas][2] de Azure Monitor para aplicaciones y funciones mediante la [Integración de Azure][3].
- Utiliza la [vista de Azure App Service][4] para detectar problemas rápidamente, asignar relaciones entre los recursos Azure App Service y obtener información sobre costes y rendimiento.
- Envía métricas personalizadas a través de la API.
- Envía [logs de recursos][5] a través de un [centro de eventos][6].

Datadog ofrece capacidades de monitorización adicionales para los siguientes tiempos de ejecución de las cargas de trabajo de Azure App Service que se encuentren en los planes Basic, Standard y Premium:

| Sistema operativo | Tiempo de ejecución |Tipo de aplicación|Estado|Documentación| 
|----|---------|-----|----|--------------|
|Windows|.NET|Aplicación de funciones y aplicación web|Disponible de forma general|[Configuración de .NET para Windows][7]|
|Windows|Java|Aplicación web|Disponible de forma general|[Configuración de Java para Windows][8]|
|Windows|Node|Aplicación web|Disponible de forma general|[Configuración de Node para Windows][13]|
|Linux|.NET|Aplicación web|Disponible de forma general|[Configuración de .NET para Linux][9]|
|Linux|Node|Aplicación web|Disponible de forma general|[Configuración de Node para Linux][9]|
|Linux|PHP|Aplicación web|Disponible de forma general|[Configuración de PHP para Linux][9]|
|Linux|Java|Aplicación web|Disponible de forma general|[Configuración de Java para Linux][10]|
|Linux|Python|Aplicación web|Disponible de forma general|[Configuración de Python para Linux][9]|
|Linux|Contenedor|Aplicación web|Disponible de forma general|[Configuración de contenedor para Linux][12]|


Capacidades:
- Rastreo totalmente distribuido de APM mediante la instrumentación automática.
- Vistas personalizadas de servicios y trazas (traces) de APM que muestran las métricas y los metadatos pertinentes de Azure App Service.
- Instrumentación manual de APM para personalizar tramos (spans).
- Inyección de `Trace_ID` en los logs de aplicación.
- Métricas personalizadas con [DogStatsD][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /es/integrations/azure_app_services/#metrics
[3]: /es/integrations/azure/
[4]: https://app.datadoghq.com/functions?search=&cloud=azure&entity_view=app_service_plan
[5]: /es/integrations/azure/#log-collection
[6]: https://learn.microsoft.com/azure/event-hubs/
[7]: /es/serverless/azure_app_services/azure_app_services_windows?tab=net#setup
[8]: /es/serverless/azure_app_services/azure_app_services_windows?tab=java#setup
[9]: /es/serverless/azure_app_services/azure_app_services_linux?tab=nodenetphppython
[10]: /es/serverless/azure_app_services/azure_app_services_linux?tab=java
[11]: /es/developers/dogstatsd/
[12]: /es/serverless/azure_app_services/azure_app_services_container
[13]: /es/serverless/azure_app_services/azure_app_services_windows?tab=nodejs#setup