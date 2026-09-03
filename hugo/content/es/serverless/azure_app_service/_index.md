---
aliases:
- /es/infrastructure/serverless/azure_app_services/
- /es/serverless/azure_app_services/
- /es/serverless/azure
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentación
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentación
  text: Azure App Service Environment
- link: /serverless/guide/disable_serverless
  tag: Documentación
  text: Deshabilitar Serverless Monitoring
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#web-apps-app-service
  tag: Documentación
  text: Enviar trazas de Azure App Service a Datadog con OTLP
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: Blog
  text: Hacer un seguimiento de las aplicaciones web .NET con la extensión de Datadog
    para Azure App Service
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Implementar aplicaciones ASP.NET Core en Azure App Service
- link: https://www.datadoghq.com/pricing/?product=serverless-monitoring&tab=azure-app-service#products
  tag: Precios
  text: Precios de APM de Azure App Service
title: Serverless Monitoring para Azure App Service
---
## Descripción general {#overview}

[Azure App Service][1] es una plataforma que aloja aplicaciones web, API REST y backends móviles. Datadog Serverless Monitoring proporciona métricas, registros y trazas para sus aplicaciones de Azure App Service.

{{< img src="serverless/azure_app_service/azure_app_service_top_2.png" alt="Interfaz de usuario de Datadog, página de Serverless Monitoring con Azure App Service seleccionado." style="width:100%;" >}}

En Datadog, utilice la página [{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][4] para solucionar problemas de todos sus recursos de Azure.

### Métricas y registros de Azure {#azure-metrics-and-logs}

Instale la [integración de Azure][2] para obtener [métricas enriquecidas][3] y metadatos de recursos para Azure App Service.

Configure el [reenvío de registros de Azure][6] para recopilar y enviar automáticamente los registros de recursos y aplicaciones de Azure App Service a Datadog.

### APM y métricas personalizadas {#apm-and-custom-metrics}

Para hacer un seguimiento de las cargas de trabajo de Azure App Service con APM y métricas personalizadas, puede instrumentar sus cargas de trabajo de Azure App Service.

| SO      | Entorno de ejecución   | Documentación               |
|---------|-----------|-----------------------------|
| Linux   | Java, Node.js, .NET, PHP, Python | [Linux - Instrumentación de código][7] |
| Linux   | Contenedor | [Linux - Instrumentación de contenedor][8] |
| Windows | Java, Node.js, .NET | [Windows - Instrumentación de código][9]

Capacidades:
- Trazas APM totalmente distribuidas mediante instrumentación automática
- Vistas de servicio y de trazas de APM personalizadas que muestran métricas y metadatos relevantes de Azure App Service
- Instrumentación APM manual para personalizar los tramos
- `Trace_ID` inyección en los registros de la aplicación
- Métricas personalizadas con [DogStatsD][10]

## Lecturas adicionales {#further-reading}

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
[10]: /es/extend/dogstatsd/