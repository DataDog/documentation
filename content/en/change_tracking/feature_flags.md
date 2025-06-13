---
title: Track feature flag changes
further_reading:
  - link: "/change_tracking/"
    tag: "Documentation"
    text: "Change Tracking"
  - link: "/integrations/launchdarkly/#feature-flag-tracking-integration/"
    tag: "Documentation"
    text: "LaunchDarkly"
---

## Overview

Track feature flag changes alongside performance metrics in dashboards, monitors, and service pages to identify when flags cause issues.

{{< img src="/change_tracking/monitor.png" alt="The monitor graph shows the error spike correlated with the flag change." style="width:100%;" >}}

## Track feature flags

Datadog supports tracking LaunchDarkly flags using the [LaunchDarkly integration][1] or tracking feature flags from any provider using the [Events API][3].

### LaunchDarkly flags

To track LaunchDarkly feature flags in your services' Change Tracking timeline:

1. Enable the [LaunchDarkly integration][1] in Datadog.
1. Go to **Flags > `<your-feature-flag-name>` > Settings** in LaunchDarkly.
1. In **Custom properties**, tag each LaunchDarkly feature flag with the name of the related Datadog service in the format `service:<your-service-name>`.
1. Click **Save changes**.
   
    {{< img src="/change_tracking/service-tag.png" alt="The monitor graph shows the error spike correlated with the flag change." style="width:100%;" >}}

### Custom feature flags

Send feature flag events from any provider using the [Events API][3]. Create a `change` category event and include a service tag to link the event to your service.

For example:

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

## Auto-detect affected services

Automatically identify all services using a feature flag, even when multiple services evaluate the same flag.

### Setup

1. [Instrument your feature flag evaluation code][4] using the Datadog tracing library.
1. Create a custom span with the operation name `experiments.IsEnabled` to track feature flag evaluations.
3. Tag the span with `experiment_id:<flag-id>`, where `<flag-id>` matches the feature flag ID.

For example:

```python
with tracer.trace("experiments.IsEnabled") as span:
    span.set_tag("experiment_id", "payment-gateway-flag")
    flag_value = evaluate_flag("payment-gateway-flag")
```

## Remediate feature flag changes with Workflow Automation

Roll back problematic flags directly from Change Tracking timelines using [Workflow Automation][2].

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

To use feature flag toggles:

1. Click a LaunchDarkly feature flag change in the Change Tracking timeline.
1. Click the **Toggle Feature Flag** button.
1. Click **Run Action** to run the workflow and toggle the feature flag on or off.

1. **Configure connection**: Set up LaunchDarkly in 

{{< img src="/change_tracking/toggle.png" alt="The details panel for a LaunchDarkly feature flag event, showing the 'Toggle Feature Flag' button." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/launchdarkly/#setup
[2]: https://app.datadoghq.com/actions/connections
[3]: /api/latest/events/
[4]: /tracing/trace_collection/
[5]: https://app.datadoghq.com/apm/settings
[6]: https://app.datadoghq.com/actions/connections