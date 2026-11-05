---
description: 유연한 필터와 시각화 도구를 사용하여 실시간으로 클라우드 비용을 쿼리하고 분석하세요.
further_reading:
- link: /cloud_cost_management/reporting/
  tag: 설명서
  text: 비용 보고서 생성 및 저장
- link: /cloud_cost_management/tags/multisource_querying
  tag: 설명서
  text: 여러 공급자의 비용 쿼리
- link: /monitors/types/cloud_cost/
  tag: 설명서
  text: 비용 모니터 생성
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management에 대해 알아보기
title: Cost Explorer
---
## 개요 {#overview}

[Cloud Cost Explorer][1]는 [AWS][2], [Azure][3], [Google Cloud][4], [Oracle][5], [SaaS 공급자][6] 및 [Datadog 비용][7] 전반에 걸쳐 클라우드 지출을 분석하기 위한 대화형 쿼리 기반 인터페이스를 제공합니다. 저장된 보고서와 달리 Explorer에서는 유연한 쿼리, 필터 및 시각화 도구를 통해 임시 분석을 수행하여 비용 추세를 조사하고, 이상 징후를 식별하며, 클라우드 지출에 대한 구체적인 질문에 답할 수 있습니다.

Cloud Cost Explorer를 사용하여 다음을 수행할 수 있습니다.
- 태그, 서비스 및 필터를 사용하여 여러 공급자에 걸친 사용자 지정 쿼리를 작성합니다.
- 유연한 그룹화 및 분석을 통해 시간 경과에 따른 비용 변화를 조사합니다.
- 데이터를 다운로드하고, 대시보드 위젯을 생성하거나, 비용 모니터를 설정합니다.

## 비용 데이터 쿼리 {#query-your-cost-data}

1. Datadog에서 [**Cloud Cost > Analyze > Explorer**][1]로 이동합니다.
2. 쿼리 편집기나 드롭다운 필터를 사용하여 검색 쿼리를 작성합니다.
   - {{< ui >}}Provider{{< /ui >}} 드롭다운을 사용하여 하나 이상의 클라우드 공급자를 선택합니다.
   - {{< ui >}}\+ Filter{{< /ui >}}를 클릭하여 서비스, 태그, 리전, 팀 및 기타 속성에 대한 필터를 추가합니다.
   - 더 복잡한 쿼리를 수행하려면 검색창에 직접 입력합니다.

   {{< img src="cloud_cost/reporting/reporting-overview-1.png" alt="공급자 선택, 비용 유형 필터, 태그 검색, 서비스 필터 및 그룹화 옵션을 보여주는 Cloud Cost Explorer 쿼리 빌더" style="width:100%;" >}}

3. {{< ui >}}Group by{{< /ui >}}을(를) 클릭한 후 다음과 같은 차원을 선택하여 비용 데이터를 그룹화합니다.
   - 공급자 이름
   - 서비스 이름
   - 리소스 태그(`team`, `env`, `project` 등)
   - 리전
   - 계정 ID

4. 시간 선택 도구를 사용하여 시간 범위를 선택하고 다양한 기간(시간, 일, 주, 월 또는 사용자 지정 범위)에 걸친 비용을 분석합니다.

**참고**: 여러 공급자 간의 비용을 쿼리할 때는 리소스 수준 태그를 사용할 수 없습니다. 리소스별 태그에 액세스하려면 쿼리에서 단일 공급자로 필터링하세요.

## 비용 변경 요약 사이드 패널 {#cost-change-summary-side-panel}

Explorer 하단 표에서 아무 행이나 클릭하여 해당 공급자, 서비스 또는 리소스의 {{< ui >}}Cost Change Summary panel{{< /ui >}}을 엽니다. 이 패널은 이전 기간 대비 현재 기간의 비용 변화를 유발할 수 있는 요인과 관련 대상을 강조 표시합니다.

패널은 다음 네 가지 일반 섹션으로 구성됩니다.
- 비용 변경 요약
- 관련 팀
- 변경 세부 정보
- 추가 조사

{{< img src="cloud_cost/reporting/cost-change-sidepanel.png" alt="비용 변경 요약 패널은 이전 기간 대비 현재 기간의 비용 변화를 유발할 수 있는 요인과 관련 대상을 강조 표시합니다." style="width:100%;" >}}

상단에서 현재 기간의 **총 비용**과 이전 기간 대비 비용 변경 금액 및 비율(**발생한 일**)을 확인할 수 있습니다. 

### 변경 사항 조사 {#investigate-the-change}

{{< ui >}}Change Details{{< /ui >}} 및 {{< ui >}}Investigate Further{{< /ui >}} 섹션을 사용하여 다음을 수행할 수 있습니다.

- **비용 이상 징후 즉시 식별**: 과거 데이터를 기준으로 계산된 예상치 못한 비용 편차가 자동으로 빨간색으로 강조 표시되므로 중요한 추세에 집중하여 조사할 수 있습니다.  
     
- **변경 동인 분석**: **사용량**(리소스 수) 변경 또는 **단가**(리소스당 비용) 변경 중 무엇이 비용 변경을 유발했는지 쉽게 파악할 수 있습니다. 예를 들어, 아래 스크린샷에서 지출 변화는 사용량이 아닌 단가 변화에 의해 발생합니다. 리소스 수는 일정하게 유지되지만 리소스당 비용이 오르내리면서 전체 비용 변화가 발생합니다.

{{< img src="cloud_cost/reporting/cloud-cost-spend-summary.png" alt="지출 변화는 사용량이 아닌 단가 변화에 의해 발생합니다. 리소스 수는 일정하게 유지되지만 리소스당 비용이 오르내리면서 전체 비용 변화가 발생합니다." style="width:100%;" >}}

### 협업 및 모니터링 {#collaborate-and-monitor}

- **담당 팀에 문의**:
  - {{< ui >}}Associated Team(s){{< /ui >}} 섹션을 검토하여 비용 변화를 유발하는 리소스를 소유한 팀을 식별합니다(`team:shopist`와 같은 태그를 기반으로 추론). 나열된 팀(예: Shopist, Platform, Cloud-Networks)에 후속 문의하여 변경 사항의 전체 맥락을 파악합니다.
  - {{< ui >}}Send Notebook{{< /ui >}}을 클릭하여 전체 비용 조사 맥락을 팀과 직접 공유하고, 팀이 조사 결과를 기록하며, 주석을 추가하고, 조사 스레드를 추적할 수 있도록 합니다.

- **태그로 필터링**:
  - {{< ui >}}Associated Tags{{< /ui >}}를 사용하여 비용 항목에 영향을 미치는 모든 태그를 확인합니다.
  - 태그 값(예: `account:demo` 또는 특정 `aws_account`)을 클릭하여 검색을 구체화하고 전체 Explorer를 필터링하여 해당 태그가 있는 리소스만 표시합니다.

- **모니터 생성**:
  - 유사한 변경 사항이 다음에 발생할 때 알림을 받도록 Cloud Cost Monitor를 설정합니다. [Cloud Cost Monitors][8]에 대해 자세히 알아보세요.

## 결과 구체화 {#refine-your-results}

{{< ui >}}Refine Results{{< /ui >}}를 클릭하여 특정 비용 패턴에 집중할 수 있도록 돕는 고급 필터링 옵션에 액세스합니다.

   {{< img src="cloud_cost/reporting/refine-results.png" alt="결과 구체화 패널에는 사용 요금만, 완료된 일자만, 총 비용, 달러 변화, 백분율 변화를 포함한 필터링 옵션이 표시됩니다." style="width:100%;" >}}

{{< ui >}}Complete Days Only{{< /ui >}}
: 데이터가 불완전할 수 있는 지난 2일간의 비용 데이터를 제외합니다. 정확한 과거 분석을 위해 이 옵션을 사용합니다.

{{< ui >}}Total Cost{{< /ui >}}
: 데이터를 필터링하여 특정 달러 범위 내의 비용을 조회합니다(예: 비용이 $1,000를 초과하는 리소스만 표시).

{{< ui >}}Dollar Change{{< /ui >}}
: 지정된 달러 변화 범위 내의 비용 변화만 표시합니다(예: $500 이상 증가한 서비스만 표시).

{{< ui >}}Percent Change{{< /ui >}}
: 지정된 백분율 범위 내의 비용 변경 사항만 표시합니다(예: 비용이 20% 이상 증가한 리소스만 표시).

## 데이터 보기 변경 {#change-data-views}

Cost Explorer는 비용 데이터를 시계열 그래프와 세부 내역 표로 표시합니다. 다음 보기 중 하나를 선택하여 그래프에 데이터가 표시되는 방식을 변경할 수 있습니다.

- {{< ui >}}Costs ($){{< /ui >}}: 시간 경과에 따른 총 비용을 달러 단위로 조회합니다.
- {{< ui >}}Change trends (%){{< /ui >}}: 비용 변경 사항을 백분율 증가 또는 감소로 조회합니다.
- {{< ui >}}Change trends ($){{< /ui >}}: 비용 변경 사항을 달러 금액으로 조회합니다.

{{< img src="cloud_cost/reporting/change-view.png" alt="$ 단위 비용, % 단위 변경 추세, $ 단위 변경 추세의 세 가지 보기 옵션을 보여주는 드롭다운 메뉴" style="width:100%;" >}}

이 보기 간에 전환하여 절대 비용을 추적하고 있는지 또는 비용 변동을 조사하고 있는지 파악할 수 있습니다.

### 표 표시 옵션 {#table-display-options}

그래프 아래의 표에는 선택한 그룹화(공급자, 서비스 이름 또는 태그 등)별로 세분화된 비용이 표시됩니다. 이 데이터가 표시되는 방식을 사용자 지정할 수 있습니다.

{{< img src="cloud_cost/reporting/table-display-options.png" alt="요약 및 세부 정보 보기 모드, 열 표시 여부 토글, 상위 변경 사항만 필터가 포함된 표 표시 옵션" style="width:100%;" >}}

**보기 모드**
- {{< ui >}}Summary{{< /ui >}}: 전체 기간에 걸친 총 비용을 조회하여 개괄적으로 파악합니다.
- {{< ui >}}Breakdown{{< /ui >}}: 선택한 기간에 따라 일별, 주별 또는 월별로 세분화된 비용을 확인합니다.

**필터**
- {{< ui >}}Top changes only{{< /ui >}}: 이 확인란을 선택하여 테이블을 필터링하고 비용 증가 또는 감소 폭이 가장 큰 리소스나 서비스만 표시합니다.

**열 표시 여부**

중요한 메트릭에 집중할 수 있도록 표의 열을 표시하거나 숨길 수 있습니다.
- {{< ui >}}Total{{< /ui >}}: 각 리소스 또는 서비스에 대한 총 집계 비용
- {{< ui >}}Dollar change trends{{< /ui >}}: 시간 경과에 따른 달러 금액 기준 비용 변화
- {{< ui >}}Change trends{{< /ui >}}: 시간 경과에 따른 백분율 기준 비용 변화

## 내보내기 및 공유 {#export-and-share}

Explorer에서 비용을 분석한 후 다음을 수행할 수 있습니다.

### CSV로 내보내기 {#export-to-csv}
오프라인 분석, 보고 또는 이해관계자와 공유하기 위해 비용 데이터를 다운로드합니다. {{< ui >}}Export{{< /ui >}} 버튼을 클릭하고 {{< ui >}}Download as CSV{{< /ui >}}를 선택합니다.

### 대시보드 위젯 생성 {#create-a-dashboard-widget}
현재 쿼리를 대시보드 위젯으로 저장하여 다른 메트릭과 함께 비용을 모니터링합니다.
1. {{< ui >}}Export{{< /ui >}}를 클릭하고 {{< ui >}}Export to Dashboard{{< /ui >}}를 선택합니다.
2. 기존 대시보드를 선택하거나 새로 생성합니다.
3. 위젯 제목과 설정을 사용자 지정합니다.

### 비용 모니터 생성 {#create-a-cost-monitor}
현재 쿼리를 기반으로 경보를 설정하여 비용이 임계값을 초과하거나 예기치 않게 변경될 때 알림을 받습니다.
1. {{< ui >}}Export{{< /ui >}}를 클릭하고 {{< ui >}}Create Monitor{{< /ui >}}를 선택합니다.
2. 경보 조건(예: 비용이 $10,000를 초과하거나 20% 증가하는 경우)을 구성합니다.
3. 알림 채널(이메일, Slack, PagerDuty)을 설정합니다.

[Cloud Cost Monitors][8]에 대해 자세히 알아보세요.

### 쿼리 공유 {#share-your-query}
브라우저에서 URL을 복사하여 현재 비용 쿼리를 팀원들과 공유합니다. 해당 URL에는 모든 필터, 그룹화 및 시간 범위 설정이 포함되어 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/explorer
[2]: /ko/cloud_cost_management/aws/
[3]: /ko/cloud_cost_management/azure/
[4]: /ko/cloud_cost_management/google_cloud/
[5]: /ko/cloud_cost_management/oracle/
[6]: /ko/cloud_cost_management/saas_costs/
[7]: /ko/cloud_cost_management/datadog_costs/
[8]: /ko/monitors/types/cloud_cost/
[9]: /ko/cloud_cost_management/reporting/