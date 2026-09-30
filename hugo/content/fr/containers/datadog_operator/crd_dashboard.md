---
description: Déployer et gérer les dashboards Datadog en utilisant la définition de
  ressource personnalisée DatadogDashboard avec le Datadog Operator
title: CRD DatadogDashboard
---
Pour déployer un dashboard Datadog, vous pouvez utiliser le Datadog Operator et la définition de ressource personnalisée (CRD) `DatadogDashboard`.

### Prérequis
- [Helm][1]
- [`kubectl` CLI][2]
- [Datadog Operator][3] v0.6+

### Configuration

1. Exécutez la commande d'installation en remplaçant vos clés d'API et d'application Datadog :
   ```shell
   helm install my-datadog-operator datadog/datadog-operator --set apiKey=<DATADOG_API_KEY> --set appKey=<DATADOG_APP_KEY> --set datadogDashboard.enabled=true --set datadogCRDs.crds.datadogDashboards=true
   ```

1. Créez un fichier avec les spécifications de votre configuration de déploiement `DatadogDashboard`.

   **Exemple** :

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

   Pour découvrir toutes les options de configuration disponibles, consultez la section [Référence de l'API de création d'un dashboard][4].

2. Déployez votre `DatadogDashboard` :

   ```shell
   kubectl apply -f /path/to/your/datadog-dashboard.yaml
   ```

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /fr/containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /fr/api/latest/dashboards/#create-a-new-dashboard