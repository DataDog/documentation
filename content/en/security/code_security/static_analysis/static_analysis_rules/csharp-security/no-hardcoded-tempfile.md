---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/no-hardcoded-tempfile
- /static_analysis/rules/csharp-security/no-hardcoded-tempfile
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/no-hardcoded-tempfile
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid temporary hardcoded files
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/no-hardcoded-tempfile`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [377](https://cwe.mitre.org/data/definitions/377.html)

## Description
Never create a temporary file with a hardcoded path. Hardcoded paths may have write permissions for all users, enabling multiple types of attacks (for example, another application can also modify the temporary file and its content and potentially write executable code).

Always make sure temporary files are non deterministic and created programmatically.

#### Learn More

 - [CWE-379: Creation of Temporary File in Directory with Insecure Permissions](https://cwe.mitre.org/data/definitions/379)

## Non-Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void payloadDecode()
    {
        using (var streamWriter = new StreamWriter("%USERPROFILE%\AppData\Local\Temp\f"))
        {
            streamWriter.WriteLine("foobar");
        }
    }
}

```

```csharp
using System.Xml;

class MyClass {
    public static void payloadDecode()
    {
        using (var streamWriter = new StreamWriter("/var/tmp/f"))
        {
            streamWriter.WriteLine("foobar");
        }
    }
}

```

```csharp
using System.Xml;

class MyClass {
    public static void payloadDecode()
    {
        using (var streamWriter = new StreamWriter("/tmp/f"))
        {
            streamWriter.WriteLine("foobar");
        }
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static void payloadDecode()
    {
        // Create the temporary file stream by getting programmatically a temporary path and filename
        var temporaryPath = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());

        // make sure you can create the file with write access
        using var temporaryFileStream = new FileStream(randomPath, FileMode.CreateNew, FileAccess.Write, FileShare.None, 4096, FileOptions.DeleteOnClose);

        using (var streamWriter = new StreamWriter(temporaryFileStream))
        {
            streamWriter.WriteLine("foobar");
        }
    }
}

```
