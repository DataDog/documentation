---
app_id: upstash
app_uuid: fe1f17e3-11a4-4e44-b819-8781ebcc86f8
assets:
  dashboards:
    Upstash-Kafka-Overview: assets/dashboards/upstash_kafka_overview.json
    Upstash-Redis-Overview: assets/dashboards/upstash_redis_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - upstash.metadata.metric_publish
      metadata_path: metadata.csv
      prefix: upstash.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10412
    source_type_name: Upstash
  oauth: assets/oauth_clients.json
author:
  homepage: https://upstash.com
  name: Upstash
  sales_email: sales@upstash.com
  support_email: support@upstash.com
categories:
- cloud
- ai/ml
- 데이터 스토어
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/upstash/README.md
display_on_public_website: true
draft: false
git_integration_title: upstash
integration_id: upstash
integration_title: Upstash
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: upstash
public_title: Upstash
short_description: Upstash에서 데이터베이스 및 Kafka 클러스터의 메트릭 시각화
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - "\b카테고리::클라우드"
  - Category::AI/ML
  - 카테고리::데이터 저장
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: Upstash에서 데이터베이스 및 Kafka 클러스터의 메트릭 시각화
  media:
  - caption: Upstash Redis 데이터베이스 메트릭
    image_url: images/upstash-redis-overview-dashboard.png
    media_type: image
  - caption: Upstash Kafka 메트릭
    image_url: images/upstash-kafka-overview-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Upstash
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Upstash는 다양한 애플리케이션에 Redis®, Kafka 및 메시징/스케줄링 솔루션을 제공하는 서버리스 데이터 제공 업체로, 속도가 빠르고, 간편하며, 개발자 경험이 원활합니다. Upstash는 Redis 및 Kafka API를 사용하며, 다음과 같은 용도로 설계되었습니다.

* 서버리스 함수(AWS Lambda)
* Cloudflare Workers
* Fastly Compute@Edge
* Next.js Edge, Remix 등
* 클라이언트 측 웹 또는 모바일 애플리케이션
* AI 개발
* TCP 연결보다 HTTP가 선호되는 WebAssembly 및 기타 환경

모니터링 스택을 중앙화하고 데이터에 대한 포괄적인 보기를 제공하기 위해 Upstash 통합은 다음과 같은 메트릭을 Datadog로 전송합니다.
    * Hit/Miss Rate
    * Read/Write Latency (p99)
    * Keyspace
    * Number of Connections
    * Bandwidth
    * Total Data Size
    * Throughput

## 설정

### 설치

[Upstash][1]를 방문하여 무료로 가입하세요. 등록 후 Datadog의 [Upstash 통합 타일][2]을 방문하여 통합을 설치하세요. 설치가 완료되면 **Configure** 탭으로 이동하여 **Connect Accounts**를 클릭하세요. 이 과정은 Datadog OAuth 흐름을 통해 Upstash가 데이터베이스 메트릭에 접근할 수 있도록 권한을 부여하는 방법을 안내합니다.

## 삭제

Upstash에서 Datadog 통합을 제거하려면 [Upstash 통합 페이지][3]로 이동하여 **Remove**를 클릭하세요. 또한 [통합 타일][2]에서 **Uninstall Integration** 버튼을 클릭하여 Datadog에서 이 통합을 제거하세요. 이 통합을 제거하면 이전 권한이 모두 취소됩니다.

추가적으로 [API Keys 관리 페이지][4]에서 `upstash`를 검색하여 이 통합과 관련된 모든 API 키가 비활성화되었는지 확인하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "upstash" >}}

### 이벤트
Upstash 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Upstash 통합은 서비스 점검을 포함하지 않습니다.

## 지원
도움이 필요하신가요? [Upstash 지원팀][6]에 문의하세요.

[1]: https://upstash.com
[2]: https://app.datadoghq.com/integrations/upstash
[3]: https://console.upstash.com/integration/datadog
[4]: https://app.datadoghq.com/organization-settings/api-keys?filter=Upstash
[5]: https://github.com/DataDog/integrations-extras/blob/master/upstash/metadata.csv
[6]: mailto:support@upstash.com