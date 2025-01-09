---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/isa-over-kindof
- /static_analysis/rules/ruby-best-practices/isa-over-kindof
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/isa-over-kindof
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer is_a? over kind_of?
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/isa-over-kindof`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Prefer `is_a?` over `kind_of?`" suggests to use the method `is_a?` instead of `kind_of?` in your Ruby code. Both `is_a?` and `kind_of?` methods check if an object is an instance of a class or its subclasses. However, `is_a?` is generally preferred due to its clear and concise terminology.

This rule is important for maintaining consistency and readability in your code. Using `is_a?` makes your code more understandable to other developers because its function is immediately apparent from its name. On the other hand, `kind_of?` might lead to confusion as it's not as clear in its function.

To avoid this rule violation, always use the `is_a?` method when you want to check the class of an object. For example, instead of writing `something.kind_of?(Array)`, you should write `something.is_a?(Array)`. This will make your code easier to read and understand, leading to better maintainability and fewer bugs.

## Non-Compliant Code Examples
```ruby
something.kind_of?(Array)
```

## Compliant Code Examples
```ruby
something.is_a?(Array)
```
