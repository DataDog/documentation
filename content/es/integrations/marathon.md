---
app_id: marathon
app_uuid: fe9a038e-3948-4646-9a1c-ea1f1cc59977
assets:
  dashboards:
    marathon-overview: assets/dashboards/marathon-overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: marathon.apps
      metadata_path: metadata.csv
      prefix: marathon.
    process_signatures:
    - start --master mesos marathon
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: !!int 82
    source_type_name: Marathon
  saved_views:
    marathon_processes: assets/saved_views/marathon_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- containers
- log collection
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/marathon/README.md
display_on_public_website: true
draft: false
git_integration_title: marathon
integration_id: marathon
integration_title: Marathon
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: marathon
public_title: Marathon
short_description: "Rastrea las métricas de las aplicaciones: memoria y disco necesarios, recuento de instancias y mucho más."
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Configuración y despliegue
  - Category::Contenedores
  - Category::Recopilación de logs
  - Offering::Integración
  configuration: README.md#Configuración
  description: "Rastrea las métricas de las aplicaciones: memoria y disco necesarios, recuento de instancias y mucho más."
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Marathon
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

El check de Marathon del Agent te permite hacer lo siguiente:

- rastrear el estado de cada aplicación: consulta la configuración de la memoria, el disco, la CPU y las instancias; monitorizar el número de tareas en buen estado y en mal estado;
- monitorizar el número de aplicaciones puestas en cola y el número de despliegues.

## Configuración

### Instalación

El check de Marathon está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [Contenedores](#containerized).

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host, haz lo siguiente:

##### Recopilación de métricas

1. Edita el archivo `marathon.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1]. Consulta el [archivo de ejemplo marathon.d/conf.yaml][2] para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
     # the API endpoint of your Marathon master; required
     - url: "https://<SERVER>:<PORT>"
       # if your Marathon master requires ACS auth
       #   acs_url: https://<SERVER>:<PORT>

       # the username for Marathon API or ACS token authentication
       username: "<USERNAME>"

       # the password for Marathon API or ACS token authentication
       password: "<PASSWORD>"
   ```

   La función de `username` y `password` depende de si configuras la `acs_url` o no. Si lo haces, el Agent los utiliza para solicitar un token de autenticación a ACS, que luego utiliza para autenticarse en la API de Marathon. De lo contrario, el Agent utiliza `username` y `password` para autenticarse directamente en la API de Marathon.

2. [Reinicia el Agent][3].

##### Recopilación de logs

_Disponible para las versiones del Agent a partir de la 6.0_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; habilítala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Dado que Marathon utiliza logback, puedes especificar un formato de logs personalizado. Con Datadog, se admiten dos formatos: el predeterminado que proporciona Marathon y el formato recomendado de Datadog. Añade un apéndice de archivo a tu configuración como en el siguiente ejemplo y reemplaza `$PATTERN$` por el formato que hayas seleccionado:

   - Configuración predeterminada de Marathon: `[%date] %-5level %message \(%logger:%thread\)%n`
   - Configuración recomendada de Datadog: `%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n`

   ```xml
     <?xml version="1.0" encoding="UTF-8"?>

     <configuration>
         <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>
         <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
             <encoder>
                 <pattern>[%date] %-5level %message \(%logger:%thread\)%n</pattern>
             </encoder>
         </appender>
         <appender name="async" class="ch.qos.logback.classic.AsyncAppender">
             <appender-ref ref="stdout" />
             <queueSize>1024</queueSize>
         </appender>
         <appender name="FILE" class="ch.qos.logback.core.FileAppender">
             <file>/var/log/marathon.log</file>
             <append>true</append>
             <!-- set immediateFlush to false for much higher logging throughput -->
             <immediateFlush>true</immediateFlush>
             <encoder>
                 <pattern>$PATTERN$</pattern>
             </encoder>
         </appender>
         <root level="INFO">
             <appender-ref ref="async"/>
             <appender-ref ref="FILE"/>
         </root>
     </configuration>
   ```

3. Añade este bloque de configuración a tu archivo `marathon.d/conf.yaml` para empezar a recopilar logs de Marathon:

   ```yaml
   logs:
     - type: file
       path: /var/log/marathon.log
       source: marathon
       service: "<SERVICE_NAME>"
   ```

4. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/marathon/datadog_checks/marathon/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican abajo.

##### Recopilación de métricas

| Parámetro            | Valor                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `marathon`                             |
| `<INIT_CONFIG>`      | en blanco o `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:%%port%%"}` |

##### Recopilación de logs

_Disponible para las versiones del Agent a partir de la 6.0_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "marathon", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][2] y busca `marathon` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "marathon" >}}


### Eventos

El check de Marathon no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "marathon" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
