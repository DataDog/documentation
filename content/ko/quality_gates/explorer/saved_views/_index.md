---
further_reading:
- link: /quality_gates/explorer/search_syntax/
  tag: 설명서
  text: 검색 쿼리 생성하는 방법 알아보기
title: \u0008저장된 뷰
---

{{< callout url="#" btn_hidden="true" >}}
Quality Gates는 공용 베타 서비스 중입니다.
{{< /callout >}}

## 개요

저장된 보기를 사용하면 [**Quality Gate Executions** 페이지][1]의 [Quality Gates Explorer][2]의 상태를 저장할 수 있고, 범위 지정된 쿼리, 관련 패싯, 가시화 옵션, 시간 범위와 같은 정보를 확인할 수 있어 트러블슈팅을 효과적으로 할 수 있습니다.

저장된 보기를 사용하면 다음을 추적할 수 있습니다.

- Quality Gate 실행 및 규칙 실행
- 검색 쿼리 
- 열 정렬 순서
- 실시간 범위(예: 최근 4시간 또는 지난 주)
- 시각화(예: 시간열, 상위 목록, 테이블, 또는 깔때기형 그래프)
- 패싯 하위 집합

저장된 보기를 사용해 팀원과 일반적인 쿼리와 구성을 공유할 수도 있습니다.

## 저장된 보기

저장된 보기에 액세스하려면 [Quality Gates Explorer][1] 좌측에서 Expand **> Views**를 클릭하세요.

[기본 보기](#default-views)를 제외하고 사용자가 생성한 커스텀 저장 보기를 포함한 저장된 보기 전체가 조직 전체와 공유됩니다. 누구나 이 보기를 편집할 수 있고 보기를 생성한 사용자의 아바타가 표시됩니다. Explorer의 현재 내용의 저장된 보기를 만들려면 **Save**를 클릭하세요.

{{< img src="quality_gates/explorer/expand_view.png" text="Quality Gates Explorer에서 저장된 보기 생성" style="width:100%" >}}

다음을 할 수 있습니다.

- 저장된 보기 로드 및 다시 로드
- 기존 보기 구성으로 저장된 보기 업데이트
- 저장된 보기 이름 다시 지정 또는 삭제
- 짧은 링크로 저장된 보기 공유
- 저장된 보기를 즐겨찾기에 추가해 탐색 메뉴에서 저장된 보기 목록에 표시

<div class="alert alert-info">읽기 전용 사용자는 업데이트, 이름 다시 지정, 삭제 작업을 할 수 없습니다.</div>

## 기본 보기

[Quality Gates Explorer][2]에서 저장된 보기를 기본 랜딩 페이지로 설정할 수 있습니다. 기본 보기는 사용자별로 설정되며 조직에 영향을 주지 않습니다.

{{< img src="quality_gates/explorer/default_view.png" text="Quality Gates Explorer에서 기본 보기 설정" style="width:100%" >}}

현재 기본 저장된 보기를 원하는 다른 레이아웃으로 업데이트할 수 있습니다. **Views** 패널에서 현재 보기를 기본 저장된 보기로 저장하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/quality-gates/executions
[2]: /ko/quality_gates/explorer/