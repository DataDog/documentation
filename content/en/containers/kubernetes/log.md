---
title: Kubernetes log collection
kind: documentation
aliases:
  - /agent/kubernetes/log
further_reading:
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
---

This page discusses collecting logs from Kubernetes log files.

The Datadog Agent has two ways to collect logs: from Kubernetes log files, or from the [Docker socket][1]. Datadog recommends using Kubernetes log files when:

* Docker is not the runtime, **or**
* More than 10 containers are used on each node

The Docker API is optimized to get logs from one container at a time. When there are many containers in the same node, collecting logs through the Docker socket may consume more resources than collecting logs through Kubernetes log files. To see how to collect logs using the Docker socket, see [Log collection with Docker socket][1].

## Log collection

Before you start collecting application logs, ensure that you are running the Datadog Agent in your Kubernetes cluster. 

To configure log collection using a DaemonSet, see [DaemonSet Log Collection][9]. Otherwise, follow the instructions below:

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

See the sample [manifest with logs and metrics collection enabled][1] for a complete example. You can set `features.logCollection.containerCollectAll` to `true` to collect logs from all discovered containers by default. When set to `false` (default), you need to specify Autodiscovery log configurations to enable log collection.

### Unprivileged

(Optional) To run an unprivileged installation, add the following to the [DatadogAgent custom resource][2]:

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

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-logs-apm.yaml
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

To enable log collection with Helm, update your [datadog-values.yaml][1] file with the following log collection configuration, then upgrade your Datadog Helm chart:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

You can set `datadog.logs.containerCollectAll` to `true` to collect logs from all discovered containers by default. When set to `false` (default), you need to specify Autodiscovery log configurations to enable log collection.

### Unprivileged

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

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">
<strong>Warning for unprivileged installations</strong>
<br/><br/>
When running an unprivileged installation, the Agent needs to be able to read log files in <code>/var/log/pods</code>.
<br/><br/>
If you are using the containerd runtime, the log files in <code>/var/log/pods</code> are readable by members of the <code>root</code> group. With the above instructions, the Agent runs with the <code>root</code> group. No action is required.
<br/><br/>
If you are using the Docker runtime, the log files in <code>/var/log/pods</code> are symbolic links to <code>/var/lib/docker/containers</code>, which is traversable only by the <code>root</code> user. Consequently, with the Docker runtime, it is not possible for a non-<code>root</code> Agent to read logs in <code>/var/log/pods</code>. The Docker socket must be mounted in the Agent container, so that it can get pod logs through the Docker daemon.
<br/><br/>
To collect logs from <code>/var/log/pods</code> when the Docker socket is mounted, set the environment variable <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (or <code>logs_config.k8s_container_use_file</code> in <code>datadog.yaml</code>) to <code>true</code>. This forces the Agent to use file collection mode.
</div>

## Integration logs

[Autodiscovery][10] enables you to use templates to configure log collection (and other capabilities) on containers.

To configure log collection for an integration with Autodiscovery, use the following parameter:

| Parameter            | Required | Description                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<LOG_CONFIG>`       | No       | For Agent v6.5+, configuration for the `logs:` section for the given Datadog-`<INTEGRATION_NAME>` |

The schema for `<LOG_CONFIG>` depends on the integration. You can find this schema in each integration's `conf.yaml.example` file.

### Configuration

{{< tabs >}}
{{% tab "Kubernetes Pod Annotations" %}}
With Autodiscovery, the Agent automatically searches all pod annotations for integration templates.

To apply a specific configuration to a given container, Autodiscovery identifies containers by name, **not** image. It tries to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].name`, not `.spec.containers[0].image`. 

<div class="alert alert-info">
If you define your Kubernetes pods <i>directly</i> (with <code>kind:Pod</code>), add each pod's annotations in its <code>metadata</code> section, as shown in the following sections.
<br/><br/>
If you define your Kubernetes pods <i>indirectly</i> (with replication controllers, ReplicaSets, or deployments), add pod annotations under <code>.spec.template.metadata</code>.</div>

#### Configure a single container
To configure log collection for a given `<CONTAINER_IDENTIFIER>` within your pod, add the following annotations to your pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOG_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

#### Configure two different containers
To apply two different integration templates to two different containers within your pod, `<CONTAINER_IDENTIFIER_1>` and `<CONTAINER_IDENTIFIER_2>`, add the following annotations to your pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.logs: '[<LOG_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER_1>'
    # (...)
    - name: '<CONTAINER_IDENTIFIER_2>'
# (...)
```

{{% /tab %}}

{{% tab "Key-value store" %}}

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
    <CONTAINER_IDENTIFIER>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Note**: To apply a specific configuration to a given container, Autodiscovery identifies containers by **image** when using the key-value stores by trying to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].image`.

[1]: /integrations/consul/
[2]: /agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

### Examples
#### Datadog-Redis integration

{{< tabs >}}
{{% tab "Kubernetes Pod Annotation" %}}

The following pod annotation defines the integration template for Redis containers. It tags all logs with `source` and `service` attributes, including custom tags:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "init_config": {},
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }  
    ad.datadoghq.com/redis.logs: '[{"source": "redis","service": "<YOUR_APP_NAME>","tags": ["env:prod"]}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

{{% /tab %}}
{{% tab "Key-value store" %}}
The following etcd commands create a Redis integration template with a custom `password` parameter and tags all its logs with the correct `source` and `service` attributes:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, for example, `redis` OR `redis:latest`.

{{% /tab %}}
{{< /tabs >}}

For more information about `source` and `service` attributes, see [Reserved Attributes][11].

#### From a file configured in an annotation

Datadog recommends that you use the `stdout` and `stderr` output streams for containerized applications, so that you can more automatically set up log collection. However, the Agent can also directly collect logs from a file based on an annotation. To collect these logs, use `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs` with a `type: file` and `path` configuration. Logs collected from files with such an annotation are automatically tagged with the same set of tags as logs coming from the container itself.

These file paths are **relative** to the Agent. Therefore, the directory containing the log file needs to be mounted into both the application and Agent container so the Agent can have proper visibility.

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

**Note:** When using this kind of annotation with a container, `stdout` and `stderr` logs are not collected automatically from the container. If collection from both the container and a file are needed it should be explicitly enabled in the annotation. For example:

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: |
  [
    {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
    {"source":"container","service":"example-service"}
  ]
```

When using this kind of combination, `source` and `service` have no default value for logs collected from a file and should be explicitly set in the annotation.

## Advanced log collection

Use Autodiscovery log labels to apply advanced log collection processing logic, for example:

* [Filter logs before sending them to Datadog][5].
* [Scrub sensitive data from your logs][6].
* [Proceed to multi-line aggregation][7].

## Filter containers

It is possible to manage from which containers you want to collect logs. This can be useful to prevent the collection of the Datadog Agent logs. See the [Container Discovery Management][8] to learn more.

## Short lived containers

By default the Agent looks every 5 seconds for new containers.

For Agent v6.12+, short lived container logs (stopped or crashed) are automatically collected when using the K8s file log collection method (through `/var/log/pods`). This also includes the collection init container logs.

## Troubleshooting

#### Missing tags on new containers or pods

When sending logs to Datadog from newly created containers or pods, the Datadog Agent's internal tagger may not yet have the related container/pod tags. As a result, tags may be missing from these logs.

To remediate this issue, you can use the environment variable `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` to configure a duration (in seconds) for the Datadog Agent to wait before it begins to send logs from newly created containers and pods. The default value is `0`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```
{{% /tab %}}
{{< /tabs >}}

#### Missing host-level tags on new hosts or nodes

Host-level tags are those seen in the infrastructure list for a given host, and are sourced from either a cloud provider or the Datadog Agent. Common host-level tags include `kube_cluster_name`, `region`, `instance-type`, and `autoscaling-group`.

When sending logs to Datadog from a newly created host or node, it can take a few minutes for host-level tags to be [inherited][12]. As a result, host-level tags may be missing from these logs. 

To remediate this issue, you can use the environment variable `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` to configure a duration (in minutes). For this duration, the Datadog Agent to manually attaches the host-level tags that it knows about to each sent log. After this duration, the Agent reverts to relying on tag inheritance at intake.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value: "10m"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "10m"
```
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/log-collection-with-docker-socket/
[2]: /agent/kubernetes/
[3]: /integrations/#cat-autodiscovery
[4]: /getting_started/tagging/unified_service_tagging
[5]: /agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /agent/guide/autodiscovery-management/
[9]: /containers/guide/kubernetes_daemonset/#log-collection
[10]: /getting_started/containers/autodiscovery
[11]: /logs/log_configuration/attributes_naming_convention/
[12]: /getting_started/tagging/assigning_tags/#integration-inheritance
