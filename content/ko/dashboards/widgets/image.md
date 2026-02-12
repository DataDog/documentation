---
aliases:
- /ko/graphing/widgets/image/
description: Datadog 대시보드에 이미지 또는 GIF를 포함합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 이미지 위젯
widget_type: image
---

이미지 위젯을 사용하면 대시보드에 이미지를 내장할 수 있습니다. 이미지를 Datadog에 업로드하거나 URL로 호스팅할 수 있습니다. 지원되는 파일 형식은 URL, PNG, JPG, GIF입니다.

{{< img src="dashboards/widgets/image/image.mp4" alt="이미지" video="true" style="width:80%;" >}}

## 설정

{{< img src="dashboards/widgets/image/image_setup2.png" alt="Image setup" style="width:80%;">}}

1. 이미지를 업로드하거나 URL 이미지를 입력합니다.
2. 사전 설정 템플릿을 선택하거나 표시 옵션을 맞춤 설정합니다.

## API

이 위젯을 **[대시보드 API][1]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][2]에 관해서는 다음 테이블을 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/