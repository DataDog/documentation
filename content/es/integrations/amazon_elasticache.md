---
aliases:
- /es/integrations/awselasticache/
- /es/integrations/elasticache/
app_id: amazon_elasticache
categories:
- aws
- caching
- cloud
- configuration & deployment
- log collection
custom_kind: integración
description: Realiza un seguimiento de las métricas clave de Amazon ElasicCache.
title: Amazon ElastiCache
---
{{< img src="integrations/awselasticache/elasticache-memcached.png" alt="Dashboard ElastiCache Memcached predeterminado" popup="true">}}

## Información general

Consulta [Monitorización de métricas de rendimiento de ElastiCache con Redis o Memcached](https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached) para obtener información sobre métricas de rendimiento clave, cómo recopilarlas y cómo [Coursera](https://www.coursera.org) monitoriza ElastiCache utilizando Datadog.

## Configuración

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Instalación sin el Datadog Agent

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `ElastiCache` está habilitado en la pestaña `Metric Collection`.

1. Añade los siguientes permisos a tu [política IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para poder recopilar métricas de Amazon ElastiCache. Para obtener más información, consulta las [políticas de ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/IAM.html) en el sitio web de AWS.

   | AWS Permiso | Descripción |
   | ----------------------------------- | --------------------------------------------------------------------- |
   | `elasticache:DescribeCacheClusters` | Enumera y describe clústeres de caché, para añadir etiquetas (tags) y métricas adicionales. |
   | `elasticache:ListTagsForResource` | Enumera etiquetas personalizadas de un clúster, para añadir etiquetas personalizadas.                    |
   | `elasticache:DescribeEvents` | Añade eventos de snapshots y mantenimientos.                          |

1. Instala la integración [Datadog - Amazon ElastiCache](https://app.datadoghq.com/integrations/amazon-elasticache).

### Instalación con el Datadog Agent (recomendado)

#### Recopilación de métricas nativas con el Agent

El siguiente diagrama muestra cómo Datadog recopila métricas directamente de CloudWatch con la integración ElastiCache nativa y cómo además puede recopilar métricas nativas directamente de tecnologías backend: Redis o Memcached. Al recopilar directamente del backend, tienes acceso a un mayor número de métricas importantes, a una mayor resolución.

{{< img src="integrations/awselasticache/elasticache1.png" alt="Integraciones ElastiCache, Redis y Memcached" >}}

#### Funcionamiento

Debido a que las métricas del Agent están vinculadas a la instancia EC2, donde se ejecuta el Agent, y no a la instancia ElastiCache real, es necesario utilizar la etiqueta `cacheclusterid`para conectar todas las métricas. Una vez que el Agent esté configurado con las mismas etiquetas que la instancia ElastiCache, la combinación de las métricas Redis/Memcached con las métricas ElastiCache es realmente sencilla.

#### Paso a paso

Debido a que el Agent no se ejecuta en una instancia ElastiCache real, sino en una máquina remota, la clave para configurar correctamente esta integración es indicarle al Agent dónde recolectar las métricas.

##### Recopilación de la información de conexión para tu instancia ElastiCache

Primero ve a la consola de AWS, abre la sección ElastiCache y luego la pestaña Clústeres de caché para encontrar el clúster que quieres monitorizar. Deberías ver algo como lo siguiente:

{{< img src="integrations/awselasticache/elasticache2.png" alt="Clústeres ElastiCache en la consola de AWS" >}}

Luego, haz clic en el enlace "nodo" para acceder a la URL de tu endpoint:

{{< img src="integrations/awselasticache/elasticache3.png" alt="Link nodo en la consola de AWS" >}}

Anota la URL del endpoint (por ejemplo: **replica-001.xxxx.use1.cache.amazonaws.com**) y el `cacheclusterid` (por ejemplo: **replica-001**). Necesitas estos valores para configurar el Agent y para crear gráficos y dashboards.

##### Configuración del Agent

Las integraciones Redis/Memcached admiten el etiquetado de instancias de caché individuales. Originalmente diseñadas para permitir la monitorización de múltiples instancias en la misma máquina, estas etiquetas también se pueden utilizar para filtrar y agrupar métricas. El siguiente es un ejemplo de configuración de ElastiCache con Redis utilizando `redisdb.yaml`. Para obtener más información acerca de dónde se almacena este archivo en función de tu plataforma, consulta el [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory).

```yaml
init_config:

instances:
    # Endpoint URL from AWS console
    - host: replica-001.xxxx.use1.cache.amazonaws.com
      port: 6379
      # Cache Cluster ID from AWS console
      tags:
          - cacheclusterid:replicaa-001
```

A continuación, reinicia el Agent: `sudo /etc/init.d/datadog-agent restart` (en Linux).

##### Visualizar métricas juntas

Después de unos minutos, se puede acceder a las métricas ElastiCache y a las métricas Redis o Memcached en Datadog para la creación de gráficos, la monitorización, etc.

A continuación se muestra un ejemplo de configuración de un gráfico para combinar las métricas de hits de caché de ElastiCache con las métricas de latencia nativas de Redis utilizando la misma etiqueta `cacheclusterid` **replicaa-001**.

{{< img src="integrations/awselasticache/elasticache4.png" alt="Métricas ElastiCache y de caché" >}}

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.elasticache.active_defrag_hits** <br>(gauge) | Redis - Número de reasignaciones de valores por minuto realizadas por el proceso de desfragmentación activo.|
| **aws.elasticache.bytes_read_into_memcached** <br>(count) | Memcached - Número de bytes leídos desde la red por el nodo caché.<br>_Se muestra como byte_ |
| **aws.elasticache.bytes_used_for_cache** <br>(gauge) | Redis - Número total de bytes asignados por Redis.<br>_Se muestra como byte_ |
| **aws.elasticache.bytes_used_for_cache_items** <br>(gauge) | Memcached - Número de bytes utilizados para almacenar los elementos de la caché.<br>_Se muestra como byte_ |
| **aws.elasticache.bytes_used_for_hash** <br>(gauge) | Memcached - Número de bytes utilizados actualmente por las tablas hash.<br>_Se muestra como byte_ |
| **aws.elasticache.bytes_written_out_from_memcached** <br>(count) | Memcached - Número de bytes escritos en la red por el nodo caché.<br>_Se muestra como byte_ |
| **aws.elasticache.cache_hit_rate** <br>(gauge) | Redis - Indica la eficiencia de uso de la instancia Redis.<br>_Se muestra como porcentaje_ |
| **aws.elasticache.cache_hits** <br>(count) | Redis - Número de búsquedas de claves realizadas con éxito.<br>_Se muestra como acierto_ |
| **aws.elasticache.cache_misses** <br>(count) | Redis - Número de búsquedas de claves fallidas.<br>_Se muestra como fallido_ |
| **aws.elasticache.cas_badval** <br>(count) | Memcached - Número de solicitudes de CAS (comprobación y definición) recibidas por la caché en las que el valor CAS no coincidió con el valor CAS almacenado.<br>_Se muestra como solicitud_ |
| **aws.elasticache.cas_hits** <br>(count) | Memcached - Número de solicitudes de CAS recibidas por la caché en las que se encontró la clave solicitada y el valor de CAS coincidió.<br>_Se muestra como acierto_ |
| **aws.elasticache.cas_misses** <br>(count) | Memcached - Número de solicitudes de CAS recibidas por la caché en las que no se encontró la clave solicitada.<br>_Se muestra como fallido_ |
| **aws.elasticache.cluster_count** <br>(count) | Número de clústeres de Elasticache.|
| **aws.elasticache.cmd_config_get** <br>(count) | Memcached - Número acumulado de solicitudes de configuración get.<br>_Se muestra como get_ |
| **aws.elasticache.cmd_config_set** <br>(count) | Memcached - Número acumulado de solicitudes de configuración set.<br>_Se muestra como set_ |
| **aws.elasticache.cmd_flush** <br>(count) | Memcached - Número de comandos flush recibidos por la caché.<br>_Se muestra como flush_ |
| **aws.elasticache.cmd_get** <br>(count) | Memcached - Número de comandos get recibidos por la caché.<br>_Se muestra como get_ |
| **aws.elasticache.cmd_set** <br>(count) | Memcached - Número de comandos set recibidos por la caché.<br>_Se muestra como set_ |
| **aws.elasticache.cmd_touch** <br>(count) | Memcached - Número acumulado de solicitudes touch.<br>_Se muestra como solicitud_ |
| **aws.elasticache.cpucredit_balance** <br>(gauge) | Número de créditos de CPU ganados, acumulados por una instancia desde su lanzamiento o inicio.<br>_Se muestra como unidad_ |
| **aws.elasticache.cpucredit_usage** <br>(gauge) | Número de créditos de CPU utilizados por la instancia para la utilización de la CPU.<br>_Se muestra como unidad_ |
| **aws.elasticache.cpuutilization** <br>(gauge) | Porcentaje de uso de la CPU para el servidor.<br>_Se muestra como porcentaje_ |
| **aws.elasticache.curr_config** <br>(gauge) | Memcached - Número actual de configuraciones almacenadas.|
| **aws.elasticache.curr_connections** <br>(gauge) | Redis - Número de conexiones de clientes, excluyendo las conexiones de réplicas de lectura.  Memcached - Recuento del número de conexiones conectadas a la caché en un instante en el tiempo.<br>_Se muestra como conexión_. |
| **aws.elasticache.curr_items** <br>(gauge) | Redis - Número de elementos en la caché. Se obtiene a partir de la estadística del espacio de claves de Redis, sumando todas las claves del espacio de claves completo.  Memcached - Recuento del número de elementos almacenados actualmente en la caché.<br>_Se muestra como elemento_ |
| **aws.elasticache.database_memory_usage_percentage** <br>(gauge) | Redis - Porcentaje de memoria disponible para el clúster que está en uso.<br>_Se muestra como porcentaje_ |
| **aws.elasticache.db_0average_ttl** <br>(gauge) | Redis - Expone avg_ttl del propietario de la base de datos (DB0) a partir de la estadística del espacio de claves del comando INFO de Redis.<br>_Se muestra como milisegundo_ |
| **aws.elasticache.decr_hits** <br>(count) | Memcached - Número de solicitudes de decremento recibidas por la caché en las que se encontró la clave solicitada.<br>_Se muestra como acierto_ |
| **aws.elasticache.decr_misses** <br>(count) | Memcached - Número de solicitudes de decremento recibidas por la caché en las que no se encontró la clave solicitada.<br>_Se muestra como fallido_ |
| **aws.elasticache.delete_hits** <br>(count) | Memcached - Número de solicitudes de eliminación recibidas por la caché en las que se encontró la clave solicitada.<br>_Se muestra como acierto_ |
| **aws.elasticache.delete_misses** <br>(count) | Memcached - Número de solicitudes de eliminación recibidas por la caché en las que no se encontró la clave solicitada.<br>_Se muestra como fallido_ |
| **aws.elasticache.engine_cpuutilization** <br>(gauge) | Porcentaje de uso de la CPU para el proceso Redis.<br>_Se muestra como porcentaje_ |
| **aws.elasticache.eval_based_cmds** <br>(count) | Redis - Número total de comandos para los comandos basados en eval.<br>_Se muestra como comando_ |
| **aws.elasticache.eval_based_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos basados en eval.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.evicted_unfetched** <br>(count) | Memcached - Número de elementos válidos desalojados de la caché de uso menos reciente (LRU) que nunca se tocaron después de definirse.<br>_Se muestra como elemento_ |
| **aws.elasticache.evictions** <br>(count) | Redis - Número de claves desalojadas debido al límite máximo de memoria. Memcached - Número de elementos no caducados, desalojados por la caché para dejar espacio a nuevas escrituras.<br>_Se muestra como desalojo_. |
| **aws.elasticache.expired_unfetched** <br>(count) | Memcached - Número de elementos caducados recuperados de la caché de LRU que nunca se tocaron después de definirse.<br>_Se muestra como elemento_ |
| **aws.elasticache.freeable_memory** <br>(gauge) | Cantidad de memoria libre disponible en el host.<br>_Se muestra como byte_ |
| **aws.elasticache.geo_spatial_based_cmds** <br>(count) | Redis - Número total de comandos geoespaciales.<br>_Se muestra como comando_ |
| **aws.elasticache.get_hits** <br>(count) | Memcached - Número de solicitudes get recibidas por la caché en las que se encontró la clave solicitada.<br>_Se muestra como acierto_ |
| **aws.elasticache.get_misses** <br>(count) | Memcached - Número de solicitudes get recibidas por la caché en las que no se encontró la clave solicitada.<br>_Se muestra como fallido_ |
| **aws.elasticache.get_type_cmds** <br>(count) | Redis - Número total de comandos de sólo lectura. Se obtiene de la estadística commandstats de Redis OSS sumando todos los comandos de sólo lectura (get, hget, scard, lrange, etc.)<br>_Se muestra como comando_. |
| **aws.elasticache.get_type_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos de lectura.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.hash_based_cmds** <br>(count) | Redis - Número total de comandos basados en hash. Se obtiene de la estadística commandstats de Redis sumando todos los comandos que actúan sobre uno o más hashes.<br>_Se muestra como comando_ |
| **aws.elasticache.hash_based_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos basados en hash.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.hyper_log_log_based_cmds** <br>(count) | Redis - Número total de comandos basados en HyperLogLog. Se obtiene a partir de la estadística commandstats de Redis sumando todos los comandos de tipo pf (pfadd, pfcount, pfmerge).<br>_Se muestra como comando_. |
| **aws.elasticache.incr_hits** <br>(count) | Memcached - Número de solicitudes de incremento recibidas por la caché en las que se encontró la clave solicitada.<br>_Se muestra como acierto_ |
| **aws.elasticache.incr_misses** <br>(count) | Memcached - Número de solicitudes de incremento recibidas por la caché en las que no se encontró la clave solicitada.<br>_Se muestra como fallido_ |
| **aws.elasticache.is_master** <br>(gauge) | Redis - Devuelve 1 si el nodo es el principal, 0 en caso contrario.|
| **aws.elasticache.key_based_cmds** <br>(count) | Redis - Número total de comandos basados en claves. Se obtiene a partir de la estadística commandstats de Redis sumando todos los comandos que actúan sobre una o varias claves.<br>_Se muestra como comando_. |
| **aws.elasticache.key_based_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos basados en claves.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.list_based_cmds** <br>(count) | Redis - Número total de comandos basados en listas. Se obtiene de la estadística commandstats de Redis sumando todos los comandos que actúan sobre una o más listas.<br>_Se muestra como comando_ |
| **aws.elasticache.master_link_health_status** <br>(gauge) | Redis - Un valor de 0 indica que los datos en el nodo primario de Elasticache no están sincronizados con Redis en EC2. Un valor de 1 indica que los datos están sincronizados.|
| **aws.elasticache.memory_fragmentation_ratio** <br>(gauge) | Redis - Indica la eficiencia en la asignación de memoria del motor Redis.|
| **aws.elasticache.network_bytes_in** <br>(count) | Número de bytes que el host ha leído de la red.<br>_Se muestra como byte_ |
| **aws.elasticache.network_bytes_out** <br>(count) | Número de bytes que el host ha escrito en la red.<br>_Se muestra como byte_ |
| **aws.elasticache.network_packets_in** <br>(count) | Número de paquetes recibidos en todas las interfaces de red por la instancia.<br>_Se muestra como paquete_ |
| **aws.elasticache.network_packets_out** <br>(count) | Número de paquetes enviados en todas las interfaces de red por la instancia.<br>_Se muestra como paquete_ |
| **aws.elasticache.new_connections** <br>(count) | Redis - Número total de conexiones aceptadas por el servidor durante este periodo. Memcached - Número de conexiones nuevas recibidas por la caché. Se obtiene a partir de la estadística memcached total_connections registrando el cambio en total_connections durante un periodo de tiempo. Siempre será al menos 1, debido a una conexión reservada para un ElastiCache.<br>_Se muestra como conexión_ |
| **aws.elasticache.new_items** <br>(count) | Memcached - Número de nuevos elementos almacenados por la caché. Se obtiene a partir de la estadística memcached total_items registrando el cambio en total_items durante un periodo de tiempo.<br>_Se muestra como elemento_ |
| **aws.elasticache.node_count** <br>(count) | Número de nodos Elasticache.<br>_Se muestra como nodo_ |
| **aws.elasticache.reclaimed** <br>(count) | Redis - Número total de eventos de vencimiento de claves. Memcached - Número de elementos vencidos, desalojados por la caché para dejar espacio a nuevas escrituras.|
| **aws.elasticache.replication_bytes** <br>(gauge) | Redis - Para elementos primarios con réplicas adjuntas, ReplicationBytes informa del número de bytes que el elemento primario está enviando a todas tus réplicas. Esta métrica es representativa de la carga de escritura en el grupo de replicación. Para réplicas y elementos primarios independientes, ReplicationBytes es siempre 0.<br>_Se muestra como byte_ |
| **aws.elasticache.replication_lag** <br>(gauge) | Redis - Esta métrica sólo es aplicable a un nodo de caché que se ejecuta como réplica de lectura. Representa el retraso, en segundos, de la réplica al aplicar los cambios del clúster de caché primario.<br>_Se muestra como segundo_ |
| **aws.elasticache.save_in_progress** <br>(gauge) | Redis - Esta métrica binaria devuelve 1 siempre que un proceso de almacenamiento en segundo plano (con o sin bifurcación) esté en curso, y 0 en caso contrario. Un proceso de almacenamiento en segundo plano se utiliza normalmente durante snapshots y sincronizaciones. Estas operaciones pueden degradar el rendimiento. Utilizando la métrica SaveInProgress, puedes diagnosticar si la degradación del rendimiento se debe a un proceso de almacenamiento en segundo plano.|
| **aws.elasticache.set_based_cmds** <br>(count) | Redis - Número total de comandos basados en conjuntos. Se obtiene de la estadística commandstats de Redis sumando todos los comandos que actúan sobre uno o más conjuntos.<br>_Se muestra como comando_ |
| **aws.elasticache.set_based_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos basados en conjuntos.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.set_type_cmds** <br>(count) | Redis - Número total de tipos de comandos de escritura. Se obtiene de la estadística commandstats de Redis OSS sumando todos los tipos mutativos de comandos que operan con datos (set, hset, sadd, lpop, etc.)<br>_Se muestra como comando_. |
| **aws.elasticache.set_type_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos de escritura.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.slabs_moved** <br>(count) | Memcached - Número total de páginas slab que se han movido.<br>_Se muestra como página_ |
| **aws.elasticache.sorted_set_based_cmds** <br>(count) | Redis - Número total de comandos basados en conjuntos ordenados. Se obtiene a partir de la estadística commandstats de Redis sumando todos los comandos que actúan sobre uno o más conjuntos ordenados.<br>_Se muestra como comando_ |
| **aws.elasticache.sorted_set_based_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos basados en ordenamientos.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.stream_based_cmds** <br>(count) | Redis - Número total de comandos basados en flujos.<br>_Se muestra como comando_ |
| **aws.elasticache.stream_based_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos basados en flujos.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.string_based_cmds** <br>(count) | Redis - Número total de comandos basados en cadenas. Se obtiene a partir de la estadística commandstats de Redis sumando todos los comandos que actúan sobre una o más cadenas.<br>_Se muestra como comando_ |
| **aws.elasticache.string_based_cmds_latency** <br>(gauge) | Redis - Latencia de los comandos basados en cadenas.<br>_Se muestra como microsegundo_ |
| **aws.elasticache.swap_usage** <br>(gauge) | Cantidad de intercambio utilizada en el host.<br>_Se muestra como byte_ |
| **aws.elasticache.touch_hits** <br>(count) | Memcached - Número de claves que se han tocado y a las se les ha dado un nuevo tiempo de vencimiento.<br>_Se muestra como acierto_ |
| **aws.elasticache.touch_misses** <br>(count) | Memcached - Número de elementos que se han tocado, pero no se han encontrado.<br>_Se muestra como fallido_ |
| **aws.elasticache.unused_memory** <br>(gauge) | Memcached - Cantidad de memoria no utilizada que la caché puede utilizar para almacenar elementos. Se obtiene a partir de las estadísticas memcached limit_maxbytes y bytes restando bytes de limit_maxbytes.<br>_Se muestra como byte_. |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

**Nota**: Las métricas para despliegues de ElastiCache Serverless se informan en el mismo espacio de nombres `aws.elasticache`. Estas métricas pueden distinguirse por etiquetas:

- Las métricas de ElastiCache existentes para cachés de diseño propio utilizan la etiqueta cacheclusterid para identificar una caché individual.
- Las métricas de caché serverless utilizan la etiqueta clusterid para identificar las cachés individuales

### Eventos

La integración Amazon ElastiCache incluye eventos para clúster, grupos de seguridad de caché y grupos de parámetros de caché. Consulta los siguientes ejemplos de eventos:

{{< img src="integrations/amazon_elasticache/aws_elasticache_events.png" alt="Eventos Amazon ElastiCache" >}}

### Checks de servicio

La integración Amazon ElastiCache no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorización de las métricas de rendimiento de ElastiCache con Redis o Memcached](https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached)
- [Recopilación de métricas de ElastiCache + sus métricas de Redis/Memcached](https://www.datadoghq.com/blog/collecting-elasticache-metrics-its-redis-memcached-metrics)