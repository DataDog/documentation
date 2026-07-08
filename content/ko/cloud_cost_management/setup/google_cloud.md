---
aliases:
- /ko/cloud_cost_management/google_cloud/
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: 설명서
  text: AWS 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/azure
  tag: 설명서
  text: Azure 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/oracle
  tag: 설명서
  text: Oracle 청구서에 대한 인사이트 확보
title: Google Cloud
---
## 개요 {#overview}

Datadog에서 Google Cloud Cost Management를 사용하려면 다음 단계를 따르세요.
1. [Google Cloud Platform Integration][12] 구성
2. 필요한 권한(Google Service API, 내보내기 프로젝트 액세스, BigQuery 데이터 세트 액세스)을 사용하여 [세부 사용 비용 내보내기][13] 설정
3. 필요한 권한(버킷 액세스)을 갖춘 [Google Cloud Storage 버킷][15] 생성 또는 선택

## 설정 {#setup}

[API][18], [Terraform][19] 또는 아래 지침에 따라 Datadog에서 직접 설정할 수 있습니다.

### Google Cloud Platform 통합 구성 {#configure-the-google-cloud-platform-integration}
[Setup & Configuration][3]으로 이동하여 Google Cloud Platform 계정을 추가한 후 Google Cloud Platform 통합 구성 단계를 수행합니다.

<div class="alert alert-danger">
Datadog Google Cloud Platform 통합을 사용하면 이 서비스 계정이 액세스할 수 있는 모든 프로젝트를 Cloud Costs에서 자동으로 모니터링할 수 있습니다.
이러한 프로젝트의 인프라 모니터링 호스트를 제한하려면 호스트에 태그를 적용하세요. 그런 다음 통합 페이지의 {{< ui >}}Limit Metric Collection Filters{{< /ui >}} 섹션에서 해당 태그를 모니터링에 포함할지 제외할지 정의합니다.
</div>

{{< img src="cloud_cost/gcp_integration_limit_metric_collection.png" alt="Google Cloud Platform 통합 페이지의 Metric Collection Filters 제한 설정 섹션" >}}

### 세부 사용 비용 내보내기 활성화 {#enable-detailed-usage-cost-export}
<div class="alert alert-info">
<a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">세부 사용 비용 데이터</a>는 표준 사용량 비용 데이터에 포함된 모든 정보를 제공하며, 여기에 리소스 수준의 세부 비용 데이터를 제공하는 추가 필드를 포함합니다.
</div>

 1. Google Cloud 콘솔의 [Billing Export][1] > *Billing*으로 이동합니다.
 2. [세부 사용 비용][2] 내보내기를 활성화합니다(프로젝트와 BigQuery 데이터 세트를 선택하거나 새로 생성).
 3. 내보내기가 구성된 청구 계정의 {{< ui >}}Billing Account ID{{< /ui >}}와 내보내기 {{< ui >}}Project ID{{< /ui >}} 및 {{< ui >}}Dataset Name{{< /ui >}}을 기록해 둡니다.

{{< img src="cloud_cost/billing_export.png" alt="강조 표시된 Google Cloud 프로젝트 및 데이터 세트 정보" >}}

_새로 생성된 BigQuery 청구 내보내기 데이터 세트에는 최근 2개월의 데이터만 포함됩니다. 이 데이터가 BigQuery에 백필되는 데 하루 또는 이틀 정도 걸릴 수 있습니다._

#### Google Service API 활성화 {#enable-google-service-apis}
다음 권한을 통해 Datadog이 예약된 BigQuery 쿼리를 사용하여 청구 내보내기 데이터를 스토리지 버킷으로 전송하고 액세스할 수 있습니다.

- [BigQuery API][5]를 활성화합니다.
  1. Google Cloud 콘솔에서 Project Selector 페이지로 이동한 후 Google Cloud 프로젝트를 선택합니다.
  2. 모든 전송에 대해 프로젝트의 청구를 활성화합니다.

- [BigQuery Data Transfer Service][5]를 활성화합니다.
  1. API 라이브러리에서 BigQuery Data Transfer API 페이지를 엽니다.
  2. 드롭다운 메뉴에서 서비스 계정이 포함된 프로젝트를 선택합니다.
  3. {{< ui >}}ENABLE{{< /ui >}} 버튼을 클릭합니다.

  **참고:** BigQuery Data Transfer API는 서비스 계정이 포함된 Google 프로젝트에서 활성화되어 있어야 합니다.

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/gcp_terraform_setup.png" alt="Terraform 모드의 Cloud Cost Management 설정 양식" style="width:100%" >}}

### 구성 세부 정보 정의 {#define-configuration-details}

구성에 대해 다음 정보를 입력합니다.

* **GCP Storage Bucket**: 스토리지 버킷을 생성하려면 **예**를 선택하고, 기존 버킷을 사용하려면 **아니요**를 선택합니다.

    **참고**: 기존 버킷을 사용하는 경우 해당 버킷이 BigQuery 내보내기 데이터 세트와 동일한 위치에 있는지 확인하세요.

* **Bucket Name**: 새로 생성하거나 기존에 사용하는 GCP 스토리지 버킷의 이름입니다.
* **Region**: 버킷이 위치한 GCP 리전입니다. 예를 들어, `northamerica-northeast1`입니다.
* **Billing Account ID**: 사용량 비용 내보내기가 비용을 보고하는 청구 계정의 ID입니다.
* **Export Project Name and ID**: 내보내기 프로젝트의 이름 및 ID입니다.
* **Export Dataset Name and ID**: 내보내기 데이터 세트의 이름 및 ID입니다.

### 비용 내보내기 생성 및 Google Service API 활성화 {#create-cost-export-and-enable-google-service-apis}

위의 [Detailed Usage Cost Export 활성화](#enable-detailed-usage-cost-export) 및 [Google Service API 활성화](#enable-google-service-apis) 단계를 완료한 후 CCM으로 돌아갑니다.

### 생성된 Terraform HCL 복사 및 변경 사항 적용 {#copy-generated-terraform-hcl-and-apply-changes}

CCM Terraform 설정 UI에서 **Terraform 구성 적용** 단계의 지침을 따르세요. CCM으로 돌아가 계정 생성 여부를 확인하기 전에 `terraform plan` 또는 `terraform apply` 실행 중 발생하는 모든 문제를 해결하세요.

{{% /tab %}}

{{% tab "수동" %}}

{{< img src="cloud_cost/setup/gcp_manual_setup.png" alt="수동 모드의 Cloud Cost Management 설정 양식" style="width:100%" >}}

#### 내보내기 프로젝트 액세스 구성 {#configure-export-project-access}
[내보내기 데이터 세트 프로젝트 리소스에 서비스 계정을 주체로 추가][7]:
1. Google Cloud 콘솔의 IAM 페이지로 이동하여 내보내기 데이터 세트 프로젝트를 선택합니다.
2. 서비스 계정을 주체로 선택합니다.
3. 드롭다운 목록에서 다음 권한이 포함된 역할을 선택하여 부여합니다.
  * `bigquery.jobs.create`
  * `bigquery.transfers.get`
  * `bigquery.transfers.update`

  **참고:** 사용자 지정 역할을 사용할 수 있으며, 기존 Google Cloud 역할인 `roles/bigquery.admin`을 사용할 수도 있습니다.

#### 내보내기 BigQuery 데이터 세트 액세스 구성 {#configure-export-bigquery-dataset-access}
[내보내기 BigQuery 데이터 세트 리소스에 서비스 계정을 주체로 추가][8]:
1. BigQuery 페이지의 Explorer 창에서 프로젝트를 확장한 후 내보내기 BigQuery 데이터 세트를 선택합니다.
2. {{< ui >}}Sharing{{< /ui >}} > {{< ui >}}Permissions{{< /ui >}} > {{< ui >}}add principal{{< /ui >}}을 차례로 클릭합니다.
3. 새 주체 필드에 서비스 계정을 입력합니다.
4. 역할 선택 목록에서 다음 권한이 포함된 역할을 할당합니다.
  * `bigquery.datasets.get`
  * `bigquery.tables.create`
  * `bigquery.tables.delete`
  * `bigquery.tables.export`
  * `bigquery.tables.get`
  * `bigquery.tables.getData`
  * `bigquery.tables.list`
  * `bigquery.tables.update`
  * `bigquery.tables.updateData`

  **참고:** 사용자 지정 역할을 사용할 수 있으며, 기존 Google Cloud 역할인 `roles/bigquery.dataEditor`를 사용할 수도 있습니다.

#### 버킷 액세스 구성 {#configure-bucket-access}
[GCS 버킷 리소스에 서비스 계정을 주체로 추가][6]:
1. Google Cloud 콘솔의 Cloud Storage Buckets 페이지로 이동하여 버킷을 선택합니다.
2. 권한 탭을 선택한 후 {{< ui >}}grant access{{< /ui >}} 버튼을 클릭합니다.
3. 새 주체 필드에 서비스 계정을 입력합니다.
4. 다음 권한이 포함된 역할을 할당합니다.
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **참고:** 사용자 지정 역할을 사용할 수 있으며, 기존 Google Cloud 역할인 `roles/storage.legacyObjectReader` 및 `roles/storage.legacyBucketWriter`를 사용할 수도 있습니다.

[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset

{{% /tab %}}

{{< /tabs >}}

### Google Cloud Storage 버킷 생성 또는 선택 {#create-or-select-a-google-cloud-storage-bucket}
Cloud Cost Management는 Detailed Usage Cost BigQuery 데이터 세트에서 추출된 데이터를 수신하기 위해 GCP 스토리지 버킷을 사용합니다(접두사 `datadog_cloud_cost_detailed_usage_export` 사용). 새 버킷을 생성하거나 기존 버킷을 사용할 수 있습니다.

**참고:** 버킷은 BigQuery 내보내기 데이터 세트와 [동일한 위치에 있어야][9] 합니다.

### (선택 사항) 프로젝트 간 서비스 권한 부여 구성 {#optional-configure-cross-project-service-authorization}
통합된 서비스 계정이 청구 내보내기 데이터세트와 다른 Google Cloud Platform 프로젝트에 존재하는 경우 [프로젝트 간 서비스 계정 권한을 부여][10]해야 합니다.

1. 다음 값을 사용하여 [공식 문서][11]에 따라 서비스 에이전트 생성을 트리거합니다.
   * ENDPOINT: `bigquerydatatransfer.googleapis.com`
   * RESOURCE_TYPE: `project`
   * RESOURCE_ID: 내보내기 데이터 세트 프로젝트<br><br>

     이 작업을 수행하면 `service-<billing project number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com` 형식의 새로운 서비스 에이전트가 생성됩니다.


2. 트리거에 의해 생성된 BigQuery Data Transfer Service Account 역할을 서비스 계정의 주체로 추가합니다.
3. 해당 계정에 `roles/iam.serviceAccountTokenCreator` 역할을 할당합니다.

### Cloud Cost 구성 {#configure-cloud-cost}
[설정 및 구성][3]에 표시된 단계에 따라 계속 진행합니다.

**참고**: 설정 후 Datadog에서 데이터가 안정화되기까지 48~72시간이 소요될 수 있습니다.

### 과거 데이터 가져오기 {#getting-historical-data}

새로 생성된 BigQuery 청구 내보내기 데이터 세트에는 최근 2개월의 데이터만 포함됩니다. 이 데이터가 BigQuery에 백필되는 데 하루 또는 이틀 정도 걸릴 수 있습니다. Datadog은 BigQuery 테이블에 데이터가 표시되면 최대 15개월의 사용 가능한 과거 비용 데이터를 자동으로 수집합니다.

Google Cloud는 BigQuery 내보내기 생성 시 자동 포함되는 2개월 이외의 추가 과거 데이터를 백필하는 기능을 제공하지 않습니다.

## 비용 유형 {#cost-types}
다음 비용 유형을 사용하여 수집된 데이터를 시각화할 수 있습니다.

| 비용 유형                                       | 설명 |
|-------------------------------------------------| ----------------------------------|
| `gcp.cost.amortized`                            | 일정 기간 동안 사용 시점에 할당된 리소스의 총비용입니다. 비용에는 프로모션 크레딧과 약정 사용 할인 크레딧이 포함됩니다. |
| `gcp.cost.amortized.shared.resources.allocated` | 모든 Google Cloud Platform 상각 비용과 함께 컨테이너 워크로드에 대한 추가 분석 및 인사이트를 제공합니다. [컨테이너 비용 할당][14]이 필요합니다.|
| `gcp.cost.ondemand`                             | 공개 요금 기준의 총 온디맨드 비용으로, 일정 기간 동안 공개 할인 및 비공개 할인이 적용되기 전의 리소스 비용입니다. |

### 기본 제공 태그 {#out-of-the-box-tags}

Datadog은 여러 소스의 태그를 사용하여 Google Cloud 비용 데이터를 자동으로 보강합니다. 비용 데이터에 태그가 적용되는 방식에 대한 전체 개요는 [Tags][17] 설명서를 참조하세요.

다음 기본 제공 태그는 [세부 사용 비용 보고서][16]에서 파생되며 비용 데이터를 보다 쉽게 탐색하고 이해할 수 있도록 지원합니다.

| 태그 이름                         | 태그 설명       |
| ---------------------------- | ----------------- |
| `google_product`             | 청구되는 Google 서비스입니다.|
| `google_cost_type`           | 이 항목에 적용되는 비용 유형입니다(예: 일반 비용, 세금, 조정, 반올림 오차).|
| `google_usage_type`          | 항목의 사용 세부 정보입니다(예: Standard Storage US).|
| `google_location`            | 다중 리전, 국가, 리전 또는 가용 영역 수준에서 항목과 연결된 위치 정보입니다.|
| `google_region`              | 항목과 연결된 리전입니다.|
| `google_zone`                | 항목과 연결된 가용 영역입니다.|
| `google_pricing_usage_unit`  | 사용 비용 계산에 사용된 가격 단위입니다(예: GiB, TiB, Year).|
| `google_is_unused_reservation`| 사용량이 예약되었으나 실제로 사용되지 않았는지 여부입니다.|
| `service_description` | Google Cloud 서비스입니다(예: Compute Engine 또는 BigQuery). |
| `project_id` | Cloud Billing 데이터를 생성한 Google Cloud 프로젝트의 ID입니다. |
| `project_name` | Cloud Billing 데이터를 생성한 Google Cloud 프로젝트의 이름입니다. |
| `cost_type` | `regular`, `tax`, `adjustment` 또는 `rounding error`는 이 라인 항목이 나타내는 비용 유형입니다. |
| `sku_description` | 사용된 리소스 유형에 대한 설명으로, 리소스의 사용 세부 정보를 나타냅니다. |
| `resource_name` | 고객이 리소스에 지정한 이름입니다. 모든 리소스에 존재하는 것은 아닙니다. |
| `global_resource_name` | Google Cloud에서 생성한 전역 고유 리소스 식별자입니다. |

#### 비용 및 관측성 상관 분석 {#cost-and-observability-correlation}

비용을 관측성 데이터와 함께 확인하는 것은 인프라 변경이 비용에 미치는 영향을 이해하고, 비용 변동 원인을 파악하며, 비용과 성능을 모두 최적화하는 데 중요합니다. Datadog은 비용 메트릭과 관측성 메트릭을 쉽게 연관 분석할 수 있도록 주요 Google Cloud 서비스의 비용 데이터에 리소스 식별 태그를 자동으로 추가합니다.

예를 들어 각 Cloud SQL 데이터베이스의 비용 및 사용률을 확인하려면 `gcp.cost.amortized`, `gcp.cloudsql.database.cpu.utilization`, `gcp.cloudsql.database.memory.utilization`(또는 다른 Cloud SQL 메트릭)을 포함하는 테이블을 만들고 `database_id` 기준으로 그룹화할 수 있습니다. 또는 Cloud Function 사용량과 비용을 나란히 확인하려면 `gcp.cloudfunctions.function.execution_count` 및 `gcp.cost.amortized`를 `function_name` 기준으로 그룹화하여 그래프로 표시할 수 있습니다.

다음 기본 제공 태그를 사용할 수 있습니다.
| Google 제품     | 태그                        |
| -------------------| ----------------------------- |
| Compute Engine     | `instance_id`, `instance-type`|
| Cloud Functions    | `function_name`               |
| Cloud Run          | `job_name`, `service_name`    |
| Cloud SQL          | `database_id`                 |
| Cloud Spanner      | `instance_id`                 |
| App Engine         | `module_id`                   |
| BigQuery           | `project_id`, `dataset_id`    |
| Kubernetes Engine  | `cluster_name`                |

### 컨테이너 할당 {#container-allocation}
**컨테이너 할당** 메트릭은 Google Cloud Platform 메트릭과 동일한 비용을 포함하면서도 컨테이너 워크로드를 위한 추가 분석 및 인사이트를 제공합니다. 자세한 내용은 [컨테이너 비용 할당][14]을 참조하세요.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.cloud.google.com/billing/export/
[2]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
[3]: https://app.datadoghq.com/cost/setup
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://cloud.google.com/bigquery/docs/enable-transfer-service
[9]: https://cloud.google.com/bigquery/docs/exporting-data#data-locations
[10]: https://cloud.google.com/bigquery/docs/enable-transfer-service#cross-project_service_account_authorization
[11]: https://cloud.google.com/iam/docs/create-service-agents#create
[12]: /ko/integrations/google_cloud_platform/
[13]: /ko/cloud_cost_management/setup/google_cloud/#enable-detailed-usage-cost-export
[14]: /ko/cloud_cost_management/container_cost_allocation/
[15]: /ko/cloud_cost_management/setup/google_cloud/#create-or-select-a-google-cloud-storage-bucket
[16]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage
[17]: /ko/cloud_cost_management/tags
[18]: /ko/api/latest/cloud-cost-management/#create-google-cloud-usage-cost-config
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/gcp_uc_config