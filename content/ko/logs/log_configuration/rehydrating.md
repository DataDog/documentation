---
aliases:
- /ko/logs/historical-views
- /ko/logs/archives/rehydrating/
description: 아카이브의 로그 이벤트를 Datadog으로 다시 캡처하세요.
title: 아카이브에서 리하이드레이션
---

## 개요

Log Rehydration을 통해 고객 소유의 스토리지 최적화 아카이브에서 Datadog의 검색 최적화 [Log Explorer][1]로 다시 로그 이벤트를 캡처할 수 있습니다. 또한 Datadog을 사용하여 오래되었거나 인덱싱에서 제외된 로그 이벤트를 분석하거나 조사할 수 있습니다.

## 기록 뷰

기록 뷰를 통해 팀은 보관된 로그 이벤트를 기간 및 쿼리 필터별로 정확하게 리하이드레이션하여 예상치 못한 특정 사용 사례를 효율적으로 충족할 수 있습니다.

기록 뷰를 생성하려면

1. [Rehydrate From Archives][3] 페이지로 이동합니다.
3. **New Historical View**를 클릭합니다.

인덱스 제외 필터는 기록 뷰에 적용되지 않으므로 아카이브에서 리하이드레이션할 때 제외 필터를 수정할 필요가 없습니다.

기록 뷰를 CSV로 다운로드하면 데이터가 지난 90일로 제한됩니다.

### 새 기록 뷰 추가하기

1. 로그 이벤트를 리하이드레이션하려는 **기간을 선택**합니다.

2. 로그 이벤트를 리하이드레이션하려는 **아카이브를 선택**합니다. [역할 위임을 사용하도록 구성](#permissions)된 아카이브만 리하이드레이션에 사용할 수 있습니다.

3. (선택 사항) **스캔 크기를 추정**하고 선택한 기간 동안 아카이브에 포함된 압축 데이터의 총량을 가져옵니다.

4. **기록 뷰의 이름을 지정합니다**. 이름은 소문자로 시작해야 하며 소문자, 숫자, `-` 문자만 포함할 수 있습니다.

5. **검색어를 입력합니다**. 쿼리 구문은 [로그탐색기 검색][4]과 동일합니다. 리하이드레이션 쿼리에 태그(예: `env:prod` 또는 `version:x.y.z`)를 사용하는 경우 로그가 [태그와 함께 보관][5]되었는지 확인하세요.

6. 이 기록 뷰에서 리하이드레이션해야 하는 최대 로그 수를 정의합니다. 리하이드레이션 제한에 도달하면 다시 로드가 중지되지만 여전히 리하이드레이션된 로그에 액세스할 수 있습니다.

7. 리하이드레이션된 로그의 보존 기간을 정의합니다(사용 가능한 보존 기간은 계약에 따라 결정되며 기본값은 15일입니다).

8. (선택 사항) @handle 구문과 함께 [통합][6]을 사용하여 리하이드레이션 완료에 대한 트리거 알림을 **알립니다**.

{{< img src="logs/archives/log_rehydration_setup.png" alt="아카이브에서 다시 로드" style="width:75%;">}}

**참고**: 쿼리는 기간과 일치하는 파일이 아카이브에서 다운로드된 _후에_ 적용됩니다. 클라우드 데이터 전송 비용을 줄이려면 선택한 날짜 범위를 줄입니다.

#### 쿼리별 리하이드레이션

특정 쿼리(예: 하나 이상의 서비스, URL 엔드포인트 또는 고객 ID)를 사용하여 기록 뷰를 생성하면 로그 하이드레이션에 소요되는 시간과 비용을 줄일 수 있습니다. 이는 더 넓은 시간 범위에 걸쳐 리하이드레이션을 진행할 때 특히 유용합니다. 생성한 기록 뷰당 최대 10억 개의 로그 이벤트를 리하이드레이션할 수 있습니다.

#### 알림

리하이드레이션이 시작되고 완료되면 이벤트가 자동으로 트리거됩니다.
이러한 이벤트는  [Events Explorer][7]에서 확인할 수 있습니다.

기록 뷰를 생성하는 동안 기본 제공 템플릿 변수를 사용하여 리하이드레이션이 끝날 때 트리거되는 알림을 사용자 정의할 수 있습니다.

| 변수                      | 설명                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{archive}}`                 | 리하이드레이션에 사용된 아카이브 이름                           |
| `{{from}}`                    | 리하이드레이션을 위해 선택한 시간 범위의 시작                    |
| `{{to}}`                      | 리하이드레이션을 위해 선택한 시간 범위의 종료                      |
| `{{scan_size}}`               | 리하이드레이션 중에 처리된 파일의 총 크기                |
| `{{number_of_indexed_logs}}`  | 리하이드레이션된 로그의 총 개수                                         |
| `{{explorer_url}}`            | 리하이드레이션된 로그에 대한 직접 링크                                      |

### 기록 뷰 콘텐츠 보기

#### 기록 뷰 페이지에서

"Rehydrate from Archive"을 선택하면 해당 콘텐츠를 쿼리할 준비가 될 때까지 기록 뷰가 "pending" 으로 표시됩니다.

콘텐츠 리하이드레이션이 끝나면 기록 뷰가 active로 표시되고 쿼리 열의 링크가 Log Explorer의 기록 뷰로 연결됩니다.

#### Log Explorer에서

또는 인덱스 선택기에서 직접 Log Explorer의 기록 뷰를 찾을 수 있습니다.

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="Log Explorer" width="75%">}}

### 진행 중인 기록 뷰 취소하기

잘못된 시간 범위로 리하이드레이션을 시작했거나 실수로 인덱싱 쿼리에 오타가 있는 경우 Rehydrate from Archives 페이지에서 진행 중인 리하이드레이션을 직접 취소하세요.

이미 인덱싱된 로그는 해당 기록 뷰에 대해 선택한 보존 기간이 끝날 때까지 쿼리 가능한 상태로 유지되며, 이미 스캔하고 인덱싱한 모든 로그에는 계속 요금이 청구됩니다.

{{< img src="logs/archives/log_archives_cancel_ongoing_rehydration.png" alt="진행 중인 리하이드레이션 취소" width="75%" >}}

### 기록 뷰 삭제하기

기록 뷰는 선택한 보존 기간을 초과할 때까지 Datadog에 유지됩니다. 또는 해당 뷰가 더 이상 필요하지 않은 경우 더 빨리 삭제하도록 선택할 수 있습니다. 기록 뷰 맨 오른쪽에 있는 삭제 아이콘을 선택하여 삭제할 기록 뷰를 표시할 수 있습니다.

한 시간 후에 기록 뷰가 완전히 삭제됩니다. 그때까지는 팀에서 삭제를 취소할 수 있습니다.

{{< img src="logs/archives/log_archives_rehydrate_delete.mp4" alt="기록 뷰 삭제" video="true" width="75%" >}}

### 삭제된 기록 뷰 보기

`View` 드롭다운 메뉴를 사용하면 과거 최대 1년 동안 삭제된 기록 뷰를 확인할 수 있습니다. 

{{< img src="logs/archives/log_archives_deleted_rehydrations.png" alt="기록 뷰 삭제" width="75%" >}}

## 아카이브 리하이드레이션 설정

### Datadog 아카이브 정의

외부 아카이브에서 데이터를 리하이드레이션하려면 외부 아카이브를 구성해야 합니다. [가이드에 따라][8] 사용 가능한 대상에 로그를 보관하세요.

### 권한 허용

Datadog은 아카이브의 콘텐츠를 리하이드레이션하기 위해 아카이브에서 읽을 수 있는 권한이 필요합니다. 이 권한은 언제든지 변경될 수 있습니다.

{{< tabs >}}
{{% tab "Amazon S3" %}}

아카이브에서 로그 이벤트를 리하이드레이션하기 위해 Datadog은 [AWS 통합][1]을 위해 구성한 AWS 계정의 IAM 역할을 사용합니다. 해당 역할을 아직 생성하지 않은 경우 [다음 단계에 따라 생성하세요][2]. 해당 역할이 아카이브에서 로그 이벤트를 리하이드레이션하도록 허용하려면 IAM 정책에 다음 권한 설명을 추가하세요. 버킷 이름을 편집하고, 원하는 경우 로그 아카이브가 포함된 경로를 지정합니다.

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

#### S3 아카이브에 역할 위임 추가

DatadogDatadog은 역할 위임을 사용하여 액세스 권한을 부여하도록 구성된 아카이브의 리하이드레이션만 지원합니다. 위의 IAM 정책을 포함하도록 Datadog IAM 역할을 수정한 후에는 [아카이브 구성 페이지][3]의 각 아카이브에 올바른 AWS Account + Role 조합이 있는지 확인하세요.

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="S3 아카이브에 역할 위임 추가" style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /ko/integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog은 아카이브의 스토리지 계정으로 범위가 지정된 Storage Blob Data Contributor 역할과 함께 Azure AD 그룹을 사용하여 로그 이벤트를 리하이드레이션합니다. [Datadog 통합 앱에 Storage Blob Data Contributor 역할을 할당][1]하여 스토리지 계정의 Access Control (IAM) 페이지에서 Datadog 서비스 계정에 이 역할을 부여할 수 있습니다.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Azure Storage에서 리하이드레이션하려면 Storage Blob Data Contributor 역할이 필요합니다." style="width:75%;">}}


[1]: /ko/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

아카이브에서 로그 이벤트를 리하이드레이션하기 위해 Datadog은 Storage Object Viewer 역할이 있는 서비스 계정을 사용합니다. [Google Cloud IAM Admin 페이지][1]에서 Datadog 서비스 계정에 이 역할을 부여하려면 서비스 계정 권한을 편집하고, 다른 역할을 추가한 다음 Storage > Storage Object Viewer를 선택합니다.

{{< img src="logs/archives/log_archives_gcs_role.png" alt="GCS에서 리하이드레이션하려면 Storage Object Viewer 역할이 필요합니다." style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

*Log Rehydration은 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/explorer/
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /ko/logs/explorer/search/
[5]: /ko/logs/archives/?tab=awss3#datadog-tags
[6]: /ko/integrations/#cat-notification
[7]: /ko/events/
[8]: /ko/logs/archives/