---
app_id: cyral
app_uuid: da6e2ea6-1611-4d37-9cc6-efce73bc4f31
assets:
  dashboards:
    Cyral Overview: assets/dashboards/cyral_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cyral.analysis_time
      metadata_path: metadata.csv
      prefix: cyral.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10115
    source_type_name: Cyral
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cyral
  sales_email: product@cyral.com
  support_email: product@cyral.com
categories:
- almacenes de datos
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cyral/README.md
display_on_public_website: true
draft: false
git_integration_title: cyral
integration_id: cyral
integration_title: Cyral
integration_version: 0.0.1
is_public: true
manifest_version: 2.0.0
name: cyral
public_title: Cyral
short_description: Recopila métricas de tiempo de ejecución de una instancia de Cyral
  que monitoriza MySQL.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Security
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Configuración
  description: Recopila métricas de tiempo de ejecución de una instancia de Cyral
    que monitoriza MySQL.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cyral
---

<!--  FUENTE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza un sidecar de MySQL para [Cyral][1] a través del Datadog Agent.

## Configuración

El check de Cyral no está incluido en el paquete del [Datadog Agent][2], por lo que debes instalarlo.

### Instalación

En el caso de las versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check de Cyral en tu host. Para instalarlo con el Docker Agent o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-cyral==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `cyral.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de Cyral. Para conocer todas las opciones de configuración disponibles, consulta el [cyral.d/conf.yaml de ejemplo][5].

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_url: http://localhost:9018/metrics
    ```

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `cyral` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cyral" >}}


### Checks de servicio

Cyral no incluye checks de servicio.

### Eventos

Cyral no incluye eventos.

## Solucionar problemas

### No se puede conectar el Agent

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Comprueba que la `url` en `cyral.yaml` sea correcta.

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://cyral.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cyral/metadata.csv
[9]: https://docs.datadoghq.com/es/help/