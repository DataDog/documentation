---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/sb-append-char
- /static_analysis/rules/java-best-practices/sb-append-char
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/sb-append-char
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not append char as strings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/sb-append-char`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
Do not append a string with single character to a `StringBuffer`. Instead, append a character type. This is better practice and results in better performance. While this is negligible if the operation occurs once, it has performance impact if done at scale.

### Learn More

 - [JavaDoc - StringBuffer](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html)
 - [Benchmark for StringBuffer and append](https://stackoverflow.com/a/34793025)

## Non-Compliant Code Examples
```java
public class Main{
    public static void main(String[] args){
        StringBuffer sb = new StringBuffer();
        sb.append("a");
        sb.append("abc");

        while (true) {
            sb.append("a");
        }

        for (Element e: elements) {
            sb.append("a");
        }

        if (true) {
            sb.append("a");
        } else {
            sb.append("a");
        }
    }
}
```

## Compliant Code Examples
```java
public class Main{
    public static void main(String[] args){
        StringBuffer sb = new StringBuffer();
        sb.append('a');
        sb.append("<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.0//EN\" ");
    }
}
```
