---
title: Data Jobs Monitoring for Spark on Kubernetes
description: "Set up Data Jobs Monitoring for Apache Spark applications on Kubernetes clusters using the Datadog Agent and admission controller."
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

[Data Jobs Monitoring][6] gives visibility into the performance and reliability of Apache Spark applications on Kubernetes.

## Setup
<div class="alert alert-info">Data Jobs Monitoring requires <a href="https://github.com/DataDog/datadog-agent/releases" target="_blank">Datadog Agent version</a> 7.55.0 or later, and <a href="https://github.com/DataDog/dd-trace-java/releases" target="_blank">Java tracer</a> version 1.38.0 or later.</div>

Follow these steps to enable Data Jobs Monitoring for Spark on Kubernetes.

1. [Install the Datadog Agent](#install-the-datadog-agent-on-your-kubernetes-cluster) on your Kubernetes cluster.
2. [Inject Spark instrumentation](#inject-spark-instrumentation).


### Install the Datadog Agent on your Kubernetes cluster

If you have already [installed the Datadog Agent on your Kubernetes cluster][1], ensure that you have enabled the [Datadog Admission Controller][2]. You can then go to the next step, [Inject Spark instrumentation](#inject-spark-instrumentation).

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

   Replace `<DATADOG_AGENT_VERSION>` with version `7.55.0` or later.

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

   Replace `<DATADOG_AGENT_VERSION>` with version `7.55.0` or later.

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

### Inject Spark instrumentation

When you run your Spark job, use the following configurations:

`spark.kubernetes.{driver,executor}.label.admission.datadoghq.com/enabled` (Required)
: `true`

`spark.kubernetes.{driver,executor}.annotation.admission.datadoghq.com/java-lib.version` (Required)
: `latest`

`spark.{driver,executor}.extraJavaOptions`
:  `-Ddd.data.jobs.enabled=true` (Required)
   : `true`

   `-Ddd.service` (Optional)
   : Your service name. Because this option sets the _job name_ in Datadog, it is recommended that you use a human-readable name.

   `-Ddd.env` (Optional)
   : Your environment, such as `prod` or `dev`.

   `-Ddd.version` (Optional)
   : Your version.

   `-Ddd.tags` (Optional)
   : Other tags you wish to add, in the format `<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>`.


#### Example: spark-submit

```shell
spark-submit \
  --class org.apache.spark.examples.SparkPi \
  --master k8s://<CLUSTER_ENDPOINT> \
  --conf spark.kubernetes.container.image=895885662937.dkr.ecr.us-west-2.amazonaws.com/spark/emr-6.10.0:latest \
  --deploy-mode cluster \
  --conf spark.kubernetes.namespace=<NAMESPACE> \
  --conf spark.kubernetes.authenticate.driver.serviceAccountName=<SERVICE_ACCOUNT> \
  --conf spark.kubernetes.authenticate.executor.serviceAccountName=<SERVICE_ACCOUNT> \
  --conf spark.kubernetes.driver.label.admission.datadoghq.com/enabled=true \
  --conf spark.kubernetes.executor.label.admission.datadoghq.com/enabled=true \
  --conf spark.kubernetes.driver.annotation.admission.datadoghq.com/java-lib.version=latest \
  --conf spark.kubernetes.executor.annotation.admission.datadoghq.com/java-lib.version=latest \
  --conf spark.driver.extraJavaOptions="-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
  --conf spark.executor.extraJavaOptions="-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
  local:///usr/lib/spark/examples/jars/spark-examples.jar 20
```

#### Example: AWS start-job-run

```shell
aws emr-containers start-job-run \
--virtual-cluster-id <EMR_CLUSTER_ID> \
--name myjob \
--execution-role-arn <EXECUTION_ROLE_ARN> \
--release-label emr-6.10.0-latest \
--job-driver '{
  "sparkSubmitJobDriver": {
    "entryPoint": "s3://BUCKET/spark-examples.jar",
    "sparkSubmitParameters": "--class <MAIN_CLASS> --conf spark.kubernetes.driver.label.admission.datadoghq.com/enabled=true --conf spark.kubernetes.executor.label.admission.datadoghq.com/enabled=true --conf spark.kubernetes.driver.annotation.admission.datadoghq.com/java-lib.version=latest --conf spark.kubernetes.executor.annotation.admission.datadoghq.com/java-lib.version=latest --conf spark.driver.extraJavaOptions=\"-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>\"  --conf spark.executor.extraJavaOptions=\"-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>\""
  }
}

```
## Validation

In Datadog, view the [Data Jobs Monitoring][5] page to see a list of all your data processing jobs.

## Advanced Configuration

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

