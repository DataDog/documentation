---
app_id: oke
app_uuid: c3361861-32be-4ed4-a138-d68b85b8d88b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10255
    source_type_name: 'Oracle Container Engine para Kubernetes: OKE'
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
- kubernetes
- oracle
- orquestación
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oke/README.md
display_on_public_website: true
draft: false
git_integration_title: oke
integration_id: oke
integration_title: Oracle Container Engine para Kubernetes
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oke
public_title: Oracle Container Engine para Kubernetes
short_description: OKE es un servicio de orquestación de contenedores gestionado por
  Oracle.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Oracle
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: OKE es un servicio de orquestación de contenedores gestionado por Oracle.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/
  support: README.md#Support
  title: Oracle Container Engine para Kubernetes
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Oracle Cloud Infrastructure Container Engine para Kubernetes (OKE) es un servicio totalmente gestionado de Kubernetes para desplegar y ejecutar tus aplicaciones en contenedores en Oracle Cloud. Datadog te proporciona una visibilidad completa de tus clústeres de Kubernetes gestionados por OKE. Una vez que hayas habilitado tu integración de Datadog, puedes ver tu infraestructura de Kubernetes, monitorizar Live Processes y realizar un seguimiento de métricas clave de todos tus pods y contenedores en un solo lugar.

## Configuración

Dado que Datadog ya se integra con Kubernetes, está preparado para monitorizar OKE. Si estás ejecutando el Agent en un clúster de Kubernetes y planeas migrar a OKE, puedes continuar con la monitorización de tu clúster con Datadog.

Además, se admiten grupos de nodos de OKE.


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de soporte de Datadog][1].

## Referencias adicionales

- [Cómo monitorizar OKE con Datadog][2]

[1]: https://docs.datadoghq.com/es/help/
[2]: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/