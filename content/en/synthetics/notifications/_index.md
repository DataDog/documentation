---
title: Synthetic Monitoring Notifications
further_reading:
- link: "synthetics/notifications/template_variables"
  tag: "Documentation"
  text: "Use template variables in your Synthetic Monitoring notifications"
- link: "synthetics/notifications/conditional_alerting"
  tag: "Documentation"
  text: "Use conditional alerting in your Synthetic Monitoring notifications"
- link: "/synthetics/notifications/statuspage/"
  tag: "Documentation"
  text: "Learn how to integrate Synthetic monitors with Statuspage"
---

## Overview

Customize your alerts in [Synthetic Monitoring][1] to give on-call responders meaningful context. Synthetic Monitoring's message templating system lets you enrich alerts with test details, extract data from test results, and route notifications conditionally based on the failure.

<div class="alert alert-info">Synthetic Monitoring notifications are not supported in your <a href="https://docs.datadoghq.com/continuous_testing/">Continuous Testing CI/CD pipelines.</a></div>

You can customize notifications using:

- **[Pre-filled content](#pre-filled-monitor-messages)**: Start with a structured starting point.
- **[Templated variables][2]**: Enrich your notifications with dynamic content.
- **[Conditional logic][3]**: Adapt alert messages across different test types and workflows.
- **[Advanced usage][4]**: Structure complex messages using handlebars templating.
- **[Custom notification display](#display-custom-notifications-message)**: Show only your custom message without default enriched content.
- **[Simulate notifications](#simulate-notifications)**: Test your notification messages by sending simulated notifications.

**Note**: To learn how Synthetic Monitoring notifications evaluate test results and trigger alerts, review the [Understanding Synthetic Monitor Alerting][6] guide.

## Pre-filled monitor messages

Synthetic Monitoring provides pre-filled messages with metadata such as:

- Test name
- Monitor ID
- Failing locations
- Last failed test run information
- Time the test started failing

These values appear by default in most notification channels. You can override or extend the message using [templating][2].

   {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Synthetic Monitoring monitor section, highlighting the pre-filled monitor messages" style="width:100%;" >}}

**Examples**:

{{< tabs >}}
{{% tab "API request response" %}}

Display the HTTP request and response details from an API test, including the method, URL, headers, body, status code, and any redirects.

**Request:**
```shell
{{#with synthetics.attributes.result.request}}
We made a {{method}} request to `{{{url}}}`{{#if headers}} with the following headers:

{{#each headers}}
{{@key}}={{this}}
{{/each}}

{{/if}}
{{#if body}}And the body:

{{{body}}}

{{/if}}
{{/with}}
```

**Response:**
```shell
{{#with synthetics.attributes.result.response}}
We received an HTTP {{httpVersion}} response with a {{statusCode}} status code{{#if headers}} with the following headers:

{{#each headers}}
{{@key}}={{this}}
{{/each}}

{{/if}}
{{#if redirects}}
Redirections:
{{#each redirects}}
* {{statusCode}} redirect to `{{{location}}}`
{{/each}}
{{/if}}
The body's size was {{eval "humanize_bytes(bodySize)"}}{{#if body}} and contained:

{{{body}}}

{{/if}}
{{/with}}
```

{{% /tab %}}
{{% tab "WebSocket tests" %}}

Display WebSocket test details including the handshake status, request message, and response close status with reason.

```shell
{{! Websocket request and response details }}
{{#with synthetics.attributes.result}}
{{#if handshake }}
The handshake received a response with the {{handshake.response.statusCode}} status code.
{{/if}}
{{#if request}}
A WebSocket request was made with the message:

{{{request.message}}}

{{/if}}
{{#if response}}
and the response closed with status code {{response.close.statusCode}} and reason `{{response.close.reason}}`
{{#if response.message}}, containing the message:

{{{response.message}}}

{{else}}.{{/if}}
{{/if}}
{{/with}}
```

{{% /tab %}}
{{% tab "API tests variables" %}}

List all config and extracted variables from an API test, showing their names, types, and values. Obfuscated values are hidden for security.

**Config variables:**
```shell
{{#each synthetics.attributes.result.variables.config}}
* **Name:** {{name}}
  Type: {{type}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{value}}{{/if}}
{{/each}}
```

**Extracted Variables (Only visible for recovery notifications):**
```shell
{{#each synthetics.attributes.result.variables.extracted}}
* **Name:** {{name}}
  Global Variable ID: {{id}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{val}}{{/if}}
{{/each}}
```

{{% /tab %}}
{{% tab "Multistep API variables" %}}

Loop through all steps in a multistep API test and display variables extracted by each successful step.

```shell
{{! List extracted variables across all successful steps }}
# Extracted Variables
{{#each synthetics.attributes.result.steps}}
  {{#each variables.extracted}}
  * **Name**: `{{name}}`
    Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}`{{{val}}}`{{/if}}
  {{/each}}
{{/each}}
```

{{% /tab %}}
{{% tab "Browser and mobile test variables" %}}

Loop through all steps in a browser or mobile test and display variables extracted by steps that use the "Extract variable" action.

```shell
{{#each synthetics.attributes.result.steps}}
  {{#if extractedValue}}
  * **Name**: {{extractedValue.name}}
    **Value:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}{{extractedValue.value}}{{/if}}
  {{/if}}
{{/each}}
```

{{% /tab %}}
{{< /tabs >}}

## Display custom notifications message

Synthetic Monitoring notifications support the ability to display **only the custom notification message** in alert notifications, hiding all default enriched content such as query details, tags, screenshots, and footers.

By default, all monitors include enriched details in the alert message. This may include:
- Test metadata
- Failing step information
- Screenshots
- Tags
- Links to Datadog resources

### Notification presets

You can select from the following options to hide or display the information relevant to you:

| Preset            | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `show_all`        | (Default) Includes all enriched data and metadata.                          |                                |
| `hide_handles`    | Hides `@notification` handles (for example, `@slack-channel`).                         |
| `hide_all`        | Hides all additional content except for the custom message and event link.  |

{{< img src="/monitors/monitor_types/synthetic_monitoring/content_in_notification.png" alt="Synthetic Monitoring monitor page, highlighting the content displayed in notification drop-down" style="width:80%;" >}}

### Example

| Channel | `show_all`  | `hide_all` |
|---------|--------------------|---------------------|
| Email   | Full test detail, screenshot, step info | Only custom message and event link |
| Slack   | Rich content + preview of failed run | Custom message only |

See [Monitor Notifications][5] for more information.

## Simulate notifications

You can test your notification messages by sending simulated notifications. To do this:

1. Add a notification handle to your monitor message
2. Click the **Simulate Notifications** button:

  {{< img src="/synthetics/notifications/simulate_notifications.png" alt="Synthetics Monitor screen, highlighting the Simulate Notifications button" style="width:80%;" >}}

3. Select the notification type you want to test and click **Send**:

   {{< img src="/synthetics/notifications/simulate_notifications_type.png" alt="Send a notification simulating a test failure or recovery." style="width:80%;" >}}

Simulated notifications include **[TEST]** in their subject lines and use a default monitor name when needed.

**Examples:**

<table style="width:100%; border:none;">
<tr>
<td style="width:50%; text-align:center; border:none; padding:10px;">
{{< img src="/synthetics/notifications/simulated_notifications_email.png" alt="Email notification simulating a test failure." style= "width:100%;" >}}
</td>
<td style="width:50%; text-align:center; border:none; padding:10px;">
{{< img src="/synthetics/notifications/simulated_notifications_email_recovered.png" alt="Email notification simulating a test recovery." style= "width:100%;" >}}
</td>
</tr>
</table>

**Important notes about simulated notifications:**

- The test results used in simulations are standardized sample data, not actual results from your specific test configuration.
- Results vary based on test type, subtype (for API tests), and notification type:
  - **Alert notifications**: Simulated failure data
  - **Recovery notifications**: Simulated success data
- All users receive the same simulated data regardless of their test setup.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/synthetic_monitoring/
[2]: /synthetics/notifications/template_variables
[3]: /synthetics/notifications/conditional_alerting
[4]: /synthetics/notifications/advanced_notifications
[5]: /monitors/notifications
[6]: /synthetics/guide/how-synthetics-monitors-trigger-alerts/



