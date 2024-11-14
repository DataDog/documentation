---
app_id: contenedor
app_uuid: ac3cc203-5b28-457d-8737-bbe32fa7c3b9
assets:
  dashboards:
    Containers: assets/dashboards/containers.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: container.uptime
      metadata_path: metadata.csv
      prefix: contenedor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10242
    source_type_name: Contenedor
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
- Kubernetes
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/container/README.md
display_on_public_website: true
draft: false
git_integration_title: contenedor
integration_id: contenedor
integration_title: Contenedor
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: contenedor
public_title: Contenedor
short_description: Seguimiento de tus métricas de contenedor con Datadog
supported_os:
- Linux
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Seguimiento de tus métricas de contenedor con Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Contenedor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check informa de un conjunto de métricas de cualquier contenedor en ejecución, independientemente del tiempo de ejecución utilizado para iniciarlos.

**NOTA**: El check `container` es diferente del check `containerd`. Los checks `container` informan de métricas estandarizadas de todos los contenedores que se encuentran en el sistema, independientemente del tiempo de ejecución de los contenedores.
El check `containerd` es exclusivo del tiempo de ejecución del check `containerd` y publica métricas en el espacio de nombres de `containerd.*`.

## Configuración

### Instalación

El check de contenedor es un check central del Datadog Agent y se activa automáticamente si se detecta cualquier tiempo de ejecución de contenedor compatible.
Dependiendo de tu entorno, puede que sea necesario configurar el acceso a los tiempos de ejecución de contenedores compatibles (Docker, containerd).

#### Instalación en contenedores

El check `container` requiere que se instalen algunas carpetas para permitir la activación automática. Esto es controlado por el Helm Chart oficial, el Datadog Operator y como configuraciones documentadas para Kubernetes, Docker, ECS y ECS Fargate.

### Configuración

El check `container` no expone ningún parámetro de configuración específico. Para personalizar campos comunes o forzar la activación del check `container`, sigue estos pasos:

1. Crea el archivo `container.d/conf.yaml` en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent.

2. [Reinicia el Agent][1].

El check `container` puede recopilar métricas de CPU, memoria, red y E/S en discos.
Algunas métricas pueden no estar disponibles dependiendo de tu entorno (Linux/Windows, por ejemplo).

### Validación

[Ejecuta el subcomando `status` del Agent][1] y busca `container` en la sección **Checks**.

## Datos recopilados

### Métricas

Para ver la lista de métricas proporcionadas por esta integración, consulta [metadata.csv][2].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv
[3]: https://docs.datadoghq.com/es/help/