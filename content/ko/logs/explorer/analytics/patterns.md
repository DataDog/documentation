---
description: 쿼리된 로그를 패턴으로 그룹화
further_reading:
- link: security/
  tag: 설명서
  text: 로그 탐색기에 대해 알아보기
- link: logs/explorer/analytics
  tag: 설명서
  text: 로그 분석 방법 알아보기
title: 로그를 패턴으로 그룹화
---

## 개요

**패턴**별로 인덱싱된 로그를 집계할 때 유사한 구조와 `message`를 가진 로그가 함께 그룹화됩니다. 선택적으로 그룹 내에서 패턴이 감지되기 전에 1~3개의 패싯 필드를 선택하여 로그를 그룹으로 사전 집계합니다.

**패턴** 보기는 다른 문제를 놓칠 수 있는 시끄러운 오류 패턴을 감지하고 필터링하는 데 유용합니다. 패턴 감지는 10,000개의 로그 샘플을 기반으로 합니다. 특정 로그 하위 집합으로 제한된 패턴을 보려면 검색을 세분화하세요.

{{< img src="logs/explorer/aggregations_patterns.png" alt="패턴별로 그룹화된 로그를 표시하는 로그 탐색기" style="width:90%;" >}}

패턴은 [목록][1] 시각화를 지원합니다. 목록에서 패턴을 클릭하면 다음을 수행할 수 있는 패턴 측면 패널이 열립니다.

- 해당 패턴에서 로그 샘플에 액세스합니다.
- 이 패턴의 로그로만 범위를 좁히려면 검색 필터를 추가하세요.
- 해당 패턴의 구조화된 정보 로그를 추출하려면 [grok 파싱 규칙][2]에 대한 빠른 시작 가이드를 받으세요.

{{< img src="logs/explorer/patterns_side_panel.jpg" alt="모두 보기 버튼과 파싱 규칙이 강조 표시된 로그 측면 패널" style="width:90%;" >}}

## 패턴 검사기

패턴 검사기를 사용하면 검색 쿼리를 기반으로 로그 패턴 집계의 기본값을 시각적으로 분석할 수 있습니다.

{{< img src="logs/explorer/group/pattern_inspector_values.png" alt="값의 막대 그래프를 보여주는 값 분포 그래프" style="width:90%;" >}}

예를 들어, 문제를 조사하는 경우 관련된 호스트 수나 영향을 받는 지역 또는 데이터 센터를 확인할 수 있습니다.

1. [로그 탐색기][3]로 이동합니다.
2. **그룹화** 섹션에서 **패턴**을 클릭합니다. 패턴 목록에서 메시지 섹션의 집계 값은 노란색으로 강조 표시됩니다. 집계 값 위로 마우스를 가져가면 해당 값의 시각적 분포를 미리 볼 수 있습니다.
3. 집계 값을 클릭하여 로그 패턴의 측면 패널을 열고 **패턴 검색기** 탭에서 자세한 내용을 확인하세요.

{{< img src="logs/explorer/group/pattern_inspector_panel_1.png" alt="패턴 검사기 탭이 표시된 패턴 패널" style="width:90%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/visualize/#list-aggregates-of-logs
[2]: /ko/logs/log_configuration/processors/#grok-parser
[3]: https://app.datadoghq.com/logs