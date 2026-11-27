---
aliases:
- /ko/account_management/audit_logs/
description: 규정 준수, 보안 및 거버넌스를 위한 포괄적인 감사 로깅을 통해 Datadog 사용자 활동, API 요청 및 리소스 변경 사항을
  모니터링하세요.
further_reading:
- link: /account_management/audit_trail/events/
  tag: 설명서
  text: Audit Trail 이벤트 알아보기
- link: /account_management/org_settings/
  tag: 설명서
  text: 조직 설정 알아보기
- link: /data_security/pci_compliance/
  tag: 설명서
  text: PCI DSS Compliance
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: 블로그
  text: Datadog Audit Trail로 팀 전반에 규정 준수, 거버넌스 및 투명성 구축하기
- link: https://www.datadoghq.com/blog/audit-trail-best-practices/
  tag: 블로그
  text: Audit Trail을 사용하여 중요한 Datadog 자산 및 구성 모니터링하기
- link: /account_management/delete_data/
  tag: 설명서
  text: Datadog에서 데이터 삭제
title: Datadog Audit Trail
---
## 개요 {#overview}

관리자 또는 보안팀 구성원은 [Datadog Audit Trail][1]을 사용하여 조직 내에서 누가 Datadog을 사용하고 있으며 어떤 컨텍스트에서 사용하고 있는지 확인할 수 있습니다. 개인 사용자도 자신의 활동 내역을 시간순으로 확인할 수 있습니다.

감사 추적 내에서 발생할 수 있는 이벤트는 두 가지 유형으로, Datadog API에 대한 모든 요청을 고객 기록으로 변환하는 **요청 이벤트**와 **제품별 이벤트**입니다.

예를 들어, **요청 이벤트**를 추적하면 어떤 API 호출이 해당 이벤트를 발생시켰는지 확인할 수 있습니다. 또는 엔터프라이즈 관리자나 청구 관리자인 경우, 감사 추적 이벤트를 사용하여 인프라 상태를 변경하는 사용자 이벤트를 추적하세요.

이러한 경우 감사 이벤트는 다음과 같은 제품별 이벤트를 확인할 때 유용합니다.

  -  로그 볼륨 변경으로 인해 월 청구액이 달라져 누군가 인덱스 보존을 변경한 시점

  - 프로세서 또는 파이프라인을 수정한 사람 및 수정된 시점(대시보드 또는 모니터링이 작동하지 않아 수정이 필요함)

  - 인덱싱 볼륨이 증가하거나 감소했으며 로그를 찾을 수 없거나 청구액이 증가하여 제외 필터를 수정한 사람

보안 관리자 또는 정보 보안팀은 감사 추적 이벤트를 활용하여 규정 준수 여부를 점검하고 Datadog 리소스에 대해 누가 무엇을 언제 수행했는지 기록한 감사 추적을 유지할 수 있습니다. 예를 들어, 다음과 같은 활동에 대한 감사 추적을 유지할 수 있습니다.

- 누군가 중요한 대시보드, 모니터링 및 기타 Datadog 리소스를 업데이트 또는 삭제함

- 조직 내 사용자 로그인, 계정 또는 역할 변경

[Cloud SIEM][15]을 사용하여 Audit Trail 이벤트를 분석하고 위협을 탐지하며 보안 시그널을 생성할 수도 있습니다. 자세한 내용은 [Cloud SIEM 시작하기][16]를 참조하세요.

**참고**: Datadog의 도구 및 정책은 PCI v4.0을 준수합니다. 자세한 내용은 [PCI DSS Compliance][2]를 참조하세요.

## 설정 {#setup}

Datadog Audit Trail을 활성화하려면 [조직 설정][3]으로 이동하여 {{< ui >}}COMPLIANCE{{< /ui >}} 아래의 {{< ui >}}Audit Trail Settings{{< /ui >}}를 선택하세요. {{< ui >}}Enable{{< /ui >}} 버튼을 클릭하세요.

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="비활성화된 상태를 보여주는 Audit Trail 설정 페이지" style="width:85%;">}}

Audit Trail을 활성화한 사용자를 확인하려면 다음 단계를 따르세요.
1. [Events Explorer][4]로 이동합니다.
2. 검색창에 `Datadog Audit Trail was enabled by`를 입력합니다. 해당 이벤트를 찾으려면 더 넓은 시간 범위를 선택해야 할 수도 있습니다.
3. 제목이 'A user enabled Datadog Audit Trail'인 가장 최근 이벤트에서 Audit Trail을 마지막으로 활성화한 사용자를 확인할 수 있습니다.

## 구성 {#configuration}


### 권한 {#permissions}
`Audit Trail Write` 권한이 있는 사용자만 Audit Trail을 활성화하거나 비활성화할 수 있습니다. 또한 Audit Explorer에서 감사 이벤트를 조회하려면 `Audit Trail Read` 권한이 필요합니다.

### 아카이브 {#archiving}

아카이브는 Audit Trail의 선택적 기능입니다. 아카이브를 사용하여 Amazon S3, Google Cloud Storage 또는 Azure Storage에 이벤트를 저장하고, SIEM 시스템에서 해당 스토리지의 이벤트를 읽도록 할 수 있습니다. 아카이브 구성을 생성하거나 업데이트한 후 다음 아카이브 업로드가 시도되기까지 몇 분이 걸릴 수 있습니다. 이벤트는 15분마다 아카이브에 업로드됩니다. 따라서 15분 후 스토리지 버킷을 다시 확인하여 Datadog 계정에서 아카이브가 정상적으로 업로드되고 있는지 확인하세요.

Audit Trail의 아카이브 기능을 활성화하려면 [조직 설정][3]으로 이동한 후 {{< ui >}}Compliance{{< /ui >}} 아래의 {{< ui >}}Audit Trail Settings{{< /ui >}}를 선택하세요. Archiving 섹션까지 아래로 스크롤한 후 {{< ui >}}Store Events{{< /ui >}} 토글을 클릭하여 활성화하세요.

### 보존 {#retention}

이벤트 보존은 Audit Trail의 선택적 기능입니다. {{< ui >}}Retention Period{{< /ui >}} 섹션에서 {{< ui >}}Change retention period{{< /ui >}}를 클릭하여 사용 사례에 적합한 보존 기간을 선택하세요.

Audit Trail이 활성화되면 Audit Trail 이벤트의 기본 보존 기간은 90일입니다. 보존 기간은 3, 7, 15, 30 또는 90일로 설정할 수 있습니다.

Audit Trail이 비활성화되면 보존 기간이 기본값인 7일로 재설정됩니다.

{{< img src="account_management/audit_logs/retention_period.png" alt="Datadog의 Audit Trail 보존 설정" style="width:80%;">}}

## 감사 이벤트 탐색 {#explore-audit-events}

Audit Trail 이벤트를 탐색하려면 [Audit Trail][1] 섹션으로 이동하세요. 이 섹션은 Datadog의 [Organization Settings][3]에서도 액세스할 수 있습니다.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="Organization Settings 메뉴의 Audit Trail Settings" style="width:30%;">}}

Audit Trail 이벤트는 [Log Explorer][5]의 로그와 동일한 기능을 제공합니다.

- Event Names(대시보드, 모니터링, 인증 등), Authentication Attributes(Actor, API 키 ID, 사용자 이메일 등), `Status`(`Error`, `Warn`, `Info`), Method(`POST`, `GET`, `DELETE`) 및 기타 패싯을 기준으로 필터링하여 감사 추적 이벤트를 조사합니다.

- 이벤트를 선택하고 이벤트 특성 탭으로 이동하여 관련 감사 추적 이벤트를 조사합니다. `http.method`, `usr.email`, `client.ip` 등 검색 결과를 필터링하거나 검색에서 제외할 특정 특성을 선택합니다.

{{< img src="account_management/audit_logs/attributes.png" alt="조직 설정 메뉴의 Audit Trail" style="width:50%;">}}


### 자연어 쿼리 {#natural-language-queries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">
이 기능은 선택한 Datadog 사이트에서는 지원되지 않습니다({{< region-param key="dd_site_name" >}}).
</div>
{{< /site-region >}}

자연어 쿼리(NLQ)를 사용하여 찾고 있는 내용을 쉬운 영어로 설명하세요. Datadog은 사용자의 요청을 구조화된 감사 추적 쿼리로 자동 변환하므로, 복잡한 구문을 작성하지 않고도 감사 이벤트를 더 쉽게 탐색할 수 있습니다.

시스템은 자연어 입력을 Datadog 쿼리로 변환하고 사용자, 작업, 리소스 및 시간 범위와 같은 컨텍스트를 이해합니다. 또한 "지난주에 결제 대시보드를 수정한 사람은 누구야?" 또는 "지난 24시간 동안 발생한 모든 역할 변경 사항을 표시해 줘."와 같은 요청에서 관련 필드를 자동으로 탐지합니다.

{{< img src="account_management/audit_logs/audit_trail_nlq_light.mp4" alt="일반적인 영어 표현으로 감사 이벤트를 검색하는 방법을 보여주는 Audit Trail의 자연어 쿼리" video=true >}}

### 저장된 보기 {#saved-views}

효율적인 문제 해결을 위해서는 데이터를 탐색할 수 있도록 적절한 범위를 설정하고, 의미 있는 정보를 확인할 수 있는 시각화 옵션에 접근할 수 있어야 하며, 분석에 필요한 관련 패싯이 표시되어 있어야 합니다. 문제 해결은 컨텍스트에 따라 달라지며, Saved Views를 사용하면 사용자와 팀원이 서로 다른 문제 해결 컨텍스트 간을 더 쉽게 전환할 수 있습니다. Audit Trail 탐색기 왼쪽 상단에서 Saved Views에 접근할 수 있습니다.

기본 보기를 제외한 모든 저장된 보기는 조직 전체에서 공유됩니다.

* {{< ui >}}Integration saved views{{< /ui >}}는 Audit Trail에서 기본으로 제공됩니다. 이러한 보기는 읽기 전용이며 Datadog 로고로 식별할 수 있습니다.
* {{< ui >}}Custom saved views{{< /ui >}} 는 사용자가 생성합니다. 이러한 보기는 조직 내 모든 사용자(읽기 전용 사용자[6] 제외)가 편집할 수 있으며, 보기를 생성한 사용자의 아바타로 식별됩니다. 탐색기의 현재 내용을 바탕으로 새로운 사용자 지정 저장된 보기를 생성하려면 {{< ui >}}Save{{< /ui >}} 버튼을 클릭하세요.

언제든지 Views 패널의 저장된 보기 항목에서 다음 작업을 수행할 수 있습니다.

* 저장된 보기 {{< ui >}}Load{{< /ui >}} 또는 {{< ui >}}reload{{< /ui >}}
* 현재 보기의 구성으로 저장된 보기 {{< ui >}}Update{{< /ui >}} 
* 저장된 보기 {{< ui >}}Rename{{< /ui >}} 또는 {{< ui >}}delete{{< /ui >}}
* 짧은 링크를 통해 저장된 보기 {{< ui >}}Share{{< /ui >}} 
* 저장된 보기에 {{< ui >}}Star{{< /ui >}} 를 표시(즐겨찾기에 추가)하여 저장된 보기 목록 상단에 표시하고 탐색 메뉴에서 바로 액세스할 수 있도록 설정

**참고:** 통합 저장된 보기 및 [읽기 전용 사용자][6]의 경우 업데이트, 이름 변경 및 삭제 작업이 비활성화됩니다.


### 기본 보기 {#default-view}

{{< img src="logs/explorer/saved_views/default.png" alt="기본 보기" style="width:50%;" >}}

기본 보기 기능을 사용하면 Audit Trail 탐색기를 처음 열 때 항상 표시되는 기본 쿼리 또는 필터 세트를 설정할 수 있습니다. 보기 패널을 열고 새로고침 버튼을 클릭하여 기본 보기로 돌아갈 수 있습니다.

현재 Audit Trail 탐색기 보기는 기본 저장된 보기입니다. 이 구성은 본인만 액세스하고 조회할 수 있으며, 이 구성을 업데이트해도 조직에는 영향이 없습니다. UI에서 어떤 작업이든 수행하거나 다른 구성이 포함된 Audit Trail 탐색기 링크를 열어 **임시로** 기본 저장된 보기를 재정의할 수 있습니다.

언제든지 Views 패널의 기본 보기 항목에서 다음 작업을 수행할 수 있습니다.

* {{< ui >}}Reload{{< /ui >}} 항목을 클릭하여 기본 보기를 다시 불러옵니다.
* 현재 보기의 구성으로 저장된 보기 {{< ui >}}Update{{< /ui >}} 현재 파라미터를 사용하여 기본 보기를 업데이트합니다.
* {{< ui >}}Reset{{< /ui >}} 새로 시작할 수 있도록 기본 보기를 Datadog 기본값으로 재설정합니다.

### 중요 이벤트 {#notable-events}

중요 이벤트는 Datadog에서 식별한 감사 이벤트의 하위 집합으로, 청구에 영향을 주거나 보안상 중요한 의미가 있을 수 있는 잠재적으로 중요한 구성 변경 사항을 보여줍니다. 이를 통해 조직 관리자는 생성된 수많은 이벤트 중 가장 중요한 이벤트에 집중할 수 있으며, 사용 가능한 모든 이벤트와 해당 속성을 일일이 파악할 필요가 없습니다.

{{< img src="account_management/audit_logs/notable_events.png" alt="중요 이벤트가 선택된 감사 이벤트 패싯 패널" style="width:30%;">}}

다음 쿼리와 일치하는 이벤트는 중요 이벤트로 표시됩니다. 쿼리 `is_notable_event:true`를 사용하여 모든 중요 이벤트를 검색할 수도 있습니다.

| 감사 이벤트 설명                                          | 감사 탐색기의 쿼리                           |
| ------------------------------------------------------------------- | --------------------------------------------------|
| 로그 기반 메트릭 변경 사항 | `@evt.name:"Log Management" @asset.type:"custom_metrics"` |
| Log Management 인덱스 제외 필터 변경 사항 | `@evt.name:"Log Management" @asset.type:"exclusion_filter"` |
| Log Management 인덱스 변경 사항 | `@evt.name:"Log Management" @asset.type:index` |
| APM 보존 필터 변경 사항 | `@evt.name:APM @asset.type:retention_filter` |
| APM 사용자 지정 메트릭 변경 사항 | `@evt.name:APM @asset.type:custom_metrics` |
| 메트릭 태그 변경 사항 | `@evt.name:Metrics @asset.type:metric @action:(created OR modified)` |
| RUM 애플리케이션 생성 및 삭제 | `@evt.name:"Real User Monitoring" @asset.type:rum_application @action:(created OR deleted)` |
| Sensitive Data Scanner 스캔 그룹 변경 사항 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| Synthetic 테스트 생성 또는 삭제 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| 애플리케이션에 대한 Product Analytics 활성화, 비활성화 및 수정 | `@evt.name:"Product Analytics" @asset.type:product_analytics @action:(enabled OR disabled OR modified)` |

### 에이전트 위임 작업을 포함한 사용자의 전체 활동 조회 {#view-a-users-full-activity-including-agent-delegated-actions}

Datadog AI agent가 사용자를 대신하여 작업을 수행할 때, 해당 이벤트의 `@usr.*`에는 agent 정보가 채워지고 `@delegator.*`에는 원래 사용자 정보가 대신 채워집니다. `@usr.id:<USER_ID>`만 검색하면 사용자가 직접 수행한 작업이 반환되며, Datadog AI agent가 사용자를 대신하여 수행한 작업은 포함되지 않습니다.

| 감사 이벤트 설명                                                                        | 감사 탐색기의 쿼리                                     |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 사용자가 직접 수행한 작업                                                                    | `@usr.id:<USER_ID>`                                           |
| Datadog AI agent가 사용자를 대신하여 수행한 작업을 포함하여 사용자에게 귀속된 모든 작업     | `(@usr.id:<USER_ID> OR @delegator.id:<USER_ID>)`               |

에이전트 기반 감사 이벤트를 필터링하고 보는 방법에 대한 자세한 내용은 [조직의 에이전트 사용량 추적][18]을 참조하세요.

### Inspect Changes (Diff) {#inspect-changes-diff}

감사 이벤트 세부 정보 패널의 Inspect Changes (Diff) 탭에서는 이전 설정에 적용된 구성 변경 사항이 비교됩니다. 대시보드, 노트북 및 모니터링 구성에 적용된 변경 사항을 보여주며, 이는 JSON 객체로 표시됩니다.

{{< img src="account_management/audit_logs/inspect_changes.png" alt="복합 조건 모니터링 구성의 변경 사항을 보여주는 감사 이벤트 사이드 패널로, 녹색으로 강조 표시된 텍스트는 변경된 내용이고 빨간색으로 강조 표시된 텍스트는 제거된 내용입니다." style="width:70%;">}}

## Reference Table을 기반으로 감사 이벤트 필터링 {#filter-audit-events-based-on-reference-tables}

<div class="alert alert-danger">1,000,000행이 넘는 Reference Table은 이벤트 필터링에 사용할 수 없습니다. Reference Table 생성 및 관리 방법에 대한 자세한 내용은 <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Reference Table로 사용자 지정 메타데이터 추가</a>를 참조하세요. </div>

Reference Table을 사용하면 메타데이터를 감사 이벤트와 결합하여 Datadog 사용자 행동을 조사하는 데 더 많은 정보를 제공할 수 있습니다. Reference Table를 기반으로 쿼리 필터를 추가하여 조회 쿼리를 수행하세요. 이 기능을 활성화하고 관리하는 방법에 대한 자세한 내용은 [Reference Table][2] 가이드를 참조하세요.

Reference Table로 쿼리 필터를 적용하려면 쿼리 편집기 옆의 {{< ui >}}\+ Add{{< /ui >}} 버튼을 클릭하고 {{< ui >}}Join with Reference Table{{< /ui >}}을 선택하세요. 다음 예시에서는 Reference Table 쿼리 필터를 사용하여 승인되지 않은 IP 주소에서 Datadog에 액세스하는 사용자가 수정한 대시보드를 검색합니다.

{{< img src="account_management/audit_logs/reference_tables.png" alt="Reference Table 검색 옵션이 강조 표시된 Datadog Audit Trail 탐색기" border="true" popup="true" style="width:100%;" >}}

### API 키 감사 {#api-key-auditing}

Log Management 사용자는 Audit Trail을 통해 API 키 사용을 감사할 수 있습니다. API 키 감사를 위해 로그에는 해당 로그를 수집하는 데 사용된 API 키의 UUID가 포함된 `datadog.api_key_uuid` 태그가 있습니다. 이 정보를 사용하여 다음 사항을 확인합니다.
- 조직 및 텔레메트리 소스 전반에서 API 키가 사용되는 방식.
- API 키 교체 및 관리.

## 모니터링 생성 {#create-a-monitor}

감사 추적 이벤트 유형이나 특정 Audit Trail 속성을 기준으로 모니터링을 생성하려면 [Audit Trail Monitor 설명서][7]를 참조하세요. 예를 들어, 특정 사용자가 로그인하거나 대시보드가 삭제될 때 트리거되는 모니터링을 설정할 수 있습니다.

## 대시보드 또는 그래프 생성 {#create-a-dashboard-or-a-graph}

대시보드를 사용하여 감사 추적 이벤트에 더 많은 시각적 컨텍스트를 제공하세요. 감사 대시보드를 생성하려면 다음 단계를 따르세요.

1. Datadog에서 [새 대시보드][8]를 생성합니다.
2. 시각화를 선택합니다. 감사 이벤트를 [상위 목록][9], [시계열][10] 및 [목록][11]으로 시각화할 수 있습니다.
3. [데이터 그래프화][12]: 편집에서 *감사 이벤트*를 데이터 소스로 선택하고 쿼리를 생성합니다. 감사 이벤트는 개수별로 필터링되며 다양한 패싯별로 그룹화할 수 있습니다. 패싯과 제한을 선택합니다.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="데이터를 그래프화하려면 Audit Trail을 데이터 소스로 설정하세요." style="width:100%;">}}
4. 표시 기본 설정을 지정하고 그래프 제목을 설정하세요. *Save* 버튼을 클릭하여 대시보드를 생성합니다.

## 예약 보고서 전송 {#send-out-a-scheduled-report}

Audit Trail 쿼리를 대시보드로 저장하고 예약된 보고서를 전송할 수 있습니다. 이러한 보고서는 Datadog 플랫폼 사용량을 정기적으로 모니터링하는 데 유용할 수 있습니다 예를 들어, 국가별 Datadog 고유 사용자 로그인 수를 주간 이메일로 전송할 수 있습니다. 이 쿼리를 사용하면 비정상적인 로그인 활동을 모니터링하거나 사용량에 대한 자동화된 인사이트를 받을 수 있습니다.

예약 보고서를 생성하려면 다음 단계를 따르세요.

1. [Audit Trail][1]으로 이동하여 쿼리를 입력하고 감사 이벤트를 필터링합니다.
1. {{< ui >}}More{{< /ui >}}를 클릭하고 {{< ui >}}Save to dashboard{{< /ui >}}를 선택합니다.
    - 기존 대시보드에 저장하거나 새 대시보드를 생성할 수 있습니다.
1. 대시보드에서 {{< ui >}}Share{{< /ui >}}를 클릭하고 {{< ui >}}Schedule report{{< /ui >}}를 선택합니다.
1. [보고서 예약][17]의 지침에 따라 보고서를 설정합니다.

## 감사 이벤트를 CSV로 다운로드 {#download-audit-events-as-csv}

Datadog Audit Trail을 사용하면 최대 10만 개의 감사 이벤트를 로컬에 CSV 파일로 다운로드할 수 있습니다. 이러한 이벤트는 로컬에서 분석하거나, 추가 분석을 위해 다른 도구에 업로드하거나, 보안 및 규정 준수 작업의 일환으로 적절한 팀 구성원과 공유할 수 있습니다.

감사 이벤트를 CSV로 내보내려면 다음 단계를 따르세요.
1. 관심 있는 이벤트를 캡처하는 적절한 검색 쿼리를 실행합니다.
2. CSV에 포함할 이벤트 필드를, 원하는 보기의 열로 추가합니다.
3. {{< ui >}}Download as CSV{{< /ui >}}를 클릭합니다.
4. 내보낼 이벤트 수를 선택하고 CSV로 내보냅니다.

## 기본 제공 대시보드 {#out-of-the-box-dashboard}

Datadog Audit Trail은 인덱스 보존 변경, 로그 파이프라인 변경, 대시보드 변경 등 다양한 감사 이벤트를 보여주는 [기본 제공 대시보드][13]를 제공합니다. 이 대시보드를 복제하여 감사 요구 사항에 맞게 쿼리와 시각화를 사용자 지정하세요.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Audit Trail 대시보드" style="width:100%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /ko/data_security/pci_compliance/
[3]: https://app.datadoghq.com/organization-settings/
[4]: https://app.datadoghq.com/event/explorer
[5]: /ko/logs/explorer/
[6]: https://docs.datadoghq.com/ko/account_management/rbac/permissions/?tab=ui#general-permissions
[7]: /ko/monitors/types/audit_trail/
[8]: /ko/dashboards/
[9]: /ko/dashboards/widgets/top_list/
[10]: /ko/dashboards/widgets/timeseries/
[11]: /ko/dashboards/widgets/list/
[12]: /ko/dashboards/querying/#define-the-metric/
[13]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true
[15]: /ko/security/cloud_siem/
[16]: /ko/getting_started/cloud_siem/
[17]: /ko/dashboards/sharing/scheduled_reports/#schedule-a-report
[18]: /ko/account_management/audit_trail/guides/track_agentic_usage_in_your_organization/