---
further_reading:
- link: /security/ai_guard/setup/manual_integrations/
  tag: 설명서
  text: Manual Integrations
- link: /security/ai_guard/setup/sdk/
  tag: 설명서
  text: SDK
title: Automatic Integrations
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

AI Guard는 API를 수동으로 호출할 필요 없이 지원되는 AI 에코시스템 패키지를 통해 이루어진 LLM 호출을 자동으로 평가할 수 있습니다. 애플리케이션에서 지원되는 패키지 중 하나를 사용하는 경우, Datadog SDK는 해당 호출을 AI Guard를 통해 자동으로 평가하도록 계측합니다. 코드를 변경할 필요가 없습니다.

## 지원되는 프레임워크 및 라이브러리 {#supported-frameworks-and-libraries}

{{< tabs >}}
{{% tab "Python" %}}
| 패키지                      | 지원 버전 | SDK 버전 |
|------------------------------|--------------------|-------------|
| [LangChain](#python)         | 0.1.20 이상          | 3.14.0 이상   |
| [OpenAI](#python)            | 1.102.0 이상         | 4.10.0 이상   |
| [Anthropic](#python)         | 0.28.0 이상          | 4.11.0 이상   |

{{% /tab %}}
{{% tab "Node.js" %}}
| 패키지                          | 지원 버전 | SDK 버전 |
|----------------------------------|--------------------|-------------|
| [AI SDK](#nodejs)                | v6                 | 5.95.0 이상   |
| [OpenAI](#nodejs)                | 4.87.0 이상          | 5.105.0 이상  |
| [Anthropic](#nodejs)             | 0.14.0 이상          | 6.11.0 이상   |

{{% /tab %}}
{{% tab "Ruby" %}}
| 패키지                          | 지원 버전 | SDK 버전 |
|----------------------------------|--------------------|-------------|
| [RubyLLM](#ruby)                 | 1.0.0 이상           | 2.28.0 이상   |

{{% /tab %}}
{{< /tabs >}}

{{< partial name="security-platform/aiguard-sdk-setup.html" target="automatic" >}}

## 통합(Integrations) {#integrations}

### Python {#python}

{{< tabs >}}
{{% tab "LangChain" %}}
LangChain 통합은 [LangChain Python SDK][1]를 통해 이루어진 호출에 AI Guard 평가를 자동으로 적용합니다.

#### 추적되는 작업 {#traced-operations}

AI Guard는 다음 LangChain 작업을 자동으로 평가합니다.

- LLMs:
  - `llm.invoke()`, `llm.ainvoke()`
- [채팅 모델][2]:
  - `chat_model.invoke()`, `chat_model.ainvoke()`
- [Tools][3]:
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`

[1]: https://docs.langchain.com/oss/python/langchain/overview
[2]: https://docs.langchain.com/oss/python/langchain/models
[3]: https://docs.langchain.com/oss/python/langchain/tools
{{% /tab %}}
{{% tab "OpenAI" %}}
OpenAI 통합은 [OpenAI Python SDK][1]를 통해 이루어진 호출에 AI Guard 평가를 자동으로 적용합니다.

#### 추적되는 작업 {#traced-operations-1}

AI Guard는 다음 OpenAI 작업을 자동으로 평가합니다.

- [채팅 완료][2]:
  - `client.chat.completions.create()`
  - `client.chat.completions.parse()`
- [응답 API][3]:
  - `client.responses.create()`
  - `client.responses.parse()`

[1]: https://github.com/openai/openai-python
[2]: https://platform.openai.com/docs/api-reference/chat
[3]: https://platform.openai.com/docs/api-reference/responses
{{% /tab %}}
{{% tab "Anthropic" %}}
Anthropic 통합은 [Anthropic Python SDK][1]를 통해 이루어진 호출에 AI Guard 평가를 자동으로 적용합니다.

#### 추적되는 작업 {#traced-operations-2}

AI Guard는 다음 Anthropic 작업을 자동으로 평가합니다:

- [메시지][2]:
  - `client.messages.create()`
  - `client.messages.stream()`

`anthropic` 패키지 버전 0.37.0 이상의 경우, AI Guard가 다음 베타 메시지 작업도 평가합니다.

- 베타 메시지:
  - `client.beta.messages.create()`
  - `client.beta.messages.stream()`

[1]: https://github.com/anthropics/anthropic-sdk-python
[2]: https://docs.anthropic.com/en/api/messages
{{% /tab %}}
{{< /tabs >}}

### Node.js {#nodejs}

{{< tabs >}}
{{% tab "AI SDK" %}}
[AI SDK][1] 통합은 텍스트 및 객체 생성, 임베딩, 도구 호출에 AI Guard 평가를 자동으로 적용합니다.

#### 추적되는 작업 {#traced-operations-3}

- [텍스트 생성][2]:
  - `generateText`
  - `streamText`
- [객체 생성][3]:
  - `generateObject`
  - `streamObject`
- [도구 호출][4]:
  - `tool.execute`

[1]: https://ai-sdk.dev/docs/introduction
[2]: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
[3]: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
[4]: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
{{% /tab %}}
{{% tab "OpenAI" %}}
OpenAI 통합은 [OpenAI Node.js SDK][1]를 통해 이루어지는 호출에 AI Guard 평가를 자동으로 적용합니다.

#### 추적되는 작업 {#traced-operations-4}

AI Guard는 다음 OpenAI 작업을 자동으로 평가합니다.

- [채팅 완료][2]:
  - `client.chat.completions.create()`
  - `client.chat.completions.parse()`
- [응답 API][3]:
  - `client.responses.create()`

**참고:** 스트리밍 요청(`stream: true`)은 AI Guard에 의해 평가되지 않습니다.

[1]: https://github.com/openai/openai-node
[2]: https://platform.openai.com/docs/api-reference/chat
[3]: https://platform.openai.com/docs/api-reference/responses
{{% /tab %}}
{{< /tabs >}}

### Ruby {#ruby}

{{< tabs >}}
{{% tab "RubyLLM" %}}
[RubyLLM][1] 통합은 채팅 메시지 및 도구 호출에 AI Guard 평가를 자동으로 적용합니다.

#### 추적되는 작업 {#traced-operations-5}

AI Guard는 다음 RubyLLM 작업을 자동으로 평가합니다.

- [채팅][2]:
  - `RubyLLM::Chat#ask`
  - `RubyLLM::Chat#complete`
- [도구 호출][3]:
  - `RubyLLM::Chat#handle_tool_calls`

[1]: https://rubyllm.com/
[2]: https://rubyllm.com/chat/
[3]: https://rubyllm.com/tools/
{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}