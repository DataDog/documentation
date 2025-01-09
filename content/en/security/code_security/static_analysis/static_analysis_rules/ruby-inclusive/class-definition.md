---
aliases:
- /continuous_integration/static_analysis/rules/ruby-inclusive/class-definition
- /static_analysis/rules/ruby-inclusive/class-definition
dependencies: []
disable_edit: true
group_id: ruby-inclusive
meta:
  category: Best Practices
  id: ruby-inclusive/class-definition
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Check class names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-inclusive/class-definition`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
In Ruby, class names should be meaningful and concise, and follow the naming conventions. Avoid using terms that might be considered offensive, derogatory, or otherwise inappropriate. Instead, use terminology that accurately represents the functionality or role of the class.

For instance, instead of using `MasterClass`, consider using `PrimaryClass`, `MainClass`, or another appropriate term that doesn't have potentially negative connotations.

## Non-Compliant Code Examples
```ruby
class MasterClass
    def my_method
    end
end
```

## Compliant Code Examples
```ruby
class PrimaryClass
    def my_method
    end
end
```
