---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/method-parens
- /static_analysis/rules/ruby-code-style/method-parens
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Code Style
  id: ruby-code-style/method-parens
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid parentheses for methods without arguments
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/method-parens`

**Language:** Ruby

**Severity:** Notice

**Category:** Code Style

## Description
In Ruby, parentheses are not required when defining methods without arguments. The rule "Avoid parentheses for methods without arguments" encourages this practice, making the code cleaner and more readable. 

This rule is crucial because it promotes consistency and clarity in your code. Ruby is known for its elegant and human-readable syntax, and following this rule maintains that reputation. Using parentheses for methods without arguments can cause unnecessary confusion and clutter in your code.

To adhere to this rule, omit parentheses when defining methods without arguments. For instance, instead of `def method()`, use `def method`. For methods with arguments, continue using parentheses to separate the method name from its arguments, like `def method(arg1, arg2)`. Following this rule will make your Ruby code cleaner and easier to read.

## Non-Compliant Code Examples
```ruby
def emptyparens()
end

def noparensargs arg1, arg2
end

def singleton.emptyparens()
end

def singleton.noparensargs arg1, arg2
end

module Mod
    def modemptyparens()
    end

    def modnoparensargs arg1, arg2
    end
end

class Clz
    def clzemptyparens()
    end

    def clznoparensargs arg1, arg2
    end
end
```

## Compliant Code Examples
```ruby
def noparens
end

def parensargs(arg1, arg2)
end

def single.noparens
end

def single.parensargs(arg1, arg2)
end

module Mod
    def modnoparens
    end

    def modparensargs(arg1, arg2)
    end
end

class Clz
    def clznoparens
    end

    def clzparensargs(arg1, arg2)
    end
end
```
