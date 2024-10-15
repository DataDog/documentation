---
further_reading:
- link: /synthetics/search/
  tag: 설명서
  text: 신서틱(Synthetic) 테스트 검색 및 관리 방법 알아보기
title: 저장된 보기
---

## 개요

저장된 보기를 사용하면 **검색 및 관리** [신서틱 테스트 페이지][1]의 상태를 저장할 수 있습니다. 범위가 지정된 쿼리, 관련 패싯, [테스트 적용 범위 위젯][3] 및 시간 범위에 대한 빠른 액세스를 제공하여 효과적인 트러블슈팅]을 지원합니다.

저장된 보기를 사용하여 팀원들과 공통 쿼리 및 구성을 공유할 수도 있습니다.

## 저장된 페이지 생성

저장된 보기에 액세스하려면 [신서틱(Synthetic) 테스트 페이지][1]에서 **신서틱 모니터링 & 연속 테스트** 왼쪽에 있는 **> 보기**를 펼칩니다. 저장된 보기를 만들려면 신서틱 테스트를 검색하여**+ 새 보기를 다른 이름으로 저장** 을 클릭합니다. 

{{< img src="synthetics/search/create_a_new_saved_view_2.png" alt="Create a new saved view in the Synthetic Tests page" style="width:100%" >}}

[기본 보기](#default-views)를 제외한 모든 저장된 보기는 사용자가 생성한 저장된 커스텀 보기를 포함하여 조직 전체에서 공유됩니다. 보기는 조직의 누구나 편집할 수 있으며 보기를 생성한 사용자의 아바타를 표시합니다. 이름을 입력하고 **저장**을 클릭하면 신서틱 테스트 페이지의 현재 콘텐츠에서 저장된 보기가 생성됩니다.

다음을 할 수 있습니다.

- 저장된 보기 로드 또는 리로드
- 저장된 보기를 현재 보기의 설정으로 업데이트합니다
- 저장된 보기 이름 변경 또는 삭제
- 짧은 링크를 통해 저장된 보기 공유
- 탐색 메뉴에서 액세스할 수 있는 저장된 보기 목록에 추가할 저장된 보기 즐겨찾기

<div class="alert alert-info">읽기 전용 사용자에 대해서는 업데이트, 이름 변경 및 삭제 작업을 사용할 수 없습니다.</div>

## 기본 보기

[신서틱 테스트 페이지][2]에서 [저장된 보기](#create-a-saved-view)를 기본 랜딩 페이지로 설정할 수 있습니다. 기본 보기는 사용자별로 설정되며 조직에 영향을 주지 않습니다.

검색 쿼리에 패싯을 추가하고 **기본 보기 업데이트**를 클릭하여 기본 저장 보기를 일시적으로 재정의합니다. 새 저장된 보기를 만들려면 **+ 새 보기를 다른 이름으로 저장** 버튼을 클릭합니다.

{{< img src="synthetics/search/update_your_default_view_2.png" alt="Update your default view in the Synthetic Tests page" style="width:100%" >}}

**보기** 패널의 기본 보기 항목에서 다음을 수행할 수 있습니다:

- 기본 보기를 다시 로드하려면 항목을 클릭합니다
- 현재 파라미터로 기본 보기 업데이트
- 새로 시작하기 위해 기본 보기를 기본 설정으로 다시 설정

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ko/synthetics/search/
[3]: /ko/synthetics/test_coverage/