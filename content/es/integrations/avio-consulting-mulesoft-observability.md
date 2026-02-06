---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/avio_consulting_mulesoft_observability
app_id: avio-consulting-mulesoft-observability
categories:
- métricas
- rastreo
- marketplace
- automatización
custom_kind: integración
description: Métricas, trazas y logs de Otel para la observación de aplicaciones MuleSoft
integration_version: 1.1.0
media:
- caption: Visualización de trazas distribuidas de una aplicación MuleSoft
  image_url: images/mulesoft_observability_trace.png
  media_type: imagen
- caption: Dashboard de la plataforma Anypoint MuleSoft para la organización raíz
  image_url: images/mulesoft_observability_anypoint_root_organization.png
  media_type: imagen
- caption: Dashboard de la plataforma Anypoint MuleSoft para las aplicaciones de un
    grupo empresarial
  image_url: images/mulesoft_observability_anypoint_business_groups.png
  media_type: imagen
- caption: Dashboard de la plataforma Anypoint MuleSoft para un resumen ejecutivo
  image_url: images/mulesoft_observability_anypoint_executive.png
  media_type: imagen
- caption: Dashboard de Anypoint Platform MuleSoft para el uso y el rendimiento de
    recursos
  image_url: images/mulesoft_observability_mule_application.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: MuleSoft Observability
---
## Información general

MuleSoft es una plataforma de integración empresarial que ayuda a las empresas a conectar datos, aplicaciones y dispositivos on-premises y en entornos de nube.

Esta integración MuleSoft Observability es una integración basada en OpenTelemetry que envía datos de observabilidad y telemetría de tus aplicaciones MuleSoft a Datadog. Los módulos MuleSoft permiten a tus aplicaciones MuleSoft recopilar una traza distribuida y generar tramos (spans) para todos los flujos y un conjunto configurable de procesadores. Esta integración también proporciona compatibilidad para el envío de métricas de nivel de aplicación y de la plataforma Anypoint y proporciona un appender Log4j compatible con OpenTelemetry para ser utilizado en aplicaciones MuleSoft.

Se incluyen los siguientes dashboards predefinidos para visualizar métricas de nivel de aplicación y plataforma:

1. Plataforma Anypoint - Grupos de organizaciones y empresas:  Utiliza estos dashboards para entender qué recursos están disponibles para tu organización y cómo se están utilizando.
1. Plataforma Anypoint - Resumen Ejecutivo: Dashboard muy claro para ayudarte a entender el uso general de tu suscripción a la plataforma Anypoint.
1. Aplicaciones Mule: Visualiza métricas de nivel de aplicación y de sistema para una o más aplicaciones MuleSoft, incluyendo CPU, máquinas virtuales Java (JVM) y métricas de MuleSoft.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con el servicio de asistencia de AVIO a través de los siguientes canales:

- Correo electrónico: [datadog-support@avioconsulting.com](mailto:datadog-support@avioconsulting.com)
- [Portal de soporte de AVIO](https://datadog-support.avioconsulting.com)

### Referencias adicionales

[Documentación de MuleSoft OpenTelemtry](https://avioconsulting.github.io/mule-opentelemetry-module/)\
[Ingesta de OTLP por el Datadog Agent](https://docs.datadoghq.com/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host)\
[OpenTelemetry Collector y Datadog Exporter](https://docs.datadoghq.com/opentelemetry/collector_exporter/)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/avio-consulting-mulesoft-observability" target="_blank">Haz clic aquí</a> para comprar esta aplicación.