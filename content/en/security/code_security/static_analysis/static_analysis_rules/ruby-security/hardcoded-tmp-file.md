---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/hardcoded-tmp-file
- /static_analysis/rules/ruby-security/hardcoded-tmp-file
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/hardcoded-tmp-file
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Avoid hardcoded temp files
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/hardcoded-tmp-file`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [379](https://cwe.mitre.org/data/definitions/379.html)

## Description
The rule of avoiding hardcoded temp files is crucial in Ruby development to ensure the security and integrity of your code. Hardcoded temp files can expose your application to several potential risks such as unauthorized file access, data corruption, or even data loss.

This is particularly important in a multi-user environment where multiple processes might try to read or write to the same file, leading to race conditions. Hardcoding temp files also disregard the system's temp directory, which could be problematic if the system lacks the necessary permissions or space in the specified location.

To avoid this, use Ruby's `Tempfile` class or `Dir.mktmpdir` method which automatically handle the creation and cleanup of temporary files/directories in a safe manner. For instance, instead of `File.write("/tmp/myfile.txt", "foobar")`, you can use `Tempfile.create` to create a temporary file. This ensures your application is more secure, reliable, and portable across different operating systems.

## Non-Compliant Code Examples
```ruby
File.write("/tmp/myfile.txt", "foobar")

```
