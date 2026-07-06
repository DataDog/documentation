---
title: "Data Observability: Jobs Monitoring for Spark on Kubernetes"
description: "Set up Data Observability: Jobs Monitoring for Apache Spark applications on Kubernetes clusters using the Datadog Agent and Single Step Instrumentation."
aliases:
  - /data_jobs/kubernetes
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Observability: Jobs Monitoring'
---

[Data Observability: Jobs Monitoring][6] gives visibility into the performance and reliability of Apache Spark applications on Kubernetes.

## Setup

<div class="alert alert-info">Data Observability: Jobs Monitoring requires <a href="https://github.com/DataDog/datadog-agent/releases" target="_blank">Datadog Agent version</a> 7.64.0 or later, and <a href="https://github.com/DataDog/dd-trace-java/releases" target="_blank">Java tracer</a> version 1.38.0 or later.</div>

Follow these steps to enable Data Observability: Jobs Monitoring for Spark on Kubernetes.

1. [Install the Datadog Agent](#install-the-datadog-agent-on-your-kubernetes-cluster) on your Kubernetes cluster.
2. [Enable Single Step Instrumentation](#enable-single-step-instrumentation).

### Install the Datadog Agent on your Kubernetes cluster

If you have already [installed the Datadog Agent on your Kubernetes cluster][1], make sure you've enabled the [Datadog Admission Controller][2]. You can then go to the next step, [Enable Single Step Instrumentation](#enable-single-step-instrumentation).

You can install the Datadog Agent using the [Datadog Operator][3] or [Helm][4].

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Prerequisites
- Kubernetes cluster version v1.20.X+
- [`Helm`][1]
- The [`kubectl` CLI][2]

### Installation
1. Install the Datadog Operator by running the following commands:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
1. Create a [Kubernetes Secret][3] to store your Datadog API key.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   Replace `<DATADOG_API_KEY>` with your [Datadog API key][4].
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
       # (Optional) Uncomment the next three lines to enable logs collection
       # logCollection:
         # enabled: true
         # containerCollectAll: true
     global:
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
     override:
       nodeAgent:
         image:
           tag: <DATADOG_AGENT_VERSION>
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][5]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).

   Replace `<DATADOG_AGENT_VERSION>` with version `7.64.0` or later.

   **Optional**: Uncomment the `logCollection` section to start collecting application logs which will be correlated to Spark job run traces. Once enabled, logs are collected from all discovered containers by default. See the [Kubernetes log collection documentation][7] for more details on the setup process.
1. Deploy the Datadog Agent with the above configuration file:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
[1]: https://helm.sh
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /getting_started/site
[7]: /containers/kubernetes/log/?tab=datadogoperator#log-collection
{{% /tab %}}
{{% tab "Helm" %}}

1. Create a [Kubernetes Secret][1] to store your Datadog API key.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   Replace `<DATADOG_API_KEY>` with your [Datadog API key][2].
1. Create a file, `datadog-values.yaml`, that contains the following configuration:
   ```yaml
   datadog:
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       portEnabled: true
       port: 8126
     # (Optional) Uncomment the next three lines to enable logs collection
     # logs:
       # enabled: true
       # containerCollectAll: true

   agents:
     image:
       tag: <DATADOG_AGENT_VERSION>

   clusterAgent:
     admissionController:
       enabled: true
       muteUnlabelled: false
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][4]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).

   Replace `<DATADOG_AGENT_VERSION>` with version `7.64.0` or later.

   **Optional**: Uncomment the logs section to start collecting application logs which will be correlated to Spark job run traces. Once enabled, logs are collected from all discovered containers by default. See the [Kubernetes log collection documentation][5] for more details on the setup process.
1. Run the following command:
   ```shell
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

   - Replace `<RELEASE_NAME>` with your release name. For example, `datadog-agent`.

   - Replace `<TARGET_SYSTEM>` with the name of your OS. For example, `linux` or `windows`.

[1]: https://kubernetes.io/docs/concepts/configuration/secret/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /getting_started/site
[5]: /containers/kubernetes/log/?tab=helm#log-collection
{{% /tab %}}
{{< /tabs >}}

### Enable Single Step Instrumentation

Single Step Instrumentation (SSI) injects the Java tracer into your Spark driver and executor pods at startup. It works regardless of whether your Spark driver runs in **cluster mode** (as a dedicated Kubernetes pod) or **client mode** (as a process inside your submitter pod; for example, an Airflow scheduler or worker).

Spark automatically sets `spark-role: driver` on driver pods and `spark-role: executor` on executor pods. In client mode, replace `spark-role: driver` with the labels that identify your submitter pod instead. To find those labels, run:

```shell
kubectl get pod <SUBMITTER_POD_NAME> -n <NAMESPACE> --show-labels
```

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Requires [Datadog Operator][100] version 1.13.0 or later.

Add the `features.apm.instrumentation` section to your `datadog-agent.yaml` and apply it:

```yaml
features:
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: spark-driver
          namespaceSelector:
            matchNames:
              - <NAMESPACE>   # namespace where your Spark jobs run
          podSelector:
            matchLabels:
              spark-role: driver   # replace with your submitter pod labels if running in client mode
          ddTraceVersions:
            java: "latest"
          ddTraceConfigs:
            - name: DD_DATA_JOBS_ENABLED
              value: "true"
        - name: spark-executor
          namespaceSelector:
            matchNames:
              - <NAMESPACE>
          podSelector:
            matchLabels:
              spark-role: executor
          ddTraceVersions:
            java: "latest"
          ddTraceConfigs:
            - name: DD_DATA_JOBS_ENABLED
              value: "true"
```

```shell
kubectl apply -f /path/to/your/datadog-agent.yaml
```

[100]: https://github.com/DataDog/datadog-operator/releases

{{% /tab %}}
{{% tab "Helm" %}}

Add the following to your `datadog-values.yaml` and apply it:

```yaml
datadog:
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: spark-driver
          namespaceSelector:
            matchNames:
              - <NAMESPACE>   # namespace where your Spark jobs run
          podSelector:
            matchLabels:
              spark-role: driver   # replace with your submitter pod labels if running in client mode
          ddTraceVersions:
            java: "latest"
          ddTraceConfigs:
            - name: DD_DATA_JOBS_ENABLED
              value: "true"
        - name: spark-executor
          namespaceSelector:
            matchNames:
              - <NAMESPACE>
          podSelector:
            matchLabels:
              spark-role: executor
          ddTraceVersions:
            java: "latest"
          ddTraceConfigs:
            - name: DD_DATA_JOBS_ENABLED
              value: "true"
```

```shell
helm upgrade <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
```

{{% /tab %}}
{{< /tabs >}}

After applying the configuration, restart the targeted pods. SSI injects the init container into each pod on startup.

## Validation

In Datadog, view the [Data Observability: Jobs Monitoring][5] page to see a list of all your data processing jobs.

## Advanced Configuration

### Set service, environment, and version tags

To attach service, environment, and version tags to your job traces, pass the following JVM options in your spark-submit configuration or `spark-defaults.conf`:

```
spark.driver.extraJavaOptions=-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION>
spark.executor.extraJavaOptions=-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION>
```

### Tag spans at runtime

{{% djm-runtime-tagging %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/installation/?tab=operator
[2]: /containers/cluster_agent/admission_controller/?tab=operator
[3]: /containers/datadog_operator
[4]: https://helm.sh
[5]: https://app.datadoghq.com/data-jobs/
[6]: /data_jobs
