---
"app_id": "openstack"
"app_uuid": "38f1f51e-9f6a-49fc-84d5-358bde9e3782"
"assets":
  "dashboards":
    "openstack": "assets/dashboards/openstack_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "openstack.nova.hypervisor_load.1"
      "metadata_path": "metadata.csv"
      "prefix": "openstack."
    "process_signatures":
    - "stack.sh"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "125"
    "source_type_name": "OpenStack"
  "saved_views":
    "openstack_processes": "assets/saved_views/openstack_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "log collection"
- "network"
- "provisioning"
- "configuration & deployment"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/openstack/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "openstack"
"integration_id": "openstack"
"integration_title": "OpenStack (legacy)"
"integration_version": "2.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "openstack"
"public_title": "OpenStack (legacy)"
"short_description": "Track hypervisor and VM-level resource usage, plus Neutron metrics."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Log Collection"
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Provisioning"
  - "Category::Configuration & Deployment"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": "Track hypervisor and VM-level resource usage, plus Neutron metrics."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "OpenStack (legacy)"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![OpenStack default dashboard][1]

## Overview

**Note**: This integration only applies to OpenStack v12 and below. If you are looking to collect metrics from OpenStack v13+, use the [OpenStack Controller integration][2].

Get metrics from OpenStack service in real time to:

- Visualize and monitor OpenStack states.
- Be notified about OpenStack failovers and events.

## Setup

### Installation

To capture your OpenStack metrics, [install the Agent][3] on your hosts running hypervisors.

### Configuration

#### Prepare OpenStack

Configure a Datadog role and user with your identity server:

```console
openstack role create datadog_monitoring
openstack user create datadog \
    --password my_password \
    --project my_project_name
openstack role add datadog_monitoring \
    --project my_project_name \
    --user datadog
```

Then, update your `policy.json` files to grant the needed permissions. `role:datadog_monitoring` requires access to the following operations:

**Nova**

```json
{
  "compute_extension": "aggregates",
  "compute_extension": "hypervisors",
  "compute_extension": "server_diagnostics",
  "compute_extension": "v3:os-hypervisors",
  "compute_extension": "v3:os-server-diagnostics",
  "compute_extension": "availability_zone:detail",
  "compute_extension": "v3:availability_zone:detail",
  "compute_extension": "used_limits_for_admin",
  "os_compute_api:os-aggregates:index": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-aggregates:show": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-hypervisors": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-server-diagnostics": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-used-limits": "rule:admin_api or role:datadog_monitoring"
}
```

**Neutron**

```json
{
  "get_network": "rule:admin_or_owner or rule:shared or rule:external or rule:context_is_advsvc or role:datadog_monitoring"
}
```

**Keystone**

```json
{
  "identity:get_project": "rule:admin_required or project_id:%(target.project.id)s or role:datadog_monitoring",
  "identity:list_projects": "rule:admin_required or role:datadog_monitoring"
}
```

You may need to restart your Keystone, Neutron, and Nova API services to ensure that the policy changes take.

**Note**: Installing the OpenStack integration could increase the number of VMs that Datadog monitors. For more information on how this may affect your billing, see the Billing FAQ.

#### Agent configuration

1. Configure the Datadog Agent to connect to your Keystone server, and specify individual projects to monitor. Edit the `openstack.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] with the configuration below. See the [sample openstack.d/conf.yaml][5] for all available configuration options:

   ```yaml
   init_config:
     ## @param keystone_server_url - string - required
     ## Where your identity server lives.
     ## Note that the server must support Identity API v3
     #
     keystone_server_url: "https://<KEYSTONE_SERVER_ENDPOINT>:<PORT>/"

   instances:
     ## @param name - string - required
     ## Unique identifier for this instance.
     #
     - name: "<INSTANCE_NAME>"

       ## @param user - object - required
       ## User credentials
       ## Password authentication is the only auth method supported.
       ## `user` object expects the parameter `username`, `password`,
       ## and `user.domain.id`.
       ##
       ## `user` should resolve to a structure like:
       ##
       ##  {'password': '<PASSWORD>', 'name': '<USERNAME>', 'domain': {'id': '<DOMAINE_ID>'}}
       #
       user:
         password: "<PASSWORD>"
         name: datadog
         domain:
           id: "<DOMAINE_ID>"
   ```

2. [Restart the Agent][6].

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, you can enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `openstack.d/conf.yaml` file to start collecting your Openstack logs:

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    Change the `path` parameter value and configure them for your environment. See the [sample openstack.d/conf.yaml][5] for all available configuration options.


### Validation

Run the [Agent's status subcommand][7] and look for `openstack` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "openstack" >}}


### Events

The OpenStack check does not include any events.

### Service Checks
{{< get-service-checks-from-git "openstack" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitoring OpenStack Nova][11]
- [Install OpenStack in two commands for dev and test][12]
- [OpenStack: host aggregates, flavors, and availability zones][13]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/openstack/images/openstack_dashboard.png
[2]: https://docs.datadoghq.com/integrations/openstack_controller
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/openstack/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/openstack/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/
[11]: https://www.datadoghq.com/blog/openstack-monitoring-nova
[12]: https://www.datadoghq.com/blog/install-openstack-in-two-commands
[13]: https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones

