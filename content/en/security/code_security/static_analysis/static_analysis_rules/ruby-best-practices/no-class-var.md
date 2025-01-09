---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-class-var
- /static_analysis/rules/ruby-best-practices/no-class-var
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-class-var
  language: Ruby
  severity: Info
  severity_rank: 4
title: Avoid class variables
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-class-var`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The rule "Avoid class variables" refers to the practice of refraining from using class variables (variables starting with '@@') in Ruby. Class variables are shared between a class and all of its descendants, which can lead to unexpected behavior and bugs that are difficult to trace. This is because if a class variable is changed in a subclass, that change will also affect the superclass and all other subclasses. 

This rule is crucial for maintaining clean, predictable, and easy-to-debug code. It also helps to prevent unintentional side effects that can occur when class variables are manipulated in different parts of a program. 

To adhere to this rule, consider using class instance variables or constants instead. Class instance variables belong solely to the class they are defined in, and their value does not get shared with subclasses. Constants, on the other hand, are a good option when the value is not meant to change. For example, in the given non-compliant code, the class variable `@@class_var` could be replaced with a class instance variable `@class_var` or a constant `CLASS_VAR`, depending on the intended use.

## Non-Compliant Code Examples
```ruby
class Parent
    @@class_var = 'parent'
    foo = bar

    def self.print_class_var
        puts @@class_var
    end
end

class Child < Parent
    @@class_var = 'child'
end
```
