---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/while-with-negatives
- /static_analysis/rules/ruby-best-practices/while-with-negatives
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/while-with-negatives
  language: Ruby
  severity: Info
  severity_rank: 4
title: Prefer until over while for negative conditions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/while-with-negatives`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The rule "Prefer until over while for negative conditions" suggests that, when writing loops in Ruby, we should use `until` instead of `while` for negative conditions. This is because `until` is more readable and intuitive when dealing with negative conditions. It allows the code to be more easily understood by other developers, which is crucial for maintaining clean and efficient code.

The importance of this rule lies in the readability and maintainability of the code. Using `until` for negative conditions makes the code more straightforward and self-explanatory. It reduces the cognitive load required to understand the code, making it easier for other developers to maintain and modify the code in the future.

To follow this rule, you need to replace `while` with `until` when dealing with negative conditions. For example, instead of writing `perform_work while !is_weekend`, you should write `perform_work until is_weekend`. This change improves the readability of the code without affecting its functionality.

## Non-Compliant Code Examples
```ruby
perform_work while !is_weekend
```

## Compliant Code Examples
```ruby
perform_work until is_weekend
```
