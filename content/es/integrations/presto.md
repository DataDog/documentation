---
app_id: presto
app_uuid: b725cadc-d041-4199-8b86-c714ee9a318f
assets:
  dashboards:
    Presto Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: presto.failure_detector.active_count
      metadata_path: metadata.csv
      prefix: presto.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10057
    source_type_name: Presto
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    error_patterns: assets/saved_views/error_patterns.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/presto/README.md
display_on_public_website: true
draft: false
git_integration_title: presto
integration_id: presto
integration_title: Presto
integration_version: 3.1.0
is_public: true
manifest_version: 2.0.0
name: presto
public_title: Presto
short_description: Recopila estadísticas de uso y rendimiento de clústeres PrestoSQL
  y mucho más.
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
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila estadísticas de uso y rendimiento de clústeres PrestoSQL y
    mucho más.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Presto
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check recopila métricas de [Presto][1], por ejemplo:

- Métricas de actividad general: consultas completadas/fallidas, tamaño de entrada/salida de datos, tiempo de ejecución.
- Métricas de rendimiento: memoria de clúster, CPU de entrada, tiempo de CPU de ejecución.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Presto está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor. Instala el Agent en cada nodo de coordinador y worker del que quieras recopilar métricas de uso y rendimiento.

### Configuración

1. Edita el archivo `presto.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Presto. Consulta el [presto.d/conf.yaml de ejemplo][4] para ver todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado][5]. Puedes especificar las métricas que te interesen editando la configuración a continuación. Para saber cómo personalizar las métricas recopiladas, consulta la [documentación de checks de JMX][6] para obtener instrucciones más detalladas. Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog][7].

2. [Reinicia el Agent][8].

#### Recopilación de métricas

Utiliza la configuración predeterminada en tu archivo `presto.d/conf.yaml` para habilitar la recopilación de tus métricas de Presto. Consulta el [presto.d/conf.yaml][4] de ejemplo para ver todas las opciones de configuración disponibles.

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `presto.d/conf.yaml` para empezar a recopilar logs de Presto:

   ```yaml
   logs:
     - type: file
       path: /var/log/presto/*.log
       source: presto
       service: "<SERVICE_NAME>"
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [presto.d/conf.yaml de ejemplo][4] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][8].

### Validación

Ejecuta el [subcomando de estado del Agent][5] y busca `presto` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "presto" >}}


### Eventos

Presto no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "presto" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].


[1]: https://docs.datadoghq.com/es/integrations/presto/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/integrations/java/
[7]: https://docs.datadoghq.com/es/help/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-core/blob/master/presto/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/presto/assets/service_checks.json