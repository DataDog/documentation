---
aliases:
- /ko/graphing/widgets/iframe/
description: Datadog 대시보드에 아이프레임을 포함합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 아이프레임 위젯
---

아이프레임 위젯을 사용하면 대시보드에 다른 웹 페이지 일부를 내장할 수 있습니다.

## 구성

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="아이프레임 구성" style="width:80%;">}}

아이프레임 내부에 표시하려는 페이지의 URL을 입력하세요. HTTPS URL을 사용하지 않는 경우 비보안 콘텐츠를 허용하도록 브라우저를 설정해야 할 수 있습니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 얻으시려면 [Dashboards API documentation][1]을 참조하세요.

아이프레임 위젯 전용 [위젯 JSON 스키마 정의][2]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/