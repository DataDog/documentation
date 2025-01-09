---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/super-with-args
- /static_analysis/rules/ruby-code-style/super-with-args
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Code Style
  id: ruby-code-style/super-with-args
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use parentheses with 'super' with arguments
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/super-with-args`

**Language:** Ruby

**Severity:** Notice

**Category:** Code Style

## Description
The 'super' keyword in Ruby is used to call methods of the same name in the superclass. When using 'super' with arguments, it is important to use parentheses. This is because 'super' without parentheses will pass all arguments from the current method to the superclass method, which can lead to unexpected behavior if the superclass method doesn't expect these extra arguments.

Ensuring that parentheses are used with 'super' when passing arguments improves code readability and reduces the chance of bugs due to unexpected argument passing. This is especially important in large codebases where the superclass method may be defined in a different file or module, and thus it may not be immediately clear what arguments it expects.

To avoid violating this rule, always use parentheses when passing arguments to 'super'. For example, instead of writing `super color`, write `super(color)`. This makes it explicit what arguments are being passed to the superclass method and helps prevent bugs.

## Non-Compliant Code Examples
```ruby
def describe(color)
  super color
end

def describe(color)
  super color, "triangle"
end

```

## Compliant Code Examples
```ruby
def name
  super
end

def name
  super()
end

def describe(color)
  super(color)
end

def describe(color)
  super(color, "triangle")
end

```
