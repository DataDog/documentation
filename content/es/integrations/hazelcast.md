---
app_id: hazelcast
app_uuid: 00434289-3c74-4c25-8841-9e0c826510c2
assets:
  dashboards:
    Hazelcast Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - hazelcast.mc.license_expiration_time
      - hazelcast.instance.running
      metadata_path: metadata.csv
      prefix: hazelcast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10095
    source_type_name: Hazelcast
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- almacenamiento en caché
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hazelcast/README.md
display_on_public_website: true
draft: false
git_integration_title: hazelcast
integration_id: hazelcast
integration_title: Hazelcast
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: hazelcast
public_title: Hazelcast
short_description: Monitoriza los miembros de Hazelcast y el Centro de Gestión.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Almacenes de datos
  - Categoría::Almacenamiento en caché
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza los miembros de Hazelcast y el Centro de Gestión.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Hazelcast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Hazelcast][1] v4.0 o posterior.

## Configuración

### Instalación

El check de Hazelcast está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `hazelcast.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Hazelcast.
   Para conocer todas las opciones de configuración disponibles, consulta el [hazelcast.d/conf.yam de ejemplo][1].

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado][2].
   Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para saber cómo personalizar las métricas a recopilar, consulta la [documentación de checks de JMX][3] para obtener instrucciones más detalladas.
   Si necesitas monitorizar más métricas ponte en contacto con el [soporte de Datadog][4].

2. [Reinicia el Agent][5].

##### Recopilación de logs

1. Hazelcast admite muchos [adaptadores de generación de logs][6] diferentes. El siguiente es un ejemplo de archivo `log4j2.properties`:

   ```text
   rootLogger=file
   rootLogger.level=info
   property.filepath=/path/to/log/files
   property.filename=hazelcast

   appender.file.type=RollingFile
   appender.file.name=RollingFile
   appender.file.fileName=${filepath}/${filename}.log
   appender.file.filePattern=${filepath}/${filename}-%d{yyyy-MM-dd}-%i.log.gz
   appender.file.layout.type=PatternLayout
   appender.file.layout.pattern = %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   appender.file.policies.type=Policies
   appender.file.policies.time.type=TimeBasedTriggeringPolicy
   appender.file.policies.time.interval=1
   appender.file.policies.time.modulate=true
   appender.file.policies.size.type=SizeBasedTriggeringPolicy
   appender.file.policies.size.size=50MB
   appender.file.strategy.type=DefaultRolloverStrategy
   appender.file.strategy.max=100

   rootLogger.appenderRefs=file
   rootLogger.appenderRef.file.ref=RollingFile

   #Hazelcast specific logs.

   #log4j.logger.com.hazelcast=debug

   #log4j.logger.com.hazelcast.cluster=debug
   #log4j.logger.com.hazelcast.partition=debug
   #log4j.logger.com.hazelcast.partition.InternalPartitionService=debug
   #log4j.logger.com.hazelcast.nio=debug
   #log4j.logger.com.hazelcast.hibernate=debug
   ```

2. Por defecto, el pipeline de integración de Datadog admite el siguiente [patrón][7] de conversión:

   ```text
   %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   ```

   Clona y edita el [pipeline de la integración][8] si tienes un formato diferente.

3. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

4. Añade el siguiente bloque de configuración a tu archivo `hazelcast.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [hazelcast.d/conf.yaml de ejemplo][1] para ver todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/hazelcast.log
       source: hazelcast
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [Reinicia el Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/integrations/java/
[4]: https://docs.datadoghq.com/es/help/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.hazelcast.org/docs/latest/manual/html-single/index.html#logging-configuration
[7]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[8]: https://docs.datadoghq.com/es/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

##### Recopilación de métricas

Para obtener información sobre entornos en contenedores, consulta la guía [Autodiscovery con JMX][1].

##### Recopilación de logs

La recopilación de Logs se encuentra deshabilitada por defecto en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Docker][2].

| Parámetro      | Valor                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hazelcast", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/es/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `hazelcast` en la sección **JMXFetch**:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hazelcast
      instance_name : hazelcast-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hazelcast" >}}


### Checks de servicio
{{< get-service-checks-from-git "hazelcast" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].



[1]: https://hazelcast.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/