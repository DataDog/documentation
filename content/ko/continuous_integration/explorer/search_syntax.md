---
description: 테스트 실행 또는 파이프라인 실행 전체를 검색합니다.
further_reading:
- link: /continuous_integration/search
  tag: 설명서
  text: 필터 및 그룹 테스트와 파이프라인
- link: /continuous_integration/explorer/facets
  tag: 설명서
  text: 패싯에 대해 자세히 알아보기
kind: 설명서
title: CI 가시성 탐색기 검색 구문
---

## 개요

쿼리 필터는 용어와 연산자로 구성되어 있습니다.

용어에는 다음과 같은 두 가지 유형이 있습니다.

* **단일 용어**는 `test` 또는 `hello` 과 같은 단일 단어입니다.

* **시퀀스**는 `"hello dolly"`와 같이 큰따옴표로 묶인 단어의 그룹입니다.

복잡한 쿼리로 여러 용어를 결합하려면, 대소문자를 구분해 다음 부울 연산자를 사용할 수 있습니다.

| **운영자자** | **Description**                                                                                        | **예시**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection**: 모든 용어가 선택한 이벤트에 존재합니다(추가된 것이 없으면 AND가 기본적으로 적용됨). | 인증 AND 실패   |
| `OR`         | **Union** 용어 중 하나가 선택한 이벤트에 포함되어 있습니다.                                             | 인증 OR 비밀번호   |
| `-`          | **예외**: 다음 용어가 이벤트에 존재하지 않습니다(개별 원본 텍스트 검색에 적용됨).                                                  | 인증 AND -비밀번호 |

## 속성 및 태그 검색

속성과 태그를 검색하기 위해 패싯을 정의하지 않아도 됩니다. 특정 속성을 검색하려면 `@`를 추가해 속성에서 검색하려는 대상을 지정합니다. 속성 검색은 대소문자를 구분해야 합니다. 자유어 검색을 사용하면 대소문자가 구분되지 않은 결과를 얻게 됩니다.

예를 들어 `git.repository.name` 속성에 관심이 있고 `Datadog/documentation` 값을 필터링하길 원하는 경우 `@git.repository.name:DataDog/documentation`를 사용합니다. 

특정 문자가 포함된 속성 값을 검색하려면 이스케이핑이나 따옴표가 필요합니다. 예를 들어 `hello:world` 값을 포함하는 `my_attribute` 속성에 대해 `@my_attribute:hello\:world` 또는 `@my_attribute:"hello:world"`를 사용해 검색합니다. 

단일 특수 문자나 공백을 찾으려면 `?` 와일드카드를 사용합니다. 예를 들어 `hello world` 값이 포함된 `my_attribute` 속성의 경우 `@my_attribute:hello?world`를 사용해 검색합니다.

태그에 대한 자세한 정보는 [태그 사용][2]을 참조하세요.

## 와일드카드

### 멀티 문자 와일드카드

다중 문자 와일드카드 검색을 수행하려면 다음과 같이 `*` 기호를 사용합니다:

* `service:web*`은 `web`으로 시작하는 서비스가 포함된 모든 로그 메시지를 찾습니다.
* `web*`은 `web`으로 시작되는 모든 로그 메시지를 찾습니다.
* `*web`은 `web`으로 끝나는 모든 로그 메시지를 찾습니다.

와일드카드 검색은 이 구문을 포함하는 태그 및 속성(패싯 처리/처리 안 됨) 내에서 작동합니다. 이 쿼리는 `mongo` 문자열로 끝나는 모든 서비스를 반환합니다.
<p> </p>
<p></p>

```
test.service:*mongo
```

### 와일드카드 검색

특수 문자를 포함하거나 이스케이핑 또는 따옴표를 필요로 하는 속성 또는 태그 값을 검색하는 경우, `?` 와일드카드를 사용해 단일 특수 문자나 공백을 찾습니다. 예를 들어 `hello world` 값이 포함된 `my_attribute` 속성을 검색하려면 `@my_attribute:hello?world`를 사용합니다. 
<p> </p>

## 숫자값

숫자 속성을 검색하려면 먼저 [패싯으로 추가합니다][1]. 그런 다음 숫자 연산자(`<`, `>`, `<=`, `>=`)를 사용해 숫자 패싯에 대한 검색을 실행합니다.

예를 들어 한 주의 기간 동안 모든 테스트 실행을 검색하려면 `@duration:>=7days`를 사용합니다.

## 태그

테스트 실행 및 파이프라인 실행은 해당 항목을 생성한 [호스트][3] 및 [통합][4]에서 태그를 상속합니다. 검색과 패싯에서도 사용할 수 있습니다.

* `test`는 문자열 "test"를 검색합니다.
* `env:(prod OR test)`는 `env:prod` 태그 또는 `env:test` 태그를 포함하는 모든 테스트 실행이나 파이프라인 실행을 찾습니다.
* `(env:prod AND -version:beta)`는 `env:prod` 태그를 포함하고 `version:beta` 태그를 포함하지 않는 테스트 실행이나 파이프라인 실행을 찾습니다.

태그가 [태그 모범 사례][5]를 따르지 않고 `key:value` 구문을 사용하지 않는 경우, 이 검색 쿼리(`tags:<MY_TAG>`)를 사용합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/explorer/facets
[2]: /ko/getting_started/tagging/using_tags
[3]: /ko/infrastructure
[4]: /ko/integrations
[5]: /ko/getting_started/tagging/#define-tags