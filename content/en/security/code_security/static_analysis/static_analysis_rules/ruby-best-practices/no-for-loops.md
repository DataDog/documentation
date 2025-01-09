---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-for-loops
- /static_analysis/rules/ruby-best-practices/no-for-loops
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-for-loops
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Prefer using iterators over for loops
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-for-loops`

**Language:** Ruby

**Severity:** Warning

**Category:** Best Practices

## Description
In Ruby, it is generally preferred to use iterators, such as `each`, `map`, `select`, and others, over traditional `for` loops. This rule is important because iterators are more idiomatic in Ruby and often lead to more concise and readable code. They allow for better encapsulation and scoping, reducing the risk of variable leakage and unexpected side effects. 

`for` loops, on the other hand, don’t have their own scope for local variables, which can lead to bugs and make the code harder to understand. Therefore, using iterators can make your code safer and easier to maintain.

To comply with this rule, you should replace `for` loops with equivalent iterator methods whenever possible. For example, instead of using `for elem in arr do`, you can use `arr.each do |elem|`. This way, you can maintain the same functionality while adhering to Ruby’s best practices and enhancing your code's readability and maintainability.

## Non-Compliant Code Examples
```ruby
class NonCompliant
  def method()
    arr = ['foo', 'bar', 'baz']
    for elem in arr do
      puts elem
    end
  end
end
```

## Compliant Code Examples
```ruby
arr.each do |elem|
  puts elem
end

class Compliant
  def method()
    arr = ['foo', 'bar', 'baz']

    arr.each do
      puts elem
    end

    arr.each { |elem| puts elem }
  end
end
```
