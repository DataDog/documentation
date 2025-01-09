---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/string-chars
- /static_analysis/rules/ruby-best-practices/string-chars
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/string-chars
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer string chars with empty string
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/string-chars`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule is about preferring the use of the `chars` method over splitting a string with an empty string in Ruby. The `chars` method is a more idiomatic and efficient way to access the individual characters of a string in Ruby. Using `string.split('')` or `string.split(//)` to achieve this is less efficient and can lead to confusion, as the `split` method is typically used to divide a string into substrings based on a delimiter.

The importance of this rule lies in writing clear, efficient, and idiomatic Ruby code. When you use the `chars` method to access individual characters, your intent is clear to other developers who read your code. Additionally, the `chars` method is more efficient than `split('')` or `split(//)`, which can make a difference in performance when dealing with large strings.

To adhere to this rule and practice good coding, use the `chars` method whenever you need to access the individual characters of a string. For example, instead of `string.split('')`, use `string.chars`. If you need to split a string into substrings based on a delimiter, continue to use the `split` method with the appropriate delimiter, such as `string.split(' ')` to split on spaces. By doing so, your code will be more readable, efficient, and idiomatic.

## Non-Compliant Code Examples
```ruby
string.split(//)
string.split('')
string.split("")
```

## Compliant Code Examples
```ruby
string.chars
string.split("hello world")
string.split("hello world", " ")
```
