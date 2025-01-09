---
aliases:
- /continuous_integration/static_analysis/rules/php-security/tainted-url-host
- /static_analysis/rules/php-security/tainted-url-host
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/tainted-url-host
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid potential server side request forgeries (SSRFs)
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/tainted-url-host`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [918](https://cwe.mitre.org/data/definitions/918.html)

## Description
Server side request forgery (SSRF) is a type of exploit where an attacker abuses the functionality of a server to send HTTP requests to an arbitrary domain. SSRFs are dangerous because they can allow an attacker to bypass access controls, such as firewalls, to interact with internal resources.

The rule is important because it protects your application from potential security vulnerabilities. It restricts the ability of potential attackers to trick your server into making requests to arbitrary URLs, which could lead to unauthorized access to sensitive data or systems.

To avoid SSRF vulnerabilities, always sanitize user inputs that will be used in URLs. One way to do this is by using PHP's built-in `filter_var` function with the `FILTER_SANITIZE_URL` option. This will remove any illegal URL characters from the input. Additionally, avoid using user input directly in the construction of URLs. Instead, use a base URL that you control, and append sanitized user input to it. For example, use `$base_url = 'https://www.domain.tld/';` and `$path = filter_var($_GET['url'], FILTER_SANITIZE_URL);` to create a safe URL.

## Non-Compliant Code Examples
```php
<?php
function foo() {
    $url = 'https://' . $_GET['url'] . '/path';
    return perform_req($url);
}

function bar() {
    $url = "https://{$_REQUEST['url']}/path";
    return perform_req($url);
}

function baz() {
    $url = sprintf('https://%s/%s/', $_COOKIE['foo'], $path);
    return perform_req($url);
}
```

## Compliant Code Examples
```php
<?php
function foo() {
    $base_url = 'https://www.domain.tld/';
    $path = filter_var($_GET['url'], FILTER_SANITIZE_URL);
    $url = $base_url . $path . '/path';
    return perform_req($url);
}

function bar() {
    $base_url = 'https://www.domain.tld/';
    $path = filter_var($_REQUEST['url'], FILTER_SANITIZE_URL);
    $url = "{$base_url}{$path}/path";
    return perform_req($url);
}

function baz() {
    $base_url = 'https://www.domain.tld/';
    $path = filter_var($_COOKIE['foo'], FILTER_SANITIZE_URL);
    $url = sprintf('%s%s/%s/', $base_url, $path, 'path');
    return perform_req($url);
}
```
