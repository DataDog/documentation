---
further_reading:
- link: /continuous_integration/search/
  tag: 설명서
  text: 파이프라인 검색
- link: /continuous_integration/explorer/saved_views
  tag: 설명서
  text: 저장된 보기에 대해 알아보기
- link: /monitors/types/ci
  tag: 설명서
  text: CI 파이프라인 모니터에 관해 알아보기
title: 파이프라인 실행 내보내기
---

## 개요

대시보드, 모니터 및 노트북에서 CI Visibility 검색 쿼리 및 시각화 그래프를 사용하거나 [Search Pipeline Events 엔드포인트][1]에서 프로그래밍 방식으로 이벤트를 검색할 수 있습니다.

## 검색 쿼리 또는 시각화 내보내기

[CI Visibility 탐색기][2]에서 집계된 검색 쿼리 및 시각화 그래프를 복사, 내보내기 또는 다운로드할 수 있습니다.

{{< img src="continuous_integration/explorer/pipeline_export.png" alt="CI Visibility 탐색기에서 파이프라인 보기 내보내기" style="width:100%;">}}

오른쪽 모서리에 있는 **Export** 버튼을 클릭하고 드롭다운 메뉴에서 옵션을 선택합니다.

- [CI Visibility 탐색기][3]의 [저장된 보기][7]를 공유합니다.
- 미리 정의된 임계값에 대한 알림을 트리거하는 [CI 파이프라인 모니터][5]로 검색 결과를 내보냅니다.
- 보고 또는 통합을 위해 검색 결과를 [기존 노트북][6]으로 내보내세요.
- 개별 CI Visibility 테스트 또는 파이프라인 이벤트와 특정 집계를 위해서 검색 결과를 CSV 파일로 다운로드합니다. 

일부 시각화 유형에 사용할 수 있는 옵션은 다른 시각화 유형에서는 지원되지 않습니다. 예를 들어 분포 그래프를 CSV 파일로 다운로드할 수 없습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/ci-visibility-pipelines/#search-pipelines-events
[2]: https://app.datadoghq.com/ci/pipeline-executions
[3]: /ko/continuous_integration/explorer/
[4]: /ko/api/latest/
[5]: /ko/monitors/types/ci/
[6]: /ko/notebooks/
[7]: /ko/continuous_integration/explorer/saved_views/