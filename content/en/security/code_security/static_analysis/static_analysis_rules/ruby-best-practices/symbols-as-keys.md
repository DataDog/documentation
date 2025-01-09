---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/symbols-as-keys
- /static_analysis/rules/ruby-best-practices/symbols-as-keys
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/symbols-as-keys
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use symbols instead of strings for hash keys
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/symbols-as-keys`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
In Ruby, it is a best practice to use symbols instead of strings as hash keys. This rule emphasizes that it's more efficient and idiomatic to use symbols for this purpose. Symbols are immutable and unique, which makes them ideal for identifying things, whereas strings are mutable and can create multiple objects for the same sequence of characters.

The importance of this rule lies in the performance and memory usage of your Ruby application. Using symbols as hash keys reduces memory usage because they are stored in memory only once during a Ruby process. This can make a significant difference in the efficiency of your application, especially when dealing with large data sets.

To ensure you're following good coding practices, always use symbols for hash keys unless there's a specific reason to use a string. A simple refactoring from `values = { 'foo' => 42, 'bar' => 99, 'baz' => 123 }` to `values = { foo: 42, bar: 99, baz: 123 }` will make your code compliant with this rule. This not only improves your code's performance but also makes it more readable and consistent with Ruby's conventions.

## Non-Compliant Code Examples
```ruby
values = { 'foo' => 42, 'bar' => 99, 'baz' => 123 }
```

## Compliant Code Examples
```ruby
values = { foo: 42, bar: 99, baz: 123 }
```
