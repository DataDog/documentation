---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/hash-each
- /static_analysis/rules/ruby-best-practices/hash-each
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/hash-each
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using hash each_key and each_value
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/hash-each`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Prefer using hash each_key and each_value" recommends using the specific iterator methods `each_key` and `each_value` when iterating over the keys or values of a hash. It is considered a best practice in Ruby to use these methods instead of the more general `each` method followed by `keys` or `values`.

This rule is important because it helps to improve the readability and clarity of your code. When you use `each_key` or `each_value`, it's immediately clear that you're working with either the keys or the values of the hash. This makes your code easier to understand and maintain.

To follow this rule, you should replace any instances of `hash.keys.each` with `hash.each_key`, and `hash.values.each` with `hash.each_value`. This will make your code more idiomatic and easier to read, while still achieving the same functionality.

## Non-Compliant Code Examples
```ruby
# Updates the method
hash.keys.each { |k| p k }
hash.keys.each do |k| p k end

hash.values.each { |v| p v }
hash.values.each do |v| p v end

# Updates the method and parameters
hash.each { |k, _v| p k }
hash.each do |k, _v| p k end

hash.each { |_k, v| p v }
hash.each do |_k, v| p v end
```

## Compliant Code Examples
```ruby
hash.each_key { |k| p k }
hash.each_value { |v| p v }
```
