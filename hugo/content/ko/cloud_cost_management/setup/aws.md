---
aliases:
- /ko/integrations/awsbilling/
- /ko/cloud_cost_management/aws/
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: /cloud_cost_management/azure
  tag: 설명서
  text: Azure 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/google_cloud
  tag: 설명서
  text: Google Cloud 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/oracle
  tag: 설명서
  text: Oracle 청구서에 대한 인사이트 확보
title: AWS
---
## 개요 {#overview}

Datadog에서 Cloud Cost Management를 설정하려면 다음이 필요합니다.
1. 청구 액세스 권한이 있는 AWS 계정
2. Datadog에 설치된 AWS 통합
3. Cost and Usage Report(아래 단계에 따라 생성)

## 설정 {#setup}

[API][21], [Terraform][22] 또는 아래 지침에 따라 Datadog에서 직접 설정할 수 있습니다.

### AWS 통합 구성 {#configure-the-aws-integration}

[Setup & Configuration][7]으로 이동하여 AWS 계정을 추가하고 AWS 통합 구성 단계를 진행합니다.

**참고**: Datadog은 관련된 **멤버 계정**에 대한 비용 가시성을 확보하기 위해 [AWS **관리 계정**][2]에서 Cost and Usage Report를 구성할 것을 권장합니다.

AWS **멤버 계정**에서 Cost and Usage Report를 전송하는 경우 **관리 계정**의 [기본 설정][3]에서 다음 옵션을 선택했는지 확인하세요.
- {{< ui >}}Linked Account Access{{< /ui >}}
- {{< ui >}}Linked Account Refunds and Credits{{< /ui >}}
- {{< ui >}}Linked Account Discounts{{< /ui >}}

이 설정은 AWS Cost Explorer에 대한 주기적 비용 계산을 허용하여 비용 정확성을 보장합니다.

{{< tabs >}}

{{% tab "CloudFormation" %}}

{{< img src="cloud_cost/setup/aws_cloudformation_setup.png" alt="CloudFormation 모드의 Cloud Cost Management 설정 양식" style="width:100%" >}}

### 생성할 리소스 선택 {#select-the-resources-to-create}

CloudFormation 스택은 기존 AWS 리소스에 따라 세 가지 방식으로 구성할 수 있습니다.

* **신규 설정**: {{< ui >}}Create Cost and Usage Report{{< /ui >}}를 선택하여 보고서와 S3 버킷을 모두 생성합니다.
* **기존 버킷**: {{< ui >}}Create Cost and Usage Report{{< /ui >}}를 선택하고 {{< ui >}}Create S3 Bucket{{< /ui >}} 선택을 해제하여 기존 S3 버킷을 사용합니다.
* **기존 보고서**: {{< ui >}}Create Cost and Usage Report{{< /ui >}} 선택을 해제하여 기존 Cost and Usage Report를 가져옵니다.

### Cost and Usage Report 설정 구성 {#configure-the-cost-and-usage-report-settings}

Cost and Usage Report에 대해 다음 정보를 입력합니다.

* {{< ui >}}Bucket Name{{< /ui >}}: 보고서 파일이 저장되는 S3 버킷 이름.
* {{< ui >}}Bucket Region{{< /ui >}}: S3 버킷이 위치한 AWS [리전 코드][100]. 예를 들어, `us-east-1`입니다.
* {{< ui >}}Export Path Prefix{{< /ui >}}: 보고서 파일이 저장되는 S3 경로 접두사.
  * **참고:** 비어 있는 값, `/`로 시작하는 값(예: `/`, `/cost`), `/`로 끝나는 값(예: `cost/`) 등의 접두사 형식은 지원되지 않습니다. 반면 중간에 `/`를 포함하는 접두사(예: `cost/hourly`)는 지원됩니다.
* {{< ui >}}Export Name{{< /ui >}}: Cost and Usage Report 이름.

**참고**:
- 이 값은 기존 Cost and Usage Report의 위치를 지정하거나 새로 생성되는 리소스의 설정을 정의합니다.
- 완전한 Cost and Usage Report가 생성된 후 Datadog 조직에 모든 데이터가 채워지기까지 48~72시간이 소요될 수 있습니다. 72시간이 지나도 데이터가 반영되지 않았다면 [Datadog 지원팀][101]에 문의하세요.

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /ko/help/

{{% /tab %}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/aws_terraform_setup.png" alt="Terraform 옵션이 선택된 CCM 설정 페이지로, 1단계가 확장되어 있으며 버킷 이름, 리전 및 내보내기 정보 등의 Cost and Usage Report 설정 항목이 표시됨" style="width:100%" >}}

### 생성할 리소스 선택 {#select-the-resources-to-create-1}

Terraform 구성은 기존 AWS 리소스에 따라 세 가지 설정 방식을 지원합니다.

* **신규 설정**: {{< ui >}}Create Cost and Usage Report{{< /ui >}}를 선택하여 보고서와 S3 버킷을 모두 생성합니다.
* **기존 버킷**: {{< ui >}}Create Cost and Usage Report{{< /ui >}}를 선택하고 {{< ui >}}Create S3 Bucket{{< /ui >}} 선택을 해제하여 기존 S3 버킷을 사용합니다.
* **기존 버킷 및 보고서**: {{< ui >}}Create Cost and Usage Report{{< /ui >}} 및 {{< ui >}}Create S3 Bucket{{< /ui >}} 선택을 해제하여 기존 보고서와 기존 S3 버킷을 사용합니다.

**참고**: 기존 버킷을 사용하는 경우 AWS가 해당 버킷에 CUR(Cost and Usage Report)을 기록할 수 있는 권한이 있는지 확인하세요. 필요한 경우 버킷 정책을 업데이트해야 할 수 있습니다.

### Cost and Usage Report 설정 구성 {#configure-the-cost-and-usage-report-settings-1}

Cost and Usage Report에 대해 다음 정보를 입력합니다.

* {{< ui >}}Bucket Name{{< /ui >}}: 보고서 파일이 저장되는 S3 버킷 이름.
* {{< ui >}}Bucket Region{{< /ui >}}: S3 버킷이 위치한 AWS [리전 코드][100]. 예를 들어, `us-east-1`입니다.
* {{< ui >}}Export Path Prefix{{< /ui >}}: 보고서 파일이 저장되는 S3 경로 접두사.
  * **참고:** 비어 있는 값, `/`로 시작하는 값(예: `/`, `/cost`), `/`로 끝나는 값(예: `cost/`) 등의 접두사 형식은 지원되지 않습니다. 반면 중간에 `/`를 포함하는 접두사(예: `cost/hourly`)는 지원됩니다.
* {{< ui >}}Export Name{{< /ui >}}: Cost and Usage Report 이름.

**참고**:
- 이 값은 기존 Cost and Usage Report의 위치를 지정하거나 새로 생성되는 리소스의 설정을 정의합니다.
- 완전한 Cost and Usage Report가 생성된 후 Datadog 조직에 모든 데이터가 채워지기까지 48~72시간이 소요될 수 있습니다. 72시간이 지나도 데이터가 반영되지 않았다면 [Datadog 지원팀][101]에 문의하세요.

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /ko/help/

### 생성된 Terraform HCL 복사 및 변경 사항 적용 {#copy-generated-terraform-hcl-and-apply-changes}

CCM Terraform 설정 UI에서 {{< ui >}}Apply Terraform Configuration{{< /ui >}} 단계의 지침을 따르세요. CCM으로 돌아가 계정 생성 여부를 확인하기 전에 `terraform plan` 또는 `terraform apply` 실행 중 발생하는 모든 문제를 해결하세요.

{{% /tab %}}

{{% tab "수동" %}}

{{< img src="cloud_cost/setup/aws_manual_setup.png" alt="수동 모드의 Cloud Cost Management 설정 양식" style="width:100%" >}}

### 전제 조건: Cost and Usage Report 생성 {#prerequisite-generate-a-cost-and-usage-report}

AWS의 {{< ui >}}Data Exports{{< /ui >}} 섹션에서 [Legacy Cost and Usage Report 생성][201]을 수행합니다.

내보내기 유형으로 {{< ui >}}Legacy CUR export{{< /ui >}}를 선택합니다.

다음 콘텐츠 옵션을 선택합니다.

* 내보내기 유형: {{< ui >}}Legacy CUR export{{< /ui >}}
* {{< ui >}}Include resource IDs{{< /ui >}}
* {{< ui >}}Split cost allocation data{{< /ui >}}(ECS 비용 할당을 활성화합니다. 또한 Cost Explorer 기본 설정에서 [AWS Split Cost Allocation][210]을 활성화해야 합니다.)
* {{< ui >}}Refresh automatically{{< /ui >}}

다음 전송 옵션을 선택합니다.

* 시간 세분화: {{< ui >}}Hourly{{< /ui >}}
* 보고서 버전 관리: {{< ui >}}Create new report version{{< /ui >}}
* 압축 유형: {{< ui >}}GZIP{{< /ui >}} 또는 {{< ui >}}Parquet{{< /ui >}}

### Cost and Usage Report 찾기 {#locate-the-cost-and-usage-report}

전제 조건 섹션에서 생성한 보고서 페이지를 벗어난 경우 AWS 설명서의 [데이터 내보내기 보기][204]를 참조하세요. 생성한 레거시 CUR 내보내기를 선택한 후 {{< ui >}}Edit{{< /ui >}}를 선택하여 내보내기 세부 정보를 확인합니다.

Datadog이 Cost and Usage Report를 찾을 수 있도록 다음 필드를 해당 정보로 입력합니다.

* {{< ui >}}Bucket Name{{< /ui >}}: 데이터 내보내기 저장 섹션에 있는 S3 버킷 이름.
* {{< ui >}}Bucket Region{{< /ui >}}: 버킷이 위치한 리전. 예를 들어, `us-east-1`입니다.
* {{< ui >}}Export Path Prefix{{< /ui >}}: 데이터 내보내기 저장 설정 섹션에 있는 S3 경로 접두사.
  * **참고:** 비어 있는 값, `/`로 시작하는 값(예: `/`, `/cost`), `/`로 끝나는 값(예: `cost/`) 등의 접두사 형식은 지원되지 않습니다. 반면 중간에 `/`를 포함하는 접두사(예: `cost/hourly`)는 지원됩니다.
* {{< ui >}}Export Name{{< /ui >}}: 내보내기 이름 섹션에 있는 내보내기 이름.

**참고**: Datadog은 AWS에서 생성한 레거시 Cost and Usage Report(CUR)만 지원합니다. AWS가 생성한 파일을 수정하거나 이동하지 마세요. 또한 제3자가 생성한 파일에 대한 액세스를 제공하려고 시도하지 마세요.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AWS Cost and Usage Reports 엔드포인트는 위 필드를 S3 버킷의 CUR 내보내기와 대조하여 검증하는 데 사용됩니다. 이 엔드포인트는 FIPS 검증을 받지 않았습니다.</div>
{{< /site-region >}}

### Cost and Usage Report 액세스 구성 {#configure-access-to-the-cost-and-usage-report}

Datadog이 CUR 및 해당 CUR이 저장된 S3 버킷에 액세스할 수 있도록 AWS에서 [정책 생성][205]을 수행합니다. 다음 JSON을 사용하세요.

{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DDCloudCostReadBucket",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME"
      },
      {
          "Sid": "DDCloudCostGetBill",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME/REPORT_PREFIX/REPORT_NAME/*"
      },
      {
          "Sid": "DDCloudCostCheckAccuracy",
          "Effect": "Allow",
          "Action": [
              "ce:Get*"
          ],
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListCURs",
          "Action": [
              "cur:DescribeReportDefinitions"
          ],
          "Effect": "Allow",
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListOrganizations",
          "Action": [
              "organizations:Describe*",
              "organizations:List*"
          ],
          "Effect": "Allow",
          "Resource": "*"
      }
  ]
}
{{< /code-block >}}

**참고**: 다음 단계에서 사용할 수 있도록 생성한 정책 이름을 기록해 두세요.

### Datadog 통합 역할에 정책 연결 {#attach-the-policy-to-the-datadog-integration-role}

새로 생성한 S3 정책을 Datadog 통합 역할에 연결합니다.

1. AWS IAM 콘솔의 {{< ui >}}Roles{{< /ui >}}로 이동합니다.
2. Datadog 통합에 사용되는 역할을 찾습니다. 기본 이름은 **DatadogIntegrationRole**이지만 조직에서 이름을 변경한 경우 다를 수 있습니다. 역할 이름을 클릭하여 역할 요약 페이지를 엽니다.
3. {{< ui >}}Attach policies{{< /ui >}}를 클릭합니다.
4. 위에서 생성한 S3 버킷 정책 이름을 입력합니다.
5. {{< ui >}}Attach policy{{< /ui >}}를 클릭합니다.

**참고**: 완전한 Cost and Usage Report가 생성된 후 Datadog 조직에 모든 사용 가능한 데이터가 채워지기까지 48~72시간이 소요될 수 있습니다. 72시간이 지나도 데이터가 반영되지 않았다면 [Datadog 지원팀][18]에 문의하세요.

[201]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[204]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[205]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[210]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}

{{< /tabs >}}

### 계정 필터링 {#account-filtering}

Account Filtering을 사용하여 Cloud Cost Management에 가져올 AWS 멤버 계정을 제어합니다. 계정을 필터링하여 제외하더라도 Datadog 비용이 추가로 발생하지는 않습니다.

Account Filtering을 사용하려면 AWS 관리 계정이 필요합니다. Cloud Cost Management에서 계정 구성이 완료된 후 계정 필터를 설정할 수 있습니다.

**참고:** Account Filtering은 태그 검색에서는 지원되지 않습니다.

#### 기존 계정에 대한 계정 필터 구성 {#configure-account-filters-for-an-existing-account}

[**Cloud Cost** > **Settings** > **Accounts**][17]로 이동한 후 필터링하려는 관리 계정의 {{< ui >}}Manage Account{{< /ui >}}를 클릭합니다.

{{< img src="cloud_cost/account_filtering/manage_account.png" alt="계정 카드의 Manage Account 버튼" style="width:100%;" >}}

{{< ui >}}Billing dataset{{< /ui >}}를 클릭하여 Account Filtering UI에 액세스합니다.

{{< img src="cloud_cost/account_filtering/account_filtering.png" alt="AWS 멤버 계정을 필터링하기 위한 Account Filtering UI" style="width:100%;" >}}

### 과거 데이터 가져오기 {#getting-historical-data}

이미 S3에 과거 데이터가 존재하는 Cost and Usage Report를 구성하는 경우 Datadog은 최대 15개월의 과거 비용 데이터를 자동으로 수집합니다.

새로 구성한 보고서에 과거 데이터가 없는 경우 AWS에 백필을 요청할 수 있습니다.

과거 AWS 비용 데이터의 백필을 요청하려면 다음을 수행하세요.

1. [AWS 지원 케이스 열기][20]를 수행하고 비용 데이터 백필을 요청합니다.
2. 요청 시 **보고서 이름**과 **원하는 청구 기간**을 포함합니다.
3. AWS가 백필 요청을 처리할 때까지 기다립니다.

AWS에서 데이터 백필을 완료하면 Datadog은 24시간 이내에 해당 데이터를 자동으로 수집합니다.

AWS는 AWS 계정 생성 이전의 비용 데이터나 이전 AWS Organizations 구조를 반영하는 비용 데이터는 백필할 수 없습니다.

자세한 내용은 [AWS Cost and Usage Reports 문제 해결 가이드][20]를 참조하세요.

## 비용 유형 {#cost-types}

기본 제공되는 비용 유형을 사용하여 수집된 데이터를 시각화할 수 있습니다. 비용 유형 간의 주요 차이점은 할인율, 절감형 플랜 및 예약을 보고하는 방식입니다.

### 온디맨드 {#on-demand}
**On-demand** 비용은 AWS가 공개한 온디맨드 요금 기준으로 사용 비용을 나타냅니다. 여기에는 절감형 플랜, 예약, 할인, 세금 및 수수료가 포함되지 않습니다.

**참고**: 대부분의 경우 온디맨드 비용은 실제 비용을 추정하는 신뢰할 수 있는 기준이 아닙니다.

### 상각 및 비혼합 비용 {#amortized-and-unblended-costs}
**Amortized** 비용 메트릭은 약정 할인을 할인 기간 전체에 걸쳐 분배합니다. 이를 _발생주의 회계_라고도 합니다. 예약 및 절감형 플랜은 월간 약정 금액에서 차감되어 사용 시점에 해당 사용량에 직접 적용됩니다. 사용하지 않은 잔액은 수수료로 표시됩니다.

반면 **Unblended** 비용 메트릭은 모든 비용을 실제 발생일 기준으로 표시합니다. 이를 _현금주의 회계_라고도 합니다. 예약 및 절감형 플랜 수수료는 청구된 날짜에 표시되며, 해당 사용량에 직접 적용되지 않습니다. 한 달의 청구 데이터가 확정되면 Unblended 메트릭은 AWS 청구서와 정확히 일치합니다.

### 순비용 {#net-costs}
**Net** 비용은 비공개 할인을 사용량에 직접 적용합니다. 특정 리소스의 사용 비용은 모든 할인 혜택이 반영된 실제 비용을 나타냅니다.

반면 다른 메트릭은 비공개 할인을 리소스 할당 태그가 없는 음수 금액의 별도 항목으로 표시합니다. 이러한 메트릭은 할인을 사용량에 직접 할당하는 대신 총비용에서 차감합니다.

**Net Amortized** 비용은 모든 할인 혜택이 사용량에 직접 적용되므로 비용 할당을 가장 정확하게 표현합니다. 순비용 메트릭은 AWS 계정에 개별 협상된 기업 할인이 있는 경우 사용할 수 있습니다. 계정에 기업 할인이 없는 경우 **Net Amortized** 비용과 **Amortized** 비용은 동일합니다.

### 컨테이너 할당 {#container-allocation}
**Container Allocation** 메트릭은 AWS 비용 메트릭과 동일한 비용을 포함하지만 컨테이너 워크로드에 대한 추가 분석 및 인사이트를 제공합니다. 자세한 내용은 [컨테이너 비용 할당][11]을 참조하세요.

### 예시 {#example}
다음 시나리오는 각 비용 유형이 어떻게 동작하는지 보여줍니다. 가정:
- 시간당 컴퓨팅 비용이 $3인 EC2 인스턴스를 1시간 실행
- 해당 인스턴스 유형을 시간당 $2로 제공하는 절감형 플랜 보유
- 모든 할인 위에 추가로 적용되는 10%의 EDP 할인

각 비용 유형에서 인스턴스 비용, 절감형 플랜 시간당 약정 금액 및 할인은 다음과 같이 표시됩니다.

|비용 유형 |사용량 |절감형 플랜 |할인 | 설명 |
|:---------|-|-|-|:------------------------------------------------|
|On Demand |$3.00|||AWS 공개 온디맨드 요금입니다.|
|Unblended |$3.00|$2.00|-$0.20 |절감형 플랜 반복 수수료와 EDP 할인은 특정 리소스와 연결되지 않은 별도 항목으로 표시됩니다. (**참고:** $3의 리소스 비용은 `SavingsPlanNegation`으로 상쇄됩니다.) |
|Net Unblended ||$1.80||절감형 플랜 반복 수수료가 할인이 적용된 항목으로 표시되며 비용은 특정 리소스와 연결되지 않습니다.|
|Amortized |$2.00||-$0.20|절감형 플랜 할인이 리소스 비용에 직접 적용됩니다. EDP 할인은 별도 항목으로 표시됩니다. |
|Net Amortized |$1.80|||절감형 플랜 및 EDP 할인이 모두 리소스 비용에 직접 적용됩니다. |
|Net Amortized - Shared Resources Allocated |$1.80 |||Net Amortized와 동일한 비용이지만 Kubernetes 차원 및 포드 태그 기준으로 추가 세분화가 가능합니다. |

### 비용 메트릭 요약 {#cost-metrics-summary}

일반적으로 다음과 같습니다.
- `aws.cost.net.amortized.shared.resources.allocated` 특정 워크로드 및 팀에 대해 가장 완전한 비용 할당 정보를 제공합니다.
- 컨테이너 비용 할당을 사용하지 않는 경우 `aws.cost.net.amortized`를 사용하세요.
- Net Amortized 비용을 사용할 수 없는 경우 `aws.cost.amortized.shared.resources.allocated` 또는 `aws.cost.amortized`를 사용하세요.

| 메트릭               | 설명           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | 모든 AWS Net Amortized 비용과 함께 컨테이너 워크로드에 대한 추가 분석 및 인사이트를 제공합니다. [컨테이너 비용 할당][11]이 필요합니다.|
| `aws.cost.net.amortized` | 컨테이너 비용 분석이 포함되지 않은 Net Amortized 비용입니다. |
| `aws.cost.net.unblended` | 컨테이너 비용 분석이 포함되지 않은 Net Unblended 비용입니다. AWS 청구서와 일치하며, 특수 할인은 사용 비용에 미리 계산되어 반영됩니다. |
| `aws.cost.amortized.shared.resources.allocated` | 모든 AWS Amortized 비용과 함께 컨테이너 워크로드에 대한 추가 분석 및 인사이트를 제공합니다. [컨테이너 비용 할당][11]이 필요합니다.|
| `aws.cost.amortized` | 컨테이너 비용 분석이 포함되지 않은 Amortized 비용입니다. |
| `aws.cost.unblended` | 컨테이너 비용 분석이 포함되지 않은 Unblended 비용입니다. AWS 청구서와 일치합니다. |
| `aws.cost.ondemand`  | 절감형 플랜, 예약, 할인, 세금 및 수수료를 모두 제외하고 AWS가 제공하는 정가를 기준으로 계산된 비용입니다. |

## Datadog이 AWS 비용 데이터를 태그로 보강하는 방법 {#how-datadog-enriches-your-aws-cost-data-with-tags}

Datadog은 여러 소스의 태그를 사용하여 AWS 비용 데이터를 자동으로 보강합니다. 비용 데이터에 태그가 적용되는 방식에 대한 자세한 내용은 [Tags][19] 설명서를 참조하세요.

AWS에 대해 다음 태그 소스를 사용할 수 있습니다.

- Cost and Usage Report 열
- AWS 리소스 태그
- AWS 계정 태그
- AWS 통합 태그
- 기본 제공 태그
- 컨테이너 워크로드 태그
- 태그 파이프라인

### Cost and Usage Report 열 {#cost-and-usage-report-columns}

AWS [Cost and Usage Report(CUR)][6]의 모든 문자열 값 열은 비용 메트릭의 태그로 추가됩니다.

일관성을 유지하기 위해 Datadog은 밑줄과 소문자를 사용하여 태그 키를 정규화합니다. 예를 들어 CUR 열 `lineItem/ResourceId`는 태그 키 `line_item/resource_id`로 매핑됩니다. 태그 값은 일반적으로 수정되지 않으며, 원래의 대소문자와 대부분의 특수 문자가 그대로 유지됩니다.

**예시:**

|CUR 열|CUR 값|Cloud Cost 태그|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

### AWS 리소스 태그 {#aws-resource-tags}

[AWS 리소스 태그][12]는 EC2 인스턴스나 S3 버킷과 같은 특정 리소스를 AWS 콘솔에서 조회할 때 표시되는 사용자 정의 태그입니다.

Datadog AWS 통합을 활성화하면 Datadog은 대부분의 AWS 리소스에 대한 리소스 태그를 자동으로 수집합니다. 이 태그는 해당 리소스에 대한 CUR 내 모든 비용에 적용됩니다. 리소스 태그는 정기적으로 수집되며, 생성 또는 수정된 날짜부터 비용 데이터에 적용됩니다. 태그가 변경되더라도 과거 태그 값은 덮어쓰이지 않습니다.

AWS 통합이 활성화되지 않은 경우 AWS 청구에서 [비용 할당 태그][13]를 활성화하여 리소스 태그 보강 기능을 사용할 수 있습니다. 이를 통해 특정 리소스 태그 키를 AWS CUR 열로 포함하도록 선택할 수 있습니다. Datadog은 CUR 처리 시 이러한 열을 자동으로 태그로 포함합니다.

### AWS 조직 및 계정 태그 {#aws-organization-and-account-tags}
AWS Organizations는 조직 단위 및 계정에 대한 [사용자 정의 태그][14]를 지원합니다. Datadog은 이러한 태그를 자동으로 가져와 비용 데이터에 적용합니다. 계정 태그는 해당 계정과 관련된 모든 사용량에 적용됩니다. 조직 태그는 일치하는 지불 계정의 모든 청구 데이터에 적용됩니다.

_조직 계정에 Datadog AWS Integration이 구성되어 있어야 합니다._

### AWS 통합 태그 {#aws-integration-tags}

AWS 통합 태그는 Datadog Integrations 페이지의 AWS Integration 타일에 설정된 태그입니다. 이 태그는 연결된 AWS 계정의 CUR에 포함된 모든 비용에 적용됩니다.

### 기본 제공 태그 {#out-of-the-box-tags}
Datadog은 수집된 비용 데이터를 더욱 세분화하고 비용을 할당할 수 있도록 기본 제공 태그를 추가합니다. 이 태그는 [Cost and Usage Report(CUR)][6]에서 파생되며, 이를 통해 비용 데이터를 보다 쉽게 탐색하고 이해할 수 있습니다.

다음 기본 제공 태그를 사용하여 데이터를 필터링하거나 그룹화할 수 있습니다.

| 태그                          | 설명       |
| ---------------------------- | ----------------- |
| `aws_product`                | 청구되는 AWS 서비스입니다.|
| `aws_product_family`         | 청구되는 AWS 서비스의 범주(예: Compute, Storage)입니다.|
| `aws_management_account_name`| 항목과 연결된 AWS 관리 계정 이름입니다.|
| `aws_management_account_id`  | 항목과 연결된 AWS 관리 계정 ID입니다.|
| `aws_member_account_name`    | 항목과 연결된 AWS 멤버 계정 이름입니다.|
| `aws_member_account_id`      | 항목과 연결된 AWS 멤버 계정 ID입니다.|
| `aws_cost_type`              | 해당 항목에 적용되는 비용 유형(예: Usage, Tax)입니다.|
| `aws_pricing_term`           | 사용량이 Reserved, Spot 또는 On-Demand인지 여부입니다.|
| `aws_reservation_arn`        | 해당 항목이 혜택을 받은 Reserved Instance의 ARN입니다.|
| `aws_savings_plan_arn`       | 해당 항목이 혜택을 받은 Savings Plan의 ARN입니다.|
| `aws_usage_type`             | 항목의 사용 세부 정보(예: BoxUsage:i3.8xlarge)입니다.|
| `aws_operation`              | 항목과 관련된 작업(예: RunInstances)입니다.|
| `aws_region`                 | 항목과 연결된 리전(예: us-east-1)입니다.|
| `aws_availability_zone`      | 항목과 연결된 가용 영역입니다.|
| `aws_resource_id`            | 항목과 연결된 리소스 ID입니다.|
| `aws_instance_type`          | 항목의 인스턴스 유형입니다.|
| `aws_instance_family`        | 항목과 연결된 인스턴스 패밀리(예: Storage Optimized)입니다.|
| `aws_datatransfer_type`      | 항목과 관련된 데이터 전송 유형(예: Cross-Zone, Cross-Region)입니다.|
| `aws_datatransfer_direction` | 항목과 관련된 데이터 전송 방향(예: In, Out)입니다.|
| `is_aws_ec2_compute`         | 사용량이 EC2 컴퓨팅과 관련되어 있는지 여부입니다.|
| `is_aws_ec2_compute_on_demand`| 사용량이 On-Demand인지 여부입니다.|
| `is_aws_ec2_compute_reservation`| 사용량이 Reserved Instance와 관련되어 있는지 여부입니다.|
| `is_aws_ec2_capacity_reservation`| 사용량이 Capacity Reservation과 관련되어 있는지 여부입니다.|
| `is_aws_ec2_spot_instance`   | 사용량이 Spot Instance와 관련되어 있는지 여부입니다.|
| `is_aws_ec2_savings_plan`    | 사용량이 Savings Plan과 관련되어 있는지 여부입니다.|
| `aws_bill_entity` | 계정이 거래하는 AWS 판매자입니다. 거래는 AWS Marketplace 구매(`AWS Marketplace`) 또는 기타 AWS 서비스 구매(`AWS`)일 수 있습니다. |
| `aws_bill_type` | 이 보고서가 다루는 청구서 유형(예: `Purchase`)입니다. |
| `aws_cost_type` | 라인 항목에 적용되는 비용 유형(예: `SavingsPlanCoveredUsage`)입니다. |
| `aws_discount_lease_term` | Reserved Instance가 예약된 기간입니다. |
| `aws_discount_purchase_option` | 예약 비용에 대한 지불 방식(예: `All Upfront`)입니다. |
| `aws_ec2_compute_product_family` | EC2 Compute 라인 항목에 대한 사용 유형(예: `BoxUsage`, `SpotUsage`)입니다. |
| `aws_pricing_usage_unit` | AWS가 사용 비용 계산에 사용한 가격 단위(예: `Hours`)입니다. |
| `aws_reservation_modification_status` | RI 리스가 수정되었는지 또는 변경되지 않았는지 나타냅니다(예: `Manual`). |
| `bill/billing_entity` | 계정이 거래하는 AWS 판매자입니다. 거래는 AWS Marketplace 구매(`AWS Marketplace`) 또는 기타 AWS 서비스 구매(`AWS`)일 수 있습니다. |
| `bill/bill_type` | 이 보고서가 다루는 청구서 유형(예: `Purchase`)입니다. |
| `bill/invoicing_entity` | 송장을 발행하는 AWS 법인입니다. |
| `bill/payer_account_id` | 요금을 지불하는 계정의 계정 ID입니다. AWS Organizations 환경에서는 관리 계정의 계정 ID입니다. |
| `is_aws_ec2_compute_savings_plan` | `true`Savings Plan을 사용하여 비용이 지불되는 EC2 Compute 사용량 라인 항목에 대한 값입니다. |
| `line_item/currency_code` | 이 라인 항목에 표시되는 통화(기본값은 `USD`)입니다. |
| `line_item/legal_entity` | AWS 서비스 공급자입니다. |
| `line_item/line_item_type` | 라인 항목에 적용되는 비용 유형(예: `Credit`)입니다. |
| `line_item/operation` | 라인 항목에 적용되는 특정 AWS 작업(예: `RunInstances`)입니다. |
| `line_item/product_code` | 측정된 제품의 코드(예: Amazon Elastic Cloud Compute의 경우 `Amazon EC2`)입니다. |
| `line_item/resource_id` | 라인 항목과 연결된 개별 리소스 ID(선택 사항)입니다. |
| `line_item/tax_type` | AWS가 라인 항목에 적용한 세금 유형입니다. |
| `line_item/usage_account_id` | 해당 라인 항목을 사용한 계정의 ID입니다. |
| `line_item/usage_type` | 라인 항목의 사용 세부 정보(예: `USW2-BoxUsage:m2.2xlarge`)입니다. |
| `pricing/lease_contract_length` | RI가 예약된 기간입니다. |
| `pricing/purchase_option` | 라인 항목 비용에 대한 지불 방식(예: `All Upfront`)입니다. |
| `pricing/term` | AWS 사용량이 `Reserved`인지 또는 `On-Demand`인지 여부입니다. |
| `pricing/unit` | AWS가 사용 비용 계산에 사용한 가격 단위(예: `Hours`)입니다. |
| `reservation/availability_zone` | 라인 항목과 연결된 리소스의 가용 영역(예: `us-east-1`)입니다. |
| `reservation/modification_status` | RI 리스가 수정되었는지 또는 변경되지 않았는지 여부를 표시합니다(예: `Manual`). |
| `reservation/reservation_arn` | 해당 라인 항목이 혜택을 받은 RI의 ARN입니다. |
| `reservation/subscription_id` | 라인 항목을 관련 오퍼와 매핑하는 고유 ID입니다. |
| `savings_plan/instance_type_family` | 지정된 사용량과 연결된 인스턴스 패밀리입니다(예: `m4`). |
| `savings_plan/offering_type` | 구매한 Savings Plan 유형입니다(예: `ComputeSavingsPlans`). |
| `savings_plan/payment_option` | Savings Plan에서 사용할 수 있는 결제 옵션입니다(예: `All Upfront`). |
| `savings_plan/purchase_term` | Savings Plan의 기간 또는 약정 기간을 설명합니다(예: `1yr`). |
| `savings_plan/region` | AWS 서비스를 호스팅하는 AWS 리전입니다(예: `US East (N. Virginia)`). |
| `savings_plan/savings_plan_arn` | 고유한 Savings Plan 식별자입니다. |

#### 비용 및 관측성 상관 분석 {#cost-and-observability-correlation}

비용을 관측성 데이터와 함께 확인하는 것은 인프라 변경이 비용에 미치는 영향을 이해하고, 비용 변동 원인을 파악하며, 비용과 성능을 모두 최적화하는 데 중요합니다. Datadog은 비용 메트릭과 관측성 메트릭을 쉽게 연관 분석할 수 있도록 주요 AWS 서비스의 비용 데이터에 리소스 식별 태그를 자동으로 추가합니다.

예를 들어 각 RDS 데이터베이스의 비용과 사용률을 확인하려면 `aws.cost.amortized`, `aws.rds.cpuutilization`, `aws.rds.freeable_memory`(또는 다른 RDS 메트릭)를 포함한 테이블을 만들고 `dbinstanceidentifier` 기준으로 그룹화할 수 있습니다. Lambda 사용량과 비용을 나란히 확인하려면 `aws.lambda.concurrent_executions`와 `aws.cost.amortized`를 `functionname` 기준으로 그룹화하여 그래프로 표시할 수 있습니다.

다음 기본 제공 태그를 사용할 수 있습니다.

| AWS 제품                  | 태그       |
| ---------------------------- | ----------------- |
| ec2                | `instance_id`|
| s3         | `bucketname`|
| rds         | `dbinstanceidentifier`|
| lambda         | `functionname`|
| dynamodb         | `tablename`|
| elasticache      | `cacheclusterid`|
| CloudFront(배포) | `distributionid`|
| CloudFront(함수) | `functionname`|
| ec2 natgateway | `natgatewayid`|
| redshift         | `clusteridentifier`|
| kinesis         | `streamname`|
| queue         | `queuename`|
| sns         | `topicname`|
| ELB(애플리케이션, 게이트웨이, 네트워크) | `loadbalancer`|
| ELB(기타 모든 비용) | `loadbalancername` |

### 컨테이너 오케스트레이터 {#container-orchestrators}

컨테이너 비용 할당은 비용을 발생시키는 워크로드의 태그를 추가합니다. 예를 들어 Kubernetes Pod 및 노드의 태그, ECS 작업 및 컨테이너의 태그가 포함됩니다.

_[컨테이너 비용 할당][11]이 필요하며 `shared.resources.allocated` 메트릭에만 적용됩니다._

### 태그 파이프라인 {#tag-pipelines}

마지막으로 모든 [태그 파이프라인][15] 규칙 세트가 적용되어 인프라 태깅이 불가능한 경우에도 완전한 비용 할당이 가능합니다. 태그 파이프라인은 최종 보강 계층으로 작동하며 비용 데이터에 새로운 태그를 추가합니다.

## Billing Conductor {#billing-conductor}
[AWS Billing Conductor][16]는 AWS Marketplace 채널 파트너 및 차지백 요구 사항이 있는 조직을 위한 사용자 지정 청구 서비스입니다.
Billing Conductor를 사용하면 고객 또는 계정 소유자와 공유할 수 있는 견적(pro forma) 형태의 두 번째 비용 데이터 버전을 생성할 수 있습니다.
청구 요율, 크레딧 및 수수료, 간접비를 자유롭게 사용자 지정할 수 있습니다. 또한 CUR에 포함할 계정을 선택할 수 있습니다.

**중요한 제한 사항**:
- 견적 형태의 Cost and Usage Report에는 할인 및 세금이 포함되지 않으므로 Datadog의 비용 데이터를 AWS Cost Explorer와 비교하기 어렵습니다.
- 계정을 청구 그룹에 추가하면 Reservations 및 Savings Plans가 AWS 계정 간에 공유되는 방식에 영향을 줍니다.

Billing Conductor CUR를 생성하려면 [AWS Cost and Usage Reports 사용자 가이드][8]를 참조하세요. CUR이 [Datadog의 요구 사항][9]을 충족하는지 확인하세요.
Billing Conductor CUR를 생성한 후에는 위의 Cloud Cost Management 지침에 따라 Datadog에 설정하세요.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[7]: https://app.datadoghq.com/cost/setup
[8]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[9]: /ko/cloud_cost_management/setup/aws/#prerequisite-generate-a-cost-and-usage-report
[10]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[11]: /ko/cloud_cost_management/container_cost_allocation/#applying-tags
[12]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[13]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
[14]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html
[15]: /ko/cloud_cost_management/allocation/tag_pipelines
[16]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[17]: https://app.datadoghq.com/cost/settings/accounts
[18]: /ko/help/
[19]: /ko/cloud_cost_management/tags
[20]: https://docs.aws.amazon.com/cur/latest/userguide/troubleshooting.html#backfill-data
[21]: /ko/api/latest/cloud-cost-management/#create-cloud-cost-management-aws-cur-config
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/aws_cur_config