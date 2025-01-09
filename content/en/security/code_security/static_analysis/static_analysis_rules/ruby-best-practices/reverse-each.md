---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/reverse-each
- /static_analysis/rules/ruby-best-practices/reverse-each
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/reverse-each
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using reverse_each
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/reverse-each`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Prefer using `reverse_each`" is based on the principle of optimizing your Ruby code for better performance. In Ruby, there are two main methods for iterating over the elements of an array in reverse order: `reverse.each` and `reverse_each`. While the functionality of these two methods is the same, their performance characteristics are different.

The `reverse.each` method creates a new array that is the reverse of the original before performing the iteration. This can lead to unnecessary memory usage, especially for large arrays, and slow down the performance of your code.

On the other hand, the `reverse_each` method does not create a new array. Instead, it starts from the end of the original array and works its way to the beginning, saving memory and enhancing performance.

Therefore, to adhere to good coding practices and ensure optimal performance, it is recommended to use `reverse_each` instead of `reverse.each` when you need to iterate over the elements of an array in reverse order.

## Non-Compliant Code Examples
```ruby
array.reverse.each { }

["foo", "bar"].reverse.each { }
```

## Compliant Code Examples
```ruby
array.reverse_each { }

["foo", "bar"].reverse_each { }
```
