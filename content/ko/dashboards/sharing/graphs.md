---
aliases:
- /ko/graphing/faq/is-there-a-way-to-share-graphs
- /ko/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /ko/graphing/dashboards/shared_graph/
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: 블로그
  text: 조직 외부인과도 안전하게 대시보드 공유하기
- link: /dashboards/
  tag: 설명서
  text: Datadog에서 대시보드 생성
- link: /dashboards/guide/embeddable-graphs-with-template-variables/
  tag: 가이드
  text: 템플릿 변수가 있는 내장 그래프
- link: /dashboards/widgets/
  tag: 설명서
  text: 대시보드용 위젯 살펴보기
title: 그래프 공유
---

그래프 공유하는 방법:

1. 공유하려는 그래프에서 오른쪽 상단에 있는 연필 아이콘을 클릭합니다.
1. *Graph your data* 섹션에서 **Share** 탭을 선택합니다.
1. 그래프의 시간 프레임을 선택합니다.
1. 그래프 크기를 선택합니다.
1. 범례를 포함할지 여부를 선택합니다.
1. **Generate embed code** 버튼으로 내장 코드를 가져옵니다.

{{< img src="dashboards/sharing/graph_share_tab.png" alt="그래프 편집기의 공유 탭" style="width:95%;">}}

모든 공유된 그래프의 목록을 [Public Sharing Settings 페이지][10]에서 확인할 수 있습니다. 또 이 페이지에서 각 공유된 그래프를 취소하거나 공유된 전체 그래프를 비활성화할 수 있습니다.

## 취소

개별(내장) 그래프를 공유하는 데 사용되는 키를 취소하는 방법은 다음과 같습니다.

1. [**Organization Settings > Public Sharing > Shared Graphs**][1]에서 공유된 모든 그래프 목록을 확인합니다.
2. 검색 창을 이용하거나 표 열을 정렬하여 그래프를 찾습니다.
3. 공유를 중지하려는 그래프 옆에 있는 **Revoke** 버튼을 클릭합니다.

## 제한 적용

대시보드 액세스를 IP 주소 기준으로 제한할 수 있습니다. 관리자가 공유 대시보드에 액세스할 수 있는 IP 주소 목록을 제공할 수 있도록 IP 주소 포함 목록 기능을 활성화하려면 [Datadog 지원팀][2]으로 이메일을 보내주세요. 활성화 후에는 조직의 [Public Sharing][3] 페이지에서 제한 사항을 관리하세요.

## API

Datadog에는 공유 그래프(임베드)와 상호 작용할 수 있는 [전용 API][4]가 있습니다.

| 엔드포인트                 | 설명                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [모든 임베드 가져오기][5]     | 이전에 만든 내장 그래프 목록을 가져옵니다.                     |
| [임베드 생성하기][6]       | 새 내장 그래프를 만듭니다.                                         |
| [특정 임베드 가져오기][7] | `embed_id`의 이전에 생성된 내장 요소에 대한 HTML 조각을 가져옵니다. |
| [임베드 활성화하기][8]       | 특정 내장 요소를 활성화합니다.                                             |
| [임베드 취소하기][9]       | 특정 내장 요소를 취소합니다.                                             |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/public-sharing/shared-graphs
[2]: /ko/help/
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[4]: /ko/api/latest/embeddable-graphs/
[5]: /ko/api/latest/embeddable-graphs/#get-all-embeds
[6]: /ko/api/latest/embeddable-graphs/#create-embed
[7]: /ko/api/latest/embeddable-graphs/#get-specific-embed
[8]: /ko/api/latest/embeddable-graphs/#enable-embed
[9]: /ko/api/latest/embeddable-graphs/#revoke-embed
[10]: https://app.datadoghq.com/organization-settings/public-sharing