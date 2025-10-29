---
app_id: riak-cs
app_uuid: 29e6a2b4-7f3a-4243-8e10-d065147c3da0
assets:
  dashboards:
    riakcs: assets/dashboards/riakcs_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: riakcs.bucket_list_pool.workers
      metadata_path: metadata.csv
      prefix: riakcs
    process_signatures:
    - riak-cs start
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 110
    source_type_name: Riak CS
  saved_views:
    riak-cs_processes: assets/saved_views/riak-cs_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/riakcs/README.md
display_on_public_website: true
draft: false
git_integration_title: riakcs
integration_id: riak-cs
integration_title: Riak CS
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: riakcs
public_title: Riak CS
short_description: Realiza un seguimiento de la frecuencia y la latencia media de
  operaciones GET, PUT, DELETE y otras
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Almacenes de datos
  - Offering::Integración
  configuration: README.md#Configuración
  description: Realiza un seguimiento de la frecuencia y la latencia media de operaciones
    GET, PUT, DELETE y otras
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability
  support: README.md#Soporte
  title: Riak CS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Dashboard de Riak CS][1]

## Información general

Captura métricas de Riak CS en Datadog para:

- Visualizar tus métricas clave de Riak CS.
- Correlacionar el rendimiento de Riak CS con el del resto de tus aplicaciones.

## Configuración

### Instalación

El check de Riak CS está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores Riak CS.

### Configuración

1. Edita el archivo `riakcs.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][3]. Para conocer todas las opciones de configuración disponibles, consulta el [riakcs.d/conf.yaml de ejemplo][4]:

   ```yaml
   init_config:

   instances:
     ## @param access_id - string - required
     ## Enter you RiakCS access key.
     #
     - access_id: "<ACCESS_KEY>"

       ## @param access_secret - string - required
       ## Enter the corresponding RiakCS access secret.
       #
       access_secret: "<ACCESS_SECRET>"
   ```

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de `status` del Agent][6] y busca `riakcs` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "riak-cs" >}}
incluye la mayoría de las métricas de API S3, así como estadísticas de memoria. Algunas métricas han sido excluidas:

- bucket*acl*(get|put)
- object*acl*(get|put)
- bucket*policy*(get|put|delete)
- _in_(one|total)
- _time_error_\*
- \_time_100

Cualquiera de las métricas excluidas o métricas adicionales (más de 1000) pueden añadirse al archivo de configuración `riakcs.d/conf.yaml` con la clave `metrics` en `instance_config`. El valor debe ser una lista de nombres de métricas.

Consulta la [lista completa de métricas disponibles][8].

### Eventos

El check de Riak CS no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "riak-cs" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización del rendimiento y la disponibilidad de Riak CS][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riakcs/images/riakcs_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/riakcs/datadog_checks/riakcs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/riakcs/metadata.csv
[8]: https://github.com/basho/riak_cs/wiki/Riak-cs-and-stanchion-metrics
[9]: https://github.com/DataDog/integrations-core/blob/master/riakcs/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability
