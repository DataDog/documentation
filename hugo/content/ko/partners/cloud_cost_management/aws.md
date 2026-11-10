---
cascade:
  algolia:
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - cloud cost management
    - cloud cost aws
further_reading:
- link: /cloud_cost_management/aws/
  tag: 문서
  text: AWS를 위한 Cloud Cost Management
- link: /monitors/types/cloud_cost/
  tag: 문서
  text: Cloud Cost 모니터 생성
- link: /cloud_cost_management/tags/
  tag: 문서
  text: Cloud Cost Management의 태그에 대해 알아보기
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: 블로그
  text: Datadog Cloud Cost Management로 클라우드 비용에 대한 가시성과 제어 확보
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: 블로그
  text: 서비스 뒤에 숨은 클라우드 및 SaaS 비용을 빠르고 종합적으로 분석하기
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: 블로그
  text: State of Cloud Costs 연구에서 얻은 주요 인사이트
title: MSP 파트너를 위한 AWS Cloud Cost
---
## 개요 {#overview}

이 가이드는 AWS MSP(관리형 서비스 공급자)가 AWS Billing Conductor를 구성하고 견적 형태의 CUR(비용 및 사용 보고서)을 생성하여 MSP의 관리 계정을 노출하지 않고 고객의 멤버 계정을 Datadog CCM에 연결하는 방법을 설명합니다.

이 페이지의 단계는 **MSP 파트너**가 구성하는 항목과 **고객**이 멤버 계정에서 구성하는 항목으로 나뉩니다.

일반(비 MSP) CCM 설정 지침은 [Datadog CCM AWS 설정 가이드][1]를 참조하세요.

## AWS Billing Conductor 정보 {#about-aws-billing-conductor}
[AWS Billing Conductor][2]는 AWS Marketplace 채널 파트너 및 차지백 요구 사항이 있는 조직을 위한 사용자 지정 청구 서비스입니다.
Billing Conductor를 사용하면 고객 또는 계정 소유자와 공유할 수 있는 견적(pro forma) 형태의 두 번째 비용 데이터 버전을 생성할 수 있습니다.
청구 요율, 크레딧 및 수수료, 간접비를 자유롭게 사용자 지정할 수 있습니다. 또한 CUR에 포함할 계정을 선택할 수 있습니다.

<div class="alert alert-warning">
- 견적 형태의 Cost and Usage Report에는 할인 및 세금이 포함되지 않으므로 Datadog의 비용 데이터를 AWS Cost Explorer와 비교하기 어렵습니다.<br>
- 청구 그룹에 계정을 추가하면 Reservations 및 Savings Plan이 공유되는 방식이 변경되어 계정 수준의 비용 차이가 발생할 수 있습니다.<br>
Datadog Cloud Cost Management는 AWS 청구서의 대체 수단이 아니라 비용 추세 분석, 이상 탐지, 최적화 인사이트 및 FinOps 워크플로에 사용하는 것이 가장 좋습니다.
</div>

Billing Conductor CUR를 생성하려면 [AWS Cost and Usage Reports 사용자 가이드][3]를 참조하세요. CUR이 [Datadog의 요구 사항][4]을 충족해야 합니다.  

## 전제 조건 {#prerequisites}

시작하기 전에 다음 사항을 확인하세요.

**MSP 액세스**  
Billing Conductor({{< ui >}}Pricing Rules{{< /ui >}}, {{< ui >}}Pricing Plans{{< /ui >}}, {{< ui >}}Billing Groups{{< /ui >}})를 구성하기 위한 **관리 계정** 액세스 권한.

**고객 권한**  
고객은 다음 작업을 수행할 수 있는 권한이 있어야 합니다.
- CloudFormation 스택 배포  
- CUR(Cost and Usage Report) 생성 및 관리  
- CUR이 포함된 S3 버킷에 대한 Datadog 액세스 권한 부여  

**Datadog 통합**  
Datadog에서 **멤버 계정**에 대해 AWS 통합을 설치해야 합니다.  
자세한 내용은 [AWS 통합 설정][5]을 참조하세요.

## AWS Billing Conductor 구성 {#configure-aws-billing-conductor}

다음 단계는 **MSP의 관리 계정에서 완료해야 합니다**.

### 1단계 - 요금 책정 규칙 생성 {#step-1-create-a-pricing-rule}

Billing Conductor는 {{< ui >}}Discount{{< /ui >}} 또는 {{< ui >}}Markup{{< /ui >}}을 사용하여 **AWS 퍼블릭 온디맨드 요금**을 조정함으로써 견적 형태의 비용을 계산합니다.

다음 옵션 중에서 명시적으로 선택해야 합니다.
- {{< ui >}}Discount{{< /ui >}}: 퍼블릭 온디맨드 요금에 백분율 할인을 적용합니다.  
- {{< ui >}}Markup{{< /ui >}}: 퍼블릭 온디맨드 요금에 백분율 인상을 적용합니다.  

<div class="alert alert-info">
({{< ui >}}Discount{{< /ui >}} 또는 {{< ui >}}Markup{{< /ui >}} 여부와 관계없이) 0%를 입력하면 퍼블릭 온디맨드 요금이 적용됩니다. 허용 범위는 0~100%입니다.
</div>

예시:

| 유형 | 계산 |
|------|-------------|
| {{< ui >}}Discount{{< /ui >}}(20%) | 퍼블릭 온디맨드 × 0.8 |
| {{< ui >}}Markup{{< /ui >}}(30%) | 퍼블릭 온디맨드 × 1.3 |

### 2단계 - 요금제 생성 {#step-2-create-a-pricing-plan}

요금제를 생성하고 이전 단계에서 만든 요금 책정 규칙을 연결합니다.  
요금제에는 **단 하나의** 글로벌 할인 또는 인상 규칙만 포함될 수 있습니다.

### 3단계 - 청구 그룹 생성 {#step-3-create-a-billing-group}

청구 그룹을 생성하고 **한 고객의 멤버 계정**을 **기본** 계정으로 할당합니다.
청구 그룹에 멤버 계정을 하나 이상 추가할 수 있지만, Datadog에서 수집하는 견적 형태 CUR은 기본 멤버 계정만 생성합니다.

### 4단계 - 고객 측 요구 사항 확인 {#step-4-confirm-customer-side-requirements}

고객이 멤버 계정을 독립적으로 관리하는 경우 다음 사항을 수행해야 함을 이해하고 있는지 확인하세요.
- CloudFormation 템플릿 배포
- 계정에서 CUR 생성
- Datadog에 CUR 버킷 액세스 권한 부여

## Datadog Cloud Cost Management 구성 {#configure-datadog-cloud-cost-management}

다음 단계는 고객이 자신의 **멤버 계정**에서 수행해야 합니다.

### 1단계 - Datadog CCM CloudFormation 템플릿 다운로드 {#step-1-download-the-datadog-ccm-cloudformation-template}

견적 형태 CUR은 `SPLIT_COST_ALLOCATION_DATA` 옵션을 지원하지 않습니다.
이러한 제한으로 인해 고객은 다음 단계에 따라 배포 전에 템플릿을 수정해야 합니다.
1. [Datadog CCM CloudFormation 템플릿][6]을 다운로드합니다.
2. 템플릿에서 `SPLIT_COST_ALLOCATION_DATA` 필드를 제거합니다.
3. 수정된 템플릿을 다음 단계에서 사용할 수 있도록 저장합니다.


### 2단계 - AWS에서 CloudFormation 스택 배포 {#step-2-deploy-the-cloudformation-stack-in-aws}

1. 위의 템플릿을 사용하여 고객의 멤버 계정에 스택을 배포합니다.
2. 스택을 배포하려면 AWS 설명서: [CloudFormation에서 스택 생성][7]의 지침을 따릅니다. 스택을 생성할 때 {{< ui >}}With new resources (standard){{< /ui >}}를 선택합니다.

### 3단계 - AWS에서 Cost and Usage Report 설정 구성 {#step-3-configure-the-cost-and-usage-report-settings-in-aws}

배포 중에 다음 정보를 입력합니다.
- {{< ui >}}Bucket Name{{< /ui >}}: CUR 파일이 저장되는 S3 버킷  
- {{< ui >}}Bucket Region{{< /ui >}}: 해당 버킷의 AWS 리전(예: `us-east-1`)  
- {{< ui >}}Export Path Prefix{{< /ui >}}: CUR 파일에 대한 S3 경로 접두사  
- {{< ui >}}Export Name{{< /ui >}}: 비용과 사용량에 관한 리포트의 이름  

이러한 값은 AWS가 CUR을 기록하고 Datadog이 CUR을 읽어오는 위치를 정의합니다.

### 4단계 - Datadog에 멤버 계정의 CUR 파라미터 입력 {#step-4-enter-the-member-accounts-cur-parameters-in-datadog}

1. CloudFormation 스택을 배포한 후 {{< ui >}}Datadog{{< /ui >}} → {{< ui >}}Cloud Cost{{< /ui >}} → {{< ui >}}Settings{{< /ui >}} → [{{< ui >}}Accounts{{< /ui >}}][8]로 이동합니다.


   {{< img src="partners/cloud_cost/select_aws_account_ccm.png" alt="CCM을 위한 AWS 계정 선택" style="width:100%;" >}}

2. 멤버 계정을 선택하고 **3단계**의 정확한 값을 사용하여 다음 필드를 입력합니다.
   - {{< ui >}}Bucket Name{{< /ui >}}  
   - {{< ui >}}Bucket Region{{< /ui >}}
   - {{< ui >}}Export Path Prefix{{< /ui >}}
   - {{< ui >}}Export Name{{< /ui >}}

3. {{< ui >}}Create CloudFormation stack step{{< /ui >}}은 건너뜁니다(**3단계**에서 스택이 이미 배포되었음).


4. {{< ui >}}Activate now{{< /ui >}}를 클릭하여 멤버 계정에 대해 CCM을 활성화합니다.


{{< img src="partners/cloud_cost/configure_aws_ccm.png" alt="AWS Cloud Cost Management 구성" style="width:100%;" >}}

구성이 완료되면 아래와 같이 계정 상태가 업데이트됩니다.

{{< img src="partners/cloud_cost/complete_aws_ccm.png" alt="AWS Cloud Cost Management 완료" style="width:100%;" >}}

## 검증 {#validation}

활성화 후 비용 데이터가 Datadog으로 전송되는지 확인하세요.
1. Datadog에서 [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Cost Explorer{{< /ui >}}][9]로 이동합니다.
2. 공급자로 {{< ui >}}AWS{{< /ui >}}를 선택한 다음 {{< ui >}}Product{{< /ui >}}, {{< ui >}}Member Accoun Id{{< /ui >}} 또는 기타 차원과 같은 필터를 사용하여 데이터를 그룹화하고 검증합니다.
3. 예상 기간에 대한 비용 데이터가 표시되는지 확인합니다.


**참고:**  
CUR(Cost and Usage Report)이 생성된 후 데이터가 Datadog에 표시되기까지 **48~72시간**이 소요될 수 있습니다.  
CUR은 **시간 단위 세분성**을 사용하므로 AWS CUR 전달 시점과 Datadog 처리 시점이 실시간으로 완벽하게 일치하지 않을 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/setup/aws/
[2]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[3]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[4]: /ko/cloud_cost_management/setup/aws/?tab=manual#prerequisite-generate-a-cost-and-usage-report
[5]: /ko/getting_started/integrations/aws/#setup
[6]: https://datadog-cloudformation-template.s3.amazonaws.com/aws_cloud_cost/v0.0.5/main.yaml
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html
[8]: https://app.datadoghq.com/cost/setup
[9]: https://app.datadoghq.com/cost/explorer