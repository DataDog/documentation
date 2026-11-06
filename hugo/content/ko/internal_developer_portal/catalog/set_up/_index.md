---
aliases:
- /ko/software_catalog/set_up
- /ko/tracing/software_catalog/guides/validating-service-definition
- /ko/software_catalog/guides/validating-service-definition
- /ko/tracing/service_catalog/guides/validating-service-definition
- /ko/service_catalog/guides/validating-service-definition
- /ko/service_catalog/use_cases/validating_service_definition
- /ko/software_catalog/use_cases/validating_service_definition
- /ko/software_catalog/customize/
- /ko/software_catalog/manage_entries/
- /ko/software_catalog/enrich_default_catalog/
- /ko/service_catalog/manage_entries/
- /ko/service_catalog/enrich_default_catalog/
- /ko/service_catalog/customize/
- /ko/software_catalog/best-practices
- /ko/software_catalog/guides/best-practices
- /ko/service_catalog/guides/best-practices
- /ko/service_catalog/use_cases/best_practices
- /ko/software_catalog/use_cases/best_practices
- /ko/software_catalog/navigating
- /ko/tracing/software_catalog/browsing
- /ko/software_catalog/browsing
- /ko/tracing/service_catalog/browsing
- /ko/service_catalog/browsing
- /ko/service_catalog/navigating
- /ko/software_catalog/manage
- /ko/tracing/software_catalog/investigating
- /ko/software_catalog/investigating/
- /ko/tracing/software_catalog/guides/understanding-service-configuration
- /ko/software_catalog/guides/understanding-service-configuration/
- /ko/tracing/service_catalog/investigating
- /ko/service_catalog/investigating/
- /ko/tracing/service_catalog/guides/understanding-service-configuration
- /ko/service_catalog/guides/understanding-service-configuration/
- /ko/api_catalog/add_metadata
- /ko/api_catalog/owners_and_tags
- /ko/service_catalog/manage
- /ko/internal_developer_portal/software_catalog/set_up
description: Datadog 텔레메트리에서 엔터티를 검색하거나, 엔터티 정의를 수동으로 생성하거나, Backstage 및 ServiceNow와
  같은 타사 소스에서 가져와 Catalog를 채웁니다.
further_reading:
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: 블로그
  text: Service Definition JSON Schema를 사용하여 Service Catalog 항목 관리
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: 블로그
  text: 간소화된 Service Catalog 설정을 사용하여 서비스에 태그와 메타데이터를 쉽게 추가하세요.
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: 블로그
  text: 저는 Datadog의 Service Catalog에 GitHub Actions를 사용하며 여러분도 그렇게 해야 합니다.
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: 블로그
  text: Datadog Service Catalog를 사용한 엔드투엔드 서비스 소유권 모범 사례
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: 학습 센터
  text: Catalog를 사용한 서비스 관리
title: Catalog 설정
---
## 개요 {#overview}

Catalog 엔터티는 Kubernetes 스타일의 YAML 구성 파일인 [엔터티 정의][1]를 통해 정의됩니다. 

Catalog를 채우는 방법은 다음과 같습니다.
- Datadog Application Performance Monitoring(APM), Universal Service Monitoring(USM), Real User Monitoring(RUM), 인프라 메트릭 또는 로그를 설정하면 엔터티 데이터가 Catalog로 자동 전송됩니다.
- 수동 또는 자동화를 통해 엔터티 정의를 생성합니다. 
- 타사에서 기존 엔터티 정의를 가져옵니다. 

## Datadog에서 엔터티를 자동으로 검색 {#automatically-discover-entities-from-datadog}

기본적으로 Catalog는 APM, USM 및 RUM에서 검색된 항목으로 자동 채워집니다. 로그와 같은 다른 Datadog 텔레메트리에서 항목을 수동으로 가져올 수도 있습니다. 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum" >}}APM, USM 및 RUM에서 검색{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/discover_entities#import-entities-from-infrastructure-and-logs" >}}인프라 및 로그에서 가져오기{{< /nextlink >}}
{{< /whatsnext >}}

### APM {#apm}

Datadog SDK 또는 OpenTelemetry로 애플리케이션 코드를 계측하면 애플리케이션이 트레이스를 내보내고 샘플링되지 않은 트레이스 메트릭을 생성합니다. 이러한 트레이스와 메트릭은 IDP의 엔터티 검색 및 종속성 매핑 기능을 지원합니다. 계측 방식 선택(예: Datadog Agent 버전, SDK 버전, 사용자 지정 계측 또는 서비스 재정의 사용 여부)은 종속성 맵의 품질과 정확성에 영향을 미칩니다. 자세한 내용은 [APM, USM 및 RUM에서 검색][5]을 참조하세요.

### USM {#usm}

USM은 Golden Signal 메트릭(예: 요청, 오류 및 지속 시간)을 탐지하고 eBPF를 기반으로 애플리케이션 종속성을 매핑합니다. 애플리케이션 코드의 계측이 필요하지 않습니다.

### RUM {#rum}

RUM은 페이지 성능, 오류, 세션 이벤트, 보기를 포함한 프런트엔드 사용자 경험 데이터를 제공합니다. RUM 애플리케이션이 있는 경우, Catalog의 구성 요소 선택기에 **Frontend Apps**로 표시됩니다. 

### 기타 Datadog 텔레메트리 {#other-datadog-telemetries}

로그, 호스트 메트릭, 컨테이너 메트릭, 네트워크 메트릭, 프로세스 메트릭과 같은 Datadog 텔레메트리에서 식별된 엔터티를 가져올 수도 있습니다. 

[**엔터티 가져오기**][10]를 사용하고 데이터 소스를 선택하면 Datadog이 해당 소스를 쿼리하여 유효한 `DD_SERVICE` 태그를 검색합니다. 엔터티는 `kind:service` 속성으로 표시됩니다.

**참고**: `DD_SERVICE` 태그가 잘 관리되어 있고 관련 없는 값이나 잘못된 태그 값이 포함되어 있지 않은 경우에만 이 작업을 수행해야 합니다.

## 엔터티 생성 {#create-entities}

엔터티 YAML 파일에 정의된 [엔터티 정의][1]는 Catalog에서 신뢰할 수 있는 표준 정보입니다. 여기서는 다음을 수행할 수 있습니다. 
- Datadog을 통해 엔터티 정의를 수동으로 생성합니다.
- GitHub 또는 GitLab 리포지토리에 정의를 저장하고, [소스 코드 통합][6]을 설정하여 IDP와 정의를 동기화합니다. 파일에 적용된 변경 사항은 몇 분 내에 Datadog에 반영됩니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/create_entities#through-the-datadog-ui" >}}Datadog UI를 통한 생성{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/create_entities#through-automation" >}}코드 자동화를 통한 생성{{< /nextlink >}}
{{< /whatsnext >}}

**참고**: 엔터티를 해당 텔레메트리와 자동으로 연결하려면 정의의 `name` 필드가 텔레메트리 데이터의 기본 식별자와 정확히 일치해야 합니다. 대부분의 서비스에서 이는 Datadog의 통합 서비스 태깅(Unified Service Tagging)에 정의된 `service` 태그입니다. [`kind:datastore`][7], [`kind:queue`][8] 및 기타 [`entity types`][9]에 대한 예시를 참조하세요.

## 엔터티 가져오기 {#import-entities}

Backstage 또는 ServiceNow CMDB에서 소프트웨어 인벤토리를 관리하는 경우, 이러한 인벤토리를 Datadog의 Catalog로 동기화할 수 있습니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage" >}}Backstage에서 가져오기{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow" >}}ServiceNow에서 가져오기{{< /nextlink >}}
{{< /whatsnext >}}

### Backstage {#backstage}

다음 두 가지 방법으로 Backstage 엔터티를 Datadog의 IDP로 가져올 수 있습니다.
1. [Datadog의 Backstage 플러그인][11]을 설치합니다. 
1. Datadog API, Terraform 또는 Datadog의 GitHub 통합을 사용하여 Backstage에서 IDP로 엔터티 설명자 파일을 가져옵니다. 

### ServiceNow {#servicenow}

ServiceNow CI 테이블에 대한 정기적인 쿼리를 설정하여 ServiceNow CMDB 인벤토리를 Datadog의 Catalog와 동기화합니다.

## 엔터티 소유권 정의 {#define-entity-ownership}

엔터티를 팀에 연결하여 Datadog 제품 전반에서 팀 기반 필터링을 사용하고, 알림을 적절한 소유자에게 라우팅하며, Scorecards 및 Campaigns를 통해 책임성을 강화합니다. 자세한 내용은 [Catalog 엔터티에 대한 소유권 정의][12]를 참조하세요.

## 구성 완전성 검증 {#verify-configuration-completeness}

트레이싱, 로깅, 코드 프로파일링과 같은 모니터링 모범 사례를 따르면 인시던트 분류 과정에서 필요한 모든 데이터를 확보할 수 있습니다. Catalog는 이러한 권장 설정에 대한 자동 확인 기능을 제공합니다. 

엔터티의 구성 완전성을 보려면 [Catalog][2]에서 해당 엔터티를 클릭한 다음 **Setup Guidance** 탭을 찾습니다.

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="Setup Guidance 탭이 강조 표시된 Catalog의 모습" >}}

Setup Guidance 표에는 현재 확인 중인 엔터티의 활동이 반영되므로 개별 제품의 실제 청구 내역과 반드시 일치하지는 않습니다. 예를 들어, 서비스가 인프라 메트릭을 오랫동안 내보내지 않으면 인프라 모니터링을 실행 중인 호스트나 컨테이너가 있더라도 `Infrastructure Monitoring`에 `Not Detected`가 지정되어 있을 수 있습니다. 

## 역할 기반 액세스 및 권한 구성 {#configure-role-based-access-and-permissions}

일반적인 정보는 [Role Based Access Control][3] 및 [Role Permissions][4]를 참조하세요.

### 읽기 권한 {#read-permission}

Catalog 읽기 권한을 통해 사용자는 Catalog 데이터를 읽고 다음 기능을 사용할 수 있습니다.
- Catalog 목록
- UI 검색
- Service Definition 엔드포인트: `/api/v2/services/definition/<service_name>`

이 권한은 **Datadog Read Only Role** 및 **Datadog Standard Role**에서 기본적으로 활성화됩니다.

### 쓰기 권한 {#write-permission}

Catalog 쓰기 권한을 통해 사용자는 Catalog 데이터를 수정할 수 있습니다. 다음 기능을 사용하려면 쓰기 권한이 필요합니다.
- `POST /api/v2/services/definitions` 엔드포인트를 사용하여 서비스 정의 삽입 또는 업데이트
- `DELETE /api/v2/services/definition/<service_name>` 엔드포인트를 사용하여 서비스 정의 삭제
- Discover Services UI에서 온보딩 프로세스 완료
- UI에서 서비스 메타데이터 업데이트

이 권한은 **Datadog Admin Role** 및 **Datadog Standard Role**에서 기본적으로 활성화됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/internal_developer_portal/catalog/entity_model
[2]: https://app.datadoghq.com/software
[3]: /ko/account_management/rbac
[4]: /ko/account_management/rbac/permissions
[5]: /ko/internal_developer_portal/catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[6]: /ko/integrations/guide/source-code-integration/
[7]: /ko/internal_developer_portal/catalog/entity_model/native_entities/?tab=datastore#datastore-peer-tags
[8]: /ko/internal_developer_portal/catalog/entity_model/native_entities/?tab=queue#datastore-peer-tags
[9]: /ko/internal_developer_portal/catalog/entity_model?tab=v30
[10]: https://app.datadoghq.com/software/settings/get-started
[11]: https://www.npmjs.com/package/@datadog/backstage-plugin-datadog-entity-sync-backend
[12]: /ko/internal_developer_portal/catalog/set_up/ownership