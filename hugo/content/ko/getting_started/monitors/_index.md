---
aliases:
- /ko/getting_started/application/monitors
description: 임계값 알림 및 사용자 지정 알림을 포함한 메트릭 모니터를 생성하여 시스템 상태와 성능 문제를 사전에 추적할 수 있습니다.
further_reading:
- link: /monitors/types/metric/
  tag: 설명서
  text: 메트릭 모니터
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: 학습 센터
  text: Observability 소개
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 효과적인 모니터 생성에 대한 대화형 세션에 참여하세요
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: 블로그
  text: 모니터를 효과적으로 감사 및 정리하는 방법
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: 블로그
  text: '모니터링 101: 중요한 사항에 대한 알림'
title: 모니터 시작하기
---
## 개요 {#overview}

Datadog 경보 기능을 사용하면 메트릭, 통합 가용성, 네트워크 엔드포인트 등을 적극적으로 검사하는 모니터를 생성할 수 있습니다. 모니터를 사용하여 관찰, 검사 및 개입이 필요한 시스템에 주의를 기울일 수 있습니다.

이 페이지는 모니터에 대한 소개와 메트릭 모니터 설정을 위한 지침을 개요로 설명합니다. [메트릭 모니터][1]는 특정 메트릭이 특정 임계값보다 높거나 낮을 경우 임계값 경고 및 알림을 제공합니다. 예를 들어, 메트릭 모니터는 디스크 공간이 부족할 때 임계값 알림을 보낼 수 있습니다.

이 가이드는 다음에 대해 다룹니다.
- 모니터 생성 및 구성
- 모니터 알림 설정
- 알림 메시지 사용자 정의
- 모니터 권한

## 전제 조건 {#prerequisites}

시작하기 전에 Datadog Agent가 설치된 호스트와 연결된 Datadog 계정이 필요합니다. Agent에 대해 자세히 알아보려면 [Agent 시작하기 가이드][2]를 참조하거나 [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Agent{{< /ui >}}][3]로 이동하여 설치 지침을 살펴보세요.

Datadog Agent가 실행 중인지 확인하려면 Datadog의 [인프라스트럭처 목록][4]이 채워져 있는지 확인하세요.

## 신규 조직을 위한 즉각적인 모니터링 {#instant-monitoring-for-new-organizations}

<div class="alert alert-info">Automatic Monitor는 <strong>신규</strong> 조직에서 사용 가능하며 Datadog Agent가 설치된 후 활성화됩니다.</div>

Datadog Agent를 설치하면 Datadog이 자동으로 사용자의 스택을 탐지하고 **베이스라인 모니터** 집합을 생성합니다. 따라서 별도의 설정 없이 즉각적인 적용 범위가 제공됩니다.

Automatic Monitor에는 다음이 포함될 수 있습니다.
- 호스트 수준 모니터 (CPU 및 메모리 사용률)
- Kubernetes 모니터 (포드 재시작, 노드 상태)
- APM 모니터 (서비스별 오류율 또는 지연 시간)

Datadog [{{< ui >}}Monitors{{< /ui >}}][17] 페이지에서 이러한 모니터를 즉시 조회할 수 있습니다.
이 페이지에서는 다른 모니터와 마찬가지로 이러한 모니터를 편집, 복제 또는 비활성화할 수 있습니다.

## 모니터 생성 {#create-a-monitor}

모니터를 생성하려면 [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][5]로 이동하여 {{< ui >}}Metric{{< /ui >}}을 선택합니다.

## 구성 {#configure}

모니터 구성의 주요 구성요소는 다음과 같습니다.

- **탐지 방법 선택**: 경보 대상을 어떻게 측정하시겠어요? 임계값을 초과하는 메트릭 값, 임계값을 초과하는 값의 변화, 이상 값 등에 대해 우려하고 계신가요?
- **메트릭 정의**: 알리기 위해 모니터링할 값은 무엇인가요? 시스템의 디스크 공간인가요? 로그인 시 발생한 오류 수인가요?
- **경보 조건 설정**: 언제 엔지니어에게 알려야 할까요?
- **알림 및 자동화 설정**: 알림에는 어떤 정보가 포함되어야 하나요?
- **권한 및 감사 알림 정의**: 이러한 알림에 액세스할 수 있는 사람은 누구이며, 알림이 수정되면 누구에게 알림을 보내야 하나요?

### 탐지 방법 선택 {#choose-the-detection-method}

메트릭 모니터를 생성하면 {{< ui >}}Threshold Alert{{< /ui >}}이 탐지 방법으로 자동 선택됩니다. 임계값 알림은 메트릭 값을 사용자가 정의한 임계값과 비교합니다. 이 모니터의 목표는 정적 임계값에 대해 임계값 알림을 보내는 것이므로 변경할 필요가 없습니다.

### 메트릭 정의 {#define-the-metric}

디스크 공간 부족에 대한 알림을 받으려면 [디스크 통합][6]의 `system.disk.in_use` 메트릭을 사용하고 `host` 및 `device`에 대한 메트릭 평균을 구합니다.

{{< img src="getting_started/monitors/monitor_query.png" alt="호스트 및 장치 별로 system.disk.in_use avg 메트릭을 정의합니다." style="width:100%" >}}

### 경보 조건 설정 {#set-alert-conditions}

[디스크 통합 문서][6]에 따르면 `system.disk.in_use`는 *전체 중 사용 중인 디스크 공간의 비율*입니다. 따라서 이 메트릭이 `0.7` 값을 보고할 때는 장치가 70% 찬 상태입니다.

디스크 공간 부족에 대해 알리려면 메트릭이 임계값보다 `above`일 때 모니터가 트리거되어야 합니다. 임계값은 사용자의 기본 설정에 따라 다릅니다. 이 메트릭의 경우 `0`~`1` 사이의 값이 적절합니다.

다음 임계값을 설정합니다.

```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

이 예시에서는 이 섹션의 다른 설정을 기본값으로 둡니다. 자세한 내용은 [메트릭 모니터][7] 설명서를 참조하세요.

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="모니터가 임계값 알림을 트리거하도록 경보 및 경고 임계값을 설정합니다." style="width:80%" >}}

### 알림 및 자동화 {#notifications-and-automations}

이 모니터가 알림을 트리거하면 알림이 전송됩니다. 이 알림에는 조건부 값, 해결 지침 또는 임계값 알림에 대한 요약을 포함할 수 있습니다. 최소한 알림에는 제목과 메시지가 있어야 합니다.

#### 알림 제목 {#notification-title}

제목은 각 모니터마다 고유해야 합니다. 이는 다중 경고 모니터이므로 메시지 템플릿 변수를 사용하여 각 그룹 요소(`host` 및 `device`)에 대해 이름을 사용할 수 있습니다.

```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### 알림 메시지 {#notification-message}

메시지를 사용해 팀에게 어떻게 문제를 해결할지 전달할 수 있습니다. 예를 들면 다음과 같습니다.

```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

경고 및 경고 임계값을 기반으로 조건부 메시지를 추가하려면 메시지에 포함할 수 있는 사용 가능한 [알림 변수][8]를 참조하세요.

#### 서비스와 팀 구성원에게 알리세요.{#notify-your-services-and-your-team-members}

이메일, Slack, PagerDuty를 통해 팀에 알림을 전송합니다. 드롭다운 상자를 사용하여 팀 멤버 및 연결된 계정을 검색할 수 있습니다.

{{< img src="getting_started/monitors/monitor_notification.png" alt="모니터 메시지 및 자동화를 경보 알림에 추가합니다." style="width:100%;" >}}

[Workflow Automation][14]의 워크플로 또는 [Work Management][15]의 작업 항목을 알림에 추가하려면 {{< ui >}}Add Workflow{{< /ui >}} 또는 {{< ui >}}Add Work Item{{< /ui >}}을 클릭합니다. `@team` 핸들을 사용하여 [Datadog Team][16] 구성원에게 태그를 지정할 수 있습니다.

다른 섹션은 그대로 두세요. 각 설정 옵션의 기능에 대한 자세한 내용은 [모니터 설정][9] 문서를 참조하세요.

### 권한 {#permissions}

{{< ui >}}Edit Access{{< /ui >}}를 클릭하여 모니터 편집 권한을 작성자, 팀, 사용자, 그룹 또는 조직 내 특정 역할로 제한합니다. 필요시 {{< ui >}}Notify{{< /ui >}}를 선택하여 모니터가 수정될 때 알림을 받으세요.

{{< img src="getting_started/monitors/monitor_permissions.png" alt="모니터에 대해서는 액세스 권한을 감사 알림에 대해서는 옵션을 설정합니다." style="width:80%;" >}}

자세한 내용은 [Granular Access Control][10]을 참조하세요.

## 모바일에서 모니터 및 분류 알림 보기{#view-monitors-and-triage-alerts-on-mobile}

[Apple App Store][12] 및 [Google Play Store][13]에서 제공되는 [Datadog 모바일 앱][11]을 다운로드하여 모바일 홈 화면에서 Monitor Saved Views를 확인하거나 모니터를 조회 및 음소거할 수 있습니다. 이는 노트북이나 데스크톱에서 떨어져 있을 때 분류하는 데 도움이 됩니다.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="모바일 앱에서의 인시던트">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/metric/
[2]: /ko/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors/create/metric
[6]: /ko/integrations/disk/
[7]: /ko/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /ko/monitors/notify/variables/
[9]: /ko/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /ko/account_management/rbac/granular_access/
[11]: /ko/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app
[14]: /ko/actions/workflows/
[15]: /ko/incident_response/work_management/
[16]: /ko/account_management/teams/
[17]: https://app.datadoghq.com/monitors/manage