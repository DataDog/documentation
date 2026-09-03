---
aliases:
- /es/integrations/hdfs_namenode
app_id: hdfs-namenode
categories:
- recopilación de logs
- sistema operativo y sistema
custom_kind: integración
description: Realiza un rastreo del uso del disco de clúster, los fallos de volumen,
  los DataNodes muertos y mucho más.
further_reading:
- link: https://www.datadoghq.com/blog/hadoop-architecture-overview
  tag: blog
  text: Información general de la arquitectura de Hadoop
- link: https://www.datadoghq.com/blog/monitor-hadoop-metrics
  tag: blog
  text: Cómo monitorizar métricas de Hadoop
- link: https://www.datadoghq.com/blog/collecting-hadoop-metrics
  tag: blog
  text: Cómo recopilar métricas de Hadoop
- link: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
  tag: blog
  text: Cómo monitorizar Hadoop con Datadog
integration_version: 7.0.0
media: []
supported_os:
- linux
- macos
title: HDFS Namenode
---
![Dashboard de HDFS](https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_namenode/images/hadoop_dashboard.png)

## Información general

Monitoriza tus HDFS NameNodes primarios _y_ de reserva para saber cuándo tu clúster entra en un estado precario: cuando te queda un NameNode, o cuando es el momento de añadir más capacidad al clúster. Este check del Agent recopila métricas de la capacidad restante, bloques corruptos/faltantes, DataNodes inactivos, carga del sistema de archivos, bloques insuficientemente replicados, fallos de volumen totales (en todos los DataNodes) y mucho más.

Utiliza este check (hdfs_namenode) y su check homólogo (hdfs_datanode), no el antiguo check dos en uno (hdfs); ese check está obsoleto.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de HDFS NameNode está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesita instalar nada más en tus NameNodes.

### Configuración

#### Conexión del Agent

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `hdfs_namenode.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [hdfs_namenode.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/datadog_checks/hdfs_namenode/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
     ## @param hdfs_namenode_jmx_uri - string - required
     ## The HDFS NameNode check retrieves metrics from the HDFS NameNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on
     ## a HDFS NameNode. The HDFS NameNode JMX URI is composed of the NameNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.namenode.http-address
     ## https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_namenode_jmx_uri: http://localhost:9870
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_namenode`                                      |
| `<INIT_CONFIG>`      | en blanco o `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"hdfs_namenode_jmx_uri": "https://%%host%%:9870"}` |

#### Recopilación de logs

**Disponible para el Agent >6.0**

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítalo en el archivo `datadog.yaml` con:

   ```yaml
     logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `hdfs_namenode.d/conf.yaml` para empezar a recopilar tus logs de NameNode:

   ```yaml
     logs:
       - type: file
         path: /var/log/hadoop-hdfs/*.log
         source: hdfs_namenode
         service: <SERVICE_NAME>
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `hdfs_namenode` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hdfs.namenode.blocks_total** <br>(gauge) | Número total de bloques<br>_Se muestra como bloque_ |
| **hdfs.namenode.capacity_remaining** <br>(gauge) | Espacio de disco restante en bytes<br>_Se muestra como byte_ |
| **hdfs.namenode.capacity_total** <br>(gauge) | Capacidad total del disco en bytes<br>_Se muestra como byte_ |
| **hdfs.namenode.capacity_used** <br>(gauge) | Uso del disco en bytes<br>_Se muestra como byte_ |
| **hdfs.namenode.corrupt_blocks** <br>(gauge) | Número de bloques corruptos<br>_Se muestra como bloque_ |
| **hdfs.namenode.estimated_capacity_lost_total** <br>(gauge) | Capacidad perdida estimada en bytes<br>_Se muestra como byte_ |
| **hdfs.namenode.files_total** <br>(gauge) | Número total de archivos<br>_Se muestra como archivo_ |
| **hdfs.namenode.fs_lock_queue_length** <br>(gauge) | Longitud de la cola de bloqueo|
| **hdfs.namenode.max_objects** <br>(gauge) | Número máximo de archivos que admite HDFS<br>_Se muestra como objeto_ |
| **hdfs.namenode.missing_blocks** <br>(gauge) | Número de bloques faltantes<br>_Se muestra como bloque_ |
| **hdfs.namenode.num_dead_data_nodes** <br>(gauge) | Número total de nodos de datos inactivos<br>_Se muestra como nodo_ |
| **hdfs.namenode.num_decom_dead_data_nodes** <br>(gauge) | Número de nodos de datos inactivos por fuera de servicio<br>_Se muestra como nodo_ |
| **hdfs.namenode.num_decom_live_data_nodes** <br>(gauge) | Número de nodos de datos activos fuera de servicio<br>_Se muestra como nodo_ |
| **hdfs.namenode.num_decommissioning_data_nodes** <br>(gauge) | Número de nodos de datos fuera de servicio<br>_Se muestra como nodo_ |
| **hdfs.namenode.num_live_data_nodes** <br>(gauge) | Número total de nodos de datos activos<br>_Se muestra como nodo_ |
| **hdfs.namenode.num_stale_data_nodes** <br>(gauge) | Número de nodos de datos obsoletos<br>_Se muestra como nodo_ |
| **hdfs.namenode.num_stale_storages** <br>(gauge) | Número de almacenamientos obsoletos|
| **hdfs.namenode.pending_deletion_blocks** <br>(gauge) | Número de bloques de borrado pendientes<br>_Se muestra como bloque_ |
| **hdfs.namenode.pending_replication_blocks** <br>(gauge) | Número de bloques pendientes de replicación<br>_Se muestra como bloque_ |
| **hdfs.namenode.scheduled_replication_blocks** <br>(gauge) | Número de bloques programados para replicación<br>_Se muestra como bloque_ |
| **hdfs.namenode.total_load** <br>(gauge) | Carga total en el sistema de archivos|
| **hdfs.namenode.under_replicated_blocks** <br>(gauge) | Número de bloques infrareplicados<br>_Se muestra como bloque_ |
| **hdfs.namenode.volume_failures_total** <br>(gauge) | Volumen total de fallos|

### Eventos

El check de HDFS-namenode no incluye ningún evento.

### Checks de servicio

**hdfs.namenode.jmx.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la interfaz JMX del NameNode por cualquier motivo. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Información general de la arquitectura de Hadoop](https://www.datadoghq.com/blog/hadoop-architecture-overview)
- [Cómo monitorizar métricas de Hadoop](https://www.datadoghq.com/blog/monitor-hadoop-metrics)
- [Cómo recopilar métricas de Hadoop](https://www.datadoghq.com/blog/collecting-hadoop-metrics)
- [Cómo monitorizar Hadoop con Datadog](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog)