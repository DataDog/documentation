---
app_id: apptrail
app_uuid: 302b6db7-d1d6-445c-ae20-00743775cb6b
assets: {}
author:
  homepage: https://apptrail.com
  name: Apptrail
  sales_email: sales@apptrail.com
  support_email: support@apptrail.com
categories:
- 로그 수집
- 보안
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apptrail/README.md
display_on_public_website: true
draft: false
git_integration_title: apptrail
integration_id: apptrail
integration_title: Apptrail
integration_version: ''
is_public: true
kind: 통합
manifest_version: 2.0.0
name: apptrail
public_title: Apptrail
short_description: Apptrail을 사용해 SaaS 감사 로그 전체를 모니터링 및 분석하고 알림 생성하기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Apptrail을 사용해 SaaS 감사 로그 전체를 모니터링 및 분석하고 알림 생성하기
  media:
  - caption: Apptrail에서는 SaaS 공급업체를 대신해 감사 로그 포털을 호스팅합니다. 고객은 이 포털에서 감사 로그를 확인하고,
      검색하며, 구성하고, 내보내기 할 수 있습니다.
    image_url: images/1-at-portal.png
    media_type: image
  - caption: Apptrail Portal에서 감사 이벤트 내역을 확인하고 시간 및 이벤트 속성별로 검색 및 필터링할 수 있습니다.
    image_url: images/2-at-events-history.png
    media_type: image
  - caption: Apptrail 감사 이벤트에는 누가, 언제, 어디서, 무엇을, 어떻게 활동했는지에 관한 상세 정보가 포함되어 있습니다. 또
      IP 주소와 커스텀 이벤트 데이터와 같은 컨텍스트 정보도 포함되어 있습니다.
    image_url: images/3-at-log-detail.png
    media_type: image
  - caption: 감사 로그를 Datadog와 같은 여러 대상으로 연속적으로 스트리밍하여 실시간으로 아카이빙, 모니터링, 분석할 수 있습니다.
    image_url: images/4-at-create-trail-sel.png
    media_type: image
  - caption: 트레일 규칙을 사용해 이벤트의 하위 집합을 필터링 및 선택하여 트레일에서 전달할 수 있습니다.
    image_url: images/5-at-trail-detail.png
    media_type: image
  - caption: Apptrail 감사 로그가 Datadog Logs로 실시간으로 내보내기되며, Datadog Logs에서 감사 로그를 분석,
      쿼리, 모니터링할 수 있습니다.
    image_url: images/6-datadog-preview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Apptrail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Apptrail][1]은 종합 SaaS 감사 로그 플랫폼입니다. SaaS 기업에서는 Apptrail을 사용해 고객 대면 전체 감사 로그를 추가합니다. 이에 따라 고객은 Apptrail을 사용해 SaaS 공급업체의 감사 로그를 모두 보고, 쿼리하고, 분석하고, 내보내기할 수 있습니다.

Apptrail의 감사 이벤트 스트리밍 기능([_트레일_][2])은 십 여개의 여러 주요 대상에 감사 로그를 보낼 수 있도록 도와줍니다.

Apptrail Datadog 통합을 사용하면 SaaS 감사 로그를 Apptrail에서 Datadog로 실시간 연속 내보내기를 할 수 있습니다. Datadog에서 SaaS 감사 로그를 분석, 아카이브, 모니터링하고 알림도 설정할 수 있습니다.

## 설정

먼저 SaaS 공급업체가 Apptrail에 가입해야 합니다.

시작하려면 Apptrail Portal에 전송 트레일을 생성하고 구성 대상으로 Datadog를 선택하세요.

### 단계

트레일 생성과 관련한 설명서를 보려면 [트레일 생성][3] 설명서를 참고하세요.

1. Apptrail Portal에서 [**Trails**][4] 페이지로 이동합니다.
2. 우측 상단에 있는 **새 트레일 생성** 버튼을 클릭합니다.
3. **Trail name**을 입력하고 **rules**를 구성합니다.
4. 다음을 클릭하고 대상 목록에서 **Datadog**를 선택하세요.
5. 사용할 [Datadog **Region/Site**][5]를 제공하세요. 예를 들어 app.datadoghq.eu의 경우 `EU`를, app.datadoghq.com의 경우 `US1`를 선택합니다.
6. [Datadog API 키][6]를 입력하세요.
7. **Create trail**을 클릭해 트레일을 생성하세요.

### 검증

Datadog에서 Apptrail 감사를 보는 방법:

1. **Logs** > **Live Trail**로 이동합니다.
2. `source:apptrail`을 설정해 Apptrail 감사 로그를 확인합니다.

자세한 정보는 [Apptrail Datadog 전송 설명서][7]를 참고하세요.

## 수집한 데이터

### 로그 수집

Datadog가 대상으로 지정된 Apptrail [트레일][2]의 경우 [트레일 규칙][8]에 구성된 것과 일치하는 모든 로그를 연속적으로 대상인 Datadog로 전송합니다. Apptrail 감사 로그 형식과 관련한 내용은 [이벤트 형식][9]을 참고하세요.

## 지원

도움이 필요하시나요? [Datadog 지원팀][10]에 문의하거나 [Apptrail 지원팀][11]에 문의하세요.

## 참고 자료

- [Apptrail 커스텀 설명서][12]
- [Apptrail Datadog Log 전송 설명서][7]
- [Apptrail 감사 로그 형식][9]
- [Apptrail 이벤트 전송 트레일][2]

[1]: https://apptrail.com
[2]: https://apptrail.com/docs/consumers/guide/event-delivery/#trails
[3]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#creating-a-trail
[4]: https://portal.apptrail.com/trails
[5]: https://docs.datadoghq.com/ko/getting_started/site/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://apptrail.com/docs/consumers/guide/event-delivery/integrations/datadog
[8]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#selecting-events-using-trail-rules
[9]: https://apptrail.com/docs/consumers/guide/event-format
[10]: https://docs.datadoghq.com/ko/help/
[11]: mailto:support@apptrail.com
[12]: https://apptrail.com/docs/consumers/guide