---
title: Synthetic Monitoring Conditional Alerting
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Notifications >
  Synthetic Monitoring Conditional Alerting
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/notifications/conditional_alerting/index.html
---

# Synthetic Monitoring Conditional Alerting

## Overview{% #overview %}

Use conditional templating to change messages, set notification handles, or override alert priority based on test results. This is especially useful when routing alerts to specific teams.

{% alert level="warning" %}
To ensure notifications are delivered properly, always include a notification handle in your conditional logic. Notifications are dropped if no handle is provided. Make sure to:

- Include a catch-all condition using `{{else}}` to handle any unmatched scenarios.
- Provide notification handles for both alert and recovery notifications.

For more detailed information, see the [Monitor documentation.](https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#examples)
{% /alert %}



### Examples{% #examples %}

**Send alerts to a specific Slack channel based on failed step:**

```handlebars
{{#is_match "synthetics.failed_step.description" "Checkout"}}
@notify-slack-payments
{{/is_match}}
```

**Send alerts based on status code:**

```handlebars
{{#is_exact_match "synthetics.attributes.result.response.statusCode" "500"}}
@notify-slack-backend
{{/is_exact_match}}
```

**Set different alert priorities:**

```handlebars
{{#if synthetics.failed_step.name}}
{{override_priority "P2"}}
{{else}}
{{override_priority "P4"}}
{{/if}}
```

## Further Reading{% #further-reading %}

- [Use advanced notifications in Synthetic Monitoring](https://docs.datadoghq.com/synthetics/notifications/advanced_notifications)
- [Learn more about monitor variables](https://docs.datadoghq.com/monitors/notify/variables)
