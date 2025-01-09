---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-then
- /static_analysis/rules/ruby-best-practices/no-then
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-then
  language: Ruby
  severity: Notice
  severity_rank: 3
title: 'Do not use `then` for multi-line if/unless/when/in '
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-then`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The `then` keyword is not necessary in multi-line `if/unless/when/in` statements in Ruby. When used in multi-line statements, it can make the code harder to read and understand. This is because `then` is typically associated with single-line conditional statements in Ruby, and its use in multi-line statements can be confusing.

Maintaining readability and clarity in your code is crucial for effective collaboration and debugging. It becomes even more important in larger codebases, where complex logic can become difficult to follow if not written clearly. 

To avoid this issue, omit the `then` keyword in your multi-line `if/unless/when/in` statements. For single-line `if/unless/when/in` statements, using `then` is acceptable and can help improve readability. This practice keeps your code clean and easy to understand, following the principles of good coding practices.

## Non-Compliant Code Examples
```ruby
if condition then
  do_something
end

case expression
when condition then
  do_something
end

case expression
in pattern then
  do_something
end

```

## Compliant Code Examples
```ruby
if condition
  do_something()
end

case expression
when condition
  do_something()
end

case expression
in pattern
  do_something()
end

if condition then do_something end

```
