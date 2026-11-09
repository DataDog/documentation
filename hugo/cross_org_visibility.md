---
algolia:
  tags:
  - cross org
  - cross-org
  - cross organization
description: 동일한 계정 내의 서로 다른 조직 간에 데이터를 공유하고 쿼리를 수행하세요.
title: 조직 간 가시성
---
## 개요 {#overview}

일부 기업은 규정 준수나 기타 이유로 데이터를 분리하기 위해 여러 Datadog [조직][1]을 사용합니다.

조직 간 가시성을 통해 고객은 동일한 계정에 속한 서로 다른 조직 간에 데이터를 공유하고 여러 조직의 인사이트를 한곳에서 확인할 수 있습니다.

이 문서에서는 다음 내용을 설명합니다.
- 조직 간 가시성으로 [수행할 수 있는 작업](#capabilities)
- 조직 간에 데이터를 [공유하는](#create-a-connection) 방법
- 다른 조직의 데이터를 사용하여 [Dashboard 및 Notebook 위젯](#create-a-widget-with-cross-organization-data) 또는 [API 쿼리](#in-the-api-1)를 생성하는 방법

## 기능 {#capabilities}

### 조직 연결 {#organization-connection}

_소스_ 조직은 _조직 연결_을 통해 _목적지_ 조직에 데이터를 노출합니다. 소스 조직은 여러 목적지를 가질 수 있으며, 목적지 조직도 여러 소스를 가질 수 있습니다.

조직 연결에는 다음과 같은 제한 사항이 적용됩니다.
- 소스 및 목적지 조직은 동일한 [계정][1]에 속해야 합니다.
- 소스 및 목적지 조직은 동일한 [사이트][11]에 있어야 합니다.
- Pro 조직은 최대 5개의 다른 조직과 공유할 수 있습니다. Enterprise 조직에는 제한이 없습니다. Free, Trial, Startup과 같은 다른 플랜을 사용하는 조직은 다른 조직과 공유할 수 없습니다.

**참고**: 연결이 설정되면 목적지 조직은 자체 데이터를 쿼리하는 것과 동일한 방식으로 소스 조직의 데이터를 쿼리할 수 있습니다. 즉, _목적지 조직의_ 액세스 제어 및 기타 설정이 허용하는 바에 따라 민감한 데이터를 포함한 소스 조직의 데이터를 쿼리하고 표시할 수 있습니다. 예를 들어, 소스 조직 자체 설정에서 공개 Dashboards 생성을 허용하지 않더라도 목적지 조직이 소스 조직의 데이터를 사용하여 [공개 Dashboards][10]를 생성할 수 있습니다.

조직 연결을 설정한 후에도 노출된 데이터는 소스 조직에 그대로 저장되며 목적지 조직으로 이동하지 않습니다. 대신 목적지 조직이 소스 조직에서 데이터를 쿼리합니다. 연결 과정에서 데이터가 복제되지 않으며 추가 요금이 발생하지 않습니다. 목적지 조직은 연결 생성일 이전의 데이터를 포함하여 소스 데이터가 지원하는 모든 기간의 소스 데이터를 쿼리할 수 있습니다. 연결을 제거하면 목적지는 더 이상 소스의 데이터에 액세스할 수 없으며 소스 조직의 데이터로 생성된 쿼리나 Dashboards가 더 이상 작동하지 않을 수 있습니다.

### 범위 {#scope}

조직 간 가시성은 [Dashboard 및 Notebook 위젯][2]에서 다음 텔레메트리를 지원합니다.
* 메트릭([사용자 지정 메트릭][3], [트레이스 메트릭][4] 및 [로그에서 생성된 메트릭][5]을 포함하는 모든 유형)
* 로그
* CI Visibility Pipelines
* Test Optimization 테스트
* Audit Trail

## 연결 구성 {#configure-connections}

### 연결 목록 {#list-connections}

연결을 탐색하려면 Organization Settings의 [cross-organization visibility 페이지][6]로 이동하세요. 이 표에는 모든 조직 간 연결이 나열되어 있습니다.

### 연결 생성 {#create-a-connection}

조직 간 연결을 생성하면 목적지 조직에서 소스 조직의 메트릭을 쿼리할 수 있습니다.

<div class="alert alert-info">Datadog은 조직 간 연결을 생성하고 관리할 때 <a href="/account_management/org_settings/service_accounts/">서비스 계정</a>을 사용할 것을 권장합니다. 연결은 생성자의 계정에 종속되어 있으므로, 생성자의 계정이 비활성화되면 연결이 삭제되어 데이터 흐름이 중단될 수 있습니다. 서비스 계정은 개별 사용자에게 종속되지 않으므로 이러한 운영 위험을 방지합니다. 서비스 계정 애플리케이션 키를 <a href="/account_management/org_settings/cross_org_visibility_api/">Cross-Org Connections API</a>와 함께 사용하여 프로그래밍 방식으로 연결을 생성하고 관리할 수도 있습니다.</div>

1. 노출하려는 데이터가 포함된 _소스_ 조직에 로그인되어 있는지 확인합니다.
1. [cross-organization visibility 페이지][6]에서 {{< ui >}}New Connection{{< /ui >}}을 클릭합니다. {{< ui >}}New Connection{{< /ui >}} 대화 상자가 나타납니다.
1. 드롭다운 메뉴에서 데이터를 조회할 _목적지_ 조직을 선택합니다.
1. {{< ui >}}Connect{{< /ui >}}를 클릭합니다.

### 연결 업데이트 {#update-a-connection}

기존 조직 간 연결을 업데이트하면 소스 조직에서 목적지 조직으로 공유하는 데이터 유형을 변경할 수 있습니다.

1. 기존 연결의 _소스_ 조직에 로그인되어 있는지 확인합니다.
1. 업데이트하려는 연결 위로 마우스를 가져갑니다. 오른쪽에 연필 모양의 {{< ui >}}Edit{{< /ui >}} 아이콘이 나타납니다.
1. 업데이트하려는 연결의 연필 모양 {{< ui >}}Edit{{< /ui >}} 아이콘을 클릭합니다. {{< ui >}}Edit Connection{{< /ui >}} 대화 상자가 나타납니다.
1. 포함할 데이터 유형의 확인란을 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 연결 삭제 {#delete-a-connection}

연결을 삭제하면 목적지 조직에서 소스 조직의 메트릭에 대한 조직 간 쿼리가 비활성화됩니다.

1. Organization Settings의 [cross-organization visibility 페이지][6]로 이동합니다.
1. 삭제하려는 연결 위로 마우스를 가져갑니다. 오른쪽에 휴지통 모양의 {{< ui >}}Delete{{< /ui >}} 아이콘이 나타납니다.
1. 삭제하려는 연결의 휴지통 모양 {{< ui >}}Delete{{< /ui >}} 아이콘을 클릭합니다. {{< ui >}}Are you sure?{{< /ui >}} 프롬프트가 나타납니다.
1. {{< ui >}}Delete{{< /ui >}}를 클릭합니다.

### API에서 구성{#in-the-api}

API를 사용하여 연결을 구성하려면 [조직 간 연결 API][7]를 참조하세요.

## 조직 간 데이터를 사용하는 위젯 생성 {#create-a-widget-with-cross-organization-data}

하나 이상의 [연결](#configure-connections)에서 _목적지_ 조직으로 지정된 Datadog 조직은 조직 간 [Dashboard 및 Notebook 위젯][2]을 사용할 수 있습니다.

위젯의 각 쿼리는 하나의 조직에서 가져온 데이터를 표시할 수 있습니다. 쿼리를 결합하여 조직 간 수식 쿼리를 생성할 수 있습니다.

### UI에서 구성{#in-the-ui}

다음 조건이 충족되면 Dashboard 및 Notebook 위젯에서 조직 간 쿼리를 생성할 수 있습니다.

- 조직에서 조직 간 가시성이 활성화되어 있어야 합니다.
- 현재 조직이 목적지인 연결이 하나 이상 있어야 합니다.

위 조건이 충족되면 데이터 유형 및 메트릭 이름 드롭다운 메뉴 사이에 조직 선택 드롭다운 메뉴가 나타납니다. 조직 선택 드롭다운 메뉴를 사용하여 쿼리할 소스 조직을 선택하세요.

다음 스크린샷은 조직 간 수식 쿼리의 예시입니다. 위젯에는 서비스당 수집된 이벤트 수가 그래프로 표시됩니다. 전체 이벤트 수를 구하기 위해 조직 간 수식 쿼리는 조직 A의 데이터(쿼리 **a**)와 조직 B의 데이터(쿼리 **b**)를 합산합니다.

{{< img src="account_management/org_settings/cross_org_visibility/cross_org_query-1.png" alt="조직 간 쿼리를 사용하는 Dashboard 위젯 구성 스크린샷" >}}

### API에서 구성{#in-the-api-1}

<div class="alert alert-info">
<a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs">Datadog Terraform Provider</a>는 조직 간 연결 생성을 지원하지 않습니다. 하지만 대시보드를 JSON으로 내보내면 Terraform을 통해 조직 간 쿼리가 포함된 위젯이 있는 대시보드를 관리할 수 있습니다.
</div>

`cross_org_uuids` 필드를 사용하여 Dashboard 및 Notebook 위젯 JSON에 조직 간 데이터를 포함할 수 있습니다. 이 필드는 다음 Metrics API 수식 쿼리 엔드포인트에서도 사용할 수 있습니다.
- [여러 제품에서 시계열 데이터 쿼리][8]
- [여러 제품에서 스칼라 데이터 쿼리][15]

Dashboard API에서 위젯을 정의하거나 Metrics API 수식 쿼리 요청을 전송할 때 각 쿼리 객체에 `cross_org_uuids` 파라미터를 사용하세요. 이 파라미터는 조직 간 쿼리에서 소스 조직을 식별합니다.

`cross_org_uuids` 파라미터는 선택 사항입니다. `cross_org_uuids`을 생략하면 위젯이 정의된 조직에서 쿼리가 실행됩니다.

### JSON 위젯 정의 예시 {#example-json-widget-definition}

{{< highlight json "hl_lines=21 27" >}}
{
    "viz": "timeseries",
    "requests": [
        {
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            },
            "type": "line",
            "formulas": [
                {
                    "formula": "query2 + query1"
                }
            ],
            "queries": [
                {
                    "name": "query2",
                    "data_source": "metrics",
                    "query": "sum:datadog.estimated_usage.events.ingested_events{env:prod} by {service}.as_count()",
                    "cross_org_uuids": ["6434abde-xxxx-yyyy-zzzz-da7ad0900001"]
                },
                {
                    "name": "query1",
                    "data_source": "metrics",
                    "query": "sum:datadog.estimated_usage.events.ingested_events{env:prod} by {service}.as_count()",
                    "cross_org_uuids": ["74edde28-xxxx-yyyy-zzzz-da7ad0900001"]
                }
            ],
            "response_format": "timeseries"
        }
    ]
}
{{< /highlight >}}

JSON 위젯 정의 페이로드의 `cross_org_uuids` 파라미터에 유의하세요.
- 이 파라미터는 선택 사항입니다. 생략할 경우, 위젯이 정의된 조직에서 쿼리가 실행됩니다.
- [조직 엔드포인트][9]에서 확인할 수 있는 조직 식별자를 사용하여 쿼리가 실행될 조직을 식별하세요.
- 이 파라미터는 배열을 허용하지만, 배열에는 요소가 하나만 포함되어야 합니다. `cross_org_uuids` 배열에 여러 요소를 추가하면 400 오류가 발생합니다.

## 권한 {#permissions}
기본적으로 _Org Connection Read_ 권한이 있는 역할에 할당된 사용자만 조직 간 연결 목록을 볼 수 있습니다. _Org Connection Write_ 권한이 있는 역할에 할당된 사용자는 조직 간 연결을 생성하고 삭제할 수 있습니다.

### 세분화된 액세스 제어 {#granular-access-controls}
[세분화된 액세스 제어][12]를 사용하여 조직 간 연결을 편집하거나 쿼리할 수 있는 팀, 역할 또는 사용자를 제한하세요. 이러한 액세스 제어는 다음 권한을 관리합니다.
- 소스 조직: 연결을 편집할 수 있는 사용자
- 목적지 조직: 공유 데이터를 조회하고 연결을 편집할 수 있는 사용자

소스 조직의 연결에는 연결 생성자의 데이터 액세스 권한이 상속됩니다. 생성자가 [Data Access Control][13] 또는 [Log Restriction Queries][14]에 의해 특정 데이터에 대한 액세스가 제한된 경우, 목적지 조직에서도 해당 데이터에 액세스할 수 없습니다. 생성자의 계정이 비활성화되면 연결이 삭제됩니다. 이로 인해 데이터 흐름은 중단되지만 보안 위험은 발생하지 않습니다. 연결을 삭제해도 액세스 제한이 해제되지 않기 때문입니다.

**참고:** HIPAA가 활성화된 조직에서 생성된 연결을 통해 목적지 조직으로 보호 대상 건강 정보(PHI)가 공유될 수 있습니다. PHI를 포함하여 전송되는 모든 민감한 데이터에 대한 책임은 고객에게 있습니다.

1. Organization Settings의 [cross-organization visibility 페이지][6]로 이동합니다.
1. 세분화된 권한을 설정하려는 조직 간 연결 위로 마우스를 가져갑니다. 오른쪽에 {{< ui >}}Permissions{{< /ui >}} 및 {{< ui >}}Delete{{< /ui >}} 아이콘이 나타납니다.
1. 자물쇠 모양의 {{< ui >}}Permissions{{< /ui >}} 아이콘을 클릭합니다.
1. {{< ui >}}Restrict Access{{< /ui >}}를 선택합니다.
1. 대화 상자가 업데이트되어 조직 구성원이 기본적으로 {{< ui >}}Viewer{{< /ui >}} 액세스 권한이 있는 것으로 표시됩니다.
1. 드롭다운에서 조직 간 연결을 편집할 수 있는 팀, 역할 또는 사용자를 하나 이상 선택합니다.
1. {{< ui >}}Add{{< /ui >}}를 클릭합니다.
1. 대화 상자가 업데이트되어 선택한 역할에 {{< ui >}}Editor{{< /ui >}} 권한이 있는 것으로 표시됩니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고**: 조직 간 연결에 대한 편집 권한을 유지하려면 저장하기 전에 자신이 속한 역할 또는 팀을 하나 이상 포함해야 합니다.

액세스가 제한된 조직 간 연결에 대한 일반 액세스를 복원하려면 아래 단계를 따르세요.

1. cross-organization visibility 페이지에서 일반 액세스를 복원하려는 조직 간 연결 위로 마우스를 가져갑니다. 오른쪽에 {{< ui >}}Permissions{{< /ui >}} 및 {{< ui >}}Delete{{< /ui >}} 아이콘이 나타납니다.
1. 자물쇠 모양의 {{< ui >}}Permissions{{< /ui >}} 아이콘을 클릭합니다.
1. {{< ui >}}Restore Full Access{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: /ko/account_management/multi_organization/
[2]: /ko/dashboards/widgets
[3]: /ko/metrics/custom_metrics/#overview
[4]: /ko/tracing/metrics/metrics_namespace/
[5]: /ko/logs/log_configuration/logs_to_metrics/
[6]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[7]: /ko/account_management/org_settings/cross_org_visibility_api
[8]: /ko/api/latest/metrics/#query-timeseries-data-across-multiple-products
[9]: /ko/api/latest/organizations/#list-your-managed-organizations
[10]: /ko/dashboards/sharing/shared_dashboards/#public-shared-dashboards
[11]: /ko/getting_started/site
[12]: /ko/account_management/rbac/granular_access
[13]: /ko/account_management/rbac/data_access/
[14]: /ko/logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query
[15]: /ko/api/latest/metrics/#query-scalar-data-across-multiple-products