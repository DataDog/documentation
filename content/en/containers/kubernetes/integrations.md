---
title: Integrations and Kubernetes
aliases:
  - /agent/autodiscovery/integrations
  - /guides/servicediscovery/
  - /guides/autodiscovery/
  - /agent/kubernetes/integrations
kind: documentation
further_reading:
- link: "/agent/kubernetes/log/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/kubernetes/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/kubernetes/prometheus/"
  tag: "Documentation"
  text: "Collect your Prometheus metrics"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
- link: "/agent/kubernetes/tag/"
  tag: "Documentation"
  text: "Assign tags to all data emitted by a container"
---

This page covers how to install and configure integrations for your Kubernetes infrastructure. Configuring these integrations in a containerized environment uses a Datadog feature known as _Autodiscovery_. For more information about how Autodiscovery works, see [Getting Started with Containers: Autodiscovery][12].

If you are using Docker or Amazon ECS, see [Integrations and Docker][1].

<div class="alert alert-info">
Some supported integrations don't work with standard Autodiscovery because they require either process tree data or filesystem access: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, and <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
To set up integrations that are not compatible with standard Autodiscovery, you can use an official Prometheus exporter in the pod, and then use the OpenMetrics check with Autodiscovery in the Agent to find the pod and query the endpoint. For example, the standard pattern in Kubernetes is: side car adapter with a node-level or cluster-level collector. This setup allows the exporter to access the data, which exposes it using an HTTP endpoint, and the OpenMetrics check with Datadog Autodiscovery can then access the data.
</div>

## Installation

Refer to your integration's documentation for specific installation steps.

To use a [community integration][13], build a custom image that contains your desired integration. See [Use Community Integrations][13] for instructions.

## Configuration

To configure a Datadog integration to monitor your Kubernetes infrastructure, create and apply an Autodiscovery configuration template that matches your desired containers. This template uses the following structure:

```yaml
ad_identifiers:
  - <CONTAINER_IDENTIFIER>
init_config:
  <INIT_CONFIG>
instances:
  <INSTANCES_CONFIG>
logs:
  <LOGS_CONFIG>
```

- For `<CONTAINER_IDENTIFIER>`, take note of the _container name_ that corresponds to your integration. For example, to apply a configuration template to all containers with the name _redis_, replace `<CONTAINER_IDENTIFIER>` with `redis`.

   You can apply the same template to multiple container identifiers.

   <div class="alert alert-info">
   Datadog matches templates according to container name, <strong>NOT</strong> container image. That is, <code>&lt;CONTAINER_IDENTIFIER&gt;</code> matches <code>.spec.containers[0].name</code>, not <code>.spec.containers[0].image</code>.
   </div>

- For `<INIT_CONFIG>`, `<INSTANCES_CONFIG>`, and `<LOGS_CONFIG>`, reference your integration's configuration options. Each integration has an `<INTEGRATION_NAME>.d/conf.yaml.example` file that lists all available configuration options for that particular integration. These options are divided into three sections: `init_config`, `instances`, and `logs`.

You can apply this template by using Kubernetes pod annotations, local files, ConfigMaps, key-value stores, Helm, or Datadog Operator. 

{{< tabs >}}
{{% tab "Pod annotations" %}}

If you define your Kubernetes pods directly with `kind: Pod`, add each pod's annotations directly under its `metadata` section, as shown in the following. 

**Autodiscovery Annotations v2** (for Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

**Autodiscovery Annotations v1** 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '[<INTEGRATION_NAME>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCES_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

If you define pods indirectly (with deployments, ReplicaSets, or ReplicationControllers) add pod annotations under `.spec.template.metadata`.

<div class="alert alert-info">
<code>init_config</code> is usually empty. In AD Annotations v2, it is optional.
</div>

{{% /tab %}}
{{% tab "File" %}}

Storing templates as local files and mounting them inside the containerized Agent doesn't require an external service or a specific orchestration platform. The downside is that you need to restart your Agent containers each time you change, add, or remove templates. The Agent looks for Autodiscovery templates in the mounted `/conf.d` directory.

Since Agent v6.2.0 (and v5.24.0), the default templates use the default port for the monitored software, instead of auto-detecting it. If you need to use a different port, provide a custom Autodiscovery template in the [Kubernetes pod annotations](?tab=podannotations).

These integration templates are meant for basic cases. If you need a custom Datadog integration configuration to enable extra options, use different container identifiers—or use template variables indexing and write your own auto-configuration file:

1. Create a `conf.d/<INTEGRATION_NAME>.d/conf.yaml` file on your host and add your custom auto-configuration.
2. Mount your host `conf.d/` folder to the containerized Agent's `conf.d` folder.

**Example auto-configuration file**:

```yaml
ad_identifiers:
  - <CONTAINER_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>

logs:
  <LOGS_CONFIG>
```

[1]: /agent/guide/ad_identifiers/

{{% /tab %}}
{{% tab "ConfigMap" %}}

On Kubernetes, you can use [ConfigMaps][1] to externally define configurations and subsequently mount them using the manifest. Reference the template below.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <CONTAINER_IDENTIFIER>
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
    logs:
      <LOGS_CONFIG>
```

See the [Autodiscovery Container Identifiers][3] documentation for information on the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.

[1]: /agent/kubernetes/integrations/#configmap
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
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCES_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

[1]: /integrations/consul/
[2]: /agent/configuration/agent-commands/

{{% /tab %}}
{{% tab "Datadog Operator" %}}

To configure integrations in `datadog-agent.yaml`, add an override `extraConfd.configDataMap` to the `nodeAgent` component of your `DatadogAgent` configuration. Each key becomes a file in the Agent's `conf.d` directory.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IDENTIFIER>
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

If you are using the Cluster Agent and looking to configure Autodiscovery for a cluster check, add an override `extraConfd.configDataMap` to the `clusterAgent` component. You must also enable cluster checks by setting `features.clusterChecks.enabled: true`. 

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    clusterChecks:
      enabled: true
    [...]
  override:
    nodeAgent:
      [...]
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IDENTIFIER>
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

See [Cluster Checks][1] for more context.

[1]: /agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

Your `datadog-values.yaml` file contains a `datadog.confd` section where you can define Autodiscovery templates. You can find inline examples in the sample [values.yaml][1]. Each key becomes a file in the Agent's `conf.d` directory.

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IDENTIFIER>
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

If you are using the Cluster Agent and looking to configure Autodiscovery for a cluster check, define your template under `clusterAgent.confd`. You can find inline examples in the sample [values.yaml][2]. You must also enable the Cluster Agent by setting `clusterAgent.enabled: true` and enable cluster checks by setting `datadog.clusterChecks.enabled: true`. 

```yaml
datadog:
  clusterChecks:
    enabled: true
clusterAgent:
  enabled: true
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IDENTIFIER>
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

See [Cluster Checks][3] for more context.

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### Auto-configuration

The Datadog Agent automatically recognizes and configures integrations for some common technologies, including [CoreDNS][17], [etcd][18], the [Kubernetes API server][19], and others. See [Autodiscovery auto-configuration][20] for more information, including a complete list of supported integrations.

Configurations set with Kubernetes pod annotations take precedence over auto-configuration.

Auto-configuration takes precedence over configurations set with Datadog Operator or Helm. To use Datadog Operator or Helm to configure an integration in the [Autodiscovery auto-configuration][20] list, you must disable auto-configuration.

#### Disable auto-configuration

The following examples disable auto-configuration for Redis and Istio integrations.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

In your `datadog-agent.yaml`, use `override.nodeAgent.env` to set the `DD_IGNORE_AUTOCONF` environment variable.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  override:
    nodeAgent:
      env: DD_IGNORE_AUTOCONF
      value: redisdb istio
```

Then, apply the new configuration.

{{% /tab %}}
{{% tab "Helm" %}}

Add `datadog.ignoreAutoconfig` to your `datadog-values.yaml`:

```yaml
datadog:
 #List of integration(s) to ignore auto_conf.yaml.
  ignoreAutoConfig:
    - redisdb
    - istio
```

Then, upgrade your Helm chart.

{{% /tab %}}
{{% tab "DaemonSet" %}}
To disable auto-configuration with your DaemonSet, add the `DD_IGNORE_AUTOCONF` variable to your Agent manifest:

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}


### Tolerate unready pods

By default, `unready` pods are ignored when the Datadog Agent schedules checks. Therefore, metrics, service checks, and logs are not collected from these pods. To override this behavior, set the annotation `ad.datadoghq.com/tolerate-unready` to `"true"`. For example:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/tolerate-unready: "true"
  ...
```

## Examples

### Configuring the Redis integration

In this scenario, you deployed Redis on Kubernetes. You want to set up and configure the [Datadog-Redis integration][14], which does not require any additional installation steps. All of your Redis containers have the container name `redis`.

Reference [`redisdb.d/conf.yaml.example`][15] for parameters. If you were to configure this integration **on a host**, you might create a `conf.yaml` file that contains the following:

```yaml
init_config:
instances:
  - host: localhost
    port: 6379
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/redis_6379.log
    source: redis
    service: redis_service
```

- `<PASSWORD>` corresponds to the password to use for the connection.

The following Autodiscovery template applies this configuration to all containers named `redis`:

```yaml
ad_identifiers:
  - redis
init_config:
instances:
  - host: "%%host%%"
    port: 6379
    password: "%%env_REDIS_PASSWORD%%"
logs:
  - type: file
    path: /var/log/redis_6379.log
    source: redis
    service: redis_service
```

This template makes use of [Autodiscovery template variables][16]:
- `%%host%%` is dynamically populated with the container's IP.
- `%%env_REDIS_PASSWORD%%` references an environment variable named `REDIS_PASSWORD` as seen by the Agent process.

Then, to apply this template:

{{< tabs >}}
{{% tab "Pod annotations" %}}

**Autodiscovery Annotations v2** (for Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }
    ad.datadoghq.com/redis.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/redis_6379.log",
          "source": "redis",
          "service": "redis_service"
        }
      ]
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Autodiscovery Annotations v1** 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/redis.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/redis_6379.log",
          "source": "redis",
          "service": "redis_service"
        }
      ]
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

{{% /tab %}}

{{% tab "ConfigMap" %}}

The following ConfigMap defines the integration template for `redis` containers:

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
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
        password: "%%env_REDIS_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/redis_6379.log"
        source: "redis"
        service: "redis_service"
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

The following etcd commands create a Redis integration template with a custom `password` parameter:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, for example, `redis` OR `redis:latest`.
{{% /tab %}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          redisdb.yaml: |-
            ad_identifiers:
              - redis
            init_config:
            instances:
              - host: "%%host%%"
                port: 6379
                password: "%%env_REDIS_PASSWORD%%"
```
As a result, the Agent contains a `redisdb.yaml` file with the above configuration in the `conf.d` directory.

{{% /tab %}}
{{% tab "Helm" %}}

The following configuration defines the integration template for Redis containers with a custom password parameter:
```yaml
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
      init_config:
      instances:
        - host: "%%host%%"
          port: 6379
          password: "%%env_REDIS_PASSWORD%%"
```
As a result, the Agent contains a `redisdb.yaml` file with the above configuration in the `conf.d` directory.
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<code>"%%env_&lt;ENV_VAR&gt;%%"</code> template variable logic is used to avoid storing the password in plaintext. This requires that a <code>REDIS_PASSWORD</code> environment variable passed to the Agent. See the <a href="/agent/faq/template_variables/">Autodiscovery Template Variables</a>.
</div>



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/docker/integrations/
[2]: /getting_started/integrations/#configuring-agent-integrations
[3]: /agent/configuration/secrets-management/
[4]: /integrations/ceph/
[5]: /integrations/varnish/#autodiscovery
[6]: /integrations/postfix/
[7]: /integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /integrations/gunicorn/
[9]: /integrations/apache/#setup
[10]: /integrations/http_check/#setup
[11]: /getting_started/integrations/
[12]: /getting_started/containers/autodiscovery
[13]: /agent/guide/use-community-integrations/
[14]: /integrations/redis
[15]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[16]: /containers/guide/template_variables/
[17]: /integrations/coredns
[18]: /integrations/etcd/
[19]: /integrations/kube_apiserver_metrics
[20]: /containers/guide/auto_conf