---
aliases:
- /ko/logs/historical-views
- /ko/logs/archives/rehydrating/
description: 아카이브의 로그 이벤트를 Datadog으로 다시 캡처하세요.
further_reading:
- link: logs/archives
  tag: 설명서
  text: 로그 아카이브 설명서
- link: /logs/explorer/archive_search/
  tag: 설명서
  text: Archive Search
title: 아카이브에서 리하이드레이션
---
<div class="alert alert-info">
<strong><a href="/logs/explorer/archive_search/">Archive Search</a>는 아카이브된 로그에 액세스하는 데 권장되는 방법입니다.</strong><br>
재인덱싱 없이 아카이브에서 직접 실시간으로 결과를 스트리밍하며, 스캔한 데이터에 대해서만 요금이 부과됩니다. 전체 플랫폼 기능에 액세스하거나 로그를 더 오래 보존해야 하는 경우 Archive Search의 <strong>Search & Rehydration</strong> 모드를 사용합니다.
</div>

## 개요 {#overview}

Log Rehydration*을 통해 고객 소유의 스토리지 최적화 아카이브에서 Datadog의 검색 최적화 [Log Explorer][1]로 다시 로그 이벤트를 캡처할 수 있습니다. 또한 Datadog을 사용하여 오래되었거나 인덱싱에서 제외된 로그 이벤트를 분석하거나 조사할 수 있습니다.

### 기록 조회 {#historical-views}

기록 조회를 사용하면 팀에서 기간과 쿼리 필터에 따라 아카이브된 로그 이벤트를 리하이드레이션하여 예상치 못한 특정 사용 사례에 효율적으로 대응할 수 있습니다. 특정 쿼리(예: 하나 이상의 서비스, URL 엔드포인트 또는 고객 ID를 대상으로 하는 쿼리)로 기록 조회를 생성하면 로그 리하이드레이션에 소요되는 시간과 비용을 절감할 수 있습니다. 이는 더 긴 기간의 데이터를 리하이드레이션할 때 특히 유용합니다.

**주요 기능:**
- 기록 조회당 최대 10억 개의 로그 이벤트 리하이드레이션
- 인덱스 제외 필터는 기록 조회에 적용되지 않으므로 아카이브에서 리하이드레이션할 때 제외 필터를 수정할 필요가 없습니다.
- 기록 조회를 CSV 파일로 다운로드하면 최근 90일간의 데이터로 제한됩니다.

## 전제 조건 {#prerequisites}

아카이브에서 로그를 리하이드레이션하려면 먼저 다음 설정 단계를 완료해야 합니다.

### 아카이브 설정 {#archive-configuration}

리하이드레이션할 데이터가 저장된 외부 아카이브를 구성해야 합니다. 로그를 지원되는 저장 위치(Amazon S3, Azure Storage 또는 Google Cloud Storage)에 아카이브하는 방법은 [Log Archives][8]를 참조하세요.

### 권한 및 인증 {#permissions-and-authentication}

Datadog에서 콘텐츠를 리하이드레이션하려면 아카이브 읽기 권한이 필요합니다. 아카이브에 적절한 인증을 설정해야 합니다.

- **S3**: 역할 위임(IAM 역할)을 사용해야 합니다.
- **Azure Storage**: Storage Blob Data Contributor 역할을 가진 Microsoft Entra ID를 사용해야 합니다.
- **Google Cloud Storage**: Storage Object Viewer 역할을 보유한 서비스 계정을 사용해야 합니다.

적절한 인증을 받은 아카이브만 리하이드레이션에 사용할 수 있습니다. 자세한 설정 방법은 [클라우드별 권한](#cloud-specific-permissions)을 참조하세요.

## 기록 조회를 사용한 로그 리하이드레이션 {#rehydrating-logs-with-historical-views}

1. [리하이드레이션][3] 페이지로 이동합니다.
2. {{< ui >}}New Historical View{{< /ui >}}를 클릭합니다.
3. 리하이드레이션할 기간을 선택합니다.
4. 로그 이벤트를 리하이드레이션할 아카이브를 선택합니다. [역할 위임을 사용하도록 구성된](#permissions) 아카이브만 리하이드레이션에 사용할 수 있습니다.
5. (선택 사항) 스캔 크기를 추정하고 선택한 기간 동안 아카이브에 포함된 압축 데이터의 총량을 가져옵니다.
6. 기록 조회에 이름을 지정합니다. 이름은 소문자로 시작해야 하며 소문자, 숫자, `-` 문자만 포함할 수 있습니다.
7. [Log Explorer 검색 구문][4]을 사용하여 인덱싱 쿼리를 설정합니다. 리하이드레이션 쿼리에 태그(`env:prod` 또는 `version:x.y.z` 등)를 사용하는 경우 로그가 [태그와 함께 아카이브되었는지][5] 확인합니다.
8. 로그 제한(리하이드레이션할 최대 로그 수)을 설정합니다. 리하이드레이션 제한에 도달하면 로그 다시 불러오기가 중지되지만, 리하이드레이션된 로그에는 계속 액세스할 수 있습니다.
9. 리하이드레이션된 로그의 보관 기간을 설정합니다. 이는 리하이드레이션된 로그를 검색할 수 있는 기간을 지정합니다. 사용 가능한 보관 기간은 계약에 따라 다르며, 기본값은 15일입니다.
10. (선택 사항) @handle 구문을 사용하여 [통합][6]을 통해 [완료 알림을 구성](#rehydration-notifications)합니다.

리하이드레이션 스캔 크기에 대한 자세한 내용은 [리하이드레이션 스캔 크기 이해하기](#understanding-rehydration-scan-sizes)를 참조하세요.


## 기록 조회 관리 {#historical-views-management}

### 기록 조회 콘텐츠 보기 {#viewing-historical-view-content}

**기록 조회 페이지에서**:
'Rehydrate from Archive'를 선택하면 기록 조회의 콘텐츠를 쿼리할 수 있을 때까지 상태가 'PENDING'으로 표시됩니다.

콘텐츠가 리하이드레이션되면 기록 조회의 상태가 'ACTIVE'로 표시되고, 쿼리 열의 링크를 클릭하면 Log Explorer에서 해당 기록 조회가 열립니다.

**Log Explorer에서**:
Log Explorer에서 인덱스 선택기의 {{< ui >}}Index{{< /ui >}} 패싯을 엽니다. 검색에 포함할 Historical 인덱스를 선택합니다.

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="로그 탐색기" width="90%">}}

### 진행 중인 기록 조회 취소 {#canceling-ongoing-historical-views}

[리하이드레이션][3] 페이지에서 진행 중인 리하이드레이션을 취소하여 기간이 잘못 설정되었거나 인덱싱 쿼리에 오타가 있는 작업을 중지합니다.

이미 인덱싱된 로그는 기록 조회에 대해 선택한 보존 기간이 끝날 때까지 쿼리할 수 있습니다. 스캔 및 인덱싱된 모든 로그에 대해서는 계속 요금이 청구됩니다.

{{< img src="logs/archives/log_archives_cancel_ongoing_rehydration_settings.png" alt="Datadog에서 진행 중인 기록 조회 리하이드레이션 취소" width="90%" >}}

### 기록 조회 삭제 {#deleting-historical-views}

기록 조회는 그전에 삭제하지 않는 한 선택한 보존 기간이 끝날 때까지 Datadog에 유지됩니다. 기록 조회를 수동으로 삭제하려면 해당 조회의 맨 오른쪽에 있는 삭제 아이콘을 선택하고 삭제를 확인합니다.

기록 조회는 삭제가 시작된 후 하루 뒤에 영구적으로 삭제됩니다. 그때까지는 팀에서 삭제를 취소할 수 있습니다.

### 삭제된 기록 조회 보기 {#viewing-deleted-historical-views}

{{< ui >}}View{{< /ui >}} 드롭다운 메뉴를 사용하여 최대 1년 전에 삭제된 기록 조회를 확인합니다.

{{< img src="logs/archives/log_archives_deleted_rehydrations_settings.png" alt="Datadog에서 삭제된 기록 조회 보기" width="90%" >}}

## 고급 구성 {#advanced-configuration}

### 리하이드레이션 알림 {#rehydration-notifications}

리하이드레이션이 시작되고 완료될 때 이벤트가 자동으로 트리거됩니다. 이러한 이벤트는 [Events Explorer][7]에서 확인할 수 있습니다.

기본 제공 템플릿 변수를 사용하여 리하이드레이션이 완료될 때 발생하는 알림을 사용자 지정할 수 있습니다.

| 변수                      | 설명                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{archive}}`                 | Name of the archives used for the rehydration.                           |
| `{{from}}`                    | Start of the time range selected for the rehydration.                    |
| `{{to}}`                      | End of the time range selected for the rehydration.                      |
| `{{scan_size}}`               | Total size of the files processed during the rehydration.                |
| `{{number_of_indexed_logs}}`  | Total number of rehydrated logs.                                         |
| `{{explorer_url}}`            | 리하이드레이션된 로그에 대한 직접 링크                                      |

### 기록 조회의 기본 한도 {#default-limit-for-historical-views}

`Logs Write Archives` 권한이 있는 관리자는 여러 팀에서 Log Rehydration*을 효율적으로 사용할 수 있도록 기본 제어를 구성할 수 있습니다. {{< ui >}}Settings{{< /ui >}}를 클릭해 다음 항목을 구성하세요.

- {{< ui >}}Default Rehydration volume limit{{< /ui >}}: 기록 조회당 리하이드레이션할 수 있는 기본 로그 수(백만 단위)를 정의합니다. 한도에 도달하면 리하이드레이션이 자동으로 중지되지만, 이미 리하이드레이션된 로그는 계속 액세스할 수 있습니다. 관리자는 기록 조회를 생성할 때 이 한도를 재정의할 수 있도록 허용할 수도 있습니다.

- {{< ui >}}Rehydration retention periods{{< /ui >}}: 리하이드레이션을 생성할 때 선택 가능한 보존 기간을 선택합니다. Datadog에서 로그의 검색 가능 기간을 선택할 때 선택한 기간(예: 3, 7, 15, 30, 45, 60, 90 또는 180일)만 드롭다운 메뉴에 표시됩니다.

### 클라우드별 권한 {#cloud-specific-permissions}

Datadog에서 아카이브의 콘텐츠를 리하이드레이션하려면 아카이브 읽기 권한이 필요합니다. 이 권한은 언제든지 변경할 수 있습니다.

{{< tabs >}}
{{% tab "Amazon S3" %}}

Datadog은 아카이브에서 로그 이벤트를 리하이드레이션하기 위해 귀하가 [AWS 통합][1]을 위해 구성한 AWS 계정의 IAM 역할을 사용합니다. 아직 해당 역할을 생성하지 않았다면, [다음 단계를 따라 생성][2]하세요. 해당 역할에 [아카이브 권한 설정][4]의 정책이 적용되어 있다면 다음 권한 문을 추가하지 않아도 됩니다. 그렇지 않으면 역할의 IAM 정책에 다음 권한 문을 추가합니다. 버킷 이름을 수정한 후, 필요하다면 로그 아카이브가 포함된 경로를 지정합니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogRehydrateLogArchives",
      "Effect": "Allow",
      "Action": "s3:GetObject",
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

#### S3 아카이브에 역할 위임 추가 {#adding-role-delegation-to-s3-archives}

Datadog은 역할 위임을 사용하여 액세스 권한을 부여하는 아카이브에서만 로그 이벤트의 리하이드레이션을 지원합니다. 위의 IAM 정책을 포함하도록 Datadog IAM 역할을 수정한 후에는 [아카이브 구성 페이지][3]의 각 아카이브에 올바른 AWS 계정 + 역할 조합이 있는지 확인하세요.

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="S3 아카이브에 역할 위임 추가" style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /ko/integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
[4]: /ko/logs/log_configuration/archives/?tab=awss3#set-permissions
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog은 로그 이벤트를 리하이드레이션하기 위해 아카이브의 스토리지 계정에 범위가 지정된 Storage Blob Data Contributor 역할을 보유한 Microsoft Entra ID 그룹을 사용합니다. 스토리지 계정의 Access Control(IAM) 페이지에서 [Datadog 통합 앱에 Storage Blob Data Contributor 역할을 할당][1]하여 Datadog 서비스 계정에 이 역할을 부여할 수 있습니다.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Azure Storage에서 리하이드레이션하려면 Storage Blob Data Contributor 역할이 필요합니다." style="width:75%;">}}


[1]: /ko/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

아카이브에서 로그 이벤트를 리하이드레이션하기 위해 Datadog은 Storage Object Viewer 역할을 보유한 서비스 계정을 사용합니다. [Google Cloud IAM 관리 페이지][1]에서 서비스 계정의 권한을 수정하고 다른 역할을 추가한 후 {{< ui >}}Storage{{< /ui >}} > {{< ui >}}Storage Object Viewer{{< /ui >}}를 선택하여 이 역할을 부여할 수 있습니다.

{{< img src="logs/archives/log_archives_gcs_role.png" alt="GCS에서 리하이드레이션하려면 Storage Object Viewer 역할이 필요합니다." style="width:75%;">}}

{{< ui >}}Storage Object Viewer{{< /ui >}} 역할은 Datadog에서 권장하는 구성입니다. 조직에서 최소 권한 원칙에 따른 사용자 지정 역할을 요구하는 경우 리하이드레이션을 위해 다음 개별 권한이 필요합니다.

- `storage.objects.get`
- `storage.objects.list`

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}


## 리하이드레이션 스캔 크기 이해{#understanding-rehydration-scan-sizes}

쿼리는 아카이브에서 해당 기간에 속하는 파일을 다운로드한 _후에_ 적용됩니다. 결과적으로, 리하이드레이션 스캔 크기는 쿼리와 일치하는 로그의 수가 아니라 **아카이브에서 검색한 로그의 총 데이터 크기**를 기준으로 합니다. 아카이브 스토리지는 시간을 기준으로 데이터를 저장하므로 특정 필터(`service:A` 등)를 적용한 쿼리에서도 선택한 기간의 모든 로그를 검색합니다. 여기에는 다른 서비스(`service:A` 및 `service:B` 등)의 로그가 포함됩니다.

데이터가 다운로드된 후에 쿼리 필터가 적용되므로, 날짜 범위를 축소하는 것이 스캔 크기를 줄이고 클라우드 데이터 전송 비용을 최소화하는 가장 효과적인 방법입니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration은 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/explorer/
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /ko/logs/explorer/search/
[5]: /ko/logs/archives/?tab=awss3#datadog-tags
[6]: /ko/integrations/#cat-notification
[7]: /ko/events/
[8]: /ko/logs/archives/