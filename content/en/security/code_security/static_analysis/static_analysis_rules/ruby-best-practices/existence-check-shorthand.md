---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/existence-check-shorthand
- /static_analysis/rules/ruby-best-practices/existence-check-shorthand
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/existence-check-shorthand
  language: Ruby
  severity: Info
  severity_rank: 4
title: Use &&= to check if a variable may exist
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/existence-check-shorthand`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The `&&=` operator in Ruby is a conditional assignment operator that checks if a variable is truthy (not `nil` or `false`). If the variable is truthy, it assigns the value on the right side of the operator to the variable. This rule emphasizes the importance of using this operator to avoid unnecessary checks and potential errors in your code.

It is important to use `&&=` operator to ensure your code is efficient and clean. Using this operator can help to avoid unnecessary conditional checks and keep your code concise. More importantly, it can prevent potential `nil` errors which are common in Ruby when trying to call a method on a `nil` object.

To follow this rule, use `&&=` operator when you need to check if a variable may exist and assign a value to it. For example, instead of doing `if foo; bar = foo.something; end`, you can do `bar &&= foo.something`. This will assign `foo.something` to `bar` only if `bar` is not `nil` or `false`.

## Non-Compliant Code Examples
```ruby
if foo
     bar = foo.something
end

if foo
     bar = foo.something
else
     bar = foo.something_else
end


```

## Compliant Code Examples
```ruby
bar &&= foo.something

if foo
     bar = foo.something
else
     bar = foo.something_else
end


```
