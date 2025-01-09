---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-double-negation
- /static_analysis/rules/ruby-best-practices/no-double-negation
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-double-negation
  language: Ruby
  severity: Info
  severity_rank: 4
title: Avoid unnecessary uses of `!!`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-double-negation`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The `!!` operator in Ruby is often used to convert a value to a boolean. However, this operator can be overused and lead to unnecessary complexity in your code. In many cases, the `!!` operator is not needed because Ruby already treats `nil` and `false` as falsy values, and everything else as truthy. 

Overuse of the `!!` operator can make the code harder to read and understand. It can also potentially introduce bugs if used incorrectly. For example, `!!` before a variable that could be `nil` can lead to unexpected `NoMethodError` exceptions. 

To avoid this, only use the `!!` operator when you specifically need to convert a non-boolean value to a boolean. If you're just using it in an `if` condition or similar, you can often omit it. For example, instead of writing `if !!user`, you can write `if user`. Remember, clear and simple code is often the most effective.

## Non-Compliant Code Examples
```ruby
def my_method
  do_something if !!foo

  var = 'foo'
  if !!var
    # body omitted
  end
end
```

## Compliant Code Examples
```ruby
class Foo
  def logged_in?
    !!@active_user
  end
end

```
