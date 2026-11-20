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
## 개요 {#overview}

언제든지 현재 집계 방식에 따라 로그 탐색 결과를 다음 형식으로 **내보내거나** **저장**할 수 있습니다.

- [{{< ui >}}Saved View{{< /ui >}}][1]로 저장하여 나중에 본인이나 팀원이 조사를 시작할 때 활용
- [{{< ui >}}Dashboard widget{{< /ui >}}][2] 또는 [{{< ui >}}Notebooks widget{{< /ui >}}][8]로 저장하여 보고서 작성이나 데이터 통합에 활용
- [{{< ui >}}Monitor{{< /ui >}}][3]로 저장하여 사전 정의된 임계값에 도달하면 경보를 트리거
- [{{< ui >}}Metric{{< /ui >}}][4]로 저장하여 Datadog에 수집되는 로그를 장기 KPI로 집계
- {{< ui >}}cURL command{{< /ui >}} Log Explorer에서 쿼리를 테스트한 다음 [Datadog APIs][5]를 사용하여 사용자 지정 보고서를 생성합니다.
- {{< ui >}}CSV{{< /ui >}} (개별 로그 및 트랜잭션의 경우) 개별 로그의 경우 한 번에 최대 100,000개의 로그, 패턴의 경우 300개, 트랜잭션의 경우 500개까지 내보낼 수 있습니다. 시계열, 상위 목록 또는 표 보기를 CSV 파일로 다운로드할 수도 있습니다.
- {{< ui >}}Share{{< /ui >}} 보기: 이메일, Slack 등을 통해 현재 보기의 링크를 팀원과 공유합니다. 이 기능에서 사용할 수 있는 모든 [Datadog 알림 통합][6]을 확인합니다.

{{< img src="logs/explorer/export3.png" alt="검색 필터" style="width:100%;" >}}

로그 이벤트 사이드 패널에서 {{< ui >}}Save to notebook{{< /ui >}}을 선택하여 개별 로그를 노트북에 저장할 수도 있습니다. 노트북에 저장된 로그는 읽기 쉬운 형식으로 표시되며, 로그 이벤트 자체의 보존 기간이 만료된 후에도 노트북에 표시된 내용은 유지됩니다.

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="노트북에 로그 저장" style="width:80%;" >}}

로그 API로 반환되는 최대 1000개 로그 제한보다 더 많은 로그 목록을 검색하려면, [페이지 매김 기능][7]을 사용하세요.

## CSV 내보내기 형식 {#csv-export-formatting}

Datadog은 내보낸 로그가 스프레드시트 애플리케이션과 호환되도록 CSV 내보내기 데이터를 정제합니다. 따라서 내보낸 값과 열 이름은 원본 로그와 다를 수 있습니다. Datadog은 다음과 같이 데이터를 변경합니다.

- **줄 바꿈(`\n`, `\r\n`, `\r`)을 공백 삽입 없이 제거합니다.** 예를 들어, `foo\nbar`가 `foobar`로 변환됩니다.
- **연속된 공백을** 공백 하나로 바꿉니다.
- **스프레드시트 애플리케이션이 수식으로 해석하지 않도록 `=`, `+`, `-`, `@`, 탭 또는 캐리지 리턴으로 시작하는 값 앞에 작은따옴표(`'`)를 추가합니다.**
- **중복된 열 이름에 `message(1)`과 같은 숫자 접미사를 추가합니다.**

Datadog은 또한 표준 CSV 규칙에 따라 값을 큰따옴표로 묶고, 값 안에 있는 큰따옴표를 `""`로 이스케이프 처리합니다.

이러한 CSV 형식 변경 없이 로그를 검색하려면 [Log Search API][5] 또는 [Log Archives][9]를 사용합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/saved_views/
[2]: /ko/dashboards/
[3]: /ko/monitors/types/log/
[4]: /ko/logs/logs_to_metrics
[5]: /ko/api/latest/logs/
[6]: /ko/integrations/#cat-notification
[7]: /ko/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /ko/notebooks/
[9]: /ko/logs/log_configuration/archives/