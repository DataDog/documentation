---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-begin-blocks
- /static_analysis/rules/ruby-best-practices/no-begin-blocks
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-begin-blocks
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid using BEGIN blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-begin-blocks`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The `BEGIN` blocks in Ruby are used to specify pieces of code that should be run before the program is run. These blocks are usually executed before any other code in the current file.

Although `BEGIN` blocks can be useful in certain situations, they can also lead to code that is harder to understand and maintain. This is because `BEGIN` blocks can create unexpected side effects, especially when they are used in larger codebases where they can be easily overlooked.

To avoid using `BEGIN` blocks, you can often move the code to the top of the file, or into a method or function that is explicitly called. This makes the code more explicit, easier to read, and less prone to unexpected side effects. If you need to perform setup steps before running your code, consider using a setup method or function instead.

## Non-Compliant Code Examples
```ruby
puts("Running")

BEGIN { puts("Beginning")}

my_str = begin
  a = "another "
  b = "block"
  a + b
end
puts(my_str)

```

## Compliant Code Examples
```ruby
puts("Beginning")

puts("Running")

my_str = begin
  a = "another "
  b = "block"
  a + b
end
puts(my_str)

```
