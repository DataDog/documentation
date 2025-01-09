---
aliases:
- /continuous_integration/static_analysis/rules/java-security/json-unsafe-deserialization
- /static_analysis/rules/java-security/json-unsafe-deserialization
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/json-unsafe-deserialization
  language: Java
  severity: Error
  severity_rank: 1
title: Avoid unsafe deserialization
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/json-unsafe-deserialization`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [502](https://cwe.mitre.org/data/definitions/502.html)

## Description
Deserialization of untrusted data can lead to undesired code execution. Use `activateDefaultTyping` to prevent deserialization into random classes.

#### Learn More

 - [ObjectMapper JavaDoc](https://javadoc.io/doc/com.fasterxml.jackson.core/jackson-databind/2.9.8/com/fasterxml/jackson/databind/ObjectMapper.html)

## Non-Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        ObjectMapper mapper = new ObjectMapper();
        oneFunction();
        oneFunction();
        mapper.readValue(json, ABean.class);
        foo.var();
        anotherFunction();
    }
}
```

## Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        ObjectMapper mapper = new ObjectMapper();
        oneFunction();
        mapper.enableDefaultTyping();
        anotherFunction();
        mapper.readValue(json, ABean.class);
    }
}
```
