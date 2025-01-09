---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-extend-struct-new
- /static_analysis/rules/ruby-best-practices/no-extend-struct-new
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-extend-struct-new
  language: Ruby
  severity: Notice
  severity_rank: 3
title: You should not inherit from Struct.new
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-extend-struct-new`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule, "You should not inherit from `Struct.new`", is important because it can lead to unexpected behavior and bugs in your code. `Struct.new` creates a new Class, and if you inherit from it, you're creating a subclass of a dynamically generated Class. This can lead to confusing code and can make debugging difficult.

Instead of inheriting from `Struct.new`, you should assign the result of `Struct.new` to a constant. This will create a new Class with the provided attributes, and you can add methods to it just like any other Class. This approach is clearer and less prone to errors.

To avoid this, use `Struct.new` to create a new class and assign it to a constant. For example, `Foo = Struct.new(:foo, :bar)` creates a new Class with two attributes, `foo` and `bar`, and assigns it to the constant `Foo`. This is a far safer and more predictable way to use `Struct.new` in your code.

## Non-Compliant Code Examples
```ruby
class Foo < Struct.new(:foo, :bar)
end

class Foo < Struct.new(:foo, :bar)
  def thing
  end
end

```

## Compliant Code Examples
```ruby
Foo = Struct.new(:foo, :bar)

```
