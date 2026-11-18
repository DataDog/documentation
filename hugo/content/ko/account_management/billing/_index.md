---
description: Datadog 제품의 상세 가격 정보를 통해 청구 주기, 결제 방법, 사용량 계산 및 호스트 집계 방식을 이해하세요.
title: 청구
---
## 개요 {#overview}

청구 주기는 가입 시점과 관계없이 매월 1일(UTC)에 시작됩니다. 첫 달 요금은 실제 가입일을 기준으로 일할 계산됩니다.

Datadog은 호스트 수와 Custom Metrics 수를 매시간 측정합니다. 청구 대상 호스트 수는 해당 월 말에 시간별 사용량 중 하위 99% 구간의 최대값(고수위 값)을 사용하여 계산합니다. Datadog은 사용량 급증이 청구서에 미치는 영향을 줄이기 위해 상위 1%를 제외합니다. 청구 대상 Custom Metrics 수는 해당 월의 평균 Custom Metrics 시간을 기준으로 합니다. Datadog에서 [Usage][1]를 확인하세요. 청구 페이지는 Datadog Admin 역할이 있는 사용자만 액세스할 수 있습니다.

### 호스트 {#hosts}

호스트는 Datadog으로 모니터링하는 모든 물리적 또는 가상 OS 인스턴스입니다. 서버, VM, 노드(Kubernetes의 경우), App Service Plan 인스턴스(Azure App Service의 경우) 또는 Heroku dyno(Heroku 플랫폼의 경우)일 수 있습니다. 호스트는 Datadog Agent가 설치된 인스턴스뿐만 아니라 Datadog Integrations를 통해 모니터링되는 Amazon EC2, Google Cloud, Azure 또는 vSphere VM일 수 있습니다. Agent가 설치된 EC2 또는 VM은 단일 인스턴스로 집계됩니다(이중 청구 없음).

보고하지 않는 호스트([Infrastructure list][2]에서 상태가 `INACTIVE`인 호스트)는 청구 대상에 포함되지 않습니다. 이러한 호스트가 [Infrastructure List][2]에서 사라지는 데 최대 2시간이 소요될 수 있습니다. Datadog은 이러한 호스트에 대한 과거 데이터를 보관합니다(유료 계정). 메트릭은 특정 호스트 이름이나 태그를 사용하여 대시보드에 그래프로 표시할 수 있습니다.

### 컨테이너 {#containers}

컨테이너는 호스트당 하나의 컨테이너화된 Agent로 모니터링하는 것이 좋습니다. 이 Agent는 컨테이너 메트릭과 호스트 메트릭을 모두 수집합니다. 각 컨테이너에 Agent를 직접 설치하도록 선택하면, 청구 관점에서 각 컨테이너가 하나의 호스트로 집계됩니다. 자세한 내용은 [Agent 설치][3] 설명서에서 확인할 수 있습니다.

### Serverless {#serverless}

Datadog은 계정의 월간 시간당 평균 함수 수를 기준으로 요금을 청구합니다. Datadog은 매시간 한 번 이상 실행되고 Datadog 계정에서 모니터링되는 함수 수를 기록합니다. 월말에 Datadog은 기록된 시간당 함수 수의 평균을 계산하여 요금을 청구합니다. Pro 및 Enterprise 플랜에는 청구 가능한 함수당 5개의 Custom Metrics가 포함되어 있습니다.

Serverless APM에 대한 요금은 특정 월에 APM 수집 스팬에 연결된 AWS Lambda 호출의 합계를 기준으로 합니다. 또한 월말에 번들 수량을 초과하여 Datadog APM 서비스에 제출된 [인덱싱된 스팬][4]의 총 수에 대해서도 요금이 청구됩니다. Serverless를 사용할 때는 청구 가능한 [APM 호스트][4]가 없습니다.

자세한 내용은 [Serverless 요금 페이지][5] 및 [Datadog 요금 페이지][6]를 참조하세요.

### IoT {#iot}

Datadog은 매시간 IoT 장치 수를 측정합니다. IoT 장치의 청구 대상 수는 사용량 급증이 요금에 미치는 영향을 줄이기 위해 상위 1%를 제외한 해당 시간 사용량의 하위 99% 중 최대값(high-water mark)을 사용하여 월말에 계산됩니다.

IoT 요금에 대한 자세한 내용은 [Datadog 요금 페이지][7]를 참조하세요.

## 플랜 세부 정보 {#plan-details}

{{< ui >}}Payment Method{{< /ui >}} 관리 및 {{< ui >}}Subscription Details{{< /ui >}} 조회를 하려면 Datadog Admin 사용자여야 합니다.

또는 Billing Read(`billing_read`) 및 Contract Read(`contract_read`) [권한][8]이 있는 역할은 이 데이터를 볼 수 있습니다. 결제 수단을 관리하려면 Billing Edit(`billing_edit`) 권한도 필요합니다.

### 결제 수단 관리 {#managing-your-payment-method}

[**Payment Method**][9] 섹션에는 결제 옵션에 대한 세부 정보가 포함되어 있습니다. 

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Plan 페이지의 결제 수단" style="width:90%;" >}}

{{< ui >}}Edit Payment{{< /ui >}}에서 결제 수단을 관리할 수 있습니다. 카드를 편집하거나 삭제할 수 있으며, 결제 방법을 카드에서 청구서로 또는 그 반대로 변경하도록 요청할 수 있습니다. 

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Plan 페이지의 결제 설정" style="width:90%;" >}}

### 청구 연락처 정보 관리 {#managing-your-billing-contact-details}

[**Billing Contact Details**][9] 섹션에서 청구 연락처 정보를 볼 수 있습니다. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Plan 페이지의 청구 연락처 정보" style="width:90%;" >}}

{{< ui >}}Edit Details{{< /ui >}}에서 청구 주소를 추가, 편집 또는 삭제할 수 있습니다. 청구서를 보낼 이메일 주소를 지정할 수도 있습니다.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Plan 페이지에서 청구 연락처 정보 편집하기" style="width:90%;" >}}

**참고**: 이메일 주소가 Datadog 내의 팀 구성원일 필요는 없습니다. 예를 들어 `invoices@example.com`를 사용할 수 있습니다.

### 구독 세부 정보 보기 {#view-your-subscription-details}

[Subscription Details][9] 섹션에는 모든 약정 제품의 수량, 계약 가격 및 온디맨드 가격이 포함되어 있습니다.

{{< img src="/account_management/billing/subscription_details.png" alt="Subscription Details 섹션이 강조 표시된 계정 Plan 및 Usage 페이지" style="width:90%;" >}}

**참고**: 청구가 Datadog 파트너를 통해 직접 관리되는 경우 Subscription Details는 지원되지 않습니다.

## 결제 {#payment}

결제 방법에는 두 가지 선택 사항이 있습니다:
- 신용 카드
- 청구서 발행(ACH, 계좌 이체 또는 수표)

### 신용 카드 {#credit-card}

신용 카드로 결제하는 경우, [Administrators][10]는 [Billing History][11]에서 이전 달의 영수증을 확인할 수 있습니다. 청구서 사본이 필요하면 [Datadog 청구팀][13]으로 이메일을 보내세요.

자세한 내용은 [Credit Card Billing][12]을 참조하세요.

### 청구서 발행 {#invoicing}

수표, ACH 또는 계좌 이체로 결제하는 경우, 청구서는 매월 10번째 영업일 무렵에 청구 이메일 주소로 발송됩니다. 추가 사본을 요청하려면 [Datadog 청구팀][13]으로 이메일을 보내세요. 대금 송금처에 대한 자세한 정보는 청구서에서 확인할 수 있습니다.

## 문의 {#contact}

| 질문 또는 우려 사항                                                                                                                                                                               | 연락처                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| 분쟁 및 크레딧 요청<br>사용량<br>결제 수단 변경<br>결제 관련 우려 사항<br>일반 계정 관련 우려 사항<br>연락처 업데이트<br>계정 명세서<br>청구 및 배송 정보 업데이트 | success@datadoghq.com        |
| 청구서 사본<br>긴급 요금 청구 요청<br>청구 금액 내역<br>포털 초대                                                                                                        | billing@datadoghq.com        |
| 대금 송금                                                                                                                                                                                | remittances@datadoghq.com    |
| 구매 주문서 사본                                                                                                                                                                             | purchaseorders@datadoghq.com |

## 추가 자료 {#further-reading}

{{< whatsnext desc="특정 청구 주제:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}요금{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}사용량 세부 정보{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}사용량 메트릭{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}신용 카드{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Custom Metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Log Management{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (분산 추적 및 Continuous Profiler){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ci_visibility/" >}}CI Visibility{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}AWS 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Azure 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Alibaba 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Google Cloud 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}vSphere 통합{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}사용량 귀속{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ai_credits/" >}}AI 크레딧{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ai_credit_limits/" >}}AI 크레딧 한도{{< /nextlink >}}
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