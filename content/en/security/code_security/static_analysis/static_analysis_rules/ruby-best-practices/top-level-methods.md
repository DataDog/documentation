---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/top-level-methods
- /static_analysis/rules/ruby-best-practices/top-level-methods
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/top-level-methods
  language: Ruby
  severity: Info
  severity_rank: 4
title: Organize methods in modules
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/top-level-methods`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
This rule emphasizes the importance of organizing methods within modules or classes in Ruby. In Ruby, it's considered a best practice to wrap methods within classes or modules. This is because it helps in grouping related methods together, which in turn makes the code easier to understand, maintain, and reuse.

Not adhering to this rule can lead to a disorganized codebase, making it hard for other developers to understand and maintain the code. It can also lead to potential name clashes if a method is defined in the global scope.

To avoid violating this rule, always define your methods within a class or a module. For example, instead of writing `def some_method; end`, you should write `class SomeClass def some_method; end end`. This not only adheres to the rule but also improves the readability and maintainability of your code.

## Non-Compliant Code Examples
```ruby
def some_method; end
```

## Compliant Code Examples
```ruby
class SomeClass
  def some_method; end
end
```
