---
title: SDK Configurations
description: Use the SDK configurations view to validate setup, and troubleshoot instrumentation issues.
---

## Overview

The SDK Configurations view shows the active configurations of SDKs per service. Configurations are automatically reported from the SDKs. Use the view to:

- Troubleshoot instrumentation issues, including where configurations are inconsistent across instances of a service.
- Validate that a configuration change was deployed correctly across intended instances.
- Identify the source of a configuration value to help fix misconfigurations.
- Discover available configuration options and how they are set.

## Access SDK configurations

To view SDK configurations for a service:

1. Navigate to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][5].
1. Open the {{< ui >}}Service Page{{< /ui >}} for your service.
1. Go to {{< ui >}}Service Config{{< /ui >}} > {{< ui >}}SDK & Agent Configurations{{< /ui >}} tab.

The {{< ui >}}SDK Configurations{{< /ui >}} section displays configurations for active instances of the service.

## Edit configurations at runtime

Certain SDK configurations can be edited directly from the {{< ui >}}SDK & Agent Configurations{{< /ui >}} tab, without restarting your service or deploying a code change. The following configurations are editable:

- **Log Injection**: Enable or disable automatic trace-correlation injection into logs.
- **Data Streams**: Enable or disable Data Streams monitoring.
- **HTTP Headers as Tags**: Set which HTTP header values are captured as span tags.
- **Custom Span Tags**: Manage key/value tags added to every span.

To edit a configuration:

1. In the {{< ui >}}SDK Configurations{{< /ui >}} section, select an environment from the environment dropdown. The {{< ui >}}Edit{{< /ui >}} buttons are disabled until an environment is selected.
1. Optionally, enable the {{< ui >}}Editable configs only{{< /ui >}} filter to show only editable rows.
1. Click {{< ui >}}Edit{{< /ui >}} on the row for the configuration you want to change.
1. In the modal, update the value using the toggle (boolean configurations), the text field (tag-string configurations), or the key/value tag editor (HTTP header tags and custom span tags).
1. Review the change and click {{< ui >}}Apply{{< /ui >}} to confirm.

After you apply a change, a progress banner appears in the tab showing how many service instances have received the update (`Updating X of Y instances…`). When the rollout is complete, the banner shows a success state. A per-row badge indicates configurations that are currently rolling out. You can also hover over a row's value cell to see the old and new values side by side.

If the write itself fails (for example, because of a network error or a permissions issue), an error notification appears and the progress banner is not shown.

**Note**: Editing requires Remote Configuration to be enabled. See [Configuration at Runtime][1] for prerequisites. Editing also requires the `APM_REMOTE_CONFIGURATION_WRITE` permission.

## Configuration sources

The configuration source shows where a given value is configured:

| Source | Description |
|--------|-------------|
| {{< ui >}}Remote Configuration at Runtime{{< /ui >}} | Set through the Datadog UI using [Configuration at Runtime][1] |
| {{< ui >}}Code{{< /ui >}} | Set in application code |
| {{< ui >}}Remote Fleet Automation{{< /ui >}} | Applied remotely at the host level through [Fleet Automation][2] |
| {{< ui >}}Local environment variable{{< /ui >}} | Set through an environment variable (or system property) in the runtime environment |
| {{< ui >}}Local file{{< /ui >}} | Set in a local configuration file |
| {{< ui >}}Default{{< /ui >}} | Default value provided by the SDK |

## Missing configuration data

Telemetry data is not available in the following situations:

- No service instances have been active in the last 15 minutes.
- Instrumentation telemetry has been disabled in configuration.
- The instrumentation telemetry intake endpoint is not accessible (see [Network Destinations][3]).
- The service name is manually set on spans (a [Service Override][4]).

[1]: /tracing/trace_collection/runtime_config
[2]: /agent/fleet_automation/
[3]: /agent/configuration/network/#destinations
[4]: /tracing/guide/base_service/#service-overrides
[5]: https://app.datadoghq.com/software
