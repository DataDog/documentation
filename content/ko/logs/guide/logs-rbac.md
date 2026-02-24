---
aliases:
- /ko/logs/guide/restrict-access-to-log-events-with-restriction-queries
further_reading:
- link: /logs/guide/logs-rbac-permissions/
  tag: 설명서
  text: 로그 RBAC 권한에 대해 자세히 보기
- link: /api/latest/logs-restriction-queries/
  tag: API
  text: 로그 제한 쿼리
- link: /account_management/rbac/permissions/#log-management
  tag: 설명서
  text: Datadog 역할 권한 허용
title: 로그의 RBAC 설정하는 방법
---

## 개요

대부분의 조직에서 규제 준수나 개인 정보 보호를 위해 로그에 [스크러빙][1]을 하거나 액세스를 제어해야 하는 민감한 정보를 포함하는 경우가 많습니다. RBAC(역할 기반 액세스 제어)를 사용하면 특정 로그와 기능에 권한이 있는 인원만 액세스할 수 있도록 하여 사용자 액세스 권한을 효율적으로 관리할 수 있습니다. 이 가이드에서는 Datadog에서 RBAC을 설정하는 상세한 방법을 설명합니다. 특히 커스텀 역할을 생성하고 권한을 적절히 할당하는 방법을 중점적으로 살펴봅니다.

이 가이드에서는 다음 주제를 다룹니다.

1. [**Admin의 필수 요건**](#prerequisites): 필수 사전 조건을 상세히 설명합니다.
2. [**ACME 팀에서 역할 설정하기**](#setting-up-roles): 역할을 생성하고 팀원을 할당하는 방법을 설명합니다.
3. [**로그 액세스 제한**](#restrict-access-to-logs): 제한 쿼리를 배포하여 로그 액세스를 제한하는 방법을 설명합니다.
4. [**로그 자산에서 권한 설정**](#restrict-access-to-log-assets): 파이프라인, 인덱스, 아카이브에서 권한을 설정하는 가이드라인을 설명합니다.


## 여러 팀 관리하기

ACME 팀의 경우 팀이 여러 개 있는 조직이고, 트러블슈팅과 감사를 위해 ACME 로그를 처리합니다. ACME 팀 내에는 주로 두 개의 카테고리가 있습니다.

- **ACME Admin:** ACME 로그 수집, 파이프라인, 제외 필터를 관리하는 사용자입니다.
- **ACME User:** ACME 로그애 액세스하고 해당 로그를 기반으로 모니터나 대시보드를 생성합니다.

이 설정을 권한을 하나의 역할로 통합하거나 세부적으로 액세스를 통제하기 위해 여러 역할을 생성하여 조직의 필요에 맞게 설정할 수 있습니다. 여기에 안내된 원칙을 조직 내 다른 팀에 맞게 적용할 수 있습니다.

Datadog에서는 권한을 추가할 수 있습니다. 여러 팀에 속해 있는 사용자는 할당된 역할 전체에서 권한을 조합하여 사용할 수 있습니다.

## Datadog Admin 역할

Datadog Admin은 다른 팀의 로그에 영향을 미치지 않으면서 로그를 관리할 수 있도록 ACME 팀원에게 안전한 환경을 구성할 수 있습니다. 이 가이드에서는 ACME 사용자의 로그 액세스를 제한하도록 역할과 권한을 설정하는 단계별 방법을 설명합니다. 필요할 경우 ACME Admin이 Datadog Admin의 역할을 하도록 설정할 수도 있습니다.

## 사전 필수 조건

### 수신 로그 태깅

먼저 `team:acme` 태그가 있는 수신 ACME 로그는 Datadog를 통과하는 로그의 카테고리를 구분하는 데 도움을 줍니다. 예를 들어, Docker 로그를 수집할 경우 [Docker 레이블을 태그][2]로 사용해 `team:acme` 태그를 적용할 수 있습니다.

태깅에 관한 종합적인 개요를 보려면 [태그 시작하기][3]를 참고하세요.

{{< img src="logs/guide/rbac/team_tag.png" alt="내 로그에 팀 태그 적용하기" style="width:80%;">}}

### Datadog Admin으로 로깅

이 가이드에 안내된 작업을 하려면 Datadog Admin 권한이 있어야 합니다. 내 사용자 계정에서 역할을 생성하고, 사용를 할당하며, Log Pipelines, Log Indexes, Log Archives를 관리할 수 있는지 확인하세요. 권한에 관한 자세한 내용은 [Datadog 역할 권한][4]을 참고하세요.

[사용자 목록][8]으로 이동해 모든 권한이 있는지 확인하세요.  이 권한들이 누락된 경우 현재 Datadog Admin에게 문의하여 요청하세요.

### API 키와 앱 키

Datadog API를 사용하고자 하는 경우, Admin 사용자에게 API 키와 앱 키를 받아야 합니다. API 키와 앱 키는 [조직 설정][9]에서 생성할 수 있습니다. 앱 키가 필요한 사용자와 연결되어 있는지 확인해야 합니다. 자세한 정보는 [API 및 앱 키][10]를 참고하세요.

이 가이드에서 `<DATADOG_API_KEY>`와 `<DATADOG_APP_KEY>`를 각각 내 Datadog API 키와 애플리케이션 키로 변경하세요. `CURL`이 있는 터미널도 필요합니다.

### 권한 ID 얻기

**참고**: 이 섹션은 RBAC 설정을 할 때 Datadog API를 사용할 경우에만 필요합니다.

Datadog API를 사용하고자 하는 경우, [권한 API][11]를 사용해 모든 기존 권한을 받으세요. 권한에 맞는 역할을 부여하는 작업에는 권한 ID가 필요합니다. 
**참고**: 권한 ID는 선택한 Datadog 사이트 ({{< region-param key="dd_site_name" >}})에 따라 변합니다.

```bash
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

## 역할 설정

이 섹션에서는 `ACME Admin`과 `ACME User`의 역할을 생성하는 방법을 설명합니다. 역할을 생성하고 기본 로그 권한을 부여하고 사용자에게 역할을 부여하는 방법을 살펴봅니다.


### 역할 생성

{{< tabs >}}
{{% tab "UI" %}}

1. Datadog Organization Settings의 [Roles 섹션][1]으로 이동합니다.
1. **New Role**을 클릭해 `ACME Admin`과 `ACME User` 역할을 생성합니다.
1. Log Read Index Datad와 Logs Live Tail과 같은 표준 액세스와 기본 권한을 할당합니다.

{{< img src="logs/guide/rbac/add_role.png" alt="새 역할 추가" style="width:90%;">}}

역할 생성과 관련한 자세한 정보는 [액세스 컨트롤][3]을 참고하세요.


[1]: https://app.datadoghq.com/access/roles
[2]: /ko/account_management/rbac/permissions?tab=ui#legacy-permissions
[3]: /ko/account_management/rbac/?tab=datadogapplication#create-a-custom-role
{{% /tab %}}
{{% tab "API" %}}

1. [역할 생성 API][1]를 사용해 `ACME Admin` 및 `ACME User` 역할을 생성합니다. 다음 예시에서 `dcf7c550-99cb-11ea-93e6-376cebac897c`는 역할 ID입니다. 
    ```bash
    curl -X POST "https://app.datadoghq.com/api/v2/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "ACME Admin"}}}'
    ```
    ``` json
    [...]
    "type": "roles",
    "id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
    "attributes": { "name": "ACME Admin", [...] }
    [...]
    ```
1. [권한 부여 API][3]를 사용해 필요한 권한을 할당합니다.


[1]: /ko/api/v2/roles/#create-role
[2]: /ko/api/v2/roles/#list-roles
[3]: /ko/api/v2/roles/#grant-permission-to-a-role
[4]: /ko/api/v2/roles/#revoke-permission
{{% /tab %}}
{{< /tabs >}}

### 사용자에게 역할 부여

{{< tabs >}}
{{% tab "UI" %}}

1. Datadog의 [User Section][1]에서 사용자를 선택하고 `ACME Admin` 또는 `ACME User` 역할을 할당합니다.

{{< img src="logs/guide/rbac/assign_user2.png" alt="사용자 편집 화면에서 사용자에게 역할 할당" style="width:90%;">}}

[1]: https://app.datadoghq.com/access/users
{{% /tab %}}
{{% tab "API" %}}

1. [사용자 목록 API][1]를 사용해 사용자 ID를 가져옵니다.
1. [역할 할당 API][2]를 사용해 사용자에게 역할을 부여합니다.

[1]: /ko/api/v2/users/#list-all-users
[2]: /ko/api/v2/roles/#add-a-user-to-a-role
{{% /tab %}}
{{< /tabs >}}

## 로그 접근 제한하기

제한 쿼리로 [`logs_read_data`][1] 권한을 사용해 ACME 팀원에게만 `team:acme` 로그 액세스 권한을 부여합니다.

ACME 사용자의 권한을 연장하는 방식으로 추가 로그 액세스 권한을 부여하지 않는 것이 좋습니다. 또 다른 역할에 동일한 `team:acme` 제한 쿼리를 적용하지 않는 것이 좋습니다. 대신 개별 액세스 필요에 따라 여러 역할을 할당하세요.

이 섹션에서는 다음에 관해 자세히 설명합니다.

1. `team:acme` 제한 쿼리 생성하기
2. 생성한 제한 쿼리를 ACME 역할에 연결하기

**참고**:각 역할에는 하나의 제한 쿼리만 있을 수 있습니다. 역할에 새 제한 쿼리를 연결하면 기존 쿼리에서 새 쿼리로 변경됩니다.

### 제한 쿼리 정의

{{< tabs >}}
{{% tab "UI" %}}

1. [Datadog Access 페이지][1]로 이동합니다.
1. `team:acme` 제한 쿼리를 생성하고 ACME 역할에 적용합니다.

{{< img src="logs/guide/rbac/restriction_queries.png" alt="로그 액세스 제한" style="width:90%;">}}

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

1. [제한 쿼리 생성 API][1]를 사용해 제한 쿼리를 생성합니다.
1. 제한 쿼리 ID를 계속 추적합니다.
1. [제한 쿼리 API][2]를 사용해 제한 쿼리를 ACME 역할에 연결합니다.
1. [권한 부여 API][3]를 사용해 역할에 `logs_read_data` 권한을 부여하세요. 이 권한의 해당 ID를 얻으려면 [권한 ID 얻기]((#obtaining-permission-ids) 섹션을 참고하세요.
1. (선택 사항) 설정 검증:
    * [역할 얻기 API][4]를 사용해 쿼리에 연결된 역할 목록을 얻으세요. 결과에 `ACME Admin`과 `ACME User`만 표시되어야 합니다.
    * 반대로 [제한 쿼리 얻기 API][5]를 사용해 역할에 연결된 제한 쿼리를 얻을 수도 있습니다. `team:acme` 제한 쿼리가 나타나야 합니다.

[1]: /ko/api/v2/logs-restriction-queries/#create-a-restriction-query
[2]: /ko/api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[3]: /ko/api/v2/roles/#grant-permission-to-a-role
[4]: /ko/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
[5]: /ko/api/v2/logs-restriction-queries/#get-restriction-query-for-a-given-role
{{% /tab %}}
{{< /tabs >}}

## 로그 에셋에 접근 제한하기

`ACME Admin` 역할 권한을 부여하여 다른 팀에 영향을 미치지 않으면서 Log Piplines, Log Indexes, Log Archives 관리합니다.

그러면 다음을 할 수 있습니다.
* `ACME Admin` 구성원(`ACME Admin` 구성원만)이 ACME 로그 에셋을 다룰 수 있습니다.
* `ACME Admin`이나 `ACME User` 구성원이 다른 팀 에셋을 건드리지 않을 수 있습니다.
* `ACME Admin`이나 `ACME User` 구성원이 상위 'Admin' 구성에 영향을 미치지 않을 수 있습니다. 예를 들어, 에셋으로 유입되는 로그 종류, 예산 제한, 또는 [로그 접근 제한 규칙](#restrict-access-to-logs)에 영향을 미치지 않습니다.

### 로그 파이프라인

`team:acme` 로그용 [파이프라인][13]을 생성합니다. `ACME Admin` 역할에 [`logs_write_processors`][14] 권한을 부여합니다.

### 로그 인덱스

상세한 예산 제어를 위해 `team:acme` 로그의 [인덱스][15]를 생성합니다. `ACME Admin` 역할에 [`logs_write_exclusion_filters`][16] 권한을 부여합니다.

### 로그 아카이브

`team:acme` 로그의 [아카이브][17]를 하나, 또는 여러 개 생성합니다. `ACME Admin` 구성원에게 [`logs_read_archives`][18] 권한을 할당합니다. 리하이드레이션을 위해 `ACME Admin`에 [`logs_write_historical_view`][19] 권한을 부여합니다.

`team:acme` 로그에 하나, 또는 여러 [아카이브][17]를 생성합니다. `ACME Admin` 구성원에게 [읽기 아카이브][18] 권한을 할당합니다. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: /ko/agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[3]: /ko/getting_started/tagging/
[4]: /ko/account_management/rbac/permissions/#log-management
[8]: https://app.datadoghq.com/organization-settings/users
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: /ko/account_management/api-app-keys/
[11]: /ko/api/v2/roles/#list-permissions
[12]: /ko/account_management/rbac/permissions?tab=ui#logs_read_data
[13]: /ko/logs/log_configuration/pipelines
[14]: /ko/account_management/rbac/permissions?tab=ui#logs_write_processors
[15]: /ko/logs/indexes/
[16]: /ko/account_management/rbac/permissions?tab=ui#logs_write_exclusion_filters
[17]: /ko/logs/archives/
[18]: /ko/account_management/rbac/permissions?tab=ui#logs_read_archives
[19]: /ko/account_management/rbac/permissions?tab=ui#logs_write_historical_view
[20]: /ko/logs/archives#datadog-permissions
[21]: /ko/account_management/rbac/permissions?tab=ui#logs_read_index_data
