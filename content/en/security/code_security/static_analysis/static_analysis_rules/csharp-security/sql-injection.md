---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/sql-injection
- /static_analysis/rules/csharp-security/sql-injection
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/sql-injection
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Prevent SQL queries built from strings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/sql-injection`

**Language:** C#

**Severity:** Error

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
Never build SQL queries manually. Always have the query built with parameters and then pass the parameters to the prepared statement.

#### Learn More

 - [CWE-89: Improper Neutralization of Special Elements used in an SQL](https://cwe.mitre.org/data/definitions/89.html)

## Non-Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void doQuery(Int32 userId)
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            SqlCommand command = new SqlCommand("SELECT attr FROM table WHERE id=" + userID, connection);
        }
    }
}

```

```csharp
using System.Xml;

class MyClass {
    public static void goQuery(Int32 userID)
    {
        String query1 = "SELECT attr FROM table WHERE id=" + userID;
    }
}

```

## Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void doQuery(Int32 userID)
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            SqlCommand command = new SqlCommand("SELECT attr FROM table WHERE id=@ID", connection);
            command.Parameters.Add("@ID", SqlDbType.Int);
            command.Parameters["@ID"].Value = userID;
        }
    }
}

```
