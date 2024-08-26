---
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: 클라우드 비용 관리
- link: /cloud_cost_management/azure
  tag: 설명서
  text: Azure 청구서에 대한 인사이트 얻기
- link: /cloud_cost_management/google_cloud
  tag: 설명서
  text: Google Cloud 청구서에 대한 인사이트 얻기
title: AWS
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">이 사이트에서는 클라우드 비용 관리가 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

Datadog에서 Cloud Cost Management를 설정하려면:
1. 빌링 액세스 권한이 있는 AWS 계정을 보유해야 합니다.
2. Datadog에 AWS 통합이 설치되어 있어야 합니다.
3. 비용 및 사용량 보고서를 생성하려면 아래 단계를 따르세요.

## 설정

### 필수 요소: 비용 및 사용량 보고서 생성

AWS의 **Legacy Pages** 섹션 아래 [비용 및 사용량 보고서를 생성하세요][1]. 현재 비용 및 사용량 보고서 데이터 내보내기 생성이 지원되지 않습니다.

다음 콘텐츠 옵션을 선택하세요.

* **리소스 ID 포함**
* **분할 비용 할당 데이터** (ECS 비용 할당을 활성화합니다. 비용 탐색기 기본 설정에서 [AWS 분할 비용 할당][10]을 선택해야 합니다).
* **"자동으로 새로 고침"**

다음 전송 옵션을 선택합니다:

* 시간 세분화: **시간당**
* 보고서 버전 관리: **새 보고서 버전 만들기**
* 압축 유형: **GZIP** 또는 **Parquet**
* 형식: `text/csv` 또는 `Parquet`

### AWS 통합 설정

[Setup & Configuration][7]으로 이동한 후 드롭다운 메뉴에서 AWS 계정을 선택하여 비용을 가져옵니다.

**참고**: Datadog은 관련 **멤버 계정**에 대한 비용 가시성을 위해 [AWS **관리 계정**][2]에서 비용 및 사용량 보고서를 전송하는 것을 권장합니다. AWS **멤버 계정**에서 비용 및 사용량 보고서를 전송하는 경우, **관리 계정의** [기본설정][3]에서 다음 옵션을 선택했는지 확인하세요:

* **연결된 계정 액세스**
* **연결된 계정 환불 및 크레딧**
* **연결된 계정 할인**

이를 통해 AWS Cost Explorer에 대한 주기적인 비용 계산이 가능해 정확하게 비용을 산출할 수 있습니다.

### 비용 및 사용량 보고서 찾기

설정 필수 요소 섹션에서 생성한 보고서에서 벗어난 경우 AWS 설명서에 따라 [비용 및 사용량 보고서 세부 정보 보기][4]를 찾으세요.

Datadog이 비용 및 사용량 보고서를 찾을 수 있도록 해당 세부 정보가 포함된 필드를 작성합니다:

* **Region**: 버킷이 있는 리전입니다. (예: `us-east-1`)
* **Bucket Name**: CUR이 저장되어 있는 s3 버킷의 이름입니다.
* **Report path prefix**: 폴더명입니다. AWS 상세 페이지에서 **Report path prefix**가 보이면 이는 경로의 첫 번째 섹션입니다. 예를 들어, **Report path prefix**가 `cur-report-dir/cost-report`로 표시되면 `cur-report-dir`를 입력합니다.
* **보고서 이름**: 필수 요소 섹션에서 보고서를 생성할 때 입력한 이름입니다. AWS 상세페이지에서 **Report path prefix**가 보이면 경로의 후반부입니다. 예를 들어, **Report path prefix**가 `cur-report-dir/cost-report`로 표시되면 `cost-report`를 입력합니다.

**참고**: Datadog은 AWS에서 생성된 CUR만 지원합니다. AWS에서 생성된 파일을 수정하거나 이동해서는 안되며, 제3자가 생성한 파일에 대한 액세스를 제공해서도 안됩니다.

### 비용 및 사용량 보고서에 대한 액세스 설정

다음 JSON과 함께 [정책을 생성][5]하여 Datadog이 CUR 및 CUR이 저장된 s3 버킷에 액세스할 수 있도록 AWS를 설정합니다:

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

**참고:** 다음 단계를 위해 이 정책에 대해 만든 이름을 기록해 두세요.

### 정책을 Datadog 통합 역할에 연결

새 S3 정책을 Datadog 통합 역할에 연결합니다.

1. AWS IAM 콘솔에서 **Roles**로 이동합니다.
2. Datadog 통합에서 사용하는 역할을 찾습니다. 기본적으로 이름은 **DatadogIntegrationRole**이지만 조직에서 이름을 변경한 경우 이름이 달라질 수 있습니다. 역할 이름을 클릭하여 역할 요약 페이지를 엽니다.
3. **Attach policies**를 클릭합니다.
4. 위에 생성된 S3 버킷 정책의 이름을 입력합니다.
5. **Attach policy**를 클릭합니다.

**참고:** Datadog에서 데이터가 안정화되려면 설정 후 최대 48시간에서 72시간이 소요될 수 있습니다..

### 비용 유형

다음과 같은 비용 유형을 사용하여 수집된 데이터를 시각화할 수 있습니다:

| 비용 유형            | 설명           |
| -------------------- | --------------------- |
| `aws.cost.amortized` | 적용된 할인율과 할인 기간 동안 사용량에 따른 선불 분배를 기준으로 한 비용입니다(발생 기준). |
| `aws.cost.unblended` | 이용 시 청구 금액으로 표시되는 비용입니다(현금 기준).|
| `aws.cost.blended`   | 조직의 멤버 계정 전체에서 사용 유형에 대해 지불된 평균 요율을 기준으로 한 비용입니다.|
| `aws.cost.ondemand`  | AWS에서 제공하는목록 비율을 기준으로 한 비용입니다. |

### 태그 보강

Datadog은 수집된 비용 데이터에 기본 태그를 추가하여 비용을 추가로 분류하고 할당하는 데 도움을 줍니다. 이러한 태그는 [CUR(비용 및 사용량 보고서)][6]에서 가져온 것입니다.

다음 즉시 사용 가능한 태그는 데이터를 필터링하고 그룹화하는 데 사용할 수 있습니다:

| 태그                          | 설명       |
| ---------------------------- | ----------------- |
| `aws_product`                | 청구되는 AWS 서비스.|
| `aws_product_family`         | 청구되는 AWS 서비스의 카테고리(예: 컴퓨팅 또는 스토리지).|
| `aws_management_account_name`| 아이템과 연결된 AWS 관리 계정 이름.|
| `aws_management_account_id`  | 아이템과 연결된 AWS 관리 계정 ID.|
| `aws_member_account_name`    | 아이템과 연결된 AWS 멤버 계정 이름.|
| `aws_member_account_id`      | 아이템과 연결된 AWS 멤버 계정 ID.|
| `aws_cost_type`              | 이 항목에 적용되는 요금 유형(예: 사용량 또는 세금).|
| `aws_pricing_term`           | 사용량이 예약, 스팟, 또는 온디맨드인지 여부.|
| `aws_reservation_arn`        | 아이템이 혜택을 받은 예약 인스턴스의 ARN.|
| `aws_savings_plan_arn`       | 아이템이 혜택을 받은 세이빙 플랜의 ARN.|
| `aws_usage_type`             | 아이템의 사용량 세부 정보(예: BoxUsage:i3.8xlarge).|
| `aws_operation`              | 아이템과 연결된 작업(예: RunInstances).|
| `aws_region`                 | 아이템과 연결된 리전.|
| `aws_availability_zone`      | 아이템과 연결된 가용 영역.|
| `aws_resource_id`            | 아이템과 연결된 리소스 ID |
| `aws_instance_type`          | 아이템과 연결된 인스턴스 유형.|
| `aws_instance_family`        | 아이템과 연결된 인스턴스 패밀리(예: 최적화된 스토리지).|
| `is_aws_ec2_compute`         | 사용량이 EC2 컴퓨팅과 관련이 있는지 여부.|
| `is_aws_ec2_compute_on_demand`| 사용량이 온디맨드인지 여부.|
| `is_aws_ec2_compute_reservation`| 사용량이 예약 인스턴스와 연결되어 있는지 여부.|
| `is_aws_ec2_capacity_reservation`| 사용량이 용량 예약과 연결되어 있는지 여부.|
| `is_aws_ec2_spot_instance`   | 사용량이 스팟 인스턴스와 연결되어 있는지 여부.|
| `is_aws_ec2_savings_plan`    | 사용량이 세이빙 플랜과 연결되어 있는지 여부입니다.|

### 비용과 통합 가시성의 상관 관계
인프라스트럭처 변경이 비용에 미치는 영향을 이해하고, 비용이 변하는 이유를 파악하며, 비용과 성능 모두를 위해 인프라스트럭처를 최적화하려면 통합 가시성 데이터의 맥락에서 비용을 보는 것이 중요합니다. Datadog은 상위 AWS 제품의 비용 데이터에 대한 리소스 식별 태그를 업데이트하여 통합 가시성과 비용 메트릭의 상관 관계를 간소화합니다.

예를 들어, 각 RDS 데이터베이스의 비용 및 활용도를 보려면 `aws.cost.amortized`, `aws.rds.cpuutilization` 및  `aws.rds.freeable_memory` (또는 다른 RDS 메트릭)을 사용하여 표를 만들고 `dbinstanceidentifier`별로 그룹화할 수 있습니다. 또는 Lambda 사용량과 비용을 나란히 보려면 `functionname`별로 그룹화된 `aws.cost.amortized` 및 `aws.lambda.concurrent_executions`를 그래프로 작성할 수 있습니다.

다음과 같은 기본 태그를 사용할 수 있습니다.
| AWS 제품                  | 태그       |
| ---------------------------- | ----------------- |
| ec2                | `instance_id`|
| s3         | `bucketname`|
| rds         | `dbinstanceidentifier`|
| lambda         | `functionname`|
| dynamodb         | `tablename`|
| elasticache      | `cacheclusterid`|
| cloudfront (distribution)  | `distributionid`|
| cloudfront (function)  | `functionname`|
| ec2 natgateway | `natgatewayid`|
| redshift         | `clusteridentifier`|
| kinesis         | `streamname`|
| queue         | `queuename`|
| sns         | `topicname`|
| elb (application, gateway, network) | `loadbalancer`|
| elb (all other costs) | `loadbalancername` |

컨테이너화된 환경에 대한 태그는 [컨테이너 비용 할당][11]을 참조하세요.


## 빌링 담당자
빌링 담당자는 청구 요율을 지정하고, 크레딧과 수수료를 분배하며, 재량에 따라 간접 비용을 공유하여 청구서를 간소화할 수 있습니다. 또한 CUR에 포함할 계정을 선택할 수도 있습니다.

빌링 담당자 CUR을 작성하려면 [AWS 비용 및 사용량 보고서 사용자 가이드][8]를 참고하세요. CUR이 [Datadog의 요구 사항][9]을 충족하는지 확인합니다.
빌링 담당자 CUR이 생성된 후 위의 클라우드 비용 관리 지침에 따라 Datadog에서 설정하세요.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/view-cur.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[7]: https://app.datadoghq.com/cost/setup
[8]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[9]: https://docs.datadoghq.com/ko/cloud_cost_management/?tab=aws#prerequisite-generate-a-cost-and-usage-report
[10]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[11]: https://docs.datadoghq.com/ko/cloud_cost_management/container_cost_allocation/#tags