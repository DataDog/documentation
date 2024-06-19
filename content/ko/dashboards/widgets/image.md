---
aliases:
- /ko/graphing/widgets/image/
description: Datadog 대시보드에 이미지 또는 GIF를 포함합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 이미지 위젯
---

이미지 위젯을 사용하면 대시보드에 이미지를 내장할 수 있습니다. 이미지는 URL로 액세스할 수 있는 PNG, JPG 또는 애니메이션 GIF일 수 있습니다.

{{< img src="dashboards/widgets/image/image.mp4" alt="이미지" video="true" style="width:80%;" >}}

## 구성

{{< img src="dashboards/widgets/image/image_setup.png" alt="이미지 구성" style="width:80%;">}}

1. 이미지 URL을 입력합니다.
2. 다음에서 모양을 선택합니다.
    * 전체 타이틀을 보여주는 줌 이미지
    * 타일에 맞춘 이미지
    * 타일 중앙의 이미지

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 얻으시려면 [Dashboards API documentation][1]을 참조하세요.

이미지 위젯의 전용 [위젯 JSON 스키마 정의][2]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/