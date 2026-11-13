---
title: 제품 할당
---
할당량은 특정 상위 제품 구독에 포함된 추가 사용량을 제공합니다. 이는 계정의 상위 제품에 대한 약정 및 온디맨드 사용량의 일부로서 하위 제품에 대한 특정 사용량을 부여합니다.

이러한 구조를 가진 제품의 예로는 인프라 호스트와 Containers가 있으며, 모든 호스트에는 Containers 할당량이 함께 제공됩니다.

## 청구 계산 내 할당량 {#allotments-within-billing-calculations}

발생한 총 사용량은 청구 가능 사용량과 청구 불가 사용량으로 분류됩니다. 청구 가능 사용량은 계정에 요금을 청구할 수 있는 사용량이며, 청구 불가 사용량은 요금이 청구되지 않습니다. 청구 불가 사용량에는 체험판 사용량이 포함될 수 있습니다.

청구 가능 사용량에 대해 청구서를 발행하려면 먼저 기본 제공 사용량이 차감됩니다. 할당량은 기본 제공 사용량에 반영되며, 이는 청구 가능 사용량에서 온디맨드 사용량을 계산하는 데 사용됩니다.

- `allotments + committed usage = included usage`
- `billable usage - included usage = on-demand usage`

예를 들어, 계정의 수집된 스팬 총 사용량이 150GB일 수 있습니다. 이 중 140GB가 청구 가능 사용량입니다. 50GB의 사전 약정과 30GB의 할당량이 있는 경우, 이 80GB의 사용량은 기본 제공 사용량으로 분류되어 140GB의 청구 가능 사용량에서 차감됩니다. 나머지 60GB의 사용량은 온디맨드 사용량으로 분류됩니다.

- 총 사용량 및 청구 가능 사용량을 보려면 Datadog의 [**Plan and Usage** 페이지][2]에서 {{< ui >}}All{{< /ui >}} 및 {{< ui >}}Billable{{< /ui >}} 탭을 확인하세요. 
- 약정을 확인하려면 계약서를 참조하세요.

## 기본 제공 사용량 계산 {#calculating-included-usage}
총 기본 제공 사용량은 **제품에 대한 약정과 상위 제품별 할당량의 합계**로 구성됩니다. 약정 수량은 사용자 계약서를 참조하세요. 다음 변수는 할당 사용량이 계산되는 방식을 결정합니다.

- 온디맨드 옵션
- 상위 제품별 할당량
- 사용량 집계 함수

### 온디맨드 옵션 {#on-demand-option}

제품의 할당 사용량은 조직의 온디맨드 측정 옵션에 따라 계산될 수 있습니다. 조직은 **월별 또는 시간별** 온디맨드 옵션을 선택할 수 있습니다. 측정 옵션에 대한 정보는 계약서를 참조하세요. 

기본적으로 온디맨드 옵션은 구독 수준에서 설정되며, 단일 기본 온디맨드 옵션을 지원하는 다음을 제외한 모든 제품에 적용됩니다. 

| 제품                                         | 기본 옵션 |
|-------------------------------------------------|----------------|
| Containers (Infrastructure, Profiled, Security) | 시간별         |
| Incident Management                             | 월별        |
| APM Fargate 제품                            | 월별        |
| Serverless APM                                  | 월별        |
| Logs 제품                                   | 월별        |
| SNMP Traps                                      | 월별        |

시간당 측정의 경우, 월간 할당이 시간당 할당으로 조정됩니다. 예를 들어, APM 스팬과 같이 합산되는 제품의 경우 월간 할당량을 연 단위로 환산한 후 1년의 시간 수로 나누어 시간당 할당량을 구합니다. 사용자 지정 메트릭과 같이 평균을 구하는 제품의 경우, 월간 총 사용량이 해당 월의 모든 시간에 걸친 청구 가능 사용량의 평균이므로 온디맨드 옵션에 관계없이 월간 할당량이 동일하게 유지됩니다.

## 상위 제품별 할당량 {#allotments-by-parent-products}

상위 제품별 기본 할당량이 나와 있는 전체 목록은 [Allotments Calculator][3] 페이지의 할당량 표를 참조하세요. 사용자 지정 또는 기타 기본값이 아닌 할당량에 대한 자세한 내용은 계약서를 검토하세요.

조직의 상위 제품에 대한 청구 가능 사용량이 약정량을 초과하면 온디맨드 상위 제품 사용량에서 추가 할당량을 받게 되며 상위 제품에 대해서만 청구됩니다. 해당 추가 할당량이 소진된 후 하위 제품의 추가 사용량은 온디맨드 요율로 청구될 수 있습니다. 어떤 온디맨드 옵션을 선택하든 할당량은 일반적으로 후속 시간으로 이월되지 않습니다. 조직의 시간별 또는 월별 측정 기간 종료 시 잔여량이 남아 있더라도 다음 기간에 적용되지 않습니다(향후 변경 사항에 대한 아래 참고 사항 참조).

예를 들어, 월간 온디맨드 옵션을 사용하는 조직이 APM Pro 호스트 5개를 약정한 경우 해당 월에 수집된 스팬의 기본 할당량은 `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB`입니다. 이 조직이 APM 호스트 6개와 800GB의 수집된 스팬을 사용하는 경우 추가 호스트 사용량에 대해서는 청구되지만 추가 _스팬_ 사용량에 대해서는 청구되지 않습니다. 이는 수집된 스팬 할당량이 900GB로 증가하기 때문입니다. 100GB의 잔여량은 다음 달에 이월 적용되지 않습니다.

**참고**: 2026년 8월부터 일부 계정에서 할당량 처리 방식의 변경이 나타나기 시작합니다. 아래에서 설명하는 변경 사항은 계정에 순차적으로 적용됩니다. 이 변경 사항이 적용되면 Plan and Usage의 Bill Overview 아래에 배너가 표시됩니다. 사용자는 계정 담당자에게 문의하여 현재 할당량 적용 방식을 확인할 수도 있습니다.

월간 누적 사용량(예: Ingested Spans 또는 Indexed Spans)이 발생하는 제품의 할당량은 시간 단위가 아닌 전체 청구 기간에 걸쳐 적용되므로, 사용하지 않은 할당량은 동일한 청구 기간 내의 다른 시간으로 이월될 수 있습니다. 이를 통해 온디맨드 비용을 절감할 수 있습니다.

다음 예시에서는 처음 두 시간 동안 사용되지 않고 남은 50 단위의 할당량이 사용량이 더 많은 3시간 차로 이월되어 사용량을 충당하므로 온디맨드 사용량에 대한 요금은 청구되지 않습니다.

| 시간 | 사용량 | 시간당 할당량 | 청구된 온디맨드 비용 |
| --- | --- | --- | --- |
| 1시간차 | 60 | 100 | 0(40이 월간 풀에 적립됨) |
| 2시간차 | 90 | 100 | 0(10이 월간 풀에 적립됨) |
| 3시간차 | 150 | 100 | 0(이전에 적립된 50으로 충당) |
| **합계** | **300** | **300** | **0** |

동시 사용 수, 피크 또는 평균(예: 호스트, 컨테이너, 사용자 지정 메트릭)으로 측정되는 제품의 경우 할당량은 월간 예산 형태가 아니라 각 시점마다 적용됩니다. 시간대 간에 이월되는 미사용 할당량은 없으므로 이러한 제품의 동작은 변경되지 않습니다.

이 변경 사항은 외부 마켓플레이스(예: AWS, Azure, Google Cloud)를 통해 청구되는 사용량에는 적용되지 않으며, 이러한 경우 할당량은 계속해서 시간별로 적용됩니다.

계정이 전환될 때까지 할당량은 위에서 설명한 대로 계속해서 시간별로 적용됩니다. 모든 경우에 할당량은 청구 기간 간에 이월되지 않으며 측정 기간 종료 시 남은 잔량은 다음 기간에 적용되지 않습니다.

## 사용량 집계 함수 {#usage-aggregation-function}
집계 함수는 시간당 청구 가능 사용량을 청구에 사용할 수 있는 월간 사용량 값으로 변환하는 데 사용됩니다. 각 제품은 최대 2개의 사용량 집계 함수(각 온디맨드 옵션당 하나씩)를 가질 수 있습니다. 사용 가능한 집계 함수에는 Sum, Average, Maximum 및 HWMP(하이 워터마크 플랜)가 포함됩니다. 

- **Sum:** 해당 월의 모든 시간에 걸친 총 사용량의 합계입니다. 사용량은 기본 제공 사용량을 제품 사용의 개별 인스턴스별 청구 가능 사용량과 비교하여 매시간 계산합니다. 월말에 해당 월의 매시간 온디맨드 사용량을 합산합니다.
- **Average:** 월간 온디맨드 옵션에서 이는 해당 월의 모든 시간에 걸친 평균 사용량입니다. 해당 월의 온디맨드 사용량은 해당 월의 평균 사용량에서 총 기본 제공 사용량을 차감하여 산출됩니다.

    시간별 온디맨드 옵션에서는 매시간 사용량을 측정하며, 각 시간의 측정된 사용량에서 총 기본 제공 사용량을 차감하여 해당 시간의 온디맨드 사용량을 구합니다. 월말에 모든 시간에 걸친 온디맨드 사용량을 합산하고 해당 월의 시간 수로 나누어 평균을 계산합니다.
- **Maximum:** 이는 특정 기간(보통 월 단위) 동안 모든 구간에 걸친 최대 사용량입니다.
- **HWMP(하이 워터마크 플랜):** 청구 대상 호스트 수는 해당 월 말에 시간별 사용량 중 하위 99% 구간의 최대값을 사용하여 계산합니다. Datadog은 사용량 급증이 청구서에 미치는 영향을 줄이기 위해 상위 1%를 제외합니다. 

개별 제품 세부 정보는 [할당량에 대한 사용량 집계 함수](#usage-aggregation-functions-for-allotments)를 참조하세요.

## 온디맨드 사용량 계산 {#calculating-on-demand-usage}

온디맨드 사용량은 약정 사용량과 할당된 사용량의 합계를 초과하여 발생한 사용량을 의미합니다. 온디맨드 사용량을 계산하려면 **기본 제공 사용량**(즉, 약정 사용량과 할당된 사용량)을 **청구 가능한 사용량**에서 차감하세요. 

온디맨드 옵션은 온디맨드 사용량이 계산되는 빈도를 결정합니다. 월간 온디맨드 옵션의 경우 온디맨드 사용량은 매월 말에 계산됩니다. 시간별 온디맨드 옵션의 경우, 온디맨드 사용량은 매시간 계산되며 월말에 청구될 총 온디맨드 사용량은 해당 월의 모든 시간에 걸친 시간당 온디맨드 사용량의 합계입니다. 온디맨드 사용량은 온디맨드 요율로 청구됩니다. [Datadog 요금 책정][1]을 참조하세요.

### 예시 {#example}
**월간 온디맨드 옵션을 사용하는 조직**이 APM Pro 호스트 5개를 약정했으며 수집된 스팬은 약정하지 않았습니다. 이 조직의 총 기본 제공 사용량은 `(5 APM Pro hosts * 150 GB Ingested Spans per host) + 0 commitment = 750 GB Ingested Spans of total included usage`입니다. 수집된 스팬 사용량이 1,000GB인 경우 추가 250GB는 온디맨드 사용량으로 분류됩니다.

**시간별 온디맨드 옵션을 사용하는 조직**은 APM Pro 호스트 5개를 약정했으며 수집된 스팬은 약정하지 않았습니다. 온디맨드 사용량이 시간 단위로 계산되므로 다음과 같이 월간 할당량을 연 단위로 환산한 후 1년의 시간 수로 나눕니다. `(365 * 24 / 12) = 730`. 따라서 시간당 수집된 스팬 할당량은 `(5 APM Hosts * (150 GB Ingested Spans / Host) /  (730 hours))  = 1.027 GB Ingested Spans per hour`입니다.

1시간 차에 1.1GB, 2시간 차에 0.9GB, 3시간 차에 1.2GB를 사용했다면, 해당 월의 온디맨드 사용량은 다음과 같이 해당 월의 모든 사용 시간에 걸쳐 청구 가능한 사용량과 할당된 사용량의 차이를 합산한 값으로 계산됩니다. `((1.1 - 1.027 = 0.073) + (0.9 - 1.027 = 0) + (1.2 - 1.027 = 0.173)) = 0.246 GB on-demand usage for Ingested Spans`.

## 청구 가능 사용량 계산 {#calculating-billable-usage}

청구 가능 사용량은 조직 및 제품 체험판 사용량을 제외하고 사용자의 청구서에 표시될 수 있는 모든 원시 사용량을 의미합니다. Datadog의 [Plan and Usage 페이지][2]를 참조하여 청구 가능 사용량을 확인하세요. 다음 변수에 따라 청구 가능 사용량 계산 방식이 결정됩니다.

- 온디맨드 옵션
- 사용량 집계 함수

### 온디맨드 옵션 {#on-demand-option-1}
월간 측정 방식에서 온디맨드 사용량은 청구 가능한 사용량과 기본 제공 사용량을 비교하여 월말에 계산됩니다. 시간별 측정 방식에서 온디맨드 사용량은 월말이 아니라 매시간 계산됩니다. 그런 다음 해당 월의 모든 사용 시간에 걸쳐 집계하고 약정량을 적용하여 최종 청구 가능한 온디맨드 사용량을 산출합니다.

### 사용량 집계 {#usage-aggregation}
[사용량 집계 함수](#usage-aggregation-function)를 참조하세요.

### 예시 {#examples}

#### 월간 온디맨드 옵션 {#monthly-on-demand-option}

한 조직이 3개월 동안 매월 10개의 APM Pro 호스트와 100GB의 수집된 스팬을 약정했습니다. 사용량은 다음과 같습니다(*이탤릭체*로 표시된 값은 파생된 값). 

| 월 | APM 호스트 약정 | APM 호스트 사용량 | 수집된 스팬의 할당량 | 수집된 스팬의 기본 제공 사용량 | 수집된 스팬의 청구 가능 사용량 | 수집된 스팬의 온디맨드 사용량 |
|-----|--------|--------|-----------|-----------|---------|---|
| 1  | 10  | 5   | *1,500GB*   | *1,600GB*   | 2000GB | *400GB*  |
| 2  | 10  | 15 | *2,250GB*  | *2,350GB* | 2,000GB  | *0GB*      |
| 3 | 10   | 10   | *1,500GB*  | *1,600GB*  | 1,600GB | *0GB*  |

월간 온디맨드 옵션의 경우, 각 APM Pro 호스트에 대해 수집된 스팬의 [기본 할당량](#allotments-table)은 150GB입니다. 

조직은 10개 APM 호스트를 약정했으나 **1개월 차**에 5개만 사용했습니다. 수집된 스팬 할당량은 다음과 같이 호스트 약정량과 호스트 사용량 중 큰 값에 기본 할당량을 곱한 값입니다. `maximum(5, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. 수집된 스팬의 기본 제공 사용량은 다음과 같이 약정량과 할당량의 합계입니다. `1500 GB + 100 GB = 1600 GB`. 수집된 스팬의 온디맨드 사용량은 0과 청구 가능 사용량에서 할당량을 뺀 값 중 큰 값입니다. `maximum(0, 2000 – 1600) = 400 GB`.

조직은 APM 호스트 10개를 약정했으나 **2개월 차**에 15개를 사용했습니다. 수집된 스팬 할당량은 다음과 같이 호스트 약정량과 호스트 사용량 중 큰 값에 기본 할당량을 곱한 값입니다. `maximum(15, 10) * 150 GB = 2250 GB allotment of Ingested Spans`. 수집된 스팬의 기본 제공 사용량은 다음과 같이 약정량과 할당량의 합계입니다. `2250 GB + 100 GB = 2350 GB`. 수집된 스팬의 온디맨드 사용량은 0과 사용량에서 할당량을 뺀 값 중 큰 값입니다. `maximum(0, 2000 – 2350) = 0 GB`.

조직은 10개의 APM 호스트를 약정했으며 **3개월 차**에 10개를 사용했습니다. 수집된 스팬 할당량은 다음과 같이 호스트 약정량과 호스트 사용량 중 큰 값에 기본 할당량을 곱한 값입니다. `maximum(10, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. 수집된 스팬의 기본 제공 사용량은 다음과 같이 약정량과 할당량의 합계입니다. `1500 GB + 100 GB = 1600 GB`. 수집된 스팬의 온디맨드 사용량은 0과 사용량에서 할당량을 뺀 값 중 큰 값입니다. `maximum(0, 1600 – 1600) = 0 GB`.

#### 시간별 온디맨드 옵션 {#hourly-on-demand-option}

한 조직이 한 달 동안 매월 APM Pro 호스트 10개와 수집된 스팬 0.3GB를 약정했습니다. 사용량은 다음과 같습니다. 

| 타임스탬프    | APM 호스트 약정량 | APM 호스트 사용량 | 수집된 스팬 할당량 | 수집된 스팬 사용량 | 온디맨드 수집된 스팬 사용량 |
|--------------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| 1시간 | 10    | 5      | 2.054GB     | 2.500GB    | 0.446GB           |
| 2시간 | 10    | 15     | 3.082GB     | 3.000GB    | 0GB               |
| 3시간 | 10    | 10     | 2.054 GB     | 2.054GB    | 0GB               |

시간별 온디맨드 옵션을 사용하는 사용자의 경우 각 APM Pro 호스트에 대해 수집된 스팬의 [기본 할당량](#allotments-table)은 0.2054GB입니다.

조직은 10개의 APM 호스트를 약정했지만 **1시간째**에 5개만 사용했습니다. 시간당 수집된 스팬의 할당량은 다음과 같이 호스트 약정량과 호스트 사용량 중 큰 값에 기본 할당량을 곱한 값입니다. `maximum(5, 10)  * 0.2054 GB = 2.054 GB / hour`. 해당 시간의 온디맨드 사용량은 다음과 같이 0과 청구 대상 사용량에서 할당된 사용량을 뺀 값 중 큰 값입니다. `maximum(0, 2.500 – 2.054) = 0.446 GB`.

조직은 10개의 APM 호스트를 약정했지만 **2시간째**에 15개를 사용했습니다. 시간당 수집된 스팬의 할당량은 다음과 같이 호스트 약정량과 호스트 사용량 중 큰 값에 기본 할당량을 곱한 값입니다. `maximum(15,10) * 0.2054 GB = 3.081 GB / hour`. 해당 시간의 온디맨드 사용량은 다음과 같이 0과 청구 대상 사용량에서 할당된 사용량을 뺀 값 중 큰 값입니다. `maximum(0, 3.000 – 3.081) = 0 GB`.

조직은 10개의 APM 호스트를 약정했는데 **3시간째**에 10개를 사용했습니다. 시간당 수집된 스팬의 할당량은 다음과 같이 호스트 약정량과 호스트 사용량 중 큰 값에 기본 할당량을 곱한 값입니다. `maximum(10,10) * 0.2054 GB = 2.054 GB / hour`. 해당 시간의 온디맨드 사용량은 다음과 같이 0과 청구 대상 사용량에서 할당된 사용량을 뺀 값 중 큰 값입니다. `maximum(0, 2.054 – 2.054) = 0 GB`.

수집된 스팬에 대한 기본 사용량 집계 함수는 sum이므로, 월간 총 온디맨드 사용량을 구하기 위해 한 달 동안의 모든 시간별 사용량을 합산합니다. 이 조직의 한 달 동안 수집된 스팬의 사용량이 3시간뿐이었다면, 다음과 같이 총 월간 사용량은 0이 됩니다. `4452 + 0 + 0 = 0.446 GB`. 

또한 해당 조직에는 수집된 스팬에 대한 월간 약정량 0.3GB가 있습니다. 따라서 월간 온디맨드 사용량은 0과 월간 사용량에서 약정량을 뺀 값 중 큰 값입니다. `maximum(0, 0.446 – 0.3) = 0.146 GB`.

## 할당량에 대한 사용량 집계 함수 {#usage-aggregation-functions-for-allotments}

| 할당량             | 가능한 상위 제품                                      | 기본 월간 사용량 집계 함수 | 기본 시간별 사용량 집계 함수 |
|-----------------------|---------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet of Things (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps, Serverless Invocations, Serverless Functions  | Average | Average |
| Ingested Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet of Things (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps | Average | Average |
| Custom Events | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts | Sum | Sum |
| Cloud Security Containers    | Cloud Security       |      해당 없음     | Sum    |
| CWS Containers      | Cloud Workload Security (CWS)              |       해당 없음     | Sum      |
| Infrastructure Containers    | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts |   해당 없음   | Sum  |
| Profiled Containers | APM Enterprise, Continuous Profiler    |   해당 없음        | Sum   |
| Profiled Hosts        | APM Enterprise       | HWMP   | Sum     |
| CI Indexed Spans    | CI Visibility         | Sum     | Sum   |      
| Test Indexed Spans    | Test Optimization         | Sum   | Sum   |               
| APM Indexed Spans | APM, APM Pro, APM Enterprise, Serverless APM, </br> Legacy - Serverless Invocations, </br> Legacy - Serverless Functions, Fargate Task (APM Pro), </br> Fargate Task (APM Enterprise) | Sum | Sum |
| APM Ingested Spans | APM, APM Pro, APM Enterprise </br> Serverless APM, Legacy - Serverless Invocations </br> Legacy - Serverless Functions </br> Fargate Task (APM Pro), Fargate Task (APM Enterprise) | Sum | Sum | 
| DBM Normalized Queries | Database Monitoring (DBM) | Average | Average |
| Data Streams Monitoring | APM Pro, APM Enterprise | HWMP | Sum |
| CSPM Workflow Runs | Cloud Security | Sum | Sum |
| Fargate Task (Continuous Profiler) | Fargate Task (APM Enterprise) | Average | 해당 없음 |

[1]: https://www.datadoghq.com/pricing/list/
[2]: https://app.datadoghq.com/billing/usage
[3]: https://www.datadoghq.com/pricing/allotments/