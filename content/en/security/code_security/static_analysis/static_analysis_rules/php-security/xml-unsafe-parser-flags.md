---
aliases:
- /continuous_integration/static_analysis/rules/php-security/xml-unsafe-parser-flags
- /static_analysis/rules/php-security/xml-unsafe-parser-flags
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/xml-unsafe-parser-flags
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid using unsafe flags in XML parsers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/xml-unsafe-parser-flags`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
This rule is designed to prevent potential XML External Entity (XXE) attacks, which could allow an attacker to read local files on the server, interact with any external systems that the server can access, or perform a Denial-of-Service (DoS) attack.

The `LIBXML_NOENT` and `LIBXML_DTDLOAD` flags in PHP's `DOMDocument` or `SimpleXML` classes are particularly risky. The `LIBXML_NOENT` flag allows for the substitution of XML entities by their values, while the `LIBXML_DTDLOAD` flag enables loading of the XML Document Type Definition (DTD), both of which are common vectors for XXE attacks.

To avoid violating this rule, refrain from using these flags when loading XML data. Instead, use safer methods like `simplexml_load_string()` without any flags, as shown in the compliant code sample. This ensures that your PHP applications are not susceptible to XXE attacks, thus enhancing their security.

## Non-Compliant Code Examples
```php
<?php
class UserController extends Controller {
  public function xml($input) {
    $doc = new DOMDocument();
    $doc->loadXML($input, LIBXML_NOENT | LIBXML_DTDLOAD);
    return view('user.index', ['data' => $doc]);
  }
}
```

## Compliant Code Examples
```php
<?php
class Foo extends Controller {
  public function xml($input) {
    $data = simplexml_load_string($xml_input);
    return view('user.index', ['data' => $data]);
  }
}
```
