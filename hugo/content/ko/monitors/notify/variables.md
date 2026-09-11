---
description: 변수를 사용하여 모니터 알림 사용자 지정
further_reading:
- link: /monitors/guide/template-variable-evaluation/
  tag: 가이드
  text: 템플릿 변수 평가를 사용하여 산술 연산 및 함수를 수행합니다.
- link: /monitors/
  tag: 설명서
  text: 모니터 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림
- link: /monitors/manage/
  tag: 설명서
  text: 모니터 관리
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: 학습 센터
  text: 코스를 듣고 경보 모니터 알림 사용자 지정
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: 블로그
  text: Datadog 모니터 알림 규칙을 사용해 모니터 경보 라우팅
title: 변수
---
알림 메시지에 변수를 사용해 조건부 메시징을 표시하고 [조건 변수](#conditional-variables)를 사용하여 알림을 여러 팀으로 라우팅하거나 [속성 및 태그 변수](#attribute-and-tag-variables)와 [템플릿 변수](#template-variables)를 사용하여 메시지 내용을 보강하세요.

## 조건 변수 {#conditional-variables}

조건 변수는 `if-else` 로직을 사용하여 모니터의 상태, 어떻게 트리거되었는지 세부 정보에 따라 다른 메시지를 표시합니다. 이러한 변수는 알림 메시지의 제목이나 본문 안에서 사용할 수 있습니다.

사용 가능한 조건 변수는 다음과 같습니다.

| 조건 변수       | 텍스트 표시 조건                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | The monitor alerts                                                 |
| `{{^is_alert}}`            | The monitor does not alert                                         |
| `{{#is_match}}`            | The context matches the provided substring. If a numeric value is used, it is converted to a string.|
| `{{^is_match}}`            | The context does not match the provided substring                  |
| `{{#is_exact_match}}`      | The context exactly matches the provided string.<br> If a number is used, the numeric value is considered, regardless of its type. This means that as long as two numbers have the same value, they are considered equal by the function. |
| `{{^is_exact_match}}`      | The context does not exactly match the provided string             |
| `{{#is_no_data}}`          | The monitor is triggered for missing data                          |
| `{{^is_no_data}}`          | The monitor is not triggered for missing data                      |
| `{{#is_warning}}`          | The monitor warns                                                  |
| `{{^is_warning}}`          | The monitor does not warn                                          |
| `{{#is_recovery}}`         | The monitor recovers from `ALERT`, `WARNING`, `UNKNOWN`, or `NO DATA`         |
| `{{^is_recovery}}`         | The monitor does not recover from `ALERT`, `WARNING`, `UNKNOWN`, or `NO DATA` |
| `{{#is_warning_recovery}}` | The monitor recovers from `WARNING` to `OK`                        |
| `{{^is_warning_recovery}}` | The monitor does not recover from `WARNING` to `OK`                |
| `{{#is_alert_recovery}}`   | The monitor recovers from `ALERT` to `OK`                          |
| `{{^is_alert_recovery}}`   | The monitor does not recover from an ALERT to OK                   |
| `{{#is_alert_to_warning}}` | The monitor transitions from `ALERT` to `WARNING`                  |
| `{{^is_alert_to_warning}}` | The monitor does not transition from `ALERT` to `WARNING`          |
| `{{#is_no_data_recovery}}` | The monitor recovers from `NO DATA`                                |
| `{{^is_no_data_recovery}}` | The monitor does not recover from `NO DATA`                        |
| `{{#is_priority 'value'}}` | The monitor has priority `value`. Value ranges from `P1` to `P5`   |
| `{{#is_unknown}}`          | The monitor is in the unknown state                                |
| `{{^is_unknown}}`          | The monitor is not in the unknown state                            |
| `{{#is_renotify}}`         | The monitor is renotifying                                         |
| `{{^is_renotify}}`         | 모니터가 다시 알리지 않습니다.                                    |

### 예시 {#examples}

조건 변수는 텍스트로 시작과 끝을 페어로 지정하고 그 사이에 **@-notifications**가 있어야 합니다. 모니터 상태에 기반한 변수(예를 들어 `is_alert` 또는 `is_warning`)에는 자체 메시지 블록이 있어야 합니다. 모니터는 한 번에 한 가지 상태만 가능하기 때문에, 이러한 항목을 결합할 수는 없습니다. 하지만 속성에서 일치하는 조건은 중첩할 수 있습니다(`is_renotify` 예시 참조).

{{< tabs >}}
{{% tab "is_alert" %}}

모니터 경보 발생 시 알림 메시지를 보내려면 다음 형식 사용:

```text
{{#is_alert}}
  <ALERT_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_alert}}
```

{{% /tab %}}
{{% tab "is_warning" %}}

모니터 경고 발생 시 알림 메시지를 보내려면 다음 형식 사용:

```text
{{#is_warning}}
  <WARNING_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_warning}}
```

{{% /tab %}}
{{% tab "is_recovery" %}}

모니터가 복구될 때 알림 메시지를 보내려면 다음 형식 사용:

```text
{{#is_recovery}}
  <RECOVERY_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_recovery}}
```

{{% /tab %}}
{{% tab "is_match" %}}

[태그 변수](#attribute-and-tag-variables)의 하위 문자열을 검색하려면 다음 형식 사용:

```text
{{#is_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is included in <TAG_VARIABLE>.
{{/is_match}}
```

트리거 호스트에 태그 `role:db_cassandra` 또는 `role:db_postgres`가 있는 경우 DB 팀에 알리려면 다음 사용:

```text
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{/is_match}}
```

`is_match` 조건은 일치하는 여러 문자열도 지원합니다.

```text
{{#is_match "host.role.name" "db" "database"}}
  This displays if the host triggering the alert contains `db` or `database`
  in the role name. @db-team@company.com
{{/is_match}}
```

태그에 `db`가 포함되지 않은 경우 다른 알림을 보내려면 다음과 같이 해당 조건의 부정을 사용합니다.

```text
{{^is_match "host.role.name" "db"}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```

또는 첫 번째 예시에서 `{{else}}` 파라미터 사용:

```text
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{else}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```
**참고**: `<TAG_VARIABLE>`이 존재하지 않거나 비어 있는지 검사하려면 `is_exact_match`를 사용하세요. 자세한 내용은 `is_exact_match` 탭을 참조하세요.

{{% /tab %}}
{{% tab "is_exact_match" %}}

[태그 변수](#attribute-and-tag-variables)의 정확한 문자열을 검색하려면 다음 형식 사용:

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is exactly <TAG_VARIABLE>.
{{/is_exact_match}}
```

트리거 호스트에 이름 `production`이 있는 경우 dev 팀에 알리려면 다음 사용:

```text
{{#is_exact_match "host.name" "production"}}
  This displays if the host that triggered the alert is exactly
  named production. @dev-team@company.com
{{/is_exact_match}}
```

`is_exact_match` 조건은 일치하는 여러 문자열도 지원합니다.

```text
{{#is_exact_match "host.name" "production" "staging"}}
  This displays if the host that triggered the alert is exactly
  named production or staging. @dev-team@company.com
{{/is_exact_match}}
```

`is_exact_match` 조건 변수는 [`{{value}}` 템플릿 변수](#template-variables)도 지원합니다.

```text
{{#is_exact_match "value" "<VALUE>"}}
  This displays if the value that breached the threshold of the monitor is exactly <VALUE>.
{{/is_exact_match}}
```

모니터 임계값을 위반한 값이 5(또는 5.0)인 경우 dev 팀에 알리려면 다음 사용:

```text
{{#is_exact_match "value" "5"}}
  This displays if the value that breached the threshold of the monitor is 5. @dev-team@company.com
{{/is_exact_match}}
```

`is_exact_match` 조건 변수는 속성 또는 태그가 비어 있거나 존재하지 않는지 검사하는 데 `<COMPARISON_STRING>`의 빈 문자열도 지원합니다.

```text
{{#is_exact_match "host.datacenter" ""}}
  This displays if the attribute or tag does not exist or if it's empty
{{/is_exact_match}}
```


{{% /tab %}}
{{% tab "is_renotify" %}}

`production` 환경에 대해서만 다른 대상으로 에스컬레이션 메시지를 보내려면:

```text
{{#is_renotify}}
{{#is_match "env" "production"}}
  This is an escalation message sent to @dev-team@company.com
{{/is_match}}
{{/is_renotify}}
```

원본 메시지 세부 정보를 포함하지 않는 다른 에스컬레이션 메시지를 보내려면 다음 조합을 사용하세요. `{{^is_renotify}}` and `{{#is_renotify}}` blocks:

```text
{{^is_renotify}}
This monitor is alerting and sending a first message @dev-team@company.com

To solve this monitor follow the steps:
1. Go there
2. Do this
{{/is_renotify}}

This part is generic and sent both for the first trigger and the escalation message.

{{#is_renotify}}
  This is the escalation message @dev-team@company.com
{{/is_renotify}}

```

모니터 다시 알리기가 발생하면 사용자에게 다음과 같은 에스컬레이션 메시지가 발송됩니다.

```
This part is generic and sent both for the first trigger and the escalation message.

This is the escalation message @dev-team@company.com
```

{{% /tab %}}

{{< /tabs >}}

**@-notifications** 핸들을 사용하여 `alert` 또는 `warning` 조건으로 상태 전환을 위해 조건 블록을 구성하는 경우, Datadog은 핸들에 복구 알림을 보내도록 해당하는 `recovery` 조건을 구성하는 편을 권장합니다.

**참고**: 구성된 조건 변수 **외부**에 배치된 모든 텍스트 또는 알림 핸들은 모니터 상태가 전환될 때마다 호출됩니다. 구성된 조건 변수 **내부**에 배치된 모든 텍스트 또는 알림 핸들은 모니터 상태 전환이 조건과 일치할 때만 호출됩니다.

## 속성 및 태그 변수 {#attribute-and-tag-variables}

속성 및 태그 변수는 경보의 성격을 이해하는 데 도움이 되는 사용자 지정, 정보 제공용, 구체적인 경보 메시지를 렌더링하는 데 사용하세요. 예시 및 사용 사례는 다음 섹션 참조:
- [다중 경보 변수](#multi-alert-variables)
- [일치하는 속성/태그 변수](#matching-attributetag-variables)

태그
: 자동으로 연결되거나(예: 호스트 이름, 컨테이너 이름, 로그 파일 이름, 서버리스 함수 이름 등) 사용자 지정 태그를 통해 추가됩니다(담당 팀, 환경, 애플리케이션 또는 버전).

속성
: 로그 내용을 따르며 참조표에서 조회하여 구문 분석되거나 추가됩니다(예: geoip).

**참고**: 모니터가 데이터 없음 조건에서 복구되도록 구성된 경우(예를 들어 쿼리와 일치하는 이벤트가 없을 때), 복구 메시지에 아무런 데이터가 포함되지 않습니다. 복구 메시지에 정보를 계속 유지하려면 추가적인 태그 기준으로 그룹화하세요. 여기에는 `{{tag.name}}`으로 액세스할 수 있습니다.

### 다중 경보 변수 {#multi-alert-variables}

다중 경보 그룹 박스에서 선택한 디멘션에 따라 [다중 경보 모니터][1]에서 다중 경보 변수를 구성합니다. 알림을 강화하려면 각 경보의 그룹화 기준 디멘션과 연결된 값을 포함하세요.

**참고**: 집계에 `group_by` 필드를 사용하는 경우, 모니터에서 추가적인 태그 및 경보가 자동으로 상속될 수 있습니다. 다시 말해 모니터링되는 엔드포인트에 설정된 모든 경보 또는 구성이 집계로 인해 발생하는 각 그룹에 적용될 수 있습니다.

{{< tabs >}}
{{% tab "태그 기준으로 그룹화" %}}

메트릭에 `key:value` 형식의 태그가 태그되고, 모니터 쿼리가 이 태그를 기준으로 그룹화되는 경우 다음 변수를 사용하세요.

```
{{ key.name }}
```

이 변수는 각 알림에 `key`와 연결된 `value`를 삽입합니다. 예를 들어 모니터가 각 `env`에 대하여 경보를 트리거하는 경우, 알림 메시지에서 변수 `{{env.name}}`을 사용할 수 있습니다.

그룹에 같은 `key`와 연결된 `values`가 여러 개 있는 경우, 경보 메시지에 모든 값이 쉼표로 구분된 문자열(알파벳 순서대로)이 표시됩니다.

#### 마침표가 있는 태그 키 {#tag-key-with-period}

태그의 키에 마침표가 있으면 태그 변수를 사용할 때 키 전체를 괄호로 감싸세요. 예를 들어 태그가 `dot.key.test:five`이고 모니터의 그룹화 기준이 `dot.key.test`인 경우, 다음 사용:

```text
{{[dot.key.test].name}}
```

{{% /tab %}}

{{% tab "패싯 기준으로 그룹화" %}}

로그 모니터, 트레이스 분석 모니터, RUM 모니터, 이벤트 모니터는 모니터가 패싯 기준으로 그룹화되는 경우 패싯을 변수로 사용할 수 있습니다. 로그 모니터의 그룹화 기준이 `@facet_key`인 경우, 다음 변수 사용:

```text
{{ @facet_key.name }}
```

**예시**: 그룹화 기준이 `@machine_id`인 다중 경보 로그 모니터 그룹에 그룹별 정보를 포함하는 방법:

```text
This alert was triggered on {{ @machine_id.name }}
```

패싯에 마침표가 있는 경우, 패싯을 괄호로 감싸세요. 예를 들면 다음과 같습니다.

```text
{{ [@network.client.ip].name }}
```

{{% /tab %}}
{{< /tabs >}}

#### 그룹 기준으로 알림 사용자 지정 {#customize-the-notification-based-on-the-group}

쿼리가 특정 디멘션을 기준으로 그룹화되는 경우, 그룹과 연결된 동적 메타데이터를 사용해 알림을 강화할 수 있습니다. 태그 선택에 따른 태그 변수 목록을 보려면 **구성 알림 및 자동화** 섹션 아래에 있는 **메시지 템플릿 변수 사용**을 클릭하세요. 다음 예시 참조:

{{% collapse-content title="호스트 기준 쿼리 그룹" level="h5" %}}

모니터가 각 `host`에 대하여 경보를 트리거하는 경우, 태그 변수 `{{host.name}}` and `{{host.ip}}`를 사용할 수 있으며, 이 외에 이 호스트에서 사용할 수 있는 모든 호스트 태그도 사용할 수 있습니다.

특정 호스트 메타데이터 변수:

- Agent 버전: `{{host.metadata_agent_version}}`
- 머신: `{{host.metadata_machine}}`
- 플랫폼: `{{host.metadata_platform}}`
- 프로세서: `{{host.metadata_processor}}`
{{% /collapse-content %}}

{{% collapse-content title="kube_namespace 및 kube_cluster_name 기준 쿼리 그룹" level="h5" %}}
모니터가 각 `kube_namespace` 및 `kube_cluster_name`에 대하여 경보를 트리거하는 경우, 네임스페이스의 모든 속성에 액세스할 수 있습니다.

네임스페이스 메타데이터 변수:

- 클러스터 이름 `{{kube_namespace.cluster_name}}`
- 네임스페이스 이름: `{{kube_namespace.display_name}}`
- 네임스페이스 상태: `{{kube_namespace.status}}`
- 네임스페이스 레이블: `{{kube_namespace.labels}}`

다음 표는 사용 가능한 모든 속성을 포함합니다.

| 변수 구문   | 첫 번째 수준 속성 |
|-------------------|------------------------|
| `{{kube_namespace.key}}`     | `k8s_namespace_key`, `태그`, `어노테이션`, `cluster_id`, `cluster_name`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `파이널라이저`, `first_seen_at`, `group_size`, `레이블`, `이름`, `네임스페이스`, `상태`, `uid`|
{{% /collapse-content %}}

{{% collapse-content title="pod_name and kube_namespace 및 kube_cluster_name 기준 쿼리 그룹" level="h5" %}}
모니터가 각 `pod_name`, `kube_namespace` 및 `kube_cluster_name`에 대하여 경보를 트리거하는 경우, 포드의 모든 속성에 액세스할 수 있습니다.

포드 메타데이터 변수:
- 클러스터 이름 `{{pod_name.cluster_name}}`
- 포드 이름: `{{pod_name.name}}`
- 포드 단계: `{{pod_name.phase}}`

다음 표는 사용 가능한 모든 속성을 포함합니다.

| 변수 구문   | 첫 번째 수준 속성 |
|-------------------|------------------------|
| `{{pod_name.key}}`     | `k8s_pod_key`, `태그`, `어노테이션`, `cluster_id`, `cluster_name`, `조건`, `container_statuses`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `파이널라이저`, `first_seen_at`, `host_id`, `host_key`, `호스트 이름`, `init_container_statuses`, `ip`, `레이블`, `이름`, `네임스페이스`, `node_name`, `nominated_node_name`, `단계`, `pod_scheduled_timestamp`, `priority_class_name`, `qosclass`, `resource_requirements`, `uid`|
{{% /collapse-content %}}


{{% collapse-content title="서비스 기준 쿼리 그룹" level="h5" %}}

모니터가 각 `service`에 대해 경보를 트리거하는 경우, [Software Catalog][10]에 정의된 대로 서비스의 일부 속성에 액세스할 수 있습니다.

서비스 메타데이터 변수:

- 서비스 이름: `{{service.name}}`
- 팀 이름: `{{service.team}}`
- 문서: `{{service.docs}}`
- 링크: `{{service.links}}`

문서 및 링크의 경우, 다음 구문 `[<name>]`을 사용하여 특정 항목에도 액세스할 수 있습니다. 예를 들어 이 [예시][11]에 정의된 것과 같이 정의 스키마가 있는 서비스의 경우, 다음 구문을 사용하여 "런북" 링크에 액세스할 수 있음

```text
{{service.links[Runbook]}}
```
{{% /collapse-content %}}

### 일치하는 속성/태그 변수 {#matching-attributetag-variables}

모니터 쿼리와 일치하는 로그, 트레이스 스팬, RUM 이벤트, CI 파이프라인 또는 CI 테스트 이벤트의 속성 또는 태그를 아무것이나 포함할 수 있습니다. 다음 테이블에 다양한 모니터 유형에서 추가할 수 있는 속성 및 변수의 예를 표시했습니다.

<div class="alert alert-info">모니터에 사용할 수 있는 변수 전체 목록을 보려면 알림 구성 맨 아래에서 <strong>{{&nbsp;변수 추가</strong>를 클릭하고 확장된 메뉴 옵션 중에서 선택하세요.</div>

| 모니터 유형             | 변수 구문                                         |
|--------------------------|--------------------------------------------------------|
| [Audit Trail][16]        | `{{audit.attributes.key}}` or `{{audit.message}}`      |
| [CI Pipeline][17]        | `{{cipipeline.attributes.key}}`                        |
| [CI Test][18]            | `{{citest.attributes.key}}`                            |
| [Database Monitoring][19]| `{{databasemonitoring.attributes.key}}`                |
| [Error Tracking][14]     | `{{issue.attributes.key}}`                             |
| [Log][12]                | `{{log.attributes.key}}` or `{{log.tags.key}}`         |
| [RUM][15]                | `{{rum.attributes.key}}` or `{{rum.tags.key}}`         |
| [Synthetic Monitoring][20]| `{{synthetics.attributes.key}}`                       |
| [Trace Analytics][13]    | `{{span.attributes.key}}` or `{{span.tags.key}}`       |

{{% collapse-content title="예시 구문 사용법" level="h4" %}}
- 모든 `key:value` 쌍에 대하여, 경보 메시지에서 변수 `{{log.tags.key}}` renders `value`를 렌더링합니다.
- 모든 속성의 접두사인 `@`은 포함되지 않습니다. 예를 들어 로그 모니터의 그룹화 기준이 `@http.status_code`인 경우, 다음 변수를 사용하여 알림 메시지에 오류 메시지 또는 인프라 태그를 포함할 수 있습니다.

  ```text
  {{ log.attributes.[error.message] }}
  {{ log.tags.env }}
  ...
  ```

  {{< img src="monitors/notifications/tag_attribute_variables.png" alt="일치하는 속성 변수 구문" style="width:90%;">}}
- 메시지는 **속성이 존재하는 경우** 쿼리와 일치하는 선택된 로그의 `error.message` 속성을 렌더링합니다.
- 태그가 이벤트에 있는 경우, 다음 구문 사용:

  ```text
  {{ event.tags.[dot.key.test] }}
  ```

{{% /collapse-content %}}

#### 중요 참고 사항 {#important-notes}

- 선택된 이벤트가 속성 또는 태그 키를 포함하지 않는 경우, 알림 메시지에서 변수가 빈 상태로 렌더링됩니다. 알림을 놓치지 않으려면 `{{#is_match}}` 핸들이 있는 알림을 라우팅하는 데 이러한 변수 사용을 피하세요.
- 쿼리에서 수식 및 함수를 사용하는 모니터의 경우, 값이 첫 번째 쿼리에서 추출한 이벤트에 따라 리졸브됩니다.


#### 예약된 속성 {#reserved-attributes}

로그, Event Management, 스팬, RUM, CI 파이프라인 및 CI 테스트 이벤트에는 일반적인 예약된 속성이 있고, 이것을 다음 구문과 함께 변수에 사용할 수 있습니다.

| 모니터 유형    | 변수 구문   | 첫 번째 수준 속성 |
|-----------------|-------------------|------------------------|
| 로그             | `{{log.key}}`     | `메시지`, `서비스`, `상태`, `소스`, `span_id`, `타임스탬프`, `trace_id`, `링크`, `호스트` |
| Trace Analytics | `{{span.key}}`    | `env`, `operation_name`, `resource_name`, `서비스`, `상태`, `span_id`, `타임스탬프`, `trace_id`, `유형`, `링크` |
| RUM             | `{{rum.key}}`     | `서비스`, `상태`, `타임스탬프`, `링크` |
| Event             | `{{event.key}}`     | `속성`, `host.name`, `id`, `링크`, `제목`, `텍스트`, `태그` |
| CI Pipeline             | `{{cipipeline.key}}`     | `서비스`, `env`, `resource_name`, `ci_level`, `trace_id`, `span_id`, `pipeline_fingerprint`, `operation_name`, `ci_partial_array`, `상태`, `타임스탬프`, `링크` |
| CI Test             | `{{citest.key}}`     | `서비스`, `env`, `resource_name`, `trace_id`, `span_id`, `operation_name`, `상태`, `타임스탬프`, `링크` |

일치하는 이벤트의 정의에 속성이 포함되어 있지 않으면, 변수가 빈 상태로 렌더링됩니다.

#### 탐색기 링크 {#explorer-link}

`{{log.link}}`, `{{span.link}}`, `{{rum.link}}`, and `{{issue.link}}`를 사용하여 쿼리와 일치하는 이벤트에서 범위가 지정된 Log Explorer, Trace Explorer, RUM Explorer 또는 Error Tracking으로 이동하는 링크로 알림을 강화하세요.

### 모니터 변수 검사 {#check-monitor-variables}

검사 모니터 변수의 경우(사용자 지정 검사 및 통합 검사), 변수 `{{check_message}}`를 사용할 수 있으며 사용자 지정 검사 또는 통합 검사에 지정된 메시지를 렌더링합니다.

### 복합 모니터 변수 {#composite-monitor-variables}

복합 모니터는 경보가 트리거될 때 하위 모니터와 연결된 값과 상태에 접근할 수 있습니다.

예를 들어 복합 모니터에 하위 모니터 `a`가 있는 경우, 다음을 사용하여 `a` 값을 포함할 수 있습니다.

```text
{{ a.value }}
```

하위 모니터 `a`의 상태를 검색하려면 다음 사용:

```text
{{ a.status }}
```

상태로 가능한 값은\: `OK`, `Alert`, `Warn`, `No Data`입니다.

복합 모니터는 기본 모니터와 같은 방식으로 태그 변수도 지원합니다. 다른 모니터와 같은 형식을 따르며, 단 여기에는 기본 모니터가 동일한 태그 또는 패싯 기준으로 그룹화되어 있어야 한다는 전제 조건이 수반됩니다.

예를 들어 복합 모니터에 하위 모니터 `a`가 있고 이것이 로그 모니터라고 가정하겠습니다. 다음을 사용하여 `a`의 모든 태그 또는 패싯 값을 포함할 수 있습니다.

```text
{{ a.log.message }} or {{ a.log.my_facet }}
```

### 문자 이스케이프 {#character-escape}

변수 내용은 기본적으로 HTML로 인코딩됩니다. 원시, 인코딩되지 않은 내용을 출력하려면 중괄호 두 개 대신 중괄호 세 개를 사용하세요.

예를 들어 변수의 값에 쿼리 파라미터가 있는 URL이 포함된 경우, `&`는 중괄호를 두 개 사용했는지, 세 개 사용했는지에 따라 다르게 취급됩니다.

| 구문 | 출력 예시 |
--------|----------------|
| `{{template_variable}}` (double braces) | `https://status.example.com/check?service=web&amp;region=us-east` |
| `{{{template_variable}}}` (triple braces) | `https://status.example.com/check?service=web&region=us-east` |

| 구문 | 출력 |
|--------|--------|
| `{{variable}}` | HTML-encoded (default) |
| `{{{variable}}}` | 원시, 인코딩되지 않음 |

예를 들어 HTML 인코딩 없이 검사 메시지를 렌더링하려면 다음과 같이 작성합니다.

```text
{{{check_message}}}
```

이는 특히 `{{check_message}}` contains auto-generated URLs with query parameters (for example, on HTTP Check monitors). The `&` characters in those URLs are HTML-encoded by default, which can break clickable links in notifications. Use `{{{check_message}}}`를 사용하세요.

## 템플릿 변수 {#template-variables}

모니터 알림을 사용자 지정하려면 템플릿 변수를 사용합니다. 기본 제공 변수는 다음과 같습니다.

| 변수                             | 설명                                                                   |
|-----------------------------------   |-------------------------------------------------------------------------------|
| `{{value}}`                          | The value that breached the alert for metric based query monitors.            |
| `{{threshold}}`                      | The value of the alert threshold set in the monitor's alert conditions.       |
| `{{warn_threshold}}`                 | The value of the warning threshold set in the monitor's alert conditions.     |
| `{{alert_recovery_threshold}}`       | The value that recovered the monitor from its `ALERT` state.                  |
| `{{warn_recovery_threshold}}`        | The value that recovered the monitor from its `WARN` state.                   |
| `{{ok_threshold}}`                   | The value that recovered the Service Check monitor.                           |
| `{{comparator}}`                     | The relational value set in the monitor's alert conditions.                   |
| `{{first_triggered_at}}`<br>*See section below*         | The UTC date and time when the monitor first triggered.                       |
| `{{first_triggered_at_epoch}}`<br>*See section below*   | The UTC date and time when the monitor first triggered in epoch milliseconds. |
| `{{last_triggered_at}}`<br>*See section below*          | The UTC date and time when the monitor last triggered.                        |
| `{{last_triggered_at_epoch}}`<br>*See section below*    | The UTC date and time when the monitor last triggered in epoch milliseconds.  |
| `{{triggered_duration_sec}}`         | 모니터가 트리거된 상태였던 시간(초 단위)입니다.              |

### 트리거된 변수 {#triggered-variables}

 `{{first_triggered_at}}`, `{{first_triggered_at_epoch}}`, `{{last_triggered_at}}`, and `{{last_triggered_at_epoch}}` monitor template variables reflect the values when a monitor changes state, **NOT** when a new monitor event occurs. Renotification events show the same template variable if the monitor state has not changed. Use `{{triggered_duration_sec}}`를 사용하여 모니터 이벤트 시점의 지속 시간을 표시합니다.

 `{{first_triggered_at}}` is set when the monitor group goes from `OK` to a non-`OK` state or when a new group appears in a non-`OK` state. `{{last_triggered_at}}` gets set when the monitor group goes to a non-`OK` state independently from its previous state (including `WARN` → `ALERT`, `ALERT` → `WARN`). Additionally, `{{last_triggered_at}}` is set when a new group appears in a non-`OK` state. The difference is that `{{last_triggered_at}}`은 이전 상태와 무관합니다.

 {{< img src="monitors/notifications/triggered_variables.png" alt="타임스탬프가 있는 네 가지 전환을 표시했습니다(A: 1419 OK에서 WARN으로, B: 1427 WARN에서 ALERT로, C: 1445 ALERT에서 NO DATA로, D: 1449 NO DATA에서 OK로)" style="width:90%;">}}

**예시**: 모니터가 `OK` → `WARN`로 전환되면, `{{first_triggered_at}}` and `{{last_triggered_at}}`의 값 둘 모두에 타임스탬프 A가 포함됩니다. 아래 표에 모니터가 복구될 때까지의 값을 표시했습니다.

| 전환         | first_triggered_at     | last_triggered_at      | triggered_duration_sec           |
|------------------  |--------------------------------  |--------------------------------  |--------------------------------  |
| `OK` → `WARN`      | A                                | A                                | 0                                |
| `WARN` → `ALERT`   | A                                | B                                | B - A                            |
| `ALERT` → `NO DATA`| A                                | C                                | C - A                            |
| `NO DATA` → `OK`   | A                                | C                                | D - A                            |

### 평가 {#evaluation}

숫자 값을 반환하는 템플릿 변수는 연산과 함수를 지원하며, 이것을 사용하면 수학 연산을 수행하거나 값의 형식을 변경할 수 있습니다. 자세한 내용은 [템플릿 변수 평가][7]를 참조하세요.

### 현지 시각 {#local-time}

알림에 선택한 표준 시간대로 날짜를 하나 더 추가하려면 `local_time` 함수를 사용하세요. 이 함수는 날짜를 현지 시각 `{{local_time 'time_variable' 'timezone'}}`으로 변환합니다.
예를 들어 알림에 모니터가 마지막으로 트리거된 시간을 도쿄 표준 시간대로 추가하려면, 알림 메시지에 다음 내용 포함:

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

결과는 ISO 8601 형식 `yyyy-MM-dd HH:mm:ss±HH:mm`으로 표시됩니다(예: `2021-05-31 23:43:27+09:00`).
사용 가능한 표준 시간대 값 목록은 [tz 데이터베이스 표준 시간대 목록][8], 특히 TZ 데이터베이스 이름 열을 참조하세요.

## 고급 {#advanced}

### 동적 핸들 {#dynamic-handles}

[태그 변수](#attribute-and-tag-variables)를 사용하면 동적으로 알림 핸들을 구축하고, 모니터가 감지한 문제의 유형에 따라 알림을 적절한 팀 또는 서비스로 라우팅할 수 있습니다.

**예**: 모니터가 메트릭을 쿼리하고 이를 `service` 태그 기준으로 그룹화하는 경우, 실패하는 서비스에 따라 알림을 여러 다른 Slack 채널로 라우팅할 수 있습니다.

```text
@slack-{{service.name}} There is an ongoing issue with {{service.name}}.
```

모니터가 `service:ad-server` 그룹부터 실패하기 시작하는 경우, `#ad-server` Slack 채널로 다음과 같은 내용의 알림이 전송됩니다.

```text
@slack-ad-server There is an ongoing issue with ad-server.
```

항상 있지는 않을 수 있는 속성으로 동적 핸들을 구축하면 알림 전송과 관련해 문제가 발생할 수 있습니다. 속성이 누락되면 알림 메시지에 변수가 빈 것으로 렌더링되고, 따라서 잘못된 핸들이 생성됩니다.

이러한 변수로 동적 핸들을 사용할 때 알림 누락을 피하려면 폴백 핸들을 추가하세요.

```text
{{#is_exact_match "kube_namespace.owner" ""}}
  @slack-example
  // This will notify @slack-example if the kube_namespace.owner variable is empty or does not exist.
{{/is_exact_match}}
```


### 동적 링크 {#dynamic-links}

[태그 변수](#attribute-and-tag-variables)를 사용하여 팀을 적절한 리소스로 연결하는 동적 URL 구축을 활성화할 수 있습니다. 예를 들어 대시보드, 호스트 맵, 모니터와 같이 Datadog 안의 페이지로 이동하는 링크를 제공할 수 있습니다.

{{< tabs >}}
{{% tab "Dashboards" %}}

`{{host.name}}` [태그 변수](#attribute-and-tag-variables)를 사용하여 시스템 대시보드로 이동하는 링크 제공:

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

`{{host.name}}` [tag variable](#attribute-and-tag-variables) and an `<INTEGRATION_NAME>`을 사용하여 통합 대시보드로 이동하는 링크 제공:

```text
https://app.datadoghq.com/dash/integration/<INTEGRATION_NAME>?tpl_var_scope=host:{{host.name}}
```

`{{last_triggered_at_epoch}}` [template variable](#template-variables) as well as a `<DASHBOARD_ID>` and `<DASHBOARD_NAME>`을 사용하여 경보 시점으로부터 상대적 시간 범위가 포함된 대시보드에 연결:

```text
https://app.datadoghq.com/dashboard/<DASHBOARD_ID>/<DASHBOARD_NAME>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

{{% /tab %}}
{{% tab "호스트 맵" %}}

[태그 변수](#attribute-and-tag-variables)(예: `{{service.name}}`)를 사용하여 호스트 맵으로 이동하는 링크 제공:

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

호스트 맵 링크는 추가 파라미터로 사용자 지정할 수 있습니다. 가장 일반적인 예:

| 파라미터 | 정의               | 결정                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<METRIC_NAME>` | 호스트 육각형의 채우기 색상. |
| `groupby` | `groupby=<TAG_KEY>`        | 호스트 육각형의 그룹.        |
| `sizeby`  | `sizeby=avg:<METRIC_NAME>` | 호스트 육각형의 크기.       |

{{% /tab %}}
{{% tab "모니터" %}}

`{{host.name}}` [태그 변수](#attribute-and-tag-variables)를 사용하여 특정 호스트와 관련된 모든 모니터로 이동하는 링크 제공:

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

모니터 링크는 추가 파라미터로 사용자 지정할 수 있습니다. 가장 일반적인 예:

| 파라미터 | 예시        | 표시                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | 경보 상태인 모니터(추가 상태: `WARN`, `NO DATA` 및 `OK`)   |
| `muted`   | `muted: true`  | 음소거된 모니터(음소거되지 않은 모니터에는 `false` 사용)                             |
| `type`    | `type:log`     | 로그 모니터(기타 [모니터 유형][1] 참조)                                     |



[1]: /ko/monitors/types
{{% /tab %}}
{{% tab "로그" %}}

`{{last_triggered_at_epoch}}` [템플릿 변수](#template-variables)를 사용하여 경보 시점에 발생한 모든 로그로 이동하는 링크를 제공합니다.

```text
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

로그 링크는 추가 파라미터로 사용자 지정할 수 있습니다. 가장 일반적인 예:

| 파라미터 | 정의               | 결정                             |
|-----------|----------------------------|----------------------------------------|
| `service` | `service=<SERVICE_NAME>`   | 특정 서비스의 로그 필터링.  |
| `host`    | `host=<HOST_NAME>`         | 특정 호스트의 로그 필터링      |
| `status`  | `status=<STATUS>`          | 로그의 상태: Error, Warn, Info 등 |


{{% /tab %}}
{{< /tabs >}}

### 주석 {#comments}

모니터 메시지에 주석을 포함하려면 다음 구문 사용:

```text
{{!-- this is a comment --}}
{{!-- this is a comment }}
```

### Raw 형식 {#raw-format}

경보 메시지가 중괄호 두 개, 예를 들어 `{{ <TEXT> }}`, use `{{{{raw}}}}` 형식을 보내야 하는 경우입니다. 예를 들면 다음과 같습니다.

```text
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

출력:

```text
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

[조건 변수](#conditional-variables)에 사용된 `^|#` 도우미는 `{{{{raw}}}}` formatting and must be removed. For instance, to output raw text with the `{{is_match}}` conditional variable use the following template:

```text
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

`host.name`이 `<HOST_NAME>`과 일치하면, 템플릿이 다음을 출력함:

```text
{{ .matched }} the host name
```

### URL 인코드 {#url-encode}

경보 메시지에 URL로 인코딩해야 하는 정보가 포함된 경우(예를 들어 리디렉션용으로) `{{ urlencode "<variable>"}}` 구문을 사용하세요.

**예**: 모니터 메시지에 특정 서비스로 필터링된 Software Catalog로 이동하는 URL이 포함된 경우, `service` [태그 변수](#attribute-and-tag-variables)를 사용하고 URL에 `{{ urlencode "<variable>"}}` 구문을 추가하세요.

```
https://app.datadoghq.com/services/{{urlencode "service.name"}}
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/configuration/#alert-grouping
[2]: /ko/monitors/types/log/
[3]: /ko/monitors/types/apm/?tab=analytics
[4]: /ko/monitors/types/real_user_monitoring/
[5]: /ko/monitors/types/ci/
[6]: /ko/monitors/types/database_monitoring/
[7]: /ko/monitors/guide/template-variable-evaluation/
[8]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[9]: /ko/monitors/types/error_tracking/
[10]: /ko/software_catalog/service_definitions/
[11]: https://docs.datadoghq.com/ko/software_catalog/service_definitions/v2-2/#example-yaml
[12]: /ko/monitors/types/log/
[13]: /ko/monitors/types/apm/?tab=analytics
[14]: /ko/monitors/types/error_tracking/
[15]: /ko/monitors/types/real_user_monitoring/
[16]: /ko/monitors/types/audit_trail/
[17]: /ko/monitors/types/ci/?tab=tests
[18]: /ko/monitors/types/ci/?tab=pipelines
[19]: /ko/monitors/types/database_monitoring/
[20]: /ko/synthetics/notifications/template_variables/