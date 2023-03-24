---
title: Serverless Compatibility Requirements 
kind: documentation
code_lang: serverless
type: multi-code-lang
code_lang_weight: 90
---

## Language and Framework Compatibility

ASM follows the same language and framework support as [Serverless distributed tracing][1]. 

## ASM Capabilities Support

The following ASM capabilities are supported for Serverless, for the specified version:

| ASM capability                   | Minimum Serverless version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |
| IAST    | x.x    |

## Supported Trigger Types

ASM Threat Detection supports HTTP requests as function input only. These typically come from AWS services such as:

- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- Function URL


[1]: /serverless/distributed_tracing/
