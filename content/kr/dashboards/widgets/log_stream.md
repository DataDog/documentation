---
aliases:
- /kr/graphing/widgets/log_stream/
description: 필터링된 로그 스트림을 Datadog 대시보드에 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
kind: 설명서
title: 로그 스트림 위젯
---

로그 스트림은 정의된 쿼리와 일치하는 로그 흐름을 표시합니다.

{{< img src="dashboards/widgets/log_stream/log_stream.png" alt="로그 스트림" >}}

## 구성

### 설정

1. [검색 쿼리][1]를 입력하여 로그 스트림을 필터링합니다.
2. 열을 업데이트하여 [패싯][2] 및 [측정][2] 값을 표시하세요.
3. 그래프에 타이틀을 지정하거나, 제안된 타이틀 상자를 공란으로 두세요.

{{< img src="dashboards/widgets/log_stream/log_stream_setup.png" alt="로그 스트림 구성" style="width:90%;">}}

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 자세한 내용은 [대시보드 API][3]를 참조하세요.

로그 스트림 위젯의 [위젯 JSON 스키마 정의][4]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/logs/explorer/search/
[2]: /kr/logs/explorer/facets/
[3]: /kr/api/v1/dashboards/
[4]: /kr/dashboards/graphing_json/widget_json/