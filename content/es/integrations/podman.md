---
app_id: podman
app_uuid: ecc06845-18ac-448e-b352-1bbf31fdfcc3
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10267
    source_type_name: Podman
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/podman/README.md
display_on_public_website: true
draft: false
git_integration_title: podman
integration_id: podman
integration_title: Podman
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: podman
public_title: Podman
short_description: Rastrea todas tus métricas de contenedores de Podman con Datadog
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea todas tus métricas de contenedores de Podman con Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Podman
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


[Podman][1] es un motor de contenedores sin daemon para desarrollar, gestionar y ejecutar contenedores OCI en tu sistema Linux. Los contenedores pueden ejecutarse como raíz o en modo sin raíz.

## Información general

El tiempo de ejecución de contenedor de Podman es compatible con el [check del Agent del contenedor][2].
Este check informa de un conjunto de métricas sobre cualquier contenedor en ejecución, independientemente del tiempo de ejecución utilizado para iniciarlos.

**NOTA**: El check `container` estandariza métricas para todos los contenedores encontrados en el sistema, independientemente del tiempo de ejecución del contenedor.

## Configuración

### Instalación

Para monitorizar contenedores gestionados por [Podman][1], consulta las [instrucciones de instalación][3] del [check del Agent del contenedor][2].

## Datos recopilados

### Métricas

Consulta [metadata.csv][4] para ver una lista de métricas proporcionada por esta integración.

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de soporte de Datadog][1].

[1]: https://podman.io/
[2]: https://docs.datadoghq.com/es/integrations/container/
[3]: https://docs.datadoghq.com/es/integrations/container/#setup
[4]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv