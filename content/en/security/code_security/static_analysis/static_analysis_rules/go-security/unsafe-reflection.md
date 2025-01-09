---
aliases:
- /continuous_integration/static_analysis/rules/go-security/unsafe-reflection
- /static_analysis/rules/go-security/unsafe-reflection
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/unsafe-reflection
  language: Go
  severity: Info
  severity_rank: 4
title: Unsafe reflection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/unsafe-reflection`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [470](https://cwe.mitre.org/data/definitions/470.html)

## Description
In Go, unsafe reflection refers to the use of the `reflect` package in combination with the `unsafe` package to modify or access private or unexported fields of a struct. It allows bypassing the normal visibility rules and type safety of Go's language design. Unsafe reflection can be useful in certain situations, but it also comes with significant risks and should be used with caution.

To prevent unsafe reflection and maintain the safety and integrity of your code, you can follow the following practices:

1.  Use Exported Fields: Ensure that the fields you need to access or modify are exported (start with an uppercase letter) and provide appropriate getter and setter methods. By using exported fields and methods, you enforce encapsulation and prevent direct access to private fields.
2.  Restrict Access: Keep private or unexported fields inaccessible from outside packages. This encapsulation helps maintain the integrity of your codebase and prevents unintended modifications.
3.  Avoid `unsafe` Package: Minimize the use of the `unsafe` package, especially when working with reflection. The `unsafe` package removes the safety features of Go and can lead to unpredictable behavior. Instead, try to solve the problem using idiomatic Go constructs whenever possible.
4.  Use Tags for Reflection: When using reflection for serialization or deserialization, consider using struct tags (`reflect` tags) to provide metadata and annotations. This approach allows you to access struct fields without relying on direct access to their memory.
5.  Avoid Untrusted Input: Be cautious when using reflection with user-supplied or untrusted input. Reflection can be a powerful tool, but it can also introduce security vulnerabilities if not used carefully. Validate and sanitize any input before using reflection to avoid potential risks, such as injection attacks.
6.  Code Review and Testing: Review any usage of reflection and unsafe operations carefully. Conduct thorough code reviews and rigorous unit and integration testing to ensure that your code behaves as expected. This can help identify potential issues and validate the correctness and safety of your code.

It is important to note that reflection has its use cases and can provide powerful functionality when used appropriately. However, due to its potential for code complexity and security vulnerabilities, it is advisable to explore alternative solutions and use reflection sparingly.

By following these best practices and understanding the risks associated with unsafe reflection, you can prevent unsafe operations and maintain the safety and integrity of your Go code.

## Non-Compliant Code Examples
```go
import (
    "reflect"
)

func test() {
    something.MethodByName(methodName)
    something.FieldByName(fieldName);
}
```

## Compliant Code Examples
```go
import (
    "reflect"
)

func test() {
    something.MethodByName("method")
    something.FieldByName("field");
}
```
