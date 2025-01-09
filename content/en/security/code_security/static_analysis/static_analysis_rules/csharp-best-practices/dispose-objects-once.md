---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/dispose-objects-once
- /static_analysis/rules/csharp-best-practices/dispose-objects-once
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/dispose-objects-once
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Dispose objects at most once
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/dispose-objects-once`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
From the [documentation](https://learn.microsoft.com/en-us/dotnet/api/system.idisposable.dispose?view=net-8.0&redirectedfrom=MSDN#System_IDisposable_Dispose), the `dispose()` method should be called only once. Additional calls do not have any impact other than potential performance overhead.

## Non-Compliant Code Examples
```csharp
using System.Net;

class MyClass {
    public static void routine()
    {
        Disposable myObject;

        myObject.dispose();
        foo.bar();
        if(foo) {
            something.dispose();
        } else {
            myObject.dispose();
        }
        
    }
}

```

```csharp
using System.Net;

class MyClass {
    public static void routine()
    {
        Disposable myObject;

        myObject.dispose();
        foo.bar();
        myObject.dispose();
    }
}

```

```csharp
using System.Net;

class MyClass {
    public static void routine()
    {
        Disposable myObject;

        myObject.dispose();
        foo.bar();
        if(foo) {
            myObject.dispose();
        }
        
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static void routine()
    {
        Disposable myObject;

        myObject.dispose();
    }
}

```
