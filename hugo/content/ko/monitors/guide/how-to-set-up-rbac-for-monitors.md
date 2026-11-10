---
description: 모니터에 대한 RBAC(역할 기반 액세스 제어)를 구성하여 편집 권한을 특정 역할로 제한하고 무단 변경을 방지할 수 있습니다.
further_reading:
- link: /account_management/rbac/permissions/#monitors
  tag: 문서
  text: 모니터의 RBAC(역할 기반 접근 제어) 허가에 관해 자세히 보기
- link: /api/latest/monitors/#create-a-monitor
  tag: 문서
  text: API(응용 프로그래밍 인터페이스)를 통한 제한된 모니터 생성에 관해 자세히 보기
- link: /monitors/configuration/#permissions
  tag: 문서
  text: UI(사용자 인터페이스)를 통한 제한된 모니터 생성에 관해 자세히 보기
title: 모니터의 RBAC(역할 기반 접근 제어) 설정 방법
---
## 개요 {#overview}

모니터는 시스템의 잠재적인 문제에 대해 팀에 알립니다. 권한이 있는 사용자만 모니터를 편집할 수 있도록 하면 모니터 구성이 실수로 변경되는 것을 방지할 수 있습니다.

개별 모니터의 편집 권한을 특정한 역할을 맡은 자에게만 부여하는 것을 통해 모니터를 안전하게 관리할 수 있습니다.

## 역할 설정 {#set-up-roles}

기본적인 역할 및 사용자 지정 역할, 사용자 지정 역할의 생성, 각 역할에 권한 부여, 사용자에게 역할 부여에 관한 자세한 정보를 보려면 [역할 기반 접근 제어][1]를 참조하세요.

## 모니터 접근 제한 {#restrict-access-to-monitors}

{{< tabs >}}

{{% tab "UI" %}}

1. 새 모니터를 생성하거나 기존 모니터를 편집하여 모니터 편집 페이지로 이동합니다.
2. 양식 하단에서 생성자 외에 어떤 역할이 모니터를 편집할 수 있는지 지정합니다.

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="RBAC 제한 모니터" >}}

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

[생성][2] 또는 [모니터 편집][3] API 엔드포인트와 `restricted_roles` 파라미터를 사용하여 모니터 편집 권한을 모니터 생성자와 특정 역할 집합으로 제한하세요. 

**참고:** 하나 이상의 역할 UUID를 지정할 수 있습니다. `restricted_roles`를 `null`로 설정하면 [모니터 쓰기 권한][4]이 있는 모든 사용자가 모니터를 편집할 수 있습니다.

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

## 제한된 역할 {#restricted-roles}

Datadog은 역할 제한 옵션을 통해 모니터 편집을 특정 역할로 제한할 수 있도록 지원합니다. 이를 통해 어떤 사용자가 모니터를 편집할 수 있는지 유연하게 정의할 수 있습니다.

### API {#api}

`restricted_roles` 파라미터를 사용하여 API 또는 Terraform을 통해 관리되는 모니터의 정의를 업데이트할 수 있습니다. 또한 [제한 정책][4] 엔드포인트를 사용하여 모니터에 대한 액세스 제어 규칙을 정의하고, 관계(예: 편집자 및 뷰어) 집합을 허용된 주체(예: 역할, 팀 또는 사용자) 집합에 매핑할 수 있습니다. 제한 정책에 따라 모니터에서 누가 어떤 작업을 수행할 권한이 있는지 결정됩니다.

모니터는 `viewer`, `muter` 및 `editor` 관계를 지원합니다. 뮤트 전용 액세스 권한을 부여하는 `muter` 관계는 현재 미리 보기로 제공되고 있습니다. `muter` 관계를 바인딩하는 정책은 `editor` 관계도 바인딩해야 하며, 각 주체는 정책당 하나의 관계만 가질 수 있습니다. `restricted_roles` 파라미터는 편집 권한만 제어합니다. 뮤트 전용 권한을 부여하려면 제한 정책을 사용하세요. 자세한 내용은 [액세스 수준][5]을 참조하세요.

자세한 내용은 [API 엔드포인트 모니터 편집][3] 및 [제한 정책 API][4]을 참조하세요.

### UI {#ui}

UI에서 생성된 모든 새 모니터는 `restricted_roles` 파라미터를 사용합니다. 
모든 모니터는 기본 메커니즘과 관계없이 역할 제한 옵션도 표시합니다:

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC 비제한 모니터" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/
[2]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /ko/api/latest/monitors/#edit-a-monitor
[4]: /ko/api/latest/restriction-policies/
[5]: /ko/monitors/configuration/#access-levels