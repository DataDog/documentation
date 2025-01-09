---
aliases:
- /continuous_integration/static_analysis/rules/php-security/html-xss
- /static_analysis/rules/php-security/html-xss
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/html-xss
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid HTML XSS attacks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/html-xss`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Cross-Site Scripting (XSS) attacks are a common type of security vulnerability in web applications. XSS attacks occur when an attacker can inject malicious scripts into web pages viewed by other users. These scripts can steal sensitive information, such as login credentials or personal data.

In PHP, this rule can be violated when user input is directly embedded into HTML without proper sanitization. This creates an opportunity for attackers to inject harmful scripts. For instance, if a user enters `<script>alert('XSS')</script>` as input, and this input is directly embedded into HTML, every user visiting the page will see an alert popup saying 'XSS'.

Always sanitize user input before embedding it into HTML. This can be achieved by using the built-in PHP function `htmlspecialchars()`. This function converts special characters to their HTML entities, thereby preventing any embedded scripts from executing. For example, instead of writing `echo '<h1>' . $input . '</h1>';`, you should write `echo '<h1>' . htmlspecialchars($input) . '</h1>';`. This ensures that any user input is treated as plain text and not executable code.

## Non-Compliant Code Examples
```php
<?php
$input = $_GET["input"];
echo '<h1>' . $input . '</h1>';
```

## Compliant Code Examples
```php
<?php
$input = $_GET["input"];
echo '<h1>' . htmlspecialchars($input) . '</h1>';
```

```php
<?php
header('Content-Type: text/plain');
$input = $_GET["input"];
echo $input;
```
