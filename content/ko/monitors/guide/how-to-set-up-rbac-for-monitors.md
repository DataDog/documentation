---
further_reading:
- link: /account_management/rbac/permissions/#monitors
  tag: 설명서
  text: 모니터의 RBAC(역할 기반 접근 제어) 허가에 관해 자세히 보기
- link: /api/latest/monitors/#create-a-monitor
  tag: 설명서
  text: API(응용 프로그래밍 인터페이스)를 통한 제한된 모니터 생성에 관해 자세히 보기
- link: /모니터/설정/#퍼미션
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

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="RBAC(역할 기반 접근 제어) 제한 모니터" >}}

자세한 정보를 보려면, [모니터 권한][1]을 참조하세요.

[1]: /ko/monitors/configuration/#permissions
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

## 제한된 역할

Datadog 역할 제한 옵션을 통해 모니터 편집을 특정 역할로 제한할 수 있습니다. 이를 통해 모니터 편집이 허용되는 사용자를 유연하게 정의할 수 있습니다.

### API

`restricted_roles` 파라미터를 사용하여 API 또는 Terraform을 통해 관리되는 모니터의 정의를 업데이트할 수 있습니다. 또한 [제한 정책][4] 엔드포인트를 사용하여 모니터에 대한 액세스 제어 규칙을 정의하여 일련의 관계(예: 편집자와 뷰어)를 허용된 주체의 집합(예: 역할, 팀 또는 사용자)에 매핑할 수 있습니다. 정책 제한은 모니터에서 작업을 수행할 수 있는 권한이 있는 사람을 결정합니다.

자세한 내용은 [API 엔드포인트 모니터 편집][4] 및 [제한 정책 API][5]을 참조하세요.

### UI

UI(유저 인터페이스)에서 생성된 모든 신규 모니터는 `restricted_roles` 변수를 사용합니다.
또한 모든 모니터는 사용하는 기능에 관계없이 역할 제한 옵션을 표시합니다.

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC(역할 기반 접근 제어) 제한이 없는 모니터" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/
[2]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /ko/api/latest/monitors/#edit-a-monitor
[4]: /ko/api/latest/restriction-policies/