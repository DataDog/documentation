---
description: Pasos para solucionar la discrepancia en las métricas de Google Cloud
further_reading:
- link: https://docs.datadoghq.com/integrations/google-cloud-platform/
  tag: Integración
  text: Integración con Google Cloud
title: Discrepancia en las métricas de Google Cloud
---

## Información general

Utiliza esta guía para solucionar discrepancias en las métricas entre Google Cloud y Datadog.

## Discrepancias en las métricas

Datadog ingiere los valores brutos más detallados de Google Cloud. Toda la agregación que se ve en Datadog se realiza en Datadog. La ingesta de métricas de Datadog importa los valores brutos de Google como indicadores (gauge), y cualquier otra agregación se realiza en Datadog. Los siguientes pasos concilian la métrica `gcp.redis.stats.cpu_utilization` entre Google Cloud y Datadog.

1. Busca la métrica correspondiente en Google Cloud.

   Para la integración con Google Cloud, Datadog convierte las métricas de Google Cloud al formato `gcp.Google_Cloud_SERVICE_NAME.METRIC_NAME`. Para la [métrica de ejemplo][1], el nombre del servicio de Google Cloud es **redis**, y el nombre de la métrica es **stats/cpu_utilization**. El nombre completo de la métrica es `redis.googleapis.com/stats/cpu_utilization`.

2. Encuentra las dimensiones más detalladas.

   Estas incluyen todas las **etiquetas de recursos**: `project_id`,`region`, `instance_id`, `node_id`, y **etiquetas de métricas**: `role`, `space`, `relationship`. Consulta la [documentación de Google Cloud][2] para otras métricas.

   {{< img src="integrations/guide/gcp-metric-discrepancy/labels_definition.png" alt="definición de etiquetas en la documentación de GCP" >}}

   El tipo de recurso está asociado a cada métrica bajo un servicio de Google Cloud. A continuación, se muestran los tipos de recursos admitidos para el servicio **redis**. El tipo de recurso de la métrica de ejemplo es `redis_instance`. `redis_instance` tiene **Etiquetas de recursos**: `project_id`,`region`, `instance_id`, `node_id`.
   - [redis.googleapis.com/Cluster][3]
   - [redis_instance][4]
   - [redis.googleapis.com/ClusterNode][5]

   {{< img src="integrations/guide/gcp-metric-discrepancy/redis_instance.png" alt="etiquetas de recursos de redis_instance" >}}

3. Grafica la métrica en el Google Cloud Metrics Explorer.

   Busca `redis.googleapis.com/stats/cpu_utilization`.
   - Hora: 1 hora (idealmente en UTC)
   - Espacio de nombres: Cloud Memorystore Redis Instance
   - Nombre de la métrica: CPU Seconds
   - Filtro: (dimensiones más detalladas) project_id, region, instance_id, node_id, role, space, relationship.
   - Agregación: Sum (debe mostrar los mismos valores cuando se utiliza mean, min, max, sum, o none si se utilizan las dimensiones más detalladas)
   - Intervalo mínimo: 1 m

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_metric_explorer.png" alt="gcp metric explorer" >}}

4. Grafica la métrica en el Datadog Metrics Explorer. 

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_metric_explorer.png" alt="datadog metric explorer" >}}

   En la mayoría de los casos, tras completar los pasos 1 a 4, verás exactamente los mismos valores tanto en Google Cloud como en Datadog. Sin embargo, en nuestro ejemplo, aparece una discrepancia a las 01:40:00 PM.

   - **Datadog**: 108.71ms 
   - **Google Cloud**: 0.0018119s

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_value.png" alt="valor de gcp" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_value.png" alt="valor de datadog" >}}


5. Comprende las funciones de alineación de Google Cloud.

   Esta discrepancia se produce porque, por defecto, Google Cloud aplica una alineación de tasas para esta métrica. Para más detalles, consulta la documentación de [función de alineación][6] de Google Cloud. Haz clic en `configure aligner` para ver que la función de alineación se establece automáticamente en **rate** (tasa) (0,108711 / 60 ≃ 0,0018119).

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_aligner.png" alt="alineador de gcp" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_rate.png" alt="tasa de gcp" >}}

6. Ajusta la función de alineación en Google Cloud.

   Cambia la función de alineación a `delta`, `min`, `max`, `sum` o `mean`. Suponiendo que estás utilizando las dimensiones más detalladas, el valor en Google Cloud debe coincidir con el valor en Datadog.

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_delta.png" alt="gcp delta" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/monitoring/api/metrics_gcp_p_z#gcp-redis:~:text=of%20%5Bprimary%2C%20replica%5D.-,stats/cpu_utilization,-GA%20%E2%80%83(project)
[2]: https://cloud.google.com/monitoring/api/metrics_gcp
[3]: https://cloud.google.com/monitoring/api/resources#tag_redis.googleapis.com/Cluster
[4]: https://cloud.google.com/monitoring/api/resources#tag_redis_instance
[5]: https://cloud.google.com/monitoring/api/resources#tag_redis.googleapis.com/ClusterNode
[6]: https://cloud.google.com/monitoring/api/v3/aggregation#alignment-intro