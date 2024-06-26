---
description: RUM 데이터로 애플리케이션 성능지표(Apdex) 점수 및 커스텀 성능 지표 계산 지침
further_reading:
- link: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
  tag: 설명서
  text: 서비스별 애플리케이션 성능지표(Apdex) 점수 설정
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 대시보드
- link: /real_user_monitoring/browser/data_collected
  tag: 설명서
  text: 수집된 RUM 브라우저 데이터
- link: /real_user_monitoring/android/data_collected
  tag: 설명서
  text: 수집된 RUM 안드로이드 데이터
- link: /real_user_monitoring/ios/data_collected
  tag: 설명서
  text: 수집한 RUM iOS 데이터
kind: 지침
title: RUM 데이터로 애플리케이션 성능지표(Apdex) 및 커스텀 성능 지표 계산하기
---

## 개요

Datadog은 브라우저 및 모바일 RUM SDK에서 실제 사용자 모니터링(RUM) 이벤트를 수집하여 그래프를 빠르게 생성하고 애플리케이션 성능지표(Apdex)와 같은 성능 지표 메트릭을 계산할 수 있습니다.

애플리케이션 성능지표(Apdex) 점수를 계산하려면 APM의 서비스 모니터링 또는 RUM SDK의 사용자 모니터링 데이터를 사용합니다. 본 지침에서는 [퀵 그래프][1]의 RUM 데이터와 **쿼리 값** 위젯을 사용하여 애플리케이션용 애플리케이션 성능지표(Apdex) 계산 방법을 설명합니다.

서비스 모니터링 데이터로 애플리케이션 성능지표(Apdex)를 계산하는 방법에 대한 자세한 내용을 확인하려면 [서비스별 애플리케이션 성능지표(Apdex) 점수 설정][2]을 참조하세요.

## 전제 조건

- 웹 또는 모바일 애플리케이션은 RUM SDK로 계측됩니다. 계측을 설정하려면 [RUM 브라우저 모니터링][3], [RUM Android 모니터링][4], [RUM iOS 모니터링][5]을 참조하세요.
- 애플리케이션 이벤트는 Datadog에서 확인할 수 있습니다.

## 애플리케이션 성능지표(Apdex) 점수 계산

아래 예는 RUM 이벤트의 최대 Contentful Paint 성능 메트릭과 가상 임계값 `T = 2 sec`을 사용하여 애플리케이션 성능지표(Apdex) 점수를 계산합니다. 최소 실패 레이턴시는 `4T = 8 sec`입니다. 결과 값은 쿼리 값 위젯 퀵 그래프에 표시되며 대시보드 또는 노트북으로 내보낼 수 있습니다.

### 퀵 그래프 만들기

1. **대시보드** > **퀵 그래프**로 이동합니다.
2. 다음과 같은 RUM 쿼리 세 개를 만듭니다.
   * 모든 만족스러운 페이지 로드(최대 Contentful Paint를 로드하는 데 2초 미만이 소요되는 RUM 뷰)의 [쿼리 `a`](#query-a).
   * 모든 허용되는 페이지 로드(최대 Contentful Paint를 로드하는 데 8초 미만이 소요되는 RUM 뷰)의 [Query `b`](#query-b).
   * 모든 페이지 로드(모든 RUM 보기)의 [쿼리 `c`](#query-c).
3. **공식** 필드에 애플리케이션 성능지표(Apdex) 공식 `(a + 0.5 * b) / c`을 입력합니다.
4. **시각화 선택**에서 **쿼리 값**을 클릭합니다. 쿼리 값 위젯이 표시됩니다.
5. 타임 프레임 선택기에서 **지난 1일**을 선택합니다. 위젯은 기본적으로 세계 시간으로 표시됩니다.
6. 그래프 이름을 입력합니다(예: `Apdex Score`).
7. 옵션으로 퀵 그래프를 내보내거나 복사하여 대시보드 또는 노트북에 붙여넣거나 **내보내기** > **신규 대시보드**를 클릭하여 해당 퀵 그래프가 포함된 대시보드를 생성합니다. 

#### 쿼리 A

1. **데이터 그래프 작성**에서 쿼리 `a`의 데이터 소스로 `RUM`을 선택하고 `@view.largest_contentful_paint:<2s`을 입력합니다.
2. 엔터 키를 누르거나 드롭다운 메뉴에서 **쿼리 업데이트**를 클릭합니다. `RUM` 옆에 쿼리 `a`에 대한 `Largest Contentful Paint:<2s` 쿼리가 표시됩니다.

#### 쿼리 B

1. 쿼리 `b`를 생성하려면 **+ 쿼리 추가**를 클릭합니다.
2. 쿼리 `b`의 데이터 소스로 `RUM`을 선택하고 `@view.largest_contentful_paint:[2s TO 8s]`을 입력합니다.
3. 엔터 키를 누르거나 드롭다운 메뉴에서 **쿼리 업데이트**를 클릭합니다. `RUM` 옆에 쿼리 `b`에 대한 `Largest Contentful Paint:[2s - 8s]` 쿼리가 표시됩니다.

#### 쿼리 C

1. 쿼리 `c`를 생성하려면 **+ 쿼리 추가**를 클릭합니다.
2. 쿼리 `c`의 데이터 소스로 `RUM`을 선택하고 `@Type:view`을 입력합니다.
3. 엔터 키를 누르거나 드롭다운 메뉴에서 **쿼리 업데이트**를 클릭합니다. `RUM` 옆에 쿼리 `c`에 대한 `Type:view` 쿼리가 표시됩니다.

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="퀵 그래프로 표시한 Apdex 점수" style="width:100%;">}}

### JSON 설정

본 그래프의 JSON 코드에 접근하려면 **수정** 옆의 **JSON** 탭을 클릭합니다.

오른쪽 모서리에 있는 복사 아이콘을 클릭하여 퀵 그래프 JSON을 클립보드에 복사합니다.

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

## 추가 시각화 및 애플리케이션 성능지표(Apdex) 점수

상기 예시의 애플리케이션 성능지표(Apdex) 점수는 RUM 이벤트 보기 및 최대 Contentful Paint 성능 메트릭과 연관되어 있습니다.

다음 방법을 사용하여 다른 애플리케이션 성능지표(Apdex) 점수를 계산할 수도 있습니다.

- 시간 경과에 따른 애플리케이션 성능지표(Apdex) 점수 추세를 확인하려면 **시각화 선택**에서 `Query Value` 대신 `Timeseries`을 선택합니다.
- 특정 애플리케이션에 대한 애플리케이션 성능지표(Apdex) 점수를 계산하려면 `@application.name` 쿼리를 추가하고 공식을 업데이트합니다.
- First Contentful Paint와 같은 다른 RUM 퍼포먼스 메트릭으로 애플리케이션 성능지표(Apdex) 점수를 계산하려면 쿼리에서 `@view.LargestContentfulPaint`를 `@view.FirstContentfulPaint`로 바꾸세요.

애플리케이션의 추가 성능 지표를 계산하려면 [퀵 그래프 만들기](#create-a-quick-graph) 작업 전에 필요한 데이터 포인트와 적합한 RUM 이벤트를 결정하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/guide/quick-graphs/
[2]: /ko/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /ko/real_user_monitoring/browser/
[4]: /ko/real_user_monitoring/android/
[5]: /ko/real_user_monitoring/ios/