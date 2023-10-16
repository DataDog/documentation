---
title: Serverless Compatibility Requirements 
kind: documentation
code_lang: serverless
type: multi-code-lang
code_lang_weight: 90
---

## Language and framework compatibility

### Supported cloud environments

- AWS Lambda

### Version dependencies

- Lambda Extension version: `39`
- Serverless plugin version: `5.20.0`

### Supported languages and their requirements

Node.js
: If you are bundling using webpack or esbuild, [follow the specific bundler instructions][4].

Python
: 

Java
: To fully instrument your serverless application with distributed tracing, your Java Lambda functions must use the Java 8 Corretto (`java8.al2`), Java 11 (`java11`) or Java 17 (`java17`) runtimes with at least 1024MB of memory.
: If you use the Datadog Lambda layers `dd-trace-java:4` (or older) and `Datadog-Extension:24` (or older), follow the instructions in [Upgrade Instrumentation for Java Lambda Functions][3].

Go
: 

.NET
: 

### ASM capabilities 
The following ASM capabilities are not supported for Lambda functions:
 - ASM Risk Management
 - IP, user, and suspicious request blocking
 - 1-Click enabling ASM

## ASM capabilities support

The following ASM capabilities are supported for serverless, for the specified Datadog Lambda extension version:

| ASM capability                   | Minimum extension version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | Supported for Node.js, Java, Python, Go, and .NET with Lambda Extension version 39 and Serverless plugin version 5.20.0. <br/> --> Business logic capabilities follow the language-specific versions in which the service is built. |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | not supported<br/><br/><br/> |
| Vulnerability Management <br/> --> Open source vulnerability detection <br/> --> Custom code vulnerability detection | not supported<br/> |


<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

## Supported trigger types

ASM Threat Detection supports HTTP requests as function input only. These typically come from AWS services such as:

- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- Function URL


[1]: /serverless/distributed_tracing/
[2]: /serverless/guide/datadog_forwarder_python
[3]: /serverless/guide/upgrade_java_instrumentation
[4]: /serverless/guide/serverless_tracing_and_bundlers/
