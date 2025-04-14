---
app_id: glusterfs
app_uuid: 3c3562fb-8dce-4265-a8de-eacaa30974e1
assets:
  dashboards:
    Red Hat Gluster Storage: assets/dashboards/red_hat_gluster_storage.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: glusterfs.cluster.nodes.count
      metadata_path: metadata.csv
      prefix: glusterfs.
    process_signatures:
    - glusterd
    - gluster
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10145
    source_type_name: GlusterFS
  monitors:
    Number of offline bricks is high: assets/monitors/brick_status.json
  saved_views:
    glusterfs_processes: assets/saved_views/glusterfs_processes.json
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
- https://github.com/DataDog/integrations-core/blob/master/glusterfs/README.md
display_on_public_website: true
draft: false
git_integration_title: glusterfs
integration_id: glusterfs
integration_title: Red Hat Gluster Storage
integration_version: 3.0.1
is_public: true
manifest_version: 2.0.0
name: glusterfs
public_title: Red Hat Gluster Storage
short_description: Monitoriza métricas de estados de nodo, de volumen y de ladrillo
  del clúster GlusterFS.
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza métricas de estados de nodo, de volumen y de ladrillo del
    clúster GlusterFS.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Red Hat Gluster Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza la situación, el volumen y el estado de ladrillos del clúster [Red Hat Gluster Storage][1] a través del Datadog Agent. 
Esta integración GlusterFS es compatible con las versiones de código abierto y vendidas por Red Hat de GlusterFS.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de GlusterFS está incluido en el paquete del [Datadog Agent ][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `glusterfs.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu GlusterFS. Para conocer todas las opciones de configuración disponibles, consulta el [glusterfs.d/conf.yaml de ejemplo][4].

   ```yaml
   init_config:

    ## @param gstatus_path - string - optional - default: /opt/datadog-agent/embedded/sbin/gstatus
    ## Path to the gstatus command.
    ##
    ## A version of the gstatus is shipped with the Agent binary.
    ## If you are using a source install, specify the location of gstatus.
    #
    # gstatus_path: /opt/datadog-agent/embedded/sbin/gstatus

    instances:
      -
        ## @param min_collection_interval - number - optional - default: 60
        ## The GlusterFS integration collects cluster-wide metrics which can put additional workload on the server.
        ## Increase the collection interval to reduce the frequency.
        ##
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        #
        min_collection_interval: 60
   ```

   **NOTA**: Por defecto, [`gstatus`][5] llama internamente al comando `gluster` que requiere ser ejecutado como superusuario. Añade una línea como la siguiente a tu archivo `sudoers`:

   ```text
    dd-agent ALL=(ALL) NOPASSWD:/path/to/your/gstatus
   ```

   Si tu entorno GlusterFS no requiere raíz, define la opción de configuración `use_sudo` como `false`.

2. [Reinicia el Agent][6].

#### Recopilación de logs


1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Edita este bloque de configuración en tu archivo `glusterfs.d/conf.yaml` para empezar a recopilar tus logs de GlusterFS:

    ```yaml
    logs:
      - type: file
        path: /var/log/glusterfs/glusterd.log
        source: glusterfs
      - type: file
        path: /var/log/glusterfs/cli.log
        source: glusterfs
    ```

  Cambia el valor del parámetro `path` en función de tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [conf.yaml de ejemplo][4].

  3. [Reinicia el Agent][6].

Para obtener más información sobre cómo configurar el Agent para la recopilación de logs en entornos Kubernetes, consulta [Recopilación de logs de Kubernetes][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `glusterfs` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "glusterfs" >}}


### Eventos

GlusterFS no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "glusterfs" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://www.redhat.com/en/technologies/storage/gluster
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example
[5]: https://github.com/gluster/gstatus#install
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/