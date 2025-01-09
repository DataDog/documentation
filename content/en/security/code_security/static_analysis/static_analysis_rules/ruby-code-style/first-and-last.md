---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/first-and-last
- /static_analysis/rules/ruby-code-style/first-and-last
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Code Style
  id: ruby-code-style/first-and-last
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using `first` and `last` to improve readability
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/first-and-last`

**Language:** Ruby

**Severity:** Notice

**Category:** Code Style

## Description
This rule encourages the use of `first` and `last` methods over array indexing to access the first and last elements of an array, respectively. The primary reason behind this rule is to improve code readability. Using `first` and `last` makes it immediately clear that you are accessing the first or last element of the array, which might not be immediately obvious with array indexing, especially for developers who are new to Ruby.

The use of these methods also helps to make your code more idiomatic, which is a crucial aspect of writing effective Ruby code. Idiomatic code is easier to read, understand, and maintain. It also tends to be more efficient, as idioms often reflect patterns that are optimized for the language.

To adhere to this rule, replace the use of array indexing with `first` or `last` methods when you want to access the first and last elements of an array. For instance, instead of `arr[0]` use `arr.first` and instead of `arr[-1]` use `arr.last`. However, note that this rule should be applied only when reading values. When modifying the first or last elements, array indexing should still be used. For example, `arr[0] = 'new_value'` and `arr[-1] = 'new_value'`.

## Non-Compliant Code Examples
```ruby
arr = ["foo", "bar", "baz"]

arr[0]  # => "foo"
arr[-1] # => "baz"
```

## Compliant Code Examples
```ruby
arr = ["foo", "bar", "baz"]

arr.first # => "foo"
arr[1]    # => "bar"
arr.last  # => "baz"

arr[0] = "foooooo"
arr[-1] = "bazzzzz"

value = arr[0, 2]
```
