---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/lambda-no-parameter
- /static_analysis/rules/ruby-best-practices/lambda-no-parameter
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/lambda-no-parameter
  language: Ruby
  severity: Info
  severity_rank: 4
title: Omit parentheses if a lambda has no parameter
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/lambda-no-parameter`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
In Ruby, lambda is a function object that is created with the `->` operator. The rule states that if a lambda function does not take any parameters, parentheses should be omitted. This is due to the Ruby style guide, which promotes cleaner and more readable code. 

This rule is important because consistency in coding style makes the code easier to understand and maintain. Unnecessary parentheses can add clutter to the code and may lead to confusion. By omitting parentheses in lambdas with no parameters, the code becomes more streamlined and readable. 

To adhere to this rule, write your lambda without parentheses if it doesn't require any parameters. For example, instead of writing `->() { something }`, you should write `-> { something }`. This makes it clear that the lambda takes no arguments, and helps maintain a consistent and clean coding style.

## Non-Compliant Code Examples
```ruby
l = ->() { something }
```

## Compliant Code Examples
```ruby
l = -> { something }
```
