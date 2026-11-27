---
aliases:
- /ko/account_management/billing/usage_details/
description: 월간 누적 요약, 사용량 추이, 상위 사용자 지정 메트릭, 인덱스별 로그 사용량을 통해 모든 제품의 Datadog 사용량을
  모니터링할 수 있습니다.
title: 사용량 세부 정보
---
{{< callout url="" btn_hidden="true" header="새로운 기능: 청구 개요" respect-site-support="false" >}}
새로운 Bill Overview 환경이 현재 제한적으로 제공되고 있으며 2026년 3월부터 모든 조직에 자동으로 배포되기 시작할 예정입니다. [자세히 알아보기](/account_management/plan_and_usage/bill_overview/).
{{< /callout >}}

## 개요 {#overview}

관리자는 왼쪽 하단의 사용자 이름 위로 마우스를 가져가 [Usage][1] 페이지에 액세스한 후 다음 위치로 이동할 수 있습니다.
`Plan & Usage`--> `Usage`.

Usage 페이지에는 제품 카테고리별로 그룹화된 사용량이 표시됩니다. 제품 탭으로 이동하여 해당 제품 카테고리의 사용량을 확인하거나 'All' 탭으로 이동하여 모든 제품의 사용량을 확인할 수 있습니다. 각 탭에서는 다음 정보를 제공합니다.

* 월간 누적 요약
* 전체 사용량(현재 및 과거)

일부 제품 탭에는 추가 도구도 포함되어 있습니다.

* Custom Metrics 탭: Top Custom Metrics
* Log Management 탭: Logs Usage by Index

## 월간 누적 요약 {#month-to-date-summary}

이 섹션은 월간 누적 사용량을 요약합니다. 'All' 탭에서는 인프라 호스트, 컨테이너, 사용자 지정 메트릭, APM 호스트, 로그 및 해당 월에 사용한 플랫폼의 다른 부분에 대한 월간 누적 사용량을 확인할 수 있습니다. 

{{< img src="account_management/billing/usage-details-v2-01.png" alt="Usage Summary - All 탭" >}}

제품별 탭에서 해당 제품 카테고리에 속한 제품의 월간 누적 사용량을 확인할 수 있습니다.

{{< img src="account_management/billing/usage-details-v2-02.png" alt="Usage Summary - Network" >}}

위에 표시된 월간 누적 사용량은 제품 체험판과 같은 비청구 대상 사용량을 포함하는 'All' 사용량입니다. 대부분의 계정에서는 최종 청구서에 반영되는 사용량만 표시하는 'Billable' 사용량을 확인할 수 있습니다. 'Billable' 보기에서는 사용량을 약정량, 할당량 및 온디맨드 사용량별로 분류합니다.

{{< img src="account_management/billing/UsageTilesWithAllPills.png" alt="Usage Summary - Billable" >}}
API 사용자는 ['All'][2] 사용량과 ['Billable'][3] 사용량에 액세스할 수 있는 엔드포인트를 사용할 수 있습니다.

각 제품의 당월 누적 사용량은 다음과 같이 계산됩니다.

| 제품                   | 설명                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Infra. Hosts             | 당월 매 시간 기준으로 고유한 모든 인프라 호스트의 99번째 백분위수를 보여줍니다.                         |
| Containers               | 당월 매 시간 기준으로 고유한 모든 컨테이너의 최대치를 보여줍니다.                                    |
| APM Hosts                | 당월 매 시간 기준으로 고유한 모든 APM 호스트의 99번째 백분위수를 보여줍니다.                                    |
| Profiled Hosts           | 당월 매 시간 기준으로 고유한 모든 프로파일링된 호스트의 99번째 백분위수를 보여줍니다.                               |
| Profiled Containers      | 당월 매 시간 기준으로 고유한 모든 프로파일링된 컨테이너의 평균을 보여줍니다.                                  |
| Custom Metrics           | 당월 매 시간 기준으로 고유한 [사용자 지정 메트릭][4]의 평균 개수를 보여줍니다.                               |
| Ingested Custom Metrics  | 당월 매 시간 기준으로 고유한 수집된 사용자 지정 메트릭의 평균 개수를 보여줍니다.                           |
| Ingested Logs            | 당월 매 시간 기준으로 수집된 모든 로그 바이트의 합계를 보여줍니다.                                                |
| Indexed Logs             | 당월 매 시간 기준으로 인덱싱된 모든 로그 이벤트의 합계를 보여줍니다.                                                |
| Scanned Logs             | 당월 매 시간 기준으로 Sensitive Data Scanner에 의해 스캔된 모든 로그 바이트의 합계를 보여줍니다.                       |
| Ingested Spans           | 당월 매 시간 기준으로 수집된 모든 스팬의 합계를 보여줍니다.                                                    |
| Indexed Spans            | 당월 매 시간 기준으로 인덱싱된 모든 스팬의 합계를 보여줍니다.                                             |
| Analyzed Logs (Security) | 당월 매 시간 기준으로 수집된 모든 분석된 로그 바이트의 합계를 보여줍니다.                                       |
| Serverless Functions     | 당월 매시간 1회 이상 실행된 함수 개수의 평균을 보여줍니다.              |
| Serverless Invocations   | 당월 매 시간 기준으로 전체 호출의 합계를 보여줍니다.                                                       |
| Fargate Tasks            | 당월 매 시간 기준으로 전체 Fargate 작업의 합계를 보여줍니다.                                                     |
| Network Hosts            | 당월 매 시간 기준으로 고유한 모든 네트워크 호스트의 99번째 백분위수를 보여줍니다.                                |
| Network Flows            | 당월 매 시간 기준으로 인덱싱된 전체 네트워크 흐름의 합계를 보여줍니다.                                             |
| Network Devices          | 당월 매 시간 기준으로 고유한 모든 네트워크 장치의 99번째 백분위수를 보여줍니다.                              |
| Synthetic API Tests      | 당월 매 시간 기준으로 전체 Synthetic API 테스트의 합계를 보여줍니다.                                               |
| Synthetic Browser Tests  | 당월 매 시간 기준으로 전체 Synthetic 브라우저 테스트의 합계를 보여줍니다.                                           |
| RUM Sessions             | 당월 매 시간 기준으로 고유한 모든 RUM 세션의 합계를 보여줍니다.                                             |
| Incident Management      | 선택된 달에 인시던트 수명 주기 및 타임라인과 상호 작용한 현재까지의 고유 활성 사용자 수를 보여줍니다.     |
| IoT Devices              | 당월 매 시간 기준으로 고유한 모든 IoT 장치의 99번째 백분위수를 보여줍니다.                                  |


## 사용량 추세 {#usage-trends}

[Usage Trends][5] 섹션에는 계정 내 모든 조직의 합산 사용량을 표시하는 제품 사용량 그래프가 포함되어 있습니다. 사용량 보고서는 {{< ui >}}Download as CSV{{< /ui >}} 버튼을 통해 다운로드할 수 있습니다. 각 조직에 대한 이러한 보고서에는 제품별 사용량의 시간별 분석이 포함되어 있습니다. 

{{< img src="account_management/billing/UsageTrendsOverviewAndCSV.png" alt="Download as CSV 옵션이 강조 표시되어 있는 Datadog 애플리케이션의 Usage Trends 그래프 페이지" style="width:100%; align:left" >}}

하위 유형이 있는 제품의 경우 각 범주가 해당 제품의 그래프에서 구분됩니다. 

{{< img src="account_management/billing/UsageGraphsByProductTab.png" alt="Infrastructure 탭이 선택되어 있고 사용량 요약과 인프라 호스트, Agent 호스트, Containers 등 인프라 사용량 하위 유형을 보여주는 여러 그래프" style="width:100%; align:left" >}}

더 자세한 제품 하위 유형 그래프는 각 제품 탭에서 확인할 수 있습니다. 예를 들어, Infrastructure 탭에서 호스트 유형별 분석을 확인할 수 있습니다.

{{< img src="account_management/billing/UsageBreakdownByProductSubtype.png" alt="Agent 호스트와 AWS 호스트가 포함된 Infra Hosts 그래프 및 Daily Indexed Live Logs와 Cumulative Indexed Live Logs가 표시된 Indexed Logs 그래프를 포함하는 Infrastructure 탭의 Usage Trends 섹션" style="width:100%; align:left" >}}
 
합계 기반 제품의 경우 시간에 따른 누적 사용량을 확인할 수 있습니다.

{{< img src="account_management/billing/CumulativeUsageLine.png" alt="Ingested Spans 및 Indexed Spans에 대한 그래프로, 각각 해당 스팬의 일일 합계 및 누적 합계 데이터를 플로팅합니다." style="width:100%; align:left" >}}

시간 선택에는 일별, 주별, 월별 또는 연별 간격으로 사용량 그래프를 볼 수 있는 옵션이 포함되어 있습니다.

{{< img src="account_management/billing/TimeGranularity.png" alt="사용량 그래프의 시간 간격" style="width:100%; align:left" >}}

## 청구 가능한 온디맨드 배지 및 약정 라인 {#billable-on-demand-pills-and-committed-lines}

<div class="alert alert-danger">이 기능은 베타 버전입니다. 액세스를 요청하고 조직이 기능 기준을 충족하는지 확인하려면 계정 담당자 또는 <a href="https://docs.datadoghq.com/help/">고객 지원팀</a>에 문의하세요.</div>

보라색 온디맨드 배지는 청구 가능한 사용량 중 온디맨드 사용량 부분을 강조 표시합니다. 파란색 약정 및 할당 배지는 약정 및 상위 제품의 <a href="https://www.datadoghq.com/pricing/allotments/">할당량</a>으로 처리되는 사용량 부분을 강조 표시합니다. 점선으로 표시된 `Committed` 줄은 할당량(Custom Metrics 또는 Containers 등) 없이 제품별 약정량을 보여줍니다.

카드에 약정 및 할당 배지를 표시하려면 {{< ui >}}See included usage{{< /ui >}} 토글이 켜져 있는지 확인하세요.
1. 약정 및 할당된 사용량 데이터를 확인하려는 총 사용량 카드에서 눈({{< ui >}}See included usage{{< /ui >}}) 아이콘을 클릭합니다.
1. 이 아이콘이 사선이 그어진 눈 모양으로 변경됩니다. 카드에 약정 및 할당량 배지가 표시됩니다.

{{< img src="account_management/billing/UsageTilesWithPillsUsageTrendsWithCommittedLine.png" alt="추세 그래프의 청구 가능한 온디맨드 사용량 배지와 약정 사용량 라인" style="width:100%; align:left" >}}


## 상위 사용자 지정 메트릭 {#top-custom-metrics}

Custom Metrics 탭의 Top Custom Metrics 표는 이번 달 누적 사용량과 마지막 업데이트 날짜의 사용량 등 가장 최근 일자의 사용량을 보여주는 2가지 보기를 제공합니다.

'Top 5000' 보기에는 상위 5,000개 사용자 지정 메트릭에 대한 다음 정보가 제공됩니다.
* 메트릭 이름
* 시간당 평균 사용자 지정 메트릭
* 시간당 최대 사용자 지정 메트릭
* 전체 사용자 지정 메트릭 사용량에서 해당 메트릭이 기여하는 비율
* 상위 5,000개 사용자 지정 메트릭 내에서 메트릭 검색
* 이 데이터는 CSV 파일로 다운로드할 수 있습니다.

'All' 보기에는 모든 사용자 지정 메트릭에 대한 다음 정보가 제공됩니다.
* 메트릭 이름
* 시간당 평균 사용자 지정 메트릭
* 시간당 최대 사용자 지정 메트릭
* 모든 사용자 지정 메트릭 내에서 메트릭 검색
* 이 데이터는 CSV 파일로 다운로드할 수 있으며, 최대 300,000개의 사용자 지정 메트릭이 포함됩니다. [API 엔드포인트][6]를 사용하여 300,000개가 넘는 사용자 지정 메트릭을 다운로드할 수 있습니다.


메트릭에 대한 자세한 내용을 보려면 해당 행 위로 마우스를 가져간 다음 오른쪽에 있는 미터 아이콘을 클릭하여 Metrics Catalog 페이지에서 메트릭을 여세요. 자세한 내용은 [Metrics Catalog 설명서][7]를 참조하세요.

{{< img src="account_management/billing/usage-metrics-05.png" alt="Top Custom Metrics 표 개요" >}}

## Logs Usage by Index {#logs-usage-by-index}

Log Management 탭의 이 표에는 인덱스 이름 및 보존 기간별로 시간당, 일별, 월별, 연간 인덱싱된 로그 사용량이 표시됩니다. 또한 실시간 로그와 [복원된 로그][8]의 사용량 내역도 표시됩니다. 다음 정보가 제공됩니다.

* 인덱스 이름
* 보존 기간(일)
* 인덱싱된 로그 수
* 선택한 기간 동안 전체 인덱싱된 로그 사용량에서 해당 인덱스가 차지하는 비율

이 데이터는 CSV 파일로 다운로드할 수 있습니다.

{{< img src="account_management/billing/usage-details-v3-03.png" alt="Logs Usage by Index" >}}

## 최초 사용 알림 {#first-time-usage-notifications}

<div class="alert alert-danger">이 기능은 베타 버전입니다. 액세스를 요청하고 조직이 기능 기준을 충족하는지 확인하려면 계정 담당자 또는 <a href="https://docs.datadoghq.com/help/">고객 지원팀</a>에 문의하세요.</div>

최초 사용 알림 기능은 현재 계약에 포함되지 않은 새 제품에 대해 최초로 청구 가능한 사용량이 발생할 때 이메일 알림을 보냅니다. 이메일은 특정 월에 사용량이 처음 발생한 후 약 48시간 뒤에 발송됩니다.

이 기능을 활성화하면 상위 조직의 {{< ui >}}Plan and Usage{{< /ui >}} 페이지에 {{< ui >}}Usage Notifications{{< /ui >}} 탭이 새로 추가됩니다. 이 탭에는 해당 기능이 적용되는 모든 제품 목록이 있습니다. 확인란의 선택을 해제하면 계정 내 모든 사용자에 대해 해당 제품의 알림이 중지됩니다. 가장 최근의 활성 계약 외에 최초 사용이 탐지되면 사용자는 선택 해제된 제품에 대한 알림을 받지 않습니다.

{{< img src="account_management/plan_and_usage/usage-notifications.png" alt="선택 및 선택 해제된 항목이 포함된 제품 목록이 있는 최초 사용 알림 페이지" style="width:100%; align:left" >}}

_Usage Notifications Read_ 또는 _Write_ 권한이 있는 모든 사용자가 이메일을 받습니다. 대부분의 조직에서 이는 모든 관리자를 의미합니다.

Datadog 계정이 다중 조직인 경우 권한이 있는 상위 조직 사용자가 하위 조직의 사용량에 대한 이메일 알림을 받습니다. 이 이메일에는 사용량이 발생한 하위 조직과 사용량이 발생한 제품이 표시됩니다. 이 권한이 있는 하위 조직 사용자는 자신의 조직에 대한 이메일만 받습니다.

{{< img src="account_management/plan_and_usage/usage-notifications-email.png" alt="최초 사용 예시의 상세 정보가 포함된 최초 사용 알림 이메일" style="width:100%; align:left" >}}

## 문제 해결 {#troubleshooting}

기술 관련 문의는 [Datadog 지원팀][9]에 문의하세요.

요금 청구 관련 문의는 [고객 성공][10] 관리자에게 문의하세요.


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://docs.datadoghq.com/ko/api/latest/usage-metering/#get-usage-across-your-multi-org-account
[3]: https://docs.datadoghq.com/ko/api/latest/usage-metering/#get-billable-usage-across-your-account
[4]: /ko/metrics/custom_metrics/
[5]: https://app.datadoghq.com/billing/usage
[6]: https://docs.datadoghq.com/ko/api/latest/usage-metering/#get-all-custom-metrics-by-hourly-average
[7]: /ko/metrics/catalog/#overview
[8]: https://docs.datadoghq.com/ko/logs/archives/rehydrating/?tab=awss3#overview
[9]: /ko/help/
[10]: mailto:success@datadoghq.com
[11]: /ko/account_management/plan_and_usage/bill_overview/