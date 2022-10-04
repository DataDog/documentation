---
further_reading:
- link: /security_platform/application_security/
  tag: 설명서
  text: Datadog Application Security Monitoring으로 위협 감지
- link: /security_platform/application_security/troubleshooting
  tag: 설명서
  text: 일반적인 Datadog Application Security Monitoring 문제의 트러블슈팅
kind: 설명서
title: 커스텀 탐지 규칙
---

## 개요

Application Security Monitoring(이하 "ASM")은 실전 시스템에 영향을 주는 공격 시도와 취약성 트리거를 포착하고자 준비된 [바로 사용 가능한 탐지 규칙][1] 세트를 갖추고 있습니다.

그러나 환경에 따라 규칙을 커스텀하고자 하는 경우도 있습니다. 예를 들어 SQL을 받고 결과를 반환하는 프리 프로덕션(사전 제작) 개발 루트에 대한 공격 시도를 검출하는 탐지 규칙을 커스텀하고자 하는 경우가 존재합니다. 이 루트는 내부 개발자만 접근 가능하므로 SQL 실행을 파악하려다 노이즈가 발생할 수 있습니다. 따라서 이러한 패턴을 제외하도록 탐지 규칙을 커스텀할 수 있습니다.

또, 내부 보안 스캐너를 제외하도록 규칙을 커스텀하는 사례도 생각해볼 수 있습니다. ASM은 예상한 그대로 활동을 탐지합니다. 그러나 정기적으로 발생하는 검사 알림을 받고 싶지 않는 경우도 존재합니다.

이러한 경우, 커스텀 탐지 규칙을 생성하여 해당 이벤트를 제외할 수 있습니다. 이번 가이드에서는 ASM의 커스텀 탐지 규칙을 생성하는 방법을 설명해드리겠습니다.

## 설정

 OOTB 탐지 규칙을 커스텀 설정하려면 먼저 기존 규칙을 복제해야 합니다. [Detection Rules][2]로 이동해 규칙을 선택하세요. 규칙 하단까지 스크롤을 내린 다음 Clone Rule 버튼을 클릭합니다. 이렇게 하면 기존 규칙을 수정할 수 있습니다.

### ASM 쿼리 정의

ASM 쿼리를 구성합니다. 예를 들어, SQL 수집(injection) 실행용 엔드포인트를 모니터링하는 쿼리(`@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`)를 작성하세요.

선택 사항으로 고유한 카운트와 시그널 그룹화(group-by)를 정의할 수 있습니다. 특정 기간 범위에서 속성에 대해 관측된 고유값의 수를 셉니다. 그룹화 정의에 따라 각 그룹화 값별로 시그널이 생성됩니다. 일반적으로 그룹으로 묶으면 하나의 객체(예: 사용자, IP 등의 엔티티)가 됩니다. 그룹화는 [쿼리를 병합](#joining-queries)하는 용도로도 활용됩니다.

Add Query 버튼을 눌러 쿼리를 추가할 수 있습니다.

##### 고급 옵션

**Advanced** 옵션을 클릭하면 **Only trigger a signal when:**(값이 충족되었을 때만 시그널을 트리거하는 쿼리), 또는 **Never trigger a signal when:**(값이 충족되었을 때 시그널을 절대 트리거하지 않는 쿼리)를 추가할 수 있습니다. 예를 들어 어떤 서비스가 시그널을 트리거하고 있으나 해당 액션은 양성으로 두고 서비스에서 시그널을 트리거하고 싶지 않은 경우, **Never trigger a signal when:** 옵션으로 `Service`를 제외한 로그를 생성하면 됩니다.

##### 쿼리의 병합

기간 내 쿼리를 병합하면 보안 시그널의 신뢰도와 중요도를 높일 수 있습니다. 예를 들어 성공한 공격 시도를 탐지하기 위해, 성공한 트리거와 실패한 트리거를 모두 서비스와 연계할 수 있습니다.

쿼리를 병합할 때는 `group by` 값을 사용합니다. `group by` 값은 일반적으로 객체(예: `IP address` 또는 `Service` 등의 엔티티)입니다만, 모든 속성을 지정할 수 있습니다.

예를 들면 동일한 `sql_injection` 동작을 검색하는 반대 쿼리를 만들고, 성공한 경우와 실패한 경우에 대하여 반대되는 HTTP 경로 쿼리를 추가할 수 있습니다.

쿼리 1: `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

쿼리 2: `@appsec.type:sql_injection @http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

이 경우, 병합된 쿼리는 기술적으로 동일한 속성값을 보유합니다. `group by` 값이 존재하지 않는다면 케이스에 부합하지 않습니다. 케이스에 부합하면 고유한 `group by` 값마다 보안 시그널이 생성됩니다.

### 규칙 케이스 설정

#### 트리거

`successful trigger > 0` 같은 규칙 케이스는 케이스 구문(case문)으로 평가됩니다. 따라서 최초로 부합한 케이스가 시그널을 발생시킵니다. 하나 또는 여러 개의 규칙 케이스를 작성하고, 옆에 있는 회색 영역을 클릭한 다음 드래그하여 순서를 변경할 수 있습니다.

규칙 케이스에는 과거에 정의된 쿼리 이벤트 개수를 기준으로 시그널을 생성해야 하는지 여부를 판단하는 논리 연산(`>, >=, &&, ||`)이 포함됩니다.

**참조**: 쿼리 라벨은 연산자보다 선행해야 합니다. 예를 들어, `a > 3`는 사용할 수 있지만 `3 < a`는 허용되지 않습니다.

각 규칙 케이스에 **이름**을 부여합니다. 시그널 생성 시 여기서 부여한 이름이 규칙 이름에 추가됩니다.

#### 중요도와 알림

시그널의 중요도를 설정합니다. 드롭다운에서 해당하는 중요도 수준(`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)을 선택할 수 있습니다.

"Notify" 섹션에서, 0 이상의 [알림 목표][3]를 설정하여 각 규칙 케이스에 적용합니다.

또한 [알림 규칙][4]을 작성해 개별 탐지 규칙에 적용할 알림 설정을 직접 편집하는 번거로움을 줄일 수 있습니다.

### 타임윈도우

`evaluation window`는 하나 이상의 케이스가 일치할 경우 지정되는 슬라이딩 윈도우이며, 실시간 평가가 이루어집니다.

시그널을 생성했을 때, `keep alive` 윈도우 내에서 케이스가 1회 이상 일치하는 경우 해당 시그널은 "오픈" 상태로 남습니다. 신규 이벤트가 케이스와 일치할 때마다 시그널의 *최종 업데이트* 타임스탬프가 갱신됩니다.

`maximum signal duration`에 도달하면 시그널은 쿼리 일치 여부와 관계 없이 "클로즈"됩니다. 이 시간은 최초로 기록된 타임스탬프를 기준으로 계산합니다.

**Add Case** 버튼을 클릭해 케이스를 추가할 수 있습니다.

**참조**: `evaluation window`는 `keep alive` 및 `maximum signal duration` 이하여야 합니다.

### Say what's happening

**규칙 이름** 섹션에서는 규칙 목록 화면에서 표시되는 규칙 이름과 시그널 타이틀을 설정할 수 있습니다.

알림 상자에는 동일하게 마크다운 및 미리보기 기능이 있습니다.

#### 템플릿 변수

탐지 규칙은 마크다운 알림 상자에서 템플릿 변수를 지원합니다. 템플릿 변수는 트레이스에서 보안 시그널과 관련 알림으로의 동적 컨텍스트 직접 수집(injection)을 가능하게 합니다.

템플릿 변수는 조사의 다음 단계를 위해 빠른 액세스를 지원하고자 Datadog나 파트너 포털로의 딥링크를 허용할 수 있습니다. 예시:

```text
* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

Epoch 템플릿 변수는 알림 내에서 인간이 독해 가능한 문자열이나 수학에 적합한 수치를 생성합니다. 예를 들면 함수 중 `first_seen`, `last_seen` 또는 `timestamp`(밀리초 단위)를 비롯한 값을 사용해 알림으로 독해 가능한 스트링을 수신할 수 있습니다. 예시:

```text
{{eval "first_seen_epoch-15*60*1000"}}
```

속성은 JSON 드롭다운의 시그널에서 볼 수 있으며 `{{@attribute}}` 구문으로 속성에 액세스할 수 있습니다. JSON의 도트 표기법(예: `{{@attribute.inner_key}}`)을 이용하면 이벤트 속성의 내부 키에 액세스할 수 있습니다.

**참조**: 보안 시그널에서 로우 JSON을 직접 복사할 수 있습니다. Signals Explorer에서 임의의 보안 시그널을 선택하면 자세한 내용이 표시됩니다. 이때 왼쪽 상단의 내보내기 버튼을 클릭한 후 **Copy raw JSON to clipboard**를 선택하세요.

이 JSON 객체(오브젝트)는 보안 시그널과 관련된 이벤트 속성의 예시입니다.

```json
{
  "attributes":{
    "title":"Security scanner detected",
    "http":{
      "url":"http://www.example.com"
    },
    "rule":{
      "detectionMethod":"threshold",
      "name":"Your rule name"
    },
    "events_matched":2,
    "first_seen":"2022-01-26T13:23:33.000Z",
    "last_seen":"2022-01-27T04:01:57.000Z"
  },
  "groupByPaths":[
    "service"
  ]
}
```

이 속성의 경우, “say what’s happening” 섹션의 다음 부분을 사용합니다.

```
Real routes targeted for {{@service}}.
```

이렇게 하면 수신하는 알림에 서비스 이름이 표시됩니다.

```
Real routes targeted for `your_service_name`.
```

또한, if-else 로직을 활용해 어떤 속성이 존재하며 표기되었는지 확인할 수도 있습니다.

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

또는 if-else 로직을 활용해 속성이 값과 일치하는지 살펴볼 수 있습니다.

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

시그널에 `attack:sql-injection-attempt` 등의 다양한 태그를 붙이세요.

**참조**: `security` 태그는 특수합니다. 이 태그는 보안 시그널 분류에 사용됩니다. `attack`, `threat-intel`, `compliance`, `anomaly`, `data-leak` 등 다른 태그를 사용하시길 권장합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/security_platform/default_rules/#cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /kr/monitors/notify/?tab=is_alert#integrations
[4]: /kr/security_platform/notification_rules/