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
further_reading:
- link: /synthetics/guide/
  tag: Documentation
  text: Synthetic Monitoring 가이드
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Learning Center
  text: 'Datadog 학습 센터: Synthetic 브라우저 테스트 시작하기'
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 대화형 세션에 참여하여 Synthetic 테스트 역량 강화
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: Blog
  text: Synthetic 테스트로 HTTP 헤더를 보호하는 방법
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: Blog
  text: Datadog Synthetic Monitoring을 통해 사용자 경험에 대한 주요 통찰력을 더 빠르게 얻으세요
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: Blog
  text: Synthetic Monitoring으로 효율적인 UX 스모크 테스트를 만드는 방법
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Datadog Synthetic Monitoring으로 SLO 정확도와 성능을 향상시키세요
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: 모바일 앱을 위한 신뢰할 수 있고 정확한 Synthetic 테스트를 구축하는 방법
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Datadog을 사용하여 클라이언트의 브라우저 테스트를 확장하는 데 도움을 준 방법
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: Blog
  text: Datadog Synthetic Monitoring과 Terraform을 사용하여 Synthetic 테스트 인프라를 자동화하기
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Datadog Synthetic Monitoring으로 사용자 여정 전반에 걸쳐 문제 해결을 간소화하기
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: '성능에서 영향까지: 공유된 맥락을 통해 프론트엔드 팀을 연결하기'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Release Notes
  text: 최신 Datadog Synthetic Monitoring 릴리스를 확인해 보세요! (앱 로그인 필요)
title: Synthetic Testing 및 모니터링
---
{{< learning-center-callout header="활성화 웨비나 세션에 참가하기" hide_image="true" btn_title="가입하기" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  기반 활성화 세션을 탐색하고 등록하세요. Datadog Synthetic Monitoring이 코드 없는 API, 브라우저 및 모바일 테스트를 생성해 사용자 흐름과 요청을 자동으로 시뮬레이션하는 능동적인 모니터링 솔루션임을 알아보세요.
{{< /learning-center-callout >}}

Synthetic 테스트를 통해 전 세계에서 **시뮬레이션된 요청과 액션**을 사용하여 시스템과 애플리케이션의 성능을 관찰할 수 있습니다. Datadog은 백엔드에서 프론트엔드까지, 그리고 다양한 네트워크 수준(`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, `gRPC`)에서 웹페이지와 API의 성능을 통제되고 안정적인 방식으로 추적하며, 회귀, 오작동하는 기능, 높은 응답 시간 및 예상치 못한 상태 코드와 같은 잘못된 동작에 대해 경고합니다. 

**주요 엔드포인트와 사용자 여정에서 SLO를 산정**하면 애플리케이션 성능 목표를 보다 쉽게 준수하고 궁극적으로 일관된 고객 경험을 제공할 수 있습니다.

[Datadog 애플리케이션][1], [API][2] 또는 [Terraform][3]에서 Synthetic 테스트를 생성할 수 있습니다.

## API 테스트 및 다단계 API 테스트 설정하기 {#set-up-api-tests-and-multistep-api-tests}

API 테스트를 사용하면 [단일][4] 또는 [연쇄][5] 요청을 실행하여 다양한 네트워크 수준에서 주요 시스템에 대한 검증을 수행할 수 있습니다: [HTTP 테스트][6], [SSL 테스트][7], [DNS 테스트][8], [WebSocket 테스트][9], [TCP 테스트][10], [UDP 테스트][11], [ICMP 테스트][12] 및 [gRPC 테스트][13]. 

{{< img src="synthetics/api_test.png" alt="API 테스트" style="width:100%;">}}

## 브라우저 테스트 기록 {#record-browser-tests}

[Synthetic 브라우저 테스트][14]를 사용하여 전 세계에서 고객이 웹페이지를 엔드투엔드로 경험하는 방식을 모니터링하세요.

{{< img src="synthetics/browser_test.mp4" alt="브라우저 테스트" video=true style="width:100%;">}}

## 모바일 애플리케이션 테스트 기록 {#record-mobile-application-tests}

[Synthetic 모바일 애플리케이션 테스트][21]를 사용하여 고객이 다양한 장치 유형에서 iOS 및 Android 애플리케이션을 엔드투엔드 방식으로 경험하는 방식을 모니터링하세요.

{{< img src="synthetics/mobile_app_tests.png" alt="Synthetic 모바일 테스트의 녹화 워크플로 예시" style="width:100%;">}}

## 네트워크 경로 테스트 생성 {#create-network-path-tests}

관리되는 위치에서 [Synthetic 네트워크 경로 테스트][25]를 생성하여 TCP, UDP 및 ICMP 검사를 수행하고 전 세계 엔드포인트에서 패킷 경로를 시각화합니다.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Synthetic TCP 네트워크 테스트의 예시" style="width:100%;">}}
## 테스트 모음 {#test-suites}

[Synthetic 테스트 모음][26]를 사용하여 여러 테스트를 사용자 여정, 환경, 위치, 서비스 또는 팀별로 그룹화하여 논리적 컬렉션으로 구성하여 관리 및 문제 해결을 간소화합니다. 

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Synthetic Monitoring 테스트 모음 요약 페이지" style="width:100%;">}}

## 프라이빗 위치 시작하기 {#launch-private-locations}

[Synthetic 프라이빗 위치][15]를 사용하여 내부 API 및 웹사이트를 모니터링하거나 비즈니스에 필수적인 영역에 사용자 지정 위치를 만들 수 있습니다.

{{< img src="synthetics/private_locations.png" alt="비공개 위치" style="width:100%;">}}

## 데이터 및 트레이스 연결하기 {#connect-data-and-traces}

[Synthetic 테스트와 APM 트레이스 간의 통합][16]을 사용하여 프론트엔드, 네트워크, 백엔드 요청 전반에서 장애의 근본 원인을 찾습니다.

{{< img src="synthetics/synthetics_traces.mp4" alt="Synthetic Monitoring" video=true style="width:100%;">}}

## 즉시 사용 가능한 대시보드에 접근하기 {#access-out-of-the-box-dashboards}

[즉시 사용 가능한 Synthetic 대시보드][17]를 사용하여 API 테스트, 다단계 API 테스트, 브라우저 테스트, 비공개 위치, Datadog 이벤트에 대한 성능 정보를 분석합니다. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Synthetic Monitoring 및 Continuous Testing 요약 대시보드" style="width:100%;">}}

## Synthetic Monitoring 및 Synthetic 테스트 결과 탐색기 사용 {#use-the-synthetic-monitoring-testing-results-explorer}

Synthetic 테스트 실행 또는 CI/CD 파이프라인에서 실행되는 테스트 배치에 대한 [검색 쿼리 및 시각화][20]를 만듭니다. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Continuous Testing 탐색기" style="width:100%;">}}

## 테스트 커버리지 추적하기 {#track-testing-coverage}

[애플리케이션의 가장 중요한 워크플로가 테스트되고 있는지 확인]하여 테스트 모음을 최적화합니다[22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Continuous Testing 탐색기" style="width:100%;">}}

## Synthetic Monitoring 알림 {#synthetic-monitoring-notifications}

Synthetic 모니터를 사용하고 확장하여 Synthetic Monitoring 테스트가 실패할 때 경보를 전송할 수 있습니다. 다음 기능을 사용할 수 있습니다:

미리 채워진 모니터 메시지
: 미리 채워진 모니터링 메시지는 Synthetic 테스트 경보를 위한 구조화된 시작점을 제공합니다. 각 메시지는 표준화된 제목, 요약 및 테스트 메타데이터가 포함된 바닥글을 포함하여 경보를 한눈에 이해하기 쉽게 만듭니다.

템플릿 변수
템플릿 변수를 사용하면 모니터링 경보에 테스트별 데이터를 동적으로 주입할 수 있습니다. 이 변수는 `synthetics.attributes` 객체에서 가져옵니다.

고급 사용
고급 사용법에는 더 깊은 테스트 통찰력을 드러내거나 핸들바 템플릿을 사용하여 복잡한 메시지를 구성하는 기술이 포함됩니다.

조건부 경보
: 조건부 경보를 사용하면 특정 테스트 결과나 실패 조건에 따라 모니터링 경보의 내용을 변경할 수 있습니다.

자세한 내용은 [Synthetic Monitoring 경보][24]를 참조하세요.

## 버전 기록 {#version-history}

[Synthetic Monitoring의 버전 기록][23]을 사용하여 테스트의 이전 버전을 실행하거나, 테스트를 저장된 버전으로 복원하거나, 버전을 복제하여 새로운 Synthetic Monitoring 테스트를 생성할 수 있습니다.

## 시작할 준비가 되셨나요? {#ready-to-start}

[Synthetic Monitoring 시작하기][18]를 참조하여 첫 번째 Synthetic 테스트를 생성하고 웹 애플리케이션을 모니터링하는 방법에 대한 지침을 확인하세요. 그런 다음, [개인 위치 시작하기][19]를 탐색하여 개인 위치를 생성하고 개인 위치에서 Synthetic 테스트를 실행하는 방법에 대한 지침을 확인하세요.

## 추가 자료 {#further-reading}

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
[23]: /ko/synthetics/guide/version_history/
[24]: /ko/synthetics/notifications/
[25]: /ko/synthetics/network_path_tests/
[26]: /ko/synthetics/test_suites/