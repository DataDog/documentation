---
title: Auto Instrumentation
---

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

Datadog's LLM Observability Python SDK provides integrations that automatically trace and annotate calls to LLM frameworks and libraries. This means that without touching your code, you can get out-of-the-box traces and observability for calls that your LLM application makes to:


| Framework                               | Supported Versions |
|-----------------------------------------|--------------------|
| [OpenAI](#openai)                       | >= 0.26.5          |
| [Langchain](#langchain)                 | >= 0.0.192,<0.2.0  |
| [AWS Bedrock](#aws-bedrock)             | >= 1.31.57         |
| [Anthropic](#anthropic)                 | >= 0.28.0          |

## OpenAI

OpenAI (using the [OpenAI Python SDK][1])

## LangChain

LangChain LLM/Chat Models/Chains (using [LangChain][2])

## AWS Bedrock

AWS Bedrock Runtime (using [Boto3][3]/[Botocore][4])

## Anthropic

Anthropic (using the [Anthropic Python SDK][5])

[1]: https://platform.openai.com/docs/api-reference/introduction
[2]: https://python.langchain.com/v0.2/docs/introduction/
[3]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[4]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[5]: https://docs.anthropic.com/en/api/client-sdks#python
