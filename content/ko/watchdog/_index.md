---
algolia:
  tags:
  - watchdog
aliases:
- /ko/tracing/watchdog
cascade:
  algolia:
    rank: 70
description: 잠재적인 애플리케이션 및 인프라스트럭처 문제를 자동으로 감지
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Watchdog
  tag: 릴리스 노트
  text: 최신 Datadog Watchdog 릴리스를 확인하세요! (앱 로그인 필요).
- link: https://www.datadoghq.com/blog/datadog-bits-generative-ai/
  tag: 블로그
  text: 새로운 DevOps Copilot인 Bits AI 소개
- link: /logs/
  tag: 설명서
  text: \u0008로그 수집
- link: /tracing/
  tag: 설명서
  text: 트레이스 수집
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: 블로그
  text: Watchdog RCA를 통한 자동화된 근본 원인 분석
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: 블로그
  text: Watchdog Impact Analysis로 사용자 영향 범위 이해
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: 블로그
  text: Watchdog Insights for Live Processes를 사용하여 워크로드 성능 이상 문제 해결
title: Datadog WatchdogTM
---
## 개요

Watchdog는 Datadog의 AI 엔진으로, Datadog 플랫폼 전체의 관찰 데이터를 기반으로 알림을 보내고 인사이트, 근본 원인 분석 정보를 자동으로 제공해 줍니다. Watchdog이 지속적으로 인프라스트럭처를 모니터링하고 중요한 신호에 관심을 유도하기 때문에 문제를 감지하고, 트러블슈팅을 실시하고, 문제를 해결하는 데 도움이 됩니다.

Watchdog 기능은 기본 제공되기 때문에 설치가 필요 없습니다.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/781921620/rendition/1080p/file.mp4?loc=external&signature=8889419b739e3398d03a72edca4f96909144567e045d30deeb8f9345c43a682d" poster="/images/poster/watchdog.png" >}}

<br/>

### 자동 관리 알림

Watchdog에서 사용자의 시스템, 애플리케이션, 배포 행동의 기준선을 계산하고 예측합니다. 이 기준선을 바탕으로 이상 행동을 탐지합니다.

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/alerts">}}<u>Watchdog 알림</u>: Watchdog 알림을 보고 해석하는 방법: 각 알림으로 제공하는 정보, 알림 범위, Datadog에서 Watchdog 알림을 찾는 방법.{{< /nextlink >}}
  {{< nextlink href="/watchdog/faulty_deployment_detection">}}<u>잘못된 배포 탐지</u>: Watchdog에서 잘못된 코드 배포를 찾는 방법.{{< /nextlink >}}
{{< /whatsnext >}}

Watchdog 알고리즘 사용자 지정하는 방법:
  * [이상 알고리즘][7]
  * [예측 알고리즘][8]
  * [아웃라이어 알고리즘][9]

### 조사 도우미

Watchdog는 조사를 돕기 위해 모든 탐색기에서 컨텍스트 기반 인사이트를 보여주고, 근본 원인을 탐색하고, 사용자 영향을 결정합니다.

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/insights">}}<u>Watchdog Insight</u>: Watchdog Insights는 추천 엔진으로, 문제를 파악하고 해결하는 것을 도와줍니다.{{< /nextlink >}}
  {{< nextlink href="/watchdog/rca">}}<u>근본 원인 분석</u>: Watchdog Root Cause Analysis(RCA)에서 이상 징후의 근본 원인을 찾는 방법, 제공된 정보를 사용하는 방법.{{< /nextlink >}}
  {{< nextlink href="/watchdog/impact_analysis">}}<u>영향 분석</u>: Watchdog에서 이상 징후가 사용자에게 미치는 악영향을 파악하는 방법.{{< /nextlink >}}
{{< /whatsnext >}}

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][1]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/watchdog/alerts
[3]: /ko/watchdog/faulty_deployment_detection/
[4]: /ko/watchdog/insights?tab=logmanagement
[5]: /ko/watchdog/rca/
[6]: /ko/watchdog/impact_analysis/
[7]: /ko/monitors/types/anomaly/#anomaly-detection-algorithms
[8]: /ko/monitors/types/forecasts/?tab=linear#algorithms
[9]: /ko/monitors/types/outlier/?tab=dbscan#algorithms