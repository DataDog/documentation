---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-extend-data-define
- /static_analysis/rules/ruby-best-practices/no-extend-data-define
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-extend-data-define
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Do not extend Data.define
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-extend-data-define`

**Language:** Ruby

**Severity:** Warning

**Category:** Best Practices

## Description
The rule "Do not extend `Data.define`" is an important guideline in Ruby programming. `Data.define` is a method used to define a data type with specified fields, and it returns an anonymous class. Extending this anonymous class can lead to unpredictable behaviors and complications in your code, making it less maintainable and potentially introducing bugs.

It's important because extending `Data.define` can lead to a lack of clarity about the hierarchy and structure of your classes. In addition, this practice can make the code more difficult to read and understand for other developers, thereby reducing the code's maintainability.

Good coding practice dictates that you should avoid extending `Data.define`. Instead, you can assign the result of `Data.define` to a constant, and use this constant where needed in your code. For example, instead of writing `class MyClass < Data.define(:field1, :field2)`, you should write `MyClass = Data.define(:field1, :field2)`. This way, `MyClass` will be a clearly defined data type with the specified fields, and the code will be more readable and maintainable.

## Non-Compliant Code Examples
```ruby
class MyClass < Data.define(:field1, :field2)
end
```

## Compliant Code Examples
```ruby
value = Data.define(:first_name, :last_name)
```
