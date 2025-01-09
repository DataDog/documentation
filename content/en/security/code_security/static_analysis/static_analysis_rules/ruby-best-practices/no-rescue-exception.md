---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-rescue-exception
- /static_analysis/rules/ruby-best-practices/no-rescue-exception
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-rescue-exception
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Do not rescue the Exception class
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-rescue-exception`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Do not rescue the Exception class" is a crucial practice in Ruby programming for handling exceptions. The Exception class is the root of Ruby's exception hierarchy, so when you rescue Exception, you're potentially catching and handling severe system errors that Ruby itself is trying to bubble up. These could be fundamental issues like memory overflows and syntax errors, which could cause the program to behave unexpectedly or even crash.

Rescuing the Exception class can lead to major problems in debugging since it can hide the true nature of the error and its source. It makes it harder to pinpoint where and why the error occurred. This can lead to significant delays in identifying and resolving coding issues.

Instead of rescuing the Exception class, it is better to rescue more specific error classes or use `StandardError` which is the superclass for most error types. For instance, if you're expecting possible nil values, use `rescue NoMethodError`. This allows Ruby to handle severe system errors appropriately and ensures that you're only rescuing the errors you expect. This practice makes your code safer, more predictable, and easier to maintain and debug.

## Non-Compliant Code Examples
```ruby
begin
  # The exit will be rescued, so the program won't exit.
  exit
rescue Exception
  # You are here!
end

begin
  # The exit will be rescued, so the program won't exit.
  exit
rescue Exception => e
  # You are still here!
end

```

## Compliant Code Examples
```ruby
begin
  exit
rescue StandardError
  # Not reached
end

begin
  exit
rescue StandardError => e
  # Not reached either
end

begin
  exit
rescue => e
  # Equivalent to the above.
  # Does not rescue Exception, but StandardError.
end

```
