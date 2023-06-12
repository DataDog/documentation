---
aliases:
- /ko/graphing/widgets/free_text/
description: 대시보드 위젯에 텍스트를 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
kind: 설명서
title: 자유 텍스트 위젯
---

자유 텍스트는 [스크린보드][1]에 제목을 추가할 수 있는 위젯입니다.

일반적으로 대시보드의 전반적인 목적을 설명하는 데 사용됩니다.

{{< img src="dashboards/widgets/free_text/free_text.png" alt="자유 텍스트" >}}

## 구성

{{< img src="dashboards/widgets/free_text/free_text_setup.png" alt="자유 텍스트 구성" style="width:80%;">}}

### 설정

1. 표시할 텍스트를 입력하세요.
2. 텍스트 양식을 선택하세요.

## API

이 위젯은 **대시보드 API**와 함께 사용할 수 있습니다. 자세한 내용은 [대시보드 API 가이드][2]를 참조하세요.

자유 텍스트 위젯의 전용 [위젯 JSON 스키마 정의][3]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/#screenboards
[2]: /ko/api/v1/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/