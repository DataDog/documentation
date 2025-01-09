---
aliases:
- /continuous_integration/static_analysis/rules/java-security/xml-parsing-xxe-transformer
- /static_analysis/rules/java-security/xml-parsing-xxe-transformer
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/xml-parsing-xxe-transformer
  language: Java
  severity: Warning
  severity_rank: 2
title: XML parsing vulnerable to XXE for TransformerFactory
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/xml-parsing-xxe-transformer`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
Your code may be vulnerable XML if you process XML from an untrusted source. Make sure to enable secure processing when you process XML data.

For `TransformerFactory `, make sure you set `XMLConstants.FEATURE_SECURE_PROCESSING` to true.

#### Learn More

 - [XML parsing vulnerable to XXE (TransformerFactory)](https://find-sec-bugs.github.io/bugs.htm#XXE_DTD_TRANSFORM_FACTORY)
 - [CWE-611: Improper Restriction of XML External Entity Reference](https://cwe.mitre.org/data/definitions/611.html)

## Non-Compliant Code Examples
```java
class MyClass {

    public void test() {
        TransformerFactory factory = TransformerFactory.newInstance();
        factory.newTransformer();

        Transformer transformer = TransformerFactory.newInstance().newTransformer();
        transformer.transform(input, result);
    }
    
}
```

## Compliant Code Examples
```java
class MyClass {

    public void test() {
        TransformerFactory factory = TransformerFactory.newInstance();
        factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
        Transformer transformer = factory.newTransformer();
    }
    
}
```
