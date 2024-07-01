---
title: Kubernetes and Integrations
aliases:
  - /agent/autodiscovery/integrations
  - /guides/servicediscovery/
  - /guides/autodiscovery/
  - /agent/kubernetes/integrations
kind: documentation
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Collect your application logs
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Collect your application traces
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Collect your Prometheus metrics
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limit data collection to a subset of containers only
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Assign tags to all data emitted by a container
---

This page covers how to install and configure integrations for your Kubernetes infrastructure by using a Datadog feature known as _Autodiscovery_. This enables you to use [variables][16] like `%%host%%` to dynamically populate your configuration settings. For a detailed explanation of how Autodiscovery works, see [Getting Started with Containers: Autodiscovery][12]. For advanced Autodiscovery options, such as excluding certain containers from Autodiscovery or tolerating unready pods, see [Autodiscovery Management][23].

If you are using Docker or Amazon ECS, see [Docker and Integrations][1].

<div class="alert alert-info">
Some Datadog integrations don't work with Autodiscovery because they require either process tree data or filesystem access: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, and <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
To monitor integrations that are not compatible with Autodiscovery, you can use a Prometheus exporter in the pod to expose an HTTP endpoint, and then use the <a href="/integrations/openmetrics/">OpenMetrics integration</a> (which supports Autodiscovery) to find the pod and query the endpoint. 
</div>

## Set up your integration

Some integrations require setup steps, such as creating an access token or granting read permission to the Datadog Agent. Follow the instructions in the **Setup** section of your integration's documentation.

### Community integrations
To use an integration that is not packaged with the Datadog Agent, you must build a custom image that contains your desired integration. See [Use Community Integrations][13] for instructions.

## Configuration

Some commonly-used integrations come with default configuration for Autodiscovery. See [Autodiscovery auto-configuration][20] for details, including a list of auto-configured integrations and their corresponding default configuration files. If your integration is in this list, and the default configuration is sufficient for your use case, no further action is required.

Otherwise:

1. Choose a configuration method (Kubernetes pod annotations, a local file, a ConfigMap, a key-value store, a Datadog Operator manifest, or a Helm chart) that suits your use case.
2. Reference the template format for your chosen method. Each format contains placeholders, such as `<CONTAINER_IDENTIFIER>`.
3. [Supply values](#placeholder-values) for these placeholders.

{{< tabs >}}
{{% tab "Annotations" %}}

If you define your Kubernetes pods directly with `kind: Pod`, add each pod's annotations directly under its `metadata` section, as shown:

**Autodiscovery annotations v2** (for Datadog Agent v7.36+)

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

**Autodiscovery annotations v1** 

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

If you define pods indirectly (with deployments, ReplicaSets, or ReplicationControllers) add pod annotations under `spec.template.metadata`.

{{% /tab %}}
{{% tab "Local file" %}}

You can store Autodiscovery templates as local files inside the mounted `conf.d` directory (`/etc/datadog-agent/conf.d`). You must restart your Agent containers each time you change, add, or remove templates.

1. Create a `conf.d/<INTEGRATION_NAME>.d/conf.yaml` file on your host:
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

2. Mount your host `conf.d/` folder to the containerized Agent's `conf.d` folder.

{{% /tab %}}
{{% tab "ConfigMap" %}}

You can use [ConfigMaps][1] to externally define configurations and subsequently mount them.

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

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap

{{% /tab %}}
{{% tab "Key-value store" %}}

You can source Autodiscovery templates from [Consul][1], [etcd][2], or [ZooKeeper][3]. You can configure your key-value store in the `datadog.yaml` configuration file (and subsequently mount this file inside the Agent container), or as environment variables in the Agent container.

**Configure in datadog.yaml**:

In `datadog.yaml`, set the `<KEY_VALUE_STORE_IP>` address and `<KEY_VALUE_STORE_PORT>` of your key-value store:

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

[Restart the Datadog Agent][4] to apply your changes.

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
[2]: /integrations/etcd/
[3]: /integrations/zk/
[4]: /agent/configuration/agent-commands/

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

To monitor a [Cluster Check][1], add an override `extraConfd.configDataMap` to the `clusterAgent` component. You must also enable cluster checks by setting `features.clusterChecks.enabled: true`. 

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

To monitor a [Cluster Check][3], define your template under `clusterAgent.confd`. You can find inline examples in the sample [values.yaml][2]. You must also enable the Cluster Agent by setting `clusterAgent.enabled: true` and enable cluster checks by setting `datadog.clusterChecks.enabled: true`. 

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

### Placeholder values

Supply placeholder values as follows:

`<INTEGRATION_NAME>`
: The name of your Datadog integration, such as `etcd` or `redisdb`.

`<CONTAINER_IDENTIFIER>`
: An identifier to match against the names (`spec.containers[0].name`, **not** `spec.containers[0].image`) of the containers that correspond to your integration. The `ad_identifiers` parameter takes a list, so you can supply multiple container identifiers.<br/><br/>
For example: if you supply `redis` as a container identifier, your Autodiscovery template is applied to all containers with names that match `redis`. If you have one container running `foo/redis:latest` and `bar/redis:v2`, your Autodiscovery template is applied to both containers.<br/><br/>
You can also use custom identifiers. See [Custom Autodiscovery Identifiers][21].

`<INIT_CONFIG>`
: The configuration parameters listed under `init_config` in your integration's `<INTEGRATION_NAME>.d/conf.yaml.example` file. The `init_config` section is usually empty.

`<INSTANCES_CONFIG>`
: The configuration parameters listed under `instances` in your integration's `<INTEGRATION_NAME>.d/conf.yaml.example` file.

`<LOGS_CONFIG>`
: The configuration parameters listed under `logs` in your integration's `<INTEGRATION_NAME>.d/conf.yaml.example` file.

### Auto-configuration

The Datadog Agent automatically recognizes and supplies basic configuration for some common technologies. For a complete list, see [Autodiscovery auto-configuration][20].

Configurations set with Kubernetes annotations take precedence over auto-configuration, but auto-configuration takes precedence over configurations set with Datadog Operator or Helm. To use Datadog Operator or Helm to configure an integration in the [Autodiscovery auto-configuration][20] list, you must [disable auto-configuration][22].

## Example: Postgres integration

In this example scenario, you deployed Postgres on Kubernetes. You want to set up and configure the [Datadog-Postgres integration][26]. All of your Postgres containers have container names that contain the string `postgres`.

First, reference the [Postgres integration documentation][26] for any additional setup steps. The Postgres integration requires that you create a read-only user named `datadog` and store the corresponding password as an environment variable named `PG_PASSWORD`.

If you were to configure this integration **on a host**, you could reference [`postgresql.d/conf.yaml.example`][15] for parameters and create a `postgresql.d/conf.yaml` file that contains the following:

```yaml
init_config:
instances:
  - host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/postgres.log
    source: postgresql
    service: pg_service
```

Here, `<PASSWORD>` corresponds to the password for the `datadog` user you created.

To apply this configuration to your Postgres containers:

{{< tabs >}}
{{% tab "Annotations" %}}

In your pod manifest:

**Autodiscovery annotations v2** (for Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgresql": {
          "instances": [
            {
              "host": "%%host%%",
              "port": "5432",
              "username": "datadog",
              "password":"%%env_PG_PASSWORD%%"
            }
          ]
        }
      }
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

**Autodiscovery annotations v1** 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.check_names: '["postgresql"]'
    ad.datadoghq.com/postgres.init_configs: '[{}]'
    ad.datadoghq.com/postgres.instances: |
      [
        {
          "host": "%%host%%",
          "port": "5432",
          "username": "datadog",
          "password":"%%env_PG_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

{{% /tab %}}
{{% tab "Local file" %}}
1. Create a `conf.d/postgresql.d/conf.yaml` file on your host:

   ```yaml
   ad_identifiers:
     - postgres
   init config:
   instances:
     - host: "%%host%%"
       port: "5432"
       username: "datadog"
       password: "%%env_PG_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/postgres.log"
       source: "postgresql"
       service: "pg_service"
   ```

2. Mount your host `conf.d/` folder to the containerized Agent's `conf.d` folder.
{{% /tab %}}
{{% tab "ConfigMap" %}}

In a ConfigMap:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: postgresql-config-map
  namespace: default
data:
  postgresql-config: |-
    ad_identifiers:
      - postgres
    init_config:
    instances:
      - host: "%%host%%"
        port: "5432"
        username: "datadog"
        password: "%%env_PG_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/postgres.log"
        source: "postgresql"
        service: "pg_service"
```

Then, in your manifest, define the `volumeMounts` and `volumes`:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: postgresql-config-map
            mountPath: /etc/datadog-agent/conf.d/postgresql.d
        # [...]
      volumes:
      # [...]
        - name: postgresql-config-map
          configMap:
            name: postgresql-config-map
            items:
              - key: postgresql-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

The following etcd commands create a Postgres integration template with a custom `password` parameter:

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgresql"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

In `datadog-agent.yaml`:

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
          postgresql.yaml: |-
            ad_identifiers:
              - postgres
            init_config:
            instances:
              - host: "%%host%%"
                port: 5432
                username: "datadog"
                password: "%%env_PG_PASSWORD%%"
```
As a result, the Agent contains a `postgresql.yaml` file with the above configuration in the `conf.d` directory.

{{% /tab %}}
{{% tab "Helm" %}}

In `datadog-values.yaml`:

```yaml
datadog:
  confd:
    postgresql.yaml: |-
      ad_identifiers:
        - postgres
      init_config:
      instances:
        - host: "%%host%%"
          port: 5432
          username: "datadog"
          password: "%%env_PG_PASSWORD%%"
```
As a result, the Agent contains a `postgresql.yaml` file with the above configuration in the `conf.d` directory.

{{% /tab %}}
{{< /tabs >}}

These templates make use of [Autodiscovery template variables][16]:
- `%%host%%` is dynamically populated with the container's IP.
- `%%env_PG_PASSWORD%%` references an environment variable named `PG_PASSWORD` as seen by the Agent process.

For more examples, including how to configure multiple checks for multiple sets of containers, see [Autodiscovery: Scenarios & Examples][24].

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
[15]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[16]: /containers/guide/template_variables/
[17]: /integrations/coredns
[18]: /integrations/etcd/
[19]: /integrations/kube_apiserver_metrics
[20]: /containers/guide/auto_conf
[21]: /containers/guide/ad_identifiers
[22]: /containers/guide/auto_conf/#disable-auto-configuration
[23]: /containers/guide/autodiscovery-management
[24]: /containers/guide/autodiscovery-examples
[25]: /integrations/istio/
[26]: /integrations/postgres
