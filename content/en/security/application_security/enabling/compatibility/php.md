---
title: PHP Compatibility Requirements
kind: documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 40
---

## ASM capabilities support

The following ASM capabilities are supported in the PHP library, for the specified tracer version:

| ASM capability                   | Minimum PHP tracer version |
| -------------------------------- |----------------------------|
| Threat Detection | 0.84.0                     |
| Threat Protection  | 0.86.0                     |
| Customize response to blocked requests | 0.86.0 |
| Software Composition Analysis (SCA) | 0.90.0              |
| Code Security (beta) | not supported              |
| Automatic user activity event tracking | 0.89.0                     |
| API Security | 0.98.0 |

The minimum tracer version to get all supported ASM capabilities for PHP is 0.98.0.


<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Supported deployment types
| Type        | Threat Detection support | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate |                          |                               |
| AWS Lambda  |                          |                               |

## Language and framework compatibility

<div class="alert alert-info">
<strong>Note:</strong>
It's recommended to use <a href="https://www.php.net/supported-versions">officially supported versions</a> of PHP, especially 8.0, 8.1 and 8.2.
</div>

| PHP Version    | Support level                         | Package version |
|:---------------|:--------------------------------------|:----------------|
| 8.3.x          | General Availability                  | > `0.95.0+`     |
| 8.2.x          | General Availability                  | > `0.82.0+`     |
| 8.1.x          | General Availability                  | > `0.66.0+`     |
| 8.0.x          | General Availability                  | > `0.52.0+`     |
| 7.4.x          | General Availability                  | All             |
| 7.3.x          | General Availability                  | All             |
| 7.2.x          | General Availability                  | All             |
| 7.1.x          | General Availability                  | All             |
| 7.0.x          | General Availability                  | All             |

PHP ASM supports the following SAPI's:

| SAPI           | Support type    |
|:---------------|:----------------|
| apache2handler | Fully Supported |
| cli            | Fully Supported |
| fpm-fcgi       | Fully Supported |
| cgi-fcgi       | Fully Supported |

## Supported processor architectures

PHP ASM supports the following architectures:

| Processor architectures                   | Support level         | Package version                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)      | GA                    | All                                    |
| Linux MUSL amd64 (`x86-64-linux-musl`)    | GA                    | All                                    |
| Linux GNU arm64 (aarch64-linux-gnu)       | GA                    | > `0.95.0`                             |
| Linux MUSL arm64 (aarch64-linux-musl)     | GA                    | > `0.95.0`                             |

The Datadog PHP library supports PHP version 7.0 and above on the following architectures:

- Linux (GNU) x86-64 and arm64
- Alpine Linux (musl) x86-64 and arm64

The library supports the use of all PHP frameworks, and also the use of no framework.


### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### ASM Capability Notes
- **Vulnerability Management for OSS** is not supported
- **Vulnerability Management for Code-level** is not supported

The following frameworks aren't directly instrumented by ASM, but indirectly supported through runtime instrumentation.

| Framework                | Versions    | Threat Detection supported? | Threat Protection supported? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| CakePHP       | 2.x       |  {{< X >}} | {{< X >}} |
| CodeIgniter   | 2.x       |  {{< X >}} | {{< X >}} |
| FuelPHP       | 1.1        |  {{< X >}} | {{< X >}} |
| Laravel       | 4.2, 5.x, 6.x        | {{< X >}} | {{< X >}} |
| Laravel 8     | 8.x (tracer 0.52.0+) | {{< X >}} | {{< X >}} |
| Lumen         | 1.9-2.29    |  {{< X >}} | {{< X >}} |
| Magento       |  3.8+       |  {{< X >}} | {{< X >}} |
| Neos Flow     |  3.0.x      |  {{< X >}} | {{< X >}} |
| Phalcon       | 3.1+        |  {{< X >}} | {{< X >}} |
| Slim          | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 3     | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 4     | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 5     | 3.1+        |  {{< X >}} | {{< X >}} |
| Wordpress     | 3.1+        |  {{< X >}} | {{< X >}} |
| Yii           | 3.1+        |  {{< X >}} | {{< X >}} |
| Zend          | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 3     | 3.1+        |  {{< X >}} | {{< X >}} |
| RoadRunner    | 2.x         |  {{< X >}} | {{< X >}} |


### Data store compatibility

**Datastore tracing provides:**

- SQL attack detection
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### ASM Capability Notes
- **Vulnerability Management for OSS** is not supported
- **Vulnerability Management for Code-level** is not supported
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.

| Framework         | Versions | Threat Detection supported?    | Threat Protection supported?|
|-------------------|-----------------|-----------------|---------------|
| Amazon RDS        | Any supported PHP | {{< X >}}  |   {{< X >}} |
| Eloquent       | Laravel supported versions | {{< X >}} | {{< X >}} |
| Memcached        | Any supported PHP |   {{< X >}}    | {{< X >}} |
| MySQLi        | Any supported PHP | {{< X >}} | {{< X >}} |
| PDO        | Any supported PHP| {{< X >}}| {{< X >}} |
| PHPRedis        | 3, 4, 5 |   {{< X >}}    | {{< X >}} |
| Predis        | 1.1 | {{< X >}} |   {{< X >}}    |

### User Authentication Frameworks compatibility

**Integrations to User Authentication Frameworks provide:**

- User login events, including the user IDs
- Account Takeover detection monitoring for user login events

| Framework | Minimum Framework Version |
|-----------|---------------------------|
| Laravel   | 4.2                       |
| Symfony   | 3.3                       |
| Wordpress | 4.8                       |

[1]: /tracing/trace_collection/compatibility/php/
[2]: /agent/remote_config/#enabling-remote-configuration
