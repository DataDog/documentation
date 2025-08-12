---
app_id: purefb
app_uuid: 50ae3c61-a87d-44ee-9917-df981184ff8a
assets:
  dashboards:
    purefb_overview: assets/dashboards/purefb_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: purefb.info
      metadata_path: metadata.csv
      prefix: purefb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10269
    source_type_name: PureFB
author:
  homepage: https://purestorage.com
  name: Pure Storage
  sales_email: sales@purestorage.com
  support_email: pure-observability@purestorage.com
categories:
- 데이터 스토어
- OS & 시스템
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/purefb/README.md
display_on_public_website: true
draft: false
git_integration_title: purefb
integration_id: purefb
integration_title: Pure Storage FlashBlade
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: purefb
public_title: Pure Storage FlashBlade
short_description: Pure Storage FlashBlade 성능과 활용률을 모니터링하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::OS & System
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Pure Storage FlashBlade 성능과 활용률을 모니터링하세요.
  media:
  - caption: Pure Storage FlashBlade 대시보드 - 개요 (상단)
    image_url: images/FB-overview-1.png
    media_type: image
  - caption: Pure Storage FlashBlade 대시보드 - 개요 (중앙)
    image_url: images/FB-overview-2.png
    media_type: image
  - caption: Pure Storage FlashBlade 대시보드 - 개요 (하단)
    image_url: images/FB-overview-3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Pure Storage FlashBlade
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

본 점검은 [Datadog 에이전트][2] 및 [Pure Storage FlashBlade 개방형메트릭 익스포터][3]를 통해 [Pure Storage FlashBlade][1]를 모니터링합니다.

본 통합으로 어레이, 클라이언트, 공유 및 버킷 레벨의 성능 데이터와 높은 수준의 용량 및 설정 정보를 제공합니다.

다중 FlashBlades를 모니터링하고 단일 대시보드에 통합하거나 고객이 정의한 환경에 따라 그룹화할 수 있습니다.

**이 통합에는 다음이 필요합니다.**

 - FlashBlade Purity 4.1.x+
 - OpenMetricsBaseCheckV2를 활용하기 위한 Datadog 에이전트 v7.26.x 이상
 - Python 3
 - Pure Storage FlashBlade 개방형메트릭 익스포터 v1.0.11+는 컨테이너화된 환경에서 설치 및 실행됩니다. 설치 지침은 [Pure Storage GitHub 리포지토리][3]를 참조하세요.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 지침이 필요하면 [자동탐지 통합 템플릿][4]을 참조하세요.

### 설치

1. [Datadog 에이전트를 다운로드하여 실행합니다][2].
2. Pure FlashBlade 통합을 수동 설치합니다. 환경에 따른 자세한 내용은 [커뮤니티 통합 사용][5]을 참조하세요.


#### 호스트

호스트에서 실행되는 에이전트에 대한 점검을 설정하려면 `datadog-agent integration install -t datadog-purefb==2.0.0`을 실행하세요.


### 설정

1. FlashBlade에 읽기 전용 역할로 사용자를 생성하고 이 사용자에 대한 API 토큰을 생성합니다.

2. 에이전트의 설정 디렉토리 루트의 `conf.d/` 폴더에 있는 `purefb.d/conf.yaml` 파일에 다음 설정 블록을 추가하여 PureFB 성능 데이터 수집을 시작하세요. 사용 가능한 모든 설정 옵션은 샘플 [purefb.d/conf.yaml][6]을 참조하세요.

**참고**: 설정 파일을 만들 때 `/array` 엔드포인트는 반드시 필요합니다.

```yaml
init_config:
   timeout: 120

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/clients?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/usage?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

```

2. [에이전트 다시 시작][7].

### 검증

[에이전트 상태 하위 명령을 실행하고][8] 점검 섹션 에서 `purefb`를 찾으세요.

### 트러블슈팅

#### 배열은 대시보드에 표시되지 않습니다.

본 통합에 포함된 대시보드는 태그 `env` , `host`, `fb_array_name`을 사용합니다. 인스턴스별로 설정되어 있는지 확인하세요.

```yaml
 tags:
    - env:<env>
    - fb_array_name:<full_fqdn>
    - host:<full_fqdn>
```

#### 수집 간격 늘리기

`/array` 엔드포인트에 대해 Pure Storage FlashBlade 점검은 기본적으로 `min_collection_interval`을 `120`으로 설정하며, 최소 권장값은 `15`입니다. 필요한 경우 `purefb.d/conf.yaml` 파일에서 `min_collection_interval`를 늘리거나 줄일 수 있습니다.

```yaml
min_collection_interval: 120
```

`/clients` 및 `/usage` 엔드포인트에 대해 Pure Storage FlashBlade 점검은 기본적으로 `min_collection_interval`을 `600`으로 설정하며, 최소 권장값은 `120`입니다. 필요한 경우 `purefb.d/conf.yaml` 파일에서 `min_collection_interval`를 늘리거나 줄일 수 있습니다.

```yaml
min_collection_interval: 600
```


## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "purefb" >}}


### 이벤트

PureFB 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

이 통합에서 제공하는 서비스 점검 목록은 [service_checks.json][10]을 참조하세요.

## 지원

지원 또는 기능 요청이 필요한 경우, 다음 방법을 통해 Pure Storage에 문의하세요.
* 이메일: pure-observability@purestorage.com
* Slack: [Pure Storage Code// 관측 가능성 채널][11].

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/PureStorage-OpenConnect/pure-fb-openmetrics-exporter
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/ko/agent/guide/community-integrations-installation-with-docker-agent
[6]: https://github.com/DataDog/integrations-extras/blob/master/purefb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/purefb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/purefb/assets/service_checks.json
[11]: https://code-purestorage.slack.com/messages/C0357KLR1EU