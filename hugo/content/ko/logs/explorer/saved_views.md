---
description: 저장된 보기를 사용하여 로그 익스플로러를 자동 설정합니다.
further_reading:
- link: logs/explorer/analytics
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
title: 저장된 보기
---

## 개요

효율적인 트러블슈팅을 위해서는 데이터를 적절한 **범위** 에 저장하여 탐색할 수 있도록 하고, **시각화 옵션**을 활용하여 의미 있는 정보를 표시하며 관련 **[패싯][1]**을 목록화하여 분석할 수 있어야 합니다.

트러블슈팅 방식은 상황에 따라 달라지며, 저장된 보기를 사용하면 사용자와 팀원이 서로 다른 트러블슈팅 상황 간에 쉽게 전환할 수 있도록 도와드립니다. 저장된 보기는 [로그 익스플로러][2] 왼쪽 상단에서 확인할 수 있습니다.

{{< img src="logs/explorer/saved_views/overview.mp4" alt="저장 보기 선택" video=true style="width:90%;" >}}

원칙적으로 저장된 보기는 다음을 계속 추적합니다:

- [검색 쿼리][3]를 시간 범위와 함께 추적합니다. **참고**: 저장된 보기는 실시간 범위(예: 지난 몇 시간 또는 지난 주)를 추적하는 용도이며, 확정된 시간 범위는 저장 시에 그대로 변환됩니다. 
- 사용자 지정 기본 시각화([로그 스트림][4], [로그 패턴][5] 또는 해당 시각화 속성을 갖춘 [로그 분석][6]).
- 패싯 목록에 표시되는 [선택 패싯 하위 집합][1].

## 기본 보기

{{< img src="logs/explorer/saved_views/default.png" alt="기본 보기" style="width:50%;" >}}

기존 로그 익스플로러 보기가 저장된 기본 보기입니다. 이 설정은 사용자만 액세스하고 볼 수 있습니다. 설정을 업데이트하여도 조직에 영향을 미치지 않습니다.

UI에서 작업을 완료하거나 다른 설정을 포함하는 로그 익스플로러 링크를 여는 경우 **임시로** 기본 저장된 보기를 덮어쓸 수 있습니다.

언제든지 보기 패널의 기본 보기 항목에서 다음을 수행할 수 있습니다:

* 항목을 클릭하여 기본 보기를 **다시 로드**합니다.
* 현재 파라미터를 사용해 기본 보기를 **업데이트**합니다.
* 완전한 재시작을 위해 기본 보기를 Datadog 기본값으로 **재설정**합니다.

## 저장된 보기

{{< img src="logs/explorer/saved_views/custom.png" alt="조직 전반의 저장된 보기" style="width:50%;" >}}

저장된 기본 보기가 아닌 저장된 모든 보기는 조직 전체에 공유됩니다:

* **통합 저장 보기**는 Datadog [로그 관리 통합][7]과 함께 기본 기능으로 제공됩니다. 본 보기는 읽기 전용이며 통합 로고로 구분할 수 있습니다.
* **커스텀 저장 보기**는 사용자가 생성하며, 조직 내 모든 사용자가 편집할 수 있고([사용자 읽기 전용][8] 제외), 이를 생성한 사용자의 아바타로 구분합니다. **저장** 버튼을 클릭해 익스플로러의 현재 컨텐츠에서 새 커스텀 저장 보기를 생성할 수 있습니다.

{{< img src="logs/explorer/saved_views/save.png" alt="로그 -- 저장" style="width:30%;" >}}

언제든지 보기 패널의 저장된 보기 항목에서 다음을 수행할 수 있습니다:

* **Load** 또는 **reload**가 저장된 보기입니다.
* **Update** 저장된 보기를 현재 보기의 설정으로 업데이트합니다.
* **Rename** 또는 **delete**가 저장된 보기입니다.
* **Share** 단축 링크를 통해 저장된 보기를 공유합니다.
* **Star**(즐겨찾기로 바뀜) 저장된 보기가 저장된 보기 목록의 맨 위에 나타나도록 하고 탐색 메뉴에서 바로 액세스할 수 있도록 합니다.

{{< img src="logs/explorer/saved_views/star.png" alt="즐겨찾기 표시된 보기" style="width:50%;" >}}

*참고*: 통합 저장 보기 및 [사용자 읽기 전용][8]의 경우 작업 업데이트, 이름 변경, 삭제가 비활성화됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/facets/
[2]: /ko/logs/explorer
[3]: /ko/logs/explorer/search/
[4]: /ko/logs/explorer/?tab=logstream#visualization
[5]: /ko/logs/explorer/patterns/
[6]: /ko/logs/explorer/analytics/
[7]: /ko/integrations/#cat-log-collection
[8]: /ko/account_management/rbac/permissions?tab=ui#general-permissions