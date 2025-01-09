---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/no-eval
- /static_analysis/rules/ruby-security/no-eval
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/no-eval
  language: Ruby
  severity: Info
  severity_rank: 4
title: Avoid use of eval
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/no-eval`

**Language:** Ruby

**Severity:** Info

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
The `eval` method in Ruby is used to execute a string of code at runtime, essentially treating it as a part of the program. While powerful, it exposes your code to significant security risks, as it can execute any code it's given. This includes potentially harmful code that can alter or delete data, or interact with the system on which your Ruby program is running.

The use of `eval` is considered a bad practice because it can lead to code injection attacks. An attacker can inject malicious code into the string that `eval` will execute. This can lead to a variety of security vulnerabilities, such as unauthorized access to sensitive data, corruption of data, or even taking control of the entire system.

Instead of using `eval`, consider using safer alternatives like `send` or `public_send`. These methods allow you to call methods dynamically on objects without the security risks associated with `eval`. If you need to execute dynamically generated code, consider using the `RubyVM::InstructionSequence` class, which can compile and execute code in a safer manner. Always validate and sanitize any user input that will be used in these methods to prevent code injection attacks.

## Non-Compliant Code Examples
```ruby
Array.class_eval(something)
Something.module_eval(b)
eval(b)
eval(b,bindings)
eval(foo,b)
eval(foo)
RubyVM::InstructionSequence.compile(foo).eval
```

## Compliant Code Examples
```ruby
eval("something")
RubyVM::InstructionSequence.compile("foo")
```
