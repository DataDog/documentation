---
app_id: jfrog-platform
app_uuid: b2748652-b976-461c-91dd-5abd4467f361
assets:
  dashboards:
    Artifactory Metrics: assets/dashboards/jfrog_artifactory_metrics_(self-hosted).json
    Jfrog Artifactory Dashboard: assets/dashboards/jfrog_artifactory_logs_(self-hosted).json
    Xray Logs: assets/dashboards/jfrog_xray_logs_(self-hosted).json
    Xray Metrics: assets/dashboards/jfrog_xray_metrics_(self-hosted).json
    Xray Violations: assets/dashboards/jfrog_xray_violations_(self-hosted).json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: jfrog.artifactory.app_disk_free_bytes
      metadata_path: metadata.csv
      prefix: jfrog.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10121
    source_type_name: JFrog Platform
author:
  homepage: https://github.com/jfrog/log-analytics-datadog
  name: JFrog
  sales_email: partners@jfrog.com
  support_email: support@jfrog.com
categories:
- rastreo
- recopilación de logs
- métricas
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform_self_hosted/README.md
display_on_public_website: true
draft: false
git_integration_title: jfrog_platform_autoalojada
integration_id: jfrog-platform
integration_title: JFrog Platform (autoalojada)
integration_version: 1.3.0
is_public: true
manifest_version: 2.0.0
name: jfrog_platform_autoalojada
public_title: JFrog Platform (autoalojada)
short_description: Observar y analizar logs, infracciones y métricas de JFrog Artifactory
  y Xray
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Log Collection
  - Category::Metrics
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Data Type Sent::Metrics
  - Data Type Sent::Logs
  configuration: README.md#Configuración
  description: Observar y analizar logs, infracciones y métricas de JFrog Artifactory
    y Xray
  media:
  - caption: Dashboard de logs de JFrog Artifactory
    image_url: images/jfrog_artifactory_logs.png
    media_type: imagen
  - caption: Dashboard de métricas de JFrog Artifactory
    image_url: images/jfrog_artifactory_metrics.png
    media_type: imagen
  - caption: Dashboard de logs de JFrog Xray
    image_url: images/jfrog_xray_logs.png
    media_type: imagen
  - caption: Dashboard de infracciones de JFrog Xray
    image_url: images/jfrog_xray_violations.png
    media_type: imagen
  - caption: Dashboard de métricas de JFrog Xray
    image_url: images/jfrog_xray_metrics.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: JFrog Platform (autoalojada)
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
<div class="alert alert-danger">El check del Agent existente para la recopilación de métricas de JFrog ha sido sustituido por FluentD. El check del Agent está obsoleto.</div>

## Información general

[JFrog][1] es una plataforma DevOps universal, híbrida e integral. Esta integración ayuda a cualquier cliente autoalojado de JFrog a enviar logs, infracciones y métricas de JFrog Artifactory y JFrog Xray de forma ininterrumpida y directa a Datadog. Esta integración viene con el paquete de [pipelines de logs][2] de Datadog, que enriquecen e indexan logs para facilitar su búsqueda y procesamiento mediante [facetas][3] de Datadog.

Haz saber a JFrog cómo podemos mejorar esta integración. No dudes en visitar [nuestro GitHub][4] para obtener documentación más detallada.

### Dashboards de JFrog

Puedes encontrar los dashboards en el paquete de esta integración, en la pestaña Recursos del cuadro de la integración.

#### Dashboard de JFrog Artifactory
Este dashboard se divide en tres secciones: Aplicación, Auditoría y Solicitudes.
* **Aplicación** - Esta sección realiza un seguimiento del volumen de errores (información sobre diferentes fuentes de logs) y de errores de Artifactory a lo largo del tiempo (ráfagas de errores de aplicación que de otro modo podrían pasar desapercibidos).
* **Auditoría** - Esta sección realiza un seguimiento de los logs de auditoría que ayudan a determinar quién accede a tu instancia Artifactory y desde dónde. Esto puede ayudar a rastrear solicitudes o procesos potencialmente maliciosos (como trabajos CI) utilizando credenciales caducadas.
* **Solicitudes** - Esta sección realiza un seguimiento de los códigos de respuesta HTTP y las 10 principales direcciones IP para cargas y descargas.

#### Dashboard de métricas de JFrog Artifactory
Este dashboard realiza un seguimiento de las métricas del sistema Artifactory, de la memoria de máquinas virtuales Java, de la recopilación de basura, de las conexiones de bases de datos y de las métricas de conexiones HTTP.

#### Dashboard de logs de JFrog Xray
Este dashboard proporciona un resumen de volúmenes de logs de acceso, servicio y tráfico asociados a Xray. Además, los clientes también pueden realizar un seguimiento de diferentes códigos de respuesta HTTP, errores HTTP 500 y errores de logs, para tener una mayor perspectiva operativa.

#### Dashboard de infracciones de JFrog Xray
Este dashboard proporciona un resumen agregado de todas las infracciones de licencias y vulnerabilidades de seguridad detectadas por Xray. La información se segmenta por políticas y reglas de vigilancia. Se proporciona información de tendencias sobre el tipo y la gravedad de las infracciones a lo largo del tiempo, así como información sobre las vulnerabilidades y exposiciones comunes más frecuentes, y los artefactos y componentes más afectados.

#### Dashboard de métricas de JFrog Xray
Este dashboard realiza un seguimiento de métricas de sistema y datos de artefactos y componentes analizados.

## Configuración

### Requisitos

* Tu [clave de API Datadog][5].
* Instalación de la integración JFrog Platform (autoalojada).

### Instalación de FluentD
Se recomienda seguir la guía de instalación correspondiente a tu entorno:

* [SO/Máquina virtual][6]
* [Docker][7]
* [Despliegue de Kubernetes con Helm][8]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "jfrog-platform" >}}


### Eventos

El check JFrog no incluye eventos.

### Checks de servicio

El check JFrog no incluye checks de servicios.

## Soporte

¿Necesitas ayuda? Ponte en contacto con [support@jfrog.com][10] o abre un ticket de asistencia en el [portal de asistencia al cliente][11] de JFrog.

### Resolución de problemas

**P: Estoy a punto de actualizar de on-prem a JFrog Cloud. ¿Puedo esperar que todos los mismos logs se transmitan a Datadog desde mi instancia SaaS, luego de la migración, cuando instalo la versión SaaS de la integración?**

R: La iniciarse, la versión SaaS de la integración sólo transmitirá logs artifactory-request, access-audit y access-security-audit desde tu instancia SaaS JFrog a Datadog.


[1]: https://jfrog.com/
[2]: https://docs.datadoghq.com/es/logs/log_configuration/pipelines/?tab=source
[3]: https://docs.datadoghq.com/es/logs/explorer/facets/
[4]: https://github.com/jfrog/log-analytics-datadog
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/jfrog/log-analytics-datadog#os--virtual-machine
[7]: https://github.com/jfrog/log-analytics-datadog#docker
[8]: https://github.com/jfrog/log-analytics-datadog#kubernetes-deployment-with-helm
[9]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform_self_hosted/metadata.csv
[10]: https://app.datadoghq.com/support@jfrog.com
[11]: https://support.jfrog.com/s/login/?language=en_US&ec=302&startURL=%2Fs%2F
