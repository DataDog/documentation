---
aliases:
- /continuous_integration/static_analysis/rules/php-security/unsafe-entity-loader
- /static_analysis/rules/php-security/unsafe-entity-loader
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/unsafe-entity-loader
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid enabling entity loader
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/unsafe-entity-loader`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
The ability to load external entities while parsing XML data should be disabled. This helps prevent XML External Entity (XXE) attacks, which can lead to disclosure of internal files, denial of service, server side request forgery, port scanning from the perspective of the machine where the parser is located, and other system impacts.

In PHP versions before 8.0, `libxml_disable_entity_loader()` is set to `true` by default, which means that loading of external entities is disabled. However, if you explicitly set this function to `false`, as seen in the non-compliant code sample, you are enabling the loading of external entities, thereby opening up potential security vulnerabilities.

To adhere to this rule and ensure the security of your PHP applications, you should avoid enabling the entity loader. This means that you should not use `libxml_disable_entity_loader(false)`. Instead, let the function retain its default value of `true`. If you need to parse XML data, use secure functions such as `simplexml_load_string()` or `DOMDocument::loadXML()`, as seen in the compliant code sample. These functions are designed to safely parse XML data without exposing your application to XXE attacks.

## Non-Compliant Code Examples
```php
<?php

class Foo extends Controller {
  public function test($input) {
    libxml_disable_entity_loader(false);
    $doc = new DOMDocument();
    $doc->loadXML($input);
    return view('user.index', []);
  }
}
```

## Compliant Code Examples
```php
<?php

class Foo extends Controller {
  public function test($id) {
    libxml_disable_entity_loader(true);
    $data = simplexml_load_string($xml_input);
    return view('user.index', ['data' => $data]);
  }
}
```
