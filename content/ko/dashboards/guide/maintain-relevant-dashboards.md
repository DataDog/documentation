---
aliases:
- /ko/graphing/faq/maintain-relevant-dashboards
- /ko/graphing/guide/maintain-relevant-dashboards
title: 관련 대시보드 유지 관리를 위한 모범 사례
---

대시보드 목록 페이지가 잘 정리되어 있지 않으면 올바른 콘텐츠를 찾기 어렵고, 검색 쿼리에 사용되지 않거나 무관한 결과가 나타나 복잡할 수 있습니다. [**Recently Deleted** 대시보드][1]와 대량 삭제를 함께 사용하면 불필요한 대시보드를 대규모로 제거하고, 실수로 삭제한 항목을 복원할 수 있습니다. 이 가이드에서는 다음을 설명합니다.

- 정기적으로 제거할 수 있도록 사용되지 않는 대시보드를 파악하는 일반적인 방법
- 유지 관리 가능한 목록 페이지를 유지 관리하기 위한 모범 사례

## 미사용 대시보드 찾기

모든 미사용 대시보드를 찾는 작업은 까다롭지만, 이러한 가이드라인은 대부분의 미사용 콘텐츠를 식별하고 대시보드 혼란을 크게 줄이는 데 도움이 될 수 있습니다. 대시보드를 삭제하기 전에 목록 페이지에 대해 참고해야 할 사항 몇 가지는 다음과 같습니다.

- **All Custom** 프리셋 목록으로 시작합니다. 커스텀 대시보드만 삭제할 수 있습니다.
- 확인란 열을 클릭하면 현재 페이지의 모든 대시보드가 선택됩니다.
- 공유 대시보드를 삭제하지 마세요. 퍼블릭 또는 인증된 공유 링크가 있는 대시보드는 이름 옆에 **SHARED**가 표시됩니다. 퍼블릭 보기에 영향을 줄 수 있으므로 이러한 대시보드를 삭제하지 않는 것이 더 안전할 수 있습니다.

실수로 삭제한 항목을 복원하려면 **Recently Deleted** 목록으로 이동하세요. 이 목록에는 지난 30일 동안 삭제된 대시보드가 표시되며 가장 최근에 삭제된 대시보드가 먼저 자동으로 표시됩니다. [API를 통해][2] 대시보드를 대량으로 복원할 수도 있습니다.

{{< img src="dashboards/guide/restore_deleted.png" alt="삭제된 대시보드 복원" style="width:80%;">}}

### 삭제 가이드라인

#### 1. 인기도 역순 정렬

**Popularity** 열을 클릭하면 인기도 역순으로 정렬됩니다. 이 목록은 가장 최근에 수정된 대시보드를 자동으로 맨 위에 놓습니다. 이러한 대시보드의 인기도가 낮고 지난 3개월 동안 수정되지 않았다면 삭제하는 것이 안전할 수 있습니다.

**참고:** 비공식 공용 저장소인 Datadog Miscellany에는 지난 3개월 동안 수정되지 않은 [대시보드 및 모니터를 제거하는 스크립트][3]가 있습니다.

#### 2. 기본 타이틀 검색

다음과 같은 용어를 검색합니다.
- "'s timeboard"
- "'s screenboard"
- "'s dashboard"

이러한 문자열이 포함된 많은 대시보드에는 기본 제목이 있습니다(예: “Stephanie's Dashboard Thu, Jun 3, 1:41:44 pm”). 기본 제목은 빠르게 생성되고 이름이 변경되지 않은 테스트 대시보드를 나타낼 수 있습니다. 특히 오래되었거나 인기도가 낮은 경우에는 이러한 대시보드를 삭제하는 것이 안전할 수 있습니다. 예를 들어, 아래 이미지는 "s screenboard"를 검색하여 **All Custom**으로 필터링된 검색 결과를 인기도별로 역순 정렬한 결과입니다.

**참고:** 비공식 퍼블릭 저장소인 Datadog Miscellany에는 [타이틀에 따라 대시보드를 삭제하는 스크립트][4]가 있습니다.

{{< img src="dashboards/guide/screenboard_search.jpeg" alt="''s screenboard' 검색" style="width:80%;">}}

#### 3. "test"와 같은 키워드 검색

`test` 또는 `cloned` 등과 같이 대시보드가 일시적으로만 사용되었음을 나타내는 용어를 검색합니다. 이러한 용어는 빈번히 사용되는 대시보드에 라벨을 지정하는 데 사용할 수 있으므로 주의해서 삭제하거나, 타이틀과 함께 대시보드의 사용 기간 및 인기도를 살펴보아야 합니다.

## 깔끔한 대시보드를 위한 모범 사례

주기적인 청소는 대시보드 혼란을 줄입니다. 대시보드 유지 관리를 위한 모범 사례가 훨씬 더 효과적일 수 있습니다. 이러한 관행은 팀이 대시보드를 장기적으로 유지 관리할 수 있도록 보장하는 데 도움이 됩니다.

- 필요한 항목을 찾으려면 커스텀 목록을 사용하세요. 서비스 이름과 같은 키워드로 검색하고, 여러 개의 대시보드를 선택하여 목록에 추가하세요.
- 노트북 또는 Quick Graphs에서 일회성 탐색을 저장합니다. 개별 메트릭이나 그래프를 탐색할 때에는 삭제해야 하는 새 대시보드를 만드는 대신 기본적으로 저장되지 않는 [Notebooks][5] 또는 [Quick Graphs][6]를 사용해 보세요.
- [대시보드 세부 정보][7]에 대시보드의 용도와 사용 방법을 추가하세요. 이렇게하면 팀원들이 대시보드의 용도를 쉽게 이해할 수 있고, 더 잘 활용할 수 있습니다.

[대량 삭제][8] 및 [대량 복원][2] 대시보드의 엔드포인트를 포함하는 Dashboards API를 사용하여 프로그래밍 방식으로 대시보드를 유지 관리할 수도 있습니다.

## 부록
**참고**: Datadog Miscellany는 비공식 퍼블릭 저장소이며 Datadog에서 능동적으로 유지 관리하지 않습니다.

- [Documentation: Restore deleted dashboards in UI][1]
- [API: Delete dashboards endpoint][8]
- [API: Restore deleted dashboards endpoint][2]
- [Datadog Miscellany: Remove old dashboards and monitors][3]
- [Datadog Miscellany: Delete dashboards based on text in title][4]

[1]: https://docs.datadoghq.com/ko/dashboards/list/#restore-deleted-dashboards
[2]: https://docs.datadoghq.com/ko/api/latest/dashboards/#restore-deleted-dashboards
[3]: https://github.com/DataDog/Miscellany/tree/master/remove_old_dash_monitors
[4]: https://github.com/DataDog/Miscellany/tree/master/delete_dashboards_by_text_search
[5]: https://docs.datadoghq.com/ko/notebooks/#overview
[6]: https://docs.datadoghq.com/ko/dashboards/guide/quick-graphs/#overview
[7]: https://www.datadoghq.com/blog/dashboard-details/
[8]: https://docs.datadoghq.com/ko/api/latest/dashboards/#delete-dashboards