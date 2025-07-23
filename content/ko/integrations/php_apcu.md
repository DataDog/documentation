---
app_id: PHP-apcu
app_uuid: ec09379e-851f-4ecc-be78-de5297087994
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: php_apcu.cache.mem_size
      metadata_path: metadata.csv
      prefix: php_apcu.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10139
    source_type_name: PHP APCu
  monitors:
    Cache is Full: assets/monitors/PHP-apcu_expunges.json
    Cache usage is high: assets/monitors/PHP-apcu_high_usage.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: noname@withgod.jp
  support_email: noname@withgod.jp
categories:
- 캐싱
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/php_apcu/README.md
display_on_public_website: true
draft: false
git_integration_title: php_apcu
integration_id: PHP-apcu
integration_title: PHP APCu
integration_version: 0.0.2
is_public: true
manifest_version: 2.0.0
name: php_apcu
public_title: PHP APCu
short_description: PHP APCu 인메모리 데이터 캐싱을 모니터링하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: PHP APCu 인메모리 데이터 캐싱을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PHP APCu
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Datadog 에이전트를 통해 [PHP APCu][1]를 모니터링합니다.

## 설정

[Datadog 에이전트 ][2] 패키지에는 PHP APCu 점검이 포함되어 있지 않으므로 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 아래 지침에 따라 PHP APCu 점검을 호스트에 설치하세요. 도커(Docker) 에이전트 또는 이전 버전의 에이전트에 설치하려면 [커뮤니티 통합][3]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-php_apcu==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

#### APCu

APCu는 기본적으로 메트릭을 노출시키지 않으므로 이 통합에는 메트릭 내보내기가 포함되어 있습니다.

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
```

에이전트 [설정](#configuration)의 경우, 이 파일 이름으로 내보내기를 직접 참조하거나 웹 서버에서 별칭을 지정합니다. 예를 들어 Apache를 사용하는 경우 웹 서버의 별칭 설정 파일은 다음과 같습니다.

```
Alias /apcu-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
<Location /apcu-status>
    Require all denied
    Require local
</Location>
```

### 설정

1. 에이전트의 설정 디렉토리 루트에 있는 `conf.d/` 폴더에서 `php_apcu.d/conf.yaml` 파일을 편집하여 `php_apcu` 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 `php_apcu.d/conf.yaml` 파일][5]을 참조하세요.
    ```
    instances
      - url: http://localhost/apcu-status
    ```

2. [에이전트를 재시작합니다][6].

### 검증

[에이전트 상태 하위 명령][7]을 실행하고 점검 섹션에서 `php_apcu`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "php-apcu" >}}


### 이벤트

PHP APCu 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "php-apcu" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://www.php.net/manual/en/book.apcu.php
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/datadog_checks/php_apcu/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/