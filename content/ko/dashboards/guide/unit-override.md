---
algolia:
  tags:
  - 단위 재정의
  - 커스텀 단위
disable_toc: false
further_reading:
- link: metrics/units/
  tag: 설명서
  text: 메트릭 단위
- link: logs/explorer/facets/#units
  tag: 설명서
  text: 이벤트 단위
- link: dashboards/widgets/
  tag: 설명서
  text: 위젯 목록
title: 단위 재정의로 시각화 맞춤 설정
---

## 개요

시각화의 단위 재정의 기능을 사용하면 데이터 레이블 지정 방식을 맞춤 설정할 수 있습니다. 이 가이드에서는 단위를 재정의하는 설정 옵션을 소개하고 이 옵션을 사용해 그래프를 분석하는 방법을 다룹니다.

**참고**: 이 가이드의 예제에서는 [테이블 위젯][1]을 사용하는 경우가 많습니다. 그러나 이 위젯에만 국한되지 않습니다.

{{< whatsnext desc="조직 수준에서 단위를 설정하려면 다음 문서를 참조하세요: ">}}
    {{< nextlink href="/metrics/units">}} 메트릭 단위 설정{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} 이벤트 기반 쿼리의 단위 설정{{< /nextlink >}}
{{< /whatsnext >}}

## 구성

Notebooks 및 Dashboard 위젯에서 셀 또는 위젯의 그래프 편집기를 찾습니다. Notebooks인 경우 **More Options**를 클릭하고, Dashboards인 경우 **Graph your data** 섹션을 찾으세요.

{{< img src="dashboards/guide/unit_override/unit_override_config.png" alt="Change 위젯의 데이터 섹션 그래프에서 단위 재정의 옵션" style="width:100%;" >}}

## 단위 및 크기 속성 작동 원리

Datadog는 단위를 감지하면 데이터 크기에 따라 가장 읽기 쉬운 단위를 자동으로 선택합니다. 예를 들어, 소스 데이터가 나노초인 경우, 위젯에는 수백 나노초 대신 분과 초 단위로 읽기 쉬운 값을 표시할 수 있습니다.

{{< img src="dashboards/guide/unit_override/unit_override_with_autoscale.png" alt="Autoscale 단위가 활성화된 단위 재정의 설정 및 분과 초 단위로 크기가 조정된 값을 표시하는 테이블 위젯" style="width:100%;" >}}

단위 재정의를 사용하면 값을 비교할 단일 고정 척도를 선택할 수 있습니다. 아래 예에서는 모든 값이 `minutes`로 조정되도록 구성되어 있습니다. 이는 동일한 척도에 있는 값을 직접 비교하기 위한 것입니다.

{{< img src="dashboards/guide/unit_override/unit_override_without_autoscale.png" alt="Autoscale 단위가 비활성화된 단위 재정의 설정 및 모든 값을 분 단위로 조정하여 표시하는 테이블 위젯" style="width:100%;" >}}

## 커스텀 단위 할당

위젯에 커스텀 단위를 할당하여 단위가 없는 메트릭(예: counts)에 컨텍스트를 추가합니다.

{{< img src="dashboards/guide/unit_override/custom_unit_tests.png" alt="단위 재정의 설정, 커스텀 단위를 할당하는 Unit 드롭다운 메뉴가 표시됨" style="width:100%;" >}}

제공된 단위 목록에 포함되지 않은 완전한 커스텀 단위를 정의합니다. 일반적인 이벤트 수 대신 10,000개의 테스트 또는 100개의 세션을 시각화하도록 지정할 수 있습니다. 이를 통해 분석 중인 데이터의 컨텍스트를 즉각적으로 얻을 수 있습니다.

**참고**: Autoscaling의 경우 단위 계열로 인식되지 않으므로 커스텀 단위로 사용할 수 없습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/dashboards/widgets/table/