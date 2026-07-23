---
title: DatadogGenericResource CRD
description: Create and manage Datadog resources using the DatadogGenericResource custom resource definition with the Datadog Operator
further_reading:
  - link: "https://github.com/DataDog/datadog-operator/blob/main/docs/datadoggenericresource/datadog_generic_resource.md"
    tag: "GitHub"
    text: "DatadogGenericResource guide"
  - link: "https://github.com/DataDog/datadog-operator/blob/main/docs/datadoggenericresource/datadog_generic_resource_migration.md"
    tag: "GitHub"
    text: "Migrating to DatadogGenericResource"
---

To create and manage Datadog resources with the Datadog Operator, use the `DatadogGenericResource` custom resource definition (CRD). `DatadogGenericResource` uses the Datadog API JSON payload for each supported resource type in `spec.jsonSpec`.

`DatadogGenericResource` is the preferred CRD for Datadog resources that are supported by both `DatadogGenericResource` and older resource-specific CRDs, such as `DatadogMonitor`, `DatadogDashboard`, and `DatadogSLO`.

## Prerequisites
- [Helm][1]
- [`kubectl` CLI][2]
- [Datadog Operator][3] v1.12+
- Datadog API and application keys with permissions for the resources you create

## Supported resources

| Type | Operator version | API reference |
| ---- | ---------------- | ------------- |
| `notebook` | v1.12.0 | [Create a notebook][4] |
| `synthetics_api_test` | v1.12.0 | [Create an API test][5] |
| `synthetics_browser_test` | v1.12.0 | [Create a browser test][6] |
| `monitor` | v1.13.0 | [Create a monitor][7] |
| `downtime` | v1.22.0 | [Schedule a downtime][8] |
| `dashboard` | v1.27.0 | [Create a dashboard][9] |
| `slo` | v1.28.0 | [Create an SLO object][10] |

## Setup

1. Run the installation command, substituting your Datadog API and application keys:

   ```shell
   helm install datadog-operator datadog/datadog-operator \
     --set apiKey=<DATADOG_API_KEY> \
     --set appKey=<DATADOG_APP_KEY> \
     --set datadogCRDs.crds.datadogGenericResources=true \
     --set datadogGenericResource.enabled=true
   ```

2. Create a file with the spec of your `DatadogGenericResource` configuration.

   **Example**: Monitor

   {{< code-block lang="yaml" filename="datadog-generic-resource-monitor.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogGenericResource
   metadata:
     name: example-monitor
     namespace: <operator namespace>
   spec:
     type: monitor
     jsonSpec: |-
       {
         "name": "Example Monitor",
         "type": "metric alert",
         "query": "avg(last_10m):avg:system.cpu.user{*} > 80",
         "message": "CPU usage is high",
         "tags": [
           "team:example"
         ],
         "options": {
           "notify_no_data": false
         }
       }
   {{< /code-block >}}

3. Deploy your `DatadogGenericResource`:

   ```shell
   kubectl apply -f /path/to/your/datadog-generic-resource-monitor.yaml
   ```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /api/latest/notebooks/#create-a-notebook
[5]: /api/latest/synthetics/#create-an-api-test
[6]: /api/latest/synthetics/#create-a-browser-test
[7]: /api/latest/monitors/#create-a-monitor
[8]: /api/latest/downtimes/#schedule-a-downtime
[9]: /api/latest/dashboards/#create-a-new-dashboard
[10]: /api/latest/service-level-objectives/#create-an-slo-object
