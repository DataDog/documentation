---
aliases:
- /continuous_integration/static_analysis/rules/java-security/xml-parsing-xxe-xmlreader
- /static_analysis/rules/java-security/xml-parsing-xxe-xmlreader
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/xml-parsing-xxe-xmlreader
  language: Java
  severity: Warning
  severity_rank: 2
title: XML parsing vulnerable to XXE for XML Reader
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/xml-parsing-xxe-xmlreader`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
Your code may be vulnerable XML if you process XML from an untrusted source. Make sure to enable secure processing when you process XML data.

This rule is to check XML Readers.

For `DocumentBuilderFactory`, make sure you set `XMLConstants.FEATURE_SECURE_PROCESSING` to true.

#### Learn More

 - [XML parsing vulnerable to XXE (XML Reader)](https://find-sec-bugs.github.io/bugs.htm#XXE_XMLREADER)
 - [CWE-611: Improper Restriction of XML External Entity Reference](https://cwe.mitre.org/data/definitions/611.html)

## Non-Compliant Code Examples
```java
class MyClass {

    public void test() {
        XMLReader reader = XMLReaderFactory.createXMLReader();
        reader.setContentHandler(customHandler);
        reader.parse(new InputSource(inputStream));
    }
}
```

## Compliant Code Examples
```java
class MyClass {

    public void test() {
        XMLReader reader = XMLReaderFactory.createXMLReader();
        reader.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
        reader.setContentHandler(customHandler);

        reader.parse(new InputSource(inputStream));
    }
}
```
