---
aliases:
- /continuous_integration/static_analysis/rules/rails-best-practices/enums
- /static_analysis/rules/rails-best-practices/enums
dependencies: []
disable_edit: true
group_id: rails-best-practices
meta:
  category: Best Practices
  id: rails-best-practices/enums
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using hash syntax for enums
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `rails-best-practices/enums`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
When defining enums in Ruby, it is better to use the hash syntax rather than the array syntax. This is because the hash syntax is more explicit and less error-prone. With the hash syntax, the mapping between the enum keys and their underlying integer values is clearly defined.

This rule is important because when using the array syntax, the integer values are implicitly assigned based on the order of the keys in the array. This can lead to subtle bugs if the order of the keys in the array is changed. For example, if a new key is inserted in the middle of the array, the integer values of the keys that come after it will be shifted, which can cause existing data to be misinterpreted.

To avoid violating this rule, always use the hash syntax when defining enums in Ruby. Specify the integer value for each key explicitly. For example, instead of `enum status: [:pending, :completed]`, write `enum status: {pending: 0, completed: 1}`.

## Non-Compliant Code Examples
```ruby
class Transaction < ApplicationRecord
  enum type: %i[income expense]
  
  enum status: [:pending, :completed]
end
```

## Compliant Code Examples
```ruby
class Transaction < ApplicationRecord
  enum type: {
    income: 0,
    expense: 1
  }
  
  enum status: {
    pending: 0,
    completed: 1
  }
end

```
