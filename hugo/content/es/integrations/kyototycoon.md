---
app_id: kyoto-tycoon
app_uuid: 5cc7578e-8f8e-43c3-890a-4360581634e7
assets:
  dashboards:
    kyototycoon: assets/dashboards/kyototycoon_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kyototycoon.records
      metadata_path: metadata.csv
      prefix: kyototycoon.
    process_signatures:
    - ktserver
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: !!int 62
    source_type_name: Kyoto Tycoon
  saved_views:
    kyoto-tycoon_processes: assets/saved_views/kyoto-tycoon_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kyototycoon/README.md
display_on_public_website: true
draft: false
git_integration_title: kyototycoon
integration_id: kyoto-tycoon
integration_title: Kyoto Tycoon
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: kyototycoon
public_title: Kyoto Tycoon
short_description: Realiza un seguimiento de las operaciones get, set, delete y monitoriza los retrasos de replicación.
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
  - Category::Almacenes de datos
  - Category::Recopilación de logs
  - Offering::Integración
  configuration: README.md#Configuración
  description: Realiza un seguimiento de las operaciones get, set, delete y monitoriza los retrasos de replicación.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Kyoto Tycoon
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

El check de Kyoto Tycoon del Agent check realiza un seguimiento de las operaciones get, set, delete y te permite monitorizar los retrasos de replicación.

## Configuración

### Instalación

El check de Kyoto Tycoon está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores de KyotoTycoon.

### Configuración

1. Edita el archivo `kyototycoon.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][2]. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo kyototycoon.d/conf.yaml][3]:

   ```yaml
   init_config:

   instances:
     ## @param report_url - string - required
     ## The report URL should be a URL to the Kyoto Tycoon "report" RPC endpoint.
     #
     - report_url: http://localhost:1978/rpc/report
   ```

2. [Reinicia el Agent][4].

##### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; habilítala en el archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `kyototycoon.d/conf.yaml` para empezar a recopilar logs de Kyoto Tycoon:

    ```yaml
    logs:
      - type: file
        path: /var/data/ktserver.log
        source: kyototycoon
    ```

   Cambia el valor del parámetro `path` en función de tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo kyototycoon.d/conf.yaml][3].

3. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `kyototycoon` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kyoto-tycoon" >}}


### Eventos

El check de Kyoto Tycoon no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "kyoto-tycoon" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/assets/service_checks.json
[8]: https://docs.datadoghq.com/help/

