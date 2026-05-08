---
description: Datadog 제품에 관한 상세 가격 정보를 통해 빌링 주기, 결제 방법, 사용량 계산, 호스트 수를 파악할 수 있습니다.
title: 빌링
---

## 개요

결제 주기는 가입 시점과 관계없이 매월 1일(UTC)부터 시작됩니다. 첫 달 요금은 실제 가입일을 기준으로 비례 계산됩니다.

Datadog은 호스트 수와 사용자 지정 메트릭 수를 매시간 측정합니다. 청구 가능한 호스트 수는 해당 시간 동안의 하위 99% 사용량 중 최대 수(최고치)를 사용하여 월말에 계산됩니다. Datadog은 사용량 급증으로 인한 청구 영향을 줄이기 위해 상위 1%를 제외합니다. 사용자 지정 메트릭의 청구 가능한 수는 해당 월의 사용자 지정 메트릭 사용 시간 평균을 기준으로 합니다. Datadog에서 [Usage][1]를 확인하세요. 청구 페이지는 Datadog Admin Role을 가진 사용자만 접근할 수 있습니다.

### 호스트

호스트는 Datadog으로 모니터링하는 모든 물리적 또는 가상 OS 인스턴스를 의미합니다. 서버, VM, 노드(Kubernetes의 경우), App Service Plan 인스턴스(Azure App Service의 경우), Heroku dyno(Heroku 플랫폼의 경우) 등이 될 수 있습니다. 호스트는 Datadog Agent가 설치된 인스턴스와 Datadog 통합으로 모니터링되는 Amazon EC2, Google Cloud, Azure, vSphere VM을 모두 포함할 수 있습니다. Agent가 설치된 모든 EC2 또는 VM은 단일 인스턴스로 계산되며 이중 청구되지 않습니다.

미보고 호스트([인프라스트럭처 목록 ][2]의 상태 `INACTIVE` )는 빌링에 포함되지 않습니다. 이러한 호스트가 [인프라스트럭처 목록 ][2]에서 삭제되는 데에는 최대 2시간이 걸릴 수 있습니다. Datadog는 이러한 호스트(유료 계정)의 기록 데이터를 유지합니다. 메트릭 특정 호스트 이름이나 태그를 확인하여 대시보드에서 그래프화할 수 있습니다.

### 컨테이너

호스트당 하나의 컨테이너화된 Agent를 사용하여 컨테이너를 모니터링하는 것이 좋습니다. 이 Agent는 컨테이너 및 호스트 메트릭을 모두 수집합니다. 각 컨테이너에 Agent를 직접 설치하는 경우, 청구 관점에서 각 컨테이너가 하나의 호스트로 간주됩니다. 자세한 내용은 [Agent 설치][3] 문서를 참고하세요.

### Serverless

Datadog은 계정별로 한 달 동안 시간당 평균 함수 수를 기준으로 요금을 부과합니다. Datadog은 매 시간 한 번 이상 실행되어 Datadog 계정에서 모니터링된 함수 수를 기록합니다. Datadog은 월말에 기록된 시간당 함수 수의 평균을 계산하여 요금을 청구합니다. Pro 및 Enterprise 플랜에는 청구 가능한 함수당 5개의 사용자 지정 메트릭이 포함됩니다.

서버리스 APM 요금은 해당 월에 수집된 APM 스팬에 연결된 AWS Lambda 호출의 합계를 기준으로 청구됩니다. 또한, 월말에 번들 수량을 초과하여 Datadog APM 서비스에 제출된 [인덱싱된 스팬][4] 총 개수에 대해서도 요금이 청구됩니다. 서버리스 환경을 사용할 경우 [APM 호스트][4]에는 요금이 부과되지 않습니다.

자세한 내용은 [Serverless 청구 페이지][5] 및 [Datadog Pricing 페이지][6]를 참고하세요.

### IoT

Datadog은 매시간 IoT 디바이스 수를 측정합니다. 청구 가능한 IoT 디바이스 수는 해당 시간대의 하위 99% 사용량 중 최대 수(최고치)를 기준으로 월말에 계산되며, 사용량 급증으로 인한 요금 부담을 줄이기 위해 상위 1%는 제외됩니다.

IoT 청구에 대한 자세한 내용은 [Datadog Pricing 페이지][7]를 참고하세요.

## 요금제 정보

**결제 방법**을 관리하고 **구독 상세 정보**를 보려면 Datadog 관리자 사용자여야 합니다.

또는 역할에 빌링 읽기(`billing_read`) 및 빌링 편집(`billing_edit`) [권한][8]이 있는 경우 이 데이터에 액세스할 수 있습니다.

### 결제 수단 관리

*[*결제 방법**][9] 섹션에는 결제 옵션에 대한 자세한 내용이 나와 있습니다. 

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Plan 페이지에 있는 결제 방법" style="width:90%;" >}}

**Edit Payment**는 결제 수단을 관리하는 옵션을 제공합니다. 카드를 수정하거나 삭제할 수 있으며, 결제 수단을 카드에서 인보이스로 또는 인보이스에서 카드로 변경하도록 요청할 수 있습니다.

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Plan 페이지에서 결제 방법 설정" style="width:90%;" >}}

### 청구 연락처 정보 관리

빌링 연락처 정보는 [**빌링 연락처 정보**][9] 섹션에서 확인할 수 있습니다. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Plan 페이지에 있는 청구 연락처 세부 정보" style="width:90%;" >}}

**Edit Details**를 통해 청구서 주소를 추가, 편집, 삭제할 수 있습니다. 청구서를 받을 이메일 주소도 지정할 수 있습니다.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Plan 페이지에서 청구 연락처 세부 정보 편집" style="width:90%;" >}}

**참고**: 이메일 주소는 Datadog 팀원의 이메일 주소일 필요는 없습니다. 예를 들어, `invoices@example.com`을 사용할 수 있습니다.

### 구독 세부정보 보기

[구독 상세 정보][9] 섹션에는 모든 약정 제품의 수량, 계약 가격 및 온디맨드 주문 가격이 포함되어 있습니다.

{{< img src="/account_management/billing/subscription_details.png" alt="Subscription Details 섹션이 강조된 Account Plan & Usage 페이지" style="width:90%;" >}}

**참고**: Datadog Partner를 통해 직접 청구를 관리하는 경우 Subscription Details는 지원되지 않습니다.

## 결제

결제 방법에는 두 가지가 있습니다.
- 신용카드
- 인보이스 발행(ACH, 전신 송금, 수표)

### 신용카드

신용카드로 결제하는 경우 영수증은 [관리자][10]가 [빌링 내역][11]에서 이전 달에 대한 영수증을 확인할 수 있습니다. 청구서 사본을 받으려면 [Datadog 빌링][13]으로 이메일을 보내주세요.

자세한 내용은 [신용카드 청구][12]를 참고하세요.

### 인보이스 발행

현금, ACH 또는 송금으로 결제하는 경우 매월 10일 영업일에 빌링 이메일 주소로 청구서가 발송됩니다. 추가 사본을 요청하려면 [Datadog 빌링][13]으로 이메일을 보내주세요. 결제 내역에 대한 상세 정보는 청구서에서 확인할 수 있습니다.

## 연락처

| 문의사항                                                                                                                                                                               | 연락처                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| 분쟁 및 크레딧 요청<br>사용량<br>결제 방법 변경<br>결제 문제<br>일반 계정 문제<br>연락처 업데이트<br>계정 명세서<br>청구 및 배송 정보 업데이트 | success@datadoghq.com        |
| 인보이스 사본<br>긴급 청구 요청<br>청구 내역<br>포털 초대                                                                                                        | billing@datadoghq.com        |
| 결제 송금                                                                                                                                                                                | remittances@datadoghq.com    |
| 구매 주문서 사본                                                                                                                                                                             | purchaseorders@datadoghq.com |

## 참고 자료

{{< whatsnext desc="청구 관련 항목:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}요금{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}사용 상세{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}사용 메트릭{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}신용카드{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}커스텀 메트릭{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}컨테이너{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}로그 관리{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM(Distributed Tracing & Continuous Profiler){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}서버리스{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}실시간 사용자 모니터링{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ci_visibility/" >}}CI Visibility{{< /nextlink >}}
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