---
aliases:
- /ko/logs/guide/enrichment-tables/
- /ko/logs/guide/reference-tables/
- /ko/integrations/guide/reference-tables
description: CSV 파일을 업로드하거나 클라우드 스토리지에 연결하여 Datadog 데이터와 사용자 정의 메타데이터를 결합하여 로그, 보안
  데이터 및 분석을 보강합니다.
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 조회 프로세서를 사용하여 참조 테이블에서 로그를 보강합니다.
- link: /logs/explorer/advanced_search#filter-logs-based-on-reference-tables
  tag: 설명서
  text: 참조 테이블을 기준으로 로그 필터링
- link: /sheets/#lookup
  tag: 설명서
  text: Sheets 조회
- link: /events/pipelines_and_processors/lookup_processor/
  tag: 설명서
  text: 이벤트용 조회 프로세서
- link: /cloud_cost_management/tag_pipelines/#map-multiple-tags
  tag: 설명서
  text: 비용 데이터에 여러 태그를 추가하기 위해 참조 테이블을 사용합니다.
- link: /metrics/reference_table_joins_with_metrics/
  tag: 설명서
  text: 메트릭과 함께 참조 테이블 조인에 대해 알아봅니다.
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: 블로그
  text: 참조 테이블을 사용하여 로그에 더 많은 컨텍스트 추가
- link: https://www.datadoghq.com/blog/reference-tables/
  tag: 블로그
  text: 참조 테이블을 사용하여 기존 Datadog 텔레메트리를 사용자 정의 메타데이터로 보강합니다.
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables-in-cloud-siem/
  tag: 블로그
  text: Datadog 참조 테이블을 사용하여 Cloud SIEM 탐지 및 조사의 맥락을 추가합니다.
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: 블로그
  text: 모든 SIEM 또는 로깅 도구로 라우팅하기 전에 ServiceNow CMDB 컨텍스트로 로그를 보강합니다.
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 MSSP의 로그 수집 및 집계를 간소화합니다.
title: Reference Tables
---
## 개요 {#overview}

참조 테이블을 사용하면 사용자 정의 메타데이터를 Datadog에 이미 있는 정보와 결합할 수 있습니다. 정보 테이블이 포함된 CSV 파일을 업로드하여 고객 세부정보, 서비스 이름 및 정보 또는 IP 주소와 같은 새로운 엔터티를 정의할 수 있습니다. 엔터티는 참조 테이블의 기본 키와 관련 메타데이터로 표현됩니다.

{{< img src="reference_tables/reference_table.png" alt="조직 ID, 조직 이름, 상위 조직, 계정 소유자 및 CSM에 대한 열에 데이터가 채워진 참조 테이블" style="width:100%;">}}

예를 들어 다음을 수행할 수 있습니다.

- **더 빠른 조사를 위한 로그 및 보안 데이터 보강:** 고객 이름, 계정 소유자, 위협 인텔리전스 또는 오류 코드 설명과 같은 최신 비즈니스 맥락으로 로그, 트레이스 및 보안 이벤트를 상관관계 지어 문제 해결 및 분석을 가속화합니다.
- **대상 분석 및 비용 관리를 위한 사용자 및 리소스 세분화:** 사용자 계층, 팀 또는 비즈니스 단위와 같은 의미 있는 세그먼트로 사용자, 고객 또는 클라우드 리소스를 그룹화하여 더 깊은 제품 분석 및 정밀한 비용 귀속을 위해 태그 파이프라인과 같은 도구를 사용합니다.
- **Enhance data for advanced querying and reporting:** Sheets, DDSQL 편집기 또는 Notebooks에서 참조 테이블의 외부 데이터를 조인하여 복잡한 쿼리, 집계 및 기술 전문 지식 없이 사용자 정의 보고서를 작성합니다.

## 참조 테이블 생성 {#create-a-reference-table}

Datadog은 통합 및 수동 CSV 업로드를 포함한 다음 소스를 지원합니다.

{{< tabs >}}
{{% tab "수동 업로드" %}}

**New Reference Table +**를 클릭한 다음 CSV 파일을 업로드하고, 적절한 열 이름을 지정하고, 조회를 위한 기본 키를 정의합니다.

{{< img src="reference_tables/schema_setup.png" alt="스키마 정의 섹션에는 org_id가 기본 키로 표시되고 org id, org name, parent org, account owner 및 csm에 대한 데이터가 포함된 테이블이 표시됩니다. " style="width:100%;">}}

**참고**: 수동 CSV 업로드 방법은 최대 4MB의 파일을 지원합니다.

{{% /tab %}}
{{% tab "클라우드 스토리지" %}}

{{% collapse-content title="Amazon S3" level="h4" id="amazon-s3" %}}

참조 테이블은 Amazon S3 버킷에서 CSV 파일을 자동으로 가져와 데이터를 최신 상태로 유지할 수 있습니다. 통합은 S3의 CSV 파일 변경 사항을 찾고, 파일이 업데이트되면 참조 테이블을 새 데이터로 교체합니다. 이를 통해 초기 참조 테이블이 구성된 후 S3 API를 사용한 API 업데이트가 가능합니다. **참고**: CSV 파일의 내용이 변경되지 않으면 참조 테이블이 교체되지 않습니다.

S3에서 참조 테이블을 업데이트하기 위해 Datadog은 [AWS 통합][1]을 위해 구성한 AWS 계정의 IAM 역할을 사용합니다. 아직 해당 역할을 생성하지 않았다면 [이 단계를 따라][2] 생성하세요. 해당 역할이 참조 테이블을 업데이트할 수 있도록 IAM 정책에 다음 권한 문을 추가합니다. 버킷 이름을 귀하의 환경에 맞게 수정하세요.

**참고**: 서버 측 암호화를 사용하는 경우 Amazon S3 관리 키(SSE-S3) 또는 AWS 키 관리 서비스 키(SSE-KMS)로 암호화된 참조 테이블을 업로드할 수 있습니다.

```json
{
	"Statement": [
		{
			"Sid": "EnrichmentTablesS3",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				// Grant KMS decrypt permissions if uploading KMS-encrypted object
				// "kms:Decrypt",
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::<MY_BUCKET_NAME_1/*>",
				"arn:aws:s3:::<MY_BUCKET_NAME_2>"
			]
		}
	],
	"Version": "2012-10-17"
}
```
#### 테이블 정의 {#define-the-table}

**New Reference Table +**를 클릭한 다음 이름을 추가하고 Amazon S3를 선택하고 모든 필드를 작성한 후 가져오기를 클릭하고 조회를 위한 기본 키를 정의합니다.

{{< img src="reference_tables/s3_table.png" alt="Amazon S3 타일이 선택된 상태에서 데이터가 AWS 계정, 버킷 및 경로에 대해 입력된 데이터 업로드 섹션" style="width:100%;">}}

**참고**: S3 버킷에서의 업로드 방법은 최대 200MB의 파일을 지원합니다.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=automaticcloudformation#installation

{{% /collapse-content %}}
{{% collapse-content title="Azure storage" level="h4" id="azure-storage" %}}

1. 아직 설정하지 않았다면, 참조 테이블을 가져오려는 스토리지 계정이 포함된 구독 내에서 [Azure 통합][1]을 설정하세요. 이는 Datadog이 통합할 수 있는 [앱 등록을 생성하는 것과 관련이 있습니다][2].
2. Azure 포털에서 참조 테이블 파일을 저장하는 스토리지 계정을 선택합니다.
3. 스토리지 계정 내에서 **Access Control (IAM)**로 이동하고 **Add** > **Add Role Assignment**를 선택합니다.
4. **Storage Blob Data Reader** 역할을 입력하고 선택합니다. [Storage Blob Data Reader 역할][3]은 Datadog이 스토리지 컨테이너와 블롭을 읽고 나열할 수 있도록 허용합니다.
5. **Members** 탭에서 **+ Select members**를 클릭합니다. 1단계에서 생성한 앱 등록을 선택합니다.

   {{< img src="reference_tables/add_members.png" alt="Azure 포털의 회원 섹션에서 회원을 선택하고 이름, 객체 ID 및 유형에 대한 데이터를 입력합니다." style="width:85%;">}}

역할을 검토하고 할당한 후 Azure에서 참조 테이블로 가져올 수 있습니다. Azure 구성 업데이트가 Datadog에서 완료되는 데 몇 분이 걸릴 수 있습니다.

{{< img src="reference_tables/azure_table.png" alt="새 참조 테이블 워크플로의 업로드 또는 데이터 가져오기 섹션에 있는 Azure Storage 타일" style="width:80%;">}}

자세한 내용은 [Azure 통합 문서][4]를 참조하세요.

**참고**: 클라우드 객체 스토리지에서의 업로드는 최대 200MB의 파일을 지원합니다.

[1]: https://app.datadoghq.com/integrations/azure
[2]: /ko/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /ko/integrations/azure/

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h4" id="google-cloud-storage" %}}

### Google Cloud Storage {#google-cloud-storage}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 이용할 수 없는 참조표</div>
{{% /site-region %}}

1. Datadog과 Google Cloud Platform 통합을 설정하지 않았거나 레거시 Google 프로젝트 ID 파일을 사용하고 있는 경우(레거시 프로젝트는 Google Cloud Platform 통합 타일에 표시됨), [Google Cloud Platform 통합][1] 설정 지침을 따르세요. 이 과정에는 [Google Cloud 서비스 계정][2] 생성이 포함됩니다.

1. Google Cloud 콘솔에서 **Cloud Storage** 페이지로 이동합니다.

1. 액세스를 부여할 버킷을 찾아 클릭합니다.

1. **Permissions** 탭을 클릭합니다. 'View By Principals'에서 **Grant Access** 버튼을 클릭합니다.

1. 나타나는 창에서 'New principals' 필드에 1단계에서 생성하여 GCP 타일에 추가한 서비스 계정 이메일을 입력합니다. 'Assign roles'에서 **Storage Object Viewer** 역할을 선택하세요. **Save**를 클릭합니다.

{{< img src="reference_tables/grant_access.png" alt="Google Cloud 콘솔에서 액세스 권한 부여 구성을 표시합니다." style="width:100%;" >}}

역할을 검토하고 할당한 후 Google Cloud에서 참조 테이블로 가져올 수 있습니다. 구성이 Datadog에서 업데이트되는 데 몇 분이 걸릴 수 있습니다.

{{< img src="reference_tables/gcp_table.png" alt="새 참조 테이블을 만들 때 데이터 업로드 또는 가져오기에서 GCP 스토리지를 선택합니다." style="width:100%;" >}}

**참고**: 클라우드 객체 스토리지에서의 업로드는 최대 200MB의 파일을 지원합니다.

[1]: /ko/integrations/google_cloud_platform/#setup
[2]: /ko/integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="terraform" %}}

[`datadog_reference_table`][9] 리소스를 사용하여 참조 테이블을 인프라를 코드로 관리합니다. 테이블 스키마, 기본 키 및 클라우드 스토리지 액세스 세부정보로 리소스를 구성합니다.

**참고**: Terraform은 클라우드 스토리지 업로드와 동일한 파일 크기 제한을 지원합니다. 자세한 내용은 [참조 테이블 제한](#reference-table-limits)을 참조하세요.

[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "API" %}}

[Datadog API][8]를 사용하여 프로그래밍 방식으로 참조 테이블을 생성합니다.

[Create Reference Table 엔드포인트][10]를 사용하여 클라우드 스토리지 또는 로컬 파일에서 참조 테이블을 생성합니다.
- 클라우드 스토리지 소스(S3, Azure, GCS)의 경우 `access_details`를 `file_metadata`에 제공하여 클라우드 스토리지의 CSV 파일을 가리킵니다.
- 로컬 파일의 경우 `POST /api/latest/reference-tables/uploads`를 호출하여 업로드 ID를 얻고 CSV 데이터를 업로드합니다. 그런 다음 `upload_id`을 `file_metadata`에 사용하여 참조 테이블 생성 엔드포인트를 호출합니다.

**참고**: API는 클라우드 스토리지 업로드와 동일한 파일 크기 제한을 지원합니다. 자세한 내용은 [참조 테이블 제한](#reference-table-limits)을 참조하세요.

[8]: /ko/api/latest/reference-tables/
[10]: /ko/api/latest/reference-tables/#create-reference-table

{{% /tab %}}
{{% tab "통합" %}}

{{< partial name="reference_tables/ref-tables-saas-integrations.html" >}}

{{% /tab %}}
{{< /tabs >}}

이 참조 테이블은 [조회 프로세서][1]를 사용하여 로그에 추가 특성을 추가하는 데 사용할 수 있습니다.

## 유효성 검사 규칙 {#validation-rules}

참조 테이블 이름과 열 헤더는 다음 명명 규칙을 사용하여 검증되며, 필요할 경우 자동으로 업데이트되거나 정규화됩니다.

| 규칙     | 정규화 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 이름과 헤더는 중복될 수 없습니다.											| 중복된 이름은 번호가 매겨집니다. 예를 들어, `fileid`가 이름으로 두 번 사용되면, 첫 번째 인스턴스는 `fileid1`이 되고 두 번째 인스턴스는 `fileid2`이 됩니다. 이름이나 헤더가 번호가 매겨지고 56자를 초과하면 거부되며 이름을 다시 지정해야 합니다. |
| 이름과 헤더는 대문자를 포함할 수 없습니다. 								| 대문자가 포함된 이름은 소문자로 변환됩니다. 이 변환은 중복된 이름을 초래할 수 있으며, 이 경우 번호가 매겨집니다. 예를 들어, `Fileid`와 `FileID`은 모두 `fileid`이 되고 각각 `fileid1`과 `fileid2`로 번호가 매겨집니다. |
| 이름과 헤더는 공백을 포함할 수 없습니다. 											| 선행 및 후행 공백을 제외한 공백은 언더스코어 `_` 문자로 대체됩니다. 선행 및 후행 공백은 제거됩니다. 예를 들어, `customer names`는 `customer_names`로 대체됩니다. |
| 이름과 헤더는 소문자로 시작해야 합니다. 							| 대문자는 소문자로 변환됩니다. 비문자 선행 문자는 제거됩니다. 예를 들어, `23Two_three`는 `two_three`이 됩니다.	|
| 이름과 헤더는 소문자, 숫자 및 `_` 문자만 지원합니다. | 지원되지 않는 문자는 언더스코어 `_` 문자로 대체되며, 위의 규칙 중 하나를 위반하지 않는 경우에만 적용됩니다. 그 경우, 지원되지 않는 문자는 해당 규칙에 따라 정규화됩니다.				|
| 이름과 헤더는 56자 이하이어야 합니다. 									| 정규화가 수행되지 않습니다. 56자 이상의 이름과 헤더는 거부되며, 이름을 변경해야 합니다. |

## 참조 테이블 수정 {#modify-a-reference-table}

새 데이터를 사용하여 기존 참조 테이블을 수정하려면, 테이블을 선택하고 오른쪽 상단의 **Update Config**를 클릭하세요.
선택된 CSV는 테이블에 업서트되며, 이는 다음을 의미합니다.

* 동일한 기본 키를 가진 모든 기존 행이 업데이트됩니다.
* 모든 새로운 행이 추가됩니다.
* 새 파일에 없는 모든 오래된 행이 삭제됩니다.

테이블이 저장되면, 업서트된 행은 비동기적으로 처리되어 미리 보기에서 업데이트됩니다. 업데이트가 완료되는 데 최대 10분이 소요될 수 있습니다.

## 참조 테이블 내보내기 {#export-a-reference-table}

참조 테이블을 내보내려면, 테이블을 선택하고 **Query in DDSQL Editor**를 클릭하세요. 거기에서 [DDSQL Editor][7]를 사용하여 CSV, Dashboard 등으로 내보낼 수 있습니다.

{{< img src="reference_tables/query_ddsql.png" alt="결과 위에 위치한 DDSQL Editor에서 Query라는 파란색 버튼이 있는 테이블 미리 보기가 표시됩니다." style="width:100%;" >}}

## 참조 테이블 삭제 {#delete-a-reference-table}

참조 테이블을 삭제하려면, 테이블을 선택하고 오른쪽 상단의 기어 아이콘을 클릭한 다음 **Delete Table**을 클릭하세요.
테이블과 모든 관련 행이 삭제됩니다.

로그 보강을 위해 참조 테이블을 사용하는 조회 프로세서가 있는 경우, 보강이 중단됩니다. 보강이 중지되기까지 최대 10분이 소요될 수 있습니다.

## 참조 테이블 활동 모니터링 {#monitor-reference-table-activity}

[Audit Trail][2] 또는 [Change Events][3]를 통해 참조 테이블 활동을 모니터링할 수 있습니다. 특정 참조 테이블의 Audit Trail 및 Change Events를 보려면 테이블을 선택하고 **Update Config** 옆의 설정 아이콘을 클릭하세요. Audit Trail을 보려면 조직 관리 권한이 필요합니다.

### Audit Trail {#audit-trail}

참조 테이블에 대한 Audit Trail을 사용하여 사용자가 트리거한 액션을 추적하세요. 사용자가 CSV 파일을 처음 업로드하거나 가져오거나, 사용자가 참조 테이블을 생성, 수정 또는 삭제할 때 Audit Trail 이벤트가 전송됩니다.

`reference_table_file`자산 유형은 가져오기/업로드 이벤트를 표시하고 `reference_table`자산 유형은 참조 테이블 이벤트를 표시합니다. 감사 추적은 참조 테이블의 내용에 대한 가시성을 제공합니다.

### 변경 이벤트 {#change-events}

참조 테이블에 대한 변경 이벤트를 사용하여 자동화된 또는 사용자가 트리거한 액션을 추적하세요. 사용자에 의해 또는 자동 새로 고침으로 클라우드 파일이 가져와질 때 전송됩니다. (로컬 파일을 업로드하는 것은 변경 이벤트를 생성하지 않습니다.) 이벤트는 사용자가 트리거한 액션을 추적할 수 있지만, 주로 참조 테이블이 새 CSV 파일을 자동으로 가져올 때 트리거된 가져오기를 추적하는 데 사용됩니다.

이벤트는 가져오기의 성공 상태, 경로 및 테이블 이름에 대한 정보를 포함합니다. 오류가 발생하면 오류 유형에 대한 정보가 제공됩니다.

### Alerting {#alerting}

가져오는 동안 발생한 오류에 대해 경보를 받으려면 참조 테이블 변경 이벤트에 대해 [이벤트 모니터링][4]을 사용하세요. 참조표 변경 이벤트는 `reference_tables` 소스에서 전송됩니다.

참조 테이블 모니터링은 **Monitors** 탭에서 생성할 수 있으며, **New Reference Table +** 옆의 설정 아이콘을 클릭하여 미리 채워진 모니터링을 생성할 수 있습니다.

## 참조 테이블 한계 {#reference-table-limits}
- 참조 테이블은 최대 50개의 열을 가질 수 있습니다.
- UI를 통해 업로드된 참조 테이블 파일의 크기는 최대 4 MB입니다.
- 클라우드 버킷 파일을 통해 업로드된 참조 테이블 파일의 크기는 최대 200 MB입니다.
- 통합을 통해 업로드된 참조 테이블 파일의 크기는 최대 200 MB입니다.
- 조직당 최대 100개의 참조 테이블을 가질 수 있습니다.

이 한계를 초과하는 사용 사례가 있는 경우 [지원][5]에 문의하세요.

## 자동 업데이트 빈도 {#automatic-update-frequency}

참조 테이블은 데이터 소스에 따라 자동으로 업데이트될 수 있습니다.

- **클라우드 파일 스토리지**(Amazon S3, Azure Storage, Google Cloud Storage): 5분마다
- **Integrations**: 매시간
- **CSV 수동 업로드**: 자동 업데이트는 지원되지 않습니다.

## 권한 {#permissions}

### 역할 기반 액세스 {#role-based-access}
참조 테이블을 보려면 사용자가 `reference_tables_read` 권한이 필요합니다. 참조 테이블을 생성하거나 수정하려면 사용자가 `reference_tables_write` 권한이 필요합니다.

권한에 대한 자세한 정보는 [RBAC 문서][6]를 참조하세요.

### 세분화된 액세스 제어 {#granular-access-controls}
개별 테이블에 대한 액세스를 제한하려면, 이를 조회하거나 수정할 수 있는 팀, 역할 또는 사용자 목록을 지정하세요.

{{< img src="reference_tables/granular_permissions.png" alt="테이블에 대한 세분화된 액세스 권한 설정을 지원하는 권한 톱니바퀴 옵션" style="width:100%;">}}

1. 테이블을 클릭하여 세부 정보 페이지를 엽니다.
2. 오른쪽 상단 모서리의 톱니바퀴 아이콘을 클릭합니다.
3. 메뉴에서 **Permissions**을 선택합니다.
4. **Restrict Access**를 클릭합니다.
5. 드롭다운을 사용하여 하나 이상의 팀, 역할 또는 사용자를 선택합니다.
6. **Add**를 클릭합니다.
7. Select either **Editor** or **Viewer**을 선택합니다.
8. **Save**를 클릭하여 변경 사항을 적용합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/processors/lookup_processor/
[2]: /ko/account_management/audit_trail/
[3]: /ko/events/
[4]: /ko/monitors/types/event/
[5]: /ko/help/
[6]: /ko/account_management/rbac/permissions/#reference-tables
[7]: /ko/ddsql_editor/#save-and-share-queries