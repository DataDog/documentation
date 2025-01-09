---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/yaml-load
- /static_analysis/rules/ruby-security/yaml-load
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/yaml-load
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Prevent using YAML functions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/yaml-load`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [502](https://cwe.mitre.org/data/definitions/502.html)

## Description
This rule is designed to prevent the use of YAML functions in Ruby code. YAML functions such as `YAML.load` and `YAML.load_file` can be potentially dangerous as they have the ability to deserialize arbitrary objects, which can lead to code execution vulnerabilities if the input is not trusted. 

Adhering to this rule is important to ensure the security of the application. When untrusted data is deserialized, it can lead to a variety of security exploits, including Remote Code Execution (RCE), which can provide an attacker with complete control over the application. 

To avoid this, use safer methods such as `Psych.safe_load` or `YAML.safe_load` instead. These methods only allow the deserialization of simple, safe types. Additionally, always ensure that the data being deserialized is from a trusted source. By following these good coding practices, you can maintain the security and integrity of your Ruby application.

## Non-Compliant Code Examples
```ruby
YAML.load(data)
YAML.load_file(filename)
```

## Compliant Code Examples
```ruby
Psych.safe_load('--- foo')
YAML.load("something")
```
