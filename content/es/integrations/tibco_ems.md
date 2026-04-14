---
app_id: tibco-ems
app_uuid: 32445b00-582f-4e56-9c4d-87944d5c347b
assets:
  dashboards:
    Tibco EMS Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tibco_ems.server.uptime
      metadata_path: metadata.csv
      prefix: tibco_ems.
    process_signatures:
    - tibemsd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19354115
    source_type_name: tibco_ems
  monitors:
    Tibco EMS server uptime: assets/monitors/server_uptime.json
  saved_views:
    Tibco EMS Error Logs Overview: assets/saved_views/error_logs_overview.json
    Tibco EMS Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- recopilación de logs
- colas de mensajes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tibco_ems/README.md
display_on_public_website: true
draft: false
git_integration_title: tibco_ems
integration_id: tibco-ems
integration_title: Tibco EMS
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: tibco_ems
public_title: Tibco EMS
short_description: Realiza un seguimiento del tamaño de las colas, del recuento de
  consumidores, de mensajes no reconocidos, etc.
supported_os:
- Linux
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  - Categoría::Métricas
  - Categoría::Recopilación de logs
  - Categoría::Colas de mensajes
  configuration: README.md#Configuración
  description: Realiza un seguimiento del tamaño de las colas, del recuento de consumidores,
    de mensajes no reconocidos, etc.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Tibco EMS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [TIBCO Enterprise Message servicio][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones de abajo para instalar y configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de TIBCO EMS está incluido en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `tibco_ems.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de TIBCO EMS. Consulta el [tibco_ems.d/conf.yaml de ejemplo][4] para ver todas las opciones de configuración disponibles.

2. [Reinicia el Agent][5].

#### Recopilación de métricas

##### Crear tu script de comandos Tibco EMS

La integración Tibco EMS utiliza la herramienta de la CLI `tibemsadmin` proporcionada por Tibco EMS. Para reducir el número de llamadas a la cola `$sys.admin`, Datadog utiliza un script para organizar por lotes las consultas realizadas a Tibco. Para recopilar métricas de Tibco EMS, pasa la ruta del script y la ruta absoluta del binario `tibemsadmin` a la configuración de la integración.

*Nota*: El usuario `dd-agent` necesita permisos de ejecución en el binario `tibemsadmin`.
1. Crea un archivo llamado `show_commands` con el siguiente contenido:
```text
    show connections full
    show durables
    show queues
    show server
    show stat consumers
    show stat producers
    show topics
```


2. Añade este bloque de configuración a tu archivo `tibco_ems.d/conf.yaml` para empezar a recopilar [métricas de Tibco EMS](#metrics):

```yaml
init_config:
instances:
    ## @param script_path - string - optional
    ## The path to the script that will be executed to collect metrics. Since the script is executed by a subprocess,
    ## we need to know the path to the script. This must be the absolute path to the script.
    #
    script_path: <SCRIPT_PATH>

    ## @param tibemsadmin - string - optional
    ## The command or path to tibemsadmin (for example /usr/bin/tibemsadmin or docker exec <container> tibemsadmin)
    ## , which can be overwritten on an instance.
    ##
    ## This overrides `tibemsadmin` defined in `init_config`.
    #
    tibemsadmin: <TIBEMSADMIN>
```

3. [Reinicia el Agent][5] para empezar a enviar métricas de Tibco EMS a Datadog.

#### Recopilación de logs

Disponible para el Agent v6.0 o posterior

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Habilita logs en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `tibco_ems.d/conf.yaml` para empezar a recopilar logs de Tibco EMS:

   ```yaml
   logs:
     - type: file
       path: <PATH_TO_LOG_FILE>
       service: <MY_SERVICE>
       source: tibco_ems
   ```

    Cambia los valores de los parámetros `service` y `path` y configúralos para tu entorno. Consulta el [tibco_ems.yaml de ejemplo][4] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `tibco_ems` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "tibco_ems" >}}


### Eventos

La integración TIBCO EMS no incluye eventos.

### Checks de servicios

La integración TIBCO EMS no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://docs.tibco.com/products/tibco-enterprise-message-service
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/tibco_ems/datadog_checks/tibco_ems/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/tibco_ems/metadata.csv
[8]: https://docs.datadoghq.com/es/help/