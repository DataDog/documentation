---
description: 코드 재배포 없이 Catalog 서비스 정의의 팀 및 시스템 태그로 텔레메트리를 자동으로 보강할 수 있습니다.
further_reading:
- link: /tracing/services/service_remapping_rules
  tag: 문서
  text: 서비스 리매핑 규칙
- link: /internal_developer_portal/catalog/
  tag: 문서
  text: Catalog
title: 태그 보강
---
{{< callout url="https://www.datadoghq.com/product-preview/tag-enrichment/" >}}
태그 보강은 미리 보기로 제공되고 있습니다. 액세스 권한을 요청하려면 이 양식을 작성하세요.
{{< /callout >}}

## 개요 {#overview}

태그 보강 규칙을 사용하여 코드 변경이나 재배포 없이 텔레메트리에 태그를 추가할 수 있습니다. Catalog에서 이미 정의한 서비스 메타데이터의 값, 다른 태그의 값 또는 고정 값을 사용할 수 있습니다.

## 전제 조건 {#prerequisites}

태그 보강 규칙을 생성하려면 Datadog Admin 역할이 있어야 합니다. 자세한 내용은 [역할 기반 액세스 제어][2]를 참조하세요.

## 태그 보강 규칙 생성 {#create-a-tag-enrichment-rule}

### 기본 태그 보강 규칙 {#default-tag-enrichment-rules}

기본 규칙을 활성화하려면 {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1]로 이동하여 페이지 하단에서 `team` 또는 `system`에 대한 기본 규칙을 켭니다.

{{< img src="tracing/services/tag_enrichment/tag-enrichment-landing.png" alt="Suggested rules 패널이 표시된 Tag Enrichment 페이지로, 모든 서비스의 시스템 및 팀 태그에 대한 보강 규칙을 생성하는 옵션이 있습니다." >}}

기본 규칙을 활성화하면 IDP에 정의된 Entity Metadata를 기반으로 서비스의 모든 텔레메트리에 `team` 또는 `system`이 적용됩니다. Entity Metadata가 채워진 서비스만 보강됩니다. 태그는 서비스의 텔레메트리에 해당 태그의 값이 아직 없는 경우에만 추가됩니다.

### 사용자 지정 태그 보강 규칙 {#custom-tag-enrichment-rules}

사용자 지정 규칙을 사용하면 특정 서비스 집합을 대상으로 지정하고 각 태그 값을 어떻게 가져와 적용할지 정확하게 구성할 수 있습니다.

1. Datadog에서 {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1]로 이동한 후 {{< ui >}}\+ Add Rule{{< /ui >}}을 클릭합니다.
1. 보강할 엔터티를 선택합니다. 엔터티를 선택하면 백그라운드에서 쿼리가 생성됩니다. {{< ui >}}Build Advanced Query{{< /ui >}}을 선택하여 쿼리를 편집하세요.
   {{< img src="tracing/services/tag_enrichment/tag-enrichment-adv-query.png" alt="Build Advanced Query 탭이 선택된 Add IDP 태그 보강 규칙 모달로, 태그 키, 연산자, 값에 대한 필드와 Add Condition 옵션이 표시되어 있습니다." >}}
   - {{< ui >}}Add Condition{{< /ui >}}을 선택하여 쿼리에 `AND` 조건을 추가합니다.
   - {{< ui >}}Value{{< /ui >}} 필드에 여러 값을 추가하여 `OR` 조건을 작성합니다.
1. 태그 및 보강 방법을 선택합니다.
   - `team` 태그, `system` 태그, `custom` 태그 또는 여러 태그를 선택합니다.
   - 각 태그의 값을 Entity Metadata, 다른 태그의 값 또는 고정 값 중 어디에서 가져올지 선택합니다.
   - 값이 아직 없을 때만 적용할지, 해당 태그의 현재 값 목록에 추가할지 선택합니다.
1. 보강할 텔레메트리 유형을 선택합니다.
1. 규칙을 검토하고 저장합니다. 규칙을 저장한 후 수신 텔레메트리에 보강이 완전히 적용되기까지 최대 1시간이 걸릴 수 있습니다.

### 서비스 페이지에서 태그 보강 규칙 추가 {#add-a-tag-enrichment-rule-from-a-service-page}

`team` 또는 `system` 태그가 누락된 서비스 페이지에서 {{< ui >}}Service Config{{< /ui >}}를 클릭하여 구성 측면 패널을 엽니다. 패널 상단의 배너는 누락된 태그를 나타냅니다.

{{< img src="tracing/services/tag_enrichment/service-config-side-panel.png" alt="서비스의 Service Config 측면 패널로, 텔레메트리에서 팀 및 시스템 태그가 누락되었음을 나타내는 배너와 Add Tags 버튼이 표시되어 있습니다." >}}

{{< ui >}}Add Tags{{< /ui >}}를 클릭하면 해당 서비스로 미리 채워진 태그 보강 규칙 모달이 열립니다.

{{< img src="tracing/services/tag_enrichment/add-idp-tag-enrichment-rule.png" alt="Add IDP 태그 보강 규칙 모달로, 보강할 엔터티, 추가할 태그, 태그 소스 방법을 선택하는 필드가 표시되어 있습니다." >}}

## 태그 보강 동작 {#tag-enrichment-behavior}

- **영향을 받는 텔레메트리**: 태그 보강은 DSM, Events 및 Orchestration을 제외한 모든 텔레메트리에 적용됩니다.
- **과거 데이터**: 태그 보강 규칙은 규칙이 활성화된 동안 수집되는 텔레메트리에만 적용됩니다. 과거 데이터는 소급하여 업데이트되지 않습니다. 규칙을 삭제하거나 수정하면 새 텔레메트리에 적용되는 것이 중단되지만, 이전에 수집된 데이터는 업데이트되지 않습니다.
- **메타데이터 업데이트**: 기본 규칙을 포함한 보강 규칙이 활성화된 상태에서 Entity Metadata를 업데이트하거나 서비스에 추가하면 해당 태그가 자동으로 업데이트됩니다.
- **규칙 처리 순서**: 태그 보강 규칙은 생성된 순서대로 적용됩니다. 목록 상단에 있는 규칙은 아래에 있는 규칙보다 우선합니다.
- **리매핑 규칙과의 상호작용**: 태그 보강 규칙은 서비스 리매핑 규칙이 적용된 후에 적용됩니다. 서비스 리매핑 규칙이 `service` 태그를 수정하는 경우 태그 보강은 IDP 메타데이터를 조회할 때 업데이트된 서비스 이름을 사용합니다.
- **기본 태그**: 태그 보강은 기본 태그 확인 후에 적용되므로 보강된 태그는 기본 태그로 사용할 수 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/software/settings/tag-enrichment
[2]: /ko/account_management/rbac/
[3]: /ko/data_observability/jobs_monitoring/