---
is_beta: true
private: true
title: 조직 간 가시성
---

{{< callout url="#" header="false" btn_hidden="true">}}
  조직 간 가시성 기능은 엔터프라이즈 플랜을 사용하는 고객에게 <strong>전용 베타 서비스</strong>로 제공됩니다. 이 기능을 사용하는 데 관심이 있는 분은 기술 계정 매니저나 고객 성공 매니저에게 문의하세요.
{{< /callout >}} 


## 개요

일부 회사에서는 규범을 준수하기 위해서나 다른 이유로 Datadog에서 [조직][1]을 여러 개 사용합니다.

조직 간 가시성 기능을 사용하면 한 계정에 있는 다른 조직 간에 데이터를 공유할 수 있고, 한 곳에서 여러 조직의 인사이트를 표시할 수 있습니다.

이 설명서에서는 다음을 설명합니다.
- 조직 간 가시성 기능으로 [할 수 있는 것](#capabilities) 
- 조직 간에 데이터를 [노출](#create-a-connection)하는 방법
- 다른 조직의 데이터로 [대시보드와 노트북 위젯](#create-a-widget-with-cross-organization-data)을 만드는 방법

## 기능

### 조직 연결

_소스_ 조직은 _조직 연결_을 통해 _대상_ 조직에 데이터를 노출할 수 있습니다. Datadog 소스와 대상 조직이 같은 [계정][1]에 있어야 합니다. 소스 조직에는 여러 대상 조직이 있을 수 있고, 대상 조직도 여러 소스가 있을 수 있습니다.

조직 연결을 설정한 후 노출된 데이터는 소스 조직에 남아 있으며 대상으로 이동하지 않습니다. 대신, 대상 조직이 소스에 쿼리합니다. 연결을 해도 데이터가 복제되지 않고 추가 요금도 발생하지 않습니다. 대상 조직에서는 연결을 생성하기 이전 시간을 포함해 소스 데이터가 지원하는 시간 범위 내 언제든지 소스 데이터를 쿼리할 수 있습니다. 연결을 제거하면 대상에서 소스 데이터에 전혀 접근할 수 없습니다.

### 범위

조직 간 가시성은 전용 [대시보드 및 노트북 위젯][2]에서 메트릭 텔레메트리를 지원합니다.

[커스텀 메트릭][3], [트레이스 메트릭][4], [로그에서 생성한 메트릭][6]을 포함해 모든 유형의 메트릭이 지원됩니다.

## 연결 구성

공용 API `/api/v2/org_connections` 엔드포인트를 통해 연결을 구성할 수 있습니다. 엔드포인트에서 인증할 때 사용하는 애플리케이션 키에 `org_management`[6] 권한이 있어야 합니다.

### 연결 목록

소스 조직이나 대상 조직으로 지정되어 있는 조직 내 모든 연결 목록을 표시합니다.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

### 연결 생성

이 조직에서 대상 조직으로 연결을 생성합니다. 이 작업은 소스 조직이 될 조직에서 해야 합니다.

<span style="padding:3px" class="font-semibold text-api-post bg-bg-api-post">POST</span> https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

**참고:** 이 호출의 페이로드에는 대상 조직 UUID가 필요합니다. "List your managed organizations" [엔드포인트][7]에서 대상 조직의 UUID를 얻을 수 있습니다.

#### 헤더

컨텐츠-유형: application/json

#### 페이로드

{{< code-block lang="json" collapsible="true" >}}
{
    "data": {
        "type": "org_connection",
        "relationships": {
            "sink_org": {
                "data": {
                    "type": "orgs",
                    "id": "{{the destination organization UUID}}"
                }
            }
        }
    }
}
{{< /code-block >}}

#### 실패 시나리오

- 연결이 이미 존재함
- 연결이 참조된 대상 조직 ID가 계정 외에 있음

### 연결 삭제

연결을 삭제합니다. 소스 조직이나 대상 조직에서 이 작업을 할 수 있습니다. 삭제할 연결을 ID와 함께 참조하세요. ID는 [List connection](#list-connections) 요청으로 얻을 수 있습니다.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">DELETE</span> https://{datadog_site}/api/v2/org_connections/{connection_id}?api_key={datadog_api_key}&application_key={datadog_application_key}

#### 실패 시나리오

- 조직이 소스나 대상으로서 연결되어 있지 않음
- 연결이 존재하지 않음

## 조직 간 데이터로 위젯 생성

_대상_ 조직으로서 최소 1개 이상에 [연결](#configure-connections)이 있는 Datadog 조직은 조직 간 [대시보드 및 노트북 위젯][2]을 사용할 수 있습니다.

위젯에 있는 각 쿼리는 단일 조직 데이터를 나타냅니다. 쿼리를 조합해 조직 간 수식 쿼리로 만들 수 있습니다.

### UI 내

다음 조건을 충족할 경우 대시보드 및 노트북 위젯에서 조직 간 쿼리를 생성할 수 있습니다.

- 조직 내에서 조직 간 가시성을 활성화함
- 현재 조직이 대상 조직을 되어 있는 연결이 최소 1개가 있음

이전 조건을 충족하면 데이터 유형과 메트릭 이름 드롭다운 메뉴 사이에 드롭다운 선택기가 나타납니다. 조직 드롭다운 선택기를 사용해 쿼리의 소스 조직을 선택합니다.

조직 간 수식 쿼리의 예시를 보려면 다음 스크린샷을 참고하세요. 위젯에서 서비스별로 수집된 이벤트 수를 그래프로 볼 수 있습니다. 조직 간 수식 쿼리에서는 이벤트 총 수를 얻기 위해 조직 A(쿼리 **a**)와 조직 B(쿼리 **b**)의 데이터를 합산합니다.

{{< img src="account_management/org_settings/cross_org_visibility/cross_org_query.png" alt="조직 간 쿼리 대시보드 위젯을 보여주는 스크린샷" >}}

### API 내

<div class="alert alert-info">
<a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs">Datadog Terraform Provider</a>는 조직 간 쿼리를 지원하지 않습니다.
</div>

다음 엔드포인트에서 조직 간 쿼리를 정의할 수 있습니다.
- [시계열][8]

대시보드 API에서 위젯을 정의할 때 JSON 위젯 정의 페이로드에서 `cross_org_uuids` 파라미터를 사용해 조직 간 쿼리의 소스 조직을 지정합니다.

`cross_org_uuids` 파라미터는 선택 사항입니다. `cross_org_uuids` 파라미터를 누락하면 위젯에 정의된 조직에서 쿼리가 실행됩니다.

### JSON 위젯 정의 예시

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

JSON 위젯 정의 페이로드에 있는 `cross_org_uuids` 파라미터를 기록해둡니다.
- 이 파라미터는 선택 사항입니다. 이 파라미터를 누락하면 위젯에 정의된 조직에서 쿼리가 실행됩니다.
- 조직 식별자를 사용해 쿼리를 실행할 조직을 확인합니다. 조직 식별자는 [조직 엔드포인트][7]에서 복구할 수 있습니다.
- 이 파라미터에서 배열을 사용할 수 있으나 하나의 요소만 있어야 합니다. `cross_org_uuids` 배열에 여러 요소가 추가되면 400 오류가 발생합니다.

[1]: /ko/account_management/multi_organization/
[2]: /ko/dashboards/widgets
[3]: /ko/metrics/custom_metrics/#overview
[4]: /ko/tracing/metrics/metrics_namespace/
[5]: /ko/logs/log_configuration/logs_to_metrics/
[6]: /ko/account_management/rbac/permissions/#access-management
[7]: /ko/api/latest/organizations/#list-your-managed-organizations
[8]: /ko/api/latest/metrics/#query-timeseries-data-across-multiple-products