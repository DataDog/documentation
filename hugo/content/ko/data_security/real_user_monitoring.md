---
aliases:
- /ko/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 제출된 주요 데이터 카테고리 검토
- link: /data_security/synthetics/
  tag: 설명서
  text: Synthetic Monitoring 데이터 보안
- link: /session_replay/privacy_options?platform=browser
  tag: 설명서
  text: Session Replay 개인정보 보호 옵션
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: 블로그
  text: Session Replay 기본 개인정보 보호 설정으로 사용자 데이터 난독화
title: Real User Monitoring 데이터 보안
---
<div class="alert alert-info">이 페이지는 Datadog으로 전송되는 데이터의 보안을 설명합니다. 클라우드 및 애플리케이션 보안 제품과 기능을 찾고 있다면 <a href="/security/" target="_blank">보안</a> 섹션을 참조하세요.</div>

## 개요 {#overview}
Real User Monitoring(RUM)은 개인정보 보호 요구 사항을 구현하고 모든 규모의 조직에서 민감한 정보나 개인정보가 노출되지 않도록 보장하는 제어 기능을 제공합니다. 데이터는 Datadog이 관리하는 클라우드 인스턴스에 저장되며 저장 시 암호화됩니다. 이 페이지에 설명된 기본 동작 및 구성 가능한 옵션은 최종 사용자의 개인정보를 보호하고 민감한 조직 정보가 수집되지 않도록 설계되었습니다. [Datadog의 개인정보 보호][1]에 대해 자세히 알아보세요.

## 책임 공유{#shared-responsibility}

사용자 데이터를 안전하게 유지하는 책임은 Datadog과 RUM SDK를 활용하는 개발자가 함께 부담합니다.

Datadog의 책임은 다음과 같습니다.

- Datadog 플랫폼으로 전송 및 저장되는 데이터를 안전하게 처리하는 신뢰할 수 있는 제품 제공.
- 내부 정책에 따른 보안 문제 식별

개발자의 책임은 다음과 같습니다.
- Datadog에서 제공하는 구성 값과 데이터 개인정보 보호 옵션 활용
- 자체 환경 내 코드 무결성 보장

## 규정 준수 프레임워크 {#compliance-frameworks}
RUM은 다음을 비롯한 다양한 표준 및 규제 프레임워크를 준수하도록 구성할 수 있습니다.

- GDPR
- HIPAA
- ISO
- CCPA/CPRA

## 개인정보 보호 제한 사항{#privacy-restrictions}
기본적으로 규제 및 표준 프레임워크를 준수하기 위해 사용자 데이터를 보호하는 몇 가지 개인정보 보호 제한 사항이 적용됩니다.

### 브라우저 RUM의 쿠키 사용 {#browser-rum-use-of-cookies}
브라우저 RUM이 데이터를 수집하려면 최종 사용자의 브라우저에서 퍼스트 파티 쿠키가 활성화되어 있어야 합니다. 서비스를 운영하는 관할 구역에서 요구하는 경우, RUM이 초기화되기 전에 쿠키 수집에 대한 동의를 받는 것을 포함하여 해당 관할 구역의 법률을 준수하도록 페이지를 구성해야 합니다.

### 모바일 RUM 동의 관리 {#mobile-rum-consent-management}
모바일 RUM 추적은 사용자가 동의한 경우에만 실행됩니다. 최종 사용자가 RUM 추적에 동의하면 Datadog은 해당 사용자의 활동과 세션 경험을 추적합니다. 최종 사용자가 RUM 추적을 거부하면 Datadog은 해당 사용자의 활동과 세션 경험을 추적하지 않습니다.

## 개인정보 보호 옵션 {#privacy-options}
RUM에서 캡처한 데이터를 수집하고 비식별화할 수 있는 여러 옵션과 도구가 제공됩니다.

### 클라이언트 토큰 {#client-token}
브라우저 RUM [클라이언트 토큰][2]은 최종 사용자의 브라우저에서 수집한 데이터를 Datadog의 특정 RUM 애플리케이션에 연결하는 데 사용됩니다. 클라이언트 토큰은 암호화되지 않으며 애플리케이션의 클라이언트 측에서 볼 수 있습니다.

클라이언트 토큰은 Datadog으로 데이터를 전송하는 데만 사용되므로 이 토큰으로 인한 데이터 손실 위험은 없지만, Datadog은 기타 오용을 방지하기 위해 다음과 같이 적절하게 클라이언트 토큰을 관리할 것을 권장합니다.

- 애플리케이션에서만 사용되도록 [클라이언트 토큰을 정기적으로 교체][3]
- RUM 데이터를 캡처할 때 [봇을 자동으로 필터링][4]

#### 인증된 프록시 {#authenticated-proxy}
클라이언트 토큰을 사용하여 봇을 필터링하는 한 가지 방법은 인증된 프록시를 사용하는 것입니다. 이 방법에서는 Datadog RUM 브라우저 SDK를 초기화할 때 `clientToken` 대신 플레이스홀더 문자열을 사용합니다. 프록시는 실제 클라이언트 토큰을 알고 있지만 최종 사용자는 알 수 없습니다.

프록시는 세션 데이터를 Datadog으로 전달하기 전에 유효한 사용자 정보를 검사하도록 구성되어 있으며, 이를 통해 실제 사용자가 로그인하여 모니터링할 트래픽을 전송하고 있음을 확인합니다. 트래픽을 수신할 때 프록시는 데이터에 플레이스홀더 문자열이 포함되어 있는지 검사하고 이를 실제 `clientToken`으로 대체한 후 Datadog으로 데이터를 전달합니다.

### 이벤트 추적 {#event-tracking}
[이벤트][5]는 사이트나 앱의 특정 요소와 사용자가 상호 작용하는 것을 의미합니다. 이벤트는 SDK를 통해 자동으로 캡처하거나 사용자 지정 액션을 통해 전송할 수 있습니다. 사용자 상호 작용 및 페이지 뷰의 자동 추적을 해제하여 원하는 상호 작용만 캡처할 수 있습니다. 기본적으로 RUM은 SDK가 자동으로 수집한 액션의 대상 콘텐츠를 사용하여 액션 이름을 생성합니다. 원하는 이름으로 이 동작을 [명시적으로 재정의][6]할 수 있습니다.

당사가 자동으로 추적하는 데이터는 주로 기술 정보이며, 이 중 상당수는 개인 식별 정보를 포함하지 않습니다. RUM에 의해 캡처된 데이터는 다음 방법의 고급 구성 옵션을 통해 Datadog으로 전송 및 저장되기 전에 추가로 비식별화할 수 있습니다.

- [beforeSend API][7]
- [iOS][8]
- [Android][9]
- [Flutter][10]
- [React Native][11]

### 프록시 서버를 통해 RUM 이벤트 전송 {#transmit-rum-events-through-a-proxy-server}
최종 사용자 기기가 Datadog과 직접 통신하지 않도록 모든 RUM 이벤트를 자체 [프록시 서버][12]를 통해 전송할 수 있습니다.

### 사용자 ID 추적 {#user-identity-tracking}
기본적으로 **사용자 ID 추적은 이루어지지 않습니다**. 각 세션에는 고유한 `session.id`가 연결되어 있어 데이터를 익명화하면서도 추세를 파악할 수 있습니다. 이름 및 이메일 주소와 같은 [사용자 데이터][13]를 캡처하는 코드를 작성한 다음 해당 데이터를 사용하여 RUM 세션을 [보강 및 수정][13]할 수 있는 옵션이 있지만, 이는 필수 사항이 아닙니다.

### 데이터 보존 {#data-retention}
이벤트 캡처를 구성한 후에는 이벤트가 Datadog에 저장됩니다. 캡처된 이벤트와 속성을 Datadog에 보관할 기간을 지정할 수 있습니다.

프로덕션 환경의 기본 데이터 보존 기간은 다음과 같습니다.

- 세션, 조회, 액션, 오류 및 세션 기록: 30일
- 리소스 및 장기 작업: 15일

더 오랜 기간 동안 사용자 행동을 분석하기 위해 데이터 보존 기간을 연장하려면(세션, 조회 및 액션만 해당), [Product Analytics 가입][20]을 요청할 수 있습니다.

#### 역할 기반 액세스 제어 {#role-based-access-control}
Datadog은 캡처된 RUM 데이터를 볼 수 있는 사용자를 관리하기 위한 역할 기반 액세스 제어(RBAC)를 제공합니다. 기본 데이터 액세스 설정은 사용자에게 부여된 역할에 따라 달라집니다. 사용 가능한 Datadog 역할에는 관리자(Administrator), 표준(Standard), 읽기 전용(Read Only) 역할의 세 가지 유형이 있습니다. 보다 세분화된 RUM 관련 권한은 [Datadog 역할 권한][15]에 정의되어 있습니다. 예를 들어, Session Replays를 조회할 수 있는 액세스 권한을 부여하거나 취소할 수 있습니다.

### 데이터 삭제 {#data-deletion}
Datadog에 저장된 데이터를 삭제해야 하는 경우(예: 민감할 수 있는 데이터가 RUM 이벤트에 유출된 경우), 지정된 기간 내의 데이터를 영구 삭제할 수 있습니다. 영구 삭제를 수행하면 **모든** 데이터가 삭제되며, 특정 애플리케이션만 대상으로 지정할 수 없습니다. 데이터를 삭제해야 하는 경우 [Datadog 지원 팀][14]에 문의하세요.

### 개인정보 및 민감한 데이터 제거 {#personal-and-sensitive-data-removal}
IP 주소 및 지리적 위치를 포함한 개인 식별 정보(PII)와 민감한 데이터를 제거할 수 있는 여러 옵션이 있습니다. 다음의 경우 RUM에 PII가 포함될 수 있습니다.

- 버튼의 액션 이름(예: "전체 신용카드 번호 조회")
- URL에 표시되는 이름
- 앱 개발자가 계측한 사용자 지정 추적 이벤트

#### 액션 이름 마스킹 {#mask-action-names}
기본적으로 모든 액션 이름을 마스킹하려면 `enablePrivacyForActionName` 옵션과 함께 `mask` 개인정보 보호 설정을 사용할 수 있습니다. 이 작업은 재정의되지 않은 모든 액션 이름을 자동으로 `Masked Element` 플레이스홀더로 대체합니다. 이 설정은 기존 [HTML 재정의 속성][16]과도 호환되도록 설계되었습니다.

#### 비정형 데이터 {#unstructured-data}
텍스트 상자에 입력된 개인의 이름과 같이 비정형 데이터에 의도치 않게 포함된 PII는 지정된 기간에 대한 데이터 삭제 요청을 통해서만 제거할 수 있습니다.

URL의 경우, PII를 제거하기 위해 페이지 뷰를 수동으로 추적하거나 beforeSend를 사용하여 URL 텍스트를 변경할 수 있습니다.

또한 최종 사용자 기기가 Datadog과 직접 통신하지 않도록 모든 RUM 이벤트를 자체(프록시) 서버를 통해 전송할 수 있습니다.

#### IP 주소 {#ip-address}
RUM 애플리케이션을 초기화한 후, {{< ui >}}User Data Collection{{< /ui >}} 탭에서 IP 또는 지리적 위치 데이터를 포함할지 여부를 선택할 수 있습니다:

{{< img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="RUM 애플리케이션 관리 페이지에서 지리적 위치 및 클라이언트 IP 데이터를 포함하거나 제외할 수 있습니다" style="width:100%;" >}}

IP 데이터 수집을 비활성화하면 변경 사항이 즉시 적용됩니다. 비활성화하기 전에 수집된 이벤트에서는 IP 데이터를 제거되지 않습니다. 이는 백엔드에서 수행되므로, Browser SDK는 여전히 데이터를 전송하지만 IP 주소는 Datadog 백엔드 파이프라인에 의해 제외되고 처리 시점에 제거됩니다.

#### 지리적 위치 {#geolocation}
클라이언트 IP를 제거하는 것 외에도, 향후 수집되는 모든 데이터에서 지리적 위치(국가, 도시, 군) 또는 GeoIP 수집을 비활성화할 수 있습니다. {{< ui >}}Collect geolocation data{{< /ui >}} 확인란의 선택을 취소하면 변경 사항이 즉시 적용됩니다. 비활성화하기 전에 수집된 이벤트에서는 해당 지리적 위치 데이터가 제거되지 않습니다. 데이터 제외는 백엔드 수준에서 수행되므로, Browser SDK는 여전히 데이터를 전송하지만 지리적 위치 데이터는 Datadog 백엔드 파이프라인에 의해 제외되고 처리 시점에 제거됩니다.

### Sensitive Data Scanner로 민감한 데이터 사전 검색 {#proactively-search-for-sensitive-data-with-sensitive-data-scanner}
[Sensitive Data Scanner][17]를 사용하면 Datadog에 수집되는 민감한 데이터를 사전에 검색하고 스크러빙할 수 있습니다. RUM 이벤트는 데이터가 Datadog 내에 저장되기 전에 스트림에서 스캔됩니다. 이 도구는 PII 데이터가 저장되기 전에 스크러빙, 해싱 또는 부분적으로 비식별화할 수 있는 기능을 갖추고 있습니다. 이 도구는 기본 제공되거나 고객이 개발한 패턴 일치 규칙을 적용하여 작동합니다. 이 기능을 활성화했다면 [{{< ui >}}Manage Sensitive Data{{< /ui >}} 페이지][18]에서 확인할 수 있습니다.

## Session Replay 전용 개인정보 보호 옵션{#session-replay-specific-privacy-options}
[Session Replay 전용 개인정보 보호 옵션][19]을 참조하세요. Session Replay의 마스킹은 영구적으로 적용됩니다. 마스킹된 값은 외부로 전송되지 않으며 나중에 마스킹을 해제할 수 없습니다. 이는 수집 시 일치하는 값을 난독화하지만 `Data Scanner Unmask` 권한이 있는 사용자가 원래 값을 조회할 수 있는 [Sensitive Data Scanner masking][21]과는 다릅니다.

### 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/privacy/
[2]: /ko/real_user_monitoring/application_monitoring/browser/setup/#configuration
[3]: /ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /ko/real_user_monitoring/guide/identify-bots-in-the-ui/#filter-out-bot-sessions-on-intake
[5]: /ko/real_user_monitoring/explorer/search/
[6]: /ko/real_user_monitoring/application_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[7]: /ko/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[8]: /ko/real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[9]: /ko/real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#modify-or-drop-rum-events
[10]: /ko/real_user_monitoring/application_monitoring/flutter/advanced_configuration/#modify-or-drop-rum-events
[11]: /ko/real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events
[12]: /ko/real_user_monitoring/guide/proxy-rum-data/?tab=npm
[13]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#user-session
[14]: /ko/help/
[15]: /ko/account_management/rbac/permissions/#real-user-monitoring
[16]: /ko/session_replay/privacy_options?platform=browser#override-an-html-element
[17]: /ko/security/sensitive_data_scanner/
[18]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[19]: /ko/session_replay/privacy_options?platform=browser
[20]: https://www.datadoghq.com/private-beta/product-analytics/
[21]: /ko/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action