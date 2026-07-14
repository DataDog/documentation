---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
  tag: 설명서
  text: Runtime Prioritization Engine
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: 설명서
  text: 심각도 점수
- link: /security/security_inbox/
  tag: 설명서
  text: Security Inbox에서 우선순위가 지정된 탐지 결과 검토하기
title: 분류 및 우선순위 매기기
---
Cloud Security는 취약점, 잘못된 구성 및 ID 위험 전반에 걸쳐 탐지 결과를 생성합니다. 분류 및 우선순위 매기기는 서로 관련 있는 두 가지 기능으로 구성됩니다. 하나는 비즈니스에 중요한 리소스를 노출시키는 탐지 결과를 식별하는 엔진이고, 다른 하나는 이러한 판단을 탐지 결과별 점수로 환산하여 사용자가 이를 정렬, 필터링, 라우팅에 활용할 수 있게 지원하는 점수 산정 프레임워크입니다.

## Runtime Prioritization Engine {#runtime-prioritization-engine}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Runtime Prioritization Engine은 일부 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="미리 보기에 참여하세요!">}}
Cloud Security 취약성을 위한 Runtime Prioritization Engine이 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 이 양식을 사용하세요.
{{< /callout >}}

[Runtime Prioritization Engine][1]은 런타임 관측 가능성과 보안 데이터를 결합하여 비즈니스에 중요한 리소스를 실제로 노출시키는 약 5%의 탐지 결과를 식별합니다. 각 탐지 결과는 도달 가능성, 노출도, 악용 가능성, 비즈니스 중요도 및 실행 가능성의 5가지 기준으로 평가됩니다.

## 심각도 점수 {#severity-scoring}

[심각도 점수][2]는 Runtime Prioritization Engine의 결과값을 각 탐지 결과의 Datadog 심각도 점수로 환산합니다. 취약점의 경우, [CVSS 4.0][3] 알고리즘을 따르며, 기본 점수에 시간적 요인(예: 활성 상태의 익스플로잇 또는 악용 가능성)과 환경적 요인(예: 런타임 컨텍스트, 노출도 또는 영향을 받는 리소스의 중요도)을 반영합니다. 잘못된 구성 및 ID 위험의 경우, 공격자가 탐지 결과를 악용할 가능성과 그 악용이 초래할 피해를 고려하여 심각도를 계산하는 '발생 가능성 × 영향' 매트릭스를 사용합니다.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[2]: /ko/security/cloud_security_management/triage_and_prioritize/severity_scoring/
[3]: https://www.first.org/cvss/v4-0/