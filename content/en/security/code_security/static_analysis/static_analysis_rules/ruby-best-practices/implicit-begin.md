---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/implicit-begin
- /static_analysis/rules/ruby-best-practices/implicit-begin
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/implicit-begin
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use the method's implicit 'begin'
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/implicit-begin`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
In Ruby, every method has an implicit `begin...end` block. Therefore, using an explicit `begin...end` block at the beginning of a method is redundant and can lead to unnecessary code complexity. This rule is designed to ensure that your code is as clean and efficient as possible. 

The importance of this rule lies in the practice of writing clean, maintainable, and efficient code. Unnecessary code can lead to confusion for other developers, making the codebase more difficult to understand and maintain. It can also lead to potential bugs or performance issues.

To adhere to this rule, ensure that you do not use an explicit `begin...end` block at the beginning of a method. Instead, you can use the method's implicit `begin` and only use an explicit `begin...end` block when you want to handle exceptions in a specific part of your method. This practice will lead to cleaner and more efficient code.

## Non-Compliant Code Examples
```ruby
def foo
  begin
    a = 1
  end
end

def foo
  begin
    a = 1
  rescue
    a = 2
  end
end

def foo
  begin
    a = 1
  ensure
    a = 2
  end
end

def foo
  begin
    a = 1
  rescue
    a = 2
  ensure
    a = 3
  end
end

```

## Compliant Code Examples
```ruby
def foo
  a = 1
  begin
    a = 2
  rescue
    a = 3
  ensure
    a = 4
  end
end

def foo
  begin
    a = 1
  rescue
    a = 2
  ensure
    a = 3
  end
  a = 4
end

def foo
  a = 1
rescue
  a = 2
ensure
  a = 3
end

```
