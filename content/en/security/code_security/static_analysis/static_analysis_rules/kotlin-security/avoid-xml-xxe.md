---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/avoid-xml-xxe
- /continuous_integration/static_analysis/rules/kotlin-security/avoid-xml-xxe
- /static_analysis/rules/kotlin-security/avoid-xml-xxe
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/avoid-xml-xxe
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Prevent XXE attack from XML parser
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/avoid-xml-xxe`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
This rule aims to prevent XXE (XML External Entity) attacks by ensuring that the XML parser is configured safely in Kotlin. XXE attacks occur when an XML parser processes an XML document that contains a reference to an external entity. This can lead to unwanted disclosure of confidential data, denial of service, server side request forgery, port scanning, or other system impacts.

XXE attacks can have serious security implications, potentially allowing an attacker to read sensitive data from the server, interact with any back-end or external systems that the application can access, or carry out denial-of-service attacks.

To avoid this, disable DTDs (Document Type Definitions) completely, if your application does not require them by setting the `http://apache.org/xml/features/disallow-doctype-decl` feature to `true`. If DTDs must be enabled, enable secure processing (`XMLConstants.FEATURE_SECURE_PROCESSING`), limit access to external DTDs (`XMLConstants.ACCESS_EXTERNAL_DTD`), and disable external parameter entities (`http://xml.org/sax/features/external-parameter-entities`). By following these practices, you can ensure that your Kotlin code is not vulnerable to XXE attacks.

## Non-Compliant Code Examples
```kotlin
fun parseXmlUnsafe(input: File) {
    // WARNING: Vulnerable to XXE attacks
    val factory = DocumentBuilderFactory.newInstance()
    val builder = factory.newDocumentBuilder()
    val doc = builder.parse(input)  // Unsafe parsing
}

```

## Compliant Code Examples
```kotlin
fun parseXmlSafe(input: File) {
    val factory = DocumentBuilderFactory.newInstance().apply {
        // Disable DTDs completely - recommended approach
        setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)
        
        // Alternative security configurations if DTDs must be enabled:
        setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true)
        setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "")
        setFeature("http://xml.org/sax/features/external-parameter-entities", false)
    }
    val builder = factory.newDocumentBuilder()
    val doc = builder.parse(input)  // Safe parsing
}

fun parseXmlSafe2(input: File) {
    val factory = DocumentBuilderFactory.newInstance()
    
    // Disable DTDs completely - recommended approach
    factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)
    
    // Additional security configurations if needed:
    factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true)
    factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "")
    factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false)
    
    val builder = factory.newDocumentBuilder()
    val doc = builder.parse(input)  // Safe parsing
}
```
