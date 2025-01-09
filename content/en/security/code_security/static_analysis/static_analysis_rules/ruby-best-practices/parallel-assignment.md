---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/parallel-assignment
- /static_analysis/rules/ruby-best-practices/parallel-assignment
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/parallel-assignment
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Do not use parallel assignment to define variables
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/parallel-assignment`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Do not use parallel assignment to define variables" is a guideline that encourages developers to avoid assigning multiple variables in a single line. This practice is often referred to as "parallel assignment" or "multiple assignment". 

Parallel assignment can lead to code that is difficult to read and understand, especially when complex expressions are involved. It can also lead to unexpected results if the order of evaluation is not clear. 

To adhere to this rule, you should assign each variable individually, on its own line. This makes your code more readable and maintainable. For example, instead of writing `a, b = 1, 2`, you should write `a = 1` and `b = 2` on separate lines. However, there are exceptions to this rule. Parallel assignment is acceptable when swapping two variables, when assigning the return values of a method, or when using the splat operator to assign multiple values to a single variable.

## Non-Compliant Code Examples
```ruby
# Parallel assignments of literal values.
t, f, n = true, false, nil
i, f, c, r = 123, 1.0, 1i, 2.0r
s, d, i, h = 'uno', "dos", "tres#{cuatro}cinco", <<HERE
seis
HERE
s, i = :foo, :"bar#{baz}"
r1, r2 = /cuatro/, /cinco#{seis}/im


```

## Compliant Code Examples
```ruby
# Single assignments of literal values.
t = true
f = false
i = 123
s = "dos"
i = :"bar#{baz}"
r = /cuatro/im

# Variable swap
a = 123
b = 456
a, b = b, a

# method return
def multi
  [1, 2]
end
first, second = multi

# Splat
first, *rest = [1, 2, 3]
first, *rest = 1, 2, 3

```
