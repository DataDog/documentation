---
aliases:
- /ko/security/application_security/threats/trace_qualification
title: 트레이스 검증
---
## 개요 {#overview}

App and API Protection(AAP)은 애플리케이션 수준의 공격에 대한 관측 가능성을 제공하고 각 트레이스가 생성된 조건을 평가합니다. AAP 트레이스 검증은 각 공격을 유해 또는 안전으로 레이블링하여 영향이 가장 큰 공격에 조치를 취할 수 있도록 지원합니다.

가능한 검증 결과를 조회하려면 AAP [Traces Explorer][1]에서 **Qualification** 패싯으로 필터링하세요.


## 검증 결과 {#qualification-outcomes}

AAP는 모든 트레이스에 비공개 소스 검증 규칙을 적용합니다. 패싯 메뉴에 나열된 대로 가능한 검증 결과는 네 가지입니다.

| 검증 결과 | 설명 |
|------|-------------|
| Unknown | AAP에는 이 공격에 대한 검증 규칙이 있지만 검증 여부를 판단하기에 충분한 정보가 없습니다. |
| None successful | AAP는 이 트레이스의 공격이 유해하지 않은 것으로 판단했습니다. |
| Harmful | 트레이스에서 하나 이상의 공격이 성공했습니다. |
| No value | AAP에는 이러한 유형의 공격에 대한 검증 규칙이 없습니다. |

### 트레이스 사이드 패널 {#trace-sidepanel}

개별 트레이스의 세부 정보를 조회할 때도 검증 결과를 볼 수 있습니다.


[1]: https://app.datadoghq.com/security/appsec/traces