---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/use-warn
- /static_analysis/rules/ruby-best-practices/use-warn
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/use-warn
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using `warn` over `$stderr.puts`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/use-warn`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
In Ruby, it is a good practice to use `warn` instead of `$stderr.puts` for issuing warning messages. The `warn` method is specifically designed for this purpose and its use makes the intention of the code clearer.

The importance of this rule lies in the fact that `warn` and `$stderr.puts` behave differently in certain situations. For example, `warn` will prepend the filename and line number to the warning message, which can be very helpful for debugging. Moreover, `warn` respects the `-W` command-line option for setting warning levels, while `$stderr.puts` does not.

To avoid violating this rule, replace any instances of `$stderr.puts` with `warn` when you want to issue a warning. Remember that the purpose of `$stderr.puts` is to write to the standard error, not to issue warnings. If you want to write to the standard error for reasons other than issuing warnings, `$stderr.puts` is the appropriate method to use.

## Non-Compliant Code Examples
```ruby
$stderr.puts 'foo bar baz'
```

## Compliant Code Examples
```ruby
warn 'foo bar baz'
```
