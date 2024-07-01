---
"app_id": "event-viewer"
"app_uuid": "8a0f4809-8470-4f7c-a7e8-350ba64123aa"
"assets":
  "dashboards":
    "windows_event_log_overview": "assets/dashboards/windows_event_log_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "47"
    "source_type_name": "Event Viewer"
  "logs":
    "source": "windows.events"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/win32_event_log/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "win32_event_log"
"integration_id": "event-viewer"
"integration_title": "Windows Event Log"
"integration_version": "3.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "win32_event_log"
"public_title": "Windows Event Log"
"short_description": "Send Windows events to your Datadog event stream."
"supported_os":
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Windows"
  - "Category::OS & System"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Send Windows events to your Datadog event stream."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Windows Event Log"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This integration watches for Windows Event Logs and forwards them to Datadog.

Enable this integration to:

- Track system and application events in Datadog.
- Correlate system and application events with the rest of your application.

For more information, see the [Windows Event Logging documentation][1].

## Setup

### Installation

The Windows Event Log check is included in the [Datadog Agent][2] package. There is no additional installation required. 

### Configuration

Windows Event Logs can be collected as one or both of the following methods.

- As [Datadog Events][3]
- As [Datadog Logs][4]

Both methods are configured in `win32_event_log.d/conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][5]. See the [sample win32_event_log.d/conf.yaml][6] for all available configuration options. For a quickstart option to send Security event logs, see [Send default Security logs](#send-default-security-logs).

This integration also comes with an out-of-the-box [Windows Event Log Overview][7] dashboard available in-app.

#### List Windows Event channels

First, identify the Windows Event Log channels you want to monitor. 

Depending on collection method, the channel name can be used for the following configuration parameters:

- Datadog Logs: `channel_path`
- Datadog Events: `path`
- Datadog Events (legacy): `log_file`

##### PowerShell

To see a list of channels, run the following command in PowerShell:

```powershell
Get-WinEvent -ListLog *
```

To see the most active channels, run the following command in PowerShell:

```powershell
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

This command displays channels in the format `LogMode MaximumSizeInBytes RecordCount LogName`. 

Example response:

```text
LogMode  MaximumSizeInBytes RecordCount LogName 
Circular          134217728      249896 Security
Circular            5242880        2932 <CHANNEL_2>
```

The value under the column `LogName` is the name of the channel. In the example above, the channel name is `Security`.

##### Windows Event Viewer

To find the channel name for an Event Log in the Windows Event Viewer, open the Event Log Properties window and refer to the `Full Name` field. In the following example, the channel name is `Microsoft-Windows-Windows Defender/Operational`.

![Windows Event Log][8]

{{< tabs >}}

{{% tab "Logs" %}}

#### Log collection

_Available for Agent versions 6.0 or later_

Log collection is disabled by default in the Datadog Agent. To collect Windows Event Logs as Datadog logs, [activate log collection][1] by setting `logs_enabled: true` in your `datadog.yaml` file.

To collect Windows Event Logs as Datadog logs, configure channels under the `logs:` section of your `win32_event_log.d/conf.yaml` configuration file. This example shows entries for the `Security` and `<CHANNEL_2>` channels:

```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: windows.events
    service: myservice
```

Set the corresponding `source` parameter to `windows.events` to benefit from the [integration automatic processing pipeline][2].

[1]: https://docs.datadoghq.com/agent/logs/#activate-log-collection
[2]: https://docs.datadoghq.com/logs/processing/pipelines/#integration-pipelines
{{% /tab %}}
{{% tab "Events" %}}

#### Event collection using the Event Log API (Recommended)

The Datadog Agent can be configured to collect Windows Event Logs as Datadog events using the Event Log API. Datadog recommends using the Event Log API because it has better performance than the legacy method below. Note, each method has its own configuration syntax for channels and for filters. For more information, see [Filtering Events](?tab=events#filtering-events). 

To collect Windows Event Logs as Datadog events, configure channels under the `instances:` section of your `win32_event_log.d/conf.yaml` configuration file. 

  </br> Set `legacy_mode: false` in each instance. If `legacy_mode: false` is set, the `path` is required to be set in the `\win32_event_log.d\conf.yaml` file. 

  </br> This example shows entries for the `Security` and `<CHANNEL_2>` channels:

  ```yaml
  init_config:
  instances:
    - # Event Log API 
      path: Security
      legacy_mode: false
      filters: {}

    - path: "<CHANNEL_2>" 
      legacy_mode: false
      filters: {}
  ```

Agent versions 7.49 and later support setting `legacy_mode` in the shared `init_config` section. This sets the default for all instances and no longer requires you to set `legacy_mode` individually for each instance. However, the option can still be set on a per-instance basis.

  ```yaml
  init_config:
      legacy_mode: false
  instances:
    - # Event Log API
      path: Security
      filters: {}

    - path: "<CHANNEL_2>"
      filters: {}
  ```

#### Event collection using Legacy Mode (Deprecated)

The legacy method uses WMI (Windows Management Instrumentation) and was deprecated in Agent version 7.20. 

To collect Windows Event Logs as Datadog events, configure channels under the `instances:` section of your `win32_event_log.d/conf.yaml` configuration file.

  </br> To use Legacy Mode, set `legacy_mode` to `true`. Then, set at least one of the following filters: `source_name`, `event_id`, `message_filters`, `log_file`, or `type`.

  </br> This example shows entries for the `Security` and `<CHANNEL_2>` channels:

  ```yaml
  init_config:
  instances:
    - # WMI (default)
      legacy_mode: true
      log_file:
        - Security

    - legacy_mode: true
      log_file:
        - "<CHANNEL_2>"
  ```

  For more information, see [Add event log files to the `Win32_NTLogEvent` WMI class][1].

[1]: https://docs.datadoghq.com/integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class/
{{% /tab %}}
{{< /tabs >}}

Edit the `<CHANNEL_2>` parameters with the Windows channel name you want to collect events from.

Finally, [restart the Agent][9].

**Note**: For the Security logs channel, add your Datadog Agent user to the `Event Log Readers` user group.

### Filtering events

Configure one or more filters for the event log. A filter allows you to choose what log events you want to get into Datadog.

{{< tabs >}}

{{% tab "Logs" %}}

You can use the `query`, as well as the `log_processing_rules` regex option, to filter event logs. Datadog recommends using the `query` option which is faster at high rates of Windows Event Log generation and requires less CPU and memory than the `log_processing_rules` filters. When using the `log_processing_rules` filters, the Agent is forced to process and format each event, even if it will be excluded by `log_processing_rules` regex. With the `query` option, these events are not reported to the Agent.

You can use the `query` option to filter events with an [XPATH or structured XML query][1]. The `query` option can reduce the number of events that are processed by `log_processing_rules` and improve performance. There is an expression limit on the syntax of XPath and XML queries. For additional filtering, use `log_processing_rules` filters.

Datadog recommends creating and testing the query in Event Viewer's filter editor until the events shown in Event Viewer match what you want the Agent to collect.

![Filter Current Log][2]

Then, copy and paste the query into the Agent configuration. 

```yaml
  # collect Critical, Warning, and Error events
  - type: windows_event
    channel_path: Application
    source: windows.events
    service: Windows       
    query: '*[System[(Level=1 or Level=2 or Level=3)]]'

  - type: windows_event
    channel_path: Application
    source: windows.events
    service: Windows       
    query: |
      <QueryList>
        <Query Id="0" Path="Application">
          <Select Path="Application">*[System[(Level=1 or Level=2 or Level=3)]]</Select>
        </Query>
      </QueryList>
```

![XML Query][3]

In addition to the `query` option, events can be further filtered with log processing rules.

Some example filters include the following:

```yaml
  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: include_at_match
      name: relevant_security_events
      pattern: '"EventID":(?:{"value":)?"(1102|4624|4625|4634|4648|4728|4732|4735|4737|4740|4755|4756)"'

  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: exclude_at_match
      name: relevant_security_events
      pattern: '"EventID":(?:{"value":)?"(1102|4624)"'

  - type: windows_event
    channel_path: System
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: include_at_match
      name: system_errors_and_warnings
      pattern: '"level":"((?i)warning|error)"'

  - type: windows_event
    channel_path: Application
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: include_at_match
      name: application_errors_and_warnings
      pattern: '"level":"((?i)warning|error)"'
```

Here is an example regex pattern to only collect Windows Events Logs from a certain EventID:

```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.event
    service: Windows
    log_processing_rules:
      - type: include_at_match
        name: include_x01
        pattern: '"EventID":(?:{"value":)?"(101|201|301)"'
```

**Note**: The pattern may vary based on the format of the logs. The [Agent `stream-logs` subcommand][4] can be used to view this format.

For more examples of filtering logs, see the [Advanced Log Collection documentation][5].

#### Legacy events
_Applies to Agent versions < 7.41_

Legacy Provider EventIDs have a `Qualifiers` attribute that changes the format of the log, as seen in the [Windows Event Schema][6]. These events have the following XML format, visible in Windows Event Viewer:
```xml
<EventID Qualifiers="16384">3</EventID>
```

The following regex must be used to match these EventIDs:
```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.event
    service: Windows
    log_processing_rules:
      - type: include_at_match
        name: include_legacy_x01
        pattern: '"EventID":(?:{"value":)?"(101|201|301)"'
```

Agent versions 7.41 or later normalize the EventID field. This removes the need for the substring, `(?:{"value":)?`, from legacy pattern as it is no longer applicable. A shorter regex pattern can be used from versions 7.41 or later as seen below:

```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.event
    service: Windows
    log_processing_rules:
      - type: include_at_match
        name: include_x01
        pattern: '"EventID":"(101|201|301)"'
```

[1]: https://learn.microsoft.com/en-us/windows/win32/wes/consuming-events
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/filter-event-viewer.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/xml-query-event-viewer.png
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/
[5]: https://docs.datadoghq.com/agent/logs/advanced_log_collection/?tab=configurationfile#filter-logs
[6]: https://learn.microsoft.com/en-us/windows/win32/wes/eventschema-systempropertiestype-complextype
{{% /tab %}}
{{% tab "Events" %}}

Use the Windows Event Viewer GUI to list all the event logs available for capture with this integration.

To determine the exact values, set your filters to use the following PowerShell command:

```text
Get-WmiObject -Class Win32_NTLogEvent
```

For example, to see the latest event logged in the `Security` log file, use the following:

```text
Get-WmiObject -Class Win32_NTLogEvent -Filter "LogFile='Security'" | select -First 1
```

The values listed in the output of the command can be set in `win32_event_log.d/conf.yaml` to capture the same kind of events.

<div class="alert alert-info">
The information given by the  <code>Get-EventLog</code> PowerShell command or the Windows Event ViewerGUI may slightly differ from <code>Get-WmiObject</code>.<br> Double check your filters' values with <code>Get-WmiObject</code> if the integration does not capture the events you set up.
</div>

#### Filtering events using the Event Log API (Recommended)

The configuration option using the Event Log API includes the following filters:

  - `path`: `Application`, `System`, `Setup`, `Security`
  - `type`: `Critical`, `Error`, `Warning`, `Information`, `Success Audit`, `Failure Audit`
  - `source`: Any available source name
  - `id`: event_id: Windows EventLog ID

  See the [sample win32_event_log.d/conf.yaml][1] for all available filter options. 

  This example filter uses Event Log API method.

  ```yaml
  instances:
    - legacy_mode: false
      path: System
      filters:
        source:
        - Microsoft-Windows-Ntfs
        - Service Control Manager
        type:
        - Error
        - Warning
        - Information
        - Success Audit
        - Failure Audit
        id:
        - 7036
  ```

You can use the [`query` option][2] to filter events with an [XPATH or structured XML query][3]. Datadog recommends creating the query in Event Viewer's filter editor until the events shown in Event Viewer match what you want the Datadog Agent to collect. The `filters` option is ignored when the `query` option is used.

  ```yaml
  init_config:
  instances:
    # collect Critical, Warning, and Error events
    - path: Application
      legacy_mode: false
      query: '*[System[(Level=1 or Level=2 or Level=3)]]'

    - path: Application
      legacy_mode: false
      query: |
        <QueryList>
          <Query Id="0" Path="Application">
            <Select Path="Application">*[System[(Level=1 or Level=2 or Level=3)]]</Select>
          </Query>
        </QueryList>
 ```

#### Filtering events using Legacy Mode (Deprecated)

The configuration option using the Legacy Mode includes the following filters:

  - `log_file`: `Application`, `System`, `Setup`, `Security`
  - `type`: `Critical`, `Error`, `Warning`, `Information`, `Audit Success`, `Audit Failure`
  - `source_name`: Any available source name
  - `event_id`: Windows EventLog ID

  This example filter uses the Legacy Mode method.

  ```yaml
  instances:
    # Legacy
    # The following captures errors and warnings from SQL Server which
    # puts all events under the MSSQLSERVER source and tag them with #sqlserver.
    - tags:
        - sqlserver
      type:
        - Warning
        - Error
      log_file:
        - Application
      source_name:
        - MSSQLSERVER

    # This instance captures all system errors and tags them with #system.
    - tags:
        - system
      type:
        - Error
      log_file:
        - System
  ```
The legacy method does not support the `query` option. Only the Event Log API method (setting `legacy_mode: false`) and the Logs Tailer supports the `query` option.

[1]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[2]: https://github.com/DataDog/integrations-core/blob/10296a69722b75098ed0b45ce55f0309a1800afd/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example#L74-L89
[3]: https://learn.microsoft.com/en-us/windows/win32/wes/consuming-events
{{% /tab %}}
{{< /tabs >}}

When you're done setting up filters, [restart the Agent][9] using the Agent Manager, or restart the service.

### Validation

{{< tabs >}}
{{% tab "Logs" %}}

Check the information page in the Datadog Agent Manager or run the [Agent's `status` subcommand][1] and look for `win32_event_log` under the Logs Agent section. 

It should display a section similar to the following:

```shell
Logs Agent
==========

  [...]

  win32_event_log
  ---------------
    - Type: windows_event
      ChannelPath: System
      Status: OK
```

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "Events" %}}

Check the information page in the Datadog Agent Manager or run the [Agent's `status` subcommand][1] and look for `win32_event_log` under the Checks section. 

It should display a section similar to the following:

```shell
Checks
======

  [...]

  win32_event_log
  ---------------
      - instance #0 [OK]
      - Collected 0 metrics, 2 events & 1 service check
```

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## Send Default Security logs

Starting with Agent 7.54, you can automatically send Security Events to Datadog as logs by using the `dd_security_events` flag. These logs can be used with [Datadog's Cloud SIEM][10] to automatically detect threats and suspicious activity in real-time. These default security events are compatible with Datadog's out-of-the-box Windows detection rules to create security signals when a user clears the Security logs, disables the Windows firewall, changes the Directory Services Restore Mode (DSRM) password, and more.

1. [Enable collecting logs][11] in your `datadog.yaml` file. It is disabled by default in the Datadog Agent.

   ```yaml
   logs_enabled: true
   ```

2. In the integration configuration file, (`win32_event_log.d/conf.yaml`) set the `dd_security_events` flag to `low` or `high` to start sending Security Events to Datadog.

   ```yaml
   init_config:
     legacy_mode: false
   instances:
     - dd_security_events: high
   ```

   - `low`: sends only the most important and critical Security events, including Audit log cleared (1102), Replay attack detected (4649), and System audit policy was changed (4719). For a full list of events collected on the `low` setting, [see here][12]. 
   - `high`: sends a higher volume of Security events, including Encrypted data recovery policy was changed (4714), Domain policy was changed (4739), and Security-disabled group was deleted (4764). For a full list of events collected on the `high` setting, [see here][13].

Teams can change which event IDs are associated with `low` or `high` settings by editing these profiles. 


3. [Restart the Agent][9].


## Data Collected

### Metrics

The Windows Event Log check does not include any metrics.

### Events

All Windows events are forwarded to Datadog.

### Service Checks

The Windows Event Log check does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][14] with an [Agent Flare][15].

### Log processing rules are not working

If you are using log processing rules to filter out logs, verify that the raw logs match the regular expression (regex) pattern you configured. In the configuration below, log levels must be either `warning` or `error`. Any other value is excluded.

```yaml
    - type: windows_event
      channel_path: System
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: system_errors_and_warnings
        pattern: '"level":"((?i)warning|error)"'
```

To troubleshoot your log processing rules:
1. Remove or comment out the `log_processing_rules` stanza.
2. Restart the Agent.
3. Send a test log that includes the values you're attempting to catch. If the log appears in Datadog, there is probably an issue with your regex. Compare your regex against the log file to make sure you're capturing the right phrases.

## Further Reading

Additional helpful documentation, links, and articles:

- [Advanced Log Collection][16]
- [Monitoring Windows Server 2012][17]
- [How to collect Windows Server 2012 metrics][18]
- [Monitoring Windows Server 2012 with Datadog][19]
- [Monitor Windows event logs with Datadog][20]


[1]: https://docs.microsoft.com/en-us/windows/win32/eventlog/event-logging
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: https://docs.datadoghq.com/service_management/events/
[4]: https://docs.datadoghq.com/logs/
[5]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[7]: https://app.datadoghq.com/integrations?integrationId=event-viewer
[8]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/windows-defender-operational-event-log-properties.png
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/security/cloud_siem/
[11]: https://docs.datadoghq.com/agent/logs/#activate-log-collection
[12]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/win32_event_log.d/profiles/dd_security_events_low.yaml.example
[13]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/win32_event_log.d/profiles/dd_security_events_high.yaml.example
[14]: https://docs.datadoghq.com/help/
[15]: https://docs.datadoghq.com/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[16]: https://docs.datadoghq.com/agent/logs/advanced_log_collection/?tab=configurationfile
[17]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[18]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[19]: https://www.datadoghq.com/blog/windows-server-monitoring
[20]: https://www.datadoghq.com/blog/monitor-windows-event-logs-with-datadog/
