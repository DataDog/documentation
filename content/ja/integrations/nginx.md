---
"app_id": "nginx"
"app_uuid": "b98a5a97-1d65-4f74-9d1a-b2c1be85a470"
"assets":
  "dashboards":
    "NGINX Plus base overview": "assets/dashboards/plus_overview.json"
    "NGINX-Metrics": "assets/dashboards/NGINX-Metrics_dashboard.json"
    "NGINX-Overview": "assets/dashboards/NGINX-Overview_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "nginx.net.connections"
      - "nginx.connections.active"
      "metadata_path": "metadata.csv"
      "prefix": "nginx."
    "process_signatures":
    - "nginx: master process"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "31"
    "source_type_name": "Nginx"
  "monitors":
    "[NGINX] 4xx Errors higher than usual": "assets/monitors/4xx.json"
    "[NGINX] 5xx Errors higher than usual": "assets/monitors/5xx.json"
    "[NGINX] Upstream peers fails": "assets/monitors/upstream_peer_fails.json"
  "saved_views":
    "4xx_errors": "assets/saved_views/4xx_errors.json"
    "5xx_errors": "assets/saved_views/5xx_errors.json"
    "bot_errors": "assets/saved_views/bot_errors.json"
    "nginx_processes": "assets/saved_views/nginx_processes.json"
    "status_code_overview": "assets/saved_views/status_code_overview.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/nginx/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nginx"
"integration_id": "nginx"
"integration_title": "Nginx"
"integration_version": "6.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "nginx"
"public_title": "Nginx"
"short_description": "Monitor connection and request metrics. Get more metrics with NGINX Plus."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Monitor connection and request metrics. Get more metrics with NGINX Plus."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Nginx"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![NGINX default dashboard][1]

## Overview

The Datadog Agent can collect many metrics from NGINX instances, including (but not limited to)::

- Total requests
- Connections, such as accepted, handled, and active

For users of NGINX Plus, the commercial version of NGINX, the Agent can collect the significantly more metrics that NGINX Plus provides, like:

- Errors, such as 4xx codes and 5xx codes
- Upstream servers, such as active connections, 5xx codes, and health checks
- Caches, such as size, hits, and misses
- SSL, such as handshakes and failed handshakes

## Setup

### Installation

The NGINX check pulls metrics from a local NGINX status endpoint, so your `nginx` binaries need to be compiled with a NGINX status module:

- [Stub status module][2] - for open source NGINX
- [HTTP status module][3] - only for NGINX Plus

#### NGINX open source

If you use open source NGINX, your instances may lack the stub status module. Verify that your `nginx` binary includes the module before proceeding to **Configuration**:

```shell
$ nginx -V 2>&1| grep -o http_stub_status_module
http_stub_status_module
```

If the command output does not include `http_stub_status_module`, you must install an NGINX package that includes the module. You _can_ compile your own NGINX-enabling the module as you compile it-but most modern Linux distributions provide alternative NGINX packages with various combinations of extra modules built in. Check your operating system's NGINX packages to find one that includes the stub status module.

#### NGINX Plus

NGINX Plus packages prior to release 13 include the http status module. For NGINX Plus release 13 and above, the status module is deprecated and you must use the new Plus API instead. See [the announcement][4] for more information.

#### Prepare NGINX

{{< tabs >}}
{{% tab "Host" %}}

On each NGINX server, create a `status.conf` file in the directory that contains your other NGINX configuration files, such as `/etc/nginx/conf.d/`.

```conf
server {
  listen 81;
  server_name localhost;

  access_log off;
  allow 127.0.0.1;
  deny all;

  location /nginx_status {
    # Choose your status module

    # freely available with open source NGINX
    stub_status;

    # for open source NGINX < version 1.7.5
    # stub_status on;

    # available only with NGINX Plus
    # status;

    # ensures the version information can be retrieved
    server_tokens on;
  }
}
```

**NGINX Plus**

NGINX Plus users can also use `stub_status`, but since that module provides fewer metrics, Datadog recommends using `status`.

For NGINX Plus releases 15+, the `status` module is deprecated. Use the [http_api_module][1] instead. For example, enable the `/api` endpoint in your main NGINX configuration file (`/etc/nginx/conf.d/default.conf`):

```conf
server {
  listen 8080;
  location /api {
    api write=on;
  }
}
```

To get more detailed metrics with NGINX Plus (such as 2xx / 3xx / 4xx / 5xx response counts per second), set a `status_zone` on the servers you want to monitor. For example:

```conf
server {
  listen 80;
  status_zone <ZONE_NAME>;
  ...
}
```

Reload NGINX to enable the status or API endpoint. There's no need for a full restart.

```shell
sudo nginx -t && sudo nginx -s reload
```
[1]: https://nginx.org/en/docs/http/ngx_http_api_module.html
{{% /tab %}}
{{% tab "Kubernetes" %}}

Add the following snippet to your configuration ConfigMaps to expose the metrics endpoint in a different port:

```yaml
kind: ConfigMap
metadata:
  name: nginx-conf
data:
[...]
  status.conf: |
    server {
      listen 81;

      location /nginx_status {
        stub_status on;
      }

      location / {
        return 404;
      }
    }
```

Then, in your NGINX pod, expose the `81` endpoint and mount that file in the NGINX configuration folder:

```yaml
spec:
  containers:
    - name: nginx
      ports:
        - containerPort: 81
      volumeMounts:
        - mountPath: /etc/nginx/conf.d/status.conf
          subPath: status.conf
          readOnly: true
          name: "config"
  volumes:
    - name: "config"
      configMap:
          name: "nginx-conf"
```


{{% /tab %}}
{{< /tabs >}}

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Docker](?tab=docker#docker), [Kubernetes](?tab=kubernetes#kubernetes), or [ECS](?tab=ecs#ecs) sections.

##### Metric collection

1. Set the `nginx_status_url` parameter to `http://localhost:81/nginx_status/` in your `nginx.d/conf.yaml` file to start gathering your [NGINX metrics](#metrics). See the [sample nginx.d/conf.yaml][1] for all available configuration options.

    **NGINX Plus**:

      - For NGINX Plus releases 13+, set the parameter `use_plus_api` to `true` in your `nginx.d/conf.yaml` configuration file.
      - Stream stats API calls are included by default for NGINX Plus. If you want to disable them, set the parameter `use_plus_api_stream` to `false` in your `nginx.d/conf.yaml` configuration file.
      - If you are using `http_api_module`, set the parameter `nginx_status_url` to the server's `/api` location in your `nginx.d/conf.yaml` configuration file, for example:

          ```yaml
          nginx_status_url: http://localhost:8080/api
          ```

2. Optional - If you are using the NGINX `vhost_traffic_status module`, set the parameter `use_vts` to `true` in your `nginx.d/conf.yaml` configuration file.

3. [Restart the Agent][2] to start sending NGINX metrics to Datadog.

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `nginx.d/conf.yaml` file to start collecting your NGINX Logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/nginx/access.log
       service: nginx
       source: nginx

     - type: file
       path: /var/log/nginx/error.log
       service: nginx
       source: nginx
   ```

    Change the `service` and `path` parameter values and configure them for your environment. See the [sample nginx.d/conf.yaml][1] for all available configuration options.

3. [Restart the Agent][2].

**Note**: The default NGINX log format does not have a request response time. To include it into your logs, update the NGINX log format by adding the following configuration block in the `http` section of your NGINX configuration file (`/etc/nginx/nginx.conf`):

```conf
http {
    #recommended log format
    log_format nginx '\$remote_addr - \$remote_user [\$time_local] '
                  '"\$request" \$status \$body_bytes_sent \$request_time '
                  '"\$http_referer" "\$http_user_agent"';

    access_log /var/log/nginx/access.log;
}
```

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

To configure this check for an Agent running on a container:

##### Metric collection

Set [Autodiscovery Integration Templates][1] as Docker labels on your application container:

```yaml
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:81/nginx_status/"}]'
```

**Note**: This instance configuration works only with NGINX Open Source. If you are using NGINX Plus, inline the corresponding instance configuration.

#### Log collection


Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Docker Log Collection][2].

Then, set [Log Integrations][3] as Docker labels:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"nginx","service":"nginx"}]'
```

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

To configure this check for an Agent running on Kubernetes:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as pod annotations on your application container. Alternatively, you can configure templates with a [file, configmap, or key-value store][2].

**Annotations v1** (for Datadog Agent < v7.36)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.check_names: '["nginx"]'
    ad.datadoghq.com/nginx.init_configs: '[{}]'
    ad.datadoghq.com/nginx.instances: |
      [
        {
          "nginx_status_url":"http://%%host%%:81/nginx_status/"
        }
      ]
  labels:
    name: nginx
```

**Annotations v2** (for Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.checks: |
      {
        "nginx": {
          "init_config": {},
          "instances": [
            {
              "nginx_status_url":"http://%%host%%:81/nginx_status/"
            }
          ]
        }
      }
  labels:
    name: nginx
```

**Note**: This instance configuration works only with NGINX Open Source. If you are using NGINX Plus, inline the corresponding instance configuration.

#### Log collection


Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][3].

Then, set [Log Integrations][4] as pod annotations. Alternatively, you can configure this with a [file, configmap, or key-value store][5].

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.logs: '[{"source":"nginx","service":"nginx"}]'
  labels:
    name: nginx
```

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

To configure this check for an Agent running on ECS:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as Docker labels on your application container:

```json
{
  "containerDefinitions": [{
    "name": "nginx",
    "image": "nginx:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"nginx\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"nginx_status_url\":\"http://%%host%%:81/nginx_status/\"}]"
    }
  }]
}
```

**Note**: This instance configuration works only with NGINX Open Source. If you are using NGINX Plus, inline the corresponding instance configuration.

##### Log collection


Collecting logs is disabled by default in the Datadog Agent. To enable it, see [ECS Log Collection][2].

Then, set [Log Integrations][3] as Docker labels:

```yaml
{
  "containerDefinitions": [{
    "name": "nginx",
    "image": "nginx:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"nginx\",\"service\":\"nginx\"}]"
    }
  }]
}
```

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][5] and look for `nginx` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "nginx" >}}


Not all metrics shown are available to users of open source NGINX. Compare the module reference for [stub status][2] (open source NGINX) and [http status][3] (NGINX Plus) to understand which metrics are provided by each module.

A few open-source NGINX metrics are named differently in NGINX Plus, but they are the same metric:

| NGINX                          | NGINX Plus                   |
| ------------------------------ | ---------------------------- |
| `nginx.net.connections`        | `nginx.connections.active`   |
| `nginx.net.conn_opened_per_s`  | `nginx.connections.accepted` |
| `nginx.net.conn_dropped_per_s` | `nginx.connections.dropped`  |
| `nginx.net.request_per_s`      | `nginx.requests.total`       |

These metrics don't refer exactly to the same metric, but they are somewhat related:

| NGINX               | NGINX Plus               |
| ------------------- | ------------------------ |
| `nginx.net.waiting` | `nginx.connections.idle` |

Finally, these metrics have no good equivalent:

| Metric              | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `nginx.net.reading` | The current number of connections where nginx is reading the request header.              |
| `nginx.net.writing` | The current number of connections where nginx is writing the response back to the client. |

### Events

The NGINX check does not include any events.

### Service Checks
{{< get-service-checks-from-git "nginx" >}}


## Troubleshooting

- [Why do my logs not have the expected timestamp?][6]

Need help? Contact [Datadog support][7].

## Further Reading

Additional helpful documentation, links, and articles:

- [How to monitor NGINX][8]
- [How to collect NGINX metrics][9]
- [How to monitor NGINX with Datadog][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/nginx/images/nginx_dashboard.png
[2]: https://nginx.org/en/docs/http/ngx_http_stub_status_module.html
[3]: https://nginx.org/en/docs/http/ngx_http_status_module.html
[4]: https://www.nginx.com/blog/nginx-plus-r13-released
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/logs/faq/why-do-my-logs-not-have-the-expected-timestamp/
[7]: https://docs.datadoghq.com/help/
[8]: https://www.datadoghq.com/blog/how-to-monitor-nginx
[9]: https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html
[10]: https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html
