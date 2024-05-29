---
aliases:
- /ko/monitors/manage_monitor/
description: 모니터가 알림을 트리거하면 팀에 알림을 전송하세요.
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림
- link: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
  tag: 블로그
  text: 모니터 태그 지정 모범 사례
kind: 설명서
title: 모니터 관리
---

[모니터 관리][1]를 사용하여 모니터를 검색, 삭제, 음소거 및 확인하고 모니터 태그를 대량으로 편집합니다. 또한,  검색 결과에서 개별 모니터를 복제하거나 편집할 수 있습니다.

{{< img src="monitors/manage_monitor/monitor_page.jpg" alt="manage monitor page" >}}

## 검색

[모니터를 검색][2]하려면. 왼쪽 전면 패널이나 상단의 검색창을 사용해 쿼리를 작성합니다.

## 관리하기

검색 후, 하나 이상의 모니터를 선택하여 각 결과 옆에 있는 확인란을 사용하여 업데이트합니다. *상태* 열 머리글 옆에 있는 상단의 확인란을 사용하여 모든 결과를 선택합니다. 검색 결과 위 오른 쪽에 있는 버튼을 사용하여 모니터를 대량으로 수정합니다.

| 옵션     | 설명                                                                      |
|------------|----------------------------------------------------------------------------------|
| 음소거       | `1h`, `4h`, `12h`, `1d`, `1w` 동안이나  `Forever` 선택한 모니터를 [음소거][3]합니다. |
| 음소거 해제     | 선택한 모니터가 음소거되면 음소거를 해제합니다.                                 |
| 확인    | 선택한 모니터에 대한 알림을 [확인][4]합니다.                                |
| 삭제     | 선택한 모니터를 삭제합니다.                                                    |
| 태그 편집  | 선택한 모니터의 모니터 태그를 편집합니다.                                 |
| 팀 편집 | 선택한 모니터의 [팀][5]을 편집합니다.                                  |

개별 모니터를 편집하려면 모니터 위를 마우스로 가리키고 맨 오른쪽에 있는 편집, 복제, 음소거, 삭제 버튼을 사용합니다. 모니터에 대한 자세한 정보를 보려면 모니터 이름을 클릭해 상태 페이지를 확인합니다.

**참고**: 모바일 장치 홈 화면에서 저장된 모니터 보기를 확인할 수 있습니다. 또는 [Apple 앱 스토어][7] 또는 [Google Play 스토어][8]에서 [Datadog 모바일 앱[6]을 다운로드하여 모니터를 보고 음소거할 수 있습니다.

### 트리거된 모니터

[트리거된 모니터][9] 페이지를 사용해 대량으로 트리거된 모니터를 [음소거][3]하거나 [확인][4]할 수 있습니다. 이 페이지는 트리거된 상태(알림, 경고 또는 데이터 없음)의 모니터만 표시합니다.

#### 그룹화된 결과

트리거된 모니터 페이지는 각 모니터 그룹 각각에 대한 행(보고 출처)을 표시합니다. 예를 들어 트러거된 상태에서 14개 호스트를 사용해 호스트별로 그룹화된 모니터는 트리거된 모니터 페이지에서 14개 행을 표시합니다. 이를 통해 특정 보고 출처의 모니터를 음소거하거나 [확인][3]할 수 있습니다.

검색 쿼리를 작성할 때 트리거된 모니터 페이지에서 속성이 확인란으로 표시되지 않는 경우에도 모니터 관리 페이지에서 동일한 속성을 이용할 수 있습니다.

트리거된 모니터 페이지의 속성 차이:

* `group_status`는 `status` 대신 사용되는 속성 이름입니다.
* `triggered`를 통해 트리거 기간별로 모니터를 필터링할 수 있습니다.
* `group` 속성을 통해 하나 이상의 태그별로 그룹화된 모니터의 검색 결과를 상세화할 수 있습니다. 예를 들어 모니터를 `host` 및 `env`별로 그룹화할 수 있습니다. 검색 후, `host:web01,env:dev`, `host:web02,env:dev` , `host:web01,env:prod` 및 `host:web02,env:prod` 그룹과 함께 4개의 행을 볼 수 있습니다. `group` 속성을 사용해 prod 호스트(`group:"env:prod"`) 또는 web02 호스트(`group:"host:web02"`)만 표시할 수 있습니다.

### 모니터 태그

모니터 태그는 에이전트나 통합에서 전송한 태그와 별도입니다. [모니터 관리][1], [트리거된 모니터][9] 또는 [다운타임 관리][10] 페이지에서 필터링할 수 있도록 모니터에 최대 80개의 태그를 직접 추가합니다. [UI를 위한 태그 할당][11]에서 모니터 태그에 대해 자세히 알아보세요.

**참고** 모니터 태그가 모니터에서 생성한 알림 이벤트에 추가됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /ko/monitors/manage/search/
[3]: /ko/monitors/manage/status/#mute
[4]: /ko/monitors/manage/status/#resolve
[5]: /ko/account_management/teams/
[6]: /ko/service_management/mobile/#monitors
[7]: https://apps.apple.com/app/datadog/id1391380318
[8]: https://play.google.com/store/apps/details?id=com.datadog.app
[9]: https://app.datadoghq.com/monitors/triggered
[10]: https://app.datadoghq.com/monitors#downtime
[11]: /ko/getting_started/tagging/assigning_tags/?tab=monitors#ui