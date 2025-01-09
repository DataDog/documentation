---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/ranges-or-between
- /static_analysis/rules/ruby-code-style/ranges-or-between
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Code Style
  id: ruby-code-style/ranges-or-between
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer ranges/between over of complex comparisons
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/ranges-or-between`

**Language:** Ruby

**Severity:** Notice

**Category:** Code Style

## Description
The rule "Prefer ranges/between over complex comparisons" advises developers to use the range or `between?` method for comparisons instead of complex conditional statements. This practice increases the readability and clarity of your code. Complex comparisons using logical operators can be difficult to understand and prone to errors.

This rule is important because it promotes cleaner, more efficient, and easier-to-read code. When code is easier to read, it's easier to maintain, debug, and less likely to contain hidden bugs. Using the range or `between?` method is a more concise way to check if a value falls within a specific range.

To adhere to this rule, replace complex comparison statements with the range or `between?` method. For example, instead of writing `foo >= 42 && foo <= 99`, you can write `(42..99).include?(foo)` or `foo.between?(42, 99)`. These alternatives are more straightforward and visually cleaner, making your code easier to understand.

## Non-Compliant Code Examples
```ruby
acceptable_foo if foo >= 42 && foo <= 99
```

## Compliant Code Examples
```ruby
acceptable_foo if (42..99).include?(foo)
acceptable_foo if foo.between?(42, 99)
```
