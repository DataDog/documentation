---
description: AWS Glue를 Datadog Data Observability에 연결하여 Iceberg 테이블 메타데이터, 데이터 최신
  상태 및 품질을 모니터링합니다.
further_reading:
- link: /data_observability/
  tag: 설명서
  text: Data Observability 개요
- link: /integrations/amazon-web-services/
  tag: 설명서
  text: AWS 통합
- link: /monitors/types/data_observability/
  tag: 설명서
  text: Data Observability 모니터
title: Iceberg 표(AWS Glue)
---
## 개요 {#overview}

[AWS Glue에서 Iceberg 프레임워크를 사용하는][5] 경우, [AWS Glue 통합][6]을 통해 Datadog에서 Iceberg 테이블의 메타데이터를 확인할 수 있습니다. 이 데이터를 사용하여 테이블 스키마, 데이터 최신 상태, 행 수 및 테이블 크기를 모니터링합니다.

## 전제 조건 {#prerequisites}

시작하기 전에 다음 항목이 있는지 확인하세요.

- 모니터링하려는 Glue Iceberg 테이블이 있는 AWS 계정
- [Datadog에 연결된 AWS 계정][1]
  - Data Observability에는 로그 포워딩이 필요하지 않습니다.
- Datadog 역할의 정책을 수정할 수 있는 IAM 권한
- (선택 사항) AWS Lake Formation을 사용하여 테이블 권한을 관리하는 경우 해당 서비스에 대한 액세스 권한

## AWS 계정 구성 {#configure-the-aws-account}

1. [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][2]로 이동합니다.
2. AWS Glue 옆의 {{< ui >}}Configure{{< /ui >}}를 클릭합니다.

   {{< img src="data_observability/aws_glue/settings-configure-button.png" alt="Data Observability 설정 페이지의 AWS Glue 구성 옵션" style="width:100%;" >}}

3. 이미 Datadog에 연결된 기존 AWS 계정을 선택하거나 새 계정을 추가합니다. 새 계정 추가에 대한 도움이 필요하면 [AWS 통합 문서][1]를 참조하세요.

   {{< img src="data_observability/aws_glue/account-selection.png" alt="구성 흐름의 AWS 계정 선택 드롭다운" style="width:100%;" >}}

## 필수 IAM 권한 추가 {#add-required-iam-permissions}

Data Observability 크롤러가 Glue Iceberg 테이블을 모니터링하려면 추가 권한이 필요합니다. AWS 통합을 위해 구성된 Datadog IAM 역할에 다음 정책을 연결합니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "glue:GetCatalog",
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetJobRun",
        "glue:GetJobRuns",
        "glue:GetJob",
        "glue:GetJobs",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetTags",
        "glue:ListJobs",
        "s3:ListBucket",
        "kms:Decrypt",
        "lakeformation:GetDataAccess"
      ],
      "Resource": ["*"]
    },
    {
      "Sid": "AllowIcebergMetadataOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
      ],
      "Resource": [
        "arn:aws:s3:::*/metadata/*"
      ]
    }
  ]
}
```

### (선택 사항) 특정 데이터베이스 및 테이블에 대한 액세스 제한 {#optional-restrict-access-to-specific-databases-and-tables}

위 정책은 모든 Glue 리소스에 대한 액세스 권한을 부여합니다. 특정 데이터베이스나 테이블만 모니터링하려면 위 예시 정책의 `Resource: ["*"]`를 모니터링할 데이터베이스나 테이블의 명시적인 ARN으로 바꿉니다.

AWS Glue IAM 권한은 계층적입니다. 테이블에 액세스하려면 정책에 카탈로그, 데이터베이스 및 테이블이 포함되어야 합니다. 계층 중 하나라도 생략하면 액세스 거부 오류가 발생합니다.

| 리소스 | ARN 형식 | 예시 |
|----------|------------|---------|
| Catalog | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:catalog` | `arn:aws:glue:us-east-1:123456789012:catalog` |
| 데이터베이스 | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:database/<DB_NAME>` | `arn:aws:glue:us-east-1:123456789012:database/analytics` |
| 테이블 | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:table/<DB_NAME>/<TABLE_NAME>` | `arn:aws:glue:us-east-1:123456789012:table/analytics/events` |

#### 예시 정책 {#example-policies}

{{< tabs >}}
{{% tab "특정 데이터베이스" %}}

특정 데이터베이스의 모든 테이블을 모니터링하려면 카탈로그, 각 데이터베이스, 그리고 해당 데이터베이스의 테이블을 나타내는 와일드카드를 포함합니다.

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:database/analytics_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/*",
    "arn:aws:glue:us-east-1:123456789012:table/analytics_db/*"
  ]
}
```

{{% /tab %}}
{{% tab "특정 테이블" %}}

특정 테이블만 모니터링하려면 각 테이블을 명시적으로 나열합니다. 와일드카드를 사용하여 테이블 이름 패턴과 일치하는 테이블을 지정할 수도 있습니다.

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/orders",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/customers",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/events_*"
  ]
}
```

와일드카드 `events_*`는 `events_clicks`, `events_purchases` 및 `events_`로 시작하는 기타 모든 테이블과 일치합니다.

{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [AWS Glue 자격 증명 기반 정책 예시][4]를 참조하세요.

## (선택 사항) Lake Formation 액세스 구성 {#optional-configure-lake-formation-access}

AWS Lake Formation을 사용하여 Glue Catalog 테이블에 대한 액세스를 관리하는 경우, Datadog 역할에 모니터링하려는 데이터베이스와 테이블에 대한 액세스 권한을 부여합니다.

{{< tabs >}}
{{% tab "AWS CLI" %}}

다음 명령을 사용하되, 플레이스홀더 값을 실제 계정 ID, 역할 이름, 데이터베이스 이름 및 S3 버킷으로 바꿉니다.

```bash
PRINCIPAL=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<YOUR_DATADOG_ROLE_NAME>

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"Database":{"Name":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"TableWildcard":{"DatabaseName":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"DataLocation":{"ResourceArn":"arn:aws:s3:::<YOUR_S3_BUCKET_NAME>"}}' \
  --permissions DATA_LOCATION_ACCESS
```

{{% /tab %}}
{{% tab "AWS 콘솔" %}}

1. AWS 콘솔에서 {{< ui >}}Lake Formation{{< /ui >}} > {{< ui >}}Data lake permissions{{< /ui >}}로 이동합니다.
2. {{< ui >}}Grant{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Principals{{< /ui >}} 아래에서 {{< ui >}}IAM users and roles{{< /ui >}}를 선택하고 Datadog 역할을 선택합니다.
4. {{< ui >}}LF-Tags or catalog resources{{< /ui >}} 아래에서 모니터링할 데이터베이스와 테이블을 선택합니다.
5. {{< ui >}}Permissions{{< /ui >}} 아래에서 {{< ui >}}DESCRIBE{{< /ui >}} 및 {{< ui >}}SELECT{{< /ui >}}를 선택합니다.
6. {{< ui >}}Grant{{< /ui >}}를 클릭합니다.

{{< img src="data_observability/aws_glue/lakeformation-permissions.png" alt="AWS 콘솔의 Lake Formation 권한 부여 대화 상자" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

## 크롤러 구성 {#configure-the-crawler}

1. Glue Iceberg 테이블이 위치한 AWS 리전을 선택합니다.
2. {{< ui >}}Quality Monitoring for Apache Iceberg{{< /ui >}} 토글을 활성화합니다.
3. (선택 사항) Glue 작업의 상태와 성능도 모니터링하려면 {{< ui >}}Job Monitoring{{< /ui >}} 토글을 활성화합니다.
4. 동기화 빈도를 선택합니다.

   {{< img src="data_observability/aws_glue/crawler-configuration.png" alt="리전 선택 및 동기화 빈도 옵션이 표시된 크롤러 구성 화면" style="width:100%;" >}}

5. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 다음 단계 {#next-steps}

설정을 완료하면 Datadog이 백그라운드에서 Glue Iceberg 테이블 메타데이터의 동기화를 시작합니다. 초기 동기화는 카탈로그의 테이블 수에 따라 최대 1시간이 소요될 수 있습니다.

동기화가 완료되면 [Data Catalog][3]에 테이블이 표시됩니다. [Data Observability 모니터][7]를 생성하여 데이터 최신 상태와 행 수에 대한 경보를 발생시킬 수도 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/data-obs/settings/integrations
[3]: https://app.datadoghq.com/data-obs/catalog?integration=awsglue%2Fdatabase_account
[4]: https://docs.aws.amazon.com/glue/latest/dg/security_iam_id-based-policy-examples.html
[5]: https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-iceberg.html
[6]: /ko/integrations/amazon-glue/
[7]: /ko/monitors/types/data_observability/