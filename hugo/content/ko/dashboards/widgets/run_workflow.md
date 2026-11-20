---
description: Dashboards에서 직접 자동화된 워크플로를 트리거하여 문제를 신속하게 해결하고 시스템을 정상 상태로 유지할 수 있습니다.
disable_toc: false
further_reading:
- link: /actions/workflows/
  tag: 설명서
  text: Workflow Automation
title: Run Workflow 위젯
widget_type: run_workflow
---
## 개요 {#overview}

Run Workflow 위젯을 사용하면 Dashboard에서 중요한 작업을 자동화할 수 있습니다. 시스템 상태에 영향을 주는 문제를 인지하는 즉시 Dashboard에서 워크플로를 트리거하세요. 이를 통해 해결 시간을 단축하고 오류 가능성을 줄여 시스템을 계속 가동할 수 있습니다.

## 구성 {#configuration}

1. {{< ui >}}Select the workflow{{< /ui >}} 아래의 드롭다운 메뉴에서 워크플로를 찾습니다.
1. 대시보드 템플릿 변수를 워크플로 입력 파라미터에 매핑합니다. 이를 통해 워크플로 실행 시 대시보드 템플릿 변수의 값이 입력 파라미터에 직접 매핑됩니다.
1. 위젯의 제목을 입력하고 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="dashboards/widgets/trigger-from-dashboard2.png" alt="Run Workflow를 클릭하여 Dashboard 위젯에서 워크플로를 트리거합니다." >}}

워크플로우를 실행하려면 다음에 따릅니다.
1. Dashboard 위젯에서 {{< ui >}}Run Workflow{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Run parameters{{< /ui >}} 아래에는 워크플로 입력에 매핑한 모든 템플릿 변수의 값이 자동으로 채워집니다. 매핑되지 않은 실행 파라미터의 값을 입력하거나 필요한 경우 기존 값을 편집하세요.
1. {{< ui >}}Run{{< /ui >}}을 클릭하여 워크플로를 실행합니다.

## API {#api}

이 위젯은 **[Dashboards API][1]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][2]는 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/