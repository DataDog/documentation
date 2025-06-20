---
app_id: boundary
app_uuid: 61898266-9c80-442d-89d3-22e7aeeafb94
assets:
  dashboards:
    Boundary Overview: assets/dashboards/boundary_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: boundary.worker.proxy.websocket.active_connections
      metadata_path: metadata.csv
      prefix: boundary.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10280
    source_type_name: Boundary
  monitors:
    Number of active connections is too high: assets/monitors/active_connections.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- Configuración e implementación
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/boundary/README.md
display_on_public_website: true
draft: false
git_integration_title: boundary
integration_id: boundary
integration_title: Boundary
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: boundary
public_title: Boundary
short_description: Monitorización de controladores y trabajadores de Boundary.
supported_os:
- linux
- Windows
- MacOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Instalación
  description: Monitorización de controladores y trabajadores de Boundary.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Boundary
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Boundary][1] a través del Datadog Agent. La versión mínima compatible de Boundary es `0.8.0`.

## Configuración

Sigue las instrucciones que figuran a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos contenedorizados, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Boundary está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Escucha

Debe configurarse un escucha con un objetivo `ops` en el archivo `config.hcl` para habilitar la recopilación de métricas. El siguiente es un ejemplo de estrofa de escucha:

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "postgresql://<username>:<password>@10.0.0.1:5432/<database_name>"
  }
}

listener "tcp" {
  purpose = "api"
  tls_disable = true
}

listener "tcp" {
  purpose = "ops"
  tls_disable = true
}
```

El bloque `boundary.controller.health` [check de servicio](#service-checks) se presenta como `WARNING` cuando el controlador se está apagando. Para habilitar este periodo de gracia de apagado, actualiza el bloque `controller` con una duración de espera definida:

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "env://BOUNDARY_PG_URL"
  }
  graceful_shutdown_wait_duration = "10s"
}
```

#### Datadog Agent

1. Edita el archivo `boundary.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de boundary. Consulta el [ejemplo de boundary.d/conf.yaml][4] para conocer todas las opciones disponibles de configuración.

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `boundary` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "boundary" >}}


### Eventos

La integración de Boundary no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "boundary" >}}


### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Para empezar a recopilar tus logs de Boundary, añade este bloque de configuración a tu archivo `boundary.d/conf.yaml`:

    ```yaml
    logs:
       - type: file
         source: boundary
         path: /var/log/boundary/events.ndjson
    ```

   Cambia el valor del parámetro `path` en función de tu entorno. Consulta el [archivo de ejemplo `boundary.d/conf.yaml`][4] para ver todas las opciones disponibles de configuración.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://www.boundaryproject.io
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/boundary/datadog_checks/boundary/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/boundary/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/boundary/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/