---
aliases:
- /es/integrations/azure_db_for_mariadb
app_id: azure-dbformariadb
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas principales de Azure DB for MariaDB.
media: []
title: Azure DB para MariaDB
---
## Información general

Azure Database for MariaDB proporciona una base de datos como servicio MariaDB comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure Database for MariaDB para:

- Visualizar el rendimiento de tus bases de datos MariaDB
- Correlacionar el rendimiento de tus bases de datos MariaDB con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.dbformariadb_servers.active_connections** <br>(count) | Conexiones activas<br>_Se muestra como conexión_ |
| **azure.dbformariadb_servers.backup_storage_used** <br>(gauge) | Cantidad de almacenamiento de copia de seguridad utilizado<br>_Se muestra como byte_ |
| **azure.dbformariadb_servers.connections_failed** <br>(count) | Conexiones fallidas<br>_Se muestra como conexión_ |
| **azure.dbformariadb_servers.count** <br>(gauge) | El recuento de recursos de Azure DB para MariaDB|
| **azure.dbformariadb_servers.cpu_percent** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.dbformariadb_servers.io_consumption_percent** <br>(gauge) | Porcentaje de E/S<br>_Se muestra en porcentaje_ |
| **azure.dbformariadb_servers.memory_percent** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.dbformariadb_servers.network_bytes_egress** <br>(gauge) | Salida de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbformariadb_servers.network_bytes_ingress** <br>(gauge) | Entrada de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbformariadb_servers.seconds_behind_master** <br>(gauge) | El número de segundos que un servidor de réplica va por detrás de su servidor fuente<br>_Se muestra como byte_ |
| **azure.dbformariadb_servers.serverlog_storage_limit** <br>(gauge) | Límite de almacenamiento de ServerLog<br>_Se muestra como byte_ |
| **azure.dbformariadb_servers.serverlog_storage_percent** <br>(gauge) | Porcentaje de almacenamiento de ServerLog<br>_Se muestra en porcentaje_ |
| **azure.dbformariadb_servers.serverlog_storage_usage** <br>(gauge) | Almacenamiento utilizado de ServerLog<br>_Se muestra como byte_ |
| **azure.dbformariadb_servers.storage_limit** <br>(gauge) | Límite de almacenamiento<br>_Se muestra como byte_ |
| **azure.dbformariadb_servers.storage_percent** <br>(gauge) | Porcentaje de almacenamiento<br>_Se muestra como porcentaje_ |
| **azure.dbformariadb_servers.storage_used** <br>(gauge) | Almacenamiento utilizado<br>_Se muestra como byte_ |

### Eventos

La integración Azure Database for MariaDB no incluye eventos.

### Checks de servicio

La integración Azure Database for MariaDB no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).