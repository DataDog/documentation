---
aliases:
- /ko/graphing/widgets/iframe/
description: Datadog 대시보드에 Iframe를 포함합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: Iframe 위젯
widget_type: iframe
---

인라인 프레임(iframe)은 문서 내에서 다른 HTML 페이지를 로드하는 HTML 요소입니다. iframe 위젯 을 사용하면 대시보드 에 있는 다른 웹 페이지의 일부를 저장할 수 있도록 해줍니다.

## 설정

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="아이프레임 구성" style="width:80%;">}}

아이프레임 내부에 표시하려는 페이지의 URL을 입력하세요. HTTPS URL을 사용하지 않는 경우 비보안 콘텐츠를 허용하도록 브라우저를 설정해야 할 수 있습니다.

## API

이 위젯을 **[대시보드 API][1]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][2]와 관해서는 다음 테이블을 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/