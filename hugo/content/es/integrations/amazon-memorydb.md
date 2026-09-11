---
aliases:
- /es/integrations/amazon_memorydb
app_id: amazon-memorydb
categories:
- aws
- nube
- métricas
- almacenes de datos
custom_kind: integración
description: Amazon MemoryDB es un servicio de base de datos en memoria compatible
  con Redis totalmente administrado.
further_reading:
- link: https://www.datadoghq.com/blog/amazon-memorydb-integration/
  tag: blog
  text: Monitorizar Amazon MemoryDB con Datadog
media: []
title: Amazon MemoryDB
---
## Información general

Amazon MemoryDB para Redis es un servicio de base de datos duradera en memoria que ofrece rendimiento en memoria y durabilidad en varias zonas de disponibilidad.

Habilita esta integración para ver todas tus métricas de MemoryDB en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MemoryDB` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon MemoryDB](https://app.datadoghq.com/integrations/amazon-memorydb).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.memorydb.active_defrag_hits** <br>(count) | Número de reasignaciones de valores por minuto realizadas por el proceso de desfragmentación activo.|
| **aws.memorydb.authentication_failures** <br>(count) | Número total de intentos fallidos de autenticación en Redis mediante el comando AUTH.|
| **aws.memorydb.bytes_read_from_disk** <br>(count) | El número total de bytes leídos del disco por minuto. Solo se admite para clústeres que utilicen agrupación de datos por niveles.<br>_Se muestra como byte_ |
| **aws.memorydb.bytes_used_for_memory_db** <br>(gauge) | El número total de bytes asignados por MemoryDB a todos los efectos.<br>_Se muestra como byte_ |
| **aws.memorydb.bytes_written_to_disk** <br>(count) | El número total de bytes escritos en disco por minuto. Solo se admite para clústeres que utilicen agrupación de datos por niveles.<br>_Se muestra como byte_ |
| **aws.memorydb.channel_authorization_failures** <br>(count) | Número total de intentos fallidos de los usuarios para acceder a canales a los que no tienen permiso de acceso.|
| **aws.memorydb.command_authorization_failures** <br>(count) | El número total de intentos fallidos por parte de los usuarios de ejecutar comandos para los que no tienen permiso.|
| **aws.memorydb.cpuutilization** <br>(gauge) | El porcentaje medio de utilización de la CPU para todo el host.<br>_Se muestra como porcentaje_ |
| **aws.memorydb.curr_connections** <br>(gauge) | El número de conexiones de clientes, excluyendo las conexiones de réplicas de lectura. MemoryDB utiliza de dos a cuatro de las conexiones para monitorizar el clúster en cada caso.<br>_Se muestra como conexión_ |
| **aws.memorydb.curr_items** <br>(gauge) | El número de elementos de la caché.|
| **aws.memorydb.database_memory_usage_percentage** <br>(gauge) | Porcentaje de la memoria disponible para el clúster que está en uso.<br>_Se muestra como porcentaje_ |
| **aws.memorydb.db0_average_ttl** <br>(gauge) | El TTL medio de las claves con una caducidad establecida en DB0. Solo aplicable a nodos primarios.<br>_Se muestra como milisegundo_ |
| **aws.memorydb.engine_cpuutilization** <br>(gauge) | Proporciona la utilización de la CPU del subproceso del motor de Redis. Dado que Redis es de un solo subproceso, puedes utilizar esta métrica para analizar la carga del propio proceso de Redis.<br>_Se muestra como porcentaje_ |
| **aws.memorydb.eval_based_cmds** <br>(count) | El número total de comandos para comandos basados en eval. Se obtiene de las estadísticas de Redis commandstats sumando eval, evalsha.|
| **aws.memorydb.evictions** <br>(count) | El número de claves que han sido desalojadas debido al límite maxmemory.|
| **aws.memorydb.freeable_memory** <br>(gauge) | La cantidad de memoria libre disponible en el host.<br>_Se muestra como byte_ |
| **aws.memorydb.geo_spatial_based_cmds** <br>(count) | El número total de comandos para comandos de tipo geospacial. Se obtiene de las estadísticas commandstats de Redis, sumando todos los comandos de tipo geo: geoadd, geodist, geohash, geopos, georadius y georadiusbymember.|
| **aws.memorydb.get_type_cmds** <br>(count) | El número total de comandos de tipo read-only. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos read-only (get, hget, scard, lrange, etc.).|
| **aws.memorydb.hash_based_cmds** <br>(count) | El número total de comandos basados en hash. Se obtiene de las estadísticas de Redis commandstats sumando todos los comandos que actúan sobre uno o más hashes (hget, hkeys, hvals, hdel, etc.).|
| **aws.memorydb.hyper_log_log_based_cmds** <br>(count) | El número total de comandos basados en HyperLogLog. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos de tipo pf (pfadd, pfcount, pfmerge, etc.).|
| **aws.memorydb.iam_authentication_expirations** <br>(count) | Número total de conexiones de Redis autenticadas por IAM caducadas.|
| **aws.memorydb.iam_authentication_throttling** <br>(count) | Número total de solicitudes AUTH o HELLO de Redis autenticadas por IAM.|
| **aws.memorydb.is_primary** <br>(gauge) | Indica si el nodo es el nodo primario de la partición actual. La métrica puede ser 0 (no primario) o 1 (primario).|
| **aws.memorydb.json_based_cmds** <br>(count) | El número total de comandos basados en JSON. Se obtiene de las estadísticas de Redis commandstats sumando todos los comandos que actúan sobre uno o más objetos de documento JSON.|
| **aws.memorydb.json_based_get_cmds** <br>(count) | El número total de comandos JSON de solo lectura. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos de lectura JSON que actúan sobre claves JSON.|
| **aws.memorydb.json_based_set_cmds** <br>(count) | El número total de comandos de escritura JSON. Se obtiene de las estadísticas de Redis commandstats sumando todos los comandos de escritura JSON que actúan sobre claves JSON.|
| **aws.memorydb.key_authorization_failures** <br>(count) | El número total de intentos fallidos de los usuarios para acceder a claves a las que no tienen permiso de acceso.|
| **aws.memorydb.key_based_cmds** <br>(count) | El número total de comandos basados en claves. Se obtiene de las estadísticas de Redis commandstats sumando todos los comandos que actúan sobre una o más claves a través de múltiples estructuras de datos (del, expire, rename, etc.).|
| **aws.memorydb.keys_tracked** <br>(count) | El número de claves que están siendo rastreadas por el seguimiento de claves de Redis. Está limitado por el parámetro tracking-table-max-keys.|
| **aws.memorydb.keyspace_hits** <br>(count) | El número de búsquedas exitosas de claves de solo lectura en el diccionario principal.|
| **aws.memorydb.keyspace_misses** <br>(count) | Número de búsquedas fallidas de claves de solo lectura en el diccionario principal.|
| **aws.memorydb.list_based_cmds** <br>(count) | El número total de comandos basados en listas. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos que actúan sobre una o más listas (lindex, lrange, lpush, ltrim, etc.).|
| **aws.memorydb.max_replication_throughput** <br>(gauge) | El máximo rendimiento de replicación observado durante el último ciclo de medición.<br>_Se muestra como byte_ |
| **aws.memorydb.memory_fragmentation_ratio** <br>(gauge) | La relación entre el tamaño del conjunto residente de Redis y la cantidad de memoria asignada. Un ratio inferior a 1.0 indica uso de swap, lo que hace que Redis sea más lento. Se calcula a partir de la estadística `mem_fragmentation_ratio` de Redis INFO.|
| **aws.memorydb.network_bandwidth_in_allowance_exceeded** <br>(count) | El número de paquetes formados porque el ancho de banda agregado entrante excedió el máximo para la instancia.<br>_Se muestra como paquete_ |
| **aws.memorydb.network_bandwidth_out_allowance_exceeded** <br>(count) | El número de paquetes formados porque el ancho de banda agregado de salida excedió el máximo para la instancia.<br>_Se muestra como paquete_ |
| **aws.memorydb.network_bytes_in** <br>(count) | El número de bytes que el host ha leído de la red.<br>_Se muestra como byte_ |
| **aws.memorydb.network_bytes_out** <br>(count) | El número de bytes enviados en todas las interfaces de red por la instancia.<br>_Se muestra como byte_ |
| **aws.memorydb.network_conntrack_allowance_exceeded** <br>(count) | El número de paquetes formados porque el seguimiento de conexión superó el máximo para la instancia y no se pudieron establecer nuevas conexiones.<br>_Se muestra como paquete_ |
| **aws.memorydb.network_packets_in** <br>(count) | El número de paquetes recibidos en todas las interfaces de red por la instancia.<br>_Se muestra como paquete_ |
| **aws.memorydb.network_packets_out** <br>(count) | El número de paquetes enviados en todas las interfaces de red por la instancia.<br>_Se muestra como paquete_ |
| **aws.memorydb.network_packets_per_second_allowance_exceeded** <br>(count) | El número de paquetes formados porque los paquetes bidireccionales por segundo excedieron el máximo para la instancia.<br>_Se muestra como paquete_ |
| **aws.memorydb.new_connections** <br>(count) | El número total de conexiones que han sido aceptadas por el servidor durante este periodo.<br>_Se muestra como conexión_ |
| **aws.memorydb.non_key_type_cmds** <br>(count) | El número total de comandos que no están basados en una clave. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos que no actúan sobre una clave, por ejemplo, acl, dbsize o info.|
| **aws.memorydb.num_items_read_from_disk** <br>(count) | El número total de elementos recuperados del disco por minuto. Solo se admite en clústeres que utilicen agrupación de datos por niveles.|
| **aws.memorydb.num_items_written_to_disk** <br>(count) | El número total de elementos escritos en disco por minuto. Solo se admite en clústeres que utilicen agrupación de datos por niveles.|
| **aws.memorydb.primary_link_health_status** <br>(gauge) | Este estado tiene dos valores: 0 o 1. El valor 0 indica que los datos en el nodo primario de MemoryDB no están sincronizados con Redis en EC2. El valor 1 indica que los datos están sincronizados.|
| **aws.memorydb.pub_sub_based_cmds** <br>(count) | El número total de comandos para la funcionalidad pub/sub. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos utilizados para la funcionalidad pub/sub: psubscribe, publish, pubsub, punsubscribe, subscribe y unsubscribe.|
| **aws.memorydb.reclaimed** <br>(count) | El número total de eventos de expiración de claves.|
| **aws.memorydb.replication_bytes** <br>(count) | El número de bytes que el primario está enviando a todas sus réplicas.<br>_Se muestra como byte_ |
| **aws.memorydb.replication_delayed_write_commands** <br>(count) | Número de comandos que se retrasaron debido a que se superó el rendimiento máximo de replicación.|
| **aws.memorydb.replication_lag** <br>(gauge) | La cantidad de retraso, en segundos, entre la aplicación de cambios al nodo primario y la aplicación de cambios a una réplica de lectura. Solo aplicable para un nodo que se ejecuta como réplica de lectura.<br>_Se muestra como segundo_ |
| **aws.memorydb.set_based_cmds** <br>(count) | El número total de comandos basados en conjuntos. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos que actúan sobre uno o más conjuntos (scard, sdiff, sadd, sunion, etc.).|
| **aws.memorydb.set_type_cmds** <br>(count) | El número total de comandos de tipo escritura. Se obtiene de las estadísticas de Redis commandstats sumando todos los tipos de comandos mutativos que operan con datos (set, hset, sadd, lpop, etc.).|
| **aws.memorydb.sorted_set_based_cmds** <br>(count) | El número total de comandos basados en conjuntos ordenados. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos que actúan sobre uno o más conjuntos ordenados (zcount, zrange, zrank, zadd, etc.).|
| **aws.memorydb.stream_based_cmds** <br>(count) | El número total de comandos basados en flujos. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos que actúan sobre uno o más tipos de datos de flujo (xrange, xlen, xadd, xdel, etc.).|
| **aws.memorydb.string_based_cmds** <br>(count) | El número total de comandos basados en cadenas. Se obtiene de las estadísticas commandstats de Redis sumando todos los comandos que actúan sobre una o más cadenas (strlen, setex, setrange, etc.).|
| **aws.memorydb.swap_usage** <br>(gauge) | La cantidad de intercambio utilizado en el host.<br>_Se muestra como byte_ |

### Eventos

La integración de Amazon MemoryDB no incluye ningún evento.

### Checks de servicio

La integración de Amazon MemoryDB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza Amazon MemoryDB con Datadog](https://www.datadoghq.com/blog/amazon-memorydb-integration/)