---
aliases:
- /ko/guides/logs/
- /ko/en/logs
- /ko/logs/logging_without_limits
cascade:
  algolia:
    rank: 70
description: 호스트, 컨테이너, 서비스에서 로그를 수집하도록 Datadog 에이전트 설정
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: 릴리스 노트
  text: 최신 Datadog 로그 관리 릴리스를 확인하세요(앱 로그인 필요).
- link: /logs/log_collection/
  tag: 설명서
  text: 로그 수집 시작하기
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: 학습 센터
  text: 로그 관리 시작하기
- link: https://dtdg.co/fe
  tag: 파운데이션(Foundation) 활성화
  text: 대화형 세션에 참여하여 로그 관리를 최적화하세요.
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: 블로그
  text: 로그 이상 현상 탐지 기능으로 문제를 더욱 빠르게 조사해 보세요.
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: 블로그
  text: Datadog 로그 관리로 규모에 따라 IoT 기기 모니터링
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: 블로그
  text: Datadog으로 방화벽 로그 모니터링
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: 블로그
  text: CIDR 표기법 쿼리를 사용하여 네트워크 트래픽 로그 필터링
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: 블로그
  text: Datadog Cloud 보안 정보와 이벤트 관리(SIEM)로 1Password 모니터링
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: 블로그
  text: 하위 쿼리를 사용하여 로그를 동적으로 필터링하고 연계
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: 블로그
  text: 네트워크 및 보안 분석을 위해 DNS 로그 모니터링
kind: 설명서
title: 로그 관리
---

## 개요

시스템 운영의 중요 요소에 대한 로그를 수집하는 것은 인프라스트럭처 서비스 상태를 유지하는 데 매우 중요합니다. 최신 인프라스트럭처는 분당 로그 이벤트를 수천 개 생성할 수 있는 기능을 갖추고 있습니다. 이러한 조건에서는 로그 관리 솔루션에 전송할 로그와 보관할 로그를 선택해야 합니다. 그러나 로그를 전송하기 전에 필터링하면 범위에 공백이 생기거나 중요한 데이터가 실수로 삭제될 수도 있습니다.

Datadog 로그 관리나 Datadog 로그 또는 로그 수집이라고 불리는 해당 기능은 로그 수집을 인덱싱과 분리하여 이러한 제한 요소를 해소합니다. 이렇게 하면 모든 로그를 제한없이 비용 효율적으로 수집, 처리, 보관, 탐색, 모니터링할 수 있습니다(제한없는 로그 수집\*).

제한없는 로그 수집\* 기능으로 [로그 탐색기][1]에서 간단한 트러블슈팅 환경을 구현하여 고객님과 팀이 인프라스트럭처 문제를 신속하게 평가 및 해결할 수 있도록 지원합니다. 감사 및 평가 중 보안 및 IT 팀을 지원하기 위한 직관적인 아카이빙 기능을 제공해 드립니다. 또한 제한없는 로그 수집* 기능은 로그 인덱싱 없이도 환경 내 보안 위협을 감지하는 [Datadog Cloud 보안 정보와 이벤트 관리(SIEM)][2]를 지원합니다.

**참고**: PCI 준수 Datadog 조직을 설정하는 방법에 대한 자세한 내용을 확인하려면 [PCI DSS 준수][3]를 참조하세요.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## 수집

Datadog 로그 관리로 호스트, 컨테이너, 클라우드 공급자 및 기타 소스에서 [로그 수집][4]을 시작해 보세요.

## 설정

{{< img src="logs/lwl_marketecture_20231030.png" alt="모든 로그를 한 곳에서 설정" >}}

일단 로그를 수집하면, 프로세스 파이프라인과 프로세서로 모든 로그를 보강 및 처리하고 인덱스를 활용하여 로그 관리 예산을 제어합니다. 또한 수집한 로그로 메트릭을 생성하거나 [로그 설정 옵션][5]으로 스토리지에 최적화된 아카이브 내에서 해당 로그를 관리합니다.

## 연결

{{< img src="/logs/connect.png" alt="로그를 메트릭 또는 트레이스와 연결하기" style="width:80%;">}}

다음 로그를 메트릭 및 트레이스에 연결하여 통합 가시성 필러를 활용하세요.

- [로그와 트레이스][6]를 연결하여 애플리케이션 가시성을 확보하세요.
- [로그와 메트릭][7]을 상호 연결하여 문제의 맥락을 파악하고 서비스에 매핑합니다.

## 탐색

[로그 탐색기][1]로 수집한 로그 탐색을 시작합니다.

{{< img src="/logs/explore.png" alt="수집한 로그 탐색" style="width:80%;">}}

- [검색][8]: 모든 로그를 검색합니다.
- [라이브 추적][9]: 모든 환경에서 수집한 로그를 실시간으로 확인합니다.
- [분석][10]: 인덱싱한 로그에 관하여 로그 분석을 수행합니다.
- [패턴][11]: 인덱싱한 로그를 함께 클러스터링하여 로그 패턴을 확인합니다.
- [저장된 보기][12]: 저장된 보기를 사용하여 로그 탐색기를 자동 설정합니다.


{{< learning-center-callout header="학습 센터에서 로그 관리 소개를 시도해 보세요" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management" >}} 실제 클라우드 컴퓨팅 용량과 Datadog 평가판 계정을 무료로 배워보세요. 지금 등록하여 로그 수집, 쿼리, 분석, 메트릭, 모니터링, 처리, 저장 및 액세스 제어에 대해 자세히 알아보세요.{{< /learning-center-callout >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*제한 없는 로깅은 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/explorer/
[2]: /ko/security/cloud_siem/
[3]: /ko/data_security/pci_compliance/
[4]: /ko/logs/log_collection/
[5]: /ko/logs/log_configuration/
[6]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[7]: /ko/logs/guide/correlate-logs-with-metrics/
[8]: /ko/logs/explorer/search_syntax/
[9]: /ko/logs/live_tail/
[10]: /ko/logs/explorer/analytics/
[11]: /ko/logs/explorer/patterns/
[12]: /ko/logs/explorer/saved_views/