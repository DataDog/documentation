---
algolia:
  tags:
  - synthetics
aliases:
- /ko/integrations/synthetics/
cascade:
  algolia:
    rank: 70
description: 자동화된 테스트를 사용하여 전 세계 여러 위치에서 시스템과 애플리케이션의 가장 중요한 부분이 가동되고 실행되는지 확인하세요.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: 릴리스 노트
  text: 최신 Datadog Synthetic Monitoring 릴리스를 확인해 보세요! (앱 로그인 필요)
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog Synthetic Monitoring 소개
- link: https://www.datadoghq.com/blog/monitor-cdn-performance-with-synthetic-testing/
  tag: 블로그
  text: Synthetic 테스트 내에서 CDN 성능 모니터링
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: 블로그
  text: 정적 웹 애플리케이션 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링을 사용해 API 테스트 범위  개선
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: Synthetic 테스트 소개
- link: /synthetics/guide/
  tag: 설명서
  text: Synthetic 모니터링 가이드
- link: https://dtdg.co/fe
  tag: \u0008기초 구축
  text: 대화형 세션에 참여하여 synthetic 테스트 역량을 강화하세요.
kind: 설명서
title: Synthetic Monitoring
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/447241955/rendition/1080p/file.mp4?loc=external&signature=47f0bf6adc93cbbd62e4939228c964c19227a2e0aec2d61822417cd2af985c97" poster="/images/poster/synthetics.png" >}}

<br/>

Synthetic 테스트를 통해 **전 세계에서 전송된 요청과 액션을 시뮬레이션**하여 시스템과 애플리케이션의 성능을 파악할 수 있습니다. Datadog은 안정적으로 관리되는 방식을 통해 웹페이지와 API의 백엔드부터 프론트엔드까지, 또한 다양한 네트워크 수준에서(`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, `gRPC`) 성능을 추적합니다. 또한 회귀, 기능의 고장, 응답 속도 지연, 예상하지 못한 상태 코드 등의 문제가 발생했을 때 경고를 보냅니다.

주요 엔드포인트와 사용자 여정에 대해 **SLO를 계산**하면 애플리케이션 성능 목표를 더 쉽게 달성하고 궁극적으로 일관된 고객 경험을 제공할 수 있습니다.

[Datadog 애플리케이션][1], [API][2] 또는 [Terraform][3]에서 Synthetic 테스트를 생성할 수 있습니다.

## API 테스트 및 다단계 API 테스트 설정하기

API 테스트를 사용하면 [단일][4] 또는 [연쇄][5] 요청을 실행하여 다양한 네트워크 수준에서 주요 시스템에 대한 검증을 수행할 수 있습니다: [HTTP 테스트][6], [SSL 테스트][7], [DNS 테스트][8], [WebSocket 테스트][9], [TCP 테스트][10], [UDP 테스트][11], [ICMP 테스트][12], [gRPC 테스트][13].

{{< img src="synthetics/api_test.png" alt="API 테스트" style="width:100%;">}}

## 브라우저 테스트 기록

[Synthetic 브라우저 테스트][14]를 사용하여 전 세계에서 고객이 웹페이지를 엔드투엔드로 경험하는 방식을 모니터링하세요.

{{< img src="synthetics/browser_test.mp4" alt="Browser 테스트" video=true style="width:100%;">}}

## 모바일 애플리케이션 테스트 기록

[Synthetic 모바일 애플리케이션 테스트][21]를 사용하여 고객이 다양한 기기 유형에서 iOS 및 Android 애플리케이션을 엔드투엔드 방식으로 경험하는 방식을 모니터링하세요.

{{< img src="mobile_app_testing/mobile_application_testing_demo.png" alt="Synthetic Mobile Test의 레코딩 워크플로 예시" style="width:100%;">}}

## 프라이빗 위치 사용하기

[Synthetic 프라이빗 위치][15]를 사용하여 내부 API 및 웹사이트를 모니터링하거나 비즈니스에 필수적인 영역에 커스텀 위치를 만들 수 있습니다.

{{< img src="synthetics/private_locations.png" alt="프라이빗 위치" style="width:100%;">}}

## 데이터와 트레이스 연결

[Synthetic 테스트와 APM 트레이스 간의 통합][16]을 사용하여 프론트엔드, 네트워크, 백엔드 요청 전반에서 장애의 근본 원인을 찾습니다.

{{< img src="synthetics/synthetics_traces.mp4" alt="Synthetic Monitoring" video=true style="width:100%;">}}

## 즉시 사용 가능한 대시보드 액세스

[즉시 사용 가능한 Synthetic 대시보드][17]를 사용하여 API 테스트, 다단계 API 테스트, 브라우저 테스트, 프라이빗 위치, Datadog 이벤트에 대한 성능 정보를 분석하세요.

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Synthetic Monitoring & Continuous Testing Summary Dashboard" style="width:100%;">}}

## Synthetic 모니터링 및 Continuous Testing Explorer 사용하기 

Synthetic 테스트 실행 또는 CI/CD 파이프라인에서 실행되는 테스트 배치에 대한 [검색 쿼리 및 시각화][20]를 만듭니다.

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="연속 테스트 탐색기" style="width:100%;">}}

## 테스트 커버리지 추적하기

[애플리케이션의 가장 중요한 워크플로가 테스트되고 있는지 확인]하여 테스트 스위트를 최적화하세요[22]

{{< img src="synthetics/test_coverage/test_coverage.png" alt="연속 테스트 탐색기" style="width:100%;">}}

## 시작할 준비가 되셨나요?

Synthetic 테스트 생성 및 웹 애플리케이션 모니터링에 대한 지침은 [Synthetic 모니터링 시작하기][18]를 참조하세요. 그런 다음 [프라이빗 위치 시작하기][19]를 참조하여 프라이빗 위치를 생성하고 프라이빗 위치로 Synthetic 테스트를 실행하는 방법을 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/synthetics/create#
[2]: /ko/api/latest/synthetics/#create-an-api-test
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[4]: /ko/synthetics/api_tests/
[5]: /ko/synthetics/multistep
[6]: /ko/synthetics/api_tests/http_tests
[7]: /ko/synthetics/api_tests/ssl_tests
[8]: /ko/synthetics/api_tests/dns_tests
[9]: /ko/synthetics/api_tests/websocket_tests
[10]: /ko/synthetics/api_tests/tcp_tests
[11]: /ko/synthetics/api_tests/udp_tests
[12]: /ko/synthetics/api_tests/icmp_tests
[13]: /ko/synthetics/api_tests/grpc_tests
[14]: /ko/synthetics/browser_tests
[15]: /ko/synthetics/private_locations
[16]: /ko/synthetics/apm/
[17]: /ko/synthetics/dashboards/
[18]: /ko/getting_started/synthetics
[19]: /ko/getting_started/synthetics/private_location
[20]: /ko/continuous_testing/explorer/
[21]: /ko/mobile_testing
[22]: /ko/synthetics/test_coverage