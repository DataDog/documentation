---
title: Kubernetes log collection
description: Configure log collection from containerized applications running on Kubernetes using the Datadog Agent
aliases:
  - /agent/kubernetes/log
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: Blog
  text: Monitor logs from Amazon EKS on Fargate with Datadog
- link: "/agent/kubernetes/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/kubernetes/prometheus/"
  tag: "Documentation"
  text: "Collect your Prometheus metrics"
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Collect automatically your applications metrics and logs"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
- link: "/agent/kubernetes/tag/"
  tag: "Documentation"
  text: "Assign tags to all data emitted by a container"
- link: "/containers/troubleshooting/log-collection"
  tag: "Documentation"
  text: "Container Log Collection Troubleshooting"
---

This page discusses collecting logs from Kubernetes log files.

When your containerized applications write their logs to standard output and error (`stdout`/`stderr`), the container runtime and Kubernetes automatically manage the logs for you. The default pattern is that [Kubernetes stores these log streams as files][13] on the host in the `/var/log/pods` folder and subfolders for each Pod and container.

The Datadog Agent can collect these Kubernetes log files for these containers using the instructions below. This option scales well for the ephemeral nature of the Pods that Kubernetes creates, and is more resource-efficient than collecting logs from the Docker socket. Datadog recommends this method for log collection in Kubernetes.

Alternatively, the Datadog Agent can also collect logs by repeated requests to the Docker API through the Docker socket. However, this requires Docker as the container runtime for your Kubernetes cluster. This is also more resource-intensive than using log files. To see how to collect logs using the Docker socket, see [Log collection with Docker socket][1]. If your containerized applications are writing to log files stored in the container, this can complicate log collection. See [log collection from a file](#from-a-container-local-log-file).

## Setup

### Log collection

Before you start collecting application logs, ensure that you are running the Datadog Agent in your Kubernetes cluster.

To configure log collection manually in the DaemonSet, see [DaemonSet Log Collection][9]. Otherwise, follow the instructions below:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Update your `datadog-agent.yaml` manifest with:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

See the sample [manifest with logs, metrics, and APM collection enabled][1] for an additional example. You can set `features.logCollection.containerCollectAll` to `true` to collect logs from all discovered containers by default. When set to `false` (default), you need to specify Autodiscovery log configurations to enable log collection. For more information, see [Log discovery - Filtering](#filtering).

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

To enable log collection with Helm, update your [datadog-values.yaml][1] file with the following log collection configuration. Then, upgrade your Datadog Helm chart:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

You can set `datadog.logs.containerCollectAll` to `true` to collect logs from all discovered containers by default. When set to `false` (default), you need to specify Autodiscovery log configurations to enable log collection. For more information, see [Log discovery - Filtering](#filtering).

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### Unprivileged

{{< tabs >}}
{{% tab "Datadog Operator" %}}
(Optional) To run an unprivileged installation, add the following to the [DatadogAgent custom resource][1]:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

  override:
    nodeAgent:
      securityContext:
        runAsUser: <USER_ID>
        supplementalGroups:
          - <DOCKER_GROUP_ID>
```

- Replace `<USER_ID>` with the UID to run the Agent
- Replace `<DOCKER_GROUP_ID>` with the group ID that owns the Docker or containerd socket.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

(Optional) To run an unprivileged installation, add the following in the `values.yaml` file:

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

- Replace `<USER_ID>` with the UID to run the Agent.
- Replace `<DOCKER_GROUP_ID>` with the group ID that owns the Docker or containerd socket.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>Warning for unprivileged installations</strong>
<br/><br/>
When running an unprivileged installation, the Agent needs to be able to read log files in <code>/var/log/pods</code>.
<br/><br/>
If you are using the containerd runtime, the log files in <code>/var/log/pods</code> are readable by members of the <code>root</code> group. With the above instructions, the Agent runs with the <code>root</code> group. No action is required.
<br/><br/>
If you are using the Docker runtime, the log files in <code>/var/log/pods</code> are symbolic links to <code>/var/lib/docker/containers</code>, which is traversable only by the <code>root</code> user. Consequently, with the Docker runtime, it is not possible for a non-<code>root</code> Agent to read logs in <code>/var/log/pods</code>. The Docker socket must be mounted in the Agent container, so that it can get Pod logs through the Docker daemon.
<br/><br/>
To collect logs from <code>/var/log/pods</code> when the Docker socket is mounted, set the environment variable <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (or <code>logs_config.k8s_container_use_file</code> in <code>datadog.yaml</code>) to <code>true</code>. This forces the Agent to use file collection mode.
</div>

## Log discovery

The Datadog Agent in Kubernetes is deployed by a DaemonSet (managed by the Datadog Operator or Helm). This DaemonSet schedules one replica of the Agent Pod on each node of the cluster. Each Agent Pod is then responsible for reporting the logs of the other Pods and containers on its respective node. When the "Container Collect All" feature is enabled, the Agent reports the logs from every discovered container with a default set of tags.

### Filtering

When "Container Collect All" is enabled you can configure which containers you want to collect logs from. This can be useful to prevent the collection of the Datadog Agent logs, if desired. You can do this by passing configurations to the Datadog Agent to control what it pulls, or by passing configurations to the Kubernetes Pod to exclude certain logs more explicitly.

When filtering out logs through methods like `DD_CONTAINER_EXCLUDE_LOGS` or `ad.datadoghq.com/logs_exclude`, the Agent ignores log collection regardless of explicitly defined log collection configurations in [Autodiscovery annotations][19] or [Autodiscovery configuration files][20].

When "Container Collect All" is disabled (default) you don't need to add any filtering because everything is excluded by default. To include collection for only selected pods, you can enable the log configuration by [Autodiscovery annotations][19] or [Autodiscovery configuration files][20] for the desired pods.

See [Container Discovery Management][8] to learn more about filtering.

### Tagging

The Datadog Agent tags the logs from the Kubernetes containers with the default [Kubernetes tags][14], as well as any custom extracted tags. When "Container Collect All" is enabled, the Agent reports the logs for a container with a `source` and `service` tag matching the container short image name. For example, the logs from a container using the `gcr.io/owner/example-image:latest` container image would have `example-image` as the `source`, `service`, and `short_image` tag value.

The `service` tag can also be set by the [Unified Service Tagging][4] Pod label `tags.datadoghq.com/service: "<SERVICE>"`. For more information about `source` and `service` attributes, see [Reserved Attributes][11].

The `source` tag can be important for your logs, as the [out of box log pipelines][15] are filtered using this tag. However, these pipelines can be completely customized as desired. You can see the steps in the [Integration Logs](#integration-logs) section below for customizing the tags on your logs further.

## Integration logs

[Autodiscovery][10] enables you to use templates to configure log collection (and other capabilities) on containers. This can be used to enable log collection, customize tagging, and add advanced collection rules. To configure log collection for an integration with Autodiscovery you can either:

- Specify a log configuration as Autodiscovery Annotations on a given Pod, to configure the rules for a given container *(Recommended)*
- Specify a log configuration as a configuration file, to configure the rules for each matching container by image

At minimum, these log configurations require a `source` and `service` tag. You may want to match the `source` tag to one of Datadog's [out-of-the-box log pipelines][15] to help automatically enrich your logs. You can also find a [library of pipelines in Datadog][16].

### Autodiscovery annotations

With Autodiscovery, the Agent automatically searches all Pod annotations for integration templates.

To apply a specific configuration to a given container, add the annotation `ad.datadoghq.com/<CONTAINER_NAME>.logs` to your Pod with the JSON formatted log configuration. 

**Note**: Autodiscovery annotations identify containers by name, **not** image. It tries to match `<CONTAINER_NAME>` to the `.spec.containers[i].name`, not `.spec.containers[i].image`.

<div class="alert alert-info">
If you define your Kubernetes Pods <i>directly</i> (with <code>kind:Pod</code>), add each Pod's annotations in its <code>metadata</code> section, as shown in the following section.
<br/><br/>
If you define your Kubernetes Pods <i>indirectly</i> (with replication controllers, ReplicaSets, or Deployments), add Pod annotations to the Pod template under <code>.spec.template.metadata</code>.</div>

#### Configure a single container
To configure log collection for a given container within your Pod, add the following annotations to your Pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOG_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

#### Example log Autodiscovery annotations

The following Pod annotation defines the integration template for an example container. It is defined within the Pod template's annotations, rather than on the Deployment itself. This log configuration sets all the logs from the `app` container with the tags `source:java`, `service:example-app`, and the extra tag `foo:bar`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
  labels:
    app: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
      annotations:
        ad.datadoghq.com/app.logs: '[{"source":"java", "service":"example-app", "tags":["foo:bar"]}]'
    spec:
      containers:
        - name: app
          image: owner/example-image:latest
```

#### Configure two different containers
To apply two different integration templates to two different containers within your Pod, `<CONTAINER_NAME_1>` and `<CONTAINER_NAME_2>`, add the following annotations to your Pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_NAME_2>.logs: '[<LOG_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_NAME_1>'
    # (...)
    - name: '<CONTAINER_NAME_2>'
# (...)
```

### Autodiscovery configuration files
You can provide the Datadog Agent with configuration files to have the Agent run a specified integration when it discovers a container using the matching image identifier. This allows you to create a generic log configuration that applies to a set of container images.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
You can customize logs collection per integration with an override in the `override.nodeAgent.extraConfd.configDataMap`. This method creates the ConfigMap and mounts the desired configuration file onto the Agent container.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
            - <CONTAINER_IMAGE>
        
            logs:
            - source: example-source
              service: example-service
```

The `<CONTAINER_IMAGE>` should match the container short image name that you want this to apply towards. See the sample manifest [with ConfigMap mapping][1] for an additional example.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
You can customize logs collection per integration within `datadog.confd`. This method creates the ConfigMap and mounts the desired configuration file onto the Agent container.

```yaml
datadog:
  #(...)
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
      - <CONTAINER_IMAGE>
      
      logs:
      - source: example-source
        service: example-service
```

The `<CONTAINER_IMAGE>` should match the container short image name that you want this to apply towards.

{{% /tab %}}

{{% tab "Key-value store" %}}
The following etcd commands create a Redis integration template with a custom `password` parameter and tags logs with the correct `source` and `service` attributes:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]`, and `instances[0]`.

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, for example, `redis` OR `redis:latest`.

Autodiscovery can use [Consul][1], Etcd, and Zookeeper as integration template sources.

To use a key-value store, configure it in the Agent `datadog.yaml` configuration file and mount this file inside the containerized Agent. Alternatively, pass your key-value store as environment variables to the containerized Agent.

#### In `datadog.yaml`

In the `datadog.yaml` file, set the `<KEY_VALUE_STORE_IP>` address and `<KEY_VALUE_STORE_PORT>` of your key-value store:

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

Then [restart the Agent][2] to apply the configuration change.

#### In environment variables

With the key-value store enabled as a template source, the Agent looks for templates under the key `/datadog/check_configs`. Autodiscovery expects a key-value hierarchy like this:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Note**: To apply a specific configuration to a given container, Autodiscovery identifies containers by **image** when using the key-value stores by trying to match `<CONTAINER_IMAGE>` to `.spec.containers[0].image`.

[1]: /integrations/consul/
[2]: /agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## Advanced log collection

Use Autodiscovery log labels to apply advanced log collection processing logic, for example:

* [Filter logs before sending them to Datadog][5].
* [Scrub sensitive data from your logs][6].
* [Proceed to multi-line aggregation][7].

### From a container local log file

Datadog recommends that you use the `stdout` and `stderr` output streams for containerized applications, so that you can more automatically set up log collection.

However, the Agent can also directly collect logs from a file based on an annotation. To collect these logs, use `ad.datadoghq.com/<CONTAINER_NAME>.logs` with a `type: file` and `path` configuration. Logs collected from files with such an annotation are automatically tagged with the same set of tags as logs coming from the container itself. Datadog recommends that you use the `stdout` and `stderr` output streams for containerized applications, so that you can automatically set up log collection. For more information, see the [Recommended configurations](#recommended-configurations).

These file paths are **relative** to the Agent container. Therefore, the directory containing the log file needs to be mounted into both the application and Agent container so the Agent can have proper visibility.

For example, you can do this with a shared `hostPath` volume. The Pod below is emitting logs into the file `/var/log/example/app.log`. This is done in the `/var/log/example` directory, where a volume and volumeMount have set this as a `hostPath`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: logger
  annotations:
    ad.datadoghq.com/busybox.logs: |
      [{
          "type": "file",
          "path": "/var/log/example/app.log",
          "source": "example-source",
          "service": "example-service"
      }]
spec:
  containers:
   - name: busybox
     image: busybox
     command: [ "/bin/sh", "-c", "--" ]
     args: [ "while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;" ]
     volumeMounts:
     - name: applogs
       mountPath: /var/log/example
  volumes:
     - name: applogs
       hostPath:
         path: /var/log/example
```

The equivalent volume and volumeMount path need to be set in the Agent container so it can read that same log file.

```yaml
  containers:
  - name: agent
    # (...)
    volumeMounts:
    - mountPath: /var/log/example
      name: applogs
    # (...)
  volumes:
  - name: applogs
    hostPath:
      path: /var/log/example
    # (...)
```
#### Recommended configurations
- This strategy can work for a given pod, but can become cumbersome with multiple apps using this strategy. You can also run into issues if multiple replicas are using the same log path. If possible, Datadog recommends taking advantage of the [Autodiscovery template variable][17] `%%kube_pod_name%%`. For example, you can set your `path` to reference this variable: `"path": "/var/log/example/%%kube_pod_name%%/app.log"`. Your application pod then needs to write its log files with respect to this new path as well. You can use the [Downward API][18] to help your application determine its Pod name.

- When using this kind of annotation with a container, `stdout` and `stderr` logs are not collected automatically from the container. If collection from both the container output streams and file are needed, explicitly enable this in the annotation. For example:
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- When using this kind of combination, `source` and `service` have no default value for logs collected from a file and should be explicitly set in the annotation.

## Troubleshooting

For troubleshooting steps, visit [Container Log Collection Troubleshooting][21].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/log-collection-with-docker-socket/
[2]: /agent/kubernetes/
[3]: /integrations/#cat-autodiscovery
[4]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[5]: /agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /agent/guide/autodiscovery-management/
[9]: /containers/guide/kubernetes_daemonset/#log-collection
[10]: /getting_started/containers/autodiscovery
[11]: /logs/log_configuration/attributes_naming_convention/
[12]: /getting_started/tagging/assigning_tags/#integration-inheritance
[13]: https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-location-node
[14]: /containers/kubernetes/tag
[15]: /logs/log_configuration/pipelines/?tab=source#integration-pipelines
[16]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[17]: /containers/guide/template_variables/
[18]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/
[19]: /containers/kubernetes/log/?tab=helm#autodiscovery-annotations
[20]: /containers/kubernetes/log/?tab=helm#autodiscovery-configuration-files
[21]: /containers/troubleshooting/log-collection/?tab=datadogoperator
