---
title: Data Jobs Monitoring for Spark on Kubernetes
kind: documentation
---

{{< callout url="https://forms.gle/PZUoEgtBsH6qM62MA" >}}
Data Jobs Monitoring is in private beta. Fill out this form to join the wait list.
{{< /callout >}} 

Data Jobs Monitoring gives visibility into the performance and reliability of Apache Spark applications on Kubernetes.

## Setup

Follow these steps to enable Data Jobs Monitoring for Apache Spark applications on Kubernetes.

1. Install the Datadog Agent on your Kubernetes cluster.
2. Inject Spark instrumentation

### Install the Datadog Agent on your Kubernetes cluster

If you have already [installed the Datadog Agent on your Kubernetes cluster][1], ensure that you have enabled the [Datadog Admission Controller][2]. You can then go to the next step, [Inject Spark instrumentation](#inject-spark-instrumentation).

You can install the Datadog Agent using the [Datadog Operator][3] or [Helm][4].

{{< tabs >}}
{{% tab "Datadog Operator" %}}
#### Prerequisites
- Kubernetes cluster version v1.20.X+
- [`Helm`][1]
- The [`kubectl` CLI][2]

#### Installation
1. Install the Datadog Operator by running the following commands:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
1. Create a [Kubernetes Secret][3] to store your Datadog API key.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   - Replace `<DATADOG_API_KEY>` with your [Datadog API key][4].
   - Replace `<DATADOG_APP_KEY>` with your [Datadog app key][6].
1. Create a file, `datadog-agent.yaml`, that contains the following configuration:

   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
    features:
        apm:
        enabled: true
        hostPortConfig:
            enabled: true
            hostPort: 8126
        admissionController:
        enabled: true
        mutateUnlabelled: false
     global:
       tags:
         - 'data_workload_monitoring_trial:true'
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][5]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).
1. Deploy the Datadog Agent with the above configuration file:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
[1]: https://helm.sh
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /getting_started/site
[6]: https://app.datadoghq.com/organization-settings/application-keys
{{% /tab %}}
{{% tab "Helm" %}}

1. Create a [Kubernetes Secret][1] to store your Datadog API key.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   - Replace `<DATADOG_API_KEY>` with your [Datadog API key][2].
   - Replace `<DATADOG_APP_KEY>` with your [Datadog app key][3].
1. Create a file, `datadog-values.yaml`, that contains the following configuration:
   ```yaml
   datadog:
     apiKeyExistingSecret: datadog-secret
     appKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       portEnabled: true
       port: 8126
     tags:
       - 'data_workload_monitoring_trial:true' 

   clusterAgent:
     admissionController:
       enabled: true
       muteUnlabelled: false
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][4]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).
1. Run the following command:
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

   - Replace `<RELEASE_NAME>` with your release name. For example, `datadog-agent`.

   - Replace `<TARGET_SYSTEM>` with the name of your OS. For example, `linux` or `windows`.

[1]: https://kubernetes.io/docs/concepts/configuration/secret/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /getting_started/site
{{% /tab %}}
{{< /tabs >}}

### Inject Spark instrumentation
TK

## Validation

In Datadog, visit the [Data Jobs Monitoring][5] page to see a list of all your data processing jobs.

[1]: /containers/kubernetes/installation/?tab=operator
[2]: /containers/cluster_agent/admission_controller/?tab=operator
[3]: /containers/datadog_operator
[4]: https://helm.sh
[5]: https://app.datadoghq.com/apm/data-jobs