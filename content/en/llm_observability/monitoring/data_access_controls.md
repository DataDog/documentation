---
title: Data Access Controls
aliases:
  - /llm_observability/data_access_controls
further_reading:
  - link: "https://www.datadoghq.com/blog/openai-agents-llm-observability/"
    tag: "Blog"
    text: "Monitor your OpenAI agents with Datadog LLM Observability"
  - link: "https://www.datadoghq.com/blog/monitor-ai-agents/"
    tag: "Blog"
    text: "Monitor, troubleshoot, and improve AI agents with Datadog"
  - link: "https://www.datadoghq.com/blog/llm-observability-bedrock-agents/"
    tag: "Blog"
    text: "Monitor agents built on Amazon Bedrock with Datadog LLM Observability"
---

## Overview

LLM Observability allows you to restrict access to potentially sensitive data associated with your ML applications to only certain teams and roles in your organization. This is particularly important when your LLM applications process sensitive information such as personal data, proprietary business information, or confidential user interactions.

Access controls in LLM Observability are built on Datadog's [Data Access Control][1] feature, which enables you to create Restricted Datasets that define boundaries around sensitive data. You can use the `ml_app` tag to identify and restrict access to specific LLM applications within your organization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access
