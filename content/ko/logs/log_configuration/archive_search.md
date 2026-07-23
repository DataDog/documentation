---
description: 장기 아카이브에서 재인덱싱 없이 로그를 즉시 검색하고 분석하세요.
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: Datadog에서 로그 탐색
- link: /logs/log_configuration/archives/
  tag: 설명서
  text: 로그 아카이브 구성
- link: /logs/indexes/
  tag: 설명서
  text: 로그 보존 및 인덱싱 관리
title: 아카이브 검색
---
## 개요 {#overview}

아카이브 검색을 통해 사전 리하이드레이션 없이 장기 객체 스토리지 아카이브에서 로그를 직접 쿼리할 수 있습니다. 아카이브 검색을 사용해 **아카이브된 로그에 즉시 액세스**하여 조사, 감사 또는 인덱싱 보존 기간 초과 문제 해결에 활용할 수 있습니다.

아카이브 검색은 백그라운드 배치 작업으로 실행되기 보다는 데이터를 스캔하는 동안 실시간으로 결과를 스트리밍하므로 리하이드레이션과 차이가 있습니다. 이 기능은 비용 대비 효율이 더 뛰어나며, 스캔 자체에 대해서만 요금이 부과되고, 처음 100,000개의 로그는 임시로 무료로 보존되고, 속도도 더 빠릅니다.

검색을 시작할 때 다음과 같이 진행됩니다.

* 로그가 전용 결과 페이지로 스트리밍됩니다.
* 최대 **100,000개의 로그**가 **24시간** 동안 보존됩니다.
* 필요 시, 검색 전후에 **결과 리하이드레이션**을 수행하여 로그를 더 오래 보존하고 Datadog 전체에서 사용할 수 있습니다.

이 기능은 다음을 통해 아카이브된 로그를 지원합니다.

- [Datadog Log Management 아카이브][1]
- [Observability Pipelines 아카이브][2]

### 일반 사용 사례 {#typical-use-cases}

아카이브 검색은 외부 아카이브에 저장된 로그를 쿼리해야 할 때 적합합니다.
일반 사용 사례에는 다음이 포함됩니다.

- **인시던트 조사:** 인덱싱 보존 기간 외의 `transaction_id`, `user_id` 또는 `session_id`에 연결된 로그를 검색합니다.<br>
  *예시: 인덱싱 보존 기간이 15일에 불과하더라도 특정 `user_id`를 사용하여 3주 전의 로그를 쿼리합니다.*

- **보안 분석:** 로그인 시도나 IP 또는 사용자에 의한 기타 활동을 조사하기 위해 아카이브된 로그를 검토합니다.<br>
  *예시: 지난 12개월 동안 특정 IP 주소에서의 모든 로그인 시도를 검색합니다.*

- **규정 준수 및 감사 지원:** 대량의 데이터를 영구적으로 다시 인덱싱하지 않고도 감사용으로 아카이브된 고객 또는 청구 로그에 접근합니다.<br>
  *예시: 세무 조사를 위해 지난 18개월 동안의 청구서 관련 로그(`customer_id:12345`, `service:billing`)를 쿼리합니다.*

## 전제 조건 {#prerequisites}

아카이브 검색을 사용하기 전에

1. 외부 아카이브(Amazon S3, Azure Storage 또는 Google Cloud Storage)를 구성합니다. [로그 아카이브][3]를 참조하세요.
1. Datadog이 아카이브에서 읽을 수 있는 권한이 있는지 확인합니다. [클라우드별 권한](#cloud-specific-permissions)을 참조하세요.
   * **Amazon S3:** IAM 역할 위임
   * **Azure Storage:** *Storage Blob Data Contributor* 역할을 보유한 Azure AD
   * **Google Cloud Storage:** *Storage Object Viewer* 역할을 보유한 서비스 계정

### 권한 {#permissions}

**아카이브 검색**을 실행하려면 **`logs_write_historical_views`** 권한이 필요합니다. 이는 **전역** 권한이지만, 사용자는 **Logs Read Archive** 권한이 있는 아카이브에서만 로그를 검색할 수 있습니다.

아카이브 검색 결과는 아카이브 검색 기능에 접근할 수 있는 조직의 모든 사용자에게 표시됩니다. 그러나 **제한 쿼리**(예: 로그 보안 필터 및 Datadog에서 구성된 데이터 제한)는 결과 페이지에서 계속 시행되어 모든 사용자에게 적용됩니다. 따라서 각 사용자는 조직 전체의 권한 및 필터에 따라 볼 수 있는 로그만 볼 수 있습니다.

액세스 제어 및 로그 보안에 대한 자세한 내용은 [로그의 RBAC 설정 방법][6]을 참조하세요.

## 검색 실행 {#launching-a-search}

1. [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Archive Search{{< /ui >}} > {{< ui >}}New Search{{< /ui >}}][4]로 이동합니다.
2. 아카이브와 시간 범위를 선택합니다.
3. `user_id:abc123`과 같은 쿼리를 입력합니다.
4. (선택 사항) 검색 이름을 변경합니다.
5. {{< ui >}}Mode{{< /ui >}} 아래에서 원하는 검색 유형을 선택합니다.
   - 실시간으로 결과를 조회하려면 {{< ui >}}Search{{< /ui >}}를 선택하세요. 24시간 동안 최대 100,000개의 로그가 보존됩니다.
   - 전체 플랫폼 액세스 및 사용자 지정 보존을 위해 결과를 리하이드레이션하려면 {{< ui >}}Search & Rehydration{{< /ui >}}을 선택하세요.
6. {{< ui >}}Search{{< /ui >}}를 클릭합니다.

로그가 실시간으로 결과 페이지에 스트리밍됩니다. 진행률 표시줄이 스캔 상태를 보여주며, 언제든지 검색을 취소할 수 있습니다.

## 쿼리 미리보기 {#query-preview}

검색을 수행하면 Datadog이 선택한 아카이브와 시간 범위에서 작은 샘플(최대 1,000개의 로그)을 다운로드합니다.
이 미리보기를 사용하여 쿼리 구문을 확인하고, 로그 구조를 검사하며, 필터를 조정할 수 있습니다.

**참고**: 미리보기 샘플에는 쿼리와 일치하는 로그가 포함되지 않을 수 있습니다. 미리보기는 유효성 검사 및 탐색 용도로만 사용됩니다.

## 결과 조회 및 보존 {#view-and-retain-results}

기본적으로 스캔에 대해서만 요금이 부과됩니다. 처음 100,000개의 로그는 일시적으로(24시간) 무료로 저장되며, 아카이브 검색 결과 페이지에서 직접 액세스할 수 있습니다. 여기서 로그를 클릭하면 전체 세부정보와 맥락을 볼 수 있습니다. 24시간 후에는 결과가 자동으로 만료됩니다.

더 많은 데이터 또는 다른 Datadog 제품의 액세스 로그를 보존하려면 다음 중 하나를 선택하세요.

- **검색 실행 전에 리하이드레이션**:
  100,000개가 넘는 로그를 보존하려면 사용자 지정 보존 기간(예: 7일, 15일 또는 30일)을 설정하고 플랫폼 전반에서 즉시 결과에 액세스하세요.
- **완료 후 리하이드레이션**:
  24시간 동안 결과를 리하이드레이션하여 보존 기간을 연장하고 Log Explorer, Dashboards, 및 Notebooks에서 사용할 수 있도록 합니다.

## 결과 분석 {#analyze-results}

검색을 실행한 후에는 로그가 {{< ui >}}Archive Search Results{{< /ui >}} 페이지로 스트리밍됩니다. 이 페이지에서 필터를 사용하여 결과를 좁히고 특정 로그 세부정보를 열어 문제를 조사할 수 있습니다.

### 제한 사항 {#limitations}

아카이브 검색 기능은 보관된 로그에 대한 액세스를 제공하지만, 해당 로그는 인덱싱된 로그에 비해 분석 기능이 제한적입니다.

- **집계 또는 분석 기능 없음**: 아카이브 검색 결과에 대해 집계를 실행하거나, 시각화를 생성하거나, 고급 분석을 수행할 수 없습니다.
- **결과 페이지 전용**: 아카이브 검색 결과는 전용 결과 페이지에서만 사용할 수 있으며 Datadog 플랫폼의 다른 부분(예: Dashboards, Notebooks 또는 Log Explorer)에서 쿼리할 수 없습니다.

전체 분석 및 플랫폼 전반의 시각화를 활성화하려면 검색 결과를 리하이드레이션해야 합니다(검색 시작 전이나 완료 후 24시간 이내). 리하이드레이션되면 모든 Datadog 제품에서 로그를 전체 집계, 시각화 및 분석 기능과 함께 사용할 수 있습니다.

## 검색 관리 {#manage-searches}

<!-- {{< img src="path/to/your/image-name-here.png" alt="이미지 설명" style="width:100%;" >}} -->

[{{< ui >}}Archive Search list view{{< /ui >}}][5]에서 다음을 수행할 수 있습니다.

- **진행 중인 검색 취소**: 이미 검색한 로그를 보존합니다.
- **검색 복제**: 효율적인 재실행을 위해 동일한 파라미터로 아카이브 검색 생성 양식을 엽니다.

## 검색 성능 및 최적화 {#search-performance-and-optimization}

아카이브 검색은 선택한 시간 범위 내에서 아카이브된 로그 파일을 스캔합니다. **스캔 볼륨**은 쿼리 중에 읽은 파일의 총 크기를 나타냅니다. 스캔 볼륨이 크면 검색 시간과 클라우드 이그레스 비용이 모두 증가할 수 있습니다.

성능을 최적화하고 비용을 줄이려면 다음 조치를 취하세요.
* **시간 범위 좁히기:** 가급적 더 작은 기간으로 검색을 제한하세요.
* **스캔 한도 설정:** `Logs Write Archives` 권한이 있는 관리자는 {{< ui >}}Settings{{< /ui >}}의 아카이브당 최대 스캔 크기를 설정할 수 있습니다.
* **파티션 특성 사용(미리보기):** `service`, `env` 또는 `status`와 같이 카디널리티가 낮은 데이터에서 검색을 가속화하는 가장 효과적인 방법입니다. Datadog은 쿼리와 일치하지 않는 전체 파티션을 건너뜁니다.
* **조회 특성 사용(미리보기):** `trace_id` 또는 `user_id`와 같이 카디널리티가 높은 데이터에서 검색을 가속화하는 가장 효과적인 방법입니다.
* **zstd 압축 사용:** 아카이브는 기본적으로 zstd 압축을 사용하여 gzip에 비해 스캔 볼륨과 클라우드 이그레스 비용을 줄입니다. 아카이브가 gzip을 사용하는 경우, zstd로 전환하려면 [로그 아카이브][9]를 참조하세요.

**참고**: 파티션 또는 조회 특성을 구성한 후에 아카이브된 로그만 가속화된 검색의 혜택을 받습니다. 이 구성 이전에 아카이브된 로그는 영향을 받지 않습니다.


### 파티션 특성으로 검색 가속화 {#accelerate-searches-with-partition-attributes}

쓰기 시점에 카디널리티가 낮은 필드 값으로 로그를 그룹화하기 위해 아카이브에서 **파티션 특성**을 구성할 수 있습니다. `service`, `source`, `env` 또는 `status`와 같은 특성을 사용하세요.

같은 파티션 값을 공유하는 로그는 스토리지에 함께 위치합니다. 검색할 때 Datadog은 쿼리를 파티션 메타데이터와 비교하고 일치하지 않는 파티션을 건너뛰어 스캔된 총 데이터를 줄입니다.

이를 설정하려면 [로그 아카이브][8] 설명서를 참조하세요.

### 조회 특성으로 검색 가속화 {#accelerate-searches-with-lookup-attributes}

아카이브에서 **조회 특성**을 구성하여 스토리지 버킷에서 관련 없는 데이터 블록을 건너뛸 수 있습니다. 예를 들어, `trace_id` 또는 `user_id`를 구성하면 스캔되는 데이터 양이 크게 줄어들고 클라우드 제공업체의 이그레스 요금이 낮아집니다.

이를 설정하려면 [로그 아카이브][7] 문서를 참조하세요.

### 파티션 특성 조회 특성 비교{#partition-vs-lookup-attributes}

| | 파티션 | 조회 |
|---|---|---|
| 카디널리티 | 낮음(수십에서 수백) | 높음(수백만 개의 값) |
| 일반적인 특성 | `service`, `source`, `env`, `status` | `trace_id`, `container_id`, `user_id`, `transaction_id` |
| 동작 방식| 전체 파티션을 스캔에서 제거 | 개별 로그 항목을 정확히 파악 |
| 적합한 용도| 환경/서비스 기준의 광범위한 필터링 | 특정 식별자에 대한 임시 조사 |

최상의 검색 성능을 위해 두 특성을 함께 사용하는 것이 좋습니다. 파티션 특성은 검색 범위를 관련 데이터 세그먼트로 좁히고, 조회 특성은 해당 세그먼트 내에서 특정 로그를 즉시 찾을 수 있도록 해줍니다.

### 결과 리하이드레이션의 기본 한도 {#default-limit-for-rehydration-of-results}

`Logs Write Archives` 권한이 있는 관리자는 팀 간의 효율적인 {{< ui >}}Archive Search{{< /ui >}} 사용을 보장하기 위해 기본 제어를 구성할 수 있습니다. {{< ui >}}Settings{{< /ui >}}를 클릭해 다음 항목을 구성하세요.

- {{< ui >}}Default Rehydration volume limit{{< /ui >}}: {{< ui >}}Search & Rehydration{{< /ui >}} 모드에서 아카이브 검색당 리하이드레이션할 수 있는 기본 로그 수(백만 단위)를 정의합니다. 한도에 도달하면 아카이브 검색이 자동으로 중지되지만, 이미 리하이드레이션된 로그는 계속 액세스할 수 있습니다. 관리자는 아카이브 검색 생성 중에는 이 한도가 재정의되도록 허용할 수도 있습니다.

- {{< ui >}}Rehydration retention periods{{< /ui >}}: 결과를 리하이드레이션할 때 선택 가능한 보존 기간을 선택합니다. Datadog에서 로그의 검색 가능 기간을 선택할 때 선택한 기간(예: 3, 7, 15, 30, 45, 60, 90 또는 180일)만 드롭다운 메뉴에 표시됩니다.

## 클라우드별 권한 {#cloud-specific-permissions}

Datadog에서 아카이브의 콘텐츠를 검색하려면 읽기 권한이 필요합니다. 이 권한은 언제든지 변경할 수 있습니다.

{{< tabs >}}
{{% tab "Amazon S3" %}}

Datadog은 아카이브에서 로그 이벤트를 리하이드레이션하기 위해 귀하가 [AWS 통합][1]을 위해 구성한 AWS 계정의 IAM 역할을 사용합니다. 아직 해당 역할을 생성하지 않았다면, [다음 단계를 따라 생성][2]하세요. 해당 역할이 아카이브에서 로그 이벤트를 리하이드레이션할 수 있도록, IAM 정책에 다음 권한 설명을 추가하세요. 버킷 이름을 수정한 후, 필요하다면 로그 아카이브가 포함된 경로를 지정합니다.

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

### S3 아카이브에 역할 위임 추가 {#adding-role-delegation-to-s3-archives}

Datadog은 역할 위임을 통해 액세스 권한이 부여된 아카이브에서만 검색을 지원합니다. 위의 IAM 정책을 포함하도록 Datadog IAM 역할을 수정한 후에는 [아카이브 구성 페이지][3]의 각 아카이브에 올바른 AWS 계정 + 역할 조합이 있는지 확인하세요.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /ko/integrations/amazon-web-services/#aws-iam-permissions
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog은 로그 이벤트를 검색하기 위해 아카이브의 스토리지 계정에 범위가 지정된 Storage Blob Data Contributor 역할을 보유한 Azure AD 그룹을 사용합니다. 스토리지 계정의 Access Control(IAM) 페이지에서 [Datadog 통합 앱에 Storage Blob Data Contributor 역할을 할당][1]하여 이 역할을 부여할 수 있습니다.

[1]: /ko/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Datadog은 아카이브에서 로그 이벤트를 검색하기 위해 Storage Object Viewer 역할을 보유한 서비스 계정을 사용합니다. [Google Cloud IAM 관리 페이지][1]에서 서비스 계정의 권한을 수정하고 다른 역할을 추가한 후 {{< ui >}}Storage{{< /ui >}} > {{< ui >}}Storage Object Viewer{{< /ui >}}를 선택하여 이 역할을 부여할 수 있습니다.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/archives/?tab=awss3
[2]: /ko/observability_pipelines/destinations/datadog_archives/?tab=docker
[3]: /ko/logs/log_configuration/archives/?tab=awss3
[4]: https://app.datadoghq.com/logs/archive-search/new
[5]: https://app.datadoghq.com/logs/archive-search/
[6]: /ko/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[7]: /ko/logs/log_configuration/archives/?tab=awss3#archive-search-lookup-attribute
[8]: /ko/logs/log_configuration/archives/?tab=awss3#archive-search-partition-attribute
[9]: /ko/logs/log_configuration/archives/?tab=awss3#compression