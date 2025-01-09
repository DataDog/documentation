---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/avoid-hash-constructor
- /static_analysis/rules/ruby-best-practices/avoid-hash-constructor
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/avoid-hash-constructor
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use hash literal
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/avoid-hash-constructor`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The "Use hash literal" rule in Ruby encourages the use of hash literals, `{a => b, c => d}`, instead of the `Hash[]` method for creating hashes. This rule is crucial because hash literals are more readable, straightforward, and faster in performance compared to the `Hash[]` method. 

The `Hash[]` method might be less clear to some developers, especially those new to Ruby, because it's not immediately obvious that a hash is being created. Moreover, the `Hash[]` method is slower because it involves method call overhead, which can impact the performance of your application if used extensively.

To adhere to this rule, always use hash literals when creating a new hash. For example, instead of using `Hash[a, b, c, d]`, use `{a => b, c => d}`. Similarly, if you need to convert an array to a hash, instead of using `Hash[ary]`, use `ary.to_h`. This will enhance readability and performance of your code.

## Non-Compliant Code Examples
```ruby
Hash[ary]
Hash[a, b, c, d]
```

## Compliant Code Examples
```ruby
ary.to_h
{a => b, c => d}
```
