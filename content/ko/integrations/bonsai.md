---
app_id: bonsai
app_uuid: ec3141f4-b722-4eaa-be49-47c6eec76da9
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: bonsai.req.total
      metadata_path: metadata.csv
      prefix: bonsai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10053
    source_type_name: Bonsai
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Bonsai
  sales_email: dev@onemorecloud.com
  support_email: dev@onemorecloud.com
categories:
- 메트릭
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bonsai/README.md
display_on_public_website: true
draft: false
git_integration_title: bonsai
integration_id: bonsai
integration_title: Bonsai
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: bonsai
public_title: Bonsai
short_description: Bonsai Managed Elasticsearch
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Metrics
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Bonsai Managed Elasticsearch
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Bonsai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Bonsai 클러스터의 요청 수준 메트릭을 추적하면 다음을 할 수 있습니다.

- 클러스터의 성능 가시화
- 검색 성능과 애플리케이션 성능 간의 상관 관계 수립
- 알림 생성

![snapshot][1]

## 설정

클러스터를 Datadog와 통합하려면 Bonsai 앱에 API 키를 제공해야 합니다.

### API 키 얻기

Datadog에서 [Integration --> API][2]로 이동해 API 키를 복사하세요.

![snapshot][3]

### API 키 제공

[Bonsai --> Clusters][4]로 이동해 통합하고 싶은 클러스터를 클릭하세요. Manage 탭으로 이동하여 페이지 하단까지 스크롤하세요.

"Datadog Integration" 섹션 아래에 API 키를 붙여 넣고 "Activate Datadog"를 클릭하세요.

![snapshot][5]

### 확인

키가 유효하면 통합이 활성화됩니다.

![snapshot][6]

몇 분 후 Datadog 대시보드에서 메트릭을 사용할 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "bonsai" >}}


메트릭은 클러스터별로 태그되어 있어 클러스터 기반으로 세그먼트화할 수 있습니다. 다음 태그 예시를 참고하세요.

```text
cluster:my-cluster-slug
```

### 이벤트

Bonsai 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Bonsai 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png
[4]: https://app.bonsai.io/clusters
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png
[7]: https://github.com/DataDog/integrations-extras/blob/master/bonsai/metadata.csv
[8]: https://docs.datadoghq.com/ko/help/