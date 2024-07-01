---
"app_id": "vespa"
"app_uuid": "9e31df30-189f-468f-88c7-9c73caf4cdca"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": vespa.mem.heap.free.average
      "metadata_path": metadata.csv
      "prefix": vespa.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10212"
    "source_type_name": Vespa
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Vespa
  "sales_email": dd@vespa.ai
  "support_email": dd@vespa.ai
"categories":
- data stores
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "vespa"
"integration_id": "vespa"
"integration_title": "Vespa"
"integration_version": "1.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "vespa"
"public_title": "Vespa"
"short_description": "Health and performance monitoring for the big data serving engine Vespa"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::Data Stores"
  "configuration": "README.md#Setup"
  "description": Health and performance monitoring for the big data serving engine Vespa
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Vespa
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Gather metrics from your [Vespa][1] system in real time to:

- Visualize and monitor Vespa state and performance
- Alert on health and availability

## Setup

The Vespa check is not included in the [Datadog Agent][2] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Vespa check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-vespa==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### Configuration

To configure the Vespa check:

1. Create a `vespa.d/` folder in the `conf.d/` folder at the root of your [Agent's configuration directory][5].
2. Create a `conf.yaml` file in the `vespa.d/` folder previously created.
3. See the [sample vespa.d/conf.yaml][6] file and copy its content in the `conf.yaml` file.
4. Edit the `conf.yaml` file to configure the `consumer`, which decides the set of metrics forwarded by the check:
   - `consumer`: The consumer to collect metrics for, either `default` or a [custom consumer][7]
     from your Vespa application's services.xml.
5. [Restart the Agent][8].

### Validation

Run the [Agent's status subcommand][9] and look for `vespa` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "vespa" >}}


### Events

The Vespa integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "vespa" >}}


## Troubleshooting

Need help? Contact [Datadog support][12].


[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[7]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/vespa/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/vespa/assets/service_checks.json
[12]: https://docs.datadoghq.com/help/

