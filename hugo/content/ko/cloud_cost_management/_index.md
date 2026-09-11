---
aliases:
- /ko/infrastructure/cloud_cost_management
- /ko/integrations/cloudability
cascade:
  algolia:
    rank: 70
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - cloud cost management
    - cloud cost aws
    - cloud cost azure
    - cloud cost google cloud
    - cloud cost gcp
    - data collected aws
    - data collected azure
    - data collected google cloud
further_reading:
- link: /monitors/types/cloud_cost/
  tag: 설명서
  text: Cloud Cost 모니터 생성
- link: /cloud_cost_management/tags/
  tag: 설명서
  text: Cloud Cost Management의 Tags에 대해 알아보기
- link: /cloud_cost_management/cloud_cost_skill/
  tag: 설명서
  text: Bits AI Assistant에서 Cloud Cost 스킬 사용
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: 블로그
  text: Datadog Cloud Cost Management로 클라우드 비용에 대한 가시성과 제어 확보
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: 블로그
  text: 'AI ROI 향상: Datadog이 비용, 성능 및 인프라를 연결하여 책임 있는 확장을 지원하는 방법'
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: 블로그
  text: Datadog Cloud Cost Management로 Kubernetes 및 ECS 비용 이해하기
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: 블로그
  text: Datadog을 통해 엔지니어가 Google Cloud 비용을 직접 관리하도록 지원하기
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: 블로그
  text: 서비스 뒤에 숨은 클라우드 및 SaaS 비용을 빠르고 종합적으로 분석하기
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: 블로그
  text: State of Cloud Costs 연구에서 얻은 주요 인사이트
- link: https://www.datadoghq.com/blog/unit-economics-ccm/
  tag: 블로그
  text: Datadog Cloud Cost Management로 단위 경제성 모니터링하기
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: 블로그
  text: Datadog에서 성공적인 FinOps 사례를 구축한 방법
- link: https://www.datadoghq.com/blog/cloud-cost-management-saved-millions/
  tag: 블로그
  text: Cloud Cost Management로 연간 150만 달러를 절감한 방법
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci/
  tag: 블로그
  text: Datadog Cloud Cost Management로 OCI 비용 관리 및 최적화하기
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: 블로그
  text: Cambia Health Solutions가 Cloud Cost Management와 Datadog Resource Catalog를
    사용하여 월 $30,000를 절감한 방법
title: Cloud Cost Management
---
{{< learning-center-callout header="교육 웨비나 세션에 참가하기" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
  클라우드 공급자 비용을 탐색하고 이를 실시간 텔레메트리 데이터와 연관 분석합니다. 클라우드 비용이 어디에서 발생하는지, 어떻게 변화하고 있는지, 그리고 최적화할 수 있는 영역이 어디인지에 대한 실행 가능한 인사이트와 알림을 제공합니다.
{{< /learning-center-callout >}}

## 개요 {#overview}

Cloud Cost Management는 엔지니어링 팀과 재무 팀이 인프라 변경이 비용에 미치는 영향을 이해하고, 조직 전체에 비용을 배분하며, 비효율성을 식별할 수 있도록 지원합니다.

{{< img src="cloud_cost/summary.png" alt="Datadog의 Cloud Costs Summary 페이지에서 클라우드 공급자의 전체 비용 및 사용량에 대한 인사이트를 확인할 수 있습니다." style="width:100%;" >}}

Datadog은 클라우드 비용 데이터를 수집하여 [**Explorer** 페이지][1]의 검색 쿼리에서 사용할 수 있는 메트릭으로 변환합니다. 비용이 증가한 경우 사용량 메트릭과 연관 분석하여 근본 원인을 파악할 수 있습니다.

## 설정 {#setup}

{{< whatsnext desc="Cloud Cost Management로 클라우드 비용 관리를 시작하려면 다음 설명서를 참조하세요.">}}
  {{< nextlink href="/cloud_cost_management/setup/aws">}}<u>AWS</u>: AWS 청구서에 대해 Cloud Cost Management를 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/azure">}}<u>Azure</u>: Azure 청구서에 대해 Cloud Cost Management를 구성합니다. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/google_cloud">}}<u>Google Cloud</u>: Google Cloud 청구서에 대해 Cloud Cost Management를 구성합니다. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/oracle">}}<u>Oracle</u>: Oracle 청구서에 대해 Cloud Cost Management를 구성합니다. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/saas_costs">}}<u>SaaS Cost Integrations</u>: 지원되는 SaaS 비용 공급자의 비용 데이터를 Datadog으로 전송합니다. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/custom">}}<u>Custom Costs</u>: 모든 비용 데이터 소스를 Datadog에 업로드합니다. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Datadog Costs</u>: 일일 Datadog 지출 및 사용률 메트릭을 시각화합니다. {{< /nextlink >}}
 {{< /whatsnext >}}

## 클라우드 비용 데이터 사용 {#use-cloud-cost-data}

15개월의 보존 기간 동안 인프라 비용을 관련 사용률 메트릭과 함께 시각화하여 잠재적인 비효율성과 비용 절감 기회를 파악할 수 있습니다.

대시보드를 생성할 때 검색 쿼리의 데이터 소스로 {{< ui >}}Cloud Cost{{< /ui >}}를 선택합니다.

{{< img src="cloud_cost/cloud_cost_data_source-1.png" alt="대시보드 위젯 생성 시 데이터 소스로 선택 가능한 Cloud Cost" style="width:80%;" >}}

선택적으로 [Metrics API][2]를 사용하여 클라우드 비용 데이터의 시계열 그래프를 프로그래밍 방식으로 내보낼 수 있습니다.

## 일일 Datadog 비용 데이터 사용 {#use-daily-datadog-cost-data}

15개월의 보존 기간 동안 일일 Datadog 지출을 관련 사용률 메트릭과 함께 시각화하여 잠재적인 비효율성과 비용 절감 기회를 파악할 수 있습니다. 자세한 내용은 [Datadog Costs][8]를 참조하세요.

대시보드를 생성할 때 데이터 소스로 {{< ui >}}Cloud Cost{{< /ui >}}를 선택한 후 사용 가능한 비용 유형에서 {{< ui >}}Datadog{{< /ui >}}를 선택합니다.

{{< img src="cloud_cost/datadog_costs/dashboard-updated.png" alt="대시보드의 Cloud Cost 데이터 소스에서 선택 가능한 Datadog Costs" style="width:80%;" >}}

선택적으로 [Metrics API][2]를 사용하여 Datadog 비용 데이터의 시계열 그래프를 프로그래밍 방식으로 내보낼 수 있습니다.

## 태깅 및 비용 할당 {#tagging-and-cost-allocation}

[Tags 설명서][5]를 통해 Cloud Cost Management에서 태그가 수집, 보강 및 관리되는 방법을 알아보세요.

누락되거나 잘못된 태그를 수정하기 위한 태그 규칙을 생성하고, 조직의 비즈니스 로직에 맞는 추론 태그를 추가할 수 있습니다.

## 비용 모니터 생성 {#create-a-cost-monitor}

[Cloud Cost Monitor][3]를 생성하여 클라우드 지출을 사전에 관리하고 최적화할 수 있습니다. 클라우드 비용을 모니터링하기 위해 {{< ui >}}Cost Changes{{< /ui >}} 또는 {{< ui >}}Cost Threshold{{< /ui >}}를 선택할 수 있습니다.

{{< img src="cloud_cost/monitor.png" alt="비용 변화에 대해 알림을 보내는 Cloud Cost Monitor 생성" style="width:100%;" >}}

## 비용 할당 {#allocate-costs}

[Container Cost Allocation 메트릭][4]을 사용하여 Kubernetes, Amazon ECS, Azure 및 Google Cloud 전반의 클러스터 및 워크로드와 관련된 비용을 파악할 수 있습니다. 포드 수준의 비용을 확인하고, 유휴 리소스 비용을 식별하며, 리소스 유형별 비용을 분석할 수 있습니다.

## 권한 {#permissions}

Cloud Cost Management는 비용 데이터와 대부분의 CCM 구성에 대한 액세스를 제어하기 위해 다음 권한을 사용합니다.
- `cloud_cost_management_read`
- `cloud_cost_management_write`

페이지별 요구 사항에 대한 자세한 내용은 [권한][9]을 참조하세요.

## 데이터 이력 검토 {#review-data-history}

{{< img src="cloud_cost/ccm-data-history.png" alt="Cloud Cost 설정에서 Cloud Cost 데이터 이력을 확인할 수 있습니다." style="width:100%;" >}}

{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Data History{{< /ui >}} 페이지에서 클라우드 비용 데이터의 최신 상태 및 처리 상태를 모니터링합니다.

- {{< ui >}}Last Bill Received{{< /ui >}}: CCM에 표시되는 청구 데이터를 클라우드 또는 SaaS 공급자가 생성한 시점입니다.
- {{< ui >}}Last Processed{{< /ui >}}: Datadog이 클라우드 공급자의 청구 데이터를 마지막으로 처리한 시점입니다. 여기에는 다음이 포함됩니다.
  - 태그 파이프라인 규칙(기본적으로 최대 3개월의 과거 데이터를 소급 처리)
  - 비용 할당 규칙(기본적으로 최대 1개월의 과거 데이터를 소급 처리)

이 페이지를 사용하여 데이터 지연 문제를 해결하거나 최근 태그 파이프라인 및 비용 할당 변경 사항이 적용되었는지 확인할 수 있습니다.

## AI를 활용한 비용 분석 {#use-ai-for-cost-analysis}

[Bits AI Assistant의 Cloud Cost Skill][10]을 사용하여 비용 변동을 조사하고, 비용의 책임자를 식별하며, 예산 대비 지출을 비교하고, 비용과 관측성 메트릭을 연관 분석하며, 엔지니어링 팀을 위한 인계용 노트북을 생성할 수 있습니다.

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="초기 분석 결과를 보여주는 Bits AI Assistant 조사 요약" style="width:60%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/explorer
[2]: /ko/api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /ko/monitors/types/cloud_cost/
[4]: /ko/cloud_cost_management/container_cost_allocation
[5]: /ko/cloud_cost_management/tags/
[6]: /ko/account_management/rbac/data_access/
[7]: https://www.datadoghq.com/product-preview/data-access-control/
[8]: /ko/cloud_cost_management/datadog_costs
[9]: /ko/cloud_cost_management/setup/permissions
[10]: /ko/cloud_cost_management/cloud_cost_skill/