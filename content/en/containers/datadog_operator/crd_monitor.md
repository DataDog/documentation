---
title: DatadogMonitor CRD
---

To deploy a Datadog monitor, you can use the Datadog Operator and `DatadogMonitor` custom resource definition (CRD).

### Prerequisites
- [Helm][1]
- [`kubectl` CLI][2]
- [Datadog Operator][3] v0.6+

### Setup

1. Create a file with the spec of your `DatadogMonitor` deployment configuration.

   **Example**:

   The following example spec creates a [metric monitor][4] that alerts on the query `avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5`.

   {{< code-block lang="yaml" filename="datadog-metric-monitor.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogDashboard
   metadata:
     name: example-dashboard
   spec:
     title: Test Dashboard
     layoutType: ordered
     tags:
       - "team:my_team"
     templateVariables:
       - availableValues:
           - host1
           - host2
           - host3
         name: first
         prefix: bar-foo
     notifyList:
       - foobar@example.com
     widgets: '[{
               "id": 2639892738901474,
               "definition": {
                   "title": "",
                   "title_size": "16",
                   "title_align": "left",
                   "show_legend": true,
                   "legend_layout": "auto",
                   "legend_columns": [
                       "avg",
                       "min",
                       "max",
                       "value",
                       "sum"
                   ],
                   "type": "timeseries",
                   "requests": [
                       {
                           "formulas": [
                               {
                                   "formula": "query1"
                               }
                           ],
                           "queries": [
                               {
                                   "name": "query1",
                                   "data_source": "metrics",
                                   "query": "avg:system.cpu.user{*} by {host}"
                               }
                           ],
                           "response_format": "timeseries",
                           "style": {
                               "palette": "dog_classic",
                               "order_by": "values",
                               "line_type": "solid",
                               "line_width": "normal"
                           },
                           "display_type": "line"
                       }
                   ]
               },
               "layout": {
                   "x": 0,
                   "y": 0,
                   "width": 4,
                   "height": 2
               }
            }]'
   {{< /code-block >}}

   For all available configuration options, see the [Create a new dashboard API reference][5].

2. Deploy your `DatadogMonitor`:

   ```shell
   kubectl apply -f /path/to/your/datadog-metric-monitor.yaml
   ```

### Additional examples

#### Metric monitors
- [A pod is in CrashLoopBackOff][6]
- [A pod is in ImagePullBackOff][8]
- [More than one deployment replica's pods are down][7]
- [More than one StatefulSet replica's pods are down][12]
- [More than 20% of nodes on a cluster are unschedulable][9]
- [More than 10 pods are failing in a cluster][10]
- [Pods are restarting multiple times in the last five minutes][11]


#### Other monitors
- [Audit monitor][13]
- [Event monitor][14]
- [Event V2 monitor][15]
- [Log monitor][16]
- [Process monitor][17]
- [RUM monitor][18]
- [Service check monitor][19]
- [SLO monitor][20]
- [Trace analytics monitor][21]


[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /monitors/types/metric/?tab=threshold
[5]: /api/latest/dashboards/#create-a-new-dashboard
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