---
description: 품질 게이트 또는 규칙 실행 전체를 검색합니다.
further_reading:
- link: /quality_gates/search
  tag: 설명서
  text: 품질 게이트 필터링 및 그룹화
- link: /quality_gates/explorer/facets
  tag: 설명서
  text: 패싯에 대해 자세히 알아보기
kind: 설명서
title: 품질 게이트(Quality Gates) 탐색기 검색 구문
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">품질 게이트는 현재 선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 사용할 수 없습니다.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
품질 게이트는 퍼블릭 베타 서비스입니다.
{{< /callout >}}

## 개요

쿼리 필터는 용어와 연산자로 구성되어 있습니다.

용어에는 다음과 같은 두 가지 유형이 있습니다.

* **단일 용어**는 `test` 또는 `hello` 과 같은 하나의 단어입니다.

* **시퀀스**는 `"hello dolly"`와 같이 큰 따옴표로 묶인 단어의 그룹입니다.

복잡한 쿼리로 여러 용어를 결합하려면, 대소문자를 구분해 다음 부울 연산자를 사용할 수 있습니다.

| **연산자** | **Description**                                                                                        | **예시**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **교집합**: 두 용어가 모두 선택한 이벤트에 존재합니다. 용어 사이의 연산자를 지정하지 않은 경우 `AND`이 기본값입니다.) | `authentication AND failure`   |
| `OR`         | **Union** 용어 중 하나가 선택한 이벤트에 포함되어 있습니다.                                             | `authentication OR password`   |
| `-`          | **예외**: 다음 용어가 이벤트에 존재하지 않습니다(개별 원본 텍스트 검색에 적용됨).                                                  | `authentication AND -password` |

## 속성 및 태그 검색

속성과 태그를 검색하기 위해 패싯을 정의하지 않아도 됩니다. 특정 속성을 검색하려면 `@`를 추가해 속성에서 검색하려는 대상을 지정합니다. 속성 검색은 대소문자를 구분해야 합니다. 자유어 검색을 사용하면 대소문자가 구분되지 않은 결과를 얻게 됩니다.

예를 들어 `git.repository.name` 속성에 관심이 있고 `Datadog/documentation` 값을 필터링하길 원하는 경우 `@git.repository.name:DataDog/documentation`를 사용합니다. 

특정 문자가 포함된 속성 값을 검색하려면 백슬래시로 이스케이핑하거나 큰따옴표를 사용합니다. 예를 들어 `hello:world` 값을 포함하는 `my_attribute` 속성에 대해 `@my_attribute:hello\:world` 또는 `@my_attribute:"hello:world"`를 사용해 검색합니다.

단일 특수 문자나 공백을 찾으려면 `?` 와일드카드를 사용합니다. 예를 들어 `hello world`, `hello-world` 또는 `hello_world` 값이 포함된 `my_attribute` 속성의 경우 `@my_attribute:hello?world`를 사용해 검색합니다.

태그에 대한 자세한 정보는 [태그 사용][2]을 참조하세요.

## 와일드카드

### 멀티 문자 와일드카드

다중 문자 와일드카드 검색을 수행하려면 다음과 같이 `*` 기호를 사용합니다:

* `service:web*`은 `web`으로 시작하는 서비스가 포함된 모든 로그 메시지를 찾습니다.
* `web*`은 `web`으로 시작되는 모든 로그 메시지를 찾습니다.
* `*web`은 `web`으로 끝나는 모든 로그 메시지를 찾습니다.

와일드카드 검색은 이 구문을 포함하는 태그 및 속성(패싯 처리/처리 안 됨) 내에서 작동합니다. 이 쿼리는 `feature-`로 시작하는 모든 브랜치를 반환합니다.

```
branch:feature-*
```

### 와일드카드 검색

특수 문자를 포함하거나 이스케이핑 또는 따옴표를 필요로 하는 속성 또는 태그 값을 검색하는 경우, `?` 와일드카드를 사용해 단일 특수 문자나 공백을 찾습니다. 예를 들어 `hello world`, `hello-world` 또는 `hello_world` 값이 포함된 `my_attribute` 속성을 검색하려면 `@my_attribute:hello?world`를 사용합니다. 
<p> </p>



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/quality_gates/explorer/facets
[2]: /ko/getting_started/tagging/using_tags
[3]: /ko/infrastructure
[4]: /ko/integrations