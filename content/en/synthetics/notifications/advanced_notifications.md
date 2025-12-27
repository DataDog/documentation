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

You can customize Synthetic monitor messages using handlebars templating. The following examples cover advanced techniques such as comments, list access, conditions, and iterations.

**Note:** Always test your syntax directly in the monitor message editor, as template behavior may vary slightly across versions.

## Comments

Use comments to explain what the template is doing. Comments are removed from the final rendered message.

```handlebars
{{! This is a comment }}
{{!
This is a
multi-line comment
}}
```

## Raw strings

To display raw values without HTML escaping (for example, URLs, or HTTP responses in code blocks), use triple curly braces:

```handlebars
{{{my_var}}}
```

<div class="alert alert-info">Certain messaging integrations (such as Google) require triple braces <code>&#123;&#123;&#123;</code> around template variables to ensure proper formatting when the message is displayed. For example, you can use <code>&#123;&#123;&#123;synthetics.attributes.result.failure.message&#125;&#125;&#125;</code>.</div>

### Human-readable formatting

**Note**: All durations are in milliseconds.

- **Durations:**

  ```handlebars
  {{eval "synthetics.attributes.result.duration/1000"}}
  ```

- **Data Sizes:**

  ```handlebars
  {{eval "humanize_bytes(bodySize)"}}
  ```

## Conditions

<div class="alert alert-info">Use <code>#if</code>, <code>#is_match</code>, and <code>#is_exact_match</code> for logic-based rendering.</div>

#### Boolean check:

```handlebars
{{#if synthetics.attributes.variable.config.CONFIG_VAR.secure}}
  The CONFIG_VAR variable is obfuscated
{{else}}
  The CONFIG_VAR variable isn't obfuscated
{{/if}}
```

### Conditional alerting based on step ID

```handlebars
{{!
This alert uses the variable shortcut object `{{synthetics.failed_step}}` to match the step id. If the step id matches, notify the relevant recipient.
}}
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

### Use local variables in a notification

```handlebars
{{!
The test is configured with three local variables.
The names of the variables are: APP_NAME, APP_URL, and APP_ENVIRONMENT.
The value of the variable can be accessed by passing its name in the config field like `{{synthetics.attributes.result.variables.config[<variable-name>].value}}`
}}
Application: {{synthetics.attributes.result.variables.config[APP_NAME].value}}
URL Tested: {{synthetics.attributes.result.variables.config[APP_URL].value}}
Environment: {{synthetics.attributes.result.variables.config[APP_ENVIRONMENT].value}}
```

### Loop through the steps of a multistep API test

```handlebars
{{! Print out the details of each step }}
{{#each synthetics.attributes.result.steps}}
Step name: {{name}}
Step status: {{status}}
Step type: {{type}}

  {{! Within each step, print out the details of the extracted variable }}
  {{#each variables.extracted}}
    Extracted variable name: {{ name }}
    Extracted variable value: {{ val }}
  {{/each}}

{{/each}}
```

### Loop through the steps of a browser test
```handlebars
{{! Print out the details of each step }}
{{#each synthetics.attributes.result.steps}}

Step name: {{description}}
Step status: {{status}}
Step type: {{type}}

  {{! Print out the details of the extracted variable step }}
  {{#is_match "type" "extractVariable"}}
    Extracted variable name: {{ extractedValue.name }}
    Extracted variable value: {{ extractedValue.value }}
  {{/is_match}}

{{/each}}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
