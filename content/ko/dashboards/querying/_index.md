---
aliases:
- /ko/graphing/using_graphs/
description: 인사이트를 얻기 위한 데이터 쿼리
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: 학습 센터
  text: 더 나은 대시보드 빌드
title: 쿼리
---

## 개요

메트릭, 로그, 트레이스, 모니터, 대시보드, 노트북 등을 사용하는지에 관계없이 Datadog의 모든 그래프에는 동일한 기본 기능이 있습니다. 이 페이지에서는 그래픽 편집기를 사용한 쿼리에 대해 설명합니다. 고급 사용자는 JSON으로 그래프를 만들고 편집할 수 있습니다. 자세한 내용은 [JSON으로 그래프화하기][1]를 참조하세요.

대시보드 또는 노트북 페이지에서 그래프 편집기를 사용하여 쿼리하거나, 아무 페이지에서 사용할 수 있는 **Quick Graphs**를 사용할 수 있습니다. 아무 페이지에서나 `G`을(를) 눌러 Quick Graphs를 엽니다. 자세한 내용은 [Quick Graphs 가이드][2]를 참조하세요.

## 그래프 편집기

위젯에서 오른쪽 상단 모서리에 있는 연필 아이콘을 클릭하여 그래프 편집기를 엽니다. 그래프 편집기에는 다음 탭이 있습니다.

* **Share**: 외부 웹 페이지에 있는 내장 그래프.
* **JSON**: 그래프 정의 언어에 대한 지식이 필요한, 보다 유연한 편집기.
* **Edit**: 그래프 옵션을 위한 기본 UI 탭.

그래프 편집기를 처음 열면 **Edit** 탭에 있습니다. 여기에서 UI를 사용하여 대부분의 설정을 선택할 수 있습니다. 그 예시는 다음과 같습니다.

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="편집 탭 그래프화" style="width:100%;" >}}

## 그래프 설정

대시보드에서 그래프를 설정하려면 다음 프로세스를 따르세요.

1. [시각화 선택](#select-your-visualization)
2. [메트릭 정의](#define-the-metric)
3. [메트릭 필터링](#filter)
4. [시간 집계 설정](#configure-the-time-aggregation)
5. [공간 집계 설정](#configure-the-space-aggregation)
6. [함수 적용](#advanced-graphing)
7. [그래프 타이틀 지정](#create-a-title)

### 시각화 선택

사용 가능한 [위젯][3]에서 시각화를 선택합니다.

### 메트릭 정의

검색하거나 **Metric** 옆의 드롭다운에서 선택하여 그래프화할 메트릭을 선택합니다. 사용할 메트릭을 모르는 경우 메트릭 드롭다운에서는 `unit`, `type`, `interval`, `description`, `tags` 및 `tag values`의 수를 비롯한 추가 정보를 제공합니다. 

{{< img src="dashboards/querying/metric_dropdown.png" alt="메트릭 선택기 드롭다운" responsive="true" style="width:100%;">}}

[Metrics Explorer][4], [Notebook][5]을 사용하여 메트릭을 자세히 살펴보거나, [Metrics Summary][6] 페이지에서 메트릭 목록을 확인하세요.

### 필터링

선택한 메트릭은 메트릭 오른쪽에 있는 **from** 드롭다운을 사용하여 호스트 또는 태그별로 필터링할 수 있습니다. 기본 필터는 *(everywhere)*입니다.

{{< img src="dashboards/querying/filter-3.png" alt="템플릿 변수와 부울 논리를 사용해 'from' 필드를 사용해 그래프 필터링" style="width:100%;" >}}

- `from` 드롭다운 내에서 [고급 필터링][7]을 사용해 부울 또는 와일드카드로 필터링된 쿼리를 평가합니다.
- 템플릿 변수를 사용해 동적으로 쿼리를 편집하세요. 태그 키와 그래프를 사용해 `$`을 추가하면 자동으로 템플릿 변수 드롭다운에서 선택한 태그가 적용됩니다. 자세한 정보는 [템플릿 변수 설명서][16]를 참조하세요.

태그에 대한 자세한 내용은 [태깅 설명서][8]를 참조하세요.

### 집계 및 롤업

#### 집계 방법

집계 방법은 필터 드롭다운 옆에 있습니다. 기본값은 `avg by`이지만 그 방법을 `max by`, `min by` 또는 `sum by`(으)로 변경할 수 있습니다. 대부분의 경우 메트릭에는 많은 호스트 또는 인스턴스에서 비롯한, 각 시간 간격에 따른 다수의 값이 존재합니다. 선택한 집계 방법에 따라 메트릭이 한 줄로 집계되는 방식이 결정됩니다.

#### 시간 집계 설정

위에서 선택한 옵션에 관계없이 그래프를 담는 창의 물리적 크기 제약으로 인해 항상 일부 데이터가 집계됩니다. 메트릭이 1초마다 업데이트되고 4시간 분량의 데이터를 보려는 경우 모든 내용을 표시하려면 14,400개의 포인트가 필요합니다. 표시된 각 그래프에는 주어진 시간에 해당하는 약 300개의 포인트가 표시됩니다. 따라서 화면에 표시되는 각 포인트는 48개의 데이터 포인트를 가리킵니다.

실제로 에이전트는 15~20초마다 메트릭을 수집합니다. 그러므로 데이터 하루 집계량은 4320개의 데이터 요소입니다. 단일 그래프에 하루 집계량을 표시하는 경우 Datadog는 자동으로 데이터를 롤업합니다. 시간 집계에 대한 자세한 내용은 [메트릭 소개][9]를 참조하세요. [롤업][10] 설명서를 참조해 롤업 간격과 Datadog가 자동으로 데이터 요소를 롤업하는 방법에 대한 자세한 정보를 알아보세요.

수동으로 데이터를 롤업하려면 [롤업 함수][11]를 사용하세요. 시그마 아이콘을 클릭해 함수를 추가하고 드롭다운 메뉴에서 `rollup`을 선택합니다. 그런 다음 데이터 집계를 원하는 방법과 간격(초)를 선택하세요.

이 쿼리는 평균적으로 1분 버킷에 롤업되는 모든 머신에 대해 사용 가능한 총 디스크 공간을 나타내는 단일 선을 생성합니다.

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="모든 머신에서 시스템 디스크 빈 공간 메트릭의 롤업 예시" style="width:100%;">}}

JSON 보기로 전환하면 쿼리의 형태는 다음과 같습니다.

```text
"query": "avg:system.disk.free{*}.rollup(avg, 60)"
```

전체 JSON은 다음과 같습니다.

```text
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.disk.free{*}.rollup(avg, 60)"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

JSON 보기 사용에 대한 자세한 내용은 [JSON으로 그래프화하기][1]를 참조하세요.

#### 공간 집계 설정

집계 방법 드롭다운 옆에서 그래프에서 선 또는 그룹화를 설정하는 항목을 선택합니다. 예를 들어 `host`을(를) 선택하면 모든 `host`에 대한 선이 생깁니다. 각 선은 선택한 방법을 사용하여 집계된 특정 `host`에서 선택한 메트릭으로 구성됩니다.

또한, [메트릭 정의]#define-the-metric)에 사용된 메트릭 드롭다운에서 태그를 클릭해 데이터를 그룹화하고 집계할 수 있습니다.

### 고급 그래프

분석 요구 사항에 따라 쿼리에 다른 수학 함수를 적용할 수 있습니다. 그 예로는 등급, 미분, 평활화 등이 있습니다. 이와 관련해서는 [사용 가능한 함수 목록][12]을 참조하세요.

Datadog는 또한 다양한 수학적 연산을 사용해 메트릭, 로그, 트레이스 및 기타 데이터 소스의 그래프화를 지원합니다. `+`,  `-`, `/`, `*`, `min`, and `max`를 사용해 그래프에 표시되는 값을 수정합니다. 이러한 구문을 통해 여러 메트릭을 사용해 정수 값 및 수학 연산 모두에 대해 허용됩니다.

메트릭을 개별적으로 그래프화하려면 쉼표(`,`)를 사용하세요. 예를 들면 `a, b, c` 등이 있습니다.

**참고**: 쉼표를 사용하는 쿼리는 시각화에서만 지원되며 모니터에서는 작동하지 않습니다. [부울 연산자][13] 또는 산술 연산을 사용하여 모니터에서 여러 메트릭을 결합합니다.

#### 정수를 사용한 메트릭 산술

산술 연산을 수행하여 그래프화된 메트릭 값을 수정합니다. 예를 들어, 특정 메트릭의 두 배 값을 시각화하려면 그래프 편집기에서 **Advanced...** 링크를 클릭합니다. 그런 다음 `Formula` 상자에 산술을 입력합니다. 이 경우에는 `a * 2`이(가) 됩니다.

{{< img src="dashboards/querying/arithmetic_4.png" alt="수식 예시 - 곱하기" style="width:75%;" >}}

#### 두 메트릭 간 산술

한 메트릭을 다른 메트릭으로 나누어 메트릭의 백분율을 시각화합니다. 예를 들면 다음과 같습니다.

```text
jvm.heap_memory / jvm.heap_memory_max
```

그래프 편집기에서 **Advanced...** 옵션을 사용하고 **Add Query**를 선택합니다. 각 쿼리에는 알파벳 순서로 하나의 문자가 할당됩니다. 예를 들어, 첫 번째 메트릭은 `a`(으)로 표시되고 두 번째 메트릭은 `b`(으)로 표시됩니다.

그런 다음 `Formula` 상자에 산술을 입력합니다(이 예에서는 `a / b`). 그래프에 수식만 표시하려면 메트릭 `a`  및 `b` 옆에 있는 확인 마크를 클릭하세요.

{{< img src="dashboards/querying/arithmetic_5.png" alt="수식 예시 - 비율" style="width:75%;" >}}

`error` 로그와 `info` 로그 간의 비율을 그래프화하는 방법을 보여주는 또 다른 예시는 다음과 같습니다.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="수식 예시 - 로그 비율" style="width:75%;" >}}

**참고**: 수식은 문자로 표시되지 않습니다. 수식 사이에는 산술 연산을 할 수 없습니다.

#### 두 쿼리 간 최소 및 최대
두 가용성 구역 간 최대 CPU 사용량을 찾기 위해 `max` 연산자를 사용한 예입니다. 

```text
max(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2}) 
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="두 메트릭 쿼리 간 최대 개수 값을 표시하는 'max'에 대한 포뮬라 예" style="width:75%;" >}}

또한, 각기 다른 제품에 대한 두 쿼리 간 최대(또는 최소값)값을 계산할 수 있습니다. 오류 상태와 경고 상태를 포함하는 로그 간 최소값을 찾는 `min` 연산자를 사용한 또 다른 예를 살펴봅시다.

```text
min(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="두 로그 쿼리 간 최소 개수 값을 표시하는 'min' 포뮬라 예" style="width:75%;" >}}

### 별칭 생성

그래프 결과를 더 쉽게 해석할 수 있도록 데이터 소스에 대한 커스텀 별칭을 만들 수 있습니다.

{{< img src="dashboards/querying/custom_alias.png" alt="커스텀 별칭" style="width:75%;" >}}

### 타이틀 생성

타이틀을 입력하지 않으면 선택한 항목에 따라 타이틀이 자동으로 생성됩니다. 그러나 그래프의 목적을 설명하는 타이틀을 만드는 것이 좋습니다.

### 저장

**Done**을 클릭하여 작업을 저장하고 편집기를 종료합니다. 언제든지 편집기로 돌아와 그래프를 변경할 수 있습니다. 변경 내용을 저장하지 않으려면 **Cancel**을 클릭하세요.

## 추가 옵션

### 이벤트 오버레이

{{< img src="/dashboards/querying/event_overlay_example.png" alt="오버레이된 배포 이벤트와 RUM 오류율을 표시하는 시계열 위젯" style="width:100%;" >}}

[시계열][15] 시각화를 위한 그래프 편집기의 **이벤트 오버레이** 섹션을 사용하여 이벤트 상관관계를 봅니다. 검색 필드에 텍스트 또는 구조화된 검색 쿼리를 입력합니다. 이벤트 검색은 [로그 검색 구문][14]을 사용합니다.

이벤트 오버레이는 모든 데이터 소스를 지원하므로 비즈니스 이벤트와 모든 Datadog 서비스의 데이터 간의 상관관계를 더 쉽게 만들 수 있습니다.

이벤트 오버레이를 사용하면 조직 내의 작업이 애플리케이션 및 인프라스트럭처 성능에 어떤 영향을 미치는지 빠르게 확인할 수 있습니다. 다음은 몇 가지 사용 사례입니다.
- 오버레이된 배포 이벤트와 RUM 오류율
- 추가 서버 프로비저닝과 관련된 이벤트와 CPU 사용량 연계
- 송신 트래픽과 의심스러운 로그인 활동 연계
- Datadog이 적절한 경고로 구성되었는지 확인하기 위해 모든 시계열 데이터를 모니터 경고와 연계


### 분할 그래프

분할 그래프를 사용하면 메트릭 시각화를 태그별로 구분하여 볼 수 있습니다.

{{< img src="dashboards/querying/split_graph_beta.png" alt="전체 화면 위젯에서 컨테이너 CPU 사용량 메트릭의 분할 그래프 보기" style="width:100%;" >}}

1. 그래프를 확인할 떄 **분할 그래프** 탭을 통해 이 기능에 액세스하세요.
1. *정렬 기준* 메트릭을 변경하여 그래프로 표시하는 데이터와 다른 메트릭 간의 관계를 확인할 수 있습니다.
1. *다음으로 제한* 값을 변경하여 표시되는 그래프 수를 제한합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/graphing_json/
[2]: /ko/dashboards/guide/quick-graphs/
[3]: /ko/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /ko/metrics/advanced-filtering/
[8]: /ko/getting_started/tagging/
[9]: /ko/metrics/#time-aggregation
[10]: /ko/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[11]: /ko/dashboards/functions/rollup/
[12]: /ko/dashboards/functions/#function-types
[13]: /ko/metrics/advanced-filtering/#boolean-filtered-queries
[14]: /ko/logs/explorer/search_syntax/
[15]: /ko/dashboards/widgets/timeseries/#event-overlay
[16]: /ko/dashboards/template_variables/