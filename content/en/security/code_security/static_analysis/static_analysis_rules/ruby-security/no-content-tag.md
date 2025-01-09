---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/no-content-tag
- /static_analysis/rules/ruby-security/no-content-tag
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/no-content-tag
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Avoid content tag
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/no-content-tag`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
The rule "Avoid content_tag" is crucial in Ruby development as it helps prevent potential cross-site scripting (XSS) attacks. The `content_tag` method in Ruby on Rails can inadvertently expose your application to XSS attacks when user input is directly passed into the method. This is because `content_tag` does not escape HTML content by default, therefore, it can render potentially harmful scripts if the content includes any.

To ensure your Ruby code is secure and compliant, it's highly recommended to use other methods that automatically escape content, such as `safe_join` or `tag`. Instead of using `content_tag(:p, "Unsafe Code!")`, you would use `tag.p("Unsafe Code!")`. Similarly, instead of `content_tag(:div, content_tag(:p, "Hello!"), class: "strong")`, you would use `tag.div(tag.p("Hello!"), class: "strong")`. 

By avoiding the use of `content_tag`, you can protect your application from potential security threats and keep your code safe and robust.

## Non-Compliant Code Examples
```ruby
content_tag(:p, "Unsafe Code!")
content_tag(:div, content_tag(:p, "Hello!"), class: "strong")

```
