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

Automatic integrations provide out-of-the-box AI Guard protection for supported frameworks. When you run your application with the Datadog tracer, AI Guard evaluations are automatically performed on calls made through these frameworks, without requiring any code changes.

## Set up the Datadog Agent

Datadog SDKs use the [Datadog Agent][6] to send AI Guard data to Datadog. The Agent must be running and accessible to the SDK for you to see data in Datadog.

If you don't use the Datadog Agent, the AI Guard evaluator API still works, but you can't see AI Guard traces in Datadog.

## Supported frameworks and libraries

{{< tabs >}}
{{% tab "Python" %}}
<!-- TODO: confirm supported versions and tracer versions -->
| Framework                    | Supported Versions | Tracer Version |
|------------------------------|--------------------|----------------|
| [LangChain](#langchain)      | >= 0.0.192         | >= 2.9.0       |

{{% /tab %}}
{{% tab "Node.js" %}}
<!-- TODO: confirm supported versions and tracer versions -->
| Framework                          | Supported Versions | Tracer Version |
|------------------------------------|--------------------|----------------|
| [Vercel AI SDK](#vercel-ai-sdk)    | >= 4.0.0           | >= 5.63.0      |

{{% /tab %}}
{{< /tabs >}}

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

{{% collapse-content title="Vercel AI SDK" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
<!-- TODO: confirm traced methods and add details specific to AI Guard -->
The [Vercel AI SDK][1] integration automatically applies AI Guard evaluations to text and object generation, embeddings, and tool calls.

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
