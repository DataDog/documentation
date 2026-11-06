---
aliases:
- /ko/service_management/incident_management/zoom_integration/
- /ko/incident_response/incident_management/zoom_integration
description: Zoom을 Datadog에 연결해 팀이 협업할 수 있도록 지원하세요.
title: Zoom과 Datadog Incident Management 통합하기
---
## 개요 {#overview}

Zoom 및 Datadog을 연결하여 빠르게 Zoom 회의를 생성하여 활성 인시던트에 대해 팀과 협력하세요.

## 설정 {#setup}

### 설치 {#installation}

Zoom 앱용 Datadog을 설치하려면,

1. Datadog에서 [**Incidents Settings**][3] 페이지를 찾습니다.
2. **Integrations**로 이동하여 **Automatically create a meeting in Zoom for every incident** 토글을 활성화합니다. 이 설정을 사용하면 **Add Video Call** 버튼이 **Start Zoom Call** 버튼으로 대체되어 Datadog 인시던트 개요 페이지에서 클릭 한 번으로 Zoom 회의를 생성할 수 있습니다.
3. **Start Zoom Call** 버튼을 클릭하면 Datadog Zoom 앱을 추가하라는 메시지가 표시됩니다. Zoom을 대신하여 정보를 조회하고 관리할 수 있도록 허용하세요.

## 사용 방법 {#usage}

앱이 설치되면 인시던트에서 **Start Zoom Call** 버튼을 클릭해 새로운 Zoom 회의를 생성하여 자동으로 인시던트에 연결할 수 있습니다.

## 권한 {#permissions}

Datadog for Zoom에는 다음 OAuth 범위가 필요합니다. 자세한 내용은 [Zoom OAuth 범위 문서][2]를 참조하세요.

### 사용자 수준 범위 {#user-level-scopes}

| 범위                   | 요청 사유                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `meeting:write`          | 사용자가 Incident Management 제품에서 **Start Zoom Call**을 클릭하면 회의를 생성합니다.                         |

## 앱 제거 {#removing-the-app}
Zoom용 Datadog 앱을 제거하려면,

1. Zoom 계정에 로그인하여 Zoom 앱 Marketplace로 이동합니다.
2. **Manage** > **Added Apps**를 클릭하거나 **Datadog** 앱을 검색합니다.
3. **Datadog** 앱을 클릭합니다.
4. **Remove**를 클릭합니다.

## 문제 해결 {#troubleshooting}

도움이 필요하십니까? [Datadog 지원팀][1]에 문의하세요.

[1]: /ko/help/
[2]: https://developers.zoom.us/docs/integrations/oauth-scopes/
[3]: https://app.datadoghq.com/incidents/settings