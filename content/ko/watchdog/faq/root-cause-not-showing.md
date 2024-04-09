---
further_reading:
- link: /watchdog/#root-cause-analysis-for-apm-beta
  tag: 설명서
  text: 애플리케이션 성능 모니터링(APM)에 대한 Watchdog 근본 원인 분석
kind: faq
title: 표시되지 않는 근본 원인
---

Watchdog는 특정 유형의 근본 원인을 찾습니다. Watchdog 근본 원인 분석(RCA)은 다음과 같은 근본 원인을 검색합니다.

- [APM 서비스][1]에서 `version` 태그가 캡처한 것과 같은 버전 변경
- APM 계측 서비스의 적중률 메트릭에 캡처된 트래픽 증가
- [Amazon EC2 통합 메트릭][2]에서 캡처한 AWS 인스턴스 오류
- Datadog 에이전트의 [시스템 메트릭][3]에서 캡처한 디스크 공간 부족

근본 원인이 표시되지 않으면 특정 근본 원인이 위에 설명된 유형 중 하나가 아니거나 이를 캡처하도록 설정된 계측이 없는 것일 수 있습니다.

Watchdog RCA가 가장 잘 작동하는 경우

- Watchdog가 서비스 간의 종속성 구조를 알 수 있도록 분산 추적을 사용합니다.
- Watchdog이 언제 새 코드를 배포하는지 파악하고 인프라와 APM 메트릭 지표를 연결할 수 있도록 [통합 서비스 태깅][4]을 사용합니다.

Watchdog이 발견하지 못한 것이 있었나요? 아니면 추가하고 싶은 다른 유형의 근본 원인이 있나요? Datadog은 항상 Watchdog을 더욱 스마트하게 만들기 위해 노력하고 있습니다. [지원 요청 시작][5]을 통해 알려주세요.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: https://docs.datadoghq.com/ko/integrations/amazon_ec2/#metrics
[3]: https://docs.datadoghq.com/ko/integrations/system/#metrics
[4]: https://docs.datadoghq.com/ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes#overview
[5]: https://help.datadoghq.com/hc/en-us/requests/new