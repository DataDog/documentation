---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/float-division
- /static_analysis/rules/ruby-best-practices/float-division
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/float-division
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use fdiv on two integers float division
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/float-division`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule requires the use of `fdiv` for division of two integers when the desired result is a float. This is important because in Ruby, the division of two integers results in an integer. The use of `fdiv` ensures the result is a float, which can be crucial when precision is required in the calculations. 

Non-compliance to this rule can lead to inaccurate results due to integer division. For example, `5 / 2` would result in `2`, not `2.5` as one might expect. To avoid this, it is recommended to use the `fdiv` method which ensures a float result. For example, calling `5.fdiv(2)` would correctly return `2.5`.

Remember, it's important to understand the behavior of the language you're using and to use its methods appropriately to ensure the accuracy of your calculations. In Ruby, when dealing with division and expecting a float result, use `fdiv` to avoid potential precision loss.

## Non-Compliant Code Examples
```ruby
foo.to_f / bar.to_f
```

## Compliant Code Examples
```ruby
foo.to_f / bar
foo / bar.to_f
foo.fdiv(bar)
```
