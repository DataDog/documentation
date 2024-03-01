---
title: "Autodiscovery: Scenarios & Examples"
kind: guide
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

Datadog's Autodiscovery feature allows you to define configuration templates for Agent Checks on designated sets of containers. This page contains detailed example templates for the following scenarios:

- One Check for one set of containers
- One Check for multiple sets of containers
- Multiple Checks for one set of containers
- Multiple Checks for multiple sets of containers

For more information about Autodiscovery, see [Getting Started with Containers: Autodiscovery][1].

### One Check for one set of containers

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

### One Check for multiple sets of containers
### Multiple Checks for one set of containers
### Datadog Apache and HTTP check integrations

Configurations below apply to an Apache container image with the `<CONTAINER_IDENTIFIER>`: `apache`. These templates are configured to collect metrics from the Apache container and set up a Datadog-HTTP check with instances for testing two endpoints.

Check names are `apache` and `http_check`. To reference full configurations, see [Datadog-Apache integration][9] and [Datadog-HTTP check integration][10], respectively.

{{< tabs >}}
{{% tab "Pod annotations" %}}

**Autodiscovery Annotations v2** (for Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            }
          ]
        },
        "http_check": {
          "instances": [
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
        }
      }
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

**Autodiscovery Annotations v1** 

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
          apache.yaml: |-
            ad_identifiers:
              - apache
            init_config:
            instances:
              - apache_status_url: "http://%%host%%/server-status?auto"
```
As a result, the Agent contains a `redisdb.yaml` file with the above configuration in the `conf.d` directory.

{{% /tab %}}

{{% tab "Helm" %}}


{{% /tab %}}
{{< /tabs >}}

### Multiple Checks for multiple sets of containers

[1]: /getting_started/containers/autodiscovery