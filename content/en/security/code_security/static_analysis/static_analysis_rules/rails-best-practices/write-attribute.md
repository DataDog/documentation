---
aliases:
- /continuous_integration/static_analysis/rules/rails-best-practices/write-attribute
- /static_analysis/rules/rails-best-practices/write-attribute
dependencies: []
disable_edit: true
group_id: rails-best-practices
meta:
  category: Best Practices
  id: rails-best-practices/write-attribute
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using self over write attribute
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `rails-best-practices/write-attribute`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule promotes the use of `self` over the ActiveRecord method `write_attribute`. This rule is important because using `self` to assign attributes is more idiomatic in Ruby and leads to cleaner, more readable code. 

The `write_attribute` method in Rails is not recommended for regular use. It bypasses the normal attribute assignment process, skipping validations and callbacks. This can result in unexpected behavior and difficult-to-debug errors. 

To avoid violating this rule, simply use `self[:attribute] = value` instead of `write_attribute(:attribute, value)`. For example, you can replace `write_attribute(:price, 42)` with `self[:price] = 42`.

## Non-Compliant Code Examples
```ruby
class Product < ApplicationRecord
  def price
    write_attribute(:price, 42)
  end
end

```

## Compliant Code Examples
```ruby
class Product < ApplicationRecord
  def price
    self(:price, 42)
  end
end
```
