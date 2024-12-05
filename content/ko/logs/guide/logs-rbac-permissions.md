---
further_reading:
- link: /logs/guide/logs-rbac
  tag: 설명서
  text: 로그에 대한 RBAC를 설정하는 방법
- link: account_management/rbac/permissions
  tag: 설명서
  text: RBAC 권한에 대해 자세히 알아보기
title: 로그 RBAC 권한
---

## 개요

[로그에 대한 RBAC 역할][1]을 생성하면 해당 역할에 [권한][2]을 할당하거나 제거합니다.

{{< tabs >}}
{{% tab "UI" %}}

Datadog 사이트에서 역할 업데이트][1]를 통해 직접 역할에 권한을 할당하거나 제거할 수 있습니다.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Datadog 권한 API][1]을 통해 직접 역할에 권한을 할당하거나 제거할 수 있습니다.

[1]: /ko/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

개별 권한에 대한 자세한 내용은 아래에서 확인하세요.

## 로그 설정 액세스

### `logs_generate_metrics`

[메트릭 생성][3] 기능을 사용할 수 있는 권한을 부여합니다.

이 권한은 글로벌 기능으로 새로운 메트릭 생성과 기존 메트릭 편집 또는 삭제 모두를 활성화합니다.

### `logs_write_facets`

역할에 [패싯 생성, 편집 및 삭제][4]를 사용할 수 있는 권한을 부여합니다.

이 권한은 글로벌 기능으로 새로운 패싯 생성과 기존 패싯 편집 또는 삭제 모두를 활성화합니다.

### `logs_modify_indexes`

[로그 인덱스][5]를 생성하고 수정할 수 있는 권한을 역할에 부여합니다. 여기에는 다음이 포함됩니다.

- 로그를 인덱스로 라우팅할 [인덱스 필터][6]를 설정합니다.
- 인덱스에 대해 [로그 보존 기간][7]을 설정합니다.
- 다른 역할에 특정 인덱스에 대해 범위가 지정된 [로그 인덱스 데이터 읽기](#logs_read_index_data) 및 [로그 제외 필터 쓰기](#logs_write_exclusion_filters) 권한을 부여합니다.

이 권한은 글로벌 적용이 가능한 기능으로 새 인덱스 생성 및 기존 인덱스 편집 모두를 활성화합니다.

### `logs_write_exclusion_filters`

인덱스 내에서 [제외 필터][8]를 만들거나 수정할 수 있는 권한을 역할에 부여합니다.

이 권한은 전역으로 할당하거나 인덱스의 하위 집합으로 제한할 수 있습니다.

**인덱스의 하위 집합**:

{{< tabs >}}
{{% tab "UI" %}}

1. 역할에 대한 글로벌 권한을 제거합니다.
2. 인덱스를 편집하고 '이 인덱스의 제외 필터 편집 권한 부여 대상' 필드에 역할을 추가하여 [Datadog 사이트 인덱스 페이지][1]에서 역할에 이 권한을 부여합니다.

[1]: /ko/logs/log_configuration/indexes/
{{% /tab %}}
{{% tab "API" %}}

이 설정은 UI를 통해서만 지원됩니다.

{{% /tab %}}
{{< /tabs >}}

### `logs_write_pipelines`

역할에 [로그 프로세싱 파이프라인][9]을 만들고 수정할 수 있는 권한을 부여합니다. 여기에는 다음이 포함됩니다.

- 파이프라인 이름 설정하기
- 프로세싱 파이프라인에 입력해야 하는 로그에 대한 파이프라인 필터 설정
- 파이프라인 재주문
- 다른 역할에 [로그 쓰기 프로세서](#logs_write_processors) 권한을 부여하여 해당 파이프라인을 위한 범위 지정
- [표준 속성][10] 또는 [엘리어싱 패싯][11] 관리

### `logs_write_processors`

역할에 프로세서 및 중첩된 파이프라인을 생성, 편집 또는 삭제할 수 있는 권한을 부여합니다.

이 권한은 글로벌 할당하거나 파이프라인의 하위 집합으로 제한할 수 있습니다.

{{< tabs >}}
{{% tab "UI" %}}

특정 파이프라인의 `Edit` 모달에서 역할을 할당합니다.

{{% /tab %}}
{{% tab "API" %}}

1. 특정 파이프라인에 할당하려는 역할의 [역할 ID][1]를 가져옵니다.
2. 해당 지역의 `logs_write_processors` 권한 API 에 대한 [권한 ID 가져오기][2]를 수행합니다.
3. 다음 호출을 통해 해당 역할에 권한을 부여합니다.

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "id": "<PERMISSION_UUID>",
                "type": "permissions"
            }'
```

[1]: /ko/api/v2/roles/#list-roles
[2]: /ko/api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}

### `logs_write_archives`

[로그 아카이브][12]를 생성, 편집 또는 삭제할 수 있는 권한을 부여합니다. 여기에는 다음이 포함됩니다.

- 아카이브로 라우팅할 로그에 대한 아카이브 필터 설정
- 아카이브 이름 설정하기
- 아카이브 재정렬
- 로그 아카이브 읽기](#logs_read_archives) 권한을 역할의 하위 집합으로 제한합니다.

이 권한은 글로벌 적용되며 새 아카이브 생성, 편집 및 기존 아카이브 삭제를 활성화합니다.

### `logs_read_archives`

아카이브 설정의 세부 정보에 액세스할 수 있는 권한을 부여합니다. [로그 기록 보기 쓰기](#logs_write_historical_views)와 함께 이 권한은 아카이브에서 [복원][13]을 트리거할 수 있는 기능도 부여합니다.

이 권한은 아카이브의 하위 집합으로 범위를 지정할 수 있습니다. 제한이 없는 아카이브는 `logs_read_archives` 권한이 있는 역할에 속한 모든 사람이 액세스할 수 있습니다. 제한이 있는 아카이브는 등록된 역할 중 하나에 속한 사용자만 액세스할 수 있으며, 해당 역할에 `logs_read_archives` 권한이 있는 경우에만 액세스할 수 있습니다.

다음 예에서는 `Guest` 역할을 제외한 모든 역할에 `logs_read_archive` 권한이 있다고 가정합니다.

* 스테이징은 `Guest` 역할에 **전용**으로 속한 사용자를 제외한 모든 사용자가 액세스할 수 있습니다.
* Prod는 `Customer Support` 에 속한 모든 사용자가 액세스할 수 있습니다.
* `Customer Support` 에 속해 있는 사용자는 `Audit & Security` 에도 속해 있지 않으면 보안 감사에 액세스할 수 없습니다.

{{< img src="account_management/rbac/logs_archives_list.png" alt="커스텀 역할 생성" style="width:90%;">}}

{{< tabs >}}
{{% tab "UI" %}}

아카이브 생성을 진행하거나 아카이브를 편집하는 동안 언제든지 업데이트할 수 있습니다.

{{< img src="account_management/rbac/logs_archive_restriction.png" alt="커스텀 역할 생성" style="width:90%;">}}

{{% /tab %}}
{{% tab "API" %}}

로그 아카이브 API를 사용하여 지정된 아카이브에서 역할을 [할당][1] 또는 [취소][2]하세요.


[1]: /ko/api/v2/logs-archives/#grant-role-to-an-archive
[2]: /ko/api/v2/logs-archives/#revoke-role-from-an-archive
{{% /tab %}}
{{< /tabs >}}

### `logs_write_historical_views`

기록 보기를 작성하는 기능, 즉 [로그 복원*][13]을 트리거하는 기능을 부여합니다.

이 권한은 글로벌 권한입니다. 이 권한을 통해 사용자는 [로그 아카이브 읽기](#logs_read_archives) 권한이 있는 아카이브에 대한 복원을 트리거할 수 있습니다.

{{< img src="account_management/rbac/logs_hv_roles_combination.png" alt="기록 보기 쓰기" 스타일="width:70%;">}}

위 예시에 대해 다음이 적용됩니다.

* `ADMIN` 역할 멤버는 기록 보기 쓰기(복원) 권한과 해당 아카이브에 대한 아카이브 읽기 권한이 있으므로 `Audit Archive` 에서 **복원**할 수 있습니다.
* `AUDIT` 역할 멤버는 기록 보기 쓰기(복원) 권한이 없으므로 `Audit Archive` 에서 **복원할 수 없습니다**.
* `PROD` 역할 멤버는 아카이브 읽기 권한이 없으므로 `Audit Archive` 에서 **복원할 수 없습니다**.


`Audit Archive`에서 복원된 모든 로그에 `team:audit` 태그를 할당할 때는 `team:audit`로그 읽기가 제한된 `Audit` 역할 회원만 복원된 콘텐츠에 액세스할 수 있도록 해야 합니다. 태그 및 복원 추가 방법에 대한 자세한 내용은 [아카이브 설정 섹션][12]을 참조하세요. [로그 아카이브 설정 섹션][12]을 참조하세요.

`Prod Archive`에서 복원한 `service:ci-cd` 로그의 경우 다음 사항에 유의하세요.

* 만약 사용하지 **않는다면** [로그 읽기 인덱스 데이터](#logs_read_index_data) 레거시 권한을 사용하면 `CI-CD` 역할 멤버가 이 로그에 액세스할 수 있습니다.
* [로그 읽기 인덱스 데이터](#logs_read_index_data) 레거시 권한을 **사용하는** 경우, 결과 기록 보기가 `PROD` 및 `ADMIN` 역할 구성원으로 제한되므로 `CI-CD` 역할 멤버는 이러한 로그에 액세스할 수 없습니다.

### 제거됨: `logs_public_config_api`

Datadog `logs_public_config_api` 권한을 제거했습니다.

다섯 가지 개별 권한으로 Datadog API 을 통해 로그 설정을 보고, 생성하고, 수정할 수 있는 기능을 제어합니다.
* [`logs_generate_metrics`](#로그_생성_메트릭)
* [`logs_modify_indexes`](#로그_수정_인덱스)
* [`logs_write_archives`](#로그_쓰기_아카이브)
* [`logs_write_pipelines`](#로그_쓰기_파이프라인)
* [`user_access_manage`][14]

## 로그 데이터 액세스

로그 데이터의 하위 집합에 대한 읽기 액세스 권한을 관리하려면 다음 권한을 부여하세요.

* [로그 데이터 읽기](#logs_read_data)(권장)는 역할의 액세스를 로그 제한 쿼리와 일치하는 값으로 제한하여 더 세분화된 액세스 제어를 제공합니다.
* [로그 읽기 인덱스 데이터](#logs_read_index_data)는 인덱싱된 로그에 대한 데이터 액세스를 제한하는 레거시 방식입니다(인덱싱된 데이터에 액세스하려면 여전히 이 권한을 활성화해야 함).

### `logs_read_data`

로그 데이터에 대한 읽기 액세스입니다. 허용된 경우 `logs_read_index_data` 또는 [제한 쿼리][15]와 같은 다른 제한이 적용됩니다.

역할은 추가적으로 부여됩니다. 사용자가 여러 역할에 속해 있는 경우 액세스할 수 있는 데이터는 각 역할의 모든 권한을 합친 것입니다.

**예**:

* 사용자가 로그 데이터 읽기 권한이 있는 역할에 속해 있고 로그 데이터 읽기 권한이 없는 역할에도 속해 있으면 데이터 읽기 권한이 있는 것입니다.
* 사용자가 한 역할을 통해 `service:sandbox`로 제한되고 다른 역할을 통해 `env:prod`로 제한되는 경우 사용자는 `env:prod` 및 `service:sandbox` 로그에 모두 액세스할 수 있습니다.

{{< img src="account_management/rbac/logs_rq_roles_combination.png" alt="읽기 데이터 액세스" style="width:70%;">}}


{{< tabs >}}
{{% tab "UI" %}}

사용자가 제한 쿼리와 일치하는 로그를 더 이상 볼 수 없도록 제한하려면 [데이터 액세스 페이지][1]를 사용합니다.

1. 제한 쿼리를 [생성](#create-a-restriction-쿼리)합니다.
2. 제한 쿼리에 하나 또는 여러 역할을 [할당](#어떤 역할을 제한에 할당-쿼리)합니다.
3. 어떤 역할과 사용자가 어떤 제한 쿼리에 할당되었는지 [점검](#check-restriction-queries)합니다.

이 보기에는 목록이 표시됩니다:

* **`Restricted Access` 섹션**: 모든 제한 쿼리와 할당된 역할을 봅니다.
* **`Unrestricted Access` 섹션**: `log_read_data` 권한이 있는 모든 역할에 추가 제한이 없습니다,
* **`No Access` 섹션**: `log_read_data` 권한이 없는 모든 역할입니다.

## 제한 쿼리 생성

쿼리 필터를 정의하는 새 제한 쿼리를 생성합니다. 새 쿼리가 역할이 할당되지 않은 채로 제한 목록에 표시됩니다.

{{< img src="account_management/rbac/logs_rq-create.mp4" alt="제한 쿼리 생성" video=true style="width:70%;">}}

### 제한 쿼리에 역할 할당

원하는 역할을 선택한 다음 의도한 제한 쿼리에 할당됩니다.

**참고**: 역할에는 제한을 하나 이상 지정할 수 없습니다. 즉, 제한 쿼리에 역할을 할당하면 이미 연결된 제한 쿼리와의 연결이 손실됩니다.

{{< img src="account_management/rbac/logs_rq-assign_roles.mp4" alt="제한 쿼리에 역할 할당" video=true style="width:70%;">}}

마찬가지로 동일한 '이동' 상호작용을 사용하여 `Unrestricted Access` 역할에 권한을 부여하거나 반대로 `No Access` 역할로 전환할 수 있습니다.

### 제한 쿼리 점검

데이터 액세스 페이지에는 최대 50개의 제한 쿼리와 섹션당 50개의 역할이 표시됩니다. 페이지에 표시할 수 있는 것보다 더 많은 역할과 제한 쿼리가 있는 경우 필터를 사용하여 이 보기 범위를 좁힙니다.

* 제한 쿼리 필터를 사용합니다.

{{< img src="account_management/rbac/logs_rq-filter.png" alt="필터 제한 쿼리" style="width:70%;">}}

* 역할 필터를 사용하세요.

{{< img src="account_management/rbac/logs_rq-view_as_role.png" alt="역할로 보기" style="width:70%;">}}

* 사용자 필터를 사용하면 여러 역할에 속한 특정 사용자가 실제로 어떤 항목에 액세스할 수 있는지 편리하게 확인할 수 있습니다.

{{< img src="account_management/rbac/logs_rq-view_as_user.png" alt="역할로 보기" style="width:70%;">}}

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

[역할 API][1]이 있는 역할에서 이 권한을 취소하거나 부여합니다.
[제한 쿼리][2]를 사용하여 로그를 남기다 데이터의 하위 집합에 대한 권한을 범위 부여합니다.

[1]: /ko/api/#roles
[2]: /ko/api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}

## 레거시 권한

이러한 권한은 기본적으로 모든 사용자에게 글로벌 활성화되어 있습니다.

[로그 데이터 읽기](#logs_read_data) 권한은 이러한 레거시 권한 위에 추가됩니다. 예를 들어 사용자가 쿼리 `service:api`로 제한되어 있다고 가정해 보겠습니다.

* 이 사용자가 `audit` 및 `errors` 인덱스에 대해 [인덱스 데이터 읽기](#logs_read_index_data) 권한을 설정한 경우, 이 사용자는 해당 인덱스 내에서 `service:api` 로그만 볼 수 있습니다.
* 이 사용자에게 [라이브테일](#로그_라이브테일) 권한이 있는 경우, 이 사용자는 라이브테일에서 `service:api` 로그만 볼 수 있습니다.


### `logs_read_index_data`

특정 수의 로그 인덱스에 대한 역할 읽기 액세스 권한을 부여합니다. 글로벌 설정하거나 로그 인덱스의 하위 집합으로 제한할 수 있습니다.

인덱스의 하위 집합에 이 권한을 범위 부여하려면 먼저 역할에서 `logs_read_index_data` 및 `logs_modify_indexes` 권한을 제거합니다. 그 뒤 다음을 수행합니다.

{{< tabs >}}
{{% tab "UI" %}}

[설정 페이지][1]의 인덱스에 대한 액세스 권한을 이 역할에 부여합니다.

{{< img src="account_management/rbac/logs_read_index_data.png" alt="특정 역할에 인덱스에 대한 읽기 권한 부여" style="width:75%;" >}}


[1]: https://app.datadoghq.com/logs/pipelines/indexes
{{% /tab %}}
{{% tab "API" %}}

* 특정 파이프라인에 할당하려는 역할의 [역할 ID][1]를 가져옵니다.
* 해당 지역의 `logs_write_processors` 권한 API에 대한 [권한 ID 가져오기][2]를 수행합니다.
* 다음 호출을 통해 해당 역할에 권한을 부여합니다.

```bash
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "id": "<PERMISSION_UUID>",
                "type": "permissions"
            }'
```


[1]: /ko/api/v2/roles/#list-roles
[2]: /ko/api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}

### `logs_live_tail`

역할에 [라이브 테일][16] 기능을 사용할 수 있는 권한을 부여합니다.

이 권한은 글로벌 권한으로, [로그 인덱스 데이터 읽기](#logs_read_index_data) 권한에 관계없이 라이브 테일에 대한 액세스 권한을 부여합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration은 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/guide/logs-rbac/
[2]: /ko/account_management/rbac/permissions
[3]: /ko/logs/logs_to_metrics/
[4]: /ko/logs/explorer/facets/#overview
[5]: /ko/logs/indexes
[6]: /ko/logs/indexes#indexes-filters
[7]: /ko/logs/indexes#update-log-retention
[8]: /ko/logs/indexes#exclusion-filters
[9]: /ko/logs/log_configuration/pipelines
[10]: /ko/logs/log_configuration/attributes_naming_convention/#standard-attributes
[11]: /ko/logs/explorer/facets/#alias-facets
[12]: /ko/logs/archives
[13]: /ko/logs/archives/rehydrating
[14]: /ko/account_management/rbac/permissions/#access-management
[15]: /ko/api/v2/logs-restriction-queries/
[16]: /ko/logs/explorer/live_tail/