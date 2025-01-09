---
aliases:
- /continuous_integration/static_analysis/rules/php-security/laravel-cookie-not-encrypted
- /static_analysis/rules/php-security/laravel-cookie-not-encrypted
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/laravel-cookie-not-encrypted
  language: PHP
  severity: Error
  severity_rank: 1
title: Ensure Laravel cookies are encrypted
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/laravel-cookie-not-encrypted`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [352](https://cwe.mitre.org/data/definitions/352.html)

## Description
All cookies in your PHP application should be encrypted. This is crucial because cookies often contain sensitive user information. If the cookies are not encrypted, they can be easily intercepted and exploited by malicious users or programs.

Not encrypting cookies can lead to serious security vulnerabilities. These can include session hijacking, where an attacker can impersonate a user by stealing their session cookie, or cross-site scripting (XSS), where an attacker can inject malicious scripts into web pages viewed by other users.

To ensure compliance with this rule, always use the `EncryptCookies` middleware in your middleware groups, as shown in the compliant code sample. This middleware will automatically encrypt all cookies sent by your application. Also, make sure to use HTTPS for all communications, as this will further secure your cookies by encrypting the entire communication channel.

## Non-Compliant Code Examples
```php
<?php
class Kernel extends HttpKernel
{
    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // Missing EncryptCookies middleware
        ],

        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
}
```

## Compliant Code Examples
```php
<?php
class Kernel extends HttpKernel
{
    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Session\Middleware\StartSession::class,
        ],

        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
}
```
