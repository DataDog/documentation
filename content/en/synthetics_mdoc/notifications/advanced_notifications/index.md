---
title: Synthetic Monitoring Advanced Notifications
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Notifications >
  Synthetic Monitoring Advanced Notifications
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/notifications/advanced_notifications/index.html
---

# Synthetic Monitoring Advanced Notifications

## Overview{% #overview %}

You can customize Synthetic monitor messages using handlebars templating. The following examples cover advanced techniques such as comments, list access, conditions, and iterations.

**Note:** Always test your syntax directly in the monitor message editor, as template behavior may vary slightly across versions.

## Comments{% #comments %}

Use comments to explain what the template is doing. Comments are removed from the final rendered message.

```handlebars
{{! This is a comment }}
{{!
This is a
multi-line comment
}}
```

## Raw strings{% #raw-strings %}

To display raw values without HTML escaping (for example, URLs, or HTTP responses in code blocks), use triple curly braces:

```handlebars
{{{my_var}}}
```

{% alert level="info" %}
**Note**: Certain messaging integrations (such as Google) require triple braces `{{{` around template variables to ensure proper formatting when the message is displayed. For example, you can use `{{{synthetics.attributes.result.failure.message}}}`.
{% /alert %}

You can loop over lists (like steps or variables) or access items directly:

```handlebars
{{list.2.name}}                {{! third item }}
{{list.-1.status}}            {{! last item }}
{{list[My Complex Name]url}}  {{! use bracket notation for complex keys }}
{{list[My Complex Name]failure.code}}
{{list.abc-def-ghi}}          {{! access via ID (case-insensitive) }}
```

### Human-readable formatting{% #human-readable-formatting %}

**Note**: All durations are in milliseconds.

- **Durations:**

  ```handlebars
  {{eval "synthetics.attributes.result.duration/1000"}}
  ```

- **Data Sizes:**

  ```handlebars
  {{eval "humanize_bytes(bodySize)"}}
  ```

## Conditions{% #conditions %}

{% alert level="info" %}
Use `#if`, `#is_match`, and `#is_exact_match` for logic-based rendering.
{% /alert %}

#### Boolean check:{% #boolean-check %}

```handlebars
{{#if synthetics.attributes.variable.config.CONFIG_VAR.secure}}
  The CONFIG_VAR variable is obfuscated
{{else}}
  The CONFIG_VAR variable isn't obfuscated
{{/if}}
```

### Conditional alerting based on step ID{% #conditional-alerting-based-on-step-id %}

```handlebars
{{#is_exact_match synthetics.failed_step.id "svn-yrx-3xg"}}
  A backend-related step failed!
  @slack-backend-team
{{else}}
  Another step failed, probably Frontend related
  @slack-frontend-team
{{/is_exact_match}}
```

{% alert level="info" %}
Use `#if` over `#is_exact_match` for checking if a variable is empty or unset.
{% /alert %}

### Iteration{% #iteration %}

Use `#each` to loop over dictionaries or lists. You can access:

- `this` → the current item
- `@key` → the current key (for dictionaries)
- `@index`, `@first`, `@last` → loop metadata

#### Dictionary example:{% #dictionary-example %}

```handlebars
{{#each users}}
  # User `{{@key}}`
  Name: {{name}}
  Permissions: {{permissions}}
{{/each}}

Users: {{#each users}}`{{@key}}` ({{name}}){{#unless @last}}, {{/unless}}{{/each}}
```

## Steps loop{% #steps-loop %}

```handlebars
{{#each synthetics.attributes.result.steps}}
* Step name: {{description}}
* Step status: {{status}}
* Step type: {{type}}
{{/each}}
```

## Further Reading{% #further-reading %}

- [Learn how to manage monitors](https://docs.datadoghq.com/monitors/manage/)
- [Learn how to integrate Synthetic monitors with Statuspage](https://docs.datadoghq.com/synthetics/notifications/statuspage/)
