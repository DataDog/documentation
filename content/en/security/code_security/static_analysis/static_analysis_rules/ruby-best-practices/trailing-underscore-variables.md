---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/trailing-underscore-variables
- /static_analysis/rules/ruby-best-practices/trailing-underscore-variables
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/trailing-underscore-variables
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Do not use trailing underscores in destructuring assignments
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/trailing-underscore-variables`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule of not using trailing underscores in destructuring assignments in Ruby is important for the readability and maintainability of your code. Destructuring assignments are a powerful feature of Ruby that allow you to assign multiple variables at once from an array or hash. However, using trailing underscores can make your code more difficult to read and understand, as it's not immediately clear what the underscores represent.

Trailing underscores are often used to indicate unused variables in destructuring assignments. While this can be useful in some cases, it can also lead to confusion and errors if used improperly. In addition, it can make your code harder to debug and maintain in the long run.

To avoid this, always use descriptive variable names in your destructuring assignments, even if they're not being used. If you have variables that you don't need, consider refactoring your code to eliminate them. Additionally, you can use the `_` character for a single unused variable, but avoid using it multiple times in the same assignment. This will make your code more readable and easier to maintain.

## Non-Compliant Code Examples
```ruby
one, two, _ = [1, 2, 3, 4, 5]
one, _, _ = [1, 2, 3, 4, 5]
one, *_ = [1, 2, 3, 4, 5]
one, _, *_ = [1, 2, 3, 4, 5]
one, *_, _ = [1, 2, 3, 4, 5]
_, two, _ = [1, 2, 3, 4, 5]
_, _ = [1, 2, 3, 4, 5]

```

## Compliant Code Examples
```ruby
one = [1, 2, 3, 4, 5]
one, two = [1, 2, 3, 4, 5]
one, _, three = [1, 2, 3, 4, 5]
one, *_, five = [1, 2, 3, 4, 5]
_, two = [1, 2, 3, 4, 5]
_ = [1, 2, 3, 4, 5]

*one_to_four, _ = [1, 2, 3, 4, 5]
*one_to_three, four, _ = [1, 2, 3, 4, 5]
one, *two_to_four, _ = [1, 2, 3, 4, 5]

one, _two = [1, 2, 3, 4, 5]
one, _two, = [1, 2, 3, 4, 5]
one, *_rest = [1, 2, 3, 4, 5]

```
