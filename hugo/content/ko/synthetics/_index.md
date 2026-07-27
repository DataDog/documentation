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
  tag: 설명서
  text: Synthetic Monitoring 가이드
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: 학습 센터
  text: 'Datadog 학습 센터: Synthetic 브라우저 테스트 시작하기'
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 Synthetic 테스트 역량 강화
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: 블로그
  text: Synthetic 테스트로 HTTP 헤더 보안을 확보하는 방법
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: 블로그
  text: Datadog Synthetic Monitoring으로 사용자 경험에 대한 주요 인사이트를 더 빨리 얻기
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: 블로그
  text: Synthetic Monitoring으로 효율적인 UX 스모크 테스트를 생성하는 방법
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: 블로그
  text: Datadog Synthetic Monitoring으로 SLO 정확도 및 성능 향상
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: 블로그
  text: 모바일 앱용으로 신뢰할 수 있고 정확한 Synthetic 테스트를 구축하는 방법
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: 블로그
  text: Datadog로 고객의 브라우저 테스트를 확장하도록 도운 사례
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: 블로그
  text: Datadog Synthetic Monitoring 및 Terraform으로 Synthetic 테스트 인프라 자동화
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: 블로그
  text: Datadog Synthetic Monitoring으로 사용자 여정 전반의 문제 해결 간소화
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: 블로그
  text: '성능에서 영향까지: 공유 컨텍스트를 통한 프런트엔드 팀 연결'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: 릴리스 노트
  text: Datadog Synthetic Monitoring 최신 릴리스를 확인하세요! (앱 로그인 필요)
title: Synthetic Testing 및 모니터링
---
{{< learning-center-callout header="활성화 웨비나 세션에 참가하기" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  기반 활성화 세션을 탐색하고 등록하세요. Datadog Synthetic Monitoring이 어떻게 코드 없이 API, 브라우저 및 모바일 테스트를 생성하여 애플리케이션, 주요 엔드포인트, 네트워크 계층에 대한 사용자 흐름과 요청을 자동으로 시뮬레이션할 수 있는 선제적 모니터링 솔루션인지 알아보세요.
{{< /learning-center-callout >}}

Synthetic 테스트를 이용하면 **전 세계에서 수집한 시뮬레이션된 요청 및 액션**을 사용하여 시스템과 애플리케이션의 성능을 관찰할 수 있습니다. Datadog은 백엔드에서 프런트엔드는 물론 다양한 네트워크 수준(`HTTP`, `SSL`, `DNS`, `WebSocket`,, `TCP`, `UDP`, `ICMP`, `gRPC`)에서 통제되고 안정적인 방식으로 웹 페이지와 API의 성능을 추적하며, 성능 저하, 기능 고장, 긴 응답 시간 및 예기치 않은 상태 코드 등 오류 동작에 관해 사용자에게 알립니다. 

주요 엔드포인트 및 사용자 여정에 대해 **SLO를 계산**하면 더 쉽게 애플리케이션 성능 목표를 달성하고, 궁극적으로 일관된 고객 경험을 제공할 수 있습니다.

[Datadog 애플리케이션][1], [API][2] 또는 [Terraform][3]에서 Synthetic 테스트를 생성할 수 있습니다.

## API 테스트 및 다단계 API 테스트 설정 {#set-up-api-tests-and-multistep-api-tests}

API 테스트를 사용하면 [단일][4] 또는 [연쇄][5] 요청을 실행하여 [HTTP 테스트][6], [SSL 테스트][7], [DNS 테스트][8], [WebSocket 테스트][9], [TCP 테스트][10], [UDP 테스트][11], [ICMP 테스트][12] 및 [gRPC 테스트][13] 등 다양한 네트워크 수준에서 주요 시스템에 대한 검증을 수행할 수 있습니다. 

{{< img src="synthetics/api_test.png" alt="API 테스트" style="width:100%;">}}

## 브라우저 테스트 기록 {#record-browser-tests}

[Synthetic 브라우저 테스트][14]를 사용하여 전 세계에서 고객이 웹페이지를 엔드투엔드로 경험하는 방식을 모니터링하세요.

{{< img src="synthetics/browser_test.mp4" alt="브라우저 테스트" video=true style="width:100%;">}}

## 모바일 애플리케이션 테스트 기록 {#record-mobile-application-tests}

[Synthetic 모바일 애플리케이션 테스트][21]를 사용하여 고객이 다양한 장치 유형에서 iOS 및 Android 애플리케이션을 엔드투엔드 방식으로 경험하는 방식을 모니터링하세요.

{{< img src="synthetics/mobile_app_tests.png" alt="Synthetic 모바일 테스트의 녹화 워크플로 예시" style="width:100%;">}}

## 네트워크 경로 테스트 생성 {#create-network-path-tests}

관리형 위치에서 [Synthetic 네트워크 경로 테스트][25]를 생성하여 TCP, UDP 및 ICMP 검사를 수행하고 글로벌 엔드포인트 전체의 패킷 경로를 시각화합니다.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Synthetic TCP 네트워크 테스트 예시" style="width:100%;">}}
## 테스트 모음 {#test-suites}

[Synthetic 테스트 모음][26]을 사용하여 여러 테스트를 사용자 여정, 환경, 위치, 서비스 또는 팀 기준으로 그룹화한 논리적 컬렉션으로 정리하여 관리와 문제 해결을 간소화합니다. 

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Synthetic Monitoring 테스트 모음 요약 페이지" style="width:100%;">}}

## 프라이빗 위치 사용 {#launch-private-locations}

[Synthetic 프라이빗 위치][15]를 사용하여 내부 API 및 웹사이트를 모니터링하거나 비즈니스에 필수적인 영역에 사용자 지정 위치를 만들 수 있습니다.

{{< img src="synthetics/private_locations.png" alt="프라이빗 위치" style="width:100%;">}}

## 데이터 및 트레이스 연결 {#connect-data-and-traces}

[Synthetic 테스트와 APM 트레이스 간의 통합][16]을 사용하여 프론트엔드, 네트워크, 백엔드 요청 전반에서 장애의 근본 원인을 찾습니다.

{{< img src="synthetics/synthetics_traces.mp4" alt="Synthetic Monitoring" video=true style="width:100%;">}}

## 즉시 사용 가능한 대시보드 액세스 {#access-out-of-the-box-dashboards}

[즉시 사용 가능한 Synthetic 대시보드][17]를 사용하여 API 테스트, 다단계 API 테스트, 브라우저 테스트, 비공개 위치, Datadog 이벤트에 대한 성능 정보를 분석합니다. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Synthetic Monitoring 및 Continuous Testing 요약 대시보드" style="width:100%;">}}

## Synthetic Monitoring 및 Testing Results Explorer 사용 {#use-the-synthetic-monitoring-testing-results-explorer}

Synthetic 테스트 실행 또는 CI/CD 파이프라인에서 실행되는 테스트 배치에 대한 [검색 쿼리 및 시각화][20]를 만듭니다. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Continuous Testing 탐색기" style="width:100%;">}}

## 테스트 커버리지 추적 {#track-testing-coverage}

[애플리케이션의 가장 중요한 워크플로가 테스트되고 있는지 확인]하여 테스트 모음을 최적화합니다[22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Continuous Testing 탐색기" style="width:100%;">}}

## Synthetic Monitoring 알림 {#synthetic-monitoring-notifications}

Synthetic 모니터를 사용하고 강화하여 Synthetic Monitoring 테스트가 실패할 때 알림을 보냅니다. 다음과 같은 기능을 사용할 수 있습니다.

미리 채워진 모니터 메시지
: 미리 채워진 모니터 메시지는 Synthetic 테스트 경보를 위한 구조화된 시작점을 제공합니다. 각 메시지에 표준화된 제목, 요약 및 테스트 메타데이터를 포함하는 푸터가 포함되어 경보를 한눈에 더 쉽게 파악할 수 있습니다.

템플릿 변수
: 템플릿 변수를 사용하면 테스트별 데이터를 모니터 알림에 동적으로 주입할 수 있습니다. 이러한 변수는 `synthetics.attributes` 개체에서 가져옵니다.

고급 사용
: 고급 사용에는 더 심층적인 테스트 인사이트를 드러내거나 handlebars 템플릿을 사용하여 복잡한 메시지를 구조화하는 기법이 포함됩니다.

조건부 경보
: 조건부 경보를 사용하면 특정 테스트 결과 또는 오류 조건에 따라 모니터 알림의 내용을 변경할 수 있습니다.

자세한 내용은 [Synthetic Monitoring 알림][24]을 참조하세요.

## 버전 기록 {#version-history}

[Synthetic Monitoring의 버전 기록][23]을 사용하여 테스트의 이전 버전을 실행하고, 테스트를 저장된 버전으로 복원하거나, 버전을 복제하여 새 Synthetic Monitoring 테스트를 생성합니다.

## 시작할 준비가 되셨나요? {#ready-to-start}

첫 Synthetic 테스트를 생성하고 웹 애플리케이션을 모니터링하는 방법에 대한 지침은 [Synthetic Monitoring 시작하기][18]를 참조하세요. 그런 다음, [프라이빗 위치 시작하기][19]에서 프라이빗 위치를 생성하고 프라이빗 위치로 Synthetic 테스트를 실행하는 방법에 대한 지침을 참조하세요.

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