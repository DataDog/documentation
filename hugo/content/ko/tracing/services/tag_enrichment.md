---
description: 코드를 재배포하지 않고도 Catalog 서비스 정의의 팀 및 시스템 태그로 텔레메트리를 자동으로 보강합니다.
further_reading:
- link: /tracing/services/service_remapping_rules
  tag: 설명서
  text: 서비스 재매핑 규칙
- link: /internal_developer_portal/catalog/
  tag: 설명서
  text: Catalog
title: 태그 보강
---
{{< callout url="https://www.datadoghq.com/product-preview/tag-enrichment/" >}}
태그 보강은 미리 보기 상태입니다. 액세스를 요청하려면 이 양식을 작성하십시오.
{{< /callout >}}

## 개요 {#overview}

태그 보강 규칙을 사용하여 코드 변경이나 재배포 없이 로그, APM 스팬 및 트레이스 메트릭에 태그를 추가하십시오. Catalog에 이미 정의한 서비스 메타데이터의 값, 다른 태그의 값 또는 고정 값을 사용할 수 있습니다.

## 전제 조건 {#prerequisites}

태그 보강 규칙을 생성하려면 Datadog Admin 역할이 있어야 합니다. 자세한 내용은 [역할 기반 액세스 제어][2]를 참조하십시오.

## 태그 보강 규칙 생성 {#create-a-tag-enrichment-rule}

### 기본 태그 보강 규칙 {#default-tag-enrichment-rules}

기본 규칙을 활성화하려면 {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1]로 이동하여 페이지 하단에서 `team` 또는 `system`에 대한 기본 규칙을 켭니다.

{{< img src="tracing/services/tag_enrichment/tag-enrichment-landing.png" alt="모든 서비스에 대한 시스템 및 팀 태그 보강 규칙을 생성하는 옵션이 포함된 제안된 규칙 패널을 보여주는 태그 보강 페이지입니다." >}}

기본 규칙을 활성화하면 IDP에 정의된 엔티티 메타데이터를 기반으로 모든 서비스의 텔레메트리에 `team` 또는 `system`가 적용됩니다. 엔티티 메타데이터가 채워진 서비스만 보강됩니다. 태그는 서비스의 텔레메트리에 해당 태그의 값이 아직 없는 경우에만 추가됩니다.

### 사용자 지정 태그 보강 규칙 {#custom-tag-enrichment-rules}

사용자 지정 규칙을 사용하면 특정 서비스 세트를 대상으로 지정하고, 각 태그 값이 어떻게 가져오고 적용되는지 정확하게 구성할 수 있습니다.

1. Datadog에서 {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1]로 이동하여 {{< ui >}}\+ Add Rule{{< /ui >}}를 클릭하십시오.
1. 보강할 엔티티를 선택하십시오. 엔티티를 선택하면 백그라운드에서 쿼리가 생성됩니다. {{< ui >}}Build Advanced Query{{< /ui >}}을 선택하여 쿼리를 편집하세요.
   {{< img src="tracing/services/tag_enrichment/tag-enrichment-adv-query.png" alt="고급 쿼리 빌드 탭이 선택된 IDP 태그 보강 규칙 추가 모달로, 태그 키, 연산자, 값에 대한 필드와 조건 추가 옵션이 표시됩니다." >}}
   - {{< ui >}}Add Condition{{< /ui >}}을(를) 선택하여 쿼리에 `AND` 조건을 추가하십시오.
   - {{< ui >}}Value{{< /ui >}} 필드에 여러 값을 추가하여 `OR` 조건을 만드십시오.
1. 태그 및 보강 방법 선택:
   - `team` 태그, `system` 태그, `custom` 태그 또는 여러 개를 선택하십시오.
   - 각 태그에 대해 태그 값이 엔터티 메타데이터에서 오는지, 다른 태그의 값에서 오는지, 아니면 고정 값에서 오는지 선택하십시오.
   - 값이 이미 존재하지 않을 때만 적용할지, 아니면 해당 태그의 현재 값 목록에 추가할지 선택하십시오.
1. 기본적으로 태그는 특정 텔레메트리 항목에 값이 누락된 경우에만 추가됩니다.
1. 선택적으로 규칙에 대한 설명 이름을 입력하십시오.
1. 규칙을 검토하고 저장하십시오. 규칙을 저장한 후, 들어오는 텔레메트리에 보강이 완전히 적용되기까지 최대 1시간이 소요될 수 있습니다.

### 서비스 페이지에서 태그 보강 규칙 추가 {#add-a-tag-enrichment-rule-from-a-service-page}

`team` 또는 `system` 태그가 누락된 서비스 페이지에서 {{< ui >}}Service Config{{< /ui >}}을(를) 클릭하여 구성 측면 패널을 여십시오. 패널 상단의 배너에 누락된 태그가 표시됩니다.

{{< img src="tracing/services/tag_enrichment/service-config-side-panel.png" alt="팀 및 시스템 태그가 텔레메트리에서 누락되었음을 나타내는 배너와 태그 추가 버튼이 표시된 서비스의 서비스 구성 측면 패널입니다." >}}

{{< ui >}}Add Tags{{< /ui >}}을(를) 클릭하여 해당 서비스가 미리 채워진 태그 보강 규칙 모달을 여십시오.

{{< img src="tracing/services/tag_enrichment/add-idp-tag-enrichment-rule.png" alt="보강할 엔터티, 추가할 태그, 태그 소스 방법을 선택하는 필드가 표시된 IDP 태그 보강 규칙 추가 모달입니다." >}}

## 태그 보강 동작 {#tag-enrichment-behavior}

- **영향을 받는 텔레메트리**: 태그 보강은 로그, APM 스팬 및 트레이스 메트릭에만 적용됩니다. [Data Observability: Jobs Monitoring][3]은 작업 텔레메트리를 APM 스팬으로 전송하므로 해당 텔레메트리도 보강되지만, Jobs Monitoring 메트릭은 보강되지 않습니다. 태그 보강은 사용자 지정 및 인프라 메트릭, Database Monitoring, 프로파일링, Kubernetes, Universal Service Monitoring 및 이벤트를 포함한 다른 텔레메트리 유형에 대해서는 지원되지 않습니다.
- **과거 데이터**: 태그 보강 규칙은 규칙이 활성화된 동안 수집된 텔레메트리에만 적용됩니다. 과거 데이터는 소급하여 업데이트되지 않습니다. 규칙을 삭제하거나 수정하면 새 텔레메트리에 적용되는 것이 중단되지만, 이전에 수집된 데이터는 업데이트되지 않습니다.
- **메타데이터 업데이트**: 기본 규칙을 포함하여 보강 규칙이 활성화된 상태에서 서비스에 엔터티 메타데이터를 업데이트하거나 추가하면 해당 태그가 자동으로 업데이트됩니다.
- **규칙 처리 순서**: 태그 보강 규칙은 생성된 순서대로 적용됩니다. 목록 상단에 있는 규칙이 하단에 있는 규칙보다 우선합니다.
- **재매핑 규칙과의 상호 작용**: 태그 보강 규칙은 서비스 재매핑 규칙 이후에 적용됩니다. 서비스 재매핑 규칙이 `service` 태그를 수정하는 경우, 보강 기능은 IDP 메타데이터를 조회할 때 업데이트된 서비스 이름을 사용합니다.
- **기본 태그** 태그 보강은 기본 태그 확인 후에 적용되므로, 보강된 태그는 기본 태그로 사용할 수 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/software/settings/tag-enrichment
[2]: /ko/account_management/rbac/
[3]: /ko/data_observability/jobs_monitoring/