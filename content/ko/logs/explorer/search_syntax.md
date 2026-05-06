---
aliases:
- /ko/logs/search-syntax
- /ko/logs/search_syntax/
description: 로그 전체를 검색합니다.
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Datadog에서 검색 시작하기
- link: /logs/explorer/#visualize
  tag: Documentation
  text: 로그를 시각화하는 방법 알아보기
- link: /logs/explorer/#patterns
  tag: Documentation
  text: 로그 내 패턴 감지
- link: /logs/log_configuration/processors
  tag: Documentation
  text: 로그 처리 방법 알아보기
- link: /logs/explorer/saved_views/
  tag: Documentation
  text: Saved Views에 대해 알아보기
- link: /logs/explorer/calculated_fields/formulas
  tag: Documentation
  text: 계산된 필드 수식에 대해 자세히 알아보기
title: 로그 검색 구문
---
## 개요 {#overview}

쿼리 필터는 용어와 연산자로 구성되어 있습니다.

용어에는 다음과 같은 두 가지 유형이 있습니다.

* **단일 용어**는 `test` 또는 `hello`과 같은 단일 단어입니다.

* **시퀀스**는 `"hello dolly"`과 같이 큰따옴표로 묶인 단어의 그룹입니다.

여러 용어를 복잡한 쿼리로 결합하려면, 대소문자를 구분하는 다음 부울 연산자를 사용할 수 있습니다.

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **연산자** | **설명**                                                                                        | **예시**                  |
| `AND`        | **인터섹션**: 선택한 이벤트에 두 용어가 모두 존재합니다(아무것도 추가하지 않으면 AND가 기본적으로 사용됨) | 인증 AND 실패 |
| `OR`         | **유니온**: 선택한 이벤트에 어느 한 용어가 포함되어 있습니다 | 인증 OR 비밀번호 |
| `-`          | **예외**: 다음 용어가 이벤트에 존재하지 않습니다(개별 원본 텍스트 검색에 적용됨) | 인증 AND -비밀번호 |

## 전체 텍스트 검색 {#full-text-search}

<div class="alert alert-danger">전체 텍스트 검색 기능은 Log Management에서만 사용할 수 있으며 monitor, 대시보드 및 노트북 쿼리에서 작동합니다. 전체 텍스트 검색 구문은 인덱스 필터, 아카이브 필터, 로그 파이프라인 필터, 재수화 필터 또는 Live Tail에서 정의하는 데 사용할 수 없습니다. </div>

구문 `*:search_term`을 사용하여 로그 메시지를 포함한 모든 로그 속성에서 전체 텍스트 검색을 수행합니다.

### 단일 용어 예시 {#single-term-example}

| 검색 구문 | 검색 유형 | 설명 |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | 전체 텍스트   | 모든 로그 속성에서 정확히 `hello` 문자열을 검색합니다. |
| `hello`       | 자유 텍스트   | `message`, `@title`, `@error.message`, `@error.stack` 속성에서만 정확히 `hello` 문자열을 검색합니다.       |

### 와일드카드를 사용한 검색어 예시 {#search-term-with-wildcard-example}

| 검색 구문 | 검색 유형 | 설명 |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | 전체 텍스트   | 모든 로그 속성에서 정확히 `hello` 문자열을 검색합니다.                                   |
| `*:hello*`    | 전체 텍스트   | 모든 로그 속성에서 `hello`로 시작하는 문자열을 검색합니다. 예를 들어, `hello_world`입니다.  |

### 정확히 일치하는 여러 검색어 예시 {#multiple-terms-with-exact-match-example}

| 검색 구문       | 검색 유형 | 설명                                                                                        |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | 전체 텍스트   | 모든 로그 속성에서 정확히 `hello world` 문자열을 검색합니다.                                    |
| `hello world`       | 자유 텍스트   | `hello` 및 `world` 단어에 대해 로그 메시지만 검색합니다. 예를 들어 `hello beautiful world`입니다.  |

## 특수 문자 및 공백 이스케이프 {#escape-special-characters-and-spaces}

다음 문자는 특수 문자로 간주되며 `\` 문자로 이스케이프 처리해야 합니다: `=` `-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `\` `#`, 및 공백.
- `/` 특수 문자로 간주되지 않으며 이스케이프 처리할 필요가 없습니다.
- `@` Logs Explorer 내에서 검색 쿼리에서 사용할 수 없습니다. 이는 [속성 검색](#attributes-search)에 예약되어 있기 때문입니다.

로그 메시지에서 특수 문자를 검색할 수 없습니다. 속성 내에 있을 때 특수 문자를 검색할 수 있습니다.

특수 문자를 검색하려면, [Grok 파서][1]가 포함된 속성으로 파싱한 다음 해당 속성을 포함하는 로그를 검색합니다.

## 속성 검색 {#attributes-search}

특정 속성을 검색하려면 `@`를 추가하여 검색 중인 속성을 지정합니다.

예를 들어, 속성 이름이 **url**이고 **url** 값 `www.datadoghq.com`을 필터링하려면 입력합니다:

```
@url:www.datadoghq.com
```

### 예약된 속성 {#reserved-attributes}

`host`, `source`, `status`, `service`, `trace_id`, 및 `message`과 같은 [예약된 속성][8]은 `@` 접두사가 필요하지 않습니다. 이러한 속성들을 직접 검색할 수 있습니다:

```
service:web-app
status:error
host:i-1234567890abcdef0
```

**참고**:

1. 속성 및 태그를 검색하기 위해 패싯을 정의할 필요는 **없습니다**.

2. 속성 검색은 대소문자를 구분합니다. 대소문자를 구분하지 않는 결과를 얻으려면 [전체 텍스트 검색](#full-text-search)을 사용하십시오. 또 다른 옵션은 검색 중에 대소문자를 구분하지 않는 결과를 얻기 위해 Grok 파서를 사용하여 `lowercase` 필터를 사용하는 것입니다.

3. 특수 문자가 포함된 속성 값을 검색하려면 이스케이프 또는 큰따옴표를 사용해야 합니다.
    - 예를 들어, 값이 `hello:world`인 속성 `my_attribute`에 대해 다음과 같이 검색하십시오: `@my_attribute:hello\:world` 또는 `@my_attribute:"hello:world"`.
    - 단일 특수 문자 또는 공백과 일치하려면 `?` 와일드카드를 사용하세요. 예를 들어, 값이 `hello world`인 속성 `my_attribute`에 대해 다음과 같이 검색하십시오: `@my_attribute:hello?world`.

예:

| 검색 쿼리                                                         | 설명                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | 속성 `http.url_details.path`에서 `/api/v1/test`과 일치하는 모든 로그를 검색합니다.                                                                               |
| `@http.url:/api\-v1/*`                                             | `/api-v1/`                                                                             |로 시작하는 `http.url` 속성에 값을 포함하는 모든 로그를 검색합니다.
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | 200과 299 사이의 `http.status_code` 값을 포함하고 `/api-v1/` |로 시작하는 `http.url_details.path` 속성에 값을 포함하는 모든 로그를 검색합니다.
| `-@http.status_code:*`                                                | | 속성을 포함하지 않는 모든 로그를 검색합니다.

### CIDR 표기법 사용 {#search-using-cidr-notation}
클래스 없는 인터 도메인 라우팅(CIDR)은 사용자가 IP 주소 범위(또는 CIDR 블록)를 간결하게 정의할 수 있도록 하는 표기법입니다. CIDR은 일반적으로 네트워크(예: VPC) 또는 서브네트워크(예: VPC 내의 공용/사설 서브넷)를 정의하는 데 사용됩니다.

사용자는 CIDR 표기법을 사용하여 로그의 속성을 쿼리하기 위해 `CIDR()` 함수를 사용할 수 있습니다. `CIDR()` 함수는 필터링할 로그 속성을 매개변수로 전달받아야 하며, 그 뒤에 하나 이상의 CIDR 블록이 따라야 합니다.

#### 예시 {#examples}
- `CIDR(@network.client.ip,13.0.0.0/8)`은 13.0.0.0/8 CIDR 블록에 속하는 필드 `network.client.ip`에 IP 주소가 있는 로그를 검색하고 필터링합니다.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` 배열 속성 `network.ip.list`에 13.0.0.0/8 또는 15.0.0.0/8 CIDR 블록에 속하는 IP 주소가 포함된 로그를 일치시키고 필터링합니다.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` 13.0.0.0/8 서브넷에서 발생한 palo alto 방화벽의 거부 이벤트를 일치시키고 필터링합니다.
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)`은 출발지 서브넷이 13.0.0.0/8이 아니면서 목적지 서브넷이 15.0.0.0/8로 지정된 모든 VPC 로그를 표시합니다. 이는 서브넷 간 환경에서 네트워크 트래픽을 분석하려는 경우에 사용됩니다.

`CIDR()` 함수는 IPv4 및 IPv6 CIDR 표기법을 모두 지원하며 로그 탐색기, Live Tail, 대시보드의 로그 위젯, 로그 모니터 및 로그 설정에서 작동합니다.

## 와일드카드 {#wildcards}

자유 텍스트 검색에 와일드카드를 사용할 수 있습니다. 그러나 로그 메시지, 즉 Log Explorer의 `content` 열의 텍스트에서만 용어를 검색합니다. 로그 속성에서 값을 검색하려면 [전체 텍스트 검색](#full-text-search)을 참조하십시오.

### 멀티 문자 와일드카드 {#multi-character-wildcard}

로그 메시지( Log Explorer의 `content` 열)에서 멀티 문자 Wildcard 검색을 수행하려면 `*` 기호를 다음과 같이 사용합니다:

* `service:web*`은 `web`로 시작하는 서비스가 포함된 모든 로그 메시지를 찾습니다.
* `web*` `web`으로 시작되는 모든 로그 메시지를 찾습니다.
* `*web` `web`으로 끝나는 모든 로그 메시지를 찾습니다.

**참고**: 와일드카드는 큰따옴표 외부에서만 작동합니다. 예를 들어, `"*test*"`는 메시지에 문자열 `*test*`가 포함된 로그를 찾습니다. `*test*`는 메시지의 어느 곳에서나 문자열 test가 포함된 로그를 찾습니다.

와일드카드 검색은 이 구문을 사용하는 태그 및 속성 내에서 (패싯 여부와 관계없이) 동작합니다. 이 쿼리는 문자열 `mongo`로 끝나는 모든 서비스를 반환합니다:
<p> </p>
<p></p>

```
service:*mongo
```

Wildcard 검색은 로그 속성의 일부가 아닌 로그의 일반 텍스트에서 검색하는 데에도 사용할 수 있습니다. 예를 들어, 이 쿼리는 문자열 `NETWORK`이 포함된 콘텐츠(메시지)를 가진 모든 로그를 반환합니다:

```
*NETWORK*
```

그러나 이 검색어는 문자열 `NETWORK`이 로그 속성에 있고 로그 메시지의 일부가 아닌 경우에는 로그를 반환하지 않습니다.

### Wildcard 검색 {#search-wildcard}

특수 문자가 포함되어 있거나 이스케이프 또는 큰따옴표가 필요한 속성 또는 태그 값을 검색할 때는 `?` Wildcard를 사용하여 단일 특수 문자 또는 공백과 일치시킵니다. 예를 들어, 값이 `hello world`인 속성 `my_attribute`를 검색하려면: `@my_attribute:hello?world`.
<p> </p>

## 숫자 값 {#numerical-values}

숫자 속성에서 검색하려면 먼저 [패싯으로 추가하세요][2]. 그런 다음 숫자 연산자(`<`,`>`, `<=` 또는 `>=`)를 사용하여 숫자 패싯에서 검색을 수행할 수 있습니다.
예를 들어, 응답 시간이 100ms를 초과하는 모든 로그를 다음과 같이 검색할 수 있습니다:
<p> </p>

```
@http.response_time:>100
```

특정 범위 내에서 숫자 속성을 검색할 수 있습니다. 예를 들어, 모든 4xx 오류를 다음과 같이 검색할 수 있습니다:

```
@http.status_code:[400 TO 499]
```

## 태그 {#tags}

로그는 이를 생성한 [호스트][3] 및 [통합][4]의 태그를 상속받습니다. 검색 및 패싯으로도 사용할 수 있습니다.

* `test`는 문자열 "test"를 검색하고 있습니다.
* `env:(prod OR test)` 태그 `env:prod` 또는 태그 `env:test`가 있는 모든 로그와 일치합니다.
* `(env:prod AND -version:beta)`는 태그 `env:prod`가 포함되어 있고 태그 `version:beta`가 포함되어 있지 않은 모든 로그와 일치합니다.

태그가 [태그 모범 사례][5]를 따르지 않고 `key:value` 구문을 사용하지 않는 경우 이 검색 쿼리를 사용하세요:

* `tags:<MY_TAG>`

## 배열 {#arrays}

다음 예제에서 패싯의 `Peter` 값을 클릭하면 `users.names` 속성이 포함된 모든 로그가 반환되며, 그 값이 `Peter`이거나 `Peter`이 포함된 배열입니다.

{{< img src="logs/explorer/search/array_search.png" alt="배열 및 패싯" style="width:80%;">}}

**참고**: 검색은 동등한 구문을 통해 패싯이 아닌 배열 속성에서도 사용할 수 있습니다.

다음 예제에서 Windows용 CloudWatch 로그는 `@Event.EventData.Data` 아래에 JSON 객체 배열을 포함합니다. JSON 객체 배열에 대한 패싯을 생성할 수는 없지만, 다음 구문을 사용하여 검색할 수 있습니다.

* `@Event.EventData.Data.Name:ObjectServer` `Name` 키와 `ObjectServer` 값을 가진 모든 로그와 일치합니다.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="JSON 객체 배열에 대한 패싯 없는 쿼리" style="width:80%;">}}

### 중첩 배열 검색 {#nested-array-search}

배열 속성에서 중첩 필드를 검색하려면 전체 속성 경로와 함께 `@` 접두사를 사용하십시오. 로그 탐색기는 배열 내의 어떤 항목과도 일치합니다:

* `@network.ip.attributes.ip:2a02\:1810*`는 `network.ip.attributes` 배열의 항목 중 적어도 하나의 `ip` 필드가 `2a02:1810`로 시작하는 모든 로그와 일치합니다.

배열에 여러 특정 값이 포함된 로그와 일치시키려면 값을 괄호 안에 나열하십시오:

* `@user_perms:(4 6)`는 `user_perms` 배열이 `4`과 `6`을 모두 포함하는 모든 로그와 일치합니다.

배열에 범위 내의 임의 값이 포함된 로그를 찾으려면 범위 쿼리를 사용하십시오:

* `@user_perms:[2 TO 6]`는 `user_perms` 배열이 `2`와 `6` 사이의 적어도 하나의 값을 포함하는 모든 로그와 일치합니다.

## 계산된 필드 {#calculated-fields}

계산된 필드는 로그 속성과 같이 기능하며, 검색, 집계, 시각화 및 기타 계산된 필드 정의에 사용할 수 있습니다. 계산된 필드 이름을 참조하려면 `#` 접두사를 사용하십시오.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="로그 탐색기에서 결과를 필터링하는 데 사용되는 request_duration이라는 계산된 필드" style="width:100%;" >}}

## 저장된 검색 {#saved-searches}

[Saved Views][6]에는 검색 쿼리 , 열, 시간대 및 패싯이 포함됩니다.

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