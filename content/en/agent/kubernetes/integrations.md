---
title: Kubernetes Integrations Autodiscovery
aliases:
  - /agent/autodiscovery/integrations
  - /guides/servicediscovery/
  - /guides/autodiscovery/
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

<div class="alert alert-info">
<a href="/getting_started/agent/autodiscovery">Consult the Autodiscovery Getting Started documentation to discover the concepts behind this feature</a>.
</div>

This page covers how to configure integrations Autodiscovery with Kubernetes. If you are using Docker or Amazon ECS, see the [Docker Integrations Autodiscovery documentation][1]. The goal of Autodiscovery is to apply a Datadog integration configuration when running an Agent check against a given container. See how to [configure Agent integrations][2] when running the Agent on a host for more context on this logic.

To configure an integration with Autodiscovery, use the following parameters:

| Parameter            | Required | Description                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | Yes      | Name of the Datadog integration                                                                   |
| `<INIT_CONFIG>`      | Yes      | The configuration parameters listed under `init_config:` in your `conf.yaml` and required for any integrations you're enabling.         |
| `<INSTANCE_CONFIG>`  | Yes      | A part of the `<INIT_CONFIG>`, these are the configuration parameters listed under `instances:` in your `conf.yaml` and required for any integrations you're enabling.         |
| `<LOG_CONFIG>`  | Yes      | A part of the `<INIT_CONFIG>`, these are the configuration parameters listed under `logs:` in your `conf.yaml` and define the logs you're sending to Datadog.        |

[**Discover the full list of Agent integrations that are Autodiscovery ready with examples for those parameters**][3]

Each tab in sections below shows a different way to apply integration templates to a given container. The available methods are:

* [Kubernetes pod annotations](?tab=kubernetes#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [Key-value stores](?tab=keyvaluestore#configuration)

**Note**: Some supported integrations don't work with standard Autodiscovery because they require either process tree data or filesystem access: [Ceph][4], [Varnish][5], [Postfix][6], [Cassandra Nodetools][7], and [Gunicorn][8].
To set up integrations that are not compatible with standard Autodiscovery, you can use an official Prometheus exporter in the pod, and then use the OpenMetrics check with Autodiscovery in the Agent to find the pod and query the endpoint. For example, the standard pattern in Kubernetes is: side car adapter with a node-level or cluster-level collector. This setup allows the exporter to access the data, which exposes it using an HTTP endpoint, and the OpenMetrics check with Datadog Autodiscovery can then access the data.

## Configuration

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
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '[<INTEGRATION_NAME>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCE_CONFIG>]'
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
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.check_names: '[<INTEGRATION_NAME_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.init_configs: '[<INIT_CONFIG_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.instances: '[<INSTANCE_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.check_names: '[<INTEGRATION_NAME_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.init_configs: '[<INIT_CONFIG_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.instances: '[<INSTANCE_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER_1>'
    # (...)
    - name: '<CONTAINER_IDENTIFIER_2>'
# (...)
```

If you define your Kubernetes pods directly with `kind: Pod`, add each pod's annotations directly under its `metadata` section. If you define pods indirectly with replication controllers, replica sets, or deployments, add pod annotations under `.spec.template.metadata`.

**Note:** As a best practice in containerized environments, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][1] documentation.


### Tolerate unready pods

By default, `unready` pods are ignored when the Datadog Agent schedules checks, so metrics, service checks, and logs are not collected from these pods. To override this behavior, set the annotation `ad.datadoghq.com/tolerate-unready` to `"true"`. For example:

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

[1]: /getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{% tab "File" %}}

Storing templates as local files and mounting them inside the containerized Agent doesn't require an external service or a specific orchestration platform. The downside is that you need to restart your Agent containers each time you change, add, or remove templates. The Agent looks for Autodiscovery templates in the mounted `/conf.d` directory.

Since Agent v6.2.0 (and v5.24.0), the default templates use the default port for the monitored software, instead of auto-detecting it. If you need to use a different port, provide a custom Autodiscovery template in the [Kubernetes pod annotations](?tab=kubernetes-annotations).

These integration templates are meant for basic cases. If you need a custom Datadog integration configuration to enable extra options, use different container identifiers—or use template variables indexing and write your own auto-configuration file:

1. Create a `conf.d/<INTEGRATION_NAME>.d/conf.yaml` file on your host and add your custom auto-configuration.
2. Mount your host `conf.d/` folder to the containerized Agent's `conf.d` folder.

**Example auto-configuration file**:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
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
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
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

**Note:** As a best practice in containerized environments, Datadog recommends using unified service tagging when configuring tags and environment variables. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][9] documentation.

With the key-value store enabled as a template source, the Agent looks for templates under the key `/datadog/check_configs`. Autodiscovery expects a key-value hierarchy like this:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IDENTIFIER>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCE_CONFIG>"]
    ...
```

**Note**: To apply a specific configuration to a given container, Autodiscovery identifies containers by **image** when using the key-value stores by trying to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].image`.

[1]: /integrations/consul/
[2]: /agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## Examples

### Datadog Redis integration

{{< tabs >}}
{{% tab "Kubernetes" %}}

The following pod annotation defines the integration template for `redis` containers with a custom `password` parameter:

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
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][1].

[1]: /agent/faq/template_variables/
{{% /tab %}}
{{% tab "ConfigMap" %}}

The following ConfigMap defines the integration template for `redis` containers:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redis-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
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

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][1].

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, e.g. `redis` OR `redis:latest`.

[1]: /agent/faq/template_variables/
{{% /tab %}}
{{< /tabs >}}

### Datadog Apache and HTTP check integrations

Configurations below apply to an Apache container image with the `<CONTAINER_IDENTIFIER>`: `apache`. The Autodiscovery templates are configured to collect metrics from the Apache container and set up a Datadog-HTTP check with instances for testing two endpoints.

Check names are `apache`, `http_check`, their `<INIT_CONFIG>`, and `<INSTANCE_CONFIG>`. Full configurations can be found in their respective documentation page: [Datadog-Apache integration][9], [Datadog-HTTP check integration][10].

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache","http_check"]'
    ad.datadoghq.com/apache.init_configs: '[{},{}]'
    ad.datadoghq.com/apache.instances: |
      [
        [
          {
            "apache_status_url": "http://%%host%%/server-status?auto"
          }
        ],
        [
          {
            "name": "<WEBSITE_1>",
            "url": "http://%%host%%/website_1",
            "timeout": 1
          },
          {
            "name": "<WEBSITE_2>",
            "url": "http://%%host%%/website_2",
            "timeout": 1
          }
        ]
      ]
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

{{% /tab %}}
{{% tab "File" %}}

* Create the folders `conf.d/` and `conf.d/apache.d` on your host.
* Add the custom auto-configuration below to `conf.d/apache.d/conf.yaml` on your host.

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

**Note**: It looks like a minimal [Apache check configuration][1], but notice the `ad_identifiers` option. This required option lets you provide container identifiers. Autodiscovery applies this template to any containers on the same host that run an `httpd` image. See the dedicated [Autodiscovery Identifier][2] documentation to learn more.

* Next, create the folder `conf.d/http_check.d` on your host.
* Add the custom auto-configuration below to `conf.d/http_check.d/conf.yaml` on your host.

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - name: "<WEBSITE_1>"
    url: "http://%%host%%/website_1"
    timeout: 1

  - name: "<WEBSITE_2>"
    url: "http://%%host%%/website_2"
    timeout: 1
```

* Finally, mount the host `conf.d/` folder to the containerized Agent `conf.d/` folder.

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

The following ConfigMap defines the integration template for the `apache` and `http_check` containers:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: httpd-config-map
  namespace: default
data:
  apache-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - apache_status_url: http://%%host%%/server-status?auto
  http-check-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - name: "<WEBSITE_1>"
        url: "http://%%host%%/website_1"
        timeout: 1
      - name: "<WEBSITE_2>"
        url: "http://%%host%%/website_2"
        timeout: 1
```

In the manifest, define the `volumeMounts` and `volumes`:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: apache-auto-config
            mountPath: /conf.d/apache.d/
          - name: http-auto-config
            mountPath: /conf.d/http_check.d/
        # [...]
      volumes:
      # [...]
        - name: apache-auto-config
          configMap:
            name: httpd-config-map
            items:
              - key: apache-config
                path: auto_conf.yaml
        - name: http-auto-config
          configMap:
            name: httpd-config-map
            items:
              - key: http-check-config
                path: auto_conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

```conf
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**Note**: The order of each list matters. The Agent can only generate the HTTP check configuration correctly if all parts of its configuration have the same index across the three lists.

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/docker/integrations/
[2]: /getting_started/integrations/#configuring-agent-integrations
[3]: /integrations/#cat-autodiscovery
[4]: /integrations/ceph/
[5]: /integrations/varnish/#autodiscovery
[6]: /integrations/postfix/
[7]: /integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /integrations/gunicorn/
[9]: /integrations/apache/#setup
[10]: /integrations/http_check/#setup
