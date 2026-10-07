---
aliases:
- /ko/logs/workspaces/use_cases/analyze_finance_operations
further_reading:
- link: /notebooks/advanced_analysis/
  tag: 설명서
  text: Notebooks Analysis 기능 자세히 알아보기
title: 결제 및 거래 데이터를 활용한 금융 운영 분석
---

## 개요

Notebooks Analysis 기능은 금융 거래 및 시스템 성능을 분석하고 모니터링하는 강력한 도구입니다. 이 기능을 통해 SQL 쿼리와 시각화를 활용하여 운영 관련 인사이트를 얻고 데이터 기반 의사 결정을 통해 성능과 효율성을 개선할 수 있습니다.

## 이점

금융 산업에서 Notebooks Analysis를 활용하면 여러 가지 이점이 있습니다.

* **실시간 모니터링**: 금융 거래 및 시스템 성능을 실시간으로 추적합니다.
* **이슈 식별**: 기술 및 비즈니스 관련 이슈를 신속하게 파악하고 진단합니다.
* **성능 분석**: 트렌드와 패턴을 분석하여 프로세스를 최적화합니다.
* **보고 및 감사**: 컴플라이언스 및 감사 관련 보고서를 생성합니다.

이 가이드는 신용카드 정보 및 청구서 결제 처리에 관한 예제를 통해 Notebooks Analysis 기능 사용 방법을 설명합니다.

## 데이터 이해하기

이 가이드의 예시는 금융 산업 내 두 가지 핵심 함수에 초점을 맞추고 있습니다.

* **Credit Card Details:** 신용카드 거래 처리 및 관리
* **Bill Payment:** 청구서 지불 처리

각 함수별로 다음 메트릭을 추적합니다.

* **Total Count:** 총 요청 건수
* **Success:** 성공적인 요청 수
* **Business Failed:** 비즈니스 관련 이슈로 인해 실패한 요청 수
* **Technical Failed:** 기술적 이슈로 인해 실패한 요청 수
* **TechFail %:** 기술적 실패 비율

## 데이터 소스를 가져오고 쿼리 구성하기

노트북을 생성하고 데이터 소스를 추가합니다. 이 예시에서는 신용 카드와 청구서 결제 각각에 세 개의 데이터 소스 셀이 있으며, 각 셀은 분석과 관련된 로그를 필터링합니다. 자세한 내용은 [Notebooks Analysis 기능][1]을 참고하세요.

{{< img src="/logs/guide/log_analysis_use_cases/finance/finance_credit_card_data_source.png" alt="신용카드 거래 로그용 데이터 소스 구성(필터 및 쿼리 파라미터 표시)" caption="신용카드 거래 모니터링용 데이터 소스 셀로 관련 금융 로그 데이터를 분리하기 위한 쿼리 필터 및 파라미터를 표시합니다."style="width:100%;" >}}

{{< img src="/logs/guide/log_analysis_use_cases/finance/finance_billpay_datasource.png" alt="청구서 결제 로그의 데이터 소스 구성(관련 필터 및 쿼리 설정 포함)" caption="청구서 결제 모니터링용 데이터 소스 셀로, 관련 금융 로그 데이터를 분리하기 위한 쿼리 필터 및 파라미터를 표시합니다."style="width:100%;" >}}

신용카드 및 청구서 결제 데이터 소스의 데이터를 사용하여 SQL로 Analysis 셀을 생성하고 두 프로세스의 주요 메트릭을 계산 및 비교할 수 있습니다. 이 분석을 통해 성공률을 추적하고, 실패 패턴을 파악하며, 성능 트렌드를 모니터링할 수 있습니다.

{{< img src="/logs/guide/log_analysis_use_cases/finance/sql_query_analysis_0.png" alt="성공률 및 실패율과 함께 신용카드 및 청구서 결제 거래 메트릭을 보여주는 SQL 쿼리 Analysis 셀" caption="신용카드 및 청구서 결제 거래의 주요 메트릭을 표시하는 SQL 쿼리 Analysis 셀로, 금융 모니터링을 위해 성공률과 실패율을 강조 표시합니다."  style="width:100%;" >}}

## SQL 쿼리 분석

### 쿼리 목적 및 구조

이 쿼리는 UNION 연산자를 사용하여 두 가지 금융 프로세스(Credit Card Details 및 Bill Payment)의 주요 메트릭을 단일 비교 보기로 결합하므로 두 함수 전반의 성능을 더 쉽게 분석할 수 있습니다.

{{< code-block lang="sql" filename="전체 SQL 쿼리" collapsible="true" >}}

(
    SELECT 'CreditCard Details' AS "Function",
        (totalcount - businesscount - techcount) AS "Success",
        businesscount AS "Business Failed",
        techcount AS "Technical Failed",
        totalcount AS "Total",
        (100 * techcount / totalcount) AS "TechFail %"
    FROM (
            SELECT COUNT(DISTINCT creditcards_totalrequest.requestId) as totalcount,
                COUNT(DISTINCT creditcards_technicalunsuccessful.requestId) AS techcount,
                COUNT(DISTINCT creditcards_businessunsuccessful.requestId) AS businesscount
            FROM creditcards_totalrequest
                FULL JOIN creditcards_technicalunsuccessful ON creditcards_totalrequest.requestId = creditcards_technicalunsuccessful.requestId
                FULL JOIN creditcards_businessunsuccessful ON creditcards_totalrequest.requestId = creditcards_businessunsuccessful.requestId
        )
)
UNION
(
    SELECT 'Bill Payment' AS "Function",
        successcount AS "Success",
        businesscount AS "Business Failed",
        (totalcount - successcount - businesscount) AS "Technical Failed",
        totalcount AS "Total",
        (100 * (totalcount - successcount - businesscount) / totalcount) AS "TechFail %"
    FROM (
            SELECT COUNT(DISTINCT bill_totalrequest.requestId) as totalcount,
                COUNT(DISTINCT bill_successfulrequest.requestId) AS successcount,
                COUNT(DISTINCT bill_businessunsuccessfulrequest.requestId) AS businesscount
            FROM bill_totalrequest
                FULL JOIN bill_successfulrequest ON bill_totalrequest.requestId = bill_successfulrequest.requestId
                FULL JOIN bill_businessunsuccessfulrequest ON bill_totalrequest.requestId = bill_businessunsuccessfulrequest.requestId
        )
)
ORDER BY Total DESC
{{< /code-block >}}

{{% collapse-content title="쿼리 분석" level="h4" expanded=false %}}


{{< code-block lang="sql" filename="Part 1: Credit Card Details" collapsible="true" >}}
SELECT 'CreditCard Details' AS "Function",
    (totalcount - businesscount - techcount) AS "Success",
    businesscount AS "Business Failed",
    techcount AS "Technical Failed",
    totalcount AS "Total",
    (100 * techcount / totalcount) AS "TechFail %"
FROM (
        SELECT COUNT(DISTINCT creditcards_totalrequest.requestId) as totalcount,
            COUNT(DISTINCT creditcards_technicalunsuccessful.requestId) AS techcount,
            COUNT(DISTINCT creditcards_businessunsuccessful.requestId) AS businesscount
        FROM creditcards_totalrequest
            FULL JOIN creditcards_technicalunsuccessful ON creditcards_totalrequest.requestId = creditcards_technicalunsuccessful.requestId
            FULL JOIN creditcards_businessunsuccessful ON creditcards_totalrequest.requestId = creditcards_businessunsuccessful.requestId
    )
{{< /code-block >}}

Credit Card Details용 SQL은 다음을 기준으로 신용카드 처리 관련 메트릭을 계산합니다.
* `creditcards_totalrequest` 데이터 소스에서 발생한 총 요청 수 집계
* `creditcards_technicalunsuccessful` 데이터 소스에서 발생한 기술적 오류 집계
* `creditcards_businessunsuccessful` 데이터 소스에서 발생한 비즈니스 실패 건수 집계
* 전체 요청 수에서 실패한 요청 수를 빼서 성공한 요청 수 계산
* 기술적 실패율 계산

{{< code-block lang="sql" filename="Part 2: Bill Payment" collapsible="true" >}}
SELECT 'Bill Payment' AS "Function",
    successcount AS "Success",
    businesscount AS "Business Failed",
    (totalcount - successcount - businesscount) AS "Technical Failed",
    totalcount AS "Total",
    (100 * (totalcount - successcount - businesscount) / totalcount) AS "TechFail %"
FROM (
        SELECT COUNT(DISTINCT bill_totalrequest.requestId) as totalcount,
            COUNT(DISTINCT bill_successfulrequest.requestId) AS successcount,
            COUNT(DISTINCT bill_businessunsuccessfulrequest.requestId) AS businesscount
        FROM bill_totalrequest
            FULL JOIN bill_successfulrequest ON bill_totalrequest.requestId = bill_successfulrequest.requestId
            FULL JOIN bill_businessunsuccessfulrequest ON bill_totalrequest.requestId = bill_businessunsuccessfulrequest.requestId
    )
{{< /code-block >}}

Bill Payment용 SQL은 다음을 기준으로 청구서 결제 처리 관련 메트릭을 계산합니다.
* `bill_totalrequest` 데이터 소스에서 발생한 총 요청 수 집계
* `bill_successfulrequest` 데이터 소스에서 발생한 성공 요청 수 집계
* `bill_businessunsuccessfulrequest` 데이터 소스에서 발생한 비즈니스 실패 건수 집계
* 전체 실패 건수에서 성공 건수와 비즈니스 실패 건수를 빼서 기술적 실패 계산
* 기술적 실패율 계산


{{% /collapse-content %}}

### 쿼리 출력

Analysis 셀의 쿼리는 표를 생성하여 각 함수의 성능을 쉽게 비교할 수 있도록 합니다. 데이터를 분석함으로써 기술적 오류를 줄이거나 비즈니스 프로세스 이슈를 해결하는 등 개선이 필요한 부분을 파악할 수 있습니다.

다음은 SQL 분석을 실행했을 때 나타날 수 있는 결과의 예시입니다.

| 함수 | Success | Business Failed | Technical Failed | 총계 | TechFail % |
|----------|---------|-----------------|------------------|-------|------------|
| Bill Payment | 1 | 0 | 0 | 2 | 0 |
| CreditCard Details | 0 | 1 | 1 | 2 | 50 |


## 데이터 시각화

마지막으로, 데이터를 시각화하여 명확하게 표현하세요. Notebooks Analysis 기능은 다음을 포함한 다양한 시각화 옵션을 제공합니다:

* 테이블
* 상위 목록
* 시계열
* 트리맵
* 파이 차트
* 산점도

상태, 환경 및 기타 변수별로 데이터 세트를 필터링하여 데이터의 특정 측면에 집중할 수 있습니다. 금융 기관은 이러한 시각화 도구를 통해 중요한 인사이트를 얻습니다. 이를 활용하여 거래 처리 트렌드를 식별하고, 결제 시스템 전반의 문제를 해결하며, 데이터 기반의 의사결정을 통해 시스템 신뢰도를 높일 수 있습니다. 또한 기술적 오류를 줄임으로써 고객 경험을 향상할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/notebooks/advanced_analysis/