---
algolia:
  tags:
  - logs
aliases:
- /ko/guides/logs/
- /ko/en/logs
- /ko/logs/logging_without_limits
cascade:
  algolia:
    rank: 70
description: Datadog Agent가 호스트, 컨테이너 및 서비스에서 로그를 수집하도록 구성하세요.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Release Notes
  text: 최신 Datadog Log Management 릴리스 확인(앱에 로그인해야 함)
- link: /logs/log_collection/
  tag: Documentation
  text: 로그 수집 시작
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Learning Center
  text: Log Management 소개
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 인터랙티브 방식 세션에 참여해 Log Management 최적화
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: 로그 이상 탐지를 사용해 인시던트 조사 속도 높이기
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Datadog Log Management로 IoT 장치를 대규모로 모니터링
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: Blog
  text: Datadog으로 방화벽 로그 모니터링
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: CIDR 표기법 쿼리를 사용해 네트워크 트래픽 로그 필터링
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Datadog Cloud SIEM으로 1Password 모니터링
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: Subqueries를 사용하여 동적으로 로그 필터링 및 상관관계 분석
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: DNS 로그를 모니터링하여 네트워크 및 보안 분석
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Datadog을 사용한 Log Management 인덱싱 전략 가이드
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Datadog Archive Search로 과거 로그를 더 효율적으로 검색
title: Log Management
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  개론 또는 중급 인에이블먼트 세션에 참여해 Datadog Log Management가 로그, 메트릭, 트레이스를 어떻게 하나의 보기로 통합하여 로그 데이터 분석에 유용한 풍부한 컨텍스트를 제공하는지 알아보세요.
{{< /learning-center-callout >}}

## 개요

시스템 운영의 중요한 부분을 로깅하는 작업은 인프라 상태를 양호하게 유지하는 데 매우 중요합니다. 최신 인프라는 1분당 수천 개의 로그 이벤트를 생성할 수 있습니다. 이런 상황에서는 사용자가 어느 로그를 로그 관리 솔루션으로 보내고, 어느 로그를 보관할지 선택해야 합니다. 하지만 로그를 보내기 전에 필터링하면 커버리지에 빈틈이 생기거나, 귀중한 데이터를 우발적으로 제거하는 사태가 발생할 수 있습니다.

Datadog Log Management(Datadog 로그 또는 로깅이라고도 함)는 로그 수집을 인덱싱에서 분리하여 이러한 제한을 제거합니다. 이렇게 하면 모든 로그를 아무런 제한 없이 비용 효과적으로 수집, 처리, 보관, 탐색, 모니터링할 수 있습니다. 이것을 Logging without Limits*라고 합니다.

Logging without Limits*는 [Log Explorer][1]에서 간소화된 문제 해결 경험을 제공합니다. 따라서 사용자와 사용자 팀원들이 인프라 문제를 신속하게 평가하고 해결할 수 있습니다. 또한 직관적인 아카이빙을 제공하여 감사 및 평가 시 보안팀과 IT 팀을 지원합니다. 또한 Logging without Limits*는 [Datadog Cloud SIEM][2]의 기반이기도 합니다. 이 기능은 사용자가 로그를 인덱싱할 필요 없이 사용자 환경의 보안 위협을 탐지합니다.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## 수집

호스트, 컨테이너, 클라우드 제공업체, 기타 소스에서 [로그를 수집][4]해 Datadog Log Management를 시작하세요.

## 구성

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configure your logs all in one place" >}}

로그가 수집되고 나면 [Log Configuration 옵션][5]을 사용해 파이프라인 및 프로세서로 모든 로그를 처리 및 보강하고, 인덱스로 로그 관리 예산을 제어하고, 수집된 로그에서 메트릭을 생성하고, 스토리지 최적화 아카이브에서 로그를 관리하세요.

## 연결

{{< img src="/logs/connect.png" alt="Correlate logs with metrics or traces" style="width:80%;">}}

로그를 메트릭 및 트레이스에 연결하여 가시성의 핵심 요소를 활용하세요.

- [로그와 트레이스를 연결][6]해 애플리케이션에 대한 가시성을 얻습니다.
- [로그와 메트릭의 상관관계를 정립][7]해 문제의 컨텍스트를 얻고, 이를 서비스 전체에 매핑합니다.

## 탐색

[Log Explorer][1]에서 수집한 로그를 둘러보세요.

**팁**: Datadog 글로벌 검색에서 Log Explorer를 열려면 <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd>를 누르고 `logs`를 검색합니다.

{{< img src="/logs/explore.png" alt="Explore your ingested logs" style="width:80%;">}}

- [검색][8]: 로그 전체를 검색합니다.
- [Live Tail][9]: 환경 전체에서 수집된 로그를 실시간으로 확인합니다.
- [분석][10]: 인덱싱된 로그를 대상으로 Log Analytics를 수행합니다.
- [패턴][11]: 인덱싱된 로그를 클러스터링해 로그 패턴을 파악합니다.
- [Saved Views][12]: 저장된 보기를 사용해 Log Explorer를 자동으로 구성하세요.


{{< learning-center-callout header="Try Introduction to Log Management in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  실제 클라우드 컴퓨팅 용량과 Datadog 평가판 계정으로 무료로 학습하세요. 지금 등록해 로그 수집, 쿼리, 분석, 메트릭, 모니터링, 처리, 스토리지 및 액세스 제어에 관해 자세히 알아보세요.
{{< /learning-center-callout >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/explorer/
[2]: /ko/security/cloud_siem/
[4]: /ko/logs/log_collection/
[5]: /ko/logs/log_configuration/
[6]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[7]: /ko/logs/guide/correlate-logs-with-metrics/
[8]: /ko/logs/explorer/search_syntax/
[9]: /ko/logs/live_tail/
[10]: /ko/logs/explorer/analytics/
[11]: /ko/logs/explorer/patterns/
[12]: /ko/logs/explorer/saved_views/