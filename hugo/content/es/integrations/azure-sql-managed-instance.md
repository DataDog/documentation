---
aliases:
- /es/integrations/azure_sql_managed_instance
app_id: azure-sql-managed-instance
categories:
- azure
- métricas
custom_kind: integración
description: Utiliza la integración de SQL Managed Instance para rastrear la utilización
  y la actividad de tus bases de datos SQL Managed Instance.
integration_version: 1.0.0
media: []
title: Azure SQL Managed Instance
---
## Información general

Azure SQL Managed Instance es una versión totalmente gestionada del motor de base de datos del servidor de SQL empresarial. Utiliza la integración de SQL Managed Instance para rastrear la utilización y la actividad de tus bases de datos de SQL Managed Instance.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No hay más pasos de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.sql_managedinstances.count** <br>(gauge) | El número de Azure SQL Managed Instances|
| **azure.sql_managedinstances.core_count** <br>(gauge) | Count de núcleos|
| **azure.sql_managedinstances.io_requests** <br>(count) | Recuento de solicitudes de E/S<br>_Mostrado como solicitud_ |
| **azure.sql_managedinstances.io_bytes_read** <br>(count) | Bytes de E/S leídos<br>_Mostrado como byte_ |
| **azure.sql_managedinstances.avg_cpu_percent** <br>(gauge) | Porcentaje medio de CPU<br>_Mostrado como porcentaje_. |
| **azure.sql_managedinstances_databases.count** <br>(gauge) | Número de bases de datos de Azure SQL Managed Instance|
| **azure.sql_managedinstances.io_bytes_written** <br>(count) | Bytes de E/S escritos<br>_Mostrado como byte_ |
| **azure.sql_managedinstances.virtual_core_count** <br>(gauge) | Número de núcleos virtuales|
| **azure.sql_managedinstances.reserved_storage_mb** <br>(gauge) | Espacio de almacenamiento reservado|
| **azure.sql_managedinstances.storage_space_used_mb** <br>(gauge) | Espacio de almacenamiento utilizado|

### Checks de servicio

Azure SQL Managed Instance no incluye ningún check de servicio.

### Eventos

Azure SQL Managed Instance no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Optimiza el rendimiento de SQL Server con Datadog Database Monitoring ](https://www.datadoghq.com/blog/optimize-sql-server-performance-with-datadog/)
- [Documentación de Database Monitoring](https://docs.datadoghq.com/database_monitoring/)
- [Mejora el rendimiento del host de la base de datos y de las consultas con las recomendaciones de Database Monitoring ](https://www.datadoghq.com/blog/database-monitoring-recommendations/)