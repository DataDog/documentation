---
aliases:
- /continuous_integration/static_analysis/rules/php-security/laravel-csrf-not-verified
- /static_analysis/rules/php-security/laravel-csrf-not-verified
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/laravel-csrf-not-verified
  language: PHP
  severity: Error
  severity_rank: 1
title: Enable CSRF token verification to avoid CSRF attacks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/laravel-csrf-not-verified`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [352](https://cwe.mitre.org/data/definitions/352.html)

## Description
CSRF is an attack that tricks the victim into submitting a malicious request. It uses the identity and privileges of the victim to perform an undesired function on their behalf. CSRF attacks specifically target state-changing requests, not theft of data, since the attacker has no way to see the response to the forged request.

Without CSRF protection, an attacker can trick a victim into performing actions on their behalf, potentially leading to data loss, corruption, or unauthorized access. This is especially dangerous if the victim has administrative privileges.

To avoid violating this rule, ensure that you include the `VerifyCsrfToken` middleware in your application's middleware stack. This middleware will automatically verify that the CSRF token in the request input matches the token stored in the session, thus preventing CSRF attacks. If the tokens do not match, the middleware will throw an `HttpResponseException`, thereby blocking the request.

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
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            // Missing VerifyCsrfToken middleware
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
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
}
```
