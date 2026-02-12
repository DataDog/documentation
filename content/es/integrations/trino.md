---
app_id: trino
app_uuid: 5d6fa7f8-e827-408c-9cf1-8f2bd64b45d3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: trino.memory.reserved_distributed_bytes
      metadata_path: metadata.csv
      prefix: trino.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10282
    source_type_name: Trino
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/trino/README.md
display_on_public_website: true
draft: false
git_integration_title: trino
integration_id: trino
integration_title: Trino
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: trino
public_title: Trino
short_description: Recopilar estadísticas de rendimiento y uso de clústeres Trino
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Configuración
  description: Recopilar estadísticas de rendimiento y uso de clústeres Trino
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Trino
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check recopila métricas [Trino][1], como las siguientes:

- Métricas de actividad global: consultas completadas/fallidas, tamaño de la entrada/salida de datos, tiempo de ejecución.
- Métricas de rendimiento: memoria de clúster, CPU de entrada, tiempo de ejecución de CPU.

## Configuración

### Instalación

Para el Agent v7.33.0 o posteriores, sigue las instrucciones a continuación para instalar el check Trino en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-trino==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración

1. Edita el archivo `trino.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Trino.
   Para conocer todas las opciones de configuración disponibles, consulta el [trino.d/conf.yaml de ejemplo][4].

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica al ejecutar el [comando de estado][5] del Datadog Agent.
   Puedes especificar las métricas que te interesan editando la [configuración][4]..
   Para saber cómo personalizar la recopilación de métricas, consulta los [checks JMX][6].
   Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog][7].

2. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando `status` del Agent][5] y busca Trino en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "trino" >}}


### Eventos

La integración Trino no incluye eventos.

### Checks de servicio

La integración Trino no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].


[1]: https://trino.io/
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations
[3]: https://docs.datadoghq.com/es/getting_started/integrations/
[4]: https://github.com/DataDog/integrations-extras/blob/master/trino/datadog_checks/trino/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/integrations/java/
[7]: https://docs.datadoghq.com/es/help/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-extras/blob/master/trino/metadata.csv