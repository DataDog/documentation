---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/avoid-syscall
- /static_analysis/rules/ruby-security/avoid-syscall
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/avoid-syscall
  language: Ruby
  severity: Info
  severity_rank: 4
title: Avoid syscall
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/avoid-syscall`

**Language:** Ruby

**Severity:** Info

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
The `syscall` function is a direct interface to the operating system's system calls. This rule is important because using `syscall` can lead to non-portable and difficult to maintain code. Different operating systems have different system calls and different numbers assigned to them. Therefore, the code that uses `syscall` may behave differently on different systems, which can lead to unexpected results and bugs that are hard to track down.

Furthermore, `syscall` is considered to be a low-level interface, which should be avoided in high-level programming languages like Ruby. It bypasses the abstractions that Ruby provides, which can lead to less readable and more error-prone code.

Instead of using `syscall`, use the abstractions that Ruby provides. For example, if you want to write to a file, use Ruby's File class, which provides a high-level, portable interface for file operations. This way, you can ensure that your code is portable and easier to maintain. For instance, you can replace the `syscall` function in the non-compliant code with `File.write('filename', 'hello\n')`.

## Non-Compliant Code Examples
```ruby
# See https://ruby-doc.org/core-2.4.1/Kernel.html
syscall 4, 1, "hello\n", 6   # '4' is write(2) on our box
```
