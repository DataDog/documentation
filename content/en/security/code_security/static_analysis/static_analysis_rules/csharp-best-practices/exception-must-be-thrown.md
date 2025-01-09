---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/exception-must-be-thrown
- /static_analysis/rules/csharp-best-practices/exception-must-be-thrown
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/exception-must-be-thrown
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Exceptions must be thrown
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/exception-must-be-thrown`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
Exceptions should be thrown and not just created. An expression such as `new Exception(...)` does not throw the exception. You should use the keyword `throw` to throw the exception`.

#### Learn More

 - [Exceptions in C#](https://learn.microsoft.com/en-us/dotnet/api/system.exception?view=net-8.0)

## Non-Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public void myMethod()
    {
        var a = new MyException("something bad happened");
    }
}

```

## Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public void myMethod()
    {
        var bla = new MyClass("something bad happened");
    }
    public void foo() {
            Formatter formatter = language switch
            {
                SqlLanguage.Sql => new StandardSqlFormatter(),
                SqlLanguage.Tsql => new TSqlFormatter(),
                SqlLanguage.Spark => new SparkSqlFormatter(),
                SqlLanguage.RedShift => new RedshiftFormatter(),
                SqlLanguage.PostgreSql => new PostgreSqlFormatter(),
                SqlLanguage.PlSql => new PlSqlFormatter(),
                SqlLanguage.N1ql => new N1qlFormatter(),
                SqlLanguage.MySql => new MySqlFormatter(),
                SqlLanguage.MariaDb => new MariaDbFormatter(),
                SqlLanguage.Db2 => new Db2Formatter(),
                _ => throw new NotSupportedException(),
            };
    }
}

```

```csharp
using System.Xml;

class MyClass {
    public void myMethod()
    {
        throw new MyException("something bad happened");
    }
}

```
