---
aliases:
- /es/integrations/azure_redis_cache
app_id: azure-redis-cache
categories:
- azure
- almacenamiento en caché
- nube
custom_kind: integración
description: Azure Redis Cache es una caché de datos gestionada para tus aplicaciones
  Azure
media: []
title: Azure Redis Cache
---
## Información general

Azure Redis Cache es una caché de datos gestionados para tus aplicaciones de Azure.

Obtén métricas de Azure Redis Cache para:

- Visualizar el rendimiento de tus Redis Caches.
- Correlacionar el rendimiento de tus Redis Caches con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.cache_redis.count** <br>(gauge) | El count de todos los recursos de Azure Redis Cache.|
| **azure.cache_redis.cache_read** <br>(gauge) | La cantidad de datos leídos de la caché en bytes por segundo<br>_Mostrado como byte_ |
| **azure.cache_redis.cache_write** <br>(gauge) | La cantidad de datos escritos en la caché en bytes por segundo<br>_Mostrado como byte_ |
| **azure.cache_redis.cachehits** <br>(count) | Número de búsquedas de claves realizadas con éxito<br>_Mostrado como éxito_ |
| **azure.cache_redis.cachemisses** <br>(count) | El número de búsquedas de claves fallidas<br>_Mostrado como fallido_ |
| **azure.cache_redis.connectedclients** <br>(count) | El número de conexiones de clientes a la caché<br>_Mostrado como connection (conexión)_ |
| **azure.cache_redis.evictedkeys** <br>(count) | El número de elementos desalojados de la caché<br>_Mostrado como clave_ |
| **azure.cache_redis.expiredkeys** <br>(count) | El número de elementos caducados de la caché<br>_Mostrado como clave_ |
| **azure.cache_redis.getcommands** <br>(count) | El número de operaciones de obtención de la caché<br>_Mostrado como obtención_ |
| **azure.cache_redis.percent_processor_time** <br>(gauge) | La utilización de la CPU del servidor Azure Redis Cache como porcentaje<br>_Mostrado como porcentaje_. |
| **azure.cache_redis.server_load** <br>(gauge) | Porcentaje de ciclos en los que el servidor Redis está ocupado procesando y no esperando mensajes<br>_Mostrado como porcentaje_. |
| **azure.cache_redis.setcommands** <br>(count) | El número de operaciones de configuración a la caché<br>_Mostrado como configuración_ |
| **azure.cache_redis.totalcommandsprocessed** <br>(count) | El número total de comandos procesados por el servidor de caché<br>_Mostrado como operación_ |
| **azure.cache_redis.totalkeys** <br>(count) | El número total de claves en la caché<br>_Mostrado como clave_ |
| **azure.cache_redis.usedmemory** <br>(gauge) | La cantidad de memoria caché utilizada para los pares clave/valor en la caché en bytes<br>_Mostrado como byte_ |
| **azure.cache_redis.usedmemory_rss** <br>(gauge) | Cantidad de memoria caché utilizada en bytes durante el intervalo de notificación especificado, incluida la fragmentación y los metadatos<br>_Mostrado como byte_ |
| **azure.cache_redis.cache_latency** <br>(gauge) | La latencia a la caché en microsegundos<br>_Mostrado como microsegundo_ |
| **azure.cache_redis.cachemissrate** <br>(gauge) | Porcentaje de búsquedas fallidas de claves<br>_Mostrada como porcentaje_ |
| **azure.cache_redis.errors** <br>(count) | El número de errores en Azure Redis Cache<br>_Mostrado como error_ |
| **azure.cache_redis.usedmemorypercentage** <br>(gauge) | El porcentaje de memoria caché utilizado para pares clave/valor en la caché en bytes<br>_Mostrado como porcentaje_. |
| **azure.cache_redis.cpu_instance_based** <br>(gauge) | <br>_Mostrado como porcentaje_ |
| **azure.cache_redis.gets_instance_based** <br>(count) | <br>_Mostrado como obtención_ |
| **azure.cache_redis.sets_instance_based** <br>(count) | <br>_Mostrado como conjunto_ |
| **azure.cache_redis.operations_per_second** <br>(gauge) | <br>_Mostrado como operación_ |
| **azure.cache_redis.geo_replication_healthy** <br>(count) | |
| **azure.cache_redis.cache_hits_instance_based** <br>(count) | <br>_Mostrado como éxito_ |
| **azure.cache_redis.cache_read_instance_based** <br>(gauge) | <br>_Mostrado como byte_ |
| **azure.cache_redis.total_keys_instance_based** <br>(count) | <br>_Mostrado como llave_ |
| **azure.cache_redis.cache_write_instance_based** <br>(gauge) | <br>_Mostrado como byte_ |
| **azure.cache_redis.server_load_instance_based** <br>(gauge) | <br>_Mostrado como porcentaje_ |
| **azure.cache_redis.used_memory_instance_based** <br>(gauge) | <br>_Mostrado como byte_ |
| **azure.cache_redis.cache_misses_instance_based** <br>(count) | <br>_Mostrado como fallido_ |
| **azure.cache_redis.evicted_keys_instance_based** <br>(count) | <br>_Mostrado como clave_ |
| **azure.cache_redis.expired_keys_instance_based** <br>(count) | <br>_Mostrado como clave_ |
| **azure.cache_redis.used_memory_rss_instance_based** <br>(gauge) | <br>_Mostrado como byte_ |
| **azure.cache_redis.total_operations_instance_based** <br>(count) | <br>_Mostrado como operación_ |
| **azure.cache_redis.connected_clients_instance_based** <br>(count) | <br>_Mostrado como connection (conexión)_ |
| **azure.cache_redis.connections_created_per_second_instance_based** <br>(gauge) | <br>_Mostrado como connection (conexión)_ |
| **azure.cache_redis.connections_closed_per_second_instance_based** <br>(gauge) | <br>_Mostrado como connection (conexión)_ |
| **azure.cache_redis.operations_per_second_instance_based** <br>(gauge) | <br>_Mostrado como operación_ |
| **azure.cache_redis.used_memory_percentage_instance_based** <br>(gauge) | <br>_Mostrado como porcentaje_ |
| **azure.cache_redis.geo_replication_data_sync_offset** <br>(gauge) | |
| **azure.cache_redis.geo_replication_connectivity_lag** <br>(gauge) | |
| **azure.cache_redis.geo_replication_full_sync_event_started** <br>(count) | |
| **azure.cache_redis.geo_replication_full_sync_event_finished** <br>(count) | |
| **azure.cache_redisenterprise.count** <br>(gauge) | El count de todos los recursos de Azure Redis Cache.|
| **azure.cache_redisenterprise.cachehits** <br>(count) | Número de búsquedas de claves realizadas con éxito<br>_Mostrado como éxito_ |
| **azure.cache_redisenterprise.cache_latency** <br>(rate) | La latencia a la caché en microsegundos<br>_Mostrado como microsegundo_ |
| **azure.cache_redisenterprise.cachemisses** <br>(count) | El número de búsquedas de claves fallidas<br>_Mostrado como fallido_ |
| **azure.cache_redisenterprise.cache_read** <br>(gauge) | La cantidad de datos leídos de la caché en bytes por segundo<br>_Mostrado como byte_ |
| **azure.cache_redisenterprise.cache_write** <br>(gauge) | La cantidad de datos escritos en la caché en bytes por segundo<br>_Mostrado como byte_ |
| **azure.cache_redisenterprise.connectedclients** <br>(count) | El número de conexiones de clientes a la caché<br>_Mostrado como connection (conexión)_ |
| **azure.cache_redisenterprise.errors** <br>(gauge) | El número de errores en Azure Redis Cache<br>_Mostrado como error_ |
| **azure.cache_redisenterprise.evictedkeys** <br>(count) | El número de elementos desalojados de la caché<br>_Mostrado como clave_ |
| **azure.cache_redisenterprise.expiredkeys** <br>(count) | El número de elementos caducados de la caché<br>_Mostrado como clave_ |
| **azure.cache_redisenterprise.geo_replication_healthy** <br>(gauge) | |
| **azure.cache_redisenterprise.getcommands** <br>(count) | El número de operaciones de obtención de la caché<br>_Mostrado como obtención_ |
| **azure.cache_redisenterprise.operations_per_second** <br>(gauge) | <br>_Mostrado como operación_ |
| **azure.cache_redisenterprise.percent_processor_time** <br>(gauge) | La utilización de la CPU del servidor Azure Redis Cache como porcentaje<br>_Mostrado como porcentaje_. |
| **azure.cache_redisenterprise.server_load** <br>(gauge) | Porcentaje de ciclos en los que el servidor Redis está ocupado procesando y no esperando mensajes<br>_Mostrado como porcentaje_. |
| **azure.cache_redisenterprise.setcommands** <br>(count) | El número de operaciones de configuración a la caché<br>_Mostrado como configuración_ |
| **azure.cache_redisenterprise.totalcommandsprocessed** <br>(count) | El número total de comandos procesados por el servidor de caché<br>_Mostrado como operación_ |
| **azure.cache_redisenterprise.totalkeys** <br>(count) | El número total de claves en la caché<br>_Mostrado como clave_ |
| **azure.cache_redisenterprise.usedmemory** <br>(gauge) | La cantidad de memoria caché utilizada para los pares clave/valor en la caché en bytes<br>_Mostrado como byte_ |
| **azure.cache_redisenterprise.usedmemorypercentage** <br>(gauge) | Porcentaje de memoria caché utilizado para pares clave/valor en la caché en bytes<br>_Mostrado como porcentaje_. |

### Eventos

La integración Azure Redis Cache no incluye ningún evento.

### Checks de servicio

La integración Azure Redis Cache no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).