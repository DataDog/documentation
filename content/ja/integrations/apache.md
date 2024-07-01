---
"app_id": "apache"
"app_uuid": "8dfc1942-7820-49c7-93c8-5a31579ee52a"
"assets":
  "dashboards":
    "apache": "assets/dashboards/apache_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "apache.performance.busy_workers"
      "metadata_path": "metadata.csv"
      "prefix": "apache."
    "process_signatures":
    - "httpd"
    - "apache"
    - "apache2"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "30"
    "source_type_name": "Apache"
  "monitors":
    "[Apache] Low number of idle workers": "assets/monitors/apache_low_idle_workers.json"
    "[Apache] resource utilization": "assets/monitors/high_keep_alive_and_cpu.json"
  "saved_views":
    "4xx_errors": "assets/saved_views/4xx_errors.json"
    "5xx_errors": "assets/saved_views/5xx_errors.json"
    "apache_processes": "assets/saved_views/apache_processes.json"
    "bot_errors": "assets/saved_views/bot_errors.json"
    "status_code_overview": "assets/saved_views/status_code_overview.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/apache/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "apache"
"integration_id": "apache"
"integration_title": "Apache"
"integration_version": "4.5.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "apache"
"public_title": "Apache"
"short_description": "Track requests per second, bytes served, worker threads, uptime, and more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track requests per second, bytes served, worker threads, uptime, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Apache"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Apache Dashboard][1]

## Overview

The Apache check tracks requests per second, bytes served, number of worker threads, service uptime, and more.

## Setup

### Installation

The Apache check is packaged with the [Datadog Agent][2]. To start gathering your Apache metrics and logs, you need to:

1. [Install the Agent][3] on your Apache servers.

2. Install `mod_status` on your Apache servers and enable `ExtendedStatus`.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `apache.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your Apache metrics. See the [sample apache.d/conf.yaml][2] for all available configuration options.

   ```yaml
   init_config:

   instances:
     ## @param apache_status_url - string - required
     ## Status url of your Apache server.
     #
     - apache_status_url: http://localhost/server-status?auto
   ```

2. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `apache.d/conf.yaml` file to start collecting your Apache logs, adjusting the `path` and `service` values to configure them for your environment:

   ```yaml
   logs:
     - type: file
       path: /path/to/your/apache/access.log
       source: apache
       service: apache
       sourcecategory: http_web_access

     - type: file
       path: /path/to/your/apache/error.log
       source: apache
       service: apache
       sourcecategory: http_web_error
   ```

    See the [sample apache.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

To configure this check for an Agent running on a container:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as Docker labels on your application container:

```yaml
LABEL "com.datadoghq.ad.check_names"='["apache"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

##### Log collection


Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Docker Log Collection][2].

Then, set [Log Integrations][3] as Docker labels:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "apache", "service": "<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

To configure this check for an Agent running on Kubernetes:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as pod annotations on your application container. Aside from this, templates can also be configured with [a file, a configmap, or a key-value store][2].

**Annotations v1** (for Datadog Agent < v7.36)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache"]'
    ad.datadoghq.com/apache.init_configs: '[{}]'
    ad.datadoghq.com/apache.instances: |
      [
        {
          "apache_status_url": "http://%%host%%/server-status?auto"
        }
      ]
spec:
  containers:
    - name: apache
```

**Annotations v2** (for Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "init_config": {},
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            }
          ]
        }
      }
spec:
  containers:
    - name: apache
```

##### Log collection


Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][3].

Then, set [Log Integrations][4] as pod annotations. This can also be configured with [a file, a configmap, or a key-value store][5].

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"apache","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: apache
```


[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes
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
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"apache\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"apache_status_url\": \"http://%%host%%/server-status?auto\"}]"
    }
  }]
}
```

##### Log collection


Collecting logs is disabled by default in the Datadog Agent. To enable it, see [ECS Log Collection][2].

Then, set [Log Integrations][3] as Docker labels:

```json
{
  "containerDefinitions": [{
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"apache\",\"service\":\"<YOUR_APP_NAME>\"}]"
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

[Run the Agent's status subcommand][4] and look for `apache` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "apache" >}}


### Events

The Apache check does not include any events.

### Service Checks
{{< get-service-checks-from-git "apache" >}}


## Troubleshooting

### Apache status URL

If you are having issues with your Apache integration, it is mostly like due to the Agent not being able to access your Apache status URL. Try running curl for the `apache_status_url` listed in [your `apache.d/conf.yaml` file][5] (include your login credentials if applicable).

- [Apache SSL certificate issues][6]

## Further Reading

Additional helpful documentation, links, and articles:

- [Deploying and configuring Datadog with CloudFormation][7]
- [Monitoring Apache web server performance][8]
- [How to collect Apache performance metrics][9]
- [How to monitor Apache web server with Datadog][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[6]: https://docs.datadoghq.com/integrations/faq/apache-ssl-certificate-issues/
[7]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[8]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[9]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[10]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog
