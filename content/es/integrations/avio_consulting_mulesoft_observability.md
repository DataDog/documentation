---
algolia:
  subcategory: Integraciones del Marketplace
app_id: avio-consulting-mulesoft-observability
app_uuid: 54de8550-348d-4b1b-a8e1-1e2efc633bff
assets:
  dashboards:
    Anypoint Platform - Business Group Summary: assets/dashboards/anypoint_platform_-_business_group_summary.json
    Anypoint Platform - Executive: assets/dashboards/anypoint_platform_-_executive.json
    Anypoint Platform - Root Organization: assets/dashboards/anypoint_platform_-_root_organization.json
    Mule Application Dashboard: assets/dashboards/mule_application_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    metrics:
      check:
      - avio.mule.app.message.count
      metadata_path: metadata.csv
      prefix: avio
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17618199
    source_type_name: MuleSoft Observability
author:
  homepage: https://www.avioconsulting.com
  name: AVIO Consulting
  sales_email: sales@avioconsulting.com
  support_email: datadog-support@avioconsulting.com
  vendor_id: avio-consulting
categories:
- métricas
- rastreo
- marketplace
- automatización
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: avio_consulting_mulesoft_observability
integration_id: avio-consulting-mulesoft-observability
integration_title: MuleSoft Observability
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: avio_consulting_mulesoft_observability
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.avio_consulting.mulesoft_observability
  product_id: mulesoft-observability
  short_description: Precio unitario por aplicación de producción
  tag: app.prod.identifier
  unit_label: Aplicación de producción MuleSoft instrumentada
  unit_price: 30
public_title: MuleSoft Observability
short_description: Métricas, trazas (traces) y logs de Otel para la observación de
  aplicaciones MuleSoft
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Categoría::Rastreo
  - Categoría::Marketplace
  - Categoría::Automatización
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Trazas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Métricas, trazas y logs de Otel para la observación de aplicaciones
    MuleSoft
  media:
  - caption: Visualización de trazas distribuidas de una aplicación MuleSoft
    image_url: images/mulesoft_observability_trace.png
    media_type: imagen
  - caption: Dashboard de la plataforma Anypoint MuleSoft para la organización raíz
    image_url: images/mulesoft_observability_anypoint_root_organization.png
    media_type: imagen
  - caption: Dashboard de la plataforma Anypoint MuleSoft para las aplicaciones de
      un grupo empresarial
    image_url: images/mulesoft_observability_anypoint_business_groups.png
    media_type: imagen
  - caption: Dashboard de la plataforma Anypoint MuleSoft para un resumen ejecutivo
    image_url: images/mulesoft_observability_anypoint_executive.png
    media_type: imagen
  - caption: Dashboard de Anypoint Platform MuleSoft para el uso y el rendimiento
      de recursos
    image_url: images/mulesoft_observability_mule_application.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: MuleSoft Observability
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

MuleSoft es una plataforma de integración empresarial que ayuda a las empresas a conectar datos, aplicaciones y dispositivos on-premises y en entornos de nube.

Esta integración MuleSoft Observability es una integración basada en OpenTelemetry que envía datos de observabilidad y telemetría de tus aplicaciones MuleSoft a Datadog. Los módulos MuleSoft permiten a tus aplicaciones MuleSoft recopilar una traza distribuida y generar tramos (spans) para todos los flujos y un conjunto configurable de procesadores. Esta integración también proporciona compatibilidad para el envío de métricas de nivel de aplicación y de la plataforma Anypoint y proporciona un appender Log4j compatible con OpenTelemetry para ser utilizado en aplicaciones MuleSoft.

Se incluyen los siguientes dashboards predefinidos para visualizar métricas de nivel de aplicación y plataforma:
1. Plataforma Anypoint - Grupos de organizaciones y empresas:  Utiliza estos dashboards para entender qué recursos están disponibles para tu organización y cómo se están utilizando.
1. Plataforma Anypoint - Resumen Ejecutivo: Dashboard muy claro para ayudarte a entender el uso general de tu suscripción a la plataforma Anypoint.
1. Aplicaciones Mule: Visualiza métricas de nivel de aplicación y de sistema para una o más aplicaciones MuleSoft, incluyendo CPU, máquinas virtuales Java (JVM) y métricas de MuleSoft.

## Compatibilidad
Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con el servicio de asistencia de AVIO a través de los siguientes canales:

- Correo electrónico: [datadog-support@avioconsulting.com][2]
- [Portal de asistencia de AVIO][3]

### Referencias adicionales
[Documentación de MuleSoft OpenTelemtry][4]  
[Ingestión OTLP por el Datadog Agent][5]  
[Recopilador de OpenTelemetry y Exportador de Datadog][6]  

[1]: https://github.com/DataDog/marketplace/blob/master/avio_consulting_mulesoft_observability/metadata.csv
[2]: mailto:datadog-support@avioconsulting.com
[3]: https://datadog-support.avioconsulting.com
[4]: https://avioconsulting.github.io/mule-opentelemetry-module/
[5]: https://docs.datadoghq.com/es/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[6]: https://docs.datadoghq.com/es/opentelemetry/collector_exporter/
---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/avio-consulting-mulesoft-observability" target="_blank">adquiere esta aplicación en el Marketplace</a>.