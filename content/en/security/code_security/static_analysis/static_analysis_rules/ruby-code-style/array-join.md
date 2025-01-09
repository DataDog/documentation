---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/array-join
- /static_analysis/rules/ruby-code-style/array-join
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Code Style
  id: ruby-code-style/array-join
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using Array `join`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/array-join`

**Language:** Ruby

**Severity:** Notice

**Category:** Code Style

## Description
The rule "Prefer using Array `join`" advises the use of the `join` method over the `*` operator when combining elements of an array into a string. This is because the `join` method is specifically designed for this purpose and its use makes the code more readable and self-explanatory.

The importance of this rule lies in code clarity and maintainability. When other developers read your code, the `join` method clearly communicates that you are combining elements of an array into a string. On the other hand, the `*` operator can be confusing because it is also used for multiplication and repetition operations.

To comply with this rule, always use the `join` method when your intention is to combine elements of an array into a string. For example, instead of writing `%w[foo bar baz] * ', '`, write `%w[foo bar baz].join(', ')`. This change makes the code more readable and less prone to misunderstandings.

## Non-Compliant Code Examples
```ruby
%w[foo bar baz] * ', '
# => 'foo, bar, baz'
```

## Compliant Code Examples
```ruby
%w[foo bar baz].join(', ')
# => 'foo, bar, baz'
```
