---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/class-methods
- /static_analysis/rules/ruby-code-style/class-methods
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Best Practices
  id: ruby-code-style/class-methods
  language: Ruby
  severity: Info
  severity_rank: 4
title: Use self to define class methods
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/class-methods`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
In Ruby, it is a good practice to use `self` to define class methods. This is because `self` inside a class or module definition refers to the class or module itself. Thus, when you define a method with `self`, you're actually defining a class method.

Using `self` is important for a couple of reasons. First, it makes your code more readable and easier to understand. When someone else reads your code, they can immediately understand that the method is a class method. Second, it prevents potential conflicts with instance methods that have the same name.

To avoid violations of this rule, always use `self` to define class methods. For example, instead of writing `def ClassName.method_name`, you should write `def self.method_name`. You can also use the `class << self` syntax to define multiple class methods at once. This syntax opens up the class's singleton class, which is where Ruby stores class methods. This can make your code cleaner and more organized, especially when you have many class methods. 

For example:
```ruby
class MyClass
  class << self
    def first_method
      # code
    end

    def second_method
      # code
    end
  end
end
```
In this example, `first_method` and `second_method` are both class methods.

## Non-Compliant Code Examples
```ruby
class TestClass
  def TestClass.some_method
  end
end

```

## Compliant Code Examples
```ruby
class TestClass
  def self.some_other_method
  end
end

```

```ruby
  class << self
    def first_method
    end

    def second_method_etc
    end
  end
```
