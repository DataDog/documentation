---
title: Node.js Compatibility Requirements 
kind: documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
---

## Language and framework compatibility

### Supported Node.js versions

The Datadog Node.js library supports Node 14 and higher. In general, Datadog follows the Node.js LTS policy. For more information, read the [APM documentation][1].


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

The following ASM capabilities are supported in the Node.js library, for the specified tracer version:

| ASM capability                   | Minimum NodeJS tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 3.13.1 <br/> |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking | <br/> --> 3.11.0 <br/> --> 3.19.0 <br/> --> 3.11.0 |
| Vulnerability Management <br/> --> Open source vulnerability detection <br/> | <br/> 2.23.0 for NodeJS 12+, or 3.10.0 for NodeJS 14+ |
| Vulnerability Management <br/> --> Custom code vulnerability detection <br/> | <br/> 2.32.0 for NodeJS 12+, or 3.19.1 for NodeJS 14+ |

The minimum tracer version to get all supported ASM capabilities for Node.js is 3.19.1.

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.  

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities or for your Node.js framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


[1]: /tracing/trace_collection/compatibility/nodejs/
[2]: /agent/remote_config/#enabling-remote-configuration
