---
algolia:
  tags:
  - 사용량 속성
  - 비용 속성
aliases:
- /ko/account_management/billing/advanced_usage_reporting/
- /ko/account_management/billing/custom_usage_reporitng/
further_reading:
- link: /account_management/plan_and_usage/
  tag: 설명서
  text: 플랜 및 사용량 설정
title: 사용량 속성
---

## 개요

<div class="alert alert-danger">
사용량 속성은 Enterprise 요금제에 포함된 고급 기능입니다. 다른 모든 요금제의 경우 계정 담당자 또는 <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>에 문의하여 이 기능을 요청하세요.
</div>

사용량 읽기 권한이 있는 관리자 또는 사용자는 Datadog의 요금제 및 사용량 섹션에서 사용량 속성 탭에 액세스할 수 있습니다. 사용량 속성 페이지는 다음과 같은 정보와 기능을 제공합니다.

- 사용 중인 기존 태그 키를 나열하고 새 키(최대 3개의 태그 키)를 변경 및 추가할 수 있는 기능을 제공합니다.
- 매월 말 사용량을 요약하고 시간 경과에 따른 사용량을 태그로 구분하여 시각화합니다.
- 월별 및 시간별 CSV 파일을 생성합니다.

이 기능은 계측 에서 태그할 수 없는 제품 사용은 지원하지 않습니다. 예를 들어 인시던트 관리 사용자, CI 파이프라인 및 테스트 사용자, 병렬 테스트 슬롯 및 감사 추적 등이 있습니다. 

## 시작하기

관리자가 일일 데이터 수신을 시작하려면 태그를 선택하여 보고서를 작성해야 합니다.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Datadog에서 사용량 속성 시작하기" style="width:100%;" >}}

**태그 편집** 팝업창을 허용합니다.

- 드롭다운에서 최대 3개의 태그 키를 입력합니다. 드롭다운은 루트 계정과 계정 하위 조직 모두에 대해 기존 태그로 채워져 있습니다.
- 기존 태그를 삭제하고 편집합니다.

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="사용량 속성의 태그 편집" style="width:80%;" >}}

- 태그가 설정되면 첫 번째 보고서가 생성될 때까지 24시간이 소요됩니다.
- 보고서는 지속적으로 생성됩니다.
- 태그가 변경된 경우 새 보고서에는 새로운 태그가 반영되지만 이전 보고서에는 이전 태그가 유지됩니다.
- 월별 보고서는 태그의 최신 세트를 반영합니다. 태그가 월 중간에 변경된 경우 각 보고 기간에 대해 부분 월 보고서가 생성됩니다.

## 총 사용량

### 월별 사용량 속성

월간 보고서는 매일 업데이트되며 한 달간의 사용량 데이터를 집계하여 제공합니다.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Datadog에 적용된 태그" style="width:100%;" >}}

- 특정 제품, 태그, 조직에 대한 데이터는 패싯 선택기를 사용하여 선택할 수 있습니다.
- 선택한 태그를 설정 키로 데이터를 그룹화하거나 그룹화 해제할 수 있습니다.
- 테이블 표시에는 값 및 백분율 옵션을 사용할 수 있습니다. 
- 표에 표시된 데이터는 일부 제품을 포함하도록 편집할 수 있습니다. 
- 다중 조직을 사용하도록 설정하면 상위 계정의 모든 Datadog 조직에서 사용량이 요약됩니다.
- 이전 달의 보고서는 시간 선택기를 통해 액세스할 수 있습니다.
- 보고서는 CSV 형식으로 다운로드할 수 있습니다. 이러한 CSV 보고서에는 사용량 수와 백분율이 모두 포함되어 있어 할당 및 지불 거절을 간소화할 수 있습니다. 백분율은 조직별로 계산됩니다.

월별 데이터는 API 를 사용하여 가져올 수도 있습니다. 자세한 내용은 [API 엔드포인트 설명서][1]를 참조하세요.

### 시간별 사용량 속성

시간별 데이터는 API 을 사용하여 가져올 수 있습니다. 자세한 내용은 [API 엔드포인트 설명서][2]를 참조하세요.

### 데이터 해석하기

아래 표는 두 태그: `app` 및 `service` 인프라 사용량에 대한 일일 보고서 샘플을 보여줍니다.

| public_id | hour                | app          | service                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- `<empty>` 값은 리소스가 해당 태그로 태깅되었지만 값이 없음을 나타냅니다.
- 값이 없다는 것은 리소스에 해당 특정 태그를 설정하다 태그가 지정되지 않았음을 의미합니다.
- `|` (파이프)로 구분된 값(예: `service1 | service2`)은 특정 태그가 리소스에 여러 번 적용되었음을 의미합니다.
- 유효한 태그 값([태그 설명서 정의][3] 참조)은 해당 태그의 실제 값을 의미합니다.

#### 추가 데이터 분석

여러 개의 태그를 사용하는 경우 시간별 및 월별 사용량 속성 보고서에는 태그의 가능한 모든 조합에 대한 데이터가 포함되어 있으며 추가 데이터 분석 작업을 위한 기본 데이터 집합으로 사용하기에 적합합니다. 예를 들어 그룹화 또는 피벗을 사용하여 태그 의 하위 집합에 초점을 맞춘 보기를 생성하거나 커스텀 날짜 범위에 걸쳐 집계를 수행할 수 있습니다.

## 사용량 추적

"사용량 추적"을 클릭하면 사용량 속성 데이터의 시계열을 볼 수 있습니다.
- 패싯 선택기를 사용하여 특정 제품, 조직 또는 태그 키에 대한 데이터를 선택할 수 있습니다.
- 그래프 위에 있는 시간 선택기를 사용하여 일, 주 또는 월 단위로 데이터를 그래프로 표시할 수 있습니다.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Hourly-Facets.png" alt="태그로 구분된 인프라 호스트 그래프" style="width:100%;" >}}


## 비용 속성

직접 빌링 고객의 경우, 월별 지불 거절 및 비용 할당 절차를 활성화하기 위해 각 빌링 주기 마지막에 월간 누계 비용 속성 보고서가 생성됩니다.
- 전월의 비용 데이터는 늦어도 당월 19일까지 사용할 수 있습니다.
- 비용 귀속 데이터는 현재 GovCloud 데이터 센터에서 사용할 수 없습니다.
- 월간 비용 속성 데이터는 [API][4]에서 확인할 수 있습니다.

{{< img src="account_management/billing/usage_attribution/Cost-Attribution-Monthly.png" alt="비용 속성 보고서" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/ko/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/ko/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/ko/api/latest/usage-metering/#get-monthly-cost-attribution