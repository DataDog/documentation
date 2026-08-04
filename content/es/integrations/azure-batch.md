---
aliases:
- /es/integrations/azure_batch
app_id: azure-batch
categories:
- nube
- configuración y despliegue
- azure
custom_kind: integración
description: Azure Batch Service es un programador y procesador de tareas gestionado
  para tus aplicaciones de Azure
media: []
title: Azure Batch
---
## Información general

Azure Batch Service es un programador y procesador de tareas gestionado para tus aplicaciones de Azure. Obtén métricas de Azure Batch Service para:

- Visualizar el rendimiento de tus cuentas de Batch.
- Correlacionar el rendimiento de tus cuentas de Batch con el de tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure primero](https://docs.datadoghq.com/integrations/azure/). No es necesario ningún otro paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.batch_batchaccounts.core_count** <br>(count) | Número total de núcleos dedicados en la cuenta de lotes<br>_Se muestra como núcleo_ |
| **azure.batch_batchaccounts.creating_node_count** <br>(count) | Número de nodos que se están creando<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.idle_node_count** <br>(count) | Número de nodos inactivos<br>_Se muentra como nodo_ |
| **azure.batch_batchaccounts.job_delete_complete_events** <br>(count) | Número total de trabajos que se han eliminado correctamente.<br>_Se muestra como trabajo_ |
| **azure.batch_batchaccounts.job_delete_start_events** <br>(count) | Número total de trabajos cuya eliminación se ha solicitado.<br>_Se muestra como trabajo_ |
| **azure.batch_batchaccounts.job_disable_complete_events** <br>(count) | Número total de trabajos que se han desactivado correctamente.<br>_Se muestra como trabajo_ |
| **azure.batch_batchaccounts.job_disable_start_events** <br>(count) | Número total de trabajos que se ha solicitado desactivar.<br>_Se muestra como trabajo_ |
| **azure.batch_batchaccounts.job_start_events** <br>(count) | Número total de trabajos que se han iniciado con éxito.<br>_Se muestra como trabajo_ |
| **azure.batch_batchaccounts.job_terminate_complete_events** <br>(count) | Número total de trabajos que han finalizado con éxito.<br>_Se muestra como trabajo_ |
| **azure.batch_batchaccounts.job_terminate_start_events** <br>(count) | Número total de trabajos cuya finalización se ha solicitado.<br>_Se muestra como trabajo_ |
| **azure.batch_batchaccounts.leaving_pool_node_count** <br>(count) | Número de nodos que abandonan el grupo<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.low_priority_core_count** <br>(count) | Número total de núcleos de baja prioridad en la cuenta del lote<br>_Se muestra como núcleo_ |
| **azure.batch_batchaccounts.low_priority_node_count** <br>(count) | Número total de nodos de baja prioridad en la cuenta del lote<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.offline_node_count** <br>(count) | Número de nodos desconectados<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.pool_create_event** <br>(count) | Número total de grupos que se han creado<br>_Se muestra como evento_ |
| **azure.batch_batchaccounts.pool_delete_complete_event** <br>(count) | Número total de eliminaciones del grupo que se han completado<br>_Se muestra como evento_ |
| **azure.batch_batchaccounts.pool_delete_start_event** <br>(count) | Número total de eliminaciones del grupo que han comenzado<br>_Se muestra como evento_ |
| **azure.batch_batchaccounts.pool_resize_complete_event** <br>(count) | Número total de redimensionamientos del grupo que se han completado<br>_Se muestra como evento_ |
| **azure.batch_batchaccounts.pool_resize_start_event** <br>(count) | Número total de redimensionamientos del grupo que han comenzado<br>_Se muestra como evento_ |
| **azure.batch_batchaccounts.preempted_node_count** <br>(count) | Número de nodos preferentes<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.rebooting_node_count** <br>(count) | Número de nodos que se reinician<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.reimaging_node_count** <br>(count) | Número de nodos de reimagen<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.running_node_count** <br>(count) | Número de nodos en ejecución<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.start_task_failed_node_count** <br>(count) | Número de nodos en los que ha fallado la tarea de inicio<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.starting_node_count** <br>(count) | Número de nodos que comienzan<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.task_complete_event** <br>(count) | Número total de tareas que han finalizado<br>_Se muestra como evento_ |
| **azure.batch_batchaccounts.task_fail_event** <br>(count) | Número total de tareas que han finalizado en estado fallido<br>_Se muestra como evento_ |
| **azure.batch_batchaccounts.task_start_event** <br>(count) | Número total de tareas que se han iniciado<br>_Se muestra como evento_ |
| **azure.batch_batchaccounts.total_node_count** <br>(count) | Número total de nodos dedicados en la cuenta de lotes<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.unusable_node_count** <br>(count) | Número de nodos inutilizables<br>_Se muestra como nodo_ |
| **azure.batch_batchaccounts.waiting_for_start_task_node_count** <br>(count) | Número de nodos a la espera de que se complete la tarea de inicio<br>_Se muestra como nodo_ |

### Eventos

La integración Azure Batch Service no incluye eventos.

### Checks de servicio

La integración Azure Batch Service no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).