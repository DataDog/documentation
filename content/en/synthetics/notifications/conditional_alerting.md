---
title: Synthetic Monitoring Conditional Alerting
aliases:
  - /synthetics/guide/synthetic-test-monitors/
further_reading:
- link: "synthetics/notifications/advanced_notifications"
  tag: "Documentation"
  text: "Use advanced notifications in Synthetic Monitoring"
- link: "monitors/notify/variables"
  tag: "Documentation"
  text: "Learn more about monitor variables"
---

## Overview

Use conditional templating to change messages, set notification handles, or override alert priority based on test results. This is especially useful when routing alerts to specific teams.

<div class="alert alert-danger">

To ensure notifications are delivered properly, always include a notification handle in your conditional logic. Notifications are dropped if no handle is provided. Make sure to:

- Include a catch-all condition using `{{else}}` to handle any unmatched scenarios.
- Provide notification handles for both alert and recovery notifications.

For more detailed information, see the <a href="https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#examples">Monitor documentation.</a></div>

### Examples

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}