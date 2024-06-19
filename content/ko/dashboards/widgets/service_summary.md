---
aliases:
- /ko/graphing/widgets/service_summary/
description: 선택한 서비스의 그래프를 대시보드 위젯에 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 서비스 요약 위젯
widget_type: trace_service
---

서비스 요약은 선택한 [서비스][1]의 그래프를 스크린보드에 표시합니다.

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="서비스 요약" >}}

## 구성

{{< img src="dashboards/widgets/service_summary/service_summary_setup.png" alt="서비스 요약 구성" style="width:80%;">}}

### 설정

1. [환경][2] 및 [서비스][1]를 선택합니다.
2. 위젯 크기를 선택합니다.
3. 다음 중 표시할 정보를 선택합니다.
    * Hit
    * Error
    * Latency
    * Breakdown
    * Distribution
    * Resource(**참고**: 이 옵션을 보려면 큰 위젯 크기를 선택해야 합니다.)
4. 그래프를 표시할 타임프레임과 열 수를 선택하여 표시 기본 설정을 선택합니다.
5. 그래프 타이틀을 입력합니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 원하신다면 [대시보드 API 가이드][3]를 참조하세요.

서비스 요약 위젯의 전용 [위젯 JSON 스키마 정의][4]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/services/service_page/
[2]: /ko/tracing/send_traces/
[3]: /ko/api/v1/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/