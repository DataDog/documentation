---
app_id: apollo
app_uuid: b39f1239-b97f-4b3b-ab5a-7a888915eedd
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - apollo.operations.count
      - apollo.engine.operations.count
      metadata_path: metadata.csv
      prefix: apollo.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10014
    source_type_name: Apollo Engine
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Apollo
  sales_email: sachin@apollographql.com
  support_email: sachin@apollographql.com
categories:
- 캐싱
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apollo/README.md
display_on_public_website: true
draft: false
git_integration_title: apollo
integration_id: apollo
integration_title: Apollo
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: apollo
public_title: Apollo
short_description: GraphQL 인프라스트럭처 성능 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: GraphQL 인프라스트럭처 성능 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Apollo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Apollo Datadog 통합을 이용하면 Studio 성능 메트릭을 Datadog 계정으로 전송할 수 있습니다. Datadog에서 고급 함수 API를 지원하기 때문에 GraphQL 메트릭용 그래프와 알림을 생성할 수 있습니다.

![메트릭][1]

Studio에서는 다음 메트릭을 Datadog로 전송합니다.

- `apollo.operations.count` - 실행된 GraphQL 작동 수. 쿼리 수, 변이 수, 오류가 난 작동 수 포함.
- `apollo.operations.error_count` - 오류가 난 GraphQL 작동 수. 실행 오류 및 Studio가 서버 연결에 실패한 경우 HTTP 오류 횟수 포함.
- `apollo.operations.cache_hit_count` - Apollo Server의 전체 쿼리 캐시에서 응답한 GraphQL 쿼리 개수
- 밀리초 단위로 측정한 GraphQL 작동 응답 시간. Studio의 합산 메서드(로그 묶기) 때문에 오차 범위(+/- 5%)가 있음.

  - `apollo.operations.latency.min`
  - `apollo.operations.latency.median`
  - `apollo.operations.latency.95percentile`
  - `apollo.operations.latency.99percentile`
  - `apollo.operations.latency.max`
  - `apollo.operations.latency.avg`

이 메트릭은 60초 간격으로 합산되고 GraphQL 운영 이름 `operation:<query-name>`으로 태그됩니다. 운영 이름이 동일하며 고유한 쿼리 서명은 병합되고 운영 이름이 없는 쿼리는 무시됩니다.

또 Studio에 있는 여러 그래프의 데이터를 동일한 Datadog 계정으로 보낼 수 있도록 관련 Studio 그래프 ID(예: `graph:<graph-id>`)와 관련 변형 이름(예: `variant:<variant-name>`)으로 메트릭을 태그합니다. 변형 이름을 설정하지 않으면 `current`이 사용됩니다.

(2020년 10월 이전에 통합을 설정한 경우에는 메트릭 이름이 `apollo.operations`가 아닌 `apollo.engine.operations`로 시작하며 `graph` 태그 대신 `service` 태그가 사용됩니다. Apollo Studio의 그래프 통합 페이지에서 새 메트릭 이름으로 마이그레이션할 수 있습니다.)

## 설정

### 설정

Datadog API 키와 리전을 Studio에 제공하기만 하면  Apollo Datadog 통합을 바로 시작할 수 있습니다. 다른 구성이 필요 없습니다.

1. [Datadog 통합 페이지][2]로 이동해 Apollo 타이틀을 클릭하세요. **Configuration** 탭으로 이동한 후 하단에 있는 **Install Integration**을 클릭하세요.

2. [Datadog API 페이지][3]로 이동해 API 키를 생성하세요.

3. 내 브라우저 주소 바에서 Datadog API 리전을 확인하세요.
- 도메인 이름이 `app.datadoghq.com`이면 API 리전이 `US`입니다.
- 도메인 이름이 `app.datadoghq.eu`이면 API 리전이 `EU`입니다.

4. [Studio][4]에서 그래프 통합 페이지로 이동하세요.

   ![IntegrationsPage][5]

5. Datadog Forwarding 섹션에서 **Configure**을 클릭하세요. API 키와 리전을 입력하고 **Enable**을 클릭하세요. 전송되는 메트릭 전체에 해당 그래프 ID(`graph:<graph-id>`)가 태그되기 때문에 그래프 전체에 같은 API 키를 사용할 수 있습니다.

   ![IntegrationsToggle][6]

6. Datadog 메트릭 탐색기로 이동해 내 메트릭을 확인하세요. 메트릭이 표시되는 데 최대 5분 정도 걸립니다.

### 사용량

자세한 사용량 정보를 보려면 [Apollo 통합 설명서][7]를 참고하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "apollo" >}}


### 이벤트

Apollo 통합에는 아직 이벤트가 포함되지 않습니다.

### 서비스 검사

Apollo 통합에는 아직 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png
[2]: https://app.datadoghq.com/account/settings#integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.apollographql.com/docs/studio/org/graphs/#viewing-graph-information
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png
[7]: https://www.apollographql.com/docs/studio/datadog-integration/
[8]: https://github.com/DataDog/integrations-extras/blob/master/apollo/metadata.csv
[9]: https://docs.datadoghq.com/ko/help/