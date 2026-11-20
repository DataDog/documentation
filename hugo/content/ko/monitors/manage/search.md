---
description: 패싯 검색을 사용해 모니터 목록을 필터링
further_reading:
- link: /getting_started/search/
  tag: 설명서
  text: Datadog에서 검색 시작
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: 블로그
  text: 모니터를 효과적으로 감사 및 정리하는 방법
title: 모니터 검색
---
모니터를 검색하려면 왼쪽 패싯 패널 및/또는 상단 검색창을 사용하여 쿼리를 작성합니다. 속성을 선택하면 검색창이 해당 쿼리로 업데이트됩니다. 마찬가지로, 검색창 쿼리를 수정하거나 새로 작성하면 속성 확인란이 변경 사항을 반영하도록 업데이트됩니다. 어떤 경우든 쿼리를 편집하면 쿼리 결과가 실시간으로 업데이트됩니다. **참고**: 클릭할 수 있는 *검색* 버튼은 없습니다.

## 검색창 {#search-bar}

간단한 텍스트를 사용하여 모든 모니터 제목과 알림 메시지에서 검색하세요. 예를 들어 `*postgresql*`을 검색하면 제목이나 알림 메시지 중 어디든 `postgresql`이 포함된
모든 모니터가 반환됩니다.

검색을 제한하려면 필드 이름을 지정하세요.

| 항목    | 설명                                            | 예시        |
|---------|--------------------------------------------------------|----------------|
| 제목   | 모니터 제목에서 텍스트로 검색하세요.                | `title:text`   |
| 메시지 | 모니터의 알림 메시지에서 텍스트로 검색하세요. | `message:text` |

또한 ID를 사용하여 모니터를 검색할 수 있습니다(예: `1234567`). 모니터 ID는 [모니터 상태 페이지][1]에서 확인할 수 있습니다.

<div class="alert alert-info">모니터 그룹을 필터링하는 방법은 <a href="/monitors/manage/status/">Monitor Status 페이지</a>를 참조하세요.</div>

### 쿼리 {#query}

불리언 연산자(`AND`, `OR`, `NOT`)와 괄호를 사용하여 검색 쿼리를 개선하세요. 검색 구문은 [Elasticsearch][2]와 유사하지만 다음과 같은 예외가 있습니다.

* 정규식은 지원되지 않습니다.
* 단일 문자 와일드카드(`?`)와 일반 와일드카드(`*`)가 모두 지원됩니다.
* 근접 검색은 지원되지 않지만 [퍼지][3] 연산자는 지원됩니다.
* 범위는 지원되지 않습니다.
* 부스팅(Boosting)은 지원되지 않습니다.

`-`, `(`, `)`, `"`, `~`, `*`, `:`, `.` 및 공백 등의 문자는 예약되어 있습니다. 예약된 문자가 포함된 모니터 필드를 검색하려면 필드 문자열을 따옴표로 묶어야 합니다. 예를 들어, `status:Alert AND "chef-client"`는 유효한 쿼리 문자열입니다.

따옴표로 묶은 필드와 관련하여 몇 가지 주의 사항이 있습니다.

* 일부 필드에 흔히 나타나는 `.`은 따옴표로 묶거나 묶지 않고 사용할 수 있습니다. 예를 들어, `metric:system.cpu.idle`은 유효합니다.
* 따옴표로 묶인 문자열 내에서는 와일드카드 검색이 지원되지 않습니다. 예를 들어, `*`을 문자 그대로 처리하므로 `"chef-client*"`는 제목이 `"chef-client failing"`인 모니터를 반환하지 않습니다.
* 콜론이 포함된 값에서 와일드카드를 사용하려면 따옴표를 사용하는 대신 백슬래시(`\`)로 콜론을 이스케이프 처리하세요. 예를 들어, `tag:service\:*`은 `service` 태그가 있는 모든 모니터를 태그 값에 관계없이 반환합니다.

## 속성 {#attributes}

고급 검색을 사용하면 다양한 모니터 속성을 조합해 모니터를 필터링할 수 있습니다.

| 속성    | 설명                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| 상태       | 모니터 상태: `Triggered` (`Alert`, `Warn`, `No Data`) 또는 `OK`                            |
| 음소거        | 모니터의 음소거 상태: `true` 또는 `false`                                               |
| 유형         | Datadog [모니터 유형][4]                                                                   |
| 생성자      | 모니터 생성자                                                                      |
| 서비스      | 사용자가 `service:<VALUE>` 형식으로 사용한 서비스 태그입니다.                                         |
| 태그          | 모니터에 할당된 [태그][5]                                               |
| 환경          | 사용자가 `env:<VALUE>` 형식으로 사용한 환경 태그입니다.                                         |
| 범위        | 모니터 쿼리의 `from` 필드에 나열된 검색 태그입니다.                                   |
| 메트릭/검사 | 모니터링 중인 메트릭 또는 서비스 검사                                                     |
| 알림 | 알림을 받는 사람 또는 서비스                                                  |
| 음소거 남은 시간   | 가동 중지로 인해 이 모니터의 알림 음소거를 해제하기까지 남은 시간입니다. `muted_left:30m`으로 검색하면 최대 30분 동안 여전히 음소거 상태인 모든 모니터가 반환됩니다. 지원되는 단위는 초(`s`), 분(`m`), 시간(`h`), 주(`w`)입니다.    |
| 음소거 경과 시간 | 가동 중지로 인해 이 모니터의 알림이 음소거되기 시작한 후 경과한 시간입니다. `muted_elapsed:30d`로 검색하면 최소 30일 동안 음소거 상태였던 모든 모니터가 반환됩니다. 지원되는 단위는 초(`s`), 분(`m`), 시간(`h`), 주(`w`)입니다. |

원하는 만큼 확인란을 선택하여 모니터를 찾으세요. 다음 규칙이 적용됩니다.

* 서로 다른 필드의 속성을 선택하면 `AND` 연산자가 적용됩니다. 예: `status:Alert type:Metric`(두 검색어 사이에 연산자가 없으면 `AND` 연산자가 적용된다는 것을 의미함).
* 대부분의 경우 동일한 필드의 속성을 선택하면 `OR` 연산자가 적용됩니다. 예: `status:(Alert OR Warn)`. 일부 예외가 있습니다. 예를 들어 여러 범위나 서비스 태그를 선택하면 `AND` 연산자가 적용됩니다.
* 일부 속성은 여러 값을 선택할 수 없습니다. 예를 들어 메트릭이나 서비스 검사를 선택하면 선택 항목을 해제할 때까지 목록에서 다른 옵션이 사라집니다.
* {{< ui >}}Status{{< /ui >}} 속성 아래의 `Triggered` 확인란이 `status:(Alert OR Warn OR "No Data")`로 변환됩니다. Triggered는 유효한 모니터 상태가 아닙니다.
* {{< ui >}}Metric/Check{{< /ui >}} 속성의 이름은 쿼리에서 항상 `metric`입니다. 예를 들어 `http.can_connect` 검사를 선택하면 `metric:http.can_connect`로 변환됩니다.

**참고**: 모니터 전반에서 속성 값이 많은 경우, 속성 검색창을 사용하여 올바른 값을 찾으세요.

## Saved Views {#saved-view}

Saved Views를 활용해 빠르게 사전 설정 보기로 이동하여 팀 모니터 또는 60일 이상 음소거된 모니터 등 컨텍스트에 맞는 모니터를 찾을 수 있습니다.

{{< img src="monitors/manage_monitor/overview.jpg" alt="Saved Views 선택" style="width:90%;" >}}

Saved Views는 조직의 모든 사람이 볼 수 있습니다.
기술적으로 Saved Views는 다음을 추적합니다.

- 검색 쿼리

### 기본 보기 {#default-view}

{{< img src="monitors/manage_monitor/default.jpg" alt="기본 보기" style="width:50%;" >}}

기존 Manage Monitor 보기가 기본 Saved Views입니다. 이 구성은 본인만 액세스하고 조회할 수 있으며, 이 구성을 업데이트해도 조직에는 영향이 없습니다.

UI에서 작업을 완료하거나 다른 구성이 임베드된 Manage Monitor 페이지로의 링크를 열면 기본 Saved Views를 **일시적으로** 재정의할 수 있습니다.

기본 보기에서 보기 패널의 항목:

* {{< ui >}}Reload{{< /ui >}} 항목을 클릭하여 기본 보기를 다시 불러옵니다.
* {{< ui >}}Update{{< /ui >}} 현재 파라미터를 사용하여 기본 보기를 업데이트합니다.
* {{< ui >}}Reset{{< /ui >}} 새로 시작할 수 있도록 기본 보기를 Datadog 기본값으로 재설정합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/status/#properties
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: /ko/monitors/
[5]: /ko/monitors/manage/#monitor-tags