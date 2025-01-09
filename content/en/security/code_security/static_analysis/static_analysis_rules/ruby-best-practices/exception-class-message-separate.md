---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/exception-class-message-separate
- /static_analysis/rules/ruby-best-practices/exception-class-message-separate
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/exception-class-message-separate
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Separate the exception class and the message
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/exception-class-message-separate`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule requires that the exception class and the message be separated in the raise statement. This is important because it makes the code more readable and easier to understand. It also helps to avoid potential syntax errors or unexpected behavior. 

When you combine the exception class and the message into a single object, it can be confusing to other developers who are trying to understand your code. It may not be immediately clear what type of exception is being raised, or what the associated message is. 

To comply with this rule, separate the exception class and the message with a comma when you raise an exception. For example, instead of writing `raise SomeException.new('message')`, you should write `raise SomeException, 'message'`. This makes it clear that you are raising a `SomeException` and that the associated message is 'message'. It also makes your code more consistent with common Ruby coding conventions.

## Non-Compliant Code Examples
```ruby
raise SomeException.new('message')
```

## Compliant Code Examples
```ruby
raise SomeException, 'message'

```
