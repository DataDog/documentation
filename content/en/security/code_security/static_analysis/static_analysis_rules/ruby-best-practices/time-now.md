---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/time-now
- /static_analysis/rules/ruby-best-practices/time-now
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/time-now
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer `Time.now` over `Time.new`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/time-now`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Prefer `Time.now` over `Time.new`" is a best practice in Ruby programming. `Time.new` without arguments returns the current time but it's less descriptive than `Time.now`. Using `Time.now` helps to improve the readability of your code by explicitly stating that you are getting the current time.

This rule is important because clear and readable code is essential for maintenance and collaboration. When other developers read your code, they should be able to understand it easily. Using `Time.now` instead of `Time.new` for the current time makes your code more self-explanatory.

To avoid this violation, always use `Time.now` when you want to get the current time. Use `Time.new` only when you need to create a time object for a specific date and time. For example, `Time.new(2024, 2, 29, 12, 0, 0, "+00:00")` creates a time object for February 29, 2024, at noon UTC.

## Non-Compliant Code Examples
```ruby
current_time = Time.new
```

## Compliant Code Examples
```ruby
current_time = Time.now
rule_creation_time = Time.new(2024, 2, 29, 12, 0, 0, "+00:00")
```
