---
aliases:
- /ko/graphing/widgets/geomap/
description: 지리적 데이터를 음영 처리된 영역이나 포인트로 시각화하여 위치 기반 메트릭 및 패턴을 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /notebooks/
  tag: 설명서
  text: Notebooks
title: Geomap 위젯
widget_type: geomap
---
Geomap 위젯은 지리적 데이터를 음영 처리된 영역이나 포인트로 시각화합니다. 이 위젯은 다음 용도로 사용할 수 있습니다.
- 국가별 사용자 세션 보기
- 필터링하여 새 탭에서 모든 세션 목록 보기
- 직원별로 필터링된 사용자 세션 보기
- 로드 시간, Core Web Vitals, 오류가 발생한 조회 비율과 같은 성능 지표 모니터링
- 지도에 지표를 플로팅하여 매장이나 장치와 같은 물리적 위치의 상태 모니터링

{{< img src="/dashboards/widgets/geomap/geomap_zoom_region.mp4" alt="Geomap 위젯에서 리전 확대" video=true >}}

## 설정 {#setup}

{{< img src="dashboards/widgets/geomap/geomap_setup3.png" alt="위젯 설정의 Geomap 'Graph your data' 섹션">}}

### 구성 {#configuration}
1. 시각화 레이어 선택:
    * {{< ui >}}Regions{{< /ui >}}: 국가 또는 국가 하위 구분 수준에서 측정값을 집계합니다.
    * {{< ui >}}Points{{< /ui >}}: 이벤트를 지도 위에 포인트로 오버레이하여 지리적 이벤트 데이터를 표시합니다.

2. 그래프로 표시할 데이터 선택: <br>
  **참고**: 데이터 소스에 대한 지원은 선택한 시각화 레이어에 따라 다릅니다.
  {{< tabs >}}
  {{% tab "리전" %}}
  |  데이터 소스    | 참고 사항    |
  | --------------  | -------- |
  |로그 이벤트   | 그룹화 태그에는 국가 ISO 코드(alpha-2 ISO 형식) 또는 국가 하위 구분 ISO 코드(ISO-3166-2 형식)가 포함되어야 합니다. [GeoIP Processor][1]를 사용하여 이 작업을 수행하거나 [수집 시 태그][2]를 수동으로 포함할 수 있습니다. 로그 이벤트 쿼리를 구성하려면 [로그 검색 설명서][3]를 참조하세요.|
  |메트릭   | 그룹화 태그에는 국가 ISO 코드(alpha-2 ISO 형식) 또는 국가 하위 구분 ISO 코드(ISO-3166-2 형식)가 포함되어야 합니다. [수집된 로그에서 메트릭을 생성][4]하거나 [수집 시 태그][2]를 수동으로 포함할 수 있습니다. 메트릭 쿼리를 구성하려면 [쿼리 설명서][5]를 참조하세요.|
  |RUM   | RUM 쿼리를 구성하려면 [RUM 설명서][6]를 참조하세요. |
  |SLO | SLO 쿼리를 구성하려면 [SLO 검색 설명서][7]를 참조하세요. |
  |보안 신호 <br> App and API Protection <br> Audit Trail | 쿼리를 구성하려면 [로그 검색 설명서][3]를 참조하세요. |

  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "포인트" %}}
  |  데이터 소스 | 참고 사항 |
  | -----------  | ----- |
  |로그 이벤트   | 그룹화 기준 태그에는 alpha-2 ISO 형식을 따르는 국가 ISO 코드가 포함되어야 합니다. [GeoIP Processor][1]를 사용하여 이 작업을 수행하거나 [수집 시 태그][2]를 수동으로 포함할 수 있습니다. 로그 이벤트 쿼리를 구성하려면 [로그 검색 설명서][3]를 참조하세요. |
  |RUM   | RUM 쿼리를 구성하려면 [RUM 설명서][4]를 참조하세요. |
  |메트릭   | 메트릭 쿼리에는 지리적 좌표가 포함되지 않습니다. 메트릭을 플롯하려면 쿼리를 위도 및 경도 좌표를 제공하는 Reference Table과 조인하세요. [Reference Table을 사용하여 메트릭 플롯](#plot-metrics-with-a-reference-table)을 참조하세요. |

  **참고**: 포인트 레이어는 한 번에 최대 100,000개의 이벤트를 표시합니다.
  
  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. (선택 사항) {{< ui >}}Visual Options{{< /ui >}} 아래에서 {{< ui >}}Set widget default view{{< /ui >}} 드롭다운을 사용하여 지도를 처음에 어디에 맞출지 선택합니다. {{< ui >}}Custom{{< /ui >}}을 선택하여 사용자 지정 영역을 정의하거나 국가, 주 또는 도 이름을 검색하세요.

### Reference Table을 사용하여 메트릭 플롯 {#plot-metrics-with-a-reference-table}

메트릭 쿼리에는 지리적 좌표가 포함되지 않습니다. {{< ui >}}Points{{< /ui >}} 레이어에 메트릭을 플롯하려면 메트릭 쿼리를 위도 및 경도 좌표를 제공하는 [Reference Table][10]과 조인하세요. Reference Table은 지도에 표시할 위치 이름과 같은 메타데이터도 제공할 수 있습니다.

시작하기 전에 다음 항목을 설정하세요.
- 각 위치를 식별하는 값(예: `store_id`)으로 태그가 지정된 메트릭
- 해당 태그와 일치하는 값을 가진 열, 그리고 각 위치에 대한 위도 열과 경도 열이 있는 Reference Table. 위젯 편집기에서 열을 매핑하므로 열 이름이 특정 형식을 따를 필요는 없습니다.

Reference Table로 메트릭을 플로팅하려면 다음 단계를 따르세요.

1. 대시보드에 Geomap 위젯을 추가하고 {{< ui >}}Points{{< /ui >}} 레이어를 선택합니다.
1. 소스 선택기에서 {{< ui >}}Metrics{{< /ui >}}를 선택하고 메트릭 쿼리를 작성합니다.
1. 조인 유형과 메트릭과 조인할 Reference Table을 지정합니다. Geomap 위젯은 {{< ui >}}All locations{{< /ui >}}(왼쪽 조인) 및 {{< ui >}}Locations with data only{{< /ui >}}(내부 조인)의 두 가지 조인 유형을 제공합니다.
1. `store_id`와 같은 메트릭 태그와 일치하는 Reference Table 열을 사용하여 조인 조건을 정의합니다. 조인에 대한 자세한 내용은 [Reference Table과 메트릭 조인][11]을 참조하세요.
1. {{< ui >}}latitude{{< /ui >}} 및 {{< ui >}}longitude{{< /ui >}}의 경우 각 위치의 좌표가 포함된 Reference Table 열을 선택합니다.
1. (선택 사항) 메트릭 값을 기준으로 포인트의 색상을 지정하는 조건부 서식 규칙을 추가합니다. 예를 들어, 상태를 강조하기 위해 포인트를 녹색, 노란색 또는 빨간색으로 바꾸는 임계값을 정의합니다.
1. (선택 사항) {{< ui >}}Tooltip Fields{{< /ui >}} 아래에서 매장 이름과 같이 포인트 툴팁에 표시할 추가 Reference Table 열을 선택합니다.

### 옵션 {#options}

#### 컨텍스트 링크 {#context-links}

[컨텍스트 링크][7]는 기본적으로 활성화되어 있으며, 켜거나 끌 수 있습니다. 컨텍스트 링크는 대시보드 위젯을 다른 페이지(Datadog 또는 타사)와 연결합니다.

#### 시각적 서식 규칙 {#visual-formatting-rules}

조건부 규칙을 사용하여 Geomap 위젯의 영역 또는 포인트 색상을 사용자 지정하세요.

## API {#api}

이 위젯은 **[대시보드 API][8]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][9]는 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/processors/geoip_parser/
[2]: /ko/getting_started/tagging/#define-tags
[3]: /ko/logs/search_syntax/
[4]: /ko/logs/logs_to_metrics/
[5]: /ko/dashboards/querying/
[6]: /ko/real_user_monitoring/explorer/search_syntax/
[7]: /ko/dashboards/guide/context-links/
[8]: /ko/api/latest/dashboards/
[9]: /ko/dashboards/graphing_json/widget_json/
[10]: /ko/reference_tables/
[11]: /ko/metrics/reference_table_joins_with_metrics/