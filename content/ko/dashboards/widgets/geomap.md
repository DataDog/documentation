---
aliases:
- /ko/graphing/widgets/geomap/
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /notebooks/
  tag: 설명서
  text: 노트북
title: Geomap 위젯
widget_type: geomap
---

Geomap 위젯을 사용하면 지역을 그라데이션 또는 점으로 표현해 지리 데이터를 시각화할 수 있습니다. 이를 통해 다음을 할 수 있습니다.
- 국가별 사용자 세션 보기
- 새 탭에서 모든 세션 목록 필터링하기
- 사용자 세션을 직원별로 필터링하여 보기
- 로드 시간, 코어 웹 바이탈, 오류 보기 퍼센트와 같은 성능 메트릭 모니터링하기

{{< img src="/dashboards/widgets/geomap/geomap-points.png" alt="점 오버레이를 사용한 Geomap 가시화" >}}

## 설정

{{< img src="dashboards/widgets/geomap/geomap_setup2.png" alt="위젯 구성의 데이터 섹션 Geomap 그래프">}}

### 구성
1. 시각화 레이어 선택:
    * **Regions**: 국가 수준에서 측정 값 누계
    * **Points**: 이벤트를 점으로 오버레이하여 지리 이벤트 데이터 표시

2. 그래프로 표시할 데이터 선택: <br>
  **참고**: 선택한 가시화 레이어에 따라 지원되는 데이터 소스가 다릅니다.
  {{< tabs >}}
  {{% tab "리전" %}}
  |  데이터 소스    | 참고    | 
  | --------------  | -------- |
  |로그 이벤트   |  태그별 그룹에는 alpha-2 ISO 형식을 따르는 국가 ISO 코드가 포함되어야 합니다. 이를 위해 [GeoIP Processor][1]를 사용하거나 수작업으로 [수집한 로그에 태그][2]를 포함할 수 있습니다. 이벤트 쿼리를 구성하려면 [로그 검색 설명서][3]를 참고하세요.|
  |이벤트   |  태그별 그룹에는 alpha-2 ISO 형식을 따르는 국가 ISO 코드가 포함되어야 합니다. 이를 위해 [수집된 로그에서 메트릭을 생성][4]하거나 수작업으로 [수집한 로그에 태그][2]를 포함할 수 있습니다. 메트릭 쿼리를 구성하려면 [쿼리 설명서][5]를 참고하세요.|
  |RUM   | RUM 쿼리를 구성하려면 [RUM 설명서][6]를 참고하세요. |
  |SLO | SLO 쿼리를 구성하려면 [SLO 검색 설명서][7]를 참고하세요. |
  |보안 신호 <br> 애플리케이션 보안 <br> 감사 추적 | 쿼리를 구성하려면 [로그 검색 설명서][3]를 참고하세요. |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_management/service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "점" %}}
  |  데이터 소스 | 참고 |
  | -----------  | ----- | 
  |로그 이벤트   | 태그별 그룹에는 alpha-2 ISO 형식을 따르는 국가 ISO 코드가 포함되어야 합니다. 이를 위해 [GeoIP Processor][1]를 사용하거나 수작업으로 [수집한 로그에 태그][2]를 포함할 수 있습니다. 로그 이벤트 쿼리를 구성하려면 [로그 검색 설명서][3]를 참고하세요. |
  |RUM   | RUM 쿼리를 구성하려면 [RUM 설명서][4]를 참고하세요. |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. 선택 사항: 처음에 집중하고자 하는 맵의 위치를 보기 상자에서 구성할 수 있습니다.

### 옵션

#### 컨텍스트 링크

[컨텍스트 링크][7]는 기본적으로 활성화되어 있으나 토글하여 비활성화할 수 있습니다. 컨텍스트 링크를 사용하면 대시보드 위젯을 다른 페이지(Datadog 페이지나 타사 페이지)와 연결할 수 있습니다.

## API

위젯을 **[대시보드 API][8]**와 함께 사용해야 합니다. [위젯 JSON 스키마 정의][9]를 보려면 다음 테이블을 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/processors/#geoip-parser
[2]: /ko/getting_started/tagging/#define-tags
[3]: /ko/logs/search_syntax/
[4]: /ko/logs/logs_to_metrics/
[5]: /ko/dashboards/querying/
[6]: /ko/real_user_monitoring/explorer/search_syntax/
[7]: /ko/dashboards/guide/context-links/
[8]: /ko/api/latest/dashboards/
[9]: /ko/dashboards/graphing_json/widget_json/