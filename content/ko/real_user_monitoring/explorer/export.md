---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
- link: /dashboards
  tag: 설명서
  text: 대시보드에 대해 알아보기
- link: /notebooks
  tag: 설명서
  text: 노트북에 대해 알아보기
- link: /monitors
  tag: 설명서
  text: 모니터에 대해 알아보기
kind: 설명서
title: RUM 이벤트 및 그래프 내보내기
---

## 개요

대시보드, 모니터 및 노트북에서 RUM 쿼리 및 시각화 그래프를 사용하거나 [Search RUM Events 엔드포인트][1]에서 프로그래밍 방식으로 이벤트를 검색할 수 있습니다.

## 검색 쿼리 또는 시각화 내보내기

[RUM 탐색기][2]에서 집계된 검색 쿼리 및 시각화 그래프를 복사, 내보내기 또는 다운로드할 수 있습니다.

{{< img src="real_user_monitoring/explorer/export/rum-explorer-export-5.png" alt="RUM Explorer 우측 코너에 있는 내보내기 버튼" width="100%" >}}

오른쪽 모서리에 있는 **More** 버튼을 클릭하고 드롭다운 메뉴에서 옵션을 선택합니다:

- 쿼리를 cURL 명령으로 복사하여 [RUM 탐색기][3]에서 테스트하고 [Datadog APIs][4]를 사용하여 커스텀 보고서를 작성합니다.
- 미리 정의된 임계값에 대한 알림을 트리거하는 [모니터][6]로 검색 결과를 내보냅니다.
- 보고 또는 통합을 위해 검색 결과를 [기존 노트북][7]으로 내보내세요.
- 검색 결과를 개별 RUM 이벤트 및 특정 집계에 대한 CSV 파일로 다운로드하세요. 최대 5,000개의 개별 RUM 이벤트를 목록으로 내보내고 시계열, 상위 목록 및 테이블 그래프에 대해 최대 500개의 집계를 내보낼 수 있습니다.
- 검색 결과를 사용하여 [새로운 메트릭][5]을 생성하고 이를 메트릭 탐색기에서 볼 수 있습니다.

일부 시각화 유형에 사용할 수 있는 옵션은 다른 시각화 유형에서는 지원되지 않습니다. 예를 들어 분포 그래프를 CSV 파일로 다운로드할 수 없습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/latest/rum/#search-rum-events
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ko/real_user_monitoring/explorer/
[4]: https://docs.datadoghq.com/ko/api/latest/rum/
[5]: /ko/metrics/explorer/
[6]: /ko/monitors/types/real_user_monitoring/
[7]: /ko/notebooks/