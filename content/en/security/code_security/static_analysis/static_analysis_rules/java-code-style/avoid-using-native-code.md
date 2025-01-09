---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/avoid-using-native-code
- /static_analysis/rules/java-code-style/avoid-using-native-code
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/avoid-using-native-code
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid using Java native code
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/avoid-using-native-code`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
The calls and use of native code (Java Native Interface - JNI) reduce the portability of your application as it increases your application's reliance on these native methods.

## Non-Compliant Code Examples
```java
public class Foo {
    public Foo() {
        System.loadLibrary("nativelib");
    }

    static {
        System.loadLibrary("nativelib");
    }

    public void foo() throws SecurityException, NoSuchMethodException {
        System.loadLibrary("nativelib");
    }
}
```
