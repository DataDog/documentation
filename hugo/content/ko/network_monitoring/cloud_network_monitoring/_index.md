---
algolia:
  tags:
  - Cloud Network Monitoring
  - Network Performance Monitoring
  - CNM
  - NPM
aliases:
- /ko/monitors/network_flow_monitors/
- /ko/graphing/infrastructure/network_performance_monitor/
- /ko/network_performance_monitoring/
- /ko/network_monitoring/performance/
description: 인프라의 지점 간 통신에 대한 메트릭을 살펴보세요.
further_reading:
- link: https://www.datadoghq.com/architecture/hybrid-cloud-network-observability/
  tag: 아키텍처 센터
  text: 하이브리드 멀티클라우드 네트워크 관측 가능성 참조 아키텍처
- link: https://www.datadoghq.com/blog/cnm-network-health
  tag: 블로그
  text: CNM Network Health를 통한 네트워크 문제의 간편한 감지, 진단 및 해결하기
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: 가이드
  text: Network Insights를 사용해 애플리케이션 가용성 감지
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: 블로그
  text: Cloud Network Monitoring으로 Windows 호스트 모니터링하기
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: 블로그
  text: 클라우드 서비스 자동 감지를 통해 클라우드 엔드포인트 상태 모니터링하기
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: 블로그
  text: Datadog CNM 시작을 위한 모범 사례
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: 블로그
  text: Consul 네트워킹을 지원하는 Datadog CNM
- link: https://www.datadoghq.com/blog/npm-story-centric-ux/
  tag: 블로그
  text: CNM의 스토리 중심 UX로 네트워크 빠르게 조사하기
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: 블로그
  text: 모니터링 및 연결 이탈 해결을 위한 모범 사례
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: 문서
  text: CNM 용어 및 개념
- link: https://learn.datadoghq.com/courses/getting-started-infra-cnm
  tag: 학습 센터
  text: 인프라 및 Cloud Network Monitoring(CNM) 시작하기
title: Cloud Network Monitoring
---
## 개요 {#overview}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog Cloud Network Monitoring(CNM)은 서비스, 컨테이너, Availability Zone 및 Datadog의 기타 태그 간 네트워크 트래픽에 대한 가시성을 제공합니다. IP, 포트 및 PID 수준의 연결 데이터는 의미 있는 클라이언트 및 서버 엔드포인트 간의 애플리케이션 계층 종속성으로 집계되며, 이는 사용자 지정 가능한 [네트워크 페이지][1] 및 [Network Map][2]을 통해 분석하고 시각화할 수 있습니다. 주요 네트워크 트래픽 및 DNS 서버 메트릭과 함께 흐름 데이터를 사용하여 다음을 수행하세요.

* 예상치 못한 또는 잠재적인 서비스 종속성 파악
* 비용이 많이 드는 리전 간 또는 멀티 클라우드 통신 최적화
* 클라우드 공급자 리전 및 타사 툴의 운영 중단 파악
* 클라이언트 측 및 서버 측 DNS 서버 문제 해결

{{< whatsnext desc="이 섹션에는 다음 주제가 포함되어 있습니다.">}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/setup" >}}<u>설정</u>: 네트워크 데이터를 수집하도록 Agent를 구성하세요.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_health" >}}<u>네트워크 상태</u>: 네트워크 환경의 상태를 확인하세요.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_analytics" >}}<u>네트워크 분석</u>: 사용 가능한 각 클라이언트와 서버 간의 네트워크 데이터를 그래프로 표시하세요.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/network_path/setup/#scheduled-tests" >}}<u>네트워크 경로 예약된 테스트</u>: 예약된 테스트를 사용하여 네트워크 트래픽이 출발지에서 목적지까지 이동하는 경로를 시각화하세요.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/network_path/setup/#dynamic-tests" >}}<u>네트워크 경로 동적 테스트</u>: 테스트를 동적으로 생성하여 Agent가 네트워크 경로를 자동으로 검색하고 모니터링하도록 하세요.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_map" >}}<u>네트워크 맵</u>: 태그 간의 네트워크 데이터를 매핑하세요.{{< /nextlink >}}
    {{< nextlink href="monitors/types/cloud_network_monitoring/#common-monitors" >}}<u>공통 모니터</u>: 공통 CNM 모니터를 구성하세요.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map