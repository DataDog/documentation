---
title: Synthetic Monitoring enhanced monitor messages and notifications

further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/guide/integrate-monitors-with-statuspage/"
  tag: "Documentation"
  text: "Learn how to integrate monitors with Statuspage"
- link: "/synthetics/guide/synthetic-test-monitors/"
  tag: "Guide"
  text: "Use Synthetic test monitors"
---

## Overview

Customize your Synthetic monitor notifications to provide meaningful context for on-call responders. Datadog's message templating system enables you to enrich alerts with test details, extract data from test results, and route notifications conditionally based on the failure.

Monitor messages in Synthetic Monitoring consist of:

- A **title**: usually the name of the monitor.
- A **custom message**: optional text written when creating the monitor.
- An **auto-appended summary**: includes failing locations, error messages, and links to the test.
- A **footer**: includes details from the last failed test run.

You can use pre-filled content, templated variables, and conditional logic to adapt alert messages across different test types and workflows.

{{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Synthetic Monitoring monitor section, highlighting the pre-filled monitor messages" style="width:100%;" >}}

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

These values appear by default in most notification channels. You can override or extend the message using templating.

Examples:

{{< tabs >}}
{{% tab "API Request Response" %}}

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
{{% tab "WebSocket Tests" %}}

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
{{% tab "API Test Variables" %}}

**Config Variables:**
```handlebars
{{#each synthetics.attributes.result.variables.config}}
* **Name:** {{name}}
  Type: {{type}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{value}}{{/if}}
{{/each}}
```

**Extracted Variables (Only Visible for Recovery Notifications):**
```handlebars
{{#each synthetics.attributes.result.variables.extracted}}
* **Name:** {{name}}
  Global Variable ID: {{id}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{val}}{{/if}}
{{/each}}
```

{{% /tab %}}
{{% tab "Multistep API Variables" %}}

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
{{% tab "Browser/ Mobile Variables" %}}

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

## Template variables

Template variables allow you to insert values from the test results into the message. For example:

```handlebars
Test "{{check_name}}" failed at step {{synthetics.failed_step.name}} with error: {{synthetics.failed_step.failure.message}}.
```

### Common variables

- `{{check_name}}`: The name of the monitor
- `{{synthetics.failed_step.name}}`: The name of the failing step
- `{{synthetics.failed_step.failure.message}}`: The error message
- `{{synthetics.failed_step.url}}`: The URL of the failed step
- `{{synthetics.attributes.result.response.statusCode}}`: The HTTP status code
- `{{synthetics.result.step_count}}`: Number of steps
- `{{synthetics.result.duration}}`: Duration of the test run
- `{{tags.env}}`: The environment tag value (for example, `prod`)

**Note:** Not all variables are available for every test type. You may need to test different outputs to verify the data returned.

### Synthetic Monitoring result attributes

Access result data using the standard `synthetics.attributes` prefix. Attributes differ by test type.

{{< tabs >}}
{{% tab "Test Info" %}}

- `.test`: Info about the test
  - `.id`: Public ID (for example, `abc-def-ghi`)
  - `.type`: Test type
  - `.subType`: Subtype for API tests

{{% /tab %}}
{{% tab "Location" %}}

- `.location`
  - `.id`: Location ID (for example, `aws:eu-central-1`)
  - `.privateLocation`: `true` for Private Locations

{{% /tab %}}
{{% tab "Device" %}}

Applies to Browser and Mobile tests.

- `.device`
  - `.id`, `.name`, `.type`, `.resolution.{width,height}`
  - `.browser.type`: Browser type (Browser only)
  - `.platform.{name,version}`: Platform info (Mobile only)

{{% /tab %}}
{{% tab "Result" %}}

- `.result`
  - `.id`: Unique result ID
  - `.status`: Status (for example, `failed`)
  - `.duration`: Test duration in ms
  - `.testStartedAt`, `.testFinishedAt`, `.testTriggeredAt`: Epoch timestamps
  - `.failure.message`: Description of failure
  - `.failure.code`: Error code

{{% /tab %}}
{{< /tabs >}}

### Variables

These are local variables set for API tests or outside individual steps in step-based tests. This also includes variables generated by JavaScript code.

{{< tabs >}}
{{% tab "Config Local Variables" %}}

Located at `result.variables.config`:

- `.name`, `.type`, `.secure`, `.value` (non-obfuscated only)

{{% /tab %}}
{{% tab "Global Variables" %}}

Available only for **successful test results** and **recovery notifications**.

- Located at `result.variables.extracted`
- `.id`, `.name`, `.secure`, `.val` (not `.value`)

{{% /tab %}}
{{% tab "Step Extracted Variables" %}}

- `.extractedValue` in step
  - `.name`, `.secure`, `.value` (if successful)

{{% /tab %}}
{{< /tabs >}}

### Steps

{{< tabs >}}
{{% tab "General Steps" %}}

For multistep/API/Browser/Mobile:

- `.steps` (list):
  - `.allowFailure`, `.duration`, `.failure`, `.id`, `.isCritical`, `.status`, `.type`
  - Subtest info: `.subTest.id`, `.subStep.parentStep.id`, `.subStep.parentTest.id`, `.subStep.level`

{{% /tab %}}
{{% tab "Browser Tests" %}}

**General:**
- `.startUrl`: URL from config

**Steps:**
- `.apiTest.{request,result,extraInfo}`
- `.assertionResults.{expected,checkType,actual}`
- `.browserErrors`: List of errors
- `.cdnResources`, `.timings.{firstByte,tcp}`
- `.description`, `.warnings`

{{% /tab %}}
{{% tab "Mobile Tests" %}}

- `.application.versionId`
- `.apiTest`, `.description`, `.warnings`

{{% /tab %}}
{{% tab "API Tests" %}}

**Multistep:**
- `.name`, `.type` (step)
- Follow regular API fields per subType

**Non-Multistep:**
- `.assertions.{actual,expected,operator,type}`
- `.dnsResolution.{resolvedIp,server}`
- `.timings.{total,dns,tcp}`
- `.request.{url,host}`
- `.response.{body,statusCode,headers,httpVersion,redirects}`

{{% /tab %}}
{{% tab "Network Tests" %}}

**Websocket:**
- `.timings.{open,receive}`
- `.handshake.{request,response}`
- `.request.message`, `.response.message`
- `.close.reason`, `.close.statusCode`

**gRPC:**
- `.callType`: `unary` or `healthcheck`
- `.timings.rpc`
- `.response.healthcheck.status`
- `.request.message`, `.response.message`

**UDP:**
- `.request.message`, `.response.message`
- `.timings.message`

**TCP:**
- `.connectionOutcome`
- `.netpath`, `.traceroute`:
  - `.routers.{ip,resolvedHost,packetsSent,packetsReceived}`
  - `.latency.{min,max,avg,stddev,values}`

**ICMP:**
- `.traceroute`: Same as TCP
- `.request.host`, `.ping`
- `.latency.{min,max,avg,stddev,values}`

{{% /tab %}}
{{% tab "Protocol Tests" %}}

**SSL:**
- `.cert`, `.cipher`, `.issuer`, `.subject`, `.valid.{from,to}`, `.ocsp`
- `.timings.handshake`

**DNS:**
- `.response.records.{type,values}`

{{% /tab %}}
{{% tab "Summary and Shortcuts" %}}

**Step Summary:**
- `.result.steps.<step_id>`
  - `.id`, `.status`, `.type`, `.duration`, `.description`, `.failure.message`, `.code`, `.url`

**Summary Data:**
- `.count.steps.{total,completed}`, `.count.errors`, `.count.hops`

**Shortcuts:**
- `synthetics.failed_step` points to the first non-skippable failed step

**Tags:**
- `{{tags}}`: All tags
- `{{tag.<key>}}`: Specific tag

**Service Tag:**
If `service` tag is set:
- `{{service.name}}`
- `{{service.team}}`
- `{{service.docs}}`, `{{service.links}}`

{{% /tab %}}
{{< /tabs >}}

## Conditional alerting

Use conditional templating to change messages, set notification handles, or override alert priority based on test results. This is especially useful when routing alerts to specific teams.

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

**Note**: Always include a default notification handle outside any condition to avoid dropping alerts.

### Best practices

- Always include a default `@notification` (outside any conditions) to prevent dropped messages.
- Avoid complex logic for paging tools like PagerDuty, which require consistent routing for recovery.
- Use conditional logic to override alert text, change priority, or split notifications between teams.

## Advanced usage

You can customize Synthetic monitor messages using handlebars templating. The following examples cover advanced techniques such as comments, list access, conditions, and iterations.

**Note:** Always test your syntax directly in the monitor message editor, as template behavior may vary slightly across versions.

### Comments

Use comments to explain what the template is doing. Comments are removed from the final rendered message.

```handlebars
{{! This is a comment }}
{{!
This is a
multi-line comment
}}
```

### Raw strings

To display raw values without HTML escaping (for example, URLs, or HTTP responses in code blocks), use triple curly braces:

```handlebars
{{{my_var}}}
```

### Accessing list data

You can loop over lists (like steps or variables) or access items directly:

```handlebars
{{list.2.name}}                {{! third item }}
{{list.-1.status}}            {{! last item }}
{{list[My Complex Name]url}}  {{! use bracket notation for complex keys }}
{{list[My Complex Name]failure.code}}
{{list.abc-def-ghi}}          {{! access via ID (case-insensitive) }}
```

### Human-readable formatting

- **Durations:**

  ```handlebars
  {{eval "synthetics.attributes.result.duration/1000"}}
  ```

- **Data Sizes:**

  ```handlebars
  {{eval "humanize_bytes(bodySize)"}}
  ```

### Conditions

<div class="alert alert-info">Use <code>#if</code>, <code>#is_match</code>, and <code>#is_exact_match</code> for logic-based rendering.</div>

#### Boolean check:

```handlebars
{{#if synthetics.attributes.variable.config.CONFIG_VAR.secure}}
  The CONFIG_VAR variable is obfuscated
{{else}}
  The CONFIG_VAR variable isn't obfuscated
{{/if}}
```

#### Conditional alerting based on step ID:

```handlebars
{{#is_exact_match synthetics.failed_step.id "svn-yrx-3xg"}}
  A backend-related step failed!
  @slack-backend-team
{{else}}
  Another step failed, probably Frontend related
  @slack-frontend-team
{{/is_exact_match}}
```
   <div class="alert alert-info">Use <code>#if</code> over <code>#is_exact_match</code> for checking if a variable is empty or unset.</div>

### Iteration

Use `#each` to loop over dictionaries or lists. You can access:

- `this` → the current item
- `@key` → the current key (for dictionaries)
- `@index`, `@first`, `@last` → loop metadata

#### Dictionary example:

```handlebars
{{#each users}}
  # User `{{@key}}`
  Name: {{name}}
  Permissions: {{permissions}}
{{/each}}

Users: {{#each users}}`{{@key}}` ({{name}}){{#unless @last}}, {{/unless}}{{/each}}
```

#### Steps loop (Synthetics-specific):

```handlebars
{{#each synthetics.attributes.result.steps}}
* Step name: {{description}}
* Step status: {{status}}
* Step type: {{type}}
{{/each}}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}