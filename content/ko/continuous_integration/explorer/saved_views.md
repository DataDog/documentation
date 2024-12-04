---
further_reading:
- link: /continuous_integration/explorer/search_syntax/
  tag: 설명서
  text: 검색 쿼리 생성하는 방법 알아보기
- link: /continuous_integration/explorer
  tag: 설명서
  text: CI Visibility Explore에 대해 알아보기
title: 저장된 보기
---

## 개요

저장된 보기를 사용하면 범위가 지정된 쿼리, 관련 패싯, 시각화 옵션 및 시간 범위에 빠르게 액세스할 수 있어 [CI Visibility Explorer][2]의 상태를 [**Executions** 페이지][3]에 저장하고 효과적인 문제 해결이 가능합니다.

저장된 보기는 다음 항목을 추적할 수 있습니다:

- 파이프라인 실행
- 쿼리 검색(예: 실패한 작업)
- 열 정렬 순서
- 실시간 시간 범위(예: 지난 시간 또는 지난 주)
- 시각화(시계열, 상위 목록, 표 또는 분포 그래프 등)
- 패싯의 하위 집합

저장된 보기를 사용하여 팀원들과 일반적인 쿼리 및 설정을 공유할 수도 있습니다.

## 저장된 페이지

<div class="alert alert-info">읽기 전용 사용자에게는 업데이트, 이름 변경 및 작업 삭제가 불가합니다.</div>

저장된 보기에 액세스하려면 **[CI Visibility Explorer][1]에서 **>Views**를 좌측으로 확장합니다.

{{< img src="continuous_integration/saved-view-pipelines-executions.png" alt="탭을 클릭해 CI Visiblity의 좌측으로 저장된 보기에 액세스" width="50%" >}}

[기본 보기](#default-views)를 제외한 모든 저장된 보기는 사용자가 생성한 저장된 커스텀 보기를 포함하여 조직 전체에서 공유됩니다. 보기는 조직의 누구나 편집할 수 있으며 보기를 생성한 사용자의 아바타를 표시합니다.

CI Visibility Explorer의 현재 컨텐츠에서 **Save**를 클릭해 커스텀 저장된 보기를 생성합니다.

다음을 수행할 수 있습니다.

- 저장된 보기 로드 또는 다시 로드
- 저장된 보기를 현재 보기의 설정으로 업데이트
- 저장된 보기 이름 변경 또는 삭제
- 짧은 링크를 통해 저장된 보기 공유
- 저장된 보기를 즐겨찾기에 추가하여 탐색 메뉴에서 액세스할 수 있는 저장된 보기 목록에 추가

## 기본 보기

[CI Visibility Explorer][2]에서 저장된 보기를 기본 랜딩 페이지로 설정할 수 있습니다. 기본 보기는 사용자별로 설정되며 조직에 영향을 주지 않습니다.

UI에서 작업을 완료하거나 다른 구성을 임베드하는 링크를 탐색기에서 열어 기본 저장된 보기를 일시적으로 재정의할 수 있습니다.

**Views** 패널의 기본 보기 항목에서 다음을 수행할 수 있습니다:

- 기본 보기를 다시 로드하려면 항목을 클릭합니다.
- 현재 파라미터로 기본 보기를 업데이트합니다.
- 새로 시작하기 위해 기본 보기를 기본 설정으로 다시 설정합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-runs
[2]: /ko/continuous_integration/explorer/
[3]: https://app.datadoghq.com/ci/pipeline-executions