---
aliases:
- /es/infrastructure/serverless/azure_app_services/
- /es/serverless/azure_app_services/
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentación
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentación
  text: Entorno de Azure App Service
- link: /serverless/guide/disable_serverless
  tag: Documentación
  text: Desactivar Serverless Monitoring
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: Blog
  text: Monitoriza las aplicaciones web de .NET con la extensión de Datadog para Azure
    App Service
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Despliega las aplicaciones de ASP.NET Core en Azure App Service
- link: https://www.datadoghq.com/pricing/?product=application-performance-monitoring#application-performance-monitoring-apm_faq-what-is-considered-as-a-host-for-azure-app-services
  tag: Precios
  text: Precios de APM para Azure App Service
title: Serverless Monitoring para Azure App Service
---

## Información general

[Azure App Service][1] es una plataforma que aloja aplicaciones web, API REST y backends móviles. Serverless Monitoring de Datadog proporciona métricas, logs y traces (trazas) de tus aplicaciones de Azure App Service.

{{< img src="serverless/azure_app_service/azure_app_service_top_2.png" alt="Interfaz de usuario de Datadog, page (página) de Serverless Monitoring con Azure App Service seleccionado." style="width:100%;" >}}

En Datadog, utiliza la page (página) [Serverless > Azure][4] para solucionar problemas de todos tus recursos de Azure.

### Métricas y logs de Azure

Instala la [integración de Azure][2] para [métricas enriquecidas][3] y metadatos de recursos para Azure App Service. 

Configura el [reenvío de logs de Azure][6] para recopilar y enviar automáticamente logs de recursos y aplicaciones de Azure App Service a Datadog.

### APM y métricas personalizadas

Para monitorizar cargas de trabajo de Azure App Service con APM y métricas personalizadas, puedes instrumentar tus cargas de trabajo de Azure App Service.

| Sistema operativo      | Tiempo de ejecución   | Documentación               |
|---------|-----------|-----------------------------|
| Linux   | Java, Node.js, .NET, PHP, Python | [Linux - Instrumentación de código][7] |
| Linux   | Contenedor | [Linux - Instrumentación de contenedores][8] |
| Windows | Java, Node.js, .NET | [Windows - Instrumentación de código][9]

Capacidades:
- Rastreo totalmente distribuido de APM mediante la instrumentación automática.
- Vistas personalizadas de servicios y trazas (traces) de APM que incluyen las métricas y los metadatos pertinentes de Azure App Service.
- Instrumentación manual de APM para personalizar tramos (spans).
- Inyección del `Trace_ID` en los logs de aplicación.
- Métricas personalizadas con [DogStatsD][10]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /es/integrations/azure/
[3]: /es/integrations/azure_app_services/#metrics
[4]: https://app.datadoghq.com/serverless/azure/app-service-plan
[5]: /es/integrations/azure/#setup
[6]: /es/logs/guide/azure-automated-log-forwarding/
[7]: /es/serverless/azure_app_service/linux_code
[8]: /es/serverless/azure_app_service/linux_container
[9]: /es/serverless/azure_app_service/windows_code
[10]: /es/developers/dogstatsd/