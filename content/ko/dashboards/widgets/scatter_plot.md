---
aliases:
- /ko/graphing/widgets/scatter_plot/
description: 두 개의 서로 다른 메트릭과 이들 각각의 집계를 이용해 선택된 범위를 그래프화합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 산점도 위젯
widget_type: scatterplot
---

산점도 시각화를 사용하면 서로 다른 두 개의 메트릭과 이들 각각의 집계를 이용해 선택한 범위를 그래프화할 수 있습니다.

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="산점도" >}}

## 구성

{{< img src="dashboards/widgets/scatterplot/scatterplot_setup.png" alt="산점도 구성" style="width:80%;">}}

### 설정

1. X축과 Y축의 메트릭과 집계를 선택합니다.
2. `host`, `service`, `app`, `region` 등과 같은 산점도의 각 포인트에 대한 범위를 정의합니다.
3. 선택 사항: 색상별 태그를 활성화합니다.
4. 선택 사항: X 및 Y축 컨트롤을 설정합니다.

## 옵션

#### 글로벌 시간

스크린보드에만 해당: 위젯에 사용자 지정 기간이 있는지 또는 스크린보드의 글로벌 기간이 있는지 선택하세요.

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 사용자 지정 제목을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 얻으시려면 [Dashboards API documentation][1]을 참조하세요.

산점도 위젯 전용 [위젯 JSON 스키마 정의][2]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/
