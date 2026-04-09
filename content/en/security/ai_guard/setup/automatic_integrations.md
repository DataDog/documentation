---
title: Automatic Integrations
private: true
further_reading:
- link: /security/ai_guard/setup/manual_integrations/
  tag: Documentation
  text: Manual Integrations
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: SDK
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard can automatically evaluate LLM calls made through supported AI ecosystem packages, without requiring manual API calls. When your application uses one of the supported packages, the Datadog tracer instruments it to evaluate those calls through AI Guard automatically. No code changes are required.

## Set up the Datadog Agent

Datadog SDKs use the [Datadog Agent][6] to send AI Guard data to Datadog. The Agent must be running and accessible to the SDK for you to see data in Datadog.

If you don't use the Datadog Agent, the AI Guard evaluator API still works, but you can't see AI Guard traces in Datadog.

## Supported frameworks and libraries

{{< tabs >}}
{{% tab "Python" %}}
<!-- TODO: confirm supported versions and tracer versions -->
| Package                      | Supported Versions | Tracer Version |
|------------------------------|--------------------|----------------|
| [LangChain](#langchain)      | >= 0.0.192         | >= 2.9.0       |

{{% /tab %}}
{{% tab "Node.js" %}}
| Package                          | Supported Versions | Tracer Version |
|----------------------------------|--------------------|----------------|
| [AI SDK](#vercel-ai-sdk)         | `v6`               | `>=5.95.0`     |

{{% /tab %}}
{{< /tabs >}}

## Required environment variables {#automatic-integration-env-vars}

Set the following environment variables in your application:

| Variable              | Value                    |
| :-------------------- | :----------------------- |
| `DD_AI_GUARD_ENABLED` | `true`                   |
| `DD_API_KEY`          | `<YOUR_API_KEY>`         |
| `DD_APP_KEY`          | `<YOUR_APPLICATION_KEY>` |
| `DD_TRACE_ENABLED`    | `true`                   |

By default, automatic integrations run in monitoring mode: AI Guard evaluates calls and records results, but does not block requests. To enable blocking, set `DD_AI_GUARD_BLOCK` to `true` (equivalent to the `block` option in the [SDK][7] and [REST API][8]):

| Variable            | Value  |
| :------------------ | :----- |
| `DD_AI_GUARD_BLOCK` | `true` |

## Integrations

{{% collapse-content title="LangChain" level="h3" expanded=false id="langchain" %}}
{{< tabs >}}
{{% tab "Python" %}}
<!-- TODO: confirm traced methods and add details specific to AI Guard -->
The LangChain integration automatically applies AI Guard evaluations to calls made through the [LangChain Python SDK][1].

### Traced operations

AI Guard automatically evaluates the following LangChain operations:

- [LLMs][2]:
  - `llm.invoke()`, `llm.ainvoke()`
- [Chat models][3]:
  - `chat_model.invoke()`, `chat_model.ainvoke()`
- [Chains/LCEL][4]:
  - `chain.invoke()`, `chain.ainvoke()`
- [Tools][5]:
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`

[1]: https://python.langchain.com/docs/introduction/
[2]: https://python.langchain.com/v0.2/docs/concepts/#llms
[3]: https://python.langchain.com/docs/concepts/chat_models/
[4]: https://python.langchain.com/docs/concepts/runnables/
[5]: https://python.langchain.com/docs/concepts/tools/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="AI SDK" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
The [AI SDK][1] integration automatically applies AI Guard evaluations to text and object generation, embeddings, and tool calls.

### Traced operations

- [Text generation][2]:
  - `generateText`
  - `streamText`
- [Object generation][3]:
  - `generateObject`
  - `streamObject`
- [Tool calling][4]:
  - `tool.execute`

[1]: https://ai-sdk.dev/docs/introduction
[2]: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
[3]: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
[4]: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[6]: /agent/?tab=Host-based
[7]: /security/ai_guard/setup/sdk/
[8]: /security/ai_guard/setup/http_api/
