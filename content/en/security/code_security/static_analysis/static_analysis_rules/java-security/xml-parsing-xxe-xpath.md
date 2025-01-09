---
aliases:
- /continuous_integration/static_analysis/rules/java-security/xml-parsing-xxe-xpath
- /static_analysis/rules/java-security/xml-parsing-xxe-xpath
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/xml-parsing-xxe-xpath
  language: Java
  severity: Warning
  severity_rank: 2
title: XML parsing vulnerable to XXE for XPath
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/xml-parsing-xxe-xpath`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
Your code may be vulnerable XML if you process XML from an untrusted source. Make sure to enable secure processing when you process XML data.

For `DocumentBuilderFactory`, make sure you set `XMLConstants.FEATURE_SECURE_PROCESSING` to true.

#### Learn More

 - [XML parsing vulnerable to XXE (XPathExpression)](https://find-sec-bugs.github.io/bugs.htm#XXE_XPATH)
 - [CWE-611: Improper Restriction of XML External Entity Reference](https://cwe.mitre.org/data/definitions/611.html)

## Non-Compliant Code Examples
```java
class MyClass {

    public void test() {
        DocumentBuilderFactory df = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = df.newDocumentBuilder();

        DocumentBuilder db2 = DocumentBuilderFactory.newInstance().newDocumentBuilder();
    }
    
}
```

## Compliant Code Examples
```java
class MyClass {

    public void test() {
        DocumentBuilderFactory df = DocumentBuilderFactory.newInstance();
        df.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
        DocumentBuilder builder = df.newDocumentBuilder();
    }
    
}
```
