---
algolia:
  tags:
  - 퍼널
disable_toc: false
further_reading:
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM  탐색기
kind: 설명서
title: 퍼널 분석
---

## 개요

퍼널 분석을 통해 주요 워크플로 전반의 전환율을 추적하여 엔드투엔드 사용자 이동 경로에서 발생하는 병목 현상을 파악하고 해결할 수 있습니다. 구체적으로 다음을 수행할 수 있습니다.

- 웹사이트 성능 저하로 인해 특정 지점에서 고객이 이탈하는지 확인
- 새로운 기능이 구축되고 시간이 지남에 따라 전환율이 어떻게 변화하는지 추적
- 워크플로에 새 단계 추가가 이탈률에 어떤 영향을 미치는지 측정

**참고**: 전환율은 전체 방문자 수 중 원하는 목표(전환)를 달성한 웹사이트 방문자 수입니다.
## 퍼널 만들기

퍼널을 만드려면 **UX Monitoring > Funnel Analysis**로 이동하세요. 또는 RUM 내의 **Performance Summary** 페이지로 이동하여 Funnel Analysis 탭을 찾을 수 있습니다.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-funnels-tab-updated.png" alt="RUM 내의 Funnel Analysis 탭으로 이동합니다." style="width:100%;" >}}

이 보기에서 시작 보기 또는 액션을 만들고 더하기 아이콘을 클릭하여 추가 단계를 만들 수 있습니다. 드래그 앤 드롭 기능을 사용하여 단계를 이동할 수도 있습니다.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-building-a-funnel-1.mp4" alt="검색을 통한 네트워크 맵 필터링" video=true >}}

### 제안된 다음 단계

시작점은 알고 있지만 사용자가 다음으로 수행했던 작업이 확실하지 않다면 **Quickly add a step** 패널(오른쪽 서랍에서 사용 가능)을 확장하여 제안된 다음 단계를 확인합니다. 단계를 입력하면 이 패널은 사용자가 일반적으로 보고 다음으로 취하는 가장 일반적인 상위 5개의 **보기** 및 **액션**을 자동으로 로드합니다. 이를 통해 사용자가 순차적으로 수행하는 경로를 파악하여 퍼널을 더 빠르게 만들 수 있습니다.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-suggested-next-steps.jpg" alt="퍼널 만들기" style="width:90%;" >}}

**참고**: 퍼널의 두 단계 사이에 발생하는 액션이나 보기는 단계별 또는 전체 전환율에 영향을 미치지 않습니다. 1단계와 2단계가 주어진 세션에서 올바른 순서로 한 번 이상 발생하면 전환된 단일 세션으로 계산됩니다.

### 필터링

퍼널을 구성할 때 [기본 속성][1](코어, 디바이스, 운영 체제, 지리적 위치, 사용자) 및 [세션별][2] 속성을 추가하여 데이터를 더욱 세밀하게 분석할 수 있습니다. **Add Filter** 버튼을 클릭하면 사용 가능한 속성의 전체 목록을 볼 수 있습니다.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-filtering.png" alt="퍼널을 구성할 때 속성을 사용하여 정보 필터링하기" style="width:80%;" >}}

## 퍼널 분석

퍼널을 만든 후 **View Funnel Insights**를 클릭하면 성능 및 사용자 행동 경향에 대한 데이터를 제공하는 **Funnel Analysis** 패널이 열립니다. 이 정보는 전환율을 이해하는 데 도움이 됩니다.

높은 수준의 추세라면 전체 워크플로의 엔드투엔드 전환율을 확인할 수 있고, 개별 단계별 전환율과 이탈률도 확인할 수 있습니다. 전환한 사람과 이탈한 사람을 비교하여 어떤 차이가 있는지 알고 싶다면 각 사례에 대한 [세션 재생][5]을 시청할 수 있습니다.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-analyzing-funnel.jpg" alt="Funnel Insights 패널을 사용하여 성능 및 사용자 행동 트렌드를 검토하세요." style="width:90%;" >}}

**Performance** 섹션을 통해 성능 저하가 전환에 영향을 미쳤는지 확인할 수 있습니다. 해당 페이지의 로드 시간과 전환율 간의 상관 관계를 그래프로 볼 수 있으며, 해당 페이지에서 문제([오류 추적][7]에 의해 감지됨)가 발생했는지 확인할 수 있습니다.

**User Behavior** 섹션에서는 [좌절 신호][3]로부터의 평균 좌절 횟수를 전환율과 비교하고, 개별 행동에서 감지된 좌절 신호를 추가로 분석할 수 있습니다. 이 섹션 옆에는 특정 국가의 전환율과 이탈률을 보여주는 차트가 있어 지리적 위치가 사용자 전환에 영향을 미치는지 파악할 수 있습니다.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-user-behavior.jpg" alt="퍼널 분석 내 사용자 행동 섹션" style="width:90%;" >}}

## 퍼널 공유

퍼널은 [대시보드][6]에서 팀과 공유하여 다른 원격 측정 메트릭과 함께 전환을 분석하거나 [노트북][4]에서 보고에 사용할 수 있습니다.

전체 시각화 또는 개별 위젯을 공유할 수 있습니다.

- 전체 시각화를 노트북 및 대시보드에 공유:

  {{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-share-entire-visualization.jpg" alt="Export를 클릭하여 전체 시각화를 공유합니다." style="width:90%;" >}}

- 개별 위젯 공유:

  {{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-share-individual-widgets-1.mp4" alt="위젯의 오른쪽 상단에 있는 내보내기 아이콘을 클릭하여 위젯을 공유합니다." video="true" width=90% >}}

## 전환 시 알림

전환율 및 이탈률에 대한 알림을 설정하면 전환율이 미리 정의된 임계값 아래로 떨어질 때 알림을 받을 수 있습니다. 몇 가지 방법으로 전환율 쿼리를 모니터로 내보낼 수 있습니다:

- 시각화에서: 이 옵션은 엔드투엔드 워크플로의 쿼리를 사용하여 전체 워크플로의 전환율에 대한 알림을 받을 수 있습니다.

  {{< img src="real_user_monitoring/funnel_analysis/funnel-insights-alert-on-conversion-rate.mp4" alt="전체 워크플로의 전환율에 대한 알림 만들기" video=true width=90% >}}

- Funnel Insights 패널에서: 이를 통해 개별 쿼리를 가져와 알림을 보낼 수 있습니다. 이것이 전체 워크플로일 수도 있지만, 개별 단계의 전환율 및 이탈률에 대해 알림을 보내는 옵션도 있습니다.

  - 예를 들어, 3단계와 4단계 사이의 이탈률에 대해 알림을 보내려면 아래와 같이 Funnel Insights 패널에서 알림을 보내면 됩니다:

    {{< img src="real_user_monitoring/funnel_analysis/funnel-insights-panel.mp4" alt="Funnel Insights 패널에서 이탈률에 대한 알림 제공" video=true width=90% >}}
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/data_collected/#default-attributes
[2]: /ko/real_user_monitoring/browser/data_collected/#session-metrics
[3]: /ko/real_user_monitoring/frustration_signals/
[4]: /ko/notebooks/
[5]: /ko/real_user_monitoring/session_replay
[6]: /ko/dashboards/
[7]: /ko/real_user_monitoring/error_tracking/