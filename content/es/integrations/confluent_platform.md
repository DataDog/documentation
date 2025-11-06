---
app_id: confluent-platform
app_uuid: 14e9ea66-bd7c-4c84-b642-a0290166deb4
assets:
  dashboards:
    Confluent Platform Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: confluent.kafka.producer.outgoing_byte_rate
      metadata_path: metadata.csv
      prefix: confluent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10091
    source_type_name: Confluent Platform
  monitors:
    Topic partition is not used: assets/monitors/unused_partition.json
    Unclean leader election detected: assets/monitors/unclean_leader_election.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/confluent_platform/README.md
display_on_public_website: true
draft: false
git_integration_title: confluent_platform
integration_id: confluent-platform
integration_title: Confluent Platform
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: confluent_platform
public_title: Confluent Platform
short_description: Monitoriza los componentes de Confluent Platform.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Product::Data Streams Monitoring
  configuration: README.md#Configuración
  description: Monitoriza los componentes de Confluent Platform.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Confluent Platform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza Confluent Platform y los componentes Kafka a través del Datadog Agent.

Este integración recopila métricas JMX para los siguientes componentes:

- Broker
- Conectar
- Replicador
- Registro de esquemas
- Servidor ksqlDB
- Flujos (streams)
- Proxy REST

Considera [Data Streams Monitoring][1] para mejorar tu integración de Confluent Platform. Esta solución permite la visualización de los flujos y el seguimiento de los retrasos, ayudándote a identificar y resolver los cuellos de botella.

## Configuración


### Instalación

El check de Confluent Platform está incluido en el paquete del [Datadog Agent][2]. No se necesita ninguna instalación adicional en el servidor de componentes de Confluent Platform.

**Nota**: Este check recopila métricas con JMX. Se requiere una JVM en cada nodo para que el Agent pueda ejecutar [jmxfetch][3]. Se recomienda utilizar una JVM proporcionada por Oracle.


### Configuración

1. Edita el archivo `confluent_platform.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para recopilar los datos de rendimiento de tu Confluent Platform. Para conocer todas las opciones de configuración disponibles, consulta el [confluent_platform.d/conf.yaml de ejemplo][4].

    Para cada componente, debes crear una instancia independiente para recopilar sus métricas JMX. La lista de métricas por defecto recopiladas se enumeran en el [archivo `metrics.yaml`][5], por ejemplo:

    ```yaml
    instances:
     - host: localhost
       port: 8686
       name: broker_instance
       user: username
       password: password
     - host: localhost
       port: 8687
       name: schema_registry_instance
     - host: localhost
       port: 8688
       name: rest_proxy_instance
    ```

2. [Reinicia el Agent][6].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `confluent_platform.d/conf.yaml` para empezar a recopilar logs de componentes de Confluent Platform:

   ```yaml
     logs:
       - type: file
         path: <CONFLUENT_COMPONENT_PATH>/logs/*.log
         source: confluent_platform
         service: <SERVICE_NAME>
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

    Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [confluent_platform.d/conf.yaml de ejemplo][4] para ver todas las opciones disponibles de configuración.

3. [Reinicia el Agent][7].

##### Recopilación de métricas

Para obtener información sobre los entornos en contenedores, consulta la guía [Autodiscovery con JMX][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `confluent_platform` en la sección **JMXFetch**.

```
    ========
    JMXFetch
    ========

      Initialized checks
      ==================
        confluent_platform
          instance_name : confluent_platform-localhost-31006
          message :
          metric_count : 26
          service_check_count : 0
          status : OK
```

## Datos recopilados

### Métricas
{{< get-metrics-from-git "confluent_platform" >}}


### Eventos

El check de Confluent Platform no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "confluent_platform" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].


[1]: https://docs.datadoghq.com/es/data_streams/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/jmxfetch
[4]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/metadata.csv
[8]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/