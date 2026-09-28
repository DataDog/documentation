---
aliases:
- /ko/cloud_cost_management/tag_pipelines/
- /ko/cloud_cost_management/tags/tag_pipelines/
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management에 대해 알아보기
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
- link: /integrations/guide/reference-tables
  tag: 설명서
  text: Reference Table에 대해 알아보기
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: 블로그
  text: Datadog Cloud Cost Management를 사용하여 공급자별 AI 비용 귀속하기
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: 블로그
  text: Datadog Cloud Cost Management로 OCI 비용 관리 및 최적화하기
title: Tag Pipelines
---
## 개요 {#overview}

태그는 모든 Cloud Cost Management 분석 및 할당의 기반입니다. 태그를 사용하면 서비스, 팀, 프로젝트, 환경 또는 비즈니스와 관련된 모든 기준별로 지출을 세분화할 수 있습니다. Tag Pipelines는 클라우드 리소스 전반에서 표준화된 태그 사용을 적용하며 조직 전체에서 비용을 일관되고 정확하게 귀속할 수 있도록 지원합니다.

[Tag Pipelines][1]를 사용하면 클라우드 청구서에서 누락되거나 잘못된 태그를 처리하기 위한 태그 규칙을 생성할 수 있습니다. 또한 특정 비즈니스 로직에 부합하는 새로운 추론 태그를 생성하여 비용 추적의 정확성을 높일 수 있습니다. 이러한 표준화된 태그는 컨테이너 비용 귀속, 사용자 지정 귀속 규칙, 비용 권장 사항을 포함한 모든 비용 분석 기능에 사용됩니다.

Tag Pipelines는 모든 공급자의 Cloud Cost 메트릭에 적용됩니다. 생성한 규칙은 모든 비용 데이터 및 비용 권장 사항에 영향을 미치며, 대시보드, 모니터, 할당 보고서 전반에서 일관성을 보장합니다.

태그 파이프라인이 변경되면 새로운 규칙이 최근 3개월간의 데이터에 자동으로 적용됩니다. 규칙이 추가되거나 수정된 후 과거 데이터 업데이트가 완료되기까지 최대 24시간이 소요될 수 있습니다.

모든 신규 사용자에게는 [태그 정규화 활성화][6]를 위한 권장 규칙이 기본적으로 활성화되어 있습니다.

## 규칙 세트 생성 {#create-a-ruleset}

[API][7], [Terraform][8] 또는 아래 지침에 따라 Datadog에서 직접 태그 파이프라인 규칙 세트를 관리할 수 있습니다.

규칙 세트를 생성하려면 [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Tag Pipelines{{< /ui >}}][1]로 이동하세요.

<div class="alert alert-danger"> 최대 100개의 규칙을 생성할 수 있습니다. API 기반 Reference Table은 지원되지 않습니다. </div>

개별 규칙을 생성하기 전에 {{< ui >}}+ New Ruleset{{< /ui >}}을 클릭하여 규칙 세트(규칙을 포함하는 폴더)를 만드세요.

각 규칙 세트 내에서 {{< ui >}}+ Add New Rule{{< /ui >}}을 클릭하고 {{< ui >}}Add tag{{< /ui >}}, {{< ui >}}Alias tag keys{{< /ui >}} 또는 {{< ui >}}Map multiple tags{{< /ui >}} 중 규칙 유형을 선택하세요. 이 규칙들은 위에서 아래로 정해진 순서에 따라 순차적으로 실행됩니다.

{{< img src="cloud_cost/pipelines-create-ruleset-1.png" alt="Tag Pipelines 페이지에서 팀, 계정, 서비스, 부서, 사업부 등 다양한 범주를 표시하는 태그 규칙 목록" style="width:60%;" >}}

규칙과 규칙 세트를 구성하여 실행 순서를 비즈니스 로직과 일치시킬 수 있습니다.

###  태그 추가 {#add-tag}

Cloud Cost 데이터에 기존 태그가 있는지 여부에 따라 새 태그(키 + 값)를 추가하세요.

예를 들어, 리소스가 속한 서비스에 따라 모든 리소스에 해당 사업부를 태그로 지정하는 규칙을 만들 수 있습니다.

{{< img src="cloud_cost/pipelines-add-tag-2.png" alt="service:process-agent 또는 service:process-billing이 포함된 리소스에 새 사업부 태그를 지정하세요." style="width:60%;" >}}

{{< ui >}}Additional options{{< /ui >}} 섹션 아래에는 다음과 같은 옵션이 있습니다.

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - 지정된 태그(위 예시에서는 `business-unit`)가 이미 존재하는 경우 수행할 작업을 선택하세요.
  - {{< ui >}}Don't apply the rule{{< /ui >}} - 태그가 이미 존재하는 경우 규칙을 건너뛰고 원래 값을 유지합니다.
  - {{< ui >}}Append the tag{{< /ui >}} - 원래 값을 제거하지 않고 기존 태그에 새 값을 추가합니다.
  - {{< ui >}}Replace the tag{{< /ui >}} - 기존 태그 값을 새 값으로 교체합니다. <div class="alert alert-warning"> 태그를 교체하면 기존 데이터를 덮어쓸 수 있습니다. 이 옵션은 주의해서 사용하세요. </div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}} - `To resources with tag(s)` 필드에 정의된 태그와 비용 데이터의 태그를 대소문자 구분 없이 처리할 수 있게 합니다. 예를 들어, UI의 리소스 태그가 `foo:bar`이고 비용 데이터의 태그가 `Foo:bar`인 경우, 두 태그를 일치시킬 수 있습니다.

###  태그 키 별칭 지정 {#alias-tag-keys}

기존 태그 값을 더 표준화된 태그에 매핑합니다.

예를 들어, 조직에서 표준 `application` 태그 키를 사용하려고 하지만 여러 팀에서 해당 태그의 변형(`app`, `webapp` 또는 `apps`)을 사용하는 경우, `apps`를 `application`의 별칭으로 지정할 수 있습니다. 각 태그 별칭 규칙에서 최대 25개의 태그 키를 새 태그의 별칭으로 지정할 수 있습니다.

{{< img src="cloud_cost/pipelines-alias-tag-4.png" alt="app, webapp 또는 apps 태그가 있는 리소스에 application 태그 지정" style="width:60%;" >}}

`app`, `webapp` 또는 `apps` 태그가 있는 리소스에 application 태그를 지정하세요. 각 리소스에서 첫 번째 일치 항목이 발견되면 규칙 실행을 중지합니다. 예를 들어, 리소스에 이미 `app` 태그가 있는 경우 규칙은 더 이상 `webapp` 또는 `apps` 태그를 식별하지 않습니다.

{{< ui >}}Additional options{{< /ui >}} 섹션 아래에는 다음과 같은 옵션이 있습니다.

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - 지정된 태그(위 예시에서는 `application`)가 이미 존재하는 경우 수행할 작업을 선택하세요.
  - {{< ui >}}Don't apply the rule{{< /ui >}} - 태그가 이미 존재하는 경우 규칙을 건너뛰고 원래 값을 유지합니다.
  - {{< ui >}}Append the tag{{< /ui >}} - 원래 값을 제거하지 않고 기존 태그에 새 값을 추가합니다.
  - {{< ui >}}Replace the tag{{< /ui >}} - 기존 태그 값을 새 값으로 교체합니다. <div class="alert alert-warning"> 태그를 교체하면 기존 데이터를 덮어쓸 수 있습니다. 이 옵션은 주의해서 사용하세요. </div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}} - 별칭 태그 키에 정의된 태그와 비용 데이터의 태그를 대소문자 구분 없이 처리할 수 있습니다. 예를 들어, UI의 리소스 태그가 `app:bar`이고 비용 데이터의 태그가 `App:bar`인 경우, 두 태그를 일치시킬 수 있습니다.

###  여러 태그 매핑 {#map-multiple-tags}

[Reference Table][2]을 사용하여 여러 규칙을 만들지 않고도 비용 데이터에 여러 태그를 추가하세요. 이 기능은 Reference Table의 기본 키 열 값을 비용 태그의 값에 매핑합니다. 일치하는 항목이 발견되면 파이프라인은 선택한 Reference Table 열을 비용 데이터에 태그로 추가합니다.

예를 들어, 다양한 AWS 및 Azure 계정이 어떤 VP, 조직 및 사업부에 속하는지에 대한 정보를 추가하려면 표를 만들고 태그를 매핑하세요.

{{< img src="cloud_cost/pipelines-map-multiple-tags-2.png" alt="태그 파이프라인에 Reference Table을 사용하여 customer_name과 같은 계정 메타데이터 추가" style="width:60%;" >}}

[별칭 태그 키](#alias-tag-keys)와 마찬가지로, 각 리소스에서 첫 번째 일치 항목이 발견되면 규칙 실행을 중지합니다. 예를 들어, `application`이 발견되면 규칙은 더 이상 `subscription_id`를 찾지 않습니다.

{{< ui >}}Additional options{{< /ui >}} 섹션 아래에는 다음과 같은 옵션이 있습니다.

- {{< ui >}}Action when column exists{{< /ui >}} - 지정된 열이 이미 존재하는 경우 수행할 작업을 선택하세요.
  - {{< ui >}}Don't apply the rule{{< /ui >}} - 열이 이미 존재하는 경우 규칙을 건너뛰고 원래 값을 유지합니다.
  - {{< ui >}}Append the column{{< /ui >}} - 원래 값을 제거하지 않고 기존 열에 새 값을 추가합니다.
  - {{< ui >}}Replace the column{{< /ui >}} - 기존 열 값을 새 값으로 교체합니다. <div class="alert alert-warning">열을 교체하면 기존 데이터를 덮어쓸 수 있습니다. 이 옵션은 주의해서 사용하세요. </div>
- {{< ui >}}Apply case-insensitive matching for primary key values{{< /ui >}} - Reference Table의 기본 키 값과 비용 데이터에서 태그 키가 기본 키와 일치하는 태그 값을 대소문자를 구분하지 않고 일치시킵니다. 예를 들어, UI의 기본 키 값 쌍이 `foo:Bar`이고 비용 데이터의 태그가 `foo:bar`인 경우 두 값을 일치시킬 수 있습니다.

## 예약된 태그 {#reserved-tags}

`env` 및 `host`와 같은 특정 태그는 [예약된 태그][4]이며 [Unified Service Tagging][3]의 일부입니다. `host` 태그는 Tag Pipelines에서 추가할 수 없습니다.

태그를 사용하면 메트릭, 트레이스, 프로세스 및 로그를 상호 연결하는 데 도움이 됩니다. `host`와 같은 예약된 태그를 통해 인프라 전반에 대한 가시성을 확보하고 효과적으로 모니터링할 수 있습니다. 최적의 상관관계와 실행 가능한 인사이트를 얻으려면 Datadog의 태깅 전략의 일부로 이러한 예약된 태그를 사용하세요.

## 태그 삭제 {#delete-tags}
Tag Pipelines를 사용하여 생성된 태그를 삭제하려면 해당 태그를 생성한 규칙을 삭제하세요. 24시간 이내에 최근 3개월간의 데이터에서 태그가 자동으로 제거됩니다. 더 오래된 데이터에서 태그를 제거하려면 [Datadog 지원팀][5]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: /ko/integrations/guide/reference-tables/?tab=manualupload
[3]: /ko/getting_started/tagging/unified_service_tagging/
[4]: /ko/getting_started/tagging/
[5]: /ko/help/
[6]: /ko/cloud_cost_management/tags#how-tags-are-normalized
[7]: /ko/api/latest/cloud-cost-management/#create-tag-pipeline-ruleset
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/tag_pipeline_ruleset