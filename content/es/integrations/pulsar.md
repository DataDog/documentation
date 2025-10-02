---
app_id: pulsar
app_uuid: 2a3a1555-3c19-42a9-b954-ce16c4aa6308
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: pulsar.active_connections
      metadata_path: metadata.csv
      prefix: pulsar.
    process_signatures:
    - java org.apache.pulsar.PulsarStandaloneStarter
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10143
    source_type_name: pulsar
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- colas de mensajes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pulsar/README.md
display_on_public_website: true
draft: false
git_integration_title: pulsar
integration_id: pulsar
integration_title: Pulsar
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: pulsar
public_title: Pulsar
short_description: Monitoriza tus clústeres Pulsar.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Colas de mensajes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza tus clústeres Pulsar.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Pulsar
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Pulsar][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Pulsar está incluido en el paquete del [Datadog Agent ][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `pulsar.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu Pulsar. Para conocer todas las opciones de configuración disponibles, consulta el [pulsar.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `pulsar` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "pulsar" >}}



### Recopilación de logs

1. La integración de logs de Pulsar admite el [formato de logs por defecto][8] de Pulsar. Clona y edita el [pipeline de la integración][9] si tienes un formato diferente.

2. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:
   ```yaml
   logs_enabled: true
   ```

3. Deselecciona y edita el bloque de configuración de logs en tu archivo `pulsar.d/conf.yaml`. Cambia el valor de los parámetros de ruta según tu entorno. Consulta el [pulsar.d/conf.yaml de ejemplol][4] para ver todas las opciones de configuración disponibles.
   ```yaml
    logs:
      - type: file
        path: /pulsar/logs/pulsar.log
        source: pulsar
   ```
4. [Reiniciar el Agent][5]

### Eventos

La integración Pulsar no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "pulsar" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://pulsar.apache.org
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/pulsar/datadog_checks/pulsar/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/pulsar/metadata.csv
[8]: https://pulsar.apache.org/docs/en/reference-configuration/#log4j
[9]: https://docs.datadoghq.com/es/logs/processing/#integration-pipelines
[10]: https://github.com/DataDog/integrations-core/blob/master/pulsar/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/