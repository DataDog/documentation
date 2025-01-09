---
aliases:
- /continuous_integration/static_analysis/rules/rails-best-practices/read-attribute
- /static_analysis/rules/rails-best-practices/read-attribute
dependencies: []
disable_edit: true
group_id: rails-best-practices
meta:
  category: Best Practices
  id: rails-best-practices/read-attribute
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using self over read attribute
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `rails-best-practices/read-attribute`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule encourages the use of `self` instead of `read_attribute` for reading attributes.

`read_attribute` is an older method in Rails, which can make your code harder to read and understand, especially for those who are not familiar with older Rails methods. Using `self` to access the model's attributes makes the code cleaner and easier to read. 

To adhere to this rule, replace instances of `read_attribute(:attribute_name)` with `self[:attribute_name]`. This practice not only improves readability but also ensures your code is consistent with the latest Rails conventions.

## Non-Compliant Code Examples
```ruby
class Product < ApplicationRecord
  def price
    read_attribute(:price) + 42
  end
end

```

## Compliant Code Examples
```ruby
class Product < ApplicationRecord
  def price
    self[:price] + 42
  end
end
```
