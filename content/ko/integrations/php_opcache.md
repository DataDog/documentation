---
app_id: PHP-opcache
app_uuid: 392e54ac-60d4-4225-ab5a-d75245e0ea06
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: php_opcache.memory_usage.used_memory
      metadata_path: metadata.csv
      prefix: php_opcache.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10141
    source_type_name: PHP OPcache
  monitors:
    OPcache is full: assets/monitors/PHP-opcache_expunges.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: noname@withgod.jp
  support_email: noname@withgod.jp
categories: []
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/php_opcache/README.md
display_on_public_website: true
draft: false
git_integration_title: php_opcache
integration_id: PHP-opcache
integration_title: PHP OPcache
integration_version: 0.0.1
is_public: true
manifest_version: 2.0.0
name: php_opcache
public_title: PHP OPcache
short_description: PHP OPcache 바이트코드 캐시 시스템을 모니터링하세요.
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: PHP OPcache 바이트코드 캐시 시스템을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PHP OPcache
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Datadog 에이전트를 통해 [PHP OPcache][1]를 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을 참조하세요.

### 설치

호스트에서 `php_opcache` 점검을 설치하려면,


1. [개발자 툴킷][3]을 설치합니다.
 모든 기기에서

2. `ddev -e release build php_opcache`를 실행하여 패키지를 빌드합니다.

3. [Datadog 에이전트를 다운로드][4]합니다.

4. 빌드 아티팩트를 에이전트가 있는 호스트에 업로드합니다.
 `datadog-agent integration install -w
 path/to/php_opcache/dist/<ARTIFACT_NAME>.whl`.

#### OPcache

OPcache는 기본적으로 메트릭을 노출하지 않으므로 여기 통합에는 메트릭 내보내기가 포함되어 있습니다.

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
```
Datadog [integrations-extras][5] 리포지토리에서 내보내기를 다운로드할 수 있습니다.

에이전트를 [설정](#configuration)할 때 파일 이름으로 내보내기를 직접 참조하거나 웹 서버에서 별칭을 설정합니다. 예를 들어 Apache를 사용하는 경우 웹 서버 설정 파일의 별칭은 다음과 같습니다.

```
Alias /opcache-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
<Location /opcache-status>
    Require all denied
    Require local
</Location>
```

### 설정

1. 에이전트의 설정 디렉토리 루트에 있는 `conf.d/` 폴더에 있는 `php_opcache.d/conf.yaml` 파일을 편집하여 `php_opcache` 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 `php_opcache.d/conf.yaml` 파일][6]을 참조하세요.
    ```
    instances
      - url: http://localhost/opcache-status
    ```
2. [에이전트를 다시 시작][7]합니다.

### 검증

[에이전트의 상태 하위 명령을 실행][8]하고 점검 섹션에서 `php_opcache`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "php-opcache" >}}


### 이벤트

PHP OPcache 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "php-opcache" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://www.php.net/manual/en/book.opcache.php
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ko/developers/integrations/python/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
[6]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/