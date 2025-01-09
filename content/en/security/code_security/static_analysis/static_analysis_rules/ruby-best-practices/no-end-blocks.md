---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-end-blocks
- /static_analysis/rules/ruby-best-practices/no-end-blocks
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-end-blocks
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid using END blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-end-blocks`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule of avoiding `END` blocks in Ruby is important due to the nature of how such blocks are executed. Unlike `at_exit` blocks, `END` blocks are run whenever the program exits, regardless of whether it's a normal termination or due to an unhandled exception. This can lead to unpredictable behavior and makes debugging more difficult.

The use of `END` blocks also makes your code less readable and harder to maintain. It's not immediately clear when or why these blocks are executed, and they can easily be overlooked when reading through the code. This can lead to unexpected side effects and bugs.

To adhere to this rule, use `at_exit` blocks instead of `END` blocks. This ensures that the block is only executed when the program exits normally, making your code more predictable and easier to debug. Also, consider structuring your code in a way that avoids the need for such blocks in the first place. This will make your code cleaner and easier to understand. For instance, instead of using `END` to perform cleanup tasks, you can use a `begin/rescue/ensure` block or make sure that resources are released as soon as they are no longer needed.

## Non-Compliant Code Examples
```ruby
END { puts("end") }
END {puts("end")}
END {
  puts("end")
}
END
{
  puts("end")
}
END {}

puts("begin")
my_str = begin
  a = "more "
  b = "things"
  a + b
end
puts(my_str)

```

## Compliant Code Examples
```ruby
at_exit { puts("end") }
at_exit {puts("end")}
at_exit {
  puts("end")
}
at_exit
{
  puts("end")
}
at_exit {}

puts("begin")
my_str = begin
  a = "more "
  b = "things"
  a + b
end
puts(my_str)

```
