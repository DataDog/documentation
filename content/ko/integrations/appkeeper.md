---
app_id: appkeeper
app_uuid: fc54f5f2-0ce1-4d4e-b1e0-191eece029d3
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: AppKeeper.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10130
    source_type_name: AppKeeper
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: SIOS AppKeeper
  sales_email: rd-pd-1@sios.com
  support_email: rd-pd-1@sios.com
categories:
- aws
- cloud
- 알림
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/appkeeper/README.md
display_on_public_website: true
draft: false
git_integration_title: appkeeper
integration_id: appkeeper
integration_title: AppKeeper
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: appkeeper
public_title: AppKeeper
short_description: 'Datadog 알림에 따른 Appkeeper의 서비스 재시작 '
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Datadog 알림에 따른 Appkeeper의 서비스 재시작
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AppKeeper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

SIOS AppKeeper에서는 Datadog로부터 알림을 받으면 자동으로 실패한 Amazon EC2 서비스를 재시작하기 때문에 비싸고 불편한 수동 작업을 할 필요가 없습니다. Datadog에서 알림을 보내면 AppKeeper Recovery API를 이용해 EC2 서비스를 재시작합니다.

## 설정

### SIOS AppKeeper API 키 얻기

AppKeeper GUI에서 SIOS AppKeeper API 키를 얻으세요.

1. **Account Information**을 클릭하고 모달 대화 상자를 여세요.
2. **Get Token**을 클릭하세요.
3. 토큰을 복사하세요.

![snapshot][1]

### Webhooks 통합 설치 및 구성하기

1. Datadog 사이트에서 [Webhooks 통합][2]으로 이동하고 통합을 설치하세요.
2. **Configuration** 탭을 선택하세요.
3. **Webhooks** 헤더 아래에서 **New**를 클릭하세요.
4. URL "https://api.appkeeper.sios.com/v2/integration/{AWS_account_ID}/actions/recover"를 입력하세요.
5. **Payload** 섹션에서 `id`와 모니터링 인스턴스 이름 `name`을 입력하세요.
3. **Custom Headers** 섹션에서 AppKeeper API 토큰을 등록하세요.

![snapshot][3]

### Datadog 모니터링과 통합

1. 새 Datadog [신서틱 테스트][4]를 생성하세요. 우측 상단에 있는 **New Test**를 클릭하세요.
2. **Define requests** 단계에서 모니터링이 필요한 URL을 입력하세요.
3. **Define assertions** 단계에서 **New Assertion**을 클릭하고 다음 파라미터를 "When `status code` is 200"로 추가하세요. 그러면 상태 코드가 200이 **아닐** 경우에 알림을 트리거합니다. 요청에 다른 상태에 기반한 알림이 필요할 경우에는 200을 내게 맞는 상태 코드로 변경하세요.
4. **New Assertion**을 다시 클릭하고 두 번째 파라미터인 "And `response time` is less than `2000` ms"를 입력합니다. 그러면 응답 시간이 2000ms보다 길 경우에 알림을 트리거합니다. 이보다 길거나 적은 시간을 지정하고 싶을 경우에는 `2000`을 내게 맞는 시간으로 변경하세요.
5. **Notify your team** 단계에서 `@webhook-name_of_the_webhook` 형식으로 웹훅을 추가합니다. 알림 메시지를 포함하세요. **참고**: 이 단계에서 **renotify if the monitor has not been resolved** 설정의 최소 모니터링 간격은 `Every 10 Minutes`입니다. **Never**로 설정하면 웹훅에서 AppKeeper의 복구 API를 호출하지 않습니다.

![snapshot][5]

AppKeeper의 복구 결과는 AppKeeper GUI에 표시됩니다.

![snapshot][6]

자세한 내용은 [AppKeeper 통합 문서][7]를 참고하세요.

## 수집한 데이터

### 메트릭

이 통합에서 제공하는 메트릭 목록을 보려면 [metadata.csv][8]를 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/get_token.jpg
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/payload_header.jpg
[4]: https://app.datadoghq.com/synthetics/list
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test_params.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/history.jpg
[7]: https://sioscoati.zendesk.com/hc/en-us/articles/900000978443-Integration
[8]: https://github.com/DataDog/integrations-extras/blob/master/appkeeper/metadata.csv
[9]: https://docs.datadoghq.com/ko/help/