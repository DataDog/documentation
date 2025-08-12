---
title: CRD para monitores de Datadog
---

Para desplegar un monitor de Datadog, puedes utilizar el Datadog Operator y la definición de recursos personalizados (CRD) `DatadogMonitor`.

### Requisitos previos
- [Helm][1]
- [CLI `kubectl`][2]
- [Datadog Operator][3] v0.6 o posterior

### Configuración

1. Crea un archivo con las especificaciones de configuración de despliegue de tu `DatadogMonitor`.

   **Ejemplo**:

   Las siguientes especificaciones de ejemplo crean un [monitor de métricas][4] que alerta sobre la consulta `avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5`.

   {{< code-block lang="yaml" filename="datadog-metric-monitor.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogMonitor
   metadata:
     name: datadog-monitor-test
     namespace: datadog
   spec:
     query: "avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5"
     type: "metric alert"
     name: "Test monitor made from DatadogMonitor"
     message: "1-2-3 testing"
     tags:
       - "test:datadog"
     priority: 5
     options:
       evaluationDelay: 300
       includeTags: true
       locked: false
       newGroupDelay: 300
       notifyNoData: true
       noDataTimeframe: 30
       renotifyInterval: 1440
       thresholds:
         critical: "0.5"
         warning: "0.28"
   {{< /code-block >}}

   Para conocer todas las opciones de configuración disponibles, consulta la [referencia de la API para crear un nuevo monitor][5].

2. Despliega tu `DatadogMonitor`:

   ```shell
   kubectl apply -f /path/to/your/datadog-metric-monitor.yaml
   ```

### Ejemplos adicionales

#### Monitores de métricas
- [Hay un pod en CrashLoopBackOff][6]
- [Hay un pod en ImagePullBackOff][8]
- [Los pods de más de una réplica de despliegue están inactivos][7]
- [Los pods de más de una réplica de StatefulSet están inactivos][12]
- [Más del 20 % de los nodos de un clúster no son programables][9].
- [Más de 10 pods están fallando en un clúster][10]
- [Los pods se están reiniciando varias veces en los últimos cinco minutos][11]


#### Otros monitores
- [Monitor de auditoría][13]
- [Monitor de eventos][14]
- [Monitor de eventos V2][15]
- [Monitores de logs][16]
- [Monitor de proceso][17]
- [Monitor RUM][18]
- [Monitor de checks de servicios][19]
- [Monitor de SLO][20]
- [Monitor de análisis de trazas (traces)][21]


[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /es/containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /es/monitors/types/metric/?tab=threshold
[5]: /es/api/latest/monitors/#create-a-monitor
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-crashloopbackoff.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-deployment-replicas.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-imagepullbackoff.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-nodes-unavailable.yaml
[10]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-pods-failed-state.yaml
[11]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-pods-restarting.yaml
[12]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-statefulset-replicas.yaml
[13]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/audit-alert-monitor-test.yaml
[14]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/event-alert-monitor-test.yaml
[15]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/event-v2-alert-monitor-test.yaml
[16]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/log-alert-monitor-test.yaml
[17]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/process-alert-monitor-test.yaml
[18]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/rum-alert-monitor-test.yaml
[19]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/service-check-monitor-test.yaml
[20]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/slo-alert-monitor-test.yaml
[21]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/trace-analytics-alert-monitor-test.yaml