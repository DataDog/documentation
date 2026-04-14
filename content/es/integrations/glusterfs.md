---
app_id: glusterfs
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Monitoriza métricas de estados de nodo, de volumen y de ladrillo del
  clúster GlusterFS.
integration_version: 3.0.2
media: []
supported_os:
- Linux
title: Red Hat Gluster Storage
---
## Información general

Este check monitoriza el estado del clúster de [Red Hat Gluster Storage](https://www.redhat.com/en/technologies/storage/gluster), el volumen y el estado de los bloques a través del Datadog Agent.
Esta integración de GlusterFS es compatible con las versiones de Red Hat de terceros y de código abierto de GlusterFS.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de GlusterFS está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `glusterfs.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar tus datos de rendimiento de GlusterFS. Consulta el [glusterfs.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example de ejemplo) para todas las opciones de configuración disponibles.

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

   **NOTA**: Por defecto, [`gstatus`](https://github.com/gluster/gstatus#install) llama internamente al comando `gluster` que requiere ser ejecutado como superusuario. Añade una línea como la siguiente a tu archivo `sudoers`:

   ```text
    dd-agent ALL=(ALL) NOPASSWD:/path/to/your/gstatus
   ```

   Si tu entorno GlusterFS no requiere raíz, define la opción de configuración `use_sudo` como `false`.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Edita este bloque de configuración en tu archivo `glusterfs.d/conf.yaml` para empezar a recopilar tus logs de GlusterFS:

   ```yaml
   logs:
     - type: file
       path: /var/log/glusterfs/glusterd.log
       source: glusterfs
     - type: file
       path: /var/log/glusterfs/cli.log
       source: glusterfs
   ```

Cambia el valor del parámetro `path` en función de tu entorno. Consulta el [conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

3. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

Para obtener información sobre la configuración del Agent para la recopilación de logs en entornos de Kubernetes, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `glusterfs` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **glusterfs.brick.block_size** <br>(gauge) | Tamaño de bloque del bloque<br>_Se muestra como byte_ |
| **glusterfs.brick.inodes.free** <br>(gauge) | Inodos libres en el bloque<br>_Se muestra como byte_ |
| **glusterfs.brick.inodes.total** <br>(gauge) | Total de inodos en el bloque<br>_Se muestra como byte_ |
| **glusterfs.brick.inodes.used** <br>(gauge) | Inode utilizado en el bloque<br>_Se muestra como byte_ |
| **glusterfs.brick.online** <br>(gauge) | Número de bloques en línea<br>_Se muestra como unidad_ |
| **glusterfs.brick.size.free** <br>(gauge) | Tamaño del bloque libre<br>_Se muestra como byte_ |
| **glusterfs.brick.size.total** <br>(gauge) | Tamaño total del bloque<br>_Se muestra como byte_ |
| **glusterfs.brick.size.used** <br>(gauge) | Bytes actuales utilizados en el bloque<br>_Se muestra como byte_ |
| **glusterfs.cluster.nodes.active** <br>(gauge) | Nodos activos actuales<br>_Se muestra como nodo_ |
| **glusterfs.cluster.nodes.count** <br>(gauge) | Número total de nodos en el clúster<br>_Se muestra como nodo_ |
| **glusterfs.cluster.volumes.count** <br>(gauge) | Número de volúmenes en el clúster<br>_Se muestra como unidad_ |
| **glusterfs.cluster.volumes.started** <br>(gauge) | Número de volúmenes iniciados en el clúster<br>_Se muestra como unidad_ |
| **glusterfs.subvol.disperse** <br>(gauge) | Recuento disperso del subvolumen<br>_Se muestra como unidad_ |
| **glusterfs.subvol.disperse_redundancy** <br>(gauge) | Redundancia dispersa del subvolumen<br>_Se muestra como unidad_ |
| **glusterfs.subvol.replica** <br>(gauge) | Réplicas en subvolumen<br>_Se muestra como unidad_ |
| **glusterfs.volume.bricks.count** <br>(gauge) | Número de bloques en el volumen<br>_Se muestra como unidad_ |
| **glusterfs.volume.disperse** <br>(gauge) | Número de dispersos en el volumen<br>_Se muestra como unidad_ |
| **glusterfs.volume.disperse_redundancy** <br>(gauge) | Número de redundancia dispersa en el volumen<br>_Se muestra como unidad_ |
| **glusterfs.volume.distribute** <br>(gauge) | Número de distribuidos<br>_Se muestra como unidad_ |
| **glusterfs.volume.inodes.free** <br>(gauge) | Inodos libres en el volumen<br>_Se muestra como byte_ |
| **glusterfs.volume.inodes.total** <br>(gauge) | Tamaño total de inodos en el volumen<br>_Se muestra como byte_ |
| **glusterfs.volume.inodes.used** <br>(gauge) | Bytes usados de inodos en el volumen<br>_Se muestra como byte_ |
| **glusterfs.volume.online** <br>(gauge) | Número de volúmenes en línea<br>_Se muestra como unidad_ |
| **glusterfs.volume.replica** <br>(gauge) | Réplicas en volúmenes<br>_Se muestra como unidad_ |
| **glusterfs.volume.size.free** <br>(gauge) | Bytes libres en el volumen<br>_Se muestra como byte_ |
| **glusterfs.volume.size.total** <br>(gauge) | Bytes totales en el volumen<br>_Se muestra como byte_ |
| **glusterfs.volume.size.used** <br>(gauge) | Bytes utilizados en el volumen<br>_Se muestra como byte_ |
| **glusterfs.volume.snapshot.count** <br>(gauge) | Número de snapshots del volumen<br>_Se muestra como byte_ |
| **glusterfs.volume.used.percent** <br>(gauge) | Porcentaje de volumen utilizado<br>_Se muestra en porcentaje_ |

### Eventos

GlusterFS no incluye eventos.

### Checks de servicio

**glusterfs.brick.health**

Devuelve `CRITICAL` si el subvolumen es 'degraded'. Devuelve `OK` si es 'up'.

_Estados: ok, critical, warning_

**glusterfs.volume.health**

Devuelve `CRITICAL` si el volumen es 'degraded'. Devuelve `OK` si es 'up'.

_Estados: ok, critical, warning_

**glusterfs.cluster.health**

Devuelve `CRITICAL` si el volumen es 'degraded'. Devuelve `OK` en caso contrario.

_Estados: ok, critical, warning_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).