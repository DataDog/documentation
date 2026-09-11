---
aliases:
- /ko/account_management/audit_logs/
further_reading:
- link: /account_management/audit_trail/events/
  tag: 설명서
  text: Audit Trail 이벤트에 대해 알아보기
- link: /account_management/org_settings/
  tag: 설명서
  text: 조직 설정에 대해 알아보기
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: 블로그
  text: Datadog Audit Trail로 팀 전반에 규정 준수, 거버넌스 및 투명성 빌드
- link: https://www.datadoghq.com/blog/audit-trail-best-practices/
  tag: 블로그
  text: Audit Trail을 사용해 중요 Datadog 자산 및 설정 모니터링
title: Datadog Audit Trail
---

## 개요

관리자 또는 보안 팀원은 [Datadog Audit Trail][1]을 사용해 조직 내에서 Datadog을 사용하는 사용자와 컨텍스트를 확인할 수 있습니다. 개인이 사용하는 경우에는 내 작업 스트림을 확인할 수 있습니다.

감사 추적 기록 내에서 발생할 수 있는 이벤트에는 두 가지 유형이 있습니다. **이벤트 요청**은 Datadog의 API로 요청된 모든 요청을 고객 레코드로 변환합니다. 다른 유형은 **제품별 이벤트**입니다.

예를 들어 **이벤트 요청**를 추적하면 이벤트가 발생한 API 호출을 확인할 수 있습니다. 또는 기업 또는 요금 관리자인 경우 감사 추적 기록 이벤트를 사용해 인프라스트럭처 상태를 변경하는 사용자 이벤트를 추적할 수 있습니다.

이 같은 환경에서 감사 추적 기록은 제품별로 다음과 같은 이벤트를 알고 싶을 때 유용합니다.

  -  로그 볼륨 변경으로 인해 누군가가 인덱스 보존을 변경하여 월별 요금이 변경된 경우.

  - 대시보드나 모니터가 고장나고 수정해야 할 때 누가 언제 프로세서나 파이프라인을 수정했는지 알고 싶을 경우.

  - 누군가 인덱싱 볼륨이 증가하거나 줄어들어 제외 필터를 제외했고, 그로 인해 로그를 찾을 수 없거나 요금이 증가한 경우.

보안 관리자 또는 InfoSec 팀의 경우 감사 추적 기록 이벤트는 규정 준수 확인 및 Datadog 리소스에 누가 언제 무엇을 했는지에 관한 감사 추적 기록을 유지하는 데 도움이 됩니다. 예를 들어 다음과 같이 감사 추적 기록을 유지 관리할 수 있습니다.

- 중요한 대시보드, 모니터 및 기타 Datadog 리소스를 언제든지 업데이트하거나 삭제할 수 있습니다.

- 조직의 사용자 로그인, 계정, 또는 역할 변경을 할 수 있습니다.

## 설정

Datadog Audit Trail을 활성화하려면 [조직 설정][2]으로 이동해 *Security*에서 *Audit Trail Settings*를 선택한 후 **Enable** 버튼을 클릭합니다.

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="The Audit Trail Settings page showing it disabled" style="width:85%;">}}

Audit Trail을 활성화한 사용자를 확인하려면 다음과 같이 하세요.
1. [이벤트 탐색기][3]로 이동합니다.
2. 검색창에 `Datadog Audit Trail was enabled by`를 입력하세요. 이벤트를 캡처하려면 더 넓은 시간 범위를 선택해야 할 수도 있습니다.
3. "A user enabled Datadog Audit Trail"이라는 최근 이벤트는 누가 마지막으로 감사 추적 기록을 사용 가능으로 설정했는지를 보여줍니다.

## 구성


### 권한
`Audit Trail Write` 권한이 있는 사용자만 Audit Trail을 활성화하거나 비활성화할 수 있습니다. 또한 Audit Explorer를 사용해 감사 이벤트를 보려면 `Audit Trail Read` 권한이 필요합니다.

### 아카이빙

아카이빙은 Audit Trail의 선택 사항 기능입니다. 아카이빙을 사용하여 Amazon S3, Google Cloud Storage, 또는 Azure Storage에 기록하고 보안 정보와 이벤트 관리(SIEM) 시스템에서 이벤트를 읽게 할 수 있습니다. 아카이빙 설정을 생성하거나 업데이트한 후 다음 아카이빙 업로드를 시도하려면 몇 분 정도 걸릴 수 있습니다. 15분마다 이벤트가 아카이빙에 업로드되므로 15분 후에 스토리지 버킷을 다시 확인하여 Datadog 계정에서 아카이빙이 성공적으로 업로드되고 있는지 점검하세요.

Audit Trail 아카이빙을 활성화하려면 [Organization Settings][2]로 이동한 후 *Compliance*에서 *Audit Trail Settings*을 선택합니다. 아카이빙으로 스크롤하여 이벤트 저장 토글을 클릭하여 활성화합니다.

### 보존 기간

이벤트 보존은 Audit Trail의 선택 사항 기능입니다. *Retention*으로 스크롤하여 *Retention Audit Trail Events* 토글을 클릭하여 활성화합니다.

감사 추적 기록 이벤트의 기본 보존 기간은 7일이며 보존 기간은 3일에서 90일 사이로 설정할 수 있습니다.

{{< img src="account_management/audit_logs/retention_period.png" alt="Audit Trail Retention setup in Datadog" style="width:80%;">}}

## 감사 이벤트 탐색

감사 이벤트를 탐색하려면 Datadog의 [Organization Settings][2]에서도 액세스할 수 있는 [Audit Trail[1] 섹션으로 이동합니다.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="Audit Trail Settings in the Organization Settings menu" style="width:30%;">}}

Audit Trail 이벤트는 [Log Explorer][4] 내의 로그와 동일한 기능입니다.

- 이벤트 이름(대시보드, 모니터, 인증 등), 인증 속성(관계자, API Key ID, 사용자 이메일 등), `Status` (`Error`, `Warn`, `Info`), 방식(`POST`, `GET`,`DELETE`) ,기타 패싯별로 감사 추적 기록 이벤트를 검사하도록 필터링합니다.

- 이벤트를 선택하고 이벤트 속성 탭으로 이동하여 관련 감사 추적 기록 이벤트를 검사합니다. `http.method`, `usr.email`, `client.ip` 등 검색에서 제외하거나 필터링할 특정 속성을 선택합니다.

{{< img src="account_management/audit_logs/attributes.png" alt="Organization Settings 메뉴에 있는 Audit Trail" style="width:50%;">}}


### 저장된 페이지

효율적인 트러블슈팅을 하려면 데이터가 적절한 범위 내에서 탐색을 허용하고, 의미 있는 정보를 표시하기 위한 시각화 옵션에 액세스할 수 있으며, 분석이 가능하도록 관련 패싯 목록이 있어야 합니다. 트러블슈팅은 컨텍스트에 따라 달라지며, 저장된 보기를 통해 사용자와 동료는 서로 다른 트러블슈팅 컨텍스트를 쉽게 전환할 수 있습니다. Audit Trail 탐색기의 왼쪽 상단 모서리에 있는 저장된 보기에 액세스할 수 있습니다.

기본 보기가 아닌 저장된 모든 보기는 조직 전체에 공유됩니다.

* **통합 저장된 보기**는 Audit Trail과 함께 기본 기능으로 제공됩니다. 이 보기는 읽기 전용이며 Datadog 로고로 구분할 수 있습니다.
* **커스텀 저장된 보기**는 사용자가 작성하는 것이며, 조직 내 모든 사용자가 편집할 수 있고([사용자 읽기 전용][5] 제외), 작성한 사용자의 아바타로 구분합니다. **Save** 버튼을 클릭해 탐색기의 현재 컨텐츠에서 새 커스텀 저장 보기를 작성할 수 있습니다.

언제든지 보기 패널의 저장된 보기 항목에서 다음을 실행할 수 있습니다.

* 저장된 보기를 **로드**하거나 **다시 로드**합니다.
* 현재 보기의 구성으로 저장된 보기를 **업데이트**합니다.
* 저장된 보기의 **이름을 다시 지정**하거나 **삭제**합니다.
* 짧은 링크를 통해 저장된 보기를 **공유**합니다.
* 저장된 보기를 **별**(즐겨찾기에 추가) 표시해 맨 위에 나타나도록 하면 탐색 메뉴에서 바로 액세스할 수 있습니다.

**참고:** 통합 저장된 보기 및 [사용자 읽기 전용][5]의 경우 작업 업데이트, 이름 변경, 삭제가 비활성화됩니다.


### 기본 보기

{{< img src="logs/explorer/saved_views/default.png" alt="기본 보기" style="width:50%;" >}}

기본 보기 기능을 사용하면 Audit Trail 탐색기를 처음 열 때 항상 표시되는 쿼리 또는 필터의 기본 집합을 설정할 수 있습니다. 보기 패널을 열고 다시 로드 버튼을 클릭하면 기본 보기로 돌아갈 수 있습니다.

Audit Trail 탐색기 보기는 기본 저장된 보기입니다. 이 설정은 사용자만 액세스하여 볼 수 있으며, 이 설정을 업데이트해도 조직에 영향을 주지 않습니다. UI에서 작업을 완료하거나 다른 설정이 내장된 Audit Trail 탐색기의 링크를 열어 기본 저장된 보기를 **일시적으로** 재정의할 수 있습니다.

언제든지 보기 패널의 기본 보기 항목에서 다음을 실행할 수 있습니다.

* 항목을 클릭하여 기본 보기를 **다시 로드**합니다.
* 현재 파라미터를 사용해 기본 보기를 **업데이트**합니다.
* 기본 보기를 Datadog 기본값으로 **재설정**해 재시작합니다.

### 중요 이벤트

중요 이벤트는 감사 이벤트의 하위 세트로, Datadog가 보안 상 중요하다고 식별했거나 요금에 영향을 미치는 등 잠재적으로 중요한 설정 변경 사항을 보여줍니다. 이를 통해 조직 관리자는  사용 가능한 이벤트와 해당 속성을 모두 알 필요없이 생성된 많은 이벤트 중 가장 중요한 이벤트에 집중할 수 있습니다.

{{< img src="account_management/audit_logs/notable_events.png" alt="중요 이벤트를 표시하는 감사 이벤트 패싯 패널" style="width:30%;">}}

다음 쿼리와 일치하는 이벤트는 중요한 것으로 표시됩니다.

| 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ------------------------------------------------------------------- | --------------------------------------------------|
| 로그 기반 메트릭의 변경 사항 | `@evt.name:"Log Management" @asset.type:"custom_metrics"` |
| 로그 관리 인덱스 제외 필터 변경 사항 | `@evt.name:"Log Management" @asset.type:"exclusion_filter"` |
| 로그 관리 인덱스 변경 내용 | `@evt.name:"Log Management" @asset.type:index` |
| 애플리케이션 성능 모니터링(APM) 보존 필터 변경 사항 | `@evt.name:APM @asset.type:retention_filter` |
| 애플리케이션 성능 모니터링(APM) 커스텀 메트릭의 변경 사항 | `@evt.name:APM @asset.type:custom_metrics` |
| 메트릭 태그 변경 사항 | `@evt.name:Metrics @asset.type:metric @action:(created OR modified)` |
| RUM 애플리케이션 생성 및 삭제 | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| 중요 데이터 스캐너 검색 그룹 변경 내용 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| 신서틱 테스트 생성 또는 삭제 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |

### 변경 사항 검사(Diff)

감사 이벤트 세부 정보 패널의 변경 사항 검사(Diff) 탭은 이전에 설정된 것과 변경된 설정을 비교합니다. 이 탭은 JSON 개체로 표시되는 대시보드, 노트북 및 모니터 설정의 변경 사항을 보여줍니다.

{{< img src="account_management/audit_logs/inspect_changes.png" alt="복합 모니터 구성이 표시된 감사 이벤트 사이드 패널, 초록색으로 강조 표시된 텍스트는 변경 사항, 빨간색으로 표시된 텍스트는 삭제된 사항." style="width:70%;">}}


## 모니터 생성

감사 추적 기록 이벤트 유형 또는 특정 추적 특성별로 모니터를 만들려면 [감사 추적 기록 모니터 설명서][6]를 참고하세요. 예를 들어, 특정 사용자가 로그인할 때 트리거하는 모니터를 설정하거나 대시보드가 삭제될 때마다 모니터를 설정합니다.

## 대시보드 또는 그래프 만들기

대시보드를 사용하여 감사 추적 기록 이벤트에 더 많은 시각적 컨텍스트를 제공합니다. 감사 대시보드를 만드려면 다음을 실행하세요.

1. Datadog에서 [새 대시보드][7]를 만듭니다.
2. 시각화를 선택합니다. 감사 이벤트를 [탑 목록][8], [타임시리즈][9], [목록][10]으로 시각화할 수 있습니다.
3. [데이터 그래프 작성][11]: 편집에서 *Audit Events*를 데이터 소스로 선택하고 쿼리를 만듭니다. 오딧 이벤트는 카운트별로 필터링되며 서로 다른 패싯으로 그룹화할 수 있습니다. 패싯과 리미트를 선택합니다.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="데이터를 그래프할 때 Audit Trail을 데이터 소스르 설정" style="width:100%;">}}
4. 디스플레이 환경설정을 설정하고 그래프에 제목을 지정한 후 *Save* 버튼을 클릭하여 대시보드를 만듭니다.

## 예약된 보고서 만들기

Datadog 감사 추적 기록을 사용하면 정기적으로 예약된 이메일로 감사 분석 보기를 보낼 수 있습니다. 이 보고서는 Datadog 플랫폼 사용량을 정기적으로 모니터링하는 데 유용합니다. 예를 들어 국가별 고유 Datadog 사용자 로그인 수에 대한 주간 보고서를 받을 수 있습니다. 이 쿼리를 통해 비정상적인 로그인 활동을 모니터링하거나 사용량에 대한 자동화된 인사이트를 얻을 수 있습니다.

감사 분석 쿼리를 보고서로 내보내려면 시계열, 최상위 목록이나 테이블 쿼리를 만들고 **More...** > **Export as schedule report**를 클릭하여 쿼리를 예약된 보고서로 내보낼 수 있습니다.

{{< img src="account_management/audit_logs/scheduled_report_export.png" alt="More... 드롭다운 메뉴로 예약된 보고서 내보내기" style="width:90%;" >}}

1. 쿼리 위젯과 함께 생성되는 대시보드의 이름을 입력합니다. 예약된 모든 보고서에 새 대시보드가 만들어집니다. 보고서 내용이나 일정을 변경해야 할 경우 이 대시보드를 나중에 참조해 변경할 수 있습니다.
2. 보고서 빈도와 기간을 사용자 정의하여 이메일 보고서를 예약합니다.
3. 이메일을 보낼 수신인을 추가합니다.
4. 이메일 보고서에 포함되어야 하는 추가 사용자 지정 메시지를 추가합니다.
5. **Create Dashboard and Schedule Report**을 클릭합니다.

{{< img src="account_management/audit_logs/export_workflow.png" alt="감사 분석 보기를 예약된 이메일로 내보내기" style="width:80%;" >}}

## 감사 이벤트를 CSV로 다운로드

Datadog Audit Trail을 사용하면 최대 100,000개의 감사 이벤트를 로컬에서 CSV 파일로 다운로드할 수 있습니다. 그런 다음 이벤트를 로컬에서 분석하거나 추가 분석을 위해 다른 도구에 업로드하거나 보안 및 규정 준수의 일부로 해당 팀원들과 공유할 수 있습니다.

감사 이벤트를 CSV로 내보내는 방법:
1. 관심 있는 이벤트를 캡처할 수 있는 적절한 검색 쿼리 실행
2. CSV의 일부로 원하는 보기에서 이벤트 필드를 열로 추가
3. CSV로 다운로드 클릭
4. CSV로 내보낼 이벤트 수를 선택

## 기본 기능으로 제공되는 대시보드

Datadog Audit Trail에는 인덱스 보존 변경, 로그 파이프라인 변경, 대시보드 변경 등과 같은 다양한 감사 이벤트를 보여주는 [기본으로 제공되는 대시보드][12]가 있습니다. 이 대시보드를 복제하여 감사  요구에 맞게 쿼리 및 시각화를 사용자 지정합니다.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Audit Trail 대시보드" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: https://app.datadoghq.com/organization-settings/
[3]: https://app.datadoghq.com/event/explorer
[4]: /ko/logs/explorer/
[5]: https://docs.datadoghq.com/ko/account_management/rbac/permissions/?tab=ui#general-permissions
[6]: /ko/monitors/types/audit_trail/
[7]: /ko/dashboards/
[8]: /ko/dashboards/widgets/top_list/
[9]: /ko/dashboards/widgets/timeseries/
[10]: /ko/dashboards/widgets/list/
[11]: /ko/dashboards/querying/#define-the-metric/
[12]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true