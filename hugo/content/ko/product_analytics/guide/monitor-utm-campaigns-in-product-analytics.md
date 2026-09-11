---
description: Product Analytics 및 Session Replay를 사용하여 UTM 캠페인의 성과를 모니터링하는 방법을 알아보세요.
title: Product Analytics에서 UTM 캠페인을 모니터링하는 방법
---

## 개요

UTM(Urchin Tracking Module) 추적은 특정 캠페인의 실적을 추적하고 방문자가 웹사이트에 도착한 경로를 식별하기 위해 URL에 추가할 수 있는 파라미터입니다. 이 가이드에서는 Datadog Product Analytics에서 수집하는 UTM 파라미터의 유형과 Product Analytics를 사용해 모니터링하는 방법을 안내합니다.

## 수집한 데이터

UTM 캠페인은 Product Analytics의 [보기][1] 이벤트와 연결되어 있습니다. 캠페인 데이터는 브라우저 SDK에 의해 자동으로 수집되며 애널리틱스 탐색기에서 패싯으로 볼 수 있습니다. Datadog에서 수집하는 UTM 파라미터는 다음과 같이 정의할 수 있습니다.

| 필드                | 유형   | 설명                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | 문자열 | 트래픽의 원본을 추적하는 URL의 파라미터. |
| `view.url_query.utm_medium`        | 문자열 | 트래픽이 전송되는 채널을 추적하는 URL의 파라미터.    |
| `view.url_query.utm_campaign`  | 문자열 | 해당 보기에 연결된 특정 마케팅 캠페인을 식별하는 URL의 파라미터.              |
| `view.url_query.utm_content`  | 문자열 | 마케팅 캠페인 내에서 사용자가 클릭한 특정 요소를 식별하는 URL의 파라미터입니다.           |
| `view.url_query.utm_term` | 문자열 | 특정 캠페인을 트리거하기 위해 사용자가 검색한 키워드를 추적하는 URL의 파라미터.             |

## 사용 사례

### 사용자가 사이트에 도달하는 방식 파악

사용자가 사이트에 도달하는 경로를 측정하려면 '@view.url_query.utm_medium' 패싯을 사용할 수 있습니다. 해당 패싯은 소셜, 오가닉, 검색, Google 캠페인 또는 특정 이벤트(웨비나 등)와 같은 다양한 매체를 표시합니다. 다양한 매체를 통해 웹사이트에 방문한 사용자의 세션 리플레이를 확인하고, 여러 그룹 사이에서 눈에 띄는 패턴이 발생하는지 조사할 수 있습니다.

### 특정 캠페인이 다른 캠페인보다 트래픽이 높은지 추적하기

{{< img src="real_user_monitoring/guide/UTM-campaign-tracking.png" alt="특정 캠페인 페이지의 모든 조회수 스크린샷" style="width:90%;">}}

위의 쿼리에서와 같이 캠페인이 실행 중인 랜딩 페이지 등 페이지의 모든 조회수를 계산할 수 있습니다. 이를 통해 특정 페이지의 방문수가 늘어나고 있는지 이해하고 특정 페이지에 대한 광고 지출을 늘려야 하는지 이해할 수 있습니다.

### 국가별 UTM 소스 분석

{{< img src="real_user_monitoring/guide/UTM-by-country.png" alt="국가별 UTM 소스 스크린샷" style="width:90%;">}}

본 예시에서는 광고 대 오가닉 트래픽과 같은 다양한 캠페인 소스를 추적할 수 있습니다. 그런 다음 지역 등의 레이어를 추가하여 국가별로 조회수 패턴이 변화하는지 파악할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#views