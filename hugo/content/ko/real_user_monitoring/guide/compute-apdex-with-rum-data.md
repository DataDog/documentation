---
description: RUM 데이터로 애플리케이션 성능 지표(Apdex) 점수 및 사용자 지정 성능 지표 계산 지침
further_reading:
- link: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
  tag: 문서
  text: 서비스별 애플리케이션 성능 지표(Apdex) 점수 구성
- link: /real_user_monitoring/explorer
  tag: 문서
  text: RUM 대시보드
- link: /real_user_monitoring/application_monitoring/browser/data_collected
  tag: 문서
  text: 수집된 RUM 브라우저 데이터
- link: /real_user_monitoring/android/data_collected
  tag: 문서
  text: 수집된 RUM Android 데이터
- link: /real_user_monitoring/ios/data_collected
  tag: 문서
  text: 수집된 RUM iOS 데이터
title: RUM 데이터로 애플리케이션 성능 지표(Apdex) 및 사용자 지정 성능 지표 계산하기
---
## 개요 {#overview}

Datadog은 브라우저 및 모바일 RUM SDK에서 RUM(Real User Monitoring) 이벤트를 수집하여 그래프를 빠르게 생성하고 애플리케이션 성능 지표(Apdex)와 같은 성능 지표 메트릭을 계산할 수 있도록 합니다. 

Apdex 점수를 계산하려면 APM의 서비스 모니터링이나 RUM SDK의 사용자 모니터링 데이터를 사용할 수 있습니다. 이 가이드는 RUM 데이터와 [Quick Graph][1]에 있는 {{< ui >}}Query Value{{< /ui >}} 위젯을 사용하여 애플리케이션의 Apdex를 계산하는 방법을 안내합니다.

서비스 모니터링 데이터로 Apdex를 계산하는 방법에 대한 자세한 내용을 확인하려면 [서비스별 애플리케이션 성능 지표(Apdex) 점수 구성][2]을 참조하세요.

## 전제 조건 {#prerequisites}

- 웹 또는 모바일 애플리케이션이 RUM SDK로 계측되었습니다. 계측을 설정하려면 [RUM 브라우저 모니터링][3], [RUM Android 모니터링][4] 및 [RUM iOS 모니터링][5]을 참조하세요.
- 애플리케이션 이벤트는 Datadog에서 확인할 수 있습니다.

## Apdex 점수 계산 {#compute-an-apdex-score}

아래 예시는 RUM 이벤트의 Largest Contentful Paint 성능 메트릭과 `T = 2 sec`의 가상 임계값을 사용하여 Apdex 점수를 계산합니다. 최소 불만족 지연 시간은 `4T = 8 sec`입니다. 결과 값은 대시보드나 노트북으로 내보낼 수 있는 Query Value 위젯 Quick Graph에 표시됩니다.

### Quick Graph 만들기 {#create-a-quick-graph}

1. {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Quick Graph{{< /ui >}}로 이동합니다.
2. 다음과 같은 RUM 쿼리 3개를 만듭니다.
   모든 만족스러운 페이지 로드(Largest Contentful Paint를 로드하는 데 2초 미만이 소요되는 RUM 뷰)의 * [쿼리`a`](#query-a)]
   모든 허용되는 페이지 로드(Largest Contentful Paint를 로드하는 데 8초 미만이 소요되는 RUM 뷰)의 * [쿼리`b`](#query-b)
   모든 페이지 로드(모든 RUM 뷰)의 * [쿼리`c`](#query-c)
3. {{< ui >}}Formula{{< /ui >}} 필드에 Apdex 공식 `(a + 0.5 * b) / c`를 입력합니다.
4. {{< ui >}}Select a visualization{{< /ui >}}에서 {{< ui >}}Query Value{{< /ui >}}를 클릭합니다. Query Value 위젯이 나타납니다.
5. 시간 프레임 선택기에서 {{< ui >}}Past 1 Day{{< /ui >}}를 선택합니다. 기본적으로 위젯은 글로벌 시간으로 표시됩니다.
6. 그래프 이름을 입력합니다(예: `Apdex Score`).
7. 선택 사항으로 Quick Graph를 내보내거나 복사하여 대시보드 또는 노트북에 붙여넣거나, {{< ui >}}Export{{< /ui >}} > {{< ui >}}New Dashboard{{< /ui >}}를 클릭하여 해당 Quick Graph가 포함된 대시보드를 생성합니다. 

#### 쿼리 A {#query-a}

1. {{< ui >}}Graph your data{{< /ui >}}에서 쿼리 `a`의 데이터 소스로 `RUM`을 선택하고 `@view.largest_contentful_paint:<2s`를 입력합니다.
2. Enter 키를 누르거나 드롭다운 메뉴에서 **Update query**를 클릭합니다. `Largest Contentful Paint:<2s` 쿼리가 쿼리 `a`의 `RUM` 옆에 나타납니다.

#### 쿼리 B {#query-b}

1. 쿼리 `b`를 생성하려면 {{< ui >}}\+ Add Query{{< /ui >}}를 클릭합니다.
2. 쿼리 `b`의 데이터 소스로 `RUM`을 선택하고 `@view.largest_contentful_paint:[2s TO 8s]`를 입력합니다.
3. Enter 키를 누르거나 드롭다운 메뉴에서 **Update query**를 클릭합니다. `Largest Contentful Paint:[2s - 8s]` 쿼리가 쿼리 `b`의 `RUM` 옆에 나타납니다.

#### 쿼리 C {#query-c}

1. 쿼리 `c`를 생성하려면 {{< ui >}}\+ Add Query{{< /ui >}}를 클릭합니다.
2. 쿼리 `c`의 데이터 소스로 `RUM`을 선택하고 `@Type:view`를 입력합니다.
3. Enter 키를 누르거나 드롭다운 메뉴에서 **Update query**를 클릭합니다. `Type:view` 쿼리가 쿼리 `c`의 `RUM` 옆에 나타납니다.

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="Quick Graph의 Apdex 점수" style="width:100%;">}}

### JSON 구성 {#json-configuration}

본 그래프의 JSON 코드에 접근하려면 {{< ui >}}Edit{{< /ui >}} 옆의 {{< ui >}}JSON{{< /ui >}} 탭을 클릭하세요.

오른쪽 모서리에 있는 복사 아이콘을 클릭하여 Quick Graph JSON을 클립보드에 복사합니다.

{{< code-block lang="json" filename="JSON" disable_copy="false" collapsible="true" >}}
{
    "viz": "query_value",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "(query1 + 0.5 * query2) / query3"
                }
            ],
            "queries": [
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:<2000000000"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query1",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:[2000000000 TO 8000000000]"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query2",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query3",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                }
            ],
            "response_format": "scalar",
            "conditional_formats": []
        }
    ],
    "autoscale": true,
    "precision": 2
}
{{< /code-block >}}

## 추가 시각화 및 Apdex 점수 {#additional-visualizations-and-apdex-scores}

상기 예시의 Apdex 점수는 RUM 이벤트 보기 및 Largest Contentful Paint 성능 메트릭과 연관되어 있습니다.  

다음 방법을 사용하여 다른 Apdex 점수를 계산할 수도 있습니다.

- 시간에 따른 Apdex 점수 추이를 보려면 {{< ui >}}Select your visualization{{< /ui >}}에서 {{< ui >}}Query Value{{< /ui >}} 대신 {{< ui >}}Timeseries{{< /ui >}}를 선택하세요.
- 특정 애플리케이션의 Apdex 점수를 계산하려면, `@application.name` 쿼리를 추가하고 공식을 업데이트합니다.
- 다른 RUM 성능 메트릭(예: First Contentful Paint)으로 Apdex 점수를 계산하려면, 쿼리에서 `@view.LargestContentfulPaint`를 `@view.FirstContentfulPaint`로 바꿉니다.

애플리케이션의 추가 성능 지표를 계산하려면, [Quick Graph를 만들기](#create-a-quick-graph) 전에 필요한 데이터 포인트와 적절한 RUM 이벤트가 무엇인지 결정하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/guide/quick-graphs/
[2]: /ko/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /ko/real_user_monitoring/application_monitoring/browser/
[4]: /ko/real_user_monitoring/android/
[5]: /ko/real_user_monitoring/ios/