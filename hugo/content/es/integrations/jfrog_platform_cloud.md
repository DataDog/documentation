---
app_id: jfrog-platform-cloud
app_uuid: 798102cb-6c52-4a16-bc1b-48c2e6b54e71
assets:
  dashboards:
    JFrog Platform Cloud Log Analytics: assets/dashboards/jfrog_platform_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10419
    source_type_name: Plataforma JFrog en la nube
author:
  homepage: https://jfrog.com/
  name: JFrog
  sales_email: partners@jfrog.com
  support_email: support@jfrog.com
categories:
- recopilación de logs
- kubernetes
- rastreo
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: jfrog_platform_cloud
integration_id: jfrog-platform-cloud
integration_title: Plataforma JFrog en la nube
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jfrog_platform_cloud
public_title: Plataforma JFrog en la nube
short_description: Ver y analizar logs de JFrog Artifactory Cloud
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Kubernetes
  - Category::Containers
  - Category::Security
  configuration: README.md#Setup
  description: Ver y analizar logs de JFrog Artifactory Cloud
  media:
  - caption: 'Dashboard de logs de JFrog Artifactory: solicitudes HTTP'
    image_url: images/jfrog_platform_cloud_logs_0.png
    media_type: imagen
  - caption: 'Dashboard de logs de JFrog Artifactory: logs de solicitud'
    image_url: images/jfrog_platform_cloud_logs_1.png
    media_type: imagen
  - caption: 'Dashboard de logs de JFrog Artifactory: operaciones'
    image_url: images/jfrog_platform_cloud_logs_2.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Plataforma JFrog en la nube
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[JFrog][1] es una plataforma de DevOps híbrida universal de extremo a extremo. JFrog Artifactory es la solución única para alojar y gestionar todos los artefactos, binarios, paquetes, archivos, contenedores y componentes para su uso en toda la cadena de suministro de software.

JFrog Artifactory sirve como tu eje central para DevOps, integrándose con tus herramientas y procesos para mejorar la automatización, aumentar la integridad e incorporar las mejores prácticas a lo largo del camino.

SaaS Log Streamer de JFrog es una solución de streaming de log construida por JFrog para clientes SaaS. Esta solución trasmitirá logs de JFrog Artifactory desde la instancia JFrog SaaS del cliente directamente a su instancia de Datadog.

Los clientes que utilicen tanto JFrog como Datadog podrán visualizar logs de Artifactory dentro de dashboards de Datadog preconfigurados. Esta integración también tiene soporte integrado para pipelines de logs de Datadog, lo que significa que los logs transmitidos desde JFrog serán preprocesados y convertidos automáticamente al formato de log de Datadog, permitiendo a los equipos nombrar logs de forma única según sus necesidades, profundizar en los logs de Artifactory a través de facetas de búsqueda y monitorizar su instancia de JFrog SaaS.

Esta integración transmite los siguientes logs de artefacto a Datadog:

- **access-audit.log**
- **artifactory-request.log**
- **artifactory-access.log**
- **access-security-audit.log**

Estos logs permitirán a los clientes saber fácilmente quién accedió a qué repositorios y con qué frecuencia. Los logs también mostrarán qué direcciones IP accedieron a esos repositorios. Los tipos de log como traffic.log, artifactory-access.log y más logs de solicitudes se añadirán a esta integración en futuras actualizaciones.

El streaming de logs SaaS de JFrog se encuentra actualmente en fase beta. Mientras esté en fase beta, la función de streaming de logs en la nube solo estará disponible dentro del portal MyJFrog para clientes y JFrog Enterprise seleccionados. JFrog planea que esta función esté disponible para el público en general más adelante en el segundo trimestre de 2024, momento en el que estará disponible para todos los clientes y JFrog Enterprise.

## Configuración

**Nota:** La integración requiere una suscripción a JFrog Enterprise Plus.

### Instalación

1. Crea una [clave de API de Datadog][2].
2. En el [Portal MyJFrog][3], ve a Settings > JFrog Cloud Log Streaming - BETA (Configuración > Streaming de logs de JFrog en la nube: BETA) y habilita Log Streamer.
3. Selecciona Datadog como proveedor. 
4. Añade tu clave de API de Datadog, selecciona la URL de admisión de Datadog para tu [sitio de Datadog][4] en el menú desplegable y añade `ddtags` si es necesario. Haz clic en Save (Guardar).

Tus logs empezarán a transmitirse a Datadog en 24 horas o menos.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de JFrog][5]. 

[1]: https://jfrog.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://my.jfrog.com
[4]: https://docs.datadoghq.com/es/getting_started/site/
[5]: https://support.jfrog.com/