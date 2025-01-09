---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/rails-avoid-raw
- /static_analysis/rules/ruby-security/rails-avoid-raw
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/rails-avoid-raw
  language: Ruby
  severity: Info
  severity_rank: 4
title: Avoid raw, which leads to XSS
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/rails-avoid-raw`

**Language:** Ruby

**Severity:** Info

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
The `raw` method in Ruby on Rails is used to output unescaped strings of text directly to the HTML. This method can lead to Cross-Site Scripting (XSS) vulnerabilities if user input is passed into it, as it allows for the execution of malicious scripts.

XSS attacks can lead to a variety of security problems, such as data theft, website defacement, and distribution of malware to users. As such, it's crucial to prevent these vulnerabilities in your code.

To avoid this, instead of using `raw`, consider using the `html_safe` method on strings that you know are safe, or the `sanitize` method on strings that may contain user input. Both of these methods will ensure that any potentially harmful scripts in the string are properly escaped before being output to the HTML. For example, instead of using `raw(my_variable)`, you could use `sanitize(my_variable)`.

#### Learn More

 - [Prevent XSS with Ruby on Rails](https://www.invicti.com/blog/web-security/preventing-xss-ruby-on-rails-web-applications/)

## Non-Compliant Code Examples
```ruby
raw(my_variable)
anotherraw(my_variable)
```
