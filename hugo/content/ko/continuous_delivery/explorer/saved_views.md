---
descriptions: Learn how to create and share saved views in the CD Visibility Explorer.
further_reading:
- link: /continuous_delivery/explorer/search_syntax/
  tag: 설명서
  text: 검색 쿼리를 생성하는 방법을 알아보세요
title: Saved Views
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 액세스 권한은 이미 등록된 조직으로만 제한됩니다.
{{< /callout >}}

## 개요 {#overview}

Saved Views를 사용하면 [Deployment Executions 페이지][1]의 상태를 저장하고, 범위가 지정된 쿼리, 관련 패싯, 시각화 옵션 및 시간 범위에 액세스하여 효과적으로 문제를 해결할 수 있습니다.

Saved Views는 다음 항목을 추적할 수 있습니다.

- 배포 결과 및 환경 데이터
- 검색 쿼리(예: 특정 CD 공급자가 있는 실패한 배포 실행, 특정 환경에서 배포 상태별로 실패한 배포 실행, 롤백이 필요한 배포 실행, 배포 ID 또는 URL 등)
- 실시간 시간 범위(예: 지난 1시간 또는 지난주)
- 시각화(예: 시계열, 상위 목록, 표 또는 목록)

Saved Views를 사용하여 팀원들과 공통 쿼리 및 구성을 공유할 수도 있습니다.

## Saved Views {#saved-views}

Saved Views에 액세스하려면 [Deployment Executions 페이지][1] 왼쪽에서 **> Views**를 확장하세요.

[기본 보기](#default-views)를 제외한 모든 Saved Views(사용자가 생성한 사용자 지정 Saved Views 포함)는 조직 전체에서 공유됩니다. 이러한 보기는 조직의 누구나 편집할 수 있으며 보기를 생성한 사용자의 아바타가 표시됩니다. **Save**를 클릭하여 탐색기의 현재 콘텐츠에서 사용자 지정 Saved View를 생성하세요.

<div class="alert alert-info">읽기 전용 사용자의 경우 업데이트, 이름 변경 및 삭제 작업이 비활성화됩니다.</div>

{{< img src="continuous_delivery/explorer/saved_view.png" alt="CD Visibility Explorer의 기본 보기" width="100%" >}}

여기서는 다음을 수행할 수 있습니다.

- Saved View 로드 또는 다시 로드
- 현재 보기의 구성으로 Saved View 업데이트
- Saved View 이름 변경 또는 삭제
- 짧은 링크를 통해 Saved View 공유
- Saved View를 즐겨찾기에 추가하여 탐색 메뉴에서 액세스할 수 있는 Saved Views 목록에 추가

<div class="alert alert-info">읽기 전용 사용자의 경우 업데이트, 이름 변경 및 삭제 작업이 비활성화됩니다.</div>

## 기본 보기 {#default-views}

[Deployment Executions 페이지][1]에서 Saved View를 기본 랜딩 페이지로 설정할 수 있습니다. 기본 보기는 사용자별로 설정되며 조직에는 영향을 미치지 않습니다.

{{< img src="continuous_delivery/explorer/default_view.png" alt="CD Visibility Explorer의 기본 보기" width="100%" >}}

UI에서 작업을 완료하거나 다른 구성을 임베드하는 링크를 탐색기에서 열어 기본 Saved View를 일시적으로 재정의할 수 있습니다.

**Views** 패널의 기본 보기 항목에서 다음을 수행할 수 있습니다.

- 항목을 클릭하여 기본 보기를 다시 로드
- 현재 파라미터로 기본 보기를 업데이트
- 새로 시작하기 위해 기본 보기를 기본 설정으로 다시 설정

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions