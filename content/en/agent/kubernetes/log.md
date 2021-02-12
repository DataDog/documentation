---
title: Kubernetes Log collection
kind: documentation
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

The Docker API is optimized to get logs from one container at a time, when there are many containers in the same pod, collecting logs through the Docker socket might be consuming much more resources than going through the Kubernetes log files logic.

## Log collection

In order to start collecting your application logs you must be [running the Datadog Agent in your Kubernetes cluster][2]. To enable log collection with your Agent, follow the instructions below:

{{< tabs >}}
{{% tab "DaemonSet " %}}

**Note**: This option is not supported on Windows. Use the Helm option instead.

To enable log collection with your DaemonSet:

1. Set the `DD_LOGS_ENABLED` and `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` variable to true in the *env* section of the `datadog.yaml` Agent manifest:

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_CONTAINER_EXCLUDE
          value: "name:datadog-agent"
     # (...)
    ```

    **Note**: Setting `DD_CONTAINER_EXCLUDE` prevents the Datadog Agent from collecting and sending its own logs. Remove this parameter if you want to collect the Datadog Agent logs. See the [Container Discovery Management][1] to learn more. When using ImageStreams inside OpenShift environments, set `DD_CONTAINER_INCLUDE` with the container `name` to collect logs. Both of these Exclude/Include parameter value supports regular expressions.

2. Mount the `pointdir` volume to prevent loss of container logs during restarts or network issues and  `/var/lib/docker/containers` to collect logs through kubernetes log file as well, since `/var/log/pods` is symlink to this directory:

    ```yaml
      # (...)
        volumeMounts:
        #  (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
         - name: logpodpath
           mountPath: /var/log/pods
         # Docker runtime directory, replace this path
         # with your container runtime logs directory,
         # or remove this configuration if `/var/log/pods`
         # is not a symlink to any other directory.
         - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
       # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path
        # with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods`
        # is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

    The `pointdir` is used to store a file with a pointer to all the containers that the Agent is collecting logs from. This is to make sure none are lost when the Agent is restarted, or in the case of a network issue.

### Unprivileged

(Optional) To run an unprivileged installation, add the following to your [pod template][2]:

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

When the agent is running with a non-root user, it cannot directly read the log files contained in `/var/lib/docker/containers`. In this case, it is necessary to mount the docker socket in the agent container so that it can fetch the container logs from the docker daemon.

[1]: /agent/guide/autodiscovery-management/
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
{{% tab "Operator" %}}

Update your `datadog-agent.yaml` manifest with:

```
agent:
  image:
    name: "gcr.io/datadoghq/agent:latest"
  log:
    enabled: true
```

See the sample [manifest with logs and metrics collection enabled][1] for a complete example.

Then apply the new configuration:

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

## Unprivileged

(Optional) To run an unprivileged installation, add the following to the [datadog CR][8]:

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

[1]: https://github.com/DataDog/datadog-operator/blob/master/examples/datadog-agent-logs.yaml
{{% /tab %}}
{{< /tabs >}}

**Warning**: When running an unprivileged installation, the agent needs to be able to read the log files in `/var/log/pods`.
With `containerd`, the log files in `/var/log/pods` are readable by members of the `root` group. With the above instructions, the `agent` is still running with the `root` group so, it works.
With `docker`, the logs files in `/var/log/pods` are symbolic links to `/var/lib/docker/containers` which is traversable only by the `root` user. As a consequence, with `docker`, it’s not possible for a non-`root` agent to read pod logs in `/var/log/pods`. The docker socket must be mounted in the agent container so that it can get pods logs through the docker daemon.

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
[2]: /agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}

### Examples - Datadog Redis integration

{{< tabs >}}
{{% tab "Kubernetes" %}}

The following pod annotation defines the integration template for `redis` containers with a custom `password` parameter and tags all its logs with the correct `source` and `service` attributes:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"redis"}]'
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

The following ConfigMap defines the integration template for `redis` containers with the `source` and `service` attributes for collecting logs:

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
      source: redis
      service: redis
```

In the manifest, define the `volumeMounts` and `volumes`:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # [...]
      volumes:
      # [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

The following etcd commands create a Redis integration template with a custom `password` parameter and tags all its logs with the correct `source` and `service` attributes:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis"}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, e.g. `redis` OR `redis:latest`.

{{% /tab %}}
{{< /tabs >}}

### Examples - Log collection from file configured in an annotation

The Agent v7.26.0+/6.26.0+ can directly collect logs from a file based on an annotation. To collect these logs, use `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs` with a file type configuration. Logs collected from files with such an annotation are automatically tagged with the same set of tags as logs coming from the container itself.

For example, to collect logs from `/logs/app/prod.log` from a container named `webapp` inside a Kubernetes pod, the pod definition would be:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: webapp
  annotations:
    ad.datadoghq.com/webapp.logs: '[{"type":"file", "source": "webapp", "service": "backend-prod", "path": "/logs/app/prod.log"}]'
  labels:
    name: webapp
spec:
  containers:
    - name: webapp
      image: webapp:latest
```

**Notes**:

- The file path is **relative** to the Agent, so the directory containing the file should be shared between the container running the application and the Agent container. For example, if the container mounts `/logs` each container logging to a file may mount a volume such as `/logs/app`, where the log file is written. Please check Kubernetes documentation for further detail on sharing volumes between pods/containers.

- When using this kind of annotation with a container, output logs are not collected automatically. If collection from both the container and a file are needed it should be explicitly enabled in the annotation, for example:
```yaml
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[{"type":"file", "source": "webapp", "service": "backend-prod", "path": "/logs/app/prod.log"}, {"source": "container", "service": "app"}]'
```

- When using this kind of combination, `source` and `service` have no default value for logs collected from a file and should be explicitly set in the annotation.


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
