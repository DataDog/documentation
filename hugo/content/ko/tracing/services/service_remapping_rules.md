---
aliases:
- /ko/tracing/services/inferred_entity_remapping_rules/
- /ko/tracing/services/renaming_rules/
further_reading:
- link: https://www.datadoghq.com/blog/service-remapping/
  tag: 블로그
  text: 서비스 재매핑을 사용하여 서비스 데이터를 포괄적으로 연결하세요.
site_support_id: service_remapping_rules
title: 서비스 재매핑 규칙
---
## 개요 {#overview}

트레이서 구성을 변경하거나 코드를 재배포하지 않고도 Datadog 전체에서 서비스가 표시되는 방식을 업데이트하세요. 서비스 재매핑 규칙을 사용하면 서비스를 이름 변경, 병합 또는 분할하거나 Datadog UI의 인프라 태그를 기반으로 새 서비스를 생성할 수 있습니다. 추론된 서비스, 데이터 저장소, 대기열과 같은 다른 엔터티 유형에 대한 재매핑 규칙을 생성할 수도 있습니다.

<div class="alert alert-info">각 조직은 최대 100개의 재매핑 규칙을 포함할 수 있습니다. </div>

## 전제 조건 {#prerequisites}

재매핑 규칙을 생성, 편집 및 삭제하려면 **APM 서비스 재매핑 작성** 권한(`apm_service_renaming_write`)이 있어야 합니다. Datadog 역할 기반 액세스 제어에 대한 자세한 내용은 [권한][1]을 참조하세요.

### 트레이서 버전 요구 사항 {#tracer-version-requirements}

지원되는 트레이서 버전으로 계측된 서비스에 대해서만 서비스 재매핑 규칙을 생성할 수 있습니다. 서비스가 이전 트레이서 버전에서 보고되는 경우, 해당 서비스에 대한 재매핑 규칙을 생성하기 전에 SDK를 업그레이드하세요.

**참고**: 이는 계측된 서비스에만 적용됩니다. 추론된 서비스, 데이터 저장소 또는 대기열을 재매핑하는 데는 트레이서 버전 요구 사항이 없습니다. 

| 언어   | 최소 지원 트레이서 버전 |
|------------|----------------------------------|
| C++        | 모든 버전 지원 |
| Dotnet     | [3.4.0][3]                       |
| Go         | [1.55.0][6]                      |
| Java       | [1.20.0][2]                      |
| JavaScript | [3.37.0][16]-3.x 또는 [4.16.0][4] |
| PHP        | [0.94.1][7]                      |
| Python     | [1.19.0][5]                      |
| Ruby       | [1.15.0][8]                      |

## 서비스 재매핑 규칙을 생성하세요 {#create-a-service-remapping-rule}

### 1단계: 재매핑 작업 및 대상 엔터티를 선택하세요 {#step-1-select-remapping-action-and-entities-to-target}

1. Datadog에서 {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Service Remapping{{< /ui >}}][13]로 이동합니다. {{< ui >}}Add Service Rule{{< /ui >}}을 클릭하여 계측된 서비스를 재매핑하세요. 추론된 서비스, 데이터 저장소 또는 대기열을 재매핑하려면 {{< ui >}}Inferred Entity Rules{{< /ui >}} 탭을 선택하고 {{< ui >}}Add Inferred Entity Rule{{< /ui >}}를 클릭하세요. 

   또는 {{< ui >}}APM{{< /ui >}} > [{{< ui >}}Catalog{{< /ui >}}][14]로 이동한 다음 서비스를 클릭하여 서비스 측면 패널을 여세요. 거기에서 {{< ui >}}Service Page{{< /ui >}} > {{< ui >}}Service Remapping{{< /ui >}}을 클릭하세요.
   {{< img src="tracing/services/renaming_rules/service-side-panel.png" alt="서비스 페이지 드롭다운 메뉴에서 서비스 재매핑 옵션을 보여주는 서비스 측면 패널" style="width:100%;" >}}
1. 새 재매핑 규칙에 대해 수행할 재매핑 작업을 선택하세요.
   - 단일 엔티티 분할, 엔티티 이름 바꾸기, 여러 엔티티 병합 또는 여러 엔티티 이름 바꾸기를 수행하려면 {{< ui >}}Remap services{{< /ui >}}을 선택하세요.
   - 인프라 태그를 기반으로 서비스를 식별하려면 {{< ui >}}Correlate telemetry{{< /ui >}}를 선택하세요.
1. 검색 창을 사용하여 재매핑할 엔티티를 선택하세요.
   - 하나 이상의 엔티티를 선택할 수 있지만, 모두 동일한 유형(서비스, 추론된 서비스, 데이터 저장소 또는 대기열)이어야 합니다. 표시 이름 메타데이터가 아닌 `service` 또는 `peer.service` 태그를 기준으로 서비스를 선택하세요.
   - 엔티티를 선택하면 백그라운드에서 스팬 쿼리가 생성됩니다. {{< ui >}}Build Advanced Query{{< /ui >}}을 선택하여 쿼리를 편집하세요.
   - 서비스를 인프라 태그와 상관관계로 연결하는 경우 _하나의_ 서비스만 선택할 수 있습니다. 텔레메트리 상관관계를 위해 인프라 태그를 선택하세요. 선택한 서비스와 동일한 인프라 태그를 가진 모든 텔레메트리는 단일 통합 서비스 이름으로 재매핑됩니다.

### 2단계: 새 엔티티 이름을 지정하세요 {#step-2-specify-new-entity-name}

텍스트 상자에 선택한 엔티티(또는 엔티티들)의 고유 이름을 입력하세요. 또는 태그 값을 사용하세요.`{{tagName}}` 구문을 사용하여 엔티티의 태그를 기반으로 재매핑하세요. 입력하는 동안 새 서비스 이름의 미리 보기가 나타납니다.
   1. 태그 값이 패턴을 따르는 경우, 정규 표현식을 적용하여 이름에서 원하는 부분만 추출하세요.
**참고**: 미리 보기는 전체 목록이 아닙니다. 여러 값이 있는 태그를 기반으로 서비스를 재매핑하는 경우, 미리 보기에는 스팬이 가장 많은 값만 나타납니다. 

### 3단계: 규칙 이름을 지정하고 검토하세요 {#step-3-name-your-rule-and-review}

1. 선택적으로, 나중에 식별할 수 있도록 재매핑 규칙에 대한 설명 이름을 입력하세요.
1. 재매핑 규칙을 검토하고 저장하세요. 규칙을 저장한 후 _적용되기까지 약 1분이 소요될 수 있습니다_.

## 재매핑 규칙 동작 {#remapping-rules-behavior}

재매핑 규칙은 서비스 재매핑을 위한 `service` 태그나 추론된 서비스, 데이터 저장소 및 대기열 재매핑을 위한 `peer.service` 태그를 재정의하는 방식으로 작동합니다. 서비스는 수집 시 재매핑되며, 재매핑 규칙이 생성될 때 서비스 이름을 지정하는 기존 구성은 변경되지 않습니다. 서비스 재매핑 규칙은 다른 모든 서비스 이름 구성보다 우선합니다.

재매핑 규칙은 APM, 로그, 메트릭, USM, DSM, DJM, DBM, 프로파일링, NPM, Live Processes, Containers, Kubernetes 및 이벤트 전반에 적용됩니다.

- **과거 데이터:** 재매핑 규칙에 의한 변경 사항은 규칙이 활성화된 동안 수집된 텔레메트리 데이터에만 영향을 미치며, 과거 데이터는 소급하여 업데이트되지 않습니다. 규칙을 삭제하거나 수정하면 새 데이터에 적용되는 것이 중단되지만, 이전에 수집된 데이터의 이름은 되돌리지 않습니다.
- **규칙 순서:** 서비스 재매핑 규칙은 순서대로 적용됩니다. 규칙 목록의 맨 위에 있는 규칙이 먼저 적용됩니다. 서비스는 해당 서비스를 캡처하는 첫 번째 규칙에 의해서만 재매핑됩니다(동일한 서비스에 여러 규칙이 적용되지 않습니다).
- **정규 표현식:** 정규 표현식을 사용하여 새 서비스 이름을 정의할 수 있지만, 캡처 그룹 내에서는 탐욕적 수량자(greedy quantifier)를 사용할 수 없습니다.
- **로그 서비스 재매핑기:** 서비스 재매핑 규칙은 로그 파이프라인보다 먼저 적용됩니다. 로그 서비스 재매핑기와 재매핑 규칙이 모두 서비스에 적용되는 경우, 재매핑 규칙이 우선합니다. 
- **Dashboards 및 모니터:** 이전 서비스 이름을 참조하는 기존 쿼리는 자동으로 업데이트되지 않습니다. 이를 수동으로 검토 및 업데이트하세요.
**통합 및 사용자 지정 재정의:** 통합 재정의 또는 사용자 지정 재정의가 재매핑 규칙의 범위 내에 있는 경우, 해당 항목도 재매핑됩니다. 최상의 APM 경험을 위해 [통합 재정의를 제거][15]하세요.
- **서비스 명명 계층 구조:** 서비스 이름은 우선순위가 높은 순서대로 다음 계층 구조에 따라 결정됩니다.
  1. 서비스 재매핑 규칙
  2. 코드에 정의된 서비스(`tracer.Start(WithService(xx))`)
  3. 시스템 속성에 정의된 서비스(`-Ddd.service={}`)
  4. 환경 변수에 정의된 서비스(`DD_SERVICE`)
  5. 구성 파일에 정의된 서비스(`application_monitoring.yaml`)

[1]: /ko/account_management/rbac/permissions
[2]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.20.0
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.4.0
[4]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.16.0
[5]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.19.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.55.0
[7]: https://github.com/DataDog/dd-trace-php/releases/tag/0.94.1
[8]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.15.0
[9]: /ko/tracing/services/
[10]: /ko/internal_developer_portal/catalog/
[11]: /ko/logs/explorer/
[12]: /ko/metrics/explorer/
[13]: https://app.datadoghq.com/software/settings/service-rename
[14]: https://app.datadoghq.com/software
[15]: /ko/tracing/services/service_override_removal
[16]: https://github.com/DataDog/dd-trace-js/releases/tag/v3.37.0

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}