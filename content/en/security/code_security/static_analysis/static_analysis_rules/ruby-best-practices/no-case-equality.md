---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-case-equality
- /static_analysis/rules/ruby-best-practices/no-case-equality
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-case-equality
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid explicit use of the case equality operator
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-case-equality`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The case equality operator `===` in Ruby is used to test equality within a `when` clause of a `case` statement. However, it's often considered a bad practice to use this operator explicitly outside of a `case` statement. This is because its behavior can be quite unpredictable and confusing, as it behaves differently for different classes.

The use of the `===` operator can lead to code that is harder to read and understand. It's also potentially prone to bugs, as it might not behave as expected with certain objects. Therefore, it's recommended to avoid the explicit use of the `===` operator.

Instead of using the `===` operator, it's better to use more explicit methods that clearly indicate what you're trying to achieve. For example, if you're trying to check if a string matches a regular expression, you can use the `match?` method. If you want to check if an object is an instance of a certain class, you can use the `is_a?` method. These methods are much more clear and straightforward, leading to better, more maintainable code.

## Non-Compliant Code Examples
```ruby
/something/ === some_string
Array === something


```

## Compliant Code Examples
```ruby
some_string.match?(/something/)
something.is_a?(Array)
```
