---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-rescue-modifier
- /static_analysis/rules/ruby-best-practices/no-rescue-modifier
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-rescue-modifier
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid using 'rescue' as a modifier
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-rescue-modifier`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule emphasizes the importance of not using 'rescue' as a modifier in your code. Using 'rescue' as a modifier can lead to confusion and potential bugs in the code. This is because it can catch exceptions you did not intend to catch and miss the ones you intended to catch. Hence, it's considered a bad practice.

The importance of this rule lies in ensuring the clarity and correctness of your error handling code. When 'rescue' is used as a modifier, it can catch `StandardError` and its subclasses by default. This can lead to unexpected behavior if you intended to catch a different exception.

Good coding practices to avoid this rule violation include explicitly stating the exception you are trying to catch, and using 'rescue' in a begin-end block instead of as a modifier. This makes your code easier to understand and less prone to bugs. For example, instead of writing `foo = a[x] rescue nil`, write:
```ruby
begin
  foo = a[x]
rescue IndexError
  foo = nil
end
```
This way, it's clear that you are trying to rescue `IndexError`, and not any other kind of error.

## Non-Compliant Code Examples
```ruby
foo = a[x] rescue nil

something rescue handle_error

# This is a common mistake: it doesn't capture SomeException.
# It captures StandardError and names the variable `SomeException`.
anything rescue SomeException

```

## Compliant Code Examples
```ruby
try
  foo = a[x]
rescue IndexError
  foo = nil
end

try
  something
rescue StandardError
  handle_error
end
```
