---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/concat-strings
- /static_analysis/rules/ruby-best-practices/concat-strings
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/concat-strings
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid slow string concatenation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/concat-strings`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule to avoid slow string concatenation in Ruby is essential for writing efficient and fast-performing code. String concatenation using the `+=` operator is slower because it creates a new string object every time it's used. This can lead to performance issues, especially in loops or large programs where numerous string concatenations might be happening.

Instead, the `<<` operator, also known as the append operator, should be used for string concatenation in Ruby. The `<<` operator modifies the original string, avoiding the creation of multiple unnecessary string objects. This results in faster execution time and lower memory usage, which is especially beneficial in larger applications or systems with limited resources.

Therefore, good coding practice in Ruby suggests using `<<` for string concatenation instead of `+=`. For instance, `output << "<p>#{text}</p>"` is more efficient than `output += "<p>#{text}</p>"`. Following this rule will help you write cleaner, faster, and more resource-efficient Ruby code.

## Non-Compliant Code Examples
```ruby
output = ''
output += '<h1>Page title</h1>'
output += '<h3>Sub heading</h3>'

texts.each do |text|
  output += "<p>#{text}</p>"
end
```

## Compliant Code Examples
```ruby
output = ''
output << '<h1>Page title</h1>'
output << '<h3>Sub heading</h3>'

texts.each do |text|
  output << "<p>#{text}</p>"
end
```
