---
app_id: openstack-controller
app_uuid: f5c2cc69-1efc-40b2-8dcd-61e1215b237d
assets:
  dashboards:
    OpenStack Controller Overview: assets/dashboards/openstack-controller.json
    OpenStack Controller Overview [Default Microversion]: assets/dashboards/openstack_controller_overview_[default_microversion].json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: openstack.controller
      metadata_path: metadata.csv
      prefix: openstack.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10226
    source_type_name: Openstack_controller
  logs:
    source: openstack
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- recopilación de logs
- suministrar
- orquestación
- configuración y despliegue
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openstack_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: openstack_controller
integration_id: openstack-controller
integration_title: OpenStack Controller
integration_version: 8.6.0
is_public: true
manifest_version: 2.0.0
name: openstack_controller
public_title: OpenStack Controller
short_description: Seguimiento del uso de recursos a nivel de hipervisor y VM, además
  de métricas de Neutron.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::Log Collection
  - Category::Provisioning
  - Category::Orchestration
  - Category::Configuration & Deployment
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Seguimiento del uso de recursos a nivel de hipervisor y VM, además
    de métricas de Neutron.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/openstack-controller-integration/
  support: README.md#Support
  title: OpenStack Controller
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

**Nota**: Esta integración solo se aplica a OpenStack v13 y posteriores. Si deseas recopilar métricas de OpenStack v12 y anteriores, utiliza la [integración de OpenStack][2].

Este check monitoriza [OpenStack][2] desde el nodo controlador.

## Configuración

### Instalación

El check de OpenStack Controller está incluido en el paquete del [Datadog Agent ][3], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

La integración de OpenStack Controller está diseñada para recopilar información de todos los nodos de computación y de los servidores que lo ejecutan. La integración debe ejecutarse desde un único Agent para monitorizar tu entorno de OpenStack, y puede desplegarse en tu nodo controlador o en un servidor adyacente que tenga acceso a los endpoints de Keystone, Nova, Neutron, Cinder, Ironic y Octavia.

#### Preparar OpenStack

Cree un usuario `datadog` que se utilizará en tu archivo `openstack_controller.d/conf.yaml`. Este usuario requiere permisos de administrador de solo lectura en tu entorno para que pueda ejecutarse desde un único nodo y leer información muy importante del sistema sobre todos los nodos y servidores.

#### Configuración del Agent

1. Edita el archivo `openstack_controller.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar los datos de rendimiento de tu OpenStack Controller. Consulta el [openstack_controller.d/conf.yaml de ejemplo][4] para todas las opciones disponibles de configuración:

   ```yaml
   init_config:

   instances:
     - keystone_server_url: "<AUTH_URL>"
       password: "<PASSWORD>"
       username: "<USER_NAME>"
       domain_id: "<DOMAIN_ID>"
   ```

2. [Reiniciar el Agent][5]

**Nota**: Si estás actualizando la integración a la versión 6.0.0 o posterior desde la versión 5.0.0 o anterior, deberás activar la opción `use_legacy_check_version` para poder utilizar las nuevas funciones. También es posible que tengas que hacer cambios en tu configuración para mantener la compatibilidad. Consulta el [openstack controller.d/conf.yaml de ejemplo][4] para obtener más detalles.  

##### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent, puedes activarla en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `openstack_controller.d/conf.yaml` para empezar a recopilar tus logs de Openstack:

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    Cambia el valor de los parámetros `path` y configúralos para tu entorno. Consulta el [openstack_controller.d/conf.yaml de ejemplo][4] para todas las opciones disponibles de configuración.


### Validación

[Ejecuta el subcomando `status` del Agent][6] y busca `openstack_controller` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "openstack_controller" >}}


### Eventos

OpenStack Controller no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "openstack_controller" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar tus componentes de OpenStack con Datadog][10]


[1]: https://docs.datadoghq.com/es/integrations/openstack/
[2]: https://www.openstack.org
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/
[10]: https://www.datadoghq.com/blog/openstack-controller-integration/