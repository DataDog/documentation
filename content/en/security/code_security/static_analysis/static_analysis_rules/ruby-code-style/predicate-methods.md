---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/predicate-methods
- /static_analysis/rules/ruby-code-style/predicate-methods
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Code Style
  id: ruby-code-style/predicate-methods
  language: Ruby
  severity: Notice
  severity_rank: 3
title: 'Use predicate methods over explicit comparisons with `==` '
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/predicate-methods`

**Language:** Ruby

**Severity:** Notice

**Category:** Code Style

## Description
The rule 'Use predicate methods over explicit comparisons with `==`' encourages the use of predicate methods in Ruby for cleaner, more idiomatic code. Predicate methods are methods that return a boolean value, and in Ruby, they are typically identified by the question mark at the end of the method name. These methods provide a more expressive and concise way to perform certain checks, such as checking if a number is even, odd, or nil.

This rule is important because it improves the readability and maintainability of the code. It reduces verbosity and makes the intention of the code clearer to other developers. Explicitly comparing values using `==` can sometimes lead to confusion or errors, especially with `nil` checks. 

To avoid violations of this rule, use the built-in predicate methods provided by Ruby whenever possible. For instance, instead of checking if a number is even with `num % 2 == 0`, use the `.even?` method like so: `num.even?`. Similarly, instead of checking if a variable is `nil` with `var == nil`, use the `.nil?` method: `var.nil?`. By following these practices, you can write cleaner and more idiomatic Ruby code.

## Non-Compliant Code Examples
```ruby
if foo % 2 == 0
end

if bar % 2 == 1
end

if baz == nil
end
```

## Compliant Code Examples
```ruby
if foo.even?
end

if bar.odd?
end

if baz.nil?
end

if qux.zero?
end

if quux == 0
end
```
