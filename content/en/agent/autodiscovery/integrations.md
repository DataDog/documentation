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

The goal of Autodiscovery is to apply a Datadog integration configuration when running an Agent Check against a given container. See how to [Configure Agent integrations][1] when running the Agent on a host if you want more context on this logic. In order to configure an integration with Autodiscovery, the following parameters are required:

* `<INTEGRATION_NAME>`: Name of the Datadog integration
* `<INIT_CONFIG>`: Configuration for the `init_config:` section for the given Datadog-`<INTEGRATION_NAME>`.
* `<INSTANCE_CONFIG>`: Configuration for the `instances:` section for the given Datadog-`<INTEGRATION_NAME>`.

Additionally, if you use Agent v6.5+, you can also use the following parameter to configure your [log collection][2] with Autodiscovery:

* `<LOG_CONFIG>`: Configuration for the `logs:` section for the given Datadog-`<INTEGRATION_NAME>`

Each tab in sections below shows a different way to apply integration templates to a given container. Available documented methods are:

* [Using a configuration file mounted within the Agent](?tab=file#configuration)
* [Using key-value stores](?tab=keyvaluestore#configuration)
* [Using Kubernetes annotations](?tab=kubernetespodannotations#configuration)
* [Using Docker labels](?tab=dockerlabel#configuration)

If you provide a template for the same integration via multiple template sources, the Agent looks for templates in the following order (using the first one it finds):

* Kubernetes annotations
* Docker Labels
* Files

**Note**: Some supported integrations requires additional steps for Autodiscovery to work: [Ceph][3], [Varnish][4], [Postfix][5], [Cassandra Nodetools][6], and [Gunicorn][7]. Contact [Datadog support][8] for assistance.

## Configuration

{{< tabs >}}
{{% tab "File" %}}

Storing templates as local files and mounting them inside the containerized Agent doesn't require an external service or a specific orchestration platform. The downside is that you have to restart your Agent containers each time you change, add, or remove templates. The Agent looks for Autodiscovery templates in the mounted `/conf.d` directory, which contains default templates for the following checks: [Apache][1], [Consul][2], [CouchDB][3], [Couchbase][4], [Elasticsearch][5], [Etcd][6], [Kubernetes_state][7], [Kube_dns][8], [Kube_proxy][9], [Kyototycoon][10], [Memcached][11], [Redis][12], and [Riak][13].

Since v6.2.0 (and v5.24.0), the default templates use the default port for the monitored software, instead of auto-detecting it. If you need to use a different port, provide a custom Autodiscovery template either in [Docker container labels](?tab=docker-labels) or [Kubernetes pod annotations](?tab=kubernetes-annotations).

These integration templates may suit you in basic cases, but if you need to customize your Datadog integration configurations—such as enabling extra options, using different container identifiers, or using Template Variables indexing— you have to write your own auto-configuration files and use them with the Datadog Containerized Agent. To do this:

1. Create a `autodiscovery.d/<INTEGRATION_NAME>.d/conf.yaml` file on your host with your custom auto-configuration in it.
2. Mount this file inside the `conf.d/<INTEGRATION_NAME>.d/` folder of the containerized Agent. Note that on Kubernetes, you can add them [using ConfigMaps][14].

Your auto-configuration file should have the following format:

```
ad_identifier:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

See the dedicated [Autodiscovery Container Identifier][15] documentation to understand what the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` refers to.

**Note**: You don't need to set up the `<INTEGRATIONS_NAME>` there, since the Agent infers it from the file name directly.

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/auto_conf.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_proxy/datadog_checks/kube_proxy/data/conf.yaml.example
[10]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[14]: /agent/kubernetes/integrations/#configmap
[15]: /agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "Key-value Store" %}}

Autodiscovery can use [Consul][1], Etcd, and Zookeeper as integration template sources. To use a key-value store, you must configure it in the Agent `datadog.yaml` configuration file and mount this file inside the containerized Agent. Alternatively, pass your key-value store as environment variables to the containerized Agent.

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

**Note**: In order to apply a specific configuration to a given container, Autodiscovery identifies containers by **image** when using the key-value stores. That is, it looks to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].image`.

[1]: /integrations/consul
[2]: /agent/guide/agent-commands
{{% /tab %}}
{{% tab "Kubernetes Pod Annotations" %}}

You can store your integration templates in Kubernetes Pod annotations. With Autodiscovery enabled, the Agent detects if it's running on Kubernetes and automatically searches all Pod annotations for integration templates.

In order to apply a specific configuration to a given container, Autodiscovery identifies containers by _name_, **NOT image** (as it does for auto-configuration files and key-value stores). That is, it looks to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].name`, not `.spec.containers[0].image`. To configure your Datadog integration Autodiscovery on a given `<CONTAINER_IDENTIFIER>` within your Pod add the following annotations to your Pod:

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

To apply two different integration templates to two different containers: `<CONTAINER_IDENTIFIER_1>` and `<CONTAINER_IDENTIFIER_2>` within your Pod, add the following annotations to your Pod:

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

**Note**: If you define your Kubernetes Pods directly (i.e. `kind: Pod`), add each Pod's annotations directly under its `metadata` section. If you define Pods _indirectly_ via Replication Controllers, Replica Sets, or Deployments, add Pod annotations under `.spec.template.metadata`.

{{% /tab %}}
{{% tab "Docker Label" %}}

You can store your integrations templates as Docker labels since the Agent detects if it's running on Docker and automatically searches all labels for integration templates. Autodiscovery expects labels to look like these examples, depending on the file type:

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
{{< /tabs >}}

Find below two sections giving examples for all of the previous methods:

* [Example Datadog-Redis Integration](#example-datadog-redis-integration)
* [Example Datadog-Apache and Datadog-HTTP checks Integrations](#example-datadog-apache-and-http-checks-integrations)

## Example Datadog-Redis Integration

{{< tabs >}}
{{% tab "File" %}}

Redis is one of the default Autodiscovery templates packaged with the Agent, so you don't need to mount this file. Here's the auto-conf `redis.yaml` template packaged with the Agent:

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
```

It looks like a minimal [Redis integration configuration][1], but notice the `ad_identifiers` option. This required option lets you provide container identifiers. Autodiscovery applies this template to any containers on the same host that run a `redis` image.

**See the dedicated [Autodiscovery Identifier][2] documentation to learn more.**

Now let's suppose that your Redis requires an additional `password` when accessing its stats endpoint and you want to correctly flag logs coming out of it. In order to take into account this new logic:

1. Create a `autodiscovery.d/` folder on your host.
2. Add the custom auto-configuration named `redisdb.yaml`file below to this folder
3. Mount the `autodiscovery.d/` folder into the containerized Agent `conf.d/` folder.

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

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used in order to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][3].


[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /agent/autodiscovery/ad_identifiers
[3]: /agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "Key-value Store" %}}

The following etcd commands create a Redis integration template with a custom `password` parameter and tags all its logs with the correct `source` and `service` attributes:

```
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis"}]'
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used in order to avoid to store the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][1].

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, e.g. `redis` OR `redis:latest`.

[1]: /agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "Kubernetes Pod Annotations" %}}

The following Pod annotation defines the integration template for `redis` containers with a custom `password` parameter and tags all its logs with the correct `source` and `service` attributes:

```
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: ["redisdb"]
    ad.datadoghq.com/redis.init_configs: [{}]
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/redis.logs: [{"source":"redis","service":"redis"}]
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: httpd
      ports:
        - containerPort: 80
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used in order to avoid to store the password in plain text, hence the `REDIS_PASSWORD` environment variable must be passed to the Agent. See the [Autodiscovery template variable documentation][1].


[1]: /agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "Docker Label" %}}

The following `docker-compose.yml` file applies the correct Redis integration template with a custom `password` parameter:


```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
```

{{% /tab %}}
{{< /tabs >}}

## Example: Datadog Apache and HTTP checks Integrations

Configurations below apply to an Apache container image with the `<CONTAINER_IDENTIFIER>`: `httpd`. The Autodiscovery templates are configured to collect metrics and logs from the Apache container, and setting up a Datadog-HTTP check with two instances in order to test two endpoints to monitor whether the websites created by the Apache container are available:

Check names are `apache` and `http_check` and their `<INIT_CONFIG>`, `<INSTANCE_CONFIG>`, and `<LOG_CONFIG>` full configurations can be found in their respective documentation page: [Datadog-Apache integration][9], [Datadog-HTTP check integration][10].

{{< tabs >}}
{{% tab "File" %}}

First, create a `autodiscovery.d/` folder on your host. Then add the following custom auto-configuration file named `apache.yaml` to this folder:

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

**Note**: It looks like a minimal [Apache check configuration][1], but notice the `ad_identifiers` option. This required option lets you provide container identifiers. Autodiscovery applies this template to any containers on the same host that run an `httpd` image. **See the dedicated [Autodiscovery Identifier][2] documentation to learn more**.

Then add the following custom auto-configuration file named `http_check.yaml` to this folder:

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

Finally, mount the `autodiscovery.d/` folder into the containerized Agent `conf.d/` folder.

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "Key-value Store" %}}

```
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
etcdctl set /datadog/check_configs/httpd/logs '[{"source": "apache", "service": "webapp"}]'
```

**Note**: The order of each list matters. The Agent can only generate the HTTP check configuration correctly if all parts of its configuration have the same index across the three lists.


{{% /tab %}}
{{% tab "Kubernetes Pod Annotations" %}}

```
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: ["apache","http_check"]
    ad.datadoghq.com/apache.init_configs: [{},{}]
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
    ad.datadoghq.com/apache.logs: [{"source":"apache","service":"webapp"}]
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
{{% tab "Docker Label" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<WEBSITE_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<WEBSITE_2>","url":"http://%%host%%/website_2","timeout":1}]]'
  com.datadoghq.ad.logs: '[{"source": "apache", "service": "webapp"}]'
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/#configuring-agent-integrations
[2]: /logs
[3]: /integrations/ceph
[4]: /integrations/varnish/#autodiscovery
[5]: /integrations/postfix
[6]: /integrations/cassandra/#agent-check-cassandra-nodetool
[7]: /integrations/gunicorn
[8]: /help
[9]: /integrations/apache/#setup
[10]: /integrations/http_check/#setup
