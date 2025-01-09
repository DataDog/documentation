---
aliases:
- /continuous_integration/static_analysis/rules/java-security/groovyshell-code-injection
- /static_analysis/rules/java-security/groovyshell-code-injection
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/groovyshell-code-injection
  language: Java
  severity: Warning
  severity_rank: 2
title: Potential code injection when using GroovyShell
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/groovyshell-code-injection`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
An expression for GroovyScript is built with a dynamic value. The source should be checked and filtered to prevent any user-input from the script.

#### Learn More

 - [Potential code injection when using GroovyShell](https://find-sec-bugs.github.io/bugs.htm#GROOVY_SHELL)
 - [Example of Vulnerability](https://github.com/welk1n/exploiting-groovy-in-Java/)

## Non-Compliant Code Examples
```java
class MyClass {

    public void evaluateScript(String script) {
        GroovyShell shell = new GroovyShell();
        shell.evaluate(script);

        foo = shell.evaluate(script);

        shell.evaluate("foo" + script);
        shell.evaluate(script + "foo");
    }
}
```

## Compliant Code Examples
```java
class MyClass {

    public void evaluateScript(String script) {
        GroovyShell shell = new GroovyShell();
        shell.evaluate(checkScript(script));
    }
}
```
