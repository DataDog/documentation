---
aliases:
- /ko/graphing/widgets/service_summary/
description: 선택한 서비스의 그래프를 대시보드 위젯에 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /tracing/services/service_page/
  tag: 설명서
  text: APM 서비스 페이지란?
title: 서비스 요약 위젯
widget_type: trace_service
---

서비스는 동일한 작업을 실행하는 프로세스의 집합입니다. 예를 들어 웹 프레임워크나 데이터베이스가 있습니다. Datadog는 Service 페이지에서 볼 수 있듯, 서비스 정보를 표시하는 기본 제공 그래프를 제공합니다. 서비스 요약 위젯을 사용해 선택한 [서비스][1]의 그래프를 대시보드에 표시할 수 있습니다.

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="서비스 요약" >}}

## 설정

### 구성

1. [환경][2] 및 [서비스][1]를 선택합니다.
2. 위젯 크기를 선택합니다.
3. 다음 중 표시할 정보를 선택합니다.
    * 히트
    * 오류
    * 레이턴시
    * Breakdown
    * 분포
    * Resource(**참고**: 이 옵션을 보려면 큰 위젯 크기를 선택해야 합니다.)
4. 열 수를 선택해 그래프를 어떻게 표시할지 설정하세요.
5. 그래프 타이틀을 입력합니다.

## API

해당 위젯은 **[대시보드 API][3]**와 함께 사용할 수 있습니다.  [위젯 JSON 스키마 정의][4]에 대해서는 다음 표를 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/services/service_page/
[2]: /ko/tracing/send_traces/
[3]: /ko/api/latest/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/