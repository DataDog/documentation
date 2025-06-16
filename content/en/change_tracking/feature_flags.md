---
title: Track Feature Flag Changes
further_reading:
  - link: "/change_tracking/"
    tag: "Documentation"
    text: "Change Tracking"
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

Datadog supports tracking LaunchDarkly flags using the [LaunchDarkly integration][1] or tracking feature flags from other feature flag providers using the [Events API][3].

### LaunchDarkly flags

To track LaunchDarkly feature flags in your services' Change Tracking timeline:

1. Enable the [LaunchDarkly integration][1] in Datadog.
1. Go to **Flags > `<your-feature-flag-name>` > Settings** in LaunchDarkly.
1. In **Custom properties**, add a tag with key `service` and value `<your-service-name>`, matching your Datadog service name exactly.
1. Click **Save changes**.

### Custom feature flags

Send feature flag events from any provider using the [Events API][3]. Create a `change` category event and include a service tag to link the event to your service.

Example request:

```json
{
  "data": {
    "type": "event",
    "attributes": {
      "title": "payment_processed feature flag updated",
      "message": "payment_processed feature flag has been enabled",
      "tags": [
        "env:test",
        "team:payments"
      ],
      "category": "change",
      "attributes": {
        "changed_resource": {
          "type": "feature_flag",
          "name": "fallback_payments_test"
        },
        "impacted_resources": [
          {
            "type": "service",
            "name": "payments-api"
          }
        ],
        "prev_value": {
          "enabled": true,
          "percentage": "10%"
        },
        "new_value": {
          "enabled": true,
          "percentage": "50%"
        }
      }
    }
  }
}
```

## Automatically detect affected services

In addition to tracking when a feature flag's configuration changes using the LaunchDarkly integration or the Events API, you can also automatically identify every service that evaluates a flag. This auto-enrichment provides deeper context by using APM traces to show the real-time impact of a flag, which is especially useful when a single flag is used by multiple services.

### Setup

To automatically detect services using a feature flag, instrument your feature flag evaluation code with the APM tracing library. This allows Datadog to automatically detect all services that evaluate a specific flag, even if they weren't originally tagged.

1. [Instrument your feature flag evaluation code][4] using the Datadog tracing library.
1. Create a custom span with the operation name `experiments.IsEnabled` to track feature flag evaluations.
3. Tag the span with `experiment_id:<flag-id>`, where `<flag-id>` matches the feature flag ID.

For example:

```python
# Trace feature flag evaluation to enable auto-detection
with tracer.trace("experiments.IsEnabled") as span:
    span.set_tag("experiment_id", "payment-gateway-flag")
    # Your existing feature flag evaluation code
    flag_value = evaluate_flag("payment-gateway-flag")
```

## Remediate feature flag changes with Workflow Automation

When you identify that a feature flag change caused an issue, you can immediately toggle its state without leaving Datadog. This feature uses [Workflow Automation][2] to toggle LaunchDarkly flags directly from Change Tracking timelines.

<div class="alert alert-info">This feature requires Workflow Automation. See <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">Workflow Automation pricing</a>.</div>

### Setup

To set up feature flag toggles using Workflow Automation:

1. Go to [**Actions > Action Catalog > Connections**][6].
1. Click **New Connection**.
1. Choose *LaunchDarkly*.
1. Complete the required information, then click **Next, Confirm Access**.
1. Set access permissions for the connection.
1. Click **Create**.

### Use feature flag toggles

To toggle feature flags on or off from inside Datadog:

1. Click a LaunchDarkly feature flag change in the Change Tracking timeline.
1. Click the **Toggle Feature Flag** button.
1. Click **Run Action** to run the workflow and toggle the feature flag on or off.

{{< img src="/change_tracking/toggle.png" alt="The details panel for a LaunchDarkly feature flag event, showing the 'Toggle Feature Flag' button." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/launchdarkly/#setup
[2]: https://app.datadoghq.com/actions/connections
[3]: /api/latest/events/
[4]: /tracing/trace_collection/
[5]: https://app.datadoghq.com/apm/settings
[6]: https://app.datadoghq.com/actions/connections