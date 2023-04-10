---
title: NodeJS Compatibility Requirements 
kind: documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
---

## Language and framework compatibility

### Supported Node.js versions

The Datadog Node.js library supports Node 14 and higher. In general, we follow the Node.js LTS policy. For more information, read the [APM documentation][1].


These are supported on the following architectures:

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86, x86-64

You can monitor application security for Node.js apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| Express                 | 4.0                         |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send us details</a>.</div>

## ASM capabilities support

The following ASM capabilities are supported in the NodeJS library, for the specified tracer version:

| ASM capability                   | Minimum NodeJS tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 3.31.1 <br/>   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | <br/> --> 3.11.0<br/> --> not supported<br/> --> 3.11.0     |
| Risk Management <br/> --> Third-party vulnerability detection <br/> --> Custom code vulnerability detection | 2.23.0 for NodeJS 12+, or 3.10.0 for NodeJS 14+ <br/><br/> |

The minimum tracer version to get all supported ASM capabilities for NodeJS is 3.15.0.

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send us details</a>.</div>


[1]: /tracing/trace_collection/compatibility/nodejs/
