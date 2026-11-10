---
description: Error Tracking 탐색기에 대해 알아보세요.
further_reading:
- link: /monitors/types/error_tracking
  tag: 문서
  text: Error Tracking 모니터에 대해 알아보기
title: Error Tracking 탐색기
---
## 개요 {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Error Tracking 탐색기의 이슈 세부 정보" style="width:100%;" >}}

Error Tracking 탐색기를 사용하면 이슈를 조회 및 필터링하고 조사할 수 있습니다. 이슈는 동일한 버그와 관련된 유사 오류 그룹입니다. Datadog은 오류 유형, 오류 메시지 또는 스택 트레이스와 같은 일부 속성을 사용해 각 오류의 핑거프린트를 계산하여 이슈를 생성합니다. 핑거프린트가 동일한 오류는 동일한 이슈로 함께 그룹화됩니다.

## 이슈 탐색 {#explore-your-issues}

Error Tracking 탐색기에 나열된 각 항목은 오류에 대한 높은 수준의 정보를 담고 있는 이슈로, 다음을 포함합니다.

-   오류 유형 및 오류 메시지
-   기저 오류가 발생하는 파일의 경로
-   이슈의 수명 주기에 관한 중요 정보:
    -   처음이자 마지막으로 본 시간
    -   시간에 따른 발생 그래프
    -   선택한 기간의 발생 횟수

이슈에는 다음과 같은 태그도 지정됩니다.
- `New`: 이슈가 지난 이틀 이내에 처음 발견되었고 상태가 {{< ui >}}FOR REVIEW{{< /ui >}}인 경우([이슈 상태][5] 참조)
- `Regression`: 이슈가 {{< ui >}}RESOLVED{{< /ui >}} 상태였는데 최신 버전에서 다시 발생한 경우([회귀 탐지][6] 참조)
- `Crash`: 애플리케이션이 충돌한 경우
- [의심되는 원인][3]이 있는 경우

### 시간 범위 {#time-range}

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Error Tracking 시간 범위" style="width:80%;" >}}

시간 범위는 탐색기 오른쪽 상단에 타임라인으로 표시됩니다. 이 기능을 사용하면 선택한 기간 내에 오류가 발생한 이슈를 표시할 수 있습니다. 드롭다운에서 사전 설정된 범위를 선택하여 시간 범위를 변경합니다.

### 정렬 {#sorting}

다음 옵션 중 하나를 사용하여 목록 내 이슈를 정렬할 수 있습니다.
-   {{< ui >}}Relevance{{< /ui >}} 옵션은 이슈의 여러 특성을 결합하여 코드 관련 이슈, 최근 발생한 이슈 또는 발생 횟수가 급증한 이슈에 우선순위를 부여합니다. Error Tracking은 이슈 발생 후 경과 시간, 지난 하루 동안의 발생 횟수, 지난 한 시간 동안 발생 횟수의 증가 정도, 애플리케이션 충돌 유발 여부를 분석합니다.
-   {{< ui >}}Count{{< /ui >}} 선택한 시간 범위 중 총 발생 횟수를 기준으로 이슈를 정렬합니다.
-   {{< ui >}}Newest{{< /ui >}} 처음 발견된 시점을 기준으로 이슈를 정렬합니다.
-   {{< ui >}}Impacted Sessions{{< /ui >}} 영향을 받은 [RUM 세션][4] 수를 기준으로 이슈를 정렬합니다.

### 패싯 {#facets}

{{< img src="/error_tracking/facets-panel-2.png" alt="Error Tracking 패싯" style="width:100%;" >}}

Error Tracking은 이슈의 사전 정의된 속성 목록을 자동으로 인덱싱하고 이를 기반으로 패싯을 생성합니다. 패싯은 선택한 기간 동안 속성의 모든 고유 멤버를 표시하고 나타나는 이슈 개수와 같은 몇 가지 기본 분석 정보를 제공합니다. 패싯을 사용하면 주어진 속성을 기준으로 이슈를 피벗하거나 필터링할 수 있습니다.

일반적으로 사용되는 오류 속성은 다음과 같습니다.
| 속성 | 설명 |
|-----------|-------------|
| `error.message`| 오류와 관련된 메시지입니다. |
| `error.type` | 오류의 유형 또는 클래스입니다. |
| `error.stack` | 오류와 관련된 스택 트레이스입니다. |
| `error.handling` | 오류가 처리되었는지 여부를 나타냅니다. 상위 스팬이 성공적인 작업(`HTTP 200`, `gRPC OK`) 또는 성공적인 오류 처리(`HTTP 400`, `gRPC NOT_FOUND`)를 보고하는 경우 APM 오류는 `handled`로 간주됩니다. RUM 오류는 코드에서 수동으로 캡처되지 않은 경우 `unhandled`입니다. |

편집 아이콘을 클릭하여 표시하거나 숨길 수 있는 패싯 목록을 볼 수 있습니다.

{{< img src="/error_tracking/error-tracking-facets.png" alt="연필 아이콘을 클릭하여 Error Tracking 패싯을 숨기거나 표시할 수 있습니다." style="width:100%;" >}}

### 이슈 수준 필터 {#issue-level-filters}

오류 이벤트 외에도 Error Tracking은 표시된 이슈 목록을 세분화할 수 있는 이슈 수준 필터를 제공합니다.

{{< img src="error_tracking/issue-level-filters-2.png" alt="Error Tracking의 이슈 수준 필터" style="width:100%;" >}}

#### 소스 {#sources}

Error Tracking은 여러 Datadog 제품(RUM, Logs, APM)의 오류를 하나의 보기로 통합하여 전체 스택에서 오류를 모니터링하고 문제를 해결할 수 있도록 합니다. 탐색기에서 {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} 또는 {{< ui >}}Backend{{< /ui >}} 이슈를 표시하도록 선택할 수 있습니다.

더 세부적인 필터링을 원할 경우 특정 로그 소스나 SDK별로 이슈 범위를 좁히거나 특정 프로그래밍 언어로 대상을 제한할 수 있습니다.

#### 수정 사항 제공 가능 {#fix-available}

문제를 신속하게 해결할 수 있도록 AI가 생성한 수정 사항이 있는 이슈만 표시합니다.

#### Teams 필터 {#teams-filters}

[이슈 담당 팀 지정][2]은 Git `CODEOWNERS` 및 서비스 소유자를 사용하여 팀과 관련된 이슈를 신속하게 식별하도록 지원합니다.

#### 지정된 담당자 {#assigned-to}

이슈를 추적하여 자신이나 해당 분야에 가장 정통한 팀원에게 할당한 다음 담당자별로 이슈 목록을 손쉽게 세분화합니다.

#### 의심되는 원인 {#suspected-cause}

[의심되는 원인][3]은 오류를 더 빠르게 필터링하고 우선순위를 지정할 수 있게 하여 팀이 잠재적인 근본 원인을 더 효과적으로 해결하도록 지원합니다.

## 이슈 점검 {#inspect-an-issue}

이슈를 클릭하면 이슈 패널이 열리고 해당 이슈에 대한 자세한 정보를 확인할 수 있습니다.

{{< img src="real_user_monitoring/error_tracking/issue_summary_2.png" alt="이슈에 대한 요약 정보를 제공하는 Error Tracking 이슈 패널의 상단 부분" style="width:80%;" >}}

이슈를 해결할 때 필요한 상위 수준의 세부 정보는 패널 상단에서 확인할 수 있습니다. 여기에서 해당 이슈의 수명 주기(최초 및 최종 발생 날짜, 총 발생 횟수, 시간 경과에 따른 발생 횟수)를 파악할 수 있습니다.

{{< img src="real_user_monitoring/error_tracking/error_sample_2.png" alt="오류 샘플을 제공하는 Error Tracking 이슈 패널의 하단 부분" style="width:80%;" >}}

이슈 패널에 표시되는 정보는 오류 소스에 따라 다릅니다. 예를 들어 APM 오류에서 생성된 이슈에는 리소스 또는 작업 이름과 같은 오류 스팬 태그가 표시되며, 관련 트레이스 또는 연결된 로그에 직접 액세스할 수 있습니다.

이슈 패널 하단에서는 관련 이슈의 오류 샘플을 탐색할 수 있습니다. 각 오류 샘플은 오류의 스택 트레이스 및 영향을 받는 사용자의 특성과 같은 문제 해결 정보를 제공합니다.

## 새로운 오류나 영향력이 큰 오류에 대한 알림 받기 {#get-alerted-on-new-or-impactful-errors}

새로운 이슈가 발생하는 즉시 확인하면 이슈가 심각해지기 전에 선제적으로 식별하고 수정할 수 있습니다. Error Tracking 모니터를 사용하면 새로운 이슈나 시스템 또는 사용자에게 큰 영향을 미치는 이슈를 추적할 수 있습니다([Error Tracking 모니터][7] 참조)

탐색기에서 검색 쿼리를 직접 내보내 관련 범위에 대한 Error Tracking 모니터를 생성할 수 있습니다.

{{< img src="/error_tracking/create-monitor.mp4" alt="검색 쿼리를 Error Tracking 모니터로 내보내기" video=true >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/events
[2]: /ko/error_tracking/issue_team_ownership
[3]: /ko/error_tracking/suspected_causes
[4]: /ko/real_user_monitoring/explorer/search/#event-types
[5]: /ko/error_tracking/issue_states
[6]: /ko/error_tracking/regression_detection
[7]: /ko/monitors/types/error_tracking