---
title: DatadogDashboard CRD
description: Deploy and manage Datadog dashboards using the DatadogDashboard custom resource definition with the Datadog Operator
---
To deploy a Datadog dashboard, you can use the Datadog Operator and `DatadogDashboard` custom resource definition (CRD).

### Prerequisites
- [Helm][1]
- [`kubectl` CLI][2]
- [Datadog Operator][3] v0.6+

### Setup

1. Run the install command, substituting your Datadog API and application keys:
   ```shell
   helm install my-datadog-operator datadog/datadog-operator --set apiKey=<DATADOG_API_KEY> --set appKey=<DATADOG_APP_KEY> --set datadogDashboard.enabled=true --set datadogCRDs.crds.datadogDashboards=true
   ```

1. Create a file with the spec of your `DatadogDashboard` deployment configuration.

   **Example**:

   {{< code-block lang="yaml" filename="datadog-dashboard.yaml" collapsible="true" >}}
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

   For all available configuration options, see the [Create a new dashboard API reference][4].

2. Deploy your `DatadogDashboard`:

   ```shell
   kubectl apply -f /path/to/your/datadog-dashboard.yaml
   ```

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /api/latest/dashboards/#create-a-new-dashboard
