---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/global-stdout
- /static_analysis/rules/ruby-best-practices/global-stdout
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/global-stdout
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid standard constants
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/global-stdout`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Avoid standard constants" is important in Ruby development as it encourages the use of global variables over standard constants. In Ruby, standard constants like `STDOUT` and `STDERR` are not as flexible as their global counterparts `$stdout` and `$stderr`. 

The main reason for avoiding standard constants is that they are not interchangeable in the same way that global variables are. This means they are less suited to situations where you might need to redirect output or error streams. For instance, in testing scenarios, you might want to redirect `$stdout` or `$stderr` to a different output stream. 

Fortunately, Ruby provides an easy way to avoid this issue. Instead of using standard constants, you should use global variables. For example, replace `STDOUT` with `$stdout` and `STDERR` with `$stderr`. This allows for greater flexibility in your code and makes it more adaptable to different situations.

## Non-Compliant Code Examples
```ruby
STDOUT.puts('foo')

hash = { out: STDOUT, key: value }

def m(out = STDOUT)
  out.puts('foo')
end
```

## Compliant Code Examples
```ruby
$stdout.puts('foo')

hash = { out: $stdout, key: value }

def m(out = $stdout)
  out.puts('foo')
end
```
