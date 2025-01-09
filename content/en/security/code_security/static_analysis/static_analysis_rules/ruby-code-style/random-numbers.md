---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/random-numbers
- /static_analysis/rules/ruby-code-style/random-numbers
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Best Practices
  id: ruby-code-style/random-numbers
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using ranges for random numbers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/random-numbers`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
In Ruby, it's considered a better practice to use ranges when generating random numbers. This rule is important because it promotes the use of more idiomatic Ruby code and enhances readability. Using a range to generate a random number clearly shows the minimum and maximum values, which makes the code easier to understand.

Non-compliant code, such as `rand(42) + 1`, is less clear because it's not immediately obvious what the range of possible values is. This can lead to confusion and potential bugs in the code.

To follow this rule, use a range when generating random numbers. For example, `rand(1..42)` is a much clearer way of generating a random number between 1 and 42. This makes it obvious to anyone reading the code what the range of possible values is, thus improving the readability and maintainability of your code.


## Non-Compliant Code Examples
```ruby
rand(42) + 1
```

## Compliant Code Examples
```ruby
rand(1..42)
```
