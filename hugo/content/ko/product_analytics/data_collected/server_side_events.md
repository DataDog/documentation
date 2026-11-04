---
description: 서버에서 사용자 지정 이벤트를 전송하여 Product Analytics의 클라이언트 측 데이터를 보완합니다.
further_reading:
- link: /api/latest/product-analytics/#send-server-side-events
  tag: API 참조
  text: Product Analytics API
- link: /product_analytics/
  tag: 문서
  text: Product Analytics
- link: /product_analytics/data_collected/
  tag: 문서
  text: 수집된 Product Analytics 데이터
title: 서버 측 이벤트 추적
---
## 개요 {#overview}

서버 측 이벤트는 [Product Analytics API][1]를 통해 서버에서 전송되는 사용자 지정 이벤트입니다. 페이지 조회나 버튼 클릭과 같이 RUM SDK가 수집하는 클라이언트 측 이벤트와 달리, 서버 측 이벤트는 체크아웃 완료나 결제 처리처럼 백엔드에서 발생하는 작업을 추적합니다.

서버 측 이벤트는 다음과 같은 용도로 사용할 수 있습니다.

- 클라이언트 측 동작과 관계없이 서버의 신뢰할 수 있는 원본 데이터에서 이벤트 수집
- 결제 확인이나 구독 갱신과 같이 클라이언트 측에 대응하는 항목이 없는 백엔드 작업 추적
- 서버 측 컨텍스트로 클라이언트 측 데이터 보완

## 전제 조건 {#prerequisites}

서버 측 이벤트를 전송하기 전에 애플리케이션에 [Datadog SDK를 설정][2]하고 [Product Analytics를 활성화][3]합니다.

## 서버 측 이벤트 전송 {#send-server-side-events}

[Product Analytics API][1]를 사용하여 서버에서 이벤트를 전송합니다. 서버 측 이벤트를 클라이언트 세션과 연결하려면 클라이언트의 활성 RUM 세션에서 가져온 `session_id`를 포함합니다. 세션 ID를 포함하면 서버 측 이벤트가 클라이언트 측 데이터와 연결되어 사용자 여정의 전체 흐름을 확인할 수 있습니다.

인증, 필수 필드, 요청 파라미터를 포함한 전체 API 참조는 [서버 측 이벤트 전송][1]을 참조하세요.

## 서버 측 이벤트 분석 {#analyze-server-side-events}

서버 측 이벤트를 전송하면 모든 Product Analytics 차트에서 해당 이벤트를 확인할 수 있습니다. 이벤트 선택기에서 **Server Events**를 선택하여 분석 범위를 서버 측 데이터로 제한합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/product-analytics/#send-server-side-events
[2]: /ko/product_analytics/#track-client-side-events-sdk
[3]: /ko/product_analytics/#enable-product-analytics