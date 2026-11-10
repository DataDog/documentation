---
aliases:
- /ko/internal_developer_portal/software_catalog/entity_model/custom_entities
description: Catalog에서 라이브러리, 파이프라인, ML 모델 등 조직 고유의 구성 요소를 나타내는 사용자 지정 엔터티 유형을 정의합니다.
disable_toc: false
further_reading:
- link: /internal_developer_portal/catalog/set_up/create_entities
  tag: 설명서
  text: Catalog에서 엔터티 생성
- link: /internal_developer_portal/catalog/entity_model/native_entities/
  tag: 설명서
  text: 기본 엔터티 유형에 대해 알아보기
title: 사용자 지정 엔터티
---
## 개요 {#overview}

[schema definition v3.0][5] 이상에서는 [기본 유형][6](서비스, 데이터 저장소, 대기열 등) 외에 사용자 지정 엔터티 유형도 정의할 수 있습니다. 

사용자 지정 엔터티를 사용하면 조직에 중요하지만 표준 범주에 맞지 않는 모든 구성 요소나 리소스를 나타낼 수 있습니다. 예를 들어, 라이브러리, 파이프라인, ML 모델 또는 인프라 구성 요소에 대한 사용자 지정 엔터티 유형을 만들 수 있습니다.

[전체 스키마 정의][7]는 GitHub를 참조하세요.

## 사용자 지정 엔터티 유형 생성 {#create-a-custom-entity-type}

Datadog 내에서 또는 Catalog API를 통해 사용자 지정 엔터티 유형을 생성할 수 있습니다. 유형을 생성한 후 Datadog에서 또는 [Catalog API][2], [GitHub 통합][4], [GitLab 통합][9] 또는 [Terraform 모듈][3]을 통해 프로그래밍 방식으로 해당 유형의 엔터티를 추가할 수 있습니다.

### Datadog {#in-datadog}

1. **APM** > **Catalog**로 이동하여 [**Manage**][8]를 클릭합니다.
1. **Manage Custom Entity Types**를 클릭하여 기존 기본 엔터티 유형과 사용자 지정 엔터티 유형을 확인합니다.

   {{< img src="/tracing/internal_developer_portal/manage-entity-types.png" alt="기존 기본 유형 및 사용자 지정 유형과 사용자 지정 엔터티 유형 생성 버튼이 표시된 Manage Entity Types 팝업 창" style="width:100%;" >}}

1. 유형을 추가하려면 **Add Custom Entity Type**을 클릭합니다. 

창을 닫은 후 **Create New Entry**를 선택하면 팝업 창 상단의 `kind` 드롭다운에 사용자 지정 유형이 표시됩니다. 

{{< img src="/tracing/internal_developer_portal/custom-type-in-dropdown.png" alt="사용자 지정 엔터티 유형이 포함된 kind 드롭다운이 표시된 Create New Entry 팝업 창" style="width:60%;" >}}

### API를 통한 생성 {#through-the-api}

또는 [Catalog API][1]를 통해 사용자 지정 유형을 정의할 수 있습니다.

### 엔터티 예시 {#example-entity}

다음 예시에서는 사용자가 링크, 태그 및 담당 팀을 포함하는 사용자 지정 유형 `library`의 엔터티를 정의합니다.

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

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/software-catalog/#create-or-update-kinds
[2]: /ko/api/latest/software-catalog/#create-or-update-entities
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[4]: /ko/integrations/github/
[5]: /ko/internal_developer_portal/catalog/entity_model
[6]: /ko/internal_developer_portal/catalog/entity_model/native_entities
[7]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[8]: https://app.datadoghq.com/software/settings/get-started
[9]: /ko/integrations/gitlab-source-code/