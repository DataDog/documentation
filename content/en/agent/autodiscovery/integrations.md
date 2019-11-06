---
title: Autodiscovery Integration Templates
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

The goal of Autodiscovery is to apply a Datadog integration configuration when running an Agent check against a given container. See how to [configure Agent integrations][1] when running the Agent on a host for more context on this logic.

To configure an integration with Autodiscovery, use the following parameters:

| Parameter            | Required | Description                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | Yes      | Name of the Datadog integration                                                                   |
| `<INIT_CONFIG>`      | Yes      | Configuration for the `init_config:` section for the given Datadog-`<INTEGRATION_NAME>`           |
| `<INSTANCE_CONFIG>`  | Yes      | Configuration for the `instances:` section for the given Datadog-`<INTEGRATION_NAME>`             |
| `<LOG_CONFIG>`       | No       | For Agent v6.5+, configuration for the `logs:` section for the given Datadog-`<INTEGRATION_NAME>` |

Each tab in sections below shows a different way to apply integration templates to a given container. The available methods are:

* [Kubernetes pod annotations](?tab=kubernetes#configuration)
* [Docker labels](?tab=docker#configuration)
* [A configuration file mounted within the Agent](?tab=file#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [Key-value stores](?tab=keyvaluestore#configuration)

If you provide a template for the same integration with multiple template sources, the Agent looks for templates in the following order (using the first one it finds):

* Kubernetes annotations
* Docker Labels
* Files

**Note**: Some supported integrations don't work with standard Autodiscovery because they require either process tree data or filesystem access: [Ceph][2], [Varnish][3], [Postfix][4], [Cassandra Nodetools][5], and [Gunicorn][6]. To enable Autodiscovery for these integrations, use the official Prometheus exporter in the pod, and then use Autodiscovery in the Agent to find the pod and query the endpoint. For example, the standard pattern in Kubernetes is: side car adapter with a node-level or cluster-level collector. This setup allows the exporter to access the data, which exposes it using an HTTP endpoint, and Datadog Autodiscovery can then access the data.

## Configuration

{{< tabs >}}
{{% tab "Kubernetes" %}}

Integration templates can be stored in your Kubernetes pod annotations. With Autodiscovery, the Agent detects if it's running on Kubernetes and automatically searches all pod annotations for integration templates.

To apply a specific configuration to a given container, Autodiscovery identifies containers by **name**, NOT image. It tries to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].name`, not `.spec.containers[0].image`. To configure your Datadog integration Autodiscovery on a given `<CONTAINER_IDENTIFIER>` within your pod add the following annotations to your pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '[<CHECK_NAME>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCE_CONFIG>]'
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
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.check_names: '[<CHECK_NAME_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.init_configs: '[<INIT_CONFIG_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.instances: '[<INSTANCE_CONFIG_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.check_names: '[<CHECK_NAME_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.init_configs: '[<INIT_CONFIG_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.instances: '[<INSTANCE_CONFIG_2>]'
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
{{% tab "Docker" %}}

Integrations templates can be stored as Docker labels. With Autodiscovery, the Agent detects if it's running on Docker and automatically searches all labels for integration templates. Autodiscovery expects labels to look like the following examples:

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<CHECK_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

**docker run command**:

```shell
-l com.datadoghq.ad.check_names='[<CHECK_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**Docker Swarm**:

When using Swarm mode for Docker Cloud, labels must be applied to the image:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
      com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'

```

{{% /tab %}}
{{% tab "File" %}}

Storing templates as local files and mounting them inside the containerized Agent doesn't require an external service or a specific orchestration platform. The downside is that you need to restart your Agent containers each time you change, add, or remove templates. The Agent looks for Autodiscovery templates in the mounted `/conf.d` directory.

Since Agent v6.2.0 (and v5.24.0), the default templates use the default port for the monitored software, instead of auto-detecting it. If you need to use a different port, provide a custom Autodiscovery template either in [Docker container labels](?tab=docker-labels) or [Kubernetes pod annotations](?tab=kubernetes-annotations).

These integration templates are meant for basic cases. If you need a custom Datadog integration configuration to enable extra options, use different container identifiers—or use template variables indexing and write your own auto-configuration file:

1. Create a `conf.d/<INTEGRATION_NAME>.d/conf.yaml` file on your host and add your custom auto-configuration.
2. Mount your host `conf.d/` folder to the containerized Agent's `conf.d` folder.

**Example auto-configuration file**:

```
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

See the [Autodiscovery Container Identifiers][1] documentation for information on the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.

**Note**: You don't need to set up the `<INTEGRATIONS_NAME>` since the Agent infers it from the file name directly.

[1]: /agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "ConfigMap" %}}

On Kubernetes, you can use [ConfigMaps][1]. Reference the template below and the [Kubernetes Custom Integrations][2] documentation.

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: <NAME>-config-map
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
    logs:
      <LOGS_CONFIG>
```

See the [Autodiscovery Container Identifiers][3] documentation for information on the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.

[1]: /agent/kubernetes/integrations/#configmap
[2]: /agent/kubernetes/integrations
[3]: /agent/autodiscovery/ad_identifiers
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
      - instances: ["<INSTANCE_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Note**: To apply a specific configuration to a given container, Autodiscovery identifies containers by **image** when using the key-value stores by trying to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].image`.

[1]: /integrations/consul
[2]: /agent/guide/agent-commands
{{% /tab %}}
{{< /tabs >}}

## Examples
### Datadog Redis integration

{{< tabs >}}
{{% tab "Kubernetes" %}}

The following pod annotation defines the integration template for `redis` containers with a custom `password` parameter and tags all its logs with the correct `source` and `service` attributes:

```
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
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"redis"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: httpd
      ports:
        - containerPort: 80
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][1].


[1]: /agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "Docker" %}}

The following `docker-compose.yml` file applies the correct Redis integration template with a custom `password` parameter:


```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
```

{{% /tab %}}
{{% tab "File" %}}

Redis is one of the default Autodiscovery templates packaged with the Agent, so you don't need to mount this file. The following Redis template is packaged with the Agent:

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
```

This looks like a minimal [Redis integration configuration][1], but notice the `ad_identifiers` option. This required option lets you provide container identifiers. Autodiscovery applies this template to any container on the same host that run a `redis` image. See the dedicated [Autodiscovery Identifier][2] documentation to learn more.

If your Redis requires an additional `password` when accessing its stats endpoint, and you want to correctly flag logs coming out of it:

1. Create the folders `conf.d/` and `conf.d/redis.d` on your host.
2. Add the custom auto-configuration below to `conf.d/redis.d/conf.yaml` on your host.
3. Mount the host `conf.d/` folder to the containerized Agent `conf.d/` folder.

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
    password: "%%env_REDIS_PASSWORD%%"

logs:
  source: redis
  service: redis
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][3].


[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /agent/autodiscovery/ad_identifiers
[3]: /agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "ConfigMap" %}}

The following ConfigMap defines the integration template for `redis` containers with the `source` and `service` attributes for collecting logs:

```
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
    logs:
      source: redis
      service: redis
```

In the manifest, define the `volumeMounts` and `volumes`:

```
[...]
        volumeMounts:
        [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        [...]
      volumes:
      [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
[...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

The following etcd commands create a Redis integration template with a custom `password` parameter and tags all its logs with the correct `source` and `service` attributes:

```
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis"}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][1].

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, e.g. `redis` OR `redis:latest`.

[1]: /agent/autodiscovery/template_variables
{{% /tab %}}
{{< /tabs >}}

### Datadog Apache and HTTP check integrations

Configurations below apply to an Apache container image with the `<CONTAINER_IDENTIFIER>`: `httpd`. The Autodiscovery templates are configured to collect metrics and logs from the Apache container and set up a Datadog-HTTP check with instances for testing two endpoints.

Check names are `apache`, `http_check`, and their `<INIT_CONFIG>`, `<INSTANCE_CONFIG>`, and `<LOG_CONFIG>`. Full configurations can be found in their respective documentation page: [Datadog-Apache integration][7], [Datadog-HTTP check integration][8].

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
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
    ad.datadoghq.com/apache.logs: '[{"source":"apache","service":"webapp"}]'
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
{{% tab "Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<WEBSITE_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<WEBSITE_2>","url":"http://%%host%%/website_2","timeout":1}]]'
  com.datadoghq.ad.logs: '[{"source": "apache", "service": "webapp"}]'
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

logs:
  source: apache
  service: webapp
```

**Note**: It looks like a minimal [Apache check configuration][1], but notice the `ad_identifiers` option. This required option lets you provide container identifiers. Autodiscovery applies this template to any containers on the same host that run an `httpd` image. See the dedicated [Autodiscovery Identifier][2] documentation to learn more.

* Next, create the folder `conf.d/http_check.d` on your host.
* Add the custom auto-configuration below to `conf.d/http_check.d/conf.yaml` on your host.

```
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
[2]: /agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "ConfigMap" %}}

The following ConfigMap defines the integration template for the `apache` and `http_check` containers with the `source` and `service` attributes for collecting `apache` logs:

```
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
    logs:
      source: apache
      service: webapp
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

```
[...]
        volumeMounts:
        [...]
          - name: httpd-config-map
            mountPath: /conf.d
        [...]
      volumes:
      [...]
        - name: httpd-config-map
          configMap:
            name: httpd-config-map
            items:
              - key: apache-config
                path: /apache.d/conf.yaml
              - key: http-check-config
                path: /http_check.d/conf.yaml
[...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

```
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
etcdctl set /datadog/check_configs/httpd/logs '[{"source": "apache", "service": "webapp"}]'
```

**Note**: The order of each list matters. The Agent can only generate the HTTP check configuration correctly if all parts of its configuration have the same index across the three lists.


{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/#configuring-agent-integrations
[2]: /integrations/ceph
[3]: /integrations/varnish/#autodiscovery
[4]: /integrations/postfix
[5]: /integrations/cassandra/#agent-check-cassandra-nodetool
[6]: /integrations/gunicorn
[7]: /integrations/apache/#setup
[8]: /integrations/http_check/#setup
