---
app_id: postman
app_uuid: 9ba70e31-8e84-4d6b-84a1-95d6ba713df9
assets:
  dashboards:
    Postman API Dashboard: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: postman.monitor.run.total_latency
      metadata_path: metadata.csv
      prefix: postman
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10162
    source_type_name: Postman
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Postman
  sales_email: integrations-partnerships@postman.com
  support_email: integrations-partnerships@postman.com
categories: []
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/postman/README.md
display_on_public_website: true
draft: false
git_integration_title: postman
integration_id: postman
integration_title: Postman
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: postman
public_title: Postman
short_description: Postman모니터링 실행에서 메트릭을 분석하고 이벤트를 생성합니다.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 제공::통합
  configuration: README.md#Setup
  description: Postman모니터링 실행에서 메트릭을 분석하고 이벤트를 생성합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Postman
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Postman][1]은 API를 구축하는 단계를 간소화하고 협력을 편리하게 만들어, 더 나은 API를 빠르게 생성할 수 있습니다.

이 통합은 모니터 상태를 면밀히 관측할 수 있도록 도와줍니다. 이 통합으로 다음을 할 수 있습니다.

- Datadog에서 Postman 모니터링 실행의 메트릭 분석

- 성공 및 실패한 모니터링 실행의 이벤트 생성

## 설정

[Postman 설명서][2]에서 상세 지침을 확인할 수 있습니다. Postman 통합에는 Postman [팀, 비즈니스, 엔터프라이즈 플랜][3]이 필요합니다.

### 구성

1. Datadog [API 키][4]를 생성합니다.
2. Postman 계정으로 로그인하고 [Datadog 통합][5]으로 이동합니다.
3. "Add Integration"을 선택합니다.
4. Datadog에 모니터 메트릭과 이벤트 전송하는 방법:
   - 새 통합의 이름을 지정합니다.
   - Datadog로 전송하고 싶은 데이터가 있는 모니터를 선택합니다.
   - Datadog API 키를 입력합니다.
   - 사용하고 싶은 Datadog 리전을 선택합니다.
   - (선택 사항) 각 실행에 이벤트, 메트릭, 또는 둘 다를 전송할지 선택합니다.
5. "Add Integration"을 선택하여 통합 설정을 완료합니다.

![통합 구성][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "postman" >}}


### 서비스 점검

Postman은 서비스 점검을 포함하지 않습니다.

### 이벤트

Postman에서 모니터가 실행될 때마다 이벤트가 생성됩니다. 이벤트의 심각도는 Postman 모니터의 테스트를 기반으로 결정됩니다.

| 심각도 | 설명                                                           |
|----------|-----------------------------------------------------------------------|
| `Low`    | 모든 테스트가 패스일 경우                                                 |
| `Normal` | 일부 테스트가 실패했거나 이벤트 중에 오류가 발생한 경우 |

## 트러블슈팅

도움이 필요하신가요? [Postman 지원팀][8]에 문의하세요.

[1]: https://www.postman.com/
[2]: https://learning.postman.com/docs/integrations/available-integrations/datadog/
[3]: https://www.postman.com/pricing/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://go.postman.co/integrations/service/datadog
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/postman/images/add-integration-datadog.jpeg
[7]: https://github.com/DataDog/integrations-extras/blob/master/postman/metadata.csv
[8]: https://www.postman.com/support/