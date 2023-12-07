---
title: Kubernetes Log collection
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

The Agent has two ways to collect logs: from the [Docker socket][1], and from the [Kubernetes log files](#log-collection) (automatically handled by Kubernetes). Datadog recommends using the Kubernetes log file logic when:

* Docker is not the runtime, **or**
* More than 10 containers are used on each node

The Docker API is optimized to get logs from one container at a time; when there are many containers in the same node, collecting logs through the Docker socket might be consuming much more resources than going through the Kubernetes log files logic.

## Log collection

In order to start collecting your application logs you must be [running the Datadog Agent in your Kubernetes cluster][2]. To enable log collection with your Agent, follow the instructions below:

{{< tabs >}}
{{% tab "Operator" %}}

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

See the sample [manifest with logs and metrics collection enabled][1] for a complete example. You can set the `features.logCollection.containerCollectAll` to `true` to collect logs from all discovered containers by default. When set to `false` (default), you need to specify Autodiscovery log configurations to enable log collection.

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

## Unprivileged

(Optional) To run an unprivileged installation, add the following to the [DatadogAgent Custom Resource][2]:

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

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-logs-apm.yaml
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

To enable log collection with Helm, update your [datadog-values.yaml][1] file with the following log collection configuration, then upgrade your Datadog Helm chart:

```yaml
datadog:
  ## @param logs - object - required
  ## Enable logs agent and provide custom configs
  #
  logs:
    ## @param enabled - boolean - optional - default: false
    ## Enables this to activate Datadog Agent log collection.
    #
    enabled: true

    ## @param containerCollectAll - boolean - optional - default: false
    ## Enable this to allow log collection for all containers.
    #
    containerCollectAll: true
```

You can set the `datadog.logs.containerCollectAll` to `true` to collect logs from all discovered containers by default. When set to `false` (default), you need to specify Autodiscovery log configurations to enable log collection.

### Unprivileged

(Optional) To run an unprivileged installation, add the following in the `values.yaml` file:

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

To configure log collection using a DaemonSet, see [DaemonSet Log Collection][9].

**Warning**: When running an unprivileged installation, the agent needs to be able to read the log files in `/var/log/pods`.
With `containerd`, the log files in `/var/log/pods` are readable by members of the `root` group. With the above instructions, the `agent` is still running with the `root` group so, it works.
With `docker`, the logs files in `/var/log/pods` are symbolic links to `/var/lib/docker/containers` which is traversable only by the `root` user. As a consequence, with `docker`, it's not possible for a non-`root` agent to read pod logs in `/var/log/pods`. The docker socket must be mounted in the agent container so that it can get pods logs through the docker daemon.

**Note**: If you do want to collect logs from `/var/log/pods` even if the Docker socket is mounted, set the environment variable `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` (or `logs_config.k8s_container_use_file` in `datadog.yaml`) to `true` in order to force the Agent to go for the file collection mode.

## Autodiscovery

The goal of Autodiscovery is to apply a Datadog integration log configuration when running an Agent check against a given container. See how to [configure Agent integrations][1] when running the Agent on a host for more context on this logic.

To configure an integration with Autodiscovery, use the following parameters:

| Parameter            | Required | Description                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<LOG_CONFIG>`       | No       | For Agent v6.5+, configuration for the `logs:` section for the given Datadog-`<INTEGRATION_NAME>` |

[**Discover the full list of Agent integrations that are Autodiscovery ready with examples for those parameters**][3]

Each tab in sections below shows a different way to apply integration templates to a given container. The available methods are:

* [Kubernetes pod annotations](?tab=kubernetes#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [Key-value stores](?tab=keyvaluestore#configuration)
* [Helm](?tab=helm#configuration)

### Configuration

**Note**: When configuring the `service` value through pod annotations, Datadog recommends using unified service tagging as a best practice. Unified service tagging ties all Datadog telemetry together, including logs, through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][4] documentation.

{{< tabs >}}
{{% tab "Kubernetes" %}}

Integration templates can be stored in your Kubernetes pod annotations. With Autodiscovery, the Agent detects if it's running on Kubernetes and automatically searches all pod annotations for integration templates.

To apply a specific configuration to a given container, Autodiscovery identifies containers by **name**, NOT image. It tries to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].name`, not `.spec.containers[0].image`. To configure your Datadog integration Autodiscovery on a given `<CONTAINER_IDENTIFIER>` within your pod, add the following annotations to your pod:

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

To apply two different integration templates to two different containers: `<CONTAINER_IDENTIFIER_1>` and `<CONTAINER_IDENTIFIER_2>` within your pod, add the following annotations to your pod:

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

**Note**: If you define your Kubernetes pods directly with `kind: Pod`, add each pod's annotations directly under its `metadata` section. If you define pods indirectly with replication controllers, replica sets, or deployments, add pod annotations under `.spec.template.metadata`.

{{% /tab %}}
{{% tab "File" %}}

Storing templates as local files and mounting them inside the containerized Agent doesn't require an external service or a specific orchestration platform. The downside is that you need to restart your Agent containers each time you change, add, or remove templates. The Agent looks for Autodiscovery templates in the mounted `/conf.d` directory.

Since Agent v6.2.0 (and v5.24.0), the default templates use the default port for the monitored software, instead of auto-detecting it. If you need to use a different port, provide a custom Autodiscovery template either in [Docker container labels](?tab=docker-labels) or [Kubernetes pod annotations](?tab=kubernetes-annotations).

These integration templates are meant for basic cases. If you need a custom Datadog integration configuration to enable extra options, use different container identifiers—or use template variables indexing and write your own auto-configuration file:

1. Create a `conf.d/<INTEGRATION_NAME>.d/conf.yaml` file on your host and add your custom auto-configuration.
2. Mount your host `conf.d/` folder to the containerized Agent's `conf.d` folder.

**Note**: This is only supported when collecting logs through the Docker Socket, and not when using the Kubernetes log file method. To use the Docker Socket for log collection in a Kubernetes environment, ensure Docker is the runtime and `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` has been set to `false`.

**Example auto-configuration file**:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

logs:
  <LOGS_CONFIG>
```

See the [Autodiscovery Container Identifiers][1] documentation for information on the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.

**Note**: You don't need to set up the `<INTEGRATIONS_NAME>` since the Agent infers it from the file name directly.

[1]: /agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

On Kubernetes, you can use [ConfigMaps][1]. Reference the template below and the [Kubernetes Custom Integrations][2] documentation.

**Note**: This is only supported when collecting logs through the Docker Socket, and not when using the Kubernetes log file method. To use the Docker Socket for log collection in a Kubernetes environment, ensure Docker is the runtime and `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` has been set to `false`.

```text
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
    logs:
      <LOGS_CONFIG>
```

See the [Autodiscovery Container Identifiers][3] documentation for information on the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.

[1]: /agent/kubernetes/integrations/#configmap
[2]: /agent/kubernetes/integrations/
[3]: /agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Key-value store" %}}

Autodiscovery can use [Consul][1], Etcd, and Zookeeper as integration template sources. To use a key-value store, configure it in the Agent `datadog.yaml` configuration file and mount this file inside the containerized Agent. Alternatively, pass your key-value store as environment variables to the containerized Agent.

**Configure in datadog.yaml**:

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

**Configure in environment variables**:

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
{{% tab "Helm" %}}

You can customize logs collection per integration within `confd`. This method mounts the desired configuration onto the Agent container.

**Note**: This is only supported when collecting logs through the Docker Socket, and not when using the Kubernetes log file method. To use the Docker Socket for log collection in a Kubernetes environment, ensure Docker is the runtime and `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` has been set to `false`.

  ```yaml
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
      init_config:
      instances:
        (...)
      logs:
        <LOGS_CONFIG>
  ```

{{% /tab %}}
{{< /tabs >}}

### Examples - Datadog Redis integration

{{< tabs >}}
{{% tab "Kubernetes" %}}

The following pod annotation defines the integration template for `redis` containers with a custom `password` parameter and tags all its logs with the correct `source` and `service` attributes, including custom tags :

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source": "redis","service": "redis","tags": ["env:prod"]}]'
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
{{% tab "ConfigMap" %}}

The following ConfigMap defines the integration template for `redis` containers with the `source` and `service` attributes for collecting logs and tags all its logs with the correct `source` and `service` attributes, including custom tags :

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redisdb-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    logs:
      - source: redis
        service: redis
        tags:
          - env:prod
```

In the manifest, define the `volumeMounts` and `volumes`:

```yaml
# (...)
        volumeMounts:
        # (...)
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # (...)
      volumes:
      # (...)
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# (...)
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
{{% tab "Helm" %}}

The following configuration defines the integration template for Redis containers with the `source` and `service` attributes for collecting logs:
  ```yaml
  confd:
    redis.yaml: |-
      ad_identifiers:
        - redis
      logs:
        - source: redis
          service: redis
          tags: env:prod
  ```

**Note**: The above configuration collects only logs from this integration. If you are already collecting other data from the Redis integration, you can append the `logs` section to your existing configuration.

{{% /tab %}}
{{< /tabs >}}

### Examples - Log collection from file configured in an annotation

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

If you are missing tags on Kubernetes logs, this may be because the Agent's internal tagger does not yet have the related container or pod tags when logs are sent. To make the Log Agent wait a few seconds for the tagger to be ready, you can use the environment variable `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` to set how many seconds to wait. The default value is 0.

```yaml
# The number of seconds the Log Agent waits for the internal tagger to add the related container or pod tags to the logs before the logs are sent.
# For example, in order to set the Log Agent to wait five seconds, use an integer in the value:
tagger_warmup_duration: 5
```

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
