---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
title: 검색 구문
---

## 개요

쿼리는 용어와 연산자로 구성됩니다.

용어에는 다음과 같은 두 가지 유형이 있습니다.

* **단일 용어**는 `test` 또는 `hello` 과 같은 하나의 단어입니다.

* **시퀀스**는 `"hello dolly"`와 같이 큰 따옴표로 묶인 단어의 그룹입니다.

여러 용어를 하나의 복잡한 쿼리로 결합하기 위해 다음 부울 연산자 중 하나를 사용할 수 있습니다:

| **연산자** | **Description**                                                                                       |
|--------------|-------------------------------------------------------------------------------------------------------|
| `AND`        | **교집합**: 두 용어 모두 선택한 보기에 있습니다(아무것도 추가하지 않으면 AND가 기본적으로 사용됨). |
| `OR`         | **합집합**: 두 용어 중 하나가 선택한 보기에 포함됩니다.                                             |
| `-`          | **제외**: 다음 용어는 보기에 없습니다.                                                  |

## 자동 완성

검색 창의 자동 완성 기능을 활용하여 기존 값으로 쿼리를 완성할 수 있습니다.

{{< img src="real_user_monitoring/explorer/search/search_bar_autocomplete2.png" alt="검색 창 자동 완성" style="width:90%;" >}}

## 특수 문자 이스케이프

특수 문자가 포함된 패싯값을 검색하려면 이스케이프 또는 큰따옴표가 필요합니다. `?`, `>`,`<` , `:`,`=` , `"`, `~`,`/`은 특수 문자로 간주되며, `\`는 `\` 문자와 함께 이스케이프해야 합니다.

보기 패싯 이름 내의 공백에도 동일한 로직이 적용됩니다. 보기 패싯에는 공백이 없어야 하지만 공백이 있으면 공백을 이스케이프해야 합니다.

예를 들어 패싯의 이름이 `user.first name`으로 지정된 경우 공백을 이스케이프하여 패싯 검색을 수행합니다: `@user.first\ name:myvalue`.

## 와일드카드

다중 문자 와일드카드를 검색하려면, `*`기호를 사용합니다. 예를 들어, `@http.url:https:\/\/*`는 URL이 `https://`로 시작되는 모든 보기와 일치합니다.

## 숫자 값

숫자 속성에 대한 검색을 수행하려면 `<`, `>`, `<=`또는 `>=`를 사용합니다. 예를 들어 5개 이상의 오류가 있는 모든 세션을 검색합니다:`@session.error.count:>5`.

특정 범위 내의 숫자 속성을 검색할 수 있습니다. 예를 들어, 오류 개수가 3개에서 10개 사이인 모든 세션을 검색합니다:`@session.error.count:[3 TO 10]`.

## 검색 예시

`@view.url_path:"/department/sofas"`
: `@view.path` 속성에서 `/department/sofas`가 포함된 모든 보기를 검색합니다.

`@view.url_path:\/department\/sofas\/*`
: `/department/sofas/`로 시작하는 `view.path` 속성의 값이 포함된 모든 보기를 검색합니다.

`@view.loading_time:[1s TO 3s] @view.url_path:\/department\/sofas\/*`
: `/department/sofas/`로 시작하는 `@view.url_path` 속성 값에서 1초와 3초 사이의 `loading_time`을 가진 모든 보기를 검색합니다.

## 저장된 검색

[저장된 보기][1]에는 검색 쿼리, 열, 정렬 순서, 시간 범위 및 패싯이 포함됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/explorer/saved_views