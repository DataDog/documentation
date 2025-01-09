---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/yield-self-to-then
- /static_analysis/rules/ruby-code-style/yield-self-to-then
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Best Practices
  id: ruby-code-style/yield-self-to-then
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using then over yield_self
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/yield-self-to-then`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Prefer using `then` over `yield_self`" is a coding practice in Ruby that helps improve code readability and simplicity. In Ruby, both `yield_self` and `then` are used to yield the receiver to a block and return the result. However, as of Ruby 2.6, `then` is the preferred method due to its simplicity and clearer syntax.

The importance of this rule lies in the maintenance and readability of the code. `then` is more intuitive and easier to understand for developers, especially those who are new to Ruby. This can lead to fewer misunderstandings and bugs in the code, and make it easier for developers to read and maintain the code in the future.

To follow this rule, replace any instances of `yield_self` with `then`. For example, instead of writing `foo.yield_self { |x| x.do_something }`, you should write `foo.then { |x| x.do_something }`. Similarly, `"FOO".yield_self { |x| x.downcase }` should be replaced with `"FOO".then { |x| x.downcase }`.

## Non-Compliant Code Examples
```ruby
foo.yield_self { |x| x.do_something }
"FOO".yield_self { |x| x.downcase }
```

## Compliant Code Examples
```ruby
foo.then { |x| x.do_something }
"FOO".then { |x| x.downcase }
```
