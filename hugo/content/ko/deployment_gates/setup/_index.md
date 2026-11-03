---
description: Just-In-Time(JIT)과 사전 구성된 Deployment Gates를 비교하고 선택한 모드의 설정 안내를 따르세요.
further_reading:
- link: /deployment_gates/setup/jit
  tag: 설명서
  text: JIT(Just-In-Time) Deployment Gates 설정
- link: /deployment_gates/setup/preconfigured
  tag: 설명서
  text: 사전 구성된 Deployment Gates 설정
- link: /deployment_gates/explore
  tag: 설명서
  text: Deployment Gates 탐색기에 대해 알아보기
- link: /api/latest/deployment-gates
  tag: API 참조
  text: Deployment Gates API 참조
title: Deployment Gates 설정
---
Deployment Gates를 구성하는 두 가지 요소는 다음과 같습니다.

- **게이트**는 서비스 및 환경(선택적으로 식별자)에 대해 정의되며, 하나 이상의 규칙을 평가하여 배포 진행 여부를 결정합니다.
- **규칙**은 게이트의 일부로 수행되는 하나의 평가 유형입니다(예: 모니터 세트의 상태를 확인하거나 배포된 버전에 대해 APM Faulty Deployment Detection 분석 실행).

게이트 평가는 비동기식으로 이루어 집니다. API는 평가 ID와 함께 즉시 반환되며, 규칙이 실행됨에 따라 결과가 `pass` 또는 `fail`로 해석됩니다.

## Deployment Gate 평가 모드 {#deployment-gate-evaluation-modes}
Deployment Gates는 두 가지 평가 모드 즉, Just-In-Time(JIT)과 사전 구성을 지원합니다.


| | **[JIT][1]** (기본값) | **[사전 구성][2]** |
|---|---|---|
| **규칙이 기록된 위치** | 배포 구성 또는 CI 단계에 인라인으로 구성 | Datadog에 저장(UI, API, Terraform) |
| **Datadog 내 설정** | 없음 | 게이트와 규칙을 사전에 생성 |
| **권장 대상** | 코드형 규칙, 배포별 유연성, 자체 게이트 구성을 보유한 팀, | 서비스 간 공유 규칙, 중앙 관리, CI 외 편집 |
| **평가 방법** | 평가 요청 시 규칙 전송 | 서비스, 환경, 선택적 식별자 기준으로 게이트 참조 |

필요한 경우 각각 다른 게이트마다 상이한 모드를 사용할 수 있습니다.

어디에서 시작해야 할지 잘 모르겠다면 JIT를 사용하세요. Datadog에서는 설정이 필요하지 않으며 배포 구성에서 직접 규칙을 반복적으로 개선할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/deployment_gates/setup/jit
[2]: /ko/deployment_gates/setup/preconfigured