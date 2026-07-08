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
