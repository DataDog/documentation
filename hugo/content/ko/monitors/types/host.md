---
aliases:
- /ko/monitors/monitor_types/host
- /ko/monitors/create/types/host/
description: 하나 이상의 호스트가 Datadog에 보고하고 있는지 확인하세요.
further_reading:
- link: /infrastructure/
  tag: 문서
  text: Infrastructure Monitoring
- link: /monitors/notify/
  tag: 문서
  text: 모니터 알림 설정하기
- link: /monitors/downtimes/
  tag: 문서
  text: 모니터 음소거를 위한 가동 중지 예약하기
- link: /monitors/status/
  tag: 문서
  text: 모니터 상태 확인
title: 호스트 모니터
---
## 개요 {#overview}

인프라 모니터링은 다양한 통합을 통해 클라우드에서 호스팅되는 서버와 온프레미스 서버를 포함한 전체 IT 환경에 대한 가시성을 제공합니다. 호스트 모니터를 사용하여 데이터를 제출하는 호스트와 제출하지 않는 호스트를 파악하고 지속적인 가시성을 확보할 수 있습니다.

모든 Datadog Agent는 `datadog.agent.up`이라는 서비스 검사를 `OK` 상태로 보고합니다. 호스트 모니터를 사용하여 하나 이상의 호스트에서 이 검사를 모니터링할 수 있습니다.

<div class="alert alert-info">AIX에서 레거시 Datadog UNIX Agent를 실행하는 호스트는 <code>datadog.agent.up</code> 서비스 검사를 보고하지 않습니다. 메트릭 <code>datadog.agent.running</code> 을 사용하여 UNIX Agent의 가동 시간을 모니터링할 수 있습니다. 이 메트릭은 Agent가 Datadog에 보고하는 경우 <code>1</code> 값을 내보냅니다. AIX의 Agent 7은 다른 플랫폼의 Agent와 마찬가지로 <code>datadog.agent.up</code> 서비스 검사를 보고합니다.</div>

## 모니터 생성 {#monitor-creation}

Datadog에서 [호스트 모니터][1]를 만들려면 기본 탐색 메뉴에서 {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Host{{< /ui >}}로 이동하세요.

### 이름 또는 태그별로 호스트 선택 {#pick-hosts-by-name-or-tag}

호스트 이름이나 태그를 선택하여 모니터링할 호스트를 선택하거나 {{< ui >}}All Monitored Hosts{{< /ui >}}를 선택합니다. 특정 호스트를 제외해야 하는 경우 두 번째 필드에 이름이나 태그를 나열하세요.

- 포함 필드는 `AND` 논리를 사용합니다. 나열된 모든 이름과 태그가 호스트에 있어야 포함됩니다.
- 제외 필드는 `OR` 논리를 사용합니다. 나열된 이름이나 태그가 있는 호스트는 제외됩니다.

#### 예시 {#examples}

| 모니터                                                | 포함               | 제외     |
|--------------------------------------------------------|-----------------------|-------------|
| `env:prod`              | `env:prod`            |  태그가 있는 모든 호스트 포함 비워 두기 |
| `env:test` | `All Monitored Hosts` | `env:test`  | 태그가 있는 호스트를 제외한 모든 호스트 포함

### 경보 조건 설정 {#set-alert-conditions}

이 섹션에서 {{< ui >}}Check Alert{{< /ui >}} 또는 {{< ui >}}Cluster Alert{{< /ui >}} 중 하나를 선택하세요.

{{< tabs >}}
{{% tab "검사 경보" %}}

검사 경보는 호스트가 일정 시간 동안 보고를 중단하는지 추적합니다. 검사 실행 후 시간이 너무 많이 경과하면 호스트의 데이터 제출에 문제가 있다는 신호일 수 있습니다.

누락된 데이터를 확인할 시간(분)을 입력합니다. 기본값은 2 분입니다.

`datadog.agent.up`이`OK` 상태 보고를 지정된 시간(분)을 초과하여 중단하면 경보가 트리거됩니다.

{{% /tab %}}
{{% tab "클러스터 경보" %}}

클러스터 경보는 특정 비율의 호스트가 지정된 시간 동안 보고를 중단했는지 추적합니다.

클러스터 경보를 설정하려면 다음 단계를 따르세요.

1. 태그에 따라 호스트를 그룹화할지 여부를 결정합니다. {{< ui >}}Ungrouped{{< /ui >}}는 포함된 모든 호스트의 상태 비율을 계산합니다. {{< ui >}}Grouped{{< /ui >}}는 그룹별로 상태 비율을 계산합니다.
2. 경보 및 경고 임계값에 대한 비율을 선택합니다. 설정(경보 또는 경고) 중 하나만 필요합니다.
3. 누락된 데이터를 확인할 시간(분)을 입력합니다. 기본값은 2 분입니다.

`datadog.agent.up`이 지정된 시간(분)을 초과하여 `OK` 상태 보고를 중단하고 백분율 임계값에 도달하면 경보가 트리거됩니다.

{{% /tab %}}
{{< /tabs >}}

### 고급 경보 조건 {#advanced-alert-conditions}

고급 경보 옵션(자동 해결, 새 그룹 지연 등)에 대한 자세한 지침은 [모니터 구성][2] 페이지를 참조하세요.

### Notifications {#notifications}

{{< ui >}}Configure notifications and automations{{< /ui >}} 섹션에 대한 자세한 지침은 [Notifications][3] 페이지를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/host
[2]: /ko/monitors/configuration/#advanced-alert-conditions
[3]: /ko/monitors/notify/