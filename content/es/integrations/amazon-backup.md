---
aliases:
- /es/integrations/amazon_backup
app_id: amazon-backup
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Centraliza y automatiza la protección de datos para servicios AWS y cargas
  de trabajo híbridas.
media: []
title: AWS Backup
---
## Información general

AWS Backup te permite centralizar y automatizar la protección de datos entre servicios de AWS
y cargas de trabajo híbridas.

Activa esa integración para ver tus métricas de Backup en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Backup` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - AWS Backup](https://app.datadoghq.com/integrations/amazon-backup).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.backup.number_of_backup_jobs_aborted** <br>(count) | Número de trabajos de copia de seguridad cancelados por el usuario.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_backup_jobs_completed** <br>(count) | Número de trabajos de copia de seguridad finalizados.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_backup_jobs_created** <br>(count) | Número de trabajos de copia de seguridad creados.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_backup_jobs_expired** <br>(count) | Número de trabajos de copia de seguridad que Amazon Backup ha intentado eliminar en función de tu ciclo de vida de retención de copias de seguridad, pero que no ha podido eliminar.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_backup_jobs_failed** <br>(count) | Número de trabajos de copia de seguridad programados que no se han iniciado.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_backup_jobs_pending** <br>(count) | Número de trabajos de copia de seguridad a punto de ejecutarse.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_backup_jobs_running** <br>(count) | Número de trabajos de copia de seguridad actualmente en ejecución.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_copy_jobs_completed** <br>(count) | Número de trabajos de copia entre cuentas y entre regiones finalizados.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_copy_jobs_created** <br>(count) | Número de trabajos de copia entre cuentas y entre regiones creados.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_copy_jobs_failed** <br>(count) | Número de trabajos de copia entre cuentas y entre regiones intentados que no han finalizado.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_copy_jobs_running** <br>(count) | Número de trabajos de copia entre cuentas y entre regiones que se están ejecutando actualmente.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_recovery_points_cold** <br>(count) | Número de puntos de recuperación escalonados en almacenamiento en frío.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_recovery_points_completed** <br>(count) | Número de puntos de recuperación creados.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_recovery_points_deleting** <br>(count) | Número de puntos de recuperación que está eliminando Amazon Backup.<br>_Se muestra como unidad_. |
| **aws.backup.number_of_recovery_points_expired** <br>(count) | Número de puntos de recuperación que se han intentado eliminar en función de tu ciclo de vida de retención de copias de seguridad, pero que no se han podido eliminar.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_recovery_points_partial** <br>(count) | Número de puntos de recuperación que se han empezado a crear pero que no se han podido terminar.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_restore_jobs_completed** <br>(count) | Número de trabajos de restauración finalizados.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_restore_jobs_failed** <br>(count) | Número de tareas de restauración que se han intentado pero que no se han completado.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_restore_jobs_pending** <br>(count) | Número de trabajos de restauración a punto de ejecutarse.<br>_Se muestra como unidad_ |
| **aws.backup.number_of_restore_jobs_running** <br>(count) | Número de tareas de restauración que se están ejecutando actualmente.<br>_Se muestra como unidad_ |

### Eventos

La integración de AWS Backup no incluye eventos.

### Checks de servicio

La integración de AWS Backup no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).