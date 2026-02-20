---
app_id: amazon_documentdb
categories:
- nube
- almacenes de datos
- aws
- recopilación de logs
custom_kind: integración
description: Monitoriza métricas y logs de Amazon DocumentDB.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/
  tag: Blog
  text: Recopila métricas y logs de Amazon DocumentDB con Datadog
title: Amazon DocumentDB
---
## Información general

Amazon DocumentDB es un servicio de base de datos de documentos rápida, escalable, de alta disponibilidad y totalmente gestionada que admite cargas de trabajo de MongoDB.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `DocumentDB` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon DocumentDB](https://app.datadoghq.com/integrations/amazon-documentdb).

### Recopilación de logs

#### Activar logging

Configura Amazon DocumentDB para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_documentdb` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon DocumentDB en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.docdb.backup_retention_period_storage_used** <br>(gauge) | Almacenamiento medio de copias de seguridad en GiB utilizado para admitir la función de restauración puntual dentro del periodo de retención.<br>_Se muestra como gibibytes_ |
| **aws.docdb.backup_retention_period_storage_used.maximum** <br>(gauge) | Almacenamiento máximo de copias de seguridad en GiB utilizado para admitir la función de restauración puntual dentro del periodo de retención.<br>_Se muestra como gibibytes_ |
| **aws.docdb.backup_retention_period_storage_used.minimum** <br>(gauge) | Almacenamiento mínimo de copias de seguridad en GiB utilizado para admitir la función de restauración puntual dentro del periodo de retención.<br>_Se muestra como gibibytes_ |
| **aws.docdb.backup_retention_period_storage_used.samplecount** <br>(gauge) | Recuento de muestras del almacenamiento de copias de seguridad en GiB utilizado para admitir la función de restauración puntual dentro del periodo de retención.<br>_Se muestra como gibibytes_ |
| **aws.docdb.backup_retention_period_storage_used.sum** <br>(gauge) | Almacenamiento total de copias de seguridad en GiB utilizado para admitir la función de restauración puntual dentro del periodo de retención.<br>_Se muestra como gibibytes_ |
| **aws.docdb.buffer_cache_hit_ratio** <br>(gauge) | Porcentaje medio de solicitudes atendidas por la caché del buffer.|
| **aws.docdb.buffer_cache_hit_ratio.maximum** <br>(gauge) | Porcentaje máximo de solicitudes atendidas por la caché del buffer.|
| **aws.docdb.buffer_cache_hit_ratio.minimum** <br>(gauge) | Porcentaje mínimo de solicitudes atendidas por la caché del buffer.|
| **aws.docdb.buffer_cache_hit_ratio.samplecount** <br>(gauge) | Recuento de muestras del porcentaje de solicitudes atendidas por la caché del buffer.|
| **aws.docdb.buffer_cache_hit_ratio.sum** <br>(gauge) | Suma del porcentaje de solicitudes atendidas por la caché del buffer.|
| **aws.docdb.change_stream_log_size** <br>(gauge) | Cantidad de almacenamiento utilizado por tu clúster para almacenar el log de flujos de cambio en megabytes.<br>_Se muestra como mebibytes_ |
| **aws.docdb.change_stream_log_size.average** <br>(gauge) | Cantidad de almacenamiento utilizado por tu clúster para almacenar el log de flujos de cambio en megabytes.<br>_Se muestra como mebibytes_ |
| **aws.docdb.change_stream_log_size.maximum** <br>(gauge) | Cantidad de almacenamiento utilizado por tu clúster para almacenar el log de flujos de cambio en megabytes.<br>_Se muestra como mebibytes_ |
| **aws.docdb.change_stream_log_size.minimum** <br>(gauge) | Cantidad de almacenamiento utilizado por tu clúster para almacenar el log de flujos de cambio en megabytes.<br>_Se muestra como mebibytes_ |
| **aws.docdb.change_stream_log_size.samplecount** <br>(gauge) | Cantidad de almacenamiento utilizado por tu clúster para almacenar el log de flujos de cambio en megabytes.<br>_Se muestra como mebibytes_ |
| **aws.docdb.change_stream_log_size.sum** <br>(gauge) | Cantidad de almacenamiento utilizado por tu clúster para almacenar el log de flujos de cambio en megabytes.<br>_Se muestra como mebibytes_ |
| **aws.docdb.cpucredit_balance** <br>(gauge) | Número de créditos de CPU que una instancia ha acumulado. Este saldo se agota cuando la CPU está en plena ejecución y los créditos de CPU se gastan más rápido de lo que se ganan.|
| **aws.docdb.cpucredit_balance.average** <br>(gauge) | Número de créditos de CPU que una instancia ha acumulado. Este saldo se agota cuando la CPU está en plena ejecución y los créditos de CPU se gastan más rápido de lo que se ganan.|
| **aws.docdb.cpucredit_balance.maximum** <br>(gauge) | Número de créditos de CPU que una instancia ha acumulado. Este saldo se agota cuando la CPU está en plena ejecución y los créditos de CPU se gastan más rápido de lo que se ganan.|
| **aws.docdb.cpucredit_balance.minimum** <br>(gauge) | Número de créditos de CPU que una instancia ha acumulado. Este saldo se agota cuando la CPU está en plena ejecución y los créditos de CPU se gastan más rápido de lo que se ganan.|
| **aws.docdb.cpucredit_balance.samplecount** <br>(gauge) | Número de créditos de CPU que una instancia ha acumulado. Este saldo se agota cuando la CPU está en plena ejecución y los créditos de CPU se gastan más rápido de lo que se ganan.|
| **aws.docdb.cpucredit_balance.sum** <br>(gauge) | Número de créditos de CPU que una instancia ha acumulado. Este saldo se agota cuando la CPU está en plena ejecución y los créditos de CPU se gastan más rápido de lo que se ganan.|
| **aws.docdb.cpucredit_usage** <br>(count) | Número de créditos de CPU gastados durante el periodo de medición.|
| **aws.docdb.cpucredit_usage.average** <br>(count) | Número de créditos de CPU gastados durante el periodo de medición.|
| **aws.docdb.cpucredit_usage.maximum** <br>(count) | Número de créditos de CPU gastados durante el periodo de medición.|
| **aws.docdb.cpucredit_usage.minimum** <br>(count) | Número de créditos de CPU gastados durante el periodo de medición.|
| **aws.docdb.cpucredit_usage.samplecount** <br>(count) | Número de créditos de CPU gastados durante el periodo de medición.|
| **aws.docdb.cpucredit_usage.sum** <br>(count) | Número de créditos de CPU gastados durante el periodo de medición.|
| **aws.docdb.cpusurplus_credit_balance** <br>(gauge) | Número de créditos de CPU excedentes gastados para mantener el rendimiento de la CPU cuando el valor de CPUCreditBalance es cero.|
| **aws.docdb.cpusurplus_credit_balance.average** <br>(gauge) | Número de créditos de CPU excedentes gastados para mantener el rendimiento de la CPU cuando el valor de CPUCreditBalance es cero.|
| **aws.docdb.cpusurplus_credit_balance.maximum** <br>(gauge) | Número de créditos de CPU excedentes gastados para mantener el rendimiento de la CPU cuando el valor de CPUCreditBalance es cero.|
| **aws.docdb.cpusurplus_credit_balance.minimum** <br>(gauge) | Número de créditos de CPU excedentes gastados para mantener el rendimiento de la CPU cuando el valor de CPUCreditBalance es cero.|
| **aws.docdb.cpusurplus_credit_balance.samplecount** <br>(gauge) | Número de créditos de CPU excedentes gastados para mantener el rendimiento de la CPU cuando el valor de CPUCreditBalance es cero.|
| **aws.docdb.cpusurplus_credit_balance.sum** <br>(gauge) | Número de créditos de CPU excedentes gastados para mantener el rendimiento de la CPU cuando el valor de CPUCreditBalance es cero.|
| **aws.docdb.cpusurplus_credits_charged** <br>(count) | Número de créditos de CPU excedentes que superan el número máximo de créditos de CPU que se pueden ganar en un periodo de 24 horas y que, por tanto, conllevan un cargo adicional.|
| **aws.docdb.cpusurplus_credits_charged.average** <br>(count) | Número de créditos de CPU excedentes que superan el número máximo de créditos de CPU que se pueden ganar en un periodo de 24 horas y que, por tanto, conllevan un cargo adicional.|
| **aws.docdb.cpusurplus_credits_charged.maximum** <br>(count) | Número de créditos de CPU excedentes que superan el número máximo de créditos de CPU que se pueden ganar en un periodo de 24 horas y que, por tanto, conllevan un cargo adicional.|
| **aws.docdb.cpusurplus_credits_charged.minimum** <br>(count) | Número de créditos de CPU excedentes que superan el número máximo de créditos de CPU que se pueden ganar en un periodo de 24 horas y que, por tanto, conllevan un cargo adicional.|
| **aws.docdb.cpusurplus_credits_charged.samplecount** <br>(count) | Número de créditos de CPU excedentes que superan el número máximo de créditos de CPU que se pueden ganar en un periodo de 24 horas y que, por tanto, conllevan un cargo adicional.|
| **aws.docdb.cpusurplus_credits_charged.sum** <br>(count) | Número de créditos de CPU excedentes que superan el número máximo de créditos de CPU que se pueden ganar en un periodo de 24 horas y que, por tanto, conllevan un cargo adicional.|
| **aws.docdb.cpuutilization** <br>(gauge) | Porcentaje medio de CPU utilizado por una instancia.|
| **aws.docdb.cpuutilization.maximum** <br>(gauge) | Porcentaje máximo de CPU utilizado por una instancia.|
| **aws.docdb.cpuutilization.minimum** <br>(gauge) | Porcentaje mínimo de CPU utilizado por una instancia.|
| **aws.docdb.cpuutilization.samplecount** <br>(gauge) | Recuento de muestras del porcentaje de CPU utilizado por una instancia.|
| **aws.docdb.cpuutilization.sum** <br>(gauge) | Suma del porcentaje de CPU utilizado por una instancia.|
| **aws.docdb.database_connections** <br>(gauge) | Número medio de conexiones a una instancia.|
| **aws.docdb.database_connections.maximum** <br>(gauge) | Número máximo de conexiones a una instancia.|
| **aws.docdb.database_connections.minimum** <br>(gauge) | Número mínimo de conexiones a una instancia.|
| **aws.docdb.database_connections.samplecount** <br>(gauge) | Recuento de muestras del número de conexiones a una instancia.|
| **aws.docdb.database_connections.sum** <br>(gauge) | Suma del número de conexiones a una instancia.|
| **aws.docdb.database_connections_max** <br>(gauge) | Número máximo de conexiones de base de datos abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.database_connections_max.average** <br>(gauge) | Número máximo de conexiones de base de datos abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.database_connections_max.maximum** <br>(gauge) | Número máximo de conexiones de base de datos abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.database_connections_max.minimum** <br>(gauge) | Número máximo de conexiones de base de datos abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.database_connections_max.samplecount** <br>(gauge) | Número máximo de conexiones de base de datos abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.database_connections_max.sum** <br>(gauge) | Número máximo de conexiones de base de datos abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.database_cursors** <br>(gauge) | Número de cursores abiertos en una instancia tomada con una frecuencia de un minuto.|
| **aws.docdb.database_cursors.average** <br>(gauge) | Número de cursores abiertos en una instancia tomada con una frecuencia de un minuto.|
| **aws.docdb.database_cursors.maximum** <br>(gauge) | Número de cursores abiertos en una instancia tomada con una frecuencia de un minuto.|
| **aws.docdb.database_cursors.minimum** <br>(gauge) | Número de cursores abiertos en una instancia tomada con una frecuencia de un minuto.|
| **aws.docdb.database_cursors.samplecount** <br>(gauge) | Número de cursores abiertos en una instancia tomada con una frecuencia de un minuto.|
| **aws.docdb.database_cursors.sum** <br>(gauge) | Número de cursores abiertos en una instancia tomada con una frecuencia de un minuto.|
| **aws.docdb.database_cursors_max** <br>(gauge) | Número máximo de cursores abiertos en una instancia en un periodo de un minuto.|
| **aws.docdb.database_cursors_max.average** <br>(gauge) | Número máximo de cursores abiertos en una instancia en un periodo de un minuto.|
| **aws.docdb.database_cursors_max.maximum** <br>(gauge) | Número máximo de cursores abiertos en una instancia en un periodo de un minuto.|
| **aws.docdb.database_cursors_max.minimum** <br>(gauge) | Número máximo de cursores abiertos en una instancia en un periodo de un minuto.|
| **aws.docdb.database_cursors_max.samplecount** <br>(gauge) | Número máximo de cursores abiertos en una instancia en un periodo de un minuto.|
| **aws.docdb.database_cursors_max.sum** <br>(gauge) | Número máximo de cursores abiertos en una instancia en un periodo de un minuto.|
| **aws.docdb.database_cursors_timed_out** <br>(gauge) | Número de cursores que han excedido el tiempo de espera en un periodo de un minuto.|
| **aws.docdb.database_cursors_timed_out.average** <br>(gauge) | Número de cursores que han excedido el tiempo de espera en un periodo de un minuto.|
| **aws.docdb.database_cursors_timed_out.maximum** <br>(gauge) | Número de cursores que han excedido el tiempo de espera en un periodo de un minuto.|
| **aws.docdb.database_cursors_timed_out.minimum** <br>(gauge) | Número de cursores que han excedido el tiempo de espera en un periodo de un minuto.|
| **aws.docdb.database_cursors_timed_out.samplecount** <br>(gauge) | Número de cursores que han excedido el tiempo de espera en un periodo de un minuto.|
| **aws.docdb.database_cursors_timed_out.sum** <br>(gauge) | Número de cursores que han excedido el tiempo de espera en un periodo de un minuto.|
| **aws.docdb.db_instance_replica_lag** <br>(gauge) | Cantidad media de retraso al replicar actualizaciones desde la instancia primaria de una réplica.<br>_Se muestra como milisegundos_ |
| **aws.docdb.db_instance_replica_lag.maximum** <br>(gauge) | Cantidad máxima de retraso al replicar actualizaciones desde la instancia primaria de una réplica.<br>_Se muestra como milisegundos_ |
| **aws.docdb.db_instance_replica_lag.minimum** <br>(gauge) | Cantidad mínima de retraso al replicar actualizaciones desde la instancia primaria de una réplica.<br>_Se muestra como milisegundos_ |
| **aws.docdb.db_instance_replica_lag.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de retraso al replicar actualizaciones desde la instancia primaria de una réplica.<br>_Se muestra como milisegundos_ |
| **aws.docdb.db_instance_replica_lag.sum** <br>(gauge) | Suma de la cantidad de retraso al replicar actualizaciones desde la instancia primaria de una réplica.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_maximum** <br>(gauge) | Cantidad máxima de retraso en milisegundos entre la instancia primaria y cada instancia de Amazon DocumentDB en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_maximum.average** <br>(gauge) | Cantidad máxima de retraso en milisegundos entre la instancia primaria y cada instancia de Amazon DocumentDB en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_maximum.maximum** <br>(gauge) | Cantidad máxima de retraso en milisegundos entre la instancia primaria y cada instancia de Amazon DocumentDB en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_maximum.minimum** <br>(gauge) | Cantidad máxima de retraso en milisegundos entre la instancia primaria y cada instancia de Amazon DocumentDB en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_maximum.samplecount** <br>(gauge) | Cantidad máxima de retraso en milisegundos entre la instancia primaria y cada instancia de Amazon DocumentDB en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_maximum.sum** <br>(gauge) | Cantidad máxima de retraso en milisegundos entre la instancia primaria y cada instancia de Amazon DocumentDB en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_minimum** <br>(gauge) | Cantidad mínima de retraso en milisegundos entre la instancia primaria y cada instancia de réplica en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_minimum.average** <br>(gauge) | Cantidad mínima de retraso en milisegundos entre la instancia primaria y cada instancia de réplica en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_minimum.maximum** <br>(gauge) | Cantidad mínima de retraso en milisegundos entre la instancia primaria y cada instancia de réplica en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_minimum.minimum** <br>(gauge) | Cantidad mínima de retraso en milisegundos entre la instancia primaria y cada instancia de réplica en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_minimum.samplecount** <br>(gauge) | Cantidad mínima de retraso en milisegundos entre la instancia primaria y cada instancia de réplica en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.dbcluster_replica_lag_minimum.sum** <br>(gauge) | Cantidad mínima de retraso en milisegundos entre la instancia primaria y cada instancia de réplica en el clúster.<br>_Se muestra como milisegundos_ |
| **aws.docdb.disk_queue_depth** <br>(gauge) | Número de solicitudes de lectura/escritura pendientes que esperan acceder al disco.|
| **aws.docdb.disk_queue_depth.maximum** <br>(gauge) | Número máximo de solicitudes de lectura/escritura pendientes que esperan acceder al disco.|
| **aws.docdb.disk_queue_depth.minimum** <br>(gauge) | Número mínimo de solicitudes de lectura/escritura pendientes que esperan acceder al disco.|
| **aws.docdb.disk_queue_depth.samplecount** <br>(gauge) | Recuento de muestras del número de solicitudes de lectura/escritura pendientes que esperan acceder al disco.|
| **aws.docdb.disk_queue_depth.sum** <br>(gauge) | Suma del número de solicitudes de lectura/escritura pendientes que esperan acceder al disco.|
| **aws.docdb.documents_deleted** <br>(count) | Número de documentos eliminados en un periodo de un minuto.|
| **aws.docdb.documents_deleted.average** <br>(count) | Número de documentos eliminados en un periodo de un minuto.|
| **aws.docdb.documents_deleted.maximum** <br>(count) | Número de documentos eliminados en un periodo de un minuto.|
| **aws.docdb.documents_deleted.minimum** <br>(count) | Número de documentos eliminados en un periodo de un minuto.|
| **aws.docdb.documents_deleted.samplecount** <br>(count) | Número de documentos eliminados en un periodo de un minuto.|
| **aws.docdb.documents_deleted.sum** <br>(count) | Número de documentos eliminados en un periodo de un minuto.|
| **aws.docdb.documents_inserted** <br>(count) | Número de documentos insertados en un periodo de un minuto.|
| **aws.docdb.documents_inserted.average** <br>(count) | Número de documentos insertados en un periodo de un minuto.|
| **aws.docdb.documents_inserted.maximum** <br>(count) | Número de documentos insertados en un periodo de un minuto.|
| **aws.docdb.documents_inserted.minimum** <br>(count) | Número de documentos insertados en un periodo de un minuto.|
| **aws.docdb.documents_inserted.samplecount** <br>(count) | Número de documentos insertados en un periodo de un minuto.|
| **aws.docdb.documents_inserted.sum** <br>(count) | Número de documentos insertados en un periodo de un minuto.|
| **aws.docdb.documents_returned** <br>(count) | Número de documentos devueltos en un periodo de un minuto.|
| **aws.docdb.documents_returned.average** <br>(count) | Número de documentos devueltos en un periodo de un minuto.|
| **aws.docdb.documents_returned.maximum** <br>(count) | Número de documentos devueltos en un periodo de un minuto.|
| **aws.docdb.documents_returned.minimum** <br>(count) | Número de documentos devueltos en un periodo de un minuto.|
| **aws.docdb.documents_returned.samplecount** <br>(count) | Número de documentos devueltos en un periodo de un minuto.|
| **aws.docdb.documents_returned.sum** <br>(count) | Número de documentos devueltos en un periodo de un minuto.|
| **aws.docdb.documents_updated** <br>(count) | Número de documentos actualizados en un periodo de un minuto.|
| **aws.docdb.documents_updated.average** <br>(count) | Número de documentos actualizados en un periodo de un minuto.|
| **aws.docdb.documents_updated.maximum** <br>(count) | Número de documentos actualizados en un periodo de un minuto.|
| **aws.docdb.documents_updated.minimum** <br>(count) | Número de documentos actualizados en un periodo de un minuto.|
| **aws.docdb.documents_updated.samplecount** <br>(count) | Número de documentos actualizados en un periodo de un minuto.|
| **aws.docdb.documents_updated.sum** <br>(count) | Número de documentos actualizados en un periodo de un minuto.|
| **aws.docdb.engine_uptime** <br>(gauge) | Cantidad de tiempo que la instancia ha estado ejecutándose.<br>_Se muestra como segundos_ |
| **aws.docdb.engine_uptime.maximum** <br>(gauge) | Cantidad máxima de tiempo que la instancia ha estado ejecutándose.<br>_Se muestra como segundos_ |
| **aws.docdb.engine_uptime.minimum** <br>(gauge) | Cantidad mínima de tiempo que la instancia ha estado ejecutándose.<br>_Se muestra como segundos_ |
| **aws.docdb.engine_uptime.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de tiempo que la instancia ha estado ejecutándose.<br>_Se muestra como segundos_ |
| **aws.docdb.engine_uptime.sum** <br>(gauge) | Suma de la cantidad de tiempo que la instancia ha estado ejecutándose.<br>_Se muestra como segundos_ |
| **aws.docdb.free_local_storage** <br>(gauge) | Cantidad de almacenamiento disponible en cada instancia para tablas y logs temporales.|
| **aws.docdb.free_local_storage.maximum** <br>(gauge) | Cantidad máxima de almacenamiento disponible en cada instancia para tablas y logs temporales.|
| **aws.docdb.free_local_storage.minimum** <br>(gauge) | Cantidad mínima de almacenamiento disponible en cada instancia para tablas y logs temporales.|
| **aws.docdb.free_local_storage.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de almacenamiento disponible en cada instancia para tablas y logs temporales.|
| **aws.docdb.free_local_storage.sum** <br>(gauge) | Suma de la cantidad de almacenamiento disponible para cada instancia para tablas y logs temporales.|
| **aws.docdb.freeable_memory** <br>(gauge) | Cantidad de memoria de acceso aleatorio disponible.<br>_Se muestra como bytes_ |
| **aws.docdb.freeable_memory.maximum** <br>(gauge) | Cantidad máxima de memoria de acceso aleatorio disponible.<br>_Se muestra como bytes_ |
| **aws.docdb.freeable_memory.minimum** <br>(gauge) | Cantidad mínima de memoria de acceso aleatorio disponible.<br>_Se muestra como bytes_ |
| **aws.docdb.freeable_memory.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de memoria de acceso aleatorio disponible.<br>_Se muestra como bytes_ |
| **aws.docdb.freeable_memory.sum** <br>(gauge) | Suma de la cantidad de memoria de acceso aleatorio disponible.<br>_Se muestra como bytes_ |
| **aws.docdb.index_buffer_cache_hit_ratio** <br>(gauge) | Porcentaje de solicitudes de índice atendidas por la caché del buffer.|
| **aws.docdb.index_buffer_cache_hit_ratio.average** <br>(gauge) | Porcentaje de solicitudes de índice atendidas por la caché del buffer.|
| **aws.docdb.index_buffer_cache_hit_ratio.maximum** <br>(gauge) | Porcentaje de solicitudes de índice atendidas por la caché del buffer.|
| **aws.docdb.index_buffer_cache_hit_ratio.minimum** <br>(gauge) | Porcentaje de solicitudes de índice atendidas por la caché del buffer.|
| **aws.docdb.index_buffer_cache_hit_ratio.samplecount** <br>(gauge) | Porcentaje de solicitudes de índice atendidas por la caché del buffer.|
| **aws.docdb.index_buffer_cache_hit_ratio.sum** <br>(gauge) | Porcentaje de solicitudes de índice atendidas por la caché del buffer.|
| **aws.docdb.low_mem_num_operations_throttled** <br>(count) | Número de solicitudes que se limitan debido a la poca memoria disponible en un periodo de un minuto.|
| **aws.docdb.low_mem_num_operations_throttled.average** <br>(count) | Número de solicitudes que se limitan debido a la poca memoria disponible en un periodo de un minuto.|
| **aws.docdb.low_mem_num_operations_throttled.maximum** <br>(count) | Número de solicitudes que se limitan debido a la poca memoria disponible en un periodo de un minuto.|
| **aws.docdb.low_mem_num_operations_throttled.minimum** <br>(count) | Número de solicitudes que se limitan debido a la poca memoria disponible en un periodo de un minuto.|
| **aws.docdb.low_mem_num_operations_throttled.samplecount** <br>(count) | Número de solicitudes que se limitan debido a la poca memoria disponible en un periodo de un minuto.|
| **aws.docdb.low_mem_num_operations_throttled.sum** <br>(count) | Número de solicitudes que se limitan debido a la poca memoria disponible en un periodo de un minuto.|
| **aws.docdb.low_mem_throttle_max_queue_depth** <br>(gauge) | Profundidad máxima de la cola de solicitudes que se limitan debido a la poca memoria disponible en un período de un minuto.|
| **aws.docdb.low_mem_throttle_max_queue_depth.average** <br>(gauge) | Profundidad máxima de la cola de solicitudes que se limitan debido a la poca memoria disponible en un período de un minuto.|
| **aws.docdb.low_mem_throttle_max_queue_depth.maximum** <br>(gauge) | Profundidad máxima de la cola de solicitudes que se limitan debido a la poca memoria disponible en un período de un minuto.|
| **aws.docdb.low_mem_throttle_max_queue_depth.minimum** <br>(gauge) | Profundidad máxima de la cola de solicitudes que se limitan debido a la poca memoria disponible en un período de un minuto.|
| **aws.docdb.low_mem_throttle_max_queue_depth.samplecount** <br>(gauge) | Profundidad máxima de la cola de solicitudes que se limitan debido a la poca memoria disponible en un período de un minuto.|
| **aws.docdb.low_mem_throttle_max_queue_depth.sum** <br>(gauge) | Profundidad máxima de la cola de solicitudes que se limitan debido a la poca memoria disponible en un período de un minuto.|
| **aws.docdb.low_mem_throttle_queue_depth** <br>(gauge) | Profundidad de la cola de solicitudes que se limitan debido a la poca memoria tomada con una frecuencia de un minuto.|
| **aws.docdb.low_mem_throttle_queue_depth.average** <br>(gauge) | Profundidad de la cola de solicitudes que se limitan debido a la poca memoria tomada con una frecuencia de un minuto.|
| **aws.docdb.low_mem_throttle_queue_depth.maximum** <br>(gauge) | Profundidad de la cola de solicitudes que se limitan debido a la poca memoria tomada con una frecuencia de un minuto.|
| **aws.docdb.low_mem_throttle_queue_depth.minimum** <br>(gauge) | Profundidad de la cola de solicitudes que se limitan debido a la poca memoria tomada con una frecuencia de un minuto.|
| **aws.docdb.low_mem_throttle_queue_depth.samplecount** <br>(gauge) | Profundidad de la cola de solicitudes que se limitan debido a la poca memoria tomada con una frecuencia de un minuto.|
| **aws.docdb.low_mem_throttle_queue_depth.sum** <br>(gauge) | Profundidad de la cola de solicitudes que se limitan debido a la poca memoria tomada con una frecuencia de un minuto.|
| **aws.docdb.network_receive_throughput** <br>(gauge) | Cantidad de tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_receive_throughput.maximum** <br>(gauge) | Cantidad máxima de tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_receive_throughput.minimum** <br>(gauge) | Cantidad mínima de tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_receive_throughput.samplecount** <br>(gauge) | Recuento de muestras del tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_receive_throughput.sum** <br>(gauge) | Suma del tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_throughput** <br>(gauge) | Cantidad de tráfico de red en bytes por segundo recibido de los clientes y transmitido a los clientes por cada instancia del clúster de Amazon DocumentDB. Este rendimiento no incluye el tráfico de red entre las instancias del clúster ni el volumen del clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_throughput.maximum** <br>(gauge) | Cantidad máxima de tráfico de red en bytes por segundo recibido de los clientes y transmitido a los clientes por cada instancia.<br>_Se muestra como bytes_ |
| **aws.docdb.network_throughput.minimum** <br>(gauge) | Cantidad mínima de tráfico de red en bytes por segundo recibido de los clientes y transmitido a los clientes por cada instancia.<br>_Se muestra como bytes_ |
| **aws.docdb.network_throughput.samplecount** <br>(gauge) | Recuento de muestras del tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia.<br>_Se muestra como bytes_ |
| **aws.docdb.network_throughput.sum** <br>(gauge) | Suma de la cantidad de tráfico de red en bytes por segundo recibido de los clientes y transmitido a los clientes por cada instancia.<br>_Se muestra como bytes_ |
| **aws.docdb.network_transmit_throughput** <br>(gauge) | Cantidad media de tráfico de red enviado a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_transmit_throughput.maximum** <br>(gauge) | Cantidad máxima de tráfico de red enviado a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_transmit_throughput.minimum** <br>(gauge) | Cantidad mínima de tráfico de red enviado a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_transmit_throughput.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de tráfico de red enviado a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.network_transmit_throughput.sum** <br>(gauge) | Suma de la cantidad de tráfico de red enviado a los clientes por cada instancia en un clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.opcounters_command** <br>(count) | Número de comandos emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_command.average** <br>(count) | Número de comandos emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_command.maximum** <br>(count) | Número de comandos emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_command.minimum** <br>(count) | Número de comandos emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_command.samplecount** <br>(count) | Número de comandos emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_command.sum** <br>(count) | Número de comandos emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_delete** <br>(count) | Número de operaciones de borrado emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_delete.average** <br>(count) | Número de operaciones de borrado emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_delete.maximum** <br>(count) | Número de operaciones de borrado emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_delete.minimum** <br>(count) | Número de operaciones de borrado emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_delete.samplecount** <br>(count) | Número de operaciones de borrado emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_delete.sum** <br>(count) | Número de operaciones de borrado emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_getmore** <br>(count) | Número de comandos getMore emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_getmore.average** <br>(count) | Número de comandos getMore emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_getmore.maximum** <br>(count) | Número de comandos getMore emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_getmore.minimum** <br>(count) | Número de comandos getMore emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_getmore.samplecount** <br>(count) | Número de comandos getMore emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_getmore.sum** <br>(count) | Número de comandos getMore emitidos en un periodo de un minuto.|
| **aws.docdb.opcounters_insert** <br>(count) | Número de operaciones de inserción emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_insert.average** <br>(count) | Número de operaciones de inserción emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_insert.maximum** <br>(count) | Número de operaciones de inserción emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_insert.minimum** <br>(count) | Número de operaciones de inserción emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_insert.samplecount** <br>(count) | Número de operaciones de inserción emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_insert.sum** <br>(count) | Número de operaciones de inserción emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_query** <br>(count) | Número de consultas emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_query.average** <br>(count) | Número de consultas emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_query.maximum** <br>(count) | Número de consultas emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_query.minimum** <br>(count) | Número de consultas emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_query.samplecount** <br>(count) | Número de consultas emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_query.sum** <br>(count) | Número de consultas emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_update** <br>(count) | Número de operaciones de actualización emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_update.average** <br>(count) | Número de operaciones de actualización emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_update.maximum** <br>(count) | Número de operaciones de actualización emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_update.minimum** <br>(count) | Número de operaciones de actualización emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_update.samplecount** <br>(count) | Número de operaciones de actualización emitidas en un periodo de un minuto.|
| **aws.docdb.opcounters_update.sum** <br>(count) | Número de operaciones de actualización emitidas en un periodo de un minuto.|
| **aws.docdb.read_iops** <br>(count) | Número de bytes leídos del disco por segundo.|
| **aws.docdb.read_iops.maximum** <br>(count) | Número máximo de bytes leídos del disco por segundo.|
| **aws.docdb.read_iops.minimum** <br>(count) | Número mínimo de bytes leídos del disco por segundo.|
| **aws.docdb.read_iops.samplecount** <br>(count) | Recuento de muestras del número de bytes leídos del disco por segundo.|
| **aws.docdb.read_iops.sum** <br>(count) | Suma del número de bytes leídos del disco por segundo.|
| **aws.docdb.read_latency** <br>(gauge) | Tiempo medio que tarda cada operación de E/S de disco.|
| **aws.docdb.read_latency.maximum** <br>(gauge) | Tiempo medio máximo que tarda cada operación de E/S de disco.|
| **aws.docdb.read_latency.minimum** <br>(gauge) | Tiempo medio mínimo que tarda cada operación de E/S de disco.|
| **aws.docdb.read_latency.samplecount** <br>(gauge) | Recuento de muestras de la cantidad media de tiempo que tarda cada operación de E/S de disco.|
| **aws.docdb.read_latency.sum** <br>(gauge) | Suma de la cantidad media de tiempo que tarda cada operación de E/S de disco.|
| **aws.docdb.read_throughput** <br>(gauge) | Cantidad de tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.|
| **aws.docdb.read_throughput.maximum** <br>(gauge) | Cantidad máxima de tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.|
| **aws.docdb.read_throughput.minimum** <br>(gauge) | Cantidad mínima de tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.|
| **aws.docdb.read_throughput.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.|
| **aws.docdb.read_throughput.sum** <br>(gauge) | Suma de la cantidad de tráfico de red recibido de los clientes y transmitido a los clientes por cada instancia en un clúster.|
| **aws.docdb.snapshot_storage_used** <br>(gauge) | Cantidad total de almacenamiento de copias de seguridad consumidas por todos los snapshots de un clúster determinado fuera de su periodo de retención de copias de seguridad.<br>_Se muestra como gibibytes_ |
| **aws.docdb.snapshot_storage_used.maximum** <br>(gauge) | Cantidad total máxima de almacenamiento de copias de seguridad consumidas por todos los snapshots de un clúster determinado fuera de su periodo de retención de copias de seguridad.<br>_Se muestra como gibibytes_ |
| **aws.docdb.snapshot_storage_used.minimum** <br>(gauge) | Cantidad total mínima de almacenamiento de copias de seguridad consumidas por todos los snapshots de un clúster determinado fuera de su periodo de retención de copias de seguridad.<br>_Se muestra como gibibytes_ |
| **aws.docdb.snapshot_storage_used.samplecount** <br>(gauge) | Recuento de muestras de la cantidad total de almacenamiento de copias de seguridad consumidas por todos los snapshots de un clúster determinado fuera de su periodo de retención de copias de seguridad.<br>_Se muestra como gibibytes_ |
| **aws.docdb.snapshot_storage_used.sum** <br>(gauge) | Suma de la cantidad total de almacenamiento de copias de seguridad consumidas por todos los snapshots de un clúster determinado fuera de su periodo de retención de copias de seguridad.<br>_Se muestra como gibibytes_ |
| **aws.docdb.swap_usage** <br>(gauge) | Cantidad de espacio de intercambio utilizado en la instancia.|
| **aws.docdb.swap_usage.maximum** <br>(gauge) | Cantidad máxima de espacio de intercambio utilizado en la instancia.|
| **aws.docdb.swap_usage.minimum** <br>(gauge) | Cantidad mínima de espacio de intercambio utilizado en la instancia.|
| **aws.docdb.swap_usage.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de espacio de intercambio utilizado en la instancia.|
| **aws.docdb.swap_usage.sum** <br>(gauge) | Suma de la cantidad de espacio de intercambio utilizado en la instancia.|
| **aws.docdb.total_backup_storage_billed** <br>(gauge) | Cantidad total de almacenamiento de copias de seguridad por las que se te factura para un clúster determinado.<br>_Se muestra como gibibytes_ |
| **aws.docdb.total_backup_storage_billed.maximum** <br>(gauge) | Cantidad máxima de almacenamiento de copias de seguridad por las que se te factura para un clúster determinado.<br>_Se muestra como gibibytes_ |
| **aws.docdb.total_backup_storage_billed.minimum** <br>(gauge) | Cantidad mínima de almacenamiento de copias de seguridad por las que se te factura para un clúster determinado.<br>_Se muestra como gibibytes_ |
| **aws.docdb.total_backup_storage_billed.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de almacenamiento de copias de seguridad por las que se te factura para un clúster determinado.<br>_Se muestra como gibibytes_ |
| **aws.docdb.total_backup_storage_billed.sum** <br>(gauge) | Suma de la cantidad total de almacenamiento de copias de seguridad por las que se te factura para un clúster determinado.<br>_Se muestra como gibibytes_ |
| **aws.docdb.transactions_aborted** <br>(count) | Número de transacciones canceladas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_aborted.average** <br>(count) | Número de transacciones canceladas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_aborted.maximum** <br>(count) | Número de transacciones canceladas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_aborted.minimum** <br>(count) | Número de transacciones canceladas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_aborted.samplecount** <br>(count) | Número de transacciones canceladas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_aborted.sum** <br>(count) | Número de transacciones canceladas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_committed** <br>(count) | Número de transacciones confirmadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_committed.average** <br>(count) | Número de transacciones confirmadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_committed.maximum** <br>(count) | Número de transacciones confirmadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_committed.minimum** <br>(count) | Número de transacciones confirmadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_committed.samplecount** <br>(count) | Número de transacciones confirmadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_committed.sum** <br>(count) | Número de transacciones confirmadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_open** <br>(gauge) | Número de transacciones abiertas en una instancia tomadas con una frecuencia de un minuto.|
| **aws.docdb.transactions_open.average** <br>(gauge) | Número de transacciones abiertas en una instancia tomadas con una frecuencia de un minuto.|
| **aws.docdb.transactions_open.maximum** <br>(gauge) | Número de transacciones abiertas en una instancia tomadas con una frecuencia de un minuto.|
| **aws.docdb.transactions_open.minimum** <br>(gauge) | Número de transacciones abiertas en una instancia tomadas con una frecuencia de un minuto.|
| **aws.docdb.transactions_open.samplecount** <br>(gauge) | Número de transacciones abiertas en una instancia tomadas con una frecuencia de un minuto.|
| **aws.docdb.transactions_open.sum** <br>(gauge) | Número de transacciones abiertas en una instancia tomadas con una frecuencia de un minuto.|
| **aws.docdb.transactions_open_max** <br>(gauge) | Número máximo de transacciones abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_open_max.average** <br>(gauge) | Número máximo de transacciones abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_open_max.maximum** <br>(gauge) | Número máximo de transacciones abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_open_max.minimum** <br>(gauge) | Número máximo de transacciones abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_open_max.samplecount** <br>(gauge) | Número máximo de transacciones abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_open_max.sum** <br>(gauge) | Número máximo de transacciones abiertas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_started** <br>(count) | Número de transacciones iniciadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_started.average** <br>(count) | Número de transacciones iniciadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_started.maximum** <br>(count) | Número de transacciones iniciadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_started.minimum** <br>(count) | Número de transacciones iniciadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_started.samplecount** <br>(count) | Número de transacciones iniciadas en una instancia en un periodo de un minuto.|
| **aws.docdb.transactions_started.sum** <br>(count) | Número de transacciones iniciadas en una instancia en un periodo de un minuto.|
| **aws.docdb.ttldeleted_documents** <br>(count) | Número de documentos eliminados por un TTLMonitor en un periodo de un minuto.|
| **aws.docdb.ttldeleted_documents.average** <br>(count) | Número de documentos eliminados por un TTLMonitor en un periodo de un minuto.|
| **aws.docdb.ttldeleted_documents.maximum** <br>(count) | Número de documentos eliminados por un TTLMonitor en un periodo de un minuto.|
| **aws.docdb.ttldeleted_documents.minimum** <br>(count) | Número de documentos eliminados por un TTLMonitor en un periodo de un minuto.|
| **aws.docdb.ttldeleted_documents.samplecount** <br>(count) | Número de documentos eliminados por un TTLMonitor en un periodo de un minuto.|
| **aws.docdb.ttldeleted_documents.sum** <br>(count) | Número de documentos eliminados por un TTLMonitor en un periodo de un minuto.|
| **aws.docdb.volume_bytes_used** <br>(count) | Cantidad de almacenamiento utilizado por tu clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.volume_bytes_used.maximum** <br>(count) | Cantidad máxima de almacenamiento utilizado por tu clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.volume_bytes_used.minimum** <br>(count) | Cantidad mínima de almacenamiento utilizado por tu clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.volume_bytes_used.samplecount** <br>(count) | Recuento de muestras de la cantidad de almacenamiento utilizado por tu clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.volume_bytes_used.sum** <br>(count) | Suma de la cantidad de almacenamiento utilizado por tu clúster.<br>_Se muestra como bytes_ |
| **aws.docdb.volume_read_iops** <br>(count) | Número medio de operaciones de E/S de lectura facturadas de un volumen de clúster.|
| **aws.docdb.volume_read_iops.maximum** <br>(count) | Número medio máximo de operaciones de E/S de lectura facturadas de un volumen de clúster.|
| **aws.docdb.volume_read_iops.minimum** <br>(count) | Número medio mínimo de operaciones de E/S de lectura facturadas de un volumen de clúster.|
| **aws.docdb.volume_read_iops.samplecount** <br>(count) | Recuento de muestras del número medio de operaciones de E/S de lectura facturadas de un volumen de clúster.|
| **aws.docdb.volume_read_iops.sum** <br>(count) | Suma del número medio de operaciones de E/S de lectura facturadas de un volumen de clúster.|
| **aws.docdb.volume_write_iops** <br>(count) | Número medio de operaciones de E/S de disco por segundo.|
| **aws.docdb.volume_write_iops.maximum** <br>(count) | Número medio máximo de operaciones de E/S de disco por segundo.|
| **aws.docdb.volume_write_iops.minimum** <br>(count) | Número medio mínimo de operaciones de E/S de disco por segundo.|
| **aws.docdb.volume_write_iops.samplecount** <br>(count) | Recuento de muestras del número medio de operaciones de E/S de disco por segundo.|
| **aws.docdb.volume_write_iops.sum** <br>(count) | Suma del número medio de operaciones de E/S de disco por segundo.|
| **aws.docdb.write_iops** <br>(count) | Número medio de operaciones de E/S de disco por segundo.|
| **aws.docdb.write_iops.maximum** <br>(count) | Número medio máximo de operaciones de E/S de disco por segundo.|
| **aws.docdb.write_iops.minimum** <br>(count) | Número medio mínimo de operaciones de E/S de disco por segundo.|
| **aws.docdb.write_iops.samplecount** <br>(count) | Recuento de muestras del número medio de operaciones de E/S de disco por segundo.|
| **aws.docdb.write_iops.sum** <br>(count) | Suma del número medio de operaciones de E/S de disco por segundo.|
| **aws.docdb.write_latency** <br>(gauge) | Tiempo medio que tarda cada operación de E/S de disco.<br>_Se muestra como milisegundos_ |
| **aws.docdb.write_latency.maximum** <br>(gauge) | Tiempo máximo que tarda una operación de E/S de disco.<br>_Se muestra como milisegundos_ |
| **aws.docdb.write_latency.minimum** <br>(gauge) | Tiempo mínimo que tarda una operación de E/S de disco.<br>_Se muestra como milisegundos_ |
| **aws.docdb.write_latency.samplecount** <br>(gauge) | Recuento de muestras de la cantidad de tiempo que tarda cada operación de E/S de disco.<br>_Se muestra como milisegundos_ |
| **aws.docdb.write_latency.sum** <br>(gauge) | Suma de la cantidad media de tiempo que tarda cada operación de E/S de disco.<br>_Se muestra como milisegundos_ |
| **aws.docdb.write_throughput** <br>(gauge) | Número medio de bytes escritos en el disco por segundo.|
| **aws.docdb.write_throughput.maximum** <br>(gauge) | Número medio máximo de bytes escritos en el disco por segundo.|
| **aws.docdb.write_throughput.minimum** <br>(gauge) | Número medio mínimo de bytes leídos del disco por segundo.|
| **aws.docdb.write_throughput.samplecount** <br>(gauge) | Recuento de muestras del número medio de bytes escritos en el disco por segundo.|
| **aws.docdb.write_throughput.sum** <br>(gauge) | Suma del número medio de bytes escritos en el disco por segundo.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparece en la consola de AWS, incluyendo dbinstanceidentifier, dbclusteridentifier, entre otras.

### Eventos

La integración de Amazon DocumentDB no incluye eventos.

### Checks de servicio

La integración de Amazon DocumentDB no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}