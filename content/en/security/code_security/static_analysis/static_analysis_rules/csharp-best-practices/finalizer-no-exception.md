---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/finalizer-no-exception
- /static_analysis/rules/csharp-best-practices/finalizer-no-exception
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/finalizer-no-exception
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid exceptions in finalizers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/finalizer-no-exception`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
Do not throw exceptions in finalizer blocks, as it can terminate the whole process if handled incorrectly.

From the official documentation: _"If [Finalize](https://learn.microsoft.com/en-us/dotnet/api/system.object.finalize?view=net-8.0) or an override of [Finalize](https://learn.microsoft.com/en-us/dotnet/api/system.object.finalize?view=net-8.0) throws an exception, and the runtime is not hosted by an application that overrides the default policy, the runtime terminates the process and no active `try`/`finally` blocks or finalizers are executed"._

#### Learn More

 - [Official Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.object.finalize?view=net-8.0&redirectedfrom=MSDN#System_Object_Finalize)
 - [An Exception Thrown From a Finalizer Will Be Treated as an Unhandled Exception](https://csharp.2000things.com/2012/09/17/672-an-exception-thrown-from-a-finalizer-will-be-treated-as-an-unhandled-exception/)

## Non-Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    ~MyClass()
    {
        if (foo) {
            throw new MyException();
        }
        
    }
}

```

```csharp
using System.Xml;

class MyClass {
    ~MyClass()
    {
        throw new MyException();
    }
}

```
