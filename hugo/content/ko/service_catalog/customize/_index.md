---
aliases:
- /ko/service_catalog/manage_entries/
- /ko/service_catalog/enrich_default_catalog/
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 외부 사이트
  text: Terraform을 사용하여 서비스 정의 생성 및 관리
- link: /api/latest/service-definition/
  tag: API
  text: 서비스 정의 API에 대해 자세히 알아보기
- link: /integrations/github
  tag: 설명서
  text: GitHub 통합 알아보기
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: 블로그
  text: Backstage YAML 파일을 Datadog으로 가져오기
title: 서비스 카탈로그 커스터마이즈
---

Service Catalog에서 엔지니어링 팀의 랜딩 환경을 사용자 지정할 수 있습니다. Developer Home은 개발자가 우선 순위가 지정된 작업, 풀 요청, 알림, 인사이트를 한 곳에서 확인할 수 있도록 설계된 베타 버전의 새로운 맞춤형 대시보드 환경입니다.

{{< callout url="https://forms.gle/nkAu2z4gc2dGWcGw5" d_target="#signupModal" btn_hidden="false" header="Developer Homepage 사용자 경험 퍼블릭 베타에 참여하세요!" >}}
{{< /callout >}}

## 자동 검색

Datadog Service Catalog는 [APM][2], [Universal Service Monitoring][1]를 통한 eBPF 기반 Autodiscovery 및 RUM 애플리케이션을 통해 감지된 항목으로 미리 채워집니다.

APM을 사용하면 Datadog은 데이터베이스, 큐 또는 타사 종속성 등의 계측된 서비스에 관한 종속성을 자동 검색할 수 있으며, 해당 종소성이 아직 계측되지 않은 경우에도 가능합니다. 이러한 계측되지 않은 종속성은 별도의 *서비스*로 분류됩니다. Datadog은 클라이언트 스팬의 서비스 이름(span.kind:client)이 계측된 서비스의 종속성을 나타내도록 변경하였습니다. 예를 들어, 서비스 auth-dotnet에서 PostgreSQL 데이터베이스로의 클라이언트 호출을 나타내는 스팬은 service:auth-dotnet-postgres로 태그 지정됩니다. 

APM을 사용 중이고 Service Catalog 및 Service Map 에서 자동 명명된 *서비스*를 제거하려는 경우, 데이터베이스, 큐 또는 타사 종속성 등의 엔티티 유형별로 Service Catalog 항목을 필터링할 수 있는 새로운 [추론 엔터티 경험][7]을 활성화합니다. 옵션으로 카탈로그나 맵에서 service:my-service-http-client와 같은 [서비스 재정의][9]를 [제거][8]할 수 있습니다.

엔드포인트 검색에 대한 자세한 내용은 [APM에서 엔드포인트 검색하기][11]를 참조하세요.

## 메타데이터로 자동 탐지 서비스 강화 
서비스에 대해 온 콜, 소스 코드 또는 문서를 지정하려면 UI, API 또는 [기타 자동화][10]를 사용하여 기존 서비스에 메타데이터를 추가할 수 있습니다. 권장 사용 버전은 2.2 버전입니다. 향상된 관계 매핑 및 정확한 코드 위치와 같은 실험적 기능을 사용하려면 [요청을 제출][4]하여 [스키마 3.0][3] 베타 프로그램에 참여하세요.

{{< callout url="https://forms.gle/L5zXVkKr5bAzbdMD9" d_target="#signupModal" btn_hidden="false" header="메타데이터 스키마 v3.0 프리뷰 버전에 참여하세요!" >}}
{{< /callout >}}

### Service Definition Schema (v2.2) (권장)

서비스 정의 스키마(Service Definition Schema)는 서비스의 기본 정보를 포함하는 구조입니다. [GitHub의 전체 스키마][5] 항목을 참조하세요.

#### 예시
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
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
    URL: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    URL: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    URL: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    URL: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    URL: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    URL: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    URL: https://doc.google.com/shopping-cart
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
{{< /code-block >}}

## Service Catalog 작업 찾기
Service Catalog과 관련된 전체 작업 세트를 살펴보려면 [Datadog Action Catalog][6]로 이동하세요. 다음에 따라 필요한 작업을 필터링합니다.

1. **Action Catalog 액세스**: Datadog Workflow Automation 환경에서 Action Catalog를 검색합니다.
2. **검색 기능**: 검색창에 'Service Catalog' 또는 원하는 작업과 관련된 더 구체적인 용어(예: '서비스 종속성 가져오기')와 같은 키워드를 검색합니다.

### 사용 가능 Service Catalog 작업

다음은 Datadog Workflow Automation에서 Service Catalog에 사용할 수 있는 작업의 전체 목록입니다. 이 목록은 새로운 작업이 추가됨에 따라 변경될 수 있습니다.

- **Retrieve Service Information**
  - "Get service definition": 단일 서비스인 경우
  - Datadog Software Catalog에서 모든 정의를 가져오려면 "서비스 정의 목록을 표시합니다"
  - "Get service dependencies": 해당 서비스의 직속 업스트림 및 다운스트림 서비스 확인
- **Incident Triage**
  - "Get service PagerDuty on call"
  - 다른 작업과 통합하면 중요한 이벤트(예: 런북 실행)를 기반으로 워크플로를 트리거할 수 있습니다.

## 서비스 색상 변경
서비스 색상은 트레이스 시각화에 사용됩니다. 서비스 유형 아이콘을 클릭하여 변경하세요.

{{< img src="tracing/service_catalog/change_service_color.png" alt="다른 아이콘 색상을 선택하려면 서비스 아이콘을 클릭하세요." style="width:80%;" >}}

## 서비스 유형 및 언어 업데이트하기
[Service Catalog 메타데이터 스키마 2.2][5]를 사용하면 사용자 정의 서비스에 대한 유형 및 언어를 지정하거나 계측된 서비스에 대해 자동 감지된 유형 및 언어를 덮어쓸 수 있습니다. 서비스 유형과 언어에 올바른 레이블을 지정하여 다른 팀이 서비스의 기능과 상호 작용 방법을 더 잘 이해할 수 있도록 하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/universal_service_monitoring/
[2]: /ko/tracing/
[3]: /ko/service_catalog/service_definitions/v3-0/
[4]: https://forms.gle/zbLfnJYhD5Ab4Wr18
[5]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[6]: /ko/actions/actions_catalog/
[7]: /ko/tracing/services/inferred_services
[8]: /ko/tracing/guide/service_overrides/#remove-service-overrides
[9]: /ko/tracing/guide/service_overrides/
[10]: /ko/service_catalog/service_definitions/#add-metadata-with-automation
[11]: /ko/service_catalog/endpoints/discover_endpoints/
[12]: /ko/integrations/github/