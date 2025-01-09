---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/percent-i
- /static_analysis/rules/ruby-best-practices/percent-i
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/percent-i
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer `%i` to the literal array syntax
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/percent-i`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Prefer `%i` to the literal array syntax" is a guideline that encourages the use of the `%i` syntax for arrays of symbols. This is a part of the Ruby style guide that aims to promote conciseness and readability.

Symbols are immutable, reusable objects often used in Ruby instead of strings when the value does not need to be changed. When declaring an array of symbols, using the `%i` syntax can make your code cleaner and easier to read. 

To adhere to this rule, instead of declaring an array of symbols using the literal array syntax like `[:foo, :bar, :baz]`, use the `%i` syntax like `%i[foo bar baz]`. It's a good practice to consistently use `%i` for arrays of symbols as it enhances code readability and maintainability.

## Non-Compliant Code Examples
```ruby
VALUES = [:foo, :bar, :baz]
```

## Compliant Code Examples
```ruby
VALUES = %i[foo bar baz]

```
