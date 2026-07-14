---
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /notebooks/
  tag: 설명서
  text: 노트북
title: 목록 위젯
---

목록 위젯을 사용하면 주요 문제 목록을 표시할 수 있습니다.

{{< img src="dashboards/widgets/list/list_overview.png" alt="오류 목록, 오류 개수 및 양을 표시하는 목록 위젯." style="width:50%;">}}

## 설정

{{< img src="dashboards/widgets/list/list_setup.png" alt="목록 위젯 구성 모들" style="width:100%;">}}

### 설정

1. 그래프화할 데이터 유형을 선택합니다. 문제, 로그, 감사 추적 또는 이벤트에서 목록 위젯을 만들 수 있습니다.

2. 표시 기본 설정을 지정합니다. 스크린보드 및 노트북에서 위젯에 커스텀 타임프레임이 있는지 또는 글로벌 타임프레임을 사용하는지 선택합니다.

3. 선택 사항: 그래프에 타이틀을 지정합니다(또는 제안된 타이틀을 비워 둡니다).

### 옵션

#### 정렬 기준

주요 문제의 경우 다음을 기준으로 정렬할 수 있습니다.

* 오류 수(기본값)
* 가장 먼저 확인됨
* 영향을 받은 세션

**참고:** "정렬 기준" 선택을 변경해도 표시되는 열은 변경되지 않습니다. 영향을 받은 세션별로 정렬하도록 목록을 변경한 뒤 이를 위젯에서 보려면 그래프 편집기에서 "Impacted Sessions"를 선택하거나 추가해야 합니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 얻으시려면 [대시보드 API 가이드][1]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/dashboards/