---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/array-coercion
- /static_analysis/rules/ruby-best-practices/array-coercion
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/array-coercion
  language: Ruby
  severity: Notice
  severity_rank: 3
title: ' Use `Array()` to ensure your variable is an array'
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/array-coercion`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Use `Array()` to ensure your variable is an array" is important for ensuring your code behaves as expected, regardless of the type of data it receives. It is common in Ruby to need to iterate through an array of items. However, if the variable is not an array, this can lead to unexpected behavior or errors.

The `Array()` method in Ruby is a Kernel method that converts its argument to an Array. If the argument is already an Array, it returns the argument. If the argument is nil, it returns an empty Array. This can be used to ensure that a variable is an array before trying to iterate over it, preventing potential errors or unexpected behavior.

By using `Array(foos)`, you can ensure that `foos` is an array before you try to iterate over it with `each`. This prevents the need to check if `foos` is an array with `foos.is_a?(Array)` and makes your code cleaner and easier to understand.

## Non-Compliant Code Examples
```ruby
foos = [foos] unless foos.is_a?(Array)
foos.each { |path| do_bar(path) }

# this would always create a new Array instance
[*foos].each { |foo| do_bar(foo) }
```

## Compliant Code Examples
```ruby
Array(foos).each { |foo| do_bar(foo) }
```
