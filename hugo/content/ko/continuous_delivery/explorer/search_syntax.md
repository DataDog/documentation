---
description: 모든 배포 실행을 검색하세요.
further_reading:
- link: /getting_started/search/
  tag: 설명서
  text: Datadog에서 검색 시작
- link: /continuous_delivery/explorer/facets
  tag: 설명서
  text: 패싯에 대해 알아보기
title: CD Visibility Explorer 검색 구문
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 액세스 권한은 이미 등록된 조직으로만 제한됩니다.
{{< /callout >}}

## 개요 {#overview}

쿼리 필터는 용어와 연산자로 구성됩니다.

용어에는 다음과 같은 두 가지 유형이 있습니다.

* **단일 용어**는 `test` 또는 `hello`와 같은 한 단어입니다.

* **시퀀스**는 `"hello dolly"`와 같이 큰따옴표로 묶인 단어의 그룹입니다.

여러 용어를 복잡한 쿼리로 결합하려면, 대소문자를 구분하는 다음 불리언 연산자를 사용할 수 있습니다.

| **연산자** | **설명**                                                                                        | **예시**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **교집합**: 두 용어가 모두 선택한 이벤트에 있음(아무것도 추가하지 않으면 기본적으로 AND가 적용됨) | authentication AND failure   |
| `OR`         | **합집합**: 두 용어 중 하나가 선택한 이벤트에 포함됨                                             | authentication OR password   |
| `-`          | **제외**: 다음 용어가 이벤트에 없음(각각의 개별 원시 텍스트 검색에 적용)       | authentication AND -password |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}