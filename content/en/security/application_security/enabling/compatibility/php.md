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

The following ASM capabilities are supported in the PHP library, for the specified tracer version:

| ASM capability                   | Minimum PHP tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |


[1]: /tracing/trace_collection/compatibility/php/
