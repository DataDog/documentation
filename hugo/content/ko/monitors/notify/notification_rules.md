---
description: 태그와 조건을 기반으로 미리 정의된 알림 규칙을 사용하여 모니터 경보 라우팅을 자동화하고 팀 알림을 간소화합니다.
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
- link: /monitors/settings/
  tag: 설명서
  text: 모니터 설정
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: 블로그
  text: Datadog 모니터 알림 규칙을 사용해 모니터 경보 라우팅
title: 알림 규칙
---
## 개요 {#overview}

모니터 알림 규칙은 태그와 규칙 로직을 기반으로 팀에 경보를 보내는 프로세스를 자동화하는 미리 정의된 조건 집합입니다. 모든 모니터마다 수신자를 개별적으로 구성하는 대신, 알림 규칙을 사용하면 한 번만 정의하여 알림 태그 집합이 규칙의 범위와 일치하는 모든 모니터 알림을 자동으로 라우팅할 수 있습니다.

<div class="alert alert-info">조직당 기본적으로 최대 1,000개의 규칙을 생성할 수 있습니다.</a>.</div>

## 설정 {#setup}

<div class="alert alert-danger">규칙을 생성하려면 <a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> 권한</a>이 있어야 합니다.</div>

Datadog에서 모니터 알림 규칙을 생성하려면 다음을 수행합니다.

1. [**알림 규칙**][1]으로 이동합니다.
2. **New Rule**을 클릭합니다.
3. [범위 구성](#configure-the-scope): 모니터 알림이 이 규칙으로 라우팅되기 위해 필요한 태그를 정의합니다.
4. [라우팅 및 수신자 구성](#configure-the-routing-and-recipients): 알림을 라우팅하는 방법을 선택하고 수신자를 지정합니다.
5. 명확하고 식별하기 쉬운 규칙 이름을 추가합니다.

### 범위 구성 {#configure-the-scope}

모니터 알림이 이 규칙으로 라우팅되기 위해 필요한 태그를 추가합니다. 일치 여부는 알림 태그 집합을 기준으로 평가됩니다. [일치 작동 방식](#how-matching-works)에 대해 자세히 알아보세요.

<div class="alert alert-info">알림 규칙을 저장한 후 생성되거나 업데이트된 모니터는 규칙의 범위와 일치하는 경우 정의된 수신자로 라우팅됩니다.</div>

{{% collapse-content title="규칙 범위 구문" level="h4" expanded=false %}}

Notification Rule 범위 쿼리는 부울 논리를 지원하며, 다른 여러 플랫폼 제품에서 지원하는 [이벤트 기반 검색 구문][3]을 따릅니다.

| 구문 요소 | 설명 |
| -------------- | ----------- |
| **부울 연산자** | 지원: `AND`, `OR`, `NOT`<br>암시적 연산자: `AND` |
| **Wildcard** | `key:*`만 지원됩니다(예: `env:*`). `env:prod-*`와 같은 부분 와일드카드는 지원되지 않습니다. `key:*`는 태그 키가 알림 태그 집합 어디에든 존재하면 일치합니다. |
| **동일한 키의 여러 값** | `env:(prod OR staging)` 또는 `env:prod OR env:staging`를 사용합니다. |
| **따옴표** |  공백이나 특수 문자가 포함된 값은 따옴표로 묶습니다. 예: `team:"data platform"`. |
{{% /collapse-content %}}


{{% collapse-content title="범위 예시" level="h4" expanded=false %}}

| Notification Rule 범위 | 설명 |
| ------------------- | ---------------------- |
| `service:web-store`       | `web-store` 서비스에 대한 모든 알림을 라우팅합니다. |
| `service:web-store AND env:prod`       | `prod` 환경에서 실행 중인 `web-store` 서비스에 대한 모든 알림을 라우팅합니다. |
| `service:webstore AND  NOT env:staging`       | `staging` 환경에서 실행 중이 **아닌** `web-store` 서비스에 대한 모든 알림을 라우팅합니다. |
| `env:*`       | `env:<value>` 태그(모니터 태그 또는 그룹 태그)를 포함하는 모든 알림을 라우팅합니다. |

{{% /collapse-content %}}

{{% collapse-content title="규칙 범위 제한 사항" level="h4" expanded=false %}}

다음은 **지원되지 않습니다**.

* `prod AND service:(A or B)` 또는 `prod`와 같은 키가 없는 태그는 지원되지 않습니다. 태그는 키를 가져야 하며, 이 경우 예를 들어 `env:prod`입니다.
* 부분 와일드카드(`service:web-*`)와 물음표 와일드카드 `service:auth?`는 지원되지 않습니다. Wildcard는 `service:*`처럼 단독으로 사용하는 경우에만 허용됩니다.
* 범위 길이는 최대 3,000자입니다.
{{% /collapse-content %}}


### 라우팅 및 수신자 구성 {#configure-the-routing-and-recipients}

모니터 경보가 규칙의 범위와 일치할 때 알림을 라우팅하는 방법을 선택합니다. 수신자를 직접 지정하거나 동적 라우팅을 사용하여 팀 및 서비스 구성에 따라 수신자를 자동으로 확인할 수 있습니다.

#### 수동 라우팅 {#manual-routing}

모니터 알림이 규칙의 범위와 일치할 때 알림을 받을 수신자를 지정합니다. 항상 모든 수신자에게 알릴 수도 있고, 특정 조건이 충족될 때만 알림을 받는 조건부 수신자를 설정할 수도 있습니다(예: 심각한 경보는 온콜 수신자에게 라우팅하고 경고는 Slack 채널로 전송).
조건은 모니터 상태 또는 태그를 기준으로 설정할 수 있습니다.
- **상태 기반 조건**: 모니터가 특정 상태(Alert, OK, Warn 또는 No data)로 전환될 때 수신자에게 알립니다.
- **태그 기반 조건**: 특정 태그 키가 지정된 값을 가질 때 수신자에게 알립니다(예: `env:prod`). 각 조건은 하나의 태그 키만 지원합니다.

알림은 이메일 또는 모든 통합 채널로 전송할 수 있습니다. 규칙당 최대 50명의 알림 수신자를 지정할 수 있습니다. 자세한 내용은 [Notifications][2]를 참조하세요.

#### 동적 라우팅 {#dynamic-routing}

<div class="alert alert-danger">동적 라우팅은 미리 보기 상태입니다. 액세스를 요청하려면 Datadog 계정 팀에 문의하거나 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 문의하세요.</div>

동적 라우팅은 기존 [Teams][4] 및 [Catalog][5] 구성을 기반으로 모니터 경보를 적절한 팀으로 자동 라우팅합니다. 정적인 수신자 목록을 유지 관리하는 대신, 동적 라우팅은 경보를 발생시킨 모니터의 `service` 또는 `team` 태그를 사용하여 알림을 보낼 대상을 결정합니다.

| 구성 | 설명 | 요구 사항 |
| --- | --- | --- |
| **서비스 기반** | 모니터의 `service` 태그 또는 그룹 태그를 확인한 후, Catalog에서 해당 서비스를 관리하는 팀을 조회하고 그 팀에 구성된 알림 채널로 경보를 전송합니다. | 서비스는 Catalog에서 팀에 할당되어 있어야 합니다. 팀이 할당되어 있지 않으면 경보는 대체 수신자에게 전송됩니다. |
| **팀 기반** | 모니터의 `team` 태그 또는 그룹 태그를 직접 확인한 다음 해당 팀에 구성된 알림 채널로 경보를 전송합니다. | 모니터에는 `team` 태그가 있어야 합니다. |
| **대체** | 라우팅을 확인할 수 없는 경우(예: 서비스에 팀이 할당되지 않았거나 팀에 알림 채널이 구성되지 않은 경우) 경보는 대체 수신자에게 전송됩니다. 대체 수신자는 수동 라우팅 수신자와 동일한 방식으로 동작합니다. | 모든 동적 라우팅 규칙에 필수입니다. |

서비스 기반 및 팀 기반 라우팅은 모두 Slack, 이메일, PagerDuty 및 Microsoft Teams를 지원합니다. 팀은 [Teams settings][4]에서 알림 채널을 구성할 수 있습니다.

## 알림 규칙 관리 {#managing-notification-rules}

### Monitor Settings에서 {#from-monitor-settings}

{{< img src="/monitors/notifications/notification_rules/notification_rules_table.png" alt="Monitor Settings의 알림 규칙 목록" style="width:100%;" >}}

[모니터 알림 규칙][1] 페이지에는 다음 열과 함께 모든 알림 규칙이 표 형식으로 표시됩니다.

- **이름**: 알림 규칙 이름
- **범위**: 이 규칙이 적용되는 태그 조합을 표시합니다(예: `team:shopist service:web-store env:prod`).
- **팀**: 이 알림 규칙과 연결된 팀을 표시합니다(범위에 팀 태그가 추가된 경우에만 사용 가능).
- **커버리지**: 이 규칙의 범위와 일치하는 모니터 수를 표시합니다. 이를 통해 규칙의 커버리지를 확인하고 조정이 필요한 규칙을 식별할 수 있습니다.
- **알림 대상**: 이 규칙과 일치할 때 경보를 수신하는 알림 채널(Slack 또는 이메일 등)을 표시합니다.

또한 알림 규칙에서 세로 점 3개 메뉴를 클릭하여 **Edit** 또는 **Delete**를 선택할 수 있습니다.

### 개별 모니터에서 {#from-an-individual-monitor}
모니터 구성의 **Recipient Summary**에는 일치하는 알림 규칙에 의해 모니터에 적용되는 수신자가 표시됩니다. **Monitor** 편집 페이지에서는 새 그룹이 보고될 때 일치_할 수 있는_ 규칙(다중 경보 모니터)을 확인할 수도 있습니다. **Monitor** 상태 페이지에는 현재 일치하는 규칙이 표시됩니다.

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="알림 규칙에 의해 적용된 알림 수신자를 보여주는 Recipient Summary 필드" style="width:100%;" >}}

## 일치 방식 {#how-matching-works}

- 알림 태그 집합은 모니터 태그와 경보를 발생시킨 그룹의 태그(다중 경보 모니터의 경우)를 합친 집합입니다. 동일한 키에 여러 값이 있는 경우에는 모니터와 그룹의 모든 값이 고려됩니다.
- 현재 일치: 하나 이상의 보고 그룹이 모니터 태그와 결합되어 범위를 충족하거나, 모니터 태그만으로 범위를 충족하면 규칙이 일치합니다. NOT은 각 후보 태그 집합에 대해 개별적으로 평가되므로, 제외된 값을 가진 그룹은 일치하지 않습니다.
- 새 그룹이 보고될 때 일치 가능(다중 경보 모니터, Monitor 편집 화면): 각 group-by 키가 임의의 값을 가진 것으로 간주되며, 모니터 쿼리의 허용/거부 필터에 따라 제한됩니다.
- 여러 규칙이 하나의 알림과 일치하는 경우 모든 일치하는 규칙의 수신자가 병합되며 중복은 제거됩니다.

{{< img src="/monitors/notifications/notification_rules/diagram_notification-rules.png" alt="모니터 알림 규칙이 태그와 일치하는 방식, 모니터와 규칙의 수신자를 결합하는 과정, 그리고 경보를 전송하기 전에 중복을 제거하는 과정을 보여주는 순서도" style="width:100%;" >}}

{{% collapse-content title="예시: Notification Rule 일치" level="h4" expanded=false %}}

다음 표에서는 서로 다른 태그 조합을 가진 모니터가 알림 규칙과 어떻게 일치하며, 그 결과 어떤 알림이 전송되는지를 보여줍니다. 이 표에서는 다음 내용을 보여줍니다.
1. 여러 알림 규칙이 태그를 기준으로 하나의 모니터 알림과 동시에 일치할 수 있습니다.
2. 하나의 규칙에 여러 태그가 있는 경우 AND 논리가 적용됩니다.
3. 일치하는 모든 알림 규칙의 수신자가 최종 알림 목록에 포함됩니다.
4. 최종 알림 목록에서는 중복된 수신자가 제거됩니다.

<table>
    <thead>
        <tr>
            <th></th>
            <th colspan="5" style="text-align: center; border-bottom: 1px solid #ddd; background-color:rgb(98, 92, 92);">알림 규칙</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th style="background-color:#E8E8E8;"></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist,<br>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:prod</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:dev</code></th>
            <th style="background-color:#E8E8E8;"></th>
        </tr>
        <tr>
            <td style="background-color:#E8E8E8;"><strong>모니터 경보 태그 및 알림</strong></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@slack-channel1</i><br><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@user@datadoghq.com</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8;"><strong>알림 수신 핸들</strong></td>
        </tr>
        <tr>
            <td><code>team:shopist, service:web-store</code><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>team:shopist</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:prod</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:dev</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>team:shopist and service:web-store, env:prod</code><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
    </tbody>
</table>

{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /ko/monitors/notify/#notifications
[3]: /ko/getting_started/search/#event-based-queries
[4]: /ko/account_management/teams/
[5]: /ko/internal_developer_portal/catalog/