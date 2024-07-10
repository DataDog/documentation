---
further_reading:
- link: /real_user_monitoring/explorer/group/
  tag: 설명서
  text: 쿼리된 RUM 이벤트 그룹화
- link: /real_user_monitoring/explorer/visualize/
  tag: 설명서
  text: 이벤트에 시각화 적용
title: RUM 이벤트 검색
---

## 개요

오른쪽 상단에서 시간 범위를 적용한 후에는 RUM 탐색기에서 `key:value` 쌍과 전체 텍스트 검색이 있는 이벤트를 찾을 수 있습니다.

## 이벤트 유형

RUM은 이벤트를 자동으로 캡처하지만, 자신의 이벤트를 캡처할 수도 있습니다. 모든 자동 캡처 및 커스텀 이벤트는 [브라우저][1], [iOS][2], [Android][3], [React Native][4] 애플리케이션에 대해 6개의 이벤트 유형으로 저장되며 검색이 가능하도록 인덱싱됩니다.

| 이벤트 유형 | 보존 | 설명                                                                                                                                                                                                                                                               |
|------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 세션    | 30일   | 사용자 세션은 사용자가 웹 어플리케이션을 브라우징하기 시작할 때 시작되며, 사용자에 대한 높은 수준의 정보(예: 브라우저, 디바이스, 지리적 위치)를 포함합니다. 사용자가 사용하는 동안 동안 수집된 모든 RUM 이벤트를 고유 `session.id` 속성으로 집계합니다. |
| 보기       | 30일   | 보기 이벤트는 사용자가 웹 애플리케이션의 페이지를 방문할 때마다 생성됩니다. 사용자가 동일한 페이지에 머무는 동안 리소스, 긴 작업, 오류 및 액션 이벤트는 `view.id` 속성을 사용하여 관련 RUM 보기에 연결됩니다.                                   |
| 액션     | 30일   | RUM 액션 이벤트는 사용자가 사용하는 동안의 상호 작용을 추적하며 커스텀 사용자 액션을 모니터링하기 위해 수동으로 전송할 수 있습니다.                                                                                                                                                  |
| 에러      | 30일   | RUM은 브라우저에서 발생하는 모든 프론트엔드 오류를 수집합니다.                                                                                                                                                                                                                 |
| 리소스   | 15일   | 리소스 이벤트는 웹페이지에 로드된 이미지, XHR, Fetch, CSS 또는 JS 라이브러리에 대해 생성됩니다. 여기에는 자세한 로딩 타이밍 정보가 포함됩니다.                                                                                                                          |
| 긴 작업  | 15일   | 50밀리초 이상 메인 스레드를 차단하는 브라우저의 모든 작업에 대해 긴 작업 이벤트가 생성됩니다.                                                                                                                                                                |

RUM 이벤트를 검색하려면 검색창의 왼쪽에 있는 드롭다운 메뉴에서 이벤트 유형을 선택합니다.

{{< img src="real_user_monitoring/explorer/search/rum_explorer_search-3.png" alt="RUM Explorer" style="width:100%;">}}

## 쿼리 검색

지난 하루 동안 실제 사용자가 특정 애플리케이션에서 생성한 세션을 필터링하려면 상단 탐색에서 애플리케이션 선택기를 사용한 다음 `@session.type:user`와 같은 커스텀 쿼리를 만들고 시간 범위를 `1d`로 설정합니다.

**참고:** 쿼리에 패싯을 포함하는 경우 먼저 패싯을 작성해야 합니다.

### 검색 구문

RUM 이벤트 검색 및 시간 프레임 사용에 대한 자세한 내용은 [검색 구문][5] 및 [커스텀 시간 프레임][6]을 참조하세요.

## 패싯 및 측정값 설정

모든 RUM 이벤트에는 RUM SDK에서 자동으로 수집하는 속성과 [이벤트 사이드 패널][7]에 표시되는 커스텀 속성이 포함되어 있습니다.

대부분의 자동 수집된 속성은 색인화되고 패싯되지만, 커스텀 이벤트 속성은 기본적으로 색인화 및 패싯되지 않습니다. 검색 및 [시각화][8]에서 액세스할 수 있도록 패싯 또는 측정값을 만들어 이러한 속성을 색인화합니다.

### 패싯

패싯은 속성 또는 태그의 모든 고유 멤버를 표시하고 표시된 RUM 이벤트 수와 같은 기본 분석을 제공합니다. 패싯을 사용하면 주어진 속성을 기반으로 데이터 집합을 피벗하거나 필터링할 수 있습니다. 값을 선택하면 검색창에 필터가 적용됩니다.

{{< img src="real_user_monitoring/explorer/rum_facet-2.png" alt="이벤트 목록 왼쪽에 있는 패싯 목록" style="width:90%;">}}

패싯을 만들려면 [이벤트 사이드 패널][7]에서 속성을 찾은 후 클릭합니다. 그러면 "Country subdivision"과 같은 사이드 패널의 값에 대한 속성 섹션이 생성됩니다.

{{< img src="real_user_monitoring/explorer/create_facet.png" alt="패싯 생성" style="width:40%;">}}

또한 좌측 패널에서 **+ Add**를 클릭한 다음 패싯 경로를 입력하거나 선택하여 세션에서 메타데이터를 가져오고 패싯(예: 버지니아)으로 변환할 수 있습니다.

{{< img src="real_user_monitoring/explorer/create-facet-1.png" alt="패싯 목록에서 +추가 버튼을 사용하여 패싯을 만듭니다." style="width:40%;">}}

***Advanced options**를 클릭하여 다른 표시 이름, 유형, 그룹 또는 설명을 제공하는 등의 방식으로 패싯을 사용자 지정할 수 있습니다.

{{< img src="real_user_monitoring/explorer/create-facet-2.png" alt="새 패싯에 대한 고급 옵션" style="width:40%;">}}

속성 값은 모든 새로운 보기에 걸쳐 저장되며, 검색창, **패싯** 패널 및 [시각화][8]에서 이러한 속성에 액세스할 수 있습니다.

### 측정

측정값은 RUM 이벤트에 포함된 숫자 값을 가진 속성입니다.

측정값을 생성하려면 [이벤트 측면 패널][7]에서 숫자 속성을 찾아 클릭합니다.

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="측정값 생성" style="width:40%;">}}

이 속성의 값은 모든 새 RUM 이벤트에 저장됩니다. 검색창, **패싯** 패널 및 [시각화][8]에서 이 속성에 액세스할 수 있습니다.

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="측정값 편집" style="width:40%;">}}

모든 측정값에는 [RUM 탐색기][9]의 열과 [시각화][8]의 열에 표시되는 단위가 있습니다.

## 패싯 검색

특정 속성을 검색하려면 [패싯으로 속성을 추가하고](#facets) 검색 쿼리에서 `@`를 입력합니다. 이는 패싯을 검색하고 있음을 명시합니다. 

예를 들어, 패싯 이름이 **url**이고 **url** 값 `www.datadoghq.com`을 필터링하려면 `@url:www.datadoghq.com`를 입력합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/data_collected/
[2]: /ko/real_user_monitoring/android/data_collected/
[3]: /ko/real_user_monitoring/ios/data_collected/
[4]: /ko/real_user_monitoring/reactnative/
[5]: /ko/real_user_monitoring/explorer/search_syntax/
[6]: /ko/dashboards/guide/custom_time_frames
[7]: /ko/real_user_monitoring/explorer/events/
[8]: /ko/real_user_monitoring/explorer/visualize#timeseries
[9]: /ko/real_user_monitoring/explorer/