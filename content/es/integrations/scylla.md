---
app_id: scylla
app_uuid: 1d655820-3010-4ae3-8273-a3798321d4d4
assets:
  dashboards:
    Scylla Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: scylla.node.operation_mode
      metadata_path: metadata.csv
      prefix: scylla.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10087
    source_type_name: Scylla
  monitors:
    Node State is abnormal: assets/monitors/instance_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/scylla/README.md
display_on_public_website: true
draft: false
git_integration_title: scylla
integration_id: scylla
integration_title: Scylla
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: scylla
public_title: Scylla
short_description: Realiza un seguimiento de los recursos de clúster, las latencias,
  el estado y mucho más.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Realiza un seguimiento de los recursos de clúster, las latencias, el
    estado y mucho más.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Scylla
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

Esta integración [Scylla][1] Datadog recopila por defecto la mayoría de las métricas expuestas, con la posibilidad de personalizar grupos adicionales en función de las necesidades específicas del usuario.

Scylla es un almacén de datos NoSQL de código abierto que puede actuar como "una alternativa drop-in a Apache Cassandra". Scylla rediseñó el modelo Cassandra para adaptarlo al hardware moderno, reduciendo el tamaño de los clústeres y mejorando el rendimiento teórico.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host.

### Instalación

El check de Scylla está incluido en el paquete del [Datadog Agent][2]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `scylla.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu Scylla. Para conocer todas las opciones de configuración disponibles, consulta el [legacy de ejemplo][4].

2. [Reinicia el Agent][5].

##### Recopilación de logs

Scylla tiene diferentes modos de salida de los logs dependiendo del entorno en el que se está ejecutando. Para ver más detalles sobre cómo la aplicación genera logs, consulta la [documentación de Scylla][6].

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

      ```yaml
       logs_enabled: true
     ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `scylla.d/conf.yaml`. Cambia los valores de los parámetros `type`, `path` y `service` en función de tu entorno. Consulta el [scylla.d/conf.yaml de ejemplo][3] para conocer todas las opciones de configuración disponibles.

      ```yaml
       logs:
         - type: file
           path: <LOG_FILE_PATH>
           source: scylla
           service: <SERVICE_NAME>
           #To handle multi line that starts with yyyy-mm-dd use the following pattern
           #log_processing_rules:
           #  - type: multi_line
           #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #    name: new_log_start_with_date
     ```

3. [Reinicia el Agent][5].

Para habilitar logs para entornos Kubernetes, consulta [Recopilación de logs de Kubernetes][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca`scylla` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "scylla" >}}


### Eventos

El check de Scylla no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "scylla" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].


[1]: https://scylladb.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/scylla/datadog_checks/scylla/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/7.50.x/scylla/datadog_checks/scylla/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.scylladb.com/getting-started/logging/
[7]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/scylla/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/scylla/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/