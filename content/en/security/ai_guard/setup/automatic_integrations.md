---
title: Automatic Integrations
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

AI Guard can automatically evaluate LLM calls made through supported AI ecosystem packages, without requiring manual API calls. When your application uses one of the supported packages, the Datadog SDK instruments it to evaluate those calls through AI Guard automatically. No code changes are required.

## Supported frameworks and libraries

{{< tabs >}}
{{% tab "Python" %}}
| Package                      | Supported Versions | SDK Version |
|------------------------------|--------------------|----------------|
| [LangChain](#langchain)      | >= 0.1.20          | >= 3.14.0      |

{{% /tab %}}
{{% tab "Node.js" %}}
| Package                          | Supported Versions | SDK Version |
|----------------------------------|--------------------|----------------|
| [AI SDK](#vercel-ai-sdk)         | v6                 | >=5.95.0       |

{{% /tab %}}
{{< /tabs >}}

{{% partial name="security-platform/aiguard-sdk-setup.md" target="automatic" %}}

## Integrations

{{< tabs >}}
{{% tab "Python" %}}
<!-- TODO: confirm traced methods and add details specific to AI Guard -->
The LangChain integration automatically applies AI Guard evaluations to calls made through the [LangChain Python SDK][1].

### Traced operations

AI Guard automatically evaluates the following LangChain operations:

- LLMs:
  - `llm.invoke()`, `llm.ainvoke()`
- [Chat models][2]:
  - `chat_model.invoke()`, `chat_model.ainvoke()`
- [Tools][3]:
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`

[1]: https://docs.langchain.com/oss/python/langchain/overview
[2]: https://docs.langchain.com/oss/python/langchain/models
[3]: https://docs.langchain.com/oss/python/langchain/tools
{{% /tab %}}
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

