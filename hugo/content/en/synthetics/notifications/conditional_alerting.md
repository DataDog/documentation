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

## Examples

### Send alerts based on status code

```shell
{{!
If a test triggers an alert for an API test and returns a 500 statuscode, notify the backend team.
}}
{{#is_alert}}
  {{#is_exact_match "synthetics.attributes.result.response.statusCode" "500"}}@notify-slack-backend{{/is_exact_match}}
{{/is_alert}}
```

### Send alerts based on an error code

```shell
{{!
Use multiple is_exact_match conditions to display specific failure codes in your notification. 
This example checks for DNS and INCORRECT_ASSERTION failure codes
}}

{{#if synthetics.attributes.result.failure}}

{{#is_exact_match "synthetics.attributes.result.failure.code" "DNS"}}
print out failure code: The failure code is DNS
{{/is_exact_match}}

{{#is_exact_match "synthetics.attributes.result.failure.code" "INCORRECT_ASSERTION"}}
print out failure code: The failure code is an INCORRECT ASSERTION
{{/is_exact_match}}

{{/if}}
```

  <div class="alert alert-info">For a complete list of API test error codes, see <a href="/synthetics/api_tests/errors/">API Testing Errors</a>.</div>

### Send alerts to a specific Slack channel based on failed step

```shell
{{!
If a test triggers an alert for browser or mobile tests, loop through each step and find the failed step.
If the failed step's description field matches Checkout, notify the recipient
}}

{{#is_alert}}
  {{#each synthetics.attributes.result.steps}}
    {{#is_match "status" "failed"}}
      {{#is_match "description" "Checkout"}}@notify-slack-payments{{/is_match}}
    {{/is_match}}
  {{/each}}
{{/is_alert}}
```

### Send alerts to a specific Slack channel based on failed step using a variable shortcut

```shell
{{!
This alert uses the {{synthetics.failed_step}} object which is a variable shortcut that points to the relevant step data contained in {{synthetics.attributes.result.steps}}.
If the test triggers an alert for browser or mobile tests, and if the failed step's description field matches Checkout, notify the recipient.
}}

{{#is_alert}}
  {{#is_match "synthetics.failed_step.description" "Checkout"}}@notify-slack-payments{{/is_match}}
{{/is_alert}}
```

### Set different alert priorities

```shell
{{!
If a test triggers an alert for a multistep API test, loop through each step and find the failed step.
If the step's name matches the staging domain, set the priority to P2. Otherwise, set it to P4.
}}

{{#is_alert}}send a message to <name> @example@email.com 
  {{#each synthetics.attributes.result.steps}}
    {{#is_match "status" "failed"}}
      {{#is_match "name" "stagedomain"}}Stage domain failed. Overriding priority to P2.
        {{override_priority 'P2'}}
        {{else}}Dev domain failed. Overriding priority to P4{{override_priority 'P4'}}
      {{/is_match}}
    {{/is_match}}
  {{/each}}
{{/is_alert}}
```

### Set different alert priorities using variable shortcut

```shell
{{!
This alert uses the {{synthetics.failed_step}} object which is a variable shortcut that points to the relevant step data contained in `{{synthetics.attributes.result.steps}}`.
If the test triggers an alert for multistep API test and if the failed step's name field matches the domain, override the priority.
}}
{{#is_alert}}
  {{#is_match "synthetics.failed_step.name" "stagedomain"}}Stage domain failed. Overriding priority to P2{{override_priority 'P2'}}
  {{else}}Dev domain failed. Overriding priority to P4{{override_priority 'P4'}}
  {{/is_match}}
{{/is_alert}}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
