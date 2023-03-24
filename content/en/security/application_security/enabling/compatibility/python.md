---
title: Python Compatibility Requirements 
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 50
---

## Language and framework compatibility

ASM follows the same language and framework support as APM. See the [APM Python Compatibility][1] page more details. 

### Supported Python versions

The Datadog Python library supports the following Python versions:

- Python 2.7, 3.5 and higher

These are supported on the following architectures:

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86, x86-64

You can monitor application security for Python apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server | Minimum Framework Version |
|----------------------|---------------------------|
| Django               | 1.8                       |
| Flask                | 0.10                      |

Support for query strings is not available for Flask.


## ASM capabilities support

The following ASM capabilities are supported in the Python library, for the specified tracer version:

| ASM capability                   | Minimum Python tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |
| Threat Protection <br/> --> IP blocking   | x.x<br/>x.x     |
| SCA   | x.x      |
| IAST    | x.x    |


[1]: /tracing/trace_collection/compatibility/python/
