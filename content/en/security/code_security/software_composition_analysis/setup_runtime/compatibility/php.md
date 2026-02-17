---
title: PHP Compatibility Requirements
code_lang: php
type: multi-code-lang
code_lang_weight: 40
---

## Code Security capabilities support

The following code security capabilities are supported in the PHP library, for the specified tracer version:

| Code Security capability                    | Minimum PHP tracer version |
| ------------------------------------------- |----------------------------|
| Runtime Software Composition Analysis (SCA) | 0.90.0                     |
| Runtime Code Analysis (IAST)                | not supported              |

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Supported deployment types
| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | {{< X >}}                                   |                                     |
| Kubernetes        | {{< X >}}                                   |                                     |
| Amazon ECS        | {{< X >}}                                   |                                     |
| AWS Fargate       | {{< X >}}                                   |                                     |
| AWS Lambda        |                                             |                                     |

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

Code Security capabililties for PHP support the following SAPI's:

| SAPI           | Support type    |
|:---------------|:----------------|
| apache2handler | Fully Supported |
| cli            | Fully Supported |
| fpm-fcgi       | Fully Supported |
| cgi-fcgi       | Fully Supported |

## Supported processor architectures

Code Security capabililties for PHP support the following architectures:

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

[1]: /tracing/trace_collection/compatibility/php/
[2]: /remote_configuration#enabling-remote-configuration
