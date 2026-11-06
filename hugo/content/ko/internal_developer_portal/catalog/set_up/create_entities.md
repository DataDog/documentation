---
aliases:
- /ko/software_catalog/set_up/new_to_datadog
- /ko/tracing/software_catalog/setup
- /ko/software_catalog/setup
- /ko/tracing/service_catalog/setup
- /ko/service_catalog/setup
- /ko/software_catalog/create_entries/
- /ko/software_catalog/enrich_default_catalog/create_entries
- /ko/service_catalog/create_entries/
- /ko/service_catalog/enrich_default_catalog/create_entries
- /ko/api_catalog/add_entries
- /ko/service_catalog/customize/create_entries/
- /ko/software_catalog/customize/create_entries
- /ko/internal_developer_portal/software_catalog/set_up/create_entities
description: Datadog UI를 사용하거나 GitHub, GitLab, Terraform 또는 Datadog API로 가져오기를 자동화하여
  Catalog에 엔터티 정의를 추가합니다.
disable_toc: false
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 외부 사이트
  text: Terraform을 사용하여 서비스 정의 생성 및 관리
- link: /integrations/github
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
- link: /integrations/gitlab-source-code/
  tag: 설명서
  text: GitLab 통합에 대해 알아보기
- link: /api/latest/service-definition/
  tag: API
  text: 서비스 정의 API에 대해 자세히 알아보기
- link: /api/latest/software-catalog/
  tag: API
  text: Catalog API에 대해 알아보기
title: 엔터티 생성
---
## 개요 {#overview}

Catalog에 [엔터티 정의][13]를 추가하는 방법은 다음과 같습니다.
- Datadog UI에서 직접 정의를 생성합니다.
- 코드로 정의를 관리하고 GitHub, GitLab, Terraform 또는 Datadog API를 통해 가져오기를 자동화합니다.

## Datadog UI 사용 {#through-the-datadog-ui}

Catalog는 엔터티 정의를 생성할 수 있도록 단계별 워크플로우를 제공합니다. **Kind** 드롭다운에서 엔터티 유형(Service, API, System 등)을 선택하면 해당 유형에 맞는 메타데이터 필드와 옵션이 양식에 표시됩니다. 예를 들어, **API**를 선택하면 OpenAPI 또는 gRPC 사양을 업로드하는 필드가 표시되고, **Service**를 선택하면 서비스 유형 및 수명 주기를 정의하는 필드가 표시됩니다.

엔터티 정의를 생성하려면 다음 단계를 따르세요.

1. [Catalog Setup & Config][3] 페이지로 이동합니다.
1. **Create a New Entry**를 클릭합니다.
1. **Kind** 드롭다운에서 엔터티 유형을 선택합니다.
1. 소유권 및 참조 링크와 같은 메타데이터 필드를 입력합니다.
1. (선택 사항) **YAML** 또는 **JSON**으로 전환하여 생성된 코드와 cURL 명령을 확인합니다. 코드 편집기에서 Datadog은 잘못된 데이터를 자동으로 표시합니다.

   {{< img src="tracing/software_catalog/software_catalog_definition_editor.png" alt="서비스 정의 예시가 표시된 서비스 메타데이터 편집기" >}}

1. **Save Entry**를 클릭하거나 제공된 cURL 명령을 실행하여 메타데이터를 제출합니다.

   **참고**: 엔트리를 저장하려면 [Service Catalog 쓰기 권한][2]이 있어야 합니다.


## 자동화 사용 {#through-automation}

GitHub, GitLab, Terraform, Datadog Software Metadata Provider 또는 Datadog Service Definition API를 통해 가져오기를 자동화하려면 다음 단계를 따르세요.

### 엔터티 정의 생성 {#create-the-entity-definition}

1. 엔터티를 정의할 `service.datadog.yaml` 또는 `entity.datadog.yaml` 파일을 생성합니다(Datadog은 두 파일 이름을 모두 허용합니다).
1. 엔터티 이름을 `dd-service`(스키마 버전 v2.2 이하) 또는 `name`(스키마 버전 v3.0 이상) 필드에 지정합니다.

   예:

   {{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
    schema-version: v2.2
    dd-service: my-unmonitored-cron-job
    team: e-commerce
    lifecycle: production
    application: shopping-app
    description: important cron job for shopist backend
    tier: "2"
    type: web
    contacts:
    - type: slack
    contact: https://datadogincidents.slack.com/archives/XXXXX
    links:
    - name: Common Operations
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    - name: Disabling Deployments
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    tags: []
    integrations:
    pagerduty:
    service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
    External Resources (Optional)
   {{< /code-block >}}

1. (선택 사항) 각 정의를 대시 3개(`---`)로 구분하여 하나의 YAML 파일에 여러 서비스를 등록합니다.

### 정의 가져오기 {#import-the-definition}

다음 방법 중 하나로 정의를 가져옵니다.

1. **Terraform**: 정의를 [Terraform 리소스][4]로 생성하고 가져옵니다. 
   
   **참고**: 자동화된 파이프라인을 통해 Catalog에서 서비스를 생성하고 관리하려면 [Datadog Provider][5] v3.16.0 이상이 필요합니다.

1. **Datadog API**: [Service Definition API][7](스키마 v2.x용) 또는 [Catalog API][8](스키마 v3 이상용)를 사용하여 정의를 가져옵니다. 두 API 모두 오픈소스 GitHub Actions 솔루션입니다.
1. **GitHub 또는 GitLab**: [GitHub 통합][9] 또는 [GitLab 통합][14]을 구성하여 정의를 관리하고 가져옵니다.

#### GitHub 및 GitLab 통합 {#github-and-gitlab-integrations}

[GitHub 통합][9] 또는 [GitLab 통합][14]을 구성하여 리포지토리에서 엔터티 정의를 가져옵니다. Datadog은 읽기 권한이 있는 각 리포지토리 전체에서 `service.datadog.yaml` 및 `entity.datadog.yaml` 파일을 검색합니다.

리포지토리의 YAML 파일을 업데이트하면 변경 사항이 Catalog에 반영됩니다. 여러 YAML 문서를 생성하여 하나의 YAML 파일에 여러 서비스를 등록할 수 있습니다. 각 문서를 대시 3개(`---`)로 구분합니다.

의도치 않은 덮어쓰기를 방지하려면 소스 코드 통합(GitHub 또는 GitLab)이나 [Definition API 엔드포인트][11] 중 하나를 사용하여 정의 파일을 생성하고 수정합니다. 소스 코드 통합과 API를 모두 사용하여 동일한 서비스를 업데이트하면 의도치 않은 덮어쓰기가 발생할 수 있습니다.

##### GitHub 통합 {#github-integration}

GitHub 통합을 설치하려면 다음 단계를 따르세요.
1. [통합 타일][10]로 이동합니다.
2. **Repo Configuration** 탭에서 **Link GitHub Account**를 클릭합니다.

엔터티 정의를 위한 GitHub 통합을 설정하면 서비스의 **Definition** 탭에 **Edit in GitHub** 버튼이 표시됩니다. 이 버튼을 클릭하면 GitHub로 이동하여 변경 사항을 커밋할 수 있습니다.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="Catalog에 있는 서비스의 Definition 탭에 Edit in GitHub 버튼이 표시된 모습" style="width:90%;" >}}

##### GitLab 통합 {#gitlab-integration}

GitLab 리포지토리를 연결하려면 [GitLab 통합 타일][15]에서 확인할 수 있는 [GitLab 통합][14] 설정 지침을 따릅니다. Datadog에 읽기 권한이 있는 리포지토리에 `service.datadog.yaml` 또는 `entity.datadog.yaml` 파일을 저장합니다.

##### 통합 유효성 검사 {#integration-validation}

Datadog의 GitHub 통합으로 수집된 서비스 정의의 유효성을 검증하려면 서비스가 업데이트되거나 오류가 발생할 때 기록되는 이벤트를 확인하면 됩니다. [Event Management][12]에서 유효성 검사 오류를 조회하려면 `source:software_catalog` 및 `status:error`를 기준으로 필터링합니다. 필요에 따라 기간을 조정합니다.

{{< img src="tracing/software_catalog/github_error_event.png" alt="서비스 정의의 오류 메시지가 표시된 GitHub 이벤트" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/internal_developer_portal/catalog/set_up#configure-role-based-access-and-permissions
[3]: https://app.datadoghq.com/software/settings/get-started
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest
[7]: /ko/api/latest/service-definition/
[8]: /ko/api/latest/software-catalog/
[9]: /ko/integrations/github/
[10]: https://app.datadoghq.com/integrations/github
[11]: /ko/api/latest/software-catalog/#create-or-update-entities
[12]: https://app.datadoghq.com/event/explorer
[13]: /ko/internal_developer_portal/catalog/entity_model
[14]: /ko/integrations/gitlab-source-code/
[15]: https://app.datadoghq.com/integrations/gitlab-source-code/