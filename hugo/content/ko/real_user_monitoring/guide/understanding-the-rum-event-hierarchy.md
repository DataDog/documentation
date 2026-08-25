---
further_reading:
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
- link: /real_user_monitoring/
  tag: 설명서
  text: RUM 데이터 가시화에 대해 알아보기
title: RUM 이벤트 계층 이해
---

## 개요

이 가이드에서는 RUM에서 수집하는 여러 [데이터 유형][1]을 알아보고 각 이벤트 유형의 계층을 설명합니다.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-session-hierarchy-overview.png" alt="RUM 이벤트 계층 다이어그램, 여러 보기를 포함하고 있는 단일 세션" style="width:50%;">}}

## 세션
RUM 데이터는 사용자 세션과 신서틱 세션을 모두 포함하고 있고, 이는 이벤트 계층에서 상위를 차지합니다. 세션이란 고유한 사용자 여정을 뜻하는데, 여기에는 사용자가 트리거한 모든 항목이 포함되어 있습니다(예: 확인한 페이지, 보기, 클릭, 스크롤, 오류). 세션은 연속 활동으로 네 시간까지 이어지거나 [15분 동안 활동이 없으면][2] 만료될 수 있습니다. 한 세션에 전체 여정이 모두 포함되어 있기 때문에 사용자에게 연결된 [속성][3] 전체가 해당 세션과 연결됩니다. 예를 들어 `action count`와 같은 기본 속성을 쿼리하고 싶을 경우 [사용자 속성][4]과 같은 커스텀 속성을 추가할 수 있습니다.

#### 검색 예시: 사용자의 모든 세션 목록 보기

특정 사용자의 세션 목록 전체를 불러오고 싶으면 이벤트 유형 드롭다운에서 **Sessions**를 선택한 후 세션 상태와 사용자로 쿼리를 검색하세요.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-all-session-user-1.png" alt="사용자 'Lee Davis'의 모든 세션 목록을 보여주는 검색 예시" style="width:80%;">}}

각 세션에는 고유 `session.id`가 부여됩니다.

## 보기
세션에는 사용자가 애플리케이션에서 페이지(Browser RUM), 스크린, 또는 스크린 세그먼트(Mobile RUM)를 이동할 때마다 보기 이벤트가 생성됩니다.

각 보기에서는 URL 텍스트와 같은 다양한 보기 전용 속성 및 데이터와 페이지 로드 타임과 같은 타이밍 메트릭을 수집합니다. 특정 보기를 쿼리할 때 디바이스, 운영 체제, 또는 사용자 정보와 같은 기본 수준 속성을 추가할 수 있습니다. 그러나 이벤트 전용 속성은 보기 전용이어야 합니다. 이벤트만 보려면 아래 이미지와 같이 이벤트 선택기를 조정하세요.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-switch-views.png" alt="RUM 보기" style="width:80%;">}}

`session.id`와 마찬가지로 각 보기에는 고유한 `view.id`가 할당됩니다.

### 활동, 오류, 리소스, 긴 작업

SDK는 보기 내에 동일한 계층 수준에 속하는 세부 이벤트를 생성합니다. 그러나 각 이벤트는 고유하며 서로 다른 속성과 특징을 가지고 있습니다.

### 작업

활동이란 페이지에서 사용자가 한 활동을 뜻합니다. 브라우저에서는 모든 클릭 활동이 자동으로 수집됩니다. 모바일 환경에서는 탭, 밀기, 스크롤과 같은 활동이 수집됩니다. 이와 같은 기본 활동 외에도 서식 완성 및 비즈니스 거래와 같은 [커스텀 활동][5]도 전송할 수 있습니다.

#### 검색 예시: 오류로 이어진 상위 활동 목록

이 예시에서는 사용자가 "카트에 추가" 버튼을 클릭하여 오류가 발생한 활동 모두를 검색하는 쿼리를 보여줍니다.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-actions-all-add-to-cart-1.png" alt="오류로 이어진 '카트에 추가' 활동을 보여주는 검색 예시" style="width:80%;">}}

### Errors

RUM을 사용해 사용자 세션 중 [프론트엔드 오류][6]를 수집할 수 있습니다. 기본적으로 브라우저 SDK에서는 처리하지 않은 예외나 콘솔 오류에 대해 오류 이벤트를 생성합니다. 또 RUM `addError` API로 커스텀 오류를 수집할 수 있습니다([브라우저][7]와 [모바일][8]에서 모두 사용 가능). 모바일 앱의 경우에는 오류가 세션 종료로 이어졌는지(크래시)도 확인할 수 있습니다.

RUM과 Error Tracking 모두에서 오류를 확인할 수 있습니다. 소스 오류와 커스텀 오류는 Error Tracking에서 처리되고 콘솔 오류는 RUM에서만 처리됩니다.

#### 검색 예시: 애플리케이션에서 발생한 크래시 목록 전체 보기

이 예시에서는 오류 이벤트 내에서 특정 애플리케이션의 "HomeViewController" 페이지에서 발생한 모든 크래시 목록을 띄우는 쿼리를 보여줍니다.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-checkoutviewcontroller.png" alt="페이지에서 발생한 모든 크래시를 보여주는 검색 예시" style="width:80%;">}}

### 리소스
애플리케이션에서 네트워크 공급자로 보내는 외부 요청(예:  XHR, JS 로딩, 이미지, 또는 글꼴)을 포함한 리소스도 보기에서 수집됩니다. 보기에서 수집되기 때문에 애플리케이션에서 로드되는 리소스 모두를 쿼리하거나 단일 보기에서 발생한 리소스로 범위를 좁혀서 쿼리할 수 있습니다.

#### 검색 예시:  `/cart` 보기에서 로딩된 모든 이미지 목록, 이미지 크기로 필터링됨 

이 예시는 이벤트 유형 드롭다운에서 **Resources**를 선택한 후 카트 보기에서 로딩한 이미지 중 1000 킬로바이트 이상인 이미지 목록을 쿼리한 것입니다.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-resources.png" alt="카트 보기에서 로딩된 이미지 중 1000 킬로바이트 이상인 이미지 목록을 검색한 예시" style="width:80%;">}}

### 긴 작업
긴 작업이란 UI 스레드가 특정 시간 동안 차단된 작업을 뜻합니다. 예를 들어 모바일 환경에서 스크린이 300 밀리초 이상 차단되어 화면이 멈춘 경우 긴 작업이라고 합니다.

#### 검색 예시: 500ms를 초과해 화면이 멈춘 긴 작업 전체 목록

이 예시에서는 이벤트 유형 드롭다운에서 **Long Tasks**를 선택한 후 시간을 지정했습니다.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-long-tasks.png" alt="500 밀리초를 초과해 화면이 멈춘 긴 작업 전체를 검색한 예시" style="width:80%;">}}

## 트러블슈팅

### 쿼리를 썼는데도 아무런 데이터가 나타나지 않음

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-no-data-appears-3.png" alt="쿼리를 쓴 후 아무런 데이터가 나타나지 않는 예시" style="width:80%;">}}

쿼리를 쓴 후 아무런 데이터가 나타나지 않는 경우 검색 창에 있는 내용과 이벤트 선택기가 일치하는지 확인하세요. 위 예시에서는 이벤트 선택기가 **views** 내에서 검색하도록 설정되어 있는데 검색 창에는 **action** 속성만 포함되어 있는 것을 확인할 수 있습니다. 활동 관련 데이터를 보려면 보기 선택기를 활동으로 바꿔야 합니다. 그래도 데이터가 보이지 않으면 시간대 선택기를 확인하여 데이터에 맞는 시간대를 선택했는지 확인하세요.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-data-now-appears.png" alt="보기와 시간대 선택기로 쿼리 업데이트하기 예시" style="width:80%;">}}

### 다른 이벤트 유형과 중첩된 이벤트 유형 쿼리하기

특정 활동을 쿼리하고 싶을 경우 상위 이벤트 유형을 사용할 수 있으나 동일하거나 하위 수준에 있는 이벤트는 사용할 수 없습니다. 예를 들어 활동은 보기 아래에 중첩되어 있고 활동과 오류는 동일한 계층 체인입니다. 따라서 특정 페이지에서 발생한 모든 활동과 오류를 쿼리할 수 있으나 특정 오류 유형을 가진 활동을 쿼리할 수는 없습니다.

#### 검색 예시: `/`에서 발생한 상위 활동 10개

이 검색 예시에서는 활동 이벤트 유형 내에서 상위 목록 보기 이름을 적용해 `/`(홈페이지)에서 발생한 상위 활동 10개를 보여줍니다.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-top-ten-actions.png" alt="홈페이지에서 발생한 상위 활동 10개를 보여주는 검색 예시" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/data_collected
[2]: /ko/account_management/billing/rum/#when-does-a-session-expire
[3]: /ko/real_user_monitoring/browser/data_collected/#event-specific-metrics-and-attributes
[4]: /ko/real_user_monitoring/browser/data_collected/#user-attributes
[5]: /ko/real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[6]: /ko/real_user_monitoring/browser/collecting_browser_errors/?tab=npm
[7]: /ko/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[8]: /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios/?tab=swift#custom-errors