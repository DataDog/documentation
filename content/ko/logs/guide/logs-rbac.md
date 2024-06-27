---
aliases:
- /ko/logs/guide/restrict-access-to-log-events-with-restriction-queries
further_reading:
- link: /logs/guide/logs-rbac-permissions/
  tag: 설명서
  text: 로그 BRAC 권한에 대해 자세히 보기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색기에 대해 더 알아보기
- link: /logs/explorer/#patterns
  tag: 설명서
  text: 로그 패턴 보기와 친숙해지기
- link: /logs/live_tail/
  tag: 설명서
  text: 라이브 테일에 대해 알아보기
kind: 가이드
title: 로그의 BRAC 설정하는 방법
---

## 개요

로그에는 **민감한 정보**가 포함되어 있어 [스크러빙][1]이 필요하거나 조직의 권한이 있는 사용자만 접근할 수 있습니다.  또 사용자를 세그먼트화하여 구성과 예산 조정과 관련해 **다른 사용자에게 방해가 되지 않도록** 하는 것이 좋습니다.

이 가이드에서는 맞춤형 Datadog 역할을 개발하는 방법을 설명해 사용자가 규정을 준수하면서 로그와 로그 기능을 사용할 수 있도록 합니다.

### 여러 팀

조직에 팀이 여럿 있다고 합시다. 그 중 **ACME**(Applicative Component Making Errors) 팀의 구성원은 트러블슈팅과 감사 목적으로 ACME 로그를 사용해야 합니다.

또 이 가이드에서는 ACME 팀에 사용자 유형이 두 개가 있다고 가정하겠습니다.

* **`ACME Admin`**: ACME 로그 수집, 파이프라인, 제외 필터를 담당하는 사용자 역할.
* **`ACME User`**: ACME 로그에 접근해 로그를 사용해 모니터나 대시보드를 생성하는 사용자 역할.

**참고**: 이 가이드에 언급된 역할을 ACME Role 하나에 통합(ACME Admins과 ACME Users 모두의 권한을 하나에 집중)해 간편하게 사용하거나, 더 상세하게 권한을 조정해 역할을 여러 개 사용할 수 있습니다.

이 가이드에서는 ACME 팀에 초점을 맞춰 설명하나, 조직 내 다른 팀에도 유사하게 설정을 적용할 수 있습니다. ACME 팀의 구성원이 조직 내 다른 팀의 구성원일 수도 **있습니다**. Datadog에서는 구성원에게 권한을 계속 더할 수 있으며, 여러 팀에 속한 사용자는 각 팀에서 부여한 권한을 모두 사용할 수 있습니다.

### Datadog Admin 역할

이 가이드에서는 Datadog Admin 역할로 ACME 팀 구성원이 다른 팀 로그를 방해하지 않으면서 ACME 사용자에게만 로그 접근 권한을 제한하며 로그를 안전하게 다루는 환경을 만드는 방법을 설명합니다.

**참고**: 이 가이드의 ACME Admins를 Datadog Admins에 적용해도 됩니다.

이 가이드에서는 다음을 설명합니다.

1. Admins의 [필수 구성 요소](#prerequisites)
2. ACME 팀의 **역할 설정**과 **구성원 할당**: [역할 설정](#set-up-roles)
3. 제한 쿼리로 Datadog 애플리케이션 전체에 **로그 접근 제한**: [로그 접근 제한](#restrict-access-to-logs)
4. **Log Assets**(파이프라인, 인덱스, 아카이브)의 권한 구성: [로그 에셋 접근 제한](#restrict-access-to-log-assets)

## 사전 필수 조건

### 수신 로그 태그

ACME 수신 로그를 `team:acme`로 태그해야 합니다. Datadog로 로그가 유입될 때 사전 분류하는 데 도움이 됩니다.

{{< img src="logs/guide/rbac/team_tag.png" alt="로그에 팀 태그 적용" style="width:60%;">}}

예를 들어 Docker 로그 수집을 할 때 [Docker 라벨 태그][2]가 있는 컨테이너에서 유입되는 로그에 `team:acme` 태그를 붙일 수 있습니다. 전체적인 개요를 보려면 [태깅 섹션][3]을 참고하세요.

### Datadog Admin으로 로그인

이 가이드에 있는 나머지 지침을 따르려면 계정에 Datadog Admin 역할이나 이와 유사한 역할이 필요합니다. 다음 권한이 필요합니다.

* 역할을 생성하고 다른 사용자에게 역할을 부여하는 권한
* [로그 파이프라인][4], [로그 인덱스][5], [로그 아카이브][6]를 생성할 권한
* API를 통해 운영하고 싶은 경우 [로그 구성 API][7]를 통해 소통할 권한

[사용자 목록][8]에서 이와 같은 권한을 모두 갖고 있는지 확인하세요. 필요한 권한이 누락된 경우에는 Datadog Admin 사용자에게 필요한 권한을 요청하세요.


### API 키와 앱 키

**참고**: 이 섹션은 Datadog API를 사용할 경우에만 필요하며, 이때 Admin 사용자로부터 API 키와 애플리케이션 키를 받아야 합니다.

API 키와 앱 키는 [Datadog 계정 API 키 페이지][9]에서 볼 수 있습니다. 자세한 내용은 설명서의 [API 키와 앱 키][10] 섹션에서 참고하세요.

사용하는 앱 키가 내 계정이나 유사한 권한이 있는 사용자에게 연결되어 있는지 확인해야 합니다.

{{< img src="logs/guide/rbac/app-api_keys.png" alt="API 키와 앱 키 확인" style="width:60%;">}}

이 가이드에서 `<DATADOG_API_KEY>`와 `<DATADOG_APP_KEY>`라고 표시되어 있는 부분은 각각 내 Datadog API 키와 Datadog 애플리케이션 키로 대체하세요. 또 이 가이드에서는 사용자에게 `CURL` 터미널이 있다고 가정합니다.


### 권한 ID 얻기

**참고**: 이 섹션은 BRAC 설정을 할 때 Datadog API를 사용할 경우에만 필요합니다.

[권한 API][11]를 사용해 기존 권한 목록 전체를 불러오세요. 그러면 아래와 같은 권한 어레이가 반환됩니다(`logs_read_data` 권한에 `<PERMISSION_ID>``1af86ce4-7823-11ea-93dc-d7cad1b1c6cb`가 있는 것을 볼 수 있고, 이것이 해당 권한에서 얻어야 할 필요 정보임).

```bash
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

```json
[...]
{
    "type": "permissions",
    "id": "1af86ce4-7823-11ea-93dc-d7cad1b1c6cb",
    "attributes": {
        "name": "logs_read_data",
        "display_name": "Logs Read Data",
        [...]
    }
}
[...]
```

**참고**: 사용 중인 Datadog 사이트(Datadog US, Datadog EU 등)에 따라 권한 ID가 다르니 참고하세요.

## 역할 설정
이 섹션에서는 두 역할인 `ACME Admin`과 `ACME User`를 생성하는 방법을 설명합니다. 두 역할에 최소 로그 권한을 부여하는 방법(가이드 후반에서는 역할을 확장하는 방법 설명)과 사용자에게 역할을 할당하는 방법을 설명합니다.

### 역할 생성하기

{{< tabs >}}
{{% tab "UI" %}}

Datadog Organization Settings의 [Group 섹션][1]에서 Role 탭에 있는 Add Role 버튼을 사용해 새 `ACME Admin`과 `ACME User` 역할을 생성할 수 있습니다.

{{< img src="logs/guide/rbac/add_role.png" alt="새 역할 추가" style="width:60%;">}}

새 역할을 만들 때 고려해야 할 사항:

* Standard Access로 생성해야 합니다.
* 읽기 인덱스 데이터와 라이브 테일 권한을 부여하세요. 이는 안전하게 활성화할 수 있는 [레거시 권한][2]입니다.

역할 생성에 관한 자세한 정보는 [계정 관리][3] 섹션을 참고하세요.


[1]: https://app.datadoghq.com/access/roles
[2]: /ko/account_management/rbac/permissions?tab=ui#legacy-permissions
[3]: /ko/account_management/rbac/?tab=datadogapplication#create-a-custom-role
{{% /tab %}}
{{% tab "API" %}}

`ACME Admin`과 `ACME User` 역할 모두에 다음 단계를 적용하세요.

1. 아직 역할이 존재하지 않는 경우 [역할 생성 API][1]를 사용해 역할을 만드세요. 다음 예시에서 `dcf7c550-99cb-11ea-93e6-376cebac897c`가 역할 ID입니다.

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

2. **또는** 기존 역할이 있는 경우, [역할 목록 API][2]를 사용해 역할 ID를 얻을 수 있습니다.

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles?page[size]=10&page[number]=0&sort=name&filter=ACME" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"'
```

``` json
[...]
"type": "roles",
"id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
"attributes": { "name": "ACME Admin", [...] }
[...]
```

3. 역할의 기존 권한을 확인하세요(새로 만든 역할에는 Read Monitors와 Read Dashboards 권한만 있어야 합니다).

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"

```

3. [권한 부여 API][3]를 사용해 역할에 `standard`, `logs_read_index_data`, `logs_live_tail` 권한을 부여하세요. 해당 ID를 얻으려면 [권한 ID 얻기](#get-permission-ids) 섹션을 참고하세요.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

4. **필요할 경우** [권한 취소 API][4]를 사용해 다른 로그 권한을 취소할 수 있습니다.

``` bash
curl -X DELETE "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

[1]: /ko/api/v2/roles/#create-role
[2]: /ko/api/v2/roles/#list-roles
[3]: /ko/api/v2/roles/#grant-permission-to-a-role
[4]: /ko/api/v2/roles/#revoke-permission
{{% /tab %}}
{{< /tabs >}}

### 역할에 사용자 연결하기

역할에 권한을 구성했으니, 이제 사용자에게 역할을 할당할 차례입니다.

{{< tabs >}}
{{% tab "UI" %}}

Datadog의 [Team 섹션][1]에서 User 탭으로 이동하세요. 사용자를 하나 선택한 후 기존에 할당된 역할에 더해 `ACME Admin`이나 `ACME User` 역할을 할당하세요. 사용자 관리에 관한 자세한 내용은 [계정 관리][2] 섹션을 참고하세요.

{{< img src="logs/guide/rbac/assign_user.png" alt="Delete invite on the grid view" style="width:60%;">}}
{{< img src="logs/guide/rbac/assign_user2.png" alt="약식 표보기에서 초대 삭제" style="width:60%;">}}

[1]: https://app.datadoghq.com/access/users
[2]: /ko/account_management/users/
{{% /tab %}}
{{% tab "API" %}}

[사용자 목록 API][1]를 사용해 `ACME Admin`이나 `ACME User` 역할을 할당하고자 하는 사용자의 사용자 ID를 얻으세요. 이 API에는 페이지가 매겨져 있어 사용자의 성씨와 같은 쿼리 파라미터를 사용해 결과를 필터링해야 할 수 있습니다. 다음 예시에서 사용자 ID는 `1581e993-eba0-11e9-a77a-7b9b056a262c`입니다.

``` bash
curl -X GET "https://api.datadoghq.com/api/v2/users?page[size]=10&page[number]=0&sort=name&filter=smith" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

``` json
[...]
"type": "users",
"id": "1581e993-eba0-11e9-a77a-7b9b056a262c",
"attributes": {
    "name": "John Smith",
    "handle": "john.smith@company.com",
    [...]
},
[...]
```

**사용자를 ACME 역할에 연결하기**

각 사용자에 [역할 할당 API][2]를 사용해 역할을 추가하세요.

``` bash
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

**기본 역할에서 사용자 제거하기**

사용자에 이미 역할과 ID가 있는지 확인하세요. 이 사용자가 권한을 부여해서는 안 되는 사용자에게 추가 권한을 부여할 수도 있기 때문에 기본 Datadog 역할을 삭제해야 할 수 있습니다.

``` bash
curl -X DELETE "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

[1]: /ko/api/v2/users/#list-all-users
[2]: /ko/api/v2/roles/#add-a-user-to-a-role
{{% /tab %}}
{{< /tabs >}}

## 로그 접근 제한하기

이 섹션에서는 ACME 팀 구성원(`ACME Admin` 및 `ACME User` 구성원 모두)이 `team:acme` 로그에 접근하는 방법과 이 접근을 `team:acme` 로그로만 제한하는 방법을 설명합니다. 이때 제한 쿼리로 범위를 지정한 [로그 읽기 데이터][12] 권한을 사용합니다.

권한을 최대한으로 세분화하고 관리를 용이하게 하려면 ACME 사용자가 접근할 수 있는 로그 권한을 늘리지 **않는 것이 좋습니다**. 동일한 `team:acme` 권한 쿼리에 다른 역할을 제한하지 마세요. 대신 각 구성원이 필요한 접근에 따라 여러 역할을 할당하는 것이 좋습니다.

이 섹션에서는 다음에 관해 자세히 설명합니다.

1. `team:acme` 제한 쿼리 생성하기
2. 생성한 제한 쿼리를 ACME 역할에 연결하기

**참고**: 역할에 연결할 수 있는 제한 쿼리의 수는 **한 개**입니다. 역할에 새 제한 쿼리를 연결하면 기존에 있던 제한 쿼리가 제거됩니다.

{{< tabs >}}
{{% tab "UI" %}}

Datadog 앱의 [Data Access 페이지][1]에서 다음을 할 수 있습니다.

* `team:acme` 제한 쿼리 생성하기
* 해당 쿼리에 `ACME Admin`과 `ACME User` 역할 할당하기

{{< img src="logs/guide/rbac/restriction_queries.png" alt="로그 접근 제한" style="width:60%;">}}

자세한 정보는 [`logs_read_data` 권한 섹션][1]을 참고하세요.

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

[제한 쿼리 생성 API][1]을 사용해 새 제한 쿼리를 만드세요. 제한 쿼리 ID를 추적하세요(다음 예시에서 제한 쿼리 ID는 `76b2c0e6-98fa-11ea-93e6-775bd9258d59`).

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:acme"}}}'
```

``` json
{
    "data": {
        "type": "logs_restriction_queries",
        "id": "76b2c0e6-98fa-11ea-93e6-775bd9258d59",
        "attributes": {
            "restriction_query": "team:acme",
            "created_at": "2020-05-18T11:26:48.887750+00:00",
            "modified_at": "2020-05-18T11:26:48.887750+00:00"
        }
    }
}

```

[제한 쿼리 API][2]를 사용해 이전 제한 쿼리를 ACME 역할에 연결하세요. `ACME Admin`과 `ACME User` 역할 ID에도 같은 작업을 하세요.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "<ROLE_ID>"}}'
```

마지막으로 [권한 부여 API][3]를 사용해 역할에 `logs_read_data` 권한을 부여하세요. 이 권한의 해당 ID를 얻으려면 [권한 ID 얻기](#get-permission-ids) 섹션을 참고하세요.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

(선택 사항) 설정이 제대로 완료되었는지 확인하세요.

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

이 섹션에서는 `ACME Admin` 역할 구성원에게 ACME 로그 에셋(로그 파이프라인, 로그 인덱스, 로그 아카이브)을 다룰 수 있도록 권한을 부여하는 방법을 설명합니다.

그러면 다음을 할 수 있습니다.

* `ACME Admin` 구성원(`ACME Admin` 구성원만)이 ACME 로그 에셋을 다룰 수 있습니다.
* `ACME Admin`이나 `ACME User` 구성원이 다른 팀 에셋을 건드리지 않을 수 있습니다.
* `ACME Admin`이나 `ACME User` 구성원이 상위 'Admin' 구성에 영향을 미치지 않을 수 있습니다. 예를 들어, 에셋으로 유입되는 로그 종류, 예산 제한, 또는 [로그 접근 제한 규칙](#restrict-access-to-logs)에 영향을 미치지 않습니다.


권한을 최대한으로 세분화하고 관리를 용이하게 하려면 다른 역할에 ACME 로그 에셋을 편집할 권한을 주지 **않는 것이 좋습니다**. 대신 다른 역할이 있는 (일부) 사용자를 `ACME Admin` 역할에 추가하는 것이 좋습니다.

### 로그 파이프라인

`team:acme` 로그용 [파이프라인][13]을 생성하세요. [쓰기 프로세서][14] 권한을 `ACME Admin` 구성원에게 할당하되, 해당 권한의 **범위**를 ACME '루트' 파이프라인으로 제한하세요.

{{< img src="logs/guide/rbac/pipelines.png" alt="ACME 파이프라인" style="width:60%;">}}

### 로그 인덱스

`team:acme` 로그용 [인덱스][15]를 하나나 여러 개 만드세요. ACME 팀에 세부적인 예산 통제가 필요할 경우에는 인덱스를 여러 개 만드는 것이 좋습니다(예: 보존 기간이 다른 인덱스나 할당량이 다른 인덱스). [쓰기 제외 필터][16] 권한을 `ACME Admin` 구성원에게 부여하되, 해당 권한의 **범위**를 관련 ACME 인덱스로 제한하세요.

{{< img src="logs/guide/rbac/indexes.png" alt="ACME 인덱스" style="width:60%;">}}

### 로그 아카이브

#### 읽기 아카이브

`team:acme` 로그용 [아카이브][17]를 하나나 여러 개 생성하세요. [읽기 아카이브][18] 권한을 `ACME Admin` 구성원에게 할당하되, 해당 권한의 **범위**를 해당 ACME 아카이브로 제한하세요.

{{< img src="logs/guide/rbac/archives.png" alt="ACME 아카이브" style="width:60%;">}}

로그에 따라 생명 주기 정책이 다른 경우에는 아카이브를 여러 개 만드는 것이 좋습니다(예: 프로덕션 및 스테이징 로그). 리하이드레이션의 경우 한 번에 하나의 아카이브에만 적용할 수 있으나 여러 아카이브에 여러 개 트리거할 수 있습니다.

#### 쓰기 내역 보기

[쓰기 내역 보기][19] 권한을 `ACME Admin` 구성원에게 할당하세요. 이 권한을 부여하면 리하이드레이션 작업을 할 수 있습니다.

(**선택 사항**) 태그 유무에 관계없이 아카이브에서 리하이드레이션된 모든 로그에 `team:acme` 태그가 연결되도록 아카이브를 설정할 수 있습니다. [이 옵션][20]을 사용하면 기존 제한 정책과 일관되도록 설정할 수 있고, Datadog로 유입되거나 Datadog에서 인덱싱되지 않아서 더 이상 사용되지 않는 제한을 안전하게 제거할 수 있습니다.

{{< img src="logs/guide/rbac/archives.png" alt="리하이드레이션 ACME 태그" style="width:60%;">}}

**참고**: [레거시 읽기 인덱스 데이터 권한][21]을 **사용하는 경우** ACME 아카이브에 `ACME User` 역할과 `ACME Admin` 역할을 추가하세요. `ACME User` 역할 구성원에게는 리하이드레이션 작업을 할 권한이 없기 때문에 중요한 권한이 없습니다. 그러나 이 역할을 부여하면 자동으로 읽기 인덱스 데이터 권한 범위를 내역 결과 보기로 조정하기 때문에 구성원이 컨텐츠에 접근할 수 있습니다.

{{< img src="logs/guide/rbac/rehydration_index.png" alt="리하이드레이션 인덱스 권한" style="width:60%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: /ko/agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[3]: /ko/getting_started/tagging/
[4]: /ko/account_management/rbac/permissions?tab=ui#logs_write_pipelines
[5]: /ko/account_management/rbac/permissions?tab=ui#logs_modify_indexes
[6]: /ko/account_management/rbac/permissions?tab=ui#logs_write_archives
[7]: /ko/account_management/rbac/permissions?tab=ui#logs_public_config_api
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