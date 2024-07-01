---
"app_id": "openstack-controller"
"app_uuid": "f5c2cc69-1efc-40b2-8dcd-61e1215b237d"
"assets":
  "dashboards":
    "OpenStack Controller Overview": assets/dashboards/openstack-controller.json
    "OpenStack Controller Overview [Default Microversion]": assets/dashboards/openstack_controller_overview_[default_microversion].json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": openstack.controller
      "metadata_path": metadata.csv
      "prefix": openstack.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10226"
    "source_type_name": Openstack_controller
  "logs":
    "source": openstack
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- cloud
- log collection
- provisioning
- orchestration
- configuration & deployment
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/openstack_controller/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "openstack_controller"
"integration_id": "openstack-controller"
"integration_title": "OpenStack Controller"
"integration_version": "6.8.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "openstack_controller"
"public_title": "OpenStack Controller"
"short_description": "Track hypervisor and VM-level resource usage, plus Neutron metrics."
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
  - "Category::Cloud"
  - "Category::Log Collection"
  - "Category::Provisioning"
  - "Category::Orchestration"
  - "Category::Configuration & Deployment"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Track hypervisor and VM-level resource usage, plus Neutron metrics.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": OpenStack Controller
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

**Note**: This integration only applies to OpenStack v13+. If you are looking to collect metrics from OpenStack v12 and below, use the [OpenStack integration][1].

This check monitors [OpenStack][2] from the controller node.

## Setup

### Installation

The OpenStack Controller check is included in the [Datadog Agent][3] package, so you do not need to install anything else on your server.

### Configuration

The OpenStack Controller integration is designed to collect information from all compute nodes and the servers running it. The integration should be run from a single Agent to monitor your OpenStack environment, and can be deployed on your controller node or an adjacent server that has access to the Keystone, Nova, Neutron, Cinder, Ironic, and Octavia endpoints.

#### Prepare OpenStack

Create a `datadog` user that is used in your `openstack_controller.d/conf.yaml` file. This user requires admin read-only permissions across your environment so that it can be run from a single node and read high level system information about all nodes and servers.

#### Agent configuration

1. Edit the `openstack_controller.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your OpenStack Controller performance data. See the [sample openstack_controller.d/conf.yaml][4] for all available configuration options:

   ```yaml
   init_config:

   instances:
     - keystone_server_url: "<AUTH_URL>"
       password: "<PASSWORD>"
       username: "<USER_NAME>"
       domain_id: "<DOMAIN_ID>"
   ```

2. [Restart the Agent][5]

**Note**: If you are upgrading the integration to v6.0.0 or later from v5.0.0 or older, you need to enable the `use_legacy_check_version` flag to use newer features. You may also need to make changes to your configuration to maintain compatibility. See the [sample openstack controller.d/conf.yaml][4] for details.  

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, you can enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `openstack_controller.d/conf.yaml` file to start collecting your Openstack logs:

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    Change the `path` parameter value and configure them for your environment. See the [sample openstack_controller.d/conf.yaml][4] for all available configuration options.


### Validation

[Run the Agent's `status` subcommand][6] and look for `openstack_controller` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "openstack_controller" >}}


### Events

OpenStack Controller does not include any events.

### Service Checks
{{< get-service-checks-from-git "openstack_controller" >}}


## Troubleshooting

Need help? Contact [Datadog support][9].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor your OpenStack components with Datadog][10]


[1]: https://docs.datadoghq.com/integrations/openstack/
[2]: https://www.openstack.org
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/
[10]: https://www.datadoghq.com/blog/openstack-controller-integration/

