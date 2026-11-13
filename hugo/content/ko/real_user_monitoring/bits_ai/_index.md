---
aliases:
- /ko/real_user_monitoring/ai_investigations/
description: RUM에서 Bits Investigation과 Bits Chat을 사용하여 애플리케이션 성능을 최적화하고, 성능 저하의 근본
  원인을 파악하며, 프런트엔드에 관한 질문을 합니다.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: 설명서
  text: Bits Investigation
- link: /bits_ai/bits_chat/
  tag: 설명서
  text: Bits Chat
- link: /real_user_monitoring/operations_monitoring/
  tag: 설명서
  text: 운영 모니터링
title: RUM에서 Bits 사용
---
## 개요 {#overview}

Real User Monitoring(RUM)은 [Bits AI][1]와 통합되어 있습니다. RUM에서 [Bits Investigations][2]를 시작하고 모든 RUM 페이지에서 [Bits Chat][3]을 사용할 수 있습니다. RUM은 Core Web Vitals, 뷰 로드 타임라인, 작업 상태 및 세션 수준 신호 등 프런트엔드 관련 컨텍스트를 Bits에 제공합니다. Bits는 해당 컨텍스트를 APM 트레이스, 로그, 프로필, 소스 코드 등 다른 텔레메트리 데이터와 연결하여 근본 원인을 파악합니다.

이러한 조사는 Bits Investigation에서 실행되므로, RUM에서 시작한 모든 조사는 [Bits Investigations list][4]에 저장됩니다. 또한 팀과 공유할 수 있고, 이전 피드백이 반영되며, [Bits Code][5]로 전송하여 수정 사항을 생성할 수도 있습니다.

RUM에서 Bits를 사용하는 방법은 다음 세 가지입니다.

| 사용 사례 | 설명 | Bits 기능 |
|---|---|---|
| [성능 최적화][6] | 애플리케이션 성능에 영향을 미칠 수 있는 문제에 대한 권장 사항을 확인하고, 원하는 문제에 대한 조사를 시작합니다. | Bits Investigation |
| [성능 저하 및 경보 조사][7] | 성능 메트릭의 이상을 조사하거나 경보를 발생시키는 모니터에서 자동 조사를 활성화합니다. | Bits Investigation |
| [질문하고 작업 수행][8] | 모든 RUM 페이지에서 `Why is this view slow?` 또는 `Which pages have the worst INP?` 등의 질문을 하고 Bits가 사용자를 대신하여 조치를 취하도록 합니다. | Bits Chat |

## 전제 조건 {#prerequisites}

- 조직에서 Bits AI를 활성화해야 합니다.
- Bits Investigation을 시작하려면 **Bits Investigations Write** 권한이 필요합니다. 자세한 내용은 [Configure Bits Investigation][9]을 참조하세요.
- 코드 수준의 발견 결과를 얻으려면 GitHub와 [소스 코드 통합][10]을 설정합니다.
- Bits가 프런트엔드 문제의 원인을 백엔드 서비스에서 찾을 수 있도록 [RUM과 APM 트레이스를 연결][11]합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/
[2]: /ko/bits_ai/bits_investigation/
[3]: /ko/bits_ai/bits_chat/
[4]: https://app.datadoghq.com/bits-ai/investigations
[5]: /ko/bits_ai/bits_code/
[6]: /ko/real_user_monitoring/bits_ai/optimize_performance/
[7]: /ko/real_user_monitoring/bits_ai/investigate_regressions/
[8]: /ko/real_user_monitoring/bits_ai/bits_chat/
[9]: /ko/bits_ai/bits_investigation/configure/
[10]: /ko/source_code/
[11]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/