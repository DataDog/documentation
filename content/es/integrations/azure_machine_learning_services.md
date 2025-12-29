---
app_id: azure_machine_learning_services
categories:
- nube
- azure
- ai/ml
custom_kind: integración
description: Rastrea las métricas clave de Azure Machine Learning.
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de modelos de ML en producción
title: Microsoft Azure Machine Learning
---
## Información general

El servicio Azure Machine Learning ofrece a los desarrolladores y científicos de datos una amplia gama de experiencias productivas para crear, entrenar y desplegar modelos de machine learning más rápido. Utiliza Datadog para monitorizar el rendimiento y el uso de Azure Machine Learning en contexto con el resto de tus aplicaciones e infraestructura.

Obtén métricas de Azure Machine Learning para:

- Rastrear el número y el estado de las ejecuciones y los despliegues de modelos
- Monitorizar la utilización de tus nodos de machine learning
- Optimizar el rendimiento frente al coste

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.machinelearningservices_workspaces.completed_runs** <br>(gauge) | El número de ejecuciones completadas con éxito para este espacio de trabajo.<br>_Se muestra como operación_ |
| **azure.machinelearningservices_workspaces.started_runs** <br>(gauge) | El número de ejecuciones iniciadas para este espacio de trabajo.<br>_Se muestra como operación_ |
| **azure.machinelearningservices_workspaces.failed_runs** <br>(gauge) | El número de ejecuciones fallidas para este espacio de trabajo.<br>_Se muestra como operación_ |
| **azure.machinelearningservices_workspaces.model_register_succeeded** <br>(gauge) | Número de registros de modelos que han tenido éxito en este espacio de trabajo.|
| **azure.machinelearningservices_workspaces.model_register_failed** <br>(gauge) | Número de registros de modelos que fallaron en este espacio de trabajo.|
| **azure.machinelearningservices_workspaces.model_deploy_started** <br>(gauge) | Número de despliegues de modelos iniciados en este espacio de trabajo.|
| **azure.machinelearningservices_workspaces.model_deploy_succeeded** <br>(gauge) | Número de despliegues de modelos que han tenido éxito en este espacio de trabajo.|
| **azure.machinelearningservices_workspaces.moddel_deploy_failed** <br>(gauge) | Número de despliegues de modelos que han fallado en este espacio de trabajo.|
| **azure.machinelearningservices_workspaces.total_nodes** <br>(gauge) | El número de nodos totales. Este total incluye algunos de los Nodos activos, Nodos inactivos, Nodos inutilizables, Nodos reemplazados, Nodos salientes.<br>_Se muestra como nodo_ |
| **azure.machinelearningservices_workspaces.active_nodes** <br>(gauge) | El número de nodos acitvos. Estos son los nodos que están ejecutando activamente un trabajo.<br>_Se muestra como nodo_ |
| **azure.machinelearningservices_workspaces.idle_nodes** <br>(gauge) | El número de nodos inactivos. Los nodos inactivos son los nodos que no están ejecutando ningún trabajo pero que pueden aceptar nuevos trabajos si están disponibles.<br>_Se muestra como nodo_ |
| **azure.machinelearningservices_workspaces.unusable_nodes** <br>(gauge) | El número de nodos inutilizables. Los nodos inutilizables no son funcionales debido a algún problema sin resolver. Azure reciclará estos nodos.<br>_Se muestra como nodo_ |
| **azure.machinelearningservices_workspaces.preempted_nodes** <br>(gauge) | Número de nodos reemplazados. Estos nodos son los nodos de baja prioridad que se quitan de la reserva de nodos disponibles.<br>_Se muestra como nodo_ |
| **azure.machinelearningservices_workspaces.leaving_nodes** <br>(gauge) | Número de nodos salientes. Los nodos salientes son los nodos que acaban de terminar de procesar un trabajo y pasarán al estado inactivo.<br>_Se muestra como nodo_ |
| **azure.machinelearningservices_workspaces.total_cores** <br>(gauge) | El número total de núcleos.<br>_Se muestra como núcleo_ |
| **azure.machinelearningservices_workspaces.active_cores** <br>(gauge) | El número de núcleos activos.<br>_Se muestra como núcleo_ |
| **azure.machinelearningservices_workspaces.idle_cores** <br>(gauge) | El número de núcleos inactivos.<br>_Se muestra como núcleo_ |
| **azure.machinelearningservices_workspaces.unusable_cores** <br>(gauge) | El número de núcleos inutilizables.<br>_Se muestra como núcleo_ |
| **azure.machinelearningservices_workspaces.preempted_cores** <br>(gauge) | El número de núcleos reemplazados.<br>_Se muestra como núcleo_ |
| **azure.machinelearningservices_workspaces.leaving_cores** <br>(gauge) | El número de núcleos salientes.<br>_Se muestra como núcleo_ |
| **azure.machinelearningservices_workspaces.quota_utilization_percentage** <br>(gauge) | El porcentaje de cuota utilizado.<br>_Se muestra como porcentaje_ |
| **azure.machinelearningservices_workspaces.cpuutilization** <br>(gauge) | Utilización de la CPU<br>_Se muestra en porcentaje_ |
| **azure.machinelearningservices_workspaces.gpuutilization** <br>(gauge) | Utilización de la GPU<br>_Se muestra en porcentaje_ |

### Eventos

La integración Azure Machine Learning no incluye eventos.

### Checks de servicio

La integración Azure Machine Learning no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}