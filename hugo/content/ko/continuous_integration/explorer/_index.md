---
description: CI Visibility Explorer에서 파이프라인 실행을 검색 및 필터링하는 방법을 알아봅니다.
further_reading:
- link: /continuous_integration/pipelines/
  tag: 설명서
  text: 파이프라인 데이터를 탐색하여 빌드 문제 해결
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: 블로그
  text: Datadog CI 모니터로 파이프라인 알림을 설정하세요
title: Continuous Integration Visibility Explorer
---

## 개요

CI Visibility Explorer로 태그를 사용하여 여러 수준에서 파이프라인 실행을 [검색 및 필터링](#search-and-filter), [시각화](#visualize), [내보내기](#export)할 수 있습니다.

[**Software Delivery** > **CI Visibility** > **Executions**][5]로 이동하여 **Pipeline**, **Stage**, **Job**, **Step**, **Command** 수준 전반의 CI 파이프라인 실행 결과를 확인합니다.

{{< img src="/continuous_integration/pipeline_executions.png" text="CI Pipeline Executions page" style="width:100%" >}}

## 기본 CI 패싯

**CI** 좌측 패널에서 파이프라인 실행을 검색하는 데 사용하는 기본 패싯 목록을 확인할 수 있습니다.

| 패싯 | 설명 |
|---|---|
| CI 상태 | CI 실행 상태: `Success`, `Failure` 또는 `Canceled`. |
| CI 인스턴스 | CI 공급자의 인스턴스 이름입니다. |
| 기간 | 파이프라인 실행에 걸리는 시간입니다. |
| 파이프라인 ID | 파이프라인 ID입니다. |
| CI 제공업체 | CI 공급자의 이름입니다. |
| 노드 라벨 | 노드의 라벨입니다. |
| 노드 이름 | 노드의 이름입니다. |
| 부분 파이프라인 | 재시도, 수동 승인 또는 기타 미완료 시퀀스를 포함하는 CI 파이프라인 실행을 의미합니다. |
| 부분 재시도 | CI 실행이 이전 실행의 재시도인지를 나타냅니다. |
| 수동 트리거 | CI 실행이 수동으로 트리거되었는지를 나타냅니다. |
| 파라미터 | 파이프라인 또는 작업 트리거 시의 사용자 정의 파라미터입니다. |
| 파이프라인 번호 | 파이프라인의 수입니다. |
| 파이프라인 URL | 파이프라인의 URL입니다. |
| 대기열 시간 | 작업이나 태스크가 실행되기 전 CI 대기열에서 대기한 총 시간입니다. |
| 디플로이먼트 | CI 파이프라인으로 배포된 GitLab 환경입니다. |
| 배포 작업 | GitLab의 배포 환경에서 실행된 작업입니다. |
| 명령어 이름 | CI 파이프라인 내의 특정 명령어에 대한 사용자 정의 식별자입니다. |
| 명령어 | 커스텀 파이프라인 스팬을 생성하기 위해 실행한 명령줄입니다. |
| 다운스트림 파이프라인 | 이 파이프라인이 다른 파이프라인의 다운스트림인지 를 나타냅니다. |
| 업스트림 파이프라인 ID | 현재 파이프라인에 선행하고, 현재 파이프라인을 트리거하는 파이프라인 실행의 식별자입니다. |
| 단계 이름 | CI 파이프라인 내의 특정 단계에 할당된 이름입니다. |
| 오류 도메인 | 공급자, 사용자 또는 알 수 없음과 같은 CI 실행 오류 유형입니다. |
| 실행 시간 | CI 파이프라인을 실행하는 데 소요된 총 시간입니다. |
| 대기 시간 | CI 실행에서 수동 승인을 기다리는 데 소요된 총 시간입니다. |
| 배포 여부 | 파이프라인 내 작업이 배포를 시작했는지를 나타냅니다. |
| 배포 포함 | 파이프라인에 배포를 트리거하는 작업이 포함되어 있는지를 나타냅니다. |
| 중요 경로 | 작업이 CI 파이프라인 실행의 중요 경로에 있는지를 나타냅니다 |

CI Visibility Explorer에서 검색 쿼리의 일부로 사용할 수 있는 일반 패싯에 대한 자세한 정보는 [파이프라인 실행 패싯][3]을 참조하세요.

## 파이프라인 실행 상세 정보 및 트레이스

선택한 타임 프레임의 파이프라인 실행 집계 데이터를 확인할 수 있습니다. 검색 필드와 패싯을 사용하여 자세히 조사하려는 실행으로 목록 범위를 좁힙니다. 상단의 버튼으로 파이프라인, 스테이지 또는 작업을 표시하도록 목록을 변경합니다.

다음 세 가지 그래프는 가장 활성화된 파이프라인의 기간, 시간 경과에 따라 실패한 파이프라인, 누적 시간으로 토글할 수 있는 옵션이 있는 파이프라인 실행을 각각 시각화한 것입니다. 그래프는 왼쪽 상단에서 선택한 레벨 (`Pipeline`, `Stage`, `Job` 등)로 범위가 지정됩니다. 

{{< img src="ci/pipeline_explorer_trends.png" alt="Duration, Errored, Executions에 대한 Explorer 뷰 트렌드 그래프" style="width:100%;">}}

각 파이프라인 실행은 스테이지 및 작업 정보를 포함하는 트레이스로 보고됩니다. 목록에서 실행을 클릭하면 개별 파이프라인, 스테이지, 작업 실행 트레이스에 액세스할 수 있습니다(Pipeline Details 뷰에서 파이프라인 실행을 클릭하는 것과 유사함).

CI 파이프라인 데이터는 [대시보드][6]와 [노트북][7]에서 사용할 수 있으므로, 빌드 엔지니어링 팀에서 우선순위가 높은 작업과 시간 경과에 따른 CI 트렌드에 따라 커뮤니케이션을 맞춤화할 수 있습니다.

## 검색 및 필터링

왼쪽의 패싯을 클릭하거나 검색창에 사용자 지정 쿼리를 직접 작성하여 파이프라인 실행의 하위 집합으로 범위를 좁히거나, 넓히거나, 초점을 이동할 수 있습니다. 패싯을 선택하거나 선택 해제하면 검색창에 변경 사항이 자동으로 반영됩니다. 마찬가지로 검색창 쿼리를 수정하거나 검색창에 처음부터 쿼리를 작성하여 왼쪽의 패싯을 선택하거나 선택을 해제할 수 있습니다.

- 파이프라인을 검색하는 방법을 알아보려면 [검색 및 관리][1]을 참조하세요.
- 쿼리를 만드는 방법을 알아보려면 [검색 구문][2]을 참조하세요.

## 분석

쿼리한 파이프라인 실행을 필드, 패턴 및 트랜잭션과 같은 상위 엔터티로 그룹화하여 정보를 도출하거나 통합합니다. 속성을 검색하기 위해 만들 필요가 없는 [패싯][3]을 사용하면 다음과 같은 작업을 할 수 있습니다.

- CI/CD에서 실행 중인 테스트의 진행 상황을 검색하고 추적할 수 있습니다.
- 모든 CI/CD 작업 실행을 조사하여 실패한 테스트 실행을 식별하고 문제를 해결하세요.

## 시각화

시각화 유형을 선택하여 필터 및 집계 결과를 시각화하고 파이프라인 실행 결과를 더 잘 이해할 수 있습니다. 예를 들어, 파이프라인 실행을 목록으로 표시하여 파이프라인 데이터를 열로 구성하거나 [시계열 그래프][8]로 표시하여 시간 경과에 따른 파이프라인 데이터를 측정할 수 있습니다.

## 내보내기

CI Visibility Explorer에서 [뷰 내보내기][4]를 실행하여 나중에 또는 다른 상황에서 재사용할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/search
[2]: /ko/continuous_integration/explorer/search_syntax
[3]: /ko/continuous_integration/explorer/facets
[4]: /ko/continuous_integration/explorer/saved_views
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries