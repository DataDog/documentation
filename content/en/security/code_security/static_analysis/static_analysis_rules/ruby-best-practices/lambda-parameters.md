---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/lambda-parameters
- /static_analysis/rules/ruby-best-practices/lambda-parameters
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/lambda-parameters
  language: Ruby
  severity: Info
  severity_rank: 4
title: Ensure lambdas have parenthesis around parameters
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/lambda-parameters`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
This rule ensures that lambdas in your Ruby code have parenthesis around their parameters. Lambdas are anonymous functions that are objects, allowing them to be stored in variables and passed around. The syntax for defining a lambda in Ruby is `->(parameters) { body }`. When the parenthesis around parameters are omitted, it might lead to unexpected behavior and bugs, especially when dealing with multiple parameters.

The importance of this rule lies in its ability to prevent potential confusion and errors that could occur from misinterpretation of the code. It enhances the readability and maintainability of your code. This is especially significant in large codebases where clarity is crucial for efficient collaboration and debugging.

To adhere to this rule, always include parenthesis around the parameters when defining a lambda. For example, instead of writing `l = ->x, y { something(x, y) }`, write it as `l = ->(x, y) { something(x, y) }`. This practice will make your code safer and easier to understand, ultimately leading to better software quality.

## Non-Compliant Code Examples
```ruby
l = ->x, y { something(x, y) }
```

## Compliant Code Examples
```ruby
l = ->(x, y) { something(x, y) }
```
