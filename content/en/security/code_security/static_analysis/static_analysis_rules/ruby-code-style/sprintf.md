---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/sprintf
- /static_analysis/rules/ruby-code-style/sprintf
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Best Practices
  id: ruby-code-style/sprintf
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer sprintf and form
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/sprintf`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule enforces the use of `sprintf` and `format` over the `%` operator for string formatting in Ruby. This is important because `sprintf` and `format` are more readable and less error-prone than the `%` operator. 

The `%` operator can lead to confusion and bugs, especially when the array to be interpolated contains more items than expected or when it's not clear what type of formatting is being applied.

To avoid this, always use `sprintf` or `format` for string formatting. These methods are more explicit about what formatting is being applied, making the code easier to understand and safer. For example, `sprintf('%d %d', 1, 42)` is preferred over `'%d %d' % [1, 42]`.

## Non-Compliant Code Examples
```ruby
'%d %d' % [1, 42]
```

## Compliant Code Examples
```ruby
sprintf('%d %d', 1, 42)
sprintf('%<foo>d %<bar>d', foo: 1, bar: 42)

format('%d %d', 1, 42)
format('%<foo>d %<bar>d', foo: 1, bar: 42)


```
