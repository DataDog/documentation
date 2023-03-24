---
title: Serverless Compatibility Requirements 
kind: documentation
code_lang: serverless
type: multi-code-lang
code_lang_weight: 90
---

<div class="alert alert-info">ASM support for AWS Lambda is in beta. Threat detection is done by using the Datadog's lambda extension.<br><br> Don’t see your desired technology listed here? Datadog is continually adding additional support. Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send us details</a>.</div>

## Language and framework compatibility

ASM follows the same language and framework support as [Serverless distributed tracing][1]. 

### Supported cloud environments

- AWS Lambda (beta)

### Version dependencies

- Lambda Extension version: `39`
- Serverless plugin version: `5.20.0`

### Supported languages and their requirements

Node
: If you are bundling using webpack or esbuild, [mark the Datadog libraries as external][4].

Python
: 

Java
: To fully instrument your serverless application with distributed tracing, your Java Lambda functions must use the Java 8 Corretto (`java8.al2`) or Java 11 (`java11`) runtimes with at least 1024MB of memory.
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

The following ASM capabilities are supported for Serverless, for the specified version:

| ASM capability                   | Minimum Serverless version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |
| Risk Management <br/> --> IAST | x.x <br/>x.x |


## Supported trigger types

ASM Threat Detection supports HTTP requests as function input only. These typically come from AWS services such as:

- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- Function URL


[1]: /serverless/distributed_tracing/
[2]: /serverless/guide/datadog_forwarder_python
[3]: /serverless/guide/upgrade_java_instrumentation
[4]: /serverless/guide/serverless_tracing_and_webpack/
