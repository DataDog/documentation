---
further_reading:
- link: /security/ai_guard/onboarding/
  tag: 설명서
  text: AI Guard 시작
- link: /security/ai_guard/signals/
  tag: 설명서
  text: AI Guard 보안 신호
- link: https://www.datadoghq.com/blog/ai-guard/
  tag: 블로그
  text: Datadog AI Guard로 에이전트형 AI 애플리케이션 보호하기
- link: https://www.datadoghq.com/blog/llm-guardrails-best-practices/
  tag: 블로그
  text: 'LLM 가드레일: LLM 앱을 안전하게 배포하기 위한 모범 사례'
- link: https://www.datadoghq.com/blog/securing-ai-agents-guardrail-placement/
  tag: 블로그
  text: 'AI Agent 보안: 가드레일 배치가 핵심 설계 결정인 이유'
title: AI Guard
---
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">AI Guard는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

{{< callout url="" btn_hidden="true" header="AI Guard에 액세스하세요!">}}
AI Guard 기능에 대한 액세스를 요청하려면 다음 양식 중 하나를 사용하세요.
- <a href="https://www.datadoghq.com/product-preview/ai-security/">사용자 지정 에이전트 런타임 보호</a>(제한된 액세스): 런타임 공격으로부터 사용자 지정 AI 에이전트를 보호합니다.
- <a href="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/">코딩 에이전트 런타임 보호</a>(미리 보기): 개발자 워크플로에서 코딩 에이전트를 보호하여 AI가 생성한 코드를 안전하게 배포할 수 있습니다.
{{< /callout >}}

Datadog AI Guard는 실시간으로 AI 동작을 **검사**, **차단** 및 **관리**하도록 설계된 심층 방어 제품입니다. AI Guard는 기존 Datadog 추적 및 Observability 워크플로와 직접 연결되어 프로덕션 환경의 AI Agent 시스템을 보호하도록 구축되었습니다. 이 제품은 **AI 앱/에이전트와 인라인으로** 통합되어 기존 프롬프트 템플릿, 가드레일 및 정책 검사 위에 계층화됨으로써 **임계 경로에서 LLM 워크플로를 보호**합니다.

AI Guard는 프롬프트 보호, 도구 보호 및 민감한 데이터 보호 기능을 통해 프롬프트 인젝션, 탈옥 및 민감한 데이터 유출 공격으로부터 보호합니다. 이러한 기능들은 모두 [에이전트형 AI의 치명적 3요소][3]의 위협을 예방합니다.
- 권한 있는 시스템 액세스
- 신뢰할 수 없는 데이터에 대한 노출
- 아웃바운드 통신

또한 AI Guard는 LLM 입력 및 출력에서 개인 식별 정보(PII) 및 기밀과 같은 민감한 데이터를 탐지합니다. 이러한 보호 기능은 OpenAI, Anthropic, Bedrock, VertexAI 및 Azure를 포함한 모든 대상 AI 모델에 적용됩니다. AI Agent와 서비스가 서로 어떻게 상호 작용하는지, 그리고 AI Guard가 어떤 것을 보호하고 있는지 등 매핑된 내용을 확인하려면 [{{< ui >}}Discover{{< /ui >}}][5] 페이지로 이동하세요.

코드나 설정 없이 대화를 빠르게 평가하려면 [{{< ui >}}AI Guard Playground{{< /ui >}}][4]를 사용하여 사용자 입력, 어시스턴트 출력 및 도구 호출을 제출하고 실시간으로 평가 결과를 확인하세요.

AI Guard 설정 방법에 대한 자세한 내용은 [AI Guard 시작하기][1]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/ai_guard/onboarding/
[2]: https://genai.owasp.org/llm-top-10/
[3]: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
[4]: /ko/security/ai_guard/onboarding/#playground
[5]: https://app.datadoghq.com/security/ai-guard/discover