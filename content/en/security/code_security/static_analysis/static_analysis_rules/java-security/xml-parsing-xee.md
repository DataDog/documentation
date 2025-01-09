---
aliases:
- /continuous_integration/static_analysis/rules/java-security/xml-parsing-xee
- /static_analysis/rules/java-security/xml-parsing-xee
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/xml-parsing-xee
  language: Java
  severity: Notice
  severity_rank: 3
title: XML parsing vulnerable to XEE
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/xml-parsing-xee`

**Language:** Java

**Severity:** Notice

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
Systems may be vulnerable to an XML External Entity attack when they process XML from untrusted sources.

#### Learn More

 - [CWE-611: Improper Restriction of XML External Entity Reference](https://cwe.mitre.org/data/definitions/611.html)
 - [XML parsing vulnerable to XXE (XMLStreamReader)](https://find-sec-bugs.github.io/bugs.htm#XXE_XMLSTREAMREADER)

## Non-Compliant Code Examples
```java
public class TestClass {

    public void parseXML(InputStream input) throws XMLStreamException {

        XMLInputFactory factory = XMLInputFactory.newFactory();
        factory.setProperty("aproperty", false);
        XMLStreamReader reader = factory.createXMLStreamReader(input);
        factory.setProperty("anotherproperty", false);
    }
}
```

## Compliant Code Examples
```java
public class TestClass {

    public void parseXML(InputStream input) throws XMLStreamException {

        XMLInputFactory factory = XMLInputFactory.newFactory();
        factory.setProperty("aproperty", false);
        factory.setProperty(XMLInputFactory.SUPPORT_DTD, false);
        factory.setProperty("anotherproperty", false);
        XMLStreamReader reader = factory.createXMLStreamReader(input);
    }
}
```

```java
public class TestClass {

    public void parseXML(InputStream input) throws XMLStreamException {

        XMLInputFactory factory = XMLInputFactory.newFactory();
        factory.setProperty("aproperty", false);
        factory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
        factory.setProperty("anotherproperty", false);
        XMLStreamReader reader = factory.createXMLStreamReader(input);
    }
}
```
