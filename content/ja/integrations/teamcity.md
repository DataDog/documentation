---
"app_id": "teamcity"
"app_uuid": "8dd65d36-9cb4-4295-bb0c-68d67c0cdd4b"
"assets":
  "dashboards":
    "TeamCity Overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check":
      - "teamcity.builds"
      - "teamcity.build_duration"
      "metadata_path": "metadata.csv"
      "prefix": "teamcity."
    "process_signatures":
    - "teamcity-server.sh"
    - "teamcity-server"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "109"
    "source_type_name": "Teamcity"
  "monitors":
    "Build Status": "assets/monitors/build_status.json"
  "saved_views":
    "teamcity_processes": "assets/saved_views/teamcity_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
- "log collection"
- "notifications"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/teamcity/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "teamcity"
"integration_id": "teamcity"
"integration_title": "TeamCity"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "teamcity"
"public_title": "TeamCity"
"short_description": "Track builds and understand the performance impact of every deploy."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Log Collection"
  - "Category::Notifications"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track builds and understand the performance impact of every deploy."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "TeamCity"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This integration connects to your TeamCity server to submit metrics, service checks, and events, allowing you to monitor the health of your TeamCity projects' build configurations, build runs, server resources, and more.

## Setup

### Installation

The TeamCity check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your TeamCity servers.

### Configuration

#### Prepare TeamCity

You can enable [Guest login](#guest-login), or identify [user credentials](#user-credentials) for basic HTTP authentication.

##### Guest login

1. [Enable guest login][2].

2. Enable `Per-project permissions` to allow assigning project-based permissions to the Guest user. See [Changing Authorization Mode][3].
![Enable Guest Login][4]
3. Use an existing or create a new Read-only role and add the `View Usage Statistics` permission to the role. See [Managing Roles and Permissions][5].
![Create Read-only Role][6]

3. _[Optional]_ To enable the check to automatically detect build configuration type during event collection, add the `View Build Configuration Settings` permission to the Read-only role.
![Assign View Build Config Settings Permission][7]

4. Assign the Read-only role to the Guest user. See [Assigning Roles to Users][8].
![Guest user settings][9]
![Assign Role][10]

##### User credentials

For basic HTTP authentication
- Specify an identified `username` and `password` in the `teamcity.d/conf.yaml` file in the `conf.d/` folder of your [Agent's configuration directory][11].
- If you encounter an `Access denied. Enable guest authentication or check user permissions.` error, ensure the user has the correct permissions:
  - Per-project and View Usage Statistics permissions enabled.
  - If collecting Agent Workload Statistics, assign the View Agent Details and View Agent Usage Statistics permissions as well.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

Edit the `teamcity.d/conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample teamcity.d/conf.yaml][2] for all available configuration options:

The TeamCity check offers two methods of data collection. To optimally monitor your TeamCity environment, configure two separate instances to collect metrics from each method. 

1. OpenMetrics method (requires Python version 3):

   Enable `use_openmetrics: true` to collect metrics from the TeamCity `/metrics` Prometheus endpoint.

   ```yaml
   init_config: 

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - mapping - optional
       ## Mapping of TeamCity projects and build configurations to
       ## collect events and metrics from the TeamCity REST API.
       #
       projects:
         <PROJECT_A>:
           include:    
           - <BUILD_CONFIG_A>
           - <BUILD_CONFIG_B>
           exclude:
           - <BUILD_CONFIG_C>
         <PROJECT_B>:
           include:
           - <BUILD_CONFIG_D>
         <PROJECT_C>: {}
   ```

  To collect [OpenMetrics-compliant][3] histogram and summary metrics (available starting in TeamCity Server 2022.10+), add the internal property, `teamcity.metrics.followOpenMetricsSpec=true`. See, [TeamCity Internal Properties][4].

2. TeamCity Server REST API method (requires Python version 3):

   Configure a separate instance in the `teamcity.d/conf.yaml` file to collect additional build-specific metrics, service checks, and build status events from the TeamCity server's REST API. Specify your projects and build configurations using the `projects` option.

   ```yaml
   init_config:

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - mapping - optional
       ## Mapping of TeamCity projects and build configurations to
       ## collect events and metrics from the TeamCity REST API.
       #
       projects:
         <PROJECT_A>:
           include:    
           - <BUILD_CONFIG_A>
           - <BUILD_CONFIG_B>
           exclude:
           - <BUILD_CONFIG_C>
         <PROJECT_B>:
           include:
           - <BUILD_CONFIG_D>
         <PROJECT_C>: {}
    ```

Customize each project's build configuration monitoring using the optional `include` and `exclude` filters to specify build configuration IDs to include or exclude from monitoring, respectively. Regular expression patterns are supported in the `include` and `exclude` keys to specify build configuration ID matching patterns. If both `include` and `exclude` filters are omitted, all build configurations are monitored for the specified project. 

For Python version 2, configure one build configuration ID per instance using the `build_configuration` option:

```yaml
init_config:

instances:
  - server: http://teamcity.<ACCOUNT_NAME>.com

    ## @param projects - mapping - optional
    ## Mapping of TeamCity projects and build configurations to
    ## collect events and metrics from the TeamCity REST API.
    #
    build_configuration: <BUILD_CONFIGURATION_ID>
```

[Restart the Agent][5] to start collecting and sending TeamCity events to Datadog.

##### Log collection

1. Configure TeamCity [logging settings][6].

2. By default, Datadog's integration pipeline supports the following kind of log format:

   ```text
   [2020-09-10 21:21:37,486]   INFO -  jetbrains.buildServer.STARTUP - Current stage: System is ready
   ```

   Clone and edit the [integration pipeline][7] if you defined different conversion [patterns][8].

3. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

4. Uncomment the following configuration block in your `teamcity.d/conf.yaml` file. Change the `path` parameter value based on your environment. See the [sample teamcity.d/conf.yaml][2] for all available configuration options.

   ```yaml
   logs:
     - type: file
       path: /opt/teamcity/logs/teamcity-server.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-activities.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-vcs.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-cleanup.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-notifications.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-ws.log
       source: teamcity
   ```

5. [Restart the Agent][5].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[3]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md
[4]: https://www.jetbrains.com/help/teamcity/server-startup-properties.html#TeamCity+Internal+Properties
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://www.jetbrains.com/help/teamcity/teamcity-server-logs.html
[7]: https://docs.datadoghq.com/logs/log_configuration/pipelines/#integration-pipelines
[8]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `teamcity`                                                                                        |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                     |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "use_openmetrics": "true"}`                                               |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection][2].

| Parameter      | Value                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "teamcity"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][12] and look for `teamcity` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "teamcity" >}}


### Events

TeamCity events representing successful and failed builds are forwarded to Datadog.

### Service Checks
{{< get-service-checks-from-git "teamcity" >}}


## Troubleshooting

Need help? Contact [Datadog support][13].

## Further Reading

- [Track performance impact of code changes with TeamCity and Datadog][14]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://www.jetbrains.com/help/teamcity/enabling-guest-login.html
[3]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html#Changing+Authorization+Mode
[4]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/authentication.jpg
[5]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html
[6]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/create_role.jpg
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/build_config_permissions.jpg
[8]: https://www.jetbrains.com/help/teamcity/creating-and-managing-users.html#Assigning+Roles+to+Users
[9]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/guest_user_settings.jpg
[10]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/assign_role.jpg
[11]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[12]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[13]: https://docs.datadoghq.com/help/
[14]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog
