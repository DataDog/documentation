---
aliases:
- /ko/logs/export
description: 로그 탐색기 보기를 내보내 나중에 다시 사용하거나 다른 컨텍스트에서 다시 사용하세요.
further_reading:
- link: logs/explorer/search
  tag: 설명서
  text: 로그 필터링 방법 알아보기
- link: logs/explorer/analytics
  tag: 설명서
  text: 로그를 그룹화하는 방법 알아보기
- link: logs/explorer/visualize
  tag: 설명서
  text: 로그에서 시각화 생성
title: 로그 내보내기
---

## 개요

언제라도 현재 집계에 따라 로그 탐색을 다음으로 **내보내기**하거나 **저장**할 수 있습니다.

- [**저장된 보기**][1]로 내보내거나 저장하면, 나중에 자신이나 팀원이 조사 시작점으로 사용할 수 있습니다.
- [**대시보드 위젯**][2] 또는 [**노트북 위젯**][8]으로 내보내거나 저장하면 보고나 통합 목적으로 사용할 수 있습니다.
- [**모니터**][3]은 사전 정의된 임계값에서 알림을 트리거합니다.
- [**메트릭**][4]은 Datadog에서 로그가 수집되면 로그를 장기 KPI로 집계합니다. 
- **cURL 명령*은 로그 탐색기에서 쿼리를 테스트한 다음 [Datadog API][5]를 사용해 커스텀 보고서를 만듭니다.
- **CSV**(개별 로그 및 트랜잭션용)의 경우 개별 로그에 대해 한 번에 최대 100,000개 로그, 500개 트랜잭션을 내보낼 수 있습니다. 또한 시계열, 상위 목록 또는 표 보기를 CSV 파일로 다운로드할 수도 있습니다.
- **공유** 보기: 이메일, Slack 등을 통해 팀원에게 현재 보기에 대한 링크를 공유합니다. 이 기능에서 사용할 수 있는 모든 [Datadog 알림 통합][6]을 참조하세요.

{{< img src="logs/explorer/export2.png" alt="검색 필터" style="width:100%;" >}}

또한 로그 이벤트 측면 패널에서 `Save to notebook`를 선택하여 노트북에 개별 로그를 저장할 수도 있습니다. 노트북에 저장되는 로그는 읽기 편한 형식으로 표시됩니다. 또한, 이 디스플레이는 로그 이벤트 보존 기간이 종료된 이후에도 노트북에 저장됩니다.

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="노트북에 로그 저장" style="width:80%;" >}}

로그 API로 반환되는 최대 1000개 로그 제한보다 더 많은 로그 목록을 검색하려면, [페이지 매김 기능][7]을 사용하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/saved_views/
[2]: /ko/dashboards/
[3]: /ko/monitors/types/log/
[4]: /ko/logs/logs_to_metrics
[5]: /ko/api/latest/logs/
[6]: /ko/integrations/#cat-notification
[7]: /ko/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /ko/notebooks/