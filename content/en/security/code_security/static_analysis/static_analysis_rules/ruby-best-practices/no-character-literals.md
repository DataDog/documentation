---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-character-literals
- /static_analysis/rules/ruby-best-practices/no-character-literals
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-character-literals
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid using the character literal syntax
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-character-literals`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
In Ruby, character literals are represented by `?` followed by a single character. For instance, `?a` represents the character `a`. While this is a valid Ruby syntax, it's less commonly used and can be confusing for some developers, especially those coming from different programming languages.

The use of character literal syntax can lead to less readable and maintainable code. As a rule of thumb, it's best to prioritize code clarity and readability over the use of lesser-known syntax features. This promotes better understanding of the code, reduces the likelihood of bugs, and facilitates collaboration among team members.

To avoid using character literal syntax, use a string with a single character. For example, instead of `?a` use `"a"`. This approach is more straightforward and is widely accepted in the Ruby community. It's also more consistent with other languages, making your code more intuitive for developers with diverse backgrounds.

## Non-Compliant Code Examples
```ruby
char1 = ?a
char2 = ?z
char3 = ?M
char4 = ?>
char5 = ?_
char6 = ?\\
```

## Compliant Code Examples
```ruby
char1 = "a"
char2 = "z"
char3 = "M"
char4 = ">"
char5 = "_"
char6 = "\\"
```
