---
title: NodeJS Compatibility Requirements 
kind: documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
---

## Language and framework compatibility

ASM follows the same language and framework support as APM. See the [APM NodeJS Compatibility][1] page more details. 

### Supported Node.js versions

The Datadog Node.js library supports the following Node.js versions:

- Node.js 14 and higher

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


## ASM capabilities support

The following ASM capabilities are supported in the NodeJS library, for the specified tracer version:

| ASM capability                   | Minimum NodeJS tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |
| Threat Protection <br/> --> IP blocking <br/> --> User blocking   | x.x<br/>x.x<br/>x.x     |
| SCA   | x.x      |
| IAST    | x.x    |


[1]: /tracing/trace_collection/compatibility/nodejs/
