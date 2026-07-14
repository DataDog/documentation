---
aliases:
- /es/integrations/google_container_engine
app_id: google-container-engine
categories:
- nube
- rastreo
- google cloud
- recopilación de logs
custom_kind: integración
description: Google Container Engine es un potente gestor de clústeres y sistema de
  orquestación para ejecutar tus contenedores Docker.
media: []
title: Google Container Engine
---
## Información general

<div class="alert alert-warning">
Esta integración está obsoleta. En su lugar, consulta la <a href="https://docs.datadoghq.com/integrations/google_kubernetes_engine">documentación de la integración Google Kubernetes Engine</a>. Para obtener más información sobre métricas obsoletas, consulta la documentación de <a href="https://cloud.google.com/monitoring/api/metrics_gcp#gcp-container">métricas de Google Cloud</a>.
</div>

## Configuración

Esta integración está obsoleta.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.container.quota.quota.containers_per_cluster_autopilot.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuotas `container.googleapis.com/quota/containers_per_cluster_autopilot`.|
| **gcp.container.quota.quota.containers_per_cluster_autopilot.limit** <br>(gauge) | Límite actual de la métrica de cuotas `container.googleapis.com/quota/containers_per_cluster_autopilot`.|
| **gcp.container.quota.quota.containers_per_cluster_autopilot.usage** <br>(gauge) | Uso actual de la métrica de cuotas `container.googleapis.com/quota/containers_per_cluster_autopilot`.|
| **gcp.container.quota.quota.containers_per_cluster_standard.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuotas `container.googleapis.com/quota/containers_per_cluster_standard`.|
| **gcp.container.quota.quota.containers_per_cluster_standard.limit** <br>(gauge) | Límite actual de la métrica de cuotas `container.googleapis.com/quota/containers_per_cluster_standard`.|
| **gcp.container.quota.quota.containers_per_cluster_standard.usage** <br>(gauge) | Uso actual de la métrica de cuotas `container.googleapis.com/quota/containers_per_cluster_standard`.|
| **gcp.container.quota.quota.etcd_database_size_bytes.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuotas `container.googleapis.com/quota/etcd_database_size_bytes`.|
| **gcp.container.quota.quota.etcd_database_size_bytes.limit** <br>(gauge) | Límite actual de la métrica de cuotas `container.googleapis.com/quota/etcd_database_size_bytes`.<br>_Se muestra en bytes_ |
| **gcp.container.quota.quota.etcd_database_size_bytes.usage** <br>(gauge) | Uso actual de la métrica de cuotas `container.googleapis.com/quota/etcd_database_size_bytes`.<br>_Se muestra en bytes_ |
| **gcp.container.quota.quota.nodes_per_cluster.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuotas `container.googleapis.com/quota/nodes_per_cluster`.|
| **gcp.container.quota.quota.nodes_per_cluster.limit** <br>(gauge) | Límite actual de la métrica de cuotas `container.googleapis.com/quota/nodes_per_cluster`.|
| **gcp.container.quota.quota.nodes_per_cluster.usage** <br>(gauge) | Uso actual de la métrica de cuotas `container.googleapis.com/quota/nodes_per_cluster`.|
| **gcp.container.quota.quota.pods_per_cluster_autopilot.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuotas `container.googleapis.com/quota/pods_per_cluster_autopilot`.|
| **gcp.container.quota.quota.pods_per_cluster_autopilot.limit** <br>(gauge) | Límite actual de la métrica de cuotas `container.googleapis.com/quota/pods_per_cluster_autopilot`.|
| **gcp.container.quota.quota.pods_per_cluster_autopilot.usage** <br>(gauge) | Uso actual de la métrica de cuotas `container.googleapis.com/quota/pods_per_cluster_autopilot`.|
| **gcp.container.quota.quota.pods_per_cluster_standard.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuotas `container.googleapis.com/quota/pods_per_cluster_standard`.|
| **gcp.container.quota.quota.pods_per_cluster_standard.limit** <br>(gauge) | Límite actual de la métrica de cuotas `container.googleapis.com/quota/pods_per_cluster_standard`.|
| **gcp.container.quota.quota.pods_per_cluster_standard.usage** <br>(gauge) | Uso actual de la métrica de cuotas `container.googleapis.com/quota/pods_per_cluster_standard`.|
| **gcp.container.uptime** <br>(gauge) | Tiempo en segundos que el contenedor ha estado funcionando.<br>_Se muestra en segundos_ |

### Eventos

La integración Google Container Engine no incluye eventos.

### Checks de servicio

La integración Google Container Engine no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

ntegrat