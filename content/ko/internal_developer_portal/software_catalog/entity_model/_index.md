---
algolia:
  tags:
  - codeLocations
aliases:
- /ko/software_catalog/service_definitions/
- /ko/software_catalog/adding_metadata
- /ko/tracing/software_catalog/service_metadata_structure
- /ko/tracing/software_catalog/adding_metadata
- /ko/software_catalog/add_metadata
- /ko/service_catalog/adding_metadata
- /ko/tracing/service_catalog/service_metadata_structure
- /ko/tracing/service_catalog/adding_metadata
- /ko/service_catalog/add_metadata
- /ko/service_catalog/service_definitions
- /ko/service_catalog/service_definitions/v2-0
- /ko/software_catalog/service_definitions/v2-0
- /ko/service_catalog/service_definitions/v2-1
- /ko/software_catalog/service_definitions/v2-1
- /ko/service_catalog/service_definitions/v2-2
- /ko/software_catalog/service_definitions/v2-2
- /ko/service_catalog/service_definitions/v3-0
- /ko/software_catalog/service_definitions/v3-0
- /ko/software_catalog/apis
- /ko/tracing/faq/service_definition_api/
- /ko/tracing/software_catalog/service_definition_api
- /ko/software_catalog/service_definition_api
- /ko/tracing/service_catalog/service_definition_api
- /ko/service_catalog/service_definition_api
- /ko/tracing/api_catalog/api_catalog_api/
- /ko/api_catalog/api_catalog_api
- /ko/service_catalog/apis
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 외부 사이트
  text: Terraform으로 정의 생성 및 관리
- link: /api/latest/service-definition/
  tag: API
  text: Definition API에 대해 알아보기
- link: /integrations/github
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: 블로그
  text: Backstage YAML 파일을 Datadog으로 가져오기
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: 블로그
  text: Service Catalog 스키마 버전 3.0으로 개발자 경험 및 협업 개선
- link: https://www.datadoghq.com/blog/software-catalog-custom-entities/
  tag: 블로그
  text: Datadog Software Catalog에서 사용자 지정 엔터티로 아키텍처 모델링
title: 엔터티 모델
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Entity Model schema v3.0은 현재 선택한 사이트에서 사용할 수 없습니다.</div>

{{< /site-region >}}

## 개요 {#overview}

Software Catalog는 정의 스키마를 사용하여 엔터티와 관련된 메타데이터를 저장하고 표시합니다. 이 스키마에는 유효한 값만 허용되도록 보장하는 기본 제공 유효성 검사 규칙이 포함되어 있습니다. 선택한 서비스에 대해 Software Catalog 사이드 패널의 **Definition** 탭에서 경고를 확인할 수 있습니다.

{{< img src="/tracing/internal_developer_portal/entity-model-flow-chart.png" alt="Software Catalog의 구성 요소가 상호, 그리고 클라우드 환경과 연결되는 방식을 보여주는 흐름도 " style="width:100%;" >}}

## 지원되는 버전 {#supported-versions}

Datadog은 정의 스키마의 네 가지 버전을 지원합니다.

- **v3.0**: 확장된 데이터 모델, 다중 소유권 지원, 수동 종속성 선언 및 복잡한 인프라를 위한 향상된 기능을 제공하는 최신 버전입니다.
- **v2.2**: 사용자 지정 메타데이터를 위한 사용자 주석과 서비스를 빌드 프로세스에 연결하기 위한 CI 파이프라인 연결을 지원합니다.
- **v2.1**: 향상된 구성 관리를 위한 서비스 그룹화를 지원하며 보다 포괄적인 서비스 설명을 위한 추가 필드를 도입합니다.
- **v2**: 기본 서비스 메타데이터 및 문서화를 위한 필수 필드를 제공하는 가장 초기 버전입니다.

각 버전은 이전 버전을 기반으로 하여 새로운 기능을 추가하면서도 이전 버전과의 호환성을 유지합니다. 자신의 필요와 인프라 복잡성에 가장 적합한 버전을 선택하세요.

## 버전 비교 {#version-comparison}

각 버전에서 지원되는 기능은 다음과 같습니다.

| 기능                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| 기본 메타데이터                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| 서비스 그룹화             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| 사용자 주석              | {{< X >}}   | {{< X >}} |           |           |
| CI 파이프라인 연결      | {{< X >}}   | {{< X >}} |           |           |
| 확장된 데이터 모델           | {{< X >}}   |           |           |           |
| 다중 소유자               | {{< X >}}   |           |           |           |
| 수동 종속성 선언 | {{< X >}}   |           |           |           |

각 버전에 대한 자세한 정보(전체 스키마 및 YAML 예제 파일 포함)는 [지원되는 버전](#supported-versions)의 개별 버전 페이지를 참조하세요.

## 버전 세부 정보 {#version-details}

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="최신 버전의 Software Catalog 미리보기에 참여하세요." >}}
{{< /callout >}}

{{< tabs >}}
{{% tab "v3.0" %}}

### 주요 기능 {#key-features}
- **확장된 데이터 모델**: v3.0은 여러 종류의 엔터티를 지원합니다. 시스템, 서비스, 대기열, 데이터스토어 등의 다양한 구성 요소를 사용하여 시스템을 구성할 수 있습니다.
- **다중 소유자**: v3.0 스키마를 통해 정의된 모든 객체에 여러 소유자를 할당하여 여러 연락 창구를 지정할 수 있습니다.
- **향상된 관계 매핑**: APM 및 USM 데이터를 사용하여 구성 요소 간의 종속성을 자동으로 감지할 수 있습니다. v3.0은 자동으로 감지된 시스템 토폴로지를 보완하기 위해 수동 선언을 지원하여 시스템 내의 구성 요소가 상호 작용하는 방식을 완전하게 파악하도록 할 수 있습니다.
- **시스템 메타데이터의 상속**: 시스템 내의 구성 요소는 시스템의 메타데이터를 자동으로 상속합니다. v2.1 및 v2.2와 같이 모든 관련 구성 요소에 대해 메타데이터를 하나씩 선언할 필요가 없습니다.
- **정확한 코드 위치**: 서비스에 대한 코드 위치 매핑을 추가합니다. v3.0의 `codeLocations` 섹션은 코드가 포함된 리포지토리와 관련 `paths` 정보를 사용하여 코드 위치를 지정합니다. `paths` 속성은 리포지토리 내 경로와 일치해야 하는 [glob][4] 목록입니다.
- **필터링된 로그 및 이벤트**: `system`에 대한 저장된 로그 및 이벤트 쿼리를 `logs` 및 `events` 섹션을 통해 선언하고 System 페이지에서 결과를 확인합니다.
- **사용자 지정 엔터티**: Service, System, Datastore, Queue, API 외에 사용자 지정 엔터티 유형을 정의합니다. 특정 엔터티 유형으로 scorecard와 액션의 범위를 한정합니다.
- **(예정) 통합**: 타사 도구와 통합하여 구성 요소와 관련된 정보를 동적으로 소싱합니다(예: GitHub 풀 요청, PagerDuty 인시던트 및 GitLab 파이프라인). 모든 타사 소스를 대상으로 보고서를 생성하거나 scorecard 규칙을 작성합니다.
- **(예정) 제품 또는 도메인별 그룹화**: 제품별로 구성 요소를 조직하여 여러 계층의 계층적 그룹화를 구현합니다.

### 스키마 구조 {#schema-structure}

[Github][1]에서 전체 스키마 정의를 확인할 수 있습니다.

v3.0에는 v2.2 대비 다음과 같은 변경 사항이 포함되어 있습니다.
- `schema_version`는 `apiVersion`로 변경되었습니다.
- `kind` 필드가 새로 추가되었으며 구성 요소 유형(서비스, 대기열, 데이터스토어, 시스템 또는 API)을 정의합니다.
- `dd-service`는 `metadata.name`으로 변경되었습니다.
- `team`은 `owner`로 변경되었으며, 여러 팀이 있는 경우 `additionalOwners`를 사용할 수 있습니다.
- `lifecycle`, `tier`, `languages`, `type`은 이제 `spec` 아래에 있습니다.
- `links`, `contacts`, `description`, `tags`는 이제 metadata 아래에 있습니다.
- `application`은 독립적인 유형인 `system`으로 확장되었습니다. 더 이상 서비스의 개별 필드로 존재하지 않습니다.

### 예제 YAML 파일 {#example-yaml-files}

{{% collapse-content title="다음의 구성 요소: <code>kind:system</code>" level="h4" expanded=false id="id-for-anchoring" %}}
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: myapp
  displayName: My App
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
integrations:
  pagerduty:
    serviceURL: https://www.pagerduty.com/service-directory/Pshopping-cart
  opsgenie:
    serviceURL: https://www.opsgenie.com/service/shopping-cart
    region: US
spec:
  components:
    - service:myservice
    - service:otherservice
extensions:
  datadoghq.com/shopping-cart:
    customField: customValue
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
  events:
    - name: "deployment events"
      query: "app:myapp AND type:github"
    - name: "event type B"
      query: "app:myapp AND type:github"
  logs:
    - name: "critical logs"
      query: "app:myapp AND type:github"
    - name: "ops logs"
      query: "app:myapp AND type:github"
  pipelines:
    fingerprints:
      - fp1
      - fp2
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="다음의 구성 요소: <code>kind:library</code>" level="h4" expanded=false id="id-for-anchoring" %}}
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: library
metadata:
  name: my-library
  displayName: My Library
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="여러 시스템에 속한 구성 요소" level="h4" expanded=false id="id-for-anchoring" %}}
하나의 구성 요소가 여러 시스템에 속하는 경우 각 시스템의 YAML에 해당 구성 요소를 지정해야 합니다. 예를 들어, 데이터스토어 `orders-postgres`가 Postgres 플릿과 웹 애플리케이션 모두의 구성 요소인 경우 두 개의 YAML을 지정해야 합니다.

PostgreSQL 플릿(`managed-postgres`)에 대해 `kind:system`에 대한 정의를 지정합니다.
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
spec:
  components:
    - datastore:orders-postgres
    - datastore:foo-postgres
    - datastore:bar-postgres
metadata:
  name: managed-postgres
  owner: db-team
{{< /code-block >}}

웹 애플리케이션(`shopping-cart`)에 대해 `kind:system`의 별도 정의를 선언합니다.
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}

apiVersion: v3
kind: system
spec:
  lifecycle: production
  tier: critical
  components:
    - service:shopping-cart-api
    - service:shopping-cart-processor
    - queue:orders-queue
    - datastore:orders-postgres
metadata:
  name: shopping-cart
  owner: shopping-team
  additionalOwners:
    - name: sre-team
      type: operator
---
apiVersion: v3
kind: datastore
metadata:
  name: orders-postgres
  additionalOwners:
    - name: db-team
      type: operator
---
apiVersion: v3
kind: service
metadata:
  name: shopping-cart-api
---
apiVersion: v3
kind: service
metadata:
  name: shopping-cart-processor
---
{{< /code-block >}}
{{% /collapse-content %}}

### 명시적 및 암시적 메타데이터 상속 {#explicit-and-implicit-metadata-inheritance}

#### 명시적 상속 {#explicit-inheritance}

`inheritFrom` 필드는 수집 파이프라인에 `<entity_kind>:<name>`에서 참조된 엔터티의 메타데이터를 상속하도록 지시합니다.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

#### 암시적 상속 {#implicit-inheritance}
구성 요소(`kind:service`, `kind:datastore`, `kind:queue`, `kind:ui`)는 다음 조건에서 자신이 속한 시스템의 모든 메타데이터를 상속합니다.
- YAML 파일에 정의된 시스템이 하나뿐인 경우
- YAML 파일에 `inheritFrom:<entity_kind>:<name>` 절이 없는 경우

### v3.0으로 마이그레이션 {#migrating-to-v30}
v3.0은 GitHub, API, Terraform, Backstage, ServiceNow 및 UI를 포함하여 이전 버전과 동일한 메타데이터 생성 방법을 지원합니다. 그러나 v3.0에 새로운 [API 엔드포인트][5]와 새로운 [Terraform 리소스][6]가 추가되었습니다.

### API 참조 설명서 {#api-reference-documentation}
엔드포인트, 시스템, 데이터스토어, 대기열 등 모든 엔터티 유형에 대한 정의를 생성, 조회 및 삭제하려면 [Software Catalog API 참조][8]를 참조하세요.

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[2]: https://github.com/DataDog/schema/tree/main/service-catalog
[3]: /ko/code_analysis/faq/#identifying-the-code-location-in-the-service-catalog
[4]: https://en.wikipedia.org/wiki/Glob_(programming)
[5]: /ko/api/latest/software-catalog/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[7]: software_catalog/customize/import_entries_backstage
[8]: /ko/api/latest/software-catalog/

{{% /tab %}}

{{% tab "v2.2" %}}

### 주요 기능 {#key-features-1}
- 사용자 주석
- 자동 감지된 서비스 유형 및 언어를 `type` 및 `languages`을 사용하여 덮어쓰기
- `ci-pipeline-fingerprints`를 사용하여 CI 파이프라인을 서비스와 연결
- `contact.type` 및 `link.type`에 대해 덜 엄격한 유효성 검사 로직

### 스키마 구조 {#schema-structure-1}

[전체 스키마는 GitHub에서 확인할 수 있습니다][1].

예제 YAML:

```yaml
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - go
  - python
contacts:
  - type: slack
    contact: https://yourorg.slack.com/archives/e-commerce
  - type: email
    contact: ecommerce@example.com
  - type: microsoft-teams
    contact: https://teams.microsoft.com/example
links:
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    url: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    url: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    url: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    url: https://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    region: "US"
ci-pipeline-fingerprints:
  - id1
  - id2
extensions:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
```

### API 참조 설명서 {#api-reference-documentation-1}

- 서비스 정의를 생성, 조회 및 삭제하려면 [Service Definitions API 참조][4]를 참조하세요.
- 시스템, 데이터스토어, 대기열 등 새로운 구성 요소 유형의 정의를 생성, 조회 및 삭제하려면 [Software Catalog API 참조][3]를 참조하세요.
- 서비스 scorecard 규칙 및 결과를 생성하고 업데이트하려면 [Service Scorecards API 참조][2]를 참조하세요.

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[2]: /ko/api/latest/service-scorecards/
[3]: /ko/api/latest/software-catalog/
[4]: /ko/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.1" %}}

### 주요 기능 {#key-features-2}
- 서비스 그룹화 및 `application`, `tier`, `lifecycle`에 대한 필드와 같은 새로운 UI 요소
- `Application` 및 `Teams`는 Software Catalog에서 그룹화 변수로 사용할 수 있습니다.
- `Lifecycle` 필드는 `production`, `experimental` 또는 `deprecated` 서비스 간의 차별화를 위한 개발 단계를 나타냅니다
- `Tier` 필드는 인시던트 분류 시 우선순위를 정하기 위한 서비스의 중요도를 나타냅니다.

### 스키마 구조 {#schema-structure-2}

[전체 스키마는 GitHub에서 확인할 수 있습니다][1].

예제 YAML:

```yaml
schema-version: v2.1
dd-service: delivery-state-machine
team: serverless
application: delivery-state-machine
tier: tier0
lifecycle: production
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist-serverless/tree/main/delivery-state-machine
    type: repo
  - name: Deployment
    provider: github
    url: https://github.com/DataDog/shopist-serverless/blob/main/delivery-state-machine/serverless.yml
    type: repo
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
    type: doc
tags:
  - "app:serverless-delivery"
  - "tier:3"
  - "business-unit:operations"
```

### API 참조 설명서 {#api-reference-documentation-2}

- 서비스 정의를 생성, 조회 및 삭제하려면 [Service Definitions API 참조][4]를 참조하세요.
- 시스템, 데이터스토어, 대기열 등 새로운 구성 요소 유형의 정의를 생성, 조회 및 삭제하려면 [Software Catalog API 참조][3]를 참조하세요.
- 서비스 scorecard 규칙 및 결과를 생성하고 업데이트하려면 [Service Scorecards API 참조][2]를 참조하세요.

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.1
[2]: /ko/api/latest/service-scorecards/
[3]: /ko/api/latest/software-catalog/
[4]: /ko/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.0" %}}

### 주요 기능 {#key-features-3}
- 기본 서비스 메타데이터
- 팀 연결
- 연락처 정보
- 외부 링크

### 스키마 구조 {#schema-structure-3}

[전체 스키마는 GitHub에서 확인할 수 있습니다][1].

예제 YAML:

```yaml
schema-version: v2
dd-service: delivery-api
team: distribution-management
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
repos:
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
docs:
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
  pagerduty: https://datadog.pagerduty.com/service-directory/PXZNFXP
```

### API 참조 설명서 {#api-reference-documentation-3}

- 서비스 정의를 생성, 조회 및 삭제하려면 [Service Definitions API 참조][4]를 참조하세요.
- 시스템, 데이터스토어, 대기열 등 새로운 구성 요소 유형의 정의를 생성, 조회 및 삭제하려면 [Software Catalog API 참조][3]를 참조하세요.
- 서비스 scorecard 규칙 및 결과를 생성하고 업데이트하려면 [Service Scorecards API 참조][2]를 참조하세요.

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2
[2]: /ko/api/latest/service-scorecards/
[3]: /ko/api/latest/software-catalog/
[4]: /ko/api/latest/service-definition/

{{% /tab %}}

{{< /tabs >}}


## 사용자 지정 확장 구축 {#build-custom-extensions}

<div class="alert alert-info">사용자 지정 확장은 모든 스키마 버전에서 제한된 가용성으로 제공됩니다.</div>

사용자 지정 확장을 사용하면 조직별 메타데이터를 엔터티에 연결할 수 있어 사용자 지정 도구 및 워크플로를 지원할 수 있습니다. 예를 들어, `extensions` 필드를 사용하여 엔터티 정의에 릴리스 노트, 규정 준수 태그 또는 소유 모델을 포함할 수 있습니다.

Datadog은 특정 기능을 위한 전용 확장 키도 지원합니다. 여기에는 다음이 포함됩니다.
- `datadoghq.com/dora-metrics`: [DORA 메트릭][21]을 계산할 때 Git 커밋을 필터링하기 위한 소스 코드 경로 패턴을 정의합니다.
- `datadoghq.com/cd-visibility`: [CD Visibility][22]에서 배포의 일부로 간주되는 커밋을 제어합니다.

다음 예제는 환경별 릴리스 일정을 관리하는 데 사용되는 사용자 지정 확장을 정의합니다.
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: payment-platform
  displayName: "Payment Platform"
  links:
    - name: Runbook
      type: runbook
      url: https://runbook/payment-platform
  contacts:
    - name: Payment Team
      type: team
      contact: https://www.slack.com/archives/payments
  owner: payments-team
  additionalOwners:
    - name: finance-team
      type: stakeholder
spec:
  components:
    - service:payment-api
    - queue:payment-requests
    - datastore:payment-db
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "ci-tool://shopist/k8s/staging-deploy"
          branch: "main"
          schedule: "0 9 * * 1"
{{< /code-block >}}


## IDE 플러그인을 통한 스키마 유효성 검사 {#schema-validation-through-ide-plugin}

Datadog은 정의에 대한 [JSON 스키마][18]를 제공하므로 [지원되는 IDE][19]에서 정의를 편집할 때 자동 완성 및 유효성 검사와 같은 기능을 사용할 수 있습니다.

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode에서 수정이 필요한 문제 인식" style="width:100%;" >}}

[Datadog 정의용 JSON 스키마][20]는 오픈 소스 [Schema Store][19]에 등록되어 있습니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://app.datadoghq.com/services
[6]: /ko/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /ko/tracing/software_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[16]: /ko/api/latest/software-catalog/#create-or-update-entities
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[18]: http://json-schema.org/
[19]: https://www.schemastore.org
[20]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[21]: /ko/dora_metrics/setup/#handling-multiple-services-in-the-same-repository
[22]: /ko/continuous_delivery/features/code_changes_detection?tab=github#specify-service-file-path-patterns