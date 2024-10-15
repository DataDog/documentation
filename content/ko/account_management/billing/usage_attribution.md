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

<div class="alert alert-warning">
사용량 속성은 엔터프라이즈 플랜에 포함된 고급 기능입니다. 다른 플랜의 경우 계정 담당자에게 연락하거나 <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>에 연락하여 이 기능을 요청하세요. 
</div>

관리자는 Datadog 플랜 및 사용량 섹션에서 사용량 속성 탭에 액세스할 수 있습니다. 사용량 속성 페이지는 다음 정보와 기능을 제공합니다.

- 사용량 세분화 기준이 되는 기존 태그 키를 나열하고 태그 키를 변경하고 새로운 키를 추가(최대 3개)할 수 있는 기능을 제공합니다.
- 대부분의 사용량 유형에 대해 일일 탭으로 구분된 값(TSV) 파일을 생성합니다.
- 매달 말에 사용량을 요약합니다.
- UI와 TSV 다운로드로 데이터를 확인할 수 있습니다.

이 기능은 계측 동안 태그되지 않은 제품 사용량을 지원하지 않습니다. 예를 들어 인시던트 관리 사용자 및 병렬 테스팅 슬롯은 지원되지 않습니다.

## 시작하기

일일 데이터 수신을 시작하려면 관리자가 사용자 인터페이스를 사용해 새로운 보고서를 생성해야 합니다.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Datadog에서 사용량 속성 시작하기" style="width:100%;" >}}

**적용된 태그** 섹션은 다음을 활성화합니다.

- 드롭다운에서 최대 3개의 태그 키를 입력합니다. 드롭다운은 루트 계정과 계정 내 모든 하위 조직에서 기존 태그로 채워져 있습니다.
- 기존 태그를 삭제하고 편집합니다.

{{< img src="account_management/billing/advanced-usage-reporting-02.png" alt="Datadog에 적용된 태그" style="width:80%;" >}}

- 태그가 구성되면 첫 번째 보고서가 생성될 때까지 24시간이 걸립니다.
- 보고서는 정기적으로 생성됩니다.
- 태그가 변경되면 새로운 보고서는 새 태그를 반영합니다. 하지만 이전 보고서는 기존 태그를 유지합니다.
- 월간 보고서는 최신 태그 세트를 반영합니다. 월 중간에 태그를 변경하면 사용량 비율이 일치하지 않을 수 있습니다.

## 총 사용량

### 월간 사용량 속성

보고서가 생성되면 매일 업데이트되고 매월 이 표에 집계됩니다.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-v2-Total-Usage.png" alt="Datadog에 적용된 태그" style="width:100%;" >}}

- 데이터는 선택된 모든 태그 키로 표시됩니다. 예: 앱 및 서비스별로 표시됩니다.
- 데이터는 왼쪽 드롭다운에서 쿼리하여 특정 조직 또는 태그 키별로 표시할 수 있습니다.
- 표로 볼 때 값 및 비율 옵션을 선택할 수 있습니다.
- 표에 표시된 데이터를 수정하여 일부 제품을 포함할 수 있습니다.

{{< img src="account_management/billing/usage_attribution/usage-attribution-options.png" alt="사용량 속성 옵션 드롭다운 메뉴" style="width:100%;" >}}

- 다수-조직이 활성화된 경우 모계정에 있는 모든 Datadog 조직에 대한 사용량이 요약 표시됩니다.
- 이전 달의 보고서는 시간 선택기를 통해 액세스할 수 있습니다.
- 달이 끝날 때까지 월간 보고서가 생성되지 않습니다. 매 월간 보고서는 다음 달 두 번째 날부터 표시됩니다.
- 보고서는 사용량 수치와 비율을 포함해 TSV 형식으로 다운로드할 수 있으므로 할당과 지급 취소를 간단히 수행할 수 있습니다. 비율은 조직별로 계산됩니다.

월간 데이터는 도구의 공용 API를 통해 수집됩니다. 자세한 정보는 [API 엔드포인트 설명서][1]를 참조하세요.

### 시간당 사용량 속성

시간별 데이터는 도구의 공용 API를 통해 수집할 수 있습니다. 자세한 정보는 [API 엔드포인트 설명서][2]를 참조하세요.

### 데이터 해석

아래 표는 두 가지 태그 `app` 및`service`별로 인프라 사용량을 구분한 샘플 일일 보고서입니다.

| public_id | hour                | app          | service                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- `<empty>` 값은 리소스가 해당 태그로 태그되었지만 값이 없음을 의미합니다.
- 값이 없는 경우 리소스가 해당 특정 태그로 태그되지 않았음을 의미합니다.
- `|`(파이프) 구분 값(예: `service1 | service2`)는 특정 태그가 리소스에 여러 번 적용되었음을 의미합니다.
- 유효한 태그 값([태그 정의 설명서][3] 참조)은 해당 태그의 실제 값을 의미합니다.

#### 추가 데이터 분석

여러 태그를 사용하는 경우, 시간별 사용량 속성 및 월간 사용량 속성 보고서는 해당 태그의 가능한 모든 조합에 대한 데이터를 포함합니다. 그러므로 추가 데이터 분석을 위한 기본 데이터세트로 사용하기에 적합합니다. 예를 들어 태그 하위 집합에 집중한 보기를 만들거나 커스텀 날짜 범위에 대한 집계를 수행하기 위해 그룹화 또는 피봇할 때 사용할 수 있습니다.

## 사용량 추적

- **사용량 속성 트렌드** 아래 검색 쿼리를 편집하여 데이터는 특정 제품, 조직, 태그 키별로 표시할 수 있습니다.
- 데이터는 일일, 주별 또는 월별 수준에서 표시될 수 있습니다.

{{< img src="account_management/billing/usage_attribution/graph-by-tags.png" alt="태그로 구분된 인프라 호스트 그래프" style="width:100%;" >}}

### 데이터 해석

각 제품에 대해 그래프는 태그별로 표시됩니다.

{{< img src="account_management/billing/usage_attribution/multiple-graphs-by-tags.png" alt="태그별로 구분된 인프라 호스트와 커스텀 메트릭 그래프" style="width:100%;" >}}

각 색상 블록은 각 태그에 대한 고유한 태그 값을 나타냅니다.

{{< img src="account_management/billing/usage_attribution/histogram-graph-tag.png" alt="인프라 호스트 그래프에서 기둥 상세 내용" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/ko/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/ko/getting_started/tagging/#define-tags