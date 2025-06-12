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

Track feature flag changes alongside performance metrics to quickly identify when flags cause issues. Feature flag events appear in dashboards, monitors, and service pages, helping you troubleshoot faster.

{{< img src="/change_tracking/monitor.png" alt="The monitor graph shows the error spike correlated with the flag change." style="width:100%;" >}}

## Track feature flags

### LaunchDarkly flags

1. **Enable the integration**: Set up the [LaunchDarkly integration][1].
2. **Tag your flags**: In LaunchDarkly, add a service tag to each feature flag:
   - Format: `service:<your-service-name>`
   - Example: `service:web-store`
   
    {{< img src="/change_tracking/service-tag.png" alt="The monitor graph shows the error spike correlated with the flag change." style="width:100%;" >}}

Feature flag changes now appear in your service's Change Tracking timeline.

### Custom feature flags

Send feature flag events from any provider using the Events API. Include a service tag to link the event to your service.

```json
# Example event structure
{
  "title": "Feature flag toggled",
  "text": "Payment gateway flag enabled",
  "tags": ["service:web-store", "flag:payment-gateway", "env:production"]
}
```

## See flag impact

- **Performance correlation**: View flag changes alongside latency, error rates, and resource usage
- **Root cause analysis**: Identify if a new feature caused production issues
- **Faster resolution**: See all relevant changes during incidents

## Advanced: Auto-detect affected services

Automatically identify all services using a feature flag, even when multiple services evaluate the same flag.

### Setup

1. **Add tracing** to your feature flag evaluation code
2. **Set operation name**: `experiments.IsEnabled`
3. **Add experiment ID**: Tag the span with `experiment_id:<flag-id>`

```python
# Example implementation
with tracer.trace("experiments.IsEnabled") as span:
    span.set_tag("experiment_id", "payment-gateway-flag")
    flag_value = evaluate_flag("payment-gateway-flag")
```

Datadog now tracks which services evaluate each flag, providing complete visibility across your microservices.

## Toggle flags from Datadog

Roll back problematic flags directly from Change Tracking timelines using Workflow Automation.

<div class="alert alert-info">This feature requires Workflow Automation. See <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">Workflow Automation pricing</a>.</div>

### Setup

1. **Configure connection**: Set up LaunchDarkly in [Workflow Automation][2]
    {{< img src="/change_tracking/connection.png" alt="The details panel for a LaunchDarkly feature flag event, showing the 'Toggle Feature Flag' button." style="width:90%;" >}}

2. **Set permissions**: Grant appropriate access for flag toggling
3. **Use the toggle**: 
   - Click a LaunchDarkly flag event in any timeline
   - Select **Toggle Feature Flag** in the details panel

{{< img src="/change_tracking/toggle.png" alt="The details panel for a LaunchDarkly feature flag event, showing the 'Toggle Feature Flag' button." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/launchdarkly/
[2]: https://app.datadoghq.com/actions/connections