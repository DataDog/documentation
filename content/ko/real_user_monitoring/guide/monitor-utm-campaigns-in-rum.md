---
description: RUM 및 세션 리플레이를 사용하여 UTM 캠페인의 성능을 모니터링하는 방법을 알아보세요.
kind: 지침
title: RUM에서 UTM 캠페인을 모니터링하는 방법
---

## 개요

UTM(Urchin Tracking Module) 추적은 특정 캠페인의 성능을 추적하고 방문자가 웹사이트에 도달한 방식에 대한 속성 경로를 파악할 목적으로 URL에 추가할 수 있는 파라미터 입니다. 본 지침에서는 UTM 파라미터 Datadog RUM이 수집하는 유형과 RUM을 사용하여 모니터링하는 방법을 알아봅니다.

## 수집 데이터

UTM 캠페인은 RUM의 [보기][1] 이벤트에 연결됩니다. 캠페인 데이터는 브라우저 SDK가 자동으로 수집하며 RUM 탐색기에서 패싯으로 확인할 수 있습니다. UTM 파라미터 Datadog이 수집하는 데이터는 다음과 같습니다.

| 항목                | 유형   | 설명                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | 문자열 | 트래픽의 원본을 추적하는 URL의 파라미터입니다. |
| `view.url_query.utm_medium`        | 문자열 | 트래픽이 전송되는 채널을 추적하는 URL의 파라미터입니다.    |
| `view.url_query.utm_campaign`  | 문자열 | 해당 보기에 연결된 특정 마케팅 캠페인을 식별하는 URL의 파라미터입니다.              |
| `view.url_query.utm_content`  | 문자열 | 마케팅 캠페인 내에서 사용자가 클릭한 특정 요소를 식별하는 URL의 파라미터입니다.           |
| `view.url_query.utm_term` | 문자열 | 사용자가 지정된 캠페인을 트리거하기 위해 검색한 키워드를 추적하는 URL의 파라미터입니다.             |

## 사용 사례

### 사용자가 사이트에 도달하는 방식 파악

사용자가 사이트에 도달하는 경로를 측정하려면 '@view.url_query.utm_medium' 패싯을 사용할 수 있습니다. 해당 패싯은 소셜, 오가닉, 검색, Google 캠페인 또는 특정 이벤트(웨비나 등)와 같은 다양한 매체를 표시합니다. 다양한 매체를 통해 웹사이트에 방문한 사용자의 세션 리플레이를 확인하고, 여러 그룹 사이에서 눈에 띄는 패턴이 발생하는지 조사할 수 있습니다.

### 특정 캠페인이 다른 캠페인보다 트래픽이 높은지 추적하기

{{< img src="real_user_monitoring/guide/UTM-campaign-tracking.png" alt="특정 캠페인 페이지의 모든 조회수 스크린샷" style="width:90%;">}}

위의 쿼리에서 캠페인이 실행 중인 랜딩 페이지와 같은 페이지의 모든 조회수를 측정할 수 있습니다. 본 작업으로 특정 페이지의 방문자 수가 더 늘어나는지 파악하여 해당 페이지에 대한 광고 지출을 늘려야 할지 결정할 수 있습니다.

### 국가별 UTM 소스 분석

{{< img src="real_user_monitoring/guide/UTM-by-country.png" alt="국가별 UTM 소스 스크린샷" style="width:90%;">}}

본 예시에서는 광고 대 오가닉 트래픽과 같은 다양한 캠페인 소스를 추적할 수 있습니다. 그런 다음 지역 등의 레이어를 추가하여 국가별로 조회수 패턴이 변화하는지 파악할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#views