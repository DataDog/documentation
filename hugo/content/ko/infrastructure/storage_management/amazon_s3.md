---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: 블로그
  text: 대규모 환경에서 Storage Monitoring으로 클라우드 스토리지 최적화 및 문제 해결
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: 블로그
  text: Datadog Storage Monitoring으로 클라우드 스토리지 비용을 절감하고 운영 효율성을 향상시키기
title: Amazon S3용 Storage Management
---
## 설정 {#setup}

다음 방법 중 하나를 사용하여 Amazon S3용 Storage Management를 설정합니다.

- **CloudFormation**: AWS 통합 구성, 선택한 버킷에 대한 S3 Inventory 활성화 및 선택적으로 S3 액세스 로그 활성화를 수행하는 제품 내 안내형 설정입니다. CloudFormation 스택이 AWS 계정에 변경 사항을 적용합니다.
- **Terraform**: 공식 Datadog Storage Management Terraform 모듈을 사용하여 코드 형태로 인벤토리 및 액세스 로그를 구성합니다.
- **수동**: AWS 콘솔에서 직접 S3 Inventory 및 필요한 권한을 설정한 후 Storage Management에 인벤토리 대상 위치를 등록합니다.

{{< tabs >}}
{{% tab "CloudFormation" %}}

제품 내 설정은 AWS 계정 구성, 버킷 선택 및 S3 Inventory/액세스 로그 활성화, 설정 완료의 세 단계로 진행됩니다. CloudFormation 스택이 AWS 계정에 필요한 변경 사항을 적용합니다.

시작하려면 **Infrastructure** > [**Storage Management**][1]로 이동한 후 **Storage Management 사용해 보기**를 클릭합니다.

[1]: https://app.datadoghq.com/storage-management

{{% collapse-content title="1. AWS 계정 구성" level="h4" expanded=false id="datadog-ui-step1" %}}

이 단계에서는 메트릭 수집 및 리소스 수집이 활성화된 Datadog AWS 통합을 설정합니다.

1. Datadog과 이미 통합된 **기존 AWS 계정**을 사용할지, 또는 **새 계정 추가**를 수행할지 선택합니다.
   - 새 계정의 경우 CloudFormation 스택이 Datadog 통합 역할을 생성하고 메트릭 수집 및 리소스 수집을 모두 구성합니다.
   - 기존 계정의 경우 **메트릭 수집** 및 **리소스 수집**이 활성화되어 있는지 확인합니다. Storage Management는 리소스 수집을 사용하여 S3 버킷 및 기존 인벤토리 구성을 검색합니다.
2. 구성할 AWS 리전을 선택합니다. 한 번에 하나의 리전만 구성되므로 추가 리전에 대해서는 이 단계를 반복해야 합니다.

리소스 수집에서 사용하는 S3 관련 권한 목록은 AWS 통합 페이지의 [리소스 수집][2]을 참조하세요.

[2]: /ko/integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. Storage Management 구성" level="h4" expanded=false id="datadog-ui-step2" %}}

이 단계에서는 모니터링할 버킷을 선택하고 인벤토리 대상 위치를 설정하며 선택적으로 액세스 로그를 활성화합니다.

<div class="alert alert-info">
    - 소스 버킷: Storage Management로 모니터링할 S3 버킷. <br>
    - 대상 버킷: 인벤토리 보고서를 저장하는 버킷(AWS 리전당 하나이며 계정 간 재사용 가능).
</div>

1. **버킷 선택**: Storage Management로 모니터링할 S3 버킷을 선택합니다. 이미 Storage Management가 활성화된 버킷은 표시되지 않습니다. 기존 S3 Inventory가 있는 버킷은 미리 선택되며 현재 대상 위치가 유지됩니다.

2. **인벤토리 대상 버킷 설정**: 기존 인벤토리 구성이 없는 버킷의 경우 일일 인벤토리 보고서가 전달될 대상 버킷을 선택합니다. 기존 버킷을 선택하거나 새 버킷을 지정할 수 있습니다. Datadog은 인벤토리 파일을 `datadog-inventories` 접두사 아래에 기록합니다.

   **참고**: Storage Management는 CSV 인벤토리 형식을 요구합니다. CloudFormation 스택이 이를 자동으로 구성합니다.

3. **S3 액세스 로그 활성화(선택 사항)**: 액세스 로그는 콜드 데이터 패턴, 비정상적인 액세스 및 스토리지 계층 적정 규모 조정 기회를 제공합니다. **S3 액세스 로그 활성화**를 켠 후 다음을 수행합니다.

   - 액세스 로그용 대상 버킷을 선택합니다. 인벤토리 대상 버킷과 동일한 버킷을 사용할 수 있습니다.
   - 계정에서 Datadog Log Forwarder가 감지되면 이를 재사용합니다. 그렇지 않으면 CloudFormation 스택이 새 포워더를 배포합니다.
   - Storage Management 용도로만 사용하는 경우 전달된 액세스 로그는 인덱싱 없이 수집할 수 있습니다. 자세한 내용은 [제외 필터][3]를 참조하세요.

   <div class="alert alert-warning">S3 액세스 로그를 Datadog으로 전달하면 Log Management 수집 비용이 발생합니다. 비용을 최소화하려면 Storage Management 용도로만 사용하는 경우 로그가 수집되지만 인덱싱되지는 않도록 제외 필터를 사용합니다. 자세한 내용은 <a href="https://www.datadoghq.com/pricing/?product=log-management">Datadog Log Management 가격 책정</a>을 참조하세요.</div>

4. **CloudFormation 템플릿 실행**을 클릭합니다. 버킷 매핑, 대상 접두사, 통합 역할 이름, Datadog API 키, 애플리케이션 키 및 로그 포워더 파라미터가 미리 채워진 AWS Quick Create 스택이 열립니다.

5. AWS에서 스택 파라미터를 검토한 후 스택을 생성합니다. 이 스택은 다음 작업을 수행합니다.

   - 선택한 각 소스 버킷에 대해 일일 S3 Inventory를 활성화합니다.
   - Storage Management가 대상 버킷의 S3 Inventory 보고서를 읽을 수 있도록 IAM 권한을 추가합니다.
   - S3가 인벤토리 객체를 기록할 수 있도록 인벤토리 대상 버킷에 버킷 정책을 추가합니다.
   - 선택한 버킷에 대해 S3 서버 액세스 로깅을 활성화합니다(액세스 로그가 활성화된 경우).
   - Datadog Log Forwarder Lambda 함수를 배포합니다(액세스 로그가 활성화되어 있고 기존 포워더가 없는 경우).

[3]: /ko/logs/log_configuration/indexes/#exclusion-filters
{{% /collapse-content %}}

{{% collapse-content title="3. 설정 완료" level="h4" expanded=false id="datadog-ui-step3" %}}

AWS에서 CloudFormation 스택이 완료되면 Storage Management로 돌아가 **설정 완료**를 클릭합니다.

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

공식 [Datadog Storage Management Terraform 모듈][1]을 사용하여 S3 Inventory를 구성하고 S3 액세스 로그를 전달합니다. 이 모듈은 다음 작업을 수행합니다.

   - AWS 통합 IAM 역할에 필요한 권한을 구성합니다.
   - Datadog이 대상 버킷 경로에서 인벤토리 파일을 읽을 수 있도록 버킷 정책을 추가합니다.
   - Datadog Log Forwarder가 이미 설정되어 있는 경우 S3 액세스 로그 수집을 활성화합니다.

아래 예제를 사용하려면 다음을 수행합니다.
- `<AWS_REGION>`을 AWS 리전으로 교체합니다.
- `<MODULE_NAME>`을 이 모듈 인스턴스의 고유 이름으로 교체합니다.
- `<DATADOG_AWS_INTEGRATION_ROLE_NAME>`을 Datadog AWS 통합 IAM 역할 이름으로 교체합니다.
- `<SOURCE_BUCKET_1>`, `<SOURCE_BUCKET_2>` 등을 모니터링할 버킷 이름으로 교체합니다.
- `<DESTINATION_BUCKET_NAME>`을 인벤토리 파일을 수신하는 버킷 이름으로 교체합니다.
- `<DATADOG_FORWARDER_FUNCTION_NAME>`을 Datadog Forwarder Lambda 함수 이름으로 교체합니다(액세스 로그 활성화 시에만 필요).

추가 옵션은 [모듈 문서][1]를 참조하세요.

```hcl
provider "aws" {
  region = "<AWS_REGION>"
}

provider "datadog" {
  # Configure with environment variables:
  #   DD_API_KEY, DD_APP_KEY, DD_SITE
}

module "datadog_storage_management" {
  source = "DataDog/storage-management/aws"

  name                              = "<MODULE_NAME>"
  datadog_aws_integration_role_name = "<DATADOG_AWS_INTEGRATION_ROLE_NAME>"
  source_bucket_names               = ["<SOURCE_BUCKET_1>", "<SOURCE_BUCKET_2>"]
  destination_bucket_name           = "<DESTINATION_BUCKET_NAME>"

  # Bucket policy: "none", "create", or "merge" (default)
  destination_bucket_policy_management = "merge"

  # Optional: Enable S3 access logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

S3 Inventory를 활성화한 후 첫 번째 인벤토리 보고서가 생성되기까지 최대 24시간이 걸릴 수 있습니다. 인벤토리가 생성되고 있는지 확인하려면 AWS 콘솔에서 대상 버킷으로 이동한 후 지정한 대상 접두사 아래에 인벤토리 파일이 생성되는지 확인합니다.

인벤토리 파일이 존재하는 것을 확인한 후 [**Storage Management**][2]로 이동하여 대상 버킷이 표시되는지 확인함으로써 버킷에 Storage Management가 활성화되었는지 검증합니다.

[1]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[2]: https://app.datadoghq.com/storage-management

{{% /tab %}}

{{% tab "수동" %}}

필요한 [Amazon S3 Inventory][206] 및 관련 구성을 수동으로 설정하려면 다음 단계를 수행합니다.

[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html

{{% collapse-content title="1. 대상 버킷 생성" level="h4" expanded=false id="manual-setup-step1" %}}

1. 인벤토리 파일을 저장할 [S3 버킷을 생성][201]합니다. 이 버킷은 인벤토리 보고서의 중앙 저장소 역할을 합니다.
   **참고**: AWS 계정에서 생성되는 모든 인벤토리 파일에 대해 하나의 대상 버킷만 사용합니다.
2. 대상 버킷 내에 접두사를 생성합니다(선택 사항).

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. 버킷 및 통합 역할 정책 구성" level="h4" expanded=false id="manual-setup-step2" %}}

1. Datadog AWS 통합 역할에 대상 버킷에 대한 `s3:GetObject` 및 `s3:ListBucket` 권한이 있는지 확인합니다. 이 권한을 통해 Datadog은 생성된 인벤토리 파일을 읽을 수 있습니다.

2. 대상 버킷 정책이 S3가 인벤토리 파일을 대상 버킷에 기록하도록 허용하는지 확인합니다.

      예제 버킷 정책:
      ```json
      {
        "Sid": "AllowS3InventoryWriteFromAccountBuckets",
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "s3:PutObject",
        "Resource": "arn:aws:s3:::<DESTINATION_BUCKET>/<DESTINATION_PREFIX>/*",
        "Condition": {
          "ArnLike": {
            "aws:SourceArn": "arn:aws:s3:::*"
          },
          "StringEquals": {
            "aws:SourceAccount": "<ACCOUNT_ID>",
            "s3:x-amz-acl": "bucket-owner-full-control"
          }
        }
      }
      ```

3. 소스 버킷에서 Amazon S3가 인벤토리 객체(`s3:PutObject`)를 기록할 수 있도록 허용하는 버킷 정책을 대상 버킷에 추가하려면 [Amazon S3 사용자 가이드][202]의 절차를 따릅니다.

[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
{{% /collapse-content %}}

{{% collapse-content title="3. 인벤토리 생성 구성" level="h4" expanded=false id="manual-setup-step3" %}}

모니터링하려는 각 버킷에 대해 다음을 수행합니다.
1. AWS 콘솔의 [Amazon S3 버킷 페이지][203]로 이동하여 버킷을 선택합니다.
2. 버킷의 **Management** 탭으로 이동합니다.
3. **인벤토리 구성 생성**을 클릭합니다.
4. 다음 설정을 구성합니다.
   - 구성 이름 설정
   - (선택 사항) 소스 버킷 접두사 지정
   - **객체 버전**: Datadog은 **모든 버전 포함**을 선택할 것을 권장합니다(비최신 버전 메트릭을 확인하려면 필수).

     {{< img src="integrations/guide/storage_monitoring/all-versions.png" alt="Storage Monitoring 활성화를 위한 대상 버킷 선택" responsive="true">}}
   - **대상 위치**: AWS 계정의 인벤토리 파일을 저장할 공통 대상 버킷을 선택합니다. 예를 들어 버킷 이름이 `destination-bucket`인 경우 `s3://your-destination-bucket`를 입력합니다.

      **참고**: 대상 버킷에 접두사를 사용하는 경우 해당 접두사도 추가합니다.
   - **빈도**: Datadog은 **매일**을 선택할 것을 권장합니다. 이 설정은 Datadog에서 접두사 수준 메트릭이 업데이트되는 빈도를 결정합니다.
   - **출력 형식**: CSV
   - **상태**: 활성화됨
   - **서버 측 암호화**: 암호화 키를 지정하지 않음
   - 사용 가능한 모든 **추가 메타데이터 필드**를 선택합니다. 최소한 다음 필드는 필수입니다.

     {{< img src="integrations/guide/storage_monitoring/metadata.png" alt="추가 메타데이터 필드. 크기, 마지막 수정, 다중 파트 업로드, 복제 상태, 암호화, 객체 ACL, 스토리지 클래스, Intelligent-Tiering: 액세스 계층, ETag 및 체크섬 함수는 모두 선택합니다. 버킷 키 상태, 객체 소유자 및 모든 Object Lock 구성은 선택하지 않습니다." responsive="true">}}

**참고**: 인벤토리 생성과 관련된 비용은 [Amazon S3 가격][204]을 검토하세요.

[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="4. S3 액세스 로그 활성화(선택 사항)" level="h4" expanded=false id="manual-setup-step4" %}}

요청 수, 서버 측 지연 시간 및 콜드 데이터 식별을 포함한 접두사 수준 액세스 메트릭을 얻으려면 소스 버킷에서 S3 서버 액세스 로깅을 활성화하고 해당 로그를 Datadog으로 전달합니다. 단계별 지침은 Amazon S3 통합 문서의 [S3 액세스 로그 활성화][208]를 참조하세요.

<div class="alert alert-warning">S3 액세스 로그를 Datadog으로 전달하면 Log Management 수집 비용이 발생합니다. 비용을 최소화하려면 Storage Management 용도로만 사용하는 경우 로그가 수집되지만 인덱싱되지는 않도록 제외 필터를 사용합니다. 자세한 내용은 <a href="https://www.datadoghq.com/pricing/?product=log-management">Datadog Log Management 가격 책정</a>을 참조하세요.</div>

[208]: /ko/integrations/amazon-s3/#enable-s3-access-logs
{{% /collapse-content %}}

### 설정 후 단계 {#post-setup-steps}

대상 버킷에 인벤토리 파일이 생성되기 시작하면 [버킷에 대해 Storage Management 활성화][209] 엔드포인트를 호출하여 해당 버킷을 Storage Management에 등록합니다.

```bash
curl -X PUT "https://api.${DD_SITE}/api/v2/cloudinventoryservice/syncconfigs" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "id": "aws",
      "type": "cloud_provider",
      "attributes": {
        "aws": {
          "aws_account_id": "<AWS_ACCOUNT_ID>",
          "destination_bucket_name": "<DESTINATION_BUCKET_NAME>",
          "destination_bucket_region": "<DESTINATION_BUCKET_REGION>",
          "destination_prefix": "<DESTINATION_PREFIX>"
        }
      }
    }
  }'
```

위 예제를 사용하려면 다음을 수행합니다.
- `<AWS_ACCOUNT_ID>`를 대상 버킷을 소유한 12자리 AWS 계정 ID로 교체합니다.
- `<DESTINATION_BUCKET_NAME>`을 인벤토리 보고서를 저장하는 대상 버킷 이름으로 교체합니다.
- `<DESTINATION_BUCKET_REGION>`을 대상 버킷의 AWS 리전으로 교체합니다.
- `<DESTINATION_PREFIX>`를 인벤토리 파일이 기록되는 대상 버킷 내 접두사로 교체합니다. 접두사가 없으면 빈 문자열을 사용합니다.

`200` 응답이 반환되면 해당 대상 버킷에 대해 Storage Management가 활성화되었음을 의미합니다.

[209]: /ko/api/latest/storage-management/#enable-storage-management-for-a-bucket

{{% /tab %}}

{{< /tabs >}}

### 유효성 검사 {#validation}

설정이 올바른지 확인하려면 다음을 수행합니다.
1. 첫 번째 인벤토리 보고서가 생성될 때까지 기다립니다(일일 인벤토리의 경우 최대 24시간 소요).
2. **Infrastructure** > [**Storage Management**][3]로 이동하여 **모니터링 중인 버킷**이 선택된 상태에서 구성한 버킷이 탐색기 목록에 표시되는지 확인합니다.

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="버킷이 모니터링 대상으로 활성화되었는지 검증" responsive="true">}}

### 모범 사례 {#best-practices}

Storage Management 설정을 최적화하려면 다음 모범 사례를 따릅니다.
- **인벤토리 대상 버킷에 수명 주기 정책 구성**: S3 Inventory 보고서는 매일 생성되어 대상 버킷에 저장됩니다. 오래된 인벤토리 파일이 누적되어 스토리지 비용이 발생하지 않도록 3일이 지난 인벤토리 보고서를 자동으로 삭제하는 수명 주기 정책을 추가합니다.

- **S3 액세스 로그에 수명 주기 정책 구성**: 접두사 수준 요청 메트릭을 위해 S3 액세스 로그를 활성화한 경우 원본 로그 파일이 대상 버킷에 계속 누적됩니다. 이 로그가 Datadog으로 전달된 후에는 Storage Management 목적상 더 이상 필요하지 않습니다. Datadog으로 전달된 후 액세스 로그 파일을 자동 삭제하려면 수명 주기 규칙을 추가합니다.

  **참고**: 자동 삭제를 활성화하기 전에 조직 내 규정 준수 또는 감사 요구 사항상 원본 S3 액세스 로그를 일정 기간 보관해야 하는지 확인합니다.

- **S3 액세스 로그에 대한 제외 필터 생성**: S3 액세스 로그를 Storage Management 용도로만 Datadog에 전달하고 검색 또는 분석을 위한 인덱싱이 필요하지 않은 경우 [제외 필터][4]를 추가하여 인덱싱된 로그 볼륨에서 제외합니다.

### 문제 해결 {#troubleshooting}

Storage Management용으로 설정한 버킷의 데이터가 표시되지 않는 경우 [Storage Management 설정][9] 페이지에서 구성된 모든 버킷, 인벤토리 상태 및 구성 오류를 확인합니다. 이 페이지는 문제와 함께 실행 가능한 해결 방법을 제공합니다.
질문이 있는 경우 [Datadog에 문의][1]하세요.

## Bits Chat으로 비용 절감 기회 식별 및 조치 {#identify-and-act-on-cost-savings-with-bits-chat}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScbFjbJecpVV-DgJNBt2O205KtaWlD_q6ajThIEX9vTGz6ebA/viewform?usp=publish-editor" >}}
Storage Management용 Bits Chat은 미리 보기 상태입니다. 이 스킬을 사용하려면 액세스를 요청하세요.
{{< /callout >}} 


FinOps 팀과 엔지니어링 팀은 Bits Chat과 Storage Management를 사용하여 S3 비용 절감 기회를 식별하고, Datadog Notebooks에 보고서를 생성하며, 권장 변경 사항을 구현할 수 있습니다. Storage Management와 함께 Bits Chat을 사용하려면 Bits Chat 설정에서 `storage` 스킬을 활성화합니다.

Bits Chat에서 `storage` 스킬을 활성화하면 다음 작업을 수행할 수 있습니다.

- **가장 큰 절감 기회 찾기**: 자연어 질문을 통해 비용 절감 효과가 가장 큰 접두사, 스토리지 클래스 또는 버킷을 찾아 수명 주기 변경을 통해 절감 효과를 극대화할 수 있습니다.
- **Notebooks를 통한 보고서 생성**: 조사 결과, 예상 절감액 및 권장 조치를 요약한 Datadog Notebook을 생성하여 팀에서 검토하고 공유할 수 있습니다.
- **변경 사항 구현**: [Bits Code][10]를 사용하여 수명 주기 정책 적용, 객체를 더 저렴한 스토리지 계층으로 이동 또는 절감 가능성이 가장 큰 접두사의 비최신 버전 만료를 수행하는 단계별 지침을 제공합니다.


## 인벤토리 메트릭을 사용한 세부적인 S3 사용량 시각화 {#visualize-granular-s3-usage-with-inventory-metrics}

기본 제공 [Storage Management S3 대시보드 템플릿][8]을 사용하여 아래 메트릭을 시각화할 수 있습니다. 복제하여 필요에 맞게 사용자 지정할 수 있습니다.

| 메트릭 이름                                            | 주요 태그                                                                                  | 설명                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | 접두사에 저장된 총 데이터 크기(바이트).                                                                                            |
| aws.s3.inventory.average_prefix_size                   | `bucketname`, `prefix`, `region`                                                              | 접두사 내 객체의 평균 크기(바이트).                                                                                        |
| aws.s3.inventory.prefix_object_count                   | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | 접두사에 저장된 총 객체 수.                                                                                                |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | 트리맵 시각화에 사용되는 계층형 접두사 수준으로 집계된 객체 수.                                                       |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | 트리맵 시각화에 사용되는 계층형 접두사 수준으로 집계된 접두사 크기.                                                         |
| aws.s3.inventory.prefix_age_days                       | `bucketname`, `prefix`, `region`                                                              | 버킷 또는 접두사 내 가장 오래된 객체의 경과 일수.                                                                                    |
| aws.s3.inventory.prefix_small_file_size                | `bucketname`, `prefix`, `region`, `storagetype`                                               | 접두사 내 128KB 미만 객체의 총 크기(바이트). Glacier 및 Standard-IA와 같은 스토리지 계층의 오버헤드 비용 식별에 도움이 됩니다.   |
| aws.s3.inventory.prefix_small_file_count               | `bucketname`, `prefix`, `region`, `storagetype`                                               | 접두사 내 128KB 미만 객체 수. Glacier 및 Standard-IA와 같은 스토리지 계층의 오버헤드 비용 식별에 도움이 됩니다.                   |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`, `prefix`, `region`, `method`                                                    | 접두사 내 객체에 대한 총 요청 수. 요청 방식(GET, PUT 등)별 분리 가능. Datadog의 S3 액세스 로그가 필요합니다.   |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`, `prefix`, `region`, `method`                                                    | 접두사 내 요청에 대한 서버 응답 시간으로, 요청 방식별 분리 가능. Datadog의 S3 액세스 로그가 필요합니다.                          |

  *`prefixN`은 `prefix0`, `prefix1`, `prefix2` 등의 접두사 수준을 의미합니다.

  **참고:** 답변하려는 질문에 따라 적절한 메트릭을 사용합니다.
  - `aws.s3.inventory.prefix_object_count` 및 `aws.s3.inventory.total_prefix_size`(`prefix` 태그 포함)은 폴더 내부와 모든 하위 폴더의 내용을 모두 포함합니다. 특정 폴더의 전체 개수 또는 크기를 알고 싶을 때 사용합니다(예: “`logs/2024/`에는 얼마나 저장되어 있는가?”).
  - `aws.s3.inventory.prefix_object_count.levels` 및 `aws.s3.inventory.total_prefix_size.levels`(`prefix1`, `prefix2`, `prefix3` 등 포함)는 해당 깊이에 있는 객체만 계산하거나 크기를 집계합니다. 트리맵을 구축하거나 계층별 폴더 크기를 비교하려는 경우 사용합니다(예: “최상위 폴더 중 가장 큰 것은 무엇인가?”).

  **참고:** 가장 정확한 모니터링 및 시각화를 위해 모든 객체 버전을 포함하여 비최신 객체에 대한 권장 사항 및 메트릭을 확인하세요.


## Storage Management 권장 사항으로 최적화 수행 {#act-on-optimizations-with-storage-management-recommendations}

Storage Management는 인벤토리 데이터와 액세스 로그를 분석하여 S3 스토리지 비용 절감을 위한 접두사 수준 권장 사항을 제공합니다. 이 권장 사항은 모든 Storage Management 고객에게 제공됩니다. 예상 절감액은 AWS 정가를 기준으로 추정됩니다. [Cloud Cost Management][7]가 활성화된 경우 권장 사항은 Cloud Cost Recommendation에도 표시되며, 최적화에 따른 실제 절감액을 추적할 수 있습니다.

권장 사항은 매일 실행되며, 새 권장 사항이 릴리스되는 즉시 계정에 자동으로 반영됩니다.

### 전제 조건 {#prerequisites}
권장 사항을 확인하려면 다음 조건을 충족해야 합니다.
1. 이 페이지의 단계에 따라 Storage Management용 S3 버킷을 구성합니다.
2. 접두사별로 자주 액세스되지 않는 데이터를 더 저렴한 스토리지 계층으로 이동하는 권장 사항을 확인하려면 S3 액세스 로그를 활성화하고 Datadog으로 전달해야 합니다(Datadog Log Management 비용 적용).
3. 접두사 내 비최신 버전을 식별하는 권장 사항을 확인하려면 S3 Inventory 구성 시 “모든 버전”을 포함해야 합니다.

### 사용 가능한 권장 사항 {#available-recommendations}
- 접두사 내의 액세스되지 않은 S3 데이터를 Infrequent Access로 전환
- S3 버킷 접두사 내 오래된 비최신 버전 객체 만료
- 객체별 스토리지 비용을 최소화하기 위해 접두사 내 작은 파일 통합

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="Storage Management 권장 사항" responsive="true">}}


[1]: mailto:storage-monitoring@datadoghq.com
[3]: https://app.datadoghq.com/storage-management
[4]: /ko/logs/log_configuration/indexes/#exclusion-filters
[7]: /ko/cloud_cost_management/
[8]: https://app.datadoghq.com/dash/integration/32296/storage-management-for-amazon-s3
[9]: https://app.datadoghq.com/storage-management/settings
[10]: https://docs.datadoghq.com/ko/bits_ai/bits_ai_dev_agent/