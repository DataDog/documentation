---
aliases: null
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog 애플리케이션 보안 관리로 위협으로부터 보호
- link: /security/application_security/how-appsec-works//
  tag: 설명서
  text: 애플리케이션 보안 관리 작동 방법
title: 트레이스 검증
---

## 개요

ASM(애플리케이션 보안 관리)은 애플리케이션 수준 공격에 대한 옵저버빌리티를 제공하고 각 트레이스가 생성된 조건을 평가합니다. ASM 트레이스 검증은 각 공격에 유해함 또는 안전함을 표시하여 가장 강도가 높은 공격에 대해 조치를 취하는 데 도움을 줍니다.

가능한 검증 결과를 보려면 ASM [Traces Explorer][1]에서 **Qualification** 패싯으로 필터링하세요.

{{< img src="security/application_security/threats/trace_qualification/trace-qualification-traces_2.png" alt="가능한 검증 결과를 보여주는 검증 패싯이 있는 ASM 트레이스 목록">}}

## 검증 결과

ASM은 모든 트레이스에 대해 검증 규칙(비공개 소스)을 실행합니다. 패싯 메뉴에 나열된 대로 네 가지의 가능한 검증 결과가 있습니다.

| 검증 결과 | 설명 |
|------|-------------|
| 알 수 없음 | ASM에는 이 공격에 대한 검증 규칙을 가지고 있지만 검증 결정을 내릴 만큼 충분한 정보가 없습니다. |
| None successful | ASM은 이 트레이스의 공격이 해롭지 않다고 판단했습니다. |
| Harmful | 트레이스에서 하나 이상의 공격이 성공했습니다. |
| No value | ASM에는 이러한 유형의 공격에 대한 검증 규칙이 없습니다. |

### 트레이스 사이드패널

검증 결과는 개별  트레이스의 세부 정보를 확인할 때도 볼 수 있습니다. </br>
ASM이 안전한 것으로 판단한 트레이스의 예:

{{< img src="security/application_security/threats/trace_qualification/trace-none-successful_3.png" alt="ASM이 안전한 것으로 검증한 트레이스">}}

ASM이 유해하다고 판단한 트레이스의 예:

{{< img src="security/application_security/threats/trace_qualification/trace-harmful_2.png" alt="ASM이 유해한 것으로 검증한 트레이스">}}

[1]: https://app.datadoghq.com/security/appsec/traces
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}