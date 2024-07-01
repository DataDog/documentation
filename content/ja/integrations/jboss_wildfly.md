---
"app_id": "jboss-wildfly"
"app_uuid": "4ad5a2e9-106b-43a2-820a-f146c7effffe"
"assets":
  "dashboards":
    "JBoss WildFly": assets/dashboards/jboss_wildfly.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": jboss.jdbc_connections.count
      "metadata_path": metadata.csv
      "prefix": jboss.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10060"
    "source_type_name": JBoss/WildFly
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "jboss_wildfly"
"integration_id": "jboss-wildfly"
"integration_title": "JBoss/WildFly"
"integration_version": "2.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "jboss_wildfly"
"public_title": "JBoss/WildFly"
"short_description": "Gathers various JMX metrics from JBoss and WildFly Applications"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Gathers various JMX metrics from JBoss and WildFly Applications
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": JBoss/WildFly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [JBoss][1] and [WildFly][2] applications.

## Setup

### Installation

The JBoss/WildFly check is included in the [Datadog Agent][3] package so you don't need to install anything else on your JBoss/WildFly host.

### Configuration

This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in [the status page][4]. You can specify the metrics you are interested in by editing the configuration below. To learn how to customize the collected metrics, see the [JMX Checks documentation][5] for more detailed instructions. If you need to monitor more metrics, contact [Datadog support][6].

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `jboss_wildfly.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your JBoss or WildFly application server's performance data. See the [sample jboss_wildfly.d/conf.yaml][1] for all available configuration options.

    Depending on your server setup (particularly when using the `remote+http` JMX scheme), you may need to specify a custom JAR to connect to the server. Place the JAR on the same machine as your Agent, and add its path to the `custom_jar_paths` option in your `jboss_wildfly.d/conf.yaml` file.

    **Note**: The JMX url scheme is different according to your WildFly version:

   - For Wildfly 9 and older: `service:jmx:http-remoting-jmx://<HOST>:<PORT> `
   - For Wildfly 10+: `service:jmx:remote+http://<HOST>:<PORT>`

    See the [WildFly JMX subsystem configuration page][2] for more information.

2. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Next, edit `jboss_wildfly.d/conf.yaml` by uncommenting the `logs` lines at the bottom. Update the logs `path` with the correct path to your JBoss log files.

   ```yaml
   logs:
     - type: file
       path: /opt/jboss/wildfly/standalone/log/*.log
       source: jboss_wildfly
       service: '<APPLICATION_NAME>'
   ```

3. [Restart the Agent][3].

[1]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[2]: https://docs.jboss.org/author/display/WFLY9/JMX%20subsystem%20configuration.html
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

##### Metric collection

For containerized environments, see the [Autodiscovery with JMX][1] guide.

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "jboss_wildfly", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][4] and look for `jboss_wildfly` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "jboss_wildfly" >}}


### Events

The JBoss/WildFly integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "jboss_wildfly" >}}


### Collecting metrics with JMXFetch

You can configure the Datadog Agent to collect Java application metrics through [JMXFetch][7]. To collect the default metrics configured for the JBoss/Wildfly Datadog integration, set the system property
`Ddd.jmxfetch.jboss_wildfly.enabled=true`. 

## Troubleshooting

Need help? Contact [Datadog support][6].



[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/integrations/java/
[6]: https://docs.datadoghq.com/help/
[7]: https://docs.datadoghq.com/integrations/java
