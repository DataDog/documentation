---
further_reading:
- link: /security/ai_guard/setup/automatic_integrations/
  tag: 설명서
  text: 자동 통합
- link: /security/ai_guard/setup/sdk/
  tag: 설명서
  text: SDK
title: 수동 통합
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

수동 통합의 경우 AI Guard 보호 기능을 활성화하려면 추가 구성이 필요합니다. 각 프레임워크별 지침에 따라 AI Guard 평가를 설정하세요.

## 지원되는 프레임워크 및 라이브러리 {#supported-frameworks-and-libraries}

<div class="alert alert-tip">수동 통합은 Amazon Strands 및 LiteLLM Proxy에서 지원됩니다. 기타 프레임워크나 사용자 지정 LLM 또는 도구 호출 코드의 경우 <a href="/security/ai_guard/setup/sdk/">SDK</a>를 사용하여 <code>evaluate()</code> 코드에서 호출하세요.</div>

### Python {#python}

| 프레임워크                         | 지원 버전 | SDK 버전 |
| --------------------------------- | ------------------ | -------------- |
| [Amazon Strands](#amazon-strands) | >= 1.29.0          | >= 4.7.0       |
| [LiteLLM Proxy](#litellm-proxy)   | >= 1.78.5          | >= 4.8.0       |

{{< partial name="security-platform/aiguard-sdk-setup.html" target="manual" >}}

## Integrations {#integrations}

### Amazon Strands {#amazon-strands}
#### Python {#python-1}

Amazon Strands 통합을 통해 [Amazon Strands Agents SDK][1]로 빌드된 애플리케이션에서 AI Guard 평가를 수행할 수 있습니다.

##### 설정 {#setup}

dd-trace-py v4.7.0 이상을 설치합니다.

```shell
pip install ddtrace>=4.7.0
```

다음으로, 플러그인/후크 공급자를 사용하여 통합 진입점을 정의합니다.

* 플러그인(권장):

```python
from ddtrace.appsec.ai_guard import AIGuardStrandsPlugin

agent = Agent(
    model=model,
    plugins=[AIGuardStrandsPlugin()]
)
```

* 후크 공급자(레거시):

```python
from ddtrace.appsec.ai_guard import AIGuardStrandsHookProvider

agent = Agent(
    model=model,
    hooks=[AIGuardStrandsHookProvider()]
)
```

[1]: https://github.com/strands-agents/sdk-python

### LiteLLM Proxy {#litellm-proxy}
#### Python {#python-2}

LiteLLM Proxy 통합을 통해 [LiteLLM Proxy][1]를 사용하는 애플리케이션에서 AI Guard 평가를 수행할 수 있습니다.

##### 설정 {#setup-1}

dd-trace-py v4.8.0 이상을 설치합니다.

```shell
pip install ddtrace>=4.8.0
```

Datadog의 LiteLLM 가드레일을 구성 파일 옆으로 가져옵니다(예: `guardrails.py`).

```python
from ddtrace.appsec.ai_guard.integrations.litellm import DatadogAIGuardGuardrail

__all__ = ["DatadogAIGuardGuardrail"]
```

가져온 가드레일을 구성 파일에 추가합니다.

```yaml
guardrails:
  - guardrail_name: datadog_ai_guard
    litellm_params:
      guardrail: guardrails.DatadogAIGuardGuardrail
      mode: [pre_call, post_call]
      on_input: true
      on_output: true
      block: true
```

이 가드레일은 세 가지 모드(`pre_call`, `post_call`, `during_call`)를 모두 지원합니다.

기본적으로 가드레일은 AI Guard 서비스 설정에서 지정한 차단 구성을 따릅니다. 차단을 비활성화하려면 `block` 파라미터를 `false`로 설정합니다([SDK][2] 및 [REST API][3]의 `block` 옵션과 동일).

[1]: https://docs.litellm.ai/docs/simple_proxy
[2]: /ko/security/ai_guard/setup/sdk/
[3]: /ko/security/ai_guard/setup/http_api/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}