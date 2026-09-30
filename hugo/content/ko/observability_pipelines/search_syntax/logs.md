---
aliases:
- /ko/observability_pipelines/search_syntax/
code_lang: logs
description: Observability Pipelines 프로세서 필터 쿼리에 로그 검색 구문을 사용하는 방법을 알아보세요.
disable_toc: false
title: 로그 검색 구문
type: multi-code-lang
weight: 1
---
## 개요 {#overview}

파이프라인에 프로세서를 추가할 때 로그를 필터링하여 정의된 하위 집합만 처리할 수 있습니다. 이 문서에서는 다음 정보를 다룹니다.

- [프리 텍스트 검색](#free-text-search): `message` 필드를 검색하는 데 사용됩니다.
- [속성 검색](#attribute-search):  속성 키와 값을 검색하는 데 사용됩니다.
- [배열](#arrays):  중첩된 값의 배열 내에서 검색하는 데 사용됩니다.
- [불리언 연산자](#boolean-operators)
- [이스케이프해야 하는 특수 문자 및 공백](#escape-special-characters-and-spaces)
- [Wildcards](#wildcards)

**참고**: Worker 버전 2.11 이상에서는 업그레이드된 검색 구문을 사용합니다. Worker를 버전 2.11로 업그레이드한 후, 새로운 구문에 맞게 필터 쿼리를 업데이트해야 할 수도 있습니다. 자세한 내용은 [필터 쿼리를 새 검색 구문으로 업그레이드][1]를 참조하세요.

## 검색 구문 {#search-syntax}

사용할 수 있는 필터 쿼리 유형은 두 가지입니다.

- [프리 텍스트](#free-text-search)
- [Attribute](#attribute-search)

### 프리 텍스트 검색 {#free-text-search}

프리 텍스트 검색은 `message` 필드만 검색하며 대소문자를 구분하지 않습니다. 이는 용어와 연산자로 구성됩니다. 용어에는 다음과 같은 두 가지 유형이 있습니다.

- 단일 용어는 `test` 또는 `hello`와 같은 한 단어입니다.
- 시퀀스는 `"hello dolly"`와 같이 큰따옴표로 묶인 단어의 그룹입니다.

다음은 프리 텍스트 검색 예시입니다.

`hello`
: 정확한 문자열 `hello`를 검색합니다. 예를 들어, `{"message": "hello world"}`는 일치하는 로그입니다.

`Hello world`
: `hello`와 `world`를 검색합니다. 예를 들어, `"hello beautiful world"`는 일치 항목입니다.
: 이 쿼리는 `Hello AND world`로 작성할 수도 있습니다.
: **참고**: 메시지에 `hello`와 `world`가 모두 포함되어야 일치합니다.

`"hello world"`
: 단어 시퀀스를 검색합니다. 예를 들어, `"hello world"`, `"hello-world"` 및 `"Hello, world"`는 모두 일치 항목입니다.

### 속성 검색 {#attribute-search}

속성 키와 값을 검색할 수 있습니다. 예를 들어, 속성 키가 `url`이고 `url` 값 `www.datadoghq.com`으로 필터링하려면 : `url:www.datadoghq.com`을 입력하세요.

**참고**: 속성 검색은 대소문자를 구분합니다.

#### 특정 속성 키가 있는 이벤트 필터링 {#filter-for-events-with-a-specific-attribute-key}

특정 속성 키가 있는 이벤트를 필터링하려면 `_exists_` 구문을 사용하세요. 예를 들어, `_exists_:service` 쿼리를 사용하면 `{"service": "postgres"}` 이벤트는 쿼리와 일치하지만 `{"env": "prod"}` 이벤트는 일치하지 않습니다.

#### 특정 속성 키가 없는 이벤트 필터링 {#filter-for-events-that-do-not-have-a-specific-attribute-key}

특정 속성 키가 없는 이벤트를 필터링하려면 `_missing_` 구문을 사용하세요. 예를 들어, `_missing_:service` 쿼리를 사용하면 `{"env": "prod"}` 이벤트는 쿼리와 일치하지만 `{"service": "postgres"}` 이벤트는 일치하지 않습니다.

#### 속성 검색 구문 예시 {#attribute-search-syntax-examples}

다음은 몇 가지 속성 검색 구문 예시와 해당 구문과 일치하는 로그입니다.

`status:ok service:flask-web-app`
: `flask-web-app` 서비스에서 상태가 `ok`인 로그와 일치합니다.
: 이 쿼리는 `status:ok AND service:flask-web-app`으로도 작성할 수 있습니다.

`user.status:inactive`
: `user` 속성 아래에 중첩된 상태가 `inactive`인 로그와 일치합니다.

`http.url:/api-v1/*`
: `http.url` 속성에 `/api-v1/`로 시작하는 값이 포함된 로그와 일치합니다.

`http.status:[200 TO 299]`
: `http.status` 값이 `200` 이상이고 `299` 이하인 로그와 일치합니다.
: **참고**:<br>- `[..]` 대괄호는 범위에 경계값이 포함됨을 의미합니다.<br>- 범위는 모든 속성에서 사용할 수 있습니다.

`http.status:{200 TO 299}`
: `http.status` 값이 `200`보다 크거나 `299`보다 작은 로그와 일치합니다.
: **참고**:<br>- `{..}` 중괄호는 범위에서 경계값이 제외됨을 의미합니다.<br>- 범위는 모든 속성에서 사용할 수 있습니다.

`http.status_code:[200 TO 299] http.url_details.path:/api-v1/*`
: 다음을 모두 포함하는 로그와 일치합니다.<br>- `http.status_code` 값이 `200` 이상이고 `299`<br> 이하임- `http.url_details.path` 속성의 값이 `/api-v1/`로 시작함

`"service.status":disabled`
: `"service.status": "disabled"`를 포함하는 로그와 일치합니다. 이 필터 구문은 속성 키에서 리터럴 `.`을 검색합니다.
: 자세한 내용은 [경로 표기법](#path-notation)을 참조하세요.

`_exists_:service`
: 속성 키 `service`가 있는 로그와 일치합니다. 예를 들어, 이 쿼리는 `{"service": "postgres"}`와 일치하지만 `{"env": "prod"}`와는 일치하지 않습니다.

`_missing_:service`
: 속성 키 `service`가 없는 로그와 일치합니다. 예를 들어, 이 쿼리는 `{"env": "prod"}`와 일치하지만 `{"service": "postgres"}`와는 일치하지 않습니다.

#### 경로 표기법 {#path-notation}

{{% observability_pipelines/path_notation %}}

쿼리가 속성 키에서 리터럴 `.`을 검색하도록 하려면 검색 쿼리에서 키를 이스케이프된 따옴표로 감싸세요. 예를 들어, 검색 쿼리 `"service.status":disabled`는 이벤트 `{"service.status": "disabled"}`와 일치합니다.

#### `ddsource` 및 `ddtags` {#ddsource-and-ddtags}

Datadog Agent, Datadog Lambda Forwarder 및 Datadog Lambda Extension 소스는 `ddsource`와`ddtags`로 태그가 지정된 로그와 메트릭을 전송하며, `source`와 `tags`로는 전송하지 않습니다. 이러한 소스에서 발생하는 이벤트에 대한 프로세서 쿼리나 필터를 정의할 때는 대신 `ddsource`와 `ddtags`를 사용하세요.

### 배열 {#arrays}

다음 예시에서 Windows용 CloudWatch 로그에는 `Event.EventData.Data` 아래에 JSON 객체 배열이 포함됩니다.

```
Event
{
EventData {
    Data [
        {"Name":"SubjectUserID1", "value":"12345"},
        {"Name":"SubjectUserID2", "value":"Admin"},
        {"Name":"ObjectServer", "value":"Security"}
	]
    }
}
```

필터 쿼리 `Event.EventData.Data.Name:ObjectServer`를 사용하는 경우, 위 로그 이벤트는 속성 키 `Name`과 값 `ObjectServer`를 가진 중첩 객체를 포함하므로 일치합니다.

### 불리언 연산자 {#boolean-operators}

검색 쿼리에서 여러 용어를 결합하려면 다음 대소문자를 구분하는 불리언 연산자를 사용할 수 있습니다.

| 연산자     | 설명                                            |
|--------------|--------------------------------------------------------|
| `AND`        | 교집합: 두 용어가 모두 이벤트에 포함됩니다.             |
| `OR`         | 합집합: 두 용어 중 하나가 이벤트에 포함됩니다.          |
| `-` 또는 `NOT` | 제외: 뒤에 오는 용어가 이벤트에 **포함되지** 않습니다. |

다음은 불리언 연산자를 사용하는 쿼리 예시입니다.

`NOT (status:debug)`
: 상태가 `DEBUG`가 아닌 로그와 일치합니다.

`host:COMP-A9JNGYK OR host:COMP-J58KAS`
: 해당 특정 호스트의 로그와만 일치합니다.

`Hello AND World`
: `hello`와 `world`를 검색합니다. 예를 들어, `"hello beautiful world"`는 일치 항목입니다.
: 이 쿼리는 : `Hello world`로 작성할 수도 있습니다.
: **참고**: 메시지에 `hello`와 `world`가 모두 포함되어야 일치합니다.

`hello AND status:info`
: 메시지 필드에 `hello`가 포함되어 있고 `status:info`가 있는 로그와 일치합니다.

`-http.status_code:200`
: http.status_code가 200이 아닌 로그와 일치합니다.

`service:(postgres OR datadog_agent)`
: `service` 속성의 값이 `postgres` 또는 `datadog_agent`인 로그와 일치합니다. 이 쿼리는 : `service:postgres OR service:datadog_agent`로 작성할 수도 있습니다.

## 특수 문자 및 공백 이스케이프 {#escape-special-characters-and-spaces}

다음 문자는 특수 문자로 간주되므로 백슬래시(`\`)를 사용하여 이스케이프 처리해야 합니다: .

`-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `#`, 및 공백.

**참고**:

- `/`는 특수 문자로 간주되지 않으므로 이스케이프 처리할 필요가 없습니다.
- 속성 내의 특수 문자를 검색할 수 있습니다. [특수 문자가 포함된 속성 검색](#search-an-attribute-that-contains-special-characters)을 참조하세요.
- `message` 필드에 특수 문자 `!`가 포함된 로그를 찾으려면 속성 검색 구문: `message:*!*`를 사용하세요.
    - **참고**: 특수 문자가 포함된 로그 메시지를 필터링하기 위해 프리 텍스트 검색 쿼리를 사용할 수는 없습니다.

### 특수 문자가 포함된 속성 검색 {#search-an-attribute-that-contains-special-characters}

특수 문자가 포함된 속성 값을 검색하려면 이스케이프 또는 큰따옴표를 사용해야 합니다. 예를 들어, `my_app` 속성의 값이 `hello:world`인 경우 이를 검색하려면 : `my_app:hello\:world` 또는 `my_app:"hello:world"` 구문을 사용하세요.

### 단일 특수 문자 또는 공백 일치 {#match-a-single-special-character-or-space}

단일 특수 문자 또는 공백과 일치하려면 `?` 와일드카드를 사용하세요. 예를 들어, `my_app` 속성의 값이 `hello world again`인 경우 이를 검색하려면 : `my_app:hello?world?again` 구문을 사용하세요.

### 예시 {#examples}

검색에서 특수 문자와 공백을 이스케이프하는 방법을 알아보기 위해 로그 예시를 살펴보겠습니다.

```
{
    "service": "postgres",
    "status": "INFO",
    "tags": [
        "env:prod",
        "namespace:something",
        "reader:logs",
        "my_app:hello world again"
    ]
}
```

다음은 로그 예시에서 특수 문자와 공백을 이스케이프하는 검색 구문 예시입니다.

`tags:env*`
: `tag` 속성 값이 `env`인 로그와 일치합니다.

`tags:(env\:prod OR env\:test)`
: `tags` 배열에 `env:prod` 또는 `env:test` 태그가 있는 로그와 일치합니다.
: 이 쿼리는 `tags:("env:prod" OR "env:test")`로 작성할 수도 있습니다.

`tags:env\:prod AND -tags:version\:beta`
: `tag` 배열에 `env:prod`는 포함하고 `version:beta`는 포함하지 않는 로그와 일치합니다.
: 이 쿼리는 `tags:"env:prod" AND -tags:"version:beta"`로 작성할 수도 있습니다.

`my_app:hello\:world`
: `my_app:hello:world`를 포함하는 로그와 일치합니다.
: 이 쿼리는 `my_app:"hello:world"`로 작성할 수도 있습니다.

`my_app:hello?world?again`
: `"my_app":"hello world again"`을 포함하는 로그와 일치합니다.

## Wildcard {#wildcards}

와일드카드 검색에는 `*`를 사용할 수 있습니다. 다음은 와일드카드 검색 예시입니다.

`*network*`
: `network`를 포함하는 `message` 필드 값을 가진 로그와 일치합니다.

`web*`
: `web`로 시작하는 `message` 필드 값을 가진 로그와 일치합니다.

`*web`
: `message` 필드 값이 `web`로 끝나는 로그와 일치합니다.

`service:*mongo`
: `service` 속성 값들이 `mongo`로 끝나는 로그와 일치합니다.

`service:web*`
: `service` 속성 값이 `web`로 시작하는 로그와 일치합니다.

**참고**:
- 속성 키(`*:app` 또는 `service*:app` 등)를 검색할 때 와일드카드를 사용할 수 없습니다.
- 와일드카드는 큰따옴표 밖에서만 와일드카드로 작동합니다.
    - 예를 들어, `"*test*"`는 `message` 필드에 `*test*` 문자열이 있는 로그와 일치하고, `*test*`는 `message` 필드의 어느 위치에든 `test` 문자열이 있는 로그와 일치합니다.

#### 특수 문자 또는 이스케이프 처리된 문자 검색 {#search-for-special-characters-or-escaped-characters}

특수 문자를 포함하거나 이스케이프 처리 또는 큰따옴표가 필요한 속성을 검색할 때는 단일 특수 문자 또는 공백과 일치시키려면 `?` 와일드카드를 사용하세요. 예를 들어, `my_attribute` 속성의 값이 `hello world`인 경우 이를 검색하려면 `my_attribute:hello?world` 구문을 사용하세요.

[1]: /ko/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/