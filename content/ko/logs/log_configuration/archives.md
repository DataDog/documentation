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
  text: 로그 탐색기에 대해 알아보기
- link: /logs/logging_without_limits/
  tag: 설명서
  text: Logging without Limits*에 대해 알아보기
title: 로그 아카이브
---

## 개요

[인덱싱][1] 여부에 관계없이 수집된 모든 로그를 자체 클라우드 스토리지 시스템에 전달하도록 Datadog 계정을 설정하세요. [Rehydration][2]을 사용하면 스토리지에 최적화된 아카이브에 로그를 장기간 보관하고 컴플라이언스 요구 사항을 충족하는 동시에 임시 조사에 대한 감사 기능을 유지할 수 있습니다.

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="Log Forwarding 페이지의 Archives 탭" style="width:100%;">}}

[**Log Forwarding** 페이지][13]로 이동하여 수집된 로그를 자체 클라우드 호스팅 스토리지 버킷에 전달하기 위한 아카이브를 설정하세요.

1. 아직 설정하지 않았다면 클라우드 공급자에 대한 Datadog [통합](#set-up-an-integration)을 설정하세요.
2. 스토리지 버킷을 생성합니다(#create-a-storage-bucket).
3. 해당 아카이브에 대해 `read` 및/또는 `write` [권한](#set-permissions)을 설정합니다.
4. 해당 아카이브에서 또는 해당 아카이브로 [로그를 라우팅](#route-your-logs-to-a-bucket)합니다.
5. 암호화, 스토리지 클래스, 태그 등 [고급 설정](#advanced-settings)을 구성합니다.
6. 설정을 [검증](#validation)하고 Datadog이 감지할 수 있는 잘못된 설정이 있는지 확인합니다.

로그를 내 환경에서 스토리지 최적화된 아카이브에 라우팅하려면 [Observability Pipelines로 로그를 아카이브][4]하는 방법을 알아보세요.

## 아카이브 설정하기

### 통합 설정하기

{{< tabs >}}
{{% tab "AWS S3" %}}

{{< site-region region="gov" >}}
<div class="alert alert-warning"> <em>Role Delegation을 사용한 S3 Log Archives 설정은 현재 제한적으로 제공됩니다. 정부용 Datadog 계정에서 이 기능을 요청하려면 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 문의하세요</em>.</div>
{{< /site-region >}}

아직 설정하지 않은 경우 S3 버킷을 보유한 AWS 계정에 대해 [AWS 통합][1]을 설정합니다.
   * 일반적인 경우 Datadog이 AWS S3와의 통합에 사용할 수 있는 역할 생성이 포함됩니다.
   * AWS China 계정인 경우 역할 위임 대신 액세스 키를 사용하세요.

[1]: /ko/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

아직 설정하지 않은 경우 새 스토리지 계정이 포함된 구독 내에서 [Azure 통합][1]을 설정하세요. 여기에는 통합하기 위해 [Datadog이 사용할 수 있는 앱 등록 생성][2]이 포함됩니다.

**참고:** Azure ChinaCloud, GermanyCloud 및 GovCloud에 대한 아카이빙은 지원되지 않습니다.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ko/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

아직 설정하지 않았다면 GCS 스토리지 버킷을 보유하는 프로젝트에 대해 [Google Cloud 통합][1]을 설정하세요. 여기에는 통합을 위해 [Datadog이 사용할 수 있는 Google Cloud 서비스 계정 생성][2]이 포함됩니다.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /ko/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### 스토리지 버킷 생성하기 

{{< site-region region="gov" >}}
<div class="alert alert-warning">아카이브로 로그를 보내는 것은 Datadog GovCloud 환경 외부에서 일어나며, 이는 Datadog의 통제를 벗어나는 것입니다. Datadog은 FedRAMP, DoD 영향 수준, ITAR, 수출 규정 준수, 데이터 보존 또는 해당 로그에 적용되는 유사 규정과 관련해 사용자가 가질 의무 또는 요구 사항을 포함하되 이에 국한되지 않는 Datadog GovCloud 환경을 떠난 모든 로그에 대해 책임을 지지 않습니다.</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

[AWS 콘솔][1]에서 [S3 버킷을 생성하여][2] 아카이브를 보냅니다.

{{< site-region region="gov" >}}
<div class="alert alert-warning">가상 호스트 스타일 주소를 이용하는 S3 FIPS 엔드포인트와 통합되어 있을 경우 Datadog Archives에서 점(.)이 있는 버킷 이름을 지원하지 않습니다. 자세한 내용은 AWS 설명서를 참고하세요.<a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> 및 <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS Virtual Hosting</a>.</div>
{{< /site-region >}}

**참조**:

- 버킷을 공개적으로 읽을 수 있도록 설정하지 마세요.
- [US1, ​​US3, US5 사이트][3]의 경우 리전 간 데이터 전송 요금과 클라우드 스토리지 비용에 미치는 영향을 확인하려면 [AWS 가격][4]을 참고하세요. 리전 간 데이터 전송 요금을 관리하려면 `us-east-1`에서 스토리지 버킷을 생성하는 것이 좋습니다.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /ko/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* [Azure Portal][1]에서 [스토리지 계정을 생성하여][2] 아카이브를 보냅니다. 스토리지 계정에 이름을 지정하고 표준 성능 또는 **Block blobs** 프리미엄 계정 유형을 선택한 다음 **hot** 또는 **cool** 액세스 계층을 선택합니다.
* 해당 스토리지 계정에 **컨테이너** 서비스를 만듭니다. Datadog Archive 페이지에 추가해야 하므로 컨테이너 이름을 기록해 두세요.

**참고:** 드물게 발생하지만 (일반적으로 시간 초과) 마지막 데이터를 다시 작성해야 할 수 있으므로 [변경이 불가한 정책][3]을 설정하지 마세요.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

[Google Cloud 계정][1]에서 [GCS 버킷을 생성하여][2] 아카이브를 보내세요. **Choose how to control access to objects**에서 **Set object-level and bucket-level permissions**를 선택합니다.

**참고:** 드물게 발생하지만 (일반적으로 시간 초과) 마지막 데이터를 다시 작성해야 할 수 있으므로 [보존 정책][3]을 추가하지 마세요.

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 권한 설정

[`logs_write_archive` 권한][5]이 있는 Datadog 사용자만 로그 아카이브 설정을 생성, 수정, 또는 삭제할 수 있습니다.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. 다음 권한 설명을 사용하여 [정책 만들기][1]:

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
     * `GetObject` 및 `ListBucket` 권한은 [아카이브에서의 리하이드레이션][2]을 허용합니다.
     * `PutObject` 권한으로 아카이브를 업로드할 수 있습니다.
     * 이러한 권한은 버킷 내의 개체에 적용되므로 `s3:PutObject` 및 `s3:GetObject` 작업 아래의 리소스 값이 `/*`로 끝나는지 확인하세요.

2. 버킷 이름을 편집합니다.
3. (선택 사항) 로그 아카이브가 포함된 경로를 지정합니다.
4. Datadog 통합 역할에 새 정책을 연결합니다.
   * AWS IAM 콘솔에서 **Roles**로 이동합니다.
   * Datadog 통합에서 사용되는 역할을 찾습니다. 기본적으로 이름은 **DatadogIntegrationRole**이지만 조직에서 이름을 바꾼 경우 이름이 달라질 수 있습니다. 역할 이름을 클릭하면 역할 요약 페이지가 열립니다.
   * **Add permissions**를 클릭한 후 **Attach policies**를 클릭합니다.
   * 위에 생성된 정책의 이름을 입력합니다.
   * **Attach policies**를 클릭합니다.


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /ko/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. 스토리지 계정에 대한 쓰기 및 리하이드레이션 권한을 Datadog 앱에 부여하세요.
2. [Storage Accounts 페이지][1]에서 스토리지 계정을 선택한 후 **Access Control (IAM)**로 이동하여 **Add -> Add Role Assignment**를 선택합니다.
3. **Storage Blob Data Contributor**라는 역할을 입력하고 Azure와 통합하기 위해 만든 Datadog 앱을 선택한 후 저장합니다.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Datadog 앱에 Storage Blob Data Contributor 역할을 추가합니다." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Datadog Google Cloud 서비스 계정에 아카이브를 버킷에 쓸 수 있는 권한을 부여하세요.
2. [Google Cloud IAM Admin 페이지][1]에서 Datadog Google Cloud 서비스 계정 주체를 선택하고 **Edit principal**을 선택합니다.
3. **ADD ANOTHER ROLE**을 클릭한 후 **Storage Object Admin** 역할을 선택하고 저장합니다.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Datadog Google Cloud 서비스 계정에 Storage Object Admin역할을 추가합니다." style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### 로그를 버킷으로 라우팅하기

[Log Forwarding 페이지][6]로 이동하여 **Archives**탭에서 **Add a new archive**를 선택합니다.

**참조**:
* [`logs_write_archive` 권한][5]이 있는 Datadog 사용자만 이 단계와 다음 단계를 완료할 수 있습니다.
* Azure Blob Storage에 로그를 보관하려면 앱 등록이 필요합니다. [Azure 통합 페이지][7] 지침을 참조하고 설명서 페이지 오른쪽에 있는 "사이트"를 "US"로 설정하세요. 보관 목적으로 생성된 앱 등록에는 "Storage Blob Data Contributor" 역할만 필요합니다. 스토리지 버킷이 Datadog 리소스를 통해 모니터링되는 구독에 있는 경우 앱 등록이 중복된다는 경고가 표시됩니다. 이 경고는 무시해도 됩니다.
* 버킷이 네트워크 액세스를 지정된 IP로 제한하는 경우{{< region-param key="ip_ranges_url" link="true" text="IP 범위 목록">}}의 웹훅 IP를 허용 목록에 추가하세요.
* **US1-FED 사이트**의 경우, Datadog GovCloud 환경 외 대상에도 로그를 전송하도록 Datadog를 구성할 수 있습니다. Datadog에서는 Datadog GovCloud 환경에서 로그를 전송된 후에는 로그에 관해 책임을 지지 않습니다. 또한 GovCloud 환경을 벗어난 이후에는 FedRAMP, DoD Impact Levels, ITAR, 내보내기 규정, 데이터 상주 등 로그에 적용할 수 있는 유사 규정과 관련한 조건과 의무 사항에 관해 책임을 지지 않습니다.

| 서비스                  | 단계                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - S3 버킷에 맞는 AWS 계정과 역할 조합을 선택합니다.<br>- 버킷 이름을 입력합니다.<br> **(선택 사항)**: 로그 아카이브에 있는 모든 내용에 적용할 접두사 디렉터리를 입력합니다. |
| **Azure Storage**        | - **Azure Storage** 아카이브 유형을 선택하고 Datadog App의 Azure 테넌트와 클라이언트를 선택합니다. 스토리지 계정에 Storage Blob Data Contributor 역할이 있는 것을 선택해야 합니다.<br>- 아카이브의 스토리지 계정 이름과 컨테이너 이름을 입력합니다.<br>**(선택 사항)**: 로그 아카이브의 모든 내용에 적용할 접두사 디렉터리를 입력합니다. |
| **Google Cloud Storage** | - **Google Cloud Storage** 아카이브 유형을 선택하고, 스토리지 버킷에 쓸 권한이 있는 GCS Service Account를 선택합니다.<br>- 버킷 이름을 입력합니다.<br>**(선택 사항)**: 로그 아카이브의 모든 내용에 적용할 접두사 디렉터리를 입력합니다. |

### 고급 설정 

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="선택 사항으로 태그를 추가하고 최대 스캔 규모를 정의하는 고급 설정" style="width:100%;" >}}

#### Datadog 태그

(선택 사항) 추가 설정을 통해 다음을 수행합니다.

* 아카이브에 모든 로그 태그를 포함합니다(모든 새 아카이브에서 기본적으로 활성화됨). **참고**: 이렇게 하면 결과 아카이브의 크기가 늘어납니다.
* 제한 쿼리 정책에 따라 리하이드레이션된 로그에 태그를 추가합니다. [`logs_read_data`][13] 권한을 참조하세요.

#### 최대 스캔 크기 정의하기

(선택 사항) 이 설정 단계를 사용하여 로그 아카이브에서 Rehydration을 위해 스캔할 수 있는 로그 데이터의 최대 볼륨(GB)을 정의할 수 있습니다.

최대 스캔 크기가 정의된 아카이브의 경우 모든 사용자는 Rehydration을 시작하기 전에 스캔 크기를 추정해야 합니다. 예상 스캔 크기가 해당 아카이브에 허용된 크기보다 큰 경우 사용자는 Rehydration을 요청하는 시간 범위를 줄여야 합니다. 시간 범위를 줄이면 스캔 크기가 줄어들고 사용자가 Rehydration을 시작할 수 있습니다.

{{< site-region region="us3" >}}
#### 방화벽 규칙

{{< tabs >}}
{{% tab "Azure storage" %}}

방화벽 규칙은 지원되지 않습니다.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}
#### 스토리지 클래스

{{< tabs >}}
{{% tab "AWS S3" %}}

[S3 버킷에 수명 주기를 설정][1]하여 로그 아카이브를 최적의 스토리지 클래스로 자동 전환할 수 있습니다.

[Rehydration][2]은 다음 스토리지 클래스만 지원합니다.

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval
* S3 인텔리전트 계층화([선택 사항인 비동기식 아카이브 액세스 계층][3]이 모두 비활성화되었을 경우만)

다른 스토리지 클래스의 아카이브에서 리하이드레이션하려면 먼저 해당 아카이브를 위의 지원되는 스토리지 클래스 중 하나로 이동해야 합니다.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /ko/logs/archives/rehydrating/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Azure Storage" %}}

Archiving 및 [Rehydration][1]은 다음 액세스 계층만 지원합니다.

- 핫 액세스 계층
- 쿨 액세스 계층

다른 액세스 계층의 아카이브에서 리하이드레이션하려면 먼저 해당 아카이브를 위의 지원되는 계층 중 하나로 이동해야 합니다.

[1]: /ko/logs/archives/rehydrating/
{{% /tab %}}
{{< /tabs >}}

#### 서버 측 암호화 (SSE)

{{< tabs >}}
{{% tab "AWS S3" %}}

##### SSE-S3

Amazon S3 버킷의 기본 암호화는 Amazon S3 관리 키([SSE-S3][1])를 사용한 서버 측 암호화입니다.

S3 버킷이 SSE-S3으로 암호화되었는지 확인하려면 다음을 수행하세요.

1. S3 버킷으로 이동합니다.
1. **Properties** 탭을 클릭합니다.
1. **Default Encryption** 섹션에서, **Encryption key type**이 **Amazon S3 managed keys (SSE-S3)**인지 확인합니다.

##### SSE-KMS

또는 Datadog은 [AWS KMS][2]의 CMK를 사용한 서버 측 암호화를 지원합니다. 활성화하려면 다음 단계를 수행하세요.

1. CMK를 생성합니다.
2. 다음 콘텐츠로 CMK 정책을 CMK에 연결하고 AWS 계정 번호와 Datadog IAM 역할 이름을 적절하게 바꿉니다.

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

3. S3 버킷에서 **Properties** 탭으로 이동하여 **Default Encryption**을 선택합니다. "AWS-KMS" 옵션을 선택하고, CMK ARN을 선택한 후 저장합니다.

기존 KSM 키를 변경하려면 [Datadog 지원팀][3]에 문의하여 추가 지원을 받으세요.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
[3]: /ko/help/
{{% /tab %}}

{{< /tabs >}}

### 검증

Datadog 계정에 아카이브 설정이 성공적으로 완료되면 처리 파이프라인이 Datadog에 수집된 모든 로그를 강화하기 시작합니다. 이러한 로그는 이후에 아카이브로 전달됩니다.

그러나 아카이브 설정을 생성하거나 업데이트한 후 다음 아카이브 업로드가 시도되기까지 몇 분 정도 소요될 수 있습니다. 또한, 아카이브가 업로드되는 빈도는 다양할 수 있습니다. **15분 후에 스토리지 버킷을 다시 확인하여** 아카이브가 Datadog 계정에서 성공적으로 업로드되었는지 확인하세요.

그 후에도 아카이브가 여전히 보류 상태인 경우 포함 필터를 확인하여 쿼리가 유효하고 [Live Tail][14]의 로그 이벤트와 일치하는지 확인하세요. Datadog이 의도하지 않은 설정 또는 권한 변경으로 인해 로그를 외부 아카이브에 업로드하지 못하는 경우 해당 로그 아카이브가 설정 페이지에서 강조 표시됩니다.

{{< img src="logs/archives/archive_errors_details.png" alt="아카이브가 올바르게 설정되었는지 확인하세요." style="width:100%;">}}

오류 세부정보와 필요한 조치를 확인하려면 아카이브 위로 마우스를 가져가세요. [Events Explorer][15]에서도 이벤트가 생성됩니다. 이러한 이벤트에 대한 모니터를 생성하여 오류를 신속하게 감지하고 해결할 수 있습니다.

## 여러 아카이브

여러 아카이브가 정의된 경우 로그는 필터를 기반으로 첫 번째 아카이브를 입력합니다.

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="로그는 필터와 일치하는 첫 번째 아카이브를 입력합니다." style="width:100%;">}}

아카이브를 신중하게 주문하는 것이 중요합니다. 예를 들어 `env:prod` 태그로 필터링된 첫 번째 아카이브와 필터 없이 두 번째 아카이브(`*`와 동일)를 생성하는 경우 모든 프로덕션 로그는 하나의 스토리지 버킷 또는 경로로 이동하고 나머지는 다른 스토리지 버킷 또는 경로로 이동합니다.

## 아카이브 형식

Datadog이 스토리지 버킷에 전달하는 로그 아카이브는 압축된 JSON 형식(`.json.gz`)입니다. 지정한 접두사를 사용하여 (없는 경우 `/`) 아카이브는 다음과 같이 아카이브 파일이 생성된 날짜와 시간을 나타내는 디렉터리 구조에 저장됩니다.

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<DATADOG_ID>.json.gz
```

이 디렉터리 구조는 날짜를 기준으로 기록 로그 아카이브를 쿼리하는 프로세스를 단순화합니다.

압축된 JSON 파일 내에서 각 이벤트의 콘텐츠 형식은 다음과 같습니다.

```json
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "source_name",
    "service": "service_name",
    "status": "status_level",
    "message": "2018-05-15T14:31:16.003Z INFO rid='acb-123' status=403 method=PUT",
    "attributes": { "rid": "abc-123", "http": { "status_code": 403, "method": "PUT" } },
    "tags": [ "env:prod", "team:acme" ]
}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/indexes/#exclusion-filters
[2]: /ko/logs/archives/rehydrating/
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[4]: /ko/observability_pipelines/archive_logs/
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
[15]: /ko/service_management/events/explorer/