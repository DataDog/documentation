---
algolia:
  tags:
  - 클라우드 네트워크 모니터링
  - 네트워크 성능 모니터링
  - CNM
  - NPM
aliases:
- /ko/monitors/network_flow_monitors/
- /ko/graphing/infrastructure/network_performance_monitor/
- /ko/network_performance_monitoring/
- /ko/network_monitoring/performance/
description: 인프라스트럭처의 지점 간 통신에 대한 메트릭을 살펴보세요.
further_reading:
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: 지침
  text: Network Insights를 사용해 애플리케이션 가용성 감지
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: 블로그
  text: 클라우드 네트워크 모니터링으로 Windows 호스트 모니터링
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: 블로그
  text: 클라우드 서비스 자동 감지를 통해 클라우드 엔드포인트 상태 모니터링
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: 블로그
  text: Datadog CNM 시작을 위한 모범 사례
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: 블로그
  text: Datadog CNM은 이제 Consul 네트워킹을 지원합니다.
- link: https://www.datadoghq.com/blog/npm-story-centric-ux/
  tag: 블로그
  text: CNM의 스토리 중심 UX로 네트워크를 빠르게 조사하세요
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: 블로그
  text: 모니터링 및 연결 이탈 해결을 위한 모범 사례
title: 클라우드 네트워크 모니터링
---

## 개요

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog 클라우드 네트워크 모니터링(CNM)은 Datadog의 서비스, 컨테이너, 가용성 영역 및 기타 태그 간의 네트워크 트래픽에 대한 가시성을 제공합니다. IP, 포트, PID 수준의 연결 데이터는 의미 있는 클라이언트와 서버 엔드포인트 간의 애플리케이션 계층 종속성으로 집계되며, 맞춤 설정이 가능한 [네트워크 페이지][1] 및 [네트워크 맵][2]을 통해 분석 및 시각화할 수 있습니다. 플로우 데이터를 주요 네트워크 트래픽 및 DNS 서버 메트릭과 함께 사용하여 다음과 같은 작업을 수행할 수 있습니다:

* 예상치 못한 또는 잠재적인 서비스 종속성 파악
* 비용이 많이 드는 지역 간 또는 멀티 클라우드 통신 최적화
* 클라우드 공급자 지역 및 타사 툴의 운영 중단 파악
* 클라이언트 측 및 서버 측 DNS 서버 문제 해결

CNM을 사용하면 Linux 및 [Windows OS][3]에 대한 기본 지원과 [Istio 서비스 메시로 계측][4]되고 조정되는 컨테이너화된 환경을 통해 복잡한 네트워크를 간단하게 모니터링할 수 있습니다.

또한 CNM의 기능인 [네트워크 경로][5]가 미리 보기로 제공되어 네트워크의 홉별 트래픽을 확인할 수 있습니다.

{{< whatsnext desc="이 섹션에는 다음 항목이 포함됩니다.">}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/setup" >}}<u>설정</u>: 네트워크 데이터를 수집하도록 Agent를 구성합니다.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_analytics" >}}<u>네트워크 분석</u>: 사용 가능한 각 클라이언트와 서버 간의 네트워크 데이터를 그래프로 표시합니다..{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_map" >}}<u>네트워크 지도</u>: 태그 간에 네트워크 데이터를 매핑합니다.{{< /nextlink >}}
    {{< nextlink href="monitors/types/cloud_network_monitoring/" >}}<u>권장 모니터</u>: 권장 CNM 모니터를 구성합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://www.datadoghq.com/blog/npm-windows-support/
[4]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[5]: /ko/network_monitoring/network_path/