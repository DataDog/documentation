---
aliases:
- /ko/logs/s3/
- /ko/logs/gcs/
- /ko/logs/archives/s3/
- /ko/logs/archives/gcs/
- /ko/logs/archives/gcp/
- /ko/logs/archives/
description: 수집된 모든 로그를 장기 스토리지로 전달하기
further_reading:
- link: /logs/archives/rehydrating
  tag: 설명서
  text: Datadog에 보관된 로그 콘텐츠에 액세스하는 방법 알아보기
- link: /logs/explorer/
  tag: 설명서
  text: Log Explorer에 대해 알아보기
- link: /logs/logging_without_limits/
  tag: 설명서
  text: Logging without Limits*에 대해 알아보기
title: 로그 아카이브
---
## 개요 {#overview}

Datadog 계정을 구성하여 [인덱싱][1] 여부와 관계없이 수집된 모든 로그를 사용자가 소유한 클라우드 스토리지 시스템으로 전달할 수 있습니다. [Rehydration][2] 또는 [Archive Search][16]를 사용하면, 스토리지에 최적화된 아카이브에 로그를 장기간 보관하여 규정 준수 요구 사항을 충족하는 동시에 필요 시 조사를 위한 감사 가능성도 유지할 수 있습니다.

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="Log Forwardin 페이지의 Archives 탭" style="width:100%;">}}

수집된 로그를 사용자가 소유한 클라우드 스토리지 버킷으로 전달하기 위한 아카이브를 설정하려면 [**Log Archiving & Forwarding** 페이지][3]로 이동합니다.

1. 아직 설정하지 않았다면 클라우드 공급자에 대한 Datadog [통합](#set-up-an-integration)을 설정합니다.
2. [스토리지 버킷](#create-a-storage-bucket)을 생성합니다.
3. 해당 아카이브에 대해 `read` 및/또는 `write` [권한](#set-permissions)을 설정합니다.
4. [로그를 해당 아카이브로 라우팅](#route-your-logs-to-a-bucket)하고 필요 시 다시 가져오도록 구성합니다.
5. 암호화, 스토리지 클래스 및 태그와 같은 [고급 설정](#advanced-settings)을 구성합니다.
설정을 6. [검증](#validation)하고 Datadog이 감지할 수 있는 구성 오류가 있는지 확인합니다.

로그를 내 환경에서 스토리지 최적화된 아카이브에 라우팅하려면 [Observability Pipelines로 로그를 아카이브][4]하는 방법을 알아보세요.

다음 메트릭은 재시도 후 성공적으로 전송된 로그를 포함하여 성공적으로 아카이브된 로그를 보고합니다.

- datadog.archives.logs.bytes
- datadog.archives.logs.count


## 아카이브 구성하기 {#configure-an-archive}

### 통합 설정하기 {#set-up-an-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

아직 설정하지 않은 경우 S3 버킷을 보유한 AWS 계정에 대해 [AWS 통합][1]을 설정합니다.
   * 일반적으로 Datadog이 AWS S3와 통합할 수 있도록 Datadog이 사용할 IAM 역할을 생성해야 합니다.
   * AWS China 계정의 경우 역할 위임 대신 액세스 키를 사용할 수 있습니다.

[1]: /ko/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

아직 설정하지 않았다면 새 스토리지 계정이 포함된 구독에서 [Azure 통합][1]을 설정합니다. 이 과정에는 [Datadog이 통합에 사용할 수 있는 앱 등록을 생성][2]하는 작업이 포함됩니다.

**참고:** Azure ChinaCloud 및 Azure GermanyCloud로의 아카이브는 지원되지 않습니다. Azure GovCloud로의 아카이브는 현재 미리보기로 지원됩니다. 액세스를 요청하려면 Datadog 지원팀에 문의하세요.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ko/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

아직 설정하지 않았다면 GCS 스토리지 버킷이 포함된 프로젝트에 대해 [Google Cloud 통합][1]을 설정합니다. 이 과정에는 [Datadog이 통합에 사용할 수 있는 Google Cloud 서비스 계정을 생성][2]하는 작업이 포함됩니다.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /ko/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### 스토리지 버킷 생성하기 {#create-a-storage-bucket}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">로그를 아카이브로 전송하는 작업은 Datadog GovCloud 환경 외부에서 이루어지며, 이는 Datadog의 통제 범위를 벗어납니다. Datadog은 Datadog GovCloud 환경을 벗어난 로그에 대해 책임을 지지 않으며, 여기에는 FedRAMP, DoD Impact Level, ITAR, 수출 규정 준수, 데이터 레지던시 또는 해당 로그에 적용되는 유사 규정과 관련하여 사용자가 부담할 수 있는 의무나 요구 사항이 포함되지만 이에 국한되지 않습니다.</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

[AWS 콘솔][1]로 이동하여 아카이브를 저장할 [S3 버킷을 생성][2]합니다.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> Datadog 아카이브는 가상 호스트 방식 주소 지정을 사용하는 S3 FIPS 엔드포인트와 통합할 때 점(.)이 포함된 버킷 이름을 지원하지 않습니다. AWS 설명서에서 자세히 알아보세요. <a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> 및 <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS Virtual Hosting</a>.</div>
{{< /site-region >}}

**참고:**

- 버킷을 공개적으로 읽을 수 있는 상태로 설정하지 마세요.
- [US1, US3, US5 사이트][3]의 경우, 리전 간 데이터 전송 요금 및 클라우드 스토리지 비용 영향에 대해서는 [AWS Pricing][4]을 참조하세요. 리전 간 데이터 전송 비용을 관리하려면 스토리지 버킷을 `us-east-1`에 생성하는 것을 고려하세요.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /ko/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* [Azure Portal][1]로 이동하여 아카이브를 저장할 [스토리지 계정을 생성][2]합니다. 스토리지 계정 이름을 지정하고, 표준 성능 또는 **Block blobs** 프리미엄 계정 유형을 선택한 후, **hot** 또는 **cool** 액세스 계층을 선택합니다.
* 해당 스토리지 계정 내에 **컨테이너** 서비스를 생성합니다. 컨테이너 이름은 나중에 Datadog Archive 페이지에 입력해야 하므로 기록해 두세요.

**참고:** 드물게(일반적으로 시간 초과 발생 시) 마지막 데이터를 다시 기록해야 하는 경우가 있으므로 [불변성 정책][3]은 설정하지 마세요.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

[Google Cloud 계정][1]으로 이동하여 아카이브를 저장할 [GCS 버킷을 생성][2]합니다. **객체 액세스 제어 방법 선택**에서 **객체 수준 및 버킷 수준 권한 설정**을 선택합니다.

**참고:** 드물게(일반적으로 시간 초과 발생 시) 마지막 데이터를 다시 기록해야 하는 경우가 있으므로 [보존 정책][3]은 추가하지 마세요.

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 권한 설정 {#set-permissions}

[`logs_write_archive` 권한][5]이 있는 Datadog 사용자만 로그 아카이브 구성을 생성, 수정 또는 삭제할 수 있습니다.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. 다음 권한 명령문을 포함하는 [정책을 생성][1]합니다.

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogUploadAndRehydrateLogArchives",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       },
       {
         "Sid": "DatadogRehydrateLogArchivesListBucket",
         "Effect": "Allow",
         "Action": "s3:ListBucket",
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1>",
           "arn:aws:s3:::<MY_BUCKET_NAME_2>"
         ]
       }
     ]
   }
   ```
     * The `GetObject` and `ListBucket` permissions allow for [rehydrating from archives][2].
     * The `PutObject` permission is sufficient for uploading archives.
     * Ensure that the resource value under the `s3:PutObject` and `s3:GetObject` actions ends with `/*` because these permissions are applied to objects within the buckets.

2. 버킷 이름을 수정합니다.
3. 원할 경우 로그 아카이브가 포함된 경로를 지정합니다.
4. 새 정책을 Datadog 통합 역할에 연결합니다.
   * AWS IAM 콘솔에서 **Roles**로 이동합니다.
   * Datadog 통합에 사용되는 역할을 찾습니다. 기본 이름은 **DatadogIntegrationRole**이지만 조직에서 이름을 변경한 경우 다를 수 있습니다. 역할 이름을 클릭하여 역할 요약 페이지를 엽니다.
   * **Add permissions**를 클릭한 다음 **Attach policies**를 클릭합니다.
   * 위에서 생성한 정책 이름을 입력합니다.
   * **Attach policies**를 클릭합니다.


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /ko/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Datadog 앱에 스토리지 계정에 대한 쓰기 및 리하이드레이션(Rehydration) 권한을 부여합니다.
2. [Storage Accounts 페이지][1]에서 스토리지 계정을 선택한 후 **Access Control (IAM)**로 이동하여 **Add -> Add Role Assignment**를 선택합니다.
3. **Storage Blob Data Contributor** 역할을 선택하고, Azure 통합을 위해 생성한 Datadog 애플리케이션을 선택한 후 저장합니다.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Datadog 앱에 Storage Blob Data Contributor 역할을 추가합니다." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Datadog Google Cloud 서비스 계정에 아카이브를 버킷에 기록할 수 있는 권한을 부여합니다.
2. [Google Cloud IAM Admin 페이지][1]에서 Datadog Google Cloud 서비스 계정 주체를 선택하고 **Edit principal**을 선택합니다.
3. ADD ANOTHER ROLE****을 클릭한 후 **Storage Object Admin** 역할을 선택하고 저장합니다.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Datadog Google Cloud 서비스 계정에 Storage Object Admin 역할을 추가합니다." style="width:75%;">}}

**Storage Object Admin** 역할은 Datadog에서 권장하는 구성입니다. 조직에서 최소 권한 원칙에 따른 사용자 지정 역할을 요구하는 경우 아카이브 업로드를 위해 다음 개별 권한이 필요합니다.

- `storage.objects.create`
- `storage.objects.get`
- `storage.objects.list`
- `storage.objects.delete`

`storage.objects.delete` 권한은 Datadog이 버킷 내 기존 객체를 덮어쓰는 아카이브 쓰기 재시도를 지원하기 위해 필요합니다. 다중 파트 업로드 권한(`storage.multipartUploads.*`)은 필요하지 않습니다.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### 로그를 버킷으로 라우팅하기 {#route-your-logs-to-a-bucket}

[Log Archiving & Forwarding 페이지][6]로 이동하여 **Archives** 탭에서 **Add a new archive**를 선택합니다.

**참고:**
* 이 단계와 다음 단계를 완료하려면 [`logs_write_archive` 권한][5]이 있는 Datadog 사용자여야 합니다.
* Azure Blob Storage에 로그를 아카이브하려면 앱 등록이 필요합니다. [Azure 통합 페이지][7]의 지침을 참조하고, 설명서 페이지 오른쪽의 "site"를 "US"로 설정하세요. 아카이브 전용으로 생성된 앱 등록에는 "Storage Blob Data Contributor" 역할만 필요합니다. 스토리지 버킷이 Datadog Resource를 통해 모니터링되는 구독에 있는 경우 앱 등록이 중복된다는 경고가 표시될 수 있습니다. 이 경고는 무시해도 됩니다.
* 버킷이 특정 IP에 대해서만 네트워크 액세스를 허용하도록 제한되어 있는 경우, 허용 목록에 {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} 의 웹훅 IP를 추가해야 합니다.
* **US1-FED 및 US2-FED 사이트**에서는 Datadog이 Datadog GovCloud 환경 외부의 대상에 로그를 전송하도록 구성할 수 있습니다. Datadog은 GovCloud 환경을 벗어난 로그에 대해 책임을 지지 않습니다. 또한 로그가 GovCloud 환경을 벗어난 이후 적용될 수 있는 FedRAMP, DoD Impact Level, ITAR, 수출 규정 준수, 데이터 레지던시 또는 유사한 규정과 관련하여 사용자가 부담할 수 있는 어떠한 의무나 요구 사항에 대해서도 Datadog은 책임을 지지 않습니다.

| 서비스                  | 단계                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - S3 버킷에 맞는 AWS 계정과 역할 조합을 선택합니다.<br>- 버킷 이름을 입력합니다.<br>**선택 사항**: 로그 아카이브 콘텐츠 전체에 대한 접두사 디렉터리를 입력합니다. |
| **Azure Storage**        | - **Azure Storage** 아카이브 유형을 선택하고, 스토리지 계정에 대해 Storage Blob Data Contributor 역할이 부여된 Datadog 애플리케이션의 Azure 테넌트 및 클라이언트를 선택합니다.<br>- 스토리지 계정 이름과 아카이브용 컨테이너 이름을 입력합니다.<br>**선택 사항**: 로그 아카이브 콘텐츠 전체에 대한 접두사 디렉터리를 입력합니다. |
| **Google Cloud Storage** | - **Google Cloud Storage** 아카이브 유형을 선택하고, 스토리지 버킷에 대한 쓰기 권한이 있는 GCS 서비스 계정을 선택합니다.<br>- 버킷 이름을 입력합니다.<br>**선택 사항**: 로그 아카이브 콘텐츠 전체에 대한 접두사 디렉터리를 입력합니다. |

### 고급 설정 {#advanced-settings}

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="선택적 태그를 추가하고 최대 스캔 크기를 정의하는 고급 설정" style="width:100%;" >}}

#### Datadog 태그 {#datadog-tags}

다음 작업을 위해 이 선택적 구성 단계를 사용합니다.

* 모든 로그 태그를 아카이브에 포함합니다(모든 새 아카이브에서 기본적으로 활성화됨). **참고**: 이 옵션을 활성화하면 생성되는 아카이브의 크기가 증가합니다.
* 제한 쿼리 정책에 따라 리하이드레이션된 로그에 태그를 추가합니다. [`logs_read_data`][13] 권한을 참조하세요.

#### 최대 스캔 크기 정의하기 {#define-maximum-scan-size}

이 선택적 구성 단계를 사용하여 로그 아카이브에서 리하이드레이션 시 스캔할 수 있는 로그 데이터의 최대 용량(GB)을 정의합니다.

최대 스캔 크기가 정의된 아카이브의 경우 모든 사용자는 리하이드레이션을 시작하기 전에 먼저 스캔 크기를 추정해야 합니다. 추정된 스캔 크기가 해당 아카이브에서 허용된 값을 초과하는 경우 사용자는 리하이드레이션 요청 시간 범위를 줄여야 합니다. 시간 범위를 줄이면 스캔 크기가 감소하여 리하이드레이션을 시작할 수 있습니다.

#### 아카이브 파티션 속성(미리보기) {#archive-search-partition-attribute}

아카이브된 로그가 스토리지에 물리적으로 저장되는 방식을 최적화하고 [Archive Search][16]를 가속화하려면 Datadog 아카이브에서 파티션 속성을 구성하세요.

* **파티션 속성**: `service`, `source`, `env` 또는 `status`와 같이 자주 검색 필터로 사용하는 낮은 카디널리티 속성을 추가합니다.
* **이점**: 동일한 파티션 속성 값을 가진 로그가 스토리지 내에 함께 저장됩니다. 검색할 때 Datadog은 쿼리와 맞지 않는 전체 파티션을 건너뛸 수 있으므로 스캔해야 하는 데이터 양을 크게 줄일 수 있습니다.

#### 아카이브 조회 속성 {#archive-lookup-attribute}

[Archive Search][16]를 사용한 아카이브 검색 및 조사 속도를 높이려면 Datadog 아카이브에서 조회 속성을 구성하세요.

* **조회 속성**: `trace_id`, `container_id` 또는 `customer_id`와 같은 높은 카디널리티 속성을 추가합니다.
* **이점**: 장기 보관 스토리지 내의 특정 로그를 훨씬 빠르게 찾을 수 있어, 임시 조사 시 검색 시간과 스캔 데이터 양을 줄일 수 있습니다.

**파티션 속성과 조회 속성 비교**

| | 파티션 | 조회 |
|---|---|---|
| **카디널리티** | 낮음(수십에서 수백 개의 값) | 높음(수백만 개의 값) |
| **일반적인 속성** | `service`, `source`, `env`, `status` | `trace_id`, `container_id`, `user_id`, `transaction_id` |
| **동작 방식** | 전체 파티션을 검색 대상에서 제외 | 아카이브 내 개별 로그 항목을 직접 찾음 |
| **적합한 용도** | 환경 또는 서비스 단위의 광범위한 필터링 | 특정 식별자를 사용한 임시 조사 |

최상의 검색 성능을 위해 두 기능을 함께 사용하는 것이 좋습니다. 파티션 속성은 검색 범위를 관련 데이터 세그먼트로 좁히고, 조회 속성은 해당 세그먼트 내에서 특정 로그를 즉시 찾을 수 있도록 해줍니다.

{{< site-region region="us3" >}}

#### 방화벽 규칙 {#firewall-rules}

{{< tabs >}}
{{% tab "Azure Storage" %}}

방화벽 규칙은 지원되지 않습니다.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}

#### 압축 {#compression}

기본적으로 Datadog은 gzip보다 더 높은 압축률과 더 빠른 압축 해제 속도를 제공하는 **zstd**(Zstandard) 압축(`.json.zst`)을 사용하여 로그를 아카이브합니다. 또한 **gzip** 압축(`.json.gz`)도 구성할 수 있습니다.


압축을 구성하려면 [Log Archiving & Forwarding 페이지][6]에서 아카이브를 생성하거나 편집할 때 **Compression Type**을 선택합니다.

- **zstd**(기본값): 더 높은 압축률과 더 빠른 압축 해제 속도를 제공합니다. 특히 [Archive Search][16]를 사용할 계획이라면 신규 아카이브에 권장됩니다.
- **gzip**: 널리 지원되며 대부분의 도구와 호환됩니다.

**참고**: 기존 아카이브의 압축 형식을 변경하더라도 새로 생성되는 아카이브 파일에만 적용됩니다. 이미 버킷에 저장된 파일은 기존 형식을 유지합니다.

#### 스토리지 클래스 {#storage-class}

{{< tabs >}}
{{% tab "AWS S3" %}}

아카이브에 사용할 스토리지 클래스를 직접 선택하거나 [S3 버킷에 수명 주기 구성을 설정][1]하여 로그 아카이브를 최적의 스토리지 클래스로 자동 전환할 수 있습니다.

[Rehydration][2]은 다음 스토리지 클래스만 지원합니다.

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval
* S3 Intelligent-Tiering([선택 사항인 비동기식 아카이브 액세스 계층][3]이 모두 비활성화된 경우에만 지원)

다른 스토리지 클래스의 아카이브에서 리하이드레이션하려면 먼저 해당 아카이브를 위의 지원되는 스토리지 클래스 중 하나로 이동해야 합니다.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /ko/logs/archives/rehydrating/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Azure Storage" %}}

Archiving 및 [Rehydration][1]은 다음 액세스 계층만 지원합니다.

- Hot 액세스 계층
- Cool 액세스 계층

다른 액세스 계층의 아카이브에서 리하이드레이션하려면 먼저 해당 아카이브를 위의 지원되는 계층 중 하나로 이동해야 합니다.

[1]: /ko/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Archiving 및 [Rehydration][1]은 다음 액세스 계층을 지원합니다.

- Standard
- Nearline
- Coldline
- Archive

[1]: /ko/logs/archives/rehydrating/
{{% /tab %}}

{{< /tabs >}}

#### S3 아카이브에 대한 서버 측 암호화(SSE) {#server-side-encryption-sse-for-s3-archives}

Datadog에서 S3 아카이브를 생성하거나 업데이트할 때 **고급 암호화**를 선택적으로 구성할 수 있습니다. **Encryption Type** 드롭다운에서 다음 세 가지 옵션을 사용할 수 있습니다.

- **Default S3 Bucket-Level Encryption**(기본값): Datadog은 S3 버킷의 기본 암호화 설정을 재정의하지 않습니다.
- **Amazon S3 managed keys**: S3 버킷의 기본 암호화와 관계없이 Amazon S3 관리형 키([SSE-S3][17])를 사용한 서버 측 암호화를 강제로 적용합니다.
- **AWS Key Management Service**: S3 버킷의 기본 암호화와 관계없이 [AWS KMS][18]의 고객 관리형 키(CMK)를 사용한 서버 측 암호화를 강제로 적용합니다. 이 옵션을 사용하려면 CMK ARN을 제공해야 합니다.

{{< tabs >}}
{{% tab "Default S3 Bucket-Level Encryption" %}}

이 옵션을 선택하면 Datadog은 업로드 요청에 암호화 헤더를 지정하지 않습니다. 대신 S3 버킷의 기본 암호화 설정이 적용됩니다.

S3 버킷의 암호화 구성을 설정하거나 확인하려면 다음 단계를 따릅니다.

1. S3 버킷으로 이동합니다.
2. **Properties** 탭을 클릭합니다.
3.  **Default Encryption** 섹션에서 암호화 유형을 구성하거나 확인합니다. 암호화에 [AWS KMS][1]를 사용하는 경우, 유효한 CMK와 해당 CMK에 연결된 CMK 정책이 있는지 확인하세요.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{% tab "Amazon S3 managed keys" %}}

이 옵션은 모든 아카이브 객체가 Amazon S3 관리형 키를 사용하는 [SSE-S3][1] 방식으로 업로드되도록 보장합니다. 이 설정은 S3 버킷의 기본 암호화 설정을 재정의합니다.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
{{% /tab %}}
{{% tab "AWS Key Management Service" %}}

이 옵션은 모든 아카이브 객체가 [AWS KMS][1]의 고객 관리형 키(CMK)를 사용하여 업로드되도록 보장합니다. 이 설정은 S3 버킷의 기본 암호화 설정을 재정의합니다.

이 암호화 유형을 구성하려면 먼저 유효한 CMK 및 CMK 정책을 생성하는 다음 단계를 완료한 후 CMK ARN을 제공해야 합니다.

1. CMK를 생성합니다.
2. AWS 계정 번호와 Datadog IAM 역할 이름을 적절히 대체하여 다음 내용으로 CMK 정책을 CMK에 연결합니다.

```
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}
```

3. Datadog에서 **Encryption Type**으로 **AWS Key Management Service**를 선택한 후 AWS KMS 키 ARN을 입력합니다.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{< /tabs >}}

### 유효성 검사 {#validation}

Datadog 계정에서 아카이브 설정이 성공적으로 구성되면 처리 파이프라인이 Datadog으로 수집되는 모든 로그를 보강하기 시작합니다. 이후 해당 로그는 아카이브로 전달됩니다.

그러나 아카이브 구성을 생성하거나 업데이트한 후 다음 아카이브 업로드가 시도되기까지 몇 분이 걸릴 수 있습니다. 아카이브 업로드 빈도는 상황에 따라 달라질 수 있습니다. 아카이브가 Datadog 계정에서 정상적으로 업로드되는지 확인하려면 **15분 후 스토리지 버킷을 다시 확인하세요.**

그 후에도 아카이브가 여전히 보류 상태라면 포함 필터를 확인하여 쿼리가 유효한지, 그리고 [Live Tail][14]에서 로그 이벤트와 일치하는지 검증하세요. 설정 또는 권한의 의도치 않은 변경으로 인해 Datadog이 외부 아카이브에 로그를 업로드하지 못하는 경우 해당 로그 아카이브가 구성 페이지에서 강조 표시됩니다.

{{< img src="logs/archives/archive_errors_details.png" alt="아카이브가 올바르게 설정되었는지 확인" style="width:100%;">}}

아카이브 위에 마우스를 올리면 오류 세부 정보와 문제 해결을 위한 조치를 확인할 수 있습니다. 또한 [Event Explorer][15]에 이벤트가 생성됩니다. 이러한 이벤트에 대해 모니터링을 생성하면 장애를 빠르게 감지하고 해결할 수 있습니다.

## 여러 아카이브 {#multiple-archives}

여러 아카이브가 정의된 경우 로그는 필터를 기반으로 첫 번째 아카이브를 입력합니다.

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="로그는 필터와 일치하는 첫 번째 아카이브로 전달됩니다." style="width:100%;">}}

따라서 아카이브의 순서를 신중하게 구성하는 것이 중요합니다. 예를 들어 첫 번째 아카이브를 `env:prod` 태그로 필터링하고, 두 번째 아카이브를 필터 없이(`*``와 동일) 구성한 경우, 모든 프로덕션 로그는 하나의 스토리지 버킷 또는 경로로 전송되고 나머지 로그는 다른 버킷 또는 경로로 전송됩니다.

## 아카이브 형식 {#format-of-the-archives}

Datadog이 스토리지 버킷으로 전달하는 로그 아카이브는 압축된 JSON 형식입니다. [압축 구성](#compression)에 따라 아카이브 파일은 zstd(`.json.zst`, 기본값) 또는 gzip(`.json.gz`) 압축을 사용합니다. 사용자가 지정한 접두사(없을 경우 `/`)를 사용하여 아카이브는 다음과 같이 아카이브 파일이 생성된 날짜와 시간을 나타내는 디렉터리 구조에 저장됩니다.

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.02aafad5-f525-4592-905e-e962d1a5b2f7.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.json.gz
```

이 디렉터리 구조는 날짜를 기준으로 기록 로그 아카이브를 쿼리하는 프로세스를 단순화합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>

*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/indexes/#exclusion-filters
[2]: /ko/logs/archives/rehydrating/
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[4]: /ko/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /ko/account_management/rbac/permissions/?tab=ui#logs_write_archives
[6]: https://app.datadoghq.com/logs/pipelines/archives
[7]: /ko/integrations/azure/
[8]: https://ip-ranges.datadoghq.com/
[9]: /ko/account_management/rbac/permissions#logs_write_archives
[10]: /ko/account_management/rbac/permissions#logs_read_archives
[11]: /ko/account_management/rbac/permissions#logs_write_historical_view
[12]: /ko/account_management/rbac/permissions#logs_read_index_data
[13]: /ko/account_management/rbac/permissions#logs_read_data
[14]: /ko/logs/explorer/live_tail/
[15]: /ko/events/explorer/
[16]: /ko/logs/log_configuration/archive_search/?tab=amazons3
[17]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
[18]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
