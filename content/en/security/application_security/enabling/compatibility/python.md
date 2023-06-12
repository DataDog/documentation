---
title: Python Compatibility Requirements 
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 50
---

## Language and framework compatibility

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

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

## ASM capabilities support

The following ASM capabilities are supported in the Python library, for the specified tracer version:

| ASM capability                   | Minimum Python tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 1.9.0<br/>   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | 1.10.0<br/><br/><br/>     |
| Vulnerability Management <br/> --> Open source vulnerability detection <br/> | <br/> 1.5.0  |
| Vulnerability Management <br/> --> Custom code vulnerability detection <br/> | <br/> private beta  |

The minimum tracer version to get all supported ASM capabilities for Python is 1.10.0.

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version. 

[1]: /tracing/trace_collection/compatibility/python/
[2]: /agent/remote_config/#enabling-remote-configuration
