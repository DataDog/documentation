---
"app_id": "flume"
"app_uuid": "9e349061-5665-482d-9a5a-f3a07999bfae"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": flume.channel.capacity
      "metadata_path": metadata.csv
      "prefix": flume.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10133"
    "source_type_name": flume
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": kealan.maas@datadoghq.com
  "support_email": kealan.maas@datadoghq.com
"categories": []
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/flume/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "flume"
"integration_id": "flume"
"integration_title": "flume"
"integration_version": "0.0.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "flume"
"public_title": "flume"
"short_description": "Track Sink, Channel and Source of Apache Flume Agent"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": Track Sink, Channel and Source of Apache Flume Agent
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": flume
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Apache Flume][1].

## Setup

The Flume check is not included in the [Datadog Agent][2] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Flume check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### Configuration

1. Configure the Flume agent to enable JMX by adding the following JVM arguments to your [flume-env.sh][5]: 

```
export JAVA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"

```

2. Edit the `flume.d/conf.yaml` file, in the `conf.d/` folder at the root of your
   Agent's configuration directory to start collecting Flume performance data.
   See the [sample `flume.d/conf.yaml`][6] file for all available configuration options.

   This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in the status output.
   You can specify the metrics you are interested in by editing the configuration below.
   For detailed instructions on customizing the metrics to collect, see the [JMX Checks documentation][7].
   If you need to monitor more metrics, contact [Datadog support][8].

3. [Restart the Agent][9]

### Validation

[Run the Agent's `status` subcommand][10] and look for `flume` under the Checks section.

### Component metrics

The metrics retrieved by this check depend on the source, channel, and sink used by your Flume agent. For a full list of metrics exposed by each component, review [Available Component Metrics][9] from the Apache Flume documentation. For a list of the metrics that you can see in Datadog, see the [Metrics](#metrics) section on this page.

## Data Collected

### Metrics
{{< get-metrics-from-git "flume" >}}


### Events

Flume does not include any events.

### Service Checks
{{< get-service-checks-from-git "flume" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].


[1]: https://flume.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[6]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[7]: https://docs.datadoghq.com/integrations/java/
[8]: https://docs.datadoghq.com/help/
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv
[12]: https://github.com/DataDog/integrations-extras/blob/master/flume/assets/service_checks.json

