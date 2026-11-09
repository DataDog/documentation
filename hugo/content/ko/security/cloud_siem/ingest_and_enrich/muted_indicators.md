---
description: 조직에 무해한 침해 지표를 뮤트하여 Cloud SIEM에서 무해한 지표로 평가하도록 합니다. 뮤트가 로그 보강에 미치는 영향,
  Datadog 관리형 뮤트 지표, 지표의 뮤트·검토 및 뮤트 해제 방법을 설명합니다.
disable_toc: false
further_reading:
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: 설명서
  text: IOC Explorer로 지표 조사
- link: /security/threat_intelligence/
  tag: 설명서
  text: Datadog Security의 위협 인텔리전스
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
  tag: 설명서
  text: 사용자 보유 위협 인텔리전스를 Cloud SIEM으로 가져오기
title: 뮤트된 지표
---
## 개요 {#overview}

위협 인텔리전스 피드는 기업 VPN 송신 IP 주소, 승인된 암호화폐 채굴 풀 또는 내부 도구의 도메인과 같이 조직에 무해한 지표를 위협으로 표시할 수 있습니다. 지표를 뮤트하면 Cloud SIEM이 조직에 대해 해당 지표를 `benign`으로 평가하므로 팀에서 동일한 오탐을 반복해서 분류하지 않아도 됩니다.

지표를 뮤트해도 위협 인텔리전스는 제거되지 않습니다. 뮤트된 지표는 보강 정보를 유지하고 [IOC Explorer][1]에 계속 표시되므로, 해당 지표를 검색하고 위협으로 표시된 이유를 확인할 수 있습니다.

지표는 다음 두 가지 방법으로 뮤트할 수 있습니다.

- **Datadog 관리형**: Datadog은 널리 사용되는 도메인과 같이 무해한 것으로 알려진 지표 목록을 유지 관리하며 모든 조직에서 이러한 지표를 뮤트합니다. 이 목록은 읽기 전용입니다.
- **조직에서 뮤트함**: 팀에서 뮤트한 지표 이러한 뮤트 설정은 해당 조직에만 적용되며 언제든지 해제할 수 있습니다.

## 뮤트 작동 방식 {#how-muting-works}

지표를 뮤트하면 Cloud SIEM이 해당 지표와 일치하는 새 로그를 보강하는 방식이 다음과 같이 변경됩니다.

- 각 해당 위협 인텔리전스 결과의 [의도][2]가 `benign`으로 변경됩니다.
- 로그는 소스 및 카테고리와 같은 나머지 위협 인텔리전스 보강 정보를 유지하며 `has_been_muted: true`로 표시됩니다.
- 지표의 IOC 점수는 동일하게 유지됩니다.

뮤트는 해당 설정이 적용된 후 Cloud SIEM에서 처리하는 로그에 적용됩니다. 이미 처리된 로그는 기존 보강 정보를 유지합니다.

### 뮤트 또는 뮤트 해제가 적용되는 시점 {#when-a-mute-or-unmute-takes-effect}

- **IOC Explorer**: 새 뮤트 상태를 즉시 표시합니다.
- **로그 보강**: 적용하는 데 최대 1시간이 걸릴 수 있습니다. 이 기간에는 새 로그와 이를 기반으로 한 탐지 결과에 기존 등급이 계속 적용될 수 있습니다.

### 뮤트해도 변경되지 않는 위협 인텔리전스 {#threat-intelligence-that-muting-does-not-change}

조직의 지표를 뮤트해도 다음 출처에서 부여한 등급은 변경되지 않습니다.

- [참조 테이블][3]을 통해 직접 가져온 위협 인텔리전스
- 위협 인텔리전스 플랫폼(TIP) 통합: MISP, OpenCTI 및 Anomali ThreatStream

## 전제 조건 {#prerequisites}

- 조직이 Cloud SIEM을 구독해야 합니다.
- 다음 [권한][4]이 필요합니다.
  - 뮤트된 지표 보기: `security_monitoring_signals_read`
  - 지표를 뮤트하거나 뮤트 해제하기: `security_monitoring_signals_write`

## 제한 {#limits}

| 제한 | 값 |
|---|---|
| 조직당 활성 뮤트 수 | 10,000 |
| 뮤트 또는 뮤트 해제 작업당 지표 수 | 100 |
| 사유 길이 | 100자 |
| 지원되는 지표 유형 | IP 주소, 도메인, SHA-256 파일 해시 |

조직의 활성 뮤트 수가 10,000개에 도달하면, 새로운 지표를 뮤트하기 전에 더 이상 뮤트할 필요가 없는 지표의 뮤트를 해제하세요.

## 지표 뮤트 {#mute-indicators}

IP 주소, 도메인 및 SHA-256 파일 해시를 뮤트할 수 있습니다. 단일 값만 뮤트하세요. CIDR 범위는 뮤트할 수 없으므로 대신 개별 IP 주소를 뮤트하세요.

### 지표 뮤트 {#mute-an-indicator}

1. {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][5]로 이동합니다.
1. 지표를 클릭하여 사이드 패널을 엽니다.
1. {{< ui >}}Mute This IoC{{< /ui >}}를 클릭합니다.
1. 필요시 `Corporate VPN egress`와 같은 뮤트 사유를 입력합니다. 사유는 최대 100자까지 입력할 수 있으며 뮤트된 지표 페이지에 표시됩니다.
1. {{< ui >}}Mute{{< /ui >}}를 클릭합니다.

### 여러 지표 뮤트 {#mute-multiple-indicators}

1. {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][5]로 이동합니다.
1. 뮤트할 지표 옆의 확인란을 선택합니다. 한 번에 최대 100개의 지표를 뮤트할 수 있습니다.
1. 대량 작업 메뉴에서 {{< ui >}}Mute{{< /ui >}}를 클릭합니다.
1. 필요시 뮤트 사유를 입력합니다. 입력한 사유는 선택한 모든 지표에 적용됩니다.
1. 작업을 확인합니다.

조직 또는 Datadog에서 이미 뮤트한 선택 지표는 다시 뮤트하더라도 상태가 변경되지 않습니다.

## 뮤트된 지표 검토 {#review-muted-indicators}

뮤트된 지표 페이지에는 Datadog 및 조직에서 설정한 모든 활성 뮤트 항목이 표시됩니다. 페이지를 열려면 다음 중 하나를 수행하세요.

- {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Muted Indicators{{< /ui >}}][6]로 이동합니다.
- [IOC Explorer][5]에서 {{< ui >}}Muted Indicators{{< /ui >}}를 클릭합니다. 목록이 사이드 패널에서 열립니다. {{< ui >}}Open full page{{< /ui >}}를 클릭하여 설정 페이지로 이동합니다.

목록에는 각 지표의 유형, 범위 및 사유가 표시됩니다. Datadog 관리형 행에는 소스 피드가 표시됩니다. 조직에서 뮤트한 행에는 해당 지표를 뮤트한 사람과 시기가 표시됩니다. 검색창을 사용하여 지표, 지표 유형, 범위(조직 또는 Datadog 관리형), 소스 또는 사유를 기준으로 필터링합니다.

### IOC Explorer에서 뮤트된 지표 찾기 {#find-muted-indicators-in-the-ioc-explorer}

[IOC Explorer][5]의 {{< ui >}}Custom mute{{< /ui >}} 열에는 조직에서 뮤트한 지표에 대해 {{< ui >}}Muted{{< /ui >}}가 표시됩니다. 해당 지표만 표시하려면 {{< ui >}}Muted{{< /ui >}} 패싯을 사용하여 필터링합니다.

해당 열과 패싯에는 조직에서 설정한 뮤트만 반영됩니다. Datadog에서만 뮤트한 지표는 이 열이나 패싯에서 뮤트된 것으로 표시되지 않습니다. 모든 뮤트 항목을 보려면 [뮤트된 지표 페이지](#review-muted-indicators)를 사용합니다.

### 뮤트 기록 조회 {#view-mute-history}

지표의 사이드 패널에 있는 {{< ui >}}Conversation{{< /ui >}} 탭에는 모든 뮤트 및 뮤트 해제 이벤트, 각 작업의 수행자와 수행 시점이 나열됩니다. 이러한 이벤트는 지표의 댓글 및 분류 변경 사항과 함께 표시됩니다.

## 지표 뮤트 해제 {#unmute-indicators}

조직에서 뮤트한 지표의 뮤트를 해제할 수 있습니다. Datadog 관리형 뮤트는 읽기 전용입니다.

지표의 뮤트를 해제하려면 다음 중 하나를 수행하세요.

- [IOC Explorer][5]에서 지표의 사이드 패널을 열고 {{< ui >}}Un-mute This IoC{{< /ui >}}를 클릭합니다.
- [뮤트된 지표 페이지][6]에서 해당 지표의 행에 있는 {{< ui >}}Un-mute{{< /ui >}}를 클릭합니다.
- 뮤트된 지표 페이지에서 최대 100개의 지표를 선택하고 {{< ui >}}Un-mute{{< /ui >}}를 클릭합니다.

Datadog에서도 해당 지표를 뮤트한 경우, 뮤트를 해제해도 조직의 뮤트 설정만 제거됩니다. 지표는 `benign`으로 평가된 상태로 유지됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/triage_and_investigate/ioc_explorer/
[2]: /ko/security/threat_intelligence/#threat-intelligence-intents
[3]: /ko/security/cloud_siem/ingest_and_enrich/threat_intelligence/
[4]: /ko/account_management/rbac/permissions/#cloud-security-platform
[5]: https://app.datadoghq.com/security/siem/ioc-explorer
[6]: https://app.datadoghq.com/security/configuration/siem/muted-indicators