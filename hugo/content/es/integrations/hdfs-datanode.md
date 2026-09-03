---
aliases:
- /es/integrations/hdfs_datanode
app_id: hdfs-datanode
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
title: HDFS Datanode
---
![Dashboard de HDFS](https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_datanode/images/hadoop_dashboard.png)

## Información general

Rastrea la utilización del disco y los volúmenes fallidos en cada uno de tus HDFS DataNodes. Este check del Agent recopila métricas para estos, así como métricas relacionadas con bloques y caché.

Utiliza este check (hdfs_datanode) y su check homólogo (hdfs_namenode), no el antiguo check dos en uno (hdfs); ese check está obsoleto.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de HDFS DataNode está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tu servidor.

### Configuración

#### Conexión del Agent

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `hdfs_datanode.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [hdfs_datanode.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/datadog_checks/hdfs_datanode/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
     ## @param hdfs_datanode_jmx_uri - string - required
     ## The HDFS DataNode check retrieves metrics from the HDFS DataNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on a HDFS DataNode. The HDFS
     ## DataNode JMX URI is composed of the DataNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.datanode.http.address
     ## https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_datanode_jmx_uri: http://localhost:9864
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                               |
| -------------------- | --------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_datanode`                                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                                       |
| `<INSTANCE_CONFIG>`  | `{"hdfs_datanode_jmx_uri": "http://%%host%%:9864"}` |

#### Recopilación de logs

**Disponible para el Agent >6.0**

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítalo en el archivo `datadog.yaml` con:

   ```yaml
     logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `hdfs_datanode.d/conf.yaml` para empezar a recopilar tus logs de DataNode:

   ```yaml
     logs:
       - type: file
         path: /var/log/hadoop-hdfs/*.log
         source: hdfs_datanode
         service: <SERVICE_NAME>
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `hdfs_datanode` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hdfs.datanode.cache_capacity** <br>(gauge) | Capacidad de la caché en bytes<br>_Se muestra como byte_ |
| **hdfs.datanode.cache_used** <br>(gauge) | Caché utilizada en bytes<br>_Se muestra como byte_ |
| **hdfs.datanode.dfs_capacity** <br>(gauge) | Capacidad del disco en bytes<br>_Se muestra como byte_ |
| **hdfs.datanode.dfs_remaining** <br>(gauge) | El espacio de disco restante en bytes<br>_Se muestra como byte_ |
| **hdfs.datanode.dfs_used** <br>(gauge) | Uso del disco en bytes<br>_Se muestra como byte_ |
| **hdfs.datanode.estimated_capacity_lost_total** <br>(gauge) | La capacidad perdida estimada en bytes<br>_Se muestra como byte_ |
| **hdfs.datanode.last_volume_failure_date** <br>(gauge) | La fecha/hora del último fallo de volumen en milisegundos desde la epoch<br>_Se muestra en milisegundos_ |
| **hdfs.datanode.num_blocks_cached** <br>(gauge) | El número de bloques almacenados en caché<br>_Se muestra como bloque_ |
| **hdfs.datanode.num_blocks_failed_to_cache** <br>(gauge) | Número de bloques que no se han almacenado en caché<br>_Se muestra como bloque_ |
| **hdfs.datanode.num_blocks_failed_to_uncache** <br>(gauge) | El número de bloques fallidos a eliminar de la caché<br>_Se muestra como bloque_ |
| **hdfs.datanode.num_failed_volumes** <br>(gauge) | Número de volúmenes fallidos|

### Eventos

El check de HDFS-datanode no incluye ningún evento.

### Checks de servicio

**hdfs.datanode.jmx.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la interfaz JMX del DataNode por cualquier motivo. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Información general de la arquitectura de Hadoop](https://www.datadoghq.com/blog/hadoop-architecture-overview)
- [Cómo monitorizar métricas de Hadoop](https://www.datadoghq.com/blog/monitor-hadoop-metrics)
- [Cómo recopilar métricas de Hadoop](https://www.datadoghq.com/blog/collecting-hadoop-metrics)
- [Cómo monitorizar Hadoop con Datadog](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog)