---
app_id: scaphandre
app_uuid: 0aa80baa-7ba6-4264-97ae-5475a6f796dc
assets:
  dashboards:
    scaphandre_overview: assets/dashboards/scaphandre_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - scaphandre.host.cpu.frequency
      metadata_path: metadata.csv
      prefix: scaphandre.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15882148
    source_type_name: Scaphandre
  logs: {}
author:
  homepage: https://github.com/hubblo-org/scaphandre
  name: Sarah
  sales_email: sarah.witt@datadoghq.com
  support_email: sarah.witt@datadoghq.com
categories:
- sistema operativo y sistema
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/scaphandre/README.md
display_on_public_website: true
draft: false
git_integration_title: scaphandre
integration_id: scaphandre
integration_title: Scaphandre
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: scaphandre
public_title: Scaphandre
short_description: Monitorización del Agent que mide el consumo de energía de las
  máquinas bare metal
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Category::OS & System
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorización del Agent que mide el consumo de energía de las máquinas
    bare metal
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Scaphandre
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Scaphandre][1], un Agent de monitorización que utiliza RAPL y MsrRAPL a través de powercap para medir el uso de energía de máquinas bare metal. El objetivo del proyecto es permitir a cualquier empresa o particular medir el consumo de energía de sus servicios de tecnología y obtener estos datos de forma conveniente, enviándolos a través de cualquier cadena de herramientas de monitorización o análisis de datos.

## Configuración

### Instalación

Para instalar el check de Scaphandre en tu host:


1. Instala el [kit de herramientas para desarrolladores][2] en cualquier máquina. El kit de herramientas para desarrolladores específico que debes instalar depende de tu plataforma y arquitectura.

2. Ejecuta el siguiente comando para crear el paquete:
    ```
    ddev release build scaphandre
    ```

3. [Descarga el Datadog Agent][3].

4. Sube el artefacto de compilación a cualquier host con un Agent y ejecuta el siguiente comando:
    ```
    datadog-agent integration install -w path/to/scaphandre/dist/<ARTIFACT_NAME>.whl
    ```

### Configuración

Edita el archivo `scaphandre.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][4]. Ve el [scaphandre.d/conf.yaml de ejemplo][5] para conocer todas las opciones disponibles de configuración. Por ejemplo, para asegurar las etiquetas de la línea de comandos de Scaphandre y evitar que datos confidenciales sean ingresados a Datadog, utiliza la opción de configuración `exclude_labels`.

[Reinicia el Agent][6] para empezar a enviar métricas de Scaphandre a Datadog.

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `scaphandre` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "scaphandre" >}}


### Checks de servicio

Scaphandre no incluye ningún check de servicio.

### Eventos

Scaphandre no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://github.com/hubblo-org/scaphandre
[2]: https://docs.datadoghq.com/es/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/scaphandre/datadog_checks/scaphandre/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/scaphandre/metadata.csv
[9]: https://docs.datadoghq.com/es/help/