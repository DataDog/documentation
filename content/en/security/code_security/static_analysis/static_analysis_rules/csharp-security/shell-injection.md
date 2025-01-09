---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/shell-injection
- /static_analysis/rules/csharp-security/shell-injection
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/shell-injection
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Prevent shell injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/shell-injection`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
Never build a command to execute manually by concatenating strings. Instead, validate each component of the command to ensure there is no user-input.

#### Learn More

 - [CWE-78: Improper Neutralization of Special Elements used in an OS Command ('OS Command Injection')](https://cwe.mitre.org/data/definitions/78)

## Non-Compliant Code Examples
```csharp
public class Sample
{
    public void myMethod(string myProgram)
    {
        Process p = new Process();
        p.StartInfo.FileName = "path/to/" + myProgram;
        p.Start();
    }
}

public class Runner {
    public static int Run(string cmd, string args, string input) {
        ProcessStartInfo startInfo = new ProcessStartInfo
        {
            WorkingDirectory = Settings.RootDir,
            FileName = cmd,
            Arguments = args,
            UseShellExecute = false,
            RedirectStandardInput = true,
            RedirectStandardError = true,
            RedirectStandardOutput = true,
        };
        using (Process process = new Process())
        {
            process.EnableRaisingEvents = true;
            process.StartInfo = startInfo;
            process.Start();
        }
    }
}
```
