---
aliases:
- /ko/continuous_testing/explorer/saved_views/
further_reading:
- link: /synthetics/explore/results_explorer/search_syntax/
  tag: 설명서
  text: 검색 쿼리 생성하는 방법 알아보기
title: 저장된 보기
---

## 개요

저장된 보기를 사용하면 [신서틱 모니터링 및 테스트 결과 탐색기][2]에 상태를 저장할 수 있고 범위가 지정된 쿼리, 관련 패싯, 시각화 옵션 및 시간 범위 정보에 액세스할 수 있어 효과적으로 트러블슈팅할 수 있습니다.

저장된 보기는 다음 항목을 추적할 수 있습니다:

- CI 배치 및 테스트 실행
- 검색 쿼리(예: HTTP 오류 코드로 실패한 테스트 실행, 차단 상태로 인한 테스트 실행 실패, 재시도가 필요한 테스트 실행, CI 파이프라인에 추가할 테스트 ID)
- 실시간 시간 범위(예: 지난 시간 또는 지난 주)
- 시각화(예: 시계열, 상위 목록, 또는 목록)

저장된 보기를 사용하여 팀원들과 일반적인 쿼리 및 설정을 공유할 수도 있습니다.

## 저장된 페이지

저장된 보기에 액세스하려면 [Synthetic Monitoring & Testing Results Explorer][1]에서 **> Views**를 눌러 좌측으로 확장하세요.

[기본 보기](#default-views)를 제외한 모든 저장된 보기는 사용자가 생성한 저장된 커스텀 보기를 포함하여 조직 전체에서 공유됩니다. 보기는 조직의 누구나 편집할 수 있으며 보기를 생성한 사용자의 아바타를 표시합니다. Explorer의 현재 내용에서 저장된 보기를 생성하려면 **Save**를 클릭하세요.

다음을 실행할 수 있습니다.

- 저장된 보기 로드 또는 다시 로드
- 저장된 보기를 현재 보기의 설정으로 업데이트
- 저장된 보기 이름 변경 또는 삭제
- 짧은 링크를 통해 저장된 보기 공유
- 저장된 보기를 즐겨찾기에 추가하여 탐색 메뉴에서 액세스할 수 있는 저장된 보기 목록에 추가

<div class="alert alert-info">읽기 전용 사용자에게는 업데이트, 이름 변경 및 작업 삭제가 불가합니다.</div>

## 기본 보기

 [Synthetic Monitoring & Testing Results Explorer][2]에서 저장된 보기를 기본 랜딩 페이지로 설정할 수 있습니다. 기본 보기는 사용자별로 설정되며 조직에 영향을 주지 않습니다.

{{< img src="continuous_testing/saved_view.png" alt="Synthetic Monitoring & Testing Results Explorer의 저장된 보기" width="100%" >}}

UI에서 작업을 완료하거나 Results Explorer에서 다른 구성을 포함한 링크를 열어 기본 저장된 보기를 임시 재정의할 수 있습니다.

**Views** 패널의 기본 보기 항목에서 다음을 수행할 수 있습니다:

- 기본 보기를 다시 로드하려면 항목을 클릭합니다.
- 현재 파라미터로 기본 보기를 업데이트합니다.
- 새로 시작하기 위해 기본 보기를 기본 설정으로 다시 설정합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer
[2]: /ko/continuous_testing/explorer/