---
aliases:
- /ko/bits_ai/bits_ai_sre/investigate_alerts/
- /ko/bits_ai/bits_investigation/investigate_alerts/
- /ko/bits_ai/bits_ai_sre/investigate_issues/
description: Bits Investigation을 사용하여 모니터 경보를 자동으로 조사하고 근본 원인을 분석해 인시던트를 더 빠르게 해결합니다.
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-sre-deeper-reasoning
  tag: 블로그
  text: 더 깊은 추론, 두 배 더 빠른 속도를 제공하는 새로운 Bits Investigation을 만나보세요
title: 문제 조사
---
## Bits Investigation 시작하기 {#start-a-bits-investigation}

다음과 같은 여러 진입점에서 Bits Investigation을 시작할 수 있습니다.

- 모니터 경보: 다음 두 가지 방법으로 트리거할 수 있습니다.
  - [**수동**](#manual-monitor-alerts): 개별 모니터 경보에서 시작
  - [**자동**](#enable-automatic-investigations): 모니터가 경보 상태로 전환될 때마다 Bits Investigation이 자동으로 시작되도록 모니터 구성
- [Synthetic 테스트 상세 페이지](#from-the-synthetic-test-details-page)
- [Real User Monitoring](#real-user-monitoring)
- [일반 프롬프트](#general-prompt)

### 모니터 경보 {#manual-monitor-alerts}

다음과 같은 여러 진입점에서 개별 모니터의 경보 또는 경고 수준 이벤트에 대해 Bits를 호출할 수 있습니다.

#### 옵션 1: Bits Investigation 모니터 목록 {#monitor-list}
1. [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Supported{{< /ui >}}][5]로 이동합니다.
1. {{< ui >}}Investigate Recent Alerts{{< /ui >}}를 클릭한 후 경보를 선택합니다.

#### 옵션 2: 모니터 상태 페이지 {#option-2-monitor-status-page}
[Bits Investigation이 지원되는 모니터](#supported-monitors)의 상태 페이지로 이동하여 오른쪽 상단의 {{< ui >}}Investigate with Bits Investigation{{< /ui >}}을 클릭합니다.

#### 옵션 3: 모니터 이벤트 사이드 패널 {#option-3-monitor-event-side-panel}
[Bits Investigation이 지원되는 모니터](#supported-monitors)의 모니터 이벤트 사이드 패널에서 {{< ui >}}Investigate with Bits Investigation{{< /ui >}}을 클릭합니다.

#### 옵션 4: Slack {#option-4-slack}
Slack 통합을 사용하려면 [Slack 작업 공간을 Bits Investigation에 연결합니다][8].

Slack에서 모니터 알림에 `@Datadog Investigate this alert`를 입력하여 회신합니다.

### Synthetic 테스트 {#synthetic-tests}

Synthetic 브라우저 또는 API 테스트 모니터에서 경보가 발생하면 Bits Investigation을 시작하여 근본 원인을 파악할 수 있습니다. Bits는 Synthetic 테스트 결과와 기록을 트레이스, 로그, 메트릭과 함께 분석합니다. 가능성이 높은 근본 원인을 제시하고 실패가 실제 회귀 문제로 인한 것인지 잘못된 구성 때문인지 파악합니다.

#### Synthetic 테스트 상세 페이지에서 {#from-the-synthetic-test-details-page}

1. [Synthetic 테스트][18] 페이지에서 조사하려는 Synthetic 테스트를 열고 {{< ui >}}Timeline{{< /ui >}} 섹션으로 이동합니다.
1. 실패한 테스트 실행의 {{< ui >}}Alert Triggered{{< /ui >}} 이벤트를 선택합니다.
1. {{< ui >}}Investigate with Bits{{< /ui >}}를 클릭합니다.

조사는 새 페이지에서 열리며 실행 후에는 테스트 상세 페이지에서도 조사 결과를 확인할 수 있습니다.

#### Synthetic 모니터에서 {#from-a-synthetic-monitor}

Synthetic 모니터는 기타 지원되는 모니터 유형과 동일한 모니터 기반 진입점을 지원합니다. 사용 가능한 옵션은 [모니터 경보](#manual-monitor-alerts)를 참조하세요. Synthetic 모니터에서 {{< ui >}}Auto-Investigate{{< /ui >}}를 켜면 조사가 자동으로 시작되도록 설정할 수도 있습니다. 자세한 내용은 [자동 조사 활성화](#enable-automatic-investigations)를 참조하세요.

### Real User Monitoring {#real-user-monitoring}

Real User Monitoring(RUM)의 다음과 같은 여러 위치에서 Bits Investigation을 시작할 수 있습니다.

- RUM **Optimization** 페이지 및 Operations Monitoring의 추천 카드 자세한 내용은 [Bits AI를 사용한 성능 최적화][19]를 참조하세요.
- RUM 바이탈 차트에 있는 **Anomaly · Investigate** 버튼 자세한 내용은 [Bits AI로 성능 저하 및 경보 조사][20]를 참조하세요.
- 기타 지원되는 모니터 유형과 동일한 모니터 기반 진입점을 지원하는 RUM 모니터([자동 조사](#enable-automatic-investigations) 포함) 자세한 내용은 [Bits로 성능 저하 및 경보 조사][20]를 참조하세요.

### 일반 프롬프트 {#general-prompt}

[New Investigation][16]을 클릭한 후 해결하려는 문제를 설명합니다. 관련 컨텍스트를 최대한 자세히 포함합니다.
- 관찰된 증상(예: 오류, 지연 시간) 및 해당 증상을 보여주는 Datadog 텔레메트리 링크
- 문제의 범위를 좁히는 데 도움이 되는 서비스, 애플리케이션 또는 환경과 같은 관련 태그
- 시간 범위(기본값: 최근 4시간)

프롬프트가 구체적일수록 조사가 더 정확하고 유용해집니다.

좋은 예시:
- 프로덕션 환경의 search-service에 대한 요청을 조사하세요. 일부 요청에서 결과가 반환되어야 하는데도 빈 결과가 반환됩니다. 문제는 UTC 기준 10:00경에 시작되었습니다.
- 오류(https://app.datadoghq.com/logs?query=service%3Asearch-service%20status%3Aerror)의 원인을 조사하세요. 이 오류는 약 5분 전부터 발생하기 시작했습니다.

나쁜 예시:
- 앱이 느립니다. 무슨 문제인가요?

Slack에서도 조사를 시작할 수 있습니다.  메시지에 Datadog을 `@Datadog Investigate high CPU in ai-gateway in prod over the last 30 minutes`와 같이 멘션합니다. Slack 스레드에서 호출하면 Bits Investigation은 자동으로 전체 스레드를 조사 컨텍스트로 사용합니다.


### 자동 조사 활성화 {#enable-automatic-investigations}

수동 조사 외에도 모니터가 경보 상태로 전환되면 Bits가 자동으로 조사를 시작하도록 다음과 같이 설정할 수 있습니다.

#### Bits Investigation 모니터 목록에서 {#from-the-bits-investigation-monitors-list}
1. [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Supported{{< /ui >}}][5]로 이동합니다.
1. 개별 모니터의 {{< ui >}}Auto-Investigate{{< /ui >}}를 켜거나 여러 모니터를 선택한 후 {{< ui >}}Auto-Investigate All{{< /ui >}}을 클릭하여 일괄 편집합니다.

#### 개별 모니터에서 {#for-a-single-monitor}
1. 모니터의 상태 페이지를 열고 {{< ui >}}Edit{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Configure notifications & automations{{< /ui >}}까지 스크롤한 다음 {{< ui >}}Investigate with Bits Investigation{{< /ui >}}을 켭니다.

<div class="alert alert-info"><ul><li>Datadog API 또는 Terraform을 통한 자동 조사 활성화는 지원되지 않습니다.</li><li>모니터가 경보 상태로 전환되면 조사가 시작됩니다.</li><li>경고(warn) 또는 데이터 없음(no data) 상태로의 전환, <a href="/monitors/notify/#renotify">재알림</a>, 테스트 알림은 자동 조사를 트리거하지 않습니다.
</li></ul></div>

### 지원되는 모니터 {#supported-monitors}

Bits는 다음 모니터 유형에 대해 조사를 수행할 수 있습니다.
  - 메트릭
  - 이상
  - 예측
  - 통합
  - 이상치
  - Logs
  - APM (`APM Metrics` 유형만 지원하며 `Trace Analytics`는 지원하지 않음)
  - 복합
  - SLO
  - Synthetics API 및 브라우저 테스트
  - RUM

## Bits의 조사 방식 {#how-bits-investigates}
Bits는 문제를 조사할 때 관찰, 추론, 조치를 지속적으로 반복합니다. 먼저 가능한 근본 원인에 대한 가설을 세운 다음 도구를 사용해 텔레메트리 데이터를 쿼리하여 가설이 타당한지 검증합니다. 각 단계는 이전 단계에서 확인한 결과를 바탕으로 진행됩니다. 새로운 증거가 나타날 때마다 Bits는 상황에 대한 이해를 갱신하고 추론을 정교화하며 추가 조사 단계를 이어갑니다. 이 과정에서 조사 방향을 조정하고 수정하면서 가능성이 가장 높은 근본 원인으로 좁혀갑니다.

조사가 끝나면 Bits는 명확하고 증거에 근거한 결론을 제시하거나, 확보된 데이터만으로 타당한 결론을 내리기 어려운 경우 결론을 도출하지 못한 것으로 표시합니다.

{{< img src="bits_ai/bits_ai_sre_investigation_hypotheses.png" alt="Bits가 수립하고 테스트한 가설을 보여주는 흐름도" style="width:100%;" >}}

### 지원되는 데이터 소스 {#supported-data-sources}
Bits는 조사 과정에서 다음 데이터 소스를 사용합니다.

#### Datadog 제품 {#datadog-products}
- 메트릭
- APM 트레이스
- Logs
- Dashboards
- Events
- [변경 추적][4]
- [소스 코드][17] (GitHub만 지원)
- Watchdog
- Real User Monitoring
- Network Path
- Database Monitoring
- Continuous Profiler

<div class="alert alert-tip"><b>서비스 범위 지정:</b> 서비스와 연결된 모니터에는 서비스 태그를 추가하거나 모니터 쿼리를 서비스별로 필터링 또는 그룹화하세요. 이렇게 하면 Bits가 데이터를 더 정확하게 연결하는 데 도움이 됩니다.</div>

#### 타사 통합 {#third-party-integrations}
- Grafana
- Dynatrace
- Sentry
- Splunk
- ServiceNow
- Confluence

<div class="alert alert-info">
타사 통합은 모든 고객에게 미리 보기로 제공되고 있습니다.</div>

조사 효과를 극대화하는 모범 사례에 대해서는 [지식 소스][9]를 참조하세요.

### 조사 표시 모드 {#investigation-display-modes}
Investigation Steps와 Hypothesis Tree라는 두 가지 표시 모드가 있습니다.

조사가 진행되는 동안 Bits는 증거를 평가하고 결정을 내리는 과정을 비롯해 모든 조사 단계를 {{< ui >}}Investigation Steps{{< /ui >}} 보기에 기록합니다. 이를 통해 에이전트의 추론 과정을 실시간으로 상세하게 확인할 수 있습니다.

조사가 완료되면 {{< ui >}}Hypothesis Tree{{< /ui >}} 보기로 전환하여 조사 과정을 구조화된 트리 형태로 시각화하고 조사 결과와 결론을 한눈에 파악할 수 있습니다.


## 보고서 {#reports}

{{< ui >}}Reports{{< /ui >}} 탭에서 시간 경과에 따른 조사 실행 횟수를 모니터, 사용자, 서비스 및 팀별로 추적할 수 있습니다. 또한 결론 도출까지 걸리는 평균 시간을 추적하여 Bits Investigation이 온콜 업무 효율성에 미치는 영향을 평가할 수 있습니다.

[3]: /ko/bits_ai/bits_investigation/configure/#configure-knowledge-base-integrations
[4]: /ko/change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/supported
[6]: https://app.datadoghq.com/monitors/manage
[8]: /ko/bits_ai/bits_investigation/configure#slack
[9]: /ko/bits_ai/bits_investigation/knowledge_sources/
[10]: /ko/incident_response/on-call/pages/#page-from-notifications
[14]: /ko/incident_response/work_management/notifications_integrations/#third-party-tickets
[15]: /ko/account_management/rbac/permissions/#bits-ai
[16]: https://app.datadoghq.com/bits-ai/investigations/new
[17]: /ko/source_code/#tag-your-apm-telemetry-with-git-information
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /ko/real_user_monitoring/bits_ai/optimize_performance/
[20]: /ko/real_user_monitoring/bits_ai/investigate_regressions/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}