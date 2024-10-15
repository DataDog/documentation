---
description: 신서틱 테스트를 검색하고 관리하는 방법 알아보기
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드 투 엔드 테스트 생성 모범 사례
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: 블로그
  text: 엔드 투 엔드 테스트 유지 관리 모범 사례
- link: /synthetics/search/saved_views
  tag: 설명서
  text: 저장된 보기에 대해 알아보기
- link: /continuous_testing/explorer
  tag: 설명서
  text: 신서틱 모니터링 및 테스트 결과 탐색기에 대해 자세히 알아보기
- link: /service_management/events/explorer
  tag: 설명서
  text: 이벤트 탐색기에 대해 알아보기
title: 신서틱 테스트 검색 및 관리
---

## 개요

[신서틱 테스트 페이지][1]에서 모든 테스트에 액세스하고, [검색](#search-for-tests)하고, [관리](#manage-tests)할 수 있습니다.

{{< img src="synthetics/search/synthetic_tests_page_2.png" alt="신서틱 모니터링 테스트 페이지" style="width:100%" >}}

[패싯](#facets-and-tags)을 사용해 다음 작업을 할 수 있습니다.

- 특정 신서틱 테스트 검색
- 테스트 관리 대량 작업

## 테스트 검색

### 패싯 및 태그

좌측에 있는 **Synthetics Filters** 패널에서 테스트 검색에 사용할 수 있는 기본 패싯 목록을 볼 수 있습니다.

기본 패싯에는 다음이 있습니다.

| 패싯          | 설명                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `Type`         | 신서틱 테스트 종류: `browser`, `api`, `api-multi`, `api-websocket`, `api-ssl`, `api-dns`, `api-tcp`, `api-udp`, `api-icmp`, 또는 `api-grpc` |
| `Status`       | 신서틱 테스트 상태: `OK`, `Alert`, 또는 `No Data`                       |
| `Creator`      | 신서틱 테스트 생성자                                            |
| `Team`         | 신서틱 테스트 응답을 담당하고 있는 팀                    |
| `Region`       | 신서틱 테스트를 실행 및 관리 중인 프라이빗 위치         |
| `State`        | 신서틱 테스트 상태: `live` 또는 `paused`                          |
| `Notification` | 신서틱 테스트에서 알림을 보낼 때 사용하는 핸들                      |
| `Env`          | 신서틱 테스트가 실행 중인 환경                             |
| `CI/CD Execution Rule` | 테스트 실행 상태: `Blocking`, `Non-blocking`, or `Skipped` |

**Synthetic Filters** 아래 **Tags** 패널에서 테스트를 확인할 때 사용할 수 있는 기본 태그 여럿을 목록으로 볼 수 있습니다.

기본 태그에는 다음이 포함되어 있습니다.

| 태그          | 설명                                                                     |
|----------------|-------------------------------------------------------------------------------|
| `Tag`          | 신서틱 테스트에 할당된 태그                                       |
| `Service`      | 신서틱 테스트가 실행 중인 서비스                                 |
| `Private Locations`| 프라이빗 위치가 활성화되어 있는지 여부: `true` 또는 `false`          |

자세한 정보는 [태그 사용][4]을 참고하세요.

### 검색 쿼리 생성하기

좌측에 있는 패싯을 클릭하거나 검색 창에 커스텀 쿼리를 써서 테스트를 검색할 수 있습니다. 쿼리를 편집하면 검색 결과가 실시간으로 업데이트됩니다.

패싯을 선택하거나 선택 해제하면 검색 창에 변경 사항이 자동으로 반영됩니다. 마찬가지로, 검색 창 쿼리를 수정하거나 검색 창에 쿼리를 처음부터 써서 좌측 패싯을 선택하거나 선택 해제할 수 있습니다.

* **일반 텍스트로 검색**: 테스트 이름을 검색하려면 검색 창에 텍스트를 입력하세요
* **단일 패싯 검색**: 특정 패싯 값 하나를 포함하는 검색 쿼리를 생성하려면 패싯 값 하나를 선택하세요(예: `type:api`). 검색에 동일한 패싯의 다른 값을 추가하려면 추가 값 확인란을 클릭하세요. 또 `OR` 부울 연산자를 사용하고 따옴표와 괄호로 값을 래핑하여 값을 추가할 수도 있습니다(예: `type:("api" OR "api-ssl")`).
* **패싯과 텍스트 여러 개 검색**: 여러 패싯 종류 중에서 패싯 값을 선택해 패싯을 여러 개 필터링하는 검색 쿼리를 사용자 지정합니다(예: `type:api region:aws:us-east-2`). 또 패싯과 텍스트를 혼합할 수도 있습니다(예: `checkout type:browser`). 여러 용어를 검색할 때는 보이지 않지만 `AND` 부울 연산자가 적용됩니다. 
* **메시지 검색**: [테스트 모니터][5]에 구성된 테스트 알림 메시지를 필터링하는 검색 쿼리를 생성하려면 메시지를 추가하세요(예: `message:testcontent`).
* **패싯이나 텍스트 제외**: 확인 표시된 확인란을 클릭해 패싯 값을 선택 해제하거나 용어 앞에 `-`를 추가해 검색 쿼리에서 제외되도록 하세요(예: `-state:paused`).
* **커스텀 일치 실행**: 와일드카드(`*`)를 사용하세요(예: `valid*`).

신서틱 테스트 종류를 검색하려면 **Type** 패싯 아래 테스트 종류를 선택하세요.

{{< img src="synthetics/search/facet_search_2.mp4" alt="Tests 페이지에서 패싯을 사용해 테스트 검색" video=true >}}

## 테스트 관리

### 대량 작업

[신서틱 테스트 페이지][1]에서 테스트를 하나 이상 선택하고 **Edit Tags**, **Run Tests Now**, 또는 **Delete**를 클릭해 신서틱 테스트 대량으로 관리할 수 있습니다.

{{< img src="synthetics/search/edit_tags_2.mp4" alt="신서틱 테스트의 대량 태그 편집" video=true >}}

### 테스트 작업

테스트 우측에 있는 케밥 아이콘 메뉴를 클릭하면 `Pause`, `Run Test Now`, `Edit Test`, `Clone`, `Delete`와 같은 아이콘 옵션이 나타납니다. 브라우저 테스트의 경우 `Edit Recording` 옵션도 나타납니다.

{{< img src="synthetics/search/test_option_2.mp4" alt="신서틱 테스트 우측에 있는 케밥 아이콘 메뉴를 클릭하면 나타나는 옵션" video="true" width="100%">}}

### 이벤트 추적

신서틱 테스트, 전역 변수, 프라이빗 위치를 생성, 추가, 삭제하면 [Events Explorer][6]에 이벤트가 생성됩니다. 이벤트에는 변경 사항과 변경한 사용자 정보가 나타납니다.

{{< img src="synthetics/search/synthetic_events_2.png" alt="Events Explorer에 있는 신서틱 테스트 알림" style="width:100%" >}}

검색 창에서 테스트 모니터의 알림을 검색하거나 **Event** 템플릿 변수 아래에서 이벤트 유형을 선택해(예: `Event Type:synthetics_alert`) 신서틱 관련 변경 사항을 모두 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: /ko/synthetics/metrics/
[3]: /ko/synthetics/dashboards/
[4]: /ko/getting_started/tagging/using_tags/#synthetics
[5]: /ko/synthetics/guide/synthetic-test-monitors/
[6]: https://app.datadoghq.com/event/explorer