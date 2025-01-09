---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/optional-arguments
- /static_analysis/rules/ruby-best-practices/optional-arguments
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/optional-arguments
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Optional arguments should appear at the end
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/optional-arguments`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Optional arguments should appear at the end" is an important programming practice in Ruby. It is used to ensure that the optional parameters in a method definition are placed after the required parameters. This rule is important because when a method is called, Ruby fills in the arguments from left to right. If an optional argument is placed before a required argument and the method is called with fewer arguments, Ruby will assign the provided arguments to the optional parameters, leaving the required parameters without values and causing an error.

Non-compliance with this rule often leads to unexpected behavior or bugs in the code, which can be quite challenging to debug. This is particularly true when the method is called with fewer arguments than defined. The errors caused by this can be hard to track down, as they may not occur at the place where the method is defined, but rather in some distant place where the method is called.

To avoid this, always place optional parameters at the end of the list of parameters in your method definitions. This way, Ruby will fill in the required parameters first, and only then use any remaining arguments for the optional ones. If there are no remaining arguments, the optional parameters will be set to their default values. This keeps your code clear, predictable, and free of unnecessary bugs.

## Non-Compliant Code Examples
```ruby
def method(a = 1, b = 2, c)
  return
end

def method(a = 1, b, c = 2)
  return
end

def method(*a, b)
  return
end

def method(a, *b, c = 1)
  return
end

```

## Compliant Code Examples
```ruby
def method(a, b, c)
  return
end

def method(a, b = 1, c = 2)
  return
end

def method(a, *b)
  return
end

def method(a, b = 1, *c)
  return
end

```
