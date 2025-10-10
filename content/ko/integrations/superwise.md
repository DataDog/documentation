---
app_id: superwise
app_uuid: 814d45d4-bf11-46c9-98a2-5fab9c997c94
assets:
  dashboards:
    Superwise: assets/dashboards/superwise.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: superwise.metric.overall.quantity
      metadata_path: metadata.csv
      prefix: superwise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10246
    source_type_name: Superwise
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Superwise
  sales_email: support@superwise.ai
  support_email: support@superwise.ai
categories:
- 인시던트
- ai/ml
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/superwise/README.md
display_on_public_website: true
draft: false
git_integration_title: superwise
integration_id: superwise
integration_title: Superwise
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: superwise
public_title: Superwise
short_description: 프로덕션 환경의 머신 러닝 모델을 위한 모델 통합 가시성 플랫폼
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::AI/ML
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: 프로덕션 환경의 머신 러닝 모델을 위한 모델 통합 가시성 플랫폼
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
  support: README.md#Support
  title: Superwise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
[Superwise][1]는 대규모 머신 러닝(ML) 작업을 위한 모델 통합 가시성을 제공합니다.
Superwise의 모델 통합 가시성은 모델 행동에 대한 가시성과 컨텍스트를 제공하므로 다양한 사용 사례에 따라 모니터 모델 위험을 쉽게 파악할 수 있습니다. Superwise를 사용하면 데이터 과학자, ML 엔지니어, 비즈니스 운영팀이 알림 피로 없이 모델 통합 가시성을 확보할 수 있으므로 자신감 있게 모델을 관리할 수 있습니다.

![Superwise 대시보드][2]

Superwise의 모델 메트릭 및 인시던트 통합은 드리프트, 활동, 인시던트, 사용자 지정 메트릭을 포함한 기본 제공 모델 메트릭을 Datadog로 직접 전송합니다. 어떤 모델이 예상 결과를 예측하지 못하는지, 어떤 용도로 구성할 수 있는지 케이스, 논리, 세분화, 임계값 및 감도에 대한 개요를 확인할 수 있습니다.

Superwise에서 구성된 Datadog 통합을 사용하면 표준 모델 메트릭이 Datadog로 전송되고 사용자는 Datadog에서 모델 통합 가시성 대시보드를 볼 수 있습니다. 특정 모델 메트릭과 인시던트 정책을 구성하고 Datadog로 전송하여 사용량에 맞는 모델 통합 가시성 사례을 얻을 수 있습니다.

## 설정

1. [Superwise 포털][3]로 이동하여 **Integrations**을 선택합니다.

2. **Create a new channel**을 클릭한 다음 **Datadog**를 선택합니다.

    ![Superwise - 새로운 통합 추가][4]

3. Datadog API와 애플리케이션 키를 입력하고 **Test**를 클릭합니다. 테스트 요청이 Datadog 계정으로 전송되어 연동을 확인합니다. 요청이 성공적으로 전송되면 Superwise에 테스트 메시지가 성공적으로 전달되었다는 메시지가 표시됩니다. 설정을 완료하려면 **Create channel**을 클릭합니다.

    ![Superwise - 새로운 Datadog 채널 추가][5]

4. 설정이 완료되면 새로운 Datadog 통합 위젯을 사용할 수 있습니다.

    ![Superwise 통합][6]

### 검증
Datadog에서 **메트릭 탐색기**로 이동하여 `superwise.integration.test` 메트릭을 검색하여 Superwise와 Datadog 간의 통합이 작동하는지 확인합니다.

![Datadog의 superwise.integration.test 그래프][7]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "superwise" >}}


### 이벤트

Superwise 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Superwise 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Superwise 설명서][9]를 참조하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace의 Superwise 제공 내역을 통해 모델 성능을 모니터링하세요.][10]

[1]: https://www.superwise.ai/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/5.png
[3]: https://portal.superwise.ai/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/2.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/6.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/3.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/4.png
[8]: https://github.com/DataDog/integrations-extras/blob/master/superwise/metadata.csv
[9]: https://docs.superwise.ai
[10]: https://www.datadoghq.com/blog/superwise-datadog-marketplace/