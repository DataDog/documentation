---
title: DatadogSLO CRD
description: Create and manage Datadog Service Level Objectives (SLOs) using the DatadogSLO custom resource definition
---

To create a [Service Level Objective][1] (SLO), you can use the Datadog Operator and `DatadogSLO` custom resource definition (CRD).

### Prerequisites
- [Helm][2]
- [`kubectl` CLI][3]
- [Datadog Operator][4] v0.6+

### Setup

1. Create a file with the spec of your `DatadogSLO` deployment configuration.

   **Example**: [Monitor-based][5] SLO

   {{< code-block lang="yaml" filename="datadog-slo.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogSLO
   metadata:
     name: example-slo-monitor3
     namespace: system 
   spec:
     name: example-slo-monitor3
     description: "This is an example monitor SLO from datadog-operator"
     monitorIDs:
       - 1234
     tags:
       - "service:example"
       - "env:prod"
     targetThreshold: "99.9"
     timeframe: "7d"
     type: "monitor"
   {{< /code-block >}}

   **Example**: [Metric-based][6] SLO

   {{< code-block lang="yaml" filename="datadog-slo.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogSLO
   metadata:
     name: example-slo
     namespace: system 
   spec:
     name: example-slo
     description: "This is an example metric SLO from datadog-operator"
     query:
       denominator: "sum:requests.total{service:example,env:prod}.as_count()"
       numerator: "sum:requests.success{service:example,env:prod}.as_count()"
     tags:
       - "service:example"
       - "env:prod"
     targetThreshold: "99.9"
     timeframe: "7d"
     type: "metric"
   {{< /code-block >}}

   For all available configuration options, see the [Create an SLO object API reference][4].

2. Deploy your `DatadogSLO`:

   ```shell
   kubectl apply -f /path/to/your/datadog-slo.yaml
   ```

### Additional examples
[Metric-based SLO with Universal Service Monitoring][8]

[1]: /service_level_objectives/
[2]: https://helm.sh/
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: /api/latest/service-level-objectives/#create-an-slo-object
[5]: /service_level_objectives/monitor/
[6]: /service_level_objectives/metric/
[7]: /api/latest/service-level-objectives/#create-an-slo-object
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogslo/metric-usm-example.yaml
