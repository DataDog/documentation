---
aliases:
- /es/integrations/azure_sql_elastic_pool
app_id: azure-sql-elastic-pool
categories:
- azure
- nube
- almacenes de datos
- aprovisionamiento
custom_kind: integración
description: Los pools elásticos proporcionan una solución simple y rentable para
  gestionar el rendimiento de múltiples bases de datos.
media: []
title: Azure SQL Elastic Pool
---
## Información general

Los pools elásticos proporcionan una solución simple y rentable para gestionar el rendimiento de múltiples bases de datos.

Obtén métricas de Azure SQL Elastic Pool para:

- Visualizar el rendimiento de tus SQL Elastic Pools.
- Correlacionar el rendimiento de tus SQL Elastic Pools con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.sql_servers_elasticpools.cpu_percent** <br>(gauge) | Utilización media del cálculo en porcentaje del límite del grupo<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_elasticpools.data_space_allocated** <br>(gauge) | Espacio de datos asignado<br>_Mostrado como byte_ |
| **azure.sql_servers_elasticpools.data_space_allocated_percent** <br>(gauge) | Porcentaje asignado de espacio de datos<br>_Mostrado como porcentaje_ |
| **azure.sql_servers_elasticpools.dtu_consumption_percent** <br>(gauge) | Utilización media de eDTU en porcentaje del límite de eDTU para el grupo<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_elasticpools.e_dtu_limit** <br>(gauge) | Ajuste máximo actual de DTU para este grupo elástico<br>_Mostrado como unidad_ |
| **azure.sql_servers_elasticpools.e_dtu_used** <br>(gauge) | Promedio de eDTU utilizados por el grupo<br>_Mostrado como unidad_ |
| **azure.sql_servers_elasticpools.in_memory_oltp_storage_percent** <br>(gauge) | Porcentaje de almacenamiento OLTP en memoria<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_elasticpools.log_write_percent** <br>(gauge) | Utilización media de los recursos de escritura en porcentaje del límite del grupo<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_elasticpools.physical_data_read_percent** <br>(gauge) | Utilización media de E/S en porcentaje basada en el límite del grupo<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_elasticpools.sessions_percent** <br>(gauge) | Sesiones concurrentes máximas en porcentaje basado en el límite del grupo<br>_Mostrado como porcentaje_ |
| **azure.sql_servers_elasticpools.sql_instance_cpu_percent** <br>(gauge) | Uso máximo de cómputo por todas las cargas de trabajo de usuario y sistema. Se aplica a los grupos elásticos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_elasticpools.storage_limit** <br>(gauge) | Límite máximo actual de almacenamiento para este grupo elástico en megabytes durante este intervalo<br>_Mostrado como byte_ |
| **azure.sql_servers_elasticpools.storage_percent** <br>(gauge) | Límite máximo actual de almacenamiento para este grupo elástico<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_elasticpools.storage_used** <br>(gauge) | Almacenamiento medio utilizado por el grupo en este intervalo en bytes<br>_Mostrado como byte_ |
| **azure.sql_servers_elasticpools.workers_percent** <br>(gauge) | Trabajadores concurrentes máximos (solicitudes) en porcentaje basado en el límite del grupo<br>_Mostrado como porcentaje_. |

### Eventos

La integración Azure SQL Elastic Pools no incluye eventos.

### Checks de servicio

La integración Azure SQL Elastic Pools no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).