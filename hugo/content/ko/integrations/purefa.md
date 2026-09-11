---
app_id: purefa
app_uuid: a2d8f393-62cd-4ece-bfab-e30797698b12
assets:
  dashboards:
    purefa_overview: assets/dashboards/purefa_overview.json
    purefa_overview_legacy: assets/dashboards/purefa_overview_legacy.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: purefa.info
      metadata_path: metadata.csv
      prefix: purefa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10256
    source_type_name: PureFA
author:
  homepage: https://purestorage.com
  name: Pure Storage
  sales_email: sales@purestorage.com
  support_email: pure-observability@purestorage.com
categories:
- 데이터 스토어
- os & system
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/purefa/README.md
display_on_public_website: true
draft: false
git_integration_title: purefa
integration_id: purefa
integration_title: Pure Storage FlashArray
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: purefa
public_title: Pure Storage FlashArray
short_description: Pure Storage FlashArrays 성능과 활용률을 모니터링하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::데이터 저장
  - Category::OS & System
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Pure Storage FlashArrays 성능과 활용률을 모니터링하세요.
  media:
  - caption: Pure Storage FlashArray 대시보드 - 개요(상단)
    image_url: images/FA-overview-1.png
    media_type: image
  - caption: Pure Storage FlashArray 대시보드 - 개요(중앙)
    image_url: images/FA-overview-2.png
    media_type: image
  - caption: Pure Storage FlashArray 대시보드 - 개요(하단)
    image_url: images/FA-overview-3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Pure Storage FlashArray
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검 는 [Datadog 에이전트 ][2] 및 [퓨어스토리지 개방형메트릭 익스포터][3]를 통해 [퓨어스토리지 플래시어레이][1]를 모니터링합니다. 

통합에서는 어레이, 호스트, 볼륨 및 포드 레벨의 성능 데이터와 높은 수준의 용량 및 설정 정보를 제공할 수 있습니다.

여러 개의 FlashArray를 모니터링하고 단일 대시보드에 통합하거나 고객이 정의한 환경에 따라 그룹화할 수 있습니다.

**이 통합에는 다음이 필요합니다.**

 - OpenMetricsBaseCheckV2를 활용하기 위한 에이전트 v7.26.x 이상
 - Python 3
 - Pure Storage OpenMetrics 익스포터는 컨테이너화된 환경에 설치 및 실행됩니다. 설치 지침은 [GitHub 리포지토리][3]를 참조하세요.

## 설정

아래 지침에 따라 호스트에서 실행되는 에이전트의 경우 이 점검을 설치하고 설정하세요.. 컨테이너화된 환경의 경우 자동탐지 통합 템플릿에서 이 지침을 적용하는 방법을 확인할 수 있습니다.

### 설치

1. [Datadog 에이전트를 다운로드하여 실행합니다][2].
2. Pure FlashArray 통합을 직접 설치합니다. 환경에 따른 자세한 내용은 [커뮤니티 통합 사용][4]을 참조하세요.


#### 호스트

호스트에서 실행되는 에이전트에 대해 이 점검을 설정하려면 `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==<INTEGRATION_VERSION>`을 실행하세요. 

참고: `<INTEGRATION_VERSION>` Datadog 통합 추가 정보는 [CHANGELOG.md][5]에서 확인할 수 있습니다. 
  * 예: `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==1.2.0`

### 설정

1. FlashArray에 읽기 전용 역할로 로컬 사용자를 생성하고 이 사용자에 대한 API 토큰을 생성합니다.
   ![API 키 생성][6] 
2. 에이전트의 설정 디렉터리 루트의 `conf.d/` 폴더에 있는 `purefa.d/conf.yaml` 파일에 다음 설정 블록을 추가하여 PureFA 성능 데이터 수집을 시작하세요. 사용 가능한 모든 설정 옵션은 샘플 [purefa.d/conf.yaml][7]을 참조하세요.

**참고**: 설정 파일을 만들 때 `/array` 엔드포인트는 반드시 필요합니다.

```yaml
init_config:
   timeout: 60

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/volumes?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/hosts?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/pods?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/directories?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
```

2. [Agent를 재시작합니다][8].

### 검증

[에이전트 상태 하위 명령을 실행][9]하고 점검 섹션에서 `purefa`를 찾습니다.



### 이 통합의 새 버전으로 업그레이드하기

#### PureFA 에이전트 점검 1.0.x~1.1.x

1.1.x는 [Pure Storage OpenMetrics 익스포터][3]와 더 이상 사용되지 않는 [Pure Storage Prometheus 익스포터][10]를 모두 지원합니다.

더 이상 지원되지 않는 [Pure Storage Prometheus 익스포터][10]의 대시보드는 `Pure FlashArray - Overview (Legacy Exporter)`로 이름이 변경되었습니다.

각기 다른 익스포터에 고유하며 공유되어 있는 메트릭 목록은 [메트릭.py][11]에 나와 있습니다. [Pure Storage Prometheus익스포터][10]에서 [Pure Storage Prometheus 익스포터][3]로 마이그레이션할 때 새로운 메트릭 이름과 일치하도록 대시보드 및/또는 알림을 업데이트해야 할 수 있습니다. 문의 사항이 있으시면 Pure Storage 지원 탭에 정보를 제공해 주세요.

[Pure Storage Prometheus 익스포터][10]에서 [Pure Storage OpenMetrics 익스포터][3]로 마이그레이션하는 경우, 엔드포인트 URI에 더 이상 `/flasharray`가 존재하지 않습니다.

향후 버전의 PureFA 에이전트 점검에서는 Pure Storage Prometheus 익스포터에서 메트릭 이름이 제거됩니다.

### 트러블슈팅

#### 배열은 대시보드에 표시되지 않습니다.

이 통합에 포함된 대시보드는 태그 `env` 및 `fa_array_name`을 사용합니다. `host`는 `purefa.d/conf.yaml` 의 `/array` 및 `/pods` 엔드포인트에 대해서도 설정해야 합니다.

```yaml
- tags:
   - env:<env>
   - fa_array_name:<full_fqdn>
   - host:<full_fqdn>
```

#### 수집 간격 늘리기

Pure Storage FlashArray 점검은 기본적으로 `min_collection_interval`을 `120`으로 설정하며, 최소 권장값은 `20`입니다. 필요한 경우 `purefa.d/conf.yaml` 파일에서 `min_collection_interval`를 늘리거나 줄일 수 있습니다.

```yaml
min_collection_interval: 120
```


## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "purefa" >}}


### 이벤트

PureFA 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

이 통합에서 제공하는 서비스 점검에 대한 목록은 [service_checks.json][13]을 참조하세요.

## 지원

지원 또는 기능 요청이 필요한 경우, 다음 방법을 통해 Pure Storage에 문의하세요.
* 이메일: pure-observability@purestorage.com
* Slack: [Pure Storage 코드// 관측 가능성 채널]][14]

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter
[4]: https://docs.datadoghq.com/ko/agent/guide/community-integrations-installation-with-docker-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/purefa/CHANGELOG.md
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/purefa/images/API.png
[7]: https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/PureStorage-OpenConnect/pure-exporter
[11]: https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/metrics.py
[12]: https://github.com/DataDog/integrations-extras/blob/master/purefa/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/purefa/assets/service_checks.json
[14]: https://code-purestorage.slack.com/messages/C0357KLR1EU