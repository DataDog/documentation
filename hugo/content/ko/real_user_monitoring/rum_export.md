---
description: RUM 및 Product Analytics 이벤트를 자체 클라우드 스토리지로 전달하여 데이터 웨어하우스에 적재하거나 장기간
  보존합니다.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM Explorer에 대해 자세히 알아보기
- link: /real_user_monitoring/rum_without_limits/
  tag: 설명서
  text: RUM without Limits에 대해 자세히 알아보기
- link: /product_analytics/
  tag: 설명서
  text: Product Analytics에 대해 자세히 알아보기
private: true
title: Pipelines 내보내기
---
{{< callout url="https://www.datadoghq.com/product-preview/export-pipelines/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Export Pipelines는 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

Export Pipelines는 수집된 Real User Monitoring(RUM)과 Product Analytics 이벤트를 사용자가 소유한 클라우드 스토리지 버킷(Amazon S3, Azure Blob Storage 또는 Google Cloud Storage)에 JSON 또는 Parquet 형식으로 스트리밍합니다.

{{< img src="real_user_monitoring/rum_export/rum-export-overview.png" alt="RUM 애플리케이션 설정 페이지에 표시된 Export Pipelines 목록" style="width:100%;">}}

Export Pipelines를 사용하면 다음 작업을 수행할 수 있습니다.
- 사용자 지정 분석 및 보고를 위해 이벤트 데이터를 자체 데이터 웨어하우스(Snowflake, BigQuery 또는 Databricks 등)에 적재합니다.
- 규정 준수 요구 사항을 충족하거나 원시 이벤트를 장기 아카이브 또는 임시 조사를 위해 보존합니다.

Datadog은 Datadog 계정에서 클라우드 스토리지 시스템으로의 내보내기만 관리합니다.

## 작동 방식 {#how-it-works}

Export Pipelines는 [Real User Monitoring][4]과 [Product Analytics][5]에서 공통으로 사용하는 기능입니다. 파이프라인은 다음 두 수준에서 구성됩니다.

| 범위 | 소스 | 최대 파이프라인 | 사용 가능한 프리셋 |
|---|---|---|---|
| 애플리케이션별 | RUM | 1 | *모든 RUM 이벤트 유형* 또는 *세션, 보기 및 액션만* |
| 애플리케이션별 | Product Analytics | 1 | *모든 Product Analytics 이벤트*(세션, 보기, 액션 및 서버 측 이벤트) |
| 조직별 | Product Analytics | 1 | *사용자 및 계정 프로필* |

*사용자 및 계정 프로필* 프리셋은 조직당 하나의 파이프라인만 사용할 수 있습니다. 사용자 및 프로필 데이터가 모든 애플리케이션에서 공유되므로 애플리케이션마다 파이프라인을 생성하면 스토리지에 중복 레코드가 저장됩니다.

각 파이프라인은 다른 파이프라인과 독립적으로 데이터를 지속적으로 내보냅니다.

## 전제 조건 {#prerequisites}

- 애플리케이션에서 RUM 또는 Product Analytics가 활성화되어 있거나 둘 다 활성화되어 있어야 합니다.
- 클라우드 공급자([Amazon Web Services][6], [Azure][7] 또는 [Google Cloud][8])에 대한 Datadog 통합이 설정되어 있어야 합니다.
- Datadog 사용자에게 `rum_write_archives` 권한이 있어야 합니다. [Role Based Access Control][1]을 참조하세요.

## 내보내기 파이프라인 설정 {#set-up-an-export-pipeline}

### 1. 클라우드 통합 설정 {#1-set-up-your-cloud-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

아직 설정하지 않은 경우 S3 버킷을 보유한 계정에 대해 [AWS 통합][1]을 설정합니다. Export Pipelines는 역할 기반(STS) AWS 통합만 지원하며 액세스 키 통합은 지원하지 않습니다.

[1]: /ko/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

아직 설정하지 않았다면 스토리지 계정이 포함된 구독에서 [Azure 통합][1]을 설정합니다. 이 과정에는 [Datadog이 사용할 수 있는 앱 등록 생성][2]이 포함됩니다.

**참고:** Azure ChinaCloud 및 Azure GermanyCloud로의 내보내기는 지원되지 않습니다. Azure GovCloud로의 내보내기는 미리 보기 단계에서 지원됩니다. 액세스 권한을 요청하려면 Datadog 지원팀에 문의하세요.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ko/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

아직 설정하지 않았다면 GCS 버킷이 포함된 프로젝트에 대해 STS가 활성화된 [Google Cloud 통합][1]을 설정합니다. 이 과정에는 [Datadog이 사용할 수 있는 Google Cloud 서비스 계정 생성][2]이 포함됩니다. 대상에는 GCP 프로젝트 ID도 필요합니다.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /ko/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### 2. 스토리지 버킷 생성 {#2-create-a-storage-bucket}

{{< tabs >}}
{{% tab "AWS S3" %}}

[AWS 콘솔][1]에서 내보내기 데이터를 저장할 [S3 버킷을 생성합니다][2].

**참고:**

- 버킷을 공개적으로 읽을 수 있는 상태로 설정하지 마세요.
- [US1, US3 및 US5 사이트][3]의 경우, 리전 간 데이터 전송 요금은 [AWS 요금][4]을 참조하세요. 전송 비용을 최소화하려면 `us-east-1`에 버킷을 생성하는 것이 좋습니다.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /ko/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

- [Azure 포털][1]에서 [스토리지 계정을 생성합니다][2]. **Standard** 성능 또는 **Block blobs premium**을 선택한 다음, 액세스 계층으로 **hot** 또는 **cool**을 선택합니다.
- 해당 스토리지 계정 안에 **컨테이너**를 생성합니다. 컨테이너 이름을 기록해 둡니다. 파이프라인을 구성할 때 이 이름이 필요합니다.

**참고:** [불변성 정책][3]을 설정하지 마세요. 일부 이벤트는 다시 기록해야 하는 경우가 있습니다(일반적으로 시간 초과 후 재시도 시).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

[Google Cloud 콘솔][1]에서 내보내기 데이터를 저장할 [GCS 버킷을 생성][2]합니다. **객체 액세스 제어 방법 선택**에서 **객체 수준 및 버킷 수준 권한 설정**을 선택합니다.

**참고:** [보존 정책][3]을 추가하지 마세요. 일부 이벤트는 다시 기록해야 하는 경우가 있습니다(일반적으로 시간 초과 후 재시도 시).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 3. Datadog에 버킷 액세스 권한 부여 {#3-grant-datadog-access-to-the-bucket}

{{< tabs >}}
{{% tab "AWS S3" %}}

1. 다음 권한 문을 포함하는 [정책을 생성][1]합니다.

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogExportPipelineFiles",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       }
     ]
   }
   ```

   * `PutObject`는 내보내기 파일을 업로드하는 데 필요합니다.
   * `GetObject`는 **Test Configuration**을 실행하는 데 필요합니다. 이 작업은 테스트 파일을 작성한 후 다시 읽어 액세스 권한을 검증합니다.
   * 리소스 값은 `/*`(으)로 끝나야 합니다. 이러한 권한은 버킷 내 객체에 적용됩니다.

2. 버킷 이름을 수정합니다.
3. 필요시 정책의 적용 범위를 특정 경로로 제한합니다.
4. Datadog 통합 역할에 다음과 같이 정책을 연결합니다.
   * AWS IAM 콘솔에서 **Roles**로 이동하여 Datadog 통합에서 사용하는 역할을 엽니다. 기본적으로 이름은 `DatadogIntegrationRole`이지만, 조직에서 이름을 변경한 경우 다를 수 있습니다.
   * **Add permissions**를 클릭한 다음 **Attach policies**를 클릭합니다.
   * 방금 생성한 정책의 이름을 입력합니다.
   * **Attach policies**를 클릭합니다.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Datadog 앱에 스토리지 계정에 대한 쓰기 권한을 부여합니다.
2. [Storage accounts 페이지][1]에서 스토리지 계정을 선택하고 **Access Control(IAM)**을 연 다음 **Add → Add Role Assignment**를 선택합니다.
3. Azure와 통합할 때 생성한 Datadog 앱에 **Storage Blob Data Contributor** 역할을 할당한 다음 저장합니다.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Datadog Google Cloud 서비스 계정에 버킷 쓰기 권한을 부여합니다.
2. [Google Cloud IAM 관리 페이지][1]에서 Datadog 서비스 계정 주체를 선택하고 **Edit principal**을 클릭합니다.
3. **ADD ANOTHER ROLE**을 클릭하고 **Storage Object Admin**을 선택한 다음 저장합니다.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

**참고:** 버킷이 IP 주소를 기준으로 네트워크 액세스를 제한하는 경우, 웹훅 IP 범위를 {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} 허용 목록에 추가합니다.

### 4. Datadog에서 파이프라인 구성 {#4-configure-the-pipeline-in-datadog}

1. Datadog에서 **Digital Experience > Real User Monitoring > Manage Applications**로 이동합니다.
2. 애플리케이션을 선택한 다음 **Routing > Export Pipelines**로 이동합니다.
3. **New Export Pipeline**을 클릭합니다.
4. 사이드 패널의 각 섹션에 다음 내용을 입력합니다.

   **Define Data to Export**

   내보낼 데이터를 선택합니다. 소스 및 프리셋 옵션은 UI에 명확하게 표시되어 있습니다.

   **File format**

   {{< img src="real_user_monitoring/rum_export/rum-export-data-format.png" alt="Export Pipeline 구성 패널에 표시된 데이터 선택 및 파일 형식 옵션" style="width:85%;">}}

   - **Parquet**: BigQuery, Snowflake, Databricks와 같은 데이터 웨어하우스에 직접 로드하는 데 가장 적합합니다.
   - **JSON**: 자체 파이프라인으로 데이터를 처리하려는 경우에 가장 적합합니다.

   **스토리지 유형 선택 및 버킷 구성하기**

   | 공급자 | 필드 |
   |---|---|
   | **Amazon S3** | AWS 계정 및 역할(AWS 통합에서 제공), **Bucket**(필수), **Path**(선택 사항: 접두사) |
   | **Azure Blob Storage** | Azure 테넌트 및 클라이언트(Azure 통합에서 제공), **Storage Account**(필수), **Container**(필수), **Path**(선택 사항: 접두사) |
   | **Google Cloud Storage** | GCP 서비스 계정(Google Cloud 통합에서 제공), **Bucket**(필수), **Path**(선택 사항: 접두사) |

5. 필요시 **Test Configuration**을 클릭합니다. Datadog은 버킷에 작은 테스트 파일을 기록한 다음 다시 읽어 액세스 권한을 검증합니다. 저장하기 전에 보고된 권한 또는 이름 관련 문제를 해결합니다.
6. **Add Export Pipeline**을 클릭하여 파이프라인을 시작합니다.

## 파이프라인 상태{#pipeline-statuses}

파이프라인을 생성하면 Export Pipelines 페이지에 다음 중 하나의 상태가 표시됩니다.

| 상태| 의미|
|----------|--------------------------------------------------------------------------------------------------------------------------------|
| Active | Datadog이 이벤트를 성공적으로 내보내고 있습니다.                                                                                      |
| Pending| 파이프라인이 방금 생성되거나 업데이트되었습니다. 첫 업로드가 시작되기까지 몇 분 정도 기다립니다.                                         |
| Error| Datadog이 버킷에 데이터를 기록하지 못했습니다. 일반적으로 권한이나 이름 관련 문제 때문입니다. 파이프라인을 열고 **Test Configuration**을 실행하여 자세한 내용을 확인합니다. |
| Paused| 파이프라인이 비활성화되었습니다. 이벤트를 내보내지 않습니다.                                                                              |

파이프라인이 **Pending** 상태로 15분 이상 유지되면 **Test Configuration**을 실행하여 근본적인 문제를 확인합니다.

## 파일 형식 {#file-format}

날짜별로 아카이브를 쉽게 쿼리할 수 있도록 파일이 다음과 같은 디렉터리 구조로 구성됩니다.

```
/<path>/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.<ext>
```

| 형식  | 확장자     | 참고 사항                                                          |
|---------|---------------|----------------------------------------------------------------|
| JSON    | `.json.gz`    | Gzip으로 압축된 줄바꿈 구분 JSON 형식                        |
| Parquet | `.parquet`    | 기본 Parquet 인코딩(gzip 래퍼 없음) 이벤트당 하나의 행으로 구성되며, 각 열에 데이터 유형이 지정됩니다. 전처리 없이 Snowflake, BigQuery 및 Databricks에서 직접 로드할 수 있습니다. |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/rum/list
[3]: /ko/api/latest/rum/
[4]: /ko/real_user_monitoring/
[5]: /ko/product_analytics/
[6]: /ko/integrations/amazon-web-services/
[7]: /ko/integrations/azure/
[8]: /ko/integrations/google_cloud_platform/