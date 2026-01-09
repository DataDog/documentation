---
title: Synthetic Monitoring Advanced Notifications
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/synthetics/notifications/statuspage/"
  tag: "Documentation"
  text: "Learn how to integrate Synthetic monitors with Statuspage"
---

## Overview

You can customize Synthetic monitor messages using [Handlebars][1] templating. This page covers advanced techniques such as comments, conditions, and iterations.

Use advanced notifications when you need to:

- Notify different teams based on failure context
- Customize messages based on test results or locations
- Reduce alert noise for global or multi-step tests
- Trigger different actions based on alert or recovery events

## Alert and recovery notifications

Synthetic monitors can send two types of notifications:

- **Alert notifications**: Sent when a test transitions into a failing state.
- **Recovery notifications**: Sent when a previously failing test returns to a passing state.

Although both use the same message template, the data available to each notification can differ. Customize messages based on the notification type using conditional blocks:

```shell
{{#is_alert}}
Test failed at step {{ synthetics.failed_step.description }}
{{/is_alert}}

{{#is_recovery}}
Test recovered successfully.
{{/is_recovery}}
```

<div class="alert alert-info">Always test your syntax directly in the monitor message editor, as template behavior may vary slightly across versions.</div>

## Template syntax

### Comments

Use comments to explain what the template is doing. Comments are removed from the final rendered message.

```shell
{{! This is a comment }}
{{!
This is a
multi-line comment
}}
```

### Raw strings

To display raw values without HTML escaping (for example, URLs or HTTP responses in code blocks), use triple curly braces:

```shell
{{{my_var}}}
```

<div class="alert alert-info">Certain messaging integrations (such as Google) require triple braces <code>&#123;&#123;&#123;</code> around template variables to ensure proper formatting when the message is displayed. For example, you can use <code>&#123;&#123;&#123;synthetics.attributes.result.failure.message&#125;&#125;&#125;</code>.</div>

### Formatting values

Use the `eval` function to format durations and data sizes for readability.

**Durations** (convert milliseconds to seconds):

```shell
{{eval "synthetics.attributes.result.duration/1000"}}
```

**Data sizes** (human-readable bytes):

```shell
{{eval "humanize_bytes(bodySize)"}}
```

Review the [monitors documentation][2] for the full list of available functions.

## Conditional logic

Use `#if`, `#is_match`, and `#is_exact_match` to render content based on conditions.

### Boolean checks (#if)

Use `#if` to check whether a value is truthy or to verify if a variable exists:

```shell
{{#if synthetics.attributes.variable.config.CONFIG_VAR.secure}}
  The CONFIG_VAR variable is obfuscated
{{else}}
  The CONFIG_VAR variable isn't obfuscated
{{/if}}
```

<div class="alert alert-info">Use <code>#if</code> over <code>#is_exact_match</code> when checking if a variable is empty or unset.</div>

### Pattern matching (#is_match)

Use `#is_match` for wildcard or partial string matching:

```shell
{{#is_match synthetics.attributes.location.id "aws:eu-*"}}
EU failure detected
{{/is_match}}
```

### Exact matching (#is_exact_match)

Use `#is_exact_match` for exact string comparisons:

```shell
{{#is_exact_match synthetics.failed_step.id "svn-yrx-3xg"}}
  A backend-related step failed!
  @slack-backend-team
{{else}}
  Another step failed, probably frontend related
  @slack-frontend-team
{{/is_exact_match}}
```

### Conditional examples

**Notify only for private locations:**

```shell
{{#if synthetics.attributes.location.privateLocation}}
Private Location failure
{{/if}}
```

**Route alerts based on browser type:**

```shell
{{#is_match synthetics.attributes.device.browser.type "chrome"}}
Chrome-only issue detected
{{/is_match}}
```

## Iteration

Use `#each` to loop over lists or dictionaries. Within the loop, you can access:

- `this`: The current item
- `@key`: The current key (for dictionaries)
- `@index`, `@first`, `@last`: Loop metadata

### Use local variables in a notification

Access local variables configured for your test using the `config` field:

```shell
{{!
The test is configured with three local variables: APP_NAME, APP_URL, and APP_ENVIRONMENT.
Access values using: synthetics.attributes.result.variables.config[<variable-name>].value
}}
Application: {{synthetics.attributes.result.variables.config[APP_NAME].value}}
URL Tested: {{synthetics.attributes.result.variables.config[APP_URL].value}}
Environment: {{synthetics.attributes.result.variables.config[APP_ENVIRONMENT].value}}
```

### Loop through multistep API test steps

```shell
{{#each synthetics.attributes.result.steps}}
Step name: {{name}}
Step status: {{status}}
Step type: {{type}}

  {{#each variables.extracted}}
    Extracted variable name: {{ name }}
    Extracted variable value: {{ val }}
  {{/each}}

{{/each}}
```

### Loop through browser test steps

```shell
{{#each synthetics.attributes.result.steps}}
Step name: {{description}}
Step status: {{status}}
Step type: {{type}}

  {{#is_match "type" "extractVariable"}}
    Extracted variable name: {{ extractedValue.name }}
    Extracted variable value: {{ extractedValue.value }}
  {{/is_match}}

{{/each}}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://handlebarsjs.com/guide/#what-is-handlebars
[2]: /monitors/guide/template-variable-evaluation/?tab=numericvariable#functions
