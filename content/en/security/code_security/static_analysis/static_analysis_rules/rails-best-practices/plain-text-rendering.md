---
aliases:
- /continuous_integration/static_analysis/rules/rails-best-practices/plain-text-rendering
- /static_analysis/rules/rails-best-practices/plain-text-rendering
dependencies: []
disable_edit: true
group_id: rails-best-practices
meta:
  category: Best Practices
  id: rails-best-practices/plain-text-rendering
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using render plain
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `rails-best-practices/plain-text-rendering`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule enforces the use of `render plain:` syntax in Ruby on Rails applications instead of the `render text:` syntax. This is because `render text:` defaults to rendering the MIME type as `text/html`, which may not always be the desired outcome. On the other hand, `render plain:` explicitly renders the MIME type as `text/plain`.

By using `render plain:`, the developer is being explicit about the MIME type that is being rendered, which can prevent potential issues down the line. It is especially crucial when working with text that should not be interpreted as HTML.

To adhere to this rule, simply replace any instances of `render text:` with `render plain:`. If the content type needs to be specified, it can be done so directly within the `render plain:` call, e.g., `render plain: 'foo', content_type: 'text/plain'`.

## Non-Compliant Code Examples
```ruby
# default MIME of `text/html`
render text: 'foo'

# can simplify with plain
render text: 'bar', content_type: 'text/plain'
```

## Compliant Code Examples
```ruby
render plain: 'foo'
```
