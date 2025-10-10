---
title: CRD para dashboards Datadog
---
Para desplegar un dashboard Datadog, puedes utilizar el Datadog Operator y la definición personalizada de recursos (CRD) `DatadogDashboard`.

### Requisitos previos
- [Helm][1]
- [CLI `kubectl`][2]
- [Datadog Operator][3] v0.6 o posterior

### Configuración

1. Crea un archivo con las especificaciones de configuración de despliegue de tu`DatadogDashboard`.

   **Ejemplo**:

   {{< code-block lang="yaml" filename="datadog-dashboard.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogDashboard
   metadatos:
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

   Para conocer todas las opciones de configuración disponibles, consulta la [referencia de la API para crear un nuevo dashboard][4].

2. Despliega tu `DatadogDashboard`:

   ```shell
   kubectl apply -f /path/to/your/datadog-dashboard.yaml
   ```

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /es/containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /es/api/latest/dashboards/#create-a-new-dashboard