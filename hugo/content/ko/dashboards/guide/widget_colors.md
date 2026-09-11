---
title: 그래프에 적합한 색상 선택하기
---

Datadog 그래프에서 색상은 일련의 데이터를 구별할 수 있는 기본 방법입니다. 그래프에 적합한 색상을 선택하면 팀원이 그래프의 데이터를 분석하고, 인사이트를 얻어 문제를 효과적으로 해결할 수 있습니다.

{{< img src="dashboards/guide/colors/colors_top.png" alt="'Graph your data'라는 제목 아래에서 사용자는 색상 팔레트 목록에서 선택합니다." style="width:90%;" >}}

## 색상 팔레트 유형

### Categorical 팔레트

Categorical 팔레트는 차별화가 필요하지만 자연스러운 순서를 따르지 않는 데이터(예: 가용성 영역)에 가장 적합합니다.

{{< img src="dashboards/guide/colors/2_alphabet.png" alt="문자 A B C D E F G를 표시하는 팔레트. 각 문자는 서로 다른 색상을 가집니다." style="width:40%;" >}}

#### 클래식

기본 Classic 팔레트는 가독성을 위해 최적화된 6가지 고유 색상 세트를 사용합니다. 시리즈 수가 6개를 초과하면 시리즈에 할당된 색상이 반복됩니다. 인접한 계열은 일반적으로 고유한 색상을 갖습니다. 그러나 드문 경우지만 중간 계열에 부분 기간에 대한 값이 없으면 인접한 계열이 동일한 색상을 사용할 수 있습니다.

Classic 색상 팔레트에는 시각적 접근성이 지원됩니다.

{{< img src="dashboards/guide/colors/3_classic_palette.png" alt="도넛 그래프 및 누적 막대 그래프에 대한 Classic 팔레트 개요." style="width:80%;" >}}

#### Consistent/Semantic

Consistent 팔레트를 사용하면 일련의 데이터에 동일한 색상을 일관되게 할당할 수 있으므로 차트 전체에서 데이터의 상관 관계를 더 쉽게 지정할 수 있습니다. Consistent 팔레트는 인접한 데이터 시리즈가 동일한 색상을 사용하지 않는다는 것을 보장하지 않으며 접근성을 지원하지 않습니다.


{{< img src="dashboards/guide/colors/4_consistent_palette.png" alt="Consistent/Semantic 팔레트에 대한 색상 팔레트" style="width:70%;" >}}

{{< img src="dashboards/guide/colors/5_consistent_interface.png" alt="Consistent 팔레트 막대 그래프." style="width:90%;" >}}

호환되는 태그의 작은 하위 집합에 대해 Datadog은 각 데이터 시리즈 뒤에 숨은 의미를 자동으로 인식합니다. 이 경우 Consistent 색상 팔레트는 의미를 표현하기 위해 색상을 사용하는 Semantic 색상 팔레트로 나타납니다. 예를 들어, 빨간색은 오류를 나타낼 수 있습니다. 지원되는 태그 목록은 [Compatible Semantic Tags][2]를 참조하세요.

{{< img src="dashboards/guide/colors/6_semantic_interface.png" alt="Semantic 팔레트 막대 그래프." style="width:90%;" >}}

### Diverging 팔레트

데이터 세트 내 값의 차이를 강조해야 하는 경우 Diverging 팔레트를 사용합니다. Diverging 팔레트는 자연스러운 순서와 자연스러운 중간점이 있는 데이터에 가장 적합합니다. 예: -100%에서 +100%까지의 메모리 사용률 변화량(자연 중간점은 0%)

두 가지 Diverging 팔레트 옵션이 있습니다: 차가움(녹색과 파란색) 또는 따뜻함(노란색과 주황색 사이를 보간).

{{< img src="dashboards/guide/colors/7_divergent_palette.png" alt="양쪽 끝에 서로 다른 색상 그라데이션이 있는 -3 -2 -1 0 1 2 3을 표시하는 팔레트" style="width:40%;" >}}
{{< img src="dashboards/guide/colors/8_divergent_graphs.png" alt="Diverging 팔레트 그래프." style="width:80%;" >}}

### Sequential 팔레트

데이터세트의 서로 다른 시리즈에 공통점이 있다는 점을 강조해야 할 경우 Sequential 팔레트를 사용하세요. 이 팔레트는 호스트 그룹의 CPU 사용률(0%~100%)과 같이 자연 순서가 있는 데이터에 적합합니다.

색상 옵션에는 보라색, 주황색, 회색, 빨간색, 녹색 및 파란색이 포함됩니다.

[색상 재정의](#color-overrides)와 결합하면 Sequential 팔레트를 사용하여 단일 차트에서 여러 쿼리의 결과를 구분할 수 있습니다.

{{< img src="dashboards/guide/colors/9_sequential_palette.png" alt="색상이 그라데이션인 1 2 3 4 5 6 7을 보여주는 팔레트" style="width:r0%;" >}}
{{< img src="dashboards/guide/colors/10_sequential_graphs.png" alt="Sequential 팔레트 그래프" style="width:80%;" >}}

## 색상 재정의

색상 재정의를 사용하면 선택한 단일 색상을 각 쿼리에 할당할 수 있습니다. 이는 단일 차트에서 여러 쿼리의 결과를 구별할 때 특히 유용합니다.

{{< img src="dashboards/guide/colors/11_overrides.png" alt="사용자가 색상 재정의를 구성할 수 있는 패널" style="width:80%;" >}}

**참고**: 쿼리가 태그별로 집계되는 경우(예: 'sum by' 또는 'avg by' 사용) 팔레트 재정의만 선택할 수 있습니다. 이렇게 하면 서로 다른 시리즈가 동일한 색상을 사용하는 것을 방지하여 가독성을 유지할 수 있습니다.

{{< img src="dashboards/guide/colors/12_palette_and_color_override_comparison.png" alt="색상 재정의와 팔레트 재정의 드롭다운 패널을 나란히 비교한 결과" style="width:80%;" >}}

## 접근성 설정

Datadog은 색각 이상, 낮은 시력, 대비 감도 등의 시각적 요구 사항을 충족하기 위해 그래프에 접근 가능한 색상 모드를 제공합니다. 접근 가능한 색상 모드를 선택하면 Classic 팔레트가 있는 모든 그래프가 특정 시각적 요구 사항에 맞는 접근 가능한 색상 세트로 렌더링됩니다. [User Preferences 페이지][1]에서 액세스 가능한 색상 모드를 설정할 수 있습니다.

{{< img src="dashboards/guide/colors/visual_accessibility.png" alt="사용 가능한 시각적 접근성 옵션: 기본값, 원형맹(녹색과 빨간색을 구분하기 어려움), 중수색맹(빨간색, 녹색, 노란색을 구분하기 어려움), 삼색맹(파란색과 녹색을 구분하기 어려움), 고대비(시력이 낮아짐에 따라 색상 간 분리가 증가함) , 낮은 채도(시각적 대비 감도에 대한 대비 감소)." style="width:90%;" >}}

[1]: https://app.datadoghq.com/personal-settings/preferences
[2]: /ko/dashboards/guide/compatible_semantic_tags