---
"app_id": "windows-service"
"app_uuid": "1d895e93-d6f1-49f9-82bc-a03df7ff215c"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "112"
    "source_type_name": "Windows Service"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/windows_service/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "windows_service"
"integration_id": "windows-service"
"integration_title": "Windows Services"
"integration_version": "4.9.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "windows_service"
"public_title": "Windows Services"
"short_description": "Monitor the state of your Windows services."
"supported_os":
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Windows"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": "Monitor the state of your Windows services."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Windows Services"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors the state of any Windows Service and submits a service check to Datadog.

## Setup

### Installation

The Windows Service check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your Windows hosts.

### Configuration

The configuration is located in the `windows_service.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample windows_service.d/conf.yaml][3] for all available configuration options. When you are done editing the configuration file, [restart the Agent][4] to load the new configuration.

The check can monitor all services on the system or selectively monitor a few services by name. Beginning with Agent version 7.41, the check can select which services to monitor based on their startup type.

This example configuration monitors only the `Dnscache` and `wmiApSrv` services:
```yaml
instances:
  - services:
    - dnscache
    - wmiapsrv
```

This example uses the `ALL` keyword to monitor all services on the host. If the `ALL` keyword is used, the other patterns in the instance are ignored.
```yaml
instances:
  - services:
    - ALL
```

The check uses case-insensitive [Python regular expressions][5] when matching service names. If a service name includes special characters, you must escape the special characters with a `\`. For example, `MSSQL$CRMAWS` becomes  `MSSQL\$CRMAWS` and `Web Server (prod)` becomes `Web Server \(prod\)`. The service name pattern matches all service names that start with the pattern. For an exact match, use the regular expression `^service$`.

Provide service names as they appear in the service name field, **NOT** the display name field. For example, configure the service name `datadogagent` **NOT** the display name `Datadog Agent`.

<p align="center">
<img alt="Datadog Agent service properties" src="https://raw.githubusercontent.com/DataDog/integrations-core/master/windows_service/images/service-properties.png"/>
</p>

Beginning with Agent version 7.41, the check can select which services to monitor based on their startup type.
For example, to monitor only the services that have an `automatic` or `automatic_delayed_start` startup type.
```yaml
instances:
  - services:
    - startup_type: automatic
    - startup_type: automatic_delayed_start
```

The possible values for `startup_type` are:
- `disabled`
- `manual`
- `automatic`
- `automatic_delayed_start`

Beginning with Agent version 7.50, the check can select which services to monitor based on whether they have a [Service Trigger assigned][6].
Below are some examples showing possible configurations.
```yaml
# Matches all services that do not have a trigger
services:
  - trigger_start: false

# Matches all services with an automatic startup type and excludes services with triggers
services:
  - startup_type: automatic
    trigger_start: false

# Only matches EventLog service when its startup type is automatic and has triggers
services:
  - name: EventLog
    startup_type: automatic
    trigger_start: true
```

#### Tags

The check automatically tags the Windows service name to each service check in the `windows_service:<SERVICE>` tag. The `<SERVICE>` name in the tag uses lowercase and special characters are replaced with underscores. See [Getting Started with Tags][7] for more information.

**NOTE:** The check also automatically tags the Windows service name to each service check in the `service:<SERVICE>` tag. **This behavior is deprecated**. In a future version of the Agent, the check will stop automatically assigning this tag. To stop the check from automatically assigning this tag and to disable the associated deprecation warning, set the `disable_legacy_service_tag` option. See [Assigning Tags][8] for information on how to assign the `service` tag to a service.

Beginning with Agent version 7.40, the check can add a `windows_service_startup_type:<STARTUP_TYPE>` tag to each service check to indicate the startup type of the service. Set the `windows_service_startup_type_tag` option to include this tag with each service check.

Beginning with Agent version 7.55, the check can add a `display_name:<DISPLAY_NAME>` tag to each service check to indicate the display name of the service. Set the `collect_display_name_as_tag` option to `true` to include this tag with each service check.

### Validation

[Run the Agent's status subcommand][9] and look for `windows_service` under the **Checks** section.

## Data Collected

### Metrics

The Windows Service check does not include any metrics.

### Events

The Windows Service check does not include any events.

### Service Checks
{{< get-service-checks-from-git "windows_service" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].

### Service permissions
If a service is present and matches the configuration, but the Datadog Agent does not report a service check for the service, the Datadog Agent might have insufficient permissions. For example, by default the Datadog Agent does not have access to the NTDS Active Directory Domain Services service. To verify this, run the check from an **elevated (run as Admin)** PowerShell shell.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check windows_service
```
If the service is present in the output, permissions are the issue. To give the Datadog Agent permission [grant `Read` access on the service][12] to the [Datadog Agent User][13]. We recommend [granting `Read` access with Group Policy][14] to ensure the permissions persist through Windows Updates.

## Further Reading

- [Monitoring Windows Server 2012][15]
- [How to collect Windows Server 2012 metrics][16]
- [Monitoring Windows Server 2012 with Datadog][17]

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/windows_service/datadog_checks/windows_service/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.python.org/3/howto/regex.html#regex-howto
[6]: https://learn.microsoft.com/en-us/windows/win32/services/service-trigger-events
[7]: https://docs.datadoghq.com/getting_started/tagging/
[8]: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/windows_service/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/
[12]: https://learn.microsoft.com/en-us/troubleshoot/windows-server/windows-security/grant-users-rights-manage-services
[13]: https://docs.datadoghq.com/agent/guide/windows-agent-ddagent-user/
[14]: https://learn.microsoft.com/en-US/troubleshoot/windows-server/group-policy/configure-group-policies-set-security
[15]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[16]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[17]: https://www.datadoghq.com/blog/windows-server-monitoring

