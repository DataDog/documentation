---
app_id: ngrok
categories:
- 개발 툴
- cloud
custom_kind: integration
description: ngrok HTTP 이벤트로 유용한 애플리케이션 인사이트 시각화
further_reading:
- link: https://ngrok.com/solutions
  tag: 기타
  text: og:title
integration_version: 1.0.0
media:
- caption: ngrok HTTP 요청 이벤트 개요 대시보드
  image_url: images/dashboard.png
  media_type: image
- caption: ngrok 서비스 플랫폼
  image_url: images/diag1.png
  media_type: image
- caption: ngrok + datadog
  image_url: images/diag2.png
  media_type: image
supported_os:
- 리눅스
- windows
- macos
title: ngrok
---
## 개요

ngrok은 글로벌 접속 지점을 사용하여 모든 클라우드, 개인 네트워크, 개인 장치에서 애플리케이션에 즉시 접근할 수 있도록 도와주며 인증, 로드 밸런싱, 그 외 중요한 제어 기능을 제공합니다.

The ngrok platform includes a Datadog event destination integration. With ngrok HTTP events, you can visualize valuable application insights using Datadog Log Management including HTTP status code breakdown, top client IPs and most requested resources. You can use the Datadog HTTPS logging endpoint to set up the integration on the [ngrok dashboard UI](https://dashboard.ngrok.com).

## 설정

ngrok 이벤트를 Datadog으로 전달하려면 두 가지를 구성해야 합니다.

- ngrok Event Subscription: 전달할 이벤트를 포함함
- ngrok Event Destination: Event Subscription에 정의된 이벤트가 전달되는 위치 구성

The following example demonstrates how to configure an Event Subscription with a Datadog Event Destination for HTTP request events. For step-by-step instructions, see the [ngrok Datadog Event Destination documentation](https://ngrok.com/docs/integrations/datadog/event-destination/).

**1단계: ngrok Event Subscription 생성**

1. ngrok Dashboard Console에서 Events 페이지로 이동합니다.
1. "New Subscription"을 선택합니다.
1. Subscription에 Description을 입력한 후 "Add Source"를 선택합니다.
1. 목록에서 "http_request_complete.v0"을 선택한 후 Add Event Source를 선택합니다.

**2단계: Event Destination 속성 구성**

다음 단계는 이전에 생성한 Event Subscription 구성 내에서 이뤄집니다.

1. "Event Destination" 탭으로 이동하여 "Add Destination"을 선택합니다.
1. 드롭다운 메뉴에서 Datadog을 선택하고 올바른 정보를 입력합니다.
   a. Select the correct [Datadog site](https://docs.datadoghq.com/getting_started/site/) for your data.\
   b. Navigate to Datadog and [create an API key](https://docs.datadoghq.com/account_management/api-app-keys/) within the organization settings.\
   c. Copy the API key and paste into the API Key field.\
   d. Optionally, define a Service Name, this be added as a key to the event data as **service:value**.\
   e. Optionally, define DD Tags, these are `key:value` pairs to be added as Datadog tags to the event data.\
   f. Optional, define a description, this is locally significant and helps identify the Datadog Event Destination.
1. "Send Test Event"를 선택합니다.
1. 성공 메시지가 표시되면 "Done"을 선택합니다. 오류가 표시되면 Datadog 사이트와 API 키가 올바른지 확인하세요.

**Step 3: Create Datadog Log Facets**
Once logs begin to arrive, create [log facets](https://docs.datadoghq.com/logs/explorer/facets/) for data analysis and dashboard visualization. For more information about creating log facets, see the [Log Facets documentation](https://docs.datadoghq.com/logs/explorer/facets/#create-facets).

다음 필드에 패싯을 만듭니다.

- event_type
- object.conn.server_name
- object.conn.client_ip
- object.http.response.status_code
- object.http.request.method
- object.http.request.url.path

## 트러블슈팅

Need help? Contact [ngrok Support](mailto:support@ngrok.com) or reference the [ngrok documentation](https://ngrok.com/docs/integrations/datadog/).

## 참고 자료

Learn more about [ngrok](https://ngrok.com/solutions).