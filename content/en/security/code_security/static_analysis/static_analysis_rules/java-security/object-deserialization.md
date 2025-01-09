---
aliases:
- /continuous_integration/static_analysis/rules/java-security/object-deserialization
- /static_analysis/rules/java-security/object-deserialization
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/object-deserialization
  language: Java
  severity: Warning
  severity_rank: 2
title: Prevent deserialization
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/object-deserialization`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [502](https://cwe.mitre.org/data/definitions/502.html)

## Description
Deserialization of untrusted data can lead to system compromise. Make sure you only deserialize data you trust.

#### Learn More

 - [CWE-502](https://cwe.mitre.org/data/definitions/502.html)

## Non-Compliant Code Examples
```java
public class SerializationHelper {

  private static final char[] hexArray = "0123456789ABCDEF".toCharArray();

  public static Object fromString(String s) throws IOException, ClassNotFoundException {
    byte[] data = Base64.getDecoder().decode(s);
    ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data));
    Object o = ois.readObject();
    ois.close();
    return o;
  }
}
```
