---
kind: 설명서
title: 빌링
---

## 개요

빌링 주기는 등록 시점에 관계 없이 해당 월의 첫날(UTC 기준)에 시작합니다. 첫달은 실제 등록일 기준 비례하여 계산됩니다.

Datadog는 매 시간 호스트와 커스텀 메트릭을 측정합니다. 청구 가능한 호스트 개수는 해당 시간 동안 사용량의 하위 99%의 최대 개수(높은-워터 마크)를 사용해 월말 계산됩니다. Datadog는 청구되는 사용량의 급증이 미치는 영향을 줄이기 위해 상위 1%는 제외합니다. 청구 가능한 커스텀 메트릭 개수는 해당 월의 커스텀 메트릭 시간의 평균 수치를 기준으로 합니다. Datadog에서 [사용량][1]을 참조하세요. 빌링 페이지는 Datadog 관리자 역할의 사용자만 액세스할 수 있습니다.

### 호스트

호스트는 Datadog를 사용해 모니터링하는 물리적 또는 가상 OS 인스턴스를 의미합니다. 서버, VM, 노드(Kubernetes의 경우), 앱 서비스 플랜 인스턴스(Azure 앱 서비스의 경우) 또는 Heroku dyno (헤로쿠 플랫폼의 경우)일 수 있습니다. 호스트는 Datadog 에이전트가 설치된 인스턴스를 비롯해 모든 Amazon EC2, Google Cloud, Azure 또는 Datadog 통합으로 모니터링되는 vSphere VM일 수 있습니다. 에이전트가 설치된 EC2 또는 VM의 경우 단일 인스턴스로 계산됩니다(이중 청구 없음).

미보고 호스트([인프라스트럭처 목록 ][2]의 상태 `INACTIVE` )는 빌링에 포함되지 않습니다. 이러한 호스트가 [인프라스트럭처 목록 ][2]에서 삭제되는 데에는 최대 2시간이 걸릴 수 있습니다. Datadog는 이러한 호스트(유료 계정)의 기록 데이터를 유지합니다. 메트릭 특정 호스트 이름이나 태그를 확인하여 대시보드에서 그래프화할 수 있습니다.

### 컨테이너

컨테이너는 호스트당 컨테이너화된 단일 에이전트를 사용해 모니터링하는 것이 좋습니다. 이 에이전트는 컨테이너와 호스트 메트릭 모두를 수집합니다. 각 컨테이너에서 직접 에이전트를 설치하기로 선택하면 각 컨테이너는 청구 가능한 호스트로 계산됩니다. 자세한 정보는 [에이전트 설치][3] 설명서를 참고하세요.

### 서버리스

Datadog은 계정에 대해 한 달 동안 시간당 평균 기능 수를 기준으로 요금을 청구합니다. Datadog은 매 시간마다 한 번 이상 실행되고 Datadog 계정에서 모니터링되는 기능 수를 기록합니다. 월말에 Datadog은 기록된 기능 수의 시간당 평균을 계산하여 요금을 청구합니다. Pro 및 Enterprise 플랜에는 청구 가능한 기능당 5개의커스텀 메트릭이 포함되어 있습니다.

서버리스 APM 빌링은 해당 월에 APM 수집 스팬에 연결된 AWS Lambda 호출의 합계를 기준으로 합니다. 또한 월말에 번들 수량을 초과하는 Datadog APM 서비스에 제출된 [인덱싱된 스팬][4]의 총 개수에도 요금이 청구됩니다. 서버리스를 사용하는 경우 청구 가능한 [APM Host][4]가 없습니다.

자세한 내용은 [서버리스 빌링 페이지][5] 및 [Datadog 가격 페이지][6]를 참고하세요.

### IoT

Datadog은 IoT 장치 수를 시간별로 측정합니다. IoT 장치의 청구 가능 개수는 사용량 급증으로 인해 서비스에 미치는 영향을 줄이기 위해 상위 1%를 제외하여 해당 시간 동안 사용량의 하위 99%의 최대 개수(최고 수위점)를 사용하여 청구서로 월말에 계산됩니다.

IoT 청구와 관련한 자세한 내용은 [Datadog 가격 페이지][7]를 참고하세요.

## 플랜 상세 정보

**결제 방법**을 관리하고 **구독 상세 정보**를 보려면 Datadog 관리자 사용자여야 합니다.

또는 역할에 빌링 읽기(`billing_read`) 및 빌링 편집(`billing_edit`) [권한][8]이 있는 경우 이 데이터에 액세스할 수 있습니다.

### 결제 수단 관리

*[*결제 방법**][9] 섹션에는 결제 옵션에 대한 자세한 내용이 나와 있습니다. 

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Plan 페이지의 결제 방법 섹션" style="width:90%;" >}}

**Edit Payment**에서는 결제 방법을 관리할 수 있습니다. 카드를 수정하거나 삭제할 수 있으며, 결제 방법을 카드에서 청구서로, 청구서에서 카드로 변경 요청할 수 있습니다.

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Plan 페이지의 결제 설정 섹션" style="width:90%;" >}}

### 빌링 연락처 세부정보 관리

빌링 연락처 정보는 [**빌링 연락처 정보**][9] 섹션에서 확인할 수 있습니다. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Plan 페이지의 빌링 연락처 상세 섹션" style="width:90%;" >}}

**Edit Details**을 통해 빌링 수신 주소를 추가, 편집, 또는 제거할 수 있습니다. 청구서를 보낼 이메일 주소를 지정할 수도 있습니다.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Plan 페이지에서 빌링 연락처 상세 정보 편집" style="width:90%;" >}}

**참고**: 이메일 주소는 Datadog 내의 팀 구성원일 필요는 없습니다. 예를 들어, `invoices@example.com`을 사용할 수 있습니다.

### 구독 세부정보 보기

[구독 상세 정보][9] 섹션에는 모든 약정 제품의 수량, 계약 가격 및 온디맨드 주문 가격이 포함되어 있습니다.

{{< img src="/account_management/billing/subscription_details.png" alt="구독 상세 내역 섹션이 강조 표시된 Account Plan & Usage 페이지" style="width:90%;" >}}

**참고**: 빌링이 Datadog 파트너를 통해 직접 관리되는 경우, 구독 세부정보가 지원되지 않습니다.

## 결제

두 가지 결제 방법이 있습니다.
- 신용 카드
- 인보이싱(ACH, 송금, 또는 수표)

### 신용 카드

신용카드로 결제하는 경우 영수증은 [관리자][10]가 [빌링 내역][11]에서 이전 달에 대한 영수증을 확인할 수 있습니다. 청구서 사본을 받으려면 [Datadog 빌링][13]으로 이메일을 보내주세요.

자세한 내용은 [신용카드 결제][12]를 참고하세요.

### 인보이싱

현금, ACH 또는 송금으로 결제하는 경우 매월 10일 영업일에 빌링 이메일 주소로 청구서가 발송됩니다. 추가 사본을 요청하려면 [Datadog 빌링][13]으로 이메일을 보내주세요. 결제 내역에 대한 상세 정보는 청구서에서 확인할 수 있습니다.

## 문의

| 질문 또는 우려 사항                                                                                                                                                                               | 문의                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| 분쟁 및 신용요구<br>사용법<br>결제수단 변경<br>지불 문제<br>일반적인 계정 문제<br>연락처 업데이트<br>계정 명세서<br>빌링 및 배송 정보 업데이트 | success@datadoghq.com        |
| 청구서 사본<br>마감 시간이 중요한 청구 요청<br>청구 내역<br>포털 초대                                                                                                        | billing@datadoghq.com        |
| 지불 송금                                                                                                                                                                                | remittances@datadoghq.com    |
| 구매 주문 사본                                                                                                                                                                             | purchaseorders@datadoghq.com |

## 참고 자료

{{< whatsnext desc="Specific billing topics:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}가격{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}사용 상세 내역{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}사용 메트릭{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}신용 카드{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}커스텀 메트릭{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}컨테이너{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}로그 관리{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM(분산 추적 & 연속 프로파일러){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}서버리스{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}실시간 사용자 모니터링{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}AWS 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Azure 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Alibaba 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Google Cloud 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}vSphere 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}사용 속성{{< /nextlink >}}
{{< /whatsnext >}}



[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /ko/infrastructure/
[3]: /ko/agent/
[4]: /ko/account_management/billing/pricing/#apm
[5]: /ko/account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[7]: https://www.datadoghq.com/pricing/
[8]: /ko/account_management/rbac/permissions/#billing-and-usage
[9]: https://app.datadoghq.com/billing/plan
[10]: /ko/account_management/rbac/#datadog-default-roles
[11]: https://app.datadoghq.com/account/billing_history
[12]: /ko/account_management/billing/credit_card/
[13]: mailto:billing@datadoghq.com