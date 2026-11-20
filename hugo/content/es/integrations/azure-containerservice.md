---
aliases:
- /es/integrations/azure_container_service
app_id: azure-containerservice
categories:
- nube
- rastreo
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Container Service.
media: []
title: Azure Container Service
---
## Información general

Azure Kubernetes Service te permite implementar rápidamente un clúster de Kubernetes listo para la producción.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Kubernetes Service.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.containerservice_managedclusters.apiserver_current_inflight_requests** <br>(count) | Número máximo de solicitudes incorporadas utilizadas actualmente en el servicio por tipo de solicitud|
| **azure.containerservice_managedclusters.cluster_autoscaler_cluster_safe_to_autoscale** <br>(count) | Determina si el autoescalador de clúster tomará o no acción en el clúster.|
| **azure.containerservice_managedclusters.cluster_autoscaler_scale_down_in_cooldown** <br>(count) | Determina si la reducción de escala está en tiempo de espera|
| **azure.containerservice_managedclusters.cluster_autoscaler_unneeded_nodes_count** <br>(count) | Nodos marcados como candidatos a ser eliminados|
| **azure.containerservice_managedclusters.cluster_autoscaler_unschedulable_pods_count** <br>(count) | Número de pods del clúster que no se pueden programar|
| **azure.containerservice_managedclusters.count** <br>(count) | Recuento de recursos de clúster gestionados por Azure Container Service|
| **azure.containerservice_managedclusters.kube_node_status_allocatable_cpu_cores** <br>(count) | Número total de núcleos de CPU disponibles en un clúster gestionado<br>_Se muestra como núcleo_ |
| **azure.containerservice_managedclusters.kube_node_status_allocatable_memory_bytes** <br>(gauge) | Cantidad total de memoria disponible en un clúster gestionado<br>_Se muestra como byte_ |
| **azure.containerservice_managedclusters.kube_node_status_condition** <br>(count) | Estados para varias condiciones de nodo|
| **azure.containerservice_managedclusters.kube_pod_status_phase** <br>(count) | Número de pods por fase|
| **azure.containerservice_managedclusters.kube_pod_status_ready** <br>(count) | Número de pods con estado Ready (Listo)|
| **azure.containerservice_managedclusters.node_cpu_usage_millicores** <br>(count) | Medición agregada de la utilización de la CPU en todo el clúster|
| **azure.containerservice_managedclusters.node_cpu_usage_percentage** <br>(gauge) | Utilización media agregada de la CPU medida en porcentaje en todo el clúster<br>_Se muestra en porcentaje_ |
| **azure.containerservice_managedclusters.node_disk_usage_bytes** <br>(count) | Espacio de disco utilizado en bytes por el dispositivo<br>_Se muestra como byte_ |
| **azure.containerservice_managedclusters.node_disk_usage_percentage** <br>(gauge) | Espacio en disco utilizado en porcentaje por dispositivo<br>_Se muestra en porcentaje_ |
| **azure.containerservice_managedclusters.node_memory_rss_bytes** <br>(gauge) | Memoria RSS en contenedor utilizada en bytes<br>_Se muestra como byte_ |
| **azure.containerservice_managedclusters.node_memory_rss_percentage** <br>(gauge) | Memoria RSS en contenedor utilizada en porcentaje<br>_Se muestra en porcentaje_ |
| **azure.containerservice_managedclusters.node_memory_working_set_bytes** <br>(gauge) | Memoria del conjunto de trabajo en contenedor utilizada.<br>_Se muestra como byte_ |
| **azure.containerservice_managedclusters.node_memory_working_set_percentage** <br>(gauge) | Memoria del conjunto de trabajo en contenedor utilizada en porcentaje<br>_Se muestra en porcentaje_ |
| **azure.containerservice_managedclusters.node_network_in_bytes** <br>(gauge) | Bytes de red recibidos<br>_Se muestra como byte_ |
| **azure.containerservice_managedclusters.node_network_out_bytes** <br>(gauge) | Bytes de red enviados<br>_Se muestra como byte_ |

### Eventos

La integración Azure Kubernetes Service no incluye eventos.

### Checks de servicio

La integración Azure Kubernetes Service no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).