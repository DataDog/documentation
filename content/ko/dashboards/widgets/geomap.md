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
title: 지오맵 위젯
---

지오맵 위젯은 국가 태그 또는 패싯이 있는 메트릭을 그래프화합니다.

{{< img src="dashboards/widgets/geomap/geomap.png" alt="지오맵" >}}

## 구성

{{< img src="dashboards/widgets/geomap/geomap_setup.png" alt="상위 목록" style="width:80%;">}}

### 설정

1. 그래프화할 데이터를 선택합니다.
    * RUM: RUM 쿼리를 구성하려면 [Rum 가이드][1]를 참조하세요.
    * 로그 이벤트: 로그 이벤트 쿼리를 설정하려면 [로그 검색 설명서][2]를 참조하세요.
      * **참고**: 태그별 그룹에는 alpha-2 ISO 형식을 따르는 국가 ISO 코드가 포함되어야 합니다. [GeoIP Processor][3]를 사용하여 이를 수행하거나 [수집 중인 태그][4]를 수동으로 포함할 수 있습니다.
    * 메트릭: 메트릭 쿼리를 설정하려면 [쿼리][5] 가이드를 참조하세요.
      * **참고**: 태그별 그룹에는 alpha-2 ISO 형식을 따르는 국가 ISO 코드가 포함되어야 합니다. [수집 로그에서 메트릭을 생성][6]하거나 [수집 중인 태그][4]를 수동으로 포함할 수 있습니다.

2. 선택 사항: 기본적으로 맵에서 확대하려는 위치에 따라 보기란을 설정합니다.

### 옵션

#### 글로벌 시간

스크린보드 및 노트북에서 위젯에 커스텀 시간 프레임이 있는지 또는 글로벌 시간 프레임을 사용하는지를 선택하세요.

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 사용자 지정 제목을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/explorer/visualize#timeseries
[2]: /ko/logs/search_syntax/
[3]: /ko/logs/log_configuration/processors/#geoip-parser
[4]: /ko/getting_started/tagging/#defining-tags
[5]: /ko/dashboards/querying/
[6]: /ko/logs/logs_to_metrics/