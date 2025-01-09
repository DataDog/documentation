---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/unsafe-deserialization
- /static_analysis/rules/ruby-security/unsafe-deserialization
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/unsafe-deserialization
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Do not use unsafe deserialization
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/unsafe-deserialization`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [502](https://cwe.mitre.org/data/definitions/502.html)

## Description
This rule advises against the use of unsafe deserialization in Ruby, particularly with the `Marshal.load` method. Deserialization is the process of converting data from a binary or string format back into an object. However, if the data was tampered with, it could lead to arbitrary code execution when the data is deserialized.

This is important because it can lead to serious security vulnerabilities. An attacker could exploit the deserialization process to execute malicious code, alter program flow, or perform other harmful actions. This is particularly dangerous if your application runs with high privileges.

To avoid this, use safe deserialization methods. Instead of using `Marshal.load`, consider using JSON or YAML for serialization and deserialization, as they are safer. For example, you could use `JSON.parse(data)` or `YAML.load(data)` instead. Additionally, always ensure that the data you are deserializing comes from a trusted source.

## Non-Compliant Code Examples
```ruby
obj = Marshal.load(data)
```
