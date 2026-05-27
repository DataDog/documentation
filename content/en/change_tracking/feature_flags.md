---
title: Track Feature Flag Changes
description: Learn how to track, correlate, and remediate feature flag changes in Datadog to identify and resolve issues caused by flag updates.
further_reading:
  - link: "/change_tracking/"
    tag: "Documentation"
    text: "Change Tracking"
  - link: "/feature_flags/"
    tag: "Documentation"
    text: "Datadog Feature Flags"
  - link: "/integrations/launchdarkly/#feature-flag-tracking-integration/"
    tag: "Documentation"
    text: "LaunchDarkly"
---

## Overview

Feature flag tracking in Datadog helps you correlate flag changes with system performance issues, accelerating incident resolution. By tracking when flags are toggled, updated, or rolled out, you can identify whether a feature flag change caused a performance degradation or outage.

With feature flag tracking, you can:
- View flag changes directly in your dashboards, monitors, and service pages
- Automatically identify which services are affected by a flag change
- Roll back problematic flags directly from inside Datadog

{{< img src="/change_tracking/monitor.png" alt="The monitor graph shows the error spike correlated with the flag change." style="width:100%;" >}}

## Track feature flags

Datadog supports tracking [Datadog Feature Flags][8] automatically, [LaunchDarkly][1] flags using the LaunchDarkly integration, or flags from other providers using the [Events API][3].

### Datadog Feature Flags

Change tracking for [Datadog Feature Flags][8] is enabled automatically. No additional setup is required. When you update a flag's targeting, rollout, or status in an environment, Datadog emits a change tracking event that appears in your services' Change Tracking timelines.

Each event includes:

- The flag key and name
- The environment where the change occurred (and whether it is a production environment)
- The user who made the change
- The previous and new values, including targeting rules and variants
- A link back to the feature flag in Datadog

To associate a Datadog Feature Flag change with a service, [instrument your flag evaluation code][4] with the Datadog tracing library. Datadog uses the resulting APM traces to automatically detect which services evaluate the flag. See [Automatically detect affected services](#automatically-detect-affected-services) for details.

### LaunchDarkly flags

To track LaunchDarkly feature flags in your services' Change Tracking timeline:

1. Enable the [Datadog integration][1] in LaunchDarkly.
1. Go to {{< ui >}}Flags{{< /ui >}} > `<your-feature-flag-name>` in LaunchDarkly.
1. In {{< ui >}}Datadog tags{{< /ui >}}, add a tag with key `service` and value `<your-service-name>`, matching your Datadog service name exactly.
1. Click {{< ui >}}Save changes{{< /ui >}}.

For example, to link a flag to the `payments_api` service used in the examples below, you would set the tag value to `payments_api`. After you submit the event, you can navigate to the [Software Catalog][7], select the `payments_api` service, and see the `fallback_payments_test` feature flag event in the Change Tracking timeline.

### Custom feature flags

Send feature flag events from any provider using the [Events API][3]. Create a `change` category event and include a service tag to link the event to your service.

#### Recommended tags

When sending custom feature flag change events, include the following fields to enable accurate filtering and cross-product correlation within Datadog:

- `impacted_resources` (with type `service`): Add the relevant service name to the `impacted_resources` array to associate the feature flag change with the affected service.
- `env` tag: Specify the environment where the change occurred (for example, production, staging, or development).

If these tags cannot be added at event creation time, see the next section for guidance on automatic enrichment.

Example request:

```json
{
  "data": {
    "attributes": {
      "aggregation_key": "string",
      "attributes": {
        "author": {
          "name": "datadog@datadog.com",
          "type": "user"
        },
        "change_metadata": {
          "dd": {
            "team": "datadog_team",
            "user_email": "datadog@datadog.com",
            "user_id": "datadog_user_id",
            "user_name": "datadog_username"
          },
          "resource_link": "datadog.com/feature/fallback_payments_test"
        },
        "changed_resource": {
          "name": "fallback_payments_test",
          "type": "feature_flag"
        },
        "impacted_resources": [
          {
            "name": "payments_api",
            "type": "service"
          }
        ],
        "new_value": {
          "enabled": true,
          "percentage": "50%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        },
        "prev_value": {
          "enabled": true,
          "percentage": "10%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        }
      },
      "category": "change",
      "message": "payment_processed feature flag has been enabled",
      "tags": [
        "env:test"
      ],
      "timestamp": "string",
      "title": "payment_processed feature flag updated"
    },
    "type": "event"
  }
}
```

## Automatically detect affected services

In addition to tracking feature flag configuration changes through the LaunchDarkly integration or the Events API, Datadog can automatically detect which services evaluate a flag by using APM traces or metrics. This provides real-time visibility into flag usage across your system, especially when the same flag is evaluated by multiple services.

### Trace-based enrichment
Trace-based enrichment uses APM traces to automatically associate feature flag changes with the relevant Datadog services. The following section details how to implement it in your codebase.

#### Setup

To automatically detect services using a feature flag, instrument your feature flag evaluation code with the Datadog SDK. This allows Datadog to automatically detect all services that evaluate a specific flag, even if they weren't originally tagged.

1. [Instrument your feature flag evaluation code][4] using the Datadog SDK.
1. Create a custom span with the operation name `experiments.IsEnabled` to track feature flag evaluations.
3. Tag the span with `experiment_id:<flag-id>`, where `<flag-id>` matches the feature flag ID.

For example:

```python
# Trace feature flag evaluation to enable auto-detection
with tracer.trace("experiments.IsEnabled") as span:
    span.set_tag("experiment_id", "fallback_payments_test") # adds the flag name as a span tag
    # Your existing feature flag evaluation code
    flag_value = evaluate_flag("fallback_payments_test")
    span.set_tag("experiment_value", flag_value) # adds the evaluated flag value as a span tag
```

### Metrics-based enrichment

Metric-based enrichment uses Datadog metrics to enrich your feature flag changes with service context. The following section explains how to implement it in your codebase.

#### Setup

Send the `dd.dynamic_config.is_experiment_enabled` metric with your experiment status.

```python
from datadog import initialize, statsd

initialize(statsd_host='localhost', statsd_port=8125)

# Any metric type is supported
statsd.gauge(
    'dd.dynamic_config.is_experiment_enabled',
    1,  # 1 if enabled, 0 if disabled
    tags=[
        'experiment.id:fallback_payments_test',
        'service:payments_api'
    ]
)
```

## Remediate feature flag changes with Workflow Automation

When you identify that a feature flag change caused an issue, you can immediately toggle its state without leaving Datadog. This feature uses [Workflow Automation][2] to toggle LaunchDarkly flags directly from Change Tracking timelines.

<div class="alert alert-info">This feature requires Workflow Automation. See <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">Workflow Automation pricing</a>.</div>

### Setup

To set up feature flag toggles using Workflow Automation:

1. Go to [**Actions > Action Catalog > Connections**][6].
1. Click **New Connection**.
1. Choose {{< ui >}}LaunchDarkly{{< /ui >}}.
1. Complete the required information, then click {{< ui >}}Next, Confirm Access{{< /ui >}}.
1. Set access permissions for the connection.
1. Click {{< ui >}}Create{{< /ui >}}.

### Use feature flag toggles

To toggle feature flags on or off from inside Datadog:

1. Click a LaunchDarkly feature flag change in the Change Tracking timeline.
1. Click the {{< ui >}}Toggle Feature Flag{{< /ui >}} button.
1. Click {{< ui >}}Run Action{{< /ui >}} to run the workflow and toggle the feature flag on or off.

{{< img src="/change_tracking/toggle.png" alt="The details panel for a LaunchDarkly feature flag event, showing the 'Toggle Feature Flag' button." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/launchdarkly/#setup
[2]: https://app.datadoghq.com/actions/connections
[3]: /api/latest/events/
[4]: /tracing/trace_collection/
[5]: https://app.datadoghq.com/apm/settings
[6]: https://app.datadoghq.com/actions/connections
[7]: https://app.datadoghq.com/software
[8]: /feature_flags/
