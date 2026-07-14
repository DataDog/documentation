---
aliases:
- /ko/logs/search-syntax
- /ko/logs/search_syntax/
description: 로그 전체를 검색합니다.
further_reading:
- link: /getting_started/search/
  tag: 설명서
  text: Datadog에서 검색 시작하기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그를 시각화하는 방법 알아보기
- link: /logs/explorer/#patterns
  tag: 설명서
  text: 로그 내 패턴 감지
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/explorer/saved_views/
  tag: 설명서
  text: Saved Views에 대해 알아보기
- link: /logs/explorer/calculated_fields/formulas
  tag: 설명서
  text: 계산된 필드 수식에 대해 자세히 알아보기
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: 학습 센터
  text: Log Explorer 시작하기
title: 로그 검색 구문
---
## 개요 {#overview}

쿼리 필터는 용어와 연산자로 구성됩니다.

용어에는 다음과 같은 두 가지 유형이 있습니다.

* **단일 용어**는 `test` 또는 `hello`와 같은 한 단어입니다.

* **시퀀스**는 `"hello dolly"`와 같이 큰따옴표로 묶인 단어의 그룹입니다.

여러 용어를 복잡한 쿼리로 결합하려면, 대소문자를 구분하는 다음 부울 연산자를 사용할 수 있습니다.

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **연산자** | **설명**                                                                                        | **예시**                  |
| `AND`        | **교집합**: 두 용어가 모두 선택한 이벤트에 있음(아무것도 추가하지 않으면 기본적으로 AND가 적용됨) | authentication AND failure   |
| `OR`         | **합집합**: 두 용어 중 하나가 선택한 이벤트에 포함됨                                             | authentication OR password   |
| `-`          | **제외**: 다음 용어가 이벤트에 없음(각각의 개별 원시 텍스트 검색에 적용)                                                  | authentication AND -password |

## 전체 텍스트 검색 {#full-text-search}

<div class="alert alert-danger">전체 텍스트 검색 기능은 Log Management에서만 사용할 수 있으며 모니터, 대시보드, 노트북 쿼리에서 작동합니다. 전체 텍스트 검색 구문은 인덱스 필터, 아카이브 필터, 로그 파이프라인 필터, 리하이드레이션 필터를 정의하는 데 또는 Live Tail에서는 사용할 수 없습니다. </div>

모든 로그 속성(로그 메시지 포함)에서 전체 텍스트 검색을 수행하려면 구문 `*:search_term`을 사용하세요.

### 단일 용어 예시 {#single-term-example}

| 검색 구문 | 검색 유형 | 설명                                               |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | 전체 텍스트   | 모든 로그 속성에서 정확한 문자열 `hello`를 검색합니다. |
| `hello`       | 자유 텍스트   | `message`, `@title`, `@error.message`, `@error.stack` 속성에서만 정확한 문자열 `hello`를 검색합니다.       |

### 와일드카드를 사용한 검색어 예시 {#search-term-with-wildcard-example}

| 검색 구문 | 검색 유형 | 설명                                                                                 |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | 전체 텍스트   | 모든 로그 속성에서 정확한 문자열 `hello`를 검색합니다.                                   |
| `*:hello*`    | 전체 텍스트   | 전체 로그 속성에서 `hello`로 시작하는 문자열을 검색합니다. 예를 들어 `hello_world`입니다.  |

### 정확히 일치하는 여러 검색어 예시 {#multiple-terms-with-exact-match-example}

| 검색 구문       | 검색 유형 | 설명                                                                                        |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | 전체 텍스트   | 모든 로그 속성에서 정확한 문자열 `hello world`를 검색합니다.                                    |
| `hello world`       | 자유 텍스트   | 로그 메시지에서만 `hello` 및 `world` 단어를 검색합니다. 예를 들어 `hello beautiful world`입니다.  |

## 특수 문자 및 공백 이스케이프 {#escape-special-characters-and-spaces}

다음 문자는 특수 문자로 간주되며 `\` 문자로 이스케이프해야 함: `=` `-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `\` `#` 및 공백.
- `/` 는 특수 문자로 간주되지 않으며 이스케이프할 필요가 있습니다.
- `@` 는 [Attribute Search](#attributes-search)에 예약되어 있기 때문에 Log Explorer 내에서 검색 쿼리에 사용할 수 없습니다.

로그 메시지에서 특수 문자를 검색할 수 없습니다. 특수 문자가 속성 내에 있는 경우 해당 문자를 검색할 수 있습니다.

특수 문자를 검색하려면, [Grok 파서][1]가 포함된 속성으로 파싱한 다음 해당 속성을 포함하는 로그를 검색합니다.

## 속성 검색 {#attributes-search}

특정 속성에 대해 검색하려면 `@`를 추가하여 속성에 대해 검색 중임을 명시합니다.

예를 들어 속성 이름이 **url**이고 **url** 값 `www.datadoghq.com`에 대해 필터링하고자 하는 경우, 다음을 입력합니다.

```
@url:www.datadoghq.com
```

### 예약된 속성 {#reserved-attributes}

`host`, `source`, `status`, `service`, `trace_id`, `message`와 같은 [예약된 속성][8]에는 `@` 접두사가 필요하지 않습니다. 이러한 속성은 직접 검색할 수 있습니다.

```
service:web-app
status:error
host:i-1234567890abcdef0
```

**참고**:

1. 속성 및 태그에 대해 검색하기 위해 패싯을 정의할 필요가 **없습니다**.

2. 속성 검색은 대소문자를 구분합니다. 대소문자를 구분하지 않는 결과를 얻으려면 [전체 텍스트 검색](#full-text-search)을 사용하세요. 또 한 가지 옵션은 구문 분석 중에 Grok 파서와 함께 `lowercase` 필터를 사용하여 검색 중에 대소문자를 구분하지 않는 결과를 얻는 것입니다.

3. 특수 문자를 포함하는 속성 값을 검색하려면 이스케이프 처리 또는 큰따옴표가 필요합니다.
    - 예를 들어 `hello:world` 값을 포함하는 `my_attribute` 속성의 경우, `@my_attribute:hello\:world` 또는 `@my_attribute:"hello:world"`를 사용하여 검색하세요.
    - 단일 특수 문자 또는 공백과 일치하려면 `?` 와일드카드를 사용합니다. 예를 들어 `hello world` 값을 포함하는 `my_attribute` 속성의 경우, `@my_attribute:hello?world`를 사용하여 검색하세요.

예:

| 검색 쿼리                                                         | 설명                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | 속성 `http.url_details.path`의 `/api/v1/test`와 일치하는 모든 로그를 검색합니다.                                                                               |
| `@http.url:/api\-v1/*`                                             | `/api-v1/`                                                                             |로 시작하는 `http.url` 속성의 값을 포함하는 모든 로그를 검색합니다.
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | 200~299 사이의 `http.status_code` 값을 포함하고, `/api-v1/` |로 시작하는 `http.url_details.path` 속성의 값을 포함하는 모든 로그를 검색합니다.
| `-@http.status_code:*`                                                | `http.status_code` 속성을 포함하지 않는 모든 로그 검색 |

### CIDR 표기법을 사용하여 검색 {#search-using-cidr-notation}
Classless Inter Domain Routing(CIDR)은 사용자가 IP 주소 범위(CIDR 블록이라고도 함)를 간결하게 정의할 수 있게 해 주는 표기법입니다. CIDR은 네트워크(예를 들어 VPC) 또는 서브 네트워크(예를 들어 VPC 내 퍼블릭/프라이빗 서브넷)를 정의하는 데 가장 일반적으로 사용됩니다.

사용자는 CIDR 표기법을 사용해 `CIDR()` 함수를 사용하여 로그의 속성을 쿼리할 수 있습니다. `CIDR()` 함수에는 필터링할 로그 속성을 파라미터로 전달해야 하며, 그 뒤에 하나 이상의 CIDR 블록이 따라와야 합니다.

#### 예시 {#examples}
- `CIDR(@network.client.ip,13.0.0.0/8)`은 13.0.0.0/8 CIDR 블록에 속하는 필드 `network.client.ip`에 IP 주소가 있는 로그를 검색하고 필터링합니다.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` 13.0.0.0/8 또는 15.0.0.0/8 CIDR 블록에 속하는 배열 속성 `network.ip.list`에 IP 주소가 있는 로그를 매칭 및 필터링합니다.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` 은 13.0.0.0/8 서브넷에서 발생하는 palo alto 방화벽의 거부 이벤트를 매칭하고 필터링함
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)`은 출발지 서브넷이 13.0.0.0/8이 아니며 목적지 서브넷이 15.0.0.0/8로 지정된 모든 VPC 로그를 표시합니다. 이는 서브넷 간 환경의 네트워크 트래픽을 분석하는 데 사용할 수 있습니다.

`CIDR()` 함수는 IPv4 및 IPv6 CIDR 표기법을 둘 다 지원하며 Log Explorer, Live Tail, 대시보드의 로그 위젯, 로그 모니터, 로그 구성에서 작동합니다.

## Wildcard {#wildcards}

자유 텍스트 검색에 와일드카드를 사용할 수 있습니다. 하지만 이렇게 하면 로그 메시지의 용어, Log Explorer의 `content` 열에 있는 텍스트만 검색합니다. 로그 속성에서 값을 검색하려면 [전체 텍스트 검색](#full-text-search)을 참조하세요.

### 복수 문자 와일드카드 {#multi-character-wildcard}

로그 메시지에서 복수 문자 와일드카드 검색을 수행하려면(Log Explorer의 `content` 열), 다음과 같이 `*` 기호를 사용하세요.

* `service:web*`은 `web`로 시작하는 서비스가 있는 모든 로그 메시지를 매칭합니다.
* `web*` `web`으로 시작하는 모든 로그 메시지를 매칭합니다.
* `*web` `web`으로 끝나는 모든 로그 메시지를 매칭합니다.

**참고**: 와일드카드는 큰따옴표 밖에서만 와일드카드로 작동합니다. 예를 들어 `"*test*"`는 메시지에 문자열 `*test*`가 있는 로그를 매칭합니다. `*test*`는 메시지 안 어느 곳에든 문자열 테스트가 있는 로그를 매칭합니다.

와일드카드 검색은 이 구문이 있는 태그 및 속성 안에서 작동합니다(패싯 여부와 관계없음). 이 쿼리는 문자열 `mongo`로 끝나는 모든 서비스를 반환합니다.
<p> </p>
<p></p>

```
service:*mongo
```

와일드카드 검색은 로그 속성에 속하지 않는 로그의 일반 텍스트에서 검색하는 데도 사용할 수 있습니다. 예를 들어 이 쿼리는 문자열 `NETWORK`를 포함하는 콘텐츠(메시지)가 있는 모든 로그를 반환합니다.

```
*NETWORK*
```

그러나 이 검색어는 로그 속성에 포함되어 있고 로그 메시지의 일부가 아닌 경우 `NETWORK` 문자열을 포함하는 로그를 반환하지 않습니다.

### 와일드카드 검색 {#search-wildcard}

특수 문자를 포함하거나 이스케이프 처리 또는 큰따옴표가 필요한 속성 또는 태그 값을 검색할 때는 `?` 와일드카드를 사용하여 단일 특수 문자 또는 공백과 매칭합니다. 예를 들어 값 `hello world`를 포함한 속성 `my_attribute`를 검색하려면: `@my_attribute:hello?world`.
<p> </p>

## 숫자값 {#numerical-values}

숫자 속성에 대해 검색하려면 우선 [해당 값을 패싯으로 추가][2]합니다. 그런 다음 숫자 연산자(`<`,`>`, `<=` 또는 `>=`)를 사용하여 숫자 패싯에 대해 검색을 수행할 수 있습니다.
예를 들어 응답 시간이 100ms를 초과하는 모든 로그를 검색하려면 다음 사용:
<p> </p>

```
@http.response_time:>100
```

특정 범위 이내에서 숫자 속성을 검색할 수 있습니다. 예를 들어 4xx 오류를 모두 검색하려면 다음 사용:

```
@http.status_code:[400 TO 499]
```

## 태그 {#tags}

로그는 로그를 생성하는 [호스트][3] 및 [통합][4]에서 태그를 상속합니다. 태그는 검색에서 사용할 수도 있고, 패싯으로도 사용할 수 있습니다.

* `test`는 문자열 "test"를 검색합니다.
* `env:(prod OR test)` 는 태그 `env:prod` 또는 태그 `env:test`를 포함한 모든 로그를 매칭함
* `(env:prod AND -version:beta)`는 태그 `env:prod`를 포함하고 태그 `version:beta`를 포함하지 않는 모든 로그를 매칭함

태그가 [태그 모범 사례][5]를 따르지 않고 `key:value` 구문을 사용하지 않는 경우, 이 검색 쿼리를 사용하세요.

* `tags:<MY_TAG>`

## 배열 {#arrays}

다음 예시에서 패싯의 `Peter` 값을 클릭하면 `users.names` 속성을 포함하는 모든 로그를 반환합니다. 이 속성의 값은 `Peter` 또는 `Peter`를 포함하는 배열입니다.

{{< img src="logs/explorer/search/array_search.png" alt="배열 및 패싯" style="width:80%;">}}

**참고**: 패싯이 적용되지 않은 배열 속성에 대해서도 동등한 구문을 사용해 검색할 수 있습니다.

다음 예시에서 Windows용 CloudWatch 로그에는 `@Event.EventData.Data` 아래에 JSON 개체의 배열이 포함됩니다. JSON 개체의 배열에서 패싯을 생성할 수는 없지만, 다음 구문을 사용해 검색할 수 있습니다.

* `@Event.EventData.Data.Name:ObjectServer` 는 키 `Name` 및 값 `ObjectServer`를 포함한 모든 로그를 매칭합니다.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="JSON 개체 배열의 패싯리스 쿼리" style="width:80%;">}}

### 중첩된 배열 검색 {#nested-array-search}

배열 속성에서 중첩된 필드를 검색하려면 전체 속성 경로를 포함한 `@` 접두사를 사용하세요. Log Explorer가 배열의 항목을 매칭함:

* `@network.ip.attributes.ip:2a02\:1810*`은 `network.ip.attributes` 배열에서 하나 이상의 항목에 `2a02:1810`으로 시작하는 `ip` 필드가 있는 모든 로그를 매칭합니다.

배열에 특정 값이 여러 개 포함된 로그를 매칭하려면, 값을 괄호 안에 넣어 나열:

* `@user_perms:(4 6)`은 `user_perms` 배열이 `4` 및 `6`을 모두 포함하는 모든 로그를 매칭합니다.

배열에 범위 내의 값을 포함하는 로그를 매칭하려면 범위 쿼리 사용:

* `@user_perms:[2 TO 6]`은 `user_perms` 배열이 `2` 및 `6` 사이의 값을 하나 이상 포함하는 모든 로그를 매칭합니다.

## 계산된 필드 {#calculated-fields}

계산된 필드는 로그 속성처럼 기능하며 검색, 집계, 시각화 및 다른 계산된 필드 정의에 사용할 수 있습니다. 계산된 필드 이름을 참조하려면 `#` 접두사를 사용하세요.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Log Explorer에서 결과를 필터링하는 데 사용된 request_duration이라는 계산된 필드" style="width:100%;" >}}

## 저장된 검색 {#saved-searches}

[Saved Views][6]는 검색 쿼리, 열, 시간대, 패싯을 포함합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/parsing
[2]: /ko/logs/explorer/facets/
[3]: /ko/infrastructure/
[4]: /ko/integrations/#cat-log-collection
[5]: /ko/getting_started/tagging/#tags-best-practices
[6]: /ko/logs/explorer/saved_views/
[7]: /ko/logs/explorer/facets/#facet-panel
[8]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes