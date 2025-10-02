---
title: Synthetic Monitoring Notifications
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Notifications
sourceUrl: https://docs.datadoghq.com/synthetics/notifications/index.html
---

# Synthetic Monitoring Notifications

## Overview{% #overview %}

Customize your alerts in [Synthetic Monitoring](https://docs.datadoghq.com/monitors/types/synthetic_monitoring/) to give on-call responders meaningful context. Synthetic Monitoring's message templating system lets you enrich alerts with test details, extract data from test results, and route notifications conditionally based on the failure.

{% alert level="info" %}
Synthetic Monitoring notifications are not supported in your [Continuous Testing CI/CD pipelines.](https://docs.datadoghq.com/continuous_testing/)
{% /alert %}

You can customize notifications using:

- **Pre-filled content**: Start with a structured starting point.
- **[Templated variables](https://docs.datadoghq.com/synthetics/notifications/template_variables)**: Enrich your notifications with dynamic content.
- **[Conditional logic](https://docs.datadoghq.com/synthetics/notifications/conditional_alerting)**: Adapt alert messages across different test types and workflows.
- **[Advanced usage](https://docs.datadoghq.com/synthetics/notifications/advanced_notifications)**: Structure complex messages using handlebars templating.
- **Custom notification display**: Show only your custom message without default enriched content.
- **Simulate notifications**: Test your notification messages by sending simulated notifications.

## Pre-filled monitor messages{% #pre-filled-monitor-messages %}

Synthetic Monitoring provides pre-filled messages with metadata such as:

- Test name
- Monitor ID
- Failing locations
- Last failed test run information
- Time the test started failing

These values appear by default in most notification channels. You can override or extend the message using [templating](https://docs.datadoghq.com/synthetics/notifications/template_variables).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/browser_tests_pre-filled.eef403be90ebd068c86ad195e8e71d10.png?auto=format"
   alt="Synthetic Monitoring monitor section, highlighting the pre-filled monitor messages" /%}

**Examples**:

{% tab title="API request response" %}
**Request:**

```handlebars
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

```handlebars
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

{% /tab %}

{% tab title="WebSocket tests" %}

```handlebars
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

{% /tab %}

{% tab title="API tests variables" %}
Iterate over extracted variables for API tests:

**Config variables:**

```handlebars
{{#each synthetics.attributes.result.variables.config}}
* **Name:** {{name}}
  Type: {{type}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{value}}{{/if}}
{{/each}}
```

**Extracted Variables (Only visible for recovery notifications):**

```handlebars
{{#each synthetics.attributes.result.variables.extracted}}
* **Name:** {{name}}
  Global Variable ID: {{id}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{val}}{{/if}}
{{/each}}
```

{% /tab %}

{% tab title="Multistep API variables" %}
Iterate over steps extracting variables for multistep API tests:

```handlebars
{{! List extracted variables across all successful steps }}
# Extracted Variables
{{#each synthetics.attributes.result.steps}}
  {{#each variables.extracted}}
  * **Name**: `{{name}}`
    Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}`{{{val}}}`{{/if}}
  {{/each}}
{{/each}}
```

{% /tab %}

{% tab title="Browser and mobile test variables" %}
Iterate over steps extracting variables for browser and mobile tests:

```handlebars
{{#each synthetics.attributes.result.steps}}
  {{#if extractedValue}}
  * **Name**: {{extractedValue.name}}
    **Value:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}{{extractedValue.value}}{{/if}}
  {{/if}}
{{/each}}
```

{% /tab %}

## Display custom notifications message{% #display-custom-notifications-message %}

Synthetic Monitoring notifications support the ability to display **only the custom notification message** in alert notifications, hiding all default enriched content such as query details, tags, screenshots, and footers.

By default, all monitors include enriched details in the alert message. This may include:

- Test metadata
- Failing step information
- Screenshots
- Tags
- Links to Datadog resources

### Notification presets{% #notification-presets %}

You can select from the following options to hide or display the information relevant to you:

| Preset         | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| `show_all`     | (Default) Includes all enriched data and metadata.                         |
| `hide_handles` | Hides `@notification` handles (for example, `@slack-channel`).             |
| `hide_all`     | Hides all additional content except for the custom message and event link. |

{% image
   source="https://datadog-docs.imgix.net/images/monitors/monitor_types/synthetic_monitoring/content_in_notification.8756003d8a51405dc1cb10ed55135363.png?auto=format"
   alt="Synthetic Monitoring monitor page, highlighting the content displayed in notification drop-down" /%}

### Example{% #example %}

| Channel | `show_all`                              | `hide_all`                         |
| ------- | --------------------------------------- | ---------------------------------- |
| Email   | Full test detail, screenshot, step info | Only custom message and event link |
| Slack   | Rich content + preview of failed run    | Custom message only                |

See [Monitor Notifications](https://docs.datadoghq.com/monitors/notifications) for more information.

## Simulate notifications{% #simulate-notifications %}

You can test your notification messages by sending simulated notifications. To do this:

1. Add a notification handle to your monitor message
1. Click the **Simulate Notifications** button:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/notifications/simulate_notifications.3cc8705ddcc4fa643638abac5793a47b.png?auto=format"
   alt="Synthetics Monitor screen, highlighting the Simulate Notifications button" /%}

Select the notification type you want to test and click **Send**:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/notifications/simulate_notifications_type.9686e6352d15d02fdff9c4214e1e077d.png?auto=format"
   alt="Send a notification simulating a test failure or recovery." /%}

Simulated notifications include **[TEST]** in their subject lines and use a default monitor name when needed.

**Examples:**

| {% image
     source="https://datadog-docs.imgix.net/images/synthetics/notifications/simulated_notifications_email.13164cea0a708c4933e449221e26ec63.png?auto=format"
     alt="Email notification simulating a test failure." /%} | {% image
     source="https://datadog-docs.imgix.net/images/synthetics/notifications/simulated_notifications_email_recovered.586f3efe8a3536028f2b18c201ecc32c.png?auto=format"
     alt="Email notification simulating a test recovery." /%} |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Important notes about simulated notifications:**

- The test results used in simulations are standardized sample data, not actual results from your specific test configuration.
- Results vary based on test type, subtype (for API tests), and notification type:
  - **Alert notifications**: Simulated failure data
  - **Recovery notifications**: Simulated success data
- All users receive the same simulated data regardless of their test setup.

## Further Reading{% #further-reading %}

- [Use template variables in your Synthetic Monitoring notifications](https://docs.datadoghq.com/synthetics/notifications/template_variables)
- [Use conditional alerting in your Synthetic Monitoring notifications](https://docs.datadoghq.com/synthetics/notifications/conditional_alerting)
- [Learn how to integrate Synthetic monitors with Statuspage](https://docs.datadoghq.com/synthetics/notifications/statuspage/)
