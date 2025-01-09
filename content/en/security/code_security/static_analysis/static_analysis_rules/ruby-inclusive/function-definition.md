---
aliases:
- /continuous_integration/static_analysis/rules/ruby-inclusive/function-definition
- /static_analysis/rules/ruby-inclusive/function-definition
dependencies: []
disable_edit: true
group_id: ruby-inclusive
meta:
  category: Best Practices
  id: ruby-inclusive/function-definition
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Check method and parameters names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-inclusive/function-definition`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule helps ensure that you adhere to naming conventions that are inclusive, clear, and unambiguous. Instead of using terms like `master` and `slave`, which have offensive connotations, use neutral and descriptive terms like `primary` and `secondary`. Names you choose should be clear, descriptive, and considerate of the diverse backgrounds of those who might read or work with your code.

## Non-Compliant Code Examples
```ruby
def master(slave)
end
```

## Compliant Code Examples
```ruby
def primary(secondary)
end
```
