---
custom_kind: Integración
integration_title: HDFS
is_public: true
short_description: Realiza un rastreo del uso del disco de clúster, los fallos de
  volumen, los DataNodes muertos y mucho más.
---


<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Integración de HDFS DataNode

![Dashboard de HDFS][1]

## Información general

Rastrea la utilización del disco y los volúmenes fallidos en cada uno de tus HDFS DataNodes. Este check del Agent recopila métricas para estos, así como relacionados con bloques y métricas relacionadas con caché.

Utiliza este check (hdfs_datanode) y su check similar (hdfs_namenode), no el antiguo check dos en uno (HDFS); ese check está obsoleto.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos de contenedores, consulta las [Plantillas de integraciones de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de HDFS DataNode está incluido en el paquete del [Datadog Agent][3], por lo que no necesitas instalar nada más en tus DataNodes.

### Configuración

#### Conecta con el Agent

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

Para Configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `hdfs_datanode.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent'][4]. Consulta el [ejemplo de hdfs_datanode.d/conf.yaml][5] para ver todas las opciones disponibles de configuración:

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

2. [Reinicia el Agent][6].

<!-- xxz tab xxx -->
<!-- xxx tab "Containerized" xxx -->

#### Contenedores

Para los entornos de contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                               |
| -------------------- | --------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_datanode`                                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                                       |
| `<INSTANCE_CONFIG>`  | `{"hdfs_datanode_jmx_uri": "http://%%host%%:9864"}` |

#### Recopilación de logs

**Disponible para el Agent >6.0**

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Actívalo en el archivo `datadog.yaml` con:

    ```yaml
      logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `hdfs_datanode.d/conf.yaml` para empezar a recopilar tus logs de DataNode:

    ```yaml
      logs:
        - type: file
          path: /var/log/hadoop-hdfs/*.log
          source: hdfs_datanode
          service: <SERVICE_NAME>
    ```

    Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

3. [Reinicia el Agent][6].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `hdfs_datanode` en la sección de checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hdfs-datanode" >}}


### Eventos

El check de HDFS-datanode no incluye ningún evento.

### Check de servicio
{{< get-service-checks-from-git "hdfs-datanode" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

- [Información general de la arquitectura de Hadoop][9]
- [Cómo monitorizar métricas de Hadoop][10]
- [Cómo recopilar métricas de Hadoop][11]
- [Cómo monitorizar Hadoop con Datadog][12]




<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Integración de HDFS NameNode

[Dashboard de HDFS][13]

## Información general

Monitoriza tus NameNodes de HDFS primarios _y_ de reserva para saber cuándo tu clúster entra en un estado precario: cuando sólo te queda un NameNode o cuando es el momento de añadir más capacidad al clúster. Este check del Agent recopila métricas para la capacidad restante, bloques corruptos/faltantes, DataNodes muertos, carga del sistema de archivos, bloques insuficientemente replicados, fallos de volumen totales (en todos los DataNodes) y muchos más.

Utiliza este check (hdfs_namenode) y su check similar (hdfs_datanode), no el antiguo check dos en uno (HDFS); ese check está obsoleto.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos de contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de HDFS NameNode está incluido en el paquete del [Datadog Agent][3], por lo que no necesitas instalar nada más en tus NameNodes.

### Configuración

#### Conecta con el Agent

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `hdfs_namenode.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent'][4]. Consulta el [ejemplo de hdfs_namenode.d/conf.yaml][14] para todas las opciones disponibles de configuración:

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

2. [Reinicia el Agent][6].

<!-- xxz tab xxx -->
<!-- xxx tab "Containerized" xxx -->

#### Contenedores

Para entornos de contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_namenode`                                      |
| `<INIT_CONFIG>`      | en blanco o `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"hdfs_namenode_jmx_uri": "https://%%host%%:9870"}` |

#### Recopilación de logs

**Disponible para el Agent >6.0**

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Actívala en el archivo `datadog.yaml` con:

    ```yaml
      logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `hdfs_namenode.d/conf.yaml` para empezar a recopilar tus logs de NameNode:

    ```yaml
      logs:
        - type: file
          path: /var/log/hadoop-hdfs/*.log
          source: hdfs_namenode
          service: <SERVICE_NAME>
    ```

    Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

3. [Reinicia el Agent][6].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `hdfs_namenode` en la sección Checks.

## Datos recogidos

### Métricas
{{< get-metrics-from-git "hdfs-namenode" >}}


### Eventos

El check de HDFS-namenode no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "hdfs-namenode" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

- [Información general de la arquitectura de Hadoop][9]
- [Cómo monitorizar métricas de Hadoop][10]
- [Cómo recopilar métricas de Hadoop][11]
- [Cómo monitorizar Hadoop con Datadog][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_datanode/images/hadoop_dashboard.png
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/datadog_checks/hdfs_datanode/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/help/
[9]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[10]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[11]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[12]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_namenode/images/hadoop_dashboard.png
[14]: https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/datadog_checks/hdfs_namenode/data/conf.yaml.example