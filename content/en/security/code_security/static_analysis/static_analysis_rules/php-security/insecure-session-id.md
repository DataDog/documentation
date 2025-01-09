---
aliases:
- /continuous_integration/static_analysis/rules/php-security/insecure-session-id
- /static_analysis/rules/php-security/insecure-session-id
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/insecure-session-id
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not generate insecure session IDs
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/insecure-session-id`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [340](https://cwe.mitre.org/data/definitions/340.html)

## Description
Session IDs are vital to maintaining state in your web applications and thus, it's crucial to ensure that these IDs are secure and not easily guessable. If an attacker is able to predict or guess a session ID, they can hijack a user's session, gain unauthorized access to their data, and perform actions on their behalf. This can result in severe data breaches and loss of trust from your users.

To avoid violating this rule, always generate sufficiently long and random session IDs. Also, avoid setting session IDs from user input, as this can open up the possibility for session fixation attacks.

## Non-Compliant Code Examples
```php
<?php
session_id(bin2hex(random_bytes(6)));
session_id($_POST["s_id"]);
```

## Compliant Code Examples
```php
<?php
session_id(bin2hex(random_bytes(16)));
session_regenerate_id();
```
