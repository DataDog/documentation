---
further_reading:
- link: /account_management/rbac/permissions/#monitors
  tag: 설명서
  text: 모니터의 RBAC(역할 기반 접근 제어) 허가에 관해 자세히 보기
- link: /api/latest/monitors/#create-a-monitor
  tag: 설명서
  text: API(응용 프로그래밍 인터페이스)를 통한 제한된 모니터 생성에 관해 자세히 보기
- link: /monitors/notify/#permissions
  tag: 설명서
  text: UI(사용자 인터페이스)를 통한 제한된 모니터 생성에 관해 자세히 보기
title: 모니터의 RBAC(역할 기반 접근 제어) 설정 방법
---

## 개요

모니터들은 시스템에서 발생할 수 있는 문제를 팀에 경고해줍니다. 권한이 부여된 사용자만 모니터를 편집할 수 있게 하면, 모니터 설정이 실수로 변경되는 것을 방지할 수 있습니다.

개별 모니터의 편집 권한을 특정한 역할을 맡은 자에게만 부여하는 것을 통해 모니터를 안전하게 관리할 수 있습니다.

## 역할 설정

기본적인 역할 및 커스텀 역할, 커스텀 역할의 생성, 각 역할에 허가 부여, 사용자에 역할 부여에 관한 자세한 정보를 보려면, [역할 기반 접근 제어][1]를 참조하세요.

## 모니터 접근 제한

{{< tabs >}}

{{% tab "UI" %}}

1. 새로운 모니터를 생성하거나 기존의 모니터를 편집하는 것을 통해 모니터 편집 페이지를 여세요.
2. 양식 하단에서, 생성자와 더불어, 어떤 역할들이 모니터를 편집할 권한을 가지는 지 설정하세요.

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="RBAC(역할 기반 접근 제어) 접근 제한 모니터"  >}}

자세한 정보를 보려면, [모니터 권한][1]을 참조하세요.

[1]: /ko/monitors/notify/#permissions
{{% /tab %}}

{{% tab "API" %}}

[역할 API(응용 프로그래밍 인터페이스) 엔드 포인트 목록][1]을 활용하여 역할 및 각 id의 목록을 가져오세요.

```bash
curl --request GET 'https://api.datadoghq.com/api/v2/roles' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>'
```

```bash
{
    "meta": {
        "page": {
            "total_filtered_count": 4,
            "total_count": 4
        }
    },
    "data": [
        {
            "type": "roles",
            "id": "89f5dh86-e470-11f8-e26f-4h656a27d9cc",
            "attributes": {
                "name": "Corp IT Eng - User Onboarding",
                "created_at": "2018-11-05T21:19:54.105604+00:00",
                "modified_at": "2018-11-05T21:19:54.105604+00:00",
                "user_count": 4
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "984d2rt4-d5b4-13e8-a5yf-a7f560d33029"
                        },
                        ...
                    ]
                }
            }
        },
        ...
    ]
}
```

[생성][2] 또는 [모니터 편집][3] API 엔드 포인트와 `restricted_roles` 변수를 활용하여 모니터의 생성자 및 특정 역할만 모니터 편집하도록 설정할 수 있습니다.

**참조:** 1개 혹은 여러 개의 역할 UUID를 명시할 수 있습니다. `restricted_roles`를 `null`로 설정하면 [모니터 쓰기 허가][4]를 보유한 모든 사용자가 모니터를 편집하는 것을 허가합니다.

```bash
curl --location --request POST 'https://api.datadoghq.com/api/v1/monitor' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>' \
--data-raw '{
  "message": "You may need to add web hosts if this is consistently high.",
  "name": "Bytes received on host0",
  "options": {
    "no_data_timeframe": 20,
    "notify_no_data": true
  },
  "query": "avg(last_5m):sum:system.net.bytes_rcvd{host:host0} \u003e 100",
  "tags": [
    "app:webserver",
    "frontend"
  ],
  "type": "query alert",
  "restricted_roles": ["89f5dh86-e470-11f8-e26f-4h656a27d9cc"]
}'
```

자세한 정보를 보려면, [역할][5] 및 [모니터 API(응용 프로그래밍 인터페이스) 참조][6]를 참조하세요.


[1]: /ko/api/latest/roles/#list-roles
[2]: /ko/api/latest/monitors/#create-a-monitor
[3]: /ko/api/latest/monitors/#edit-a-monitor
[4]: /ko/account_management/rbac/permissions/#monitors
[5]: /ko/api/latest/roles/
[6]: /ko/api/latest/monitors/
{{% /tab %}}
{{< /tabs >}}

## 모니터를 잠금 상태에서 제한된 역할로 옮기세요.

Datadog에서 모니터 편집을 특정 역할들만 사용할 수 있게 제한하는 기능을 출시하기 전에는, 모니터를 잠금 상태로 설정하는 것이 가능했습니다. 그때는 오직 생성자와 [Datadog 관리자 역할][2]을 보유한 사용자들만 잠금 상태의 모니터를 편집할 수 있었습니다.

{{< img src="/monitors/guide/monitor_rbac_locked.jpg" alt="RBAC(역할 기반 접근 제어)에 접근할 수 없는 모니터" style="width:70%;">}}

모니터를 잠그는 기능은 앞으로 삭제될 예정입니다. Datadog는 역할 제한 설정을 사용하는 것을 권장하며, 이를 통해 모니터를 편집할 수 있는 사용자를 보다 유연하게 지정할 수 있습니다.

귀 조직에 잠금 상태인 모니터가 존재할 수도 있습니다. Datadog에서 아직 모니터 잠금 기능을 지원하기 때문입니다. 모니터의 생성자 및 [Datadog 관리자 역할][2]가 부여된 사용자만 잠금 상태의 모니터를 편집할 수 있습니다.

아래로 모니터를 관리하는 방식에 따라 잠금 기능에서 역할 제한 기능으로 변경하는 방법을 소개합니다.

### API

비록 제거될 기능이지만, 위에서 언급된 잠금 기능에 대응하는 `locked` 변수는 여전히 지원됩니다. 따라서 API(응용 프로그래밍 인터페이스) 또는 Terraform으로 관리되는 모니터의 설정을 점진적으로 업데이트하여 `locked` 기능의 사용을 멈추고, `restricted_roles`(새로운 역할 제한 옵션과 결합된 변수) 기능으로 전환할 수 있습니다.

모니터의 정의를 업데이트하는 방법을 자세히 알아보려면, [모니터의 API(응용 프로그래밍 인터페이스) 엔드 포인트 편집][3] 및 [모니터 API(응용 프로그래밍 인터페이스) 옵션][4]를 참조하세요.

### UI

UI(유저 인터페이스)에서 생성된 모든 신규 모니터는 `restricted_roles` 변수를 사용합니다.
또한 모든 모니터는 사용하는 기능에 관계없이 역할 제한 옵션을 표시합니다.

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC(역할 기반 접근 제어) 제한이 없는 모니터"  >}}

Datadog는 모니터가 저장될 때마다 기존에 있던 모니터의 설정을 이전에 사용하던 잠금 기능에서 새로운 역할 제한 기능으로 변경합니다.

잠금 기능을 사용하는 모니터를 저장해야 할 때 어떤 절차를 밟아야 하는지 아래에서 설명해드리겠습니다.

#### 생성자 또는 Datadog 관리자 역할이 부여된 사용자에 의해 편집된, 잠금 상태의 모니터(`locked:true`)

모니터의 생성자 또는 [Datadog 관리자 역할][2]을 부여받은 사용자의 경우 잠금 상태의 모니터를 편집할 때 다음과 같은 경고가 표시됩니다.

```
This monitor is using the locked attribute: only its creator and admins can edit it. locked is deprecated in favor of restricted_roles. On save, the monitor will be automatically updated to use a restricted_roles attribute set to all roles with Admin permissions. 
If there is no specific change you want to apply to this monitor’s permissions, click Save. If you want to update this monitor’s permissions, read this doc.
(이 모니터는 잠금 기능을 사용합니다. 오직 모니터의 생성자와 관리자만 편집할 수 있습니다. 잠금 기능은 역할 제한 기능으로 대체됩니다. 이 모니터를 저장하는 경우, 자동으로 역할 제한 기능을 사용하도록 관리자의 허가를 받은 역할에 업데이트됩니다.
이 모니터의 허가 범위를 유지하려면 저장 버튼을 클릭하세요. 모니터의 허가 범위를 업데이트하려면 이 문서를 보시기 바랍니다.)
```

저장할 시, 모니터의 설정이 관리자 허가를 보유한 모든 역할에 업데이트됩니다.
모니터를 어떻게 변경할지에 따라 여러 방법으로 이 경고를 처리할 수 있습니다.

**1. 모니터 권한 허용에 관한 모든 사항을 유지하고 싶을 때**

모니터를 저장하세요. 그러면 Datadog가 모니터를 자동으로 잠금 기능 상태에서 역할 제한 기능으로 변경됩니다. 또한 모니터에 적용한 모든 업데이트는(예: 가령 기준 변경 또는 메시지가 있는 경우) 함께 저장됩니다.

아무 변경 사항이 없어도 **저장** 버튼을 클릭하면 모니터가 업데이트 됩니다.

**2. 모든 사용자가 이 모니터를 편집하도록 허가하고 싶을 때**

모니터를 저장하면 Datadog에서 역할 제한 기능을 사용하도록 변경합니다. 편집 창을 다시 여세요. **모니터 편집 권한 제한**의 드롭다운 메뉴에서 모든 역할을 제거하세요. 다시 한번 **저장** 버튼을 클릭하세요.

**3. 관리자 허가를 보유한 모든 역할이 아닌, 일부 역할만 모니터를 편집할 수 있도록 변경하고 싶을 때**

**모니터 편집 권한 제한**의 드롭다운 메뉴에서 모니터를 변경할 권한을 부여할 역할을 선택하세요. 그리고 모니터를 저장하세요. 그러면 모니터의 편집 권한이 앞서 선택한 역할에만 부여됩니다.

#### 생성자 이외의 사용자에게, 혹은 Datadog 관리자 역할이 부여되지 않은 사용자에 의해 편집된 잠금 상태의 모니터(`locked:true`)

모니터의 생성자가 아니거나 [Datadog 관리자 역할][2]이 없는 사용자라면, 잠금 상태의 모니터를 편집할 시 다음의 경고를 볼 수 있습니다.

```
This monitor is locked: only its creator and admins can edit it. Read more here.
이 모니터는 잠겨 있습니다. 오직 해당 모니터의 생성자 및 관리자만 편집할 수 있습니다. 자세한 정보는 여기를 참조하세요.
```

이 모니터는 잠겨 있습니다. 모니터의 생성자 또는 [Datadog 관리자 역할][2]을 보유한 사용자에게 연락하여 모니터 역할 제한에 역할을 추가하도록 요청하세요. 관리자는 요청을 처리하기 위해 위에 제시된 [잠금 상태의 모니터](#locked-monitors-lockedtrue-edited-by-creator-or-user-with-datadog-admin-role)에 관한 2번 또는 3번 절차를 따를 것입니다.

**참조:** 경고와 옵션의 차이를 알아보셨으리라 예상합니다. 경고는 잠금 변수를 사용하는 모니터의 현재 상태를 반영합니다. 반면에 옵션은 모니터의 생성자 또는 [Datadog 관리자 역할][2]을 보유한 사용자가 모니터를 저장할 시 해당 모니터가 역할 제한 옵션으로 업데이트 될 내용을 반영합니다. 모니터가 저장되면, 경고가 사라지고 적절한 역할 제한이 드롭다운 메뉴에 나옵니다.

#### 잠금 상태가 아닌 모니터 (`locked:false`, `locked:null`, 정의되지 않은 `locked`)

잠금 상태가 아닌 모니터를 편집하면 다음의 옵션이 표시됩니다.

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC(역할 기반 접근 제어) 제한이 없는 모니터"  >}}

모니터를 어떻게 변경하는지에 따라 여러 방법으로 이 옵션을 처리할 수 있습니다.

**1. 모니터 권한 허용에 관한 모든 사항을 유지하고 싶을 때**

모니터를 저장하세요. 그러면 Datadog가 모니터를 자동으로 잠금 기능 상태에서 역할 제한 기능으로 변경됩니다. 또한 모니터에 적용한 모든 업데이트는(예: 가령 기준 변경 또는 메시지가 있는 경우) 함께 저장됩니다.

아무 변경 사항이 없어도 **저장** 버튼을 클릭하면 모니터가 업데이트 됩니다.

**2. 모니터의 편집 권한을 일부 역할로 제한하고 싶을 때**

**모니터 편집 권한 제한**의 드롭다운 메뉴에서 모니터를 변경할 권한을 부여할 역할을 선택하세요. 그리고 모니터를 저장하세요. 그러면 모니터의 편집 권한이 앞서 선택한 역할에 부여됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/
[2]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /ko/api/latest/monitors/#edit-a-monitor
[4]: /ko/monitors/guide/monitor_api_options/#permissions-options