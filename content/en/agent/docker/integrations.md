---
title: Docker Integrations Autodiscovery
kind: documentation
further_reading:
- link: "/agent/docker/log/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/agent/docker/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/docker/prometheus/"
  tag: "Documentation"
  text: "Collect your Prometheus metrics"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
- link: "/agent/docker/tag/"
  tag: "Documentation"
  text: "Assign tags to all data emitted by a container"
---

<div class="alert alert-info">
<a href="/getting_started/agent/autodiscovery">Consult the Autodiscovery Getting Started documentation to discover the concepts behind this feature</a>.
</div>

This page covers how to configure Autodiscovery for integrations with Docker. If you are using Kubernetes, see the [Kubernetes Integrations Autodiscovery documentation][1].

The goal of Autodiscovery is to apply a Datadog integration configuration when running an Agent check against a given container. See how to [configure Agent integrations][2] when running the Agent on a host for more context on this logic.

To configure an integration with Autodiscovery, use the following parameters:

| Parameter            | Required | Description                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | Yes      | Name of the Datadog integration                                                                   |
| `<INIT_CONFIG>`      | Yes      | Configuration for the `init_config:` section for the given Datadog-`<INTEGRATION_NAME>`           |
| `<INSTANCE_CONFIG>`  | Yes      | Configuration for the `instances:` section for the given Datadog-`<INTEGRATION_NAME>`             |

[**Discover the full list of Agent integrations that are Autodiscovery ready with examples for those parameters**][3]

Each tab in sections below shows a different way to apply integration templates to a given container. The available methods are:

* [Docker labels](?tab=docker#configuration)
* [A configuration file mounted within the Agent](?tab=file#configuration)
* [Key-value stores](?tab=keyvaluestore#configuration)

**Note**: Some supported integrations don't work with standard Autodiscovery because they require either process tree data or filesystem access: [Ceph][4], [Varnish][5], [Postfix][6], [Cassandra Nodetools][7], and [Gunicorn][8]. To enable Autodiscovery for these integrations, use the official Prometheus exporter in the pod, and then use Autodiscovery in the Agent to find the pod and query the endpoint.

## Configuration

{{< tabs >}}
{{% tab "Docker" %}}

To automatically enable Autodiscovery over Docker containers, mount `/var/run/docker.sock` into the Containerized Agent. On Windows, mount `\\.\pipe\docker_engine`.

Integrations templates can be stored as Docker labels. With Autodiscovery, the Agent detects if it's running on Docker and automatically searches all labels for integration templates. Autodiscovery expects labels to look like the following examples:

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
```

**docker run command**:

```shell
-l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]'
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
      com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'

```

**Note**: When configuring autodiscovery, Datadog recommends using Docker labels to unify telemetry across your containerized environment. Read the [unified service tagging][1] documentation for more information.


[1]: /getting_started/tagging/unified_service_tagging/?tab=docker
{{% /tab %}}
{{% tab "File" %}}

Storing templates as local files and mounting them inside the containerized Agent doesn't require an external service or a specific orchestration platform. The downside is that you need to restart your Agent containers each time you change, add, or remove templates. The Agent looks for Autodiscovery templates in the mounted `/conf.d` directory.

Since Agent v6.2.0 (and v5.24.0), the default templates use the default port for the monitored software, instead of auto-detecting it. If you need to use a different port, provide a custom Autodiscovery template in the [Docker container labels](?tab=docker-labels)

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
{{% tab "Docker" %}}

The following `docker-compose.yml` file applies the correct Redis integration template with a custom `password` parameter:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
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

If your Redis requires an additional `password` when accessing its stats endpoint:

1. Create the folders `conf.d/` and `conf.d/redisdb.d` on your host.
2. Add the custom auto-configuration below to `conf.d/redisdb.d/conf.yaml` on your host.
3. Mount the host `conf.d/` folder to the containerized Agent `conf.d/` folder.

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
    password: "%%env_REDIS_PASSWORD%%"
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][3].

[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /agent/guide/ad_identifiers/
[3]: /agent/faq/template_variables/
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

Configurations below apply to an Apache container image with the `<CONTAINER_IDENTIFIER>`: `httpd`. The Autodiscovery templates are configured to collect metrics from the Apache container and set up a Datadog-HTTP check with instances for testing two endpoints.

Check names are `apache`, `http_check`, and their `<INIT_CONFIG>`, and `<INSTANCE_CONFIG>`. Full configurations can be found in their respective documentation page: [Datadog-Apache integration][9], [Datadog-HTTP check integration][10].

{{< tabs >}}
{{% tab "Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<WEBSITE_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<WEBSITE_2>","url":"http://%%host%%/website_2","timeout":1}]]'
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

[1]: /agent/kubernetes/integrations/
[2]: /getting_started/integrations/#configuring-agent-integrations
[3]: /integrations/#cat-autodiscovery
[4]: /integrations/ceph/
[5]: /integrations/varnish/#autodiscovery
[6]: /integrations/postfix/
[7]: /integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /integrations/gunicorn/
[9]: /integrations/apache/#setup
[10]: /integrations/http_check/#setup
