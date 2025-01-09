---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/method-definition-colon
- /static_analysis/rules/ruby-best-practices/method-definition-colon
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/method-definition-colon
  language: Ruby
  severity: Info
  severity_rank: 4
title: 'Do not use :: to define class methods'
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/method-definition-colon`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
This rule refers to the naming convention of class methods in Ruby. It emphasizes not using the string '::' to define class methods. This is because it's not a valid method name in Ruby and will result in a syntax error. 

Using standard naming conventions is crucial for code readability and maintainability. It's important to name methods in a clear and descriptive way, following the standards of the Ruby community. Using a string like '::' as a method name is not meaningful, descriptive, or standard.

To avoid this rule violation, always define class methods by using the 'self' keyword followed by a meaningful method name. For instance, `def self.my_method` is a standard way to define a class method in Ruby. This approach not only makes the code more readable but also helps other developers understand the purpose of the method easily.

## Non-Compliant Code Examples
```ruby
class TestClass
  def self::my_method
  end
end

```

## Compliant Code Examples
```ruby
class TestClass
  def self.my_method
  end
end

```
