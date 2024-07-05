---
description: 변수를 사용하여 모니터 알림 사용자 지정
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림
- link: /monitors/manage/
  tag: 설명서
  text: 모니터 관리
title: 변수
---

알림 메시지에서 변수를 사용하여 조건부 메시지를 표시하고 [조건 변수](#conditional-variables)를 사용하여 다른 팀에 알림을 전달하거나, [속성 및 태그 변수](#attribute-and-tag-variables) 및 [템플릿 변수](#template-variables)를 사용하여 콘텐츠를 보강합니다. 

## 조건 변수

조건 변수는 `if-else` 논리를 사용하여 모니터의 상태 및 트리거된 방법에 대한 세부 정보에 따라 다른 메시지를 표시합니다. 이러한 변수는 알림 메시지의 제목 또는 본문 내에서 사용할 수 있습니다.

다음 조건 변수를 사용할 수 있습니다:

| 조건 변수       | 다음과 같은 경우 텍스트가 표시됩니다                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | 모니터 경보가 표시됩니다                                                 |
| `{{^is_alert}}`            | 모니터 경보가 표시되지 않습니다                                         |
| `{{#is_match}}`            | 컨텍스트가 제공된 하위 문자열과 일치합니다                         |
| `{{^is_match}}`            | 컨텍스트가 제공된 하위 문자열과 일치하지 않습니다                   |
| `{{#is_exact_match}}`      | 컨텍스트가 제공된 문자열과 완전히 일치합니다                    |
| `{{^is_exact_match}}`      | 컨텍스트가 제공된 문자열와 완전히 일치하지 않습니다              |
| `{{#is_no_data}}`          | 누락된 데이터에 대해 모니터가 작동됩니다                          |
| `{{^is_no_data}}`          | 누락된 데이터에 대해 모니터가 작동하지 않습니다                       |
| `{{#is_warning}}`          | 모니터가 경고를 표시합니다                                                   |
| `{{^is_warning}}`          | 모니터가 경고를 표시하지 않습니다                                           |
| `{{#is_recovery}}`         | 모니터가 `ALERT`, `WARNING`, 또는 `NO DATA`에서 복구됩니다.          |
| `{{^is_recovery}}`         | 모니터가 `ALERT`, `WARNING` 또는 `NO DATA`에서 복구되지 않습니다  |
| `{{#is_warning_recovery}}` | 모니터가 `WARNING`에서 `OK`로 복구됩니다                        |
| `{{^is_warning_recovery}}` | 모니터가 `WARNING`에서 `OK`로 복구되지 않습니다                 |
| `{{#is_alert_recovery}}`   | 모니터가 `ALERT`에서 `OK`로 복구됩니다                           |
| `{{^is_alert_recovery}}`   | 모니터가 `ALERT`에서 `OK`로 복구되지 않습니다                    |
| `{{#is_alert_to_warning}}` | 모니터가 `ALERT`에서 `WARNING`로 전환됩니다                   |
| `{{^is_alert_to_warning}}` | 모니터가 `ALERT`에서 `WARNING`로 전환되지 않습니다           |
| `{{#is_no_data_recovery}}` | 모니터가 `NO DATA`에서 복구됩니다                                |
| `{{^is_no_data_recovery}}` | 모니터가 `NO DATA`에서 복구되지 않습니다                        |
| `{{#is_priority 'value'}}` | 모니터의 우선 순위는 `value`입니다. 값 범위는 `P1`에서 `P5`까지입니다   |
| `{{#is_unknown}}`          | 모니터가 알 수 없는 상태입니다                                |
| `{{^is_unknown}}`          | 모니터가 알 수 없는 상태가 아닙니다                            |
| `{{#is_renotify}}`         | 모니터 알림이 재시작합니다                                          |
| `{{^is_renotify}}`         | 모니터 알림이 재시작하지 않습니다.                                    |

### 예시

조건 변수는 텍스트로 시작과 끝을 페어 지정하고, 그 사이에 **@-notifications**가 있어야 합니다. 

{{< tabs >}}
{{% tab "is_alert" %}}

모니터 경보 시, 알림 메시지를 보내려면 다음 형식을 사용하세요.

```text
{{#is_alert}}
  <ALERT_MESSAGE_TEXT>  <@-NOTIFICATION>
{{/is_alert}}
```

{{% /tab %}}
{{% tab "is_warning" %}}

모니터 경고 시, 알림 메시지를 보내려면 다음 형식을 사용하세요.

```text
{{#is_warning}}
  <WARNING_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_warning}}
```

{{% /tab %}}
{{% tab "is_recovery" %}}

모니터가 복구 시, 알림 메시지를 보내려면 다음 형식을 사용하세요.

```text
{{#is_recovery}}
  <RECOVERY_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_recovery}}
```

{{% /tab %}}
{{% tab "is_match" %}}

다음 형식으로 [태그 변수](#attribute-and-tag-variables)에서 하위 문자열을 검색합니다:

```text
{{#is_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is included in <TAG_VARIABLE>.
{{/is_match}}
```

트리거 호스트에 태그 `role:db_cassandra` 또는 `role:db_postgres`가 있는 경우 DB 팀에 알리려면 다음을 사용하세요.

```text
{{#is_match "role.name" "db"}}
  경보를 트리거하는 호스트의 역할 이름에 `db`가 포함된 경우 표시됩니다
  @db-team@company.com
{{/is_match}}
```

`is_match` 조건은 일치하는 여러 문자열도 지원합니다.

```text
{{#is_match "role.name" "db" "database"}}
  경보를 트리거하는 호스트의 역할 이름에  `db` 또는 `database`가 포함된 경우 표시됩니다
  @db-team@company.com
{{/is_match}}
```

태그에 `db`가 포함되지 않은 경우 다른 알림을 보내려면, 다음과 같이 조건의 부정을 사용합니다:

```text
{{^is_match "role.name" "db"}}
  역할 태그에 `db`가 포함되지 않은 경우 표시됩니다.
  @slack-example
{{/is_match}}
```

또는 첫 번째 예시의 `{{else}}`파라미터를 사용합니다:

```text
{{#is_match "role.name" "db"}}
  경보를 트리거하는 호스트의 역할 이름에 `db`가 포함된 경우 표시됩니다
  @db-team@company.com
{{else}}
  역할 태그에 `db`가 포함되지 않은 경우 표시됩니다.
  @slack-example
{{/is_match}}
```

**참고**: `<TAG_VARIABLE>`가 공백이 **아닌지** 확인하려면, `<COMPARISON_STRING>`에 빈 문자열을 사용하세요.

{{% /tab %}}
{{% tab "is_exact_match" %}}

[태그 변수](#attribute-and-tag-variables)에서 다음 형식으로 정확한 문자열을 검색합니다.

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  <COMPARISON_STRING>이 정확히 <TAG_VARIABLE>인 경우 표시됩니다.
{{/is_exact_match}}
```

트리거 호스트에 `production`이름이 있는 경우 개발 팀에 알리려면, 다음을 사용하세요.

```text
{{#is_exact_match "host.name" "production"}}
  경보를 트리거한 호스트의 이름이 프로덕션이라고 정확히 기재된 경우 표시됩니다. 
  @dev-team@company.com
{{/is_exact_match}}
```

`is_exact_match` 조건은 일치하는 여러 문자열도 지원합니다.

```text
{{#is_exact_match "host.name" "production" "staging"}}
  알림을 트리거한 호스트의 이름이 정확하게 프로덕션 또는 스테이징인지 표시됩니다
  @dev-team@company.com
{{/is_exact_match}}
```

`is_exact_match` 조건 변수는 [`{{value}}` 템플릿 변수](#template-variables)도 지원합니다.

```text
{{#is_exact_match "value" "<VALUE>"}}
  모니터의 기준치를 위반한 값이 정확히 <VALUE>가 맞는지 표시합니다.
{{/is_exact_match}}
```

모니터 기준치를 위반한 값이 5인 경우, 개발 팀에 알리려면 다음을 사용하세요.

```text
{{#is_exact_match "value" "5"}}
  모니터의 기준치를 위반한 값이 5인 경우 표시됩니다. @dev-team@company.com
{{/is_exact_match}}
```

{{% /tab %}}
{{% tab "is_renotify" %}}

`production` 환경에 대해서만 에스컬레이션 메시지를 다른 곳으로 보내려면

```text
{{#is_renotify}}
{{#is_match "env" "production"}}
  @dev-team@company.com으로 전송된 에스컬레이션 메시지입니다
{{/is_match}}
{{/is_renotify}}
```

원본 메시지의 세부 정보가 포함되지 않은 다른 에스컬레이션 메시지를 보내려면, `{{^is_renotify}}` 및 `{{#is_renotify}}` 블록 콤비네이션을 사용합니다:

```text
{{^is_renotify}}
해당 모니터는 경고하고, 첫 번째 메시지를 보냅니다 @dev-team@company.com

해당 모니터를 해결하려면 다음 단계를 따라하세요:
1. 여기로 이동
2. 이것을 실행
{{/is_renotify}}

이 부분은 일반적인 메시지이며 첫 번째 트리거와 에스컬레이션에 대해 모두 전송됩니다.

{{#is_renotify}}
  이 부분은 에스컬레이션 메시지 입니다 @dev-team@company.com
{{/is_renotify}}

```

모니터 재알림 시, 사용자는 다음 에스컬레이션 메시지를 받게 됩니다. 

```
이 부분은 일반적인 메시지이며, 첫 번째 트리거와 에스컬레이션에 대해 모두 전송됩니다.

이 부분은 에스컬레이션 메시지입니다 @dev-team@company.com
```

{{% /tab %}}
{{< /tabs >}}

**@-notifications** 핸들을 통해 `alert` 또는 `warning` 조건으로 상태 전환하기 위해 조건 블록을 설정하는 경우, 복구 알림이 핸들로 전송되도록 해당 `recovery` 조건을 설정하는 것을 권장합니다.

**참고**: 구성된 조건 변수 **외부에** 배치된 모든 텍스트 또는 알림 핸들은 모든 모니터 상태 전환 시 호출됩니다. 설정된 조건 변수 **내부**에 배치된 모든 텍스트 또는 알림 핸들은 모니터 상태 전환이 해당 조건과 일치하는 경우에만 적용됩니다.

## 속성 및 태그 변수

속성 및 태그 변수를 사용하여 사용자 정의된 유익하며 구체적인 경보 메시지를 렌더링함으로써 사람들이 경보의 성격을 빠르게 이해할 수 있도록 지원합니다.

### 다중 경보 변수

다중 경보 그룹 상자에서 선택한 특성을 기반으로 [다중 경보 모니터][1]에서 다중 경보 변수를 설정합니다. 각 경보의 특성별 그룹과 연계된 값을 동적으로 포함하도록 알림을 보강합니다.

{{< tabs >}}
{{% tab "Group by tag" %}}

메트릭에`key:value` 구문을 따르는 태그가 지정되고 모니터 쿼리가 이 태그에 따라 그룹 지정되는 경우, 다음 변수를 사용합니다:

```text
{{ key.name }}
```

그러면 각 경보 알림이 `key`와 관련되어`value`를 렌더링합니다. 그룹이 동일한 `key`와 관련된 이 `values`으로  태그되면 경보 메시지는 모든 값의 쉼표로 구분된 문자열을 사전식 순서로 렌더링합니다.

**예시**: 모니터가 각`env`에 대한 경보를 트리거하는 경우, 알림 메시지에서 `{{env.name}}` 변수를 사용할 수 있습니다.

{{< img src="monitors/notifications/multi_alert_variable.png" alt="Multi alert variable syntax" style="width:90%;">}}

#### 호스트에 따른 쿼리 그룹

모니터가 각 `host`에 대한 경보를 트리거하면, 태그 변수 `{{host.name}}` 및 `{{host.ip}}`, 호스트에서 사용 가능한 모든 호스트 태그를 사용할 수 있습니다. 선택한 태그에 따른 태그 변수 목록을 보려면 **Say what's happening** 섹션에서 **메시지 템플릿 변수 사용**을 클릭합니다.

몇 가지 특정 호스트 메타데이터 변수를 사용할 수 있습니다.

- 에이전트 버전: `{{host.metadata_agent_version}}`
- 머신: `{{host.metadata_machine}}`
- 플렛폼: `{{host.metadata_platform}}`
- 프로세서: `{{host.metadata_processor}}`

#### 마침표가 있는 태그 키

태그의 키에 마침표가 있으면, 태그 변수를 사용할 때 전체 키를 괄호로 포함시킵니다.
예를 들어 태그가 `dot.key.test:five`이고 모니터가 `dot.key.test`로 그룹 지정된 경우 다음을 사용합니다.

```text
{{[dot.key.test].name}}
```

태그가 이벤트에 있고 이벤트 모니터를 사용 중인 경우, 다음을 사용합니다.

```text
{{ event.tags.[dot.key.test] }}
```

{{< /tabs >}}

{{% tab "Group by facet" %}}

모니터가 패싯에 따라 그룹 지정된 경우, 로그 모니터, 트레이스 분석 모니터, RUM 모니터 및 이벤트 모니터는 패싯을 변수로 사용할 수 있습니다. 로그 모니터링이 `@facet_key`로 그룹 지정된 경우 다음 변수를 사용합니다.

 

```text
{{ @facet_key.name }}
```

**예시**: 다중 경보 로그 모니터링 그룹에 `@machine_id` 그룹의 특정 정보를 포함하려면

```text
해당 경보가 트리거되었습니다 {{ @machine_id.name }}
```

패싯에 마침표가 있는 경우, 패싯 주위에 괄호를 사용하세요, 예를 들면 다음과 같습니다.

```text
{{ [@network.client.ip].name }}
```

{{% /tab %}}
{{< /tabs >}}

### 일치하는 속성/태그 변수

_[로그 모니터][2], [트레이스 분석 모니터][3] (애플리케이션 성능 모니터링(APM)), [RUM 모니터][4], [CI 모니터][5]에서 사용가능_

로그, 트레이스 스팬(span), RUM 이벤트, CI 파이프라인 또는 모니터 쿼리와 일치하는 CI 테스트 이벤트의 **모든** 속성 또는 태그를 포함하려면 다음 변수를 사용합니다.

| 모니터 종류     | 변수 구문                                  |
|-----------------|--------------------------------------------------|
| 로그             | `{{log.attributes.key}}` 또는 `{{log.tags.key}}`   |
| 트레이스 분석 | `{{span.attributes.key}}` 또는 `{{span.tags.key}}` |
| RUM             | `{{rum.attributes.key}}` 또는 `{{rum.tags.key}}`   |
| CI 파이프라인     | `{{cipipeline.attributes.key}}`                  |
| CI 테스트          | `{{citest.attributes.key}}`                      |

모든 `key:value` 페어에 대해 `{{log.tags.key}}` 변수는 경보 메시지의 `value`에 렌더링됩니다.

**예시**: 로그 모니터링이 `@http.status_code`에 따라 그룹 지정된 경우, 알림 메시지에 오류 메시지 또는 인프라스트럭처 태그를 포함하려면 다음 변수를 사용하세요.

```text
{{ log.attributes.[error.message] }}
{{ log.tags.env }}
...
```

{{< img src="monitors/notifications/tag_attribute_variables.png" alt="Matching attribute variable syntax" style="width:90%;">}}

메시지는 **속성이 있는 경우** 쿼리와 일치하는 선택된 로그의 `error.message` 속성을 렌더링합니다.

<div class="alert alert-info"><strong>참고</strong>: 선택한 이벤트에 속성 또는 태그 키가 포함되어 있지 않으면, 알림 메시지에서 변수가 비어 있는 것으로 렌더링합니다. 알림을 놓치지 않으려면,  <code>{{#is_match}}</code> 핸들이  포함된 라우팅 알림에 이러한 변수를 사용하지 마세요.</div>

모니터가 쿼리에서 수식 및 기능/함수를 사용하는 경우, 값은 첫 번째 쿼리에서 추출된 이벤트로 결정합니다.

#### 예약 속성

로그, 스팬(span) 그리고 RUM 이벤트는 다음 구문을 통해 변수에서 사용할 수 있는 일반 예약 속성이 있습니다.

| 모니터 종류     | 변수 구문   | 1단계 속성 |
|-----------------|-------------------|------------------------|
| 로그             | `{{log.key}}`     | `message`, `service`, `status`, `source`, `span_id`, `timestamp`, `trace_id` |
| 트레이스 분석 | `{{span.key}}`    | `env`, `operation_name`, `resource_name`, `service`, `status`, `span_id`, `timestamp`, `trace_id`, `type` |
| RUM             | `{{rum.key}}`     | `service`, `status`, `timestamp` |

일치하는 이벤트의 정의에 속성이 포함되어 있지 않으면, 변수가 빈 상태로 렌더링됩니다.

#### 탐색기 링크

`{{log.link}}`, `{{span.link}}` 및 `{{rum.link}}`를 사용하여 쿼리와 일치하는 이벤트 범위의 로그 탐색기, 트레이스 탐색기 또는 RUM 탐색기에 대한 링크로 알림을 보강합니다.

### 모니터 변수 확인

모니터 점검 변수(커스텀 점검 및 통합 점검)에 `{{check_message}}` 변수를 사용할 수 있으며 커스텀 점검 또는 통합 점검에 지정된 특정 메시지를 렌더링합니다.

### 컴포짓(composite) 모니터 변수

컴포짓(composite) 모니터는 경보가 트리거될 때 하위 모니터와 연관된 값과 상태에 접근할 수 있습니다.

예를 들어, 컴포짓(composite) 모니터에 하위 모니터 `a`가 있는 경우, `a`의 값을 다음에 포함할 수 있습니다.

```text
{{ a.value }}
```

하위 모니터 `a`의 상태를 검색하려면 다음을 사용하세요.

```text
{{ a.status }}
```

가능한 상태의 값은 `OK`, `Alert`, `Warn` 및 `No Data` 입니다.

컴포짓(composite) 모니터는 기본 모니터와 동일한 방식으로 태그 변수도 지원합니다. 기본 모니터가 동일한 태그/패싯으로 그룹 지정되면, 다른 모니터와 동일한 형식을 따릅니다.

### 이스케이프 문자

변수 콘텐츠는 기본적으로 이스케이프 처리됩니다. JSON 또는 코드와 같은 콘텐츠가 이스케이프되는 것을 방지하려면 이중 중괄호 대신 삼중 중괄호를 사용합니다. 예를 들면 다음`{{{event.text}}}`과 같습니다.

## 템플릿 변수

템플릿 변수를 사용하여 모니터 알림을 사용자 정의합니다. 기본 제공 변수는 다음과 같습니다.

| 변수                       | 설명                                                                   |
|--------------------------------|-------------------------------------------------------------------------------|
| `{{value}}`                    | 메트릭 기반 쿼리 모니터에 대한 경보를 위반한 값입니다.            |
| `{{threshold}}`                | 모니터의 경보 조건에 설정된 경보 임계값입니다.       |
| `{{warn_threshold}}`           | 모니터의 경보 조건에 설정된 경고 임계값입니다.     |
| `{{ok_threshold}}`             | 서비스 점검 모니터를 복구한 값입니다.                            |
| `{{comparator}}`               | 모니터의 경보 조건에 설정된 관계 값입니다.                   |
| `{{first_triggered_at}}`       | 모니터가 처음 트리거된 UTC 날짜 및 시간입니다.                       |
| `{{first_triggered_at_epoch}}` | 모니터가 에포크 밀리초 단위로 처음 트리거된 UTC 날짜 및 시간입니다. |
| `{{last_triggered_at}}`        | 모니터가 마지막으로 트리거된 UTC 날짜 및 시간입니다.                        |
| `{{last_triggered_at_epoch}}`  | 모니터가 에포크 밀리초 단위로 마지막으로 트리거된 UTC 날짜 및 시간입니다.  |
| `{{triggered_duration_sec}}`   | 모니터가 트리거된 상태에 있었던 초단위 시간입니다.              |

### 평가

숫자 값을 반환하는 템플릿 변수는 값에 대한 수학적 연산 또는 서식 변경을 수행할 수 있는 연산 및 기능/함수를 지원합니다. 자세한 내용은 [템플릿 변수 평가][6]를 참고하세요.

### 현지 시간

알림에 `local_time` 기능/함수를 사용하여 선택한 시간대의 알림에 다른 날짜를 추가하세요. 이 기능/함수는 날짜를 현지 시간으로 변환합니다. `{{local_time 'time_variable' 'timezone'}}`.
예를 들어, 알림의 도쿄 시간대에서 모니터의 마지막 트리거 시간을 추가하려면, 알림 메시지에 다음을 포함합니다.

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

결과는 ISO 8601 형식으로 표시됩니다. `yyyy-MM-dd HH:mm:ss±HH:mm`, 예를 들어 `2021-05-31 23:43:27+09:00` 형식입니다.
사용 가능한 시간대 값 목록을 보려면 [tz 데이터베이스 시간대 목록][7], 특히 TZ 데이터베이스 이름 열을 참고하세요.

## 고급

### 다이나믹 핸들

[태그 변수](#attribute-and-tag-variables)를 사용하여 알림 핸들을 동적으로 만들고 모니터에서 감지한 문제 유형에 따라 올바른 팀 또는 서비스로 알림을 라우팅합니다.

**예시**: 모니터가 메트릭을 쿼리하고 `service` 태그에 따라 그룹 지정하는 경우, 실패한 서비스에 따라 다른 슬랙 채널로 알림을 라우팅할 수 있습니다.

```text
@slack-{{service.name}} 현재 {{service.name}}에 문제가 있습니다.
```

`service:ad-server` 그룹에서 모니터의 실패가 시작되면, 다음 콘텐츠가 포함된 알림이 `#ad-server` 슬랙 채널로 전송됩니다.

```text
@slack-ad-server 에드-서버에 현재 문제가 있습니다.
```

### 다이나믹 링크

[태그 변수](#attribute-and-tag-variables)를 사용하여 팀을 적절한 리소스에 연결하는 동적 URL을 만들어 활성화합니다. 예를 들어, 대시보드, 호스트 맵 및 모니터와 같은 Datadog 내 페이지에 대한 링크를 제공할 수 있습니다.

{{< tabs >}}
{{% tab "Dashboards" %}}

[태그 변수](#attribute-and-tag-variables)를 사용하여 시스템 대시보드에 대한 링크를 제공합니다.

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

`{{host.name}}` [태그 변수](#attribute-and-tag-variables) 및 `<INTEGRATION_NAME>` 사용을 통해 통합 대시보드 링크를 제공합니다.

```text
https://app.datadoghq.com/dash/integration/<INTEGRATION_NAME>?tpl_var_scope=host:{{host.name}}
```

`{{last_triggered_at_epoch}}` [템플릿 변수](#template-variables), `<DASHBOARD_ID>` 및`<DASHBOARD_NAME>` 사용을 통해 알림 시 상대적 시간 범위가 포함된 대시보드에 연결합니다.

```text
https://app.datadoghq.com/dashboard/<DASHBOARD_ID>/<DASHBOARD_NAME>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

{{% /tab %}}
{{% tab "Host map" %}}

`{{service.name}}`등 [태그 변수](#attribute-and-tag-variables)를 사용하여 호스트 맵에 대한 링크를 제공합니다.

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

호스트 맵 링크는 추가 파라미터로 사용자 정의할 수 있습니다. 가장 일반적인 경우는 다음과 같습니다.

| 파라미터 | 정의               | 측정                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<METRIC_NAME>` | 육각형 호스트의 채우기 색상. |
| `groupby` | `groupby=<TAG_KEY>`        | 육각형 호스트를 위한 그룹.        |
| `sizeby`  | `sizeby=avg:<METRIC_NAME>` | 육각형 호스트의 크기.       |

{{% /tab %}}
{{% tab "모니터링" %}}

[`{{host.name}}` 태그 변수](#attribute-and-tag-variables)를 사용하여 특정 호스트와 관련된 모든 모니터에 대한 링크를 제공합니다.

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

모니터 링크는 추가 파라미터로 사용자 정의할 수 있습니다. 가장 일반적인 경우는 다음과 같습니다.

| 파라미터 | 예시        | 디스플레이                                                                         |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | 경보 상태의 모니터(추가 상태: `WARN`, `NO DATA` 및 `OK`)   |
| `muted`   | `muted: true`  | 음소거된 모니터(음소거되지 않은 모니터에 `false`사용)                             |
| `type`    | `type:log`     | 로그 모니터 (다른 [모니터링 유형][1] 보기)                                     |



[1]: /ko/monitors/types
{{% /tab %}}
{{% tab "Logs" %}}

`{{last_triggered_at_epoch}}` [템플릿 변수](#template-variables)를 사용하여 알림 시 발생하는 모든 로그에 대한 링크를 제공합니다.

```text
https://app.datadoghq.com/logs>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

로그 링크는 추가 파라미터로 사용자 정의할 수 있습니다. 가장 일반적인 경우는 다음과 같습니다.

| 파라미터 | 정의               | 측정                             |
|-----------|----------------------------|----------------------------------------|
| `service` | `service=<SERVICE_NAME>`   | 특정 서비스의 로그를 필터링합니다.  |
| `host`    | `host=<HOST_NAME>`         | 특정 호스트의 로그 필터링      |
| `status`  | `status=<STATUS>`          | 로그 상태: 오류, 경고, 정보 등 |


{{% /tab %}}
{{< /tabs >}}

### 코멘트

모니터 편집 화면에만 표시되는 모니터 메시지에 코멘트를 포함하려면, 다음 구문을 사용하세요.

```text
{{!-- this is a comment --}}
```

### Raw 형식

경보 메시지가 `{{ <TEXT> }}`와 같은 이중 중괄호를 보내야 하는 경우, `{{{{raw}}}}`형식을 사용하세요. 예를 들면, 다음과 같습니다.

```text
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

출력 (아웃풋):

```text
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

[조건 변수](#conditional-variables)에 사용된 `^|#` 도우미는 `{{{{raw}}}}` 서식 지정과 함께 사용할 수 없으며 제거해야 합니다. 예를 들어, `{{is_match}}` 조건 변수를 사용하여 raw 텍스트를 출력하려면 다음 템플릿을 사용합니다:

```text
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

`host.name`이 `<HOST_NAME>`에 일치하는 경우, 템플릿은 다음을 출력합니다:

```text
{{ .matched }} the host name
```

### URL 인코드

경보 메시지에 URL로 인코딩해야 하는 정보(예: 리디렉션)가 포함된 경우, `{{ urlencode "<variable>"}}` 구문을 사용하세요. 

**예시**: 모니터 메시지에 특정 서비스로 필터링된 애플리케이션 성능 모니터링(APM) 서비스 페이지에 대한 URL이 포함된 경우, `service` [태그 변수](#attribute-and-tag-variables)를 사용하고 URL에 `{{ urlencode "<variable>"}}`구문을 추가합니다.

```
https://app.datadoghq.com/apm/services/{{urlencode "service.name"}}
```

[1]: /ko/monitors/configuration/#alert-grouping
[2]: /ko/monitors/types/log/
[3]: /ko/monitors/types/apm/?tab=analytics
[4]: /ko/monitors/types/real_user_monitoring/
[5]: /ko/monitors/types/ci/
[6]: /ko/monitors/guide/template-variable-evaluation/
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones