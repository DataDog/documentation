---
app_id: pivotal-pks
app_uuid: e8a08b96-bbca-4907-8cc8-b7c3abf2f443
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10034
    source_type_name: Pivotal PKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
- Kubernetes
- recopilación de logs
- red
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pivotal_pks/README.md
display_on_public_website: true
draft: false
git_integration_title: pivotal_pks
integration_id: pivotal-pks
integration_title: Servicio de contenedor Pivotal
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pivotal_pks
public_title: Servicio de contenedor Pivotal
short_description: Oferta Kubernetes de nivel empresarial de Pivotal.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Categoría::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Categoría::Orquestación
  - Supported OS::Linux
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Oferta Kubernetes de nivel empresarial de Pivotal.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Servicio de contenedor Pivotal
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Esta integración monitoriza clústeres del [servicio de contenedor Pivotal][1].

## Configuración

Debido a que Datadog ya se integra con Kubernetes, está preparado para monitorizar Pivotal Kubernetes Service (PKS). Puedes utilizar el [cuadro de monitorización de clústeres][2] de Datadog junto con esta integración para monitorizar tu clúster.

Instala el Datadog Agent en cada máquina virtual no operativa de tu entorno PKS. En entornos sin Pivotal Application Service (PAS) instalado, selecciona la sección `Resource Config` del cuadro y configura las `instances` de `datadog-firehose-nozzle` como `0`.

### Recopilación de métricas

La monitorización PKS requiere que configures la integración Datadog para [Kubernetes][3].

### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La configuración es exactamente la misma que para Kubernetes.
Para empezar a recopilar logs de todos tus contenedores, utiliza las [variables de entorno][4] de tu Datadog Agent.

También puedes aprovechar DaemonSets para [desplegar automáticamente el Datadog Agent en todos tus nodos][5].

Para obtener más información sobre esas variables de entorno y descubrir opciones de configuración más avanzadas, sigue los [pasos de recopilación de logs del contenedor][6].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://pivotal.io/platform/pivotal-container-service
[2]: https://network.pivotal.io/products/datadog
[3]: https://docs.datadoghq.com/es/integrations/kubernetes/
[4]: https://docs.datadoghq.com/es/agent/basic_agent_usage/kubernetes/#log-collection-setup
[5]: https://docs.datadoghq.com/es/agent/basic_agent_usage/kubernetes/#container-installation
[6]: https://docs.datadoghq.com/es/logs/log_collection/docker/#option-2-container-installation
[7]: https://docs.datadoghq.com/es/help/