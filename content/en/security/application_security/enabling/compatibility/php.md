---
title: PHP Compatibility Requirements 
kind: documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 40
---

## Language and framework compatibility

ASM follows the same language and framework support as APM. See the [APM PHP Compatibility][1] page more details. 

The Datadog PHP library supports PHP version 7.0 and above on the following architectures:

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64

You can monitor application security for PHP apps running in Docker, Kubernetes, and AWS ECS.

It supports the use of all PHP frameworks, and also the use no framework.


## ASM capabilities support

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities in the following table, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send us details</a>.</div>

The following ASM capabilities are supported in the PHP library, for the specified tracer version:

| ASM capability                   | Minimum PHP tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | x.x<br/>x.x<br/>x.x<br/>x.x     |
| Risk Management <br/> --> Third-party vulnerability detection <br/> --> Custom code vulnerability detection | not supported<br/><br/> |

The minimum tracer version to get all supported ASM capabilities for PHP is y.y.

[1]: /tracing/trace_collection/compatibility/php/
