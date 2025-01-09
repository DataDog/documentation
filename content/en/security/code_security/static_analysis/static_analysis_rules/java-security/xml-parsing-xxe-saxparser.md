---
aliases:
- /continuous_integration/static_analysis/rules/java-security/xml-parsing-xxe-saxparser
- /static_analysis/rules/java-security/xml-parsing-xxe-saxparser
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/xml-parsing-xxe-saxparser
  language: Java
  severity: Warning
  severity_rank: 2
title: XML parsing vulnerable to XXE for SAX Parsers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/xml-parsing-xxe-saxparser`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
Your code may be vulnerable XML if you process XML from an untrusted source. Make sure to enable secure processing when you process XML data.

This rule is to check SAX parsers.

For `DocumentBuilderFactory`, make sure you set `XMLConstants.FEATURE_SECURE_PROCESSING` to true.

#### Learn More

 - [XML parsing vulnerable to XXE (SAX Parser)](https://find-sec-bugs.github.io/bugs.htm#XXE_SAXPARSER)
 - [CWE-611: Improper Restriction of XML External Entity Reference](https://cwe.mitre.org/data/definitions/611.html)

## Non-Compliant Code Examples
```java
class MyClass {

    public void test() {
        SAXParser parser = SAXParserFactory.newInstance().newSAXParser();
        parser.parse(inputStream, customHandler);

        SAXParserFactory spf2 = SAXParserFactory.newInstance();
        SAXParser parser = spf2.newSAXParser();
    }
}
```

## Compliant Code Examples
```java
class MyClass {

    public void test() {
        SAXParserFactory spf = SAXParserFactory.newInstance();
        spf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
        SAXParser parser = spf.newSAXParser();
    }
}
```
