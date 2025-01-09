---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/using-idisposable-return
- /static_analysis/rules/csharp-best-practices/using-idisposable-return
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/using-idisposable-return
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Prevents the return of an IDisposable from a using statement
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/using-idisposable-return`

**Language:** C#

**Severity:** Error

**Category:** Best Practices

## Description
In a [using statement](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/using), the acquired IDisposable instance is disposed of when control leaves the block. If this instance is returned from a function, a runtime error will likely occur when the value is read.

## Non-Compliant Code Examples
```csharp
using System.IO;
using System.Text;

class NonCompliant {
    public FileStream Write(string filePath)
    {
        using (FileStream fs = new FileStream(filePath, FileMode.Create))
        {
            var bytes = Encoding.UTF8.GetBytes("foo");
            fs.Write(bytes, 0, bytes.Length);
            return fs;
        }
    }
}
```

## Compliant Code Examples
```csharp
using System.IO;
using System.Text;

class Compliant {
    public FileStream Write(string filePath)
    {
        FileStream fs = new FileStream(filePath, FileMode.Create);
        var bytes = Encoding.UTF8.GetBytes("foo");
        fs.Write(bytes, 0, bytes.Length);
        return fs;
    }
}


```
