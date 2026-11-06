---
description: Product Analytics가 수집하는 이벤트 유형, 측정값 및 속성(세션, 보기, 액션 포함)에 대해 알아보세요.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: 학습 센터
  text: Product Analytics 시작하기
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: 학습 센터
  text: Product Analytics에서 레이블이 지정된 액션을 사용하여 사용자 행동 정의
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: 설명서
  text: 수집된 RUM 브라우저 데이터
- link: /real_user_monitoring/application_monitoring/ios/data_collected/
  tag: 설명서
  text: 수집한 RUM iOS 데이터
- link: /real_user_monitoring/application_monitoring/android/data_collected/
  tag: 설명서
  text: 수집된 RUM 안드로이드 데이터
- link: /product_analytics/data_collected/server_side_events/
  tag: 설명서
  text: 서버 측 이벤트 추적
title: 수집된 Product Analytics 데이터
---
## 개요 {#overview}

Product Analytics는 사용자 활동 데이터를 이벤트로 수집합니다. 각 이벤트에는 두 가지 유형의 데이터가 있습니다.

- **텔레메트리**: 활동을 추적하고 비교하는 데 사용되는 정량화 가능한 값(예: `view.time_spent`).
- **속성**: 분석에서 측정값을 필터링하고 분류하는 데 사용되는 설명 값(예: `device.type` 또는 `geo.country`).

모든 이벤트에는 [기본 속성](#default-attributes)이 포함됩니다. 각 이벤트 유형에는 [특정 텔레메트리 및 속성](#event-specific-attributes)도 있습니다.

Product Analytics는 세션 전반에서 개별 사용자를 식별하기 위해 `usr.id` 및 `usr.email` 속성을 사용합니다. 인증되지 않은 사용자나 로그인하지 않는 방문자의 경우, RUM SDK는 활동을 추적하기 위해 자동으로 `usr.anonymous_id`를 할당합니다. 자세한 내용은 [인증되지 않은 사용자 추적][4]을 참조하세요.

<div class="alert alert-info">Product Analytics는 데이터를 수집하기 위해 Real User Monitoring(RUM)과 동일한 SDK 및 구성을 사용합니다. RUM과 달리 Product Analytics는 오류, 리소스, 긴 작업 또는 바이탈 이벤트를 수집하지 않습니다. RUM 이벤트 유형 및 속성의 전체 목록은 <a href="/real_user_monitoring/application_monitoring/browser/data_collected/">브라우저</a>, <a href="/real_user_monitoring/application_monitoring/ios/data_collected/">iOS</a> 및 <a href="/real_user_monitoring/application_monitoring/android/data_collected/">Android</a>에 대한 데이터 수집 페이지를 참조하세요.</div>

| 이벤트 유형 | 보존 | 설명 |
|------------|-----------|-------------|
| 세션 | 15개월 | 세션은 애플리케이션을 통한 실제 사용자 여정을 나타냅니다. 세션은 사용자가 애플리케이션을 열 때 시작되며 사용자가 활성 상태인 동안 계속 유지됩니다. 세션 중에 생성된 모든 이벤트는 동일한 `session.id` 속성을 공유합니다. **참고:** 세션은 15분 동안 활동이 없으면 재설정됩니다. |
| 보기 | 15개월 | 보기는 사용자가 세션 내에서 방문하는 고유한 페이지나 화면을 나타냅니다. 브라우저에서 보기는 사용자가 페이지를 방문할 때마다 생성됩니다. 모바일에서 보기는 화면 또는 화면 세그먼트에 해당합니다. 사용자가 특정 보기에 있는 동안 생성된 모든 이벤트는 동일한 `view.id` 속성을 공유합니다. |
| 액션 | 15개월 | 액션은 클릭, 탭, 스와이프, 스크롤 등 애플리케이션에서의 사용자 활동을 나타냅니다. 액션은 SDK에 의해 자동으로 수집됩니다. 각 액션은 고유한 `action.id`를 통해 해당 액션이 생성된 보기에 첨부됩니다. |
| 레이블이 지정된 액션 | 15개월 | 레이블이 지정된 액션은 [액션 관리][1]를 사용하여 자동 캡처된 액션에 적용된 사용자 지정 이름입니다. 레이블이 지정된 액션을 사용하면 코드를 작성하지 않고도 특정 사용자 상호 작용을 구성하고 분석할 수 있습니다. |

## 기본 속성 {#default-attributes}

다음 속성은 기본적으로 모든 이벤트에 첨부됩니다.

### 일반 {#general}

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `date` | number | 이벤트의 타임스탬프입니다. |
| `type` | string | 이벤트 유형입니다(예: `view` 또는 `action`). |
| `service` | string | 사용자 세션을 상관시키는 데 사용되는 이 애플리케이션의 통합 서비스 이름입니다. |
| `application.id` | string | Datadog 애플리케이션 ID입니다. |
| `application.name` | string | Datadog 애플리케이션 이름입니다. |

### 장치 {#device}

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `device.brand` | string | 장치에서 보고한 장치 브랜드입니다. |
| `device.model` | string | 장치에서 보고한 장치 모델입니다. |
| `device.name` | string | 장치에서 보고한 장치 이름입니다. |
| `device.type` | string | 장치에서 보고한 장치 유형입니다(예: `Mobile`, `Tablet` 또는 `Desktop`). |

### 운영 체제 {#operating-system}

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `os.name` | string | 장치에서 보고한 OS 이름입니다. |
| `os.version` | string | 장치에서 보고한 OS 버전입니다. |
| `os.version_major` | string | 장치에서 보고한 메이저 OS 버전입니다. |

### 지리적 위치 {#geolocation}

다음 속성은 세션의 IP 주소에서 파생됩니다.

**참고:** 지리적 위치 속성의 수집을 중단하려면 [애플리케이션 관리][2]에서 설정을 변경하세요.

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `geo.country` | string | 국가 이름입니다. |
| `geo.country_iso_code` | string | 국가 ISO 코드입니다(예: `US` 또는 `FR`). |
| `geo.country_subdivision` | string | 국가의 1차 행정 구역 이름입니다(예: `California` 또는 `Sarthe`). |
| `geo.continent_code` | string | 두 글자로 된 대륙 코드입니다(예: 유럽의 경우 `EU`, 북미의 경우 `NA`). |
| `geo.continent` | string | 대륙 이름입니다. |
| `geo.city` | string | 도시 이름입니다(예: `San Francisco` 또는 `Paris`). |

### 사용자 속성 {#user-attributes}

[사용자 정보 추적][3]을 전역으로 활성화하여 모든 이벤트에 대해 사용자 속성을 수집하고 적용할 수 있습니다.

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `usr.id` | string | 사용자의 식별자입니다. |
| `usr.name` | string | 사용자의 이름입니다. |
| `usr.email` | string | 사용자의 이메일입니다. |
| `usr.anonymous_id` | string | 인증되지 않은 사용자에게 할당된 무작위 생성 UUID입니다. 최대 1년 동안 유지됩니다. [인증되지 않은 사용자 추적][4]을 참조하세요. |

## 이벤트별 속성 {#event-specific-attributes}

다음 속성은 각 이벤트 유형에 따라 다릅니다.

### 세션 속성 {#session-attributes}

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `session.id` | string | 세션의 고유 ID입니다. |
| `session.type` | string | 세션 유형입니다. Product Analytics의 경우 값은 `user`입니다. |
| `session.is_active` | 불리언 | 세션이 활성 상태인지 여부를 나타냅니다. 세션은 4시간 동안 활동하거나 15분 동안 활동하지 않으면 종료됩니다. |
| `session.time_spent` | number (nanoseconds) | 세션에 소요된 시간입니다. |
| `session.view.count` | number | 이 세션에 대해 수집된 모든 보기의 수입니다. |
| `session.action.count` | number | 이 세션에 대해 수집된 모든 액션의 수입니다. |
| `session.initial_view.url` | string | 세션의 초기 보기 URL입니다. |
| `session.initial_view.name` | string | 세션의 초기 보기 이름입니다. |
| `session.last_view.url` | string | 세션의 마지막 보기 URL입니다. |
| `session.last_view.name` | string | 세션의 마지막 보기 이름입니다. |
| `session.ip` | string | 세션의 IP 주소입니다. 이 속성의 수집을 중지하려면 [애플리케이션 관리][2]에서 설정을 변경하세요. |
| `session.useragent` | string | 장치 유형 및 버전을 결정하는 데 사용되는 브라우저 또는 기기 식별자입니다. |
| `session.has_replay` | 불리언 | 세션에 Session Replay 녹화가 첨부되어 있는지 여부를 나타냅니다. |

### 보기 속성 {#view-attributes}

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `view.id` | string | 보기의 고유 ID입니다. |
| `view.url` | string | 이벤트에 해당하는 페이지의 URL 또는 화면의 표준 이름입니다. |
| `view.name` | string | 사용자 지정 가능한 보기의 이름입니다. |
| `view.is_active` | 불리언 | 보기가 활성 상태인지 여부를 나타냅니다. |
| `view.time_spent` | number (nanoseconds) | 이 보기에 소요된 시간입니다. |
| `view.action.count` | number | 이 보기에 대해 수집된 모든 액션의 수입니다. |
| `view.loading_time` | number(nanoseconds) | 보기가 준비되고 네트워크 요청이나 DOM 변경이 더 이상 발생하지 않는 시점까지 걸리는 시간입니다. |
| `view.interaction_to_next_view_time` | number(nanoseconds) | 이전 보기에서의 마지막 사용자 상호작용과 이 보기의 시작 사이의 시간입니다. |

#### UTM 속성 {#utm-attributes}

**참고:** UTM 속성은 브라우저 애플리케이션에서만 사용할 수 있습니다.

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `view.url_query.utm_source` | string | 트래픽의 소스를 추적하는 URL의 파라미터입니다. |
| `view.url_query.utm_medium` | string | 트래픽 유입 채널을 추적하는 URL의 파라미터입니다. |
| `view.url_query.utm_campaign` | string | 해당 보기에 연결된 특정 마케팅 캠페인을 식별하는 URL의 파라미터입니다. |
| `view.url_query.utm_content` | string | 마케팅 캠페인 내에서 사용자가 클릭한 특정 요소를 식별하는 URL의 파라미터입니다. |
| `view.url_query.utm_term` | string | 사용자가 지정된 캠페인을 트리거하기 위해 검색한 키워드를 추적하는 URL의 파라미터입니다. |

### 액션 속성 {#action-attributes}

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `action.id` | string | 사용자 액션의 고유 ID입니다. |
| `action.type` | string | 사용자 액션의 유형입니다(예: `click`, `tap` 또는 `application_start`). |
| `action.name` | string | 사용자 액션의 이름입니다(예: `Click on #checkout`). |
| `action.target.name` | string | 사용자가 상호작용한 요소입니다. 자동으로 수집된 사용자 액션에만 사용할 수 있습니다. |
| `action.loading_time` | number (nanoseconds) | 액션의 로딩 시간입니다. |

### 불만 신호 {#frustration-signals}

**참고:** 불만 신호는 브라우저 애플리케이션에서만 사용할 수 있습니다.

#### 측정값 {#measurements}

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `session.frustration.count` | number | 한 세션과 연관된 모든 불만 신호의 수입니다. |
| `view.frustration.count` | number | 한 보기와 연관된 모든 불만 신호의 수입니다. |

#### 속성 {#attributes}

| 속성 | 유형 | 설명 |
|-----------|------|-------------|
| `action.frustration.type:dead_click` | string | RUM Browser SDK에서 감지한 데드 클릭입니다. |
| `action.frustration.type:rage_click` | string | RUM Browser SDK에서 감지한 레이지 클릭입니다. |
| `action.frustration.type:error_click` | string | RUM Browser SDK에서 감지한 오류 클릭입니다. |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/product_analytics/guide/action_management/
[2]: https://app.datadoghq.com/rum/list
[3]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/#user-session
[4]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/#track-unauthenticated-users