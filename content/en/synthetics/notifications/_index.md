---
title: Synthetic Monitoring Notifications
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/guide/integrate-monitors-with-statuspage/"
  tag: "Documentation"
  text: "Learn how to integrate monitors with Statuspage"
---

## Overview

Customize your [Synthetic Monitoring notifications][1] to provide meaningful context for on-call responders. Datadog's message templating system enables you to enrich alerts with test details, extract data from test results, and route notifications conditionally based on the failure.

You can customize notifications using:

- **[Pre-filled content](#pre-filled-monitor-messages)**: Start with a structured starting point.
- **[Templated variables][2]**: Enrich your notifications with dynamic content.
- **[Conditional logic][3]**: Adapt alert messages across different test types and workflows.
- **[Advanced usage][4]**: Structure complex messages using handlebars templating.
- **[Custom notification display](#display-custom-notifications-message)**: Show only your custom message without default enriched content.

## Use cases

Synthetic Monitoring templating system supports a range of use cases:

- **Basic context**: Include the test name, time, and locations.
- **Failure specifics**: Add the failing step, error message, test duration, or response body.
- **Step metadata**: Reference step names, order, execution time, and status.
- **Variable values**: Insert test variables (for example, status code, response content).
- **Conditional routing**: Route alerts to specific teams based on which step failed.
- **Screenshots**: Browser and Mobile tests include screenshots in the message footer.
- **Location metadata**: Include the failing location (for example, `private` or `managed`) in the message.

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

{{% /tab %}}
{{% tab "WebSocket tests" %}}

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

{{% /tab %}}
{{% tab "API tests variables" %}}

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

{{% /tab %}}
{{% tab "Multistep API variables" %}}

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

{{% /tab %}}
{{% tab "Browser and mobile test variables" %}}

Iterate over steps extracting variables for browser and mobile tests:

```handlebars
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

Synthetic Monitoring monitors support the ability to display **only the custom notification message** in alert notifications, hiding all default enriched content such as query details, tags, screenshots, and footers.

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

### Best practices

- Always include a default `@notification` (outside any conditions) to prevent dropped messages.
- Avoid complex logic for paging tools like PagerDuty, which require consistent routing for recovery.
- Use conditional logic to override alert text, change priority, or split notifications between teams.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/synthetic_monitoring/
[2]: /synthetics/notifications/template_variables
[3]: /synthetics/notifications/conditional_alerting
[4]: /synthetics/notifications/advanced_notifications
[5]: /monitors/notifications


