---
further_reading:
- link: /security/ai_guard/setup/manual_integrations/
  tag: ドキュメント
  text: 手動インテグレーション
- link: /security/ai_guard/setup/sdk/
  tag: ドキュメント
  text: SDK
title: 自動インテグレーション
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard は、 {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

AI Guard では、手動の API 呼び出しを必要とせずに、サポートされている AI エコシステムパッケージを通じて行われた LLM 呼び出しを自動的に評価できます。アプリケーションがサポートされているパッケージのいずれかを使用している場合、その呼び出しを AI Guard で自動的に評価できるよう Datadog SDK によってインストゥルメントされます。コードの変更は必要ありません。

## サポートされているフレームワークおよびライブラリ {#supported-frameworks-and-libraries}

{{< tabs >}}
{{% tab "Python" %}}
| パッケージ                      | サポートされているバージョン | SDK バージョン |
|------------------------------|--------------------|-------------|
| [LangChain](#python)         | >= 0.1.20          | >= 3.14.0   |
| [OpenAI](#python)            | >= 1.102.0         | >= 4.10.0   |
| [Anthropic](#python)         | >= 0.28.0          | >= 4.11.0   |

{{% /tab %}}
{{% tab "Node.js" %}}
| パッケージ                          | サポートされているバージョン | SDK バージョン |
|----------------------------------|--------------------|-------------|
| [AI SDK](#nodejs)                | v6                 | >= 5.95.0   |
| [OpenAI](#nodejs)                | >= 4.87.0          | >= 5.105.0  |
| [Anthropic](#nodejs)             | >= 0.14.0          | >= 6.11.0   |

{{% /tab %}}
{{% tab "Ruby" %}}
| パッケージ                          | サポートされているバージョン | SDK バージョン |
|----------------------------------|--------------------|-------------|
| [RubyLLM](#ruby)                 | >= 1.0.0           | >= 2.28.0   |

{{% /tab %}}
{{< /tabs >}}

{{< partial name="security-platform/aiguard-sdk-setup.html" target="automatic" >}}

## インテグレーション {#integrations}

### Python {#python}

{{< tabs >}}
{{% tab "LangChain" %}}
LangChain インテグレーションは、[LangChain Python SDK][1] を通じて行われる呼び出しに AI Guard 評価を自動的に適用します。

#### トレースされる操作 {#traced-operations}

AI Guard は、以下の LangChain 操作を自動的に評価します。

- LLM:
  - `llm.invoke()`、`llm.ainvoke()`
- [チャットモデル][2]:
  - `chat_model.invoke()`、`chat_model.ainvoke()`
- [ツール][3]:
  - `BaseTool.invoke()`、`BaseTool.ainvoke()`

[1]: https://docs.langchain.com/oss/python/langchain/overview
[2]: https://docs.langchain.com/oss/python/langchain/models
[3]: https://docs.langchain.com/oss/python/langchain/tools
{{% /tab %}}
{{% tab "OpenAI" %}}
OpenAI インテグレーションは、[OpenAI Python SDK][1] を通じて行われる呼び出しに AI Guard 評価を自動的に適用します。

#### トレースされる操作 {#traced-operations-1}

AI Guard は、以下の OpenAI 操作を自動的に評価します。

- [Chat Completions][2]:
  - `client.chat.completions.create()`
  - `client.chat.completions.parse()`
- [Responses API][3]:
  - `client.responses.create()`
  - `client.responses.parse()`

[1]: https://github.com/openai/openai-python
[2]: https://platform.openai.com/docs/api-reference/chat
[3]: https://platform.openai.com/docs/api-reference/responses
{{% /tab %}}
{{% tab "Anthropic" %}}
Anthropic インテグレーションは、[Anthropic Python SDK][1] を通じて行われる呼び出しに AI Guard 評価を自動的に適用します。

#### トレースされる操作 {#traced-operations-2}

AI Guard は、以下の Anthropic 操作を自動的に評価します。

- [Messages][2]:
  - `client.messages.create()`
  - `client.messages.stream()`

`anthropic` パッケージが 0.37.0 以上の場合、AI Guard は以下のベータ版メッセージ操作も評価します。

- ベータ版メッセージ:
  - `client.beta.messages.create()`
  - `client.beta.messages.stream()`

[1]: https://github.com/anthropics/anthropic-sdk-python
[2]: https://docs.anthropic.com/en/api/messages
{{% /tab %}}
{{< /tabs >}}

### Node.js {#nodejs}

{{< tabs >}}
{{% tab "AI SDK" %}}
[AI SDK][1] インテグレーションは、テキスト生成、オブジェクト生成、埋め込み、およびツール呼び出しに AI Guard 評価を自動的に適用します。

#### トレースされる操作 {#traced-operations-3}

- [テキスト生成][2]:
  - `generateText`
  - `streamText`
- [オブジェクト生成][3]:
  - `generateObject`
  - `streamObject`
- [ツール呼び出し][4]:
  - `tool.execute`

[1]: https://ai-sdk.dev/docs/introduction
[2]: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
[3]: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
[4]: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
{{% /tab %}}
{{% tab "OpenAI" %}}
OpenAI インテグレーションは、[OpenAI Node.js SDK][1] を通じて行われる呼び出しに AI Guard 評価を自動的に適用します。

#### トレースされる操作 {#traced-operations-4}

AI Guard は、以下の OpenAI 操作を自動的に評価します。

- [Chat Completions][2]:
  - `client.chat.completions.create()`
  - `client.chat.completions.parse()`
- [Responses API][3]:
  - `client.responses.create()`

**注:** ストリーミングリクエスト (`stream: true`) は、AI Guard によって評価されません。

[1]: https://github.com/openai/openai-node
[2]: https://platform.openai.com/docs/api-reference/chat
[3]: https://platform.openai.com/docs/api-reference/responses
{{% /tab %}}
{{< /tabs >}}

### Ruby {#ruby}

{{< tabs >}}
{{% tab "RubyLLM" %}}
[RubyLLM][1] インテグレーションは、チャットメッセージとツール呼び出しに AI Guard 評価を自動的に適用します。

#### トレースされる操作 {#traced-operations-5}

AI Guard は、以下の RubyLLM 操作を自動的に評価します。

- [チャット][2]:
  - `RubyLLM::Chat#ask`
  - `RubyLLM::Chat#complete`
- [ツール呼び出し][3]:
  - `RubyLLM::Chat#handle_tool_calls`

[1]: https://rubyllm.com/
[2]: https://rubyllm.com/chat/
[3]: https://rubyllm.com/tools/
{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}